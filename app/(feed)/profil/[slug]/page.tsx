// app/r/[slug]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import {
  MapPin,
  Heart,
  Users,
  Share2,
  Search,
  Bookmark,
  UserCircle,
} from "lucide-react";

const mockData = {
  "cafe-ternyaman": {
    title: "☕ Cafe Ternyaman",
    description:
      "Tempat-tempat ngopi paling nyaman pilihan warga. Cocok buat kerja, ngobrol santai, atau baca buku.",
    owner: {
      name: "Ayu Pramesti",
      username: "ayunicorn",
      avatar: "/images/ayu.jpg",
    },
    items: [
      {
        name: "Kopikina",
        address: "Jl. Kopi No. 1, Jakarta",
        image: "/images/kopikina.jpg",
        note: "Suasana tenang, stopkontak banyak, wifi stabil. Cocok buat ngoding sambil ngopi.",
        rating: 4.8,
        likes: 87,
      },
      {
        name: "Titik Temu Coffee",
        address: "Jl. Raya Kemang, Jakarta",
        image: "/images/titiktemu.jpg",
        note: "Estetik dan cozy, spot andalan anak desain & konten kreator.",
        rating: 4.6,
        likes: 42,
      },
    ],
  },
  "makan-malam-rame": {
    title: "🍽️ Makan Malam Rame",
    description:
      "Pilihan tempat makan malam rame dan seru bareng teman, gebetan, atau keluarga digital kamu.",
    owner: {
      name: "Rafi Zaki",
      username: "rafi_zzz",
      avatar: "/images/rafi.jpg",
    },
    items: [],
  },
};

export default function RecommendationDetailPage() {
  const params = useParams();
  const slug = params.slug as keyof typeof mockData;
  const data = mockData[slug];
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("default");

  const filteredItems = data.items
    .filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.address.toLowerCase().includes(search.toLowerCase()) ||
        item.note.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "rating") return b.rating - a.rating;
      if (sortOption === "likes") return (b.likes || 0) - (a.likes || 0);
      return 0;
    });

  if (!data)
    return (
      <p className="text-center text-zinc-500 py-20">
        Rekomendasi tidak ditemukan 😢
      </p>
    );

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
          {data.title}
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
          {data.description}
        </p>
        <div className="mt-4 flex justify-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 items-center">
          <UserCircle className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
          <span>
            oleh{" "}
            <span className="font-medium text-zinc-700 dark:text-white">
              {data.owner.name}
            </span>{" "}
            @{data.owner.username}
          </span>
        </div>
      </div>

      <div className="mb-4 flex flex-col sm:flex-row items-center gap-3">
        <div className="flex items-center bg-zinc-100 dark:bg-zinc-800 rounded-full px-4 py-2 shadow-inner w-full sm:w-auto flex-1">
          <Search className="w-4 h-4 text-zinc-500 dark:text-zinc-400 mr-2" />
          <input
            type="text"
            placeholder="Cari tempat..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none w-full text-sm text-zinc-800 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
          />
        </div>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="text-sm px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-full text-zinc-600 dark:text-zinc-300 bg-white dark:bg-zinc-800">
          <option value="default">Terbaru</option>
          <option value="rating">Rating Tertinggi</option>
          <option value="likes">Favorit Terbanyak</option>
        </select>
      </div>

      <div className="space-y-6">
        {filteredItems.map((item, index) => (
          <div
            key={index}
            className="flex gap-4 bg-zinc-50 dark:bg-zinc-900 rounded-xl p-4 shadow-sm">
            <div className="relative w-24 h-24 rounded-md overflow-hidden">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-base font-semibold text-zinc-800 dark:text-white mb-1">
                {item.name}{" "}
                <span className="text-sm text-yellow-500">
                  ⭐ {item.rating}
                </span>
              </h2>
              <a
                href={`https://www.google.com/maps/search/${encodeURIComponent(
                  item.address
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center hover:underline">
                <MapPin className="w-4 h-4 mr-1" /> {item.address}
              </a>
              <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300 italic">
                “{item.note}”
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button className="flex items-center gap-1 px-3 py-1 text-xs font-medium bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-200 rounded-full">
                  <Heart className="w-3 h-3" /> Favoritkan
                </button>
                <button className="flex items-center gap-1 px-3 py-1 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-white rounded-full">
                  <Share2 className="w-3 h-3" /> Bagikan
                </button>
                <button className="flex items-center gap-1 px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded-full">
                  <Bookmark className="w-3 h-3" /> Simpan
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredItems.length === 0 && (
          <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 py-12">
            Tidak ditemukan hasil yang cocok 😶‍🌫️
          </p>
        )}
      </div>
    </main>
  );
}
