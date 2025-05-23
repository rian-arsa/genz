"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export type THeaderSearch = {
  placeholder: string;
  onKeyDown: (searchTerm: string) => void;
};

export const HeaderSearch = ({ placeholder, onKeyDown }: THeaderSearch) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onKeyDown(searchTerm);
    }
  };

  return (
    <div className="relative w-full flex items-center">
      <input
        type="text"
        placeholder={placeholder}
        className="w-full rounded-full border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-zinc-800 dark:text-zinc-200"
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        value={searchTerm}
      />
      <div
        className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 cursor-pointer"
        onClick={() => onKeyDown && onKeyDown(searchTerm)}>
        <Search size={16} strokeWidth={2} className="text-current" />
      </div>
    </div>
  );
};
