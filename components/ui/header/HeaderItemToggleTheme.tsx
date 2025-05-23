"use client";

type THeaderItemToggleTheme = {
  setTheme: (theme: string) => void;
  theme: string;
  IconNameOn: React.ElementType;
  IconNameOff: React.ElementType;
};

export const HeaderItemToggleTheme = ({
  setTheme,
  theme,
  IconNameOn,
  IconNameOff,
}: THeaderItemToggleTheme) => {
  return (
    <button
      className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme">
      {theme === "dark" ? (
        <IconNameOn className="w-5 h-5 text-zinc-700 dark:text-zinc-200" />
      ) : (
        <IconNameOff className="w-5 h-5 text-zinc-700 dark:text-zinc-200" />
      )}
    </button>
  );
};
