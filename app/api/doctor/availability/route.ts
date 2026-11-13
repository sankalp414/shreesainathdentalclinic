import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { doctors, doctorAvailability, blockedSlots } from "@/db/schema";
import  requireApiRole  from "@/lib/auth/rbac";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    await requireApiRole(["DOCTOR", "ADMIN"]);
    const body = await req.json();
    const [doctor] = await db.select().from(doctors).limit(1);
    if (!doctor) {
      return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
    }

    if (body.action === "ADD_BLOCK") {
      const [block] = await db
        .insert(blockedSlots)
        .values({
          doctorId: doctor.id,
          blockedDate: body.blockedDate,
          startTime: body.startTime || null,
          endTime: body.endTime || null,
          reason: body.reason || "Doctor Unavailable / Holiday",
        })
        .returning();
      return NextResponse.json({ block });
    }

    if (body.action === "UPDATE_DAY") {
      const [updated] = await db
        .update(doctorAvailability)
        .set({
          startTime: body.startTime,
          endTime: body.endTime,
          breakStartTime: body.breakStartTime || null,
          breakEndTime: body.breakEndTime || null,
          slotDurationMinutes: Number(body.slotDurationMinutes || 30),
          allowInClinic: Boolean(body.allowInClinic),
          allowVideo: Boolean(body.allowVideo),
          isActive: Boolean(body.isActive),
        })
        .where(eq(doctorAvailability.id, body.scheduleId))
        .returning();
      return NextResponse.json({ schedule: updated });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message }, { status: 500 });
  }
}