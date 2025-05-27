"use client";

import { useState } from "react";
import { ChevronLeft, Search } from "lucide-react";
import Image from "next/image";

// Avatar Component
const ChatAvatar = ({
  name,
  avatarUrl,
  isOrmas = false,
}: {
  name: string;
  avatarUrl?: string;
  isOrmas?: boolean;
}) => {
  return avatarUrl ? (
    <div className="relative w-12 h-12">
      <Image
        src={avatarUrl}
        alt={name}
        width={48}
        height={48}
        className="rounded-full w-12 h-12"
      />
      {isOrmas && (
        <span className="absolute bottom-0 right-0 w-6 h-6 bg-pink-500 border-2 border-white rounded-full flex items-center justify-center text-white text-xs font-bold">
          4
        </span>
      )}
    </div>
  ) : (
    <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold text-lg">
      {name.charAt(0).toUpperCase()}
    </div>
  );
};

// Dummy data struktur
const channelGroups = [
  {
    id: "kelas-frontend",
    name: "Channel Kelas 🚀",
    lastMessage: "Tanya Jawab: Cara deploy...",
    time: "09:40",
    avatarUrl: "/images/avatar1.jpg",
    channels: [
      {
        id: "notifikasi",
        name: "🔔 Notifikasi",
        lastMessage: "Kelas dimulai jam 8",
        time: "08:00",
        avatarUrl: "/images/avatar2.jpg",
      },
      {
        id: "pengumuman",
        name: "📦 Pengumuman",
        lastMessage: "Modul 3 sudah diupload",
        time: "09:10",
        avatarUrl: "/images/avatar1.jpg",
      },
      {
        id: "tanya-jawab",
        name: "💬 Tanya Jawab",
        lastMessage: "Bagaimana cara deploy?",
        time: "09:40",
        avatarUrl: "/images/avatar1.jpg",
      },
    ],
  },
];

const otherChats = [
  {
    id: "ayu",
    name: "Ayu",
    lastMessage: "Nanti malam jadi ya?",
    time: "10:02",
    avatarUrl: "/images/avatar1.jpg",
  },
  {
    id: "grup-dev",
    name: "Grup Dev",
    lastMessage: "Rizky: Pull request diterima",
    time: "11:11",
    avatarUrl: "/images/avatar1.jpg",
  },
];

export default function Sidebar() {
  const [sidebarView, setSidebarView] = useState<"main" | "channelGroup">(
    "main"
  );
  const [activeGroupId, setActiveGroupId] = useState<string | null>(null);

  const activeGroup = channelGroups.find((g) => g.id === activeGroupId);

  return (
    <div className="w-[30%] bg-white border-r border-zinc-200 flex flex-col">
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
      <div className="flex-1 overflow-y-auto">
        {sidebarView === "main" && (
          <>
            {/* Channel Groups */}
            {channelGroups.map((group) => (
              <div
                key={group.id}
                className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-100 cursor-pointer border-b border-zinc-100"
                onClick={() => {
                  setSidebarView("channelGroup");
                  setActiveGroupId(group.id);
                }}>
                <ChatAvatar
                  name={group.name}
                  avatarUrl={group.avatarUrl}
                  isOrmas={true}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-sm text-zinc-800 truncate">
                      📣 {group.name}
                    </p>
                    <span className="text-xs text-zinc-500">{group.time}</span>
                  </div>
                  <p className="text-xs text-zinc-500 truncate">
                    {group.lastMessage}
                  </p>
                </div>
              </div>
            ))}

            {/* Other Chats */}
            {otherChats.map((chat) => (
              <div
                key={chat.id}
                className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-100 cursor-pointer border-b border-zinc-100">
                <ChatAvatar name={chat.name} avatarUrl={chat.avatarUrl} />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-sm text-zinc-800 truncate">
                      {chat.name}
                    </p>
                    <span className="text-xs text-zinc-500">{chat.time}</span>
                  </div>
                  <p className="text-xs text-zinc-500 truncate">
                    {chat.lastMessage}
                  </p>
                </div>
              </div>
            ))}
          </>
        )}

        {sidebarView === "channelGroup" && activeGroup && (
          <>
            {/* Back Header */}
            <div
              className="flex items-center gap-2 px-4 py-3 cursor-pointer text-pink-600 font-medium hover:bg-zinc-100"
              onClick={() => {
                setSidebarView("main");
                setActiveGroupId(null);
              }}>
              <ChevronLeft className="w-4 h-4" />
              Kembali
            </div>

            {/* List sub-channels */}
            {activeGroup.channels.map((channel) => (
              <div
                key={channel.id}
                className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-100 cursor-pointer border-b border-zinc-100">
                <ChatAvatar name={channel.name} avatarUrl={channel.avatarUrl} />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-sm text-zinc-800 truncate">
                      {channel.name}
                    </p>
                    <span className="text-xs text-zinc-500">
                      {channel.time}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 truncate">
                    {channel.lastMessage}
                  </p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
