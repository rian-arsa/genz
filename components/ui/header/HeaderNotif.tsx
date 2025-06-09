"use client";

import { Notification } from "@/services/notifications/type";
import { timeAgo } from "@/utils/date";
import { BellDot } from "lucide-react"; // atau pakai ikon lain sesuai konteks
import Link from "next/link";

export const HeaderNotifItem = ({
  id,
  userId,
  category,
  action,
  title,
  body,
  isRead = false,
  createdAt,
}: Notification) => {
  return (
    <li
      key={id}
      className={`flex items-start gap-3 p-3 rounded-lg transition-all group hover:bg-zinc-100 dark:hover:bg-zinc-700 ${
        isRead ? "opacity-60" : "bg-zinc-50 dark:bg-zinc-800"
      }`}>
      <div className="pt-1">
        <BellDot
          className={`w-5 h-5 ${isRead ? "text-zinc-400" : "text-blue-500"}`}
        />
      </div>

      <div className="flex-1">
        <Link href={"#"} className="block">
          <p
            className={`text-sm leading-snug ${
              isRead ? "text-zinc-400" : "text-zinc-800 dark:text-white"
            }`}>
            {title}
          </p>
          <p
            className={`text-xs leading-snug ${
              isRead ? "text-zinc-400" : "text-zinc-800 dark:text-white"
            }`}>
            {body}
          </p>
        </Link>
        {createdAt && (
          <p className="text-xs text-zinc-400 mt-1 group-hover:underline">
            {timeAgo(createdAt)}
          </p>
        )}
      </div>
    </li>
  );
};
