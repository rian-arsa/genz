// app/profile/[username]/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { Globe, Users, Link as LinkIcon } from "lucide-react";
import Link from "next/link";

export default function OtherProfilePage() {
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
            Bio pengguna. Kutipan atau status negara digital di sini.
          </p>
          <button className="mt-2 px-4 py-1 text-sm font-medium bg-pink-600 text-white rounded-full">
            Ikuti
          </button>
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
            <span className="hidden sm:inline">Timeline</span>
          </button>
          <button
            onClick={() => setActiveTab("komunitas")}
            className={tabClass("komunitas")}>
            <Users className="w-4 h-4" />{" "}
            <span className="hidden sm:inline">Komunitas</span>
          </button>
          <button
            onClick={() => setActiveTab("tautan")}
            className={tabClass("tautan")}>
            <LinkIcon className="w-4 h-4" />{" "}
            <span className="hidden sm:inline">Rekomendasi</span>
          </button>
        </div>

        {/* Konten tiap tab */}
        <div className="mt-4">
          {activeTab === "timeline" && (
            <div className="grid grid-cols-3 gap-1">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="w-full aspect-square bg-zinc-300 dark:bg-zinc-800"></div>
              ))}
            </div>
          )}

          {activeTab === "komunitas" && (
            <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 py-10">
              Komunitas yang diikuti oleh pengguna ini akan muncul di sini.
            </p>
          )}

          {activeTab === "tautan" && (
            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-zinc-800 dark:text-white">
                Rekomendasi Warga
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Link
                  href="/r/cafe-ternyaman"
                  className="block bg-zinc-100 dark:bg-zinc-800 rounded-lg p-4 hover:bg-pink-100 dark:hover:bg-pink-900 transition">
                  <p className="font-medium text-zinc-800 dark:text-white mb-1">
                    🏡 Cafe Ternyaman
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Rekomendasi tempat ngopi favorit dengan suasana tenang dan
                    wifi kencang.
                  </p>
                </Link>
                <Link
                  href="/r/makan-malam-rame"
                  className="block bg-zinc-100 dark:bg-zinc-800 rounded-lg p-4 hover:bg-pink-100 dark:hover:bg-pink-900 transition">
                  <p className="font-medium text-zinc-800 dark:text-white mb-1">
                    🍽️ Makan Malam Rame
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Pilihan tempat makan malam bareng temen atau keluarga yang
                    paling rame.
                  </p>
                </Link>
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
