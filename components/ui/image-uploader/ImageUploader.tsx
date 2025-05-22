// components/post/ImageUploader.tsx
"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

interface ImageUploaderProps {
  imageUrl: string | null;
  onImageChange: (file: File | null, previewUrl?: string) => void;
}

export default function ImageUploader({
  imageUrl,
  onImageChange,
}: ImageUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      const previewUrl = URL.createObjectURL(file);
      onImageChange(file, previewUrl);
    },
    [onImageChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  return (
    <div className="mt-4">
      {imageUrl ? (
        <div className="relative group w-full border rounded-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt="Uploaded"
            width={600}
            height={300}
            className="w-full object-cover rounded-lg"
          />
          <button
            onClick={() => onImageChange(null)}
            className="absolute top-2 right-2 text-sm bg-black/70 text-white px-2 py-1 rounded hover:bg-black/90 transition">
            Remove
          </button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className="border-2 border-dashed border-gray-300 dark:border-gray-600 p-6 rounded-lg text-center text-sm text-gray-500 dark:text-gray-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition">
          <input {...getInputProps()} />
          {isDragActive
            ? "Drop the image here..."
            : "Click or drag an image to upload"}
        </div>
      )}
    </div>
  );
}
