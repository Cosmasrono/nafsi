import { MessageCircle } from "lucide-react";
import type { Metadata } from "next";
import { CreatorsSpotlight, DonateBanner } from "@/components/sections";
import { StoryCard } from "@/components/story-card";
import { ButtonLink, Container, PageHero, SectionHeading } from "@/components/ui";
import { stories } from "@/lib/content";

export const metadata: Metadata = {
  title: "Youth Voices",
  description: "In their own words: Nafsi's young hosts, performers, filmmakers and alumni.",
};

export default function YouthVoicesPage() {
  const voices = stories.filter((story) => story.category === "Youth Voices" || story.category === "Nafsi Alumni" || story.quote);

  return (
    <>
      <PageHero
        eyebrow="Youth voices"
        title="In their own words"
        intro="The hosts, performers, filmmakers and alumni who make Nafsi what it is."
      >
        <ButtonLink href="/contact" className="mt-8">
          <MessageCircle className="size-4" />
          Share your story
        </ButtonLink>
      </PageHero>
      <section className="bg-cream-50">
        <Container className="py-24">
          <SectionHeading eyebrow="Voices" title="Stories told by young people" />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {voices.map((story) => (
              <li key={story.slug}>
                <StoryCard story={story} />
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <CreatorsSpotlight />
      <DonateBanner />
    </>
  );
}
