// import { Suspense } from "react";
// import { connection } from "next/server";
// import { redirect } from "next/navigation";
// import Link from "next/link";
// import { db } from "@/lib/db";
// import * as schema from "@/db/schema";
// import { eq, desc } from "drizzle-orm";
// import { ensureDatabaseSchema } from "@/lib/ensure-db-schema";
// import { getBlogs } from "@/app/actions/clinic-cms";
// import { getClinicScheduleConfig } from "@/app/actions/clinic-schedule";
// import { getCurrentUserRole } from "@/app/actions/auth-role";
// import { getAllReviewsForDoctor } from "@/app/actions/reviews";
// import DoctorCMSClient from "@/components/DoctorCMSClient";
// import DoctorPatientWorkspace from "@/components/DoctorPatientWorkspace";
// import { DoctorReviewModerationPanel } from "@/components/ReviewModerationComponents";
// import DoctorQueueManager from "@/components/DoctorQueueManager";
// import DoctorRevenueAnalytics from "@/components/DoctorRevenueAnalytics";
// import DoctorQRCodePanel from "@/components/doctor/DoctorQRCodePanel";

// const { users, patients, appointments } = schema;

// async function DoctorDashboardContent() {
//   await connection();
//   await ensureDatabaseSchema();

//   const { isSignedIn, role, email } = await getCurrentUserRole();

//   if (!isSignedIn) {
//     redirect("/sign-in");
//   }

//   if (role !== "DOCTOR") {
//     return (
//       <div className="max-w-xl mx-auto px-4 py-20">
//         <div className="bg-white rounded-3xl p-8 border border-red-200 shadow-sm text-center space-y-5">
//           <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 font-extrabold text-xl flex items-center justify-center mx-auto">
//             🔒
//           </div>
//           <div className="space-y-2">
//             <span className="text-xs font-extrabold text-red-600 uppercase tracking-wider">
//               Restricted Clinical Portal
//             </span>
//             <h1 className="text-2xl font-extrabold text-slate-900">
//               Doctor Command Center Only
//             </h1>
//             <p className="text-xs text-slate-500 leading-relaxed">
//               Signed in as <span className="font-bold text-slate-700">{email}</span>. Redirecting you to your Patient Portal.
//             </p>
//           </div>
//           <Link
//             href="/patient/dashboard"
//             className="inline-block px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold transition"
//           >
//             Go to My Patient Portal →
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   // Fetch appointments with dynamic SQL LEFT JOIN on users and patients so names are always correct
//   const [
//     joinedAppointments,
//     allPatients,
//     allUsers,
//     blogs,
//     scheduleConfig,
//     allReviews,
//   ] = await Promise.all([
//     db
//       .select({
//         id: appointments.id,
//         patientId: appointments.patientId,
//         bookingReference: appointments.bookingReference,
//         appointmentDate: appointments.appointmentDate,
//         startTime: appointments.startTime,
//         endTime: appointments.endTime,
//         appointmentType: appointments.appointmentType,
//         patientPhone: appointments.patientPhone,
//         meetLink: appointments.meetLink,
//         status: appointments.status,
//         reason: appointments.reason,
//         prescriptionNotes: appointments.prescriptionNotes,
//         createdAt: appointments.createdAt,
//         patientName: users.fullName,
//       })
//       .from(appointments)
//       .leftJoin(patients, eq(appointments.patientId, patients.id))
//       .leftJoin(users, eq(patients.userId, users.id))
//       .orderBy(desc(appointments.createdAt)),
//     db.select().from(patients),
//     db.select().from(users),
//     getBlogs(true),
//     getClinicScheduleConfig(),
//     getAllReviewsForDoctor(),
//   ]);

