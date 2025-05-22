import { Heart, MessageCircle, Share2 } from "lucide-react";

interface PostActionsProps {
  liked: boolean;
  likeCount: number;
  onLike: () => void;
}

export default function PostActions({
  liked,
  likeCount,
  onLike,
}: PostActionsProps) {
  return (
    <div className="flex justify-between mt-4 pt-3 border-t border-gray-100 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-300">
      <button
        onClick={onLike}
        className={`flex items-center gap-1 transition ${
          liked ? "text-pink-500" : "hover:text-pink-500"
        }`}>
        <Heart size={16} fill={liked ? "#ec4899" : "none"} />
        {liked ? "Liked" : "Like"} ({likeCount})
      </button>
      <button className="flex items-center gap-1 hover:text-blue-500 transition">
        <MessageCircle size={16} /> Comment
      </button>
      <button className="flex items-center gap-1 hover:text-green-500 transition">
        <Share2 size={16} /> Share
      </button>
    </div>
  );
}
