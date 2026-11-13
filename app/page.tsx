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

const CLINICAL_SERVICES = [
  {
    number: "01",
    title: "Single-Sitting RCT",
    badge: "Painless Endodontics",
    price: "₹4,500 onwards",
    description:
      "Rotary endodontics with apex-locator precision and digital RVG X-rays for zero post-operative discomfort.",
  },
  {
    number: "02",
    title: "3D Zirconia Crowns",
    badge: "10–15 Year Warranty",
    price: "₹6,500 onwards",
    description:
      "Metal-free CAD/CAM monolithic crowns matched to your natural tooth shade, bite alignment, and smile line.",
  },
  {
    number: "03",
    title: "Clear Aligners",
    badge: "Digital 3D Scan",
    price: "₹45,000 onwards",
    description:
      "Invisible orthodontic aligners and aesthetic ceramic veneers customized for confident, natural smiles.",
  },
  {
    number: "04",
    title: "Titanium Implants",
    badge: "Lifetime Osseointegration",
    price: "₹22,000 onwards",
    description:
      "Guided keyhole implant placement for durable, permanent replacement of single or multiple missing teeth.",
  },
  {
    number: "05",
    title: "Laser Gum Care",
    badge: "Zero Bleeding",
    price: "₹1,200 onwards",
    description:
      "Gentle ultrasonic biofilm removal, stain polishing, and deep laser pocket disinfection in 30 minutes.",
  },
  {
    number: "06",
    title: "Video Tele-Dentistry",
    badge: "Instant WhatsApp Link",
    price: "₹300 Consultation",
    description:
      "Live consultation with Dr. Nitu Rajpoot, digital prescription, and X-ray review over Google Meet.",
  },
];

