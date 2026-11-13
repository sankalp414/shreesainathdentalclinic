"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";

export function PatientAppointmentActions({
  appointments,
}: {
  appointments: any[];
}) {
  const router = useRouter();
  const [qrAppt, setQrAppt] = useState<any | null>(null);

  const handleSelfCheckIn = async (id: string) => {
    const res = await fetch(`/api/appointments/${id}/check-in`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ method: "SELF_CHECKIN" }),
    });
    const data = await res.json();
    if (!res.ok) {
      alert(data.error || "Check-in not available");
      return;
    }
    router.refresh();
  };

  const handleCancel = async (id: string) => {
    const res = await fetch(`/api/appointments/${id}/cancel`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reason: "Cancelled by patient from portal" }),
    });
    if (res.ok) router.refresh();
  };

  return (
    <div className="space-y-4">
      {appointments.map((a) => (
        <div
          key={a.id}
          className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-brand-secondary p-4"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-brand-primary">
                {a.bookingReference}
              </span>
              <span className="rounded-full bg-brand-secondary px-2.5 py-0.5 text-[11px] font-bold text-brand-primary">
                {a.appointmentType}
              </span>
              <span className="rounded-full bg-brand-accent/15 px-2.5 py-0.5 text-[11px] font-bold text-brand-accent">
                {a.status}
              </span>
              {a.queuePosition && (
                <span className="rounded-full bg-brand-primary px-2.5 py-0.5 text-[11px] font-bold text-white">
                  Waiting Queue #{a.queuePosition}
                </span>
              )}
            </div>
            <p className="text-xs text-brand-text/80">
              Date: <strong>{a.appointmentDate}</strong> | Time:{" "}
              <strong>{a.startTime.slice(0, 5)}</strong> | Payment:{" "}
              <strong>{a.paymentStatus}</strong> (₹{(a.feePaise / 100).toFixed(0)})
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {a.appointmentType === "IN_CLINIC" && a.status === "CONFIRMED" && (
              <>
                <button
                  onClick={() => setQrAppt(a)}
                  className="rounded-xl border border-brand-primary px-3.5 py-2 text-xs font-bold text-brand-primary"
                >
                  Show Reception QR
                </button>
                <button
                  onClick={() => handleSelfCheckIn(a.id)}
                  className="rounded-xl bg-brand-accent px-3.5 py-2 text-xs font-bold text-white"
                >
                  Arrived — Self Check-In
                </button>
              </>
            )}

            {a.appointmentType === "VIDEO" &&
              a.paymentStatus === "PAID" &&
              ["CONFIRMED", "IN_PROGRESS"].includes(a.status) && (
                <button
                  onClick={() =>
                    router.push(`/patient/video-consultation/${a.id}`)
                  }
                  className="rounded-xl bg-brand-accent px-4 py-2 text-xs font-bold text-white"
                >
                  Join Video Consultation
                </button>
              )}

            {["PENDING", "CONFIRMED"].includes(a.status) && (
              <button
                onClick={() => handleCancel(a.id)}
                className="rounded-xl border border-red-200 px-3 py-2 text-xs font-semibold text-red-700"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      ))}

      {qrAppt && (
        <div className="rounded-2xl border-2 border-brand-primary bg-brand-warm p-6 flex flex-col items-center space-y-3">
          <h3 className="text-sm font-bold text-brand-primary">
            Show QR Pass at Shree Sainath Reception ({qrAppt.bookingReference})
          </h3>
          <QRCodeSVG
            value={JSON.stringify({
              appointmentId: qrAppt.id,
              bookingReference: qrAppt.bookingReference,
            })}
            size={160}
          />
          <button
            onClick={() => setQrAppt(null)}
            className="text-xs font-bold text-brand-primary underline"
          >
            Close QR Pass
          </button>
        </div>
      )}
    </div>
  );
}