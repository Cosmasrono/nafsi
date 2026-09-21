import { FileText, ShieldCheck, Landmark } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { DonateBanner, ImpactStats } from "@/components/sections";
import { Reveal } from "@/components/reveal";
import { Container, Eyebrow, PageHero, SectionHeading } from "@/components/ui";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Impact & Transparency",
  description: "What Nafsi Africa has achieved, where support goes and how the organization stays accountable.",
};

const uses = [
  "Trainers who lead weekly sessions at six community centres",
  "Safe, consistent spaces for children and youth to practise",
  "Smartphones, cameras and studio equipment for Tangaza and NaiWave",
  "Cohort training, mentorship and portfolio projects",
  "Cultural exchange sessions through Global Stay Tours",
];

const documents = [
  { Icon: FileText, title: "Annual & project reports", text: "Programme outcomes, tours and partnerships, published once verified.", href: "/contact" },
  { Icon: ShieldCheck, title: "Safeguarding policy", text: "How we keep every child and young person safe in our programmes.", href: "/safeguarding" },
  { Icon: Landmark, title: "Registration & governance", text: `${site.legalName} is a registered Community Based Organization overseen by a volunteer board.`, href: "/about" },
];

export default function ImpactPage() {
  return (
    <>
      <PageHero
        eyebrow="Impact & transparency"
        title="Where your support goes"
        intro="We believe trust is built with evidence. Here's what Nafsi has achieved and how we keep our work accountable."
      />
      <section className="bg-cream-50">
        <Container className="py-24">
          <SectionHeading eyebrow="Impact dashboard" title="The numbers that matter" intro="Verified figures from Nafsi's records. We keep them conservative on purpose." />
          <div className="mt-12">
            <ImpactStats tone="light" />
          </div>
          <p className="mt-6 text-xs leading-relaxed text-muted">
            All figures are sourced from Nafsi&apos;s official records and partner pages. Where a figure is uncertain, it is phrased
            conservatively or flagged for Nafsi verification.
          </p>
        </Container>
      </section>
      <section className="bg-sand-100">
        <Container className="grid gap-12 py-24 md:grid-cols-2">
          <Reveal>
            <Eyebrow>Where your support goes</Eyebrow>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">Invested in young people</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Nafsi is lean and programme-led. Support flows to trainers, centres, equipment and the young people themselves.
            </p>
            <ul className="mt-8 space-y-3">
              {uses.map((use) => (
                <li key={use} className="flex gap-3 text-cocoa-800">
                  <span className="mt-2 size-2 shrink-0 rounded-full bg-mustard-500" />
                  {use}
                </li>
              ))}
            </ul>
          </Reveal>
          <ul className="grid content-start gap-4">
            {documents.map(({ Icon, title, text, href }, i) => (
              <Reveal as="li" key={title} delay={i * 80}>
                <Link href={href} className="flex gap-4 rounded-2xl border border-sand-200 bg-white p-6 transition-colors hover:border-mustard-500">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-mustard-100 text-mustard-600">
                    <Icon className="size-5" />
                  </span>
                  <span>
                    <span className="block font-display font-bold text-cocoa-900">{title}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted">{text}</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>
      <DonateBanner />
    </>
  );
}
