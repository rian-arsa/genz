"use client";

import { useState } from "react";
import { Globe, Users, Lock, ChevronDown, Check } from "lucide-react";

const options = [
  {
    label: "Anyone",
    value: "public",
    icon: <Globe size={14} />,
    description: "Anyone on or off the platform",
  },
  {
    label: "Connections",
    value: "connections",
    icon: <Users size={14} />,
    description: "Only people you're connected with",
  },
  {
    label: "Only me",
    value: "private",
    icon: <Lock size={14} />,
    description: "Visible only to you",
  },
];

interface AudienceSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function AudienceSelector({
  value,
  onChange,
}: AudienceSelectorProps) {
  const [open, setOpen] = useState(false);
  const selected = options.find((opt) => opt.value === value) ?? options[0];

  return (
    <div className="relative text-sm w-full max-w-[200px] select-none">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-between w-full gap-2 px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1f1f1f] text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#2b2b2b] shadow-sm transition">
        <div className="flex items-center gap-2">
          {selected.icon}
          <span className="text-xs font-medium">{selected.label}</span>
        </div>
        <ChevronDown size={14} className="text-gray-500 dark:text-gray-400" />
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-full origin-top-right rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1e1e1e] shadow-xl animate-in fade-in zoom-in-95">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`w-full px-3 py-2 text-left flex items-start gap-2 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition rounded-md ${
                opt.value === value ? "bg-gray-100 dark:bg-[#2a2a2a]" : ""
              }`}>
              <div className="pt-0.5">{opt.icon}</div>
              <div className="flex-1">
                <p className="text-xs font-medium flex items-center justify-between">
                  {opt.label}
                  {opt.value === value && (
                    <Check size={14} className="text-blue-500" />
                  )}
                </p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-tight">
                  {opt.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
