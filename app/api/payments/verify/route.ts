import { NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/db";
import {
  appointments,
  appointmentStatusHistory,
  payments,
  doctors,
} from "@/db/schema";
import  requireApiRole  from "@/lib/auth/rbac";
import { sendNotification } from "@/lib/notifications";
import { provisionDailyRoom } from "@/lib/video/daily";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const user = await requireApiRole(["PATIENT"]);
    const {
      appointmentId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = await req.json();

    const secret = process.env.RAZORPAY_KEY_SECRET!;
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      await db
        .update(payments)
        .set({ paymentStatus: "FAILED" })
        .where(eq(payments.providerOrderId, razorpay_order_id));

      await db
        .update(appointments)
        .set({ paymentStatus: "FAILED", updatedAt: new Date() })
        .where(eq(appointments.id, appointmentId));

      return NextResponse.json(
        { error: "Invalid payment signature verification" },
        { status: 400 }
      );
    }

    // Idempotent check: if already marked PAID, return immediately
    const [paymentRecord] = await db
      .select()
      .from(payments)
      .where(eq(payments.providerOrderId, razorpay_order_id))
      .limit(1);

    if (paymentRecord?.paymentStatus === "PAID") {
      const [existingAppt] = await db
        .select()
        .from(appointments)
        .where(eq(appointments.id, appointmentId))
        .limit(1);
      return NextResponse.json({ verified: true, appointment: existingAppt });
    }

    // Provision private Daily.co room for VIDEO consultation
    const roomData = await provisionDailyRoom(appointmentId);

    const updatedAppt = await db.transaction(async (tx) => {
      await tx
        .update(payments)
        .set({
          providerPaymentId: razorpay_payment_id,
          providerSignature: razorpay_signature,
          paymentStatus: "PAID",
          receiptNumber: `RCPT-${Date.now().toString().slice(-6)}`,
          paidAt: new Date(),
        })
        .where(eq(payments.providerOrderId, razorpay_order_id));

      const [appt] = await tx
        .update(appointments)
        .set({
          paymentStatus: "PAID",
          status: "CONFIRMED",
          videoRoomName: roomData.name,
          videoRoomUrl: roomData.url,
          updatedAt: new Date(),
        })
        .where(eq(appointments.id, appointmentId))
        .returning();

      await tx.insert(appointmentStatusHistory).values({
        appointmentId: appt.id,
        previousStatus: "PENDING",
        newStatus: "CONFIRMED",
        changedByUserId: user.id,
        note: `Confirmed after verified Razorpay payment (${razorpay_payment_id})`,
      });

      return appt;
    });

    const [doctor] = await db
      .select()
      .from(doctors)
      .where(eq(doctors.id, updatedAppt.doctorId))
      .limit(1);

    await sendNotification({
      userId: user.id,
      title: "Video Consultation Confirmed & Paid",
      body: `Payment of ₹${(updatedAppt.feePaise / 100).toFixed(2)} verified for booking ${updatedAppt.bookingReference} on ${updatedAppt.appointmentDate} at ${updatedAppt.startTime.slice(0, 5)}.`,
      type: "PAYMENT_SUCCESS",
      linkUrl: `/patient/appointments`,
    });

    if (doctor) {
      await sendNotification({
        userId: doctor.userId,
        title: "New Paid Video Consultation",
        body: `Booking ${updatedAppt.bookingReference} is confirmed for ${updatedAppt.appointmentDate} at ${updatedAppt.startTime.slice(0, 5)}.`,
        type: "VIDEO_BOOKING_CONFIRMED",
        linkUrl: `/doctor/appointments`,
      });
    }

    return NextResponse.json({ verified: true, appointment: updatedAppt });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Payment verification failed" },
      { status: 500 }
    );
  }
}