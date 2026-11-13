import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export type UserRole = "PATIENT" | "DOCTOR" | "ADMIN";

// Define authorized doctor emails
const DOCTOR_EMAILS = [
  "sankalpshrm1111@gmail.com", // <-- Update or add test emails here if needed
];

/**
 * Validates the currently authenticated user's role against allowed roles.
 * Automatically provisions new users in Neon DB and enforces role assignments.
 */
export default async function requireRole(allowedRoles: UserRole | UserRole[]) {
  const { userId: clerkId } = await auth();
  
  // If not logged in at all, redirect to sign-in
  if (!clerkId) {
    redirect("/sign-in");
  }

  // Fetch live user metadata from Clerk
  const clerkUser = await currentUser();
  const userEmail = clerkUser?.emailAddresses?.[0]?.emailAddress?.toLowerCase().trim() ?? "";
  const fullName = `${clerkUser?.firstName ?? ""} ${clerkUser?.lastName ?? ""}`.trim() || "Valued Patient";

  const isDoctorEmail = DOCTOR_EMAILS.includes(userEmail);

  // 1. Check if user exists in Neon PostgreSQL database
  let [dbUser] = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, clerkId))
    .limit(1);

  // 2. If user does not exist in DB yet, create them with the appropriate role
  if (!dbUser) {
    const assignedRole: UserRole = isDoctorEmail ? "DOCTOR" : "PATIENT";

    [dbUser] = await db
      .insert(users)
      .values({
        clerkId,
        email: userEmail,
        fullName: fullName,
        role: assignedRole,
      })
      .returning();
  } 
  // 3. If user exists in DB but logs in with a verified doctor email, force-promote them to DOCTOR
  else if (isDoctorEmail && dbUser.role !== "DOCTOR") {
    await db
      .update(users)
      .set({ role: "DOCTOR" })
      .where(eq(users.clerkId, clerkId));
    
    dbUser.role = "DOCTOR";
  }

  // 4. Validate if the user's role matches the permitted roles for this page/route
  const rolesArray = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
  
  if (!rolesArray.includes(dbUser.role as UserRole)) {
    // Smart cross-redirection if a user attempts to access an unauthorized portal
    if (dbUser.role === "DOCTOR") {
      redirect("/doctor/dashboard");
    } else {
      redirect("/patient/dashboard");
    }
  }

  return dbUser;
}