"use client";

import { JSX, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Dialog } from "@headlessui/react";

import PostActions from "./PostAction";
import PostHeader from "./PostHeader";

import { PostContentText, TVerifiedTier } from "@/components/ui";
import { useRouter } from "next/navigation";

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

const audienceIcons: Record<TPost["audience"], JSX.Element> = {
  public: <span className="text-xs text-gray-400">🌍</span>,
  connections: <span className="text-xs text-gray-400">👥</span>,
  private: <span className="text-xs text-gray-400">🔒</span>,
};

interface PostCardProps {
  post: TPost;
}

export default function PostCard({ post }: PostCardProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const router = useRouter();

  const openLightbox = (index: number, event: React.MouseEvent) => {
    event.stopPropagation();

    setCurrentImage(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % post.images.length);
  };

  const prevImage = () => {
    setCurrentImage(
      (prev) => (prev - 1 + post.images.length) % post.images.length
    );
  };

  const renderImages = () => {
    return (
      <div
        className={`grid gap-2 mt-3 ${
          post.images.length === 1 ? "grid-cols-1" : "grid-cols-3"
        }`}>
        {post.images.slice(0, 3).map((img, index) => (
          <div
            key={index}
            className="relative cursor-pointer"
            onClick={(e) => openLightbox(index, e)}>
            <Image
              src={img}
              alt={`post image ${index}`}
              width={500}
              height={500}
              className="rounded-lg object-cover w-full h-40"
            />
            {index === 2 && post.images.length > 3 && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-lg">
                <span className="text-white text-xl font-semibold">
                  +{post.images.length - 3}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const onClickDetail = () => {
    router.push(`/post/${post.id}`);
  };

  return (
    <div className="bg-white dark:bg-[#1f1f1f] border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm">
      <div className="flex items-start gap-3" onClick={onClickDetail}>
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

          {post.images.length > 0 && post.images.length === 1 && (
            <div className="mt-3 grid grid-cols-3 gap-2">
              {post.images.length > 0 && renderImages()}
            </div>
          )}

          {post.images.length > 0 && post.images.length === 2 && (
            <div className="mt-3 grid grid-cols-1 gap-2">
              {post.images.length > 0 && renderImages()}
            </div>
          )}

          {post.images.length > 0 && post.images.length === 3 && (
            <div className="mt-3 grid grid-cols-1 gap-2">
              {post.images.length > 0 && renderImages()}
            </div>
          )}

          <PostActions {...post} />
        </div>
      </div>

      <Dialog
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        className="fixed inset-0 z-50">
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
          <div className="relative h-screen w-full px-4">
            <Image
              src={post.images[currentImage]}
              alt="preview"
              fill
              className="object-contain max-h-screen w-auto mx-auto"
            />
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-black">
              <X size={24} />
            </button>
            {post.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 p-2 rounded-full">
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 p-2 rounded-full">
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>
        </div>
      </Dialog>
    </div>
  );
}
