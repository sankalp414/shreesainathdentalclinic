import { db } from "@/lib/db";
import {
  appointments,
  patients,
  users,
  treatments,
  appointmentCheckins,
} from "@/db/schema";
import  requireRole  from "@/lib/auth/rbac";
import { eq, desc } from "drizzle-orm";
import { DoctorQueueActions } from "@/components/doctor/DoctorQueueActions";

export default async function DoctorAppointmentsPage() {
  await requireRole(["DOCTOR", "ADMIN"]);

  const rows = await db
    .select({
      appointment: appointments,
      patient: patients,
      patientUser: users,
      treatment: treatments,
      checkin: appointmentCheckins,
    })
    .from(appointments)
    .innerJoin(patients, eq(appointments.patientId, patients.id))
    .innerJoin(users, eq(patients.userId, users.id))
    .leftJoin(treatments, eq(appointments.treatmentId, treatments.id))
    .leftJoin(
      appointmentCheckins,
      eq(appointments.id, appointmentCheckins.appointmentId)
    )
    .orderBy(desc(appointments.appointmentDate), desc(appointments.startTime));

  return (
    <div className="mx-auto max-w-7xl p-6 lg:p-10 space-y-6">
      <h1 className="text-3xl font-bold text-brand-primary">
        All Clinic & Video Appointments
      </h1>
      <div className="rounded-3xl border border-brand-secondary bg-white p-6 shadow-card">
        <DoctorQueueActions appointments={rows} />
      </div>
    </div>
  );
}