"use client";

import { useState } from "react";
import Link from "next/link";
import { useUser, useClerk } from "@clerk/nextjs";
import { Menu, X, Sparkles, ArrowRight, CalendarDays, LogOut, User } from "lucide-react";
import CustomClerkAuthModal from "@/components/CustomClerkAuthModal";
import { useLanguage, LanguageSwitcherButton } from "@/components/LanguageContext";

export default function Navbar() {
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const { tr } = useLanguage();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"SIGN_IN" | "SIGN_UP">("SIGN_IN");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const NAV_LINKS = [
    { href: "/", label: tr("Home", "होम") },
    { href: "/about", label: tr("About", "हमारे बारे में") },
    { href: "/treatments", label: tr("Treatments", "उपचार") },
    { href: "/blog", label: tr("Articles", "लेख") },
    { href: "/contact", label: tr("Contact Us", "संपर्क करें") },
  ];

  const openSignIn = () => {
    setAuthMode("SIGN_IN");
    setAuthModalOpen(true);
    setMobileMenuOpen(false);
  };

  const openSignUp = () => {
    setAuthMode("SIGN_UP");
    setAuthModalOpen(true);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Floating Pill Header Shell */}
      <header className=" absolute inset-x-0  top-0 z-50 w-full px-3 pt-3 sm:px-6 sm:pt-4 pointer-events-none">
        <div className="mx-auto max-w-7xl pointer-events-auto">
          <div className="flex h-16 sm:h-18 items-center justify-between rounded-full border border-white/15 bg-slate-950/85 px-3.5 sm:px-6 shadow-[0_16px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all">
            
            {/* Clinic Brand */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="grid size-9 sm:size-10 place-items-center rounded-full bg-gradient-to-br from-rose-500 to-amber-500 text-white shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform">
                 <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#e05a47] text-white font-bold text-lg shadow-md">
                🦷
              </div>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-sm sm:text-base font-bold tracking-tight text-white leading-tight">
                  {tr("Shree Sainath Dental Clinic", "श्री साईनाथ डेंटल क्लिनिक")}
                </span>
                <span className="text-[10px] sm:text-[11px] font-medium text-white/60 leading-tight">
                  {tr("Dr. Nitu Rajpoot, BDS", "डॉ. नीतू राजपूत, बीडीएस")}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav
              className="hidden lg:flex items-center gap-1"
              aria-label={tr("Main navigation", "मुख्य नेविगेशन")}
            >
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-white/75 hover:text-white hover:bg-white/10 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/patient/book"
                className="ml-1 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-teal-300 hover:text-teal-200 hover:bg-teal-500/15 transition-colors"
              >
                <CalendarDays className="size-3.5" />
                {tr("Book Visit", "अपॉइंटमेंट बुक करें")}
              </Link>
            </nav>

            {/* Desktop Auth & Actions */}
            <div className="hidden sm:flex items-center gap-2.5">
              <LanguageSwitcherButton />

              {isSignedIn ? (
                <div className="flex items-center gap-2">
                  <Link
                    href="/patient/dashboard"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/15 hover:bg-white/20 text-white text-xs font-bold border border-white/15 backdrop-blur-md transition-all"
                  >
                    <User className="size-3.5" />
                    {tr("My Portal", "मेरा पोर्टल")}
                  </Link>
                  <button
                    type="button"
                    onClick={() => signOut({ redirectUrl: "/" })}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-full text-white/70 hover:text-rose-300 hover:bg-rose-500/15 text-xs font-semibold transition-all cursor-pointer"
                    title={tr("Sign Out", "साइन आउट")}
                  >
                    <LogOut className="size-3.5" />
                    <span className="hidden md:inline">{tr("Sign Out", "साइन आउट")}</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={openSignIn}
                    className="px-3.5 py-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 text-xs sm:text-sm font-semibold transition cursor-pointer"
                  >
                    {tr("Sign In", "साइन इन")}
                  </button>
                  <button
                    type="button"
                    onClick={openSignUp}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-slate-950 hover:bg-slate-100 text-xs sm:text-sm font-bold shadow-md hover:-translate-y-0.5 active:translate-y-0 transition cursor-pointer"
                  >
                    {tr("Register", "रजिस्टर करें")}
                    <ArrowRight className="size-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <LanguageSwitcherButton className="sm:hidden" />
              <button
                type="button"
                onClick={() => setMobileMenuOpen((v) => !v)}
                className="grid size-9 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 transition cursor-pointer"
                aria-label={mobileMenuOpen ? tr("Close menu", "मेनू बंद करें") : tr("Open menu", "मेनू खोलें")}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
              </button>
            </div>
          </div>

          {/* Mobile Drawer Dropdown */}
          {mobileMenuOpen && (
            <div className="mt-2 flex flex-col gap-1 rounded-3xl border border-white/15 bg-slate-950/95 p-4 shadow-2xl backdrop-blur-2xl lg:hidden text-white animate-in fade-in slide-in-from-top-2 duration-200">
              <nav className="flex flex-col gap-1 pb-3 border-b border-white/10">
                {NAV_LINKS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10 transition"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/patient/book"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-1 flex items-center justify-between px-4 py-2.5 rounded-xl bg-teal-500/15 text-teal-300 text-sm font-semibold hover:bg-teal-500/25 transition"
                >
                  <span className="flex items-center gap-2">
                    <CalendarDays className="size-4" />
                    {tr("Book an Appointment", "अपॉइंटमेंट बुक करें")}
                  </span>
                  <ArrowRight className="size-4" />
                </Link>
              </nav>

              {/* Mobile Auth Actions */}
              <div className="pt-2 flex flex-col gap-2">
                {isSignedIn ? (
                  <>
                    <Link
                      href="/patient/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white/15 text-white text-xs font-bold hover:bg-white/20 transition"
                    >
                      <User className="size-4" />
                      {tr("My Portal", "मेरा पोर्टल")}
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        signOut({ redirectUrl: "/" });
                      }}
                      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-rose-300 hover:bg-rose-500/15 text-xs font-semibold transition cursor-pointer"
                    >
                      <LogOut className="size-4" />
                      {tr("Sign Out", "साइन आउट")}
                    </button>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={openSignIn}
                      className="py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition cursor-pointer"
                    >
                      {tr("Sign In", "साइन इन")}
                    </button>
                    <button
                      type="button"
                      onClick={openSignUp}
                      className="py-2.5 rounded-xl bg-white text-slate-950 hover:bg-slate-100 text-xs font-bold transition cursor-pointer"
                    >
                      {tr("Register", "रजिस्टर करें")}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Auth Modal Trigger */}
      <CustomClerkAuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
    </>
  );
}