"use client";

import { useDropzone } from "react-dropzone";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

type ImagePreview = {
  file: File;
  url: string;
};

interface MultiImageUploaderProps {
  onImagesChange: (files: File[]) => void;
}

export default function MultiImageUploader({
  onImagesChange,
}: MultiImageUploaderProps) {
  const [images, setImages] = useState<ImagePreview[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newPreviews = acceptedFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newPreviews]);
  }, []);

  const removeImage = (index: number) => {
    setImages((prev) => {
      const updated = [...prev];
      const removed = updated.splice(index, 1);
      if (removed[0]) URL.revokeObjectURL(removed[0].url);
      return updated;
    });
  };

  // Only run onImagesChange when image count changes
  useEffect(() => {
    onImagesChange(images.map((img) => img.file));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  return (
    <div className="mt-4">
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-gray-300 dark:border-gray-600 p-6 rounded-lg text-center text-sm text-gray-500 dark:text-gray-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition">
        <input {...getInputProps()} />
        {isDragActive
          ? "Drop images here..."
          : "Click or drag images to upload"}
      </div>

      {/* Preview grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
          {images.map((img, index) => (
            <div
              key={index}
              className="relative group rounded-lg overflow-hidden border">
              <Image
                src={img.url}
                alt={`uploaded-${index}`}
                width={300}
                height={200}
                className="w-full h-40 object-cover"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 text-xs bg-black/60 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                ✖
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
