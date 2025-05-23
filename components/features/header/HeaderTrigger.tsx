"use client";

import { useState } from "react";
import { Header, Sidebar } from "@/containers/home";

export const HeaderTrigger = ({ isMobile }: { isMobile: boolean }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Header setIsShow={setSidebarOpen} isShow={isSidebarOpen} />

      {isMobile && isSidebarOpen && (
        <div className="fixed inset-0 z-40 sm:hidden bg-zinc-50 dark:bg-zinc-950">
          <Sidebar />
        </div>
      )}
    </>
  );
};
