import { Suspense } from "react";
import  requireRole  from "@/lib/auth/rbac";
import PatientBookingClient from "@/components/PatientBookingClient";
import { getServerLanguage } from "@/lib/server-language";

async function BookingAuthCheck() {
  await requireRole("PATIENT");
  return <PatientBookingClient />;
}

export default async function PatientBookingPage() {
  const { tr } = await getServerLanguage();

  return (
    <div className="min-h-screen bg-slate-50 p-8 pt-32">
      <Suspense fallback={<div className="text-sm font-medium text-slate-500 py-12 text-center">{tr("Loading booking portal...", "बुकिंग पोर्टल लोड हो रहा है...")}</div>}>
        <BookingAuthCheck />
      </Suspense>
    </div>
  );
}