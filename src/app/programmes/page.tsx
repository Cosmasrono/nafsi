import type { Metadata } from "next";
import { DonateBanner, ProgrammeFeature } from "@/components/sections";
import { Container } from "@/components/ui";
import { programmes } from "@/lib/content";

export const metadata: Metadata = {
  title: "Programmes",
  description: "Performing arts, outreach, Tangaza on Smartphone, NaiWave Studios, Global Stay Tours, youth empowerment and Mazingira climate action.",
};

export default function ProgrammesPage() {
  return (
    <>
      <section className="programme-hero">
        <Container className="programme-container py-16">
          <p className="programme-eyebrow">Programmes</p>
          <h1 className="mt-5 max-w-2xl font-display text-[clamp(2.25rem,5.3vw,4.5rem)] font-extrabold leading-[0.95] tracking-tight">
            Seven<br />pathways<br />from<br />creativity to<br />opportunity
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-cream-50/75">
            From performing arts to digital storytelling to global exchange — every Nafsi programme is built around the same idea: young people creating their own futures.
          </p>
        </Container>
      </section>
      {programmes.map((programme, i) => (
        <ProgrammeFeature key={programme.slug} programme={programme} index={i} />
      ))}
      <DonateBanner />
    </>
  );
}
