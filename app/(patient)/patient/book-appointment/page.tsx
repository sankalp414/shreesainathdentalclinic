import { Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import BookAppointmentClient from "@/components/patient/BookAppointmentClient";
import PatientBookingClient from "@/components/PatientBookingClient";

export default function BookAppointmentPage() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-text">
     

      <Suspense
        fallback={
          <div className="mx-auto max-w-3xl py-20 text-center text-sm font-semibold text-brand-primary">
            Loading booking schedule...
          </div>
        }
      >
      <PatientBookingClient/>
      </Suspense>
    </div>
  );
}