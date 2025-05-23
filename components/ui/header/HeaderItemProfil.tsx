"use client";

export type THeaderItemProfil = {
  icon: React.ReactNode;
  label: string;
  url: string;
};

export const HeaderItemProfil = ({
  item,
  onClick,
}: {
  onClick: () => void;
  item: THeaderItemProfil;
}) => {
  return (
    <li
      className="px-4 py-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-700 cursor-pointer flex gap-2"
      onClick={onClick}>
      {item.icon ? item.icon : null} {item.label}
    </li>
  );
};
