export const SidebarCollapseSkeleton = () => {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1f1f1f] p-4 shadow-sm animate-pulse">
      <div className="flex justify-between items-center">
        <div className="h-8 w-40 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full" />
      </div>
    </div>
  );
};
