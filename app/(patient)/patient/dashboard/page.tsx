// import { Suspense } from "react";
// import { connection } from "next/server";
// import { redirect } from "next/navigation";
// import Link from "next/link";
// import { auth, currentUser } from "@clerk/nextjs/server";
// import { db } from "@/lib/db";
// import * as schema from "@/db/schema";
// import { eq, desc } from "drizzle-orm";
// import { ensureDatabaseSchema } from "@/lib/ensure-db-schema";
// import { getCurrentUserRole } from "@/app/actions/auth-role";
// import {
//   InteractiveOdontogram,
//   ClinicalChatBox,
// } from "@/components/ClinicalOdontogramAndChat";
// import { PatientCompletedAppointmentReviewPrompt } from "@/components/ReviewModerationComponents";

// const { users, patients, appointments } = schema;

// function isVideoConsultation(apt: any): boolean {
//   const typeStr = String(
//     apt?.appointmentType || apt?.appointment_type || ""
//   ).toUpperCase();
//   const reasonStr = String(apt?.reason || "").toUpperCase();
//   return (
//     typeStr.includes("VIDEO") ||
//     typeStr.includes("ONLINE") ||
//     reasonStr.includes("VIDEO CONSULTATION") ||
//     reasonStr.includes("ONLINE VIDEO") ||
//     Boolean(apt?.meetLink || apt?.meet_link)
//   );
// }

// function getMeetUrl(apt: any): string {
//   if (apt?.meetLink && String(apt.meetLink).startsWith("http")) {
//     return apt.meetLink;
//   }
//   const cleanCode = String(apt?.bookingReference || "ssdmeetroom")
//     .toLowerCase()
//     .replace(/[^a-z0-9]/g, "")
//     .padEnd(10, "x");
//   return `https://meet.google.com/${cleanCode.slice(0, 3)}-${cleanCode.slice(
//     3,
//     7
//   )}-${cleanCode.slice(7, 10)}`;
// }

// function formatAppointmentDate(rawDate: any): string {
//   if (!rawDate) return "Scheduled Visit";
//   const d = new Date(rawDate);
//   if (isNaN(d.getTime())) return String(rawDate);
//   return d.toLocaleDateString("en-IN", {
//     weekday: "short",
//     day: "numeric",
//     month: "short",
//     year: "numeric",
//   });
// }

// async function PatientDashboardContent() {
//   await connection();
//   await ensureDatabaseSchema();

//   const { isSignedIn, role } = await getCurrentUserRole();

//   if (!isSignedIn) {
//     redirect("/sign-in");
//   }

//   if (role === "DOCTOR") {
//     redirect("/doctor/dashboard");
//   }

//   const { userId } = await auth();
//   const clerkUser = await currentUser();
//   const email =
//     clerkUser?.emailAddresses?.[0]?.emailAddress?.toLowerCase().trim() || "";
//   const fullName =
//     `${clerkUser?.firstName ?? ""} ${clerkUser?.lastName ?? ""}`.trim() ||
//     "Valued Patient";

//   let [dbUser] = await db
//     .select()
//     .from(users)
//     .where(eq(users.clerkId, userId!))
//     .limit(1);

//   if (!dbUser && email) {
//     [dbUser] = await db
//       .select()
//       .from(users)
//       .where(eq(users.email, email))
//       .limit(1);
//   }

//   if (!dbUser) {
//     const [created] = await db
//       .insert(users)
//       .values({
//         clerkId: userId!,
//         email: email || `${userId}@patient.shreesainathdental.com`,
//         fullName,
//         role: "PATIENT",
//       } as any)
//       .returning();
//     dbUser = created;
//   }

//   let [patientProfile] = await db
//     .select()
//     .from(patients)
//     .where(eq(patients.userId, dbUser.id))
//     .limit(1);

//   if (!patientProfile) {
//     const [createdProfile] = await db
//       .insert(patients)
//       .values({
//         userId: dbUser.id,
//         patientCode: `PAT-${Math.floor(100000 + Math.random() * 900000)}`,
//         telemedicineConsent: true,
//         odontogramData: {},
//       } as any)
//       .returning();
//     patientProfile = createdProfile;
//   }

//   const allAppointments = await db
//     .select()
//     .from(appointments)
//     .where(eq(appointments.patientId, patientProfile.id))
//     .orderBy(desc(appointments.createdAt));

//   const upcomingAppointments = allAppointments.filter(
//     (apt: any) => apt.status !== "COMPLETED" && apt.status !== "CANCELLED"
//   );

//   const pastAppointments = allAppointments.filter(
//     (apt: any) => apt.status === "COMPLETED" || apt.status === "CANCELLED"
//   );

