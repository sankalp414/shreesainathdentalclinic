"use client";

import React from "react";
import Link from "next/link";
import {
  Check,
  Search,
  Sparkles,
  Stethoscope,
  ArrowRight,
  Phone,
  CalendarDays,
  Clock,
  ShieldCheck,
} from "lucide-react";
import treatmentrootcanalslider from "@/assets/images/treatmentrootcanalslider.jpg";
import treatmentimplantslider from "@/assets/images/treatmentimplantsslider.jpg";
import treatmentwhiteningslider from "@/assets/images/treatmentwhiteningslider.jpg"
import treatmentcrownslider from "@/assets/images/treatmentcrownsslider.jpg"
import treatmenttoothextractionslider from "@/assets/images/treatmentwisdomslider.jpg"
import treatmentveenerslider from "@/assets/images/treatmentveneersslider.jpg"
import treatmentalignerslider from "@/assets/images/treatmentalignersslider.jpg"
import treatmentscalingslider from "@/assets/images/treatmentscalingslider.jpg"
import treatmentgumslider from "@/assets/images/treatmentgumslider.jpg"
import treatmentpediatricslider from "@/assets/images/treatmentpediatricslider.jpg"
import treatmentfillingslider from "@/assets/images/treatmentfillingslider.jpg"
import personalconsultation from "@/assets/images/personalconsultation.jpg"
import dentaldetails from "@/assets/images/dentaldetails.jpg"
import patientcomfort from "@/assets/images/patientcomfort.jpg"
import explainedcare from "@/assets/images/explainedcare.jpg"
import clinicinterior from "@/assets/images/clinicinterior.jpg"
import familyclinic from "@/assets/images/familyclinic.jpg"
import smilemoment from "@/assets/images/smilemoment.jpg"
import treatmenthero from "@/assets/images/treatmenthero.jpg"
export const TREATMENTS = [
  {
    slug: "root-canal-treatment",
    title: "Root Canal Treatment",
    category: "Advanced Restorative",
    description:
      "Pain-free micro-endodontics performed under high magnification to save infected or damaged teeth.",
    image:treatmentrootcanalslider.src,
    duration: "45 Mins",
    price: "₹3,500 onwards",
  },
  {
    slug: "dental-implants",
    title: "Dental Implants",
    category: "Prosthodontics",
    description:
      "Permanent titanium fixtures topped with natural porcelain crowns for missing teeth restoration.",
    image:treatmentimplantslider.src,
    duration: "Multi-visit",
    price: "₹18,000 onwards",
  },
  {
    slug: "clear-aligners-braces",
    title: "Clear Aligners & Braces",
    category: "Orthodontics",
    description:
      "Virtually invisible removable aligners and modern braces to straighten your smile discreetly.",
    image:treatmentalignerslider.src,
    duration: "Custom plan",
    price: "₹45,000 onwards",
  },
  {
    slug: "laser-teeth-whitening",
    title: "Laser Teeth Whitening",
    category: "Aesthetic Dentistry",
    description:
      "In-office advanced laser bleaching to remove deep stains and give you a brilliant white smile.",
    image:treatmentwhiteningslider.src,
    duration: "45 Mins",
    price: "₹5,000 onwards",
  },
  {
    slug: "dental-crowns-bridges",
    title: "Dental Crowns & Bridges",
    category: "Prosthodontics",
    description:
      "Custom-crafted zirconia and ceramic crowns designed to protect weak teeth and bridge gaps.",
    image:treatmentcrownslider.src,
    duration: "2 Visits",
    price: "₹4,000 onwards",
  },
  {
    slug: "wisdom-tooth-extraction",
    title: "Wisdom Tooth Extraction",
    category: "Oral Surgery",
    description:
      "Atraumatic surgical removal of impacted or painful wisdom teeth under sterile, stress-free care.",
    image:treatmenttoothextractionslider.src,
    duration: "30 - 45 Mins",
    price: "₹2,500 onwards",
  },
  {
    slug: "cosmetic-smile-makeover-veneers",
    title: "Cosmetic Smile Makeover & Veneers",
    category: "Aesthetic Dentistry",
    description:
      "Custom porcelain veneers and smile reshaping tailored perfectly to your facial structure.",
    image:treatmentveenerslider.src,
    duration: "2-3 Visits",
    price: "₹8,000 onwards",
  },
  {
    slug: "teeth-cleaning-scaling",
    title: "Teeth Cleaning & Scaling",
    category: "Preventive Care",
    description:
      "Ultrasonic professional scaling and polishing to eliminate plaque, tartar, and gingivitis.",
    image:treatmentscalingslider.src,
    duration: "30 Mins",
    price: "₹1,000 onwards",
  },
  {
    slug: "laser-gum-therapy",
    title: "Laser Gum Therapy",
    category: "Periodontics",
    description:
      "Painless soft-tissue laser treatment for gum contouring, pigmentation reduction, and periodontitis.",
    image:treatmentgumslider.src,
    duration: "30 Mins",
    price: "₹3,000 onwards",
  },
  {
    slug: "composite-fillings",
    title: "Composite Fillings",
    category: "Restorative",
    description:
      "Tooth-colored aesthetic light-cure fillings for cavities, chipped teeth, and gap closures.",
    image:treatmentfillingslider.src,
    duration: "30 Mins",
    price: "₹1,200 onwards",
  },
  {
    slug: "pediatric-dentistry",
    title: "Pediatric Dentistry",
    category: "Child Dental Care",
    description:
      "Gentle, child-friendly preventive sealants, fluoride treatments, and painless fillings for kids.",
    image:treatmentpediatricslider.src,
    duration: "30 Mins",
    price: "₹1,000 onwards",
  },
];

