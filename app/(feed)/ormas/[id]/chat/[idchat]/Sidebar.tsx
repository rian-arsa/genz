"use client";

import { MessageSquare, MoreVertical, Users, Search } from "lucide-react";
import Image from "next/image";

const Sidebar = () => {
  return (
    <div className="w-[30%] bg-white dark:bg-zinc-800 border-r border-zinc-200 dark:border-zinc-700 flex flex-col">
      {/* Top Bar */}
      {/* <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-700">
        <Image
          src="/images/avatar1.jpg" // ganti dengan profil user atau dummy
          alt="Profile"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="flex items-center gap-4 text-zinc-600 dark:text-zinc-200">
          <Users className="w-5 h-5 cursor-pointer" />
          <MessageSquare className="w-5 h-5 cursor-pointer" />
          <MoreVertical className="w-5 h-5 cursor-pointer" />
        </div>
      </div> */}

      {/* Search Bar */}
      <div className="p-3 bg-white dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-700">
          <Search className="w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search or start new chat"
            className="bg-transparent outline-none text-sm w-full text-zinc-900 dark:text-white"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-3 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-700 border-b border-zinc-100 dark:border-zinc-700">
            {/* <Image
              src={`/images/avatar1.jpg`} // dummy images/avatar
              alt={`User ${i + 1}`}
              width={20}
              height={20}
              className="rounded-full"
            /> */}
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-semibold text-zinc-800 dark:text-white">
                  User {i + 1}
                </h4>
                <span className="text-xs text-zinc-400">09.{i}0</span>
              </div>
              <p className="text-xs text-zinc-500 truncate">
                Pesan terakhir yang panjang banget...
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
