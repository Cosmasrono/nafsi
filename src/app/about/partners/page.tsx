import { Handshake } from "lucide-react";
import type { Metadata } from "next";
import { DonateBanner, PartnersGrid } from "@/components/sections";
import { ButtonLink, Container, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Partners",
  description: "The funders, media partners and cultural organizations that make Nafsi Africa's work possible.",
};

export default function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Partners"
        title="We go further, together"
        intro="Nafsi's work is made possible by a network of funders, media partners and cultural organizations across the world."
      >
        <ButtonLink href="/get-involved/partner" className="mt-8">
          <Handshake className="size-4" />
          Partner with us
        </ButtonLink>
      </PageHero>
      <section className="bg-sand-100">
        <Container className="pb-24 pt-4">
          <PartnersGrid />
        </Container>
      </section>
      <DonateBanner />
    </>
  );
}
