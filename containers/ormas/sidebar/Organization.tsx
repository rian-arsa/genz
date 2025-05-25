"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SidebarCollapse } from "@/components";
import { Plus } from "lucide-react";

export type TOrganization = {
  id: string;
  href?: string;
  avatarUrl: string;
  name: string;
  isAdmin?: boolean;
  isActive?: boolean;
};

const items: TOrganization[] = [
  {
    id: "1",
    href: "/ormas/1",
    avatarUrl: "/images/avatar2.jpg",
    name: "Organisasi A",
    isAdmin: true,
    isActive: true,
  },
  {
    id: "2",
    href: "/ormas/2",
    avatarUrl: "/images/avatar2.jpg",
    name: "Organisasi B",
    isAdmin: true,
    isActive: false,
  },
  {
    id: "3",
    href: "/ormas/3",
    avatarUrl: "/images/avatar2.jpg",
    name: "Organisasi C",
    isAdmin: false,
    isActive: false,
  },
];

export default function Organization() {
  const [query, setQuery] = useState("");

  const filtered = items.filter((org) =>
    org.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <SidebarCollapse isLoading={false} title="Ormas Saya" isOpen={true}>
      <aside className="space-y-2">
        <div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari ormas..."
            className="w-full px-3 py-1.5 text-sm border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400"
          />
        </div>

        <div className="space-y-1 max-h-96 overflow-y-auto">
          {filtered.map((org) => (
            <Link
              key={org.id}
              href={org.href || "#"}
              className="flex items-center gap-3 px-2 py-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors ">
              <Image
                src={org.avatarUrl}
                alt={org.name}
                width={32}
                height={32}
                className="rounded-full object-cover"
              />
              <span className="text-sm text-zinc-800 dark:text-zinc-200 truncate ">
                {org.name}
              </span>
            </Link>
          ))}

          {filtered.length === 0 && (
            <p className="text-xs text-zinc-500 italic p-2">
              Tidak ada organisasi yang ditemukan.
            </p>
          )}
        </div>

        <button
          onClick={() => alert("Tambah Organisasi")}
          className="w-full flex items-center gap-2 text-sm font-semibold text-pink-600  dark:hover:bg-zinc-800 transition-all px-4 py-3 cursor-pointer hover:underline rounded-md ">
          <Plus className="w-4 h-4" /> Buat Ormas
        </button>
      </aside>
    </SidebarCollapse>
  );
}
