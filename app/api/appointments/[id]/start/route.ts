import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  appointments,
  appointmentStatusHistory,
  consultations,
  patients,
} from "@/db/schema";
import  requireApiRole  from "@/lib/auth/rbac";
import { sendNotification } from "@/lib/notifications";
import { eq } from "drizzle-orm";

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const doctorUser = await requireApiRole(["DOCTOR", "ADMIN"]);

    const [appointment] = await db
      .select()
      .from(appointments)
      .where(eq(appointments.id, id))
      .limit(1);

    if (!appointment) {
      return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
    }

    const updated = await db.transaction(async (tx) => {
      const [appt] = await tx
        .update(appointments)
        .set({
          status: "IN_PROGRESS",
          patientAdmittedToVideo: true,
          updatedAt: new Date(),
        })
        .where(eq(appointments.id, appointment.id))
        .returning();

      await tx
        .insert(consultations)
        .values({
          appointmentId: appt.id,
          patientId: appt.patientId,
          doctorId: appt.doctorId,
          consultationType: appt.appointmentType,
          startedAt: new Date(),
        })
        .onConflictDoNothing();

      await tx.insert(appointmentStatusHistory).values({
        appointmentId: appt.id,
        previousStatus: appointment.status,
        newStatus: "IN_PROGRESS",
        changedByUserId: doctorUser.id,
        note: "Doctor started consultation",
      });

      return appt;
    });

    const [patient] = await db
      .select()
      .from(patients)
      .where(eq(patients.id, updated.patientId))
      .limit(1);

    if (patient) {
      await sendNotification({
        userId: patient.userId,
        title: "Consultation Started",
        body: `Dr. Nitu Rajpoot has started your consultation (${updated.bookingReference}).`,
        type: "CONSULTATION_STARTED",
        linkUrl:
          updated.appointmentType === "VIDEO"
            ? `/patient/video-consultation/${updated.id}`
            : `/patient/appointments`,
      });
    }

    return NextResponse.json({ appointment: updated });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to start consultation" },
      { status: 500 }
    );
  }
}