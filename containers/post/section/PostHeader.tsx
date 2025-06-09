"use client";

import React from "react";
import Link from "next/link";
import { VerifiedBadge } from "@/components/ui/icons";
import { timeAgo } from "@/utils/date";
import { Post } from "@/types/post/post";
import { useMutationFollow } from "@/services/follow/mutation";

import { useQueryClient } from "@tanstack/react-query";

type TPostHeaderProps = {
  post: Post;
};

const PostHeader: React.FC<TPostHeaderProps> = ({ post }) => {
  const mutationFollow = useMutationFollow(post.id);

  const handleFollow = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    mutationFollow.mutate(post.userId);
  };

  const renderFollowButton = () => {
    const baseClass =
      "text-xs font-medium px-4 py-1.5 rounded-full transition-colors duration-200";

    if (post.isOwner) {
      return null;
    }

    return post.isFollowing ? (
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
          href={`/profil/${post.user.username}`}
          onClick={(e) => e.stopPropagation()}
          className="text-sm text-gray-900 dark:text-white font-bold hover:underline flex items-center gap-1">
          {post.user.name}
          {post.user.verifiedStatus && (
            <VerifiedBadge tier={post.user.verifiedStatus} />
          )}
        </Link>

        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {post.user.role}
          </span>
          <span> | </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {timeAgo(post.createdAt)}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">{renderFollowButton()}</div>
    </div>
  );
};

export default PostHeader;
