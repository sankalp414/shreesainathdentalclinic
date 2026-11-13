import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { clinicSettings } from "@/db/schema";
import  requireApiRole  from "@/lib/auth/rbac";
import { eq } from "drizzle-orm";

export async function PATCH(req: Request) {
  try {
    await requireApiRole(["ADMIN", "DOCTOR"]);
    const body = await req.json();
    const [existing] = await db.select().from(clinicSettings).limit(1);

    if (!existing) {
      const [created] = await db.insert(clinicSettings).values(body).returning();
      return NextResponse.json({ settings: created });
    }

    const [updated] = await db
      .update(clinicSettings)
      .set({
        clinicName: body.clinicName ?? existing.clinicName,
        phone: body.phone ?? existing.phone,
        whatsappNumber: body.whatsappNumber ?? existing.whatsappNumber,
        email: body.email ?? existing.email,
        address: body.address ?? existing.address,
        workingHoursText: body.workingHoursText ?? existing.workingHoursText,
        autoConfirmInClinic:
          body.autoConfirmInClinic !== undefined
            ? Boolean(body.autoConfirmInClinic)
            : existing.autoConfirmInClinic,
        allowSelfCheckIn:
          body.allowSelfCheckIn !== undefined
            ? Boolean(body.allowSelfCheckIn)
            : existing.allowSelfCheckIn,
        videoConsultationFeePaise:
          body.videoConsultationFeeInr !== undefined
            ? Number(body.videoConsultationFeeInr) * 100
            : existing.videoConsultationFeePaise,
        cancellationPolicyText:
          body.cancellationPolicyText ?? existing.cancellationPolicyText,
        updatedAt: new Date(),
      })
      .where(eq(clinicSettings.id, existing.id))
      .returning();

    return NextResponse.json({ settings: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message }, { status: 500 });
  }
}