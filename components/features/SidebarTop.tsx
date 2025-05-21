"use client";

import { Menu, Moon, Search, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function MobileHeader({
  onMenuClick,
}: {
  onMenuClick?: () => void;
}) {
  const { theme, setTheme } = useTheme();

  return (
    <div className="sm:hidden fixed top-0 left-0 w-full h-14 px-4 flex items-center justify-between border-b bg-white dark:bg-zinc-900 z-50">
      {/* Left: Burger */}
      <button
        onClick={onMenuClick}
        className="p-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800">
        <Menu className="w-5 h-5 text-zinc-700 dark:text-zinc-200" />
      </button>

      {/* Right: Search */}
      <div className="flex items-center space-x-4">
        {/* Theme Toggle */}
        <button
          className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme">
          {theme === "dark" ? (
            <Sun className="w-5 h-5 text-zinc-700 dark:text-zinc-200" />
          ) : (
            <Moon className="w-5 h-5 text-zinc-700 dark:text-zinc-200" />
          )}
        </button>
        <button className="p-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800">
          <Search className="w-5 h-5 text-zinc-700 dark:text-zinc-200" />
        </button>
      </div>
    </div>
  );
}
