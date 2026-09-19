"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface VideoModalProps {
  youtubeId: string;
  title: string;
  onClose: () => void;
}

export function VideoModal({ youtubeId, title, onClose }: VideoModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10"
      role="dialog"
      aria-modal="true"
      aria-label={`Playing: ${title}`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-cocoa-950/90 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      {/* Modal panel */}
      <div className="relative z-10 w-full max-w-5xl animate-modal-in">
        {/* Close button */}
        <button
          ref={closeRef}
          onClick={onClose}
          className="absolute -right-2 -top-12 flex items-center gap-2 rounded-full bg-cream-50/10 px-4 py-2 text-sm font-semibold text-cream-50 transition-colors hover:bg-cream-50/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-mustard-500"
        >
          <X className="size-4" />
          Close
        </button>

        {/* Video title */}
        <p className="mb-3 truncate text-sm font-semibold text-cream-50/70">{title}</p>

        {/* YouTube embed */}
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-cocoa-950 shadow-2xl shadow-black/60">
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
            title={title}
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>
        <p className="mt-4 text-sm text-cream-50/80">
          Having trouble playing?{" "}
          <a href={`https://www.youtube.com/watch?v=${youtubeId}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-mustard-400 underline underline-offset-4">
            Watch on YouTube
          </a>
        </p>
      </div>
    </div>
  );
}
