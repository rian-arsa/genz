"use client";

import { useState } from "react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { Check } from "lucide-react";

export default function CommentInput({
  id,
  onCommentSubmit,
}: {
  id: string;
  onCommentSubmit: (id: string, comment: string) => void;
}) {
  const [comment, setComment] = useState("");
  const [sent, setSent] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);

  const handleSubmit = () => {
    if (!comment.trim()) return;

    onCommentSubmit(id, comment);
    setSent(true);
    setComment("");
    setTimeout(() => setSent(false), 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const addEmoji = (emoji: any) => {
    setComment((prev) => prev + emoji.native);
    setShowEmoji(false);
  };

  return (
    <div className="relative w-full mt-6">
      <div className="flex items-center justify-between gap-3 border border-zinc-200 dark:border-zinc-700 rounded-full px-4 py-2 w-full shadow-[0_4px_6px_-4px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_6px_-4px_rgba(255,255,255,0.05)] focus-within:ring-2 focus-within:ring-pink-500 transition">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ketik balasanmu di sini... atau skip juga gak apa ..."
          className="flex-1 bg-transparent text-[14px] text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none"
        />
        <button
          type="button"
          onClick={() => setShowEmoji((prev) => !prev)}
          className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 text-xl transition"
          title="Emoji">
          😊
        </button>
        <button
          onClick={handleSubmit}
          disabled={!comment.trim()}
          aria-label="Kirim komentar"
          className={`text-[18px] transition-transform duration-150 ease-in-out ${
            comment.trim()
              ? "text-pink-600 hover:scale-110 active:scale-95"
              : "text-zinc-300 cursor-not-allowed"
          }`}>
          {sent ? (
            <Check />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-5 h-5">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          )}
        </button>
      </div>

      {showEmoji && (
        <div className="absolute bottom-14 right-0 z-50">
          <Picker data={data} onEmojiSelect={addEmoji} theme="light" />
        </div>
      )}
    </div>
  );
}
