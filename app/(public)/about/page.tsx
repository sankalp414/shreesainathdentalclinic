"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  CalendarDays,
  Video,
  ArrowRight,
  HeartHandshake,
  MessageCircle,
  ShieldCheck,
  Award,
  CalendarCheck,
  Clock3,
  Phone,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";
import explainedcare from "@/assets/images/explainedcare.jpg"
import clinicinterior from "@/assets/images/clinicinterior.jpg"
import welcome from "@/assets/images/welcome.jpg"
import smilemoment from "@/assets/images/smilemoment.jpg"
import clinicroom from "@/assets/images/clinicroom.jpg"
import abouthero from "@/assets/images/abouthero.jpg"
import { useLanguage } from "@/components/LanguageContext";

export default function AboutPage() {
  const { tr } = useLanguage();

  return (
    <main className="w-full bg-[#fafaf7] text-[#1c2d2d] antialiased overflow-x-hidden selection:bg-[#a8dadc] selection:text-[#0c2a2a]">

      {/* =========================================================================
          1. HERO SECTION - 100% Full Viewport Screen (min-h-[100dvh])
          If your layout puts a fixed/sticky navbar on top, -mt-20 pulls it flush
          to the top edge so the photo sits behind the floating pill.
      ========================================================================= */}
      <section className="relative overflow-hidden  py-16 lg:py-24">
        {/* Full-bleed high-res background photography */}
        <img
          src={abouthero.src}
          alt={tr("Dr. Nitu Rajpoot at Shree Sainath Dental Clinic", "श्री साईनाथ डेंटल क्लिनिक में डॉ. नीतू राजपूत")}
          className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
        />

        {/* Cinematic shade gradient: keeps text razor sharp while preserving photo luminosity */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 via-30% to-transparent to-65%" />

        {/* <div className="absolute inset-0 bg-gradient-to-t from-[#061616] via-transparent to-[#061616]/60" /> */}

        {/* Coral brand accent bar */}
        <div className="absolute bottom-0 right-0 z-10 h-2 w-32 sm:w-72 bg-[#e76f51]" />

        {/* Hero Content - Vertically centered across the full screen */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 w-full flex flex-col justify-center min-h-[calc(100dvh-5rem)]">
          <div className="max-w-3xl space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold tracking-wider uppercase text-white backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-[#e76f51]" /> {tr("Meet Your Dentist", "अपने डेंटिस्ट से मिलें")}
            </span>

            <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-normal leading-[0.92] tracking-tight text-white ">
              {tr("One doctor.", "एक डॉक्टर।")}{" "}
              <em className="font-serif italic font-normal text-[#a8dadc] ">
                {tr("Your whole story.", "आपकी पूरी देखभाल।")}
              </em>
            </h1>

            <p className="max-w-2xl text-base sm:text-lg text-white/85 leading-relaxed font-light">
              {tr(
                "Continuity changes everything. Dr. Nitu Rajpoot takes the time to know you, understand your history, and provide unhurried, microscopic dental care built around trust and clinical precision.",
                "निरंतरता सब कुछ बदल देती है। डॉ. नीतू राजपूत आपको जानने, आपके दंत इतिहास को समझने और विश्वास व सटीकता पर आधारित बिना किसी जल्दबाजी के आधुनिक दंत चिकित्सा प्रदान करने के लिए पूरा समय देती हैं।"
              )}
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/patient/book-appointment?type=IN_CLINIC"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-bold text-[#0c2a2a] shadow-xl hover:bg-[#a8dadc] transition-all duration-200 hover:-translate-y-0.5"
              >
                <CalendarDays className="h-4 w-4 text-[#e76f51]" /> {tr("Book In-Clinic Visit", "क्लिनिक अपॉइंटमेंट बुक करें")}
              </Link>
              <Link
                href="/patient/book-appointment?type=VIDEO"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 py-4 text-sm font-bold text-white backdrop-blur-md hover:bg-white/20 transition-all duration-200"
              >
                <Video className="h-4 w-4" /> {tr("Video Consultation", "वीडियो परामर्श")}
              </Link>
              <a
                href="tel:+916261474753"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-4 text-sm font-medium text-white/90 hover:bg-white/10 transition-colors"
              >
                <Phone className="h-4 w-4 text-[#a8dadc]" /> +91 98765 43210
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. STORY PANEL SECTION
      ========================================================================= */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 rounded-2xl border-l-8 border-[#e76f51] bg-[#f0f4f4] p-8 sm:p-12 lg:grid-cols-[0.9fr_1.1fr] lg:p-16 shadow-sm">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#e76f51]">
              {tr("Dr. Nitu Rajpoot, BDS", "डॉ. नीतू राजपूत, बीडीएस")}
            </p>
            <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-normal leading-tight text-[#0c2a2a]">
              {tr("Clinical precision, with a deeply human touch.", "आत्मीय संवेदनशीलता के साथ सटीक दंत चिकित्सा।")}
            </h2>
          </div>
          <div className="space-y-5 text-base sm:text-lg leading-relaxed text-[#4a5e5e]">
            <p>
              {tr(
                "Dr. Nitu founded Shree Sainath Dental Clinic to create the kind of clinic she would choose for her own family: calm, honest, unhurried, and grounded in conservative, world-class dentistry.",
                "डॉ. नीतू ने श्री साईनाथ डेंटल क्लिनिक की स्थापना एक ऐसे क्लिनिक के रूप में की जिसे वे अपने स्वयं के परिवार के लिए चुनतीं: शांत, ईमानदार, बिना किसी जल्दबाजी के, और विश्वस्तरीय दंत चिकित्सा पर आधारित।"
              )}
            </p>
            <p>
              {tr(
                "Her approach begins with listening. Every diagnosis is shown in high-definition magnification, every option is considered together, and every treatment plan respects your comfort, time, and long-term oral health.",
                "उनका दृष्टिकोण आपकी बात सुनने से शुरू होता है। हर जांच को हाई-डेफिनिशन मैग्निफिकेशन में दिखाया जाता है, हर विकल्प पर मिलकर विचार किया जाता है, और हर उपचार योजना आपके आराम, समय और दीर्घकालिक दंत स्वास्थ्य का सम्मान करती है।"
              )}
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 font-bold text-[#0c2a2a] hover:text-[#e76f51] transition-colors group"
              >
                {tr("Ask Dr. Nitu a question", "डॉ. नीतू से सवाल पूछें")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. PHOTO NARRATIVE SECTION
      ========================================================================= */}
      <section className="bg-[#f0f4f4] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative group">
              <div className="absolute -inset-3 rounded-2xl bg-[#a8dadc]/60 -rotate-1 transition-transform group-hover:rotate-0" />
              <div className="relative overflow-hidden rounded-xl shadow-xl">
                <img
                  src={explainedcare.src}
                  
                  alt={tr("Dr. Nitu explaining a dental model to a patient", "मरीज को डेंटल मॉडल समझातीं डॉ. नीतू")}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
            <div className="space-y-6">
              <p className="text-xs font-bold uppercase tracking-widest text-[#0c2a2a]">
                {tr("The Way We Work", "हमारे काम करने का तरीका")}
              </p>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-tight text-[#0c2a2a]">
                {tr("A conversation before a decision.", "किसी भी निर्णय से पहले एक स्पष्ट बातचीत।")}
              </h2>
              <p className="text-base sm:text-lg leading-relaxed text-[#4a5e5e]">
                {tr(
                  "Understanding your care starts with an honest conversation, a careful examination, and the freedom to ask anything without judgment.",
                  "आपकी देखभाल की शुरुआत एक ईमानदार बातचीत, सावधानीपूर्वक जांच और बिना किसी झिझक के कुछ भी पूछने की स्वतंत्रता से होती है।"
                )}
              </p>
              <p className="text-base sm:text-lg leading-relaxed text-[#4a5e5e]">
                {tr(
                  "We explain what we see through intraoral cameras and consider the choices together so your plan always feels like yours—clear, transparent, and respectful of your budget.",
                  "हम इंट्राओरल कैमरों के माध्यम से जो देखते हैं उसे स्पष्ट रूप से समझाते हैं और मिलकर विकल्पों पर विचार करते हैं ताकि आपकी उपचार योजना हमेशा स्पष्ट, पारदर्शी और आपके बजट के अनुकूल रहे।"
                )}
              </p>
              <div className="pt-2">
                <Link
                  href="/treatments"
                  className="inline-flex items-center gap-2 font-bold text-[#0c2a2a] hover:text-[#e76f51] transition-colors group"
                >
                  {tr("Explore our treatment approach", "हमारे उपचार दृष्टिकोण को जानें")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. GUIDING VALUES - 3 Numbered Cards
      ========================================================================= */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-[#0c2a2a]">
              {tr("What Guides Us", "हमारे सिद्धांत")}
            </p>
            <h2 className="mt-3 font-serif text-3xl sm:text-5xl font-normal text-[#0c2a2a]">
              {tr("Care that feels personal because it is.", "देखभाल जो व्यक्तिगत लगती है, क्योंकि यह वास्तव में है।")}
            </h2>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                num: "01",
                icon: HeartHandshake,
                title: tr("Kind by design", "संवेदनशील और सौम्य व्यवहार"),
                desc: tr(
                  "A slower pace, gentle communication, and thoughtful comfort at every step. Dental anxiety is respected, never dismissed.",
                  "शांत गति, सौम्य संवाद और हर कदम पर आपके आराम का ध्यान। दंत चिकित्सा से जुड़े डर को समझा जाता है, कभी अनदेखा नहीं किया जाता।"
                ),
              },
              {
                num: "02",
                icon: MessageCircle,
                title: tr("Clear, never clinical", "स्पष्ट और पारदर्शी जानकारी"),
                desc: tr(
                  "You will always understand what we see, what it means, and what comes next. Honest estimates with zero surprise fees.",
                  "आपको हमेशा पता रहेगा कि समस्या क्या है, इसका क्या अर्थ है और अगला कदम क्या होगा। बिना किसी छुपे शुल्क के ईमानदार अनुमान।"
                ),
              },
              {
                num: "03",
                icon: ShieldCheck,
                title: tr("Conservative care", "प्राकृतिक दांतों का संरक्षण"),
                desc: tr(
                  "We preserve healthy natural tooth structure whenever possible and only recommend procedures that truly serve your health.",
                  "हम जब भी संभव हो स्वस्थ प्राकृतिक दांतों की संरचना को सुरक्षित रखते हैं और केवल उन्हीं प्रक्रियाओं की सलाह देते हैं जो वास्तव में आपके स्वास्थ्य के लिए आवश्यक हैं।"
                ),
              },
            ].map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.num}
                  className="relative overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                >
                  <span className="absolute top-6 right-8 font-serif text-5xl font-normal text-[#e76f51]/20">
                    {v.num}
                  </span>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#a8dadc]/40 text-[#0c2a2a]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-8 font-serif text-2xl font-normal text-[#0c2a2a]">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#4a5e5e]">
                    {v.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. CALMER CLINIC SPOTLIGHT
      ========================================================================= */}
      <section className="bg-[#f0f4f4] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative group">
              <div className="absolute -inset-3 rounded-2xl bg-[#e76f51]/40 rotate-1 transition-transform group-hover:rotate-0" />
              <div className="relative overflow-hidden rounded-xl shadow-xl">
                <img
                  src={clinicinterior.src}
                  alt={tr("Bright and welcoming Shree Sainath Dental Clinic reception", "श्री साईनाथ डेंटल क्लिनिक का स्वागतपूर्ण रिसेप्शन")}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-xs font-bold uppercase tracking-widest text-[#0c2a2a]">
                {tr("A Calmer Clinic", "एक शांत और सुखद क्लिनिक")}
              </p>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-tight text-[#0c2a2a]">
                {tr("Designed to lower the volume.", "आपको तनावमुक्त रखने के लिए डिज़ाइन किया गया।")}
              </h2>
              <p className="text-base sm:text-lg leading-relaxed text-[#4a5e5e]">
                {tr(
                  "Natural light, warm materials, quiet treatment suites, and appointments that do not feel rushed. Everything in our clinic is designed to help you breathe easy and feel completely safe.",
                  "प्राकृतिक रोशनी, शांत उपचार कक्ष, और ऐसे अपॉइंटमेंट जो कभी जल्दबाजी महसूस नहीं कराते। हमारे क्लिनिक में सब कुछ इस तरह से तैयार किया गया है कि आप पूरी तरह से सुरक्षित और निश्चिंत महसूस करें।"
                )}
              </p>

              <div className="mt-8 flex items-center gap-4 border-t border-gray-300 pt-6">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#a8dadc]/40 text-[#0c2a2a]">
                  <Award className="h-6 w-6 text-[#0c2a2a]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0c2a2a]">
                    {tr("Advanced Microscopic & Aesthetic Training", "उन्नत माइक्रोस्कोपिक और एस्थेटिक प्रशिक्षण")}
                  </p>
                  <p className="text-xs text-[#4a5e5e]">
                    {tr("IDA & Certified continuing education, every year.", "IDA और प्रमाणित निरंतर दंत चिकित्सा शिक्षा, हर वर्ष।")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. THE PERSONAL DIFFERENCE (EDITORIAL COMPOSITION WITH PLAQUES)
      ========================================================================= */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#0c2a2a]">
                {tr("The Personal Difference", "व्यक्तिगत देखभाल का अंतर")}
              </p>
              <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-normal leading-tight text-[#0c2a2a]">
                {tr("Familiar care, at every step.", "हर कदम पर एक परिचित और भरोसेमंद देखभाल।")}
              </h2>
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#4a5e5e]">
                {tr(
                  "No rotating team, no retelling your story at every appointment. You see the same dentist who already knows your oral history, your anxieties, and how you want your smile to look and feel.",
                  "न कोई बदलती हुई टीम, न ही हर अपॉइंटमेंट पर अपनी कहानी दोबारा बताने की जरूरत। आप हमेशा एक ही डेंटिस्ट से मिलते हैं जो आपके दंत इतिहास, आपकी चिंताओं और आपकी मुस्कान की प्राथमिकताओं को पहले से जानते हैं।"
                )}
              </p>

              <ul className="mt-8 divide-y divide-gray-200">
                {[
                  {
                    icon: CalendarCheck,
                    strong: tr("One doctor, every visit", "हर विजिट पर एक ही डॉक्टर"),
                    sub: tr(
                      "You are never passed around to assistants or hurried out the door.",
                      "आपको कभी भी सहायकों के भरोसे नहीं छोड़ा जाता और न ही जल्दबाजी की जाती है।"
                    ),
                  },
                  {
                    icon: Clock3,
                    strong: tr("Appointments that breathe", "पर्याप्त समय के साथ अपॉइंटमेंट"),
                    sub: tr(
                      "Dedicated time for questions, clear next steps, and zero rushed goodbyes.",
                      "आपके सवालों, स्पष्ट अगले कदमों और आरामदायक उपचार के लिए समर्पित समय।"
                    ),
                  },
                  {
                    icon: HeartHandshake,
                    strong: tr("Care that remembers you", "देखभाल जो आपको याद रखती है"),
                    sub: tr(
                      "Your dental history, preferences, and aesthetic goals carried from visit to visit.",
                      "आपका दंत इतिहास, प्राथमिकताएं और मुस्कान के लक्ष्य हर विजिट में ध्यान रखे जाते हैं।"
                    ),
                  },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <li key={idx} className="flex items-center gap-4 py-4">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#a8dadc]/40 text-[#0c2a2a]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <strong className="block text-sm font-bold text-[#0c2a2a]">
                          {item.strong}
                        </strong>
                        <span className="text-xs sm:text-sm text-[#4a5e5e]">
                          {item.sub}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-6">
                <div>
                  <p className="font-serif text-xl font-normal text-[#0c2a2a]">
                    {tr("Dr. Nitu Rajpoot", "डॉ. नीतू राजपूत")}
                  </p>
                  <p className="text-xs uppercase tracking-wider text-[#4a5e5e]">
                    {tr("Your dentist, at every visit", "हर विजिट पर आपकी डेंटिस्ट")}
                  </p>
                </div>
                <Link
                  href="/patient/book-appointment?type=IN_CLINIC"
                  className="inline-flex items-center gap-2 rounded-full bg-[#0c2a2a] px-6 py-3 text-xs font-bold text-white hover:bg-[#1a4a4a] transition-colors"
                >
                  {tr("Plan Your First Visit", "अपनी पहली विजिट बुक करें")} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Signature Two-Photo Media Stack with Frosted Plaque & 1:1 Badge */}
            <div className="grid gap-6 sm:grid-cols-2 items-end">
              <div className="relative sm:col-span-2">
                <div className="relative overflow-hidden rounded-2xl shadow-xl">
                  <img
                    src={welcome.src}
                    alt={tr("Dr. Nitu warmly welcoming a patient", "मरीज का गर्मजोशी से स्वागत करतीं डॉ. नीतू")}
                    className="aspect-[4/3] sm:aspect-[3/4] w-full object-cover"
                  />
                  {/* Frosted Plaque */}
                  <div className="absolute bottom-4 left-4 z-10 rounded-xl bg-white/90 p-4 shadow-lg backdrop-blur-md">
                    <p className="font-serif text-lg font-normal text-[#0c2a2a]">
                      {tr("Known by name", "व्यक्तिगत पहचान और अपनापन")}
                    </p>
                    <p className="text-xs text-[#4a5e5e]">
                      {tr("Welcomed like family, every visit", "हर विजिट पर परिवार जैसा स्वागत")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Dark 1:1 Care Badge */}
              <div className="rounded-2xl bg-[#0c2a2a] p-6 text-white shadow-xl">
                <p className="font-serif text-3xl font-normal text-[#a8dadc]">
                  {tr("1:1 Care", "1:1 देखभाल")}
                </p>
                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-white/70">
                  {tr("One doctor, every time", "हर बार एक ही डॉक्टर")}
                </p>
              </div>

              {/* Offset Detail Photo */}
              <div className="relative overflow-hidden rounded-2xl border-4 border-white shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80"
                  alt={tr("Detailed diagnosis discussion", "विस्तृत निदान और परामर्श")}
                  className="aspect-square w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. PHOTO MOMENTS SHOWCASE
      ========================================================================= */}
      <section className="bg-[#f0f4f4] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-[#0c2a2a]">
              {tr("A Closer Look", "क्लिनिक की एक झलक")}
            </p>
            <h2 className="mt-3 font-serif text-3xl sm:text-5xl font-normal text-[#0c2a2a]">
              {tr("Thoughtful spaces. Thoughtful moments.", "सुव्यवस्थित स्थान। आत्मीय पल।")}
            </h2>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            {[
              {
                src:clinicroom.src,
                caption: tr("Calm, welcoming reception area", "शांत और स्वागतपूर्ण रिसेप्शन क्षेत्र"),
              },
              {
                src: smilemoment.src,
                caption: tr("Dedicated 1:1 consultation rooms", "समर्पित 1:1 परामर्श कक्ष"),
              },
              {
                src: clinicinterior.src,
                caption: tr("Magnified digital dentistry suites", "आधुनिक डिजिटल डेंटिस्ट्री सुइट्स"),
              },
            ].map((p, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <img
                  src={p.src}
                  alt={p.caption}
                  className="aspect-[4/3]   md:aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-90" />
                <p className="absolute bottom-4 left-4 right-4 text-sm font-medium text-white">
                  {p.caption}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. VIBRANT CORAL BOOKING BAND
      ========================================================================= */}
      <section className="bg-[#e76f51] text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 py-16 sm:py-20 md:flex-row md:items-center sm:px-6 lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/90">
              {tr("Ready when you are", "जब आप तैयार हों")}
            </p>
            <h2 className="mt-3 font-serif text-3xl sm:text-5xl font-normal leading-tight text-white">
              {tr("Let’s make your next visit", "आइए आपकी अगली क्लिनिक विजिट को")}
              <br />
              <em className="italic font-normal">{tr("feel refreshingly easy.", "बेहद आसान और आरामदायक बनाएं।")}</em>
            </h2>
          </div>
          <Link
            href="/patient/book-appointment?type=IN_CLINIC"
            className="inline-flex items-center gap-2 rounded-full bg-[#0c2a2a] px-8 py-4 text-sm font-bold text-white shadow-xl hover:bg-[#1a4a4a] transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap"
          >
            <CalendarDays className="h-4 w-4 text-[#e76f51]" /> {tr("Request an Appointment", "अपॉइंटमेंट बुक करें")}
          </Link>
        </div>
      </section>

    </main>
  );
}