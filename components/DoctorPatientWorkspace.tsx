"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  InteractiveOdontogram,
  ClinicalChatBox,
} from "./ClinicalOdontogramAndChat";
import { updateAppointmentClinicalStatus } from "@/app/actions/clinical-portal";
import { useLanguage } from "@/components/LanguageContext";

function isVideoAppointment(apt: any): boolean {
  const typeStr = String(
    apt?.appointmentType || apt?.appointment_type || ""
  ).toUpperCase();
  const reasonStr = String(apt?.reason || "").toUpperCase();
  return (
    typeStr.includes("VIDEO") ||
    typeStr.includes("ONLINE") ||
    typeStr.includes("TELE") ||
    reasonStr.includes("VIDEO CONSULTATION") ||
    reasonStr.includes("ONLINE VIDEO") ||
    Boolean(apt?.meetLink || apt?.meet_link)
  );
}

function resolveMeetLink(apt: any): string {
  const existing = String(apt?.meetLink || apt?.meet_link || "").trim();
  const isRealMeetUrl =
    existing.startsWith("https://meet.google.com/") &&
    !existing.includes("/ssd");

  if (isRealMeetUrl) return existing;
  return process.env.NEXT_PUBLIC_CLINIC_MEET_LINK || "https://meet.google.com/new";
}

