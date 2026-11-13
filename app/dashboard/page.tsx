import { Suspense } from "react";
import  requireRole  from "@/lib/auth/rbac";
import { db } from "@/lib/db";
import { appointments } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import Link from "next/link";
import { CalendarCheck, Users, Activity, Clock, Shield } from "lucide-react";



export default function DoctorDashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-brand-bg text-sm font-semibold text-brand-primary">
          Loading doctor portal...
        </div>
      }
    >
      <DoctorDashboardContent />
    </Suspense>
  );
}

async function DoctorDashboardContent() {
  const doctor = await requireRole("DOCTOR");

  // Fetch today's appointments for Dr. Nitu Rajpoot
  const todayStr = new Date().toISOString().split("T")[0];
  const todaysAppointments = await db
    .select()
    .from(appointments)
    .where(eq(appointments.appointmentDate, todayStr))
    .orderBy(appointments.startTime);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        {/* DOCTOR HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-3xl bg-white p-8 shadow-card border border-brand-secondary">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-accent">
              Doctor & Clinic Portal
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-brand-primary">
              Dr. Nitu Rajpoot, BDS
            </h1>
            <p className="text-xs sm:text-sm text-brand-text/75">
              Shree Sainath Dental Clinic — Managing live queues, appointments, and digital records.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/doctor/queue"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-primary px-5 py-3 text-xs font-bold text-white shadow-elevated hover:bg-brand-primary/95 transition"
            >
              <Activity className="h-4 w-4 text-brand-accent" /> Live Waiting Queue
            </Link>
          </div>
        </div>

        {/* QUICK STATS */}
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-brand-secondary bg-white p-6 shadow-card space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-text/60">
              Today's Schedule
            </span>
            <p className="text-3xl font-bold text-brand-primary">
              {todaysAppointments.length} Patients
            </p>
          </div>
          <div className="rounded-2xl border border-brand-secondary bg-white p-6 shadow-card space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-text/60">
              Clinic Status
            </span>
            <p className="text-3xl font-bold text-brand-accent">Active</p>
          </div>
          <div className="rounded-2xl border border-brand-secondary bg-white p-6 shadow-card space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-text/60">
              Portal Access
            </span>
            <p className="text-3xl font-bold text-brand-primary">Authorized</p>
          </div>
        </div>

        {/* TODAY'S APPOINTMENTS TABLE / LIST */}
        <div className="rounded-3xl border border-brand-secondary bg-white p-8 shadow-card space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-brand-primary flex items-center gap-2">
              <Clock className="h-5 w-5 text-brand-accent" /> Today's Appointments ({todayStr})
            </h2>
          </div>

          {todaysAppointments.length === 0 ? (
            <div className="py-12 text-center text-xs text-brand-text/70">
              No appointments scheduled for today yet.
            </div>
          ) : (
            <div className="space-y-4">
              {todaysAppointments.map((appt) => (
                <div
                  key={appt.id}
                  className="rounded-2xl border border-brand-secondary bg-brand-warm p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-brand-primary/10 px-2 py-0.5 text-[11px] font-semibold text-brand-primary uppercase">
                        {appt.appointmentType}
                      </span>
                      <span className="text-xs font-bold text-brand-accent">
                        {appt.status}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-brand-primary">
                      {appt.startTime.slice(0, 5)} – {appt.endTime.slice(0, 5)} | Ref: {appt.bookingReference}
                    </p>
                    <p className="text-xs text-brand-text/80">
                      Patient ID: {appt.patientId} {appt.reason ? `— Reason: ${appt.reason}` : ""}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {appt.appointmentType === "VIDEO" && (
                      <Link
                        href={`/doctor/video-consultation/${appt.id}`}
                        className="rounded-xl bg-brand-accent px-4 py-2 text-xs font-bold text-white shadow-card"
                      >
                        Join Video Call
                      </Link>
                    )}
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