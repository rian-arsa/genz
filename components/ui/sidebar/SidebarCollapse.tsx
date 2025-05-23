"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export type TSidebarCollapse = {
  title: string;
  children: React.ReactNode;
};

export const SidebarCollapse = ({ title, children }: TSidebarCollapse) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1f1f1f] p-4 shadow-sm">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}>
        <p className="text-sm font-semibold text-gray-900 dark:text-white">
          {title}
        </p>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        )}
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-40 mt-3" : "max-h-0"
        }`}>
        <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
          {children}
        </ul>
      </div>
    </div>
  );
};
