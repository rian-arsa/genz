"use client";

import { useState } from "react";
import { Header, Sidebar } from "@/containers/pusat-warga";
import { URL_ORWA, URL_POST } from "@/app/(feed)/ClientWrapper";
import { OrwaSidebar } from "@/containers/ormas";
import { useEffect } from "react";

interface HeaderTriggerProps {
  isMobile: boolean;
  activeUrl: string;
}

export const HeaderTrigger = ({ isMobile, activeUrl }: HeaderTriggerProps) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const renderSidebarContent = () => {
    if (URL_POST.some((url) => activeUrl.includes(url))) {
      return <Sidebar />;
    }
    if (URL_ORWA.some((url) => activeUrl.includes(url))) {
      return <OrwaSidebar isLanding={false} />;
    }
    return null;
  };

  useEffect(() => {
    setSidebarOpen(false);
  }, [activeUrl]);

  return (
    <>
      <Header setIsShow={setSidebarOpen} isShow={isSidebarOpen} />

      {isMobile && isSidebarOpen && (
        <div className="fixed inset-0 z-40 sm:hidden bg-zinc-50 dark:bg-zinc-950">
          {renderSidebarContent()}
        </div>
      )}
    </>
  );
};
