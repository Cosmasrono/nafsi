"use client";

import { ArrowUpRight, Globe, Sparkles } from "lucide-react";
import { useState } from "react";
import { Container, SectionHeading } from "./ui";
import { worldMapSvgPath } from "./world-map-path";

type CityConnection = {
  name: string;
  country: string;
  role: string;
  detail: string;
  distance: string;
  x: number;
  y: number;
  labelDx?: number;
  labelDy?: number;
  textAnchor?: "start" | "middle" | "end";
};

const cities: CityConnection[] = [
  {
    name: "Nairobi",
    country: "Kenya",
    role: "Global Headquarters & Creative Hub",
    detail:
      "Home of Nafsi Pamoja since 2010. Six community training centres, NaiWave Studios, and Tangaza youth media cohorts.",
    distance: "Origin",
    x: 602,
    y: 254,
  },
  {
    name: "Copenhagen",
    country: "Denmark",
    role: "Media Partner · Spor Media & CISU",
    detail:
      "Over 10 years of media partnership. Youth film exchanges, online study tours, and smartphone reporting workshops.",
    distance: "6,920 km from Nairobi",
    x: 535,
    y: 95,
    labelDx: 8,
    labelDy: -2,
  },
  {
    name: "Hamburg",
    country: "Germany",
    role: "Cultural Tour Partner · Kinder Kultur Karawane",
    detail:
      "Hosting Nafsi youth performance tours, circus arts exchanges, and intercultural youth workshops across Germany.",
    distance: "6,740 km from Nairobi",
    x: 528,
    y: 101,
    labelDx: -8,
    labelDy: 3,
    textAnchor: "end",
  },
  {
    name: "Rome",
    country: "Italy",
    role: "Cultural Exchange & Partner Dialogues",
    detail:
      "Collaborative cultural events, youth advocacy forums and long-standing partnership with international supporters.",
    distance: "5,380 km from Nairobi",
    x: 535,
    y: 134,
    labelDx: -8,
    labelDy: 4,
    textAnchor: "end",
  },
  {
    name: "Sofia",
    country: "Bulgaria",
    role: "Cultural Exchange & Youth Circus Arts",
    detail:
      "Intercultural arts dialogues, youth circus collaborations, and creative performance exchange connecting Bulgarian and Kenyan youth.",
    distance: "4,950 km from Nairobi",
    x: 565,
    y: 131,
    labelDx: 8,
    labelDy: 3,
  },
  {
    name: "Oslo",
    country: "Norway",
    role: "Nordic Youth Dialogues & Cultural Exchange",
    detail:
      "Nordic-African creative collaborations, educational storytelling initiatives and environmental youth advocacy.",
    distance: "7,420 km from Nairobi",
    x: 530,
    y: 84,
    labelDx: 8,
    labelDy: -4,
  },
  {
    name: "La Paz",
    country: "Bolivia",
    role: "Tri-Continental Youth Exchange",
    detail:
      "Connecting young acrobats, dancers and media creators across Kenya, Denmark and Bolivia through Global Stay Tours and South-South creative dialogue.",
    distance: "11,550 km from Nairobi",
    x: 308,
    y: 292,
    labelDx: -8,
    labelDy: -2,
    textAnchor: "end",
  },
  {
    name: "Kampala",
    country: "Uganda",
    role: "East Africa Cultural Exchange & Youth Arts",
    detail:
      "Cross-border performing arts collaborations, youth acrobatic workshops, and regional grassroots creative networks across East Africa.",
    distance: "505 km from Nairobi",
    x: 588,
    y: 248,
    labelDx: -8,
    labelDy: -5,
    textAnchor: "end",
  },
  {
    name: "Dar es Salaam",
    country: "Tanzania",
    role: "Regional Arts Dialogue & Community Performance",
    detail:
      "East African youth arts solidarity, coastal music and percussion exchanges, and cross-border creative community mentorship.",
    distance: "670 km from Nairobi",
    x: 610,
    y: 272,
    labelDx: 8,
    labelDy: 5,
    textAnchor: "start",
  },
  {
    name: "Accra",
    country: "Ghana",
    role: "Pan-African Youth Media & Cultural Exchange",
    detail:
      "Connecting East and West African youth creators through smartphone filmmaking, digital storytelling, and shared cultural narratives.",
    distance: "4,210 km from Nairobi",
    x: 498,
    y: 236,
    labelDx: -8,
    labelDy: 3,
    textAnchor: "end",
  },
  {
    name: "Vienna",
    country: "Austria",
    role: "Intercultural Arts & Educational Exchange",
    detail:
      "Community music and performing arts workshops, European cultural dialogue, and creative workshops supporting youth development.",
    distance: "5,890 km from Nairobi",
    x: 545,
    y: 116,
    labelDx: 8,
    labelDy: -2,
  },
];

