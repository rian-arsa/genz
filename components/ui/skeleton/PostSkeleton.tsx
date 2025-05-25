import React from "react";

export const PostSkeleton = () => {
  return (
    <div className="bg-white dark:bg-[#1f1f1f] rounded-xl shadow-sm w-full mx-auto px-4 py-6 animate-pulse space-y-4">
      {/* post header */}
      <div className="flex items-center gap-3 mb-10">
        <div className="w-14 h-12 rounded-full bg-zinc-200 dark:bg-zinc-700" />
        <div className="flex justify-between w-full items-center">
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-3/4" />
            <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-1/2" />
          </div>
          <div className="bg-zinc-200 dark:bg-zinc-700 rounded-full w-[100px] h-[30px]"></div>
        </div>
      </div>

      {/* post content */}
      <div className="h-6 bg-zinc-200 dark:bg-zinc-700 rounded w-1/2" />
      <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-3/4" />
      <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-full" />
      <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-5/6" />
      <div className="aspect-video bg-zinc-200 dark:bg-zinc-700 rounded-xl w-full" />

      {/* post action */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-3">
          <div className="h-6 bg-zinc-200 dark:bg-zinc-700 rounded w-10" />
          <div className="h-6 bg-zinc-200 dark:bg-zinc-700 rounded w-10" />
          <div className="h-6 bg-zinc-200 dark:bg-zinc-700 rounded w-10" />
          <div className="h-6 bg-zinc-200 dark:bg-zinc-700 rounded w-10" />
        </div>
        <div className="flex items-center gap-3">
          <div className="h-6 bg-zinc-200 dark:bg-zinc-700 rounded w-10" />
          <div className="h-6 bg-zinc-200 dark:bg-zinc-700 rounded w-10" />
        </div>
      </div>
    </div>
  );
};
