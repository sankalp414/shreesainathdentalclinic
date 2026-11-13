// app/admin/settings/page.tsx
import { db } from "@/lib/db";
import { clinicSettings } from "@/db/schema";
import  requireRole  from "@/lib/auth/rbac";
import { ClinicSettingsForm } from "@/components/admin/ClinicSettingsForm";

export default async function AdminSettingsPage() {
  await requireRole(["ADMIN", "DOCTOR"]);
  const [settings] = await db.select().from(clinicSettings).limit(1);

  return (
    <div className="mx-auto max-w-4xl p-6 lg:p-10 space-y-6">
      <h1 className="text-3xl font-bold text-brand-primary">
        Clinic Configuration & Booking Rules
      </h1>
      <ClinicSettingsForm settings={settings} />
    </div>
  );
}