const FALLBACK_REVIEWS = [
  {
    id: "fallback-1",
    patientName: "Priya Kulkarni",
    treatmentType: "Single-Sitting Root Canal",
    rating: 5,
    comment:
      "I never felt rushed. Every question was answered, and for the first time I understood my options. Dr. Nitu completed my molar root canal in one sitting without any pain at all.",
  },
  {
    id: "fallback-2",
    patientName: "Rohan Mehta",
    treatmentType: "Video Consultation & Zirconia Crown",
    rating: 5,
    comment:
      "Dr. Nitu remembered the details that mattered to me. The whole experience felt genuinely personal. Booked a video slot and immediately received the Google Meet link on WhatsApp.",
  },
  {
    id: "fallback-3",
    patientName: "Priya & Family",
    treatmentType: "Family Care & Ultrasonic Scaling",
    rating: 5,
    comment:
      "My children now ask when we are going back. That says everything about how calm and welcoming the clinic feels. Every tooth condition was charted on our portal before starting.",
  },
];

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
  ] = await Promise.all([
    getClinicScheduleConfig(),
    getPersistedDatabaseSlots(),
    getBlogs(false),
    getApprovedPublicReviews(),
    getCurrentUserRole(),
  ]);

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
          alt="A joyful family smiling together on green grass"
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
              Shree Sainath Dental Clinic • Bilaspur
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
            Comfortable, modern care with{" "}
            <em className="italic font-normal text-[#d7f0ea]">
              Dr. Nitu Rajpoot
            </em>
            .
          </h1>

          {/* Hero Copy */}
          <p className="mt-7 max-w-xl text-base sm:text-lg leading-relaxed text-white/90">
            Thoughtful dentistry with one familiar doctor, one clear plan, and all the time you need. Backed by interactive 32-tooth odontogram charting and instant tele-dentistry.
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-9 flex flex-wrap items-center gap-3.5">
            <Link
              href="/patient/book"
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[#0d1f27] hover:bg-slate-100 transition-all shadow-xl hover:-translate-y-0.5"
            >
              <span>Book a visit</span>
              <ArrowRight className="size-4" />
            </Link>

            {authState.isSignedIn ? (
              <Link
                href={dashboardHref}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/30 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md hover:bg-black/45 transition-all hover:-translate-y-0.5"
              >
                <span>{authState.role === "DOCTOR" ? "Doctor Command Center" : "My Patient Portal"}</span>
                <ArrowRight className="size-4" />
              </Link>
            ) : (
              <Link
                href="/sign-in"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/30 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md hover:bg-black/45 transition-all hover:-translate-y-0.5"
              >
                <span>Patient / Doctor Sign In</span>
              </Link>
            )}

            <a
              href="tel:+916261474753"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3.5 text-sm font-semibold text-white backdrop-blur-md hover:bg-white/20 transition-all"
            >
              <Phone className="size-4" />
              <span>Call Clinic</span>
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
              <p className="text-sm font-bold text-white">One familiar doctor</p>
              <p className="mt-1 text-xs text-[#d7f0ea]/80">See Dr. Nitu Rajpoot at every visit.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 py-7 md:px-7">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#d7f0ea] text-[#1b535d] shadow-md">
              <Heart className="size-5" />
            </span>
            <div>
              <p className="text-sm font-bold text-white">Comfort comes first</p>
              <p className="mt-1 text-xs text-[#d7f0ea]/80">A calm pace, zero pain, always explained.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 py-7 md:px-7">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#d7f0ea] text-[#1b535d] shadow-md">
              <ShieldCheck className="size-5" />
            </span>
            <div>
              <p className="text-sm font-bold text-white">Care built to last</p>
              <p className="mt-1 text-xs text-[#d7f0ea]/80">Conservative, long-term tooth preservation.</p>
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
              Dentistry, reconsidered
            </p>
            <h2 className="mt-4 font-['Instrument_Serif',serif] text-4xl sm:text-6xl font-normal tracking-tight text-slate-900 leading-[0.98]">
              Healthy smiles begin with feeling heard.
            </h2>
          </div>
          <p className="text-sm sm:text-base leading-relaxed text-slate-600">
            There is no revolving door here. Dr. Nitu gets to know your dental history, your goals, and even the things that make dental visits uneasy—then shapes gentle care around you.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CLINICAL_SERVICES.map((item) => (
            <article
              key={item.title}
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
                  <span>Book Slot</span>
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
                  Live Clinic Timings
                </span>

                <h2 className="font-['Instrument_Serif',serif] text-3xl sm:text-5xl font-normal text-white leading-tight">
                  Schedule today&apos;s visit with{" "}
                  <em className="italic text-[#d7f0ea]">Dr. Nitu Rajpoot</em>
                </h2>

                <p className="text-sm sm:text-base leading-relaxed text-white/75 max-w-xl">
                  Choose from morning or evening clinical slots, or book an instant Google Meet tele-dentistry session delivered straight to WhatsApp.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href="/patient/book"
                    className="inline-flex items-center gap-2 rounded-full bg-[#f06449] px-7 py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg hover:bg-rose-500 hover:-translate-y-0.5 transition-all"
                  >
                    <span>Reserve Your Slot</span>
                    <ArrowRight className="size-4" />
                  </Link>
                  <div className="flex items-center gap-2 text-xs font-semibold text-white/70">
                    <Video className="size-4 text-[#d7f0ea]" />
                    <span>Instant WhatsApp video link</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-white/80">
                    <span className="font-bold">☀️ Morning Session</span>
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
                    <span className="font-bold">🌙 Evening Session</span>
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
              Care you can picture
            </p>
            <h2 className="mt-4 font-['Instrument_Serif',serif] text-4xl sm:text-6xl font-normal tracking-tight text-slate-900 leading-[0.98]">
              Every smile has its own story.
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-600">
              From a child’s very first healthy habits to comfortable, conservative care later in life, the same thoughtful approach follows you.
            </p>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-1 md:grid-cols-[1.15fr_.85fr] md:grid-rows-2">
            <figure className="group relative min-h-[22rem] md:min-h-[38rem] md:row-span-2 overflow-hidden rounded-2xl bg-[#1b535d] shadow-lg">
              <img
                src={ASSETS.comfortCare}
                alt="Dr. Nitu reassuring a relaxed patient"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              <figcaption className="absolute inset-x-6 bottom-6 text-white space-y-1">
                <strong className="block font-['Instrument_Serif',serif] text-2xl font-normal sm:text-3xl">
                  Comfort from the first hello
                </strong>
                <span className="block text-xs sm:text-sm text-white/80">
                  Calm, respectful care in a bright, modern clinic space.
                </span>
              </figcaption>
            </figure>

            <figure className="group relative min-h-[18rem] overflow-hidden rounded-2xl bg-[#1b535d] shadow-lg">
              <img
                src={ASSETS.familyBrushing}
                alt="Mother and daughter brushing teeth together"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              <figcaption className="absolute inset-x-6 bottom-6 text-white space-y-1">
                <strong className="block font-['Instrument_Serif',serif] text-xl sm:text-2xl font-normal">
                  Healthy habits, made joyful
                </strong>
                <span className="block text-xs text-white/80">
                  Practical oral health support for every generation.
                </span>
              </figcaption>
            </figure>

            <figure className="group relative min-h-[18rem] overflow-hidden rounded-2xl bg-[#1b535d] shadow-lg">
              <img
                src={ASSETS.dentalDetails}
                alt="Dental models and precision oral care instruments"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              <figcaption className="absolute inset-x-6 bottom-6 text-white space-y-1">
                <strong className="block font-['Instrument_Serif',serif] text-xl sm:text-2xl font-normal">
                  Clarity in every detail
                </strong>
                <span className="block text-xs text-white/80">
                  Modern tools and digital charts explained in simple language.
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
              alt="A father and son sharing a warm smile in the clinic"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>

          <div className="space-y-6 max-w-xl">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[#1b535d]">
              For the whole family
            </p>
            <h2 className="font-['Instrument_Serif',serif] text-4xl sm:text-5xl font-normal tracking-tight text-slate-900 leading-[1.05]">
              Little visits can make a lasting difference.
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-slate-600">
              When children and parents feel welcome and understood, good dental habits become a natural part of growing up.
            </p>
            <p className="border-t border-slate-200 pt-6 text-xs sm:text-sm leading-relaxed text-slate-500">
              A familiar face and an unhurried approach make space for questions, anxiety relief, and preventive dental care at every age.
            </p>
            <div>
              <Link
                href="/treatments"
                className="inline-flex items-center gap-2 rounded-full bg-[#1b535d] px-7 py-3.5 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-[#14424a] hover:-translate-y-0.5 transition-all"
              >
                <span>Explore Our Treatments</span>
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
                  alt="Dr. Nitu Rajpoot, BDS in her clinic"
                  className="aspect-[4/5] w-full object-cover object-top"
                />
              </div>
              <div className="absolute -inset-4 z-0 rounded-3xl bg-[#1b535d]" />
              <div className="absolute -right-3 -bottom-3 z-20 rounded-2xl bg-[#f06449] p-5 text-white shadow-xl">
                <p className="font-['Instrument_Serif',serif] text-3xl sm:text-4xl font-normal leading-none">
                  15+ years
                </p>
                <p className="mt-1 text-xs font-semibold tracking-wide text-white/90">
                  of thoughtful dentistry
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[#1b535d]">
                Meet Dr. Nitu Rajpoot, BDS
              </p>
              <h2 className="font-['Instrument_Serif',serif] text-4xl sm:text-5xl font-normal tracking-tight text-slate-900 leading-[1.05]">
                The reassurance of seeing someone who knows you.
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-slate-600">
                As the clinic’s founder and only dentist, Dr. Nitu is there for the initial conversation, every treatment, and all the small decisions in between.
              </p>
              <blockquote className="border-l-4 border-[#f06449] pl-6 font-['Instrument_Serif',serif] text-xl sm:text-2xl italic leading-relaxed text-slate-800">
                &ldquo;Excellent dentistry should feel clear, collaborative, and deeply kind.&rdquo;
              </blockquote>
              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-full bg-[#1b535d] px-7 py-3.5 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-[#14424a] hover:-translate-y-0.5 transition-all"
                >
                  <span>Meet Dr. Nitu</span>
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
              A gentler experience
            </p>
            <h2 className="font-['Instrument_Serif',serif] text-4xl sm:text-5xl font-normal tracking-tight text-slate-900 leading-[1.05]">
              Modern care without the clinical coldness.
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-slate-600">
              From interactive 32-tooth odontogram charting to quieter rotary tools, we use modern technology thoughtfully—only where it makes your care more precise, comfortable, or clear.
            </p>

            <ul className="grid gap-3.5 pt-2 sm:grid-cols-2">
              {[
                "Unhurried 1-on-1 appointments",
                "Interactive 32-tooth odontogram",
                "Painless rotary endodontics",
                "WhatsApp Google Meet tele-care",
                "Transparent upfront estimates",
                "Biocompatible metal-free crowns",
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
                alt="Dr. Nitu explaining treatment plan to patient"
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
              Inside Shree Sainath Dental Clinic
            </p>
            <h2 className="mt-4 font-['Instrument_Serif',serif] text-4xl sm:text-6xl font-normal tracking-tight text-slate-900 leading-[0.98]">
              A place to feel at ease.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {[
              {
                src: ASSETS.clinicRoom,
                alt: "Bright modern dental operatory room",
                caption: "A room that feels welcoming",
              },
              {
                src: ASSETS.smileMoment,
                alt: "Dr. Nitu sharing mirror with a smiling patient",
                caption: "Results worth smiling about",
              },
              {
                src: ASSETS.familyClinic,
                alt: "Father and child relaxing together in clinic",
                caption: "Comfort for every generation",
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
                Patient words • Approved reviews
              </p>
              <h2 className="mt-3 font-['Instrument_Serif',serif] text-4xl sm:text-6xl font-normal tracking-tight text-white leading-[0.98]">
                The difference is how it feels.
              </h2>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white">
              <div className="flex text-[#f06449]">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="size-3.5 fill-current" />
                ))}
              </div>
              <span>4.9 / 5.0 Patient Satisfaction</span>
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
                  {item.patientName} · {item.treatmentType || "In-Clinic Visit"}
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
                Ready when you are
              </p>
              <h2 className="font-['Instrument_Serif',serif] text-3xl sm:text-5xl font-normal leading-tight">
                Let’s make your next visit
                <br />
                <em className="italic font-normal">feel refreshingly easy.</em>
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/patient/book"
                className="inline-flex items-center gap-2 rounded-full bg-[#0d1f27] px-8 py-4 text-sm font-bold text-white shadow-2xl hover:bg-[#142f3b] hover:-translate-y-0.5 transition-all"
              >
                <CalendarDays className="size-4 text-[#f06449]" />
                <span>Request an appointment</span>
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/20 px-7 py-4 text-sm font-semibold text-white hover:bg-white/30 backdrop-blur-sm transition-all"
              >
                <MessageCircle className="size-4" />
                <span>Contact Clinic</span>
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
