import React from "react";
import { BadgeCheck, MapPin, Plus, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Organization from "./Organization";
import OrganizationSidebarMenu from "./OrganizationSidebarMenu";
import OrganizationChat from "./OrganizationChat";

export type TLeftSidebarProps = {
  isLanding: boolean;
};

export default function Sidebar({ isLanding }: TLeftSidebarProps) {
  if (isLanding) {
    return (
      <aside
        className="w-full md:w-72 xl:w-80 p-4 space-y-2 pt-20 md:overflow-visible 
             overflow-y-auto max-h-screen">
        <Organization />
      </aside>
    );
  }

  return (
    <aside
      className="w-full md:w-72 xl:w-80 p-4 space-y-2 pt-20 md:overflow-visible 
             overflow-y-auto max-h-screen pb-20">
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1f1f1f] shadow-sm p-4 space-y-4">
        <div className="flex items-center gap-3">
          <Image
            src="/images/avatar1.jpg"
            alt="Avatar"
            width={48}
            height={48}
            className="rounded-full object-cover border"
          />
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-1">
              Pemuda Pancasila
              <BadgeCheck className="w-4 h-4 text-primary" />
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              <MapPin className="inline w-3 h-3 mr-1" />
              Jakarta, Indonesia
            </p>
          </div>
        </div>

        <div className="text-center border-t border-gray-100 dark:border-gray-800 pt-4">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Masyarakat yang bergabung
          </p>
          <p className="text-xl font-bold text-primary pt-2">1,240</p>
        </div>
      </div>

      <OrganizationSidebarMenu />
      {/* <OrganizationChat /> */}
      <Organization />
    </aside>
  );
}
