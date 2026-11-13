// app/api/messages/[id]/read/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { messages } from "@/db/schema";
import  requireRole  from "@/lib/auth/rbac";
import { eq } from "drizzle-orm";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    await requireRole(["PATIENT", "DOCTOR"]);
    const [updated] = await db
      .update(messages)
      .set({ readAt: new Date() })
      .where(eq(messages.id, id))
      .returning();
    return NextResponse.json({ message: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message }, { status: 500 });
  }
}