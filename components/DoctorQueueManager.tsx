"use client";

import { useState } from "react";
import { updateAppointmentClinicalStatus } from "@/app/actions/clinical-portal";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageContext";

export default function DoctorQueueManager({
  appointmentsList,
}: {
  appointmentsList: Array<any>;
}) {
  const router = useRouter();
  const { tr } = useLanguage();
  const [busyId, setBusyId] = useState<string | null>(null);

  const handleUpdateStatus = async (id: string, status: string) => {
    setBusyId(id);
    await updateAppointmentClinicalStatus({
      appointmentId: id,
      status: status as any,
    });
    setBusyId(null);
    router.refresh();
  };

  const handlePrintPrescription = (apt: any) => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>${tr("Prescription - Shree Sainath Dental Clinic", "प्रिस्क्रिप्शन - श्री साईनाथ डेंटल क्लिनिक")}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; color: #1e293b; }
            .header { border-bottom: 2px solid #2563eb; padding-bottom: 15px; margin-bottom: 20px; }
            .doctor { font-size: 20px; font-weight: bold; color: #1e293b; }
            .sub { font-size: 12px; color: #64748b; }
            .rx { font-size: 24px; font-weight: bold; color: #2563eb; margin: 20px 0; }
            .content { font-size: 14px; line-height: 1.6; background: #f8fafc; padding: 20px; border-radius: 8px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="doctor">${tr("Shree Sainath Dental Clinic", "श्री साईनाथ डेंटल क्लिनिक")}</div>
            <div class="sub">${tr("Dr. Nitu Rajpoot, BDS • Conservative Dentistry & Endodontics", "डॉ. नीतू राजपूत, बीडीएस • कंजर्वेटिव डेंटिस्ट्री और एंडोडोंटिक्स")}</div>
            <div class="sub">${tr("Booking Ref:", "बुकिंग संदर्भ:")} ${apt.bookingReference} | ${tr("Date:", "तारीख:")} ${new Date(apt.appointmentDate).toLocaleDateString("en-IN")}</div>
          </div>
          <div><strong>${tr("Patient Name:", "मरीज का नाम:")}</strong> ${apt.patientName || tr("Valued Patient", "सम्मानित मरीज")}</div>
          <div class="rx">Rx</div>
          <div class="content">${apt.prescriptionNotes || tr("No specific prescription notes recorded.", "कोई विशेष प्रिस्क्रिप्शन नोट दर्ज नहीं किया गया है।")}</div>
          <br/><br/><br/>
          <div style="text-align: right;">
            <strong>${tr("Dr. Nitu Rajpoot, BDS", "डॉ. नीतू राजपूत, बीडीएस")}</strong><br/>
            <span class="sub">${tr("Signature", "हस्ताक्षर")}</span>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => printWindow.print(), 500);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
            {tr("Waiting Room & In-Clinic Workflow", "वेटिंग रूम और क्लिनिक वर्कफ़्लो")}
          </span>
          <h2 className="text-xl font-extrabold text-slate-900">
            {tr("Physical Check-In & Printable Prescriptions", "क्लिनिक चेक-इन और प्रिंट करने योग्य प्रिस्क्रिप्शन")}
          </h2>
        </div>
      </div>

      <div className="space-y-3">
        {appointmentsList.slice(0, 10).map((apt) => (
          <div
            key={apt.id}
            className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-blue-600">
                  {apt.bookingReference}
                </span>
                <span className="text-xs font-extrabold text-slate-900">
                  {apt.patientName}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold">
                  {apt.status}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {tr("Time:", "समय:")} <strong>{apt.startTime}</strong> •{" "}
                {apt.reason || tr("Dental Visit", "डेंटल विजिट")}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={busyId === apt.id}
                onClick={() => handleUpdateStatus(apt.id, "CONFIRMED")}
                className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                {tr("Checked-In", "चेक-इन किया")}
              </button>

              {apt.prescriptionNotes && (
                <button
                  type="button"
                  onClick={() => handlePrintPrescription(apt)}
                  className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 text-xs font-extrabold hover:bg-blue-100 cursor-pointer"
                >
                  🖨️ {tr("Print Rx PDF", "प्रिस्क्रिप्शन प्रिंट करें")}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}