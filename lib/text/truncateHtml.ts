export const simpleTruncateHtml = (
  html: string,
  maxLength: number,
  length: number
): string => {
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

  const walk = (node: ChildNode): string => {
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
  };

  div.childNodes.forEach((node) => {
    if (charCount < maxLength) {
      truncated += walk(node);
    }
  });

  return truncated.trim() + (length > maxLength ? "..." : "");
}
