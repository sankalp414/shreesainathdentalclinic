import { Suspense } from "react";
import Link from "next/link";
import { db } from "@/lib/db";
import { clinicSettings } from "@/db/schema";
import { getClinicScheduleConfig } from "@/app/actions/clinic-schedule";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Sparkles,
  CalendarDays,
  ArrowRight,
  CheckCircle2,
  Car,
  Navigation,
  Video,
} from "lucide-react";
import clinicinterior from "@/assets/images/clinicinterior.jpg";
import comfort from "@/assets/images/patientcomfort.jpg";
import contacthero from "@/assets/images/contacthero.png";
import contactherotwo from "@/assets/images/contactherotwo.jpg";
import contactherofour from "@/assets/images/contactherofour.png";
import contactherofive from "@/assets/images/contactherofive.png";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#fcfbf8] text-[#0c2a2a]">
      {/* <Suspense fallback={<div className="h-20 bg-white border-b border-brand-secondary" />}>
        <Navbar />
      </Suspense> */}

      <Suspense
        fallback={
          <div className="py-32 text-center text-sm font-semibold text-[#113838]">
            Loading contact & location details...
          </div>
        }
      >
        <ContactContent />
      </Suspense>
    </div>
  );
}

async function ContactContent() {
  const [[settings], scheduleConfig] = await Promise.all([
    db.select().from(clinicSettings).limit(1),
    getClinicScheduleConfig(),
  ]);

  // Full descriptive address displayed in the page text
  const address =
    "Shop no7 om plaza ,bajrang chowk, Rajkishore nager (Near hanuman mandir Between SBI ATM and ICICI Bank ATM Front of palika vavsaik parisar complex, Bilaspur, Chhattisgarh 495006";

  const phone = settings?.phone ?? "+91 98260 12345";
  const email = settings?.email ?? "care@shreesainathdental.in";

  // Automatically synced with the exact operating hours set in Doctor Dashboard
  const workingHours = scheduleConfig
    ? `Mon – Sat: ${scheduleConfig.startTime} – ${scheduleConfig.endTime} (Lunch Break: ${scheduleConfig.lunchStart} – ${scheduleConfig.lunchEnd})`
    : settings?.workingHoursText ??
      "Mon – Sat: 10:00 AM – 08:00 PM (Lunch Break: 1:30 PM – 2:30 PM)";

  // Clean landmark query so Google Maps pins the exact Rajkishore Nagar, Bilaspur location
  const exactMapLocation =
    "Shree Sainath Dental Clinic, Om Plaza, Bajrang Chowk, Rajkishore Nagar, Bilaspur, Chhattisgarh 495006";
  const mapSearchQuery = encodeURIComponent(exactMapLocation);
  const googleMapsEmbedUrl = `https://maps.google.com/maps?q=${mapSearchQuery}&t=&z=17&ie=UTF8&iwloc=&output=embed`;

  return (
    <main className="w-full overflow-hidden">
      {/* ========================================================= */}
      {/* 1. HERO SECTION - Full Viewport Screen (min-h-[100dvh])   */}
      {/* ========================================================= */}
      <section className="relative  h-full w-full overflow-hidden bg-[#0c2a2a] flex flex-col justify-center  pt-50 pb-46">
        <div className="absolute inset-0 z-0">
          <img
            src={contactherofive.src}
            alt="Sunlit reception at Shree Sainath Dental Clinic"
            className="w-full h-full object-cover object-center opacity-80"
          />
          {/* Dual cinematic teal gradient overlays */}
         <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 via-30% to-transparent to-65%" />
          {/* <div className="absolute inset-0 bg-gradient-to-t from-[#0c2a2a] via-[#0c2a2a]/40 to-transparent" /> */}
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            {/* Frosted Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#e05a47]" />
              <span>We would love to meet you</span>
            </div>

            {/* Oversized Serif Headline */}
            <h1 className="mt-6 font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.08] text-white">
              A calmer visit.{" "}
              <em className="font-serif italic font-normal text-emerald-200">
                It starts here.
              </em>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-emerald-100/90 leading-relaxed max-w-xl">
              We are conveniently located in Indore with dedicated parking,
              wheelchair access, and a calm, unhurried clinic environment.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-3.5">
              <a
                href="/patient/book-appointment?type=IN_CLINIC"
                className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#0c2a2a] hover:bg-emerald-50 transition shadow-lg flex items-center gap-2"
              >
                Book In-Clinic Visit
                <ArrowRight className="w-4 h-4 text-[#e05a47]" />
              </a>

              <a
                href="/patient/book-appointment?type=VIDEO"
                className="rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/20 backdrop-blur-sm transition"
              >
                Video Consult (₹700)
              </a>

              <a
                href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
                className="rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/20 backdrop-blur-sm transition flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-emerald-300" />
                Call Clinic
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. TWO-PHOTO WELCOME STRIP (Clean spacing, warm dental photos) */}
      {/* ========================================================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Card 1: Warm Dental Reception Lounge */}
          <div className="group relative aspect-[16/10] overflow-hidden rounded-3xl bg-stone-200 shadow-lg border border-stone-200/80">
            <img
              src={clinicinterior.src}
              alt="Bright welcoming reception at Shree Sainath Dental Clinic"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300">
                Clinic Atmosphere
              </span>
              <p className="font-serif text-xl sm:text-2xl font-normal mt-1">
                A warm, light-filled reception with zero waiting rush
              </p>
            </div>
          </div>

          {/* Card 2: Personal Doctor Consultation */}
          <div className="group relative aspect-[16/10] overflow-hidden rounded-3xl bg-stone-200 shadow-lg border border-stone-200/80">
            <img
              src={comfort.src}
              alt="Dr. Nitu welcoming a patient"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 via-30% to-transparent to-65%" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#e05a47]">
                Personal Consultation
              </span>
              <p className="font-serif text-xl sm:text-2xl font-normal mt-1">
                One dedicated doctor who takes time to listen first
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. MAIN CONTACT & APPOINTMENT BOOKING SECTION */}
      {/* ========================================================= */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 items-start">
          {/* Left Column: Clinic Information with Icon Blooms */}
          <div className="space-y-8">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#113838]">
                Get in Touch
              </span>
              <h2 className="mt-2 font-serif text-3xl sm:text-5xl font-normal leading-tight text-[#0c2a2a]">
                Visit or Contact{" "}
                <em className="font-serif italic font-normal text-[#e05a47]">
                  Shree Sainath Dental Clinic.
                </em>
              </h2>
              <p className="mt-4 text-sm sm:text-base text-stone-600 leading-relaxed">
                We are conveniently located in Indore with dedicated parking,
                wheelchair access, and a calm clinic environment.
              </p>
            </div>

            <div className="space-y-2 border-t border-stone-200 pt-4">
              {/* Address */}
              <div className="flex items-start gap-4 p-3 rounded-2xl">
                <div className="w-11 h-11 rounded-2xl bg-[#113838]/8 text-[#113838] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#e05a47]" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                    Address
                  </p>
                  <p className="mt-0.5 font-semibold text-[#0c2a2a] text-sm sm:text-base">
                    {address}
                  </p>
                  <span className="text-xs text-stone-500">
                    Sapphire Plaza, MG Road, Indore
                  </span>
                </div>
              </div>

              {/* Phone & WhatsApp */}
              <a
                href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
                className="group flex items-start gap-4 p-3 rounded-2xl hover:bg-stone-100/70 transition"
              >
                <div className="w-11 h-11 rounded-2xl bg-[#113838]/8 text-[#113838] flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-[#113838] group-hover:text-white transition">
                  <Phone className="w-5 h-5 text-[#e05a47] group-hover:text-white transition" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                    Phone & WhatsApp
                  </p>
                  <p className="mt-0.5 font-semibold text-[#0c2a2a] text-base group-hover:text-[#113838] transition">
                    {phone}
                  </p>
                  <span className="text-xs text-stone-500">
                    Tap to call or message reception
                  </span>
                </div>
              </a>

              {/* Email Support */}
              <a
                href={`mailto:${email}`}
                className="group flex items-start gap-4 p-3 rounded-2xl hover:bg-stone-100/70 transition"
              >
                <div className="w-11 h-11 rounded-2xl bg-[#113838]/8 text-[#113838] flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-[#113838] group-hover:text-white transition">
                  <Mail className="w-5 h-5 text-[#e05a47] group-hover:text-white transition" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                    Email Support
                  </p>
                  <p className="mt-0.5 font-semibold text-[#0c2a2a] text-base group-hover:text-[#113838] transition">
                    {email}
                  </p>
                  <span className="text-xs text-stone-500">
                    For x-rays, questions and reports
                  </span>
                </div>
              </a>

              {/* Working Hours */}
              <div className="flex items-start gap-4 p-3 rounded-2xl">
                <div className="w-11 h-11 rounded-2xl bg-[#113838]/8 text-[#113838] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-[#e05a47]" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                    Working Hours
                  </p>
                  <p className="mt-0.5 font-semibold text-[#0c2a2a] text-sm sm:text-base">
                    {workingHours}
                  </p>
                  <span className="text-xs text-stone-500">
                    Open Monday through Saturday
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Instant Appointments Panel (Lovable form-panel style) */}
          <div className="rounded-3xl border-t-4 border-[#e05a47] bg-[#fbfaf6] p-8 sm:p-12 shadow-sm border border-stone-200/80 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#e05a47]">
                Instant Appointments
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal leading-tight text-[#0c2a2a]">
                Skip the Phone Call &{" "}
                <em className="font-serif italic font-normal text-[#113838]">
                  Book Online.
                </em>
              </h2>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                Select your preferred time slot for an in-clinic physical
                checkup or book an encrypted online video consultation
                instantly.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <a
                href="/patient/book-appointment?type=IN_CLINIC"
                className="w-full rounded-2xl bg-[#113838] px-6 py-4 text-center text-sm font-semibold text-white hover:bg-[#0c2a2a] transition shadow-md flex items-center justify-center gap-2 group"
              >
                <CalendarDays className="w-4 h-4 text-emerald-300" />
                Book In-Clinic Appointment
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="/patient/book-appointment?type=VIDEO"
                className="w-full rounded-2xl border-2 border-[#113838] bg-white px-6 py-4 text-center text-sm font-semibold text-[#113838] hover:bg-[#113838]/5 transition flex items-center justify-center gap-2"
              >
                <Video className="w-4 h-4 text-[#e05a47]" />
                Book Video Consultation (₹700)
              </a>
            </div>

            <div className="border-t border-stone-200/80 pt-6 space-y-2.5 text-xs text-stone-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#113838]" />
                <span>Immediate confirmation directly with clinic</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#113838]" />
                <span>Zero waiting time — time slot reserved solely for you</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#113838]" />
                <span>Transparent consultation charges with no surprises</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. PHOTO NARRATIVE ("Before you arrive") */}
      {/* ========================================================= */}
      <section className="bg-[#fbfaf6] py-20 border-y border-stone-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 items-center">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden rounded-3xl bg-stone-200 shadow-md order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=1400&q=80"
                alt="Bright treatment room at Shree Sainath Dental Clinic"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 rounded-2xl bg-white/95 px-5 py-3.5 backdrop-blur-md shadow-lg border border-white">
                <p className="font-serif text-xl font-normal text-[#0c2a2a]">
                  1:1 Dedicated Care
                </p>
                <p className="text-xs text-stone-500">
                  Only one patient scheduled at a time
                </p>
              </div>
            </div>

            <div className="space-y-6 order-1 lg:order-2 max-w-xl">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#113838]">
                  Before you arrive
                </span>
                <h2 className="mt-2 font-serif text-3xl sm:text-5xl font-normal leading-tight text-[#0c2a2a]">
                  A little more at ease,{" "}
                  <em className="font-serif italic font-normal text-[#e05a47]">
                    from the start.
                  </em>
                </h2>
              </div>

              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                Your visit begins in a light-filled space with one familiar dentist
                who has time to listen. You can tell us what you are hoping for,
                what worries you, or simply ask to take things slowly.
              </p>

              <div className="border-t border-stone-200 pt-6 space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#113838] shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-stone-700">
                    <strong>Zero waiting rush:</strong> Arrive at your appointed time and enter directly into the consultation room.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#113838] shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-stone-700">
                    <strong>Clear treatment plans:</strong> Full cost clarity and digital imaging explained before any procedure.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. GETTING HERE & TRANSIT GUIDE (Deep teal background) */}
      {/* ========================================================= */}
      <section className="bg-[#0c2a2a] text-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16 items-center">
            <div className="space-y-6">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-300">
                Getting here
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-tight">
                Easy to find.
                <br />
                <em className="font-serif italic font-normal text-emerald-200">
                  Easy to settle in.
                </em>
              </h2>
              <p className="text-sm sm:text-base text-emerald-100/80 leading-relaxed max-w-md">
                We are conveniently located in Indore with reserved patient
                parking, step-free elevator access, and a calm clinic environment.
              </p>

              <div className="grid gap-3 pt-2">
                <div className="flex items-center gap-3 rounded-2xl bg-white/5 border border-white/10 p-3.5 backdrop-blur-sm">
                  <Car className="w-5 h-5 text-emerald-300 shrink-0" />
                  <span className="text-xs sm:text-sm text-emerald-100">
                    Reserved patient parking in Sapphire Plaza basement
                  </span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-white/5 border border-white/10 p-3.5 backdrop-blur-sm">
                  <Navigation className="w-5 h-5 text-emerald-300 shrink-0" />
                  <span className="text-xs sm:text-sm text-emerald-100">
                    Centrally located along MG Road with elevator access
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${mapSearchQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#e05a47] px-6 py-3 text-xs sm:text-sm font-semibold text-white hover:bg-[#d04936] transition shadow-lg"
                >
                  <MapPin className="w-4 h-4" /> Open in Google Maps
                </a>
              </div>
            </div>

            {/* Interactive Google Map Card */}
            <div className="relative min-h-[380px] sm:min-h-[440px] overflow-hidden rounded-3xl bg-[#113838] border border-white/15 shadow-2xl">
              <iframe
                title="Shree Sainath Dental Clinic Location Map"
                src={googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "440px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. PHOTO MOMENTS SHOWCASE ("A welcome worth knowing") */}
      {/* ========================================================= */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#113838]">
            A welcome worth knowing
          </span>
          <h2 className="mt-2 font-serif text-3xl sm:text-5xl font-normal leading-tight text-[#0c2a2a]">
            Take a look around{" "}
            <em className="font-serif italic font-normal text-[#e05a47]">
              before you visit.
            </em>
          </h2>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          <div className="group space-y-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-stone-200 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80"
                alt="Welcoming reception area"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            <p className="font-serif text-xl sm:text-2xl font-normal text-[#0c2a2a]">
              A warm welcome
            </p>
            <p className="text-xs text-stone-500">
              Clean air, quiet acoustics, and comfortable seating upon arrival.
            </p>
          </div>

          <div className="group space-y-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-stone-200 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=80"
                alt="Family and patient waiting lounge"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            <p className="font-serif text-xl sm:text-2xl font-normal text-[#0c2a2a]">
              Room for everyone
            </p>
            <p className="text-xs text-stone-500">
              Gentle care suited for nervous adults and children alike.
            </p>
          </div>

          <div className="group space-y-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-stone-200 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80"
                alt="Doctor explaining care"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            <p className="font-serif text-xl sm:text-2xl font-normal text-[#0c2a2a]">
              Time to talk
            </p>
            <p className="text-xs text-stone-500">
              Clear x-rays on screen and realistic advice without medical jargon.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. CORAL BOOKING BAND */}
      {/* ========================================================= */}
      <section className="bg-[#e05a47] text-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-xl">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">
                Ready when you are
              </span>
              <h2 className="mt-2 font-serif text-3xl sm:text-5xl font-normal leading-tight">
                Let’s make your next visit{" "}
                <em className="font-serif italic font-normal text-amber-200">
                  feel refreshingly easy.
                </em>
              </h2>
            </div>

            <div className="flex flex-wrap gap-3.5">
              <a
                href="/patient/book-appointment?type=IN_CLINIC"
                className="rounded-full bg-[#0c2a2a] px-7 py-3.5 text-sm font-semibold text-white hover:bg-[#113838] transition shadow-lg flex items-center gap-2"
              >
                <CalendarDays className="w-4 h-4 text-emerald-300" />
                Book In-Clinic Visit
              </a>
              <a
                href="/patient/book-appointment?type=VIDEO"
                className="rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#0c2a2a] hover:bg-stone-100 transition shadow-lg"
              >
                Video Consult (₹700)
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}