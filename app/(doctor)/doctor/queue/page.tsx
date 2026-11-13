import { Suspense } from "react";
import { connection } from "next/server";
import  requireRole from "@/lib/auth/rbac";
import { db } from "@/lib/db";
import { appointments } from "@/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { Activity, UserCheck } from "lucide-react";

export default function DoctorQueuePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-brand-bg text-sm font-semibold text-brand-primary">
          Loading live waiting queue...
        </div>
      }
    >
      <DoctorQueueContent />
    </Suspense>
  );
}

async function DoctorQueueContent() {
  await connection();
  const doctor = await requireRole("DOCTOR");

  const todayStr = new Date().toISOString().split("T")[0];

  const queueAppointments = await db
    .select()
    .from(appointments)
    .where(eq(appointments.appointmentDate, todayStr))
    .orderBy(appointments.startTime);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl bg-white p-8 shadow-card border border-brand-secondary">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-accent">
              Real-Time Clinic Operations
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-brand-primary">
              Live Waiting Queue Manager
            </h1>
            <p className="text-xs sm:text-sm text-brand-text/75 mt-1">
              Shree Sainath Dental Clinic — Call patients into the operatory and manage visit statuses in real time.
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

        {/* QUEUE LIST */}
        <div className="rounded-3xl border border-brand-secondary bg-white p-8 shadow-card space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-brand-primary flex items-center gap-2">
              <Activity className="h-5 w-5 text-brand-accent animate-pulse" /> Today's Queue ({queueAppointments.length} Patients)
            </h2>
          </div>

          {queueAppointments.length === 0 ? (
            <div className="py-16 text-center text-xs text-brand-text/70 space-y-2">
              <p>No patients in the queue for today.</p>
              <p className="text-[11px] text-brand-text/50">Patients who check in at reception or online will appear here instantly.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {queueAppointments.map((appt, idx) => (
                <div
                  key={appt.id}
                  className="rounded-2xl border border-brand-secondary bg-brand-warm p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-brand-primary px-2.5 py-0.5 text-[11px] font-bold text-white">
                        Queue #{idx + 1}
                      </span>
                      <span className="rounded-md bg-brand-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-brand-primary uppercase">
                        {appt.appointmentType}
                      </span>
                      <span className="rounded-md bg-white px-2.5 py-0.5 text-[11px] font-bold text-brand-accent border border-brand-secondary">
                        {appt.status}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-brand-primary pt-1">
                      Time Slot: {appt.startTime.slice(0, 5)} – {appt.endTime.slice(0, 5)} | Ref: {appt.bookingReference}
                    </p>
                    <p className="text-xs text-brand-text/75">
                      {appt.reason ? `Reason: ${appt.reason}` : "General Dental Examination"}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-xl border border-brand-secondary bg-white px-4 py-2 text-xs font-bold text-brand-primary">
                      <UserCheck className="h-4 w-4 text-brand-accent" /> Patient ID: {appt.patientId.slice(0, 8)}...
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