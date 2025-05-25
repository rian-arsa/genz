"use client";

import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";
import { EVENTS_DUMMY } from "@/dummy/event";

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
  const [activeTab, setActiveTab] = useState("Semua");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [page, setPage] = useState(1);

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filteredEvents = events.filter((event) => {
    const matchTab =
      activeTab === "Semua" ||
      (activeTab === "Mendatang" && event.status === "upcoming") ||
      (activeTab === "Berlangsung" && event.status === "live") ||
      (activeTab === "Selesai" && event.status === "past");

    const matchCategory =
      selectedCategory === "Semua" || event.category === selectedCategory;

    const matchSearch = event.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchDate =
      !selectedDate || new Date(event.date) >= new Date(selectedDate);

    return matchTab && matchCategory && matchSearch && matchDate;
  });

  const paginatedEvents = filteredEvents.slice(
    (page - 1) * EVENTS_PER_PAGE,
    page * EVENTS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredEvents.length / EVENTS_PER_PAGE);

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6 bg-white dark:bg-[#1f1f1f] rounded-xl shadow-sm">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-zinc-800 dark:text-white">
          🎟️ Event Ormas Resmi
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Ikuti dan hadir di kegiatan yang kamu suka!
        </p>
      </div>

      {/* Search, Kategori, dan Tanggal */}
      <div className="rounded-xl bg-white dark:bg-zinc-900 p-4 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="text-sm text-zinc-500 dark:text-zinc-400 block mb-1">
              Pencarian
            </label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari event..."
              className="w-full px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm text-zinc-800 dark:text-white"
            />
          </div>
          <div>
            <label className="text-sm text-zinc-500 dark:text-zinc-400 block mb-1">
              Kategori
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm text-zinc-800 dark:text-white">
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm text-zinc-500 dark:text-zinc-400 block mb-1">
              Mulai dari tanggal
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm text-zinc-800 dark:text-white"
            />
          </div>
          <div>
            <label className="text-sm text-zinc-500 dark:text-zinc-400 block mb-1 invisible">
              .
            </label>
            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("Semua");
                setSelectedDate("");
              }}
              className="w-full text-sm px-4 py-2 rounded-md bg-zinc-100 dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600 text-zinc-800 dark:text-white">
              Reset Filter
            </button>
          </div>
        </div>
      </div>

      {/* Tab Filter */}
      <div className="flex gap-4 border-b border-zinc-200 dark:border-zinc-700">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={clsx(
              "px-3 py-2 text-sm font-medium transition-all",
              activeTab === tab
                ? "border-b-2 border-pink-500 text-pink-600 dark:text-pink-400"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
            )}>
            {tab}
          </button>
        ))}
      </div>

      {/* Grid Event */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {paginatedEvents.length === 0 ? (
          <p className="text-sm text-zinc-500 dark:text-zinc-400 italic">
            Tidak ada event ditemukan.
          </p>
        ) : (
          paginatedEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={event.imageUrl}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 left-2 bg-pink-600 text-white text-xs font-medium px-2 py-1 rounded-md shadow">
                  {new Date(event.date).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
              </div>
              <div className="p-4 space-y-2">
                <h2 className="text-sm font-semibold text-zinc-800 dark:text-white truncate">
                  {event.title}
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                  📍 {event.location}
                </p>
                <p className="text-xs text-zinc-600 dark:text-zinc-300">
                  💸{" "}
                  {event.price === 0
                    ? "Gratis"
                    : event.price.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                </p>
                <button className="mt-2 inline-block bg-pink-500 hover:bg-pink-600 text-white text-xs px-3 py-1.5 rounded-md">
                  Lihat Detail
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 pt-4">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1.5 text-sm rounded-md border text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700 disabled:opacity-40">
            Sebelumnya
          </button>
          <span className="px-3 py-1.5 text-sm text-zinc-700 dark:text-zinc-300">
            Halaman {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-3 py-1.5 text-sm rounded-md border text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700 disabled:opacity-40">
            Berikutnya
          </button>
        </div>
      )}
    </div>
  );
}
