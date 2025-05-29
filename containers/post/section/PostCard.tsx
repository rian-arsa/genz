"use client";

import { useState, JSX } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import PostActions from "./PostAction";
import PostHeader from "./PostHeader";
import PostImageGallery from "./PostImage";

import { PostContentText } from "@/components/ui";
import { TPost } from "@/app/types/post";
import { PdfImageSlider, PostVideoPlayer } from "./components";

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
    router.push(`/pusat-warga/${post.id}`);
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
          {post.video && <PostVideoPlayer src={post.video} />}
          {post.pdf && post.pdf.length > 0 && (
            <PdfImageSlider images={post.pdf} />
          )}
          <PostActions {...post} />
        </div>
      </div>
    </div>
  );
}
