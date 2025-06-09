"use client";

import { simpleTruncateHtml } from "@/lib/text/truncateHtml";
import { useState } from "react";

type PostContentTextProps = {
  html: string;
  maxLength?: number;
};

export function PostContentText({
  html,
  maxLength = 500,
}: PostContentTextProps) {
  const [showFull, setShowFull] = useState(false);

  const plainText = html.replace(/<[^>]+>/g, "").trim();
  const isLong = plainText.length > maxLength;

  const truncatedHtml = isLong
    ? simpleTruncateHtml(html, maxLength, html.length)
    : html;

  return (
    <div
      className="mt-4 text-sm text-gray-800 dark:text-gray-200 leading-relaxed prose dark:prose-invert"
      onClick={(e) => e.stopPropagation()}>
      <div
        dangerouslySetInnerHTML={{
          __html: showFull
            ? simpleTruncateHtml(html, html.length, html.length)
            : truncatedHtml,
        }}
      />
      {isLong && (
        <button
          onClick={() => setShowFull(!showFull)}
          className="mt-2 text-[#ff009d] text-xs font-medium hover:underline">
          {showFull ? "Tutup kembali" : "Baca selengkapnya"}
        </button>
      )}
    </div>
  );
}

// Basic HTML-aware truncation — preserves outer <p> tags and wraps plain text safely
