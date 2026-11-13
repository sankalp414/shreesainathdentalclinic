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

const DAYS_OF_WEEK = [
  { label: "Sun", value: 0 },
  { label: "Mon", value: 1 },
  { label: "Tue", value: 2 },
  { label: "Wed", value: 3 },
  { label: "Thu", value: 4 },
  { label: "Fri", value: 5 },
  { label: "Sat", value: 6 },
];

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
      "Enter the full URL (e.g. https://shreesainathdental.in/patient/book):",
      "https://"
    );
    if (!url) return;
    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 0) {
      execEditorCommand("createLink", url);
    } else {
      const linkText =
        window.prompt("Enter clickable text for this link:", "Book a Consultation") ||
        url;
      execEditorCommand(
        "insertHTML",
        `<a href="${url}" target="_blank" rel="noopener noreferrer">${linkText}</a>`
      );
    }
  };

  const handleInsertInlineImage = () => {
    const imgUrl = window.prompt("Enter Image URL to insert inside the article:");
    if (!imgUrl) return;
    const caption =
      window.prompt("Enter optional image caption:", "Clinical illustration") ||
      "";
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
      `<blockquote><strong>Clinical Tip from Dr. Nitu:</strong> Add your key takeaway or post-care instruction here.</blockquote><p><br/></p>`
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
      reason: newClosedReason.trim() || "Clinic Holiday",
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
        "✓ 24-Hour Clinic Operating Schedule & Time Slots updated across the portal!"
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
      setBlogError("Please enter an Article Title.");
      return;
    }

    if (!cleanTextCheck) {
      setBlogError("Please write some article content before publishing.");
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
        setBlogToast("✓ Dental article saved to Neon Database and published live!");
        router.refresh();
        setTimeout(() => setBlogToast(null), 4000);
      } else {
        setBlogError(
          res?.error || "Failed to save article to database. Please try again."
        );
      }
    } catch (err: any) {
      setSavingBlog(false);
      setBlogError(err?.message || "Unexpected error while saving blog post.");
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
              ⏰ 24-Hour Clinic Operating Timings &amp; Slot Engine
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">
              Clinic Opening, Closing &amp; Break Hours (24-Hr Selection)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Choose any opening and closing time across 24 hours (`12:00 AM` – `11:30 PM`). Patient booking slots auto-regenerate immediately.
            </p>
          </div>

          <button
            type="button"
            disabled={savingSchedule}
            onClick={handleSaveSchedule}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-extrabold shadow-md shadow-blue-600/20 transition cursor-pointer shrink-0"
          >
            {savingSchedule
              ? "Syncing 24-Hr Slots..."
              : "✓ Save 24-Hr Schedule & Regenerate Slots"}
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
              🌅 Clinic Start Time (24-Hr)
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
              🌙 Clinic Closing Time (24-Hr)
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
              ☕ Break / Lunch Start
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
              ⚡ Break / Lunch End
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
              ⏱️ Slot Duration
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
              <option value={15}>15 Minutes</option>
              <option value={30}>30 Minutes</option>
              <option value={45}>45 Minutes</option>
              <option value={60}>60 Minutes (1 Hr)</option>
            </select>
          </div>
        </div>

        {/* Weekly Off Days & Consultation Mode */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
          <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-3">
            <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block">
              Weekly Off Days
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
                    {d.label} {isOff ? "(Closed)" : ""}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-3">
            <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block">
              Holiday / Specific Date Closures
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
                <option value="BOTH">Close Both (In-Clinic &amp; Video)</option>
                <option value="IN_CLINIC_ONLY">
                  Close In-Clinic Only (Keep Video Open)
                </option>
              </select>
              <input
                type="text"
                value={newClosedReason}
                onChange={(e) => setNewClosedReason(e.target.value)}
                placeholder="Reason (e.g. Conference)"
                className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs flex-1 min-w-[140px]"
              />
              <button
                type="button"
                onClick={handleAddClosedDate}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold cursor-pointer"
              >
                + Add Date
              </button>
            </div>

            {schedule.closedDates.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {schedule.closedDates.map((cd) => (
                  <span
                    key={cd.date}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-800 text-[11px] font-bold"
                  >
                    {cd.date} ({cd.reason || "Closed"})
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
              ✍️ Patient Education &amp; Blog Studio
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 mt-1.5">
              Published Dental Articles ({blogs.length})
            </h2>
          </div>

          <button
            type="button"
            onClick={openNewBlogModal}
            className="px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-xs transition cursor-pointer"
          >
            + Write New Dental Blog
          </button>
        </div>

        {blogToast && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-extrabold">
            {blogToast}
          </div>
        )}

        {blogs.length === 0 ? (
          <p className="text-xs text-slate-500 py-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            No articles published yet.
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
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteBlog(b.id)}
                    className="px-3 py-1.5 rounded-xl bg-red-50 text-red-600 text-xs font-bold hover:bg-red-100 cursor-pointer"
                  >
                    Delete
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
                  Rich-Text Clinical Publisher
                </span>
                <h3 className="text-lg font-extrabold text-slate-900">
                  {editingBlog ? "Edit Clinical Article" : "Publish New Article"}
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
                placeholder="Article Title (e.g. Why Single-Sitting Root Canal Is Painless)..."
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold sm:col-span-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                value={blogCategory}
                onChange={(e) => setBlogCategory(e.target.value)}
                placeholder="Category (e.g. Endodontics & RCT)"
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                value={blogReadTime}
                onChange={(e) => setBlogReadTime(e.target.value)}
                placeholder="Read Time (e.g. 4 Min Read)"
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="url"
                value={blogCoverImage}
                onChange={(e) => setBlogCoverImage(e.target.value)}
                placeholder="Cover Image URL (optional https://...)"
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <textarea
              rows={2}
              value={blogExcerpt}
              onChange={(e) => setBlogExcerpt(e.target.value)}
              placeholder="Short summary for blog card (leave blank to auto-generate from article)..."
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
                    title="Normal Paragraph"
                    className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-200/80 transition cursor-pointer"
                  >
                    <Type className="w-3.5 h-3.5" />
                    <span>Para</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => execEditorCommand("formatBlock", "H1")}
                    title="Heading 1 (Large)"
                    className="inline-flex items-center gap-0.5 rounded-lg px-2 py-1.5 text-xs font-extrabold text-slate-800 hover:bg-slate-200/80 transition cursor-pointer"
                  >
                    <Heading1 className="w-4 h-4" />
                    <span>H1</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => execEditorCommand("formatBlock", "H2")}
                    title="Heading 2 (Section)"
                    className="inline-flex items-center gap-0.5 rounded-lg px-2 py-1.5 text-xs font-extrabold text-slate-800 hover:bg-slate-200/80 transition cursor-pointer"
                  >
                    <Heading2 className="w-4 h-4" />
                    <span>H2</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => execEditorCommand("formatBlock", "H3")}
                    title="Heading 3 (Subheading)"
                    className="inline-flex items-center gap-0.5 rounded-lg px-2 py-1.5 text-xs font-extrabold text-slate-800 hover:bg-slate-200/80 transition cursor-pointer"
                  >
                    <Heading3 className="w-4 h-4" />
                    <span>H3</span>
                  </button>

                  <div className="h-4 w-px bg-slate-300 mx-1" />

                  <button
                    type="button"
                    onClick={() => execEditorCommand("bold")}
                    title="Bold"
                    className="rounded-lg p-1.5 text-slate-700 hover:bg-slate-200/80 transition cursor-pointer"
                  >
                    <Bold className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => execEditorCommand("italic")}
                    title="Italic"
                    className="rounded-lg p-1.5 text-slate-700 hover:bg-slate-200/80 transition cursor-pointer"
                  >
                    <Italic className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => execEditorCommand("underline")}
                    title="Underline"
                    className="rounded-lg p-1.5 text-slate-700 hover:bg-slate-200/80 transition cursor-pointer"
                  >
                    <Underline className="w-4 h-4" />
                  </button>

                  <div className="h-4 w-px bg-slate-300 mx-1" />

                  <button
                    type="button"
                    onClick={() => execEditorCommand("insertUnorderedList")}
                    title="Bullet List"
                    className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200/80 transition cursor-pointer"
                  >
                    <List className="w-4 h-4" />
                    <span>Bullets</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => execEditorCommand("insertOrderedList")}
                    title="Numbered List"
                    className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200/80 transition cursor-pointer"
                  >
                    <ListOrdered className="w-4 h-4" />
                    <span>Numbers</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleInsertCallout}
                    title="Insert Highlight Callout"
                    className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 transition cursor-pointer"
                  >
                    <Quote className="w-3.5 h-3.5" />
                    <span>Callout</span>
                  </button>

                  <div className="h-4 w-px bg-slate-300 mx-1" />

                  <button
                    type="button"
                    onClick={handleInsertLink}
                    title="Insert Clickable Link"
                    className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200/80 transition cursor-pointer"
                  >
                    <LinkIcon className="w-3.5 h-3.5 text-blue-600" />
                    <span>Link</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleInsertInlineImage}
                    title="Insert Image in Article"
                    className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200/80 transition cursor-pointer"
                  >
                    <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Image</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => execEditorCommand("insertHorizontalRule")}
                    title="Horizontal Divider"
                    className="rounded-lg p-1.5 text-slate-700 hover:bg-slate-200/80 transition cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => execEditorCommand("removeFormat")}
                    title="Clear Formatting"
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
                    <span>Visual</span>
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
                    <span>Preview</span>
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
                      Start writing your dental article here... Use the toolbar above to add H1/H2/H3 headings, paragraphs, bullet points, links, callout boxes, and images.
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
                    Live Article Preview
                  </span>
                  {blogContent ? (
                    <div
                      className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm space-y-3 [&_h1]:text-2xl [&_h1]:font-extrabold [&_h1]:text-slate-900 [&_h2]:text-xl [&_h2]:font-extrabold [&_h2]:text-slate-900 [&_h3]:text-lg [&_h3]:font-bold [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_blockquote]:border-l-4 [&_blockquote]:border-blue-600 [&_blockquote]:bg-blue-50/50 [&_blockquote]:p-4 [&_blockquote]:rounded-r-xl [&_blockquote]:italic [&_a]:text-blue-600 [&_a]:underline"
                      dangerouslySetInnerHTML={{ __html: blogContent }}
                    />
                  ) : (
                    <p className="text-xs text-slate-400 italic">
                      Nothing written yet...
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
                  placeholder="<p>Write or paste HTML here...</p>"
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
                Cancel
              </button>
              <button
                type="submit"
                disabled={savingBlog}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-md shadow-blue-600/20 cursor-pointer"
              >
                {savingBlog ? "Publishing..." : "Publish Article"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}