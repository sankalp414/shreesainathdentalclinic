"use client";

import { useState } from "react";

interface OdontogramClientProps {
  patient: {
    id: string;
    fullName: string | null;
    email: string | null;
    role: string;
  };
}

export default function OdontogramClient({ patient }: OdontogramClientProps) {
  const [selectedTooth, setSelectedTooth] = useState<number | null>(null);
  const [notes, setNotes] = useState("");
  const [statusMap, setStatusMap] = useState<Record<number, string>>({});

  const upperArch = Array.from({ length: 16 }, (_, i) => i + 1);
  const lowerArch = Array.from({ length: 16 }, (_, i) => i + 17);

  const handleToothClick = (toothNum: number) => {
    setSelectedTooth(toothNum);
  };

  const setToothStatus = (status: string) => {
    if (selectedTooth !== null) {
      setStatusMap((prev) => ({ ...prev, [selectedTooth]: status }));
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Patient Header Card */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 flex justify-between items-start">
        <div>
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
            Patient Record
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-1">
            {patient.fullName || "Unnamed Patient"}
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">Email: {patient.email}</p>
        </div>
        <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
          {patient.role}
        </span>
      </div>

      {/* Interactive Odontogram Section */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Interactive Odontogram</h3>
            <p className="text-sm text-slate-500">
              {selectedTooth ? `Selected Tooth: #${selectedTooth}` : "Click a tooth to update clinical status."}
            </p>
          </div>
          <div className="flex gap-4 text-xs font-medium">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span> Healthy</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span> Decay</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span> Filled/Crown</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-slate-300 inline-block"></span> Missing</span>
          </div>
        </div>

        {selectedTooth && (
          <div className="mb-6 p-4 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-between">
            <span className="text-sm font-medium text-blue-900">Mark Tooth #{selectedTooth} as:</span>
            <div className="flex gap-2">
              <button onClick={() => setToothStatus("healthy")} className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-medium hover:bg-emerald-700">Healthy</button>
              <button onClick={() => setToothStatus("decay")} className="px-3 py-1 bg-amber-600 text-white rounded-lg text-xs font-medium hover:bg-amber-700">Decay</button>
              <button onClick={() => setToothStatus("filled")} className="px-3 py-1 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700">Filled</button>
              <button onClick={() => setToothStatus("missing")} className="px-3 py-1 bg-slate-500 text-white rounded-lg text-xs font-medium hover:bg-slate-600">Missing</button>
            </div>
          </div>
        )}

        {/* Upper Arch */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 text-center">Upper Arch (Maxillary)</p>
          <div className="flex justify-center gap-2 overflow-x-auto py-2">
            {upperArch.map((toothNum) => {
              const status = statusMap[toothNum];
              const statusColor = 
                status === "decay" ? "bg-amber-100 border-amber-400 text-amber-700" :
                status === "filled" ? "bg-blue-100 border-blue-400 text-blue-700" :
                status === "missing" ? "bg-slate-100 border-slate-300 text-slate-400 opacity-60" :
                "bg-slate-50 border-slate-200 text-slate-600";

              return (
                <div
                  key={toothNum}
                  onClick={() => handleToothClick(toothNum)}
                  className={`flex flex-col items-center justify-center w-12 h-16 rounded-xl border transition cursor-pointer shadow-xs group ${statusColor} ${selectedTooth === toothNum ? "ring-2 ring-blue-600" : ""}`}
                >
                  <span className="text-[10px] font-bold">{toothNum}</span>
                  <div className="w-6 h-8 mt-1 rounded border border-current bg-white flex items-center justify-center text-[10px] font-semibold">
                    🦷
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Lower Arch */}
        <div>
          <div className="flex justify-center gap-2 overflow-x-auto py-2">
            {lowerArch.map((toothNum) => {
              const status = statusMap[toothNum];
              const statusColor = 
                status === "decay" ? "bg-amber-100 border-amber-400 text-amber-700" :
                status === "filled" ? "bg-blue-100 border-blue-400 text-blue-700" :
                status === "missing" ? "bg-slate-100 border-slate-300 text-slate-400 opacity-60" :
                "bg-slate-50 border-slate-200 text-slate-600";

              return (
                <div
                  key={toothNum}
                  onClick={() => handleToothClick(toothNum)}
                  className={`flex flex-col items-center justify-center w-12 h-16 rounded-xl border transition cursor-pointer shadow-xs group ${statusColor} ${selectedTooth === toothNum ? "ring-2 ring-blue-600" : ""}`}
                >
                  <div className="w-6 h-8 mb-1 rounded border border-current bg-white flex items-center justify-center text-[10px] font-semibold">
                    🦷
                  </div>
                  <span className="text-[10px] font-bold">{toothNum}</span>
                </div>
              );
            })}
          </div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-2 text-center">Lower Arch (Mandibular)</p>
        </div>
      </div>

      {/* Clinical Notes Section */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
        <h3 className="text-lg font-bold text-slate-900 mb-2">Clinical Notes & Treatment History</h3>
        <textarea
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Enter procedure notes, findings, or treatment plans..."
          className="w-full rounded-2xl border border-slate-200 p-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
        ></textarea>
        <div className="mt-4 flex justify-end">
          <button 
            onClick={() => alert("Clinical notes saved successfully!")}
            className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-medium text-sm shadow-sm hover:bg-blue-700 transition"
          >
            Save Clinical Notes
          </button>
        </div>
      </div>
    </div>
  );
}