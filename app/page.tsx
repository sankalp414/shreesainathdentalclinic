import { Suspense } from "react";
import { connection } from "next/server";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Heart,
  MessageCircle,
  Phone,
  ShieldCheck,
  Smile,
  Star,
  Video,
} from "lucide-react";


import familySmiling from "@/assets/images/family_smiling_hero_1788427831290.jpg"
import doctorImage from "@/assets/images/doctorImage.jpeg"
import patientComfort from "@/assets/images/patientcomfort.jpg"
import familyBrushing from "@/assets/images/familybrushing.jpg"
import dentalDetails from "@/assets/images/dentaldetails.jpg"
import familyClinic from "@/assets/images/familyclinic.jpg"
import treatmentcare from "@/assets/images/treatmentcare.jpg"
import clinicroom from "@/assets/images/clinicroom.jpg"
import homehero from "@/assets/images/homehero.jpg"

import { ensureDatabaseSchema } from "@/lib/ensure-db-schema";
import {
  getClinicScheduleConfig,
  getPersistedDatabaseSlots,
} from "@/app/actions/clinic-schedule";
import { getBlogs } from "@/app/actions/clinic-cms";
import { getApprovedPublicReviews } from "@/app/actions/reviews";
import { getCurrentUserRole } from "@/app/actions/auth-role";
import { getServerLanguage } from "@/lib/server-language";

const ASSETS = {
  homehero:homehero.src,
  heroFamily:familySmiling.src,
  doctorPortrait:doctorImage.src,
  comfortCare:patientComfort.src,
  familyBrushing: familyBrushing.src,
  dentalDetails:dentalDetails.src,
  familyClinic:familyClinic.src,
  clinicRoom:treatmentcare.src,
  smileMoment:clinicroom.src,
  treatmentCare:familyClinic.src,
};

