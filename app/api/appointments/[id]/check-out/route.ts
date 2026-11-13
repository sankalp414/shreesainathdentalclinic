import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  appointments,
  appointmentCheckins,
  appointmentStatusHistory,
  payments,
} from "@/db/schema";
import  requireApiRole  from "@/lib/auth/rbac";
import { eq } from "drizzle-orm";

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const staffUser = await requireApiRole(["DOCTOR", "ADMIN"]);
    const body = await req.json().catch(() => ({}));
    const collectDeskPayment = Boolean(body.collectDeskPayment);

    const [appointment] = await db
      .select()
      .from(appointments)
      .where(eq(appointments.id, id))
      .limit(1);

    if (!appointment) {
      return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
    }

    if (appointment.status !== "COMPLETED") {
      return NextResponse.json(
        { error: "Doctor must mark the consultation COMPLETED before reception check-out." },
        { status: 400 }
      );
    }

    const updated = await db.transaction(async (tx) => {
      let finalPaymentStatus = appointment.paymentStatus;

      // If payment was not already completed online, record desk payment without double-charging
      if (appointment.paymentStatus !== "PAID" && collectDeskPayment) {
        await tx.insert(payments).values({
          appointmentId: appointment.id,
          patientId: appointment.patientId,
          amount: appointment.feePaise,
          currency: "INR",
          provider: "CLINIC_DESK",
          idempotencyKey: `desk_${appointment.id}`,
          paymentStatus: "PAID",
          receiptNumber: `DESK-${Date.now().toString().slice(-6)}`,
          paidAt: new Date(),
        });
        finalPaymentStatus = "PAID";
      }

      await tx
        .update(appointmentCheckins)
        .set({
          checkedOutAt: new Date(),
          checkedOutBy: staffUser.id,
        })
        .where(eq(appointmentCheckins.appointmentId, appointment.id));

      const [appt] = await tx
        .update(appointments)
        .set({
          status: "CHECKED_OUT",
          paymentStatus: finalPaymentStatus,
          updatedAt: new Date(),
        })
        .where(eq(appointments.id, appointment.id))
        .returning();

      await tx.insert(appointmentStatusHistory).values({
        appointmentId: appointment.id,
        previousStatus: "COMPLETED",
        newStatus: "CHECKED_OUT",
        changedByUserId: staffUser.id,
        note: `Patient checked out at reception (Payment: ${finalPaymentStatus})`,
      });

      return appt;
    });

    return NextResponse.json({ appointment: updated });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Check-out failed" },
      { status: 500 }
    );
  }
}