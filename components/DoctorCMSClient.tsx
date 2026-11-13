"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Image as ImageIcon,
  Minus,
  RotateCcw,
  Eye,
  Edit3,
  Code,
  Type,
} from "lucide-react";
import {
  updateClinicScheduleConfig,
  type ClinicScheduleConfig,
  type ClosedDateEntry,
  type ClosureScope,
} from "@/app/actions/clinic-schedule";
import { saveBlogPost, deleteBlogPost } from "@/app/actions/clinic-cms";
import { useLanguage } from "@/components/LanguageContext";

// Generate full 24-hour clock options in 30-minute intervals (12:00 AM to 11:30 PM)
const FULL_24_HOUR_TIME_OPTIONS: string[] = Array.from(
  { length: 48 },
  (_, index) => {
    const totalMinutes = index * 30;
    const hours24 = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const period = hours24 >= 12 ? "PM" : "AM";
    const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
    return `${String(hours12).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )} ${period}`;
  }
);

// Helper to strip HTML/Markdown tags for clean card previews & auto-excerpts
function stripFormattingToPlainText(input?: string | null): string {
  if (!input) return "";
  return input
    .replace(/<[^>]*>/g, " ")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/^[-*]\s+/gm, "")
    .replace(/\s+/g, " ")
    .trim();
}

// Converts legacy plain-text/Markdown blog content into HTML when opened in the visual editor
function normalizeToEditorHtml(raw?: string | null): string {
  if (!raw) return "";
  if (/<[a-z][\s\S]*>/i.test(raw)) return raw;

  const lines = raw.split("\n");
  const htmlParts: string[] = [];

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    const withBold = line.replace(
      /\*\*(.*?)\*\*/g,
      "<strong>$1</strong>"
    );

    if (withBold.startsWith("### ")) {
      htmlParts.push(`<h3>${withBold.replace(/^###\s+/, "")}</h3>`);
    } else if (withBold.startsWith("## ")) {
      htmlParts.push(`<h2>${withBold.replace(/^##\s+/, "")}</h2>`);
    } else if (withBold.startsWith("# ")) {
      htmlParts.push(`<h1>${withBold.replace(/^#\s+/, "")}</h1>`);
    } else if (withBold.startsWith("- ") || withBold.startsWith("* ")) {
      htmlParts.push(`<ul><li>${withBold.replace(/^[-*]\s+/, "")}</li></ul>`);
    } else {
      htmlParts.push(`<p>${withBold}</p>`);
    }
  }

  return htmlParts.join("");
}

