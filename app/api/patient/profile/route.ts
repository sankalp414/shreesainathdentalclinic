import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, patients } from "@/db/schema";
import  requireApiRole  from "@/lib/auth/rbac";
import { eq } from "drizzle-orm";

export async function PATCH(req: Request) {
  try {
    const user = await requireApiRole(["PATIENT"]);
    const body = await req.json();

    await db
      .update(users)
      .set({
        fullName: body.fullName || user.fullName,
        phone: body.phone ?? user.phone,
        updatedAt: new Date(),
      })
      .where(eq(users.id, user.id));

    const [updatedPatient] = await db
      .update(patients)
      .set({
        dateOfBirth: body.dateOfBirth || null,
        gender: body.gender || null,
        bloodGroup: body.bloodGroup || null,
        allergies: body.allergies || null,
        medicalHistory: body.medicalHistory || null,
        emergencyContactName: body.emergencyContactName || null,
        emergencyContactPhone: body.emergencyContactPhone || null,
        address: body.address || null,
        updatedAt: new Date(),
      })
      .where(eq(patients.userId, user.id))
      .returning();

    return NextResponse.json({ patient: updatedPatient });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to update profile" },
      { status: 500 }
    );
  }
}