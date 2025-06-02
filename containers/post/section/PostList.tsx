"use client";

import { useMemo, useState } from "react";

import { TPost } from "@/types/post";
import { PostCard } from "@/containers/post/section";

import { DUMMY_POSTS } from "@/dummy/post";

export default function PostList() {
  const initialPosts = useMemo(() => DUMMY_POSTS, []);
  const [posts, setPosts] = useState<TPost[]>(initialPosts);

  return (
    <div className="space-y-2 md:space-y-3 overflow-x-hidden overflow-y-hidden">
      {posts.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 py-10">
          Belum ada postingan 😶
        </div>
      ) : (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      )}
    </div>
  );
}