async function HomeContent() {
  await connection();
  await ensureDatabaseSchema();

  const [
    scheduleConfig,
    persistedSlots,
    publishedBlogs,
    approvedReviews,
    authState,
    { tr },
  ] = await Promise.all([
    getClinicScheduleConfig(),
    getPersistedDatabaseSlots(),
    getBlogs(false),
    getApprovedPublicReviews(),
    getCurrentUserRole(),
    getServerLanguage(),
  ]);

  const CLINICAL_SERVICES = [
    {
      number: "01",
      title: tr("Single-Sitting RCT", "सिंगल-सिटिंग आरसीटी (RCT)"),
      badge: tr("Painless Endodontics", "दर्दरहित रूट कैनाल"),
      price: tr("₹4,500 onwards", "₹4,500 से शुरू"),
      description: tr(
        "Rotary endodontics with apex-locator precision and digital RVG X-rays for zero post-operative discomfort.",
        "बिना किसी दर्द के सटीक इलाज के लिए रोटरी एंडोडोंटिक्स, एपेक्स-लोकेटर और डिजिटल RVG एक्स-रे।"
      ),
    },
    {
      number: "02",
      title: tr("3D Zirconia Crowns", "3D ज़िरकोनिया क्राउन"),
      badge: tr("10–15 Year Warranty", "10–15 वर्ष की वारंटी"),
      price: tr("₹6,500 onwards", "₹6,500 से शुरू"),
      description: tr(
        "Metal-free CAD/CAM monolithic crowns matched to your natural tooth shade, bite alignment, and smile line.",
        "आपके प्राकृतिक दांतों के रंग और मुस्कान से मेल खाने वाले मेटल-फ्री CAD/CAM मोनोलिथिक क्राउन।"
      ),
    },
    {
      number: "03",
      title: tr("Clear Aligners", "क्लियर एलाइनर्स"),
      badge: tr("Digital 3D Scan", "डिजिटल 3D स्कैन"),
      price: tr("₹45,000 onwards", "₹45,000 से शुरू"),
      description: tr(
        "Invisible orthodontic aligners and aesthetic ceramic veneers customized for confident, natural smiles.",
        "आत्मविश्वास भरी और प्राकृतिक मुस्कान के लिए अदृश्य ऑर्थोडोंटिक एलाइनर्स और सिरेमिक वेनियर्स।"
      ),
    },
    {
      number: "04",
      title: tr("Titanium Implants", "टाइटेनियम इम्प्लांट्स"),
      badge: tr("Lifetime Osseointegration", "जीवनभर की मजबूती"),
      price: tr("₹22,000 onwards", "₹22,000 से शुरू"),
      description: tr(
        "Guided keyhole implant placement for durable, permanent replacement of single or multiple missing teeth.",
        "एक या अधिक टूटे हुए दांतों के स्थायी और मजबूत विकल्प के लिए गाइडेड की-होल डेंटल इम्प्लांट्स।"
      ),
    },
    {
      number: "05",
      title: tr("Laser Gum Care", "लेजर मसूड़ों की देखभाल"),
      badge: tr("Zero Bleeding", "बिना रक्तस्राव"),
      price: tr("₹1,200 onwards", "₹1,200 से शुरू"),
      description: tr(
        "Gentle ultrasonic biofilm removal, stain polishing, and deep laser pocket disinfection in 30 minutes.",
        "मात्र 30 मिनट में अल्ट्रासोनिक सफाई, दाग पॉलिशिंग और मसूड़ों का गहरा लेजर कीटाणुशोधन।"
      ),
    },
    {
      number: "06",
      title: tr("Video Tele-Dentistry", "वीडियो टेली-डेंटिस्ट्री"),
      badge: tr("Instant WhatsApp Link", "तुरंत व्हाट्सएप लिंक"),
      price: tr("₹300 Consultation", "₹300 परामर्श"),
      description: tr(
        "Live consultation with Dr. Nitu Rajpoot, digital prescription, and X-ray review over Google Meet.",
        "गूगल मीट पर डॉ. नीतू राजपूत के साथ लाइव परामर्श, डिजिटल प्रिस्क्रिप्शन और एक्स-रे समीक्षा।"
      ),
    },
  ];

  const FALLBACK_REVIEWS = [
    {
      id: "fallback-1",
      patientName: tr("Priya Kulkarni", "प्रिया कुलकर्णी"),
      treatmentType: tr("Single-Sitting Root Canal", "सिंगल-सिटिंग रूट कैनाल"),
      rating: 5,
      comment: tr(
        "I never felt rushed. Every question was answered, and for the first time I understood my options. Dr. Nitu completed my molar root canal in one sitting without any pain at all.",
        "मुझे कभी जल्दबाजी महसूस नहीं हुई। मेरे हर सवाल का जवाब दिया गया, और डॉ. नीतू ने बिना किसी दर्द के एक ही सिटिंग में मेरा रूट कैनाल पूरा किया।"
      ),
    },
    {
      id: "fallback-2",
      patientName: tr("Rohan Mehta", "रोहन मेहता"),
      treatmentType: tr("Video Consultation & Zirconia Crown", "वीडियो परामर्श और ज़िरकोनिया क्राउन"),
      rating: 5,
      comment: tr(
        "Dr. Nitu remembered the details that mattered to me. The whole experience felt genuinely personal. Booked a video slot and immediately received the Google Meet link on WhatsApp.",
        "डॉ. नीतू ने मेरी हर छोटी बात का ध्यान रखा। पूरा अनुभव बहुत व्यक्तिगत लगा। वीडियो स्लॉट बुक करते ही तुरंत व्हाट्सएप पर गूगल मीट लिंक मिल गया।"
      ),
    },
    {
      id: "fallback-3",
      patientName: tr("Priya & Family", "प्रिया और परिवार"),
      treatmentType: tr("Family Care & Ultrasonic Scaling", "पारिवारिक देखभाल और अल्ट्रासोनिक स्केलिंग"),
      rating: 5,
      comment: tr(
        "My children now ask when we are going back. That says everything about how calm and welcoming the clinic feels. Every tooth condition was charted on our portal before starting.",
        "मेरे बच्चे अब पूछते हैं कि हम वापस कब जा रहे हैं। यह बताता है कि क्लिनिक का माहौल कितना शांत और स्वागतपूर्ण है। इलाज से पहले हर दांत की स्थिति पोर्टल पर समझाई गई।"
      ),
    },
  ];

  const morningSlots = persistedSlots.filter((s: any) => s.period === "MORNING");
  const eveningSlots = persistedSlots.filter((s: any) => s.period === "EVENING");

  const reviewsToDisplay =
    approvedReviews && approvedReviews.length > 0
      ? approvedReviews
      : FALLBACK_REVIEWS;

  const dashboardHref =
    authState.role === "DOCTOR" ? "/doctor/dashboard" : "/patient/dashboard";

  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-[#d7f0ea] selection:text-[#1b535d]">
      
      {/* ========================================================
          1. HERO SECTION (FULL BLEED BEHIND FLOATING NAVBAR)
          ======================================================== */}
      <section className="relative min-h-[min(880px,96vh)] overflow-hidden bg-slate-950">
        <img
          src={ASSETS.heroFamily}
          alt={tr("A joyful family smiling together on green grass", "हरी घास पर एक साथ मुस्कुराता हुआ खुशहाल परिवार")}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Dark slate gradient shade */}
        {/* <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/55 to-slate-950/35" /> */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/15 to-transparent" />


        {/* Content Container (starts with generous top padding for the floating nav) */}
        <div className="relative z-10 mx-auto flex min-h-[min(880px,66vh)] max-w-7xl flex-col justify-center items-start px-6 sm:px-10 pt-36 pb-20 text-white">
          
          {/* Eyebrow Pill + Live Clinic Status Integrated */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="rounded-full border border-white/20 bg-black/35 px-4 py-1.5 text-xs font-semibold tracking-wide text-white backdrop-blur-md">
              {tr("Shree Sainath Dental Clinic • Bilaspur", "श्री साईनाथ डेंटल क्लिनिक • बिलासपुर")}
            </span>

            {/* {scheduleConfig.allowEmergencyOverride && (
              <span className="inline-flex items-center gap-2 rounded-full border border-rose-400/40 bg-rose-950/60 px-3.5 py-1.5 text-xs font-bold text-rose-200 backdrop-blur-md">
                {/* <span className="size-2 rounded-full bg-rose-400 animate-ping" /> */}
                {/* <span>{scheduleConfig.emergencyNote}</span> 
              </span>
            )} */}
          </div>

          {/* Oversized Serif Headline with Instrument Serif */}
          <h1 className="mt-7 max-w-4xl font-['Instrument_Serif',serif] text-5xl sm:text-7xl lg:text-8xl font-normal tracking-tight text-white leading-[0.88] text-balance">
            {tr("Comfortable, modern care with", "आरामदायक और आधुनिक दंत चिकित्सा,")}{" "}
            <em className="italic font-normal text-[#d7f0ea]">
              {tr("Dr. Nitu Rajpoot", "डॉ. नीतू राजपूत के साथ")}
            </em>
            .
          </h1>

          {/* Hero Copy */}
          <p className="mt-7 max-w-xl text-base sm:text-lg leading-relaxed text-white/90">
            {tr(
              "Thoughtful dentistry with one familiar doctor, one clear plan, and all the time you need. Backed by interactive 32-tooth odontogram charting and instant tele-dentistry.",
              "एक परिचित डॉक्टर, एक स्पष्ट उपचार योजना और आपके लिए पर्याप्त समय के साथ संवेदनशील दंत चिकित्सा। इंटरैक्टिव 32-दांत ओडोंटोग्राम चार्टिंग और तुरंत टेली-डेंटिस्ट्री की सुविधा के साथ।"
            )}
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-9 flex flex-wrap items-center gap-3.5">
            <Link
              href="/patient/book"
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[#0d1f27] hover:bg-slate-100 transition-all shadow-xl hover:-translate-y-0.5"
            >
              <span>{tr("Book a visit", "अपॉइंटमेंट बुक करें")}</span>
              <ArrowRight className="size-4" />
            </Link>

            {authState.isSignedIn ? (
              <Link
                href={dashboardHref}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/30 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md hover:bg-black/45 transition-all hover:-translate-y-0.5"
              >
                <span>
                  {authState.role === "DOCTOR"
                    ? tr("Doctor Command Center", "डॉक्टर कमांड सेंटर")
                    : tr("My Patient Portal", "मेरा पेशेंट पोर्टल")}
                </span>
                <ArrowRight className="size-4" />
              </Link>
            ) : (
              <Link
                href="/sign-in"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/30 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md hover:bg-black/45 transition-all hover:-translate-y-0.5"
              >
                <span>{tr("Patient / Doctor Sign In", "मरीज / डॉक्टर साइन इन")}</span>
              </Link>
            )}

            <a
              href="tel:+916261474753"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3.5 text-sm font-semibold text-white backdrop-blur-md hover:bg-white/20 transition-all"
            >
              <Phone className="size-4" />
              <span>{tr("Call Clinic", "क्लिनिक में कॉल करें")}</span>
            </a>
          </div>
        </div>

        {/* Coral horizontal accent bar */}
        <div
          className="absolute right-0 bottom-0 z-20 h-2 sm:h-2.5 w-[min(32vw,24rem)] bg-[#f06449]"
          aria-hidden="true"
        />
      </section>

      {/* ========================================================
          2. TRUST RIBBON (TEAL 3-COLUMN DIVIDER WITH ICON BLOOM)
          ======================================================== */}
      <section className="bg-[#1b535d] text-white border-b border-[#14424a]">
        <div className="mx-auto grid max-w-7xl divide-y divide-[#14424a] px-6 sm:px-10 md:grid-cols-3 md:divide-x md:divide-y-0">
          <div className="flex items-center gap-4 py-7 md:px-7 first:pl-0">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#d7f0ea] text-[#1b535d] shadow-md">
              <Smile className="size-5" />
            </span>
            <div>
              <p className="text-sm font-bold text-white">
                {tr("One familiar doctor", "एक परिचित और अनुभवी डॉक्टर")}
              </p>
              <p className="mt-1 text-xs text-[#d7f0ea]/80">
                {tr("See Dr. Nitu Rajpoot at every visit.", "हर विजिट पर डॉ. नीतू राजपूत से परामर्श पाएं।")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 py-7 md:px-7">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#d7f0ea] text-[#1b535d] shadow-md">
              <Heart className="size-5" />
            </span>
            <div>
              <p className="text-sm font-bold text-white">
                {tr("Comfort comes first", "आपका आराम सबसे पहले")}
              </p>
              <p className="mt-1 text-xs text-[#d7f0ea]/80">
                {tr("A calm pace, zero pain, always explained.", "शांत वातावरण, दर्दरहित इलाज और स्पष्ट जानकारी।")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 py-7 md:px-7">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#d7f0ea] text-[#1b535d] shadow-md">
              <ShieldCheck className="size-5" />
            </span>
            <div>
              <p className="text-sm font-bold text-white">
                {tr("Care built to last", "लंबे समय तक टिकने वाली देखभाल")}
              </p>
              <p className="mt-1 text-xs text-[#d7f0ea]/80">
                {tr("Conservative, long-term tooth preservation.", "प्राकृतिक दांतों को सुरक्षित रखने वाला स्थायी इलाज।")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. DENTISTRY, RECONSIDERED (TREATMENT CARDS WITH CORAL HOVER)
          ======================================================== */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 sm:py-28">
        <div className="grid items-end gap-8 md:grid-cols-[1fr_.6fr]">
          <div>
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[#1b535d]">
              {tr("Dentistry, reconsidered", "दंत चिकित्सा का नया अनुभव")}
            </p>
            <h2 className="mt-4 font-['Instrument_Serif',serif] text-4xl sm:text-6xl font-normal tracking-tight text-slate-900 leading-[0.98]">
              {tr("Healthy smiles begin with feeling heard.", "स्वस्थ मुस्कान की शुरुआत आपकी बात सुनने से होती है।")}
            </h2>
          </div>
          <p className="text-sm sm:text-base leading-relaxed text-slate-600">
            {tr(
              "There is no revolving door here. Dr. Nitu gets to know your dental history, your goals, and even the things that make dental visits uneasy—then shapes gentle care around you.",
              "यहाँ किसी तरह की जल्दबाजी नहीं होती। डॉ. नीतू आपके दंत इतिहास, आपकी जरूरतों और आपकी चिंताओं को ध्यान से समझती हैं—और फिर आपके अनुसार कोमल व सुरक्षित इलाज तय करती हैं।"
            )}
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CLINICAL_SERVICES.map((item) => (
            <article
              key={item.number}
              className="group relative flex min-h-[22rem] flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#d7f0ea] hover:shadow-xl"
            >
              <div className="absolute inset-x-0 bottom-0 h-1.5 bg-[#f06449] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />

              <div>
                <div className="flex items-center justify-between">
                  <span className="grid size-10 place-items-center rounded-full bg-[#f7f5f0] text-[#1b535d] text-xs font-extrabold">
                    {item.number}
                  </span>
                  <span className="rounded-full bg-[#d7f0ea]/60 px-2.5 py-0.5 text-[11px] font-bold text-[#1b535d]">
                    {item.badge}
                  </span>
                </div>

                <h3 className="mt-8 font-['Instrument_Serif',serif] text-2xl sm:text-3xl font-normal text-slate-900 leading-snug">
                  {item.title}
                </h3>
                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="font-['Instrument_Serif',serif] text-base font-bold text-slate-900">
                  {item.price}
                </span>
                <Link
                  href="/patient/book"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1b535d] hover:text-[#14424a] group-hover:translate-x-0.5 transition-transform"
                >
                  <span>{tr("Book Slot", "स्लॉट बुक करें")}</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ========================================================
          4. LIVE CLINIC SCHEDULE
          ======================================================== */}
      <section className="bg-[#f7f5f0] border-y border-slate-200/80 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <div className="rounded-[2.5rem] border border-white/20 bg-[#0d1f27] p-8 sm:p-12 text-white shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-7 space-y-6">
                <span className="inline-block rounded-full border border-white/15 bg-white/10 px-4 py-1 text-xs font-semibold text-teal-200">
                  {tr("Live Clinic Timings", "क्लिनिक का लाइव समय")}
                </span>

                <h2 className="font-['Instrument_Serif',serif] text-3xl sm:text-5xl font-normal text-white leading-tight">
                  {tr("Schedule today's visit with", "आज ही अपना अपॉइंटमेंट बुक करें")}{" "}
                  <em className="italic text-[#d7f0ea]">
                    {tr("Dr. Nitu Rajpoot", "डॉ. नीतू राजपूत के साथ")}
                  </em>
                </h2>

                <p className="text-sm sm:text-base leading-relaxed text-white/75 max-w-xl">
                  {tr(
                    "Choose from morning or evening clinical slots, or book an instant Google Meet tele-dentistry session delivered straight to WhatsApp.",
                    "सुबह या शाम के क्लिनिक स्लॉट में से चुनें, या सीधे अपने व्हाट्सएप पर गूगल मीट वीडियो परामर्श बुक करें।"
                  )}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href="/patient/book"
                    className="inline-flex items-center gap-2 rounded-full bg-[#f06449] px-7 py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg hover:bg-rose-500 hover:-translate-y-0.5 transition-all"
                  >
                    <span>{tr("Reserve Your Slot", "अपना स्लॉट बुक करें")}</span>
                    <ArrowRight className="size-4" />
                  </Link>
                  <div className="flex items-center gap-2 text-xs font-semibold text-white/70">
                    <Video className="size-4 text-[#d7f0ea]" />
                    <span>{tr("Instant WhatsApp video link", "तुरंत व्हाट्सएप वीडियो लिंक")}</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-white/80">
                    <span className="font-bold">{tr("☀️ Morning Session", "☀️ सुबह का समय")}</span>
                    <span className="text-teal-300 font-semibold text-[11px]">
                      {scheduleConfig.startTime} – {scheduleConfig.lunchStart}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {morningSlots.slice(0, 8).map((slot: any) => (
                      <span
                        key={slot.slotTime}
                        className="rounded-lg border border-teal-400/25 bg-teal-950/80 px-2.5 py-1 text-xs font-semibold text-teal-200"
                      >
                        {slot.slotTime}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-white/80">
                    <span className="font-bold">{tr("🌙 Evening Session", "🌙 शाम का समय")}</span>
                    <span className="text-teal-300 font-semibold text-[11px]">
                      {scheduleConfig.lunchEnd} – {scheduleConfig.endTime}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {eveningSlots.slice(0, 8).map((slot: any) => (
                      <span
                        key={slot.slotTime}
                        className="rounded-lg border border-teal-400/25 bg-teal-950/80 px-2.5 py-1 text-xs font-semibold text-teal-200"
                      >
                        {slot.slotTime}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          5. CARE YOU CAN PICTURE (MOSAIC)
          ======================================================== */}
      <section className="bg-[#f7f5f0] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <div className="max-w-3xl">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[#1b535d]">
              {tr("Care you can picture", "देखभाल जो आप महसूस कर सकें")}
            </p>
            <h2 className="mt-4 font-['Instrument_Serif',serif] text-4xl sm:text-6xl font-normal tracking-tight text-slate-900 leading-[0.98]">
              {tr("Every smile has its own story.", "हर मुस्कान की अपनी एक कहानी होती है।")}
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-600">
              {tr(
                "From a child’s very first healthy habits to comfortable, conservative care later in life, the same thoughtful approach follows you.",
                "बच्चों की पहली स्वस्थ आदतों से लेकर बड़ों के आरामदायक और सुरक्षित इलाज तक, हम हर कदम पर आपके साथ हैं।"
              )}
            </p>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-1 md:grid-cols-[1.15fr_.85fr] md:grid-rows-2">
            <figure className="group relative min-h-[22rem] md:min-h-[38rem] md:row-span-2 overflow-hidden rounded-2xl bg-[#1b535d] shadow-lg">
              <img
                src={ASSETS.comfortCare}
                alt={tr("Dr. Nitu reassuring a relaxed patient", "मरीज को आश्वस्त करतीं डॉ. नीतू")}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              <figcaption className="absolute inset-x-6 bottom-6 text-white space-y-1">
                <strong className="block font-['Instrument_Serif',serif] text-2xl font-normal sm:text-3xl">
                  {tr("Comfort from the first hello", "पहली मुलाकात से ही आरामदायक अनुभव")}
                </strong>
                <span className="block text-xs sm:text-sm text-white/80">
                  {tr("Calm, respectful care in a bright, modern clinic space.", "आधुनिक और स्वच्छ क्लिनिक में शांत एवं सम्मानजनक देखभाल।")}
                </span>
              </figcaption>
            </figure>

            <figure className="group relative min-h-[18rem] overflow-hidden rounded-2xl bg-[#1b535d] shadow-lg">
              <img
                src={ASSETS.familyBrushing}
                alt={tr("Mother and daughter brushing teeth together", "माँ और बेटी एक साथ ब्रश करते हुए")}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              <figcaption className="absolute inset-x-6 bottom-6 text-white space-y-1">
                <strong className="block font-['Instrument_Serif',serif] text-xl sm:text-2xl font-normal">
                  {tr("Healthy habits, made joyful", "स्वस्थ आदतें, खुशी के साथ")}
                </strong>
                <span className="block text-xs text-white/80">
                  {tr("Practical oral health support for every generation.", "हर पीढ़ी के लिए व्यावहारिक दंत स्वास्थ्य मार्गदर्शन।")}
                </span>
              </figcaption>
            </figure>

            <figure className="group relative min-h-[18rem] overflow-hidden rounded-2xl bg-[#1b535d] shadow-lg">
              <img
                src={ASSETS.dentalDetails}
                alt={tr("Dental models and precision oral care instruments", "आधुनिक डेंटल मॉडल और सटीक उपकरण")}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              <figcaption className="absolute inset-x-6 bottom-6 text-white space-y-1">
                <strong className="block font-['Instrument_Serif',serif] text-xl sm:text-2xl font-normal">
                  {tr("Clarity in every detail", "हर विवरण में पूरी पारदर्शिता")}
                </strong>
                <span className="block text-xs text-white/80">
                  {tr("Modern tools and digital charts explained in simple language.", "सरल भाषा में आधुनिक उपकरणों और डिजिटल चार्ट की जानकारी।")}
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ========================================================
          6. FOR THE WHOLE FAMILY (PHOTO NARRATIVE)
          ======================================================== */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 sm:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_.92fr]">
          <div className="aspect-[4/3] lg:aspect-square overflow-hidden rounded-2xl bg-[#f7f5f0] shadow-xl">
            <img
              src={ASSETS.familyClinic}
              alt={tr("A father and son sharing a warm smile in the clinic", "क्लिनिक में मुस्कुराते हुए पिता और पुत्र")}
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>

          <div className="space-y-6 max-w-xl">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[#1b535d]">
              {tr("For the whole family", "पूरे परिवार के लिए")}
            </p>
            <h2 className="font-['Instrument_Serif',serif] text-4xl sm:text-5xl font-normal tracking-tight text-slate-900 leading-[1.05]">
              {tr("Little visits can make a lasting difference.", "छोटी-छोटी नियमित जांच बड़ा बदलाव लाती हैं।")}
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-slate-600">
              {tr(
                "When children and parents feel welcome and understood, good dental habits become a natural part of growing up.",
                "जब बच्चे और माता-पिता सहज और सुरक्षित महसूस करते हैं, तो दांतों की अच्छी देखभाल जीवनशैली का एक स्वाभाविक हिस्सा बन जाती है।"
              )}
            </p>
            <p className="border-t border-slate-200 pt-6 text-xs sm:text-sm leading-relaxed text-slate-500">
              {tr(
                "A familiar face and an unhurried approach make space for questions, anxiety relief, and preventive dental care at every age.",
                "एक परिचित चेहरा और शांत दृष्टिकोण हर उम्र में आपके सवालों के जवाब देने, डर दूर करने और निवारक देखभाल के लिए समय देता है।"
              )}
            </p>
            <div>
              <Link
                href="/treatments"
                className="inline-flex items-center gap-2 rounded-full bg-[#1b535d] px-7 py-3.5 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-[#14424a] hover:-translate-y-0.5 transition-all"
              >
                <span>{tr("Explore Our Treatments", "हमारे उपचार देखें")}</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          7. MEET DR. Nitu (OFFSET STAGE & CORAL STAMP)
          ======================================================== */}
      <section className="bg-[#f7f5f0] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <div className="grid items-center gap-12 lg:grid-cols-[.85fr_1.15fr]">
            
            <div className="relative">
              <div className="relative z-10 overflow-hidden rounded-2xl bg-white shadow-2xl">
                <img
                  src={ASSETS.doctorPortrait}
                  alt={tr("Dr. Nitu Rajpoot, BDS in her clinic", "अपने क्लिनिक में डॉ. नीतू राजपूत, बीडीएस")}
                  className="aspect-[4/5] w-full object-cover object-top"
                />
              </div>
              <div className="absolute -inset-4 z-0 rounded-3xl bg-[#1b535d]" />
              <div className="absolute -right-3 -bottom-3 z-20 rounded-2xl bg-[#f06449] p-5 text-white shadow-xl">
                <p className="font-['Instrument_Serif',serif] text-3xl sm:text-4xl font-normal leading-none">
                  {tr("15+ years", "15+ वर्ष")}
                </p>
                <p className="mt-1 text-xs font-semibold tracking-wide text-white/90">
                  {tr("of thoughtful dentistry", "विश्वसनीय दंत चिकित्सा अनुभव")}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[#1b535d]">
                {tr("Meet Dr. Nitu Rajpoot, BDS", "डॉ. नीतू राजपूत (BDS) से मिलें")}
              </p>
              <h2 className="font-['Instrument_Serif',serif] text-4xl sm:text-5xl font-normal tracking-tight text-slate-900 leading-[1.05]">
                {tr("The reassurance of seeing someone who knows you.", "एक ऐसे डॉक्टर का भरोसा जो आपकी जरूरतों को समझते हैं।")}
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-slate-600">
                {tr(
                  "As the clinic’s founder and only dentist, Dr. Nitu is there for the initial conversation, every treatment, and all the small decisions in between.",
                  "क्लिनिक की संस्थापक और मुख्य दंत चिकित्सक के रूप में, डॉ. नीतू पहले परामर्श से लेकर हर उपचार और देखभाल के हर चरण में स्वयं आपके साथ रहती हैं।"
                )}
              </p>
              <blockquote className="border-l-4 border-[#f06449] pl-6 font-['Instrument_Serif',serif] text-xl sm:text-2xl italic leading-relaxed text-slate-800">
                &ldquo;{tr("Excellent dentistry should feel clear, collaborative, and deeply kind.", "उत्कृष्ट दंत चिकित्सा स्पष्ट, सहयोगात्मक और बेहद संवेदनशील होनी चाहिए।")}&rdquo;
              </blockquote>
              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-full bg-[#1b535d] px-7 py-3.5 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-[#14424a] hover:-translate-y-0.5 transition-all"
                >
                  <span>{tr("Meet Dr. Nitu", "डॉ. नीतू के बारे में जानें")}</span>
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          8. A GENTLER EXPERIENCE
          ======================================================== */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 sm:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[#1b535d]">
              {tr("A gentler experience", "एक सौम्य और दर्दरहित अनुभव")}
            </p>
            <h2 className="font-['Instrument_Serif',serif] text-4xl sm:text-5xl font-normal tracking-tight text-slate-900 leading-[1.05]">
              {tr("Modern care without the clinical coldness.", "बिना किसी डर के आधुनिक और आत्मीय इलाज।")}
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-slate-600">
              {tr(
                "From interactive 32-tooth odontogram charting to quieter rotary tools, we use modern technology thoughtfully—only where it makes your care more precise, comfortable, or clear.",
                "इंटरैक्टिव 32-दांत ओडोंटोग्राम चार्टिंग से लेकर शांत रोटरी उपकरणों तक, हम आधुनिक तकनीक का उपयोग आपके इलाज को अधिक सटीक, आरामदायक और स्पष्ट बनाने के लिए करते हैं।"
              )}
            </p>

            <ul className="grid gap-3.5 pt-2 sm:grid-cols-2">
              {[
                tr("Unhurried 1-on-1 appointments", "बिना जल्दबाजी 1-ऑन-1 अपॉइंटमेंट"),
                tr("Interactive 32-tooth odontogram", "इंटरैक्टिव 32-दांत ओडोंटोग्राम"),
                tr("Painless rotary endodontics", "दर्दरहित रोटरी एंडोडोंटिक्स"),
                tr("WhatsApp Google Meet tele-care", "व्हाट्सएप गूगल मीट टेली-केयर"),
                tr("Transparent upfront estimates", "पारदर्शी और स्पष्ट शुल्क जानकारी"),
                tr("Biocompatible metal-free crowns", "बायोकम्पैटिबल मेटल-फ्री क्राउन"),
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 rounded-full border border-slate-200/90 bg-white px-4 py-3 text-xs sm:text-sm font-semibold text-slate-800 shadow-sm"
                >
                  <span className="size-2 rounded-full bg-[#f06449] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="relative z-10 overflow-hidden rounded-2xl bg-white shadow-2xl">
              <img
                src={ASSETS.treatmentCare}
                alt={tr("Dr. Nitu explaining treatment plan to patient", "मरीज को उपचार योजना समझातीं डॉ. नीतू")}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="absolute -inset-4 z-0 rounded-3xl bg-[#f06449]/20" />
          </div>
        </div>
      </section>

      {/* ========================================================
          9. PHOTO MOMENTS
          ======================================================== */}
      <section className="bg-[#f7f5f0] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <div className="max-w-3xl">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[#1b535d]">
              {tr("Inside Shree Sainath Dental Clinic", "श्री साईनाथ डेंटल क्लिनिक की झलक")}
            </p>
            <h2 className="mt-4 font-['Instrument_Serif',serif] text-4xl sm:text-6xl font-normal tracking-tight text-slate-900 leading-[0.98]">
              {tr("A place to feel at ease.", "एक ऐसा स्थान जहाँ आप निश्चिंत महसूस करें।")}
            </h2>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {[
              {
                src: ASSETS.clinicRoom,
                alt: tr("Bright modern dental operatory room", "आधुनिक डेंटल ऑपरेटरी कक्ष"),
                caption: tr("A room that feels welcoming", "स्वागतपूर्ण और शांत वातावरण"),
              },
              {
                src: ASSETS.smileMoment,
                alt: tr("Dr. Nitu sharing mirror with a smiling patient", "मुस्कुराते हुए मरीज के साथ डॉ. नीतू"),
                caption: tr("Results worth smiling about", "परिणाम जो चेहरे पर मुस्कान लाएं"),
              },
              {
                src: ASSETS.familyClinic,
                alt: tr("Father and child relaxing together in clinic", "क्लिनिक में पिता और बच्चा"),
                caption: tr("Comfort for every generation", "हर पीढ़ी के लिए आरामदायक देखभाल"),
              },
            ].map((item) => (
              <figure key={item.caption} className="group space-y-4">
                <div className="aspect-[4/3] sm:aspect-[3/4] overflow-hidden rounded-2xl bg-[#1b535d] shadow-md">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <figcaption className="font-['Instrument_Serif',serif] text-xl sm:text-2xl font-normal text-slate-900">
                  {item.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          10. PATIENT WORDS (DARK INK BACKDROP)
          ======================================================== */}
      <section className="bg-[#0d1f27] text-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-14 border-b border-white/10">
            <div>
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[#f06449]">
                {tr("Patient words • Approved reviews", "मरीजों के अनुभव • सत्यापित समीक्षाएं")}
              </p>
              <h2 className="mt-3 font-['Instrument_Serif',serif] text-4xl sm:text-6xl font-normal tracking-tight text-white leading-[0.98]">
                {tr("The difference is how it feels.", "अंतर इस बात में है कि आप कैसा महसूस करते हैं।")}
              </h2>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white">
              <div className="flex text-[#f06449]">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="size-3.5 fill-current" />
                ))}
              </div>
              <span>{tr("4.9 / 5.0 Patient Satisfaction", "4.9 / 5.0 मरीज संतुष्टि")}</span>
            </div>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {reviewsToDisplay.slice(0, 3).map((item: any, i: number) => (
              <figure key={item.id || i} className="border-t border-white/15 pt-6 flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 text-[#f06449]">
                    {Array.from({ length: Number(item.rating) || 5 }).map((_, j) => (
                      <Star key={j} className="size-4 fill-current" />
                    ))}
                  </div>
                  <blockquote className="mt-6 font-['Instrument_Serif',serif] text-xl sm:text-2xl leading-relaxed text-white/95 font-normal">
                    &ldquo;{item.comment}&rdquo;
                  </blockquote>
                </div>
                <figcaption className="mt-6 text-xs text-white/60 tracking-wider uppercase font-semibold">
                  {item.patientName} · {item.treatmentType || tr("In-Clinic Visit", "क्लिनिक विजिट")}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          11. READY WHEN YOU ARE (SIGNATURE CORAL BOOKING BAND)
          ======================================================== */}
      <section className="bg-[#f06449] text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="space-y-2">
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-white/90">
                {tr("Ready when you are", "जब आप तैयार हों")}
              </p>
              <h2 className="font-['Instrument_Serif',serif] text-3xl sm:text-5xl font-normal leading-tight">
                {tr("Let’s make your next visit", "आइए आपकी अगली क्लिनिक विजिट को")}
                <br />
                <em className="italic font-normal">
                  {tr("feel refreshingly easy.", "बेहद आसान और आरामदायक बनाएं।")}
                </em>
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/patient/book"
                className="inline-flex items-center gap-2 rounded-full bg-[#0d1f27] px-8 py-4 text-sm font-bold text-white shadow-2xl hover:bg-[#142f3b] hover:-translate-y-0.5 transition-all"
              >
                <CalendarDays className="size-4 text-[#f06449]" />
                <span>{tr("Request an appointment", "अपॉइंटमेंट बुक करें")}</span>
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/20 px-7 py-4 text-sm font-semibold text-white hover:bg-white/30 backdrop-blur-sm transition-all"
              >
                <MessageCircle className="size-4" />
                <span>{tr("Contact Clinic", "क्लिनिक से संपर्क करें")}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-6 py-16 space-y-8 animate-pulse">
          <div className="h-[36rem] rounded-3xl bg-slate-200/70" />
          <div className="h-20 rounded-2xl bg-slate-200/50" />
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}