export default function DoctorCMSClient({
  initialBlogs = [],
  initialSchedule,
}: {
  initialBlogs: any[];
  initialSchedule: ClinicScheduleConfig;
}) {
  const router = useRouter();
  const { tr } = useLanguage();

  const DAYS_OF_WEEK = [
    { label: tr("Sun", "रवि"), value: 0 },
    { label: tr("Mon", "सोम"), value: 1 },
    { label: tr("Tue", "मंगल"), value: 2 },
    { label: tr("Wed", "बुध"), value: 3 },
    { label: tr("Thu", "गुरु"), value: 4 },
    { label: tr("Fri", "शुक्र"), value: 5 },
    { label: tr("Sat", "शनि"), value: 6 },
  ];

  // Schedule State
  const [schedule, setSchedule] = useState<ClinicScheduleConfig>(initialSchedule);
  const [savingSchedule, setSavingSchedule] = useState(false);
  const [scheduleToast, setScheduleToast] = useState<string | null>(null);

  // Holiday / Closed Date State
  const [newClosedDate, setNewClosedDate] = useState("");
  const [newClosedScope, setNewClosedScope] = useState<ClosureScope>("BOTH");
  const [newClosedReason, setNewClosedReason] = useState("");

  // Blog Modal State
  const [blogs, setBlogs] = useState<any[]>(initialBlogs);
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<any | null>(null);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogCategory, setBlogCategory] = useState("Endodontics & RCT");
  const [blogReadTime, setBlogReadTime] = useState("4 Min Read");
  const [blogCoverImage, setBlogCoverImage] = useState("");
  const [blogExcerpt, setBlogExcerpt] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [savingBlog, setSavingBlog] = useState(false);
  const [blogError, setBlogError] = useState<string | null>(null);
  const [blogToast, setBlogToast] = useState<string | null>(null);

  // Rich Text Editor State
  const editorRef = useRef<HTMLDivElement>(null);
  const [editorMode, setEditorMode] = useState<"VISUAL" | "PREVIEW" | "HTML">(
    "VISUAL"
  );

  // Keep local blogs state synced if server props refresh
  useEffect(() => {
    setBlogs(initialBlogs);
  }, [initialBlogs]);

  // Sync content into visual editor when modal opens or switches back to VISUAL mode
  useEffect(() => {
    if (isBlogModalOpen && editorMode === "VISUAL" && editorRef.current) {
      if (editorRef.current.innerHTML !== blogContent) {
        editorRef.current.innerHTML = blogContent || "";
      }
    }
  }, [isBlogModalOpen, editorMode, editingBlog]);

  const handleEditorInput = () => {
    if (editorRef.current) {
      setBlogContent(editorRef.current.innerHTML);
    }
  };

  const execEditorCommand = (command: string, arg: string = "") => {
    if (editorMode !== "VISUAL") setEditorMode("VISUAL");
    setTimeout(() => {
      editorRef.current?.focus();
      document.execCommand(command, false, arg);
      handleEditorInput();
    }, 0);
  };

  const handleInsertLink = () => {
    const url = window.prompt(
      tr(
        "Enter the full URL (e.g. https://shreesainathdental.in/patient/book):",
        "पूरा URL दर्ज करें (उदा. https://shreesainathdental.in/patient/book):"
      ),
      "https://"
    );
    if (!url) return;
    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 0) {
      execEditorCommand("createLink", url);
    } else {
      const linkText =
        window.prompt(
          tr("Enter clickable text for this link:", "इस लिंक के लिए टेक्स्ट दर्ज करें:"),
          tr("Book a Consultation", "परामर्श बुक करें")
        ) || url;
      execEditorCommand(
        "insertHTML",
        `<a href="${url}" target="_blank" rel="noopener noreferrer">${linkText}</a>`
      );
    }
  };

  const handleInsertInlineImage = () => {
    const imgUrl = window.prompt(
      tr(
        "Enter Image URL to insert inside the article:",
        "लेख के अंदर जोड़ने के लिए इमेज URL दर्ज करें:"
      )
    );
    if (!imgUrl) return;
    const caption =
      window.prompt(
        tr("Enter optional image caption:", "वैकल्पिक इमेज कैप्शन दर्ज करें:"),
        tr("Clinical illustration", "क्लिनिकल चित्रण")
      ) || "";
    execEditorCommand(
      "insertHTML",
      `<figure class="my-4"><img src="${imgUrl}" alt="${caption}" class="rounded-2xl max-h-96 w-full object-cover border border-slate-200" />${
        caption
          ? `<figcaption class="text-xs text-slate-500 mt-1.5 text-center">${caption}</figcaption>`
          : ""
      }</figure><p><br/></p>`
    );
  };

  const handleInsertCallout = () => {
    execEditorCommand(
      "insertHTML",
      `<blockquote><strong>${tr(
        "Clinical Tip from Dr. Nitu:",
        "डॉ. नीतू का क्लिनिकल सुझाव:"
      )}</strong> ${tr(
        "Add your key takeaway or post-care instruction here.",
        "यहाँ अपना मुख्य सुझाव या उपचार के बाद की देखभाल का निर्देश लिखें।"
      )}</blockquote><p><br/></p>`
    );
  };

  const toggleWeeklyOffDay = (dayIndex: number) => {
    setSchedule((prev) => {
      const exists = prev.weeklyOffDays.includes(dayIndex);
      return {
        ...prev,
        weeklyOffDays: exists
          ? prev.weeklyOffDays.filter((d) => d !== dayIndex)
          : [...prev.weeklyOffDays, dayIndex],
      };
    });
  };

  const handleAddClosedDate = () => {
    if (!newClosedDate) return;
    const entry: ClosedDateEntry = {
      date: newClosedDate,
      scope: newClosedScope,
      reason: newClosedReason.trim() || tr("Clinic Holiday", "क्लिनिक अवकाश"),
    };
    setSchedule((prev) => ({
      ...prev,
      closedDates: [
        ...prev.closedDates.filter((d) => d.date !== newClosedDate),
        entry,
      ],
    }));
    setNewClosedDate("");
    setNewClosedReason("");
  };

  const handleRemoveClosedDate = (dateStr: string) => {
    setSchedule((prev) => ({
      ...prev,
      closedDates: prev.closedDates.filter((d) => d.date !== dateStr),
    }));
  };

  const handleSaveSchedule = async () => {
    setSavingSchedule(true);
    setScheduleToast(null);
    const res = await updateClinicScheduleConfig(schedule);
    setSavingSchedule(false);
    if (res.success) {
      setScheduleToast(
        tr(
          "✓ 24-Hour Clinic Operating Schedule & Time Slots updated across the portal!",
          "✓ 24-घंटे का क्लिनिक समय और टाइम स्लॉट पूरे पोर्टल पर अपडेट हो गए हैं!"
        )
      );
      router.refresh();
      setTimeout(() => setScheduleToast(null), 4000);
    }
  };

  const openNewBlogModal = () => {
    setEditingBlog(null);
    setBlogTitle("");
    setBlogCategory("Endodontics & RCT");
    setBlogReadTime("4 Min Read");
    setBlogCoverImage("");
    setBlogExcerpt("");
    setBlogContent("");
    setBlogError(null);
    setEditorMode("VISUAL");
    setIsBlogModalOpen(true);
  };

  const openEditBlogModal = (post: any) => {
    const normalizedHtml = normalizeToEditorHtml(post.content || "");
    setEditingBlog(post);
    setBlogTitle(post.title || "");
    setBlogCategory(post.category || "Endodontics & RCT");
    setBlogReadTime(post.readTime || "4 Min Read");
    setBlogCoverImage(post.coverImage || "");
    setBlogExcerpt(stripFormattingToPlainText(post.excerpt || ""));
    setBlogContent(normalizedHtml);
    setBlogError(null);
    setEditorMode("VISUAL");
    setIsBlogModalOpen(true);
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    setBlogError(null);

    // Always read live HTML directly from the visual editor DOM if in VISUAL mode
    const liveHtmlContent =
      editorMode === "VISUAL" && editorRef.current
        ? editorRef.current.innerHTML
        : blogContent;

    const cleanTextCheck = stripFormattingToPlainText(liveHtmlContent);

    if (!blogTitle.trim()) {
      setBlogError(
        tr("Please enter an Article Title.", "कृपया लेख का शीर्षक दर्ज करें।")
      );
      return;
    }

    if (!cleanTextCheck) {
      setBlogError(
        tr(
          "Please write some article content before publishing.",
          "कृपया प्रकाशित करने से पहले कुछ लेख सामग्री लिखें।"
        )
      );
      return;
    }

    setSavingBlog(true);
    const cleanExcerpt =
      blogExcerpt.trim() ||
      `${cleanTextCheck.slice(0, 150)}${
        cleanTextCheck.length > 150 ? "..." : ""
      }`;

    try {
      const res: any = await saveBlogPost({
        id: editingBlog?.id,
        title: blogTitle.trim(),
        category: blogCategory,
        readTime: blogReadTime,
        coverImage: blogCoverImage.trim() || undefined,
        excerpt: cleanExcerpt,
        content: liveHtmlContent,
        isPublished: true,
      });

      setSavingBlog(false);

      if (res?.success) {
        if (res.post) {
          const savedPost = res.post;
          setBlogs((prev) => {
            const exists = prev.some((b) => b.id === savedPost.id);
            return exists
              ? prev.map((b) => (b.id === savedPost.id ? savedPost : b))
              : [savedPost, ...prev];
          });
        }
        setIsBlogModalOpen(false);
        setBlogToast(
          tr(
            "✓ Dental article saved to Neon Database and published live!",
            "✓ दंत स्वास्थ्य लेख डेटाबेस में सहेजा गया और लाइव प्रकाशित हो गया!"
          )
        );
        router.refresh();
        setTimeout(() => setBlogToast(null), 4000);
      } else {
        setBlogError(
          res?.error ||
            tr(
              "Failed to save article to database. Please try again.",
              "लेख को डेटाबेस में सहेजने में विफल। कृपया पुनः प्रयास करें।"
            )
        );
      }
    } catch (err: any) {
      setSavingBlog(false);
      setBlogError(
        err?.message ||
          tr(
            "Unexpected error while saving blog post.",
            "ब्लॉग पोस्ट सहेजते समय अप्रत्याशित त्रुटि हुई।"
          )
      );
    }
  };

  const handleDeleteBlog = async (id: number) => {
    await deleteBlogPost(id);
    setBlogs((prev) => prev.filter((b) => b.id !== id));
    router.refresh();
  };

  return (
    <div className="space-y-8">
      {/* 24-Hour Clinic Schedule & Time Slot Control Center */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-blue-100 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[11px] font-extrabold uppercase tracking-wider">
              ⏰{" "}
              {tr(
                "24-Hour Clinic Operating Timings & Slot Engine",
                "24-घंटे क्लिनिक संचालन समय और स्लॉट इंजन"
              )}
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">
              {tr(
                "Clinic Opening, Closing & Break Hours (24-Hr Selection)",
                "क्लिनिक खुलने, बंद होने और ब्रेक का समय (24-घंटे चयन)"
              )}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {tr(
                "Choose any opening and closing time across 24 hours (`12:00 AM` – `11:30 PM`). Patient booking slots auto-regenerate immediately.",
                "24 घंटों (`12:00 AM` – `11:30 PM`) में से कोई भी खुलने और बंद होने का समय चुनें। मरीज बुकिंग स्लॉट तुरंत अपने आप अपडेट हो जाएंगे।"
              )}
            </p>
          </div>

          <button
            type="button"
            disabled={savingSchedule}
            onClick={handleSaveSchedule}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-extrabold shadow-md shadow-blue-600/20 transition cursor-pointer shrink-0"
          >
            {savingSchedule
              ? tr("Syncing 24-Hr Slots...", "24-घंटे के स्लॉट सिंक हो रहे हैं...")
              : tr(
                  "✓ Save 24-Hr Schedule & Regenerate Slots",
                  "✓ 24-घंटे का समय सहेजें और स्लॉट अपडेट करें"
                )}
          </button>
        </div>

        {scheduleToast && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-extrabold">
            {scheduleToast}
          </div>
        )}

        {/* 24-Hour Dropdown Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-1.5">
            <label className="block text-[11px] font-extrabold text-blue-900 uppercase">
              🌅 {tr("Clinic Start Time (24-Hr)", "क्लिनिक खुलने का समय (24-घंटे)")}
            </label>
            <select
              value={schedule.startTime}
              onChange={(e) =>
                setSchedule({ ...schedule, startTime: e.target.value })
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-blue-200 text-xs font-extrabold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              {FULL_24_HOUR_TIME_OPTIONS.map((t) => (
                <option key={`start-${t}`} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-1.5">
            <label className="block text-[11px] font-extrabold text-blue-900 uppercase">
              🌙 {tr("Clinic Closing Time (24-Hr)", "क्लिनिक बंद होने का समय (24-घंटे)")}
            </label>
            <select
              value={schedule.endTime}
              onChange={(e) =>
                setSchedule({ ...schedule, endTime: e.target.value })
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-blue-200 text-xs font-extrabold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              {FULL_24_HOUR_TIME_OPTIONS.map((t) => (
                <option key={`end-${t}`} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <label className="block text-[11px] font-extrabold text-slate-700 uppercase">
              ☕ {tr("Break / Lunch Start", "ब्रेक / लंच शुरू")}
            </label>
            <select
              value={schedule.lunchStart}
              onChange={(e) =>
                setSchedule({ ...schedule, lunchStart: e.target.value })
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-extrabold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              {FULL_24_HOUR_TIME_OPTIONS.map((t) => (
                <option key={`lstart-${t}`} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <label className="block text-[11px] font-extrabold text-slate-700 uppercase">
              ⚡ {tr("Break / Lunch End", "ब्रेक / लंच समाप्त")}
            </label>
            <select
              value={schedule.lunchEnd}
              onChange={(e) =>
                setSchedule({ ...schedule, lunchEnd: e.target.value })
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-extrabold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              {FULL_24_HOUR_TIME_OPTIONS.map((t) => (
                <option key={`lend-${t}`} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <label className="block text-[11px] font-extrabold text-slate-700 uppercase">
              ⏱️ {tr("Slot Duration", "स्लॉट की अवधि")}
            </label>
            <select
              value={schedule.slotDurationMinutes}
              onChange={(e) =>
                setSchedule({
                  ...schedule,
                  slotDurationMinutes: Number(e.target.value),
                })
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-extrabold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value={15}>{tr("15 Minutes", "15 मिनट")}</option>
              <option value={30}>{tr("30 Minutes", "30 मिनट")}</option>
              <option value={45}>{tr("45 Minutes", "45 मिनट")}</option>
              <option value={60}>{tr("60 Minutes (1 Hr)", "60 मिनट (1 घंटा)")}</option>
            </select>
          </div>
        </div>

        {/* Weekly Off Days & Consultation Mode */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
          <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-3">
            <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block">
              {tr("Weekly Off Days", "साप्ताहिक अवकाश के दिन")}
            </span>
            <div className="flex flex-wrap gap-2">
              {DAYS_OF_WEEK.map((d) => {
                const isOff = schedule.weeklyOffDays.includes(d.value);
                return (
                  <button
                    key={d.value}
                    type="button"
                    onClick={() => toggleWeeklyOffDay(d.value)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-extrabold border transition cursor-pointer ${
                      isOff
                        ? "bg-red-600 text-white border-red-600 shadow-xs"
                        : "bg-white text-slate-700 border-slate-200 hover:border-blue-300"
                    }`}
                  >
                    {d.label} {isOff ? tr("(Closed)", "(बंद)") : ""}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-3">
            <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block">
              {tr("Holiday / Specific Date Closures", "अवकाश / विशेष तारीख को बंद")}
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <input
                type="date"
                value={newClosedDate}
                onChange={(e) => setNewClosedDate(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold"
              />
              <select
                value={newClosedScope}
                onChange={(e) =>
                  setNewClosedScope(e.target.value as ClosureScope)
                }
                className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold"
              >
                <option value="BOTH">
                  {tr("Close Both (In-Clinic & Video)", "दोनों बंद करें (क्लिनिक और वीडियो)")}
                </option>
                <option value="IN_CLINIC_ONLY">
                  {tr(
                    "Close In-Clinic Only (Keep Video Open)",
                    "केवल क्लिनिक बंद करें (वीडियो चालू रखें)"
                  )}
                </option>
              </select>
              <input
                type="text"
                value={newClosedReason}
                onChange={(e) => setNewClosedReason(e.target.value)}
                placeholder={tr("Reason (e.g. Conference)", "कारण (उदा. कॉन्फ्रेंस)")}
                className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs flex-1 min-w-[140px]"
              />
              <button
                type="button"
                onClick={handleAddClosedDate}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold cursor-pointer"
              >
                {tr("+ Add Date", "+ तारीख जोड़ें")}
              </button>
            </div>

            {schedule.closedDates.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {schedule.closedDates.map((cd) => (
                  <span
                    key={cd.date}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-800 text-[11px] font-bold"
                  >
                    {cd.date} ({cd.reason || tr("Closed", "बंद")})
                    <button
                      type="button"
                      onClick={() => handleRemoveClosedDate(cd.date)}
                      className="text-red-600 hover:text-red-900 font-extrabold cursor-pointer"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dental Blog Publishing Studio */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-blue-100 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[11px] font-extrabold uppercase tracking-wider">
              ✍️{" "}
              {tr(
                "Patient Education & Blog Studio",
                "मरीज शिक्षा और ब्लॉग स्टूडियो"
              )}
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 mt-1.5">
              {tr("Published Dental Articles", "प्रकाशित दंत स्वास्थ्य लेख")} ({blogs.length})
            </h2>
          </div>

          <button
            type="button"
            onClick={openNewBlogModal}
            className="px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-xs transition cursor-pointer"
          >
            {tr("+ Write New Dental Blog", "+ नया डेंटल ब्लॉग लिखें")}
          </button>
        </div>

        {blogToast && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-extrabold">
            {blogToast}
          </div>
        )}

        {blogs.length === 0 ? (
          <p className="text-xs text-slate-500 py-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            {tr("No articles published yet.", "अभी तक कोई लेख प्रकाशित नहीं हुआ है।")}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {blogs.map((b) => (
              <div
                key={b.id || b.slug}
                className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200 flex flex-col justify-between gap-4"
              >
                <div className="space-y-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-extrabold">
                    {b.category}
                  </span>
                  <h3 className="text-sm font-extrabold text-slate-900">
                    {stripFormattingToPlainText(b.title)}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {stripFormattingToPlainText(b.excerpt || b.content)}
                  </p>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200/60">
                  <button
                    type="button"
                    onClick={() => openEditBlogModal(b)}
                    className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:border-blue-300 cursor-pointer"
                  >
                    {tr("Edit", "संपादित करें")}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteBlog(b.id)}
                    className="px-3 py-1.5 rounded-xl bg-red-50 text-red-600 text-xs font-bold hover:bg-red-100 cursor-pointer"
                  >
                    {tr("Delete", "हटाएं")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upgraded Rich-Text Blog Modal */}
      {isBlogModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <form
            onSubmit={handleSaveBlog}
            className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-4 my-8 max-h-[92vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 block">
                  {tr("Rich-Text Clinical Publisher", "रिच-टेक्स्ट क्लिनिकल पब्लिशर")}
                </span>
                <h3 className="text-lg font-extrabold text-slate-900">
                  {editingBlog
                    ? tr("Edit Clinical Article", "क्लिनिकल लेख संपादित करें")
                    : tr("Publish New Article", "नया लेख प्रकाशित करें")}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsBlogModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-extrabold text-lg flex items-center justify-center cursor-pointer"
              >
                ×
              </button>
            </div>

            {blogError && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold">
                {blogError}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                required
                value={blogTitle}
                onChange={(e) => setBlogTitle(e.target.value)}
                placeholder={tr(
                  "Article Title (e.g. Why Single-Sitting Root Canal Is Painless)...",
                  "लेख का शीर्षक (उदा. सिंगल-सिटिंग रूट कैनाल दर्दरहित क्यों है)..."
                )}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold sm:col-span-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                value={blogCategory}
                onChange={(e) => setBlogCategory(e.target.value)}
                placeholder={tr(
                  "Category (e.g. Endodontics & RCT)",
                  "श्रेणी (उदा. एंडोडोंटिक्स और आरसीटी)"
                )}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                value={blogReadTime}
                onChange={(e) => setBlogReadTime(e.target.value)}
                placeholder={tr("Read Time (e.g. 4 Min Read)", "पढ़ने का समय (उदा. 4 मिनट)")}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="url"
                value={blogCoverImage}
                onChange={(e) => setBlogCoverImage(e.target.value)}
                placeholder={tr(
                  "Cover Image URL (optional https://...)",
                  "कवर इमेज URL (वैकल्पिक https://...)"
                )}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <textarea
              rows={2}
              value={blogExcerpt}
              onChange={(e) => setBlogExcerpt(e.target.value)}
              placeholder={tr(
                "Short summary for blog card (leave blank to auto-generate from article)...",
                "ब्लॉग कार्ड के लिए संक्षिप्त सारांश (लेख से स्वतः बनाने के लिए खाली छोड़ दें)..."
              )}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Visual Rich-Text Toolbar & Editor */}
            <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/15 transition">
              {/* Formatting Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-slate-50 px-3 py-2">
                <div className="flex flex-wrap items-center gap-1">
                  <button
                    type="button"
                    onClick={() => execEditorCommand("formatBlock", "P")}
                    title={tr("Normal Paragraph", "सामान्य पैराग्राफ")}
                    className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-200/80 transition cursor-pointer"
                  >
                    <Type className="w-3.5 h-3.5" />
                    <span>{tr("Para", "पैरा")}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => execEditorCommand("formatBlock", "H1")}
                    title={tr("Heading 1 (Large)", "शीर्षक 1 (बड़ा)")}
                    className="inline-flex items-center gap-0.5 rounded-lg px-2 py-1.5 text-xs font-extrabold text-slate-800 hover:bg-slate-200/80 transition cursor-pointer"
                  >
                    <Heading1 className="w-4 h-4" />
                    <span>H1</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => execEditorCommand("formatBlock", "H2")}
                    title={tr("Heading 2 (Section)", "शीर्षक 2 (अनुभाग)")}
                    className="inline-flex items-center gap-0.5 rounded-lg px-2 py-1.5 text-xs font-extrabold text-slate-800 hover:bg-slate-200/80 transition cursor-pointer"
                  >
                    <Heading2 className="w-4 h-4" />
                    <span>H2</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => execEditorCommand("formatBlock", "H3")}
                    title={tr("Heading 3 (Subheading)", "शीर्षक 3 (उपशीर्षक)")}
                    className="inline-flex items-center gap-0.5 rounded-lg px-2 py-1.5 text-xs font-extrabold text-slate-800 hover:bg-slate-200/80 transition cursor-pointer"
                  >
                    <Heading3 className="w-4 h-4" />
                    <span>H3</span>
                  </button>

                  <div className="h-4 w-px bg-slate-300 mx-1" />

                  <button
                    type="button"
                    onClick={() => execEditorCommand("bold")}
                    title={tr("Bold", "बोल्ड")}
                    className="rounded-lg p-1.5 text-slate-700 hover:bg-slate-200/80 transition cursor-pointer"
                  >
                    <Bold className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => execEditorCommand("italic")}
                    title={tr("Italic", "इटैलिक")}
                    className="rounded-lg p-1.5 text-slate-700 hover:bg-slate-200/80 transition cursor-pointer"
                  >
                    <Italic className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => execEditorCommand("underline")}
                    title={tr("Underline", "अंडरलाइन")}
                    className="rounded-lg p-1.5 text-slate-700 hover:bg-slate-200/80 transition cursor-pointer"
                  >
                    <Underline className="w-4 h-4" />
                  </button>

                  <div className="h-4 w-px bg-slate-300 mx-1" />

                  <button
                    type="button"
                    onClick={() => execEditorCommand("insertUnorderedList")}
                    title={tr("Bullet List", "बुलेट सूची")}
                    className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200/80 transition cursor-pointer"
                  >
                    <List className="w-4 h-4" />
                    <span>{tr("Bullets", "बुलेट्स")}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => execEditorCommand("insertOrderedList")}
                    title={tr("Numbered List", "क्रमांकित सूची")}
                    className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200/80 transition cursor-pointer"
                  >
                    <ListOrdered className="w-4 h-4" />
                    <span>{tr("Numbers", "नंबर")}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleInsertCallout}
                    title={tr("Insert Highlight Callout", "हाइलाइट कॉलआउट जोड़ें")}
                    className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 transition cursor-pointer"
                  >
                    <Quote className="w-3.5 h-3.5" />
                    <span>{tr("Callout", "कॉलआउट")}</span>
                  </button>

                  <div className="h-4 w-px bg-slate-300 mx-1" />

                  <button
                    type="button"
                    onClick={handleInsertLink}
                    title={tr("Insert Clickable Link", "लिंक जोड़ें")}
                    className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200/80 transition cursor-pointer"
                  >
                    <LinkIcon className="w-3.5 h-3.5 text-blue-600" />
                    <span>{tr("Link", "लिंक")}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleInsertInlineImage}
                    title={tr("Insert Image in Article", "लेख में इमेज जोड़ें")}
                    className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200/80 transition cursor-pointer"
                  >
                    <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{tr("Image", "इमेज")}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => execEditorCommand("insertHorizontalRule")}
                    title={tr("Horizontal Divider", "क्षैतिज विभाजक रेखा")}
                    className="rounded-lg p-1.5 text-slate-700 hover:bg-slate-200/80 transition cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => execEditorCommand("removeFormat")}
                    title={tr("Clear Formatting", "फ़ॉर्मेटिंग साफ़ करें")}
                    className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-200/80 transition cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Mode Switcher */}
                <div className="inline-flex rounded-xl bg-slate-200/80 p-0.5 text-[11px] font-bold">
                  <button
                    type="button"
                    onClick={() => setEditorMode("VISUAL")}
                    className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 transition cursor-pointer ${
                      editorMode === "VISUAL"
                        ? "bg-white text-slate-900 shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>{tr("Visual", "विजुअल")}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (editorMode === "VISUAL" && editorRef.current) {
                        setBlogContent(editorRef.current.innerHTML);
                      }
                      setEditorMode("PREVIEW");
                    }}
                    className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 transition cursor-pointer ${
                      editorMode === "PREVIEW"
                        ? "bg-white text-blue-700 shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Eye className="w-3 h-3" />
                    <span>{tr("Preview", "प्रीव्यू")}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (editorMode === "VISUAL" && editorRef.current) {
                        setBlogContent(editorRef.current.innerHTML);
                      }
                      setEditorMode("HTML");
                    }}
                    className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 transition cursor-pointer ${
                      editorMode === "HTML"
                        ? "bg-white text-slate-900 shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Code className="w-3 h-3" />
                    <span>HTML</span>
                  </button>
                </div>
              </div>

              {/* Visual Editable Canvas */}
              {editorMode === "VISUAL" && (
                <div className="relative">
                  {!stripFormattingToPlainText(blogContent) && (
                    <div className="pointer-events-none absolute top-4 left-4 right-4 text-xs text-slate-400 select-none">
                      {tr(
                        "Start writing your dental article here... Use the toolbar above to add H1/H2/H3 headings, paragraphs, bullet points, links, callout boxes, and images.",
                        "अपना दंत स्वास्थ्य लेख यहाँ लिखना शुरू करें... H1/H2/H3 शीर्षक, पैराग्राफ, बुलेट पॉइंट, लिंक, कॉलआउट बॉक्स और इमेज जोड़ने के लिए ऊपर दिए गए टूलबार का उपयोग करें।"
                      )}
                    </div>
                  )}
                  <div
                    ref={editorRef}
                    contentEditable
                    suppressContentEditableWarning
                    onInput={handleEditorInput}
                    onBlur={handleEditorInput}
                    className="min-h-[260px] max-h-[420px] overflow-y-auto p-4 text-slate-800 text-sm leading-relaxed focus:outline-none space-y-3 [&_h1]:text-2xl [&_h1]:font-extrabold [&_h1]:text-slate-900 [&_h1]:mt-4 [&_h2]:text-xl [&_h2]:font-extrabold [&_h2]:text-slate-900 [&_h2]:mt-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-slate-900 [&_h3]:mt-3 [&_p]:my-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_blockquote]:border-l-4 [&_blockquote]:border-blue-600 [&_blockquote]:bg-blue-50/60 [&_blockquote]:p-3.5 [&_blockquote]:rounded-r-xl [&_blockquote]:italic [&_a]:text-blue-600 [&_a]:underline [&_hr]:my-4 [&_hr]:border-slate-200"
                  />
                </div>
              )}

              {/* Live Patient Preview */}
              {editorMode === "PREVIEW" && (
                <div className="min-h-[260px] max-h-[420px] overflow-y-auto p-5 bg-slate-50/50">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 block mb-2">
                    {tr("Live Article Preview", "लाइव लेख प्रीव्यू")}
                  </span>
                  {blogContent ? (
                    <div
                      className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm space-y-3 [&_h1]:text-2xl [&_h1]:font-extrabold [&_h1]:text-slate-900 [&_h2]:text-xl [&_h2]:font-extrabold [&_h2]:text-slate-900 [&_h3]:text-lg [&_h3]:font-bold [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_blockquote]:border-l-4 [&_blockquote]:border-blue-600 [&_blockquote]:bg-blue-50/50 [&_blockquote]:p-4 [&_blockquote]:rounded-r-xl [&_blockquote]:italic [&_a]:text-blue-600 [&_a]:underline"
                      dangerouslySetInnerHTML={{ __html: blogContent }}
                    />
                  ) : (
                    <p className="text-xs text-slate-400 italic">
                      {tr("Nothing written yet...", "अभी तक कुछ नहीं लिखा गया है...")}
                    </p>
                  )}
                </div>
              )}

              {/* Raw HTML Source Mode */}
              {editorMode === "HTML" && (
                <textarea
                  rows={10}
                  value={blogContent}
                  onChange={(e) => setBlogContent(e.target.value)}
                  placeholder={tr(
                    "<p>Write or paste HTML here...</p>",
                    "<p>यहाँ HTML लिखें या पेस्ट करें...</p>"
                  )}
                  className="w-full p-4 font-mono text-xs bg-slate-950 text-emerald-300 focus:outline-none"
                />
              )}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsBlogModalOpen(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                {tr("Cancel", "रद्द करें")}
              </button>
              <button
                type="submit"
                disabled={savingBlog}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-md shadow-blue-600/20 cursor-pointer"
              >
                {savingBlog
                  ? tr("Publishing...", "प्रकाशित हो रहा है...")
                  : tr("Publish Article", "लेख प्रकाशित करें")}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}