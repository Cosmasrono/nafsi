import { ArrowRight, Heart } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { DonateBanner, ProgrammeCard } from "@/components/sections";
import { Reveal } from "@/components/reveal";
import { StoryCard } from "@/components/story-card";
import { ButtonLink, Container, PageHero, SectionHeading, TagList } from "@/components/ui";
import { programmes, stories, type StoryCategory } from "@/lib/content";

const relatedCategory: Record<string, StoryCategory> = {
  "performing-arts": "Artist Stories",
  outreach: "From the Community",
  tangaza: "Tangaza Stories",
  naiwave: "Youth Voices",
  "global-stay-tours": "Global Exchange Stories",
  "youth-empowerment": "Nafsi Alumni",
};

export const dynamicParams = false;

export function generateStaticParams() {
  return programmes.map((programme) => ({ slug: programme.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const programme = programmes.find((p) => p.slug === slug);
  return programme ? { title: programme.title, description: programme.summary } : {};
}

export default async function ProgrammePage({ params }: Props) {
  const { slug } = await params;
  const programme = programmes.find((p) => p.slug === slug);
  if (!programme) notFound();

  const related = stories.filter((story) => story.category === relatedCategory[slug]);
  const others = programmes.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <PageHero eyebrow={programme.eyebrow} title={programme.title} intro={programme.summary} />

      <section className="bg-cream-50">
        <Container className="grid items-start gap-14 py-24 md:grid-cols-2">
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl shadow-cocoa-900/15 md:sticky md:top-28">
            <Image src={programme.image} alt={programme.title} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </Reveal>
          <Reveal delay={120}>
            {programme.body.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="mb-5 text-lg leading-relaxed text-cocoa-800">
                {paragraph}
              </p>
            ))}
            <h2 className="mb-4 mt-8 font-display text-lg font-bold text-cocoa-900">What participants do</h2>
            <TagList tags={programme.tags} />
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href={`/donate?programme=${programme.slug}`}>
                <Heart className="size-4" />
                Support this programme
              </ButtonLink>
              <ButtonLink href="/get-involved/sponsor" variant="outline">
                Sponsor a cohort
                <ArrowRight className="size-4" />
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="bg-sand-100">
          <Container className="py-24">
            <SectionHeading eyebrow="Stories" title={`From ${programme.title}`} />
            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((story) => (
                <li key={story.slug}>
                  <StoryCard story={story} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <section className="bg-cream-50">
        <Container className="py-24">
          <SectionHeading eyebrow="More programmes" title="Explore our other work" />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((other, i) => (
              <li key={other.slug}>
                <ProgrammeCard programme={other} index={i} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <DonateBanner />
    </>
  );
}
