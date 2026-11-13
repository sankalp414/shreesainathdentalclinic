import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/db/schema";
import  requireApiRole  from "@/lib/auth/rbac";
import { eq } from "drizzle-orm";

export async function PATCH(req: Request) {
  try {
    await requireApiRole(["ADMIN"]);
    const { userId, role, isActive } = await req.json();

    const [updated] = await db
      .update(users)
      .set({
        role,
        isActive: isActive !== undefined ? Boolean(isActive) : true,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning();

    return NextResponse.json({ user: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message }, { status: 500 });
  }
}