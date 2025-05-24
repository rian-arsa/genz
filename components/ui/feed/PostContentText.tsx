"use client";

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

  const truncatedHtml = isLong ? simpleTruncateHtml(html, maxLength) : html;

  return (
    <div className="mt-4 text-sm text-gray-800 dark:text-gray-200 leading-relaxed prose dark:prose-invert">
      <div
        dangerouslySetInnerHTML={{
          __html: showFull ? html : truncatedHtml,
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
function simpleTruncateHtml(html: string, maxLength: number): string {
  const div = document.createElement("div");
  div.innerHTML = html;
  let charCount = 0;
  let truncated = "";

  const allowedTags = new Set([
    "p",
    "strong",
    "em",
    "u",
    "blockquote",
    "a",
    "ul",
    "ol",
    "li",
    "br",
    "code",
  ]);

  function walk(node: ChildNode): string {
    if (charCount >= maxLength) return "";

    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent || "";
      const remaining = maxLength - charCount;
      const sliced = text.slice(0, remaining);
      charCount += sliced.length;
      return sliced;
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as HTMLElement;
      const tagName = el.tagName.toLowerCase();

      // only keep allowed tags
      if (!allowedTags.has(tagName)) {
        let content = "";
        el.childNodes.forEach((child) => {
          content += walk(child);
        });
        return content;
      }

      // preserve href on <a>
      const attr =
        tagName === "a" && el.getAttribute("href")
          ? ` href="${el.getAttribute("href")}"`
          : "";

      let content = "";
      el.childNodes.forEach((child) => {
        content += walk(child);
      });

      return `<${tagName}${attr}>${content}</${tagName}>`;
    }

    return "";
  }

  div.childNodes.forEach((node) => {
    if (charCount < maxLength) {
      truncated += walk(node);
    }
  });

  return truncated.trim() + "...";
}
