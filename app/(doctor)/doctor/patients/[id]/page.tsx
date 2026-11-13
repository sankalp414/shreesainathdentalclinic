import { Suspense } from "react";
import  requireRole  from "@/lib/auth/rbac";
import { db } from "@/lib/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import OdontogramClient from "@/components/OdontogramClient";

interface PatientDetailPageProps {
  params: Promise<{ id: string }>;
}

async function PatientDetailContent({ params }: PatientDetailPageProps) {
  await requireRole("DOCTOR");
  const { id } = await params;

  const [patient] = await db
    .select()
    .from(users)
    .where(eq(users.id, id))
    .limit(1);

  if (!patient) {
    notFound();
  }

  return <OdontogramClient patient={patient} />;
}

export default function PatientDetailPage({ params }: PatientDetailPageProps) {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <Suspense fallback={<div className="text-sm font-medium text-slate-500">Loading patient record...</div>}>
        <PatientDetailContent params={params} />
      </Suspense>
    </div>
  );
}