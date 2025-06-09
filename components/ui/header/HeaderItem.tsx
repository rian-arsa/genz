"use client";

type THeaderItem = {
  itemRef: React.RefObject<HTMLDivElement | null>;
  showDropdown: boolean;
  setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  IconName: React.ElementType;
  children?: React.ReactNode;
  total?: number;
};

export const HeaderItem = ({
  itemRef,
  showDropdown,
  setShowDropdown,
  IconName,
  children,
  total = 0,
}: THeaderItem) => {
  return (
    <div ref={itemRef} className="relative">
      <button
        className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
        onClick={() => setShowDropdown(!showDropdown)}>
        <IconName className="w-5 h-5 text-zinc-700 dark:text-zinc-200" />
        {total > 0 && (
          <span className="absolute top-0 right-0 w-5 h-5 bg-pink-500 text-white text-xs flex items-center justify-center rounded-full">
            {total}
          </span>
        )}
      </button>
      {children}
    </div>
  );
};