export function GlobalConnections() {
  const [active, setActive] = useState<string>("Copenhagen");
  const selected = cities.find((city) => city.name === active) || cities[0];

  return (
    <section className="bg-cocoa-900 text-cream-50">
      <Container className="py-24 [&_p.text-muted]:text-cream-50/70">
        <SectionHeading
          eyebrow="From Nairobi to the world"
          title="A global creative hub, headquartered in Nairobi"
          intro="Young people from Nairobi's informal settlements connect across Africa, Europe, Latin America and beyond — including Uganda, Tanzania, Ghana, Denmark, Bolivia, Germany, Italy, Bulgaria, Norway and Austria."
        />

        <div className="mt-12 overflow-hidden rounded-3xl border border-cream-50/15 bg-cocoa-950 shadow-2xl shadow-cocoa-950/40">
          {/* MAP CANVAS */}
          <div className="relative aspect-[2/1] w-full select-none overflow-hidden bg-[#180f0a]">
            <svg
              viewBox="0 0 1000 500"
              className="h-full w-full"
              role="img"
              aria-label="Interactive world map showing Nafsi Africa global connections from Nairobi"
            >
              <defs>
                {/* Subtle grid pattern */}
                <pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M40 0H0V40" fill="none" stroke="currentColor" strokeOpacity="0.04" />
                </pattern>
                {/* Glow filter for active connection arcs and nodes */}
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Background grid */}
              <rect width="1000" height="500" fill="url(#map-grid)" />

              {/* Major Latitude / Longitude Guide Lines */}
              <line x1="0" y1="250" x2="1000" y2="250" stroke="#e9aa18" strokeOpacity="0.12" strokeDasharray="3 5" />
              <line x1="0" y1="185" x2="1000" y2="185" stroke="currentColor" strokeOpacity="0.05" strokeDasharray="2 4" />
              <line x1="0" y1="315" x2="1000" y2="315" stroke="currentColor" strokeOpacity="0.05" strokeDasharray="2 4" />
              <line x1="500" y1="0" x2="500" y2="500" stroke="currentColor" strokeOpacity="0.05" strokeDasharray="2 4" />

              {/* REAL ACCURATE VECTOR WORLD MAP */}
              <path
                d={worldMapSvgPath}
                fill="#342319"
                stroke="#543c2c"
                strokeWidth="0.75"
                strokeLinejoin="round"
                className="transition-colors duration-300"
              />

              {/* CONNECTION ARCS FROM NAIROBI TO GLOBAL PARTNERS */}
              {cities
                .filter((c) => c.name !== "Nairobi")
                .map((city) => {
                  const isCurActive = active === city.name;
                  // Quadratic curve with apex control point
                  const midX = (602 + city.x) / 2;
                  const dist = Math.hypot(602 - city.x, 254 - city.y);
                  const arcHeight = city.x < 450 ? 90 : Math.min(50, Math.max(12, dist * 0.4));
                  const midY = Math.min(254, city.y) - arcHeight;

                  return (
                    <g key={`arc-${city.name}`}>
                      {/* Outer glow stroke when active */}
                      {isCurActive && (
                        <path
                          d={`M602 254 Q${midX} ${midY} ${city.x} ${city.y}`}
                          fill="none"
                          stroke="#e9aa18"
                          strokeWidth="5"
                          strokeOpacity="0.3"
                          filter="url(#glow)"
                        />
                      )}
                      {/* Main connection curve */}
                      <path
                        d={`M602 254 Q${midX} ${midY} ${city.x} ${city.y}`}
                        fill="none"
                        stroke={isCurActive ? "#e9aa18" : "#8c6c52"}
                        strokeWidth={isCurActive ? 2.5 : 1.2}
                        strokeOpacity={isCurActive ? 0.95 : 0.4}
                        strokeDasharray={isCurActive ? "none" : "4 5"}
                        className="transition-all duration-300"
                      />
                    </g>
                  );
                })}

              {/* NAIROBI HEADQUARTERS PULSING BEACON */}
              <g className="cursor-pointer" onClick={() => setActive("Nairobi")}>
                <circle cx="602" cy="254" r="16" fill="#e9aa18" fillOpacity="0.2" className="animate-ping origin-center" />
                <circle cx="602" cy="254" r="12" fill="#e9aa18" fillOpacity="0.35" />
                <circle cx="602" cy="254" r="5" fill="#fcf7ee" stroke="#e9aa18" strokeWidth="2.5" />
                <text
                  x="618"
                  y="259"
                  fill="#ffffff"
                  fontSize="13"
                  fontWeight="800"
                  letterSpacing="0.04em"
                  className="drop-shadow-md select-none font-sans"
                >
                  Nairobi (HQ)
                </text>
              </g>

              {/* GLOBAL PARTNER CITY MARKERS */}
              {cities
                .filter((c) => c.name !== "Nairobi")
                .map((city) => {
                  const isCurActive = active === city.name;
                  return (
                    <g
                      key={`marker-${city.name}`}
                      onClick={() => setActive(city.name)}
                      onMouseEnter={() => setActive(city.name)}
                      className="cursor-pointer group"
                    >
                      <title>{`${city.name}, ${city.country} — ${city.role}`}</title>
                      {/* Hover ring */}
                      <circle
                        cx={city.x}
                        cy={city.y}
                        r={isCurActive ? 14 : 9}
                        fill="#e9aa18"
                        fillOpacity={isCurActive ? 0.35 : 0.15}
                        className="transition-all duration-200"
                      />
                      {/* Solid marker center */}
                      <circle
                        cx={city.x}
                        cy={city.y}
                        r={isCurActive ? 4.5 : 3.5}
                        fill={isCurActive ? "#e9aa18" : "#d99714"}
                        className="transition-all duration-200"
                      />
                      {/* City label on map */}
                      <text
                        x={city.x + (city.labelDx ?? 8)}
                        y={city.y + (city.labelDy ?? -6)}
                        textAnchor={city.textAnchor ?? "start"}
                        fill={isCurActive ? "#ffffff" : "#cbb29b"}
                        fontSize="11"
                        fontWeight={isCurActive ? "700" : "500"}
                        className="transition-colors duration-200 select-none font-sans"
                      >
                        {city.name}
                      </text>
                    </g>
                  );
                })}
            </svg>
          </div>

          {/* INTERACTIVE CITY NAVIGATION PILLS */}
          <div className="flex flex-wrap gap-2 border-t border-cream-50/10 bg-[#1f140e] px-5 py-4 sm:px-8">
            <span className="mr-2 inline-flex items-center text-xs font-bold uppercase tracking-wider text-muted/80">
              Select Hub:
            </span>
            {cities.map((city) => {
              const isSelected = active === city.name;
              return (
                <button
                  key={city.name}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setActive(city.name)}
                  onMouseEnter={() => setActive(city.name)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all ${
                    isSelected
                      ? "bg-mustard-500 text-cocoa-950 shadow-md ring-2 ring-mustard-400/40"
                      : "border border-cream-50/15 bg-cocoa-900/60 text-cream-50/80 hover:border-mustard-500 hover:text-cream-50"
                  }`}
                >
                  <span>{city.name}</span>
                  <span className="text-[0.68rem] opacity-70">({city.country})</span>
                </button>
              );
            })}
          </div>

          {/* ACTIVE HUB DETAIL CARD */}
          <div className="border-t border-cream-50/10 bg-[#160d08] p-5 sm:p-7">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex size-2 rounded-full bg-mustard-500 animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-widest text-mustard-400">
                    {selected.name === "Nairobi" ? "Headquarters" : "International Connection"}
                  </span>
                  <span className="text-xs text-cream-50/40">•</span>
                  <span className="text-xs font-semibold text-cream-50/70">{selected.distance}</span>
                </div>
                <h3 className="mt-1 font-display text-xl sm:text-2xl font-bold text-cream-50">
                  {selected.name}, {selected.country}
                </h3>
                <p className="mt-0.5 text-xs font-semibold text-mustard-500">{selected.role}</p>
              </div>

              <span className="inline-flex items-center gap-1 self-start sm:self-auto rounded-full bg-cream-50/10 px-3.5 py-1.5 text-xs font-semibold text-cream-50/90">
                <Globe className="size-3.5 text-mustard-400" />
                Global Stay Tours & Exchanges
              </span>
            </div>

            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-cream-50/80">
              {selected.detail}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
