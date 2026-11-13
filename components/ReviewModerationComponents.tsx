"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  submitCompletedAppointmentReview,
  setReviewApprovalByDoctor,
  deleteReviewByDoctor,
} from "@/app/actions/reviews";
import { useLanguage } from "@/components/LanguageContext";

export function PatientCompletedAppointmentReviewPrompt({
  completedAppointments,
  patientId,
  patientName,
}: {
  completedAppointments: Array<any>;
  patientId: number;
  patientName: string;
}) {
  const router = useRouter();
  const { tr } = useLanguage();
  const unreviewed = completedAppointments.filter((a) => !a.hasReviewed);

  const [selectedAptId, setSelectedAptId] = useState<number>(
    unreviewed[0]?.id || 0
  );
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [submittedMsg, setSubmittedMsg] = useState<string | null>(null);

  if (unreviewed.length === 0 && !submittedMsg) {
    return null;
  }

  const activeApt =
    unreviewed.find((a) => a.id === selectedAptId) || unreviewed[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeApt || !comment.trim()) return;

    setSubmitting(true);
    const res = await submitCompletedAppointmentReview({
      appointmentId: activeApt.id,
      patientId,
      patientName,
      treatmentType: activeApt.reason || activeApt.appointmentType,
      rating,
      comment,
    });
    setSubmitting(false);

    if (res.success) {
      setComment("");
      setSubmittedMsg(
        tr(
          "Thank you for your feedback! Your review has been sent to Dr. Nitu Rajpoot for verification and will appear on our public testimonials once approved.",
          "आपकी प्रतिक्रिया के लिए धन्यवाद! आपकी समीक्षा सत्यापन के लिए डॉ. नीतू राजपूत को भेज दी गई है और स्वीकृत होने के बाद हमारी वेबसाइट पर प्रदर्शित होगी।"
        )
      );
      router.refresh();
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-6 sm:p-8 text-white shadow-md space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className="px-3 py-1 rounded-full bg-white/20 text-white text-[11px] font-extrabold uppercase tracking-wider">
            {tr(
              "Visit Completed • Share Your Experience",
              "विजिट पूर्ण • अपना अनुभव साझा करें"
            )}
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold mt-2">
            {tr(
              "How was your dental consultation with Dr. Nitu Rajpoot?",
              "डॉ. नीतू राजपूत के साथ आपका डेंटल परामर्श कैसा रहा?"
            )}
          </h2>
          <p className="text-xs text-blue-100 mt-1">
            {tr(
              "Your feedback goes to Dr. Nitu's dashboard first and helps other patients feel confident about pain-free dental care.",
              "आपकी प्रतिक्रिया सबसे पहले डॉ. नीतू के डैशबोर्ड पर जाती है और अन्य मरीजों को दर्दरहित दंत देखभाल के प्रति आश्वस्त करने में मदद करती है।"
            )}
          </p>
        </div>
      </div>

      {submittedMsg ? (
        <div className="p-4 rounded-2xl bg-white text-emerald-800 text-xs font-extrabold">
          ✓ {submittedMsg}
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-5 text-slate-900 space-y-4"
        >
          {unreviewed.length > 1 && (
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">
                {tr("Select Completed Visit:", "पूर्ण विजिट चुनें:")}
              </label>
              <select
                value={activeApt?.id || ""}
                onChange={(e) => setSelectedAptId(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold"
              >
                {unreviewed.map((apt) => (
                  <option key={apt.id} value={apt.id}>
                    {apt.bookingReference} —{" "}
                    {new Date(apt.appointmentDate).toLocaleDateString("en-IN")}{" "}
                    ({apt.reason || apt.appointmentType})
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex items-center gap-3">
            <span className="text-xs font-extrabold text-slate-700">
              {tr("Your Star Rating:", "आपकी स्टार रेटिंग:")}
            </span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`text-2xl transition cursor-pointer ${
                    star <= rating ? "text-amber-400 scale-110" : "text-slate-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
            <span className="text-xs font-bold text-amber-600">
              {rating} / 5 {tr("Stars", "स्टार")}
            </span>
          </div>

          <div>
            <textarea
              rows={3}
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={tr(
                "Write about your treatment comfort, clinic hygiene, or video consultation experience...",
                "अपने उपचार के आराम, क्लिनिक की स्वच्छता, या वीडियो परामर्श के अनुभव के बारे में लिखें..."
              )}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold transition cursor-pointer"
            >
              {submitting
                ? tr("Submitting to Doctor...", "डॉक्टर को भेजा जा रहा है...")
                : tr("Submit My Review →", "मेरी समीक्षा जमा करें →")}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export function DoctorReviewModerationPanel({
  reviewsList,
}: {
  reviewsList: Array<any>;
}) {
  const router = useRouter();
  const { tr } = useLanguage();
  const [busyId, setBusyId] = useState<number | null>(null);

  const handleApproveToggle = async (id: number, currentApproved: boolean) => {
    setBusyId(id);
    await setReviewApprovalByDoctor(id, !currentApproved);
    setBusyId(null);
    router.refresh();
  };

  const handleDelete = async (id: number) => {
    setBusyId(id);
    await deleteReviewByDoctor(id);
    setBusyId(null);
    router.refresh();
  };

  const pendingCount = reviewsList.filter((r) => !r.isApproved).length;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
            {tr(
              "Patient Feedback & Testimonial Control",
              "मरीज प्रतिक्रिया और प्रशंसापत्र नियंत्रण"
            )}
          </span>
          <h2 className="text-xl font-extrabold text-slate-900">
            {tr(
              "Patient Reviews Moderation Queue",
              "मरीज समीक्षा मॉडरेशन कतार"
            )}{" "}
            ({reviewsList.length})
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-extrabold">
            {pendingCount}{" "}
            {tr("Pending Doctor Decision", "डॉक्टर के निर्णय हेतु लंबित")}
          </span>
        </div>
      </div>

      {reviewsList.length === 0 ? (
        <div className="p-8 rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-center text-xs text-slate-500">
          {tr(
            'No patient reviews have been submitted yet. When you mark an appointment as "Completed", the patient is automatically invited to leave a review.',
            'अभी तक कोई मरीज समीक्षा जमा नहीं की गई है। जब आप किसी अपॉइंटमेंट को "पूर्ण" के रूप में चिह्नित करते हैं, तो मरीज को स्वचालित रूप से समीक्षा लिखने के लिए आमंत्रित किया जाता है।'
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviewsList.map((rev) => (
            <div
              key={rev.id}
              className={`p-5 rounded-2xl border flex flex-col justify-between gap-4 ${
                rev.isApproved
                  ? "bg-emerald-50/30 border-emerald-200"
                  : "bg-amber-50/40 border-amber-200"
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <span className="text-sm font-extrabold text-slate-900">
                      {rev.patientName}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500 block">
                      {rev.treatmentType ||
                        tr("Dental Consultation", "डेंटल परामर्श")}
                    </span>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                      rev.isApproved
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-900"
                    }`}
                  >
                    {rev.isApproved
                      ? tr("✓ Published on Website", "✓ वेबसाइट पर प्रकाशित")
                      : tr("⏳ Awaiting Doctor Choice", "⏳ डॉक्टर की स्वीकृति हेतु लंबित")}
                  </span>
                </div>

                <div className="text-amber-500 text-sm font-bold">
                  {"★".repeat(rev.rating || 5)}
                  <span className="text-slate-300">
                    {"★".repeat(5 - (rev.rating || 5))}
                  </span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed bg-white p-3 rounded-xl border border-slate-200/80">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200/60">
                <button
                  type="button"
                  disabled={busyId === rev.id}
                  onClick={() => handleApproveToggle(rev.id, rev.isApproved)}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                    rev.isApproved
                      ? "bg-slate-200 hover:bg-slate-300 text-slate-800"
                      : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
                  }`}
                >
                  {rev.isApproved
                    ? tr("Hide from Website", "वेबसाइट से छुपाएं")
                    : tr(
                        "✓ Approve & Show on Website",
                        "✓ स्वीकृत करें और वेबसाइट पर दिखाएं"
                      )}
                </button>

                <button
                  type="button"
                  disabled={busyId === rev.id}
                  onClick={() => handleDelete(rev.id)}
                  className="px-3 py-2 rounded-xl border border-red-200 bg-white hover:bg-red-50 text-red-600 text-xs font-bold transition cursor-pointer"
                >
                  {tr("Delete", "हटाएं")}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}