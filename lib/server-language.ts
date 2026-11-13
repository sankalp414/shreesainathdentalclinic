import { cookies } from "next/headers";
import { translations, type Language } from "@/components/LanguageContext";

export async function getServerLanguage() {
  const cookieStore = await cookies();
  const raw = cookieStore.get("ssd_clinic_lang")?.value;
  const lang: Language = raw === "hi" ? "hi" : "en";

  const tr = <T,>(enValue: T, hiValue: T): T => {
    return lang === "hi" ? hiValue : enValue;
  };

  return {
    lang,
    t: translations[lang],
    tr,
  };
}