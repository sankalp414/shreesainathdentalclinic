// app/api/video/end/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { appointments, consultations } from "@/db/schema";
import  requireApiRole  from "@/lib/auth/rbac";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    await requireApiRole(["DOCTOR"]);
    const { appointmentId } = await req.json();

    const endedAt = new Date();
    await db
      .update(consultations)
      .set({ endedAt })
      .where(eq(consultations.appointmentId, appointmentId));

    const [updated] = await db
      .update(appointments)
      .set({ status: "COMPLETED", updatedAt: endedAt })
      .where(eq(appointments.id, appointmentId))
      .returning();

    return NextResponse.json({ appointment: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message }, { status: 500 });
  }
}