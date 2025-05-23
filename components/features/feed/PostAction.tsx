"use client";

import {
  Heart,
  MessageCircle,
  Share2,
  Send,
  Bookmark,
  Flag,
  Landmark,
} from "lucide-react";

interface PostActionsProps {
  liked: boolean;
  likeCount: number;
  commentCount: number;
  shareCount: number;
  onLike: () => void;
}

export default function PostActions({
  liked,
  likeCount,
  commentCount,
  shareCount,
  onLike,
}: PostActionsProps) {
  return (
    <div className="mt-6 border-t border-gray-100 dark:border-gray-700 pt-4 text-sm text-gray-600 dark:text-gray-300">
      <div className="flex items-center justify-between mb-1">
        <div className="flex gap-2 items-center">
          <div className="relative group">
            <button
              onClick={onLike}
              className={`flex items-center gap-1 px-2 py-1.5 rounded-full transition transform hover:scale-105 active:scale-95 ${
                liked ? "text-pink-600" : "text-gray-500 hover:text-pink-500"
              }`}
              title="Beri Suara">
              <Heart size={18} fill={liked ? "#ec4899" : "none"} />
              <span className="text-sm font-semibold">{likeCount}</span>
            </button>
            <span className="absolute z-20 left-1/2 -translate-x-1/2 top-full mt-2 text-[11px] font-medium px-2 py-0.5 rounded bg-gradient-to-br from-white via-pink-50 to-white dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-800 border border-gray-200 dark:border-gray-700 text-gray-500 shadow-md ring-1 ring-pink-100 dark:ring-zinc-700 group-hover:opacity-100 opacity-0 transition duration-300 ease-out scale-90 group-hover:scale-100 whitespace-nowrap">
              Beri Suara
            </span>
          </div>

          <div className="relative group">
            <button
              className="flex items-center gap-1 px-2 py-1.5 rounded-full text-gray-500 hover:text-blue-600 transition transform hover:scale-105 active:scale-95"
              title="Komentar Warga">
              <MessageCircle size={18} />
              <span className="text-sm font-semibold">{commentCount}</span>
            </button>
            <span className="absolute z-20 left-1/2 -translate-x-1/2 top-full mt-2 text-[11px] font-medium px-2 py-0.5 rounded bg-gradient-to-br from-white via-pink-50 to-white dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-800 border border-gray-200 dark:border-gray-700 text-gray-500 shadow-md ring-1 ring-pink-100 dark:ring-zinc-700 group-hover:opacity-100 opacity-0 transition duration-300 ease-out scale-90 group-hover:scale-100 whitespace-nowrap">
              Komentar Warga
            </span>
          </div>

          <div className="relative group">
            <button
              className="flex items-center gap-1 px-2 py-1.5 rounded-full text-gray-500 hover:text-green-600 transition transform hover:scale-105 active:scale-95"
              title="Sebarkan Berita">
              <Share2 size={18} />
              <span className="text-sm font-semibold">{shareCount}</span>
            </button>
            <span className="absolute z-20 left-1/2 -translate-x-1/2 top-full mt-2 text-[11px] font-medium px-2 py-0.5 rounded bg-gradient-to-br from-white via-pink-50 to-white dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-800 border border-gray-200 dark:border-gray-700 text-gray-500 shadow-md ring-1 ring-pink-100 dark:ring-zinc-700 group-hover:opacity-100 opacity-0 transition duration-300 ease-out scale-90 group-hover:scale-100 whitespace-nowrap">
              Sebarkan Berita
            </span>
          </div>

          <div className="relative group">
            <button
              className="flex items-center gap-1 px-2 py-1.5 rounded-full text-gray-500 hover:text-yellow-500 transition transform hover:scale-105 active:scale-95"
              title="Laporkan ke RT">
              <Flag size={18} />
            </button>
            <span className="absolute z-20 left-1/2 -translate-x-1/2 top-full mt-2 text-[11px] font-medium px-2 py-0.5 rounded bg-gradient-to-br from-white via-pink-50 to-white dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-800 border border-gray-200 dark:border-gray-700 text-gray-500 shadow-md ring-1 ring-pink-100 dark:ring-zinc-700 group-hover:opacity-100 opacity-0 transition duration-300 ease-out scale-90 group-hover:scale-100 whitespace-nowrap">
              Laporkan ke RT
            </span>
          </div>

          <div className="relative group">
            <button
              className="flex items-center gap-1 px-2 py-1.5 rounded-full text-gray-500 hover:text-purple-500 transition transform hover:scale-105 active:scale-95"
              title="Ajukan Aturan Baru">
              <Landmark size={18} />
            </button>
            <span className="absolute z-20 left-1/2 -translate-x-1/2 top-full mt-2 text-[11px] font-medium px-2 py-0.5 rounded bg-gradient-to-br from-white via-pink-50 to-white dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-800 border border-gray-200 dark:border-gray-700 text-gray-500 shadow-md ring-1 ring-pink-100 dark:ring-zinc-700 group-hover:opacity-100 opacity-0 transition duration-300 ease-out scale-90 group-hover:scale-100 whitespace-nowrap">
              Ajukan Aturan Baru
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="relative group">
            <button
              className="group p-1.5 rounded-full text-gray-500 hover:text-gray-900 dark:hover:text-white transition transform hover:rotate-6 active:scale-95"
              title="Kirim Surat Diplomatik">
              <Send size={18} />
            </button>
            <span className="absolute z-20 left-1/2 -translate-x-1/2 top-full mt-2 text-[11px] font-medium px-2 py-0.5 rounded bg-gradient-to-br from-white via-pink-50 to-white dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-800 border border-gray-200 dark:border-gray-700 text-gray-500 shadow-md ring-1 ring-pink-100 dark:ring-zinc-700 group-hover:opacity-100 opacity-0 transition duration-300 ease-out scale-90 group-hover:scale-100 whitespace-nowrap">
              Kirim Informasi ke Warga lain
            </span>
          </div>
          <div className="relative group">
            <button
              className="group p-1.5 rounded-full text-gray-500 hover:text-gray-900 dark:hover:text-white transition transform hover:scale-110 active:scale-95"
              title="Simpan ke Arsip Negara">
              <Bookmark size={18} />
            </button>
            <span className="absolute z-20 left-1/2 -translate-x-1/2 top-full mt-2 text-[11px] font-medium px-2 py-0.5 rounded bg-gradient-to-br from-white via-pink-50 to-white dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-800 border border-gray-200 dark:border-gray-700 text-gray-500 shadow-md ring-1 ring-pink-100 dark:ring-zinc-700 group-hover:opacity-100 opacity-0 transition duration-300 ease-out scale-90 group-hover:scale-100 whitespace-nowrap">
              Simpan ke Arsip Negara
            </span>
          </div>
        </div>
      </div>

      {(likeCount > 100 || commentCount > 30 || shareCount > 20) && (
        <div className="mt-1 text-xs font-bold text-pink-600 dark:text-pink-400">
          {likeCount > 100
            ? "💥 Postingan ini BOMB banget!"
            : commentCount > 30
            ? "💬 Komennya rame kayak warung pas buka puasa"
            : shareCount > 20
            ? "🚀 Udah dibawa ke luar angkasa sama netizen"
            : "🔥 Lagi hangat, banyak yang mampir"}
        </div>
      )}
    </div>
  );
}
