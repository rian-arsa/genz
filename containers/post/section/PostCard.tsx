"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import PostActions from "./PostAction";
import PostHeader from "./PostHeader";
import PostImageGallery from "./PostImage";

import { PdfImageSlider, PostVideoPlayer } from "./components";

import { PostContentText } from "@/components/ui";
import { Post } from "@/types/post/post";

interface PostCardProps {
  post: Post;
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
          src={post.user?.avatarUrl || "/images/profil/default_avatar_male.png"}
          alt={post.user?.name}
          width={40}
          height={40}
          className="rounded-full object-cover border"
        />
        <div className="flex-1">
          <PostHeader post={post} />
          <PostContentText html={post.text} />
          {post.medias?.length > 0 && post.medias?.[0]?.type === "IMAGE" && (
            <PostImageGallery
              images={post.medias.map((m) => m.url)}
              showAll={showAllImages}
              setShowAll={setShowAllImages}
              layout="card"
            />
          )}
          {post.medias?.length > 0 && post.medias?.[0]?.type === "VIDEO" && (
            <PostVideoPlayer src={post.medias?.[0]?.url} />
          )}

          {/* {post.video && <PostVideoPlayer src={post.video} />}
          {post.pdf && post.pdf.length > 0 && (
            <PdfImageSlider images={post.pdf} />
          )} */}
          <PostActions {...post} />
        </div>
      </div>
    </div>
  );
}

PostCard.Skeleton = function Skeleton() {
  return (
    <div className="animate-pulse p-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
      <div className="flex gap-2 mb-2">
        <div className="w-8 h-8 bg-zinc-300 dark:bg-zinc-700 rounded-full" />
        <div className="h-3 w-32 bg-zinc-300 dark:bg-zinc-700 rounded" />
      </div>
      <div className="h-3 w-full bg-zinc-300 dark:bg-zinc-700 rounded mb-1" />
      <div className="h-3 w-1/2 bg-zinc-300 dark:bg-zinc-700 rounded" />
    </div>
  );
};
