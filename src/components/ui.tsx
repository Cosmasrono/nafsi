import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal } from "./reveal";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`w-full px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, tone = "mustard" }: { children: ReactNode; tone?: "mustard" | "light" }) {
  return (
    <p
      className={`flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.22em] ${
        tone === "light" ? "text-cocoa-900/70" : "text-mustard-500"
      }`}
    >
      <span className="h-px w-6 bg-current" aria-hidden />
      {children}
    </p>
  );
}

type ButtonVariant = "primary" | "outline" | "outline-light" | "light" | "dark";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-mustard-500 text-cocoa-900 hover:bg-mustard-400",
  outline: "border border-cocoa-900/20 text-cocoa-900 hover:border-cocoa-900 hover:bg-cocoa-900 hover:text-cream-50",
  "outline-light": "border border-cream-50/25 text-cream-50 hover:border-cream-50 hover:bg-cream-50 hover:text-cocoa-900",
  light: "bg-cream-50 text-mustard-600 hover:bg-white",
  dark: "bg-cocoa-900 text-cream-50 hover:bg-cocoa-800",
};

export function buttonClass(variant: ButtonVariant = "primary", size: "md" | "lg" = "md") {
  return `inline-flex items-center justify-center gap-2 rounded-full font-display font-bold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mustard-500 disabled:cursor-not-allowed disabled:opacity-60 ${
    size === "lg" ? "px-7 py-3.5 text-[0.95rem]" : "px-5 py-2.5 text-sm"
  } ${variants[variant]}`;
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "lg",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: "md" | "lg";
  className?: string;
}) {
  const external = href.startsWith("http");
  return (
    <Link
      href={href}
      className={`${buttonClass(variant, size)} ${className}`}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {children}
    </Link>
  );
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="group inline-flex items-center gap-1 py-1.5 text-sm font-semibold text-mustard-600 hover:text-cocoa-900">
      {children}
      <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </Link>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-cocoa-900 text-cream-50">
      <div
        className="pointer-events-none absolute -right-40 -top-40 size-[34rem] rounded-full bg-mustard-500/10 blur-3xl"
        aria-hidden
      />
      <Container className="relative py-20 sm:py-24">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          {/* Syne is very wide at 800, so the size follows the viewport until the longest word (~12em) fits */}
          <h1 className="mt-5 max-w-4xl font-display text-[min(2.6rem,calc((100vw-2.5rem)/9.2))] font-bold leading-[0.95] tracking-tight break-words sm:text-[min(4.25rem,calc((100vw-4rem)/13))] sm:font-extrabold">
            {title}
          </h1>
          {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream-50/70">{intro}</p>}
          {children}
        </Reveal>
      </Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  action,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-4 font-display text-[2rem] font-bold leading-[1.02] tracking-tight break-words min-[380px]:text-4xl sm:text-5xl">{title}</h2>
        {intro && <p className="mt-5 text-lg leading-relaxed text-muted">{intro}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </Reveal>
  );
}

export function TagList({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li
          key={tag}
          className="inline-flex items-center gap-1.5 rounded-full border border-sand-200 bg-white/60 px-3 py-1 text-xs font-medium text-cocoa-800"
        >
          <Check className="size-3 text-cocoa-700" />
          {tag}
        </li>
      ))}
    </ul>
  );
}
