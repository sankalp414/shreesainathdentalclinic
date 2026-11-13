"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  CalendarCheck,
  Video,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
  QrCode,
} from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import { getClinicScheduleConfig } from "@/app/actions/clinic-schedule";

interface FooterProps {
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  workingHours?: string | null;
  clinicName?: string | null;
}

export function Footer({
  address,
  phone,
  email,
  workingHours,
  clinicName,
}: FooterProps) {
  const { lang } = useLanguage();
  const [currentYear, setCurrentYear] = useState<number>(2026);
  const [doctorScheduleText, setDoctorScheduleText] = useState<string>("");

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());

    // Directly call the exact same Server Action used by Doctor Dashboard!
    getClinicScheduleConfig()
      .then((scheduleConfig) => {
        if (scheduleConfig && scheduleConfig.startTime && scheduleConfig.endTime) {
          const breakInfo =
            scheduleConfig.lunchStart && scheduleConfig.lunchEnd
              ? ` (Break: ${scheduleConfig.lunchStart} – ${scheduleConfig.lunchEnd})`
              : "";
          setDoctorScheduleText(
            `Mon – Sat: ${scheduleConfig.startTime} – ${scheduleConfig.endTime}${breakInfo}`
          );
        }
      })
      .catch(() => {});
  }, []);

  const displayClinicName =
    lang === "hi"
      ? "श्री साईनाथ डेंटल क्लिनिक"
      : clinicName || "Shree Sainath Dental Clinic";

  const displayAddress =
    address ||
    "Shop no 7, Om Plaza, Bajrang Chowk, Rajkishore Nagar, Bilaspur, Chhattisgarh 495006";

  const displayPhone = phone || "+91 6261474753";
  const displayEmail = email || "Shreesainathdentalclinic.@gmail.com";

  // Priority: 1. Live Doctor Dashboard Server Action -> 2. Passed Prop -> 3. Fallback
  const displayHours =
    doctorScheduleText ||
    workingHours ||
    (lang === "hi"
      ? "सोम – शनि: सुबह 10:00 – रात 08:00"
      : "Mon – Sat: 10:00 AM – 08:00 PM");

  const exactMapLocation =
    "Shree Sainath Dental Clinic, Om Plaza, Bajrang Chowk, Rajkishore Nagar, Bilaspur, Chhattisgarh 495006";
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    exactMapLocation
  )}`;

  const quickLinks = [
    { href: "/", label: lang === "hi" ? "होम" : "Home" },
    { href: "/about", label: lang === "hi" ? "हमारे बारे में" : "About Clinic" },
    {
      href: "/treatments",
      label: lang === "hi" ? "सभी उपचार" : "All Treatments",
    },
    {
      href: "/checkin-qr",
      label:
        lang === "hi"
          ? "QR ज़ीरो-वेट चेक-इन"
          : "QR Queue Check-In (Reception)",
    },
    { href: "/blogs", label: lang === "hi" ? "डेंटल ब्लॉग" : "Dental Blogs" },
    {
      href: "/contact",
      label: lang === "hi" ? "संपर्क करें" : "Contact & Location",
    },
    {
      href: "/patient/dashboard",
      label: lang === "hi" ? "रोगी पोर्टल" : "Patient Portal",
    },
    {
      href: "/doctor/dashboard",
      label: lang === "hi" ? "डॉक्टर कमांड सेंटर" : "Doctor Portal",
    },
  ];

  const featuredTreatments = [
    {
      slug: "root-canal-treatment",
      label: lang === "hi" ? "रूट कैनाल उपचार (RCT)" : "Root Canal Treatment",
    },
    {
      slug: "dental-implants",
      label: lang === "hi" ? "डेंटल इम्प्लांट्स" : "Dental Implants",
    },
    {
      slug: "clear-aligners-braces",
      label:
        lang === "hi"
          ? "क्लियर एलाइनर्स और ब्रेसेस"
          : "Clear Aligners & Braces",
    },
    {
      slug: "laser-teeth-whitening",
      label: lang === "hi" ? "लेजर टीथ व्हाइटनिंग" : "Laser Teeth Whitening",
    },
    {
      slug: "cosmetic-smile-makeover-veneers",
      label:
        lang === "hi"
          ? "स्माइल मेकओवर और विनीर्स"
          : "Smile Makeover & Veneers",
    },
    {
      slug: "wisdom-tooth-extraction",
      label: lang === "hi" ? "अक्ल दाढ़ निकालना" : "Wisdom Tooth Extraction",
    },
    {
      slug: "pediatric-dentistry",
      label: lang === "hi" ? "बच्चों की दंत चिकित्सा" : "Pediatric Dentistry",
    },
  ];

  return (
    <footer className="bg-[#0c2a2a] text-white border-t border-white/10">
      {/* Top Pre-Footer Appointment & QR Check-In Banner */}
      <div className="border-b border-white/10 bg-[#113838]/60">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-300">
              <Sparkles className="h-3.5 w-3.5 text-[#e05a47]" />
              <span>
                {lang === "hi"
                  ? "दर्दरहित और आधुनिक दंत चिकित्सा"
                  : "Precision Microscopic & Restorative Care"}
              </span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white">
              {lang === "hi"
                ? "डॉ. नीतू राजपूत (BDS) के साथ अपना परामर्श बुक करें"
                : "Ready for a calmer, unhurried dental visit?"}
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-3.5 shrink-0">
            <Link
              href="/patient/book-appointment?type=IN_CLINIC"
              className="inline-flex items-center gap-2 rounded-full bg-[#e05a47] px-6 py-3.5 text-xs sm:text-sm font-semibold text-white shadow-lg hover:bg-[#d04936] transition"
            >
              <CalendarCheck className="h-4 w-4" />
              <span>
                {lang === "hi"
                  ? "क्लिनिक अपॉइंटमेंट बुक करें"
                  : "Book In-Clinic Visit"}
              </span>
            </Link>

            <Link
              href="/checkin-qr"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-950/60 px-6 py-3.5 text-xs sm:text-sm font-semibold text-emerald-200 hover:bg-emerald-900/70 transition"
            >
              <QrCode className="h-4 w-4 text-emerald-300" />
              <span>
                {lang === "hi" ? "QR क्लिनिक चेक-इन" : "QR Clinic Check-In"}
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main 4-Column Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Column 1: Clinic Brand & Doctor Bio */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#e05a47] text-white font-bold text-lg shadow-md">
                🦷
              </div>
              <div>
                <span className="font-serif text-xl font-bold tracking-tight text-white block leading-none">
                  {displayClinicName}
                </span>
                <span className="text-[11px] text-emerald-300 font-medium">
                  Dr. Nitu Rajpoot, BDS
                </span>
              </div>
            </Link>

            <p className="text-sm text-emerald-100/80 leading-relaxed max-w-sm">
              {lang === "hi"
                ? "सिंगल-डॉक्टर व्यक्तिगत दंत चिकित्सा, माइक्रोस्कोपिक सिंगल-सिटिंग रूट कैनाल, 32-दांतों का डिजिटल ओडोंटोग्राम और सुरक्षित ऑनलाइन वीडियो परामर्श।"
                : "Single-doctor personalized dentistry featuring microscopic single-sitting root canals, 32-tooth digital odontogram charting, and encrypted video consultations."}
            </p>

            <Link
              href="/checkin-qr"
              className="inline-flex items-center gap-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 px-3.5 py-2 text-xs text-emerald-200 transition"
            >
              <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>
                {lang === "hi"
                  ? "क्लास-B ऑटोक्लेव • QR ज़ीरो-वेट रिसेप्शन खोलें →"
                  : "Class-B Autoclave • Open QR Zero-Wait Reception →"}
              </span>
            </Link>
          </div>

          {/* Column 2: Quick Navigation */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-300">
              {lang === "hi" ? "त्वरित लिंक्स" : "Quick Links"}
            </h4>
            <ul className="space-y-2.5 text-sm text-emerald-100/80">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-white transition inline-flex items-center gap-1"
                  >
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Specialized Treatments */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-300">
              {lang === "hi" ? "प्रमुख दंत उपचार" : "Specialized Treatments"}
            </h4>
            <ul className="space-y-2.5 text-sm text-emerald-100/80">
              {featuredTreatments.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/treatments/${item.slug}`}
                    className="hover:text-white transition inline-flex items-center gap-1"
                  >
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Live Doctor Dashboard Timings */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-300">
              {lang === "hi" ? "संपर्क और समय" : "Clinic & Timings"}
            </h4>

            <div className="space-y-3.5 text-sm text-emerald-100/85">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-[#e05a47] shrink-0 mt-1" />
                <div className="space-y-1">
                  <p className="leading-relaxed text-xs">{displayAddress}</p>
                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-300 hover:underline"
                  >
                    <span>
                      {lang === "hi"
                        ? "गूगल मैप्स पर देखें"
                        : "Open in Google Maps"}
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-[#e05a47] shrink-0" />
                <a
                  href={`tel:${displayPhone.replace(/[^0-9+]/g, "")}`}
                  className="hover:text-white font-semibold transition"
                >
                  {displayPhone}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-[#e05a47] shrink-0" />
                <a
                  href={`mailto:${displayEmail}`}
                  className="hover:text-white text-xs transition"
                >
                  {displayEmail}
                </a>
              </div>

              <div className="flex items-start gap-3 pt-1">
                <Clock className="h-4 w-4 text-[#e05a47] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 block">
                    {lang === "hi"
                      ? "डॉक्टर डैशबोर्ड समय (24-Hr)"
                      : "Operating Schedule (24-Hr)"}
                  </span>
                  <span className="text-xs leading-relaxed text-white font-semibold">
                    {displayHours}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Legal Bar */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-100/60">
          <p>
            © {currentYear} {displayClinicName}.{" "}
            {lang === "hi" ? "सर्वाधिकार सुरक्षित।" : "All rights reserved."}
          </p>
          <div className="flex items-center gap-6">
            <Link href="/checkin-qr" className="hover:text-white transition">
              {lang === "hi" ? "QR चेक-इन" : "QR Check-In"}
            </Link>
            <Link href="/contact" className="hover:text-white transition">
              {lang === "hi" ? "आपातकालीन सहायता" : "Emergency Care"}
            </Link>
            <Link
              href="/patient/book-appointment?type=IN_CLINIC"
              className="hover:text-white transition"
            >
              {lang === "hi" ? "अपॉइंटमेंट बुक करें" : "Book Slot"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;