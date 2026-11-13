import { db } from "@/lib/db";
import { payments, appointments, patients } from "@/db/schema";
import  requireRole  from "@/lib/auth/rbac";
import { eq, desc } from "drizzle-orm";

export default async function PatientPaymentsPage() {
  const user = await requireRole(["PATIENT"]);
  const [patient] = await db
    .select()
    .from(patients)
    .where(eq(patients.userId, user.id))
    .limit(1);

  const rows = patient
    ? await db
        .select({
          payment: payments,
          appointment: appointments,
        })
        .from(payments)
        .innerJoin(appointments, eq(payments.appointmentId, appointments.id))
        .where(eq(payments.patientId, patient.id))
        .orderBy(desc(payments.createdAt))
    : [];

  return (
    <div className="mx-auto max-w-5xl p-6 lg:p-10 space-y-6">
      <h1 className="text-3xl font-bold text-brand-primary">
        Payment History & Receipts
      </h1>

      <div className="rounded-3xl border border-brand-secondary bg-white p-6 shadow-card overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-brand-secondary text-brand-primary uppercase">
              <th className="py-3 px-3">Receipt #</th>
              <th className="py-3 px-3">Booking Ref</th>
              <th className="py-3 px-3">Type</th>
              <th className="py-3 px-3">Amount</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-secondary">
            {rows.map(({ payment, appointment }) => (
              <tr key={payment.id}>
                <td className="py-3 px-3 font-bold text-brand-primary">
                  {payment.receiptNumber || payment.providerOrderId || "—"}
                </td>
                <td className="py-3 px-3">{appointment.bookingReference}</td>
                <td className="py-3 px-3">{appointment.appointmentType}</td>
                <td className="py-3 px-3 font-bold">
                  ₹{(payment.amount / 100).toFixed(2)}
                </td>
                <td className="py-3 px-3">
                  <span className="rounded-full bg-brand-secondary px-2.5 py-0.5 font-bold text-brand-primary">
                    {payment.paymentStatus}
                  </span>
                </td>
                <td className="py-3 px-3">
                  {new Date(payment.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}