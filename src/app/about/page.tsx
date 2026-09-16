import type { Metadata } from "next";
import Image from "next/image";
import { DonateBanner, ImpactStats } from "@/components/sections";
import { Reveal } from "@/components/reveal";
import { Container, Eyebrow, PageHero, SectionHeading, TextLink } from "@/components/ui";
import { board, centres, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Who We Are",
  description: `${site.legalName} is a community based organization founded in 2010 in Nairobi, Kenya.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Nafsi"
        title="A Nairobi community organization with a creative soul"
        intro={`${site.legalName} is a Community Based Organization founded in ${site.founded} in Nairobi, Kenya. “Nafsi” is Swahili for “soul” — the heart of our mission.`}
      />

      <section className="bg-cream-50">
        <Container className="grid items-center gap-14 py-24 md:grid-cols-2">
          <Reveal>
            <Eyebrow>Who we are</Eyebrow>
            <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
              Bringing together modern artists from Nairobi&apos;s informal settlements
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              Nafsi creates safe spaces where children and youth can express themselves, gain confidence and grow. Every week we run
              training sessions across {centres.slice(0, -1).join(", ")} and {centres.at(-1)} centres.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Beyond art, we integrate media and information technology as pillars of empowerment — and connect young people globally
              through cultural exchange. By combining art, media and exchange, Nafsi nurtures creative, resilient and socially conscious
              young leaders.
            </p>
            <div className="mt-6 flex flex-wrap gap-6">
              <TextLink href="/about/story">Our story</TextLink>
              <TextLink href="/about/approach">Our approach</TextLink>
            </div>
          </Reveal>
          <Reveal delay={120} className="relative aspect-[456/515] overflow-hidden rounded-3xl shadow-2xl shadow-cocoa-900/15">
            <Image src="/images/dance.jpg" alt="Children dancing with a Nafsi trainer" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </Reveal>
        </Container>
      </section>

      <section className="bg-sand-100">
        <Container className="py-24">
          <SectionHeading eyebrow="Where we work" title="Five centres, one family" intro="Consistent weekly training, close to home." />
          <ul className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-5">
            {centres.map((centre, i) => (
              <Reveal as="li" key={centre} delay={i * 70}>
                <div className="rounded-2xl border border-sand-200 bg-white p-6">
                  <p className="font-display text-3xl font-extrabold text-mustard-500">0{i + 1}</p>
                  <p className="mt-3 font-display text-lg font-bold text-cocoa-900">{centre}</p>
                  <p className="text-xs uppercase tracking-wider text-muted">Community centre</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-cocoa-900 text-cream-50">
        <Container className="py-24">
          <Reveal>
            <Eyebrow>Impact</Eyebrow>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">The numbers so far</h2>
          </Reveal>
          <div className="mt-12">
            <ImpactStats />
          </div>
        </Container>
      </section>

      <section className="bg-cream-50">
        <Container className="py-24">
          <SectionHeading
            eyebrow="Leadership"
            title="The Board"
            intro="Professionals in social work, education, business and the arts who provide strategic leadership and oversight, working closely with the management team and our local and international partners."
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {board.map((member, i) => (
              <Reveal as="li" key={member.name} delay={i * 60}>
                <div className="h-full rounded-2xl border border-sand-200 bg-white p-6">
                  <span className="grid size-12 place-items-center rounded-full bg-cocoa-900 font-display font-bold text-mustard-500">
                    {member.name.replace(/^Fr\. /, "").split(" ")[0][0]}
                    {member.name.split(" ").at(-1)?.[0]}
                  </span>
                  <p className="mt-4 font-display font-bold text-cocoa-900">{member.name}</p>
                  <p className="text-sm text-muted">{member.role}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <DonateBanner />
    </>
  );
}
