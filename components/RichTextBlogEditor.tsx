"use client";

import React, { useRef, useEffect, useState } from "react";
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

interface RichTextBlogEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export default function RichTextBlogEditor({
  value,
  onChange,
  placeholder = "Start writing your clinical article here... Use the toolbar above to add headings, bullet points, links, and callout boxes.",
}: RichTextBlogEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"VISUAL" | "PREVIEW" | "HTML">("VISUAL");

  // Sync external value changes (e.g. when clicking "Edit" on an existing blog or resetting form)
  useEffect(() => {
    if (editorRef.current && mode === "VISUAL") {
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value || "";
      }
    }
  }, [value, mode]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const execCommand = (command: string, arg: string = "") => {
    if (mode !== "VISUAL") setMode("VISUAL");
    setTimeout(() => {
      editorRef.current?.focus();
      document.execCommand(command, false, arg);
      handleInput();
    }, 0);
  };

  const handleInsertLink = () => {
    const url = window.prompt("Enter the full URL (e.g. https://...):", "https://");
    if (!url) return;
    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 0) {
      execCommand("createLink", url);
    } else {
      const linkText = window.prompt("Enter text to display for this link:", "Learn more");
      if (linkText) {
        execCommand(
          "insertHTML",
          `<a href="${url}" target="_blank" rel="noopener noreferrer">${linkText}</a>`
        );
      }
    }
  };

  const handleInsertImage = () => {
    const imgUrl = window.prompt("Enter Image URL to embed inside the article:");
    if (!imgUrl) return;
    const altText = window.prompt("Enter short image description (optional):", "Dental care illustration") || "Dental care";
    execCommand(
      "insertHTML",
      `<figure class="my-4"><img src="${imgUrl}" alt="${altText}" class="rounded-2xl max-h-96 w-full object-cover border border-slate-200" /><figcaption class="text-xs text-slate-500 mt-1.5 text-center">${altText}</figcaption></figure><p><br/></p>`
    );
  };

  const handleInsertCallout = () => {
    execCommand(
      "insertHTML",
      `<blockquote><strong>Clinical Tip:</strong> Write your key patient takeaway or post-treatment care instruction here.</blockquote><p><br/></p>`
    );
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/15 transition">
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-slate-50/90 px-3 py-2">
        <div className="flex flex-wrap items-center gap-1">
          {/* Block Format Buttons */}
          <button
            type="button"
            onClick={() => execCommand("formatBlock", "P")}
            title="Normal Paragraph"
            className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-200/80 transition cursor-pointer"
          >
            <Type className="w-3.5 h-3.5" />
            <span>Para</span>
          </button>

          <button
            type="button"
            onClick={() => execCommand("formatBlock", "H1")}
            title="Main Heading (H1)"
            className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-extrabold text-slate-800 hover:bg-slate-200/80 transition cursor-pointer"
          >
            <Heading1 className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => execCommand("formatBlock", "H2")}
            title="Section Heading (H2)"
            className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-extrabold text-slate-800 hover:bg-slate-200/80 transition cursor-pointer"
          >
            <Heading2 className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => execCommand("formatBlock", "H3")}
            title="Subheading (H3)"
            className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-extrabold text-slate-800 hover:bg-slate-200/80 transition cursor-pointer"
          >
            <Heading3 className="w-4 h-4" />
          </button>

          <div className="h-4 w-px bg-slate-300 mx-1" />

          {/* Inline Text Formatting */}
          <button
            type="button"
            onClick={() => execCommand("bold")}
            title="Bold (Ctrl+B)"
            className="rounded-lg p-1.5 text-slate-700 hover:bg-slate-200/80 transition cursor-pointer"
          >
            <Bold className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => execCommand("italic")}
            title="Italic (Ctrl+I)"
            className="rounded-lg p-1.5 text-slate-700 hover:bg-slate-200/80 transition cursor-pointer"
          >
            <Italic className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => execCommand("underline")}
            title="Underline (Ctrl+U)"
            className="rounded-lg p-1.5 text-slate-700 hover:bg-slate-200/80 transition cursor-pointer"
          >
            <Underline className="w-4 h-4" />
          </button>

          <div className="h-4 w-px bg-slate-300 mx-1" />

          {/* Lists & Quote */}
          <button
            type="button"
            onClick={() => execCommand("insertUnorderedList")}
            title="Bullet List"
            className="rounded-lg p-1.5 text-slate-700 hover:bg-slate-200/80 transition cursor-pointer"
          >
            <List className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => execCommand("insertOrderedList")}
            title="Numbered List"
            className="rounded-lg p-1.5 text-slate-700 hover:bg-slate-200/80 transition cursor-pointer"
          >
            <ListOrdered className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleInsertCallout}
            title="Insert Clinical Callout Box"
            className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 transition cursor-pointer"
          >
            <Quote className="w-3.5 h-3.5" />
            <span>Callout</span>
          </button>

          <div className="h-4 w-px bg-slate-300 mx-1" />

          {/* Links, Images & Divider */}
          <button
            type="button"
            onClick={handleInsertLink}
            title="Insert Hyperlink"
            className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200/80 transition cursor-pointer"
          >
            <LinkIcon className="w-3.5 h-3.5 text-blue-600" />
            <span>Link</span>
          </button>

          <button
            type="button"
            onClick={handleInsertImage}
            title="Insert Inline Image"
            className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200/80 transition cursor-pointer"
          >
            <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
            <span>Image</span>
          </button>

          <button
            type="button"
            onClick={() => execCommand("insertHorizontalRule")}
            title="Insert Divider Line"
            className="rounded-lg p-1.5 text-slate-700 hover:bg-slate-200/80 transition cursor-pointer"
          >
            <Minus className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => execCommand("removeFormat")}
            title="Clear Formatting"
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-200/80 transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mode Switcher: Visual Editor vs Live Preview vs HTML */}
        <div className="inline-flex rounded-xl bg-slate-200/80 p-0.5 text-[11px] font-bold">
          <button
            type="button"
            onClick={() => setMode("VISUAL")}
            className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 transition cursor-pointer ${
              mode === "VISUAL"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Edit3 className="w-3 h-3" />
            <span>Write</span>
          </button>
          <button
            type="button"
            onClick={() => setMode("PREVIEW")}
            className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 transition cursor-pointer ${
              mode === "PREVIEW"
                ? "bg-white text-blue-700 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Eye className="w-3 h-3" />
            <span>Preview</span>
          </button>
          <button
            type="button"
            onClick={() => setMode("HTML")}
            className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 transition cursor-pointer ${
              mode === "HTML"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Code className="w-3 h-3" />
            <span>HTML</span>
          </button>
        </div>
      </div>

      {/* Editor Body */}
      {mode === "VISUAL" && (
        <div className="relative">
          {!value && (
            <div className="pointer-events-none absolute top-4 left-4 right-4 text-xs sm:text-sm text-slate-400 select-none">
              {placeholder}
            </div>
          )}
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            onInput={handleInput}
            className="min-h-[280px] max-h-[520px] overflow-y-auto p-4 sm:p-5 text-slate-800 text-sm sm:text-base leading-relaxed focus:outline-none space-y-3 [&_h1]:text-2xl [&_h1]:font-extrabold [&_h1]:text-slate-900 [&_h1]:mt-4 [&_h2]:text-xl [&_h2]:font-extrabold [&_h2]:text-slate-900 [&_h2]:mt-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-slate-900 [&_h3]:mt-3 [&_p]:my-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_blockquote]:border-l-4 [&_blockquote]:border-blue-600 [&_blockquote]:bg-blue-50/60 [&_blockquote]:p-3.5 [&_blockquote]:rounded-r-xl [&_blockquote]:italic [&_a]:text-blue-600 [&_a]:underline [&_hr]:my-4 [&_hr]:border-slate-200"
          />
        </div>
      )}

      {mode === "PREVIEW" && (
        <div className="min-h-[280px] p-5 bg-slate-50/40">
          <div className="text-[11px] font-bold uppercase tracking-wider text-blue-600 mb-3">
            Live Patient Article Preview
          </div>
          {value ? (
            <div
              className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm sm:text-base space-y-3 [&_h1]:text-2xl [&_h1]:font-extrabold [&_h1]:text-slate-900 [&_h2]:text-xl [&_h2]:font-extrabold [&_h2]:text-slate-900 [&_h2]:mt-5 [&_h3]:text-lg [&_h3]:font-bold [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_blockquote]:border-l-4 [&_blockquote]:border-blue-600 [&_blockquote]:bg-blue-50/50 [&_blockquote]:p-4 [&_blockquote]:rounded-r-xl [&_blockquote]:italic [&_a]:text-blue-600 [&_a]:underline"
              dangerouslySetInnerHTML={{ __html: value }}
            />
          ) : (
            <p className="text-xs text-slate-400 italic">Nothing written yet...</p>
          )}
        </div>
      )}

      {mode === "HTML" && (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={11}
          className="w-full p-4 font-mono text-xs text-slate-800 bg-slate-950 text-emerald-300 focus:outline-none"
          placeholder="<p>Write or paste raw HTML here...</p>"
        />
      )}
    </div>
  );
}