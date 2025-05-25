import CommentItem from "./components/CommentItem";
import { DUMMY_COMMENTS } from "@/dummy/comment";
import React, { useState } from "react";
import CommentInput from "./components/CommentInput";

export interface TReply {
  id: string;
  text: string;
  author: string;
  liked: boolean;
  likeCount: number;
}

export type TComment = {
  id: string;
  text: string;
  author: string;
  liked: boolean;
  likeCount: number;
  replyCount: number;
  replies?: TReply[];
};

export default function PostComment({
  id,
  isOpen,
}: {
  id: string;
  isOpen: boolean;
}) {
  const [initialComments, setInitialComments] = useState<TComment[]>(
    DUMMY_COMMENTS.map((c) => ({
      ...c,
      liked: false,
      likeCount: c.likeCount || 0,
      replies: (c.replies || []).map((r) => ({
        ...r,
        liked: false,
        likeCount: r.likeCount || 0,
      })),
    }))
  );

  const [visibleCount, setVisibleCount] = useState<number>(3);
  const [newComments, setNewComments] = useState<TComment[]>([]);

  const visibleOldComments = initialComments.slice(0, visibleCount);
  const hasMoreComments = initialComments.length > visibleCount;

  const onShowMore = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setVisibleCount((prev) => prev + 3);
  };

  const onCommentSubmit = (
    e: React.MouseEvent | React.FormEvent,
    postId: string,
    commentText: string
  ) => {
    e.stopPropagation();

    const commentAsString =
      typeof commentText === "string" ? commentText : String(commentText);

    const newComment: TComment = {
      id: Date.now().toString(),
      text: commentAsString,
      author: "You",
      liked: false,
      likeCount: 0,
      replyCount: 0,
      replies: [],
    };

    setNewComments((prev) => [newComment, ...prev]);
  };

  const handleLikeComment = (e: React.MouseEvent, commentId: string) => {
    e.stopPropagation();
    const update = (comments: TComment[]) =>
      comments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              liked: !comment.liked,
              likeCount: comment.liked
                ? comment.likeCount - 1
                : comment.likeCount + 1,
            }
          : comment
      );
    setInitialComments((prev) => update(prev));
    setNewComments((prev) => update(prev));
  };

  const handleReplySubmit = (
    e: React.MouseEvent,
    commentId: string,
    text: string
  ) => {
    e.stopPropagation();
    const newReply: TReply = {
      id: Date.now().toString(),
      text: String(text),
      author: "You",
      liked: false,
      likeCount: 0,
    };

    const updateReplies = (comments: TComment[]) =>
      comments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              replies: [...(comment.replies || []), newReply],
            }
          : comment
      );
    setInitialComments((prev) => updateReplies(prev));
    setNewComments((prev) => updateReplies(prev));
  };

  const handleLikeReply = (
    e: React.MouseEvent,
    commentId: string,
    replyId: string
  ) => {
    e.stopPropagation();
    const update = (comments: TComment[]) =>
      comments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              replies: (comment.replies || []).map((reply) =>
                reply.id === replyId
                  ? {
                      ...reply,
                      liked: !reply.liked,
                      likeCount: reply.liked
                        ? reply.likeCount - 1
                        : reply.likeCount + 1,
                    }
                  : reply
              ),
            }
          : comment
      );
    setInitialComments((prev) => update(prev));
    setNewComments((prev) => update(prev));
  };

  if (!isOpen) return null;

  const allComments = [...newComments, ...visibleOldComments];

  return (
    <>
      <div className="mt-4 space-y-3">
        {allComments.map((comment) => (
          <CommentItem
            key={comment.id}
            author={comment.author}
            text={comment.text}
            liked={comment.liked}
            likeCount={comment.likeCount}
            onLike={(e) => handleLikeComment(e, comment.id)}
            onReplySubmit={(e, text) => handleReplySubmit(e, comment.id, text)}
            onReplyLike={(e, replyId) =>
              handleLikeReply(e, comment.id, replyId)
            }
            replyCount={comment.replyCount}
            replies={comment.replies || []}
          />
        ))}

        {hasMoreComments && (
          <button
            onClick={(e) => onShowMore(e)}
            className="text-xs text-pink-600 hover:underline">
            Lihat lanjutannya
          </button>
        )}
      </div>

      <CommentInput
        id={id.toString()}
        onCommentSubmit={(e, id, text) => onCommentSubmit(e, id, text)}
      />
    </>
  );
}
