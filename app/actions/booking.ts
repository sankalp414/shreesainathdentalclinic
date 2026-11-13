"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import * as schema from "@/db/schema";
import { eq, and, ne, getTableColumns } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getClinicScheduleConfig, type ClinicScheduleConfig } from "./clinic-schedule";

const { users, appointments } = schema;

function timeToMins(t: string): number {
  const cleaned = t.trim().toUpperCase();
  const [time, mod] = cleaned.split(/\s+/);
  let [h, m] = (time || "10:00").split(":").map(Number);
  if (isNaN(h)) h = 10;
  if (isNaN(m)) m = 0;
  if (mod === "PM" && h < 12) h += 12;
  if (mod === "AM" && h === 12) h = 0;
  return h * 60 + m;
}

function minsToTime(mins: number): string {
  const h24 = Math.floor(mins / 60) % 24;
  const m = mins % 60;
  const mod = h24 >= 12 ? "PM" : "AM";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${String(h12).padStart(2, "0")}:${String(m).padStart(2, "0")} ${mod}`;
}

function calculateEndTime(startTime: string, durationMinutes = 30): string {
  const totalMins = timeToMins(startTime) + durationMinutes;
  return minsToTime(totalMins);
}

// Deterministic UTC + 05:30 calculation for India Standard Time (IST)
function getNowInIST(): { todayIST: string; currentMinutesIST: number } {
  const now = new Date();
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
  const istDate = new Date(utcMs + 330 * 60000);

  const year = istDate.getFullYear();
  const month = String(istDate.getMonth() + 1).padStart(2, "0");
  const day = String(istDate.getDate()).padStart(2, "0");
  const hours = istDate.getHours();
  const minutes = istDate.getMinutes();

  return {
    todayIST: `${year}-${month}-${day}`,
    currentMinutesIST: hours * 60 + minutes,
  };
}

export interface SlotStatusItem {
  time: string;
  period: "MORNING" | "EVENING";
  isBooked: boolean;
  isPast: boolean;
  isDisabled: boolean;
  isEmergencySlot?: boolean;
  reason?: "BOOKED" | "TIME_PASSED" | "CLINIC_CLOSED";
}

export interface DateAvailabilityResponse {
  slots: SlotStatusItem[];
  isClosedForMode: boolean;
  closureMessage: string | null;
  isEmergencyAvailable: boolean;
  emergencyNote: string;
  allowedConsultationType: "IN_CLINIC_ONLY" | "BOTH";
  scheduleSummary: {
    startTime: string;
    endTime: string;
    lunchStart: string;
    lunchEnd: string;
  };
}

export async function getDateAvailabilityDetails(
  dateStr: string,
  mode: "in-clinic" | "video" = "in-clinic",
  isEmergencyRequested = false
): Promise<DateAvailabilityResponse> {
  const config: ClinicScheduleConfig = await getClinicScheduleConfig();

  // Check if video mode is globally disabled by doctor
  const isVideoGloballyDisabled =
    mode === "video" && config.consultationType === "IN_CLINIC_ONLY";

  // Check specific closed date entry
  const closedEntry = config.closedDates.find((d) => d.date === dateStr);
  const isClosedByDate =
    !!closedEntry &&
    (closedEntry.scope === "BOTH" ||
      (closedEntry.scope === "IN_CLINIC_ONLY" && mode === "in-clinic"));

  // Check weekly off day (using UTC noon to avoid timezone weekday shift)
  const dayOfWeek = new Date(`${dateStr}T12:00:00.000Z`).getUTCDay();
  const isWeeklyOffDay = config.weeklyOffDays.includes(dayOfWeek);
  const isClosedByWeeklyOff =
    isWeeklyOffDay &&
    (config.weeklyOffScope === "BOTH" ||
      (config.weeklyOffScope === "IN_CLINIC_ONLY" && mode === "in-clinic"));

  const isNormallyClosed =
    isVideoGloballyDisabled || isClosedByDate || isClosedByWeeklyOff;

  const canUseEmergency =
    (isClosedByDate || isClosedByWeeklyOff) &&
    !isVideoGloballyDisabled &&
    config.allowEmergencyOverride;

  const isEffectivelyClosed =
    isNormallyClosed && !(canUseEmergency && isEmergencyRequested);

  let closureMessage: string | null = null;
  if (isVideoGloballyDisabled) {
    closureMessage =
      "Online Video Consultations are currently disabled by Dr. Nitu. Please switch to In-Clinic Consultation.";
  } else if (isClosedByDate) {
    closureMessage =
      closedEntry?.scope === "IN_CLINIC_ONLY"
        ? `In-Clinic visits are closed on ${dateStr} (${closedEntry.reason || "Doctor Unavailable"}). Online Video Consultations remain open!`
        : `The clinic is closed on ${dateStr} (${closedEntry?.reason || "Holiday / Closure"}).`;
  } else if (isClosedByWeeklyOff) {
    closureMessage =
      config.weeklyOffScope === "IN_CLINIC_ONLY"
        ? "In-Clinic consultations are closed for Weekly Off on this day. Online Video Consultations are available!"
        : "This day is a scheduled Weekly Off for the clinic.";
  }

  const startMins = timeToMins(config.startTime);
  const endMins = timeToMins(config.endTime);
  const lunchStartMins = timeToMins(config.lunchStart);
  const lunchEndMins = timeToMins(config.lunchEnd);
  const duration = config.slotDurationMinutes || 30;

  const generatedSlots: { time: string; period: "MORNING" | "EVENING" }[] = [];

  if (!isEffectivelyClosed) {
    for (let current = startMins; current < endMins; current += duration) {
      // Automatically skip all slots falling inside the lunch break window
      if (current >= lunchStartMins && current < lunchEndMins) {
        continue;
      }
      const timeString = minsToTime(current);
      const period = current < lunchStartMins ? "MORNING" : "EVENING";
      generatedSlots.push({ time: timeString, period });
    }
  }

  // Query booked appointments for this date
  const bookedSet = new Set<string>();
  try {
    const targetDate = new Date(`${dateStr}T00:00:00.000Z`);
    const existing = await db
      .select({
        startTime: appointments.startTime,
        status: appointments.status,
      })
      .from(appointments)
      .where(
        and(
          eq(appointments.appointmentDate, targetDate),
          ne(appointments.status, "CANCELLED" as any)
        )
      );

    for (const row of existing) {
      if (row.startTime) {
        bookedSet.add(row.startTime.trim().toUpperCase());
      }
    }
  } catch (err) {
    console.error("DB slot check error:", err);
  }

  const { todayIST, currentMinutesIST } = getNowInIST();
  const isSelectedDateBeforeToday = dateStr < todayIST;
  const isSelectedDateToday = dateStr === todayIST;

  const slots: SlotStatusItem[] = generatedSlots.map((slot) => {
    const normalizedTime = slot.time.trim().toUpperCase();
    const slotMinutes = timeToMins(normalizedTime);
    const isBooked = bookedSet.has(normalizedTime);
    const isPast =
      isSelectedDateBeforeToday ||
      (isSelectedDateToday && slotMinutes <= currentMinutesIST);

    const isDisabled = isBooked || isPast;
    let reason: SlotStatusItem["reason"] = undefined;
    if (isBooked) reason = "BOOKED";
    else if (isPast) reason = "TIME_PASSED";

    return {
      time: slot.time,
      period: slot.period,
      isBooked,
      isPast,
      isDisabled,
      isEmergencySlot: isNormallyClosed && canUseEmergency && isEmergencyRequested,
      reason,
    };
  });

  return {
    slots,
    isClosedForMode: isNormallyClosed,
    closureMessage,
    isEmergencyAvailable: canUseEmergency,
    emergencyNote: config.emergencyNote,
    allowedConsultationType: config.consultationType,
    scheduleSummary: {
      startTime: config.startTime,
      endTime: config.endTime,
      lunchStart: config.lunchStart,
      lunchEnd: config.lunchEnd,
    },
  };
}

export async function getSlotAvailabilityForDate(
  dateStr: string,
  mode: "in-clinic" | "video" = "in-clinic",
  isEmergencyRequested = false
): Promise<SlotStatusItem[]> {
  const details = await getDateAvailabilityDetails(
    dateStr,
    mode,
    isEmergencyRequested
  );
  return details.slots;
}

export async function getBookedTimeSlots(dateStr: string): Promise<string[]> {
  const statusList = await getSlotAvailabilityForDate(dateStr);
  return statusList.filter((s) => s.isDisabled).map((s) => s.time);
}

export async function createAppointment(formData: {
  mode: "in-clinic" | "video";
  date: string;
  timeSlot: string;
  paymentMethod: "online" | "cash";
  isEmergency?: boolean;
  clientUser?: {
    clerkId?: string;
    email?: string;
    fullName?: string;
    phone?: string;
  };
}) {
  try {
    const clerkUser = await currentUser();
    const { userId: authUserId } = await auth();

    const clerkId = clerkUser?.id || authUserId || formData.clientUser?.clerkId;
    const email = (
      clerkUser?.emailAddresses?.[0]?.emailAddress ||
      formData.clientUser?.email ||
      ""
    )
      .toLowerCase()
      .trim();

    const fullName =
      (clerkUser
        ? `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim()
        : formData.clientUser?.fullName?.trim()) || "Patient";

    if (!clerkId && !email) {
      return {
        success: false,
        error: "Please sign in to your patient account before booking an appointment.",
      };
    }

    const config = await getClinicScheduleConfig();
    const { todayIST, currentMinutesIST } = getNowInIST();
    const slotMinutes = timeToMins(formData.timeSlot);

    if (
      formData.date < todayIST ||
      (formData.date === todayIST && slotMinutes <= currentMinutesIST)
    ) {
      return {
        success: false,
        error: `The time slot ${formData.timeSlot} has already passed for today. Please choose an upcoming time slot or select tomorrow's date.`,
      };
    }

    const targetDate = new Date(`${formData.date}T00:00:00.000Z`);

    // Prevent double-booking the exact same date + timeSlot
    const [conflictingAppointment] = await db
      .select()
      .from(appointments)
      .where(
        and(
          eq(appointments.appointmentDate, targetDate),
          eq(appointments.startTime, formData.timeSlot),
          ne(appointments.status, "CANCELLED" as any)
        )
      )
      .limit(1);

    if (conflictingAppointment) {
      return {
        success: false,
        error: `The time slot ${formData.timeSlot} on ${formData.date} is already booked. Please choose another slot.`,
      };
    }

    // 1. Find or sync patient in base `users` table
    let [dbUser] = email
      ? await db.select().from(users).where(eq(users.email, email)).limit(1)
      : await db
          .select()
          .from(users)
          .where(eq(users.clerkId, clerkId!))
          .limit(1);

    if (!dbUser) {
      const [newUser] = await db
        .insert(users)
        .values({
          clerkId: clerkId || `clerk_${Date.now()}`,
          email: email || `${clerkId}@patient.shreesainathdental.com`,
          fullName: fullName,
          role: "PATIENT",
        } as any)
        .returning();
      dbUser = newUser;
    }

    // 2. Resolve `patients` table record
    let patientRecordId = dbUser.id;
    const patientsTable = (schema as any).patients;

    if (patientsTable) {
      let [patientProfile] = await db
        .select()
        .from(patientsTable)
        .where(eq(patientsTable.userId, dbUser.id))
        .limit(1);

      if (!patientProfile) {
        const patientCode = `PAT-${Math.floor(100000 + Math.random() * 900000)}`;
        const [newPatientProfile] = await db
          .insert(patientsTable)
          .values({
            userId: dbUser.id,
            patientCode: patientCode,
            telemedicineConsent: true,
          } as any)
          .returning();
        patientProfile = newPatientProfile;
      }
      patientRecordId = patientProfile.id;
    }

    // 3. Find or create Doctor user in base `users` table
    let [doctorUser] = await db
      .select()
      .from(users)
      .where(eq(users.role, "DOCTOR"))
      .limit(1);

    if (!doctorUser) {
      const [newDoc] = await db
        .insert(users)
        .values({
          clerkId: "doc_default_Nitu",
          email: "dr.ananya@shreesainathdental.com",
          fullName: "Dr. Nitu Rajpoot, MDS",
          role: "DOCTOR",
        } as any)
        .returning();
      doctorUser = newDoc;
    }

    // 4. Resolve `doctors` table record
    let doctorRecordId = doctorUser.id;
    const doctorsTable = (schema as any).doctors;

    if (doctorsTable) {
      let [doctorProfile] = await db.select().from(doctorsTable).limit(1);

      if (!doctorProfile) {
        const docCols = getTableColumns(doctorsTable);
        const docPayload: Record<string, any> = {
          userId: doctorUser.id,
        };

        if ("doctorCode" in docCols) docPayload.doctorCode = "DOC-Nitu-01";
        if ("fullName" in docCols) docPayload.fullName = "Dr. Nitu Rajpoot, BDS";
        if ("name" in docCols) docPayload.name = "Dr. Nitu Rajpoot, BDS";
        if ("email" in docCols) docPayload.email = "dr.ananya@shreesainathdental.com";
        if ("phone" in docCols) docPayload.phone = "+919876543210";
        if ("registrationNumber" in docCols) docPayload.registrationNumber = "DCI-MH-48291";
        if ("licenseNumber" in docCols) docPayload.licenseNumber = "DCI-MH-48291";
        if ("specialization" in docCols)
          docPayload.specialization = "Conservative Dentistry & Endodontics";
        if ("qualification" in docCols) docPayload.qualification = "BDS, MDS";
        if ("qualifications" in docCols) docPayload.qualifications = "BDS, MDS";
        if ("experienceYears" in docCols) docPayload.experienceYears = 8;
        if ("experience" in docCols) docPayload.experience = 8;
        if ("consultationFee" in docCols) docPayload.consultationFee = "500";
        if ("inClinicFee" in docCols) docPayload.inClinicFee = "500";
        if ("videoConsultationFee" in docCols) docPayload.videoConsultationFee = "700";
        if ("onlineFee" in docCols) docPayload.onlineFee = "700";
        if ("bio" in docCols)
          docPayload.bio = "Chief Dental Surgeon at Shree Sainath Dental Clinic.";
        if ("isAvailable" in docCols) docPayload.isAvailable = true;

        const [newDoctorProfile] = await db
          .insert(doctorsTable)
          .values(docPayload as any)
          .returning();
        doctorProfile = newDoctorProfile;
      }

      doctorRecordId = doctorProfile.id;
    }

    const bookingReference = `SSD-${Math.floor(100000 + Math.random() * 900000)}`;
    const isVideo = formData.mode === "video";
    const isCash = formData.paymentMethod === "cash";
    const endTime = calculateEndTime(
      formData.timeSlot,
      config.slotDurationMinutes || 30
    );

    // 5. Insert appointment
    await db.insert(appointments).values({
      patientId: patientRecordId,
      doctorId: doctorRecordId,
      bookingReference: bookingReference,
      appointmentDate: targetDate,
      startTime: formData.timeSlot,
      endTime: endTime,
      appointmentType: isVideo ? "VIDEO" : "IN_CLINIC",
      status: isCash ? "CONFIRMED" : "PENDING",
      paymentStatus: "UNPAID",
      reason: formData.isEmergency
        ? `EMERGENCY ${isVideo ? "Video" : "In-Clinic"} Consultation`
        : isVideo
        ? "Online Video Consultation"
        : "Odontogram & Screening",
      notes: `${isCash ? "Pay Cash at Clinic" : "Online Payment"}${
        formData.isEmergency ? " • Emergency Override Slot" : ""
      }`,
    } as any);

    revalidatePath("/patient/dashboard");
    revalidatePath("/doctor/dashboard");
    return { success: true };
  } catch (dbError: any) {
    const pgError = dbError?.cause || dbError;
    console.error("BOOKING ACTION ERROR:", {
      message: pgError?.message || dbError?.message,
      detail: pgError?.detail,
      code: pgError?.code,
    });
    return {
      success: false,
      error: pgError?.message || dbError?.message || "Database insertion failed",
    };
  }
}