"use client";

import { useState, useEffect } from "react";
import { QrCode, Printer, ExternalLink, Download, CheckCircle2, Copy } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";

export default function DoctorQRCodePanel() {
  const { tr } = useLanguage();
  const [checkInUrl, setCheckInUrl] = useState("https://shreesainathdental.in/checkin-qr");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCheckInUrl(`${window.location.origin}/checkin-qr`);
    }
  }, []);

  // High-resolution QR code generated dynamically for the clinic's live domain
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(
    checkInUrl
  )}&bgcolor=ffffff&color=0c2a2a&margin=14`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(checkInUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrintStandee = () => {
    const printWindow = window.open("", "_blank", "width=600,height=800");
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>${tr(
            "Shree Sainath Dental Clinic - Reception QR Standee",
            "श्री साईनाथ डेंटल क्लिनिक - रिसेप्शन QR स्टैंडी"
          )}</title>
          <style>
            body {
              font-family: Georgia, serif;
              text-align: center;
              padding: 40px;
              color: #0c2a2a;
            }
            .card {
              border: 3px solid #0c2a2a;
              border-radius: 24px;
              padding: 40px 30px;
              max-width: 420px;
              margin: 0 auto;
            }
            .badge {
              font-family: sans-serif;
              font-size: 11px;
              font-weight: bold;
              text-transform: uppercase;
              letter-spacing: 2px;
              color: #e05a47;
            }
            h1 {
              font-size: 28px;
              margin: 10px 0 6px;
            }
            p {
              font-family: sans-serif;
              font-size: 13px;
              color: #555;
              margin-bottom: 24px;
            }
            img {
              width: 260px;
              height: 260px;
              border: 2px solid #eee;
              border-radius: 16px;
              padding: 10px;
            }
            .footer {
              margin-top: 24px;
              font-family: sans-serif;
              font-size: 12px;
              font-weight: bold;
              color: #113838;
            }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="badge">${tr(
              "Zero-Wait Reception Queue",
              "शून्य-प्रतीक्षा रिसेप्शन कतार"
            )}</div>
            <h1>${tr(
              "Shree Sainath Dental Clinic",
              "श्री साईनाथ डेंटल क्लिनिक"
            )}</h1>
            <p>${tr(
              "Scan this QR code with your phone camera upon arrival to check in or check out instantly.",
              "तुरंत चेक-इन या चेक-आउट करने के लिए क्लिनिक पहुंचने पर अपने फ़ोन कैमरे से इस QR कोड को स्कैन करें।"
            )}</p>
            <img src="${qrImageUrl}" alt="${tr(
              "Clinic Check-In QR",
              "क्लिनिक चेक-इन QR"
            )}" onload="window.print();window.close()" />
            <div class="footer">${tr(
              "Dr. Nitu Rajpoot, BDS",
              "डॉ. नीतू राजपूत, बीडीएस"
            )}</div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#e05a47]">
            <QrCode className="h-4 w-4" />
            <span>{tr("Reception Queue QR", "रिसेप्शन कतार QR")}</span>
          </div>
          <h3 className="mt-1 font-serif text-2xl font-bold text-[#0c2a2a]">
            {tr(
              "Clinic Check-In & Check-Out QR Code",
              "क्लिनिक चेक-इन और चेक-आउट QR कोड"
            )}
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-stone-500">
            {tr(
              "Print this QR standee for your reception desk or display it on a clinic tablet. When patients scan it, they can check in or check out with their phone number.",
              "अपने रिसेप्शन डेस्क के लिए इस QR स्टैंडी को प्रिंट करें या क्लिनिक टैबलेट पर प्रदर्शित करें। जब मरीज इसे स्कैन करते हैं, तो वे अपने फ़ोन नंबर के साथ चेक-इन या चेक-आउट कर सकते हैं।"
            )}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handlePrintStandee}
            className="inline-flex items-center gap-2 rounded-xl bg-[#0c2a2a] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#113838] transition cursor-pointer"
          >
            <Printer className="h-4 w-4 text-emerald-300" />
            <span>{tr("Print QR Standee", "QR स्टैंडी प्रिंट करें")}</span>
          </button>

          <a
            href={qrImageUrl}
            download="Shree-Sainath-Dental-QR.png"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-stone-300 bg-stone-50 px-4 py-2.5 text-xs font-semibold text-[#0c2a2a] hover:bg-stone-100 transition"
          >
            <Download className="h-4 w-4 text-[#e05a47]" />
            <span>{tr("Download PNG", "PNG डाउनलोड करें")}</span>
          </a>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-12 items-center">
        {/* QR Code Preview */}
        <div className="md:col-span-4 flex justify-center">
          <div className="w-48 h-48 rounded-2xl border-2 border-[#0c2a2a] p-2.5 bg-white shadow-md flex items-center justify-center">
            <img
              src={qrImageUrl}
              alt={tr(
                "Clinic Reception Check-In QR Code",
                "क्लिनिक रिसेप्शन चेक-इन QR कोड"
              )}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* How it works for the Doctor */}
        <div className="md:col-span-8 space-y-4">
          <div className="rounded-2xl bg-[#fbfaf6] p-4 border border-stone-200/80 space-y-2.5 text-xs sm:text-sm text-stone-700">
            <p className="font-bold text-[#0c2a2a]">
              {tr(
                "How this works in your clinic:",
                "यह आपके क्लिनिक में कैसे काम करता है:"
              )}
            </p>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>{tr("Step 1:", "चरण 1:")}</strong>{" "}
                {tr("Click", "ऊपर")}{" "}
                <strong>{tr("Print QR Standee", "QR स्टैंडी प्रिंट करें")}</strong>{" "}
                {tr(
                  "above and place the printout at your clinic reception desk.",
                  "पर क्लिक करें और प्रिंटआउट को अपने क्लिनिक रिसेप्शन डेस्क पर रखें।"
                )}
              </span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>{tr("Step 2:", "चरण 2:")}</strong>{" "}
                {tr(
                  "When a patient walks in, they scan this QR with their phone camera and enter their phone number to tap",
                  "जब कोई मरीज अंदर आता है, तो वह अपने फ़ोन कैमरे से इस QR को स्कैन करता है और अपना फ़ोन नंबर दर्ज करके टैप करता है"
                )}{" "}
                <strong>{tr("Check-In", "चेक-इन")}</strong>.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>{tr("Step 3:", "चरण 3:")}</strong>{" "}
                {tr(
                  "Their appointment status updates automatically in your Doctor Dashboard, and they scan the same QR to tap",
                  "उनका अपॉइंटमेंट स्टेटस आपके डॉक्टर डैशबोर्ड में अपने आप अपडेट हो जाता है, और जाते समय वे उसी QR को स्कैन करके टैप करते हैं"
                )}{" "}
                <strong>{tr("Check-Out", "चेक-आउट")}</strong>{" "}
                {tr("when leaving.", "।")}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-2 text-xs text-stone-500">
              <span>{tr("Live Scanner URL:", "लाइव स्कैनर URL:")}</span>
              <code className="rounded bg-stone-100 px-2 py-1 font-mono text-[#0c2a2a]">
                {checkInUrl}
              </code>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 rounded-lg border border-stone-200 px-3 py-1.5 text-xs font-semibold text-[#0c2a2a] hover:bg-stone-50 cursor-pointer"
              >
                <Copy className="h-3.5 w-3.5" />
                <span>
                  {copied
                    ? tr("Copied!", "कॉपी हो गया!")
                    : tr("Copy Link", "लिंक कॉपी करें")}
                </span>
              </button>

              <a
                href="/checkin-qr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-1.5 text-xs font-semibold text-emerald-900 hover:bg-emerald-100"
              >
                <span>{tr("Open Kiosk Page", "कियोस्क पेज खोलें")}</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}