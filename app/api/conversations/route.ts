import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  conversations,
  conversationParticipants,
  patients,
  doctors,
  users,
} from "@/db/schema";
import  requireApiRole  from "@/lib/auth/rbac";
import { and, desc, eq } from "drizzle-orm";

export async function GET() {
  try {
    const user = await requireApiRole(["PATIENT", "DOCTOR", "ADMIN"]);

    if (user.role === "PATIENT") {
      const [patient] = await db
        .select()
        .from(patients)
        .where(eq(patients.userId, user.id))
        .limit(1);
      if (!patient) return NextResponse.json({ conversations: [] });

      const rows = await db
        .select({
          conversation: conversations,
          doctor: doctors,
          doctorUser: users,
        })
        .from(conversations)
        .innerJoin(doctors, eq(conversations.doctorId, doctors.id))
        .innerJoin(users, eq(doctors.userId, users.id))
        .where(eq(conversations.patientId, patient.id))
        .orderBy(desc(conversations.lastMessageAt));

      return NextResponse.json({ conversations: rows });
    }

    const rows = await db
      .select({
        conversation: conversations,
        patient: patients,
        patientUser: users,
      })
      .from(conversations)
      .innerJoin(patients, eq(conversations.patientId, patients.id))
      .innerJoin(users, eq(patients.userId, users.id))
      .orderBy(desc(conversations.lastMessageAt));

    return NextResponse.json({ conversations: rows });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await requireApiRole(["PATIENT", "DOCTOR"]);
    const body = await req.json().catch(() => ({}));

    const [doctor] = await db.select().from(doctors).limit(1);
    let targetPatientId = body.patientId;

    if (user.role === "PATIENT") {
      const [patient] = await db
        .select()
        .from(patients)
        .where(eq(patients.userId, user.id))
        .limit(1);
      targetPatientId = patient?.id;
    }

    if (!targetPatientId || !doctor) {
      return NextResponse.json({ error: "Missing participant" }, { status: 400 });
    }

    const [existing] = await db
      .select()
      .from(conversations)
      .where(
        and(
          eq(conversations.patientId, targetPatientId),
          eq(conversations.doctorId, doctor.id)
        )
      )
      .limit(1);

    if (existing) {
      return NextResponse.json({ conversation: existing });
    }

    const [patientRecord] = await db
      .select()
      .from(patients)
      .where(eq(patients.id, targetPatientId))
      .limit(1);

    const created = await db.transaction(async (tx) => {
      const [conv] = await tx
        .insert(conversations)
        .values({
          patientId: targetPatientId,
          doctorId: doctor.id,
          appointmentId: body.appointmentId || null,
        })
        .returning();

      await tx.insert(conversationParticipants).values([
        { conversationId: conv.id, userId: patientRecord.userId },
        { conversationId: conv.id, userId: doctor.userId },
      ]);

      return conv;
    });

    return NextResponse.json({ conversation: created }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message }, { status: 500 });
  }
}