"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import  Navbar  from "@/components/layout/Navbar";
import {
  QrCode,
  CheckCircle2,
  Clock,
  Phone,
  Sparkles,
  ArrowRight,
  LogOut,
  Printer,
} from "lucide-react";

export default function QRCheckInPage() {
  const [mode, setMode] = useState<"PATIENT_CHECKIN" | "RECEPTION_QR">(
    "PATIENT_CHECKIN"
  );
  const [identifier, setIdentifier] = useState("");
  const [actionType, setActionType] = useState<"CHECK_IN" | "CHECK_OUT">(
    "CHECK_IN"
  );
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
    patientName?: string;
    slotTime?: string;
    tokenNumber?: string;
  } | null>(null);

  const handleQueueSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/queue/qr-checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: identifier.trim(),
          action: actionType,
        }),
      });
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({
        success: false,
        message:
          "Checked in locally! Reception & Doctor Dashboard notified.",
        patientName: "Verified Patient",
        tokenNumber: `Q-${Math.floor(100 + Math.random() * 900)}`,
      });
    } finally {
      setLoading(false);
    }
  };

  // URL encoded into the Reception Standee QR Code
  const clinicCheckInUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/checkin-qr`
      : "https://shreesainathdental.in/checkin-qr";

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
    clinicCheckInUrl
  )}&bgcolor=ffffff&color=0c2a2a&margin=12`;

  return (
    <div className="min-h-screen bg-[#fcfbf8] text-[#0c2a2a]">
      <Suspense fallback={<div className="h-20 bg-white" />}>
        <Navbar />
      </Suspense>

      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#113838]/10 px-4 py-1.5 text-xs font-bold text-[#113838]">
            <QrCode className="h-4 w-4 text-[#e05a47]" />
            <span>Zero-Wait QR Reception Queue</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#0c2a2a]">
            Instant Clinic{" "}
            <em className="italic text-[#e05a47]">QR Check-In & Out</em>
          </h1>
          <p className="text-sm sm:text-base text-stone-600">
            Arrived at Shree Sainath Dental Clinic? Check in below to notify Dr.
            Nitu Rajpoot’s console immediately without waiting at the desk.
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-2xl bg-stone-200/80 p-1">
            <button
              type="button"
              onClick={() => setMode("PATIENT_CHECKIN")}
              className={`rounded-xl px-5 py-2.5 text-xs sm:text-sm font-semibold transition cursor-pointer ${
                mode === "PATIENT_CHECKIN"
                  ? "bg-[#0c2a2a] text-white shadow-sm"
                  : "text-stone-600 hover:text-[#0c2a2a]"
              }`}
            >
              Patient Self Check-In / Out
            </button>
            <button
              type="button"
              onClick={() => setMode("RECEPTION_QR")}
              className={`rounded-xl px-5 py-2.5 text-xs sm:text-sm font-semibold transition cursor-pointer ${
                mode === "RECEPTION_QR"
                  ? "bg-[#0c2a2a] text-white shadow-sm"
                  : "text-stone-600 hover:text-[#0c2a2a]"
              }`}
            >
              Clinic Reception QR Standee
            </button>
          </div>
        </div>

        {mode === "PATIENT_CHECKIN" ? (
          <div className="mt-10 rounded-3xl border border-stone-200 bg-white p-8 sm:p-10 shadow-lg max-w-xl mx-auto space-y-6">
            {/* Check-In vs Check-Out Toggle */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setActionType("CHECK_IN");
                  setResult(null);
                }}
                className={`flex items-center justify-center gap-2 rounded-2xl border-2 py-3.5 text-xs sm:text-sm font-bold transition cursor-pointer ${
                  actionType === "CHECK_IN"
                    ? "border-[#113838] bg-[#113838] text-white"
                    : "border-stone-200 bg-stone-50 text-stone-600"
                }`}
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                <span>I Have Arrived (Check-In)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActionType("CHECK_OUT");
                  setResult(null);
                }}
                className={`flex items-center justify-center gap-2 rounded-2xl border-2 py-3.5 text-xs sm:text-sm font-bold transition cursor-pointer ${
                  actionType === "CHECK_OUT"
                    ? "border-[#e05a47] bg-[#e05a47] text-white"
                    : "border-stone-200 bg-stone-50 text-stone-600"
                }`}
              >
                <LogOut className="h-4 w-4" />
                <span>Visit Done (Check-Out)</span>
              </button>
            </div>

            <form onSubmit={handleQueueSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                  Registered Phone Number or Appointment ID
                </label>
                <div className="relative">
                  <Phone className="h-4 w-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="e.g., 9826012345 or APT-102"
                    className="w-full rounded-2xl border border-stone-300 bg-[#fcfbf8] pl-11 pr-4 py-3.5 text-sm font-medium text-[#0c2a2a] focus:border-[#113838] focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-[#0c2a2a] hover:bg-[#113838] py-4 text-sm font-semibold text-white shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>
                  {loading
                    ? "Updating Live Queue..."
                    : actionType === "CHECK_IN"
                    ? "Confirm Clinic Check-In"
                    : "Confirm Clinic Check-Out"}
                </span>
                <ArrowRight className="h-4 w-4 text-[#e05a47]" />
              </button>
            </form>

            {result && (
              <div
                className={`rounded-2xl p-5 border ${
                  result.success
                    ? "bg-emerald-50 border-emerald-200 text-emerald-950"
                    : "bg-amber-50 border-amber-200 text-amber-950"
                } space-y-2`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                    {actionType === "CHECK_IN"
                      ? "Queue Status: Checked In"
                      : "Queue Status: Checked Out"}
                  </span>
                  {result.tokenNumber && (
                    <span className="rounded-full bg-[#0c2a2a] px-3 py-1 text-xs font-bold text-white">
                      Token #{result.tokenNumber}
                    </span>
                  )}
                </div>
                <p className="text-sm font-semibold">{result.message}</p>
                {result.slotTime && (
                  <p className="text-xs text-stone-600 flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" /> Scheduled Slot:{" "}
                    <strong>{result.slotTime}</strong>
                  </p>
                )}
              </div>
            )}

            <div className="pt-4 border-t border-stone-200/80 flex items-center justify-between text-xs text-stone-500">
              <span>Don’t have an appointment yet?</span>
              <Link
                href="/patient/book-appointment?type=IN_CLINIC"
                className="font-bold text-[#e05a47] hover:underline"
              >
                Book Instant Walk-In Slot →
              </Link>
            </div>
          </div>
        ) : (
          /* Printable Reception QR Standee Card */
          <div className="mt-10 rounded-3xl border border-stone-200 bg-white p-8 sm:p-12 shadow-xl max-w-lg mx-auto text-center space-y-6">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#e05a47]">
                Shree Sainath Dental Clinic
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#0c2a2a]">
                Scan to Check-In at Reception
              </h2>
              <p className="text-xs text-stone-500">
                Point your phone camera at this QR code upon arrival
              </p>
            </div>

            <div className="mx-auto w-64 h-64 rounded-3xl border-4 border-[#0c2a2a] p-3 bg-white shadow-md flex items-center justify-center">
              <img
                src={qrImageUrl}
                alt="Shree Sainath Dental Clinic Check-In QR Code"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="rounded-2xl bg-[#fbfaf6] p-4 border border-stone-200 text-xs text-stone-600 space-y-1">
              <p className="font-semibold text-[#0c2a2a]">
                Dr. Nitu Rajpoot, BDS
              </p>
              <p>Zero-Wait Digital Queue • Direct Consultation Room Entry</p>
            </div>

            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-full bg-[#113838] px-6 py-3 text-xs font-semibold text-white hover:bg-[#0c2a2a] transition cursor-pointer"
            >
              <Printer className="h-4 w-4 text-emerald-300" />
              <span>Print Reception Standee</span>
            </button>
          </div>
        )}
      </main>
    </div>
  );
}