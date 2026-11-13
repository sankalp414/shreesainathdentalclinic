import React from "react";

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

export function FormattedBlogContent({ content }: { content: string }) {
  if (!content) return null;

  const lines = content.split("\n");

  return (
    <div className="space-y-3 text-sm sm:text-base leading-relaxed text-slate-600">
      {lines.map((rawLine, index) => {
        const line = rawLine.trim();
        if (!line) return <div key={index} className="h-1" />;

        // Convert ### or ## into clean headings
        if (line.startsWith("### ")) {
          return (
            <h3
              key={index}
              className="pt-3 text-lg sm:text-xl font-bold text-[#0c2a2a]"
            >
              {parseInlineBold(line.replace(/^###\s+/, ""))}
            </h3>
          );
        }

        if (line.startsWith("## ")) {
          return (
            <h2
              key={index}
              className="pt-4 text-xl sm:text-2xl font-bold text-[#0c2a2a]"
            >
              {parseInlineBold(line.replace(/^##\s+/, ""))}
            </h2>
          );
        }

        // Convert - or * into styled bullet points
        if (line.startsWith("- ") || line.startsWith("* ")) {
          return (
            <div key={index} className="flex items-start gap-2.5 pl-1">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#e05a47] shrink-0" />
              <p className="flex-1">
                {parseInlineBold(line.replace(/^[-*]\s+/, ""))}
              </p>
            </div>
          );
        }

        // Standard paragraph
        return <p key={index}>{parseInlineBold(line)}</p>;
      })}
    </div>
  );
}