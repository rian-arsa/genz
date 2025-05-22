"use client";

import { useState } from "react";
import PostCard from "./PostCard";

// --- Type Definitions ---
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
  liked?: boolean;
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

// --- Mock Data ---
const replies: Reply[] = [
  { id: 1001, text: "Setuju banget!", author: "Andi", liked: false },
  { id: 1002, text: "Keren bro!", author: "Sari", liked: false },
  { id: 1003, text: "Bisa dicontoh nih", author: "Joko", liked: false },
  { id: 1004, text: "Inspiratif!", author: "Maya", liked: false },
];

const dummyPosts: Post[] = [
  {
    id: 1,
    author: {
      name: "Budi LinkedIn",
      avatar: "/images/avatar1.jpg",
    },
    html: "<p>This is my first post using <strong>Tiptap</strong> editor! 🎉</p>",
    images: [
      "/images/sample1.jpg",
      "/images/sample2.jpg",
      "/images/sample3.jpg",
      "/images/sample2.jpg",
      "/images/sample3.jpg",
    ],
    audience: "public",
    date: "Just now",
    liked: false,
    likeCount: 3,
    comments: [
      { id: 101, text: "🔥 Mantap bro!", author: "Doni", replies },
      { id: 102, text: "Gokil nih stylingnya", author: "Putri" },
      { id: 103, text: "Teach me senpai ✨", author: "Rizky" },
      { id: 104, text: "Keren banget 😍", author: "Ayu" },
    ],
  },
  {
    id: 2,
    author: {
      name: "AnonUser",
      avatar: "/images/avatar2.jpg",
    },
    html: "<p>Posting anonymously to share something deep... 🫣</p>",
    images: [],
    audience: "private",
    date: "5 minutes ago",
    liked: true,
    likeCount: 1,
    comments: [{ id: 201, text: "Kuat ya!", author: "SupportiveFriend" }],
  },
];

// --- Main Component ---
export default function PostFeed() {
  const [posts, setPosts] = useState<Post[]>(dummyPosts);
  const [commentInput, setCommentInput] = useState<Record<number, string>>({});
  const [visibleComments, setVisibleComments] = useState<
    Record<number, number>
  >({});

  const toggleLike = (id: number) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id
          ? {
              ...post,
              liked: !post.liked,
              likeCount: post.liked ? post.likeCount - 1 : post.likeCount + 1,
            }
          : post
      )
    );
  };

  const toggleCommentLike = (postId: number, commentId: number) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments.map((comment) =>
                comment.id === commentId
                  ? { ...comment, liked: !comment.liked }
                  : comment
              ),
            }
          : post
      )
    );
  };

  const toggleReplyLike = (
    postId: number,
    commentId: number,
    replyId: number
  ) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments.map((comment) =>
                comment.id === commentId
                  ? {
                      ...comment,
                      replies: comment.replies?.map((reply) =>
                        reply.id === replyId
                          ? { ...reply, liked: !reply.liked }
                          : reply
                      ),
                    }
                  : comment
              ),
            }
          : post
      )
    );
  };
  const handleCommentSubmit = (postId: number, newComment: string) => {
    const text = newComment.trim();
    if (!text) return;

    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                { id: Date.now(), text, author: "You" },
                ...post.comments,
              ],
            }
          : post
      )
    );
    setCommentInput((prev) => ({ ...prev, [postId]: "" }));
  };

  const handleShowMore = (postId: number) => {
    setVisibleComments((prev) => ({
      ...prev,
      [postId]: (prev[postId] || 3) + 3,
    }));
  };

  const handleCommentChange = (postId: number, value: string) => {
    setCommentInput((prev) => ({ ...prev, [postId]: value }));
  };

  const onCommentReplySubmit = (
    postId: number,
    commentId: number,
    text: string
  ) => {
    const trimmedText = text.trim();
    if (!trimmedText) return;
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments.map((comment) =>
                comment.id === commentId
                  ? {
                      ...comment,
                      replies: [
                        ...(comment.replies || []),
                        {
                          id: Date.now(),
                          text: trimmedText,
                          author: "You",
                          liked: false,
                        },
                      ],
                    }
                  : comment
              ),
            }
          : post
      )
    );
  };

  return (
    <div className="space-y-6 mt-6">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onLike={toggleLike}
          onCommentSubmit={handleCommentSubmit}
          onShowMore={handleShowMore}
          commentValue={commentInput[post.id] || ""}
          onCommentChange={handleCommentChange}
          visibleCount={visibleComments[post.id] || 3}
          onCommentReplySubmit={onCommentReplySubmit}
        />
      ))}
    </div>
  );
}
