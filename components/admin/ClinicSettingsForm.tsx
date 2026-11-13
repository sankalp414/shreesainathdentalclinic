// components/admin/ClinicSettingsForm.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export function ClinicSettingsForm({ settings }: { settings: any }) {
  const router = useRouter();
  const [state, setState] = useState({
    clinicName: settings?.clinicName || "Shree Sainath Dental Clinic",
    phone: settings?.phone || "+91 98260 12345",
    email: settings?.email || "care@shreesainathdental.in",
    address: settings?.address || "",
    workingHoursText: settings?.workingHoursText || "",
    videoConsultationFeeInr: (settings?.videoConsultationFeePaise ?? 70000) / 100,
    autoConfirmInClinic: Boolean(settings?.autoConfirmInClinic),
    allowSelfCheckIn: Boolean(settings?.allowSelfCheckIn),
  });
  const [saved, setSaved] = useState(false);

  const saveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(false);
    const res = await fetch("/api/admin/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state),
    });
    if (res.ok) {
      setSaved(true);
      router.refresh();
    }
  };

  return (
    <form
      onSubmit={saveSettings}
      className="rounded-3xl border border-brand-secondary bg-white p-6 shadow-card space-y-4 text-xs"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="font-bold text-brand-primary">Clinic Name</label>
          <input
            value={state.clinicName}
            onChange={(e) => setState({ ...state, clinicName: e.target.value })}
            className="mt-1 w-full rounded-xl border px-3 py-2"
          />
        </div>
        <div>
          <label className="font-bold text-brand-primary">
            Video Consultation Fee (INR)
          </label>
          <input
            type="number"
            value={state.videoConsultationFeeInr}
            onChange={(e) =>
              setState({
                ...state,
                videoConsultationFeeInr: Number(e.target.value),
              })
            }
            className="mt-1 w-full rounded-xl border px-3 py-2"
          />
        </div>
      </div>

      <div>
        <label className="font-bold text-brand-primary">Clinic Address</label>
        <input
          value={state.address}
          onChange={(e) => setState({ ...state, address: e.target.value })}
          className="mt-1 w-full rounded-xl border px-3 py-2"
        />
      </div>

      <div className="flex items-center gap-6 pt-2">
        <label className="flex items-center gap-2 font-semibold text-brand-primary">
          <input
            type="checkbox"
            checked={state.autoConfirmInClinic}
            onChange={(e) =>
              setState({ ...state, autoConfirmInClinic: e.target.checked })
            }
          />
          Auto-Confirm Physical Bookings
        </label>

        <label className="flex items-center gap-2 font-semibold text-brand-primary">
          <input
            type="checkbox"
            checked={state.allowSelfCheckIn}
            onChange={(e) =>
              setState({ ...state, allowSelfCheckIn: e.target.checked })
            }
          />
          Enable Patient Self Check-In
        </label>
      </div>

      {saved && (
        <p className="font-bold text-brand-accent">
          Settings saved to Neon PostgreSQL.
        </p>
      )}

      <button
        type="submit"
        className="rounded-xl bg-brand-primary px-6 py-3 font-bold text-white"
      >
        Save Clinic Settings
      </button>
    </form>
  );
}