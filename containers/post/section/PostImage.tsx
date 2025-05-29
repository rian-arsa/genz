"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog } from "@headlessui/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function PostImageGallery({
  images,
  showAll,
  setShowAll,
  layout = "detail",
}: {
  images: string[];
  showAll: boolean;
  setShowAll: (val: boolean) => void;
  layout?: "card" | "detail";
}) {
  const visibleImages =
    layout === "card"
      ? images.slice(0, 3)
      : showAll
      ? images
      : images.slice(0, 2);

  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImage(index);
    setLightboxOpen(true);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const gridClass =
    layout === "card" ? "grid grid-cols-3 gap-2 mt-3" : "space-y-4 mt-6";

  return (
    <div className={gridClass} onClick={(e) => e.stopPropagation()}>
      {visibleImages.map((image, index) => (
        <div
          key={index}
          className="relative overflow-hidden rounded-xl cursor-pointer"
          onClick={() => openLightbox(index)}>
          {!loadedImages[index] && (
            <div className="aspect-video bg-zinc-200 dark:bg-zinc-700 animate-pulse rounded-xl" />
          )}
          <Image
            src={image}
            alt={`Post image ${index + 1}`}
            className={`w-full h-auto object-cover rounded-xl transition-opacity duration-500 ${
              loadedImages[index] ? "opacity-100" : "opacity-0"
            }`}
            width={800}
            height={450}
            sizes="(max-width: 640px) 100vw, 800px"
            onLoad={() =>
              setLoadedImages((prev) => ({ ...prev, [index]: true }))
            }
            priority={index < 2}
          />
          {layout === "card" && index === 2 && images.length > 3 && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-xl">
              <span className="text-white text-xl font-semibold">
                +{images.length - 3}
              </span>
            </div>
          )}
        </div>
      ))}

      {!showAll && images.length > 2 && layout !== "card" && (
        <button
          onClick={() => setShowAll(true)}
          className="text-sm text-pink-600 hover:underline">
          Tampilkan semua foto ({images.length - 2} lainnya)
        </button>
      )}

      <Dialog
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        className="fixed inset-0 z-50">
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
          <div className="relative h-full w-full px-4">
            <Image
              src={images[currentImage]}
              alt="preview"
              fill
              className="object-contain max-h-screen w-auto mx-auto max-w-screen-sm"
              priority
            />
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-black">
              <X size={24} />
            </button>
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 p-2 rounded-full">
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 p-2 rounded-full">
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>
        </div>
      </Dialog>
    </div>
  );
}
