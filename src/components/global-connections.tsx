"use client";

import { useState } from "react";
import { Container, SectionHeading } from "./ui";

const cities = [
  { name: "Nairobi", country: "Kenya", x: 602, y: 254 },
  { name: "Copenhagen", country: "Denmark", x: 535, y: 95 },
  { name: "Cochabamba", country: "Bolivia", x: 316, y: 298 },
  { name: "Hamburg", country: "Germany", x: 528, y: 101 },
  { name: "Rome", country: "Italy", x: 535, y: 134 },
];

export function GlobalConnections() {
  const [active, setActive] = useState<string | null>(null);
  const selected = cities.find((city) => city.name === active);

  return (
    <section className="bg-cocoa-900 text-cream-50">
      <Container className="py-24 [&_p.text-muted]:text-cream-50/70">
        <SectionHeading
          eyebrow="From Nairobi to the world"
          title="A global creative hub, headquartered in Nairobi"
          intro="Young people from Nairobi's informal settlements connect with Denmark, Bolivia and beyond — through digital dialogue, cultural exchange and shared stories."
        />
        <div className="mt-12 overflow-hidden rounded-3xl border border-cream-50/15 bg-cocoa-950">
          <svg viewBox="0 0 1000 500" className="w-full" role="img" aria-label="Connections from Nairobi to Copenhagen, Cochabamba, Hamburg and Rome">
            <defs>
              <pattern id="map-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M50 0H0V50" fill="none" stroke="currentColor" strokeOpacity="0.07" />
              </pattern>
            </defs>
            <rect width="1000" height="500" fill="url(#map-grid)" />
            {/* Simplified world silhouettes in an equirectangular projection. */}
            <g fill="#54392b" stroke="#6e5d51" strokeWidth="1.5" strokeLinejoin="round">
              <path d="M32 72 93 56 137 65 168 50 209 68 244 65 277 98 306 107 296 134 268 147 253 169 229 186 216 212 237 239 219 244 196 226 181 197 158 183 148 157 120 133 82 127 61 105 28 105Z" />
              <path d="M276 33 312 20 352 33 337 64 302 88 281 62Z" />
              <path d="M244 243 273 225 300 233 318 256 357 269 369 292 350 321 341 355 315 387 301 424 287 449 273 413 272 375 260 342 250 317 235 283Z" />
              <path d="M476 161 503 149 536 159 565 168 592 190 604 216 628 231 609 265 589 278 581 324 559 350 543 343 531 307 510 281 504 252 477 240 457 220 451 192Z" />
              <path d="M607 301 617 294 616 322 605 338 602 320Z" />
              <path d="M471 155 481 126 500 119 516 95 517 63 542 44 557 61 544 94 565 102 592 82 622 68 667 69 708 51 759 58 789 47 835 67 883 66 944 87 965 113 926 126 900 116 882 154 844 169 822 206 793 224 779 203 766 231 751 245 739 221 729 199 703 191 684 228 662 210 646 181 620 168 595 177 580 153 557 153 538 139 525 133 517 153 507 153 499 142 493 157Z" />
              <path d="M480 103 488 100 491 120 484 131 477 119Z" />
              <path d="M870 163 880 148 884 167 871 184 865 178Z" />
              <path d="M768 266 796 268 815 282 802 289 778 283Z" />
              <path d="M824 309 857 293 887 303 913 335 913 370 886 384 867 368 842 370 811 357 800 332Z" />
              <path d="M951 365 960 354 958 383 944 403 935 400Z" />
            </g>
            {cities.slice(1).map((city) => (
              <path key={city.name} d={`M602 254 Q${(602 + city.x) / 2} ${Math.min(254, city.y) - 70} ${city.x} ${city.y}`}
                fill="none" stroke="#e9aa18" strokeWidth={active === city.name ? 3 : 1.5}
                strokeOpacity={active === city.name ? 1 : 0.45} strokeDasharray="5 6" />
            ))}
            {cities.map((city) => (
              <g key={city.name} onMouseEnter={() => setActive(city.name)} onClick={() => setActive(city.name)} className="cursor-pointer">
                <title>{`${city.name}, ${city.country}`}</title>
                <circle cx={city.x} cy={city.y} r={active === city.name ? 14 : 10} fill="#e9aa18" fillOpacity="0.2" />
                <circle cx={city.x} cy={city.y} r="4" fill="#e9aa18" />
              </g>
            ))}
            <text x="620" y="261" fill="#fbf8f4" fontSize="16" fontWeight="600">Nairobi</text>
          </svg>
          <div className="flex flex-wrap gap-2 px-5 pb-6 sm:px-8" aria-label="Explore connected cities">
            {cities.map((city) => (
              <button key={city.name} type="button" aria-pressed={active === city.name}
                onMouseEnter={() => setActive(city.name)} onFocus={() => setActive(city.name)} onClick={() => setActive(city.name)}
                className={`rounded-full border px-4 py-3 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mustard-500 ${active === city.name ? "border-mustard-500 bg-mustard-500 text-cocoa-900" : "border-cream-50/20 hover:border-mustard-500"}`}>
                {city.name}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap justify-between gap-3 border-t border-cream-50/10 px-5 py-5 text-sm sm:px-8">
            <span className="font-semibold text-mustard-400">Nairobi → the world</span>
            <p aria-live="polite">{selected ? `${selected.name} · ${selected.country}` : "Hover a point"}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
