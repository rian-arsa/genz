type TPostActionItem = {
  handleClick: (e: React.MouseEvent) => void;
  status: boolean;
  IconName: React.ElementType;
  color: "pink" | "blue" | "green" | "yellow" | "purple" | "gray"; // batasi pilihan warna agar aman
  label: string;
  count?: number;
};

export const PostActionItem = ({
  handleClick,
  status,
  IconName,
  color,
  label,
  count = 0,
}: TPostActionItem) => {
  const isActive = status;

  const baseClass =
    "flex items-center gap-1 px-2 py-1.5 rounded-full transition transform hover:scale-105 active:scale-95 cursor-pointer";
  const activeClassMap: Record<typeof color, string> = {
    pink: "text-pink-600",
    blue: "text-blue-600",
    green: "text-green-600",
    yellow: "text-yellow-600 bg-yellow-100",
    purple: "text-purple-600",
    gray: "text-gray-600",
  };

  const tooltipBgMap: Record<typeof color, string> = {
    pink: "via-pink-50 ring-pink-100",
    blue: "via-blue-50 ring-blue-100",
    green: "via-green-50 ring-green-100",
    yellow: "via-yellow-50 ring-yellow-100",
    purple: "via-purple-50 ring-purple-100",
    gray: "via-gray-50 ring-gray-100",
  };

  const fillBgMap: Record<typeof color, string> = {
    pink: "pink",
    blue: "transparent",
    green: "transparent",
    yellow: "transparent",
    purple: "transparent",
    gray: "transparent",
  };

  const animationMap: Record<typeof color, string> = {
    pink: "animate-pop",
    blue: "animate-pop",
    green: "animate-ping",
    yellow: "animate-wiggle",
    purple: "animate-spin-slow",
    gray: "", // no animation
  };

  return (
    <div className="relative group">
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleClick(e);
        }}
        className={`${baseClass} ${isActive ? activeClassMap[color] : ""}`}>
        <IconName
          size={18}
          fill={isActive ? fillBgMap[color] : "transparent"}
          className={isActive ? animationMap[color] : ""}
        />
        {count > 0 && <span className="text-sm font-semibold">{count}</span>}
      </button>

      <span
        className={`absolute z-50 left-1/2 -translate-x-1/2 top-full mt-2 text-[11px] font-medium px-2 py-0.5 rounded bg-gradient-to-br from-white ${tooltipBgMap[color]} to-white dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-800 border border-gray-200 dark:border-gray-700 text-gray-500 shadow-md group-hover:opacity-100 opacity-0 transition duration-300 ease-out scale-90 group-hover:scale-100 whitespace-nowrap`}>
        {label}
      </span>
    </div>
  );
};
