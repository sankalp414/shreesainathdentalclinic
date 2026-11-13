"use client";

import { useState } from "react";
import { useLanguage } from "@/components/LanguageContext";
import DoctorCMSClient from "@/components/DoctorCMSClient";
import DoctorPatientWorkspace from "@/components/DoctorPatientWorkspace";
import { DoctorReviewModerationPanel } from "@/components/ReviewModerationComponents";
import DoctorQueueManager from "@/components/DoctorQueueManager";
import DoctorRevenueAnalytics from "@/components/DoctorRevenueAnalytics";
import DoctorQRCodePanel from "@/components/doctor/DoctorQRCodePanel";

interface DoctorDashboardTabsClientProps {
  initialTab?: string;
  email: string;
  scheduleConfig: any;
  activeQueueCount: number;
  videoCount: number;
  completedCount: number;
  pendingReviewsCount: number;
  enrichedPatients: any[];
  normalizedAppointments: any[];
  allReviews: any[];
  blogs: any[];
}

export default function DoctorDashboardTabsClient({
  initialTab = "workspace",
  email,
  scheduleConfig,
  activeQueueCount,
  videoCount,
  completedCount,
  pendingReviewsCount,
  enrichedPatients,
  normalizedAppointments,
  allReviews,
  blogs,
}: DoctorDashboardTabsClientProps) {
  const [activeTab, setActiveTab] = useState<string>(initialTab || "workspace");
  const { tr } = useLanguage();

  // Tabs with symbols directly from your sidebar design
  const tabsList = [
    {
      id: "workspace",
      label: tr("Clinical Workspace", "क्लिनिकल वर्कस्पेस"),
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
      badge: null,
    },
    {
      id: "queue",
      label: tr("Patient Queue", "मरीज कतार (Queue)"),
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      badge: activeQueueCount > 0 ? activeQueueCount : null,
      badgeColor: "bg-rose-500 text-white",
    },
    {
      id: "analytics",
      label: tr("Revenue & Analytics", "राजस्व और एनालिटिक्स"),
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      badge: null,
    },
    {
      id: "qr",
      label: tr("Reception QR", "रिसेप्शन QR"),
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
        </svg>
      ),
      badge: null,
    },
    {
      id: "reviews",
      label: tr("Review Moderation", "समीक्षा मॉडरेशन"),
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
      badge: pendingReviewsCount > 0 ? pendingReviewsCount : null,
      badgeColor: "bg-amber-500 text-white",
    },
    {
      id: "cms",
      label: tr("Clinic Schedule & CMS", "क्लिनिक समय और CMS"),
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      badge: null,
    },
    {
      id: "all",
      label: tr("View All", "सभी देखें"),
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      ),
      badge: null,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f1f5fb] text-slate-800 antialiased selection:bg-blue-600 selection:text-white">
      {/* 130px spacer directly pushing all dashboard content below the fixed navbar */}
      <div style={{ height: "130px" }} aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 space-y-7">
        {/* ===================== TOP CLINIC & DOCTOR HEADER ===================== */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-[11px] font-extrabold uppercase tracking-wider">
              <span>🦷 {tr("Shree Sainath Dental Clinic", "श्री साईनाथ डेंटल क्लिनिक")}</span>
              <span className="text-blue-300">•</span>
              <span>{tr("Doctor Command Center", "डॉक्टर कमांड सेंटर")}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {tr("Dr. Nitu Rajpoot, BDS", "डॉ. नीतू राजपूत, बीडीएस")}
            </h1>
            <p className="text-xs text-slate-500">
              {tr("24-Hr Operating Schedule:", "क्लिनिक संचालन समय:")}{" "}
              <strong className="text-slate-800 font-semibold">
                {scheduleConfig.startTime} – {scheduleConfig.endTime}
              </strong>{" "}
              ({tr("Break:", "लंच ब्रेक:")} {scheduleConfig.lunchStart} – {scheduleConfig.lunchEnd}) •{" "}
              {tr("Signed in as", "लॉग इन ईमेल:")}{" "}
              <span className="font-medium text-slate-700">{email}</span>
            </p>
          </div>
        </div>

        {/* ===================== 4 PASTEL STAT CARDS ===================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Card 1: Rose Pink (Active Queue) */}
          <button
            type="button"
            onClick={() => setActiveTab("queue")}
            className="text-left group bg-[#fef2f2] hover:bg-[#fee2e2] rounded-3xl p-5 border border-rose-100 shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-4 cursor-pointer"
          >
            <div className="w-14 h-14 rounded-2xl bg-rose-500 text-white flex items-center justify-center shadow-md shadow-rose-500/25 shrink-0 group-hover:scale-105 transition-transform">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div className="min-w-0">
              <span className="text-[11px] font-bold text-rose-700/80 uppercase tracking-wide block truncate">
                {tr("Active Queue", "सक्रिय कतार")}
              </span>
              <span className="text-3xl font-black text-slate-900 tracking-tight block">
                {activeQueueCount}
              </span>
              <span className="text-[11px] font-semibold text-rose-600">
                {tr("Waiting Patients", "प्रतीक्षारत मरीज")}
              </span>
            </div>
          </button>

          {/* Card 2: Sky Blue (Video Visits) */}
          <button
            type="button"
            onClick={() => setActiveTab("workspace")}
            className="text-left group bg-[#eff6ff] hover:bg-[#dbeafe] rounded-3xl p-5 border border-blue-100 shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-4 cursor-pointer"
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-600/25 shrink-0 group-hover:scale-105 transition-transform">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="min-w-0">
              <span className="text-[11px] font-bold text-blue-700/80 uppercase tracking-wide block truncate">
                {tr("Video Visits", "वीडियो परामर्श")}
              </span>
              <span className="text-3xl font-black text-slate-900 tracking-tight block">
                {videoCount}
              </span>
              <span className="text-[11px] font-semibold text-blue-600">
                {tr("Scheduled Consults", "निर्धारित परामर्श")}
              </span>
            </div>
          </button>

          {/* Card 3: Mint Emerald (Completed) */}
          <button
            type="button"
            onClick={() => setActiveTab("workspace")}
            className="text-left group bg-[#ecfdf5] hover:bg-[#d1fae5] rounded-3xl p-5 border border-emerald-100 shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-4 cursor-pointer"
          >
            <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/25 shrink-0 group-hover:scale-105 transition-transform">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="min-w-0">
              <span className="text-[11px] font-bold text-emerald-700/80 uppercase tracking-wide block truncate">
                {tr("Completed", "पूर्ण विजिट")}
              </span>
              <span className="text-3xl font-black text-slate-900 tracking-tight block">
                {completedCount}
              </span>
              <span className="text-[11px] font-semibold text-emerald-600">
                {tr("Past Visits", "पिछली विजिट")}
              </span>
            </div>
          </button>

          {/* Card 4: Peach Amber (Reviews Queue) */}
          <button
            type="button"
            onClick={() => setActiveTab("reviews")}
            className="text-left group bg-[#fffbeb] hover:bg-[#fef3c7] rounded-3xl p-5 border border-amber-100 shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-4 cursor-pointer"
          >
            <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/25 shrink-0 group-hover:scale-105 transition-transform">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <div className="min-w-0">
              <span className="text-[11px] font-bold text-amber-800/80 uppercase tracking-wide block truncate">
                {tr("Reviews Queue", "समीक्षा कतार")}
              </span>
              <span className="text-3xl font-black text-slate-900 tracking-tight block">
                {pendingReviewsCount}
              </span>
              <span className="text-[11px] font-semibold text-amber-700">
                {tr("Awaiting Review", "समीक्षा हेतु लंबित")}
              </span>
            </div>
          </button>
        </div>

        {/* ===================== HORIZONTAL TAB BAR (WITH SIDEBAR SYMBOLS) ===================== */}
        <div className="top-28 z-20 bg-white/95 backdrop-blur-xl p-2 rounded-2xl border border-slate-200/80 shadow-md">
          <nav className="flex items-center gap-2 overflow-x-auto scrollbar-none py-0.5 px-0.5">
            {tabsList.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 shrink-0 cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25 font-extrabold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <span className={isActive ? "text-white" : "text-blue-600"}>
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>
                  {tab.badge !== null && (
                    <span
                      className={`ml-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                        isActive
                          ? "bg-white/20 text-white"
                          : tab.badgeColor || "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* ===================== TABBED CONTENT CARDS ===================== */}
        <div className="space-y-8">
          {/* 3. Clinical Queue, Video Meet Launcher, Odontogram & Chat */}
          {(activeTab === "workspace" || activeTab === "all") && (
            <div className="rounded-3xl bg-white p-6 sm:p-8 border border-slate-200/80 shadow-sm">
              <DoctorPatientWorkspace
                patientsList={enrichedPatients}
                appointmentsList={normalizedAppointments}
              />
            </div>
          )}

          {/* 2. Physical Waiting Room & Printable Prescriptions */}
          {(activeTab === "queue" || activeTab === "all") && (
            <div className="rounded-3xl bg-white p-6 sm:p-8 border border-slate-200/80 shadow-sm">
              <DoctorQueueManager appointmentsList={normalizedAppointments} />
            </div>
          )}

          {/* 1. Revenue & Financial Analytics Cards */}
          {(activeTab === "analytics" || activeTab === "all") && (
            <div className="rounded-3xl bg-white p-6 sm:p-8 border border-slate-200/80 shadow-sm">
              <DoctorRevenueAnalytics appointmentsList={normalizedAppointments} />
            </div>
          )}

          {/* 1B. Clinic Reception QR Standee & Self Check-In/Out Manager */}
          {(activeTab === "qr" || activeTab === "all") && (
            <div className="rounded-3xl bg-white p-6 sm:p-8 border border-slate-200/80 shadow-sm">
              <DoctorQRCodePanel />
            </div>
          )}

          {/* 4. Patient Review Moderation Panel */}
          {(activeTab === "reviews" || activeTab === "all") && (
            <div className="rounded-3xl bg-white p-6 sm:p-8 border border-slate-200/80 shadow-sm">
              <DoctorReviewModerationPanel reviewsList={allReviews} />
            </div>
          )}

          {/* 5. 24-Hr Clinic Schedule & Blog Publishing Studio */}
          {(activeTab === "cms" || activeTab === "all") && (
            <div className="rounded-3xl bg-white p-6 sm:p-8 border border-slate-200/80 shadow-sm">
              <DoctorCMSClient
                initialBlogs={blogs}
                initialSchedule={scheduleConfig}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}