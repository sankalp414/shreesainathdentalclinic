import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import  Navbar  from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LanguageProvider } from "@/components/LanguageContext";
import { getServerLanguage } from "@/lib/server-language";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shree Sainath Dental Clinic | Microscopic & Restorative Dentistry",
  description:
    "Book in-clinic dental treatments or online video consultations at Shree Sainath Dental Clinic.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { lang } = await getServerLanguage();
  return (
    <ClerkProvider>
      <html
        lang={lang}
        className={`${inter.variable} ${playfair.variable}`}
        suppressHydrationWarning
      >
        <body className="min-h-screen bg-brand-bg text-brand-text antialiased">

          <LanguageProvider initialLang={lang}>
          <Navbar/>
          {children}
        <Footer/>
          </LanguageProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}