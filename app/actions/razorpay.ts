"use server";

import Razorpay from "razorpay";
import { ensureDatabaseSchema } from "@/lib/ensure-db-schema";

export async function createRazorpayOrder(data: {
  amount: number; // in INR (e.g. 300 for video consult or 500 for clinic)
  appointmentType: "IN_CLINIC" | "VIDEO_CONSULTATION";
  bookingReference: string;
}) {
  await ensureDatabaseSchema();

  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    // Return simulated order if keys aren't configured yet
    return {
      success: true,
      simulated: true,
      orderId: `order_sim_${Math.random().toString(36).substring(2, 10)}`,
      amount: data.amount * 100,
      currency: "INR",
    };
  }

  const razorpay = new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });

  try {
    const order = await razorpay.orders.create({
      amount: Math.round(data.amount * 100), // paise
      currency: "INR",
      receipt: data.bookingReference,
      notes: {
        appointmentType: data.appointmentType,
      },
    });

    return {
      success: true,
      simulated: false,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    };
  } catch (err: any) {
    console.error("Razorpay order error:", err);
    return { success: false, error: err?.message || "Payment gateway error" };
  }
}