//   const completedAppointments = allAppointments.filter(
//     (apt: any) => apt.status === "COMPLETED"
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50/70 via-slate-50/50 to-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 py-30 space-y-9">
//         {/* Elevated Blue Gradient Patient Welcome Header */}
//         <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-10">
//           <div className="space-y-2">
//             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-[11px] font-extrabold uppercase tracking-wider">
//               <span>🦷 Shree Sainath Dental Clinic</span>
//               <span>•</span>
//               <span>Patient ID: {patientProfile.patientCode}</span>
//             </div>
//             <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
//               Welcome back, {fullName}
//             </h1>
//             <p className="text-xs sm:text-sm text-blue-100 max-w-2xl">
//               Inspect your interactive 32-Tooth Digital Odontogram, join Google Meet video consultations, view prescriptions, and chat directly with Dr. Nitu Rajpoot.
//             </p>
//           </div>

//           <div className="flex flex-wrap items-center gap-3 shrink-0">
//             <Link
//               href="/patient/book"
//               className="px-6 py-3.5 rounded-2xl bg-white hover:bg-blue-50 text-blue-700 text-xs sm:text-sm font-extrabold shadow-md transition"
//             >
//               + Book New Consultation
//             </Link>
//           </div>
//         </div>

//         {/* Automatic Post-Visit Review Prompt */}
//         <PatientCompletedAppointmentReviewPrompt
//           completedAppointments={completedAppointments}
//           patientId={patientProfile.id}
//           patientName={fullName}
//         />

//         {/* Upcoming & Completed Visits Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* Active / Upcoming Appointments */}
//           <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-blue-100 shadow-sm space-y-5">
//             <div className="flex items-center justify-between border-b border-slate-100 pb-4">
//               <div>
//                 <span className="text-[11px] font-extrabold text-blue-600 uppercase tracking-wider">
//                   Scheduled Visits
//                 </span>
//                 <h2 className="text-lg font-extrabold text-slate-900">
//                   Upcoming Appointments ({upcomingAppointments.length})
//                 </h2>
//               </div>
//               <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-extrabold">
//                 Active Queue
//               </span>
//             </div>

//             {upcomingAppointments.length === 0 ? (
//               <div className="p-8 rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-center space-y-3">
//                 <p className="text-xs font-bold text-slate-600">
//                   You have no upcoming appointments scheduled right now.
//                 </p>
//                 <Link
//                   href="/patient/book"
//                   className="inline-block px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-extrabold hover:bg-blue-700 transition"
//                 >
//                   Schedule In-Clinic or Video Visit →
//                 </Link>
//               </div>
//             ) : (
//               <div className="space-y-3.5">
//                 {upcomingAppointments.map((apt: any) => {
//                   const isVid = isVideoConsultation(apt);
//                   const meetLink = isVid ? getMeetUrl(apt) : null;

//                   return (
//                     <div
//                       key={String(apt.id)}
//                       className={`p-5 rounded-2xl border space-y-3 ${
//                         isVid
//                           ? "bg-indigo-50/40 border-indigo-200"
//                           : "bg-blue-50/40 border-blue-100"
//                       }`}
//                     >
//                       <div className="flex items-start justify-between gap-3">
//                         <div className="space-y-1">
//                           <div className="flex flex-wrap items-center gap-2">
//                             <span className="text-[11px] font-extrabold text-blue-700">
//                               Ref: {apt.bookingReference}
//                             </span>
//                             <span
//                               className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
//                                 isVid
//                                   ? "bg-indigo-600 text-white"
//                                   : "bg-blue-600 text-white"
//                               }`}
//                             >
//                               {isVid
//                                 ? "🎥 Online Video Consultation"
//                                 : "🏥 In-Clinic Visit"}
//                             </span>
//                           </div>

//                           <h3 className="text-sm font-extrabold text-slate-900 pt-1">
//                             {formatAppointmentDate(
//                               apt.appointmentDate || apt.createdAt
//                             )}{" "}
//                             at{" "}
//                             <span className="text-blue-600">
//                               {apt.startTime}
//                             </span>
//                           </h3>

//                           {apt.reason && (
//                             <p className="text-xs text-slate-600">
//                               Consultation Reason:{" "}
//                               <strong>{apt.reason}</strong>
//                             </p>
//                           )}
//                         </div>

//                         <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold">
//                           {apt.status}
//                         </span>
//                       </div>

//                       {isVid && meetLink && (
//                         <div className="pt-3 border-t border-indigo-200/60 flex flex-wrap items-center justify-between gap-2">
//                           <a
//                             href={meetLink}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold shadow-xs transition"
//                           >
//                             🎥 Join Google Meet Video Consultation →
//                           </a>
//                           <span className="text-[11px] font-bold text-indigo-700">
//                             ✓ Meet Room Active
//                           </span>
//                         </div>
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>

