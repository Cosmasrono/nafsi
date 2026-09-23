"use client";

import Image from "next/image";
import { ArrowUpRight, Play } from "lucide-react";
import { videos } from "@/lib/content";
import { Reveal } from "@/components/reveal";

export function VideoGridClient() {
  const [featured, ...rest] = videos;

  return (
    <div className="mt-12 grid items-start gap-6 xl:grid-cols-2">
      {/* Featured video */}
      <Reveal>
        <a
          href={`https://www.youtube.com/watch?v=${featured.youtubeId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block w-full overflow-hidden rounded-3xl bg-cocoa-950 text-left transition-all hover:ring-2 hover:ring-mustard-500/60 hover:shadow-2xl hover:shadow-cocoa-950/50"
          aria-label={`Watch ${featured.title} on YouTube`}
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
            <div className="absolute inset-0 flex items-center justify-center bg-cocoa-950/15 transition-colors duration-300 group-hover:bg-cocoa-950/35">
              <span className="flex size-20 items-center justify-center rounded-full bg-mustard-500 text-cocoa-900 shadow-xl shadow-cocoa-950/40 transition-transform duration-300 group-hover:scale-110">
                <Play className="size-9 translate-x-0.5 fill-current" />
              </span>
            </div>
          </div>
          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-mustard-400">
                NaiWave Podcasts · {featured.duration}
              </p>
              <span className="inline-flex items-center gap-1 rounded-full bg-cream-50/10 px-3 py-1 text-xs font-bold text-cream-50 transition-colors group-hover:bg-mustard-500 group-hover:text-cocoa-950">
                Watch on YouTube
                <ArrowUpRight className="size-3.5" />
              </span>
            </div>
            <h3 className="mt-2 font-display text-2xl font-bold text-cream-50 sm:text-3xl">
              {featured.title}
            </h3>
          </div>
        </a>
      </Reveal>

      {/* Smaller grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {rest.map((video, i) => (
          <Reveal key={video.title} delay={i * 80}>
            <a
              href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-sand-200 bg-white text-left transition-all hover:-translate-y-0.5 hover:border-mustard-500/50 hover:shadow-lg hover:shadow-cocoa-900/10"
              aria-label={`Watch ${video.title} on YouTube`}
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
              <div className="flex flex-1 flex-col justify-between p-4">
                <p className="text-sm font-semibold leading-snug text-cocoa-900 transition-colors group-hover:text-cocoa-950">
                  {video.title}
                </p>
                <div className="mt-3 flex items-center justify-between text-xs text-muted">
                  <span>{video.duration}</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-mustard-600 transition-colors group-hover:text-mustard-700">
                    Watch on YouTube
                    <ArrowUpRight className="size-3" />
                  </span>
                </div>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
