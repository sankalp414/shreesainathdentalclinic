import { Suspense } from "react";
import Link from "next/link";
import { db } from "@/lib/db";
import { clinicSettings } from "@/db/schema";
import { getClinicScheduleConfig } from "@/app/actions/clinic-schedule";
import { getServerLanguage } from "@/lib/server-language";
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
  const [[settings], scheduleConfig, { tr }] = await Promise.all([
    db.select().from(clinicSettings).limit(1),
    getClinicScheduleConfig(),
    getServerLanguage(),
  ]);

  // Full descriptive address displayed in the page text
  const address = tr(
    "Shop no7 om plaza ,bajrang chowk, Rajkishore nager (Near hanuman mandir Between SBI ATM and ICICI Bank ATM Front of palika vavsaik parisar complex, Bilaspur, Chhattisgarh 495006",
    "शॉप नं. 7, ओम प्लाजा, बजरंग चौक, राजकिशोर नगर (हनुमान मंदिर के पास, SBI ATM और ICICI बैंक ATM के बीच, पालिका व्यावसायिक परिसर कॉम्प्लेक्स के सामने), बिलासपुर, छत्तीसगढ़ 495006"
  );

  const phone = settings?.phone ?? "+91 98260 12345";
  const email = "Shreesainathdentalclinic@gmail.com";

  // Automatically synced with the exact operating hours set in Doctor Dashboard
  const workingHours = scheduleConfig
    ? tr(
        `Mon – Sat: ${scheduleConfig.startTime} – ${scheduleConfig.endTime} (Lunch Break: ${scheduleConfig.lunchStart} – ${scheduleConfig.lunchEnd})`,
        `सोमवार – शनिवार: ${scheduleConfig.startTime} – ${scheduleConfig.endTime} (लंच ब्रेक: ${scheduleConfig.lunchStart} – ${scheduleConfig.lunchEnd})`
      )
    : settings?.workingHoursText ??
      tr(
        "Mon – Sat: 10:00 AM – 08:00 PM (Lunch Break: 1:30 PM – 2:30 PM)",
        "सोमवार – शनिवार: सुबह 10:00 – रात 08:00 (लंच ब्रेक: दोपहर 1:30 – 2:30)"
      );

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
            alt={tr(
              "Sunlit reception at Shree Sainath Dental Clinic",
              "श्री साईनाथ डेंटल क्लिनिक का स्वागत कक्ष"
            )}
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
              <span>{tr("We would love to meet you", "हमें आपसे मिलकर खुशी होगी")}</span>
            </div>

            {/* Oversized Serif Headline */}
            <h1 className="mt-6 font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.08] text-white">
              {tr("A calmer visit.", "एक शांत और सुखद विजिट।")}{" "}
              <em className="font-serif italic font-normal text-emerald-200">
                {tr("It starts here.", "यहाँ से शुरू होती है।")}
              </em>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-emerald-100/90 leading-relaxed max-w-xl">
              {tr(
                "We are conveniently located in Indore with dedicated parking, wheelchair access, and a calm, unhurried clinic environment.",
                "हम समर्पित पार्किंग, व्हीलचेयर की सुविधा और शांत व आरामदायक क्लिनिक वातावरण के साथ सुविधाजनक स्थान पर स्थित हैं।"
              )}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-3.5">
              <a
                href="/patient/book-appointment?type=IN_CLINIC"
                className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#0c2a2a] hover:bg-emerald-50 transition shadow-lg flex items-center gap-2"
              >
                {tr("Book In-Clinic Visit", "क्लिनिक अपॉइंटमेंट बुक करें")}
                <ArrowRight className="w-4 h-4 text-[#e05a47]" />
              </a>

              <a
                href="/patient/book-appointment?type=VIDEO"
                className="rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/20 backdrop-blur-sm transition"
              >
                {tr("Video Consult (₹700)", "वीडियो परामर्श (₹700)")}
              </a>

              <a
                href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
                className="rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/20 backdrop-blur-sm transition flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-emerald-300" />
                {tr("Call Clinic", "क्लिनिक में कॉल करें")}
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
              alt={tr(
                "Bright welcoming reception at Shree Sainath Dental Clinic",
                "श्री साईनाथ डेंटल क्लिनिक का स्वागतपूर्ण रिसेप्शन"
              )}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300">
                {tr("Clinic Atmosphere", "क्लिनिक का वातावरण")}
              </span>
              <p className="font-serif text-xl sm:text-2xl font-normal mt-1">
                {tr(
                  "A warm, light-filled reception with zero waiting rush",
                  "बिना किसी प्रतीक्षा की भीड़ के एक शांत और प्रकाशमय रिसेप्शन"
                )}
              </p>
            </div>
          </div>

          {/* Card 2: Personal Doctor Consultation */}
          <div className="group relative aspect-[16/10] overflow-hidden rounded-3xl bg-stone-200 shadow-lg border border-stone-200/80">
            <img
              src={comfort.src}
              alt={tr("Dr. Nitu welcoming a patient", "मरीज का स्वागत करतीं डॉ. नीतू")}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 via-30% to-transparent to-65%" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#e05a47]">
                {tr("Personal Consultation", "व्यक्तिगत परामर्श")}
              </span>
              <p className="font-serif text-xl sm:text-2xl font-normal mt-1">
                {tr(
                  "One dedicated doctor who takes time to listen first",
                  "एक समर्पित डॉक्टर जो सबसे पहले आपकी बात ध्यान से सुनती हैं"
                )}
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
                {tr("Get in Touch", "संपर्क करें")}
              </span>
              <h2 className="mt-2 font-serif text-3xl sm:text-5xl font-normal leading-tight text-[#0c2a2a]">
                {tr("Visit or Contact", "विजिट करें या संपर्क करें")}{" "}
                <em className="font-serif italic font-normal text-[#e05a47]">
                  {tr("Shree Sainath Dental Clinic.", "श्री साईनाथ डेंटल क्लिनिक।")}
                </em>
              </h2>
              <p className="mt-4 text-sm sm:text-base text-stone-600 leading-relaxed">
                {tr(
                  "We are conveniently located in Indore with dedicated parking, wheelchair access, and a calm clinic environment.",
                  "हम समर्पित पार्किंग, व्हीलचेयर की सुविधा और शांत क्लिनिक वातावरण के साथ सुविधाजनक स्थान पर स्थित हैं।"
                )}
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
                    {tr("Address", "पता")}
                  </p>
                  <p className="mt-0.5 font-semibold text-[#0c2a2a] text-sm sm:text-base">
                    {address}
                  </p>
                  <span className="text-xs text-stone-500">
                    {tr("Sapphire Plaza, MG Road, Indore", "ओम प्लाजा, राजकिशोर नगर, बिलासपुर")}
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
                    {tr("Phone & WhatsApp", "फ़ोन और व्हाट्सएप")}
                  </p>
                  <p className="mt-0.5 font-semibold text-[#0c2a2a] text-base group-hover:text-[#113838] transition">
                    {phone}
                  </p>
                  <span className="text-xs text-stone-500">
                    {tr("Tap to call or message reception", "कॉल या मैसेज करने के लिए टैप करें")}
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
                    {tr("Email Support", "ईमेल सहायता")}
                  </p>
                  <p className="mt-0.5 font-semibold text-[#0c2a2a] text-base group-hover:text-[#113838] transition">
                    {email}
                  </p>
                  <span className="text-xs text-stone-500">
                    {tr("For x-rays, questions and reports", "एक्स-रे, सवालों और रिपोर्ट के लिए")}
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
                    {tr("Working Hours", "क्लिनिक का समय")}
                  </p>
                  <p className="mt-0.5 font-semibold text-[#0c2a2a] text-sm sm:text-base">
                    {workingHours}
                  </p>
                  <span className="text-xs text-stone-500">
                    {tr("Open Monday through Saturday", "सोमवार से शनिवार तक खुला")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Instant Appointments Panel (Lovable form-panel style) */}
          <div className="rounded-3xl border-t-4 border-[#e05a47] bg-[#fbfaf6] p-8 sm:p-12 shadow-sm border border-stone-200/80 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#e05a47]">
                {tr("Instant Appointments", "तुरंत अपॉइंटमेंट")}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal leading-tight text-[#0c2a2a]">
                {tr("Skip the Phone Call &", "फ़ोन कॉल की प्रतीक्षा छोड़ें और")}{" "}
                <em className="font-serif italic font-normal text-[#113838]">
                  {tr("Book Online.", "ऑनलाइन बुक करें।")}
                </em>
              </h2>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                {tr(
                  "Select your preferred time slot for an in-clinic physical checkup or book an encrypted online video consultation instantly.",
                  "क्लिनिक में जांच के लिए अपना पसंदीदा समय स्लॉट चुनें या तुरंत ऑनलाइन वीडियो परामर्श बुक करें।"
                )}
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <a
                href="/patient/book-appointment?type=IN_CLINIC"
                className="w-full rounded-2xl bg-[#113838] px-6 py-4 text-center text-sm font-semibold text-white hover:bg-[#0c2a2a] transition shadow-md flex items-center justify-center gap-2 group"
              >
                <CalendarDays className="w-4 h-4 text-emerald-300" />
                {tr("Book In-Clinic Appointment", "क्लिनिक अपॉइंटमेंट बुक करें")}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="/patient/book-appointment?type=VIDEO"
                className="w-full rounded-2xl border-2 border-[#113838] bg-white px-6 py-4 text-center text-sm font-semibold text-[#113838] hover:bg-[#113838]/5 transition flex items-center justify-center gap-2"
              >
                <Video className="w-4 h-4 text-[#e05a47]" />
                {tr("Book Video Consultation (₹700)", "वीडियो परामर्श बुक करें (₹700)")}
              </a>
            </div>

            <div className="border-t border-stone-200/80 pt-6 space-y-2.5 text-xs text-stone-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#113838]" />
                <span>{tr("Immediate confirmation directly with clinic", "क्लिनिक के साथ सीधे तुरंत पुष्टि")}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#113838]" />
                <span>{tr("Zero waiting time — time slot reserved solely for you", "शून्य प्रतीक्षा समय — स्लॉट केवल आपके लिए आरक्षित")}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#113838]" />
                <span>{tr("Transparent consultation charges with no surprises", "बिना किसी छुपे शुल्क के पारदर्शी परामर्श शुल्क")}</span>
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
                alt={tr(
                  "Bright treatment room at Shree Sainath Dental Clinic",
                  "श्री साईनाथ डेंटल क्लिनिक का आधुनिक उपचार कक्ष"
                )}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 rounded-2xl bg-white/95 px-5 py-3.5 backdrop-blur-md shadow-lg border border-white">
                <p className="font-serif text-xl font-normal text-[#0c2a2a]">
                  {tr("1:1 Dedicated Care", "1:1 समर्पित देखभाल")}
                </p>
                <p className="text-xs text-stone-500">
                  {tr("Only one patient scheduled at a time", "एक समय में केवल एक ही मरीज का अपॉइंटमेंट")}
                </p>
              </div>
            </div>

            <div className="space-y-6 order-1 lg:order-2 max-w-xl">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#113838]">
                  {tr("Before you arrive", "आपके आने से पहले")}
                </span>
                <h2 className="mt-2 font-serif text-3xl sm:text-5xl font-normal leading-tight text-[#0c2a2a]">
                  {tr("A little more at ease,", "थोड़ा और अधिक आरामदायक,")}{" "}
                  <em className="font-serif italic font-normal text-[#e05a47]">
                    {tr("from the start.", "शुरुआत से ही।")}
                  </em>
                </h2>
              </div>

              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                {tr(
                  "Your visit begins in a light-filled space with one familiar dentist who has time to listen. You can tell us what you are hoping for, what worries you, or simply ask to take things slowly.",
                  "आपकी विजिट एक शांत और प्रकाशमय माहौल में एक परिचित डेंटिस्ट के साथ शुरू होती है जिनके पास आपकी बात सुनने का पूरा समय है। आप हमें अपनी उम्मीदें, अपनी चिंताएं या आराम से इलाज करने के बारे में बेझिझक बता सकते हैं।"
                )}
              </p>

              <div className="border-t border-stone-200 pt-6 space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#113838] shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-stone-700">
                    <strong>{tr("Zero waiting rush:", "शून्य प्रतीक्षा भीड़:")}</strong>{" "}
                    {tr(
                      "Arrive at your appointed time and enter directly into the consultation room.",
                      "अपने निर्धारित समय पर आएं और सीधे परामर्श कक्ष में प्रवेश करें।"
                    )}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#113838] shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-stone-700">
                    <strong>{tr("Clear treatment plans:", "स्पष्ट उपचार योजनाएं:")}</strong>{" "}
                    {tr(
                      "Full cost clarity and digital imaging explained before any procedure.",
                      "किसी भी प्रक्रिया से पहले पूरी लागत स्पष्टता और डिजिटल इमेजिंग की जानकारी।"
                    )}
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
                {tr("Getting here", "यहाँ पहुँचना")}
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-tight">
                {tr("Easy to find.", "ढूंढने में आसान।")}
                <br />
                <em className="font-serif italic font-normal text-emerald-200">
                  {tr("Easy to settle in.", "पहुँचने में सुविधाजनक।")}
                </em>
              </h2>
              <p className="text-sm sm:text-base text-emerald-100/80 leading-relaxed max-w-md">
                {tr(
                  "We are conveniently located in Indore with reserved patient parking, step-free elevator access, and a calm clinic environment.",
                  "हम मरीजों के लिए समर्पित पार्किंग, सुगम पहुंच और शांत क्लिनिक वातावरण के साथ सुविधाजनक स्थान पर स्थित हैं।"
                )}
              </p>

              <div className="grid gap-3 pt-2">
                <div className="flex items-center gap-3 rounded-2xl bg-white/5 border border-white/10 p-3.5 backdrop-blur-sm">
                  <Car className="w-5 h-5 text-emerald-300 shrink-0" />
                  <span className="text-xs sm:text-sm text-emerald-100">
                    {tr(
                      "Reserved patient parking in Sapphire Plaza basement",
                      "ओम प्लाजा परिसर में मरीजों के लिए सुविधाजनक पार्किंग"
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-white/5 border border-white/10 p-3.5 backdrop-blur-sm">
                  <Navigation className="w-5 h-5 text-emerald-300 shrink-0" />
                  <span className="text-xs sm:text-sm text-emerald-100">
                    {tr(
                      "Centrally located along MG Road with elevator access",
                      "बजरंग चौक, राजकिशोर नगर के मुख्य मार्ग पर स्थित"
                    )}
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
                  <MapPin className="w-4 h-4" /> {tr("Open in Google Maps", "गूगल मैप्स में खोलें")}
                </a>
              </div>
            </div>

            {/* Interactive Google Map Card */}
            <div className="relative min-h-[380px] sm:min-h-[440px] overflow-hidden rounded-3xl bg-[#113838] border border-white/15 shadow-2xl">
              <iframe
                title={tr(
                  "Shree Sainath Dental Clinic Location Map",
                  "श्री साईनाथ डेंटल क्लिनिक लोकेशन मैप"
                )}
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
            {tr("A welcome worth knowing", "एक आत्मीय स्वागत")}
          </span>
          <h2 className="mt-2 font-serif text-3xl sm:text-5xl font-normal leading-tight text-[#0c2a2a]">
            {tr("Take a look around", "अपनी विजिट से पहले")}{" "}
            <em className="font-serif italic font-normal text-[#e05a47]">
              {tr("before you visit.", "क्लिनिक की एक झलक देखें।")}
            </em>
          </h2>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          <div className="group space-y-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-stone-200 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80"
                alt={tr("Welcoming reception area", "स्वागतपूर्ण रिसेप्शन क्षेत्र")}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            <p className="font-serif text-xl sm:text-2xl font-normal text-[#0c2a2a]">
              {tr("A warm welcome", "गर्मजोशी भरा स्वागत")}
            </p>
            <p className="text-xs text-stone-500">
              {tr(
                "Clean air, quiet acoustics, and comfortable seating upon arrival.",
                "आगमन पर स्वच्छ वातावरण, शांत माहौल और बैठने की आरामदायक व्यवस्था।"
              )}
            </p>
          </div>

          <div className="group space-y-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-stone-200 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=80"
                alt={tr("Family and patient waiting lounge", "परिवार और मरीज प्रतीक्षा लाउंज")}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            <p className="font-serif text-xl sm:text-2xl font-normal text-[#0c2a2a]">
              {tr("Room for everyone", "सभी के लिए अनुकूल वातावरण")}
            </p>
            <p className="text-xs text-stone-500">
              {tr(
                "Gentle care suited for nervous adults and children alike.",
                "बच्चों और बड़ों दोनों के लिए समान रूप से कोमल और दर्दरहित देखभाल।"
              )}
            </p>
          </div>

          <div className="group space-y-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-stone-200 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80"
                alt={tr("Doctor explaining care", "देखभाल समझातीं डॉक्टर")}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            <p className="font-serif text-xl sm:text-2xl font-normal text-[#0c2a2a]">
              {tr("Time to talk", "बातचीत के लिए पर्याप्त समय")}
            </p>
            <p className="text-xs text-stone-500">
              {tr(
                "Clear x-rays on screen and realistic advice without medical jargon.",
                "स्क्रीन पर स्पष्ट एक्स-रे और सरल भाषा में व्यावहारिक सलाह।"
              )}
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
                {tr("Ready when you are", "जब आप तैयार हों")}
              </span>
              <h2 className="mt-2 font-serif text-3xl sm:text-5xl font-normal leading-tight">
                {tr("Let’s make your next visit", "आइए आपकी अगली क्लिनिक विजिट को")}{" "}
                <em className="font-serif italic font-normal text-amber-200">
                  {tr("feel refreshingly easy.", "बेहद आसान और आरामदायक बनाएं।")}
                </em>
              </h2>
            </div>

            <div className="flex flex-wrap gap-3.5">
              <a
                href="/patient/book-appointment?type=IN_CLINIC"
                className="rounded-full bg-[#0c2a2a] px-7 py-3.5 text-sm font-semibold text-white hover:bg-[#113838] transition shadow-lg flex items-center gap-2"
              >
                <CalendarDays className="w-4 h-4 text-emerald-300" />
                {tr("Book In-Clinic Visit", "क्लिनिक अपॉइंटमेंट बुक करें")}
              </a>
              <a
                href="/patient/book-appointment?type=VIDEO"
                className="rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#0c2a2a] hover:bg-stone-100 transition shadow-lg"
              >
                {tr("Video Consult (₹700)", "वीडियो परामर्श (₹700)")}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}