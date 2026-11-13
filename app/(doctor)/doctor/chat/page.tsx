// app/(patient)/patient/chat/page.tsx
import  requireRole  from "@/lib/auth/rbac";
import { RealtimeChatPanel } from "@/components/chat/RealtimeChatPanel";

export default async function PatientChatPage() {
  const user = await requireRole(["PATIENT", "DOCTOR"]);
  return (
    <div className="mx-auto max-w-4xl p-6 lg:p-10 space-y-6">
      <h1 className="text-2xl font-bold text-brand-primary">
        Direct Patient–Doctor Communication
      </h1>
      <RealtimeChatPanel currentUserId={user.id} />
    </div>
  );
}