"use client";

import Image from "next/image";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import clsx from "clsx";

const tabs = ["Postingan", "Event", "Anggota", "Pengaturan"];

export default function OrganizationProfilePage() {
  const isAdmin = true;
  const [joined, setJoined] = useState(false);
  const [activeTab, setActiveTab] = useState("Postingan");
  const [isZoomOpen, setZoomOpen] = useState(false);

  const profile = {
    name: "Komunitas Pemuda Peduli",
    avatarUrl: "/images/avatar2.jpg",
    category: "Lingkungan & Sosial",
    location: "Jakarta, Indonesia",
    memberCount: 12500,
    description:
      "Organisasi masyarakat yang fokus pada aksi sosial, lingkungan, dan pemberdayaan pemuda di seluruh Indonesia.",
  };

  const posts = [
    {
      id: "1",
      title: "Bakti Sosial di Ciliwung",
      content:
        "Terima kasih untuk semua relawan yang hadir di aksi minggu lalu!",
    },
    {
      id: "2",
      title: "Open Recruitment Volunteer",
      content:
        "Kami membuka pendaftaran volunteer untuk program penghijauan kota.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Avatar Zoom Modal */}
      <Dialog
        open={isZoomOpen}
        onClose={() => setZoomOpen(false)}
        className="relative z-50">
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white dark:bg-zinc-900 rounded-xl overflow-hidden">
            <Image
              src={profile.avatarUrl}
              alt="Zoomed Avatar"
              width={400}
              height={400}
              className="object-cover"
            />
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Section 1: Profile Info */}
      <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-4">
          <div
            className="cursor-pointer"
            onClick={() => setZoomOpen(true)}
            title="Lihat foto">
            <Image
              src={profile.avatarUrl}
              alt={profile.name}
              width={64}
              height={64}
              className="rounded-xl object-cover border border-zinc-300 dark:border-zinc-700"
            />
          </div>

          <div className="flex-1">
            <h1 className="text-xl font-semibold text-zinc-800 dark:text-white">
              {profile.name}
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {profile.category} • {profile.location}
            </p>
          </div>

          <button
            onClick={() => setJoined((prev) => !prev)}
            className={clsx(
              "text-sm px-4 py-2 rounded-md font-medium transition",
              joined
                ? "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300"
                : "bg-pink-500 text-white hover:bg-pink-600"
            )}>
            {joined ? "Tergabung ✅" : "Gabung"}
          </button>
        </div>

        <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
          {profile.description}
        </p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {profile.memberCount.toLocaleString()} anggota
        </p>
      </section>

      {/* Tab Navigation */}
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

      {/* Section 2: Tab Content */}
      <section className="space-y-3">
        {activeTab === "Postingan" && (
          <>
            {isAdmin && (
              <form className="space-y-2 mb-4">
                <textarea
                  className="w-full border border-zinc-300 dark:border-zinc-700 rounded-md p-2 text-sm dark:bg-zinc-800 dark:text-white"
                  placeholder="Tulis sesuatu untuk organisasi ini..."
                />
                <button
                  type="submit"
                  className="bg-pink-500 hover:bg-pink-600 text-white text-sm px-4 py-2 rounded-md">
                  Posting
                </button>
              </form>
            )}

            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4">
                <h3 className="text-sm font-bold text-zinc-800 dark:text-white mb-1">
                  {post.title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-300">
                  {post.content}
                </p>
              </div>
            ))}
          </>
        )}

        {activeTab === "Event" && (
          <p className="text-sm text-zinc-500 dark:text-zinc-400 italic">
            Belum ada event yang dijadwalkan.
          </p>
        )}

        {activeTab === "Anggota" && (
          <p className="text-sm text-zinc-500 dark:text-zinc-400 italic">
            Daftar anggota akan segera tersedia.
          </p>
        )}

        {activeTab === "Pengurus" && (
          <p className="text-sm text-zinc-500 dark:text-zinc-400 italic">
            Informasi pengurus organisasi akan segera ditampilkan.
          </p>
        )}

        {activeTab === "Pengaturan" && (
          <p className="text-sm text-zinc-500 dark:text-zinc-400 italic">
            Halaman pengaturan organisasi masih dalam pengembangan.
          </p>
        )}
      </section>
    </div>
  );
}
