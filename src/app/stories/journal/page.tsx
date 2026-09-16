import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { DonateBanner } from "@/components/sections";
import { Reveal } from "@/components/reveal";
import { Container, PageHero } from "@/components/ui";
import { stories } from "@/lib/content";

export const metadata: Metadata = {
  title: "Nafsi Journal",
  description: "Notes from the studio, the centres and the road.",
};

export default function JournalPage() {
  return (
    <>
      <PageHero eyebrow="Nafsi Journal" title="Notes from the studio, the centres and the road" />
      <section className="bg-cream-50">
        <Container className="py-20">
          <ul className="divide-y divide-sand-200 border-y border-sand-200">
            {stories.map((story, i) => (
              <Reveal as="li" key={story.slug} delay={i * 50}>
                <Link href={`/stories/${story.slug}`} className="group grid items-center gap-6 py-8 sm:grid-cols-[10rem_1fr_auto]">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                    <Image src={story.image} alt="" fill sizes="160px" className="object-cover" />
                  </div>
                  <div>
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-mustard-600">{story.category}</p>
                    <h2 className="mt-2 font-display text-2xl font-bold text-cocoa-900 transition-colors group-hover:text-mustard-600">
                      {story.title}
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{story.excerpt}</p>
                  </div>
                  <ArrowUpRight className="hidden size-6 text-cocoa-900 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 sm:block" />
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
