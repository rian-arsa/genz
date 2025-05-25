"use client";

import { useState, JSX } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import PostActions from "./PostAction";
import PostHeader from "./PostHeader";
import { PostContentText, TVerifiedTier } from "@/components/ui";
import PostImageGallery from "./PostImage";

export type TAuthor = {
  name: string;
  username: string;
  avatar: string;
  status: string;
  isFollowing: boolean;
  badge: TVerifiedTier | "";
};

export type TPost = {
  id: string;
  author: TAuthor;
  html: string;
  images: string[];
  audience: "public" | "connections" | "private";
  date: string;
  isLiked: boolean;
  likeCount: number;
  commentCount: number;
  shareCount: number;
  isSaved: boolean;
};

export const audienceIcons: Record<TPost["audience"], JSX.Element> = {
  public: <span className="text-xs text-gray-400">🌍</span>,
  connections: <span className="text-xs text-gray-400">👥</span>,
  private: <span className="text-xs text-gray-400">🔒</span>,
};

interface PostCardProps {
  post: TPost;
}

export default function PostCard({ post }: PostCardProps) {
  const router = useRouter();
  const [showAllImages, setShowAllImages] = useState(false);

  const onClickDetail = () => {
    router.push(`/post/${post.id}`);
  };

  return (
    <div
      className="bg-white dark:bg-[#1f1f1f] border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm"
      onClick={onClickDetail}>
      <div className="flex items-start gap-3">
        <Image
          src={post.author.avatar}
          alt={post.author.name}
          width={40}
          height={40}
          className="rounded-full object-cover border"
        />
        <div className="flex-1">
          <PostHeader post={post} audienceIcons={audienceIcons} />
          <PostContentText html={post.html} />
          {post.images.length > 0 && (
            <PostImageGallery
              images={post.images}
              showAll={showAllImages}
              setShowAll={setShowAllImages}
              layout="card"
            />
          )}
          <PostActions {...post} />
        </div>
      </div>
    </div>
  );
}
