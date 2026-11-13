// app/(doctor)/doctor/availability/page.tsx
import { db } from "@/lib/db";
import { doctorAvailability, blockedSlots } from "@/db/schema";
import  requireRole  from "@/lib/auth/rbac";
import { asc, desc } from "drizzle-orm";
import { AvailabilityManager } from "@/components/doctor/AvailabilityManager";
import { getServerLanguage } from "@/lib/server-language";

export default async function DoctorAvailabilityPage() {
  await requireRole(["DOCTOR", "ADMIN"]);
  const { tr } = await getServerLanguage();
  const schedules = await db
    .select()
    .from(doctorAvailability)
    .orderBy(asc(doctorAvailability.dayOfWeek));
  const blocks = await db
    .select()
    .from(blockedSlots)
    .orderBy(desc(blockedSlots.blockedDate));

  return (
    <div className="mx-auto max-w-5xl p-6 lg:p-10 space-y-6">
      <h1 className="text-3xl font-bold text-brand-primary">
        {tr(
          "Configure Clinic Working Hours & Holidays",
          "क्लिनिक कार्य समय और अवकाश कॉन्फ़िगर करें"
        )}
      </h1>
      <AvailabilityManager schedules={schedules} blocks={blocks} />
    </div>
  );
}