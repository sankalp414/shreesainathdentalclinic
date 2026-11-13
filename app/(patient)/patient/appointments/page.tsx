import { db } from "@/lib/db";
import { appointments, patients } from "@/db/schema";
import  requireRole  from "@/lib/auth/rbac";
import { eq, desc } from "drizzle-orm";
import { PatientAppointmentActions } from "@/components/patient/PatientAppointmentActions";
import Link from "next/link";

export default async function PatientAppointmentsPage() {
  const user = await requireRole(["PATIENT"]);
  const [patient] = await db
    .select()
    .from(patients)
    .where(eq(patients.userId, user.id))
    .limit(1);

  const list = patient
    ? await db
        .select()
        .from(appointments)
        .where(eq(appointments.patientId, patient.id))
        .orderBy(desc(appointments.appointmentDate), desc(appointments.startTime))
    : [];

  return (
    <div className="mx-auto max-w-5xl p-6 lg:p-10 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-brand-primary">
            My Appointments
          </h1>
          <p className="text-xs text-brand-text/70">
            Manage physical clinic visits, QR check-in passes, and online video
            consultations.
          </p>
        </div>
        <Link
          href="/patient/book-appointment"
          className="rounded-xl bg-brand-primary px-5 py-2.5 text-xs font-bold text-white"
        >
          + Book New Appointment
        </Link>
      </div>

      <div className="rounded-3xl border border-brand-secondary bg-white p-6 shadow-card">
        <PatientAppointmentActions appointments={list} />
      </div>
    </div>
  );
}