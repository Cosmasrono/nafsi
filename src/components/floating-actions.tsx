"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { site } from "@/lib/content";
import { WhatsAppIcon } from "./brand-icons";

export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-center gap-3">
      <button
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0 })}
        className={`grid size-11 place-items-center rounded-full bg-cocoa-900 text-cream-50 shadow-lg transition-all hover:bg-cocoa-800 ${
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <ArrowUp className="size-4" />
      </button>
      <a
        href={site.whatsappHref}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Nafsi Africa on WhatsApp"
        className="grid size-14 place-items-center rounded-full bg-[#25d366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-105"
      >
        <WhatsAppIcon className="size-7" />
      </a>
    </div>
  );
}