//           {/* Completed Visits & Prescriptions */}
//           <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-blue-100 shadow-sm space-y-5">
//             <div className="flex items-center justify-between border-b border-slate-100 pb-4">
//               <div>
//                 <span className="text-[11px] font-extrabold text-emerald-600 uppercase tracking-wider">
//                   Clinical History &amp; Rx
//                 </span>
//                 <h2 className="text-lg font-extrabold text-slate-900">
//                   Completed Visits &amp; Prescriptions ({pastAppointments.length})
//                 </h2>
//               </div>
//               <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-extrabold">
//                 Records
//               </span>
//             </div>

//             {pastAppointments.length === 0 ? (
//               <div className="p-8 rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-center">
//                 <p className="text-xs text-slate-500">
//                   Completed treatments and Dr. Nitu&apos;s digital prescriptions will appear here.
//                 </p>
//               </div>
//             ) : (
//               <div className="space-y-3.5 max-h-96 overflow-y-auto pr-1">
//                 {pastAppointments.map((apt: any) => {
//                   const isVid = isVideoConsultation(apt);
//                   return (
//                     <div
//                       key={String(apt.id)}
//                       className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-2.5"
//                     >
//                       <div className="flex flex-wrap items-center justify-between gap-2">
//                         <div className="flex items-center gap-2">
//                           <span className="text-xs font-extrabold text-blue-600">
//                             {apt.bookingReference}
//                           </span>
//                           <span
//                             className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
//                               isVid
//                                 ? "bg-indigo-100 text-indigo-800"
//                                 : "bg-blue-100 text-blue-800"
//                             }`}
//                           >
//                             {isVid
//                               ? "🎥 Video Consultation"
//                               : "🏥 In-Clinic Visit"}
//                           </span>
//                         </div>

//                         <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">
//                           {apt.status}
//                         </span>
//                       </div>

//                       <div className="text-xs font-bold text-slate-800">
//                         {formatAppointmentDate(
//                           apt.appointmentDate || apt.createdAt
//                         )}{" "}
//                         at {apt.startTime} —{" "}
//                         <span className="text-slate-600">
//                           {apt.reason || "Dental Consultation"}
//                         </span>
//                       </div>

//                       {apt.prescriptionNotes ? (
//                         <div className="p-3.5 rounded-xl bg-white border border-blue-200 text-xs text-slate-700 shadow-2xs">
//                           <span className="font-extrabold text-blue-600 block mb-1">
//                             💊 Dr. Nitu&apos;s Prescription &amp; Post-Op Notes:
//                           </span>
//                           {apt.prescriptionNotes}
//                         </div>
//                       ) : (
//                         <p className="text-[11px] text-slate-400 italic">
//                           No additional prescription notes attached.
//                         </p>
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* 32-Tooth Digital Odontogram */}
//         <InteractiveOdontogram
//           patientId={patientProfile.id}
//           initialOdontogram={(patientProfile.odontogramData as any) || {}}
//           initialMedicalHistory={patientProfile.medicalHistory || ""}
//           editable={false}
//         />

//         {/* Direct Clinical Chat */}
//         <ClinicalChatBox
//           patientId={patientProfile.id}
//           currentUserRole="PATIENT"
//           currentUserName={fullName}
//           title="Direct Clinical Chat with Dr. Nitu Rajpoot, BDS"
//         />
//       </div>
//     </div>
//   );
// }

// export default function PatientDashboardPage() {
//   return (
//     <Suspense
//       fallback={
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
//           <div className="h-36 rounded-3xl bg-blue-600 animate-pulse" />
//           <div className="h-80 rounded-3xl bg-white border border-slate-200 animate-pulse" />
//         </div>
//       }
//     >
//       <PatientDashboardContent />
//     </Suspense>
//   );
// }



import { Suspense } from "react";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import * as schema from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { ensureDatabaseSchema } from "@/lib/ensure-db-schema";
import { getCurrentUserRole } from "@/app/actions/auth-role";
import {
  InteractiveOdontogram,
  ClinicalChatBox,
} from "@/components/ClinicalOdontogramAndChat";
import { PatientCompletedAppointmentReviewPrompt } from "@/components/ReviewModerationComponents";

const { users, patients, appointments } = schema;

function isVideoConsultation(apt: any): boolean {
  const typeStr = String(
    apt?.appointmentType || apt?.appointment_type || ""
  ).toUpperCase();
  const reasonStr = String(apt?.reason || "").toUpperCase();
  return (
    typeStr.includes("VIDEO") ||
    typeStr.includes("ONLINE") ||
    reasonStr.includes("VIDEO CONSULTATION") ||
    reasonStr.includes("ONLINE VIDEO") ||
    Boolean(apt?.meetLink || apt?.meet_link)
  );
}

