"use client";

import { useState } from "react";
import { Heart, MessageCircle } from "lucide-react";

interface Reply {
  id: string;
  author: string;
  text: string;
  liked: boolean;
  likeCount: number;
}

interface CommentItemProps {
  author: string;
  text: string;
  liked: boolean;
  likeCount: number;
  replyCount: number;
  onLike: (e: React.MouseEvent) => void;
  onReplySubmit: (e: React.MouseEvent, replyText: string) => void;
  replies?: Reply[];
  onReplyLike?: (e: React.MouseEvent, replyId: string) => void;
}

export default function CommentItem({
  author,
  text,
  liked,
  likeCount,
  onLike,
  onReplySubmit,
  replies = [],
  replyCount,
  onReplyLike,
}: CommentItemProps) {
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [visibleReplies, setVisibleReplies] = useState(3);

  const handleReply = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!replyText.trim()) return;
    onReplySubmit(e, replyText);
    setReplyText("");
    setShowReply(false);
  };

  const handleShowMoreReplies = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setVisibleReplies((prev) => prev + 3);
  };

  return (
    <div className="flex flex-col gap-2 px-3 py-2 border-b border-gray-100 dark:border-gray-700">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center font-semibold text-white text-sm">
          {author.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            {author}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 mt-0.5">
            {typeof text === "string" ? text : String(text)}
          </p>

          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onLike(e);
              }}
              className={`flex items-center gap-1 hover:text-pink-500 ${
                liked ? "text-pink-500" : ""
              }`}>
              <Heart size={14} fill={liked ? "#ec4899" : "none"} /> Suka
              {likeCount > 0 && (
                <span className="font-semibold">{likeCount}</span>
              )}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowReply(!showReply);
              }}
              className="flex items-center gap-1 hover:text-blue-500">
              <MessageCircle size={14} /> Balas
              {replyCount > 0 && (
                <span className="font-semibold">{replyCount}</span>
              )}
            </button>
          </div>
          {showReply && (
            <div className="mt-4 flex flex-col gap-3">
              <div className="flex items-center justify-between gap-3 border border-zinc-200 dark:border-zinc-700 rounded-full px-4 py-2 w-full shadow focus-within:ring-2 focus-within:ring-pink-500 transition">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Ayo bales, tapi jangan toxic ..."
                  className="flex-1 bg-transparent text-[14px] text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none"
                />
                <button
                  onClick={handleReply}
                  disabled={!replyText.trim()}
                  className={`text-[16px] transition-transform duration-150 ease-in-out ${
                    replyText.trim()
                      ? "text-pink-600 hover:scale-110 active:scale-95"
                      : "text-zinc-300 cursor-not-allowed"
                  }`}
                  aria-label="Kirim balasan">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-4 h-4">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                </button>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowReply(false);
                }}
                className="self-start text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition">
                Batal
              </button>
            </div>
          )}

          {replies.length > 0 && (
            <div className="mt-4 space-y-2 ml-6">
              {replies.slice(0, visibleReplies).map((reply) => (
                <div key={reply.id} className="flex items-start gap-2">
                  <div className="w-7 h-7 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-xs font-semibold text-gray-700 dark:text-gray-200">
                    {reply.author.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-800 dark:text-gray-100">
                      {reply.author}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {reply.text}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onReplyLike?.(e, reply.id);
                      }}
                      className={`mt-1 text-xs flex items-center gap-1 hover:text-pink-500 ${
                        reply.liked ? "text-pink-500" : "text-gray-400"
                      }`}>
                      <Heart
                        size={12}
                        fill={reply.liked ? "#ec4899" : "none"}
                      />
                      Suka
                      {reply.likeCount > 0 && (
                        <span className="font-semibold">{reply.likeCount}</span>
                      )}
                    </button>
                  </div>
                </div>
              ))}
              {replies.length > visibleReplies && (
                <button
                  onClick={handleShowMoreReplies}
                  className="text-xs text-pink-600 hover:underline ml-6">
                  Lihat lanjutannya
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