export default function TreatmentsPage() {
  const marqueeItems = [...TREATMENTS, ...TREATMENTS];

  return (
    <main className="min-h-screen bg-[#fcfdfd] text-[#1c2826] font-sans antialiased selection:bg-[#cce8e2] selection:text-[#0d3b36]">
      {/* ========================================================= */}
      {/* 1. HERO SECTION                                           */}
      {/* ========================================================= */}
      <section className="relative min-h-[92dvh] sm:min-h-[100dvh] w-full flex items-end overflow-hidden pb-20 pt-36 px-6 sm:px-12 lg:px-20">
        <img
          src={treatmenthero.src}
          alt="Dr. Nitu discussing a clear dental treatment plan with a patient"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 via-30% to-transparent to-65%" />
        {/* <div className="absolute inset-0 bg-gradient-to-r from-[#121a1f]/80 via-[#121a1f]/40 to-transparent" /> */}

        <div className="relative z-10 max-w-4xl space-y-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/10 backdrop-blur-md text-[#cce8e2] border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-[#e5684f]" />
            Care, clearly explained
          </span>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-white tracking-tight leading-[1.08]">
            The right treatment. <br />
            <em className="italic font-normal text-[#cce8e2]">Nothing more.</em>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white/85 max-w-2xl font-light leading-relaxed">
            Modern, ISO-sterilized dentistry guided by what you need, what you value,
            and what will protect your smile for the long term.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              href="/patient/book"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white text-[#121a1f] text-sm font-semibold hover:bg-[#cce8e2] transition-colors shadow-lg"
            >
              Book a visit <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:+919876543210"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/25 text-sm font-semibold hover:bg-white/20 transition-colors"
            >
              <Phone className="w-4 h-4 text-[#cce8e2]" /> Call the clinic
            </a>
          </div>
        </div>

        {/* Coral Bottom Accent Bar */}
        <div className="absolute bottom-0 inset-x-0 h-1.5 bg-[#e5684f]" aria-hidden="true" />
      </section>

      {/* ========================================================= */}
      {/* 2. INFINITE TREATMENT MARQUEE SLIDER                      */}
      {/* ========================================================= */}
      <section className="py-24 sm:py-32 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-[#0d3b36]">
            Our treatments
          </p>
          <h2 className="mt-3 text-3xl sm:text-5xl font-serif text-[#121a1f] tracking-tight">
            Everyday care. Thoughtful solutions.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#1c2826]/75 max-w-2xl">
            From routine prevention to complete smile restoration, every appointment
            is shaped around your personal priorities with zero guesswork.
          </p>
        </div>

        <div className="relative w-full overflow-hidden marquee-wrapper py-6">
          <div className="flex w-max animate-treatment-marquee space-x-6 px-4">
            {marqueeItems.map((item, idx) => (
              <Link
                key={`${item.slug}-${idx}`}
                href={`/treatments/${item.slug}`}
                className="group relative w-[380px] sm:w-[480px] aspect-[3/4] rounded-3xl overflow-hidden bg-[#121a1f] shadow-lg transition-all duration-500 hover:-translate-y-3.5 hover:shadow-2xl shrink-0 block"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Progressive Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#121a1f]/95 via-[#121a1f]/50 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Floating Index Number Badge */}
                <span className="absolute top-4 left-4 inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-widest bg-[#121a1f]/70 text-white backdrop-blur-md border border-white/15">
                  {String((idx % TREATMENTS.length) + 1).padStart(2, "0")}
                </span>

                {/* Category Pill Top Right */}
                <span className="absolute top-4 right-4 inline-flex items-center px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-white/20 text-[#cce8e2] backdrop-blur-md border border-white/20">
                  {item.category}
                </span>

                {/* Revealable Content Card */}
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-400 ease-out">
                  <div className="w-9 h-1 bg-[#e5684f] mb-3 rounded-full" />
                  <h3 className="text-xl sm:text-2xl font-serif text-white leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-white/80 line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-xs font-bold">
                    <span className="text-[#cce8e2] flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {item.duration}
                    </span>
                    <span className="text-[#e5684f] group-hover:translate-x-1 transition-transform">
                      {item.price} →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. A CLOSER LOOK (3-PHOTO IMAGE STRIP)                    */}
      {/* ========================================================= */}
      <section className="bg-[#f4f7f6] py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-[#0d3b36]">
              A closer look
            </p>
            <h2 className="mt-3 text-3xl sm:text-5xl font-serif text-[#121a1f] tracking-tight">
              Treatment feels better when you know what to expect.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16">
            <figure className="group relative rounded-xl overflow-hidden shadow-md bg-white aspect-[3/4]">
              <img
                src={personalconsultation.src}
                alt="Dr. Nitu explaining a digital dental scan to a patient"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              {/* <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" /> */}
              {/* <figcaption className="absolute bottom-4 left-5 right-5 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Transparent digital consultation
              </figcaption> */}
            </figure>

            <figure className="group relative rounded-xl overflow-hidden shadow-md bg-white aspect-[3/4]">
              <img
                src={dentaldetails.src}
                alt="High magnification model used to clarify dental treatment"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              {/* <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" /> */}
              {/* <figcaption className="absolute bottom-4 left-5 right-5 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Precision equipment &amp; tactile models
              </figcaption> */}
            </figure>

            <figure className="group relative rounded-xl overflow-hidden shadow-md bg-white aspect-[3/4]">
              <img
                src={patientcomfort.src}
                alt="A relaxed patient receiving gentle, unhurried care"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              {/* <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" /> */}
              {/* <figcaption className="absolute bottom-4 left-5 right-5 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Relaxed, pain-free operatory comfort
              </figcaption> */}
            </figure>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. PHOTO NARRATIVE: YOUR CHOICES, CLEARLY EXPLAINED       */}
      {/* ========================================================= */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 grid items-center gap-12 lg:grid-cols-2">
          <div className="order-2 lg:order-1 space-y-6">
            <p className="text-xs font-bold uppercase tracking-widest text-[#0d3b36]">
              Your choices, clearly explained
            </p>
            <h2 className="text-3xl sm:text-5xl font-serif text-[#121a1f] tracking-tight leading-tight">
              See the why behind every recommendation.
            </h2>
            <p className="text-base sm:text-lg text-[#1c2826]/75 leading-relaxed">
              A clear picture of your dental health makes each next step easier. We
              show you what we find on intraoral scans, walk through your options,
              and move at your pace without pressure.
            </p>
            <p className="pt-6 border-t border-slate-200 text-sm leading-relaxed text-slate-500">
              From preventive hygiene to full smile restoration, the goal is always
              a lasting, functional result that fits your lifestyle.
            </p>
            <div className="pt-2">
              <Link
                href="/patient/book"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#0d3b36] text-white text-sm font-semibold hover:bg-[#121a1f] transition-colors shadow-md"
              >
                Schedule an in-person consultation <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative rounded-xl overflow-hidden shadow-2xl aspect-[4/4]">
            <img
              src={explainedcare.src}
              alt="Dr. Nitu showing clear options on a tooth model"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. HOW CARE UNFOLDS (3-STEP DEEP TEAL TIMELINE)           */}
      {/* ========================================================= */}
      <section className="bg-[#0d3b36] text-white py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 grid gap-14 lg:grid-cols-2 items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#cce8e2]">
              How care unfolds
            </span>
            <h2 className="font-serif mt-4 text-4xl sm:text-6xl leading-[1.1] text-white">
              A clear path from concern to confidence.
            </h2>
            <p className="mt-6 text-sm sm:text-base text-white/75 leading-relaxed max-w-md">
              No rushed diagnosis or hidden surprises. Each treatment follows a
              structured, transparent methodology designed to keep you informed.
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                Icon: Search,
                title: "Listen & look",
                copy: "We start with your symptoms, complete clinical imaging, and zero pressure.",
              },
              {
                Icon: Stethoscope,
                title: "Explain & choose",
                copy: "Dr. Nitu talks you through the diagnosis and presents balanced, transparent treatment routes.",
              },
              {
                Icon: Sparkles,
                title: "Treat & protect",
                copy: "Comfortable, pain-free treatment followed by long-term aftercare instructions.",
              },
            ].map(({ Icon, title, copy }, i) => (
              <div
                key={title}
                className="flex items-start gap-5 border-b border-white/15 pb-8 last:border-b-0"
              >
                <span className="grid w-12 h-12 shrink-0 place-items-center rounded-full bg-[#cce8e2] text-[#0d3b36] shadow-md">
                  <Icon className="w-5 h-5" />
                </span>
                <div>
                  <p className="text-xs font-bold text-[#cce8e2] tracking-wider uppercase">
                    Step 0{i + 1}
                  </p>
                  <h3 className="mt-1 text-xl sm:text-2xl font-serif text-white">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70 max-w-lg">
                    {copy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. COMPLETE CLINICAL DIRECTORY GRID                       */}
      {/* ========================================================= */}
      <section className="py-24 sm:py-32 bg-[#fcfdfd]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="border-b border-slate-200 pb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#0d3b36]">
                All Clinic Treatments
              </p>
              <h2 className="mt-2 text-3xl sm:text-5xl font-serif text-[#121a1f] tracking-tight">
                Specialized Care &amp; Procedures
              </h2>
            </div>
            <p className="text-sm text-slate-500 max-w-md">
              Click any procedure card below for complete clinical specifications,
              transparent pricing, and direct appointment booking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {TREATMENTS.map((item, idx) => (
              <Link
                key={item.slug}
                href={`/treatments/${item.slug}`}
                className="group relative rounded-3xl overflow-hidden bg-white border border-slate-200/80 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col"
              >
                {/* Photo Stage */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-white/90 text-[#0d3b36] shadow-sm">
                    {item.category}
                  </span>
                  <span className="absolute bottom-3 right-4 text-xs font-bold text-white flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#cce8e2]" />
                    {item.duration}
                  </span>
                </div>

                {/* Content Block */}
                <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 space-y-4">
                  <div>
                    <h3 className="text-2xl font-serif text-[#121a1f] group-hover:text-[#0d3b36] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                    <span className="text-[#0d3b36] text-sm font-semibold">
                      {item.price}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[#e5684f] group-hover:translate-x-1 transition-transform">
                      Explore Treatment <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. YOUR FIRST VISIT CHECKLIST SECTION                     */}
      {/* ========================================================= */}
      <section className="py-20 sm:py-28 bg-[#f4f7f6]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 grid items-center gap-14 lg:grid-cols-[1.1fr_.9fr]">
          <div className="relative rounded-3xl overflow-hidden p-3 bg-[#cce8e2] shadow-xl">
            <img
              src={clinicinterior.src}
              alt="Calm reception and operatory at Shree Sainath Dental Clinic"
              className="w-full aspect-[4/3] rounded-2xl object-cover"
              loading="lazy"
            />
          </div>

          <div className="space-y-6">
            <p className="text-xs font-bold uppercase tracking-widest text-[#0d3b36]">
              Your first visit
            </p>
            <h2 className="text-3xl sm:text-5xl font-serif text-[#121a1f] tracking-tight">
              Come as you are. Leave with clarity.
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              We know dental appointments can cause anxiety. Our first appointment is
              designed to be gentle, conversational, and completely unhurried.
            </p>

            <ul className="mt-8 space-y-4 pt-2">
              {[
                "Time to talk through your dental history and personal smile goals",
                "A gentle, comprehensive examination with low-radiation imaging",
                "Clear visual findings shown and explained to you on screen",
                "A written care plan with 100% transparent pricing and next steps",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3.5 text-sm sm:text-base text-[#121a1f]">
                  <span className="grid w-6 h-6 shrink-0 place-items-center rounded-full bg-[#cce8e2] text-[#0d3b36]">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <Link
                href="/patient/book"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#0d3b36] text-white text-sm font-semibold hover:bg-[#121a1f] transition-colors shadow-md"
              >
                Book your first visit <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. PHOTO MOMENTS (CARE THROUGH THE YEARS)                  */}
      {/* ========================================================= */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-widest text-[#0d3b36]">
              Care through the years
            </p>
            <h2 className="mt-3 text-3xl sm:text-5xl font-serif text-[#121a1f] tracking-tight">
              Good dentistry looks different for everyone.
            </h2>
            <p className="mt-4 text-base text-slate-600">
              Whether you are bringing your child for their first checkup or restoring
              complete bite function, we treat you like family.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 sm:mt-16">
            {[
              {
                src: familyclinic.src,
                caption: "Starting with confidence",
                alt: "Child and family dentist learning brushing care",
              },
              {
                src: patientcomfort.src,
                caption: "Feeling like yourself again",
                alt: "A patient sharing a healthy, natural smile",
              },
              {
                src: smilemoment.src,
                caption: "Comfort at every step",
                alt: "Gentle doctor reassuring patient in the clinic chair",
              },
            ].map((photo) => (
              <figure key={photo.caption} className="group">
                <div className="aspect-[3/4] rounded-xl overflow-hidden shadow-md bg-slate-100">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <figcaption className="mt-4 font-serif text-2xl text-[#121a1f]">
                  {photo.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 9. BOOKING BAND (CORAL ACCENT ACTION BANNER)               */}
      {/* ========================================================= */}
      <section className="bg-[#e5684f] text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-white/80">
              Ready when you are
            </span>
            <h2 className="font-serif mt-2 text-3xl sm:text-5xl leading-tight text-white">
              Let’s make your next visit <br />
              <em className="italic font-normal">feel refreshingly easy.</em>
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/patient/book"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#121a1f] text-white text-sm font-semibold hover:bg-black transition-colors shadow-xl"
            >
              <CalendarDays className="w-4 h-4 text-[#cce8e2]" />
              Request an appointment
            </Link>
            <a
              href="tel:+919876543210"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-white/15 hover:bg-white/25 text-white text-sm font-semibold transition-colors"
            >
              <Phone className="w-4 h-4" /> Call Clinic
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* CSS MARQUEE ANIMATION                                     */}
      {/* ========================================================= */}
      <style jsx global>{`
        @keyframes treatmentMarquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-treatment-marquee {
          display: flex;
          width: max-content;
          animation: treatmentMarquee 58s linear infinite;
        }
        .marquee-wrapper:hover .animate-treatment-marquee,
        .marquee-wrapper:focus-within .animate-treatment-marquee {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-treatment-marquee {
            animation: none;
          }
          .marquee-wrapper {
            overflow-x: auto;
          }
        }
      `}</style>
    </main>
  );
}
