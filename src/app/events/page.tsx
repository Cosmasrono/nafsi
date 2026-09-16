import type { Metadata } from "next";
import { DonateBanner, EventsList } from "@/components/sections";
import { Container, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Events",
  description: "Community showcases, Tangaza intensives and Global Stay Tours — see what's coming up at Nafsi Africa.",
};

export default function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Events"
        title="Performances, workshops & exchanges"
        intro="From community showcases to Tangaza intensives and Global Stay Tours — see what's coming up."
      />
      <section className="bg-cream-50">
        <Container className="py-20">
          <EventsList />
        </Container>
      </section>
      <DonateBanner />
    </>
  );
}
