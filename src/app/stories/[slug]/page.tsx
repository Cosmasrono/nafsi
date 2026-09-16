import { Quote } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { DonateBanner } from "@/components/sections";
import { Reveal } from "@/components/reveal";
import { ShareButtons } from "@/components/share-buttons";
import { StoryCard } from "@/components/story-card";
import { Container, PageHero, SectionHeading } from "@/components/ui";
import { stories } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return stories.map((story) => ({ slug: story.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story = stories.find((s) => s.slug === slug);
  return story ? { title: story.title, description: story.excerpt, openGraph: { images: [story.image] } } : {};
}

export default async function StoryPage({ params }: Props) {
  const { slug } = await params;
  const story = stories.find((s) => s.slug === slug);
  if (!story) notFound();

  const more = stories.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <PageHero eyebrow={story.category} title={story.title} intro={story.excerpt}>
        <ShareButtons path={`/stories/${story.slug}`} title={story.title} />
      </PageHero>

      <article className="bg-cream-50">
        <Container className="max-w-3xl py-20">
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl shadow-cocoa-900/15">
            <Image src={story.image} alt="" fill priority sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
          </Reveal>
          <div className="mt-12 space-y-6 text-lg leading-relaxed text-cocoa-800">
            {story.body.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
          {story.quote && (
            <figure className="mt-12 rounded-3xl bg-mustard-100 p-8">
              <Quote className="size-8 text-mustard-500" />
              <blockquote className="mt-4 font-display text-2xl font-bold leading-snug text-cocoa-900">“{story.quote.text}”</blockquote>
              <figcaption className="mt-4 text-sm text-muted">— {story.quote.by}</figcaption>
            </figure>
          )}
        </Container>
      </article>

      <section className="bg-sand-100">
        <Container className="py-24">
          <SectionHeading eyebrow="Keep reading" title="More stories of change" />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((s) => (
              <li key={s.slug}>
                <StoryCard story={s} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <DonateBanner />
    </>
  );
}
