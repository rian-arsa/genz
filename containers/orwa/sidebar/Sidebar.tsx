import React from "react";
import { SidebarCollapse } from "@/components";

export type TLeftSidebarProps = {};

export default function Sidebar() {
  return (
    <aside className="w-full md:w-72 xl:w-80 p-4 space-y-2 pt-20">
      {/* Section 3: Parlemen Sosial */}
      <SidebarCollapse
        isLoading={false}
        title="Organisasi Warga Saya"
        isOpen={true}>
        <div className="space-y-2">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Diskusikan isu-isu terkini di Organisasi Warga Saya.
          </p>
        </div>
      </SidebarCollapse>
    </aside>
  );
}
