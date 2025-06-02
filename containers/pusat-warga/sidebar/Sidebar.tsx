// components/RightSidebar.tsx

import Image from "next/image";
import { BadgeCheck, CalendarHeart, Gift } from "lucide-react";
import { SidebarCollapse } from "@/components";
import { useUserStore } from "@/store";

export type TLeftSidebarProps = {};

export default function Sidebar() {
  const user = useUserStore((s) => s.user);

  const ProfileSidebar = (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1f1f1f] shadow-sm p-4 space-y-4">
      <div className="flex items-center gap-3">
        <Image
          src={user?.avatar_url || "/images/profil/default_avatar_male.png"}
          alt="Avatar"
          width={48}
          height={48}
          className="rounded-full object-cover border"
        />
        <div>
          <p className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-1">
            {user?.name || "Warga Negara Gen Z"}
            {user?.verified_status && (
              <BadgeCheck className="text-blue-500 w-4 h-4" />
            )}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            @{user?.username || "warga_gen_z"}
          </p>
        </div>
      </div>
      <div>
        <p className="text-xs text-gray-700 dark:text-gray-300">
          {user?.bio ||
            "Selamat datang di Negara Gen Z! Tempatnya kita berbagi cerita, berdiskusi, dan berkolaborasi."}
        </p>
      </div>
      <div className="text-center border-t border-gray-100 dark:border-gray-800 pt-4">
        <p className="text-xs text-gray-500 dark:text-gray-400">Poin Saya</p>
        <p className="text-2xl font-bold text-primary pt-2">
          💰 {user?.points}
        </p>
      </div>
      <div className="text-center space-x-2">
        <button className="text-xs font-medium text-primary hover:underline cursor-pointer">
          Belanja
        </button>
        <span>
          <span className="text-xs text-gray-400">|</span>
        </span>
        <button className="text-xs font-medium text-primary hover:underline cursor-pointer">
          Riwayat
        </button>
      </div>
    </div>
  );

  return (
    <aside className="w-full md:w-72 xl:w-80 p-4 space-y-2 pt-20 mb-20">
      {ProfileSidebar}

      {/* Section 3: Parlemen Sosial */}
      <SidebarCollapse isLoading={false} title="Parlemen Sosial">
        <div className="space-y-2">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Diskusikan isu-isu terkini di Parlemen Sosial.
          </p>
        </div>
      </SidebarCollapse>

      {/* Section 4: Ormas Relevan */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1f1f1f] p-4 shadow-sm">
        <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
          🏛️ Organisasi Masyarakat
        </p>
        <ul className="space-y-3">
          <li>
            <p className="font-semibold text-gray-800 dark:text-white">
              Pemuda Digital
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              3.2K warga
            </p>
          </li>
          <li>
            <p className="font-semibold text-gray-800 dark:text-white">
              Anti Hoax Indonesia
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              1.8K warga
            </p>
          </li>
          <li>
            <p className="font-semibold text-gray-800 dark:text-white">
              Komunitas UI/UX Gen Z
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              2.4K warga
            </p>
          </li>
        </ul>
      </div>

      {/* Section 5: Suasana Negara */}
      {/* <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1f1f1f] p-4 shadow-sm">
        <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
          🧠 Suasana Negara
        </p>
        <div className="text-sm text-gray-600 dark:text-gray-300">
          🔥 Semangat ngoding, katanya.
        </div>
      </div> */}

      {/* Section 6: Footer Info */}
      <div className="text-[11px] text-gray-400 dark:text-gray-600 pt-4 border-t border-gray-100 dark:border-gray-800 space-y-1">
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          <span className="hover:underline cursor-pointer">Tentang</span>
          <span className="hover:underline cursor-pointer">Aksesibilitas</span>
          <span className="hover:underline cursor-pointer">Pusat Bantuan</span>
          <span className="hover:underline cursor-pointer">
            Privasi & Ketentuan
          </span>
          <span className="hover:underline cursor-pointer">Opsi Iklan</span>
          <span className="hover:underline cursor-pointer">Periklanan</span>
          <span className="hover:underline cursor-pointer">Layanan Bisnis</span>
          <span className="hover:underline cursor-pointer">
            Dapatkan aplikasi Negara Gen Z
          </span>
          <span className="hover:underline cursor-pointer">Lainnya</span>
        </div>
        <p className="pt-2">© 2025 Negara Gen Z</p>
      </div>
    </aside>
  );
}
