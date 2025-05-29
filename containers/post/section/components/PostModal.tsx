import Image from "next/image";
import dynamic from "next/dynamic";
import { MultiFileUploader, SendPostButtons } from "@/components/ui";
import { Dispatch, SetStateAction } from "react";

// Dynamic import untuk editor
const TiptapEditor = dynamic(
  () => import("@/components/ui").then((mod) => mod.TiptapEditor),
  { ssr: false, loading: () => <p>Loading editor...</p> }
);

interface Props {
  html: string;
  setHtml: Dispatch<SetStateAction<string>>;
  files: File[];
  onFilesChange: (files: File[]) => void;
  loading: boolean;
  onSubmit: (isAnonymous: boolean) => void;
  onClose: () => void;
}

export default function PostModal({
  html,
  setHtml,
  files,
  onFilesChange,
  loading,
  onSubmit,
  onClose,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-start pt-10 sm:pt-12 backdrop-blur-sm bg-black/40 px-4">
      <div className="bg-white dark:bg-[#1e1e1e] rounded-xl w-full max-w-xl max-h-[80vh] overflow-y-auto p-5 sm:p-6 shadow-xl relative">
        <button
          onClick={onClose}
          aria-label="Tutup modal"
          className="sticky top-3 float-right text-gray-500 dark:text-gray-400 hover:text-red-500">
          ✖
        </button>

        <div className="flex gap-4 mb-4 items-center">
          {/* TODO: UBAH AVATAR USER */}
          <Image
            src="/images/avatar1.jpg"
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          <p className="font-semibold text-gray-800 dark:text-white">
            Budi LinkedIn
            {/* TODO: UBAH NAMA USER */}
          </p>
          <div className="text-sm flex flex-col gap-1"></div>
        </div>

        <div className="space-y-4">
          <TiptapEditor content={html} onChange={setHtml} />
          <MultiFileUploader onFilesChange={onFilesChange} />
          <SendPostButtons
            loading={loading}
            disabled={!html.trim() && files.length === 0}
            onPost={() => onSubmit(false)}
            onPostAnonymous={() => onSubmit(true)}
          />
        </div>
      </div>
    </div>
  );
}
