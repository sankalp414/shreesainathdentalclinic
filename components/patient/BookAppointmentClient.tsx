"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAppointmentSchema } from "@/lib/validations/appointment";
import { z } from "zod";
import {
  Building2,
  Video,
  CheckCircle2,
  ShieldAlert,
  Loader2,
} from "lucide-react";

type FormValues = z.infer<typeof createAppointmentSchema>;

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function BookAppointmentClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const defaultType =
    searchParams.get("type") === "VIDEO" ? "VIDEO" : "IN_CLINIC";

  const [selectedType, setSelectedType] = useState<"IN_CLINIC" | "VIDEO">(
    defaultType
  );
  const [treatments, setTreatments] = useState<any[]>([]);
  const [availableSlots, setAvailableSlots] = useState<
    { startTime: string; endTime: string; label: string }[]
  >([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<any | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const today = new Date().toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(createAppointmentSchema),
    defaultValues: {
      appointmentType: defaultType,
      appointmentDate: today,
      treatmentId: searchParams.get("treatmentId") || undefined,
      telemedicineConsent: true,
    },
  });

  const watchedDate = watch("appointmentDate");
  const watchedTreatmentId = watch("treatmentId");
  const watchedStartTime = watch("startTime");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    fetch("/api/treatments")
      .then((r) => r.json())
      .then((d) => setTreatments(d.treatments || []));
  }, []);

  useEffect(() => {
    if (!watchedDate) return;
    setLoadingSlots(true);
    setValue("startTime", "");
    const params = new URLSearchParams({
      date: watchedDate,
      type: selectedType,
    });
    if (watchedTreatmentId) params.set("treatmentId", watchedTreatmentId);

    fetch(`/api/availability?${params.toString()}`)
      .then((r) => r.json())
      .then((d) => setAvailableSlots(d.slots || []))
      .finally(() => setLoadingSlots(false));
  }, [watchedDate, selectedType, watchedTreatmentId, setValue]);

  const switchType = (t: "IN_CLINIC" | "VIDEO") => {
    setSelectedType(t);
    setValue("appointmentType", t);
    setServerError(null);
  };

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    setServerError(null);

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (!res.ok) {
        setServerError(data.error || "Could not reserve appointment slot.");
        setSubmitting(false);
        return;
      }

      const appointment = data.appointment;

      if (values.appointmentType === "IN_CLINIC") {
        setConfirmedBooking(appointment);
        setSubmitting(false);
        return;
      }

      const orderRes = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appointmentId: appointment.id }),
      });
      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        setServerError(orderData.error || "Payment initialization failed.");
        setSubmitting(false);
        return;
      }

      const rzp = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Shree Sainath Dental Clinic",
        description: `Video Consultation (${orderData.bookingReference})`,
        order_id: orderData.orderId,
        prefill: {
          name: values.fullName,
          email: values.email,
          contact: values.phone,
        },
        theme: { color: "#123B5D" },
        handler: async function (response: any) {
          const verifyRes = await fetch("/api/payments/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              appointmentId: appointment.id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });
          const verifyData = await verifyRes.json();
          if (verifyRes.ok && verifyData.verified) {
            setConfirmedBooking(verifyData.appointment);
          } else {
            setServerError(
              verifyData.error || "Payment verification failed."
            );
          }
          setSubmitting(false);
        },
        modal: {
          ondismiss: function () {
            setServerError("Payment was not completed.");
            setSubmitting(false);
          },
        },
      });

      rzp.open();
    } catch (e: any) {
      setServerError(e?.message || "Unexpected booking error");
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text pb-16">
      {confirmedBooking ? (
        <div className="mx-auto max-w-2xl px-4 py-12">
          <div className="rounded-3xl border border-brand-accent/40 bg-white p-8 shadow-elevated space-y-6">
            <div className="flex items-center gap-3 text-brand-accent">
              <CheckCircle2 className="h-8 w-8" />
              <div>
                <span className="text-xs font-bold uppercase tracking-wider">
                  Booking Reference: {confirmedBooking.bookingReference}
                </span>
                <h1 className="text-2xl font-bold text-brand-primary">
                  {confirmedBooking.appointmentType === "VIDEO"
                    ? "Video Consultation Confirmed & Paid"
                    : "Clinic Appointment Registered"}
                </h1>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 rounded-2xl bg-brand-warm p-5 text-sm">
              <div>
                <span className="text-xs text-brand-text/60">Date</span>
                <p className="font-bold text-brand-primary">
                  {confirmedBooking.appointmentDate}
                </p>
              </div>
              <div>
                <span className="text-xs text-brand-text/60">Time Slot</span>
                <p className="font-bold text-brand-primary">
                  {confirmedBooking.startTime.slice(0, 5)} –{" "}
                  {confirmedBooking.endTime.slice(0, 5)}
                </p>
              </div>
              <div>
                <span className="text-xs text-brand-text/60">Status</span>
                <p className="font-bold text-brand-accent">
                  {confirmedBooking.status}
                </p>
              </div>
              <div>
                <span className="text-xs text-brand-text/60">Payment</span>
                <p className="font-bold text-brand-primary">
                  {confirmedBooking.paymentStatus} (₹
                  {(confirmedBooking.feePaise / 100).toFixed(0)})
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => router.push("/patient/dashboard")}
                className="rounded-xl bg-brand-primary px-6 py-3 text-xs font-semibold text-white"
              >
                Open Patient Dashboard
              </button>
              {confirmedBooking.appointmentType === "VIDEO" && (
                <button
                  type="button"
                  onClick={() =>
                    router.push(
                      `/patient/video-consultation/${confirmedBooking.id}`
                    )
                  }
                  className="rounded-xl bg-brand-accent px-6 py-3 text-xs font-semibold text-white"
                >
                  Open Virtual Waiting Room
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-5xl px-4 py-10">
          <h1 className="text-3xl font-bold text-brand-primary">
            Schedule Your Consultation
          </h1>
          <p className="mt-1 text-sm text-brand-text/75">
            Choose between an in-person clinic visit or an encrypted online video
            consultation with Dr. Nitu Rajpoot.
          </p>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <button
              type="button"
              onClick={() => switchType("IN_CLINIC")}
              className={`text-left rounded-2xl border-2 p-6 transition ${
                selectedType === "IN_CLINIC"
                  ? "border-brand-primary bg-brand-secondary/50 shadow-card"
                  : "border-brand-secondary bg-white hover:border-brand-primary/40"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-primary text-white">
                  <Building2 className="h-5 w-5 text-brand-accent" />
                </span>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-brand-primary border border-brand-secondary">
                  In-Person Visit
                </span>
              </div>
              <h2 className="mt-4 text-lg font-bold text-brand-primary">
                Physical Consultation
              </h2>
              <ul className="mt-2 space-y-1 text-xs text-brand-text/80">
                <li>• Visit Shree Sainath Dental Clinic in person</li>
                <li>• Select treatment, date & real-time slot</li>
                <li>• Complete quick QR or reception check-in on arrival</li>
              </ul>
            </button>

            <button
              type="button"
              onClick={() => switchType("VIDEO")}
              className={`text-left rounded-2xl border-2 p-6 transition ${
                selectedType === "VIDEO"
                  ? "border-brand-accent bg-brand-secondary/50 shadow-card"
                  : "border-brand-secondary bg-white hover:border-brand-accent/40"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-accent text-white">
                  <Video className="h-5 w-5" />
                </span>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-brand-accent border border-brand-accent/30">
                  ₹700 Online Pre-Paid
                </span>
              </div>
              <h2 className="mt-4 text-lg font-bold text-brand-primary">
                Video Consultation
              </h2>
              <ul className="mt-2 space-y-1 text-xs text-brand-text/80">
                <li>• Consult Dr. Nitu Rajpoot live from home</li>
                <li>• Instant confirmation upon verified Razorpay payment</li>
                <li>• Private virtual waiting room + digital prescription</li>
              </ul>
            </button>
          </div>

          {serverError && (
            <div className="mt-6 flex items-center gap-3 rounded-xl border border-red-300 bg-red-50 p-4 text-xs font-medium text-red-800">
              <ShieldAlert className="h-5 w-5 shrink-0 text-red-600" />
              <span>{serverError}</span>
            </div>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 rounded-3xl border border-brand-secondary bg-white p-6 sm:p-8 shadow-card space-y-6"
          >
            {selectedType === "IN_CLINIC" && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-primary">
                  Select Dental Treatment
                </label>
                <select
                  {...register("treatmentId")}
                  className="mt-2 w-full rounded-xl border border-brand-secondary bg-brand-warm px-4 py-3 text-sm text-brand-primary focus:border-brand-primary focus:outline-none"
                >
                  <option value="">General Dental Consultation (₹500 - 30 mins)</option>
                  {treatments.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} — ₹{(t.pricePaise / 100).toLocaleString("en-IN")} (
                      {t.durationMinutes} mins)
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-primary">
                  Appointment Date
                </label>
                <input
                  type="date"
                  min={today}
                  {...register("appointmentDate")}
                  className="mt-2 w-full rounded-xl border border-brand-secondary bg-brand-warm px-4 py-3 text-sm text-brand-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-primary">
                  Available Time Slots
                </label>
                {loadingSlots ? (
                  <div className="mt-3 flex items-center gap-2 text-xs text-brand-text/70">
                    <Loader2 className="h-4 w-4 animate-spin text-brand-accent" />
                    Checking real-time schedule...
                  </div>
                ) : availableSlots.length === 0 ? (
                  <p className="mt-3 text-xs text-amber-700 bg-amber-50 p-3 rounded-xl">
                    No slots available on this date. Please select another date.
                  </p>
                ) : (
                  <div className="mt-2 grid grid-cols-3 gap-2 max-h-44 overflow-y-auto p-1">
                    {availableSlots.map((slot) => (
                      <button
                        type="button"
                        key={slot.startTime}
                        onClick={() =>
                          setValue("startTime", slot.startTime, {
                            shouldValidate: true,
                          })
                        }
                        className={`rounded-xl border py-2 px-2 text-xs font-semibold transition ${
                          watchedStartTime === slot.startTime
                            ? "border-brand-primary bg-brand-primary text-white"
                            : "border-brand-secondary bg-brand-warm text-brand-primary hover:border-brand-accent"
                        }`}
                      >
                        {slot.startTime.slice(0, 5)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="block text-xs font-semibold text-brand-primary">
                  Patient Full Name
                </label>
                <input
                  type="text"
                  {...register("fullName")}
                  placeholder="Aarav Sharma"
                  className="mt-1 w-full rounded-xl border border-brand-secondary px-4 py-2.5 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-brand-primary">
                  Phone Number (WhatsApp)
                </label>
                <input
                  type="tel"
                  {...register("phone")}
                  placeholder="+91 98765 43210"
                  className="mt-1 w-full rounded-xl border border-brand-secondary px-4 py-2.5 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-brand-primary">
                  Email Address
                </label>
                <input
                  type="email"
                  {...register("email")}
                  placeholder="patient@example.com"
                  className="mt-1 w-full rounded-xl border border-brand-secondary px-4 py-2.5 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-primary">
                Symptoms or Reason for Consultation
              </label>
              <textarea
                rows={3}
                {...register("reason")}
                placeholder="Describe tooth sensitivity, pain location, or cosmetic goals..."
                className="mt-1 w-full rounded-xl border border-brand-secondary px-4 py-2.5 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-2xl bg-brand-primary py-4 text-sm font-bold text-white shadow-elevated hover:bg-brand-primary/95 disabled:opacity-50 transition"
            >
              {submitting
                ? "Processing Reservation..."
                : selectedType === "VIDEO"
                ? "Proceed to Secure Razorpay Payment (₹700)"
                : "Confirm Physical Clinic Booking"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}