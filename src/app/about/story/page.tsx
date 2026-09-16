import type { Metadata } from "next";
import { DonateBanner, Timeline } from "@/components/sections";
import { Container, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Our Story",
  description: "How Nafsi Africa grew from a community organization in Nairobi's informal settlements into a global creative hub.",
};

export default function StoryPage() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title="From Nairobi's neighbourhoods to a global creative hub"
        intro="Since 2010, Nafsi has grown one centre, one cohort and one partnership at a time."
      />
      <section className="bg-sand-100">
        <Container className="py-24">
          <Timeline />
        </Container>
      </section>
      <DonateBanner />
    </>
  );
}
