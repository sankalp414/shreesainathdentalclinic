import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { db } from "@/lib/db";
import { appointments, patients, payments } from "@/db/schema";
import  requireApiRole  from "@/lib/auth/rbac";
import { and, eq } from "drizzle-orm";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  try {
    const user = await requireApiRole(["PATIENT"]);
    const { appointmentId } = await req.json();

    const [patient] = await db
      .select()
      .from(patients)
      .where(eq(patients.userId, user.id))
      .limit(1);

    const [appointment] = await db
      .select()
      .from(appointments)
      .where(
        and(
          eq(appointments.id, appointmentId),
          eq(appointments.patientId, patient.id)
        )
      )
      .limit(1);

    if (!appointment) {
      return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
    }

    if (appointment.paymentStatus === "PAID") {
      return NextResponse.json(
        { error: "Appointment is already paid" },
        { status: 400 }
      );
    }

    const idempotencyKey = `order_${appointment.id}_${appointment.feePaise}`;

    // Check if an unpaid pending order already exists for idempotency
    const [existingPayment] = await db
      .select()
      .from(payments)
      .where(eq(payments.idempotencyKey, idempotencyKey))
      .limit(1);

    if (existingPayment && existingPayment.providerOrderId) {
      return NextResponse.json({
        orderId: existingPayment.providerOrderId,
        amount: existingPayment.amount,
        currency: existingPayment.currency,
        bookingReference: appointment.bookingReference,
      });
    }

    const order = await razorpay.orders.create({
      amount: appointment.feePaise,
      currency: "INR",
      receipt: appointment.bookingReference,
      notes: {
        appointmentId: appointment.id,
        bookingReference: appointment.bookingReference,
      },
    });

    await db.insert(payments).values({
      appointmentId: appointment.id,
      patientId: patient.id,
      amount: appointment.feePaise,
      currency: "INR",
      provider: "RAZORPAY",
      providerOrderId: order.id,
      idempotencyKey,
      paymentStatus: "PENDING",
    });

    await db
      .update(appointments)
      .set({ paymentStatus: "PENDING", updatedAt: new Date() })
      .where(eq(appointments.id, appointment.id));

    return NextResponse.json({
      orderId: order.id,
      amount: appointment.feePaise,
      currency: "INR",
      bookingReference: appointment.bookingReference,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to create Razorpay order" },
      { status: 500 }
    );
  }
}