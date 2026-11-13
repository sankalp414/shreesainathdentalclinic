// app/api/payments/[id]/refund/route.ts
import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { db } from "@/lib/db";
import { payments, refunds, appointments } from "@/db/schema";
import  requireApiRole  from "@/lib/auth/rbac";
import { eq } from "drizzle-orm";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const adminUser = await requireApiRole(["ADMIN", "DOCTOR"]);
    const { reason } = await req.json();

    const [payment] = await db
      .select()
      .from(payments)
      .where(eq(payments.id, id))
      .limit(1);

    if (!payment || payment.paymentStatus !== "PAID") {
      return NextResponse.json(
        { error: "Only PAID transactions can be refunded." },
        { status: 400 }
      );
    }

    let providerRefundId = `manual_rfnd_${Date.now()}`;
    if (payment.provider === "RAZORPAY" && payment.providerPaymentId) {
      const rzpRefund = await razorpay.payments.refund(
        payment.providerPaymentId,
        { amount: payment.amount }
      );
      providerRefundId = rzpRefund.id;
    }

    await db.transaction(async (tx) => {
      await tx.insert(refunds).values({
        paymentId: payment.id,
        amountPaise: payment.amount,
        providerRefundId,
        reason: reason || "Technical or schedule cancellation refund",
        processedByUserId: adminUser.id,
      });

      await tx
        .update(payments)
        .set({ paymentStatus: "REFUNDED", refundedAt: new Date() })
        .where(eq(payments.id, payment.id));

      await tx
        .update(appointments)
        .set({ paymentStatus: "REFUNDED", updatedAt: new Date() })
        .where(eq(appointments.id, payment.appointmentId));
    });

    return NextResponse.json({ refunded: true, providerRefundId });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Refund processing failed" },
      { status: 500 }
    );
  }
}