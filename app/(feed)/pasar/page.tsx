"use client";

import { Search, ShoppingCart } from "lucide-react";
import { useState } from "react";
import ProductGrid from "./List";
import TopInfoSection from "./TopInfo";

const categories = ["Elektronik", "Fashion", "Makanan", "Minuman"];

export default function SearchHeader() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <>
      <TopInfoSection />
      <header className="w-full bg-white border-b border-zinc-200 shadow-sm">
        {/* Top Bar */}
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          {/* Brand */}
          <div className="text-xl font-bold text-pink-600 whitespace-nowrap">
            Toko<span className="text-zinc-800">Saya</span>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari produk, kategori, atau brand..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 rounded-full border border-zinc-300 bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm placeholder-zinc-400"
              />
            </div>
          </div>

          {/* Cart Icon */}
          <button className="relative p-2 rounded-full hover:bg-zinc-100 transition">
            <ShoppingCart className="w-6 h-6 text-zinc-700" />
            <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs px-1.5 py-0.5 rounded-full">
              2
            </span>
          </button>
        </div>

        {/* Kategori Pills */}
        <div className="max-w-7xl mx-auto px-4 py-2 bg-zinc-50 border-t border-zinc-100">
          <div className="flex gap-2 overflow-x-auto hide-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 text-sm rounded-full border whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? "bg-pink-100 text-pink-600 border-pink-500"
                    : "bg-white text-zinc-600 border-zinc-300 hover:border-pink-400"
                }`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* List */}
      <ProductGrid />
    </>
  );
}
