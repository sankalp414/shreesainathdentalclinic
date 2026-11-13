// app/(patient)/patient/profile/page.tsx
import { db } from "@/lib/db";
import { patients } from "@/db/schema";
import  requireRole  from "@/lib/auth/rbac";
import { eq } from "drizzle-orm";
import  ProfileForm  from "@/components/patient/profileForm";

export default async function PatientProfilePage() {
  const user = await requireRole(["PATIENT"]);
  const [patient] = await db
    .select()
    .from(patients)
    .where(eq(patients.userId, user.id))
    .limit(1);

  return (
    <div className="mx-auto max-w-3xl p-6 lg:p-10 space-y-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-brand-accent">
          Patient ID: {patient?.patientCode}
        </span>
        <h1 className="text-3xl font-bold text-brand-primary">
          Personal & Medical Profile
        </h1>
      </div>
      <ProfileForm user={user} patient={patient} />
    </div>
  );
}