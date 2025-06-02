"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import PostActions from "./PostAction";
import PostHeader from "./PostHeader";
import PostImageGallery from "./PostImage";

import { PdfImageSlider, PostVideoPlayer } from "./components";

import { PostContentText } from "@/components/ui";
import { TPost } from "@/types/post";

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
          <PostHeader post={post} />
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
