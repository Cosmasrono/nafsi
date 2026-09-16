import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { InvolvementIcon } from "@/components/involvement-icon";
import { DonateBanner } from "@/components/sections";
import { Reveal } from "@/components/reveal";
import { Container, Eyebrow, PageHero } from "@/components/ui";
import { involvementTypes } from "@/lib/content";

export const metadata: Metadata = {
  title: "Get Involved",
  description: "Donate, volunteer, partner, sponsor a programme, book a performance or hire NaiWave Studios.",
};

const cards = [
  { href: "/donate", title: "Donate", text: "Your support creates opportunity — for a child, a creator, a community.", link: "Donate now", icon: "heart" as const },
  ...Object.entries(involvementTypes).map(([type, item]) => ({
    href: `/get-involved/${type}`,
    title: item.title,
    text: item.text,
    link: item.title,
    icon: item.icon,
  })),
];

export default function GetInvolvedPage() {
  return (
    <>
      <PageHero
        eyebrow="Get involved"
        title="Join the journey"
        intro="However you show up — a gift, your time, a partnership, a booking — you help turn creativity into opportunity for young people in Nairobi."
      />

      <section className="bg-cream-50">
        <Container className="py-24">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((card, i) => (
              <Reveal as="li" key={card.href} delay={i * 60}>
                <Link
                  href={card.href}
                  className="group flex h-full flex-col rounded-3xl border border-sand-200 bg-white p-7 transition-all hover:-translate-y-1 hover:border-mustard-500 hover:shadow-xl hover:shadow-cocoa-900/5"
                >
                  <span className="grid size-11 place-items-center rounded-xl bg-mustard-100 text-mustard-600">
                    <InvolvementIcon name={card.icon} />
                  </span>
                  <h2 className="mt-6 font-display text-xl font-bold text-cocoa-900">{card.title}</h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{card.text}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-mustard-600">
                    {card.link}
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-sand-100">
        <Container className="grid items-start gap-12 py-24 md:grid-cols-2">
          <Reveal>
            <Eyebrow>Volunteer · Partner · Sponsor · Book</Eyebrow>
            <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
              Tell us how you&apos;d like to be part of it
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Pick what fits and send us a note. The Nafsi team reads every message and will reply within two working days.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <ContactForm showInterests />
          </Reveal>
        </Container>
      </section>

      <DonateBanner />
    </>
  );
}
