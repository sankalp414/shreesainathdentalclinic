"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  updateClinicScheduleConfig,
  type ClinicScheduleConfig,
} from "@/app/actions/clinic-schedule";

export default function ClinicScheduleManager({
  initialConfig,
}: {
  initialConfig: ClinicScheduleConfig;
}) {
  const router = useRouter();
  const [config, setConfig] = useState<ClinicScheduleConfig>(initialConfig);
  const [newClosedDate, setNewClosedDate] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const res = await updateClinicScheduleConfig(config);
    if (res.success) {
      setMessage("Clinic schedule & rules updated successfully!");
      router.refresh();
    } else {
      setMessage("Failed to update settings.");
    }
    setSaving(false);
  };

  const addClosedDate = () => {
    if (!newClosedDate) return;
    if (!config.closedDates.includes(newClosedDate)) {
      setConfig({
        ...config,
        closedDates: [...config.closedDates, newClosedDate].sort(),
      });
    }
    setNewClosedDate("");
  };

  const removeClosedDate = (dateToRemove: string) => {
    setConfig({
      ...config,
      closedDates: config.closedDates.filter((d) => d !== dateToRemove),
    });
  };

  const toggleWeeklyOff = (dayIndex: number) => {
    const exists = config.weeklyOffDays.includes(dayIndex);
    const updatedDays = exists
      ? config.weeklyOffDays.filter((d) => d !== dayIndex)
      : [...config.weeklyOffDays, dayIndex];
    setConfig({ ...config, weeklyOffDays: updatedDays });
  };

  const daysOfWeek = [
    { label: "Sun", value: 0 },
    { label: "Mon", value: 1 },
    { label: "Tue", value: 2 },
    { label: "Wed", value: 3 },
    { label: "Thu", value: 4 },
    { label: "Fri", value: 5 },
    { label: "Sat", value: 6 },
  ];

  return (
    <form onSubmit={handleSave} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
          Practice Operations & Time Control
        </span>
        <h2 className="text-xl font-extrabold text-slate-900 mt-0.5">
          Clinic Hours, Lunch Breaks & Closures Manager
        </h2>
      </div>

      {message && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Start & End Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Clinic Start Time
            </label>
            <input
              type="text"
              value={config.startTime}
              onChange={(e) => setConfig({ ...config, startTime: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold"
              placeholder="10:00 AM"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Clinic Closing Time
            </label>
            <input
              type="text"
              value={config.endTime}
              onChange={(e) => setConfig({ ...config, endTime: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold"
              placeholder="08:00 PM"
              required
            />
          </div>
        </div>

        {/* Lunch Break Timings */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Lunch Start Time
            </label>
            <input
              type="text"
              value={config.lunchStart}
              onChange={(e) => setConfig({ ...config, lunchStart: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold"
              placeholder="01:30 PM"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Lunch End Time
            </label>
            <input
              type="text"
              value={config.lunchEnd}
              onChange={(e) => setConfig({ ...config, lunchEnd: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold"
              placeholder="04:30 PM"
              required
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
        {/* Consultation Mode Selector */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
            Allowed Consultation Mode for Slots
          </label>
          <select
            value={config.consultationType}
            onChange={(e) =>
              setConfig({
                ...config,
                consultationType: e.target.value as "IN_CLINIC_ONLY" | "BOTH",
              })
            }
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-bold bg-white"
          >
            <option value="BOTH">Both In-Clinic &amp; Video Consultation</option>
            <option value="IN_CLINIC_ONLY">In-Clinic Consultations Only</option>
          </select>
        </div>

        {/* Weekly Off Days */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
            Weekly Off Days
          </label>
          <div className="flex flex-wrap gap-2">
            {daysOfWeek.map((day) => {
              const isOff = config.weeklyOffDays.includes(day.value);
              return (
                <button
                  key={day.value}
                  type="button"
                  onClick={() => toggleWeeklyOff(day.value)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition ${
                    isOff
                      ? "bg-red-600 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {day.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Multiple Dates Closure & Emergency Override */}
      <div className="pt-4 border-t border-slate-100 space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
            Mark Specific / Multiple Dates as Closed
          </label>
          <div className="flex gap-2 max-w-md">
            <input
              type="date"
              value={newClosedDate}
              onChange={(e) => setNewClosedDate(e.target.value)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium flex-1"
            />
            <button
              type="button"
              onClick={addClosedDate}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl"
            >
              Add Date
            </button>
          </div>
        </div>

        {config.closedDates.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {config.closedDates.map((d) => (
              <span
                key={d}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-bold border border-red-200"
              >
                {d}
                <button
                  type="button"
                  onClick={() => removeClosedDate(d)}
                  className="text-red-500 hover:text-red-900 font-extrabold"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-3 pt-2">
          <input
            type="checkbox"
            id="emergencyOverride"
            checked={config.allowEmergencyOverride}
            onChange={(e) =>
              setConfig({ ...config, allowEmergencyOverride: e.target.checked })
            }
            className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="emergencyOverride" className="text-xs font-bold text-slate-800">
            Allow Emergency Override (Dr. Nitu can accept emergency consultations even on closed dates or weekly offs)
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-sm transition"
      >
        {saving ? "Saving Schedule Rules..." : "Save Clinic Operating Schedule"}
      </button>
    </form>
  );
}