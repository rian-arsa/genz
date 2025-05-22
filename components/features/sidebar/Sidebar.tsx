"use client";

import clsx from "clsx";
import { X } from "lucide-react";

const items = [
  { label: "Kementerian Kependudukan" },
  { label: "Kementerian Fomo" },
  { label: "Kementerian Keuangan" },
  { label: "Kementerian Entertainment" },
  { label: "Kementerian Curhat" },
];

export default function SidebarGmail({
  isMobile = false,
  onClose,
}: {
  isMobile?: boolean;
  onClose?: () => void;
}) {
  return (
    <aside
      className={clsx(
        "h-screen bg-white dark:bg-zinc-900 border-r px-2 pt-20 py-4 transition-all duration-200 ease-in-out",
        isMobile
          ? "fixed top-0 left-0 w-64 z-50 sm:hidden"
          : "hidden sm:flex flex-col w-64"
      )}>
      {isMobile && (
        <div className="absolute top-4 right-4">
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800">
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      <nav className="flex flex-col gap-2">
        <span className="px-2 py-1 text-xs text-zinc-400 uppercase tracking-wide">
          Kementerian
        </span>
        {items.map((item) => (
          <button
            key={item.label}
            className="flex items-center gap-3 p-2 rounded-md hover:bg-primary/10 group relative">
            <span className="text-sm text-zinc-700 dark:text-zinc-200 text-start">
              # {item.label}
            </span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
