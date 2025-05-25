"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import PostActions from "@/containers/home/section/PostAction";
import { audienceIcons } from "@/containers/home/section/PostCard";
import { PostHeader } from "@/containers/home/section";
import { DUMMY_POSTS } from "@/dummy/post";
import PostImageGallery from "@/containers/home/section/PostImage";
import { PostSkeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PostDetailClient({ id }: { id: number }) {
  const [post, setPost] = useState<(typeof DUMMY_POSTS)[0] | null>(null);
  const [showAllImages, setShowAllImages] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setPost(DUMMY_POSTS[0]);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!post) {
    return <PostSkeleton />;
  }

  return (
    <div className="bg-white dark:bg-[#1f1f1f] rounded-xl shadow-sm w-full mx-auto px-6 py-6">
      <div
        className="flex items-center gap-2 cursor-pointer font-semibold hover:text-gray-600 dark:hover:text-gray-400 transition-colors mb-8"
        onClick={() => router.push("/home")}>
        <ArrowLeft className="w-4 h-4 text-gray-800 dark:text-gray-400" />
        <span className="text-base text-gray-800 dark:text-gray-200 ml-2">
          Kembali ke Beranda
        </span>
      </div>
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

      <PostActions {...post} isDetail={true} />
    </div>
  );
}
