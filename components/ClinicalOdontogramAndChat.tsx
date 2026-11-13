"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  updatePatientOdontogram,
  getPatientOdontogramById,
  getPatientChatMessages,
  sendClinicalChatMessage,
  type ToothCondition,
  type ToothRecord,
} from "@/app/actions/clinical-portal";

const UPPER_TEETH = [
  "18", "17", "16", "15", "14", "13", "12", "11",
  "21", "22", "23", "24", "25", "26", "27", "28",
];

const LOWER_TEETH = [
  "48", "47", "46", "45", "44", "43", "42", "41",
  "31", "32", "33", "34", "35", "36", "37", "38",
];

const CONDITION_STYLES: Record<
  ToothCondition,
  { label: string; badgeBg: string; toothBg: string; border: string }
> = {
  HEALTHY: {
    label: "Healthy Tooth",
    badgeBg: "bg-emerald-100 text-emerald-800",
    toothBg: "bg-emerald-50 text-emerald-900",
    border: "border-emerald-300",
  },
  CARIES: {
    label: "Caries / Cavity",
    badgeBg: "bg-red-100 text-red-800",
    toothBg: "bg-red-500 text-white",
    border: "border-red-600",
  },
  RCT: {
    label: "Root Canal (RCT)",
    badgeBg: "bg-purple-100 text-purple-800",
    toothBg: "bg-purple-600 text-white",
    border: "border-purple-700",
  },
  CROWN: {
    label: "Zirconia / Ceramic Crown",
    badgeBg: "bg-amber-100 text-amber-900",
    toothBg: "bg-amber-400 text-slate-900",
    border: "border-amber-500",
  },
  FILLING: {
    label: "Composite Filling",
    badgeBg: "bg-blue-100 text-blue-800",
    toothBg: "bg-blue-600 text-white",
    border: "border-blue-700",
  },
  MISSING: {
    label: "Extracted / Missing",
    badgeBg: "bg-slate-200 text-slate-700",
    toothBg: "bg-slate-300 text-slate-500 line-through",
    border: "border-slate-400",
  },
};

function parseOdontogramProp(
  raw: Record<string, ToothRecord> | string | undefined | null
): Record<string, ToothRecord> {
  if (!raw) return {};
  if (typeof raw === "string") {
    try {
      return JSON.parse(raw);
    } catch {
      return {};
    }
  }
  return raw;
}

