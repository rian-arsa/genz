"use client";

import { PostInput, PostList } from "@/components/features";
import { useState } from "react";
import dynamic from "next/dynamic";

const Header = dynamic(
  () => import("@/components/features").then((mod) => mod.Header),
  { ssr: false }
);

const HeaderBottom = dynamic(
  () => import("@/components/features").then((mod) => mod.HeaderBottom),
  { ssr: false }
);

const Sidebar = dynamic(
  () => import("@/components/features").then((mod) => mod.Sidebar),
  { ssr: false }
);

const SidebarTop = dynamic(
  () => import("@/components/features").then((mod) => mod.SidebarTop),
  { ssr: false }
);

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
          <main className="flex-1 overflow-y-auto pt-20 p-4 bg-zinc-50 dark:bg-zinc-950 w-full sm:pr-96">
            <PostInput />
            <PostList />
          </main>
        </div>
      </div>

      <HeaderBottom />
    </>
  );
}
