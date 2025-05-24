"use client";

import React, { useState } from "react";
import { VerifiedBadge } from "@/components/ui/icons";
import { timeAgo } from "@/utils/date";
import { TPost } from "../../../containers/home/section/PostCard";
import Link from "next/link";

type PostHeaderProps = {
  post: TPost;
  audienceIcons: { [key: string]: React.ReactNode };
};

const PostHeader: React.FC<PostHeaderProps> = ({ post, audienceIcons }) => {
  const [tempFollowing, setTempFollowing] = useState<boolean>(
    post.author.isFollowing
  );

  const handleFollow = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setTempFollowing(!tempFollowing);

    // Call the API to update the follow status
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <p className="text-sm text-gray-900 dark:text-white flex items-center gap-1 font-bold">
          <Link href={`/${post.author.username}`} className="cursor-pointer">
            {post.author.name}
          </Link>
          {post.author.badge && <VerifiedBadge tier={post.author.badge} />}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {post.author.status}
          </span>
          <span> | </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
            {audienceIcons[post.audience]}
            {timeAgo(post.date)}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {tempFollowing ? (
          <button
            className="text-xs font-medium px-3 py-1.5 rounded-full bg-zinc-200 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-100 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors duration-200 flex items-center gap-1"
            onClick={handleFollow}>
            🤝 <span className="hidden sm:inline">Bertetangga</span>
          </button>
        ) : (
          <button
            className="text-xs font-medium px-4 py-1.5 rounded-full bg-[#ff009d] text-white hover:bg-[#e6008c] transition-colors duration-200"
            onClick={handleFollow}>
            🏡 <span className="hidden sm:inline">Ajak Bertetangga</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default PostHeader;
