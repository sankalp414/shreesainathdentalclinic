import { Suspense } from "react";
import { connection } from "next/server";
import  requireRole  from "@/lib/auth/rbac";
import { db } from "@/lib/db";
import { appointments } from "@/db/schema";
import Link from "next/link";
import { BarChart3, DollarSign, Users, Video, Building2 } from "lucide-react";

export default function DoctorAnalyticsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-brand-bg text-sm font-semibold text-brand-primary">
          Loading revenue analytics...
        </div>
      }
    >
      <DoctorAnalyticsContent />
    </Suspense>
  );
}

async function DoctorAnalyticsContent() {
  await connection();
  const doctor = await requireRole("DOCTOR");

  const allAppointments = await db.select().from(appointments);

  const totalAppointments = allAppointments.length;
  const paidAppointments = allAppointments.filter(a => a.paymentStatus === "PAID");
  
  const totalRevenuePaise = paidAppointments.reduce((acc, curr) => acc + curr.feePaise, 0);
  const videoCount = allAppointments.filter(a => a.appointmentType === "VIDEO").length;
  const inClinicCount = allAppointments.filter(a => a.appointmentType === "IN_CLINIC").length;

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl bg-white p-8 shadow-card border border-brand-secondary">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-accent">
              Financial Intelligence & Reports
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-brand-primary">
              Revenue Analytics
            </h1>
            <p className="text-xs sm:text-sm text-brand-text/75 mt-1">
              Shree Sainath Dental Clinic — Monitor clinic earnings, consultation types, and payment statuses.
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

        {/* METRICS GRID */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-brand-secondary bg-white p-6 shadow-card space-y-2">
            <div className="flex items-center justify-between text-brand-text/60">
              <span className="text-xs font-bold uppercase tracking-wider">Total Revenue</span>
              <DollarSign className="h-5 w-5 text-brand-accent" />
            </div>
            <p className="text-3xl font-bold text-brand-primary">
              ₹{(totalRevenuePaise / 100).toLocaleString("en-IN")}
            </p>
            <p className="text-[11px] text-brand-text/75">From verified paid bookings</p>
          </div>

          <div className="rounded-2xl border border-brand-secondary bg-white p-6 shadow-card space-y-2">
            <div className="flex items-center justify-between text-brand-text/60">
              <span className="text-xs font-bold uppercase tracking-wider">Total Bookings</span>
              <Users className="h-5 w-5 text-brand-accent" />
            </div>
            <p className="text-3xl font-bold text-brand-primary">{totalAppointments}</p>
            <p className="text-[11px] text-brand-text/75">Lifetime scheduled visits</p>
          </div>

          <div className="rounded-2xl border border-brand-secondary bg-white p-6 shadow-card space-y-2">
            <div className="flex items-center justify-between text-brand-text/60">
              <span className="text-xs font-bold uppercase tracking-wider">In-Clinic Visits</span>
              <Building2 className="h-5 w-5 text-brand-accent" />
            </div>
            <p className="text-3xl font-bold text-brand-primary">{inClinicCount}</p>
            <p className="text-[11px] text-brand-text/75">Physical clinic appointments</p>
          </div>

          <div className="rounded-2xl border border-brand-secondary bg-white p-6 shadow-card space-y-2">
            <div className="flex items-center justify-between text-brand-text/60">
              <span className="text-xs font-bold uppercase tracking-wider">Video Consultations</span>
              <Video className="h-5 w-5 text-brand-accent" />
            </div>
            <p className="text-3xl font-bold text-brand-primary">{videoCount}</p>
            <p className="text-[11px] text-brand-text/75">Online video appointments</p>
          </div>
        </div>

        {/* DETAILED LEDGER SECTION */}
        <div className="rounded-3xl border border-brand-secondary bg-white p-8 shadow-card space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-brand-primary flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-brand-accent" /> Recent Paid Transactions ({paidAppointments.length})
            </h2>
          </div>

          {paidAppointments.length === 0 ? (
            <div className="py-16 text-center text-xs text-brand-text/70 space-y-2">
              <p>No paid transactions recorded yet.</p>
              <p className="text-[11px] text-brand-text/50">Transactions processed via Razorpay will appear here automatically.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {paidAppointments.map((appt) => (
                <div
                  key={appt.id}
                  className="rounded-2xl border border-brand-secondary bg-brand-warm p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-brand-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-brand-primary uppercase">
                        {appt.appointmentType}
                      </span>
                      <span className="rounded-md bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800">
                        {appt.paymentStatus}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-brand-primary pt-1">
                      Date: {appt.appointmentDate} | Ref: {appt.bookingReference}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-base font-bold text-brand-primary">
                      ₹{(appt.feePaise / 100).toLocaleString("en-IN")}
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