"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export type Language = "en" | "hi";

export const translations = {
  en: {
    clinicName: "Shree Sainath Dental Clinic",
    doctorName: "Dr. Nitu Rajpoot, BDS",
    city: "Bilaspur",
    nav: {
      home: "Home",
      about: "About",
      doctor: "Doctor",
      treatments: "Treatments",
      articles: "Articles",
      contact: "Contact Us",
      bookVisit: "Book Visit",
      signIn: "Sign In",
      register: "Register",
      dashboard: "Dashboard",
    },
    hero: {
      badge: "Shree Sainath Dental Clinic • Bilaspur",
      titleStart: "Comfortable, modern care with",
      titleHighlight: "Dr. Nitu Rajpoot.",
      subtitle:
        "Thoughtful dentistry with one familiar doctor, one clear plan, and all the time you need. Backed by interactive 32-tooth odontogram charting and instant tele-dentistry.",
      bookCta: "Book a visit",
      portalCta: "Patient / Doctor Sign In",
      callCta: "Call Clinic",
    },
    common: {
      loading: "Loading...",
      submit: "Submit",
      cancel: "Cancel",
      save: "Save Changes",
      back: "Back",
      readMore: "Read More",
      viewAll: "View All",
      phone: "Phone Number",
      email: "Email Address",
      date: "Date",
      time: "Time Slot",
    },
    footer: {
      tagline:
        "Ethical, gentle, single-doctor family dentistry in Bilaspur led by Dr. Nitu Rajpoot, BDS.",
      quickLinks: "Quick Links",
      clinicHours: "Clinic Hours",
      hoursDetail: "Mon – Sat: 10:00 AM – 2:00 PM & 5:00 PM – 8:30 PM",
      rights: "All rights reserved.",
    },
  },
  hi: {
    clinicName: "श्री साईनाथ डेंटल क्लिनिक",
    doctorName: "डॉ. नीतू राजपूत, बीडीएस",
    city: "बिलासपुर",
    nav: {
      home: "होम",
      about: "हमारे बारे में",
      doctor: "डॉक्टर",
      treatments: "उपचार और सेवाएं",
      articles: "दंत स्वास्थ्य लेख",
      contact: "संपर्क करें",
      bookVisit: "अपॉइंटमेंट बुक करें",
      signIn: "साइन इन",
      register: "पंजीकरण करें",
      dashboard: "डैशबोर्ड",
    },
    hero: {
      badge: "श्री साईनाथ डेंटल क्लिनिक • बिलासपुर",
      titleStart: "आरामदायक और आधुनिक दंत चिकित्सा,",
      titleHighlight: "डॉ. नीतू राजपूत के साथ।",
      subtitle:
        "एक अनुभवी डॉक्टर, स्पष्ट उपचार योजना और दर्द-रहित देखभाल। आधुनिक 32-दांत ओडोंटोग्राम चार्टिंग और ऑनलाइन वीडियो परामर्श की सुविधा के साथ।",
      bookCta: "अपॉइंटमेंट बुक करें",
      portalCta: "मरीज / डॉक्टर लॉग इन",
      callCta: "क्लिनिक में कॉल करें",
    },
    common: {
      loading: "लोड हो रहा है...",
      submit: "जमा करें",
      cancel: "रद्द करें",
      save: "परिवर्तन सहेजें",
      back: "वापस जाएं",
      readMore: "पूरा पढ़ें",
      viewAll: "सभी देखें",
      phone: "फ़ोन नंबर",
      email: "ईमेल पता",
      date: "तारीख",
      time: "समय स्लॉट",
    },
    footer: {
      tagline:
        "डॉ. नीतू राजपूत (BDS) के नेतृत्व में बिलासपुर में सुरक्षित, दर्दरहित और आधुनिक पारिवारिक दंत चिकित्सा।",
      quickLinks: "महत्वपूर्ण लिंक",
      clinicHours: "क्लिनिक का समय",
      hoursDetail: "सोमवार – शनिवार: सुबह 10:00 – दोपहर 2:00 और शाम 5:00 – रात 8:30",
      rights: "सर्वाधिकार सुरक्षित।",
    },
  },
} as const;

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (typeof translations)["en"] | (typeof translations)["hi"];
  tr: <T>(enValue: T, hiValue: T) => T;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({
  children,
  initialLang = "en",
}: {
  children: React.ReactNode;
  initialLang?: Language;
}) {
  const [lang, setLangState] = useState<Language>(initialLang);
  const router = useRouter();

  useEffect(() => {
    const match = document.cookie.match(/(?:^|;\s*)ssd_clinic_lang=(en|hi)/);
    if (match && (match[1] === "en" || match[1] === "hi")) {
      setLangState(match[1]);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    document.cookie = `ssd_clinic_lang=${newLang}; path=/; max-age=31536000; SameSite=Lax`;
    document.documentElement.lang = newLang;
    router.refresh();
  };

  const tr = <T,>(enValue: T, hiValue: T): T => {
    return lang === "hi" ? hiValue : enValue;
  };

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        t: translations[lang],
        tr,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

export function LanguageSwitcherButton({
  className = "",
}: {
  className?: string;
}) {
  const { lang, setLang, tr } = useLanguage();

  return (
    <div
      className={`inline-flex items-center rounded-full border border-white/15 bg-white/10 p-0.5 text-[11px] font-bold backdrop-blur-md ${className}`}
      role="group"
      aria-label={tr("Language Switcher", "भाषा बदलें")}
    >
      <button
        type="button"
        onClick={() => setLang("en")}
        className={`rounded-full px-2.5 py-1 transition-all cursor-pointer ${
          lang === "en"
            ? "bg-white text-slate-950 shadow-sm"
            : "text-white/75 hover:text-white"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang("hi")}
        className={`rounded-full px-2.5 py-1 transition-all cursor-pointer ${
          lang === "hi"
            ? "bg-white text-slate-950 shadow-sm"
            : "text-white/75 hover:text-white"
        }`}
      >
        हिन्दी
      </button>
    </div>
  );
}