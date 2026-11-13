"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import {
  createAppointment,
  getDateAvailabilityDetails,
  type SlotStatusItem,
  type DateAvailabilityResponse,
} from "@/app/actions/booking";
import { useLanguage } from "@/components/LanguageContext";

function getISTDateString(offsetDays = 0): string {
  const now = new Date();
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
  const istDate = new Date(utcMs + 330 * 60000 + offsetDays * 86400000);
  const year = istDate.getFullYear();
  const month = String(istDate.getMonth() + 1).padStart(2, "0");
  const day = String(istDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function PatientBookingClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isLoaded, isSignedIn } = useUser();
  const { tr } = useLanguage();

  const typeParam = (
    searchParams.get("type") ||
    searchParams.get("mode") ||
    ""
  ).toUpperCase();
  const initialMode = typeParam === "VIDEO" ? "video" : "in-clinic";

  const todayStr = getISTDateString(0);
  const tomorrowStr = getISTDateString(1);

  const [mode, setMode] = useState<"in-clinic" | "video">(initialMode);
  const [date, setDate] = useState<string>(todayStr);
  const [isEmergency, setIsEmergency] = useState<boolean>(false);
  const [availability, setAvailability] =
    useState<DateAvailabilityResponse | null>(null);
  const [slots, setSlots] = useState<SlotStatusItem[]>([]);
  const [timeSlot, setTimeSlot] = useState<string>("");
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [paymentMethod, setPaymentMethod] = useState<"online" | "cash">(
    initialMode === "video" ? "online" : "cash"
  );
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (typeParam === "VIDEO") {
      setMode("video");
      setPaymentMethod("online");
    } else if (typeParam === "IN_CLINIC" || typeParam === "IN-CLINIC") {
      setMode("in-clinic");
    }
  }, [typeParam]);

  const loadSlotStatus = useCallback(
    async (
      selectedDate: string,
      selectedMode: "in-clinic" | "video",
      emergencyFlag: boolean,
      silent = false
    ) => {
      if (!silent) setInitialLoading(true);
      try {
        const details = await getDateAvailabilityDetails(
          selectedDate,
          selectedMode,
          emergencyFlag
        );
        setAvailability(details);
        setSlots(details.slots);

        const firstOpen =
          details.slots.find((s) => !s.isDisabled)?.time || "";
        setTimeSlot((prev) => {
          const stillOpen = details.slots.find(
            (s) => s.time === prev && !s.isDisabled
          );
          return stillOpen ? prev : firstOpen;
        });
      } catch (err) {
        console.error("Failed to load slots:", err);
      } finally {
        if (!silent) setInitialLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    loadSlotStatus(date, mode, isEmergency, false);
    const interval = setInterval(() => {
      loadSlotStatus(date, mode, isEmergency, true);
    }, 60000);
    return () => clearInterval(interval);
  }, [date, mode, isEmergency, loadSlotStatus]);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (isLoaded && !isSignedIn) {
      setErrorMsg(
        tr(
          "Please sign in to your account to complete your booking.",
          "अपनी बुकिंग पूरी करने के लिए कृपया अपने खाते में साइन इन करें।"
        )
      );
      return;
    }

    if (!timeSlot) {
      setErrorMsg(
        tr(
          "Please select an available time slot.",
          "कृपया एक उपलब्ध समय स्लॉट चुनें।"
        )
      );
      return;
    }

    setLoading(true);

    try {
      const result = await createAppointment({
        mode,
        date,
        timeSlot,
        isEmergency,
        paymentMethod: mode === "video" ? "online" : paymentMethod,
        clientUser: user
          ? {
              clerkId: user.id,
              email: user.primaryEmailAddress?.emailAddress,
              fullName:
                user.fullName ||
                `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
              phone: user.primaryPhoneNumber?.phoneNumber,
            }
          : undefined,
      });

      if (!result?.success) {
        setErrorMsg(
          result?.error ||
            tr("Failed to book appointment.", "अपॉइंटमेंट बुक करने में विफल।")
        );
        await loadSlotStatus(date, mode, isEmergency, true);
        return;
      }

      router.push("/patient/dashboard");
      router.refresh();
    } catch (error: any) {
      setErrorMsg(
        error?.message ||
          tr(
            "Failed to book appointment. Please try again.",
            "अपॉइंटमेंट बुक करने में विफल। कृपया पुनः प्रयास करें।"
          )
      );
    } finally {
      setLoading(false);
    }
  };

  const morningSlots = slots.filter((s) => s.period === "MORNING");
  const eveningSlots = slots.filter((s) => s.period === "EVENING");
  const openSlotsCount = slots.filter((s) => !s.isDisabled).length;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
        <div className="border-b border-slate-100 pb-5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              {tr("Shree Sainath Dental Clinic", "श्री साईनाथ डेंटल क्लिनिक")}
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900 mt-1">
              {tr(
                "Book Your Dental Consultation",
                "अपना डेंटल परामर्श बुक करें"
              )}
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              {tr("Dr. Nitu Rajpoot, BDS", "डॉ. नीतू राजपूत, बीडीएस")} •{" "}
              {availability?.scheduleSummary
                ? tr(
                    `Hours: ${availability.scheduleSummary.startTime} – ${availability.scheduleSummary.endTime} (Lunch: ${availability.scheduleSummary.lunchStart} – ${availability.scheduleSummary.lunchEnd})`,
                    `समय: ${availability.scheduleSummary.startTime} – ${availability.scheduleSummary.endTime} (लंच: ${availability.scheduleSummary.lunchStart} – ${availability.scheduleSummary.lunchEnd})`
                  )
                : tr("Live IST Slot Sync", "लाइव समय स्लॉट सिंक")}
            </p>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleBooking} className="space-y-6">
          {/* 1. Consultation Mode */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
              {tr(
                "1. Select Consultation Type",
                "1. परामर्श का प्रकार चुनें"
              )}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => {
                  setMode("in-clinic");
                  setIsEmergency(false);
                }}
                className={`p-4 rounded-2xl border text-left transition cursor-pointer ${
                  mode === "in-clinic"
                    ? "border-blue-600 bg-blue-50/60 ring-2 ring-blue-600/20"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="font-bold text-slate-900 text-sm">
                  {tr("In-Clinic Consultation", "क्लिनिक में परामर्श")}
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  {tr(
                    "Visit Shree Sainath Dental Clinic • ₹500",
                    "श्री साईनाथ डेंटल क्लिनिक विजिट करें • ₹500"
                  )}
                </div>
              </button>

              <button
                type="button"
                disabled={
                  availability?.allowedConsultationType === "IN_CLINIC_ONLY"
                }
                onClick={() => {
                  setMode("video");
                  setPaymentMethod("online");
                  setIsEmergency(false);
                }}
                className={`p-4 rounded-2xl border text-left transition cursor-pointer ${
                  availability?.allowedConsultationType === "IN_CLINIC_ONLY"
                    ? "opacity-50 bg-slate-50 border-slate-200 cursor-not-allowed"
                    : mode === "video"
                    ? "border-blue-600 bg-blue-50/60 ring-2 ring-blue-600/20"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="font-bold text-slate-900 text-sm">
                  {tr("Online Video Consultation", "ऑनलाइन वीडियो परामर्श")}
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  {availability?.allowedConsultationType === "IN_CLINIC_ONLY"
                    ? tr(
                        "Currently paused by doctor",
                        "वर्तमान में डॉक्टर द्वारा रोका गया है"
                      )
                    : tr(
                        "1-on-1 Video Call with Dr. Nitu • ₹700",
                        "डॉ. नीतू के साथ 1-ऑन-1 वीडियो कॉल • ₹700"
                      )}
                </div>
              </button>
            </div>
          </div>

          {/* 2. Select Date */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                {tr(
                  "2. Select Appointment Date",
                  "2. अपॉइंटमेंट की तारीख चुनें"
                )}
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setDate(todayStr);
                    setIsEmergency(false);
                  }}
                  className={`text-xs px-2.5 py-1 rounded-lg font-semibold transition cursor-pointer ${
                    date === todayStr
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {tr("Today", "आज")}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDate(tomorrowStr);
                    setIsEmergency(false);
                  }}
                  className={`text-xs px-2.5 py-1 rounded-lg font-semibold transition cursor-pointer ${
                    date === tomorrowStr
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {tr("Tomorrow", "कल")}
                </button>
              </div>
            </div>
            <input
              type="date"
              min={todayStr}
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setIsEmergency(false);
              }}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Closure Banner & Doctor Emergency Override Prompt */}
          {availability?.isClosedForMode && (
            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[11px] font-extrabold text-amber-800 uppercase tracking-wider">
                    {tr(
                      `Schedule Notice for ${date}`,
                      `${date} के लिए समय सूचना`
                    )}
                  </span>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">
                    {availability.closureMessage}
                  </p>
                </div>
              </div>

              {availability.isEmergencyAvailable && (
                <div className="pt-2 border-t border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <p className="text-xs text-amber-900 font-medium">
                    🩺 {availability.emergencyNote}
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsEmergency(!isEmergency)}
                    className={`px-4 py-2 rounded-xl text-xs font-extrabold transition shrink-0 cursor-pointer ${
                      isEmergency
                        ? "bg-red-600 text-white shadow-sm"
                        : "bg-white text-red-700 border border-red-300 hover:bg-red-50"
                    }`}
                  >
                    {isEmergency
                      ? tr("✓ Emergency Mode Active", "✓ आपातकालीन मोड सक्रिय")
                      : tr(
                          "Request Emergency Consultation",
                          "आपातकालीन परामर्श का अनुरोध करें"
                        )}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 3. Select Time Slot */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                {tr(
                  `3. Select Available Time Slot (${openSlotsCount} Open)`,
                  `3. उपलब्ध समय स्लॉट चुनें (${openSlotsCount} उपलब्ध)`
                )}
              </label>
              <div className="flex items-center gap-3 text-[11px] font-medium text-slate-500">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />{" "}
                  {tr("Selected", "चयनित")}
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-slate-400 inline-block" />{" "}
                  {tr("Time Passed", "समय समाप्त")}
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />{" "}
                  {tr("Booked", "बुक हो चुका")}
                </span>
              </div>
            </div>

            {initialLoading ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <div
                    key={n}
                    className="h-12 rounded-xl bg-slate-100 animate-pulse"
                  />
                ))}
              </div>
            ) : slots.length === 0 ? (
              <div className="p-6 rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-center space-y-2">
                <p className="text-sm font-bold text-slate-700">
                  {tr(
                    "No regular slots open for this selection",
                    "इस चयन के लिए कोई नियमित स्लॉट उपलब्ध नहीं है"
                  )}
                </p>
                <p className="text-xs text-slate-500">
                  {tr(
                    "Please choose another date, switch consultation mode, or enable Emergency Consultation above if applicable.",
                    "कृपया कोई अन्य तारीख चुनें, परामर्श मोड बदलें, या यदि लागू हो तो ऊपर आपातकालीन परामर्श सक्षम करें।"
                  )}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {morningSlots.length > 0 && (
                  <div>
                    <p className="text-[11px] font-bold text-slate-500 uppercase mb-2">
                      {tr("Morning Session", "सुबह का समय")}
                    </p>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                      {morningSlots.map((slot) => {
                        const isSelected =
                          timeSlot === slot.time && !slot.isDisabled;
                        return (
                          <button
                            key={slot.time}
                            type="button"
                            disabled={slot.isDisabled}
                            onClick={() => setTimeSlot(slot.time)}
                            className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition flex flex-col items-center justify-center cursor-pointer ${
                              slot.isBooked
                                ? "bg-red-50/60 text-red-400 border-red-200 line-through cursor-not-allowed"
                                : slot.isPast
                                ? "bg-slate-100 text-slate-400 border-slate-200 line-through cursor-not-allowed"
                                : isSelected
                                ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                                : "bg-slate-50 text-slate-700 border-slate-200 hover:border-blue-300"
                            }`}
                          >
                            <span>{slot.time}</span>
                            {slot.isBooked && (
                              <span className="text-[10px] font-bold text-red-500 no-underline mt-0.5">
                                {tr("Booked", "बुक हो चुका")}
                              </span>
                            )}
                            {!slot.isBooked && slot.isPast && (
                              <span className="text-[10px] font-medium text-slate-400 no-underline mt-0.5">
                                {tr("Time Passed", "समय समाप्त")}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {availability?.scheduleSummary && (
                  <div className="py-2 px-3 rounded-xl bg-slate-100 text-slate-600 text-[11px] font-bold text-center">
                    {tr(
                      `Clinic Lunch Break: ${availability.scheduleSummary.lunchStart} – ${availability.scheduleSummary.lunchEnd}`,
                      `क्लिनिक लंच ब्रेक: ${availability.scheduleSummary.lunchStart} – ${availability.scheduleSummary.lunchEnd}`
                    )}
                  </div>
                )}

                {eveningSlots.length > 0 && (
                  <div>
                    <p className="text-[11px] font-bold text-slate-500 uppercase mb-2">
                      {tr("Evening Session", "शाम का समय")}
                    </p>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                      {eveningSlots.map((slot) => {
                        const isSelected =
                          timeSlot === slot.time && !slot.isDisabled;
                        return (
                          <button
                            key={slot.time}
                            type="button"
                            disabled={slot.isDisabled}
                            onClick={() => setTimeSlot(slot.time)}
                            className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition flex flex-col items-center justify-center cursor-pointer ${
                              slot.isBooked
                                ? "bg-red-50/60 text-red-400 border-red-200 line-through cursor-not-allowed"
                                : slot.isPast
                                ? "bg-slate-100 text-slate-400 border-slate-200 line-through cursor-not-allowed"
                                : isSelected
                                ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                                : "bg-slate-50 text-slate-700 border-slate-200 hover:border-blue-300"
                            }`}
                          >
                            <span>{slot.time}</span>
                            {slot.isBooked && (
                              <span className="text-[10px] font-bold text-red-500 no-underline mt-0.5">
                                {tr("Booked", "बुक हो चुका")}
                              </span>
                            )}
                            {!slot.isBooked && slot.isPast && (
                              <span className="text-[10px] font-medium text-slate-400 no-underline mt-0.5">
                                {tr("Time Passed", "समय समाप्त")}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 4. Payment Method */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
              {tr("4. Payment Preference", "4. भुगतान का विकल्प")}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {mode === "in-clinic" && (
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cash")}
                  className={`p-4 rounded-2xl border text-left transition cursor-pointer ${
                    paymentMethod === "cash"
                      ? "border-blue-600 bg-blue-50/60 ring-2 ring-blue-600/20"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="font-bold text-slate-900 text-sm">
                    {tr("Pay Cash at Clinic", "क्लिनिक में नकद भुगतान करें")}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    {tr(
                      "Pay directly at reception during your visit",
                      "अपनी विजिट के दौरान रिसेप्शन पर सीधे भुगतान करें"
                    )}
                  </div>
                </button>
              )}

              <button
                type="button"
                onClick={() => setPaymentMethod("online")}
                className={`p-4 rounded-2xl border text-left transition cursor-pointer ${
                  paymentMethod === "online"
                    ? "border-blue-600 bg-blue-50/60 ring-2 ring-blue-600/20"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="font-bold text-slate-900 text-sm">
                  {tr("Pay Online Now", "अभी ऑनलाइन भुगतान करें")}
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  {tr(
                    "Instant confirmation via UPI / Card / NetBanking",
                    "UPI / कार्ड / नेटबैंकिंग के माध्यम से तुरंत पुष्टि"
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || initialLoading || !timeSlot}
            className="w-full py-3.5 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-bold text-sm rounded-xl shadow-sm transition cursor-pointer"
          >
            {loading
              ? tr("Confirming Appointment...", "अपॉइंटमेंट की पुष्टि हो रही है...")
              : timeSlot
              ? tr(
                  `Confirm ${isEmergency ? "Emergency " : ""}Booking (${timeSlot})`,
                  `${isEmergency ? "आपातकालीन " : ""}बुकिंग की पुष्टि करें (${timeSlot})`
                )
              : tr(
                  "Select an Open Slot to Continue",
                  "आगे बढ़ने के लिए एक उपलब्ध स्लॉट चुनें"
                )}
          </button>
        </form>
      </div>
    </div>
  );
}