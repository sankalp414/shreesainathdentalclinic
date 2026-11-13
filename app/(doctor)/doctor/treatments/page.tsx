import { Suspense } from "react";
import { connection } from "next/server";
import  requireRole  from "@/lib/auth/rbac";
import { db } from "@/lib/db";
import { treatments } from "@/db/schema";
import Link from "next/link";
import { CheckCircle, Clock, DollarSign } from "lucide-react";

export default function DoctorTreatmentsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-brand-bg text-sm font-semibold text-brand-primary">
          Loading treatment catalog...
        </div>
      }
    >
      <DoctorTreatmentsContent />
    </Suspense>
  );
}

async function DoctorTreatmentsContent() {
  await connection();
  const doctor = await requireRole("DOCTOR");

  const treatmentList = await db.select().from(treatments);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl bg-white p-8 shadow-card border border-brand-secondary">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-accent">
              Clinical Catalog & Pricelist
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-brand-primary">
              Treatment Management
            </h1>
            <p className="text-xs sm:text-sm text-brand-text/75 mt-1">
              Shree Sainath Dental Clinic — Configure consultation fees,
              durations, and available procedures.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/doctor/dashboard"
              className="rounded-xl border border-brand-secondary bg-brand-warm px-5 py-2.5 text-xs font-bold text-brand-primary hover:border-brand-primary transition"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>

        {/* TREATMENTS LIST */}
        <div className="rounded-3xl border border-brand-secondary bg-white p-8 shadow-card space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-brand-primary flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-brand-accent" /> Active
              Treatments ({treatmentList.length})
            </h2>
          </div>

          {treatmentList.length === 0 ? (
            <div className="py-16 text-center text-xs text-brand-text/70 space-y-2">
              <p>No treatments found in the database.</p>
              <p className="text-[11px] text-brand-text/50">
                Run your database seeds or migrations to populate clinic
                procedures.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {treatmentList.map((t) => (
                <div
                  key={t.id}
                  className="rounded-2xl border border-brand-secondary bg-brand-warm p-6 space-y-4 flex flex-col justify-between transition hover:border-brand-primary/40 shadow-sm"
                >
                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-brand-primary">
                      {t.name}
                    </h3>
                    <p className="text-xs text-brand-text/75 line-clamp-3">
                      {t.shortDescription ||
                        "No description provided for this dental procedure."}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-brand-secondary flex items-center justify-between text-xs font-bold">
                    <span className="flex items-center gap-1 text-brand-primary">
                      <DollarSign className="h-4 w-4 text-brand-accent" />₹
                      {(t.priceInPaise / 100).toLocaleString("en-IN")}
                    </span>
                    <span className="flex items-center gap-1 text-brand-text/70">
                      <Clock className="h-4 w-4 text-brand-accent" />
                      {t.durationMinutes} mins
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
