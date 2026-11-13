import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  appointments,
  appointmentCheckins,
  appointmentStatusHistory,
  doctors,
  patients,
  clinicSettings,
} from "@/db/schema";
import  requireApiRole  from "@/lib/auth/rbac";
import { sendNotification } from "@/lib/notifications";
import { and, eq, sql } from "drizzle-orm";

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const user = await requireApiRole(["PATIENT", "DOCTOR", "ADMIN"]);
    const body = await req.json().catch(() => ({}));
    const method = body.method || (user.role === "PATIENT" ? "SELF_CHECKIN" : "RECEPTION_MANUAL");

    const [appointment] = await db
      .select()
      .from(appointments)
      .where(eq(appointments.id, id))
      .limit(1);

    if (!appointment) {
      return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
    }

    if (appointment.appointmentType !== "IN_CLINIC") {
      return NextResponse.json(
        { error: "Only physical in-clinic appointments can be checked in at reception." },
        { status: 400 }
      );
    }

    if (user.role === "PATIENT") {
      const [settings] = await db.select().from(clinicSettings).limit(1);
      if (!settings?.allowSelfCheckIn) {
        return NextResponse.json(
          { error: "Self check-in is disabled. Please check in at reception." },
          { status: 403 }
        );
      }
      const [patient] = await db
        .select()
        .from(patients)
        .where(eq(patients.userId, user.id))
        .limit(1);
      if (!patient || appointment.patientId !== patient.id) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    }

    // Prevent duplicate check-ins
    const [existingCheckin] = await db
      .select()
      .from(appointmentCheckins)
      .where(eq(appointmentCheckins.appointmentId, appointment.id))
      .limit(1);

    if (existingCheckin || appointment.status === "CHECKED_IN") {
      return NextResponse.json(
        { error: "Patient is already checked in for this appointment." },
        { status: 409 }
      );
    }

    if (appointment.status !== "CONFIRMED") {
      return NextResponse.json(
        { error: `Only CONFIRMED appointments can be checked in (current: ${appointment.status}).` },
        { status: 400 }
      );
    }

    const result = await db.transaction(async (tx) => {
      // Determine next queue position for today
      const [maxQueueRow] = await tx
        .select({
          maxPos: sql<number>`COALESCE(MAX(${appointments.queuePosition}), 0)`,
        })
        .from(appointments)
        .where(
          and(
            eq(appointments.appointmentDate, appointment.appointmentDate),
            eq(appointments.status, "CHECKED_IN")
          )
        );

      const nextQueuePos = Number(maxQueueRow?.maxPos ?? 0) + 1;

      await tx.insert(appointmentCheckins).values({
        appointmentId: appointment.id,
        checkedInAt: new Date(),
        checkedInBy: user.id,
        checkInMethod: method,
      });

      const [updated] = await tx
        .update(appointments)
        .set({
          status: "CHECKED_IN",
          queuePosition: nextQueuePos,
          updatedAt: new Date(),
        })
        .where(eq(appointments.id, appointment.id))
        .returning();

      await tx.insert(appointmentStatusHistory).values({
        appointmentId: appointment.id,
        previousStatus: "CONFIRMED",
        newStatus: "CHECKED_IN",
        changedByUserId: user.id,
        note: `Checked in via ${method} (Queue #${nextQueuePos})`,
      });

      return updated;
    });

    const [doctor] = await db
      .select()
      .from(doctors)
      .where(eq(doctors.id, appointment.doctorId))
      .limit(1);

    if (doctor) {
      await sendNotification({
        userId: doctor.userId,
        title: "Patient Checked In & Waiting",
        body: `Booking ${appointment.bookingReference} checked in (Queue #${result.queuePosition}).`,
        type: "PATIENT_CHECKED_IN",
        linkUrl: `/doctor/dashboard`,
      });
    }

    return NextResponse.json({ appointment: result });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Check-in failed" },
      { status: 500 }
    );
  }
}