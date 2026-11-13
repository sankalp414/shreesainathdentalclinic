import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedPatientRoute = createRouteMatcher(["/patient(.*)"]);
const isProtectedDoctorRoute = createRouteMatcher(["/doctor(.*)"]);

// Add Dr. Nitu's actual Clerk login email(s) here:
const ALLOWED_DOCTOR_EMAILS = [
  "dr.ananya@shreesainathdental.com",
  // Add your own testing email here if you want to access Doctor Dashboard with your account
];

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();

  // 1. Require login for Patient Portal & Booking
  if (isProtectedPatientRoute(req) && !userId) {
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("redirect_url", req.url);
    return NextResponse.redirect(signInUrl);
  }

  // 2. Require login for Doctor Dashboard
  if (isProtectedDoctorRoute(req)) {
    if (!userId) {
      const signInUrl = new URL("/sign-in", req.url);
      signInUrl.searchParams.set("redirect_url", req.url);
      return NextResponse.redirect(signInUrl);
    }

    // Optional metadata role check at middleware level
    const metadataRole = (
      (sessionClaims?.metadata as any)?.role ||
      (sessionClaims?.publicMetadata as any)?.role ||
      ""
    ).toUpperCase();

    if (metadataRole === "PATIENT") {
      return NextResponse.redirect(new URL("/patient/dashboard", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};