//   const enrichedPatients = allPatients.map((p: any, idx: number) => {
//     const matchedUser = allUsers.find(
//       (u: any) => String(u.id) === String(p.userId || p.user_id)
//     );
//     return {
//       id: String(p.id),
//       patientCode: p.patientCode || `PAT-${100 + idx}`,
//       fullName:
//         matchedUser?.fullName ||
//         matchedUser?.email?.split("@")[0] ||
//         `Registered Patient #${idx + 1}`,
//       email: matchedUser?.email || "",
//       phone: p.phone || matchedUser?.phone || "",
//       odontogramData: p.odontogramData || {},
//       medicalHistory: p.medicalHistory || "",
//     };
//   });

//   const normalizedAppointments = joinedAppointments.map((apt: any) => {
//     const matchedPatient = enrichedPatients.find(
//       (p) => String(p.id) === String(apt.patientId)
//     );
//     return {
//       ...apt,
//       id: String(apt.id),
//       patientId: String(apt.patientId || ""),
//       patientName:
//         apt.patientName ||
//         matchedPatient?.fullName ||
//         "Verified Patient",
//     };
//   });

//   const activeQueueCount = normalizedAppointments.filter(
//     (a: any) => a.status === "PENDING" || a.status === "CONFIRMED"
//   ).length;

//   const completedCount = normalizedAppointments.filter(
//     (a: any) => a.status === "COMPLETED"
//   ).length;

//   const videoCount = normalizedAppointments.filter((a: any) => {
//     const t = String(a.appointmentType || "").toUpperCase();
//     const r = String(a.reason || "").toUpperCase();
//     return t.includes("VIDEO") || r.includes("VIDEO") || Boolean(a.meetLink);
//   }).length;

//   const pendingReviewsCount = allReviews.filter(
//     (r: any) => !r.isApproved
//   ).length;

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50/60 via-slate-50/60 to-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
//           <div className="space-y-2">
//             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-[11px] font-extrabold uppercase tracking-wider">
//               <span>🦷 Shree Sainath Dental Clinic</span>
//               <span>•</span>
//               <span>Doctor Command Center</span>
//             </div>
//             <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
//               Dr. Nitu Rajpoot, BDS
//             </h1>
//             <p className="text-xs text-blue-200/90">
//               24-Hr Operating Schedule:{" "}
//               <strong className="text-white">
//                 {scheduleConfig.startTime} – {scheduleConfig.endTime}
//               </strong>{" "}
//               (Break: {scheduleConfig.lunchStart} – {scheduleConfig.lunchEnd}) •
//               Signed in as {email}
//             </p>
//           </div>

//           <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 shrink-0">
//             <div className="px-4 py-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
//               <span className="text-[10px] font-extrabold text-blue-200 uppercase block">
//                 Active Queue
//               </span>
//               <span className="text-2xl font-extrabold text-white">
//                 {activeQueueCount}
//               </span>
//             </div>

//             <div className="px-4 py-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
//               <span className="text-[10px] font-extrabold text-indigo-200 uppercase block">
//                 Video Visits
//               </span>
//               <span className="text-2xl font-extrabold text-white">
//                 {videoCount}
//               </span>
//             </div>

//             <div className="px-4 py-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
//               <span className="text-[10px] font-extrabold text-emerald-300 uppercase block">
//                 Completed
//               </span>
//               <span className="text-2xl font-extrabold text-white">
//                 {completedCount}
//               </span>
//             </div>

//             <div className="px-4 py-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
//               <span className="text-[10px] font-extrabold text-amber-300 uppercase block">
//                 Reviews Queue
//               </span>
//               <span className="text-2xl font-extrabold text-white">
//                 {pendingReviewsCount}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* 1. Revenue & Financial Analytics Cards */}
//         <DoctorRevenueAnalytics appointmentsList={normalizedAppointments} />

//         {/* 1B. Clinic Reception QR Standee & Self Check-In/Out Manager */}
//         <DoctorQRCodePanel />

//         {/* 2. Physical Waiting Room & Printable Prescriptions */}
//         <DoctorQueueManager appointmentsList={normalizedAppointments} />

