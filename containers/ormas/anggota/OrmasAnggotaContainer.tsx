"use client";

import { DUMMY_MEMBER } from "@/dummy/member";
import Image from "next/image";
import { useState } from "react";

export default function OrganizationMembersPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const PER_PAGE = 12;

  const filtered = DUMMY_MEMBER.filter((member) =>
    member.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6 bg-white dark:bg-[#1f1f1f] rounded-xl shadow-sm">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-zinc-800 dark:text-white flex items-center gap-2">
          📋 Daftar Anggota Resmi
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Temukan anggota resmi dari organisasi masyarakat yang terpercaya.
          Bergabunglah dengan organisasi masyarakat kami dan dukung kegiatan
          sosial yang positif!
        </p>
      </div>

      {/* Search, Kategori, dan Tanggal */}
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="text-sm text-zinc-800 dark:text-zinc-400 block mb-1">
            Pencarian
          </label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari barang apa ..."
            className="w-full px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm text-zinc-800 dark:text-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {paginated.map((member) => (
          <div
            key={member.id}
            className="flex flex-col items-center text-center border border-zinc-200 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-900 p-5 shadow-sm hover:shadow-md transition">
            <div className="relative h-10 w-10 rounded-full overflow-hidden mb-3">
              <Image
                src={member.avatarUrl}
                alt={member.name}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-sm font-semibold text-zinc-800 dark:text-white">
              {member.name}
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Bergabung sejak{" "}
              {new Date(member.joinedAt).toLocaleDateString("id-ID")}
            </p>
          </div>
        ))}

        {paginated.length === 0 && (
          <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 col-span-full">
            Tidak ada anggota ditemukan.
          </p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-10 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-4 py-2 text-sm rounded-md border transition ${
                page === i + 1
                  ? "bg-pink-500 text-white"
                  : "text-zinc-700 dark:text-white border-zinc-300 dark:border-zinc-700"
              }`}>
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
