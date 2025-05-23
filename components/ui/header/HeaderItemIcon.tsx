"use client";

type HeaderItemIcon = {
  IconName: React.ElementType;
  onClick?: () => void;
};

export const HeaderItemIcon = ({ IconName, onClick }: HeaderItemIcon) => {
  return (
    <button
      className="p-2 rounded-full hover:bg-primary/10 cursor-pointer"
      onClick={onClick}>
      <IconName className="w-5 h-5 text-zinc-700 dark:text-zinc-200" />
    </button>
  );
};
