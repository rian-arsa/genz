// app/profile/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { Lock, Globe, MessageSquareQuote, Users } from "lucide-react";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("timeline");

  const tabClass = (tab: string) =>
    `flex items-center justify-center gap-1 py-2 px-3 text-sm font-medium border-b-2 transition ${
      activeTab === tab
        ? "text-pink-600 border-pink-600"
        : "text-zinc-500 dark:text-zinc-400 border-transparent hover:text-zinc-900 dark:hover:text-white"
    }`;

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      {/* Header Profil */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-8">
        <div className="w-24 h-24 rounded-full overflow-hidden">
          <Image
            src="/default-avatar.png"
            alt="Avatar"
            width={96}
            height={96}
            className="rounded-full object-cover"
          />
        </div>
        <div className="mt-4 sm:mt-0">
          <h1 className="text-xl font-semibold text-zinc-800 dark:text-white">
            Nama Pengguna
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">@username</p>
          <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
            Bio singkat pengguna di sini. Bisa memuat deskripsi, hobi, atau
            kutipan.
          </p>
          <a
            href="#"
            className="inline-block mt-2 text-sm text-pink-600 hover:underline">
            www.website-kamu.com
          </a>
        </div>
      </div>

      {/* Statistik */}
      <div className="flex justify-around text-center mt-6 border-t pt-4 border-zinc-200 dark:border-zinc-700">
        <div>
          <p className="text-lg font-bold text-zinc-900 dark:text-white">120</p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Tulisan</p>
        </div>
        <div>
          <p className="text-lg font-bold text-zinc-900 dark:text-white">
            3.200
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Warga</p>
        </div>
        <div>
          <p className="text-lg font-bold text-zinc-900 dark:text-white">500</p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Tetangga</p>
        </div>
      </div>

      {/* Tab Konten */}
      <div className="mt-8">
        <div className="flex justify-around border-b border-zinc-200 dark:border-zinc-700 text-xs sm:text-sm">
          <button
            onClick={() => setActiveTab("timeline")}
            className={tabClass("timeline")}>
            <Globe className="w-4 h-4" />{" "}
            <span className="hidden sm:inline">Timeline Publik</span>
          </button>
          <button
            onClick={() => setActiveTab("curhatan")}
            className={tabClass("curhatan")}>
            <MessageSquareQuote className="w-4 h-4" />{" "}
            <span className="hidden sm:inline">Curhatan</span>
          </button>
          <button
            onClick={() => setActiveTab("simpan")}
            className={tabClass("simpan")}>
            <Lock className="w-4 h-4" />{" "}
            <span className="hidden sm:inline">Simpanan</span>
          </button>
          <button
            onClick={() => setActiveTab("komunitas")}
            className={tabClass("komunitas")}>
            <Users className="w-4 h-4" />{" "}
            <span className="hidden sm:inline">Komunitas</span>
          </button>
        </div>

        {/* Konten tiap tab */}
        <div className="mt-4">
          {activeTab === "timeline" && (
            <div className="grid grid-cols-3 gap-1">
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className="w-full aspect-square bg-zinc-300 dark:bg-zinc-800"></div>
              ))}
            </div>
          )}

          {activeTab === "curhatan" && (
            <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 py-10">
              Belum ada curhatan rahasia.
            </p>
          )}

          {activeTab === "simpan" && (
            <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 py-10">
              Belum ada simpanan rahasia.
            </p>
          )}

          {activeTab === "komunitas" && (
            <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 py-10">
              Belum mengikuti komunitas apa pun.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
