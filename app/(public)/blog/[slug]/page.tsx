import React, { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogBySlug, getBlogs } from "@/app/actions/clinic-cms";

// Helper to strip raw Markdown symbols from short excerpts/titles
function cleanMarkdownPreview(text?: string | null): string {
  if (!text) return "";
  return text
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/^[-*]\s+/gm, "• ")
    .replace(/\n+/g, " ")
    .trim();
}

// Helper to parse inline **bold** text inside paragraphs and bullets
function parseInlineBold(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={idx} className="font-bold text-slate-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

// Renders Markdown content (### headings, - bullets, **bold**) cleanly
function FormattedMarkdownArticle({ content }: { content: string }) {
  if (!content) return null;

  const lines = content.split("\n");

  return (
    <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
      {lines.map((rawLine, index) => {
        const line = rawLine.trim();
        if (!line) return <div key={index} className="h-1" />;

        if (line.startsWith("### ")) {
          return (
            <h3
              key={index}
              className="pt-4 text-lg sm:text-xl font-extrabold text-slate-900"
            >
              {parseInlineBold(line.replace(/^###\s+/, ""))}
            </h3>
          );
        }

        if (line.startsWith("## ")) {
          return (
            <h2
              key={index}
              className="pt-5 text-xl sm:text-2xl font-extrabold text-slate-900"
            >
              {parseInlineBold(line.replace(/^##\s+/, ""))}
            </h2>
          );
        }

        if (line.startsWith("# ")) {
          return (
            <h1
              key={index}
              className="pt-6 text-2xl font-extrabold text-slate-900"
            >
              {parseInlineBold(line.replace(/^#\s+/, ""))}
            </h1>
          );
        }

        if (line.startsWith("- ") || line.startsWith("* ")) {
          return (
            <div key={index} className="flex items-start gap-3 pl-2">
              <span className="mt-2 h-2 w-2 rounded-full bg-blue-600 shrink-0" />
              <p className="flex-1">
                {parseInlineBold(line.replace(/^[-*]\s+/, ""))}
              </p>
            </div>
          );
        }

        return <p key={index}>{parseInlineBold(line)}</p>;
      })}
    </div>
  );
}

async function BlogDetailContent({
  paramsPromise,
}: {
  paramsPromise: Promise<{ slug: string }>;
}) {
  const { slug } = await paramsPromise;
  const post = await getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getBlogs(false);
  const related = allPosts.filter((b) => b.id !== post.id).slice(0, 2);
  const isRichHtml = /<[a-z][\s\S]*>/i.test(post.content);

  return (
    <div className="min-h-screen bg-slate-50 py-42 px-4">
      <article className="max-w-7xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        {post.coverImage && (
          <div className="h-72 sm:h-80 w-full overflow-hidden bg-slate-100">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-8 sm:p-10 space-y-6">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
            <Link
              href="/blog"
              className="text-blue-600 hover:underline flex items-center gap-1"
            >
              ← All Dental Articles
            </Link>
            <span className="text-slate-300">•</span>
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700">
              {post.category}
            </span>
            <span className="text-slate-400">{post.readTime}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
            {cleanMarkdownPreview(post.title)}
          </h1>

          <div className="flex items-center justify-between border-y border-slate-100 py-4 text-xs text-slate-500">
            <div>
              Written by{" "}
              <span className="font-bold text-slate-800">{post.authorName}</span>
            </div>
            <div>
              Published{" "}
              {new Date(post.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </div>
          </div>

          <p className="text-base font-medium text-slate-600 italic bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
            {cleanMarkdownPreview(post.excerpt)}
          </p>

          {isRichHtml ? (
            <div
              className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm sm:text-base space-y-3 [&_h1]:text-2xl [&_h1]:font-extrabold [&_h1]:text-slate-900 [&_h2]:text-xl [&_h2]:font-extrabold [&_h2]:text-slate-900 [&_h2]:mt-6 [&_h3]:text-lg [&_h3]:font-bold [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_blockquote]:border-l-4 [&_blockquote]:border-blue-600 [&_blockquote]:bg-blue-50/50 [&_blockquote]:p-4 [&_blockquote]:rounded-r-xl [&_blockquote]:italic [&_a]:text-blue-600 [&_a]:underline"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          ) : (
            <FormattedMarkdownArticle content={post.content} />
          )}

          {/* CTA inside blog */}
          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold">
                Have questions about {post.category}?
              </h3>
              <p className="text-xs text-blue-100 mt-1">
                Book an in-clinic or video consultation with Dr. Nitu, BDS.
              </p>
            </div>
            <Link
              href="/patient/book"
              className="px-5 py-2.5 bg-white text-blue-700 font-bold text-xs rounded-xl shadow-sm hover:bg-blue-50 transition shrink-0"
            >
              Book Consultation
            </Link>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <div className="max-w-3xl mx-auto mt-10">
          <h2 className="text-lg font-bold text-slate-900 mb-4">
            More Dental Health Articles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {related.map((item) => (
              <Link
                key={item.id}
                href={`/blog/${item.slug}`}
                className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-blue-300 shadow-sm transition block"
              >
                <span className="text-[11px] font-bold text-blue-600 uppercase">
                  {item.category}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1 line-clamp-2">
                  {cleanMarkdownPreview(item.title)}
                </h3>
                <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                  {cleanMarkdownPreview(item.excerpt)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="max-w-3xl mx-auto py-12 px-4">
          <div className="h-96 bg-white rounded-3xl border border-slate-200 animate-pulse" />
        </div>
      }
    >
      <BlogDetailContent paramsPromise={params} />
    </Suspense>
  );
}