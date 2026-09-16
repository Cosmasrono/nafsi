import { Quote } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Story } from "@/lib/content";

export function StoryCard({ story }: { story: Story }) {
  return (
    <Link
      href={`/stories/${story.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-sand-200 bg-white transition-shadow hover:shadow-xl hover:shadow-cocoa-900/10"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={story.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-cream-50/95 px-3 py-1 text-[0.62rem] font-bold uppercase tracking-wider text-cocoa-900">
          {story.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-bold text-cocoa-900 transition-colors group-hover:text-mustard-600">{story.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">{story.excerpt}</p>
        {story.quote && (
          <blockquote className="mt-4 flex gap-2 text-sm italic text-cocoa-800">
            <Quote className="size-4 shrink-0 text-mustard-500" />
            <span>
              “{story.quote.text}” <span className="not-italic text-muted">— {story.quote.by}</span>
            </span>
          </blockquote>
        )}
      </div>
    </Link>
  );
}
