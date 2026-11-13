import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { users, patients } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, email, password, fullName } = body;

    const cleanEmail = String(email || "").toLowerCase().trim();
    if (!cleanEmail || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const client = await clerkClient();

    if (action === "SIGN_UP") {
      const nameParts = String(fullName || "Patient").trim().split(/\s+/);
      const firstName = nameParts[0] || "Patient";
      const lastName = nameParts.slice(1).join(" ") || "";

      // Check if user already exists in Clerk
      const existingList = await client.users.getUserList({
        emailAddress: [cleanEmail],
      });

      let clerkUser = existingList.data?.[0];

      if (!clerkUser) {
        try {
          clerkUser = await client.users.createUser({
            emailAddress: [cleanEmail],
            password,
            firstName,
            lastName,
            skipPasswordChecks: true,
          });
        } catch (createErr: any) {
          const msg =
            createErr?.errors?.[0]?.longMessage ||
            createErr?.errors?.[0]?.message ||
            createErr?.message ||
            "Could not create user in Clerk.";
          return NextResponse.json({ error: msg }, { status: 400 });
        }
      }

      // Ensure user & patient profile exist in Neon DB
      let [dbUser] = await db
        .select()
        .from(users)
        .where(eq(users.email, cleanEmail))
        .limit(1);

      if (!dbUser) {
        const [created] = await db
          .insert(users)
          .values({
            clerkId: clerkUser.id,
            email: cleanEmail,
            fullName: `${firstName} ${lastName}`.trim(),
            role: "PATIENT",
          } as any)
          .returning();
        dbUser = created;
      }

      if (dbUser) {
        const [existingPat] = await db
          .select()
          .from(patients)
          .where(eq(patients.userId, dbUser.id))
          .limit(1);

        if (!existingPat) {
          await db.insert(patients).values({
            userId: dbUser.id,
            patientCode: `PAT-${Math.floor(100000 + Math.random() * 900000)}`,
            telemedicineConsent: true,
            odontogramData: {},
          } as any);
        }
      }

      // Create a sign-in token so the frontend can activate the Clerk session in 1 click
      const signInToken = await client.signInTokens.createSignInToken({
        userId: clerkUser.id,
        expiresInSeconds: 300,
      });

      return NextResponse.json({
        success: true,
        ticket: signInToken.token,
        userId: clerkUser.id,
      });
    }

    if (action === "SIGN_IN") {
      const existingList = await client.users.getUserList({
        emailAddress: [cleanEmail],
      });

      const clerkUser = existingList.data?.[0];
      if (!clerkUser) {
        return NextResponse.json(
          { error: "No account found with this email. Please click Register." },
          { status: 404 }
        );
      }

      try {
        await client.users.verifyPassword({
          userId: clerkUser.id,
          password,
        });
      } catch {
        return NextResponse.json(
          { error: "Incorrect password. Please try again." },
          { status: 401 }
        );
      }

      const signInToken = await client.signInTokens.createSignInToken({
        userId: clerkUser.id,
        expiresInSeconds: 300,
      });

      return NextResponse.json({
        success: true,
        ticket: signInToken.token,
        userId: clerkUser.id,
      });
    }

    return NextResponse.json({ error: "Invalid action." }, { status: 400 });
  } catch (err: any) {
    console.error("Custom Auth API Error:", err);
    return NextResponse.json(
      {
        error:
          err?.errors?.[0]?.longMessage ||
          err?.message ||
          "Authentication error.",
      },
      { status: 500 }
    );
  }
}