"use client";

import { useLanguage } from "@/components/LanguageContext";

export default function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className={`inline-flex items-center rounded-full border border-slate-200 bg-slate-100/80 p-1 text-xs font-bold ${className}`}
      role="group"
      aria-label="Language Switcher"
    >
      <button
        type="button"
        onClick={() => setLang("en")}
        className={`rounded-full px-3 py-1 transition-all ${
          lang === "en"
            ? "bg-[#1b535d] text-white shadow-sm"
            : "text-slate-600 hover:text-slate-900"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang("hi")}
        className={`rounded-full px-3 py-1 transition-all ${
          lang === "hi"
            ? "bg-[#1b535d] text-white shadow-sm"
            : "text-slate-600 hover:text-slate-900"
        }`}
      >
        हिन्दी
      </button>
    </div>
  );
}