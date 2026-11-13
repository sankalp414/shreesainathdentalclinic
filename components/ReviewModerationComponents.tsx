"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  submitCompletedAppointmentReview,
  setReviewApprovalByDoctor,
  deleteReviewByDoctor,
} from "@/app/actions/reviews";

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
        "Thank you for your feedback! Your review has been sent to Dr. Nitu Rajpoot for verification and will appear on our public testimonials once approved."
      );
      router.refresh();
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-6 sm:p-8 text-white shadow-md space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className="px-3 py-1 rounded-full bg-white/20 text-white text-[11px] font-extrabold uppercase tracking-wider">
            Visit Completed • Share Your Experience
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold mt-2">
            How was your dental consultation with Dr. Nitu Rajpoot?
          </h2>
          <p className="text-xs text-blue-100 mt-1">
            Your feedback goes to Dr. Nitu&apos;s dashboard first and helps other patients feel confident about pain-free dental care.
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
                Select Completed Visit:
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
              Your Star Rating:
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
              {rating} / 5 Stars
            </span>
          </div>

          <div>
            <textarea
              rows={3}
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write about your treatment comfort, clinic hygiene, or video consultation experience..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold transition cursor-pointer"
            >
              {submitting ? "Submitting to Doctor..." : "Submit My Review →"}
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
            Patient Feedback &amp; Testimonial Control
          </span>
          <h2 className="text-xl font-extrabold text-slate-900">
            Patient Reviews Moderation Queue ({reviewsList.length})
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-extrabold">
            {pendingCount} Pending Doctor Decision
          </span>
        </div>
      </div>

      {reviewsList.length === 0 ? (
        <div className="p-8 rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-center text-xs text-slate-500">
          No patient reviews have been submitted yet. When you mark an appointment as &ldquo;Completed&rdquo;, the patient is automatically invited to leave a review.
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
                      {rev.treatmentType || "Dental Consultation"}
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
                      ? "✓ Published on Website"
                      : "⏳ Awaiting Doctor Choice"}
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
                    ? "Hide from Website"
                    : "✓ Approve & Show on Website"}
                </button>

                <button
                  type="button"
                  disabled={busyId === rev.id}
                  onClick={() => handleDelete(rev.id)}
                  className="px-3 py-2 rounded-xl border border-red-200 bg-white hover:bg-red-50 text-red-600 text-xs font-bold transition cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}