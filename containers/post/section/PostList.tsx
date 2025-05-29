"use client";

import { useState } from "react";

import { TPost } from "@/app/types/post";
import { PostCard } from "@/containers/post/section";

import { DUMMY_POSTS } from "@/dummy/post";

export default function PostList() {
  const [posts, setPosts] = useState<TPost[]>(DUMMY_POSTS);

  return (
    <div className="space-y-2 md:space-y-3 overflow-x-hidden overflow-y-hidden">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
