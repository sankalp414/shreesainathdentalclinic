import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  appointments,
  appointmentStatusHistory,
  patients,
  doctors,
  treatments,
  clinicSettings,
  users,
} from "@/db/schema";
import  requireApiRole  from "@/lib/auth/rbac";
import { createAppointmentSchema } from "@/lib/validations/appointment";
import { sendNotification } from "@/lib/notifications";
import { and, eq, notInArray, desc } from "drizzle-orm";

function addMinutesToTime(timeStr: string, mins: number): string {
  const [h, m] = timeStr.split(":").map(Number);
  const total = h * 60 + m + mins;
  const nh = Math.floor(total / 60)
    .toString()
    .padStart(2, "0");
  const nm = (total % 60).toString().padStart(2, "0");
  return `${nh}:${nm}:00`;
}

function toMins(t: string) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

export async function GET() {
  try {
    const user = await requireApiRole(["PATIENT", "DOCTOR", "ADMIN"]);

    if (user.role === "PATIENT") {
      const [patient] = await db
        .select()
        .from(patients)
        .where(eq(patients.userId, user.id))
        .limit(1);
      if (!patient) return NextResponse.json({ appointments: [] });

      const rows = await db
        .select()
        .from(appointments)
        .where(eq(appointments.patientId, patient.id))
        .orderBy(desc(appointments.appointmentDate), desc(appointments.startTime));
      return NextResponse.json({ appointments: rows });
    }

    const rows = await db
      .select()
      .from(appointments)
      .orderBy(desc(appointments.appointmentDate), desc(appointments.startTime));
    return NextResponse.json({ appointments: rows });
  } catch (err) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await requireApiRole(["PATIENT", "DOCTOR", "ADMIN"]);
    const body = await req.json();
    const parsed = createAppointmentSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const todayStr = new Date().toISOString().split("T")[0];
    if (data.appointmentDate < todayStr) {
      return NextResponse.json(
        { error: "Cannot book an appointment in the past." },
        { status: 400 }
      );
    }

    const [patient] = await db
      .select()
      .from(patients)
      .where(eq(patients.userId, user.id))
      .limit(1);

    if (!patient) {
      return NextResponse.json({ error: "Patient profile not found" }, { status: 404 });
    }

    // Update user contact info & telemedicine consent
    await db
      .update(users)
      .set({ fullName: data.fullName, phone: data.phone, updatedAt: new Date() })
      .where(eq(users.id, user.id));

    if (data.telemedicineConsent) {
      await db
        .update(patients)
        .set({ telemedicineConsent: true, updatedAt: new Date() })
        .where(eq(patients.id, patient.id));
    }

    const [doctor] = await db.select().from(doctors).limit(1);
    const [settings] = await db.select().from(clinicSettings).limit(1);

    let durationMinutes = doctor.defaultSlotDurationMinutes;
    let feePaise =
      data.appointmentType === "VIDEO"
        ? settings?.videoConsultationFeePaise ?? doctor.videoConsultationFeePaise
        : doctor.inClinicConsultationFeePaise;

    if (data.treatmentId) {
      const [treatment] = await db
        .select()
        .from(treatments)
        .where(eq(treatments.id, data.treatmentId))
        .limit(1);
      if (treatment) {
        durationMinutes = treatment.durationMinutes;
        if (data.appointmentType === "IN_CLINIC") {
          feePaise = treatment.pricePaise;
        }
      }
    }

    const normalizedStart =
      data.startTime.length === 5 ? `${data.startTime}:00` : data.startTime;
    const calculatedEnd = addMinutesToTime(normalizedStart, durationMinutes);

    // Execute inside an ACID database transaction to prevent double-booking
    const createdAppointment = await db.transaction(async (tx) => {
      const existingOnDate = await tx
        .select()
        .from(appointments)
        .where(
          and(
            eq(appointments.doctorId, doctor.id),
            eq(appointments.appointmentDate, data.appointmentDate),
            notInArray(appointments.status, ["CANCELLED", "REJECTED"])
          )
        );

      const reqStart = toMins(normalizedStart);
      const reqEnd = toMins(calculatedEnd);

      const hasOverlap = existingOnDate.some((existing) => {
        const exStart = toMins(existing.startTime);
        const exEnd = toMins(existing.endTime);
        return reqStart < exEnd && reqEnd > exStart;
      });

      if (hasOverlap) {
        throw new Error("SLOT_ALREADY_BOOKED");
      }

      const bookingRef = `SSD-${Date.now().toString().slice(-6)}-${Math.floor(
        10 + Math.random() * 89
      )}`;

      // For VIDEO consultations, status remains PENDING until Razorpay signature is verified on server
      // For IN_CLINIC, status follows clinic_settings.autoConfirmInClinic
      const initialStatus =
        data.appointmentType === "IN_CLINIC" && settings?.autoConfirmInClinic
          ? "CONFIRMED"
          : "PENDING";

      const [inserted] = await tx
        .insert(appointments)
        .values({
          bookingReference: bookingRef,
          patientId: patient.id,
          doctorId: doctor.id,
          treatmentId: data.treatmentId || null,
          appointmentType: data.appointmentType,
          appointmentDate: data.appointmentDate,
          startTime: normalizedStart,
          endTime: calculatedEnd,
          status: initialStatus,
          paymentStatus: "UNPAID",
          feePaise,
          reason: data.reason,
          notes: data.notes || null,
        })
        .returning();

      await tx.insert(appointmentStatusHistory).values({
        appointmentId: inserted.id,
        previousStatus: null,
        newStatus: initialStatus,
        changedByUserId: user.id,
        note: `Initial ${data.appointmentType} booking created`,
      });

      return inserted;
    });

    // Notify patient & doctor for IN_CLINIC bookings immediately (Video bookings notify after payment verification)
    if (createdAppointment.appointmentType === "IN_CLINIC") {
      await sendNotification({
        userId: user.id,
        title:
          createdAppointment.status === "CONFIRMED"
            ? "Appointment Confirmed"
            : "Appointment Request Received",
        body: `Your clinic visit (${createdAppointment.bookingReference}) on ${createdAppointment.appointmentDate} at ${createdAppointment.startTime.slice(0, 5)} is currently ${createdAppointment.status}.`,
        type: "APPOINTMENT_CREATED",
        linkUrl: `/patient/appointments`,
      });

      await sendNotification({
        userId: doctor.userId,
        title: "New In-Clinic Appointment Request",
        body: `${data.fullName} requested an appointment (${createdAppointment.bookingReference}) for ${createdAppointment.appointmentDate} at ${createdAppointment.startTime.slice(0, 5)}.`,
        type: "DOCTOR_NEW_BOOKING",
        linkUrl: `/doctor/appointments`,
      });
    }

    return NextResponse.json({ appointment: createdAppointment }, { status: 201 });
  } catch (err: any) {
    if (err?.message === "SLOT_ALREADY_BOOKED") {
      return NextResponse.json(
        { error: "This time slot was just reserved. Please select another time." },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: err?.message || "Failed to create appointment" },
      { status: 500 }
    );
  }
}