"use client";

import { PostInput, PostList } from "@/components/features";

export default function HomePage() {
  console.log("HomePage");

  return (
    <>
      <PostInput />
      <PostList />
    </>
  );
}
