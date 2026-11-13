// app/api/treatments/[id]/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { treatments } from "@/db/schema";
import  requireApiRole  from "@/lib/auth/rbac";
import { eq } from "drizzle-orm";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    await requireApiRole(["ADMIN", "DOCTOR"]);
    const body = await req.json();

    const [updated] = await db
      .update(treatments)
      .set({
        name: body.name,
        pricePaise:
          body.priceInr !== undefined ? Number(body.priceInr) * 100 : undefined,
        durationMinutes:
          body.durationMinutes !== undefined
            ? Number(body.durationMinutes)
            : undefined,
        isActive: body.isActive,
        updatedAt: new Date(),
      })
      .where(eq(treatments.id, id))
      .returning();

    return NextResponse.json({ treatment: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    await requireApiRole(["ADMIN"]);
    await db
      .update(treatments)
      .set({ isActive: false, updatedAt: new Date() })
      .where(eq(treatments.id, id));
    return NextResponse.json({ deactivated: true });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message }, { status: 500 });
  }
}