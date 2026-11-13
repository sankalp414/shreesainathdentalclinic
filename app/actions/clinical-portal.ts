"use server";

import { db } from "@/lib/db";
import * as schema from "@/db/schema";
import { eq, asc, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { ensureDatabaseSchema } from "@/lib/ensure-db-schema";

export type ToothCondition =
  | "HEALTHY"
  | "CARIES"
  | "RCT"
  | "CROWN"
  | "FILLING"
  | "MISSING";

export interface ToothRecord {
  status: ToothCondition;
  notes?: string;
  updatedAt?: string;
}

export async function updatePatientOdontogram(data: {
  patientId: string | number;
  odontogramData: Record<string, ToothRecord>;
  medicalHistory?: string;
}) {
  try {
    await ensureDatabaseSchema();

    const cleanPatientId = String(data?.patientId || "").trim();
    if (!cleanPatientId) {
      return { success: false, error: "Invalid Patient ID" };
    }

    const jsonPayload = JSON.stringify(data?.odontogramData || {});
    const medHistory =
      typeof data?.medicalHistory === "string" ? data.medicalHistory : null;

    await db.execute(sql`
      UPDATE patients
      SET
        odontogram_data = ${jsonPayload}::jsonb,
        medical_history = COALESCE(${medHistory}, medical_history),
        updated_at = NOW()
      WHERE id::text = ${cleanPatientId}
    `);

    revalidatePath("/");
    revalidatePath("/patient/dashboard");
    revalidatePath("/doctor/dashboard");

    return {
      success: true,
      savedOdontogram: data.odontogramData,
    };
  } catch (err: any) {
    console.error("Odontogram DB update error:", err);
    return {
      success: false,
      error: String(err?.message || "Failed to save odontogram"),
    };
  }
}

export async function getPatientOdontogramById(patientId: string | number) {
  try {
    await ensureDatabaseSchema();

    const cleanPatientId = String(patientId || "").trim();
    if (!cleanPatientId) {
      return { odontogramData: {}, medicalHistory: "" };
    }

    const res: any = await db.execute(sql`
      SELECT odontogram_data, medical_history
      FROM patients
      WHERE id::text = ${cleanPatientId}
      LIMIT 1
    `);

    const row = Array.isArray(res) ? res[0] : res?.rows?.[0];
    if (!row) {
      return { odontogramData: {}, medicalHistory: "" };
    }

    const parsedOdontogram =
      typeof row.odontogram_data === "string"
        ? JSON.parse(row.odontogram_data)
        : row.odontogram_data || {};

    return {
      odontogramData: parsedOdontogram,
      medicalHistory: String(row.medical_history || ""),
    };
  } catch (err) {
    console.error("Error fetching patient odontogram:", err);
    return { odontogramData: {}, medicalHistory: "" };
  }
}

export async function updateAppointmentClinicalStatus(data: {
  appointmentId: string | number;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  prescriptionNotes?: string;
}) {
  try {
    await ensureDatabaseSchema();
    const cleanAptId = String(data?.appointmentId || "").trim();
    const notes =
      typeof data?.prescriptionNotes === "string"
        ? data.prescriptionNotes
        : null;

    await db.execute(sql`
      UPDATE appointments
      SET
        status = ${data.status},
        prescription_notes = COALESCE(${notes}, prescription_notes),
        updated_at = NOW()
      WHERE id::text = ${cleanAptId}
    `);

    revalidatePath("/patient/dashboard");
    revalidatePath("/doctor/dashboard");
    return { success: true };
  } catch (err: any) {
    console.error("Status update error:", err);
    return {
      success: false,
      error: String(err?.message || "Status update failed"),
    };
  }
}

export async function getPatientChatMessages(patientId: string | number) {
  try {
    await ensureDatabaseSchema();
    const { chatMessages } = schema;
    const cleanId = String(patientId || "").trim();
    if (!cleanId) return [];

    const msgs = await db
      .select()
      .from(chatMessages)
      .where(eq(chatMessages.patientId, cleanId))
      .orderBy(asc(chatMessages.createdAt));

    return msgs.map((m: any) => ({
      id: Number(m.id),
      patientId: String(m.patientId),
      senderRole: (m.senderRole === "DOCTOR" ? "DOCTOR" : "PATIENT") as
        | "PATIENT"
        | "DOCTOR",
      senderName: String(m.senderName || ""),
      message: String(m.message || ""),
      createdAt:
        m.createdAt instanceof Date
          ? m.createdAt.toISOString()
          : String(m.createdAt || ""),
    }));
  } catch {
    return [];
  }
}

export async function sendClinicalChatMessage(data: {
  patientId: string | number;
  senderRole: "PATIENT" | "DOCTOR";
  senderName: string;
  message: string;
}) {
  try {
    await ensureDatabaseSchema();
    const { chatMessages } = schema;
    const cleanId = String(data?.patientId || "").trim();
    const cleanMsg = String(data?.message || "").trim();

    if (!cleanMsg || !cleanId) {
      return { success: false };
    }

    await db.insert(chatMessages).values({
      patientId: cleanId,
      senderRole: data.senderRole,
      senderName: data.senderName,
      message: cleanMsg,
      isRead: false,
    } as any);

    revalidatePath("/patient/dashboard");
    revalidatePath("/doctor/dashboard");
    return { success: true };
  } catch (err: any) {
    console.error("Chat send error:", err);
    return {
      success: false,
      error: String(err?.message || "Failed to send message"),
    };
  }
}