"use client";

type HeaderItemIcon = {
  IconName: React.ElementType;
  onClick?: () => void;
  label: string;
};

export const HeaderItemIcon = ({
  IconName,
  onClick,
  label,
}: HeaderItemIcon) => {
  return (
    <div className="relative group">
      <button
        className="flex items-center gap-1 p-2 rounded-full hover:bg-primary/10 text-gray-500 transition transform hover:scale-105 active:scale-95 cursor-pointer"
        onClick={onClick}>
        <IconName size={18} />
      </button>
      <span className="absolute z-20 left-1/2 -translate-x-1/2 top-full mt-2 text-[11px] font-medium px-2 py-0.5 rounded bg-gradient-to-br from-white via-pink-50 to-white dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-800 border border-gray-200 dark:border-gray-700 text-gray-500 shadow-md ring-1 ring-pink-100 dark:ring-zinc-700 group-hover:opacity-100 opacity-0 transition duration-300 ease-out scale-90 group-hover:scale-100 whitespace-nowrap dark:text-gray-200">
        {label}
      </span>
    </div>
  );
};
