"use client";

import { useState } from "react";
import { X } from "lucide-react";

export function ModalInputRecommendation({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = () => {
    if (!title || !description) return alert("Semua field wajib diisi");
    // Lakukan kirim data di sini
    console.log({ title, url, description, image });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-800 dark:hover:text-white">
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-semibold mb-4 text-zinc-800 dark:text-white">
          📝 Tambah Rekomendasi Baru
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Judul rekomendasi"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 text-sm text-zinc-700 dark:text-white"
          />

          <input
            type="url"
            placeholder="URL atau tautan (opsional)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 text-sm text-zinc-700 dark:text-white"
          />

          <textarea
            placeholder="Deskripsi singkat tempat, vibe, atau pengalaman kamu..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 text-sm text-zinc-700 dark:text-white"
          />
          <div className="mb-1">
            <label className="text-sm text-zinc-700 dark:text-zinc-300 mb-1 block">
              📸 Foto Rekomendasi
            </label>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => document.getElementById("imageUpload")?.click()}
                className="px-4 py-2 text-sm rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition">
                Pilih Gambar
              </button>

              {image && (
                <span className="text-xs text-zinc-600 dark:text-zinc-300">
                  {image.name}
                </span>
              )}
            </div>

            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="hidden"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-md border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800">
            Batal
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm rounded-md bg-pink-600 text-white hover:bg-pink-700">
            Kirim
          </button>
        </div>
      </div>
    </div>
  );
}
