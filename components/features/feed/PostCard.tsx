import Image from "next/image";
import { ChevronLeft, ChevronRight, Sparkles, X } from "lucide-react";
import PostActions from "./PostAction";
import { JSX, useState } from "react";
import { CommentItem } from "@/components/ui";
import { Dialog } from "@headlessui/react";

interface Reply {
  id: number;
  text: string;
  author: string;
  liked: boolean;
}

type Comment = {
  id: number;
  text: string;
  author: string;
  replies?: Reply[];
};

type Author = {
  name: string;
  avatar: string;
};

type Post = {
  id: number;
  author: Author;
  html: string;
  images: string[];
  audience: "public" | "connections" | "private";
  date: string;
  liked: boolean;
  likeCount: number;
  comments: Comment[];
};

const audienceIcons: Record<Post["audience"], JSX.Element> = {
  public: <span className="text-xs text-gray-400">🌍</span>,
  connections: <span className="text-xs text-gray-400">👥</span>,
  private: <span className="text-xs text-gray-400">🔒</span>,
};

interface PostCardProps {
  post: Post;
  onLike: (id: number) => void;
  onCommentSubmit: (id: number, text: string) => void;
  onShowMore: (id: number) => void;
  commentValue: string;
  onCommentChange: (id: number, text: string) => void;
  visibleCount: number;
  onCommentReplySubmit: (
    postId: number,
    commentId: number,
    text: string
  ) => void;
}

export default function PostCard({
  post,
  onLike,
  onCommentSubmit,
  onShowMore,
  commentValue,
  onCommentChange,
  visibleCount,
  onCommentReplySubmit,
}: PostCardProps) {
  const visibleComments = post.comments.slice(0, visibleCount);
  const hasMoreComments = post.comments.length > visibleCount;
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const openLightbox = (index: number) => {
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
            onClick={() => openLightbox(index)}>
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

  return (
    <div className="bg-white dark:bg-[#1f1f1f] border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <Image
          src={post.author.avatar}
          alt={post.author.name}
          width={40}
          height={40}
          className="rounded-full object-cover border"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-900 dark:text-white flex items-center gap-1 font-bold">
              {post.author.name}
              {true && (
                <span className="text-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-4 h-4">
                    <path d="M22 12l-2.3-2 1-3-3-1-1-3-3 1-2-2-2 2-3-1-1 3-3 1 1 3-2 2 2 2-1 3 3 1 1 3 3-1 2 2 2-2 3 1 1-3 3-1-1-3zM10 16l-4-4 1.4-1.4 2.6 2.6 5.6-5.6L17 9l-7 7z" />
                  </svg>
                </span>
              )}
            </p>

            <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
              {audienceIcons[post.audience]}
              {post.date}
            </span>
          </div>

          <div
            className="mt-2 text-sm text-gray-800 dark:text-gray-200 leading-relaxed prose dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          {post.images.length > 0 && (
            <div className="mt-3 grid grid-cols-1 gap-2">
              {post.images.length > 0 && renderImages()}
            </div>
          )}

          <PostActions
            liked={post.liked}
            likeCount={post.likeCount}
            onLike={() => onLike(post.id)}
          />

          <div className="mt-4 space-y-3">
            {visibleComments.map((comment) => (
              <CommentItem
                key={comment.id}
                author={comment.author}
                text={comment.text}
                liked={false} // Assuming no like functionality for comments yet
                onLike={() => {}}
                onReplySubmit={(text) =>
                  onCommentReplySubmit(post.id, comment.id, text)
                }
                replies={comment.replies || []}
              />
            ))}

            {hasMoreComments && (
              <button
                onClick={() => onShowMore(post.id)}
                className="text-xs text-blue-600 hover:underline">
                View more comments
              </button>
            )}

            <div className="flex gap-2 items-start mt-2">
              <input
                value={commentValue}
                onChange={(e) => onCommentChange(post.id, e.target.value)}
                placeholder="💬 Add your hot take..."
                className="flex-1 rounded-full bg-gray-100 dark:bg-[#2a2a2a] border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                onClick={() => onCommentSubmit(post.id, commentValue)}
                className="px-3 py-2 text-xs font-semibold bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
                🚀 Post
              </button>
            </div>
          </div>
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
