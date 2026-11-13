import { db } from "@/lib/db";
import {
  users,
  patients,
  appointments,
  payments,
  treatments,
  clinicSettings,
} from "@/db/schema";
import  requireRole  from "@/lib/auth/rbac";
import { eq, sql, desc } from "drizzle-orm";

export default async function AdminDashboardPage() {
  await requireRole(["ADMIN", "DOCTOR"]);

  const allPatients = await db.select().from(patients);
  const allAppointments = await db.select().from(appointments);
  const allPayments = await db
    .select()
    .from(payments)
    .orderBy(desc(payments.createdAt));
  const allTreatments = await db.select().from(treatments);
  const [settings] = await db.select().from(clinicSettings).limit(1);

  const paidRevenuePaise = allPayments
    .filter((p) => p.paymentStatus === "PAID")
    .reduce((acc, p) => acc + p.amount, 0);

  return (
    <div className="min-h-screen bg-brand-warm p-6 lg:p-10 space-y-8">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-brand-accent">
          Shree Sainath Administration
        </span>
        <h1 className="text-3xl font-bold text-brand-primary">
          Clinic Analytics, Revenue & Settings
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {[
          { label: "Registered Patients", value: allPatients.length },
          { label: "Total Appointments", value: allAppointments.length },
          {
            label: "Physical Visits",
            value: allAppointments.filter(
              (a) => a.appointmentType === "IN_CLINIC"
            ).length,
          },
          {
            label: "Video Consultations",
            value: allAppointments.filter((a) => a.appointmentType === "VIDEO")
              .length,
          },
          {
            label: "Verified Revenue",
            value: `₹${(paidRevenuePaise / 100).toLocaleString("en-IN")}`,
          },
        ].map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-brand-secondary bg-white p-5 shadow-card"
          >
            <span className="text-xs text-brand-text/65">{card.label}</span>
            <p className="mt-1 text-2xl font-bold text-brand-primary">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* ACTIVE TREATMENTS & PRICING */}
      <div className="rounded-3xl border border-brand-secondary bg-white p-6 shadow-card space-y-4">
        <h2 className="text-lg font-bold text-brand-primary">
          Configured Clinic Treatments ({allTreatments.length})
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {allTreatments.map((t) => (
            <div
              key={t.id}
              className="flex items-center justify-between rounded-2xl bg-brand-warm p-4 text-xs"
            >
              <div>
                <p className="font-bold text-brand-primary">{t.name}</p>
                <p className="text-brand-text/70">
                  {t.category} • {t.durationMinutes} mins
                </p>
              </div>
              <span className="text-sm font-bold text-brand-primary">
                ₹{(t.pricePaise / 100).toLocaleString("en-IN")}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* PAYMENT TRANSACTIONS LEDGER */}
      <div className="rounded-3xl border border-brand-secondary bg-white p-6 shadow-card space-y-4">
        <h2 className="text-lg font-bold text-brand-primary">
          Payment Transactions & Reconciliation Ledger
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-brand-secondary text-brand-primary">
                <th className="py-2.5 px-3">Receipt / Order ID</th>
                <th className="py-2.5 px-3">Provider</th>
                <th className="py-2.5 px-3">Amount</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-secondary">
              {allPayments.map((p) => (
                <tr key={p.id}>
                  <td className="py-2.5 px-3 font-semibold">
                    {p.receiptNumber || p.providerOrderId || p.id.slice(0, 8)}
                  </td>
                  <td className="py-2.5 px-3">{p.provider}</td>
                  <td className="py-2.5 px-3 font-bold">
                    ₹{(p.amount / 100).toFixed(2)}
                  </td>
                  <td className="py-2.5 px-3">{p.paymentStatus}</td>
                  <td className="py-2.5 px-3">
                    {new Date(p.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CLINIC SETTINGS SNAPSHOT */}
      <div className="rounded-3xl border border-brand-secondary bg-white p-6 shadow-card text-xs space-y-2">
        <h2 className="text-lg font-bold text-brand-primary">
          Active Clinic Policy Configuration
        </h2>
        <p>
          <strong>Clinic Name:</strong> {settings?.clinicName}
        </p>
        <p>
          <strong>Working Hours:</strong> {settings?.workingHoursText}
        </p>
        <p>
          <strong>Video Consultation Fee:</strong> ₹
          {((settings?.videoConsultationFeePaise ?? 70000) / 100).toFixed(0)}
        </p>
        <p>
          <strong>Cancellation Policy:</strong> {settings?.cancellationPolicyText}
        </p>
      </div>
    </div>
  );
}