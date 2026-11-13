"use client";

import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

export default function SSOCallbackPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-3">
      <div className="w-10 h-10 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
      <p className="text-xs font-extrabold text-slate-700">
        Completing Google Sign-In for Shree Sainath Dental Clinic...
      </p>
      <AuthenticateWithRedirectCallback
        signInForceRedirectUrl="/patient/dashboard"
        signUpForceRedirectUrl="/patient/dashboard"
      />
    </div>
  );
}