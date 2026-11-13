import Link from "next/link";
import { cookies } from "next/headers";
import {
  Award,
  CalendarDays,
  GraduationCap,
  Heart,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  ArrowRight,
} from "lucide-react";
import doctorImage from "@/assets/images/doctorImage.jpeg";

export const dynamic = "force-dynamic";

export default async function DoctorProfilePage() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("ssd_clinic_lang")?.value === "hi" ? "hi" : "en";
  const tr = <T,>(enValue: T, hiValue: T): T =>
    lang === "hi" ? hiValue : enValue;

  const CREDENTIALS = [
    {
      icon: GraduationCap,
      title: tr(
        "Bachelor of Dental Surgery (BDS)",
        "बैचलर ऑफ डेंटल सर्जरी (BDS)"
      ),
      subtitle: tr(
        "Registered Dental Surgeon • State Dental Council",
        "पंजीकृत दंत चिकित्सक एवं सर्जन • स्टेट डेंटल काउंसिल"
      ),
    },
    {
      icon: Award,
      title: tr(
        "15+ Years Clinical Experience",
        "15+ वर्षों का क्लिनिकल अनुभव"
      ),
      subtitle: tr(
        "Thousands of painless single-sitting root canals & smile restorations",
        "हजारों दर्दरहित सिंगल-सिटिंग रूट कैनाल और मुस्कान पुनर्निर्माण"
      ),
    },
    {
      icon: ShieldCheck,
      title: tr("Advanced Rotary Endodontics", "एडवांस्ड रोटरी एंडोडोंटिक्स"),
      subtitle: tr(
        "Apex-locator guided precision & digital RVG low-radiation imaging",
        "एपेक्स-लोकेटर निर्देशित सटीकता और डिजिटल RVG इमेजिंग"
      ),
    },
    {
      icon: Heart,
      title: tr(
        "Anxiety-Free Family Dentistry",
        "तनाव-मुक्त पारिवारिक दंत चिकित्सा"
      ),
      subtitle: tr(
        "Dedicated 1-on-1 unhurried consultations for children, adults, and seniors",
        "बच्चों, वयस्कों और वरिष्ठ नागरिकों के लिए शांत और व्यक्तिगत परामर्श"
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-[#f7f5f0] pt-28 pb-20 text-slate-900">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="grid items-center gap-12 rounded-[2.5rem] bg-white p-8 sm:p-14 shadow-xl border border-slate-200/80 lg:grid-cols-12">
          <div className="lg:col-span-5 relative">
            <div className="overflow-hidden rounded-3xl bg-[#1b535d] shadow-2xl">
              <img
                src={doctorImage.src}
                alt="Dr. Nitu Rajpoot, BDS"
                className="aspect-[4/5] w-full object-cover object-top"
              />
            </div>
            <div className="mt-4 flex items-center justify-between rounded-2xl bg-[#0d1f27] px-5 py-4 text-white">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-teal-300">
                  {tr("Principal Dental Surgeon", "प्रमुख दंत चिकित्सक")}
                </p>
                <p className="text-sm font-semibold text-white/90 mt-0.5">
                  {tr(
                    "Shree Sainath Dental Clinic, Bilaspur",
                    "श्री साईनाथ डेंटल क्लिनिक, बिलासपुर"
                  )}
                </p>
              </div>
              <Stethoscope className="size-6 text-[#f06449]" />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#d7f0ea]/70 px-4 py-1.5 text-xs font-bold text-[#1b535d]">
              <Sparkles className="size-3.5" />
              <span>
                {tr(
                  "Founder & Lead Clinician",
                  "संस्थापक और मुख्य दंत चिकित्सक"
                )}
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl font-normal tracking-tight text-slate-900 leading-[1.05]">
              {tr("Dr. Nitu Rajpoot, BDS", "डॉ. नीतू राजपूत, बीडीएस")}
            </h1>

            <p className="text-base sm:text-lg leading-relaxed text-slate-600">
              {tr(
                "At Shree Sainath Dental Clinic, every patient is treated personally by Dr. Nitu Rajpoot from the very first diagnosis to the final smile check. Her philosophy combines conservative tooth preservation with modern, painless clinical protocols.",
                "श्री साईनाथ डेंटल क्लिनिक में, पहले परामर्श से लेकर अंतिम उपचार तक हर मरीज की देखभाल स्वयं डॉ. नीतू राजपूत द्वारा की जाती है। उनका उद्देश्य प्राकृतिक दांतों को सुरक्षित रखते हुए आधुनिक और दर्दरहित इलाज प्रदान करना है।"
              )}
            </p>

            <div className="grid gap-4 sm:grid-cols-2 pt-2">
              {CREDENTIALS.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-slate-200/80 bg-[#fcfbf8] p-5 space-y-2"
                  >
                    <div className="inline-flex size-9 items-center justify-center rounded-xl bg-[#1b535d] text-white">
                      <IconComponent className="size-4" />
                    </div>
                    <h2 className="text-sm font-bold text-slate-900">
                      {item.title}
                    </h2>
                    <p className="text-xs leading-relaxed text-slate-600">
                      {item.subtitle}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/patient/book"
                className="inline-flex items-center gap-2 rounded-full bg-[#1b535d] px-7 py-3.5 text-sm font-bold text-white shadow-lg hover:bg-[#14424a] transition"
              >
                <CalendarDays className="size-4" />
                <span>
                  {tr(
                    "Book Appointment with Dr. Nitu",
                    "डॉ. नीतू के साथ अपॉइंटमेंट बुक करें"
                  )}
                </span>
                <ArrowRight className="size-4" />
              </Link>

              <Link
                href="/doctor/dashboard"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-800 hover:bg-slate-50 transition"
              >
                <span>
                  {tr("Doctor Command Center", "डॉक्टर कमांड सेंटर")}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}