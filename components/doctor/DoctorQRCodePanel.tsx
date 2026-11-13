"use client";

import { useState, useEffect } from "react";
import { QrCode, Printer, ExternalLink, Download, CheckCircle2, Copy } from "lucide-react";

export default function DoctorQRCodePanel() {
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
          <title>Shree Sainath Dental Clinic - Reception QR Standee</title>
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
            <div class="badge">Zero-Wait Reception Queue</div>
            <h1>Shree Sainath Dental Clinic</h1>
            <p>Scan this QR code with your phone camera upon arrival to check in or check out instantly.</p>
            <img src="${qrImageUrl}" alt="Clinic Check-In QR" onload="window.print();window.close()" />
            <div class="footer">Dr. Nitu Rajpoot, BDS</div>
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
            <span>Reception Queue QR</span>
          </div>
          <h3 className="mt-1 font-serif text-2xl font-bold text-[#0c2a2a]">
            Clinic Check-In & Check-Out QR Code
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-stone-500">
            Print this QR standee for your reception desk or display it on a clinic tablet. When patients scan it, they can check in or check out with their phone number.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handlePrintStandee}
            className="inline-flex items-center gap-2 rounded-xl bg-[#0c2a2a] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#113838] transition cursor-pointer"
          >
            <Printer className="h-4 w-4 text-emerald-300" />
            <span>Print QR Standee</span>
          </button>

          <a
            href={qrImageUrl}
            download="Shree-Sainath-Dental-QR.png"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-stone-300 bg-stone-50 px-4 py-2.5 text-xs font-semibold text-[#0c2a2a] hover:bg-stone-100 transition"
          >
            <Download className="h-4 w-4 text-[#e05a47]" />
            <span>Download PNG</span>
          </a>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-12 items-center">
        {/* QR Code Preview */}
        <div className="md:col-span-4 flex justify-center">
          <div className="w-48 h-48 rounded-2xl border-2 border-[#0c2a2a] p-2.5 bg-white shadow-md flex items-center justify-center">
            <img
              src={qrImageUrl}
              alt="Clinic Reception Check-In QR Code"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* How it works for the Doctor */}
        <div className="md:col-span-8 space-y-4">
          <div className="rounded-2xl bg-[#fbfaf6] p-4 border border-stone-200/80 space-y-2.5 text-xs sm:text-sm text-stone-700">
            <p className="font-bold text-[#0c2a2a]">
              How this works in your clinic:
            </p>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Step 1:</strong> Click <strong>Print QR Standee</strong> above and place the printout at your clinic reception desk.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Step 2:</strong> When a patient walks in, they scan this QR with their phone camera and enter their phone number to tap <strong>Check-In</strong>.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Step 3:</strong> Their appointment status updates automatically in your Doctor Dashboard, and they scan the same QR to tap <strong>Check-Out</strong> when leaving.
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-2 text-xs text-stone-500">
              <span>Live Scanner URL:</span>
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
                <span>{copied ? "Copied!" : "Copy Link"}</span>
              </button>

              <a
                href="/checkin-qr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-1.5 text-xs font-semibold text-emerald-900 hover:bg-emerald-100"
              >
                <span>Open Kiosk Page</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}