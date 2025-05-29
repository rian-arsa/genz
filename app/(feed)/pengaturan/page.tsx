// app/settings/page.tsx
// import AccountSection from "./sections/AccountSection";
// import PrivacySection from "./sections/PrivacySection";
// import NotificationSection from "./sections/NotificationSection";
// import AppearanceSection from "./sections/AppearanceSection";
// import DataSection from "./sections/DataSection";
// import SupportSection from "./sections/SupportSection";
// import DangerSection from "./sections/DangerSection";
// app/settings/page.tsx
"use client";

import { useEffect, useState } from "react";
const sections = [
  { id: "account", label: "Akun & Profil" },
  { id: "privacy", label: "Privasi & Keamanan" },
  { id: "notifications", label: "Notifikasi" },
  { id: "appearance", label: "Tampilan" },
  { id: "data", label: "Data & Aktivitas" },
  { id: "support", label: "Bantuan" },
  { id: "danger", label: "Aksi Akun" },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("account");

  return (
    <main className="w-full mx-auto px-4 py-8">
      {/* Responsive: Dropdown on mobile, sidebar on desktop */}
      <div className="sm:hidden mb-4">
        <select
          value={activeSection}
          onChange={(e) => setActiveSection(e.target.value)}
          className="w-full p-2 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-white">
          {sections.map((section) => (
            <option key={section.id} value={section.id}>
              {section.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col sm:flex-row border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden">
        {/* Sidebar ala Instagram */}
        <aside className="hidden sm:block sm:w-1/3 bg-zinc-50 dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-700 p-4">
          <h2 className="text-lg font-semibold mb-4 text-zinc-800 dark:text-white">
            Pengaturan
          </h2>
          <nav className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full text-left px-3 py-2 rounded text-sm transition ${
                  activeSection === section.id
                    ? "bg-zinc-200 dark:bg-zinc-800 text-pink-600 font-medium"
                    : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }`}>
                {section.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content area */}
        <div className="w-full sm:w-2/3 p-6">
          {activeSection === "account" && <AccountSection />}
          {activeSection === "privacy" && <PrivacySection />}
          {activeSection === "notifications" && <NotificationSection />}
          {activeSection === "appearance" && <AppearanceSection />}
          {activeSection === "data" && <DataSection />}
          {activeSection === "support" && <SupportSection />}
          {activeSection === "danger" && <DangerSection />}
        </div>
      </div>
    </main>
  );
}
// Semua section tetap menggunakan struktur konsisten seperti sebelumnya
// dan diberi ID yang sesuai untuk navigasi scroll-to-section
// Sidebar sticky untuk desktop, responsif jadi di atas pada mobile

function AccountSection() {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-zinc-800 dark:text-white">
        Akun & Profil
      </h2>
      <div className="space-y-2">
        <div>
          <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-300">
            Nama Lengkap
          </label>
          <input
            type="text"
            placeholder="Nama kamu"
            className="w-full px-3 py-2 mt-1 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 text-sm text-zinc-800 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-300">
            Username
          </label>
          <input
            type="text"
            placeholder="username"
            className="w-full px-3 py-2 mt-1 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 text-sm text-zinc-800 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-300">
            Email
          </label>
          <input
            type="email"
            placeholder="email@example.com"
            className="w-full px-3 py-2 mt-1 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 text-sm text-zinc-800 dark:text-white"
          />
        </div>
      </div>
    </section>
  );
}

// app/settings/sections/PrivacySection.tsx
function PrivacySection() {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-zinc-800 dark:text-white">
        Privasi & Keamanan
      </h2>
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" className="accent-pink-600" />
          Akun privat (hanya pengikut yang dapat melihat)
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" className="accent-pink-600" />
          Nonaktifkan pesan dari non-pengikut
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" className="accent-pink-600" />
          Verifikasi dua langkah
        </label>
      </div>
    </section>
  );
}

// app/settings/sections/NotificationSection.tsx
function NotificationSection() {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-zinc-800 dark:text-white">
        Notifikasi
      </h2>
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" className="accent-pink-600" />
          Notifikasi postingan baru
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" className="accent-pink-600" />
          Notifikasi komentar
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" className="accent-pink-600" />
          Notifikasi DM
        </label>
      </div>
    </section>
  );
}

// app/settings/sections/AppearanceSection.tsx
function AppearanceSection() {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-zinc-800 dark:text-white">
        Tampilan
      </h2>
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm">
          <input type="radio" name="theme" className="accent-pink-600" />
          Terang
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="radio" name="theme" className="accent-pink-600" />
          Gelap
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="radio" name="theme" className="accent-pink-600" />
          Ikuti sistem
        </label>
      </div>
    </section>
  );
}

// app/settings/sections/DataSection.tsx
function DataSection() {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-zinc-800 dark:text-white">
        Data & Aktivitas
      </h2>
      <div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
        <button className="underline hover:text-pink-600">
          Unduh data akun
        </button>
        <button className="underline hover:text-pink-600">
          Lihat histori aktivitas
        </button>
        <button className="underline hover:text-pink-600">
          Hapus histori pencarian
        </button>
      </div>
    </section>
  );
}

// app/settings/sections/SupportSection.tsx
function SupportSection() {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-zinc-800 dark:text-white">
        Bantuan & Dukungan
      </h2>
      <div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
        <button className="underline hover:text-pink-600">Pusat Bantuan</button>
        <button className="underline hover:text-pink-600">
          Laporkan Masalah
        </button>
        <button className="underline hover:text-pink-600">Hubungi Kami</button>
      </div>
    </section>
  );
}

// app/settings/sections/DangerSection.tsx
function DangerSection() {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-red-600">Aksi Akun</h2>
      <div className="space-y-2 text-sm">
        <button className="w-full text-left text-red-600 underline hover:text-red-700">
          Keluar
        </button>
        <button className="w-full text-left text-red-600 underline hover:text-red-700">
          Hapus Akun
        </button>
      </div>
    </section>
  );
}
