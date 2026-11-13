"use client";

import Link from "next/link";
import {
  CalendarCheck,
  Video,
  Sparkles,
  Clock,
  MapPin,
  Phone,
  ArrowRight,
} from "lucide-react";
import {
  useLanguage,
  translateDbTreatment,
} from "@/components/LanguageContext";

export default function HomePageClient({
  activeTreatments,
  doctor,
  settings,
}: {
  activeTreatments: Array<any>;
  doctor: any;
  settings: any;
}) {
  const { lang, t } = useLanguage();

  const clinicNameDisplay =
    lang === "hi"
      ? t.home.defaultClinicName
      : settings?.clinicName ?? t.home.defaultClinicName;

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-secondary/60 via-white to-brand-warm py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-brand-primary shadow-card border border-brand-secondary">
                <Sparkles className="h-3.5 w-3.5 text-brand-accent" />
                {t.home.badge}
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-brand-primary sm:text-5xl lg:text-6xl leading-[1.12]">
                {t.home.heroTitle}
              </h1>

              <p className="max-w-2xl text-base sm:text-lg text-brand-text/80 leading-relaxed">
                {t.home.heroDescPrefix}{" "}
                <strong className="text-brand-primary">
                  {clinicNameDisplay}
                </strong>
                {t.home.heroDescSuffix}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/patient/book-appointment?type=IN_CLINIC"
                  className="inline-flex items-center gap-2.5 rounded-2xl bg-brand-primary px-7 py-4 text-sm font-semibold text-white shadow-elevated hover:bg-brand-primary/95 transition"
                >
                  <CalendarCheck className="h-5 w-5 text-brand-accent" />
                  {t.home.bookAppointment}
                </Link>

                <Link
                  href="/patient/book-appointment?type=VIDEO"
                  className="inline-flex items-center gap-2.5 rounded-2xl border-2 border-brand-primary/15 bg-white px-7 py-4 text-sm font-semibold text-brand-primary hover:border-brand-accent transition"
                >
                  <Video className="h-5 w-5 text-brand-accent" />
                  {t.home.bookVideoConsultation}
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-brand-primary/10">
                <div>
                  <p className="text-2xl font-bold text-brand-primary">
                    {doctor?.experienceYears ?? 12}
                    {t.home.yrsSuffix}
                  </p>
                  <p className="text-xs text-brand-text/70">
                    {t.home.clinicalExcellence}
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-brand-primary">
                    {t.home.classB}
                  </p>
                  <p className="text-xs text-brand-text/70">
                    {t.home.autoclaveSterilization}
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-brand-primary">
                    {t.home.qrQueue}
                  </p>
                  <p className="text-xs text-brand-text/70">
                    {t.home.zeroWaitReception}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-white p-6 shadow-elevated border border-brand-secondary space-y-5">
                <div className="rounded-2xl bg-brand-secondary/70 p-5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-brand-accent">
                    {t.home.principalDentalSurgeon}
                  </span>
                  <h2 className="mt-1 text-xl font-bold text-brand-primary">
                    {t.home.doctorName}
                  </h2>
                  <p className="text-xs text-brand-text/75 mt-1">
                    {lang === "hi"
                      ? t.home.defaultQualifications
                      : doctor?.qualifications ?? t.home.defaultQualifications}
                  </p>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between rounded-xl bg-brand-warm px-4 py-3">
                    <span className="font-medium text-brand-primary">
                      {t.home.inClinicConsultation}
                    </span>
                    <span className="font-bold text-brand-primary">
                      ₹
                      {(
                        (doctor?.inClinicConsultationFeePaise ?? 50000) / 100
                      ).toFixed(0)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-brand-warm px-4 py-3">
                    <span className="font-medium text-brand-primary">
                      {t.home.onlineVideoConsultation}
                    </span>
                    <span className="font-bold text-brand-accent">
                      ₹
                      {(
                        (settings?.videoConsultationFeePaise ?? 70000) / 100
                      ).toFixed(0)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-brand-text/70">
                  <Clock className="h-4 w-4 text-brand-accent shrink-0" />
                  <span>{settings?.workingHoursText}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DYNAMIC CLINICAL TREATMENTS */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-accent">
                {t.home.specializedProcedures}
              </span>
              <h2 className="mt-2 text-3xl font-bold text-brand-primary">
                {t.home.clinicalTreatmentsOffered}
              </h2>
            </div>
            <Link
              href="/treatments"
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary hover:text-brand-accent"
            >
              {t.home.exploreAllTreatments} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {activeTreatments.map((item) => {
              const localized = translateDbTreatment(item, lang);
              return (
                <div
                  key={item.id}
                  className="flex flex-col justify-between rounded-2xl border border-brand-secondary bg-brand-warm/50 p-6 shadow-card hover:shadow-elevated transition"
                >
                  <div>
                    <span className="inline-block rounded-lg bg-brand-secondary px-3 py-1 text-xs font-semibold text-brand-primary">
                      {localized.category}
                    </span>
                    <h3 className="mt-4 text-lg font-bold text-brand-primary">
                      {localized.name}
                    </h3>
                    <p className="mt-2 text-sm text-brand-text/75 line-clamp-3">
                      {localized.shortDescription}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-brand-primary/10 flex items-center justify-between">
                    <div>
                      <span className="block text-xs text-brand-text/60">
                        {item.durationMinutes} {t.home.mins}
                      </span>
                      <span className="text-base font-bold text-brand-primary">
                        ₹{(item.pricePaise / 100).toLocaleString("en-IN")}
                      </span>
                    </div>
                    <Link
                      href={`/patient/book-appointment?type=IN_CLINIC&treatmentId=${item.id}`}
                      className="rounded-xl bg-brand-primary px-4 py-2 text-xs font-semibold text-white hover:bg-brand-accent transition"
                    >
                      {t.home.bookSlot}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONTACT & LOCATION FOOTER */}
      <footer className="bg-brand-primary text-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-bold">{clinicNameDisplay}</h3>
            <p className="mt-2 text-sm text-brand-secondary/80">
              {settings?.address}
            </p>
          </div>
          <div className="space-y-2 text-sm text-brand-secondary/90">
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-brand-accent" /> {settings?.phone}
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-brand-accent" />{" "}
              {t.home.indoreLocation}
            </p>
          </div>
          <div className="flex md:justify-end items-center gap-3">
            <Link
              href="/patient/book-appointment?type=IN_CLINIC"
              className="rounded-xl bg-brand-accent px-5 py-3 text-xs font-bold text-white"
            >
              {t.home.bookClinicVisit}
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}