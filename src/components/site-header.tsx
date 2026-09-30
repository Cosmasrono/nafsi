"use client";

import { ChevronDown, Heart, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav } from "@/lib/content";
import { NafsiMark } from "./brand-icons";
import { buttonClass } from "./ui";

export function SiteHeader() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const mobileDialogRef = useRef<HTMLDialogElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const dialog = mobileDialogRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    const desktop = window.matchMedia("(min-width: 1280px)");
    const closeOnDesktop = () => { if (desktop.matches) setMobileOpen(false); };
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`));
  const closeAll = () => {
    setOpenMenu(null);
    setMobileOpen(false);
  };

  return (
    <header ref={headerRef} className="sticky top-0 z-50 border-b border-sand-200/70" onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpenMenu(null); }}>
      {/* blur sits on its own layer; backdrop-filter on <header> itself traps the fixed mobile menu inside the header */}
      <div className="absolute inset-0 -z-10 bg-cream-50/90 backdrop-blur-md" aria-hidden />
      <div
        ref={progressRef}
        className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-mustard-500 to-cocoa-700"
        aria-hidden
      />
      <div className="mx-auto flex h-[4.5rem] w-full max-w-[84rem] items-center justify-between gap-3 px-5 sm:gap-6 sm:px-8">
        <Link href="/" onClick={closeAll} className="flex min-w-0 items-center gap-3" aria-label="Nafsi Africa home">
          <NafsiMark className="size-10 shrink-0" />
          <span className="leading-none">
            <span className="block font-display text-lg font-bold tracking-tight text-cocoa-900">Nafsi Africa</span>
            <span className="mt-1 block text-[0.58rem] font-medium uppercase tracking-[0.2em] text-muted">
              Nafsi Pamoja · Kenya
            </span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) =>
              item.children ? (
                <li
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenMenu(item.label)}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <button
                    type="button"
                    aria-expanded={openMenu === item.label}
                    onClick={() => setOpenMenu(openMenu === item.label ? null : item.label)}
                    onKeyDown={(e) => e.key === "Escape" && setOpenMenu(null)}
                    className={`flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition-colors hover:text-mustard-600 ${
                      isActive(item.href) ? "bg-sand-100 text-cocoa-900" : "text-cocoa-800"
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      className={`size-3.5 opacity-60 transition-transform ${openMenu === item.label ? "rotate-180" : ""}`}
                    />
                  </button>
                  {openMenu === item.label && (
                    <div className="absolute left-1/2 top-full -translate-x-1/2 pt-2">
                      <ul
                        className="w-56 rounded-2xl border border-sand-200 bg-white p-1.5 shadow-xl shadow-cocoa-900/10"
                        onKeyDown={(e) => e.key === "Escape" && setOpenMenu(null)}
                      >
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              aria-current={pathname === child.href ? "page" : undefined}
                              onClick={closeAll}
                              className={`block rounded-xl px-3 py-2 text-sm transition-colors ${
                                pathname === child.href
                                  ? "bg-mustard-500 font-medium text-cocoa-900"
                                  : "text-cocoa-800 hover:bg-mustard-100"
                              }`}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ) : (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className={`rounded-full px-3 py-2 text-sm font-medium transition-colors hover:text-mustard-600 ${
                      isActive(item.href) ? "text-mustard-600" : "text-cocoa-800"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/donate" onClick={closeAll} className={`${buttonClass("primary", "md")} max-sm:hidden`}>
            <Heart className="size-4" />
            Donate
          </Link>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full border border-sand-200 text-cocoa-900 xl:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <dialog ref={mobileDialogRef} id="mobile-navigation" aria-label="Main navigation" onCancel={() => setMobileOpen(false)} className="mobile-navigation fixed inset-0 m-0 h-dvh max-h-dvh w-full max-w-none overflow-y-auto bg-cream-50 px-5 pb-10 text-cocoa-900 xl:hidden">
          <div className="sticky top-0 z-10 flex h-[4.5rem] items-center justify-between border-b border-sand-200 bg-cream-50">
            <Link href="/" onClick={closeAll} className="flex items-center gap-3 font-display text-lg font-bold"><NafsiMark className="size-9" />Nafsi Africa</Link>
            <button type="button" autoFocus aria-label="Close menu" onClick={closeAll} className="grid size-11 place-items-center rounded-full border border-sand-200"><X className="size-5" /></button>
          </div>
          <ul className="divide-y divide-sand-200">
            {nav.map((item) => (
              <li key={item.label}>
                {item.children ? (
                  <>
                    <button
                      type="button"
                      className="flex w-full items-center justify-between py-4 font-display text-xl font-bold text-cocoa-900"
                      aria-expanded={mobileSection === item.label}
                      onClick={() => setMobileSection(mobileSection === item.label ? null : item.label)}
                    >
                      {item.label}
                      <ChevronDown className={`size-5 transition-transform ${mobileSection === item.label ? "rotate-180" : ""}`} />
                    </button>
                    {mobileSection === item.label && (
                      <ul className="grid gap-1 pb-4">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              aria-current={pathname === child.href ? "page" : undefined}
                              onClick={closeAll}
                              className={`block rounded-xl px-3 py-2.5 ${
                                pathname === child.href ? "bg-mustard-500 text-cocoa-900" : "text-cocoa-800"
                              }`}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link href={item.href} aria-current={pathname === item.href ? "page" : undefined} onClick={closeAll} className="block py-4 font-display text-xl font-bold text-cocoa-900">
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <Link href="/donate" onClick={closeAll} className={`${buttonClass("primary", "lg")} mt-6 w-full`}>
            <Heart className="size-4" />
            Donate now
          </Link>
        </dialog>
      )}
    </header>
  );
}
