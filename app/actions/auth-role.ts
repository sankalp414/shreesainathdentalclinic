"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import * as schema from "@/db/schema";
import { eq } from "drizzle-orm";

const { users } = schema;

const CONFIGURED_DOCTOR_EMAILS = [
  process.env.NEXT_PUBLIC_DOCTOR_EMAIL?.toLowerCase().trim(),
  process.env.DOCTOR_EMAIL?.toLowerCase().trim(),
  "dr.ananya@shreesainathdental.com",
].filter(Boolean) as string[];

export async function getCurrentUserRole(): Promise<{
  isSignedIn: boolean;
  role: "DOCTOR" | "PATIENT" | "GUEST";
  email: string;
}> {
  try {
    const { userId } = await auth();
    const clerkUser = await currentUser();

    if (!userId || !clerkUser) {
      return { isSignedIn: false, role: "GUEST", email: "" };
    }

    const email =
      clerkUser.emailAddresses?.[0]?.emailAddress?.toLowerCase().trim() || "";
    const metadataRole = (
      (clerkUser.publicMetadata?.role as string) || ""
    ).toUpperCase();

    const isWhitelistedDoctor = CONFIGURED_DOCTOR_EMAILS.includes(email);

    // 1. Check Neon DB user record
    let [dbUser] = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, userId))
      .limit(1);

    if (!dbUser && email) {
      [dbUser] = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);
    }

    const resolvedRole: "DOCTOR" | "PATIENT" =
      metadataRole === "DOCTOR" ||
      metadataRole === "ADMIN" ||
      dbUser?.role === "DOCTOR" ||
      dbUser?.role === "ADMIN" ||
      isWhitelistedDoctor
        ? "DOCTOR"
        : "PATIENT";

    // Auto-sync user into Neon DB if missing or if whitelisted doctor email needs DOCTOR role
    if (!dbUser && email) {
      await db.insert(users).values({
        clerkId: userId,
        email,
        fullName:
          `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim() ||
          (resolvedRole === "DOCTOR" ? "Dr. Nitu Rajpoot, BDS" : "Patient"),
        role: resolvedRole,
      } as any);
    } else if (dbUser && resolvedRole === "DOCTOR" && dbUser.role !== "DOCTOR") {
      await db
        .update(users)
        .set({ role: "DOCTOR" } as any)
        .where(eq(users.id, dbUser.id));
    }

    return {
      isSignedIn: true,
      role: resolvedRole,
      email,
    };
  } catch (err) {
    console.error("Role check error:", err);
    return { isSignedIn: false, role: "GUEST", email: "" };
  }
}