function getMeetUrl(apt: any): string {
  if (apt?.meetLink && String(apt.meetLink).startsWith("http")) {
    return apt.meetLink;
  }
  const cleanCode = String(apt?.bookingReference || "ssdmeetroom")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .padEnd(10, "x");
  return `https://meet.google.com/${cleanCode.slice(0, 3)}-${cleanCode.slice(
    3,
    7
  )}-${cleanCode.slice(7, 10)}`;
}

function formatAppointmentDate(rawDate: any): string {
  if (!rawDate) return "Scheduled Visit";
  const d = new Date(rawDate);
  if (isNaN(d.getTime())) return String(rawDate);
  return d.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

async function PatientDashboardContent() {
  await connection();
  await ensureDatabaseSchema();

  const { isSignedIn, role } = await getCurrentUserRole();

  if (!isSignedIn) {
    redirect("/sign-in");
  }

  if (role === "DOCTOR") {
    redirect("/doctor/dashboard");
  }

  const { userId } = await auth();
  const clerkUser = await currentUser();
  const email =
    clerkUser?.emailAddresses?.[0]?.emailAddress?.toLowerCase().trim() || "";
  const fullName =
    `${clerkUser?.firstName ?? ""} ${clerkUser?.lastName ?? ""}`.trim() ||
    "Valued Patient";

  let [dbUser] = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, userId!))
    .limit(1);

  if (!dbUser && email) {
    [dbUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
  }

  if (!dbUser) {
    const [created] = await db
      .insert(users)
      .values({
        clerkId: userId!,
        email: email || `${userId}@patient.shreesainathdental.com`,
        fullName,
        role: "PATIENT",
      } as any)
      .returning();
    dbUser = created;
  }

  let [patientProfile] = await db
    .select()
    .from(patients)
    .where(eq(patients.userId, dbUser.id))
    .limit(1);

  if (!patientProfile) {
    const [createdProfile] = await db
      .insert(patients)
      .values({
        userId: dbUser.id,
        patientCode: `PAT-${Math.floor(100000 + Math.random() * 900000)}`,
        telemedicineConsent: true,
        odontogramData: {},
      } as any)
      .returning();
    patientProfile = createdProfile;
  }

  const allAppointments = await db
    .select()
    .from(appointments)
    .where(eq(appointments.patientId, patientProfile.id))
    .orderBy(desc(appointments.createdAt));

  const upcomingAppointments = allAppointments.filter(
    (apt: any) => apt.status !== "COMPLETED" && apt.status !== "CANCELLED"
  );

  const pastAppointments = allAppointments.filter(
    (apt: any) => apt.status === "COMPLETED" || apt.status === "CANCELLED"
  );

  const completedAppointments = allAppointments.filter(
    (apt: any) => apt.status === "COMPLETED"
  );

  const videoAppointmentsCount = upcomingAppointments.filter((apt: any) =>
    isVideoConsultation(apt)
  ).length;
  const inClinicAppointmentsCount =
    upcomingAppointments.length - videoAppointmentsCount;

  return (
    <div className="min-h-screen bg-[#F4F7FC] text-slate-800 p-4 sm:p-6 lg:p-8 font-sans antialiased ">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Style tag to power instant zero-latency tabs without client component overhead */}
        <style>{`
          .tab-radio { display: none; }
          #tab-overview:checked ~ .tabs-nav #label-overview {
            background-color: #2563EB;
            color: #ffffff;
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
          }
          #tab-odontogram:checked ~ .tabs-nav #label-odontogram {
            background-color: #2563EB;
            color: #ffffff;
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
          }
          #tab-chat:checked ~ .tabs-nav #label-chat {
            background-color: #2563EB;
            color: #ffffff;
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
          }
          #tab-records:checked ~ .tabs-nav #label-records {
            background-color: #2563EB;
            color: #ffffff;
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
          }

          #tab-overview:checked ~ #panel-overview { display: block; }
          #tab-odontogram:checked ~ #panel-odontogram { display: block; }
          #tab-chat:checked ~ #panel-chat { display: block; }
          #tab-records:checked ~ #panel-records { display: block; }
        `}</style>

        {/* Top 4 Medical Metric Stat Cards (Matching MediCare reference UI) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 pt-26">
          {/* Card 1: Total Appointments (Pink/Coral) */}
          <div className="bg-[#FFF0F2] border border-rose-100 rounded-3xl p-5 flex items-center gap-4 transition-transform hover:-translate-y-0.5 duration-200">
            <div className="w-13 h-13 rounded-2xl bg-[#FF4F70] text-white flex items-center justify-center shrink-0 shadow-sm">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500">Total Visits</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
                {allAppointments.length < 10 ? `0${allAppointments.length}` : allAppointments.length}
              </h3>
              <p className="text-[11px] font-medium text-slate-400">Recorded history</p>
            </div>
          </div>

          {/* Card 2: Upcoming Appointments (Soft Blue) */}
          <div className="bg-[#EEF4FF] border border-blue-100 rounded-3xl p-5 flex items-center gap-4 transition-transform hover:-translate-y-0.5 duration-200">
            <div className="w-13 h-13 rounded-2xl bg-[#3B82F6] text-white flex items-center justify-center shrink-0 shadow-sm">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500">Appointments</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
                {upcomingAppointments.length < 10 ? `0${upcomingAppointments.length}` : upcomingAppointments.length}
              </h3>
              <p className="text-[11px] font-medium text-slate-400">Active &amp; scheduled</p>
            </div>
          </div>

          {/* Card 3: Completed Treatments (Mint Green) */}
          <div className="bg-[#EAFBF3] border border-emerald-100 rounded-3xl p-5 flex items-center gap-4 transition-transform hover:-translate-y-0.5 duration-200">
            <div className="w-13 h-13 rounded-2xl bg-[#10B981] text-white flex items-center justify-center shrink-0 shadow-sm">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500">Completed Visits</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
                {completedAppointments.length < 10 ? `0${completedAppointments.length}` : completedAppointments.length}
              </h3>
              <p className="text-[11px] font-medium text-slate-400">Treatment finished</p>
            </div>
          </div>

          {/* Card 4: Patient Info / Code (Orange / Amber) */}
          <div className="bg-[#FFF6ED] border border-orange-100 rounded-3xl p-5 flex items-center gap-4 transition-transform hover:-translate-y-0.5 duration-200">
            <div className="w-13 h-13 rounded-2xl bg-[#F97316] text-white flex items-center justify-center shrink-0 shadow-sm">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-slate-500">Patient Code</p>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-800 tracking-tight truncate">
                {patientProfile.patientCode}
              </h3>
              <p className="text-[11px] font-medium text-slate-400 truncate">{fullName}</p>
            </div>
          </div>
        </div>

        {/* Automatic Post-Visit Review Prompt */}
        <PatientCompletedAppointmentReviewPrompt
          completedAppointments={completedAppointments}
          patientId={patientProfile.id}
          patientName={fullName}
        />

        {/* Clean Dashboard Header & Navigation Tabs */}
        <div>
          <input
            type="radio"
            name="patient_dash_tab"
            id="tab-overview"
            className="tab-radio"
            defaultChecked
          />
          <input
            type="radio"
            name="patient_dash_tab"
            id="tab-odontogram"
            className="tab-radio"
          />
          <input
            type="radio"
            name="patient_dash_tab"
            id="tab-chat"
            className="tab-radio"
          />
          <input
            type="radio"
            name="patient_dash_tab"
            id="tab-records"
            className="tab-radio"
          />

          {/* Tab Selection Bar */}
          <div className="tabs-nav flex flex-wrap items-center justify-between gap-4 mb-6 bg-white p-2 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <label
                htmlFor="tab-overview"
                id="label-overview"
                className="cursor-pointer px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 transition-all flex items-center gap-2 select-none"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Appointments</span>
              </label>

              <label
                htmlFor="tab-odontogram"
                id="label-odontogram"
                className="cursor-pointer px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 transition-all flex items-center gap-2 select-none"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>32-Tooth Odontogram</span>
              </label>

              <label
                htmlFor="tab-chat"
                id="label-chat"
                className="cursor-pointer px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 transition-all flex items-center gap-2 select-none"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>Doctor Chat</span>
              </label>

              <label
                htmlFor="tab-records"
                id="label-records"
                className="cursor-pointer px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 transition-all flex items-center gap-2 select-none"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                <span>Prescriptions &amp; History ({pastAppointments.length})</span>
              </label>
            </div>

            <Link
              href="/patient/book"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition"
            >
              <span>+ Book Consultation</span>
            </Link>
          </div>

          {/* TAB 1: OVERVIEW & APPOINTMENTS (Matching image structure) */}
          <div id="panel-overview" className="hidden space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left 2 Cols: Today's Appointments & Cards List */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Main Card */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-6">
                  
                  {/* Card Title & Metrics Progress Bars (from reference image) */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-extrabold text-slate-800">
                          Active Consultations
                        </h2>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Overview of upcoming clinic visits and online video meetings
                        </p>
                      </div>
                      <Link
                        href="/patient/book"
                        className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1"
                      >
                        <span>Schedule new</span>
                        <span>&rarr;</span>
                      </Link>
                    </div>

                    {/* Progress bars strip (Like in dash.png: New Patients 15/28, Follow-up 3/28, Referred 10/28) */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-slate-600">In-Clinic Visits</span>
                          <span className="text-slate-900">{inClinicAppointmentsCount}/{upcomingAppointments.length || 0}</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-600 rounded-full"
                            style={{
                              width: upcomingAppointments.length
                                ? `${(inClinicAppointmentsCount / upcomingAppointments.length) * 100}%`
                                : "0%",
                            }}
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-slate-600">Video Calls</span>
                          <span className="text-slate-900">{videoAppointmentsCount}/{upcomingAppointments.length || 0}</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full"
                            style={{
                              width: upcomingAppointments.length
                                ? `${(videoAppointmentsCount / upcomingAppointments.length) * 100}%`
                                : "0%",
                            }}
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-slate-600">Completed</span>
                          <span className="text-slate-900">{completedAppointments.length}/{allAppointments.length || 0}</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-orange-500 rounded-full"
                            style={{
                              width: allAppointments.length
                                ? `${(completedAppointments.length / allAppointments.length) * 100}%`
                                : "0%",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Horizontal / Grid of Appointment Cards (Avatar cards like in dash.png) */}
                  {upcomingAppointments.length === 0 ? (
                    <div className="p-10 rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-center space-y-3">
                      <div className="w-12 h-12 mx-auto rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                      <p className="text-sm font-bold text-slate-700">
                        No upcoming visits scheduled right now.
                      </p>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto">
                        Book a dental consultation with Dr. Nitu Rajpoot either in-clinic or through online video consultation.
                      </p>
                      <Link
                        href="/patient/book"
                        className="inline-block mt-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 shadow-xs transition"
                      >
                        + Book Consultation Now
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                      {upcomingAppointments.map((apt: any) => {
                        const isVid = isVideoConsultation(apt);
                        const meetLink = isVid ? getMeetUrl(apt) : null;

                        return (
                          <div
                            key={String(apt.id)}
                            className="relative bg-white rounded-2xl border border-slate-200/90 p-4 flex flex-col items-center text-center shadow-xs hover:border-blue-300 hover:shadow-md transition-all group"
                          >
                            {/* Top Badge (e.g. REFERRED or VIDEO like in image) */}
                            <span
                              className={`mb-3 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide ${
                                isVid
                                  ? "bg-purple-100 text-purple-700"
                                  : "bg-blue-100 text-blue-700"
                              }`}
                            >
                              {isVid ? "Video Call" : "In Clinic"}
                            </span>

                            {/* Circle Avatar (matching the circular patient avatars in dash.png) */}
                            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-200 to-yellow-400 p-0.5 flex items-center justify-center shadow-xs mb-2">
                              <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center font-extrabold text-slate-700 text-sm">
                                {fullName.slice(0, 2).toUpperCase()}
                              </div>
                            </div>

                            {/* Details */}
                            <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-blue-600 transition truncate max-w-full">
                              {apt.reason || "Dental Checkup"}
                            </h4>
                            <p className="text-[11px] font-semibold text-slate-500 mt-0.5">
                              Ref: {apt.bookingReference || "Direct"}
                            </p>

                            {/* Time & Date */}
                            <div className="mt-3 pt-3 border-t border-slate-100 w-full space-y-1">
                              <span className="text-xs font-extrabold text-blue-600 block">
                                {apt.startTime || "Scheduled"}
                              </span>
                              <span className="text-[10px] font-medium text-slate-400 block truncate">
                                {formatAppointmentDate(apt.appointmentDate || apt.createdAt)}
                              </span>
                            </div>

                            {/* Join Meet Action if online */}
                            {isVid && meetLink ? (
                              <a
                                href={meetLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-3 w-full py-2 px-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-[11px] font-extrabold shadow-xs transition flex items-center justify-center gap-1.5"
                              >
                                <span>🎥 Join Video</span>
                              </a>
                            ) : (
                              <span className="mt-3 px-3 py-1 rounded-lg bg-slate-50 text-slate-600 text-[10px] font-bold border border-slate-200/60">
                                {apt.status || "Confirmed"}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Medicine / Consultation History Table (Matching bottom table in dash.png) */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-extrabold text-slate-800">
                        Prescription &amp; Visit Log
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Recent dental treatments and doctor prescriptions
                      </p>
                    </div>
                    <label
                      htmlFor="tab-records"
                      className="cursor-pointer text-xs font-bold text-blue-600 hover:underline"
                    >
                      View all ({pastAppointments.length}) &rarr;
                    </label>
                  </div>

                  {pastAppointments.length === 0 ? (
                    <div className="py-8 text-center text-xs text-slate-400">
                      No treatment history or prescriptions logged yet.
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-slate-100 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                            <th className="pb-3 pr-4">Reason / Service</th>
                            <th className="pb-3 px-4">Visit Type</th>
                            <th className="pb-3 px-4">Date &amp; Time</th>
                            <th className="pb-3 px-4">Status</th>
                            <th className="pb-3 pl-4">Notes</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                          {pastAppointments.slice(0, 4).map((apt: any) => {
                            const isVid = isVideoConsultation(apt);
                            return (
                              <tr key={String(apt.id)} className="hover:bg-slate-50/70 transition">
                                <td className="py-3.5 pr-4 font-bold text-slate-900">
                                  {apt.reason || "General Dental Care"}
                                  <span className="block text-[10px] font-normal text-slate-400">
                                    Ref: {apt.bookingReference}
                                  </span>
                                </td>
                                <td className="py-3.5 px-4">
                                  <span
                                    className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                      isVid
                                        ? "bg-purple-50 text-purple-700 border border-purple-200/50"
                                        : "bg-blue-50 text-blue-700 border border-blue-200/50"
                                    }`}
                                  >
                                    {isVid ? "Video Call" : "In-Clinic"}
                                  </span>
                                </td>
                                <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                                  {formatAppointmentDate(apt.appointmentDate || apt.createdAt)}
                                  <span className="block text-[10px] text-slate-400">
                                    {apt.startTime || "Regular"}
                                  </span>
                                </td>
                                <td className="py-3.5 px-4">
                                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200/60">
                                    {apt.status || "Completed"}
                                  </span>
                                </td>
                                <td className="py-3.5 pl-4 max-w-xs truncate text-slate-500">
                                  {apt.prescriptionNotes || "Treatment routine completed"}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

              </div>

              {/* Right 1 Col: Schedule & Reminders (Matching the right column in dash.png) */}
              <div className="space-y-6">
                
                {/* Schedule Card (Matching dash.png Schedule panel) */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="text-base font-extrabold text-slate-800">
                      Schedule
                    </h3>
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
                      Timeline
                    </span>
                  </div>

                  {upcomingAppointments.length === 0 ? (
                    <p className="text-xs text-slate-400 py-3 text-center">
                      No events on your schedule today.
                    </p>
                  ) : (
                    <div className="space-y-3.5">
                      {upcomingAppointments.slice(0, 3).map((apt: any, idx: number) => {
                        const isVid = isVideoConsultation(apt);
                        const colors = [
                          "border-l-amber-500",
                          "border-l-purple-500",
                          "border-l-blue-500",
                        ];
                        const borderClass = colors[idx % colors.length];

                        return (
                          <div
                            key={String(apt.id)}
                            className={`p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/60 border-l-4 ${borderClass} space-y-1`}
                          >
                            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block">
                              {isVid ? "Google Meet Consultation" : "In-Clinic Visit"}
                            </span>
                            <h4 className="text-xs font-bold text-slate-800">
                              {apt.reason || "Dental Consultation"}
                            </h4>
                            <p className="text-[11px] font-semibold text-blue-600">
                              {apt.startTime || "Scheduled Time"} &bull;{" "}
                              {formatAppointmentDate(apt.appointmentDate || apt.createdAt)}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Reminders Card (Matching dash.png Reminders panel) */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="text-base font-extrabold text-slate-800">
                      Reminders &amp; Care
                    </h3>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>

                  <div className="space-y-3 text-xs font-medium text-slate-600">
                    <div className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-md border border-amber-400 bg-amber-50 flex items-center justify-center shrink-0 mt-0.5 text-amber-600">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Arrive 10 minutes prior for in-clinic dental visits</span>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-md border border-purple-400 bg-purple-50 flex items-center justify-center shrink-0 mt-0.5 text-purple-600">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Check microphone &amp; camera for Google Meet sessions</span>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-md border border-blue-400 bg-blue-50 flex items-center justify-center shrink-0 mt-0.5 text-blue-600">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>View Dr. Nitu&apos;s updated 32-Tooth Digital Odontogram</span>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-md border border-emerald-400 bg-emerald-50 flex items-center justify-center shrink-0 mt-0.5 text-emerald-600">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Adhere to post-op medication schedule and oral hygiene</span>
                    </div>
                  </div>
                </div>

                {/* Quick Doctor Profile Card */}
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-md space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl font-bold">
                      🩺
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold leading-tight">
                        Dr. Nitu Rajpoot, BDS
                      </h4>
                      <p className="text-[11px] text-blue-100">
                        Chief Dental Surgeon &amp; Specialist
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-blue-50 leading-relaxed">
                    Have questions about your treatment or need to report sensitivity? Use direct clinical chat for quick advice.
                  </p>
                  <label
                    htmlFor="tab-chat"
                    className="cursor-pointer block text-center py-2.5 px-4 rounded-xl bg-white hover:bg-blue-50 text-blue-700 font-extrabold text-xs shadow-xs transition"
                  >
                    Open Clinical Chat &rarr;
                  </label>
                </div>

              </div>
            </div>
          </div>

          {/* TAB 2: 32-TOOTH DIGITAL ODONTOGRAM */}
          <div id="panel-odontogram" className="hidden space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-[11px] font-extrabold text-blue-600 uppercase tracking-wider">
                  Interactive Dental Anatomy
                </span>
                <h2 className="text-xl font-extrabold text-slate-900 mt-1">
                  32-Tooth Digital Odontogram
                </h2>
                <p className="text-xs text-slate-500">
                  Inspect your personalized digital tooth chart, clinical observations, and treatment history mapped by tooth number.
                </p>
              </div>

              <InteractiveOdontogram
                patientId={patientProfile.id}
                initialOdontogram={(patientProfile.odontogramData as any) || {}}
                initialMedicalHistory={patientProfile.medicalHistory || ""}
                editable={false}
              />
            </div>
          </div>

          {/* TAB 3: DIRECT CLINICAL CHAT */}
          <div id="panel-chat" className="hidden space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-[11px] font-extrabold text-blue-600 uppercase tracking-wider">
                  Direct Doctor Messaging
                </span>
                <h2 className="text-xl font-extrabold text-slate-900 mt-1">
                  Clinical Consultation Chat
                </h2>
                <p className="text-xs text-slate-500">
                  Direct encrypted line with Dr. Nitu Rajpoot, BDS for follow-ups and care inquiries.
                </p>
              </div>

              <ClinicalChatBox
                patientId={patientProfile.id}
                currentUserRole="PATIENT"
                currentUserName={fullName}
                title="Direct Clinical Chat with Dr. Nitu Rajpoot, BDS"
              />
            </div>
          </div>

          {/* TAB 4: PRESCRIPTIONS & PAST VISITS */}
          <div id="panel-records" className="hidden space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-4 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-extrabold text-emerald-600 uppercase tracking-wider">
                    Treatment Archives
                  </span>
                  <h2 className="text-xl font-extrabold text-slate-900 mt-1">
                    Completed Visits &amp; Doctor Prescriptions ({pastAppointments.length})
                  </h2>
                  <p className="text-xs text-slate-500">
                    Comprehensive digital records of all attended visits and prescribed regimens.
                  </p>
                </div>
                <span className="px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-extrabold">
                  {pastAppointments.length} Total Records
                </span>
              </div>

              {pastAppointments.length === 0 ? (
                <div className="p-10 rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-center space-y-2">
                  <p className="text-xs font-bold text-slate-600">
                    No past visits or prescriptions found.
                  </p>
                  <p className="text-[11px] text-slate-400">
                    When Dr. Nitu completes your appointments and records prescriptions, they will be archived here.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pastAppointments.map((apt: any) => {
                    const isVid = isVideoConsultation(apt);
                    return (
                      <div
                        key={String(apt.id)}
                        className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50/60 hover:bg-white hover:border-blue-200 hover:shadow-xs transition space-y-3"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-extrabold text-blue-600">
                              {apt.bookingReference || "SSD-VISIT"}
                            </span>
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                                isVid
                                  ? "bg-purple-100 text-purple-700"
                                  : "bg-blue-100 text-blue-700"
                              }`}
                            >
                              {isVid ? "🎥 Video Call" : "🏥 In-Clinic"}
                            </span>
                          </div>

                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">
                            {apt.status || "Completed"}
                          </span>
                        </div>

                        <div className="text-xs font-bold text-slate-800">
                          {formatAppointmentDate(
                            apt.appointmentDate || apt.createdAt
                          )}{" "}
                          at{" "}
                          <span className="text-blue-600">
                            {apt.startTime || "Scheduled Time"}
                          </span>{" "}
                          &mdash;{" "}
                          <span className="text-slate-600 font-medium">
                            {apt.reason || "Dental Consultation"}
                          </span>
                        </div>

                        {apt.prescriptionNotes ? (
                          <div className="p-3.5 rounded-xl bg-white border border-blue-100 text-xs text-slate-700 shadow-2xs space-y-1">
                            <span className="font-extrabold text-blue-600 block text-[11px]">
                              💊 Prescription &amp; Clinical Notes:
                            </span>
                            <p className="leading-relaxed whitespace-pre-line">
                              {apt.prescriptionNotes}
                            </p>
                          </div>
                        ) : (
                          <p className="text-[11px] text-slate-400 italic">
                            No additional prescription notes recorded.
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function PatientDashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F4F7FC] p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6 animate-pulse">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="h-28 rounded-3xl bg-slate-200" />
              <div className="h-28 rounded-3xl bg-slate-200" />
              <div className="h-28 rounded-3xl bg-slate-200" />
              <div className="h-28 rounded-3xl bg-slate-200" />
            </div>
            <div className="h-14 rounded-2xl bg-slate-200 w-1/2" />
            <div className="h-96 rounded-3xl bg-slate-200" />
          </div>
        </div>
      }
    >
      <PatientDashboardContent />
    </Suspense>
  );
}