"use client";

import { useEffect, useRef, useState } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Loader2,
  Maximize2,
  X,
} from "lucide-react";
import { Dialog } from "@headlessui/react";

interface PostVideoPlayerProps {
  src: string;
  poster?: string;
}

export function PostVideoPlayer({ src, poster }: PostVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orientation, setOrientation] = useState<
    "portrait" | "landscape" | null
  >(null);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleMetadata = () => {
    const video = videoRef.current;
    if (!video) return;

    const isPortrait = video.videoHeight > video.videoWidth;
    setOrientation(isPortrait ? "portrait" : "landscape");
  };

  const handleWaiting = () => setIsLoading(true);
  const handlePlaying = () => setIsLoading(false);

  const openModal = () => {
    const video = videoRef.current;
    if (video && !video.paused) {
      video.pause();
      setIsPlaying(false);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        if (!video) return;

        if (entry.isIntersecting) {
          video.play().catch(() => {});
          setIsPlaying(true);
        } else {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.6 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden bg-black rounded-xl shadow-md"
        onClick={(e) => e.stopPropagation()}>
        <div className="relative w-full aspect-[16/9]">
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            muted={isMuted}
            loop
            playsInline
            onClick={togglePlay}
            onWaiting={handleWaiting}
            onPlaying={handlePlaying}
            onLoadedMetadata={handleMetadata}
            onContextMenu={(e) => e.preventDefault()}
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
            className={`absolute top-0 left-0 w-full h-full cursor-pointer bg-black ${
              orientation === "portrait" ? "object-contain" : "object-cover"
            }`}
          />
        </div>

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-6 h-6 text-white animate-spin" />
          </div>
        )}

        <div className="absolute bottom-2 right-2 flex items-center gap-2 bg-black/50 rounded-md px-2 py-1">
          <button
            onClick={togglePlay}
            className="text-white hover:scale-110 transition">
            {isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={toggleMute}
            className="text-white hover:scale-110 transition">
            {isMuted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
        </div>

        <button
          onClick={openModal}
          className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-md hover:scale-105 transition">
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Modal Fullscreen */}
      <Dialog open={isModalOpen} onClose={closeModal} className="relative z-50">
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="relative w-full max-w-5xl rounded-xl overflow-hidden bg-black shadow-lg">
            <video
              src={src}
              autoPlay
              loop
              muted={false}
              playsInline
              onContextMenu={(e) => e.preventDefault()}
              disablePictureInPicture
              controlsList="nodownload nofullscreen noremoteplayback"
              className="w-full h-auto max-h-[80vh] object-contain bg-black"
            />
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-white bg-black/60 p-2 rounded-full hover:bg-black">
              <X className="w-5 h-5" />
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
