import { Suspense } from "react";
import  requireRole  from "@/lib/auth/rbac";
import PatientBookingClient from "@/components/PatientBookingClient";

async function BookingAuthCheck() {
  await requireRole("PATIENT");
  return <PatientBookingClient />;
}

export default function PatientBookingPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-8 pt-32">
      <Suspense fallback={<div className="text-sm font-medium text-slate-500 py-12 text-center">Loading booking portal...</div>}>
        <BookingAuthCheck />
      </Suspense>
    </div>
  );
}