"use client";

type THeaderItem = {
  itemRef: React.RefObject<HTMLDivElement | null>;
  showDropdown: boolean;
  setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  IconName: React.ElementType;
  children?: React.ReactNode;
};

export const HeaderItem = ({
  itemRef,
  showDropdown,
  setShowDropdown,
  IconName,
  children,
}: THeaderItem) => {
  return (
    <div ref={itemRef}>
      <button
        className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
        onClick={() => setShowDropdown(!showDropdown)}>
        <IconName className="w-5 h-5 text-zinc-700 dark:text-zinc-200" />
      </button>
      {children}
    </div>
  );
};
