"use client";

import { useEffect, useRef } from "react";

// Counts up once when scrolled into view. Server-renders the final value so it reads correctly without JS.
export function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const duration = 1400;
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        node.textContent = `${Math.round(value * eased)}${suffix}`;
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });
    node.textContent = `0${suffix}`;
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      node.textContent = `${value}${suffix}`;
    };
  }, [value, suffix]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}
