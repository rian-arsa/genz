"use client";

import { useRef, useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

interface PdfImageSliderProps {
  images: string[]; // URL gambar per halaman PDF
}

export function PdfImageSlider({ images }: PdfImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const fullscreenRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (
    index: number,
    ref: React.RefObject<HTMLDivElement | null>
  ) => {
    const container = ref.current;
    if (container) {
      const width = container.clientWidth;
      container.scrollTo({ left: width * index, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex((prev) => {
        const next = prev + 1;
        scrollToIndex(next, isOpen ? fullscreenRef : sliderRef);
        return next;
      });
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => {
        const next = prev - 1;
        scrollToIndex(next, isOpen ? fullscreenRef : sliderRef);
        return next;
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      scrollToIndex(currentIndex, fullscreenRef);
    }
  }, [isOpen, currentIndex]);

  return (
    <>
      {/* MAIN SLIDER */}
      <div
        className="rounded-xl shadow bg-white dark:bg-zinc-900 overflow-hidden"
        onClick={(e) => e.stopPropagation()}>
        <div className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-100 text-sm">
          Dokumen PDF
        </div>

        <div className="relative">
          {currentIndex > 0 && (
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-zinc-800 p-1 rounded-full shadow">
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {currentIndex < images.length - 1 && (
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-zinc-800 p-1 rounded-full shadow">
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          <div
            ref={sliderRef}
            className="flex overflow-x-hidden scroll-smooth w-full">
            {images.map((src, i) => (
              <div
                key={i}
                className="min-w-full flex justify-center p-4 transition-all duration-300">
                <img
                  src={src}
                  alt={`Halaman ${i + 1}`}
                  className="max-h-96 object-contain rounded shadow"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center px-4 py-3 text-sm">
          <span className="text-zinc-600 dark:text-zinc-300">
            Halaman {currentIndex + 1} / {images.length}
          </span>
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-1 text-pink-600 hover:underline">
            <Maximize2 className="w-4 h-4" /> Lihat Fullscreen
          </button>
        </div>
      </div>

      {/* FULLSCREEN DIALOG SLIDER */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50">
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="relative w-full max-w-5xl h-[90vh] bg-white dark:bg-zinc-900 rounded-xl shadow-xl overflow-hidden">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-white bg-black/60 p-2 rounded-full hover:bg-black">
              <X className="w-5 h-5" />
            </button>

            {/* Navigasi dalam fullscreen */}
            {currentIndex > 0 && (
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-zinc-800 p-1 rounded-full shadow">
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {currentIndex < images.length - 1 && (
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-zinc-800 p-1 rounded-full shadow">
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            <div
              ref={fullscreenRef}
              className="flex overflow-x-hidden scroll-smooth w-full h-full">
              {images.map((src, i) => (
                <div
                  key={i}
                  className="min-w-full flex justify-center items-center p-6">
                  <img
                    src={src}
                    alt={`Halaman ${i + 1}`}
                    className="max-h-[80vh] object-contain rounded shadow"
                  />
                </div>
              ))}
            </div>

            {/* Footer dalam fullscreen */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-white bg-black/60 px-3 py-1 rounded-full">
              Halaman {currentIndex + 1} / {images.length}
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
