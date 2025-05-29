"use client";

import { useState } from "react";

const categories = ["Semua", "Interaksi", "Follow", "Sistem"];

const allNotifications = [
  {
    id: 1,
    user: { name: "Rizky", avatar: "/avatar1.png" },
    category: "Interaksi",
    message: "menyukai postingan kamu",
    time: "2 jam yang lalu",
  },
  {
    id: 2,
    user: { name: "Ayu", avatar: "/avatar2.png" },
    category: "Interaksi",
    message: "mengomentari postingan kamu: 'Mantap!'",
    time: "1 hari yang lalu",
  },
  {
    id: 3,
    user: { name: "Andi", avatar: "/avatar3.png" },
    category: "Follow",
    message: "mulai mengikuti kamu",
    time: "3 hari yang lalu",
  },
  {
    id: 4,
    user: { name: "Sistem", avatar: "/system.png" },
    category: "Sistem",
    message: "Kebijakan privasi telah diperbarui.",
    time: "5 hari yang lalu",
  },
];

export default function NotificationPage() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [unreadIds, setUnreadIds] = useState([1, 3]);

  const filtered =
    activeCategory === "Semua"
      ? allNotifications
      : allNotifications.filter((n) => n.category === activeCategory);

  const markAllRead = () => setUnreadIds([]);

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
        Notifikasi
      </h1>

      {/* Tabs */}
      <div className="flex gap-4 sm:gap-6 overflow-x-auto border-b border-zinc-200 dark:border-zinc-700 mb-4 text-sm font-medium">
        {categories.map((cat) => {
          const unreadCount = allNotifications.filter(
            (n) =>
              unreadIds.includes(n.id) &&
              (cat === "Semua" || n.category === cat)
          ).length;

          const isActive = activeCategory === cat;

          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative flex items-center gap-1 pb-2 whitespace-nowrap transition ${
                isActive
                  ? "text-pink-600 border-b-2 border-pink-500"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-pink-600"
              }`}>
              {cat}
              {unreadCount > 0 && (
                <span className="bg-pink-600 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Filter */}
      {unreadIds.length > 0 && (
        <div className="mb-4 text-right">
          <button
            onClick={markAllRead}
            className="text-xs text-pink-600 hover:underline">
            Tandai semua sudah dibaca
          </button>
        </div>
      )}

      {/* List */}
      <div className="space-y-3">
        {filtered.length > 0 ? (
          filtered.map((notif) => {
            const isUnread = unreadIds.includes(notif.id);
            return (
              <div
                key={notif.id}
                className={`flex items-start gap-3 p-4 rounded-xl border transition ${
                  isUnread
                    ? "bg-pink-50 dark:bg-pink-950 border-pink-200 dark:border-pink-800"
                    : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700"
                }`}>
                <img
                  src={notif.user.avatar}
                  alt={notif.user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1 text-sm">
                  <p className="text-zinc-800 dark:text-zinc-100">
                    <span className="font-medium">{notif.user.name}</span>{" "}
                    {notif.message}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    {notif.time}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-sm text-zinc-500 dark:text-zinc-400 text-center py-12">
            Tidak ada notifikasi.
          </div>
        )}
      </div>
    </main>
  );
}
