import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  appointments,
  appointmentStatusHistory,
  patients,
  doctors,
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
    const user = await requireApiRole(["PATIENT", "DOCTOR", "ADMIN"]);
    const body = await req.json().catch(() => ({}));

    const [appointment] = await db
      .select()
      .from(appointments)
      .where(eq(appointments.id, id))
      .limit(1);

    if (!appointment) {
      return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
    }

    if (user.role === "PATIENT") {
      const [patient] = await db
        .select()
        .from(patients)
        .where(eq(patients.userId, user.id))
        .limit(1);
      if (!patient || appointment.patientId !== patient.id) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
      if (!["PENDING", "CONFIRMED", "RESCHEDULE_REQUESTED"].includes(appointment.status)) {
        return NextResponse.json(
          { error: "Cannot cancel an active or completed consultation." },
          { status: 400 }
        );
      }
    }

    const updated = await db.transaction(async (tx) => {
      const [appt] = await tx
        .update(appointments)
        .set({
          status: "CANCELLED",
          queuePosition: null,
          cancellationReason: body.reason || `Cancelled by ${user.role}`,
          updatedAt: new Date(),
        })
        .where(eq(appointments.id, id))
        .returning();

      await tx.insert(appointmentStatusHistory).values({
        appointmentId: id,
        previousStatus: appointment.status,
        newStatus: "CANCELLED",
        changedByUserId: user.id,
        note: body.reason || `Cancelled by ${user.role}`,
      });

      return appt;
    });

    const [doctor] = await db
      .select()
      .from(doctors)
      .where(eq(doctors.id, updated.doctorId))
      .limit(1);

    if (doctor && user.role === "PATIENT") {
      await sendNotification({
        userId: doctor.userId,
        title: "Appointment Cancelled by Patient",
        body: `Booking ${updated.bookingReference} on ${updated.appointmentDate} was cancelled.`,
        type: "APPOINTMENT_CANCELLED",
        linkUrl: "/doctor/appointments",
      });
    }

    return NextResponse.json({ appointment: updated });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Cancellation failed" },
      { status: 500 }
    );
  }
}