function formatSafeDate(rawDate: any, fallbackLabel = "Scheduled Visit"): string {
  if (!rawDate) return fallbackLabel;
  const parsed = new Date(rawDate);
  if (isNaN(parsed.getTime())) return String(rawDate);
  return parsed.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function DoctorPatientWorkspace({
  patientsList,
  appointmentsList,
}: {
  patientsList: Array<{
    id: string | number;
    patientCode: string;
    fullName: string;
    email: string;
    phone?: string;
    odontogramData: any;
    medicalHistory: string | null;
  }>;
  appointmentsList: Array<any>;
}) {
  const router = useRouter();
  const { tr } = useLanguage();
  const odontogramRef = useRef<HTMLDivElement>(null);

  const defaultPatientId =
    patientsList.length > 0 && patientsList[0]?.id !== undefined
      ? String(patientsList[0].id)
      : "";

  const [selectedPatientId, setSelectedPatientId] =
    useState<string>(defaultPatientId);
  const [rxNotes, setRxNotes] = useState<Record<string, string>>({});
  const [busyAptId, setBusyAptId] = useState<string | null>(null);
  const [filterMode, setFilterMode] = useState<"ALL" | "VIDEO" | "IN_CLINIC">(
    "ALL"
  );

  const selectedPatient = patientsList.find(
    (p) => String(p.id).trim() === String(selectedPatientId).trim()
  );

  const handleStatusChange = async (
    appointmentId: string,
    status: "CONFIRMED" | "COMPLETED" | "CANCELLED",
    existingNotes?: string
  ) => {
    setBusyAptId(String(appointmentId));
    const noteToSave =
      rxNotes[String(appointmentId)] !== undefined
        ? rxNotes[String(appointmentId)]
        : existingNotes || "";

    await updateAppointmentClinicalStatus({
      appointmentId: String(appointmentId),
      status,
      prescriptionNotes: noteToSave,
    });
    setBusyAptId(null);
    router.refresh();
  };

  const filteredAppointments = appointmentsList.filter((apt) => {
    const isVid = isVideoAppointment(apt);
    if (filterMode === "VIDEO") return isVid;
    if (filterMode === "IN_CLINIC") return !isVid;
    return true;
  });

  return (
    <div className="space-y-8">
      {/* 1. Patient Appointments Queue */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-blue-100 shadow-md space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[11px] font-extrabold uppercase tracking-wider">
              🩺 {tr("Daily Clinical Queue & Tele-Dentistry", "दैनिक क्लिनिकल कतार और टेली-डेंटिस्ट्री")}
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">
              {tr("Patient Appointments & Visit Completion", "मरीज अपॉइंटमेंट और विजिट पूर्णता")} ({filteredAppointments.length})
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {tr("Marking a visit as", "किसी विजिट को")}{" "}
              <strong>{tr("Completed", "पूर्ण (Completed)")}</strong>{" "}
              {tr(
                "saves the digital prescription and prompts the patient review.",
                "के रूप में चिह्नित करने से डिजिटल प्रिस्क्रिप्शन सहेजा जाता है और मरीज समीक्षा को सक्रिय करता है।"
              )}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setFilterMode("ALL")}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                filterMode === "ALL"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {tr("All Visits", "सभी विजिट")} ({appointmentsList.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterMode("IN_CLINIC")}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                filterMode === "IN_CLINIC"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              🏥 {tr("In-Clinic Only", "केवल क्लिनिक विजिट")}
            </button>
            <button
              type="button"
              onClick={() => setFilterMode("VIDEO")}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                filterMode === "VIDEO"
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
              }`}
            >
              🎥 {tr("Video Consultations", "वीडियो परामर्श")}
            </button>
          </div>
        </div>

        {filteredAppointments.length === 0 ? (
          <div className="p-10 rounded-2xl bg-slate-50/70 border border-dashed border-slate-200 text-center space-y-1">
            <p className="text-sm font-extrabold text-slate-700">
              {tr("No appointments match this filter.", "इस फ़िल्टर से कोई अपॉइंटमेंट मेल नहीं खाता।")}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAppointments.map((apt) => {
              const matchedPat =
                patientsList.find(
                  (p) => String(p.id).trim() === String(apt.patientId).trim()
                ) || patientsList[0];

              const isVideo = isVideoAppointment(apt);
              const meetUrl = isVideo ? resolveMeetLink(apt) : null;

              // Fallback to appointment.patientName or matchedPat.fullName
              const safePatientName =
                apt.patientName && apt.patientName !== "Clinic Patient"
                  ? apt.patientName
                  : matchedPat?.fullName || `${tr("Patient", "मरीज")} (${apt.bookingReference})`;
              const safePatientCode = matchedPat?.patientCode || "PAT-REF";

              return (
                <div
                  key={String(apt.id)}
                  className={`p-5 rounded-2xl border transition flex flex-col xl:flex-row xl:items-center justify-between gap-5 ${
                    isVideo
                      ? "bg-gradient-to-r from-indigo-50/60 via-white to-blue-50/40 border-indigo-200/80"
                      : "bg-gradient-to-r from-slate-50/90 via-white to-blue-50/20 border-slate-200/90"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-2xl font-extrabold text-sm flex items-center justify-center shrink-0 shadow-xs ${
                        isVideo ? "bg-indigo-600 text-white" : "bg-blue-600 text-white"
                      }`}
                    >
                      {isVideo ? "🎥" : "🏥"}
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-lg bg-blue-50 border border-blue-200 text-xs font-extrabold text-blue-700">
                          {apt.bookingReference}
                        </span>

                        <span className="text-sm font-extrabold text-slate-900">
                          {safePatientName}
                        </span>

                        <span className="text-xs font-bold text-slate-400">
                          • {safePatientCode}
                        </span>

                        <span
                          className={`px-3 py-1 rounded-full text-[11px] font-extrabold border ${
                            isVideo
                              ? "bg-indigo-100 text-indigo-900 border-indigo-300"
                              : "bg-blue-50 text-blue-800 border-blue-200"
                          }`}
                        >
                          {isVideo
                            ? tr("🎥 Online Video Consultation", "🎥 ऑनलाइन वीडियो परामर्श")
                            : tr("🏥 In-Clinic Visit", "🏥 क्लिनिक विजिट")}
                        </span>

                        <span
                          className={`px-3 py-1 rounded-full text-[11px] font-extrabold ${
                            apt.status === "COMPLETED"
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                              : apt.status === "CANCELLED"
                              ? "bg-red-100 text-red-700 border border-red-200"
                              : "bg-amber-100 text-amber-900 border border-amber-200"
                          }`}
                        >
                          {apt.status}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                        <span>
                          📅 {tr("Date:", "तारीख:")}{" "}
                          <strong className="text-slate-900">
                            {formatSafeDate(
                              apt.appointmentDate || apt.createdAt,
                              tr("Scheduled Visit", "निर्धारित विजिट")
                            )}
                          </strong>
                        </span>
                        <span>
                          ⏰ {tr("Slot:", "स्लॉट:")}{" "}
                          <strong className="text-blue-600">
                            {apt.startTime || "10:00 AM"}
                          </strong>
                        </span>
                        {(apt.patientPhone || matchedPat?.phone) && (
                          <span>
                            📞 {tr("Phone:", "फ़ोन:")}{" "}
                            <strong className="text-slate-800">
                              {apt.patientPhone || matchedPat?.phone}
                            </strong>
                          </span>
                        )}
                      </div>

                      {apt.reason && (
                        <p className="text-xs text-slate-500">
                          {tr("Chief Complaint:", "मुख्य समस्या:")}{" "}
                          <span className="font-bold text-slate-800">{apt.reason}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 xl:justify-end">
                    {isVideo && meetUrl && (
                      <a
                        href={meetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold shadow-sm flex items-center gap-1.5"
                      >
                        <span>🎥</span>
                        <span>{tr("Launch Google Meet", "गूगल मीट शुरू करें")}</span>
                      </a>
                    )}

                    <input
                      type="text"
                      defaultValue={apt.prescriptionNotes || ""}
                      onChange={(e) =>
                        setRxNotes((prev) => ({
                          ...prev,
                          [String(apt.id)]: e.target.value,
                        }))
                      }
                      placeholder={tr("Write prescription notes...", "प्रिस्क्रिप्शन नोट्स लिखें...")}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />

                    <button
                      type="button"
                      disabled={busyAptId === String(apt.id)}
                      onClick={() =>
                        handleStatusChange(
                          String(apt.id),
                          "COMPLETED",
                          apt.prescriptionNotes
                        )
                      }
                      className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white text-xs font-extrabold shadow-xs transition cursor-pointer"
                    >
                      {busyAptId === String(apt.id)
                        ? tr("Saving...", "सहेजा जा रहा है...")
                        : apt.status === "COMPLETED"
                        ? tr("✓ Update Rx Note", "✓ प्रिस्क्रिप्शन अपडेट करें")
                        : tr("✓ Mark Completed", "✓ पूर्ण चिह्नित करें")}
                    </button>

                    {matchedPat && (
                      <button
                        type="button"
                        onClick={() => {
                          const targetId = String(matchedPat.id).trim();
                          setSelectedPatientId(targetId);
                          // Smooth scroll directly to the odontogram section reference instead of page bottom
                          if (odontogramRef.current) {
                            odontogramRef.current.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                            });
                          }
                        }}
                        className="px-4 py-2.5 rounded-xl bg-white hover:bg-blue-50 text-blue-700 border border-blue-200 text-xs font-extrabold transition cursor-pointer shadow-xs"
                      >
                        🦷 {tr("Open Odontogram", "ओडोंटोग्राम खोलें")}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 2. Patient Selector & 32-Tooth Odontogram */}
      {patientsList.length > 0 && (
        <div ref={odontogramRef} className="space-y-6 pt-4">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-6 sm:p-7 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-extrabold uppercase tracking-wider">
                {tr("Active Patient Clinical Record", "सक्रिय मरीज क्लिनिकल रिकॉर्ड")}
              </span>
              <h2 className="text-xl font-extrabold mt-2">
                {tr(
                  "Select Patient to Chart 32-Tooth Odontogram or Chat Live",
                  "32-दांत ओडोंटोग्राम चार्ट करने या लाइव चैट के लिए मरीज चुनें"
                )}
              </h2>
            </div>

            <select
              value={String(selectedPatientId)}
              onChange={(e) => setSelectedPatientId(e.target.value)}
              className="px-4 py-3 rounded-2xl bg-white text-slate-900 text-xs sm:text-sm font-extrabold shadow-sm focus:outline-none cursor-pointer"
            >
              {patientsList.map((p) => (
                <option key={String(p.id)} value={String(p.id)}>
                  {p.fullName} ({p.patientCode}) {p.email ? `— ${p.email}` : ""}
                </option>
              ))}
            </select>
          </div>

          {selectedPatient ? (
            <div className="space-y-6">
              <InteractiveOdontogram
                patientId={String(selectedPatient.id)}
                initialOdontogram={selectedPatient.odontogramData || {}}
                initialMedicalHistory={selectedPatient.medicalHistory || ""}
                editable={true}
              />

              <ClinicalChatBox
                patientId={String(selectedPatient.id)}
                currentUserRole="DOCTOR"
                currentUserName={tr("Dr. Nitu Rajpoot, BDS", "डॉ. नीतू राजपूत, बीडीएस")}
                title={tr(
                  `Direct Clinical Chat with ${selectedPatient.fullName} (${selectedPatient.patientCode})`,
                  `${selectedPatient.fullName} (${selectedPatient.patientCode}) के साथ डायरेक्ट क्लिनिकल चैट`
                )}
              />
            </div>
          ) : (
            <div className="p-8 bg-white rounded-3xl border border-slate-200 text-center text-xs text-slate-500">
              {tr(
                "Please select a patient above to load their 32-tooth odontogram.",
                "कृपया 32-दांत ओडोंटोग्राम लोड करने के लिए ऊपर से एक मरीज चुनें।"
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}