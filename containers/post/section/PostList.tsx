"use client";

import { useEffect, useRef } from "react";

import { PostCard } from "@/containers/post/section";

import { useQueryFeed } from "@/services/post/query";

type PostListType = {
  option: string;
};

export default function PostList({ option }: PostListType) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useQueryFeed(option);

  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px 0px 300px 0px", // top, right, bottom, left
      threshold: 0, // begitu ada intersect sedikit pun
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }, options);

    const el = loaderRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, [hasNextPage, fetchNextPage, isFetchingNextPage]);

  return (
    <div className="space-y-2 md:space-y-3 overflow-x-hidden overflow-y-hidden">
      <div className="flex flex-col gap-4">
        {status === "pending" &&
          Array.from({ length: 5 }).map((_, i) => (
            <PostCard.Skeleton key={i} />
          ))}

        {data?.pages.map((page, i) =>
          page.data.posts.map((post: any) => (
            <PostCard key={post.id} post={post} />
          ))
        )}

        <div ref={loaderRef} />

        {isFetchingNextPage && (
          <div className="text-center py-4 text-sm text-gray-500">
            Memuat lagi...
          </div>
        )}
      </div>
    </div>
  );
}
