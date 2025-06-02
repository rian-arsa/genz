"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import PostModal from "./components/PostModal";
import { FileText, ImageIcon, ThumbsUp, Video } from "lucide-react";
import { ModalInputRecommendation } from "./components";

export default function PostInputBox() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [html, setHtml] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = useCallback((newFiles: File[]) => {
    setFiles(newFiles);
  }, []);

  const handleSubmit = useCallback(
    (isAnonymous: boolean) => {
      setLoading(true);
      // Simulasi submit, ganti dengan API call
      setTimeout(() => {
        setHtml("");
        setFiles([]);
        setLoading(false);
        setIsModalOpen(false);
      }, 1500);
    },
    [files, html]
  );

  return (
    <>
      <div className="relative w-full overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-white to-gray-50 dark:from-[#1f1f1f] dark:to-[#232323] shadow-md p-4 hover:shadow-lg transition-shadow mb-4">
        <div className="flex items-center gap-4">
          <Image
            src="/images/avatar1.jpg"
            alt="User Avatar"
            width={48}
            height={48}
            className="rounded-full object-cover border border-gray-300 dark:border-gray-600"
          />
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex-1 text-left bg-gradient-to-r from-gray-100 to-gray-200 dark:from-[#2c2c2c] dark:to-[#3a3a3a] hover:from-gray-200 hover:to-gray-300 dark:hover:from-[#3a3a3a] dark:hover:to-[#444] text-sm text-gray-700 dark:text-gray-200 px-5 py-2 rounded-full transition-all shadow-sm hover:shadow-md">
            ✨ Ada cerita apa hari ini?
          </button>
        </div>
        <div className="w-full flex gap-2 mt-2 ml-20">
          <button
            onClick={() => {
              setIsModalOpen(true);
            }}
            className="flex items-center gap-1 px-3 py-1.5 text-xs border rounded-md text-gray-700 dark:text-gray-200 ">
            <ImageIcon className="w-4 h-4 " />
            <span className="hidden sm:block">Gambar</span>
          </button>
          <button
            onClick={() => {
              setIsModalOpen(true);
            }}
            className="flex items-center gap-1 px-3 py-1.5 text-xs border rounded-md text-gray-700 dark:text-gray-200 ">
            <Video className="w-4 h-4 " />
            <span className="hidden sm:block">Video</span>
          </button>
          <button
            onClick={() => {
              setIsModalOpen(true);
            }}
            className="flex items-center gap-1 px-3 py-1.5 text-xs border rounded-md text-gray-700 dark:text-gray-200 ">
            <FileText className="w-4 h-4 " />
            <span className="hidden sm:block">PDF</span>
          </button>
          <button
            onClick={() => {
              setIsModalOpen(true);
            }}
            className="flex items-center gap-1 px-3 py-1.5 text-xs border rounded-md text-gray-700 dark:text-gray-200 ">
            <ThumbsUp className="w-4 h-4 " />
            <span className="hidden sm:block">Rekomendasi</span>
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-gradient-to-r from-pink-500 via-blue-500 to-teal-400 animate-[pulse_2s_infinite] rounded-b-xl" />
      </div>

      {isModalOpen && (
        <PostModal
          html={html}
          setHtml={setHtml}
          files={files}
          onFilesChange={handleFileChange}
          onSubmit={handleSubmit}
          loading={loading}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {/* <ModalInputRecommendation onClose={() => {}} /> */}
    </>
  );
}
