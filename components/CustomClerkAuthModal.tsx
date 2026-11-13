"use client";

import { useState, useEffect } from "react";
import { useClerk, useSignIn, useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageContext";

export default function CustomClerkAuthModal({
  isOpen,
  onClose,
  initialMode = "SIGN_IN",
}: {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "SIGN_IN" | "SIGN_UP";
}) {
  const router = useRouter();
  const clerk = useClerk();
  const { tr } = useLanguage();
  const { signIn, setActive: setSignInActive, isLoaded: signInLoaded } = useSignIn();
  const { signUp, setActive: setSignUpActive, isLoaded: signUpLoaded } = useSignUp();

  const [mode, setMode] = useState<"SIGN_IN" | "SIGN_UP">(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [code, setCode] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  if (!isOpen) return null;

  // Direct, Bulletproof Google OAuth Redirect Handler
  const handleGoogleOAuth = async () => {
    setError(null);
    setGoogleLoading(true);

    try {
      const origin = window.location.origin;
      const redirectUrl = `${origin}/sso-callback`;
      const redirectUrlComplete = `${origin}/patient/dashboard`;

      // 1. Try via active Clerk client signIn resource first
      const activeSignIn = clerk?.client?.signIn || signIn;

      if (!activeSignIn) {
        const msg = tr(
          "Clerk is still initializing. Please check NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY in .env.local.",
          "Clerk अभी इनिशियलाइज़ हो रहा है। कृपया .env.local में NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY जांचें।"
        );
        setError(msg);
        alert(msg);
        setGoogleLoading(false);
        return;
      }

      // Create the external OAuth redirect attempt directly
      const res = await activeSignIn.create({
        strategy: "oauth_google",
        redirectUrl,
        actionCompleteRedirectUrl: redirectUrlComplete,
      });

      const externalUrl =
        res?.firstFactorVerification?.externalVerificationRedirectURL;

      if (externalUrl) {
        // Force immediate browser navigation to Google OAuth
        window.location.assign(externalUrl.toString());
        return;
      }

      // Fallback to authenticateWithRedirect
      await activeSignIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl,
        redirectUrlComplete,
      });
    } catch (err: any) {
      console.error("Google OAuth Error:", err);
      const clerkErrorMsg =
        err?.errors?.[0]?.longMessage ||
        err?.errors?.[0]?.message ||
        err?.message ||
        tr("Could not start Google Sign-In.", "गूगल साइन-इन शुरू नहीं हो सका।");
      setError(clerkErrorMsg);
      alert(`${tr("Google Login Error:", "गूगल लॉग इन त्रुटि:")} ${clerkErrorMsg}`);
      setGoogleLoading(false);
    }
  };

  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signInLoaded || !signIn) return;
    setLoading(true);
    setError(null);

    try {
      const result = await signIn.create({
        identifier: email.trim(),
        password,
      });

      if (result.status === "complete") {
        await setSignInActive({ session: result.createdSessionId });
        onClose();
        router.push("/patient/dashboard");
        router.refresh();
      } else {
        setError(
          tr(
            "Additional verification required. Please check your email.",
            "अतिरिक्त सत्यापन आवश्यक है। कृपया अपना ईमेल जांचें।"
          )
        );
      }
    } catch (err: any) {
      setError(
        err?.errors?.[0]?.longMessage ||
          err?.errors?.[0]?.message ||
          tr("Invalid email or password.", "अमान्य ईमेल या पासवर्ड।")
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUpLoaded || !signUp) return;
    setLoading(true);
    setError(null);

    try {
      const nameParts = fullName.trim().split(/\s+/);
      await signUp.create({
        emailAddress: email.trim(),
        password,
        firstName: nameParts[0] || "Patient",
        lastName: nameParts.slice(1).join(" ") || "",
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err: any) {
      setError(
        err?.errors?.[0]?.longMessage ||
          err?.errors?.[0]?.message ||
          tr("Sign up failed.", "पंजीकरण विफल रहा।")
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUpLoaded || !signUp) return;
    setLoading(true);
    setError(null);

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code: code.trim(),
      });

      if (result.status === "complete") {
        await setSignUpActive({ session: result.createdSessionId });
        onClose();
        router.push("/patient/dashboard");
        router.refresh();
      } else {
        setError(
          tr(
            "Verification incomplete. Please check the 6-digit code.",
            "सत्यापन अधूरा है। कृपया 6-अंकीय कोड जांचें।"
          )
        );
      }
    } catch (err: any) {
      setError(
        err?.errors?.[0]?.longMessage ||
          err?.errors?.[0]?.message ||
          tr("Invalid verification code.", "अमान्य सत्यापन कोड।")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-slate-200 grid grid-cols-1 lg:grid-cols-12 relative">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold flex items-center justify-center transition cursor-pointer"
        >
          ✕
        </button>

        {/* Left Column: Dental Clinic Image & Branding */}
        <div className="lg:col-span-5 relative hidden lg:flex flex-col justify-between p-8 text-white bg-blue-900 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=900&q=80"
            alt={tr("Shree Sainath Dental Clinic", "श्री साईनाथ डेंटल क्लिनिक")}
            className="absolute inset-0 w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-900/80 to-blue-700/40" />

          <div className="relative z-10 space-y-2">
            <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-extrabold uppercase tracking-widest">
              🦷 {tr("Shree Sainath Dental Clinic", "श्री साईनाथ डेंटल क्लिनिक")}
            </span>
            <h3 className="text-2xl font-extrabold leading-tight">
              {tr("Dr. Nitu Rajpoot, BDS", "डॉ. नीतू राजपूत, बीडीएस")}
            </h3>
            <p className="text-xs text-blue-100">
              {tr(
                "Micro-Endodontics & Aesthetic Smile Design",
                "माइक्रो-एंडोडोंटिक्स और एस्थेटिक स्माइल डिज़ाइन"
              )}
            </p>
          </div>

          <div className="relative z-10 space-y-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15">
            <p className="text-xs text-blue-50 leading-relaxed">
              {tr(
                "Access your interactive 32-tooth digital odontogram, download prescriptions, and join Google Meet video consultations.",
                "अपने इंटरैक्टिव 32-दांत डिजिटल ओडोंटोग्राम को देखें, प्रिस्क्रिप्शन डाउनलोड करें, और गूगल मीट वीडियो परामर्श से जुड़ें।"
              )}
            </p>
            <div className="text-[11px] font-extrabold text-emerald-300">
              {tr(
                "✓ Instant WhatsApp & Google Meet Sync",
                "✓ तुरंत व्हाट्सएप और गूगल मीट सिंक"
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Pure Custom Form (No Clerk Card Box) */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center space-y-5 bg-white">
          <div className="flex items-center justify-between pr-8">
            <div>
              <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-wider block">
                {tr("Unified Clinical Portal", "एकीकृत क्लिनिकल पोर्टल")}
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                {pendingVerification
                  ? tr("Enter Email OTP", "ईमेल ओटीपी (OTP) दर्ज करें")
                  : mode === "SIGN_IN"
                  ? tr("Sign In to Clinic Portal", "क्लिनिक पोर्टल में साइन इन करें")
                  : tr("Create Patient Account", "मरीज खाता बनाएं")}
              </h2>
            </div>

            {!pendingVerification && (
              <button
                type="button"
                onClick={() => {
                  setError(null);
                  setMode(mode === "SIGN_IN" ? "SIGN_UP" : "SIGN_IN");
                }}
                className="text-xs font-extrabold text-blue-600 hover:underline cursor-pointer"
              >
                {mode === "SIGN_IN"
                  ? tr("New Patient? Register →", "नए मरीज हैं? रजिस्टर करें →")
                  : tr("Sign In →", "साइन इन करें →")}
              </button>
            )}
          </div>

          {error && (
            <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-extrabold">
              ⚠️ {error}
            </div>
          )}

          {!pendingVerification && (
            <>
              <button
                type="button"
                disabled={googleLoading}
                onClick={handleGoogleOAuth}
                className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-50 border-2 border-slate-200 text-slate-800 text-xs font-extrabold shadow-xs transition flex items-center justify-center gap-3 cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>
                  {googleLoading
                    ? tr("Connecting to Google...", "गूगल से कनेक्ट हो रहा है...")
                    : tr("Continue with Google", "गूगल के साथ जारी रखें")}
                </span>
              </button>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-slate-200" />
                <span className="text-[11px] font-bold text-slate-400 uppercase">
                  {tr("Or continue with email", "या ईमेल के साथ जारी रखें")}
                </span>
                <div className="flex-1 h-px bg-slate-200" />
              </div>
            </>
          )}

          {pendingVerification ? (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <input
                type="text"
                required
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder={tr("Enter 6-digit OTP", "6-अंकीय ओटीपी (OTP) दर्ज करें")}
                className="w-full px-4 py-3.5 text-center tracking-widest text-xl font-extrabold rounded-2xl border-2 border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-md transition cursor-pointer"
              >
                {loading
                  ? tr("Verifying OTP...", "ओटीपी सत्यापित हो रहा है...")
                  : tr("Verify & Open Portal →", "सत्यापित करें और पोर्टल खोलें →")}
              </button>
            </form>
          ) : mode === "SIGN_IN" ? (
            <form onSubmit={handleSignInSubmit} className="space-y-3.5">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">
                  {tr("Email Address", "ईमेल पता")}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">
                  {tr("Password", "पासवर्ड")}
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-md transition cursor-pointer mt-2"
              >
                {loading
                  ? tr("Signing In...", "साइन इन हो रहा है...")
                  : tr("Sign In to Portal →", "पोर्टल में साइन इन करें →")}
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignUpSubmit} className="space-y-3.5">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">
                  {tr("Full Name", "पूरा नाम")}
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={tr("Enter your full name", "अपना पूरा नाम दर्ज करें")}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">
                  {tr("Email Address", "ईमेल पता")}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">
                  {tr("Create Password", "पासवर्ड बनाएं")}
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={tr("Minimum 8 characters", "कम से कम 8 अक्षर")}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-md transition cursor-pointer mt-2"
              >
                {loading
                  ? tr("Sending Email OTP...", "ईमेल ओटीपी भेजा जा रहा है...")
                  : tr("Create Account & Verify →", "खाता बनाएं और सत्यापित करें →")}
              </button>
            </form>
          )}

          <div id="clerk-captcha" />
        </div>
      </div>
    </div>
  );
}