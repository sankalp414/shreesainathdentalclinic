"use client";

import { useLanguage } from "@/components/LanguageContext";

export default function DoctorRevenueAnalytics({
  appointmentsList,
}: {
  appointmentsList: Array<any>;
}) {
  const { tr } = useLanguage();
  const completedVisits = appointmentsList.filter(
    (a) => a.status === "COMPLETED"
  );

  // Approximate revenue calculations (e.g. ₹4000 per completed visit or video consults)
  const estimatedRevenue = completedVisits.reduce((acc, apt) => {
    const isVideo = String(apt.appointmentType).includes("VIDEO");
    return acc + (isVideo ? 300 : 4500);
  }, 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-1">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          {tr("Estimated Clinic Revenue", "अनुमानित क्लिनिक राजस्व")}
        </span>
        <div className="text-3xl font-extrabold text-blue-600">
          ₹{estimatedRevenue.toLocaleString("en-IN")}
        </div>
        <p className="text-[11px] text-slate-400">
          {tr(
            `Based on ${completedVisits.length} completed treatments & consults.`,
            `${completedVisits.length} पूर्ण उपचार और परामर्श पर आधारित।`
          )}
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-1">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          {tr("Completed Treatments", "पूर्ण उपचार")}
        </span>
        <div className="text-3xl font-extrabold text-emerald-600">
          {completedVisits.length}
        </div>
        <p className="text-[11px] text-slate-400">
          {tr("Successfully treated & reviewed.", "सफलतापूर्वक उपचारित और समीक्षा किए गए।")}
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-1">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          {tr("Total Bookings Recorded", "कुल दर्ज बुकिंग")}
        </span>
        <div className="text-3xl font-extrabold text-slate-900">
          {appointmentsList.length}
        </div>
        <p className="text-[11px] text-slate-400">
          {tr("Across in-clinic and video consultation queues.", "क्लिनिक और वीडियो परामर्श कतारों में।")}
        </p>
      </div>
    </div>
  );
}