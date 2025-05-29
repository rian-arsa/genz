"use client";

import {
  User,
  CalendarDays,
  ShoppingBag,
  Home,
  Users,
  ScrollText,
  Mails,
  HandCoins,
  HeartHandshake,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { SidebarCollapse } from "@/components";

type TMenuItem = {
  label: string;
  icon: React.ReactNode;
  href: string;
  count?: number; // Optional count for notifications or items
};

const menuItems: TMenuItem[] = [
  { label: "Beranda", icon: <Home className="w-4 h-4" />, href: "" },
  { label: "Profil", icon: <User className="w-4 h-4" />, href: "profil" },
  {
    label: "Anggota",
    icon: <Users className="w-4 h-4" />,
    href: "anggota",
    count: 5, // Example count for members
  },
  {
    label: "Pesan",
    icon: <Mails className="w-4 h-4" />,
    href: "/pesan",
  },
  {
    label: "Event",
    icon: <CalendarDays className="w-4 h-4" />,
    href: "event",
    count: 5, // Example count for events
  },
  {
    label: "Toko",
    icon: <ShoppingBag className="w-4 h-4" />,
    href: "toko",
    count: 3, // Example count for items in the store
  },
  // {
  //   label: "Galang Dana",
  //   icon: <HandCoins className="w-4 h-4" />,
  //   href: "galang-dana",
  // },
  {
    label: "Dukungan",
    icon: <HeartHandshake className="w-4 h-4" />,
    href: "dukungan",
  },
];

export default function OrganizationSidebarMenu() {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigate = (url: string) => {
    const segments = pathname.split("/").slice(0, 3); // ["", "ormas", "121212121", "toko"]
    if (segments.length >= 3) {
      // slice 3
      segments[3] = url; // ganti segment terakhir
      const newPath = segments.join("/"); // "/ormas/121212121/event"
      router.push(newPath);
    }
  };

  return (
    <SidebarCollapse isLoading={false} title="Menu" isOpen={true}>
      <nav className="space-y-1">
        {menuItems.map((item) => {
          return (
            <button
              key={item.href}
              onClick={() => handleNavigate(item.href)}
              className={clsx(
                "flex items-center gap-2 pr-3 py-2 text-sm rounded-lg transition-colors w-full p-2 cursor-pointer text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              )}>
              <div className="flex justify-between w-full">
                <div className="flex items-center justify-center gap-3">
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                <span className="font-semibold text-zinc-500 dark:text-zinc-400 ">
                  {item.count || ""}
                </span>
              </div>
            </button>
          );
        })}
      </nav>
    </SidebarCollapse>
  );
}
