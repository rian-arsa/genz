"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

import { useDropzone } from "react-dropzone";

import { FileText, Video, X, ImageIcon } from "lucide-react";
import { toast } from "sonner";

type FilePreview = {
  file: File;
  url: string;
  type: "image" | "video" | "pdf" | "other";
};

function useSingleDropzone({
  accept,
  onDrop,
}: {
  accept: Record<string, string[]>;
  onDrop: (files: File[]) => void;
}) {
  const { getRootProps, getInputProps, open } = useDropzone({
    accept,
    onDrop,
    noClick: true,
    noKeyboard: true,
  });

  return { open, getRootProps, getInputProps };
}

interface MultiFileUploaderProps {
  onFilesChange: (files: File[]) => void;
  loading: boolean;
}

export function MultiFileUploader({
  onFilesChange,
  loading,
}: MultiFileUploaderProps) {
  const [files, setFiles] = useState<FilePreview[]>([]);

  const handleDrop = useCallback(
    (type: "image" | "video" | "pdf", acceptedFiles: File[]) => {
      const maxFileSize = 100 * 1024 * 1024; // 100MB
      const validFiles: FilePreview[] = [];

      for (const file of acceptedFiles) {
        const fileType = file.type;

        if (file.size > maxFileSize) {
          toast.error(`"${file.name}" terlalu besar (maks 10MB)`);
          continue;
        }

        if (
          (type === "image" && !fileType.startsWith("image/")) ||
          (type === "video" && !fileType.startsWith("video/"))
          // (type === "pdf" && fileType !== "application/pdf")
        ) {
          toast.error(
            `"${file.name}" bukan file ${type.toUpperCase()} yang valid`
          );
          continue;
        }

        validFiles.push({
          file,
          url: URL.createObjectURL(file),
          type,
        });
      }

      if (validFiles.length === 0) {
        toast.warning("Tidak ada file valid.");
        return;
      }

      setFiles((prev) => {
        const isDifferentType = prev.length > 0 && prev[0].type !== type;

        if (isDifferentType) {
          prev.forEach((f) => URL.revokeObjectURL(f.url));
          toast.info("File sebelumnya diganti karena beda jenis.");
          return type === "image" ? validFiles : [validFiles[0]];
        }

        if (type === "image") {
          return [...prev, ...validFiles];
        } else {
          prev.forEach((f) => URL.revokeObjectURL(f.url));
          return [validFiles[0]];
        }
      });
    },
    []
  );

  const removeFile = useCallback((index: number) => {
    setFiles((prev) => {
      const updated = [...prev];
      const [removed] = updated.splice(index, 1);
      if (removed) URL.revokeObjectURL(removed.url);
      return updated;
    });
  }, []);

  useEffect(() => {
    return () => {
      files.forEach((f) => URL.revokeObjectURL(f.url));
    };
  }, [files]);

  useEffect(() => {
    onFilesChange(files.map((f) => f.file));
  }, [files, onFilesChange]);

  // Dropzone per tombol
  const imageDropzone = useSingleDropzone({
    accept: { "image/*": [] },
    onDrop: (files) => handleDrop("image", files),
  });
  const videoDropzone = useSingleDropzone({
    accept: { "video/*": [] },
    onDrop: (files) => handleDrop("video", files),
  });
  // const pdfDropzone = useSingleDropzone({
  //   accept: { "application/pdf": [] },
  //   onDrop: (files) => handleDrop("pdf", files),
  // });

  return (
    <div className="mt-4">
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => {
            imageDropzone.open();
          }}
          className="flex items-center gap-1 px-3 py-1.5 text-xs border rounded-md text-pink-600 dark:text-pink-300 border-pink-300 dark:border-pink-600 hover:bg-pink-100 dark:hover:bg-pink-800 transition">
          <ImageIcon className="w-4 h-4 text-pink-600 dark:text-pink-300" />
          <span>Gambar</span>
        </button>
        <button
          onClick={() => {
            videoDropzone.open();
          }}
          className="flex items-center gap-1 px-3 py-1.5 text-xs border rounded-md text-pink-600 dark:text-pink-300 border-pink-300 dark:border-pink-600 hover:bg-pink-100 dark:hover:bg-pink-800 transition">
          <Video className="w-4 h-4 text-pink-600 dark:text-pink-300" />
          <span>Video</span>
        </button>
        {/* <button
          onClick={() => {
            pdfDropzone.open();
          }}
          className="flex items-center gap-1 px-3 py-1.5 text-xs border rounded-md text-pink-600 dark:text-pink-300 border-pink-300 dark:border-pink-600 hover:bg-pink-100 dark:hover:bg-pink-800 transition">
          <FileText className="w-4 h-4 text-pink-600 dark:text-pink-300" />
          <span>PDF</span>
        </button> */}
      </div>

      {/* Dropzone hidden input (agar tetap bisa drag and drop) */}
      <div {...imageDropzone.getRootProps()} className="hidden">
        <input {...imageDropzone.getInputProps()} />
      </div>
      <div {...videoDropzone.getRootProps()} className="hidden">
        <input {...videoDropzone.getInputProps()} />
      </div>
      {/* <div {...pdfDropzone.getRootProps()} className="hidden">
        <input {...pdfDropzone.getInputProps()} />
      </div> */}

      {files.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
          {files.map((f, index) => (
            <div
              key={index}
              className="relative group border rounded-lg overflow-hidden p-2 bg-white dark:bg-zinc-800">
              {f.type === "image" ? (
                <Image
                  src={f.url}
                  alt={`file-${index}`}
                  width={300}
                  height={200}
                  className="w-full h-40 object-cover rounded"
                />
              ) : f.type === "video" ? (
                <video
                  src={f.url}
                  controls
                  className="w-full h-40 object-cover rounded"
                />
              ) : f.type === "pdf" ? (
                <div className="flex flex-col items-center justify-center h-40 text-center text-xs text-gray-600 dark:text-gray-300">
                  <FileText className="w-8 h-8 mb-2 text-blue-500" />
                  <p className="truncate w-full">{f.file.name}</p>
                </div>
              ) : (
                <div className="p-4 text-xs text-center">Unsupported file</div>
              )}

              {!loading && (
                <button
                  onClick={() => removeFile(index)}
                  className="absolute top-1 right-1 text-xs bg-black/60 text-white px-2 py-1 rounded transition">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
