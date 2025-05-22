// components/CommentItem.tsx

import { useState } from "react";
import { Heart, MessageCircle } from "lucide-react";

interface Reply {
  id: number;
  author: string;
  text: string;
  liked: boolean;
}

interface CommentItemProps {
  author: string;
  text: string;
  liked: boolean;
  onLike: () => void;
  onReplySubmit: (replyText: string) => void;
  replies?: Reply[];
  onReplyLike?: (replyId: number) => void;
}

export default function CommentItem({
  author,
  text,
  liked,
  onLike,
  onReplySubmit,
  replies = [],
  onReplyLike,
}: CommentItemProps) {
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleReply = () => {
    if (!replyText.trim()) return;
    onReplySubmit(replyText);
    setReplyText("");
    setShowReply(false);
  };

  return (
    <div className="flex flex-col gap-2 px-3 py-2 border-b border-gray-100 dark:border-gray-700">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center font-semibold text-white text-sm">
          {author.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            {author}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 mt-0.5">
            {text}
          </p>
          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
            <button
              onClick={onLike}
              className={`flex items-center gap-1 hover:text-pink-500 ${
                liked ? "text-pink-500" : ""
              }`}>
              <Heart size={14} fill={liked ? "#ec4899" : "none"} /> Like
            </button>
            <button
              onClick={() => setShowReply(!showReply)}
              className="flex items-center gap-1 hover:text-blue-500">
              <MessageCircle size={14} /> Reply
            </button>
          </div>
          {showReply && (
            <div className="mt-2 flex flex-col gap-2">
              <input
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write a reply..."
                className="text-sm px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#2a2a2a] text-gray-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleReply}
                  className="text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-md">
                  Reply
                </button>
                <button
                  onClick={() => setShowReply(false)}
                  className="text-xs text-gray-500 hover:underline">
                  Cancel
                </button>
              </div>
            </div>
          )}

          {replies.length > 0 && (
            <div className="mt-4 space-y-2 ml-6">
              {replies.map((reply) => (
                <div key={reply.id} className="flex items-start gap-2">
                  <div className="w-7 h-7 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-xs font-semibold text-gray-700 dark:text-gray-200">
                    {reply.author.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-800 dark:text-gray-100">
                      {reply.author}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {reply.text}
                    </p>
                    <button
                      onClick={() => onReplyLike?.(reply.id)}
                      className={`mt-1 text-xs flex items-center gap-1 hover:text-pink-500 ${
                        reply.liked ? "text-pink-500" : "text-gray-400"
                      }`}>
                      <Heart
                        size={12}
                        fill={reply.liked ? "#ec4899" : "none"}
                      />{" "}
                      Like
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
