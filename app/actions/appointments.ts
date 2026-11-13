"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import * as schema from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { ensureDatabaseSchema } from "@/lib/ensure-db-schema";
import {
  generateConsultationMeetLink,
  sendBookingWhatsAppConfirmation,
} from "./whatsapp-meet";

const { users, patients, appointments } = schema;

export async function bookDentalAppointment(data: {
  appointmentDate: string; // YYYY-MM-DD
  startTime: string; // e.g. "10:30 AM"
  appointmentType: "IN_CLINIC" | "VIDEO_CONSULTATION";
  patientPhone: string;
  reason?: string;
}) {
  await ensureDatabaseSchema();

  const { userId } = await auth();
  const clerkUser = await currentUser();

  if (!userId || !clerkUser) {
    return { success: false, error: "Please sign in to book an appointment." };
  }

  const email =
    clerkUser.emailAddresses?.[0]?.emailAddress?.toLowerCase().trim() || "";
  const fullName =
    `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim() ||
    "Patient";

  // 1. Ensure user & patient profile exist
  let [dbUser] = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, userId))
    .limit(1);

  if (!dbUser && email) {
    [dbUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
  }

  if (!dbUser) {
    const [createdUser] = await db
      .insert(users)
      .values({
        clerkId: userId,
        email: email || `shreesainathdental.com`,
        fullName,
        phone: data.patientPhone,
        role: "PATIENT",
      } as any)
      .returning();
    dbUser = createdUser;
  }

  // 2. Resolve Dr. Nitu's Doctor User ID (or create a default Doctor record if none exists yet)
  let [doctorUser] = await db
    .select()
    .from(users)
    .where(eq(users.role, "DOCTOR"))
    .limit(1);

  const resolvedDoctorId = doctorUser?.id || dbUser.id;

  let [patientProfile] = await db
    .select()
    .from(patients)
    .where(eq(patients.userId, dbUser.id))
    .limit(1);

  if (!patientProfile) {
    const [createdProfile] = await db
      .insert(patients)
      .values({
        userId: dbUser.id,
        patientCode: `PAT-${Math.floor(100000 + Math.random() * 900000)}`,
        phone: data.patientPhone,
        telemedicineConsent: true,
        odontogramData: {},
      } as any)
      .returning();
    patientProfile = createdProfile;
  } else if (data.patientPhone && patientProfile.phone !== data.patientPhone) {
    await db
      .update(patients)
      .set({ phone: data.patientPhone } as any)
      .where(eq(patients.id, patientProfile.id));
  }

  // 3. Generate Booking Reference & Google Meet Link (if Video Consultation)
  const bookingReference = `SSD-${Math.floor(100000 + Math.random() * 900000)}`;
  const isVideo = data.appointmentType === "VIDEO_CONSULTATION";
  const meetLink = isVideo
    ? await generateConsultationMeetLink(bookingReference)
    : null;

  const formattedDateLabel = new Date(data.appointmentDate).toLocaleDateString(
    "en-IN",
    {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );

  // 4. Dispatch WhatsApp Confirmation + Google Meet link
  const whatsappResult = await sendBookingWhatsAppConfirmation({
    patientPhone: data.patientPhone,
    patientName: fullName,
    bookingReference,
    appointmentDateLabel: formattedDateLabel,
    slotTime: data.startTime,
    appointmentType: data.appointmentType,
    meetLink,
  });

  // 5. Save Appointment in Neon DB (including doctorId)
  const [insertedAppointment] = await db
    .insert(appointments)
    .values({
      patientId: patientProfile.id,
      doctorId: resolvedDoctorId,
      bookingReference,
      appointmentDate: new Date(data.appointmentDate),
      startTime: data.startTime,
      endTime: "30 Mins",
      appointmentType: data.appointmentType,
      patientPhone: data.patientPhone,
      meetLink,
      whatsappSent: whatsappResult.sent,
      status: "CONFIRMED",
      reason: data.reason || "Dental Consultation",
      hasReviewed: false,
    } as any)
    .returning();

  revalidatePath("/patient/dashboard");
  revalidatePath("/doctor/dashboard");

  return {
    success: true,
    appointment: insertedAppointment,
    meetLink,
    whatsappSent: whatsappResult.sent,
    whatsappPreview: whatsappResult.messagePreview,
  };
}