"use client";

import { SidebarCollapse } from "@/components";
import { CHATS_DUMMMY } from "@/dummy/chat";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export type TChatPreview = {
  id: string;
  user: {
    name: string;
    avatarUrl: string;
  };
  lastMessage: string;
  isUnread?: boolean;
};

export default function OrganizationChat() {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigate = (id: string) => {
    const segments = pathname.split("/").slice(0, 3); // ["", "ormas", "121212121", "toko"]

    if (segments.length >= 3) {
      segments[3] = id;
      const newPath = segments.join("/"); // "/ormas/121212121/chat/12345"
      router.push(newPath);
    }
  };

  const chats: TChatPreview[] = [
    ...CHATS_DUMMMY,
    // Add more chat previews as needed
  ];

  return (
    <SidebarCollapse isLoading={false} title="Rapat" isOpen={true}>
      <div className="space-y-2 ">
        <div className="space-y-1 max-h-96 overflow-y-auto pr-1">
          {chats.map((chat) => (
            <button
              onClick={() => handleNavigate(`/chat/${chat.id}`)}
              key={chat.id}
              className="flex items-center text-start cursor-pointer gap-3 p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all">
              <div className="relative">
                <Image
                  src={chat.user.avatarUrl}
                  alt={chat.user.name}
                  width={36}
                  height={36}
                  className="rounded-full object-cover"
                />
                {chat.isUnread && (
                  <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white dark:border-zinc-900" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-zinc-800 dark:text-white truncate">
                  {chat.user.name}
                </p>
                <p
                  className={`text-xs text-zinc-500 dark:text-zinc-400 truncate ${
                    chat.isUnread ? "font-semibold" : ""
                  }`}>
                  {chat.lastMessage}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </SidebarCollapse>
  );
}
