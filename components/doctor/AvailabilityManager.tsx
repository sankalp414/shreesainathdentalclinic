// components/doctor/AvailabilityManager.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function AvailabilityManager({
  schedules,
  blocks,
}: {
  schedules: any[];
  blocks: any[];
}) {
  const router = useRouter();
  const [blockedDate, setBlockedDate] = useState("");
  const [reason, setReason] = useState("Clinic Holiday");

  const addHoliday = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blockedDate) return;
    await fetch("/api/doctor/availability", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "ADD_BLOCK",
        blockedDate,
        reason,
      }),
    });
    setBlockedDate("");
    router.refresh();
  };

  return (
    <div className="space-y-8 text-xs">
      <div className="rounded-3xl border border-brand-secondary bg-white p-6 shadow-card space-y-4">
        <h2 className="text-base font-bold text-brand-primary">
          Weekly Consultation Timings
        </h2>
        <div className="divide-y divide-brand-secondary">
          {schedules.map((s) => (
            <div
              key={s.id}
              className="py-3 flex flex-wrap items-center justify-between gap-4"
            >
              <span className="font-bold text-brand-primary w-28">
                {DAYS[s.dayOfWeek]}
              </span>
              <span>
                Hours: <strong>{s.startTime.slice(0, 5)}</strong> –{" "}
                <strong>{s.endTime.slice(0, 5)}</strong>
              </span>
              <span>
                Break: <strong>{s.breakStartTime?.slice(0, 5) || "None"}</strong>{" "}
                – <strong>{s.breakEndTime?.slice(0, 5) || ""}</strong>
              </span>
              <span>Slot: {s.slotDurationMinutes}m</span>
            </div>
          ))}
        </div>
      </div>

      <form
        onSubmit={addHoliday}
        className="rounded-3xl border border-brand-secondary bg-white p-6 shadow-card space-y-4"
      >
        <h2 className="text-base font-bold text-brand-primary">
          Block Date / Add Clinic Holiday
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          <input
            type="date"
            value={blockedDate}
            onChange={(e) => setBlockedDate(e.target.value)}
            className="rounded-xl border border-brand-secondary px-3 py-2"
          />
          <input
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Reason for holiday/block"
            className="rounded-xl border border-brand-secondary px-3 py-2"
          />
          <button
            type="submit"
            className="rounded-xl bg-brand-primary px-4 py-2 font-bold text-white"
          >
            Block Full Day
          </button>
        </div>

        <div className="pt-4 space-y-2">
          {blocks.map((b) => (
            <div
              key={b.id}
              className="rounded-xl bg-brand-warm px-4 py-2 flex justify-between"
            >
              <span className="font-bold text-brand-primary">
                {b.blockedDate}
              </span>
              <span>{b.reason}</span>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}