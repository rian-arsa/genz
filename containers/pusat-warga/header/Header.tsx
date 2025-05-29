"use client";

import { useState, useRef, useEffect, Dispatch, SetStateAction } from "react";
import {
  Bell,
  User,
  Globe,
  Home,
  MessageSquare,
  Users,
  Sun,
  Moon,
  Menu,
  Search,
  Settings,
  LogOut,
  X,
  ShoppingCart,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useIsMobile } from "@/context/isMobileContextProvider";
import {
  HeaderItem,
  HeaderItemIcon,
  HeaderItemToggleTheme,
  HeaderSearch,
  THeaderItemProfil,
} from "@/components/ui";
import { HeaderNotif, HeaderProfil } from "@/components/features";
import { dummyNotifItems } from "@/dummy/notif";
import { useRouter } from "next/navigation";

const MENUS_PROFIL: THeaderItemProfil[] = [
  {
    icon: <User className="w-4 h-4" />,
    label: "Profil Saya",
    url: "/profile",
  },
  {
    icon: <Settings className="w-4 h-4" />,
    label: "Pengaturan",
    url: "/settings",
  },
  {
    icon: <LogOut className="w-4 h-4 text-red-500" />,
    label: "Keluar",
    url: "/logout",
  },
];

export type THeaderProps = {
  setIsShow?: Dispatch<SetStateAction<boolean>>;
  isShow?: boolean;
};

export default function Header({ setIsShow, isShow }: THeaderProps) {
  const { theme, setTheme } = useTheme();
  const isMobile = useIsMobile();

  const router = useRouter();

  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifDropdown(false);
      }

      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickHeaderItem = (url: string) => {
    router.push(url);
  };

  if (isMobile) {
    return (
      <header className="fixed top-0 left-0 w-full h-14 px-4 flex items-center justify-between border-b bg-white dark:bg-zinc-900 z-50">
        {isShow ? (
          <HeaderItemIcon
            IconName={X}
            onClick={() => setIsShow && setIsShow(false)}
            label="Tutup Menu"
          />
        ) : (
          <HeaderItemIcon
            IconName={Menu}
            onClick={() => setIsShow && setIsShow(true)}
            label="Buka Menu"
          />
        )}
        <div className="flex items-center space-x-4">
          <HeaderItemToggleTheme
            setTheme={setTheme}
            theme={theme || ""}
            IconNameOn={Sun}
            IconNameOff={Moon}
          />
          <HeaderItemIcon
            IconName={Search}
            onClick={() => {}}
            label="Cari info"
          />
        </div>
      </header>
    );
  }

  return (
    <header className="flex fixed top-0 w-full border-b bg-white dark:bg-zinc-900 px-4 py-2 items-center justify-between shadow-sm z-50">
      <span className="text-xl font-bold text-primary">Negara GenZ</span>

      <div className="flex flex-1 items-center justify-center space-x-4 mx-4">
        <div className="hidden sm:flex items-center space-x-4">
          <HeaderItemIcon
            IconName={Home}
            onClick={() => handleClickHeaderItem("/pusat-warga")}
            label="Gosip terbaru"
          />
          <HeaderItemIcon
            IconName={Users}
            onClick={() => handleClickHeaderItem("/ormas")}
            label="Organisasi Masyarakat"
          />
          <HeaderItemIcon
            IconName={MessageSquare}
            onClick={() => handleClickHeaderItem("/chat")}
            label="Diskusi Tetangga"
          />
          <HeaderItemIcon
            IconName={ShoppingCart}
            onClick={() => handleClickHeaderItem("/pasar")}
            label="Pasar Kampung"
          />
        </div>
        <div className="w-full max-w-md">
          <HeaderSearch
            placeholder="Cari berita, topik, atau orang"
            onKeyDown={(searchTerm) => console.log(searchTerm)}
          />
        </div>
      </div>

      <div className="flex items-center space-x-2 relative">
        {/* Theme Toggle */}
        <HeaderItemToggleTheme
          setTheme={setTheme}
          theme={theme || ""}
          IconNameOn={Sun}
          IconNameOff={Moon}
        />
        {/* Notif */}
        <HeaderItem
          itemRef={notifRef}
          showDropdown={showNotifDropdown}
          setShowDropdown={setShowNotifDropdown}
          IconName={Bell}>
          {showNotifDropdown && <HeaderNotif notifs={dummyNotifItems} />}
        </HeaderItem>

        {/* User */}
        <HeaderItem
          itemRef={userRef}
          showDropdown={showUserDropdown}
          setShowDropdown={setShowUserDropdown}
          IconName={User}>
          {showUserDropdown && <HeaderProfil menus={MENUS_PROFIL} />}
        </HeaderItem>
      </div>
    </header>
  );
}
