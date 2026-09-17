"use client";

import { Check, Link2, Share2 } from "lucide-react";
import { useState } from "react";
import { site } from "@/lib/content";
import { FacebookIcon, LinkedInIcon, WhatsAppIcon, XIcon } from "./brand-icons";

export function ShareButtons({ path, title }: { path: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const url = `${site.url}${path}`;
  const text = encodeURIComponent(`${title} | ${site.name}`);
  const encodedUrl = encodeURIComponent(url);

  const targets = [
    { label: "Share on WhatsApp", href: `https://wa.me/?text=${text}%20${encodedUrl}`, icon: <WhatsAppIcon className="size-4" /> },
    { label: "Share on Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, icon: <FacebookIcon /> },
    { label: "Share on X", href: `https://x.com/intent/post?text=${text}&url=${encodedUrl}`, icon: <XIcon /> },
    { label: "Share on LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, icon: <LinkedInIcon /> },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link", url);
    }
  };

  const circle = "grid size-10 place-items-center rounded-full bg-cream-50 text-cocoa-900 transition-colors hover:bg-mustard-500";

  return (
    <div className="mt-8 flex flex-wrap items-center gap-2">
      <span className="mr-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-cream-50/60">
        <Share2 className="size-3.5" />
        Share
      </span>
      {targets.map((target) => (
        <a key={target.label} href={target.href} target="_blank" rel="noreferrer" aria-label={target.label} className={circle}>
          {target.icon}
        </a>
      ))}
      <button type="button" onClick={copy} aria-label="Copy link" className={circle}>
        {copied ? <Check className="size-4" /> : <Link2 className="size-4" />}
      </button>
    </div>
  );
}
