"use client";
import { useState, useRef, useEffect } from "react";
import {
  Bell,
  User,
  Globe,
  Home,
  MessageSquare,
  Users,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "next-themes";

export default function Header() {
  const { theme, setTheme } = useTheme();

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

  const NotifDropdown = () => (
    <div className="absolute right-12 top-12 w-64 bg-white dark:bg-zinc-800 shadow-lg rounded-md p-3 z-50 text-sm">
      <p className="text-zinc-700 dark:text-zinc-200 font-semibold mb-2">
        Notifications
      </p>
      <ul className="flex flex-col gap-2">
        <li className="hover:bg-zinc-100 dark:hover:bg-zinc-700 p-2 rounded-md cursor-pointer">
          🎉 Selamat datang di Negara GenZ!
        </li>
        <li className="hover:bg-zinc-100 dark:hover:bg-zinc-700 p-2 rounded-md cursor-pointer">
          💡 Fitur baru tersedia sekarang.
        </li>
      </ul>
    </div>
  );

  const UserDropdown = () => (
    <div className="absolute right-0 top-12 w-48 bg-white dark:bg-zinc-800 shadow-lg rounded-md p-2 z-50">
      <ul className="flex flex-col gap-2 text-sm text-zinc-700 dark:text-zinc-200">
        <li className="px-4 py-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-700 cursor-pointer">
          Profile
        </li>
        <li className="px-4 py-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-700 cursor-pointer">
          Settings
        </li>
        <li className="px-4 py-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-700 cursor-pointer">
          Logout
        </li>
      </ul>
    </div>
  );

  return (
    <header className="hidden md:flex fixed top-0 w-full border-b bg-white dark:bg-zinc-900 px-4 py-2 items-center justify-between shadow-sm z-50">
      <span className="text-xl font-bold text-primary">Negara GenZ</span>

      <div className="flex flex-1 items-center justify-center space-x-4 mx-4">
        <div className="hidden sm:flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-primary/10">
            <Home className="w-5 h-5 text-zinc-700 dark:text-zinc-200" />
          </button>
          <button className="p-2 rounded-full hover:bg-primary/10">
            <MessageSquare className="w-5 h-5 text-zinc-700 dark:text-zinc-200" />
          </button>
          <button className="p-2 rounded-full hover:bg-primary/10">
            <Users className="w-5 h-5 text-zinc-700 dark:text-zinc-200" />
          </button>
          <button className="p-2 rounded-full hover:bg-primary/10">
            <Globe className="w-5 h-5 text-zinc-700 dark:text-zinc-200" />
          </button>
        </div>
        <div className="w-full max-w-md">
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-full border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2 relative">
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
        {/* Notif */}
        <div ref={notifRef}>
          <button
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 relative"
            onClick={() => setShowNotifDropdown(!showNotifDropdown)}>
            <Bell className="w-5 h-5 text-zinc-700 dark:text-zinc-200" />
          </button>
          {showNotifDropdown && <NotifDropdown />}
        </div>

        {/* User */}
        <div ref={userRef}>
          <button
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
            onClick={() => setShowUserDropdown(!showUserDropdown)}>
            <User className="w-5 h-5 text-zinc-700 dark:text-zinc-200" />
          </button>
          {showUserDropdown && <UserDropdown />}
        </div>
      </div>
    </header>
  );
}
