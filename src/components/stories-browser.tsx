"use client";

import { useState } from "react";
import { stories, storyCategories, type StoryCategory } from "@/lib/content";
import { StoryCard } from "./story-card";

export function StoriesBrowser() {
  const [category, setCategory] = useState<StoryCategory | "All">("All");
  const visible = category === "All" ? stories : stories.filter((story) => story.category === category);

  return (
    <>
      <div className="sticky top-[4.5rem] z-30 border-b border-sand-200 bg-cream-50/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl gap-2 overflow-x-auto px-5 py-4 sm:px-8" role="group" aria-label="Filter stories">
          {(["All", ...storyCategories] as const).map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={category === option}
              onClick={() => setCategory(option)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                category === option ? "bg-mustard-500 text-cocoa-900" : "bg-sand-100 text-cocoa-800 hover:bg-sand-200"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8">
        <p className="sr-only" aria-live="polite">
          Showing {visible.length} stories
        </p>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((story) => (
            <li key={story.slug}>
              <StoryCard story={story} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
