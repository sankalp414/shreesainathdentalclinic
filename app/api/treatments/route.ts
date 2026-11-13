// app/api/treatments/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { treatments } from "@/db/schema";
import  requireRole  from "@/lib/auth/rbac";
import { eq, asc } from "drizzle-orm";

export async function GET() {
  const list = await db
    .select()
    .from(treatments)
    .where(eq(treatments.isActive, true))
    .orderBy(asc(treatments.name));
  return NextResponse.json({ treatments: list });
}

export async function POST(req: Request) {
  try {
    await requireRole(["PATIENT", "DOCTOR", "ADMIN"]);
    const body = await req.json();

    const slug = (body.slug || body.name)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const [created] = await db
      .insert(treatments)
     .values({
        slug,
        name: body.name,
        category: body.category || "General Dentistry",
        shortDescription: body.shortDescription,
        fullDescription: body.fullDescription || body.shortDescription,
        benefits: body.benefits || ["Pain-free microscopic precision"],
        procedureSteps: body.procedureSteps || ["Initial diagnosis", "Clinical procedure"],
        durationMinutes: Number(body.durationMinutes || 30),
        priceInPaise: Number(body.priceInr || 500) * 100,
        isActive: true,
      })
      .returning();

    return NextResponse.json({ treatment: created }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Could not create treatment" },
      { status: 500 }
    );
  }
}