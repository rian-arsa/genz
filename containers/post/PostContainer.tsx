"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import PostActions from "@/containers/post/section/PostAction";
import { PostHeader } from "@/containers/post/section";
import PostImageGallery from "@/containers/post/section/PostImage";
import { PostSkeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQueryFeedById } from "@/services/post/query";
import { PostVideoPlayer } from "./section/components";
import { simpleTruncateHtml } from "@/lib/text/truncateHtml";

type PostDetailClientProps = {
  id: string;
};

export default function PostDetailClient({ id }: PostDetailClientProps) {
  const [showAllImages, setShowAllImages] = useState(false);

  const {
    data: postData,
    isPending,
    isLoading,
    isError,
  } = useQueryFeedById(id);

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [id]);

  if (isPending || isLoading) {
    return <PostSkeleton />;
  }

  if (!postData || postData === undefined || isError) {
    return (
      <div className="bg-white dark:bg-[#1f1f1f] rounded-xl shadow-sm w-full mx-auto px-6 py-6">
        <div className="text-center text-gray-500 dark:text-gray-400">
          <p className="text-lg font-semibold">Post tidak ditemukan</p>
          <p className="text-sm mt-2">
            Mungkin post ini sudah dihapus atau tidak tersedia.
          </p>
          <button
            onClick={() => router.push("/pusat-warga")}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
            Kembali ke Pusat Warga
          </button>
        </div>
      </div>
    );
  }

  const post = postData.data;

  return (
    <div className="bg-white dark:bg-[#1f1f1f] rounded-xl shadow-sm w-full mx-auto px-6 py-6">
      <div
        className="flex items-center gap-2 cursor-pointer font-semibold hover:text-gray-600 dark:hover:text-gray-400 transition-colors mb-8"
        onClick={() => router.push("/pusat-warga")}>
        <ArrowLeft className="w-4 h-4 text-gray-800 dark:text-gray-400" />
        <span className="text-base text-gray-800 dark:text-gray-200 ml-2">
          Kembali ke Pusat Warga
        </span>
      </div>
      <div className="flex items-center gap-3">
        <Image
          src={post.user?.avatarUrl || "/images/profil/default_avatar_male.png"}
          alt={post.user?.name}
          width={40}
          height={40}
          className="rounded-full object-cover border"
        />
        <PostHeader post={post} />
      </div>

      <div className="mt-8 text-sm text-gray-800 dark:text-gray-200 leading-relaxed prose dark:prose-invert">
        <div
          dangerouslySetInnerHTML={{
            __html: simpleTruncateHtml(
              post.text,
              post.text.length,
              post.text.length
            ),
          }}
        />
      </div>

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

      <PostActions {...post} isDetail={true} />
    </div>
  );
}
