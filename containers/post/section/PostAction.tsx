"use client";

import {
  Heart,
  MessageCircle,
  Share2,
  Send,
  Bookmark,
  Flag,
} from "lucide-react";
import { useState } from "react";
import PostComment from "./PostComment";
import { PostActionItem } from "./components";
import { Post } from "@/types/post/post";
import { usePostLikeMutation } from "@/services/post/mutation";

type PostActionProps = Post & {
  isDetail?: boolean;
};

export default function PostAction({
  id,
  isLiked,
  likeCount,
  commentCount,
  shareCount,
  isSaved,
  isDetail = false,
}: PostActionProps) {
  const [tempLike, setTempLike] = useState<boolean>(isLiked || false);
  const [tempSaved, setTempSaved] = useState<boolean>(isSaved || false);
  const [openComment, setOpenComment] = useState<boolean>(isDetail);
  const [tempLikeCount, setTempLikeCount] = useState<number>(likeCount || 0);

  const { mutate: toggleLike } = usePostLikeMutation();

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();

    const prevTempLike = tempLike;
    setTempLike(!prevTempLike);
    setTempLikeCount((count) => (prevTempLike ? count - 1 : count + 1));

    toggleLike(id, {
      onError: () => {
        // rollback
        setTempLike(prevTempLike);
        setTempLikeCount((count) => (prevTempLike ? count + 1 : count - 1));
      },
    });
  };

  const handleComment = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenComment((prev) => !prev);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: Share logic
  };

  const handleReport = (e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: Report logic
  };

  const handleSend = (e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: Send logic
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTempSaved((prev) => !prev);
    // TODO: Call API to update save
  };

  return (
    <div
      className="mt-6 border-t border-gray-100 dark:border-gray-700 pt-4 text-sm text-gray-600 dark:text-gray-300"
      onClick={(e) => e.stopPropagation()}>
      <div className="flex items-center justify-between mb-1">
        <div className="flex gap-2 items-center">
          <PostActionItem
            IconName={Heart}
            handleClick={(event) => handleLike(event)}
            status={tempLike}
            color="pink"
            label="Beri Suara"
            count={tempLikeCount}
          />

          <PostActionItem
            IconName={MessageCircle}
            handleClick={(event) => handleComment(event)}
            status={openComment}
            color="blue"
            label="Komentar Warga"
            count={commentCount}
          />

          <PostActionItem
            IconName={Share2}
            handleClick={(event) => handleShare(event)}
            status={false}
            color="green"
            label="Sebarkan Berita"
            count={shareCount}
          />

          <PostActionItem
            IconName={Flag}
            handleClick={(event) => handleReport(event)}
            status={false}
            color="yellow"
            label="Laporkan ke RT"
            count={0}
          />
        </div>

        <div className="flex gap-2">
          <PostActionItem
            IconName={Send}
            handleClick={(event) => handleSend(event)}
            status={false}
            color="purple"
            label="Kirim Info ke Warga lain"
            count={0}
          />

          <PostActionItem
            IconName={Bookmark}
            handleClick={(event) => handleSave(event)}
            status={tempSaved}
            color="yellow"
            label="Simpan"
            count={0}
          />
        </div>
      </div>

      {(tempLikeCount > 100 || commentCount > 30 || shareCount > 20) && (
        <div className="mt-1 text-xs font-bold text-pink-600 dark:text-pink-400">
          {tempLikeCount > 100
            ? "💥 Postingan ini BOMB banget!"
            : commentCount > 30
            ? "💬 Komennya rame kayak warung pas buka puasa"
            : shareCount > 20
            ? "🚀 Udah dibawa ke luar angkasa sama warga"
            : null}
        </div>
      )}

      <PostComment id={id} isOpen={openComment} />
    </div>
  );
}
