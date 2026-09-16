import { Heart, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { nav, site } from "@/lib/content";
import { NafsiMark } from "./brand-icons";
import { NewsletterForm } from "./newsletter-form";
import { SocialIcons } from "./sections";
import { Container, Eyebrow, buttonClass } from "./ui";

const programmeLinks = nav.find((item) => item.label === "Programmes")?.children ?? [];
const involveLinks = nav.find((item) => item.label === "Get Involved")?.children ?? [];

const legalLinks = [
  { label: "Impact & Transparency", href: "/about/impact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Safeguarding", href: "/safeguarding" },
  { label: "Terms", href: "/terms" },
];

export function SiteFooter() {
  return (
    <footer className="bg-cocoa-900 text-cream-50">
      <Container className="grid gap-10 border-b border-cream-50/10 py-16 md:grid-cols-2 md:items-center">
        <div>
          <Eyebrow>Stay connected</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl">
            Get stories, opportunities and updates from Nafsi Africa.
          </h2>
        </div>
        <NewsletterForm />
      </Container>

      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <NafsiMark className="size-10" />
            <span className="font-display text-lg font-bold uppercase tracking-tight">Nafsi Africa</span>
          </Link>
          <p className="mt-5 text-sm leading-relaxed text-cream-50/65">
            {site.legalName} — empowering Kenyan youth through arts, digital media, mentorship and cultural exchange. From
            creativity to opportunity.
          </p>
          <SocialIcons className="mt-6" tone="dark" />
        </div>

        <FooterColumn title="Programmes" links={programmeLinks} />
        <FooterColumn title="Get involved" links={involveLinks} />

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em]">Contact</h3>
          <ul className="mt-5 space-y-3 text-sm text-cream-50/70">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-mustard-500" />
              {site.address}
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex gap-3 hover:text-mustard-400">
                <Mail className="mt-0.5 size-4 shrink-0 text-mustard-500" />
                {site.email}
              </a>
            </li>
            <li>
              <a href={site.phoneHref} className="flex gap-3 hover:text-mustard-400">
                <Phone className="mt-0.5 size-4 shrink-0 text-mustard-500" />
                {site.phone}
              </a>
            </li>
          </ul>
          <Link href="/donate" className={`${buttonClass("primary", "md")} mt-6`}>
            <Heart className="size-4" />
            Donate now
          </Link>
        </div>
      </Container>

      <Container className="flex flex-col gap-4 border-t border-cream-50/10 py-6 text-xs text-cream-50/50 md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {site.legalName}. All rights reserved.
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {legalLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="hover:text-cream-50">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em]">{title}</h3>
      <ul className="mt-5 space-y-3 text-sm text-cream-50/70">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="hover:text-mustard-400">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
