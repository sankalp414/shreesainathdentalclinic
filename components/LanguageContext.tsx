"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "hi";

export const translations = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      treatments: "Treatments",
      blog: "Smile Journal",
      contact: "Contact",
      qrCheckIn: "QR Check-In",
      bookVisit: "Book a visit",
      signIn: "Sign In",
      patientPortal: "My Patient Portal",
      doctorPortal: "Doctor Command Center",
    },
    home: {
      defaultClinicName: "Shree Sainath Dental Clinic",
      doctorName: "Dr. Nitu Rajpoot, BDS",
      defaultQualifications: "BDS • Dental Surgeon",
      badge: "Shree Sainath Dental Clinic • Bilaspur",
      heroTitle: "Comfortable, modern care with Dr. Nitu Rajpoot.",
      heroDescPrefix: "Thoughtful dentistry at",
      heroDescSuffix:
        " with one familiar doctor, one clear plan, and all the time you need. Backed by interactive 32-tooth odontogram charting and instant tele-dentistry.",
      bookAppointment: "Book In-Clinic Visit",
      bookVideoConsultation: "Book Video Consultation",
      yrsSuffix: "+ Yrs",
      clinicalExcellence: "Clinical Excellence",
      classB: "Class-B",
      autoclaveSterilization: "Autoclave Sterilization",
      qrQueue: "QR Queue",
      zeroWaitReception: "Zero-Wait Reception",
      principalDentalSurgeon: "Principal Dental Surgeon",
      inClinicConsultation: "In-Clinic Consultation",
      onlineVideoConsultation: "Online Video Consultation",
      specializedProcedures: "Dentistry, reconsidered",
      clinicalTreatmentsOffered: "Healthy smiles begin with feeling heard.",
      exploreAllTreatments: "Explore All Treatments",
      mins: "Mins",
      bookSlot: "Book Slot",
      indoreLocation: "Rajkishore Nagar, Bilaspur",
      bookClinicVisit: "Book Clinic Visit",
    },
    common: {
      callClinic: "Call Clinic",
      openInMaps: "Open in Google Maps",
      getDirections: "Get Directions",
      readMore: "Read Full Article",
      loading: "Loading...",
    },
  },
  hi: {
    nav: {
      home: "होम",
      about: "हमारे बारे में",
      treatments: "उपचार",
      blog: "डेंटल ब्लॉग",
      contact: "संपर्क करें",
      qrCheckIn: "QR चेक-इन",
      bookVisit: "अपॉइंटमेंट बुक करें",
      signIn: "साइन इन करें",
      patientPortal: "मेरा रोगी पोर्टल",
      doctorPortal: "डॉक्टर कमांड सेंटर",
    },
    home: {
      defaultClinicName: "श्री साईनाथ डेंटल क्लिनिक",
      doctorName: "डॉ. नीतू राजपूत, बीडीएस",
      defaultQualifications: "बीडीएस • दंत चिकित्सक एवं सर्जन",
      badge: "श्री साईनाथ डेंटल क्लिनिक • बिलासपुर",
      heroTitle: "डॉ. नीतू राजपूत के साथ आरामदायक और आधुनिक दंत चिकित्सा।",
      heroDescPrefix: "",
      heroDescSuffix:
        " में एक अनुभवी डॉक्टर, स्पष्ट उपचार योजना और पर्याप्त समय के साथ विचारशील दंत चिकित्सा। 32-दांतों के डिजिटल ओडोंटोग्राम और तुरंत टेली-डेंटिस्ट्री की सुविधा।",
      bookAppointment: "क्लिनिक अपॉइंटमेंट बुक करें",
      bookVideoConsultation: "वीडियो परामर्श बुक करें",
      yrsSuffix: "+ वर्ष",
      clinicalExcellence: "क्लिनिकल अनुभव",
      classB: "क्लास-B",
      autoclaveSterilization: "ऑटोक्लेव स्टरलाइज़ेशन",
      qrQueue: "QR कतार",
      zeroWaitReception: "ज़ीरो-वेट रिसेप्शन",
      principalDentalSurgeon: "प्रमुख दंत चिकित्सक",
      inClinicConsultation: "क्लिनिक परामर्श शुल्क",
      onlineVideoConsultation: "ऑनलाइन वीडियो परामर्श",
      specializedProcedures: "आधुनिक दंत चिकित्सा",
      clinicalTreatmentsOffered: "स्वस्थ मुस्कान की शुरुआत आपकी बात सुनने से होती है।",
      exploreAllTreatments: "सभी उपचार देखें",
      mins: "मिनट",
      bookSlot: "स्लॉट बुक करें",
      indoreLocation: "राजकिशोर नगर, बिलासपुर",
      bookClinicVisit: "क्लिनिक विज़िट बुक करें",
    },
    common: {
      callClinic: "क्लिनिक को कॉल करें",
      openInMaps: "गूगल मैप्स में खोलें",
      getDirections: "रास्ता देखें",
      readMore: "पूरा लेख पढ़ें",
      loading: "लोड हो रहा है...",
    },
  },
};

