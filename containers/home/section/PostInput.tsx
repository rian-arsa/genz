"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

import { MultiImageUploader, SendPostButtons } from "@/components/ui";

const TiptapEditor = dynamic(
  () => import("@/components/ui").then((mod) => mod.TiptapEditor),
  { ssr: false }
);

export default function PostInputBox() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [html, setHtml] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [audience, setAudience] = useState("public");

  const handleImageChange = useCallback((files: File[]) => {
    setFiles(files);
  }, []);

  const handleSubmit = (isAnonymous: boolean) => {
    setLoading(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setHtml("");
      setFiles([]);
      setLoading(false);
    }, 1500);
  };

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
        <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-gradient-to-r from-pink-500 via-blue-500 to-teal-400 animate-[pulse_2s_infinite] rounded-b-xl" />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-start pt-20 sm:pt-28 backdrop-blur-sm bg-black/40 px-4">
          <div className="bg-white dark:bg-[#1e1e1e] rounded-xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-5 sm:p-6 shadow-xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="sticky top-3 float-right text-gray-500 dark:text-gray-400 hover:text-red-500">
              ✖
            </button>

            <div className="flex items-start gap-3 mb-4">
              <Image
                src="/images/avatar1.jpg"
                alt="User Avatar"
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
              <div className="text-sm flex flex-col gap-1">
                <p className="font-semibold text-gray-800 dark:text-white">
                  Budi LinkedIn
                </p>
                {/* <AudienceSelector value={audience} onChange={setAudience} /> */}
              </div>
            </div>

            <div className="space-y-4">
              <TiptapEditor content={html} onChange={setHtml} />
              <MultiImageUploader onImagesChange={handleImageChange} />
              <SendPostButtons
                loading={loading}
                disabled={!html.trim() && files.length === 0}
                onPost={() => handleSubmit(false)}
                onPostAnonymous={() => handleSubmit(true)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
