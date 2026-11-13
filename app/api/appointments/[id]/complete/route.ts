import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  appointments,
  appointmentStatusHistory,
  consultations,
  prescriptions,
  prescriptionItems,
  patients,
} from "@/db/schema";
import  requireApiRole  from "@/lib/auth/rbac";
import { completeConsultationSchema } from "@/lib/validations/appointment";
import { sendNotification } from "@/lib/notifications";
import { eq } from "drizzle-orm";

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const doctorUser = await requireApiRole(["DOCTOR"]);
    const body = await req.json();

    const parsed = completeConsultationSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid clinical summary payload", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const [appointment] = await db
      .select()
      .from(appointments)
      .where(eq(appointments.id, id))
      .limit(1);

    if (!appointment) {
      return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
    }

    const endedAt = new Date();

    const result = await db.transaction(async (tx) => {
      const [existingConsultation] = await tx
        .select()
        .from(consultations)
        .where(eq(consultations.appointmentId, appointment.id))
        .limit(1);

      const startedAt = existingConsultation?.startedAt ?? new Date(Date.now() - 20 * 60000);
      const durationMinutes = Math.max(
        1,
        Math.round((endedAt.getTime() - new Date(startedAt).getTime()) / 60000)
      );

      let consultationRecord;
      if (existingConsultation) {
        const [updatedCons] = await tx
          .update(consultations)
          .set({
            endedAt,
            duration: durationMinutes,
            diagnosis: data.diagnosis,
            clinicalNotes: data.clinicalNotes || null,
            summary: data.summary,
            followUpDate: data.followUpDate || null,
            followUpInstructions: data.followUpInstructions || null,
          })
          .where(eq(consultations.id, existingConsultation.id))
          .returning();
        consultationRecord = updatedCons;
      } else {
        const [createdCons] = await tx
          .insert(consultations)
          .values({
            appointmentId: appointment.id,
            patientId: appointment.patientId,
            doctorId: appointment.doctorId,
            consultationType: appointment.appointmentType,
            startedAt,
            endedAt,
            duration: durationMinutes,
            diagnosis: data.diagnosis,
            clinicalNotes: data.clinicalNotes || null,
            summary: data.summary,
            followUpDate: data.followUpDate || null,
            followUpInstructions: data.followUpInstructions || null,
          })
          .returning();
        consultationRecord = createdCons;
      }

      if (data.prescriptionItems && data.prescriptionItems.length > 0) {
        const [prescription] = await tx
          .insert(prescriptions)
          .values({
            consultationId: consultationRecord.id,
            appointmentId: appointment.id,
            patientId: appointment.patientId,
            doctorId: appointment.doctorId,
            generalInstructions: data.generalPrescriptionInstructions || null,
          })
          .returning();

        for (const item of data.prescriptionItems) {
          await tx.insert(prescriptionItems).values({
            prescriptionId: prescription.id,
            medicineName: item.medicineName,
            dosage: item.dosage,
            frequency: item.frequency,
            durationDays: item.durationDays,
            instructions: item.instructions || null,
          });
        }
      }

      const [updatedAppt] = await tx
        .update(appointments)
        .set({
          status: "COMPLETED",
          queuePosition: null,
          updatedAt: new Date(),
        })
        .where(eq(appointments.id, appointment.id))
        .returning();

      await tx.insert(appointmentStatusHistory).values({
        appointmentId: appointment.id,
        previousStatus: appointment.status,
        newStatus: "COMPLETED",
        changedByUserId: doctorUser.id,
        note: "Consultation completed with clinical summary & prescription",
      });

      return updatedAppt;
    });

    const [patient] = await db
      .select()
      .from(patients)
      .where(eq(patients.id, appointment.patientId))
      .limit(1);

    if (patient) {
      await sendNotification({
        userId: patient.userId,
        title: "Consultation Completed & Prescription Ready",
        body: `Your consultation summary and digital prescription for ${appointment.bookingReference} are now available in your dashboard.`,
        type: "CONSULTATION_COMPLETED",
        linkUrl: `/patient/prescriptions`,
      });
    }

    return NextResponse.json({ appointment: result });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to complete consultation" },
      { status: 500 }
    );
  }
}