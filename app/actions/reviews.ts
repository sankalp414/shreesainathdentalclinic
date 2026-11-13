"use server";

import { db } from "@/lib/db";
import * as schema from "@/db/schema";
import { eq, desc, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { ensureDatabaseSchema } from "@/lib/ensure-db-schema";

const { reviews } = schema;

export async function submitCompletedAppointmentReview(data: {
  appointmentId: string | number;
  patientId: string | number;
  patientName: string;
  treatmentType?: string;
  rating: number;
  comment: string;
}) {
  try {
    await ensureDatabaseSchema();
    if (!data.comment?.trim()) {
      return { success: false, error: "Please write a brief comment." };
    }

    await db.insert(reviews).values({
      appointmentId: String(data.appointmentId),
      patientId: String(data.patientId),
      patientName: String(data.patientName || "Patient"),
      treatmentType: String(data.treatmentType || "Dental Consultation"),
      rating: Math.min(5, Math.max(1, Number(data.rating) || 5)),
      comment: data.comment.trim(),
      isApproved: false,
    } as any);

    const cleanAptId = String(data.appointmentId || "").trim();
    if (cleanAptId) {
      await db.execute(sql`
        UPDATE appointments
        SET has_reviewed = TRUE, updated_at = NOW()
        WHERE id::text = ${cleanAptId}
      `);
    }

    revalidatePath("/patient/dashboard");
    revalidatePath("/doctor/dashboard");
    revalidatePath("/");
    return { success: true };
  } catch (err: any) {
    console.error("Failed to submit review:", err);
    return {
      success: false,
      error: String(err?.message || "Could not submit review"),
    };
  }
}

export async function setReviewApprovalByDoctor(
  reviewId: number,
  approve: boolean
) {
  try {
    await ensureDatabaseSchema();
    await db
      .update(reviews)
      .set({ isApproved: Boolean(approve) } as any)
      .where(eq(reviews.id, Number(reviewId)));

    revalidatePath("/doctor/dashboard");
    revalidatePath("/");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: String(err?.message || "Error") };
  }
}

export async function deleteReviewByDoctor(reviewId: number) {
  try {
    await ensureDatabaseSchema();
    await db.delete(reviews).where(eq(reviews.id, Number(reviewId)));
    revalidatePath("/doctor/dashboard");
    revalidatePath("/");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: String(err?.message || "Error") };
  }
}

export async function getAllReviewsForDoctor() {
  try {
    await ensureDatabaseSchema();
    const rows = await db
      .select()
      .from(reviews)
      .orderBy(desc(reviews.createdAt));

    return rows.map((r: any) => ({
      id: Number(r.id),
      appointmentId: String(r.appointmentId || ""),
      patientId: String(r.patientId || ""),
      patientName: String(r.patientName || "Patient"),
      treatmentType: String(r.treatmentType || "Dental Consultation"),
      rating: Number(r.rating || 5),
      comment: String(r.comment || ""),
      isApproved: Boolean(r.isApproved),
      createdAt:
        r.createdAt instanceof Date
          ? r.createdAt.toISOString()
          : String(r.createdAt || ""),
    }));
  } catch {
    return [];
  }
}

export async function getApprovedPublicReviews() {
  try {
    await ensureDatabaseSchema();
    const rows = await db
      .select()
      .from(reviews)
      .where(eq(reviews.isApproved, true))
      .orderBy(desc(reviews.createdAt));

    return rows.map((r: any) => ({
      id: Number(r.id),
      patientName: String(r.patientName || "Patient"),
      treatmentType: String(r.treatmentType || "Dental Consultation"),
      rating: Number(r.rating || 5),
      comment: String(r.comment || ""),
      isApproved: true,
    }));
  } catch {
    return [];
  }
}