"use client";

import { useRouter } from "next/navigation";
import CustomClerkAuthModal from "@/components/CustomClerkAuthModal";

export default function SignInPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <CustomClerkAuthModal
        isOpen={true}
        onClose={() => router.push("/")}
        initialMode="SIGN_IN"
      />
    </div>
  );
}