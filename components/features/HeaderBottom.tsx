"use client";

import { Home, MessageSquare, Bell, User, Search } from "lucide-react";
import { useState } from "react";

export default function MobileBottomNav() {
  const [active, setActive] = useState("home");

  const items = [
    { id: "home", icon: <Home className="w-5 h-5" />, label: "Home" },
    { id: "search", icon: <Search className="w-5 h-5" />, label: "Search" },
    {
      id: "answer",
      icon: <MessageSquare className="w-5 h-5" />,
      label: "Answer",
    },
    { id: "notif", icon: <Bell className="w-5 h-5" />, label: "Notif" },
    { id: "profile", icon: <User className="w-5 h-5" />, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 bg-white dark:bg-zinc-900 border-t md:hidden">
      <ul className="flex justify-between items-center px-4 py-2">
        {items.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => setActive(item.id)}
              className={`flex flex-col items-center text-xs py-3 ${
                active === item.id
                  ? "text-primary"
                  : "text-zinc-500 dark:text-zinc-400"
              }`}>
              {item.icon}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
