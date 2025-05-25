"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import PostActions from "@/containers/home/section/PostAction";
import { audienceIcons } from "@/containers/home/section/PostCard";
import { PostHeader } from "@/containers/home/section";
import { DUMMY_POSTS } from "@/dummy/post";
import PostImageGallery from "@/containers/home/section/PostImage";

export default function PostDetailClient({ id }: { id: number }) {
  const [post, setPost] = useState<(typeof DUMMY_POSTS)[0] | null>(null);
  const [showAllImages, setShowAllImages] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPost(DUMMY_POSTS[0]);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!post) {
    return (
      <div className="bg-white dark:bg-[#1f1f1f] rounded-xl shadow-sm max-w-2xl w-full mx-auto px-4 py-6 animate-pulse space-y-4">
        <div className="h-6 bg-zinc-200 dark:bg-zinc-700 rounded w-1/2" />
        <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-3/4" />
        <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-full" />
        <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-5/6" />
        <div className="aspect-video bg-zinc-200 dark:bg-zinc-700 rounded-xl w-full" />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#1f1f1f] rounded-xl shadow-sm max-w-2xl w-full mx-auto px-4 py-6">
      <div className="flex items-center gap-3">
        <Image
          src={post.author.avatar}
          alt={post.author.name}
          width={40}
          height={40}
          className="rounded-full object-cover border"
        />
        <PostHeader post={post} audienceIcons={audienceIcons} />
      </div>

      <div className="mt-8 text-sm text-gray-800 dark:text-gray-200 leading-relaxed prose dark:prose-invert">
        <div
          dangerouslySetInnerHTML={{
            __html: post.html,
          }}
        />
      </div>

      {post.images.length > 0 && (
        <PostImageGallery
          images={post.images}
          showAll={showAllImages}
          setShowAll={setShowAllImages}
        />
      )}

      <PostActions {...post} />
    </div>
  );
}
