// src/components/PostComment.tsx
import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import CommentItem from "./components/CommentItem";
import CommentInput from "./components/CommentInput";
import { usePostCommentMutation } from "@/services/post/mutation";
import { useQueryComment } from "@/services/post/query";

export default function PostComment({
  id,
  isOpen,
}: {
  id: string;
  isOpen: boolean;
}) {
  const [cursor, setCursor] = useState<string | undefined>(undefined);

  const queryClient = useQueryClient();
  const postComment = usePostCommentMutation();

  // infinite query untuk komentar
  const { data, isLoading, isError } = useQueryComment(id, isOpen, cursor);

  console.log(data);

  // handler submit komentar baru
  const handleCommentSubmit = (
    e: React.FormEvent,
    postId: string,
    text: string
  ) => {
    e.preventDefault();
    const content = text.trim();
    if (!content) return;

    postComment.mutate(
      { postId, content },
      {
        onSuccess: () => {
          // refetch agar komentar terbaru muncul
          queryClient.invalidateQueries({ queryKey: ["comments", id] });
        },
      }
    );
  };

  // placeholder untuk handler like/reply (bisa diisi mutasi serupa)
  const handleLikeComment = (e: React.MouseEvent, commentId: string) => {
    e.stopPropagation();
    // TODO: panggil mutation like-comment di sini
  };

  const handleReplySubmit = (
    e: React.MouseEvent,
    commentId: string,
    replyText: string
  ) => {
    e.stopPropagation();
    // TODO: panggil mutation post-reply di sini
  };

  const handleLikeReply = (
    e: React.MouseEvent,
    commentId: string,
    replyId: string
  ) => {
    e.stopPropagation();
    // TODO: panggil mutation like-reply di sini
  };

  if (!isOpen) return null;
  if (status === "pending") return <p>Loading komentar…</p>;
  if (status === "error") return <p>Gagal load komentar.</p>;

  return (
    <>
      <div className="mt-4 space-y-3">
        {/* {comments.map((c) => (
          <CommentItem
            key={c.id}
            author={c.author}
            text={c.text}
            liked={c.liked}
            likeCount={c.likeCount}
            replyCount={c.replyCount}
            replies={c.replies || []}
            onLike={(e) => handleLikeComment(e, c.id)}
            onReplySubmit={(e, txt) =>
              handleReplySubmit(e, c.id, txt)
            }
            onReplyLike={(e, replyId) =>
              handleLikeReply(e, c.id, replyId)
            }
          />
        ))} */}

        {/* {hasNextPage && (
          <button
            disabled={isFetchingNextPage}
            onClick={() => fetchNextPage()}
            className="text-xs text-pink-600 hover:underline">
            {isFetchingNextPage ? "Loading…" : "Lihat lanjutannya"}
          </button>
        )} */}
      </div>

      <CommentInput id={id} onCommentSubmit={handleCommentSubmit} />
    </>
  );
}

// {allComments.map((comment) => (
//           <CommentItem
//             key={comment.id}
//             author={comment.author}
//             text={comment.text}
//             liked={comment.liked}
//             likeCount={comment.likeCount}
//             onLike={(e) => handleLikeComment(e, comment.id)}
//             onReplySubmit={(e, text) => handleReplySubmit(e, comment.id, text)}
//             onReplyLike={(e, replyId) =>
//               handleLikeReply(e, comment.id, replyId)
//             }
//             replyCount={comment.replyCount}
//             replies={comment.replies || []}
//           />
//         ))} */}
