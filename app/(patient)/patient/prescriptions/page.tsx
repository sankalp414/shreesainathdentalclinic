import { db } from "@/lib/db";
import {
  consultations,
  prescriptions,
  prescriptionItems,
  patients,
} from "@/db/schema";
import  requireRole  from "@/lib/auth/rbac";
import { eq, desc } from "drizzle-orm";

export default async function PatientPrescriptionsPage() {
  const user = await requireRole(["PATIENT"]);
  const [patient] = await db
    .select()
    .from(patients)
    .where(eq(patients.userId, user.id))
    .limit(1);

  const records = patient
    ? await db
        .select()
        .from(consultations)
        .where(eq(consultations.patientId, patient.id))
        .orderBy(desc(consultations.createdAt))
    : [];

  const allPrescriptions = patient
    ? await db
        .select()
        .from(prescriptions)
        .where(eq(prescriptions.patientId, patient.id))
    : [];

  const allItems = await db.select().from(prescriptionItems);

  return (
    <div className="mx-auto max-w-5xl p-6 lg:p-10 space-y-6">
      <h1 className="text-3xl font-bold text-brand-primary">
        Consultation Summaries & Digital Prescriptions
      </h1>

      {records.map((cons) => {
        const presc = allPrescriptions.find(
          (p) => p.consultationId === cons.id
        );
        const items = presc
          ? allItems.filter((i) => i.prescriptionId === presc.id)
          : [];

        return (
          <div
            key={cons.id}
            className="rounded-3xl border border-brand-secondary bg-white p-6 shadow-card space-y-4"
          >
            <div className="flex justify-between border-b border-brand-secondary pb-3">
              <div>
                <span className="text-xs font-bold text-brand-accent">
                  {cons.consultationType} CONSULTATION
                </span>
                <h2 className="text-lg font-bold text-brand-primary">
                  Diagnosis: {cons.diagnosis || "General Assessment"}
                </h2>
              </div>
              <span className="text-xs text-brand-text/60">
                {new Date(cons.startedAt).toLocaleDateString()}
              </span>
            </div>

            <p className="text-sm text-brand-text/85">
              <strong>Doctor Summary:</strong> {cons.summary}
            </p>

            {items.length > 0 && (
              <div className="rounded-2xl bg-brand-warm p-4 space-y-2">
                <h3 className="text-xs font-bold uppercase text-brand-primary">
                  Prescribed Medications (Rx)
                </h3>
                {items.map((med) => (
                  <div
                    key={med.id}
                    className="flex justify-between text-xs border-b border-brand-primary/10 py-1.5"
                  >
                    <span className="font-bold text-brand-primary">
                      {med.medicineName} ({med.dosage})
                    </span>
                    <span>
                      {med.frequency} — {med.durationDays} Days
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}