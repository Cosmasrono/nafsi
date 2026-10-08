import type { Metadata } from "next";
import localFont from "next/font/local";
import { FloatingActions } from "@/components/floating-actions";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/content";
import "./globals.css";

const syne = localFont({
  src: "./fonts/syne-latin.woff2",
  weight: "400 800",
  display: "swap",
  variable: "--font-syne",
});

const jakarta = localFont({
  src: "./fonts/plus-jakarta-sans-latin.woff2",
  weight: "200 800",
  display: "swap",
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    images: ["/images/dance.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${syne.variable} ${jakarta.variable} antialiased`}>
      <body className="site-shell flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only z-[60] rounded-full bg-mustard-500 px-4 py-2 font-semibold text-cocoa-900 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <FloatingActions />
      </body>
    </html>
  );
}