export function InteractiveOdontogram({
  patientId,
  initialOdontogram,
  initialMedicalHistory = "",
  editable = false,
}: {
  patientId: string | number;
  initialOdontogram?: Record<string, ToothRecord> | string;
  initialMedicalHistory?: string;
  editable?: boolean;
}) {
  const router = useRouter();

  const [chart, setChart] = useState<Record<string, ToothRecord>>(() =>
    parseOdontogramProp(initialOdontogram)
  );
  const [selectedTooth, setSelectedTooth] = useState<string>("16");
  const [medicalHistory, setMedicalHistory] = useState<string>(
    initialMedicalHistory || ""
  );
  const [saving, setSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [savedToast, setSavedToast] = useState<string | null>(null);
  const [errorToast, setErrorToast] = useState<string | null>(null);

  // Fetch fresh Odontogram from Neon DB whenever the selected patientId changes
  const syncLatestFromDb = useCallback(async () => {
    if (!patientId) return;
    const latest = await getPatientOdontogramById(patientId);
    setChart(parseOdontogramProp(latest.odontogramData));
    setMedicalHistory(latest.medicalHistory || "");
    setHasUnsavedChanges(false);
  }, [patientId]);

  useEffect(() => {
    syncLatestFromDb();
  }, [syncLatestFromDb]);

  // If read-only (Patient Portal), auto-refresh every 6 seconds so Doctor updates appear live
  useEffect(() => {
    if (editable) return;
    const interval = setInterval(syncLatestFromDb, 6000);
    return () => clearInterval(interval);
  }, [editable, syncLatestFromDb]);

  const activeRecord: ToothRecord = chart[selectedTooth] || {
    status: "HEALTHY",
    notes: "",
  };

  const handleConditionChange = (status: ToothCondition) => {
    if (!editable) return;
    setHasUnsavedChanges(true);
    setSavedToast(null);
    setErrorToast(null);
    setChart((prev) => ({
      ...prev,
      [selectedTooth]: {
        status,
        notes: prev[selectedTooth]?.notes || "",
        updatedAt: new Date().toISOString().split("T")[0],
      },
    }));
  };

  const handleNoteChange = (notes: string) => {
    if (!editable) return;
    setHasUnsavedChanges(true);
    setSavedToast(null);
    setErrorToast(null);
    setChart((prev) => ({
      ...prev,
      [selectedTooth]: {
        status: prev[selectedTooth]?.status || "HEALTHY",
        notes,
        updatedAt: new Date().toISOString().split("T")[0],
      },
    }));
  };

  const handleSaveChart = async () => {
    if (!patientId) return;
    setSaving(true);
    setSavedToast(null);
    setErrorToast(null);

    const res = await updatePatientOdontogram({
      patientId,
      odontogramData: chart,
      medicalHistory,
    });

    setSaving(false);

    if (res.success) {
      setHasUnsavedChanges(false);
      setSavedToast(
        "✓ 32-Tooth Digital Odontogram & clinical notes saved to Neon DB!"
      );
      router.refresh();
      setTimeout(() => setSavedToast(null), 5000);
    } else {
      setErrorToast(res.error || "Failed to save Odontogram.");
    }
  };

  const renderArchRow = (teethList: string[], archTitle: string) => (
    <div className="space-y-2">
      <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center">
        {archTitle}
      </div>
      <div className="grid grid-cols-8 sm:grid-cols-16 gap-1.5">
        {teethList.map((toothNum) => {
          const rec = chart[toothNum] || { status: "HEALTHY" };
          const style = CONDITION_STYLES[rec.status] || CONDITION_STYLES.HEALTHY;
          const isSelected = selectedTooth === toothNum;

          return (
            <button
              key={toothNum}
              type="button"
              onClick={() => setSelectedTooth(toothNum)}
              className={`h-14 rounded-xl border-2 flex flex-col items-center justify-center transition cursor-pointer ${
                style.toothBg
              } ${style.border} ${
                isSelected ? "ring-4 ring-blue-500/40 scale-105 z-10" : ""
              }`}
            >
              <span className="text-xs font-extrabold">{toothNum}</span>
              <span className="text-[9px] font-bold opacity-85">
                {rec.status === "HEALTHY" ? "OK" : rec.status.slice(0, 4)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );

  const nonHealthyTeeth = Object.entries(chart).filter(
    ([, val]) => val && (val.status !== "HEALTHY" || val.notes?.trim())
  );

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
            FDI 32-Tooth Interactive Dental Chart
          </span>
          <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">
            {editable
              ? "Doctor Odontogram Editor & Tooth Diagnosis"
              : "My Digital Odontogram (Given by Dr. Nitu Rajpoot)"}
          </h3>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-1.5">
          {(Object.keys(CONDITION_STYLES) as ToothCondition[]).map((key) => (
            <span
              key={key}
              className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${CONDITION_STYLES[key].badgeBg}`}
            >
              {CONDITION_STYLES[key].label}
            </span>
          ))}
        </div>
      </div>

      {savedToast && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-extrabold">
          {savedToast}
        </div>
      )}

      {errorToast && (
        <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-extrabold">
          ⚠️ {errorToast}
        </div>
      )}

      {/* 32-Tooth Visual Grid */}
      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-6">
        {renderArchRow(
          UPPER_TEETH,
          "Maxillary Arch (Upper Jaw • Right 18–11 | Left 21–28)"
        )}
        <div className="border-t border-dashed border-slate-300" />
        {renderArchRow(
          LOWER_TEETH,
          "Mandibular Arch (Lower Jaw • Right 48–41 | Left 31–38)"
        )}
      </div>

      {/* Selected Tooth Inspector / Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-blue-50/50 p-5 rounded-2xl border border-blue-100">
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-blue-700 uppercase">
              Selected Tooth #{selectedTooth}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                CONDITION_STYLES[activeRecord.status]?.badgeBg ||
                CONDITION_STYLES.HEALTHY.badgeBg
              }`}
            >
              {CONDITION_STYLES[activeRecord.status]?.label || "Healthy Tooth"}
            </span>
          </div>

          {editable ? (
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">
                1. Click Condition for Tooth #{selectedTooth}:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {(Object.keys(CONDITION_STYLES) as ToothCondition[]).map(
                  (cond) => (
                    <button
                      key={cond}
                      type="button"
                      onClick={() => handleConditionChange(cond)}
                      className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                        activeRecord.status === cond
                          ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                          : "bg-white text-slate-700 border-slate-200 hover:border-blue-300"
                      }`}
                    >
                      {CONDITION_STYLES[cond].label.split(" ")[0]}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-600">
              Click any tooth above to view Dr. Nitu&apos;s specific clinical notes and restoration records.
            </p>
          )}
        </div>

        <div className="lg:col-span-7 space-y-3">
          <label className="block text-xs font-bold text-slate-700 uppercase">
            {editable
              ? `2. Doctor's Clinical Notes for Tooth #${selectedTooth}`
              : `Doctor's Clinical Notes for Tooth #${selectedTooth}`}
          </label>
          {editable ? (
            <textarea
              rows={2}
              value={activeRecord.notes || ""}
              onChange={(e) => handleNoteChange(e.target.value)}
              placeholder={`Enter diagnosis, cavity depth, RCT canal length, or crown shade for Tooth #${selectedTooth}...`}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          ) : (
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 min-h-[60px]">
              {activeRecord.notes?.trim()
                ? activeRecord.notes
                : "No clinical abnormalities or special notes recorded for this tooth."}
            </div>
          )}
        </div>
      </div>

      {/* Summary of All Treated / Flagged Teeth */}
      {nonHealthyTeeth.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">
            Recorded Dental Findings Summary ({nonHealthyTeeth.length} Teeth)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {nonHealthyTeeth.map(([tNum, info]) => (
              <div
                key={tNum}
                onClick={() => setSelectedTooth(tNum)}
                className="p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:border-blue-300 transition"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-900">
                    Tooth #{tNum}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      CONDITION_STYLES[info.status]?.badgeBg
                    }`}
                  >
                    {CONDITION_STYLES[info.status]?.label}
                  </span>
                </div>
                {info.notes && (
                  <p className="text-xs text-slate-600 mt-1">{info.notes}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {editable && (
        <div className="pt-2 flex items-center justify-between gap-4">
          <span className="text-xs font-bold text-amber-600">
            {hasUnsavedChanges
              ? "● You have unsaved tooth chart changes — click Save to persist."
              : "All tooth chart records are synced with Neon DB."}
          </span>

          <button
            type="button"
            disabled={saving}
            onClick={handleSaveChart}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white text-xs font-extrabold shadow-sm transition cursor-pointer"
          >
            {saving
              ? "Saving Odontogram to Neon DB..."
              : "Save Patient Odontogram & Findings"}
          </button>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// REAL-TIME PATIENT <-> DOCTOR CLINICAL CHAT INTERFACE
// ============================================================================
export function ClinicalChatBox({
  patientId,
  currentUserRole,
  currentUserName,
  title = "Direct Clinical Chat",
}: {
  patientId: string | number;
  currentUserRole: "PATIENT" | "DOCTOR";
  currentUserName: string;
  title?: string;
}) {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);

  const fetchMessages = useCallback(async () => {
    if (!patientId) return;
    const data = await getPatientChatMessages(patientId);
    setMessages(data);
  }, [patientId]);

  useEffect(() => {
    fetchMessages();
    const timer = setInterval(fetchMessages, 4000);
    return () => clearInterval(timer);
  }, [fetchMessages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !patientId) return;
    setSending(true);
    const text = input;
    setInput("");
    await sendClinicalChatMessage({
      patientId,
      senderRole: currentUserRole,
      senderName: currentUserName,
      message: text,
    });
    await fetchMessages();
    setSending(false);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[460px]">
      <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block">
            Shree Sainath Dental Clinic • Live Consultation Chat
          </span>
          <h3 className="text-sm font-extrabold">{title}</h3>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
          ● Live Sync
        </span>
      </div>

      <div className="flex-1 p-5 overflow-y-auto space-y-3 bg-slate-50/70">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-center text-xs text-slate-400 px-6">
            No messages yet. Start a conversation regarding symptoms, X-rays, prescriptions, or post-treatment care.
          </div>
        ) : (
          messages.map((m) => {
            const isMine = m.senderRole === currentUserRole;
            return (
              <div
                key={m.id}
                className={`flex flex-col ${
                  isMine ? "items-end" : "items-start"
                }`}
              >
                <span className="text-[10px] font-bold text-slate-400 mb-1 px-1">
                  {m.senderName} ({m.senderRole})
                </span>
                <div
                  className={`max-w-md px-4 py-2.5 rounded-2xl text-xs leading-relaxed ${
                    isMine
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-xs"
                  }`}
                >
                  {m.message}
                </div>
              </div>
            );
          })
        )}
      </div>

      <form
        onSubmit={handleSend}
        className="p-3.5 bg-white border-t border-slate-200 flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your clinical message or question..."
          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button
          type="submit"
          disabled={sending || !input.trim()}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white text-xs font-extrabold transition cursor-pointer"
        >
          Send
        </button>
      </form>
    </div>
  );
}