"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { VerifiedBadge } from "@/components/ui/icons";
import { timeAgo } from "@/utils/date";
import { TPost } from "@/app/types/post";

type TPostHeaderProps = {
  post: TPost;
};

const PostHeader: React.FC<TPostHeaderProps> = ({ post }) => {
  const [tempFollowing, setTempFollowing] = useState<boolean>(
    post.author.isFollowing
  );

  const handleFollow = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      setTempFollowing((prev) => !prev);
      // TODO: API call follow/unfollow
    },
    []
  );

  const renderFollowButton = () => {
    const baseClass =
      "text-xs font-medium px-4 py-1.5 rounded-full transition-colors duration-200";

    return tempFollowing ? (
      <button
        onClick={handleFollow}
        className={`${baseClass} bg-zinc-200 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-100 hover:bg-zinc-300 dark:hover:bg-zinc-600 flex items-center gap-1`}>
        🤝 <span className="hidden sm:inline">Bertetangga</span>
      </button>
    ) : (
      <button
        onClick={handleFollow}
        className={`${baseClass} bg-[#ff009d] text-white hover:bg-[#e6008c]`}>
        🏡 <span className="hidden sm:inline">Ajak Bertetangga</span>
      </button>
    );
  };

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex flex-col">
        <Link
          href={`/profil/${post.author.username}`}
          onClick={(e) => e.stopPropagation()}
          className="text-sm text-gray-900 dark:text-white font-bold hover:underline flex items-center gap-1">
          {post.author.name}
          {post.author.badge && <VerifiedBadge tier={post.author.badge} />}
        </Link>

        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {post.author.status}
          </span>
          <span> | </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {timeAgo(post.date)}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">{renderFollowButton()}</div>
    </div>
  );
};

export default PostHeader;
