"use client";

import PostCard, { TPost } from "@/containers/home/section/PostCard";
import { DUMMY_POSTS } from "@/dummy/post";
import { useState } from "react";

// --- Main Component ---
export default function PostList() {
  const [posts, setPosts] = useState<TPost[]>(DUMMY_POSTS);
  // const [commentInput, setCommentInput] = useState<Record<number, string>>({});
  // const [visibleComments, setVisibleComments] = useState<
  //   Record<number, number>
  // >({});

  // const toggleCommentLike = (postId: number, commentId: number) => {
  //   setPosts((prev) =>
  //     prev.map((post) =>
  //       post.id === postId
  //         ? {
  //             ...post,
  //             comments: post.comments.map((comment) =>
  //               comment.id === commentId
  //                 ? { ...comment, liked: !comment.liked }
  //                 : comment
  //             ),
  //           }
  //         : post
  //     )
  //   );
  // };

  // const toggleReplyLike = (
  //   postId: number,
  //   commentId: number,
  //   replyId: number
  // ) => {
  //   setPosts((prev) =>
  //     prev.map((post) =>
  //       post.id === postId
  //         ? {
  //             ...post,
  //             comments: post.comments.map((comment) =>
  //               comment.id === commentId
  //                 ? {
  //                     ...comment,
  //                     replies: comment.replies?.map((reply) =>
  //                       reply.id === replyId
  //                         ? { ...reply, liked: !reply.liked }
  //                         : reply
  //                     ),
  //                   }
  //                 : comment
  //             ),
  //           }
  //         : post
  //     )
  //   );
  // };

  // const handleCommentSubmit = (postId: number, newComment: string) => {
  //   const text = newComment.trim();
  //   if (!text) return;

  //   setPosts((prev) =>
  //     prev.map((post) =>
  //       post.id === postId
  //         ? {
  //             ...post,
  //             comments: [
  //               { id: Date.now(), text, author: "You" },
  //               ...post.comments,
  //             ],
  //           }
  //         : post
  //     )
  //   );
  //   setCommentInput((prev) => ({ ...prev, [postId]: "" }));
  // };

  // const handleShowMore = (postId: number) => {
  //   setVisibleComments((prev) => ({
  //     ...prev,
  //     [postId]: (prev[postId] || 3) + 3,
  //   }));
  // };

  // const handleCommentChange = (postId: number, value: string) => {
  //   setCommentInput((prev) => ({ ...prev, [postId]: value }));
  // };

  // const onCommentReplySubmit = (
  //   postId: number,
  //   commentId: number,
  //   text: string
  // ) => {
  //   const trimmedText = text.trim();
  //   if (!trimmedText) return;
  //   setPosts((prev) =>
  //     prev.map((post) =>
  //       post.id === postId
  //         ? {
  //             ...post,
  //             comments: post.comments.map((comment) =>
  //               comment.id === commentId
  //                 ? {
  //                     ...comment,
  //                     replies: [
  //                       ...(comment.replies || []),
  //                       {
  //                         id: Date.now(),
  //                         text: trimmedText,
  //                         author: "You",
  //                         liked: false,
  //                       },
  //                     ],
  //                   }
  //                 : comment
  //             ),
  //           }
  //         : post
  //     )
  //   );
  // };

  return (
    <div className="space-y-2 md:space-y-3 overflow-x-hidden overflow-y-hidden">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
