import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, patients } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing CLERK_WEBHOOK_SECRET" }, { status: 500 });
  }

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json({ error: "Missing svix headers" }, { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
  }

  if (evt.type === "user.created" || evt.type === "user.updated") {
    const { id, email_addresses, first_name, last_name, phone_numbers, image_url } =
      evt.data;
    const email = email_addresses[0]?.email_address ?? `${id}@shreesainath.local`;
    const fullName = [first_name, last_name].filter(Boolean).join(" ") || "Patient";
    const phone = phone_numbers?.[0]?.phone_number ?? null;

    const [upsertedUser] = await db
      .insert(users)
      .values({
        clerkId: id,
        email,
        fullName,
        phone,
        avatarUrl: image_url,
        role: "PATIENT",
      })
      .onConflictDoUpdate({
        target: users.clerkId,
        set: { email, fullName, phone, avatarUrl: image_url, updatedAt: new Date() },
      })
      .returning();

    const [existingPatient] = await db
      .select()
      .from(patients)
      .where(eq(patients.userId, upsertedUser.id))
      .limit(1);

    if (!existingPatient && upsertedUser.role === "PATIENT") {
      await db.insert(patients).values({
        userId: upsertedUser.id,
        patientCode: `SSD-${Math.floor(100000 + Math.random() * 900000)}`,
      });
    }
  }

  return NextResponse.json({ received: true });
}