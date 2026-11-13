import { Suspense } from "react";
import { connection } from "next/server";
import  requireRole  from "@/lib/auth/rbac";
import { db } from "@/lib/db";
import { users } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import Link from "next/link";
import { FileText, Search, User } from "lucide-react";

export default function DoctorPatientsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-brand-bg text-sm font-semibold text-brand-primary">
          Loading patient health records...
        </div>
      }
    >
      <DoctorPatientsContent />
    </Suspense>
  );
}

async function DoctorPatientsContent() {
  await connection();
  const doctor = await requireRole("DOCTOR");

  // Fetch all registered patients
  const patientList = await db
    .select()
    .from(users)
    .where(eq(users.role, "PATIENT"));

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between rounded-3xl bg-white p-8 shadow-card border border-brand-secondary">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-accent">
              Electronic Health Records (EHR)
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-brand-primary">
              Patient Directory & Odontograms
            </h1>
            <p className="text-xs sm:text-sm text-brand-text/75 mt-1">
              Shree Sainath Dental Clinic — View patient histories, previous treatments, and interactive dental charts.
            </p>
          </div>
          <Link
            href="/doctor/dashboard"
            className="rounded-xl border border-brand-secondary bg-brand-warm px-5 py-2.5 text-xs font-bold text-brand-primary hover:border-brand-primary transition"
          >
            ← Back to Dashboard
          </Link>
        </div>

        <div className="rounded-3xl border border-brand-secondary bg-white p-8 shadow-card space-y-6">
          <h2 className="text-lg font-bold text-brand-primary flex items-center gap-2">
            <FileText className="h-5 w-5 text-brand-accent" /> Registered Patients ({patientList.length})
          </h2>

          {patientList.length === 0 ? (
            <div className="py-12 text-center text-xs text-brand-text/70">
              No patients registered in the database yet.
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {patientList.map((pat) => (
                <div
                  key={pat.id}
                  className="rounded-2xl border border-brand-secondary bg-brand-warm p-5 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-brand-primary font-bold">
                      <User className="h-4 w-4 text-brand-accent" />
                      <span>{pat.fullName || "Unnamed Patient"}</span>
                    </div>
                    <p className="text-xs text-brand-text/70">{pat.email}</p>
                    <p className="text-[11px] text-brand-text/60">Phone: {pat.phone || "Not provided"}</p>
                  </div>

                  <Link
                    href={`/doctor/patients/${pat.id}`}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-brand-primary px-4 py-2 text-xs font-bold text-white shadow-card hover:bg-brand-primary/95 transition"
                  >
                    View EHR & Odontogram →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}