export function translateDbTreatment(item: any, lang: Language) {
  if (lang === "en" || !item) {
    return {
      name: item?.name || "",
      category: item?.category || "Clinical Care",
      shortDescription: item?.shortDescription || item?.description || "",
    };
  }

  const nameLower = String(item.name || "").toLowerCase();

  if (nameLower.includes("root canal") || nameLower.includes("rct")) {
    return {
      name: "सिंगल-सिटिंग रूट कैनाल (RCT)",
      category: "दर्दरहित एंडोडोंटिक्स",
      shortDescription:
        "रोटरी एंडोडोंटिक्स और डिजिटल एक्स-रे की मदद से बिना दर्द के एक ही बार में रूट कैनाल उपचार।",
    };
  }
  if (nameLower.includes("crown") || nameLower.includes("zirconia")) {
    return {
      name: "3D ज़िरकोनिया क्राउन",
      category: "10–15 वर्ष की वारंटी",
      shortDescription:
        "प्राकृतिक दांतों के रंग से मेल खाने वाले मेटल-फ्री मजबूत ज़िरकोनिया क्राउन।",
    };
  }
  if (nameLower.includes("aligner") || nameLower.includes("brace")) {
    return {
      name: "क्लियर एलाइनर्स और ब्रेसेस",
      category: "डिजिटल 3D स्कैन",
      shortDescription:
        "बिना तार वाले अदृश्य एलाइनर्स और सिरेमिक विनीर्स से पाएं सुंदर और आत्मविश्वास भरी मुस्कान।",
    };
  }
  if (nameLower.includes("implant")) {
    return {
      name: "टाइटेनियम डेंटल इम्प्लांट्स",
      category: "स्थायी दांत प्रत्यारोपण",
      shortDescription:
        "गाइडेड की-होल तकनीक द्वारा टूटे या गायब दांतों का स्थायी और मजबूत प्रत्यारोपण।",
    };
  }
  if (
    nameLower.includes("laser") ||
    nameLower.includes("gum") ||
    nameLower.includes("scaling")
  ) {
    return {
      name: "लेजर मसूड़ों की देखभाल और क्लीनिंग",
      category: "बिना खून बहे उपचार",
      shortDescription:
        "अल्ट्रासोनिक सफाई, दाग हटाना और 30 मिनट में लेजर द्वारा मसूड़ों का गहरा कीटाणुशोधन।",
    };
  }
  if (nameLower.includes("video") || nameLower.includes("tele")) {
    return {
      name: "वीडियो टेली-डेंटिस्ट्री परामर्श",
      category: "तुरंत व्हाट्सएप लिंक",
      shortDescription:
        "डॉ. नीतू राजपूत के साथ गूगल मीट पर लाइव परामर्श, डिजिटल प्रिस्क्रिप्शन और एक्स-रे समीक्षा।",
    };
  }

  return {
    name: item.nameHi || item.name,
    category: item.categoryHi || item.category,
    shortDescription:
      item.shortDescriptionHi || item.shortDescription || item.description,
  };
}

