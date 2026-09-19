"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { videos } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { VideoModal } from "@/components/video-modal";

export function VideoGridClient() {
  const [activeVideo, setActiveVideo] = useState<(typeof videos)[number] | null>(null);
  const closeModal = useCallback(() => setActiveVideo(null), []);

  const [featured, ...rest] = videos;

  return (
    <>
      <div className="mt-12 grid items-start gap-6 xl:grid-cols-2">
        {/* Featured video */}
        <Reveal>
          <button
            onClick={() => setActiveVideo(featured)}
            className="group relative block w-full overflow-hidden rounded-3xl bg-cocoa-950 text-left"
            aria-label={`Play ${featured.title}`}
          >
            <div className="relative aspect-video">
              <Image
                src={featured.image}
                alt=""
                fill
                sizes="(min-width: 1280px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              {/* Play overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-cocoa-950/10 transition-colors duration-300 group-hover:bg-cocoa-950/30">
                <span className="flex size-20 items-center justify-center rounded-full bg-mustard-500 text-cocoa-900 shadow-xl shadow-cocoa-950/40 transition-transform duration-300 group-hover:scale-110">
                  <Play className="size-9 translate-x-0.5 fill-current" />
                </span>
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-mustard-400">
                NaiWave Podcasts · {featured.duration}
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold text-cream-50 sm:text-3xl">
                {featured.title}
              </h3>
            </div>
          </button>
        </Reveal>

        {/* Smaller grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {rest.map((video, i) => (
            <Reveal key={video.title} delay={i * 80}>
              <button
                onClick={() => setActiveVideo(video)}
                className="group block h-full w-full overflow-hidden rounded-2xl border border-sand-200 bg-white text-left transition-shadow hover:shadow-lg hover:shadow-cocoa-900/10"
                aria-label={`Play ${video.title}`}
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={video.image}
                    alt=""
                    fill
                    sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Play overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-cocoa-950/10 transition-colors duration-300 group-hover:bg-cocoa-950/30">
                    <span className="flex size-10 items-center justify-center rounded-full bg-mustard-500 text-cocoa-900 shadow-lg transition-transform duration-300 group-hover:scale-110">
                      <Play className="size-4 translate-x-0.5 fill-current" />
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm font-semibold leading-snug text-cocoa-900">
                    {video.title}
                  </p>
                  <p className="mt-2 text-xs text-muted">{video.duration}</p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Modal */}
      {activeVideo && (
        <VideoModal
          youtubeId={activeVideo.youtubeId}
          title={activeVideo.title}
          onClose={closeModal}
        />
      )}
    </>
  );
}
