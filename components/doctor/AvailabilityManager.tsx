// components/doctor/AvailabilityManager.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageContext";

export function AvailabilityManager({
  schedules,
  blocks,
}: {
  schedules: any[];
  blocks: any[];
}) {
  const router = useRouter();
  const { tr } = useLanguage();
  const [blockedDate, setBlockedDate] = useState("");
  const [reason, setReason] = useState("Clinic Holiday");

  const DAYS = [
    tr("Sunday", "रविवार"),
    tr("Monday", "सोमवार"),
    tr("Tuesday", "मंगलवार"),
    tr("Wednesday", "बुधवार"),
    tr("Thursday", "गुरुवार"),
    tr("Friday", "शुक्रवार"),
    tr("Saturday", "शनिवार"),
  ];

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
          {tr("Weekly Consultation Timings", "साप्ताहिक परामर्श समय")}
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
                {tr("Hours:", "समय:")}{" "}
                <strong>{s.startTime.slice(0, 5)}</strong> –{" "}
                <strong>{s.endTime.slice(0, 5)}</strong>
              </span>
              <span>
                {tr("Break:", "ब्रेक:")}{" "}
                <strong>
                  {s.breakStartTime?.slice(0, 5) || tr("None", "कोई नहीं")}
                </strong>{" "}
                – <strong>{s.breakEndTime?.slice(0, 5) || ""}</strong>
              </span>
              <span>
                {tr("Slot:", "स्लॉट:")} {s.slotDurationMinutes}
                {tr("m", " मि.")}
              </span>
            </div>
          ))}
        </div>
      </div>

      <form
        onSubmit={addHoliday}
        className="rounded-3xl border border-brand-secondary bg-white p-6 shadow-card space-y-4"
      >
        <h2 className="text-base font-bold text-brand-primary">
          {tr(
            "Block Date / Add Clinic Holiday",
            "तारीख ब्लॉक करें / क्लिनिक अवकाश जोड़ें"
          )}
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
            placeholder={tr(
              "Reason for holiday/block",
              "अवकाश / ब्लॉक का कारण"
            )}
            className="rounded-xl border border-brand-secondary px-3 py-2"
          />
          <button
            type="submit"
            className="rounded-xl bg-brand-primary px-4 py-2 font-bold text-white"
          >
            {tr("Block Full Day", "पूरा दिन ब्लॉक करें")}
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
              <span>
                {b.reason === "Clinic Holiday"
                  ? tr("Clinic Holiday", "क्लिनिक अवकाश")
                  : b.reason}
              </span>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}