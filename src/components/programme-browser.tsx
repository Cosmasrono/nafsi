"use client";

import { useId, useState, type ReactNode } from "react";

const filters = ["All programmes", "Perform & create", "Media & stories", "Community & planet"] as const;
type Filter = (typeof filters)[number];
const groups: Record<Exclude<Filter, "All programmes">, string[]> = {
  "Perform & create": ["performing-arts", "global-stay-tours"],
  "Media & stories": ["tangaza", "naiwave"],
  "Community & planet": ["outreach", "youth-empowerment", "mazingira"],
};

export function ProgrammeBrowser({ items }: { items: { slug: string; card: ReactNode }[] }) {
  const [filter, setFilter] = useState<Filter>("All programmes");
  const resultsId = useId();
  const visible = filter === "All programmes" ? items : items.filter((item) => groups[filter].includes(item.slug));

  return (
    <div className="mt-10">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Explore programmes by interest">
        {filters.map((option) => (
          <button key={option} type="button" aria-pressed={filter === option} aria-controls={resultsId}
            onClick={() => setFilter(option)}
            className={`min-h-11 rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors ${filter === option ? "border-cocoa-900 bg-cocoa-900 text-cream-50" : "border-sand-200 bg-white text-cocoa-900 hover:border-mustard-500 hover:bg-mustard-100"}`}>
            {option}
          </button>
        ))}
      </div>
      <p className="my-5 text-sm text-muted" role="status">Showing {visible.length} programmes · Find your creative path</p>
      <ul id={resultsId} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((item) => <li key={item.slug}>{item.card}</li>)}
      </ul>
    </div>
  );
}