//         {/* 3. Clinical Queue, Video Meet Launcher, Odontogram & Chat */}
//         <DoctorPatientWorkspace
//           patientsList={enrichedPatients}
//           appointmentsList={normalizedAppointments}
//         />

//         {/* 4. Patient Review Moderation Panel */}
//         <DoctorReviewModerationPanel reviewsList={allReviews} />

//         {/* 5. 24-Hr Clinic Schedule & Blog Publishing Studio */}
//         <DoctorCMSClient
//           initialBlogs={blogs}
//           initialSchedule={scheduleConfig}
//         />
//       </div>
//     </div>
//   );
// }

// export default function DoctorDashboardPage() {
//   return (
//     <Suspense
//       fallback={
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
//           <div className="h-36 rounded-3xl bg-slate-900 animate-pulse" />
//           <div className="h-96 rounded-3xl bg-white border border-slate-200 animate-pulse" />
//         </div>
//       }
//     >
//       <DoctorDashboardContent />
//     </Suspense>
//   );
// }



import { Suspense } from "react";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import * as schema from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { ensureDatabaseSchema } from "@/lib/ensure-db-schema";
import { getBlogs } from "@/app/actions/clinic-cms";
import { getClinicScheduleConfig } from "@/app/actions/clinic-schedule";
import { getCurrentUserRole } from "@/app/actions/auth-role";
import { getAllReviewsForDoctor } from "@/app/actions/reviews";
import { getServerLanguage } from "@/lib/server-language";
import DoctorDashboardTabsClient from "@/components/doctor/DoctorDashboardTabsClient";

const { users, patients, appointments } = schema;

interface DashboardProps {
  searchParams?: Promise<{ tab?: string }>;
}