// Helper to trigger live DOM translation across all Server & Client components
function applyGoogleDomTranslation(targetLang: Language) {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const domain = window.location.hostname;

  if (targetLang === "hi") {
    document.cookie = "googtrans=/en/hi; path=/";
    if (domain && domain !== "localhost") {
      document.cookie = `googtrans=/en/hi; path=/; domain=.${domain}`;
    }
  } else {
    document.cookie =
      "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    if (domain && domain !== "localhost") {
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${domain}`;
    }
  }

  // Trigger Google Translate hidden select box if already loaded in DOM
  const combo = document.querySelector(
    ".goog-te-combo"
  ) as HTMLSelectElement | null;

  if (combo) {
    combo.value = targetLang === "hi" ? "hi" : "en";
    combo.dispatchEvent(new Event("change"));
  } else if (targetLang === "hi") {
    // If script hasn't finished mounting yet, retry shortly
    setTimeout(() => {
      const retryCombo = document.querySelector(
        ".goog-te-combo"
      ) as HTMLSelectElement | null;
      if (retryCombo) {
        retryCombo.value = "hi";
        retryCombo.dispatchEvent(new Event("change"));
      }
    }, 700);
  } else {
    // If switching back to English and combo isn't bound, reload cleanly
    const hasGoogTransClass =
      document.documentElement.classList.contains("translated-ltr") ||
      document.documentElement.classList.contains("translated-rtl");
    if (hasGoogTransClass) {
      window.location.reload();
    }
  }
}

// Injects the invisible Google Translate controller once so Server Components translate too
function ensureGoogleTranslateMounted() {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  if (!document.getElementById("google-translate-hide-styles")) {
    const style = document.createElement("style");
    style.id = "google-translate-hide-styles";
    style.innerHTML = `
      .goog-te-banner-frame, .skiptranslate, #goog-gt-tt, .goog-te-balloon-frame {
        display: none !important;
      }
      body {
        top: 0px !important;
      }
      .goog-text-highlight {
        background: transparent !important;
        box-shadow: none !important;
      }
    `;
    document.head.appendChild(style);
  }

  if (!document.getElementById("google_translate_element_hidden")) {
    const holder = document.createElement("div");
    holder.id = "google_translate_element_hidden";
    holder.style.display = "none";
    document.body.appendChild(holder);
  }

  if (!(window as any).googleTranslateElementInit) {
    (window as any).googleTranslateElementInit = function () {
      if ((window as any).google && (window as any).google.translate) {
        new (window as any).google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,hi",
            autoDisplay: false,
          },
          "google_translate_element_hidden"
        );
      }
    };
  }

  if (!document.getElementById("google-translate-script")) {
    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
  }
}

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: typeof translations.en;
  tr: <T>(enValue: T, hiValue: T) => T;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");

  useEffect(() => {
    ensureGoogleTranslateMounted();

    const saved = localStorage.getItem("ssd_clinic_lang") as Language | null;
    if (saved === "en" || saved === "hi") {
      setLangState(saved);
      document.documentElement.lang = saved;
      if (saved === "hi") {
        applyGoogleDomTranslation("hi");
      }
    }

    const handleCustomLangEvent = (e: Event) => {
      const customEvent = e as CustomEvent<Language>;
      if (customEvent.detail === "en" || customEvent.detail === "hi") {
        setLangState(customEvent.detail);
      }
    };

    window.addEventListener("ssd-lang-change", handleCustomLangEvent);
    return () =>
      window.removeEventListener("ssd-lang-change", handleCustomLangEvent);
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    if (typeof window !== "undefined") {
      localStorage.setItem("ssd_clinic_lang", newLang);
      document.documentElement.lang = newLang;
      ensureGoogleTranslateMounted();
      applyGoogleDomTranslation(newLang);
      window.dispatchEvent(
        new CustomEvent("ssd-lang-change", { detail: newLang })
      );
    }
  };

  const toggleLang = () => {
    setLang(lang === "en" ? "hi" : "en");
  };

  const tr = <T,>(enValue: T, hiValue: T): T => {
    return lang === "hi" ? hiValue : enValue;
  };

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        toggleLang,
        t: translations[lang],
        tr,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

// Works even if a component is rendered outside <LanguageProvider>
export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  const [fallbackLang, setFallbackLang] = useState<Language>("en");

  useEffect(() => {
    if (context) return;
    ensureGoogleTranslateMounted();

    const saved = localStorage.getItem("ssd_clinic_lang") as Language | null;
    if (saved === "en" || saved === "hi") {
      setFallbackLang(saved);
      if (saved === "hi") {
        applyGoogleDomTranslation("hi");
      }
    }

    const handleCustomLangEvent = (e: Event) => {
      const customEvent = e as CustomEvent<Language>;
      if (customEvent.detail === "en" || customEvent.detail === "hi") {
        setFallbackLang(customEvent.detail);
      }
    };

    window.addEventListener("ssd-lang-change", handleCustomLangEvent);
    return () =>
      window.removeEventListener("ssd-lang-change", handleCustomLangEvent);
  }, [context]);

  if (context) {
    return context;
  }

  const setLangFallback = (newLang: Language) => {
    setFallbackLang(newLang);
    if (typeof window !== "undefined") {
      localStorage.setItem("ssd_clinic_lang", newLang);
      document.documentElement.lang = newLang;
      ensureGoogleTranslateMounted();
      applyGoogleDomTranslation(newLang);
      window.dispatchEvent(
        new CustomEvent("ssd-lang-change", { detail: newLang })
      );
    }
  };

  return {
    lang: fallbackLang,
    setLang: setLangFallback,
    toggleLang: () => setLangFallback(fallbackLang === "en" ? "hi" : "en"),
    t: translations[fallbackLang],
    tr: <T,>(enValue: T, hiValue: T): T =>
      fallbackLang === "hi" ? hiValue : enValue,
  };
}

export function LanguageSwitcherButton({
  className = "",
}: {
  className?: string;
}) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className={`notranslate inline-flex items-center rounded-full border border-white/20 bg-white/10 p-0.5 text-xs font-bold shadow-xs backdrop-blur-md ${className}`}
      aria-label="Switch Language"
    >
      <button
        type="button"
        onClick={() => setLang("en")}
        className={`notranslate rounded-full px-2.5 py-1 transition cursor-pointer ${
          lang === "en"
            ? "bg-white text-slate-950 shadow-xs"
            : "text-white/75 hover:text-white"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang("hi")}
        className={`notranslate rounded-full px-2.5 py-1 transition cursor-pointer ${
          lang === "hi"
            ? "bg-[#f06449] text-white shadow-xs"
            : "text-white/75 hover:text-white"
        }`}
      >
        हिन्दी
      </button>
    </div>
  );
}