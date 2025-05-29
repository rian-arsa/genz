"use client";

import { TVerifiedTier } from "@/app/types/post";

interface IVerifiedBadgeInlineProps {
  tier: TVerifiedTier;
  className?: string;
}

const tierMap = {
  basic: {
    color: "bg-blue-500",
    label: "Warga Verified",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="blue"
        viewBox="0 0 24 24"
        className="w-5 h-5">
        <path d="M22 12l-2.3-2 1-3-3-1-1-3-3 1-2-2-2 2-3-1-1 3-3 1 1 3-2 2 2 2-1 3 3 1 1 3 3-1 2 2 2-2 3 1 1-3 3-1-1-3zM10 16l-4-4 1.4-1.4 2.6 2.6 5.6-5.6L17 9l-7 7z" />
      </svg>
    ),
  },
  premium: {
    color: "bg-yellow-400",
    label: "Sultan Verified",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="orange"
        viewBox="0 0 24 24"
        className="w-5 h-5">
        <path d="M22 12l-2.3-2 1-3-3-1-1-3-3 1-2-2-2 2-3-1-1 3-3 1 1 3-2 2 2 2-1 3 3 1 1 3 3-1 2 2 2-2 3 1 1-3 3-1-1-3zM10 16l-4-4 1.4-1.4 2.6 2.6 5.6-5.6L17 9l-7 7z" />
      </svg>
    ),
  },
  admin: {
    color: "bg-emerald-500",
    label: "Admin Negara",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="green"
        viewBox="0 0 24 24"
        className="w-4 h-4">
        <path d="M12 2l8 4v6c0 5-3.4 9.3-8 10-4.6-.7-8-5-8-10V6l8-4z" />
      </svg>
    ),
  },
  presiden: {
    color: "bg-orange-400",
    label: "Presiden Gen Z",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="red"
        viewBox="0 0 24 24"
        className="w-6 h-6">
        <path d="M12 2l3 6h6l-4.5 4 1.5 6-5-3-5 3 1.5-6L3 8h6z" />
      </svg>
    ),
  },
};

export function VerifiedBadge({
  tier,
  className = "",
}: IVerifiedBadgeInlineProps) {
  const data = tierMap[tier] ?? tierMap.basic;

  return (
    <span className={`relative group inline-block align-middle ${className} `}>
      {data.icon}
      <span
        className={`absolute z-50 top-full mt-1 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap text-xs px-2 py-1 rounded  shadow-md border border-zinc-700 ${data.color}`}>
        {data.label}
      </span>
    </span>
  );
}
