// app/api/notifications/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { notifications } from "@/db/schema";
import  requireApiRole  from "@/lib/auth/rbac";
import { desc, eq } from "drizzle-orm";

export async function GET() {
  try {
    const user = await requireApiRole(["PATIENT", "DOCTOR", "ADMIN"]);
    const list = await db
      .select()
      .from(notifications)
      .where(eq(notifications.userId, user.id))
      .orderBy(desc(notifications.createdAt))
      .limit(50);
    return NextResponse.json({ notifications: list });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function PATCH(req: Request) {
  try {
    const user = await requireApiRole(["PATIENT", "DOCTOR", "ADMIN"]);
    await db
      .update(notifications)
      .set({ isRead: true })
      .where(eq(notifications.userId, user.id));
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}