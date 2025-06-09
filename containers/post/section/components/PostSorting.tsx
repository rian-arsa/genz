"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

const options = [
  { label: "Untukmu", value: "fyp" },
  { label: "Terbaru", value: "recent" },
  { label: "Anonim", value: "anon" },
  { label: "Ormas", value: "community" },
  { label: "Tetangga", value: "neighbors" },
];

export function FeedSortDropdown({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.value === value);

  // Close when click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center justify-end w-full my-4">
      {/* Garis tipis di kiri */}
      <div className="flex-1 border-t border-zinc-200 dark:border-zinc-700 mr-4" />

      {/* Dropdown */}
      <div ref={dropdownRef} className="relative inline-block text-left">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-1 text-sm text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white font-medium transition">
          Postingan:{" "}
          <span className="font-semibold">{selectedOption?.label}</span>
          <ChevronDown className="w-4 h-4" />
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white dark:bg-zinc-800 ring-1 ring-black/10 dark:ring-white/10 z-10 animate-fade-in">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={`block w-full px-4 py-2 text-sm text-left ${
                  value === option.value
                    ? "bg-zinc-100 dark:bg-zinc-700 font-semibold text-pink-600 dark:text-pink-400"
                    : "hover:bg-zinc-50 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300"
                }`}>
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
