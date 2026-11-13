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
import { and, eq, notInArray } from "drizzle-orm";

function addMins(t: string, m: number) {
  const [hh, mm] = t.split(":").map(Number);
  const total = hh * 60 + mm + m;
  return `${Math.floor(total / 60).toString().padStart(2, "0")}:${(total % 60)
    .toString()
    .padStart(2, "0")}:00`;
}

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const user = await requireApiRole(["PATIENT", "DOCTOR", "ADMIN"]);
    const { newDate, newStartTime } = await req.json();

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
    }

    const normalizedStart =
      newStartTime.length === 5 ? `${newStartTime}:00` : newStartTime;
    const newEndTime = addMins(normalizedStart, 30);

    const updated = await db.transaction(async (tx) => {
      const conflicts = await tx
        .select()
        .from(appointments)
        .where(
          and(
            eq(appointments.doctorId, appointment.doctorId),
            eq(appointments.appointmentDate, newDate),
            eq(appointments.startTime, normalizedStart),
            notInArray(appointments.status, ["CANCELLED", "REJECTED"])
          )
        );

      if (conflicts.some((c) => c.id !== appointment.id)) {
        throw new Error("Target slot is already booked");
      }

      const nextStatus =
        user.role === "PATIENT" ? "RESCHEDULE_REQUESTED" : "RESCHEDULED";

      const [appt] = await tx
        .update(appointments)
        .set({
          appointmentDate: newDate,
          startTime: normalizedStart,
          endTime: newEndTime,
          status: nextStatus,
          updatedAt: new Date(),
        })
        .where(eq(appointments.id, id))
        .returning();

      await tx.insert(appointmentStatusHistory).values({
        appointmentId: id,
        previousStatus: appointment.status,
        newStatus: nextStatus,
        changedByUserId: user.id,
        note: `Rescheduled to ${newDate} at ${normalizedStart.slice(0, 5)}`,
      });

      return appt;
    });

    const [doctor] = await db
      .select()
      .from(doctors)
      .where(eq(doctors.id, updated.doctorId))
      .limit(1);

    if (doctor) {
      await sendNotification({
        userId: doctor.userId,
        title: "Appointment Reschedule Request",
        body: `Booking ${updated.bookingReference} moved to ${newDate} at ${normalizedStart.slice(0, 5)}.`,
        type: "APPOINTMENT_RESCHEDULED",
        linkUrl: "/doctor/appointments",
      });
    }

    return NextResponse.json({ appointment: updated });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Reschedule failed" },
      { status: 400 }
    );
  }
}