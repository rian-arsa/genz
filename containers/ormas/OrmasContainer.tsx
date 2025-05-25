"use client";

import Image from "next/image";
import { useState } from "react";
import { CheckCircle2, Users } from "lucide-react";
import { DUMMY_ORMAS } from "@/dummy/ormas";

const dummyOrganizations = [
  {
    id: "1",
    name: "Komunitas Peduli Sampah",
    category: "Lingkungan",
    logoUrl: "/images/org1.jpg",
    description:
      "Mengajak masyarakat untuk aktif menjaga kebersihan lingkungan.",
    members: 1200,
    verified: true,
  },
  {
    id: "2",
    name: "Forum Literasi Indonesia",
    category: "Pendidikan",
    logoUrl: "/images/org2.jpg",
    description:
      "Mendorong minat baca dan budaya literasi di seluruh nusantara.",
    members: 860,
    verified: false,
  },
  {
    id: "3",
    name: "Komunitas Teknologi Pemuda",
    category: "Teknologi",
    logoUrl: "/images/org3.jpg",
    description:
      "Memberdayakan anak muda melalui inovasi dan pelatihan digital.",
    members: 1500,
    verified: true,
  },
];

export default function OrganizationLandingPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const PER_PAGE = 6;

  const filtered = DUMMY_ORMAS.filter((org) =>
    org.name.toLowerCase().includes(search.toLowerCase())
  );

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);

  return (
    <div className="max-w-5xl mx-auto w-full px-4">
      <h1 className="text-3xl font-bold text-zinc-800 dark:text-white mb-6">
        Organisasi Masyarakat
      </h1>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Cari organisasi..."
        className="w-full px-5 py-3 mb-8 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm text-zinc-800 dark:text-white shadow focus:outline-none focus:ring-2 focus:ring-pink-500"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {paginated.map((org) => (
          <div
            key={org.id}
            className="group relative flex flex-col border border-zinc-200 dark:border-zinc-700 rounded-2xl bg-gradient-to-tr from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-800 shadow-sm p-5 hover:shadow-lg transition-all">
            <div className="flex items-center gap-4 mb-3">
              <div className="relative h-14 w-14 rounded-full ring-2 ring-pink-500 overflow-hidden">
                <Image
                  src={org.logoUrl}
                  alt={org.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-zinc-800 dark:text-white flex items-center gap-1">
                  {org.name}
                  {org.verified && (
                    <CheckCircle2 className="text-blue-500 w-4 h-4" />
                  )}
                </h3>
                <p className="text-xs text-pink-600 dark:text-pink-400 font-medium">
                  {org.category}
                </p>
              </div>
            </div>

            <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-3 line-clamp-3">
              {org.description}
            </p>
            <div className="flex justify-between items-end mt-auto pt-2">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                <Users className="w-4 h-4 inline-block mr-1" />{" "}
                {org.members.toLocaleString()} anggota
              </p>
              <div className="opacity-0 group-hover:opacity-100 transition">
                <button className="text-sm text-pink-600 hover:underline">
                  Lihat Detail
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-10 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-4 py-2 text-sm rounded-md border transition ${
                page === i + 1
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
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
