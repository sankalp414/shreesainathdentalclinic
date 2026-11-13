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
export default function AboutPage() {
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
          alt="Dr. Nitu Rajpoot at Shree Sainath Dental Clinic"
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
              <Sparkles className="h-3.5 w-3.5 text-[#e76f51]" /> Meet Your Dentist
            </span>

            <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-normal leading-[0.92] tracking-tight text-white ">
              One doctor.{" "}
              <em className="font-serif italic font-normal text-[#a8dadc] ">
                Your whole story.
              </em>
            </h1>

            <p className="max-w-2xl text-base sm:text-lg text-white/85 leading-relaxed font-light">
              Continuity changes everything. Dr. Nitu Rajpoot takes the time to know you, understand your history, and provide unhurried, microscopic dental care built around trust and clinical precision.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/patient/book-appointment?type=IN_CLINIC"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-bold text-[#0c2a2a] shadow-xl hover:bg-[#a8dadc] transition-all duration-200 hover:-translate-y-0.5"
              >
                <CalendarDays className="h-4 w-4 text-[#e76f51]" /> Book In-Clinic Visit
              </Link>
              <Link
                href="/patient/book-appointment?type=VIDEO"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 py-4 text-sm font-bold text-white backdrop-blur-md hover:bg-white/20 transition-all duration-200"
              >
                <Video className="h-4 w-4" /> Video Consultation
              </Link>
              <a
                href="tel:+919876543210"
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
              Dr. Nitu Rajpoot, BDS
            </p>
            <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-normal leading-tight text-[#0c2a2a]">
              Clinical precision, with a deeply human touch.
            </h2>
          </div>
          <div className="space-y-5 text-base sm:text-lg leading-relaxed text-[#4a5e5e]">
            <p>
              Dr. Nitu founded Shree Sainath Dental Clinic to create the kind of clinic she would choose for her own family: calm, honest, unhurried, and grounded in conservative, world-class dentistry.
            </p>
            <p>
              Her approach begins with listening. Every diagnosis is shown in high-definition magnification, every option is considered together, and every treatment plan respects your comfort, time, and long-term oral health.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 font-bold text-[#0c2a2a] hover:text-[#e76f51] transition-colors group"
              >
                Ask Dr. Nitu a question
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
                  
                  alt="Dr. Nitu explaining a dental model to a patient"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
            <div className="space-y-6">
              <p className="text-xs font-bold uppercase tracking-widest text-[#0c2a2a]">
                The Way We Work
              </p>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-tight text-[#0c2a2a]">
                A conversation before a decision.
              </h2>
              <p className="text-base sm:text-lg leading-relaxed text-[#4a5e5e]">
                Understanding your care starts with an honest conversation, a careful examination, and the freedom to ask anything without judgment.
              </p>
              <p className="text-base sm:text-lg leading-relaxed text-[#4a5e5e]">
                We explain what we see through intraoral cameras and consider the choices together so your plan always feels like yours—clear, transparent, and respectful of your budget.
              </p>
              <div className="pt-2">
                <Link
                  href="/treatments"
                  className="inline-flex items-center gap-2 font-bold text-[#0c2a2a] hover:text-[#e76f51] transition-colors group"
                >
                  Explore our treatment approach
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
              What Guides Us
            </p>
            <h2 className="mt-3 font-serif text-3xl sm:text-5xl font-normal text-[#0c2a2a]">
              Care that feels personal because it is.
            </h2>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                num: "01",
                icon: HeartHandshake,
                title: "Kind by design",
                desc: "A slower pace, gentle communication, and thoughtful comfort at every step. Dental anxiety is respected, never dismissed.",
              },
              {
                num: "02",
                icon: MessageCircle,
                title: "Clear, never clinical",
                desc: "You will always understand what we see, what it means, and what comes next. Honest estimates with zero surprise fees.",
              },
              {
                num: "03",
                icon: ShieldCheck,
                title: "Conservative care",
                desc: "We preserve healthy natural tooth structure whenever possible and only recommend procedures that truly serve your health.",
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
                  alt="Bright and welcoming Shree Sainath Dental Clinic reception"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-xs font-bold uppercase tracking-widest text-[#0c2a2a]">
                A Calmer Clinic
              </p>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-tight text-[#0c2a2a]">
                Designed to lower the volume.
              </h2>
              <p className="text-base sm:text-lg leading-relaxed text-[#4a5e5e]">
                Natural light, warm materials, quiet treatment suites, and appointments that do not feel rushed. Everything in our clinic is designed to help you breathe easy and feel completely safe.
              </p>

              <div className="mt-8 flex items-center gap-4 border-t border-gray-300 pt-6">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#a8dadc]/40 text-[#0c2a2a]">
                  <Award className="h-6 w-6 text-[#0c2a2a]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0c2a2a]">
                    Advanced Microscopic & Aesthetic Training
                  </p>
                  <p className="text-xs text-[#4a5e5e]">
                    IDA & Certified continuing education, every year.
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
                The Personal Difference
              </p>
              <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-normal leading-tight text-[#0c2a2a]">
                Familiar care, at every step.
              </h2>
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#4a5e5e]">
                No rotating team, no retelling your story at every appointment. You see the same dentist who already knows your oral history, your anxieties, and how you want your smile to look and feel.
              </p>

              <ul className="mt-8 divide-y divide-gray-200">
                {[
                  {
                    icon: CalendarCheck,
                    strong: "One doctor, every visit",
                    sub: "You are never passed around to assistants or hurried out the door.",
                  },
                  {
                    icon: Clock3,
                    strong: "Appointments that breathe",
                    sub: "Dedicated time for questions, clear next steps, and zero rushed goodbyes.",
                  },
                  {
                    icon: HeartHandshake,
                    strong: "Care that remembers you",
                    sub: "Your dental history, preferences, and aesthetic goals carried from visit to visit.",
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
                    Dr. Nitu Rajpoot
                  </p>
                  <p className="text-xs uppercase tracking-wider text-[#4a5e5e]">
                    Your dentist, at every visit
                  </p>
                </div>
                <Link
                  href="/patient/book-appointment?type=IN_CLINIC"
                  className="inline-flex items-center gap-2 rounded-full bg-[#0c2a2a] px-6 py-3 text-xs font-bold text-white hover:bg-[#1a4a4a] transition-colors"
                >
                  Plan Your First Visit <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Signature Two-Photo Media Stack with Frosted Plaque & 1:1 Badge */}
            <div className="grid gap-6 sm:grid-cols-2 items-end">
              <div className="relative sm:col-span-2">
                <div className="relative overflow-hidden rounded-2xl shadow-xl">
                  <img
                    src={welcome.src}
                    alt="Dr. Nitu warmly welcoming a patient"
                    className="aspect-[4/3] sm:aspect-[3/4] w-full object-cover"
                  />
                  {/* Frosted Plaque */}
                  <div className="absolute bottom-4 left-4 z-10 rounded-xl bg-white/90 p-4 shadow-lg backdrop-blur-md">
                    <p className="font-serif text-lg font-normal text-[#0c2a2a]">
                      Known by name
                    </p>
                    <p className="text-xs text-[#4a5e5e]">
                      Welcomed like family, every visit
                    </p>
                  </div>
                </div>
              </div>

              {/* Dark 1:1 Care Badge */}
              <div className="rounded-2xl bg-[#0c2a2a] p-6 text-white shadow-xl">
                <p className="font-serif text-3xl font-normal text-[#a8dadc]">
                  1:1 Care
                </p>
                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-white/70">
                  One doctor, every time
                </p>
              </div>

              {/* Offset Detail Photo */}
              <div className="relative overflow-hidden rounded-2xl border-4 border-white shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80"
                  alt="Detailed diagnosis discussion"
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
              A Closer Look
            </p>
            <h2 className="mt-3 font-serif text-3xl sm:text-5xl font-normal text-[#0c2a2a]">
              Thoughtful spaces. Thoughtful moments.
            </h2>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            {[
              {
                src:clinicroom.src,
                caption: "Calm, welcoming reception area",
              },
              {
                src: smilemoment.src,
                caption: "Dedicated 1:1 consultation rooms",
              },
              {
                src: clinicinterior.src,
                caption: "Magnified digital dentistry suites",
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
              Ready when you are
            </p>
            <h2 className="mt-3 font-serif text-3xl sm:text-5xl font-normal leading-tight text-white">
              Let’s make your next visit
              <br />
              <em className="italic font-normal">feel refreshingly easy.</em>
            </h2>
          </div>
          <Link
            href="/patient/book-appointment?type=IN_CLINIC"
            className="inline-flex items-center gap-2 rounded-full bg-[#0c2a2a] px-8 py-4 text-sm font-bold text-white shadow-xl hover:bg-[#1a4a4a] transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap"
          >
            <CalendarDays className="h-4 w-4 text-[#e76f51]" /> Request an Appointment
          </Link>
        </div>
      </section>

    </main>
  );
}