async function DoctorDashboardContent({ searchParams }: DashboardProps) {
  await connection();
  await ensureDatabaseSchema();

  const [{ isSignedIn, role, email }, { tr }] = await Promise.all([
    getCurrentUserRole(),
    getServerLanguage(),
  ]);

  if (!isSignedIn) {
    redirect("/sign-in");
  }

  if (role !== "DOCTOR") {
    return (
      <div className="min-h-screen bg-[#f4f7fb] flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-600 text-2xl flex items-center justify-center mx-auto shadow-inner">
            🔒
          </div>
          <div className="space-y-2">
            <span className="inline-block text-[11px] font-extrabold text-red-600 uppercase tracking-wider bg-red-50 px-3 py-1 rounded-full border border-red-200/60">
              {tr("Restricted Clinical Portal", "प्रतिबंधित क्लिनिकल पोर्टल")}
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {tr("Doctor Command Center Only", "केवल डॉक्टर कमांड सेंटर")}
            </h1>
            <p className="text-xs text-slate-500 leading-relaxed">
              {tr("Signed in as", "के रूप में साइन इन किया गया")}{" "}
              <span className="font-bold text-slate-700">{email}</span>.{" "}
              {tr(
                "Redirecting you to your Patient Portal.",
                "आपको आपके पेशेंट पोर्टल पर भेजा जा रहा है।"
              )}
            </p>
          </div>
          <Link
            href="/patient/dashboard"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-md shadow-blue-500/20 transition duration-150"
          >
            {tr("Go to My Patient Portal →", "मेरे पेशेंट पोर्टल पर जाएं →")}
          </Link>
        </div>
      </div>
    );
  }

  // Safely await Next.js 16 Thenable searchParams
  const resolvedParams = searchParams ? await Promise.resolve(searchParams) : {};
  const initialTab = resolvedParams?.tab || "workspace";

  const [
    joinedAppointments,
    allPatients,
    allUsers,
    blogs,
    scheduleConfig,
    allReviews,
  ] = await Promise.all([
    db
      .select({
        id: appointments.id,
        patientId: appointments.patientId,
        bookingReference: appointments.bookingReference,
        appointmentDate: appointments.appointmentDate,
        startTime: appointments.startTime,
        endTime: appointments.endTime,
        appointmentType: appointments.appointmentType,
        patientPhone: appointments.patientPhone,
        meetLink: appointments.meetLink,
        status: appointments.status,
        reason: appointments.reason,
        prescriptionNotes: appointments.prescriptionNotes,
        createdAt: appointments.createdAt,
        patientName: users.fullName,
      })
      .from(appointments)
      .leftJoin(patients, eq(appointments.patientId, patients.id))
      .leftJoin(users, eq(patients.userId, users.id))
      .orderBy(desc(appointments.createdAt)),
    db.select().from(patients),
    db.select().from(users),
    getBlogs(true),
    getClinicScheduleConfig(),
    getAllReviewsForDoctor(),
  ]);

  const enrichedPatients = allPatients.map((p: any, idx: number) => {
    const matchedUser = allUsers.find(
      (u: any) => String(u.id) === String(p.userId || p.user_id)
    );
    return {
      id: String(p.id),
      patientCode: p.patientCode || `PAT-${100 + idx}`,
      fullName:
        matchedUser?.fullName ||
        matchedUser?.email?.split("@")[0] ||
        `${tr("Registered Patient", "पंजीकृत मरीज")} #${idx + 1}`,
      email: matchedUser?.email || "",
      phone: p.phone || matchedUser?.phone || "",
      odontogramData: p.odontogramData || {},
      medicalHistory: p.medicalHistory || "",
    };
  });

  const normalizedAppointments = joinedAppointments.map((apt: any) => {
    const matchedPatient = enrichedPatients.find(
      (p) => String(p.id) === String(apt.patientId)
    );
    return {
      ...apt,
      id: String(apt.id),
      patientId: String(apt.patientId || ""),
      patientName:
        apt.patientName ||
        matchedPatient?.fullName ||
        tr("Verified Patient", "सत्यापित मरीज"),
    };
  });

  const activeQueueCount = normalizedAppointments.filter(
    (a: any) => a.status === "PENDING" || a.status === "CONFIRMED"
  ).length;

  const completedCount = normalizedAppointments.filter(
    (a: any) => a.status === "COMPLETED"
  ).length;

  const videoCount = normalizedAppointments.filter((a: any) => {
    const t = String(a.appointmentType || "").toUpperCase();
    const r = String(a.reason || "").toUpperCase();
    return t.includes("VIDEO") || r.includes("VIDEO") || Boolean(a.meetLink);
  }).length;

  const pendingReviewsCount = allReviews.filter(
    (r: any) => !r.isApproved
  ).length;

  return (
    <DoctorDashboardTabsClient
      initialTab={initialTab}
      email={email || ""}
      scheduleConfig={scheduleConfig}
      activeQueueCount={activeQueueCount}
      videoCount={videoCount}
      completedCount={completedCount}
      pendingReviewsCount={pendingReviewsCount}
      enrichedPatients={enrichedPatients}
      normalizedAppointments={normalizedAppointments}
      allReviews={allReviews}
      blogs={blogs}
    />
  );
}

export default function DoctorDashboardPage(props: DashboardProps) {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-7 animate-pulse">
          <div style={{ height: "130px" }} aria-hidden="true" />
          <div className="h-20 bg-white rounded-2xl shadow-sm" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="h-24 bg-rose-50 rounded-3xl" />
            <div className="h-24 bg-blue-50 rounded-3xl" />
            <div className="h-24 bg-emerald-50 rounded-3xl" />
            <div className="h-24 bg-amber-50 rounded-3xl" />
          </div>
          <div className="h-14 bg-white rounded-2xl shadow-sm" />
          <div className="h-96 bg-white rounded-3xl shadow-sm" />
        </div>
      }
    >
      <DoctorDashboardContent searchParams={props.searchParams} />
    </Suspense>
  );
}