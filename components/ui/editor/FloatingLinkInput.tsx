"use client";

import { useEffect, useRef } from "react";

interface FloatingLinkInputProps {
  url: string;
  onChange: (newUrl: string) => void;
  onCancel: () => void;
  onSave: () => void;
  className?: string;
}

export default function FloatingLinkInput({
  url,
  onChange,
  onCancel,
  onSave,
  className = "",
}: FloatingLinkInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div
      className={`absolute z-50 w-72 bg-white dark:bg-zinc-800 p-3 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-700 ${className}`}>
      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
        Masukkan URL
      </label>
      <input
        ref={inputRef}
        type="text"
        value={url}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://..."
        className="w-full rounded-md px-3 py-1 text-sm bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 ring-blue-500"
      />
      <div className="flex justify-end gap-2 mt-2 text-sm">
        <button
          onClick={onCancel}
          className="text-zinc-500 hover:text-red-500 transition">
          Batal
        </button>
        <button
          onClick={onSave}
          className="font-semibold text-blue-600 hover:underline transition">
          Simpan
        </button>
      </div>
    </div>
  );
}
