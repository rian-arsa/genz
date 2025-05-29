"use client";

import { useState } from "react";

import { Dialog } from "@headlessui/react";

interface SendPostButtonsProps {
  disabled?: boolean;
  loading?: boolean;
  onPost: () => void;
  onPostAnonymous: () => void;
}

export default function SendPostButtons({
  disabled = false,
  loading = false,
  onPost,
  onPostAnonymous,
}: SendPostButtonsProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleAnonPost = () => {
    setIsConfirmOpen(false);
    onPostAnonymous();
  };

  return (
    <>
      <div className="flex justify-end gap-2 mt-6">
        {/* Post as Anonymous */}
        <button
          type="button"
          onClick={() => setIsConfirmOpen(true)}
          disabled={disabled || loading}
          className={`px-4 py-2 rounded-md text-sm font-medium border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 bg-white dark:bg-[#2a2a2a] hover:bg-gray-100 dark:hover:bg-[#3a3a3a] transition ${
            (disabled || loading) && "opacity-50 cursor-not-allowed"
          }`}>
          {loading ? "Posting..." : "Post Anonim"}
        </button>

        {/* Post with Identity */}
        <button
          type="button"
          onClick={onPost}
          disabled={disabled || loading}
          className={`px-5 py-2 rounded-md text-sm font-semibold text-white bg-pink-600 hover:bg-pink-700 transition ${
            (disabled || loading) && "opacity-50 cursor-not-allowed"
          }`}>
          {loading ? "Posting..." : "Post"}
        </button>
      </div>

      {/* Confirm Modal */}
      <Dialog
        open={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        className="relative z-50">
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-lg bg-white dark:bg-zinc-900 p-6 shadow-lg">
            <Dialog.Title className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Konfirmasi Postingan Anonim
            </Dialog.Title>
            <Dialog.Description className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              <span>
                🕵️‍♂️ Postingan anonimmu akan diperiksa oleh Tim Sensor Warga
                Digital. <strong>Prosesnya maksimal 1x24</strong> jam untuk
                memastikan bebas dari konten SARA, seksual, dan hal sensitif.
              </span>
              <br />
              <strong className="block mt-4">
                🚨 Lanjut kirim curhatanmu, warga?
              </strong>
            </Dialog.Description>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsConfirmOpen(false)}
                className="px-3 py-1.5 text-sm rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 transition">
                Batal
              </button>
              <button
                onClick={handleAnonPost}
                className="px-4 py-1.5 text-sm rounded-md bg-pink-600 text-white font-medium hover:bg-pink-700 transition">
                Lanjutkan Posting
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
