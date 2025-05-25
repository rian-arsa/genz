"use client";

import PostCard, { TPost } from "@/containers/home/section/PostCard";
import { DUMMY_POSTS } from "@/dummy/post";
import { useState } from "react";

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
