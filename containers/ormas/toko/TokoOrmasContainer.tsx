"use client";

import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";
import { EVENTS_DUMMY } from "@/dummy/event";
import { DUMMY_PRODUCTS } from "@/dummy/product";
import { Star } from "lucide-react";

// Event model
export type TEvent = {
  id: string;
  title: string;
  imageUrl: string;
  location: string;
  date: string;
  status: "upcoming" | "live" | "past";
  price: number;
  category: string;
};

const categories = ["Semua", "Workshop", "Sosial", "Webinar", "Kompetisi"];
const tabs = ["Semua", "Mendatang", "Berlangsung", "Selesai"];
const EVENTS_PER_PAGE = 6;

const events: TEvent[] = EVENTS_DUMMY;

export default function EventListPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const PER_PAGE = 12;

  const filtered = DUMMY_PRODUCTS.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6 bg-white dark:bg-[#1f1f1f] rounded-xl shadow-sm">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-zinc-800 dark:text-white flex items-center gap-2">
          🛍️ Toko Ormas Resmi
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Temukan berbagai produk resmi dari organisasi masyarakat yang
          terpercaya. Belanja dengan aman dan dukung ormas lokal!
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

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {paginated.map((product) => (
          <div
            key={product.id}
            className="relative group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-sm hover:shadow-md transition-all overflow-hidden">
            {product.discount > 0 && (
              <div className="absolute top-2 left-2 bg-red-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full z-10">
                {product.discount}%
              </div>
            )}
            <div className="relative w-full aspect-square overflow-hidden">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-3 space-y-1">
              <h3 className="text-sm font-medium text-zinc-800 dark:text-white line-clamp-2">
                {product.name}
              </h3>
              <p className="text-base font-bold text-zinc-900 dark:text-pink-400">
                {product.price.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </p>
              <div className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
                <Star className="w-3 h-3 text-yellow-400" />
                <span>{product.rating}</span>
                <span>•</span>
                <span>{product.sold.toLocaleString()} terjual</span>
              </div>
              <div className="text-[11px] text-pink-600 font-medium">
                Bisa COD
              </div>
            </div>
          </div>
        ))}

        {paginated.length === 0 && (
          <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 col-span-full">
            Tidak ada produk ditemukan.
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
