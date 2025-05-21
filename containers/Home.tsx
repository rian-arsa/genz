"use client";

import {
  Header,
  HeaderBottom,
  Sidebar,
  SidebarTop,
} from "@/components/features";
import { useState } from "react";

export default function Home() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Header />

      <div className="flex h-screen overflow-hidden relative">
        <Sidebar />
        {isSidebarOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-40 sm:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <Sidebar isMobile={true} onClose={() => setSidebarOpen(false)} />
          </>
        )}

        <div className="flex-1 flex flex-col">
          <SidebarTop onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1 overflow-y-auto pt-20 p-4 bg-zinc-50 dark:bg-zinc-950">
            <div className="max-w-2xl mx-auto">
              <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-200">
                Selamat datang di Negara GenZ!
              </h1>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                Ini adalah platform untuk berbagi informasi dan berdiskusi
                tentang berbagai topik menarik.
              </p>
            </div>
          </main>
        </div>
      </div>

      <HeaderBottom />
    </>
  );
}
