import type { Metadata } from "next";
import { DonateBanner, ProgrammeFeature } from "@/components/sections";
import { PageHero } from "@/components/ui";
import { programmes } from "@/lib/content";

export const metadata: Metadata = {
  title: "Programmes",
  description: "Performing arts, outreach, Tangaza on Smartphone, NaiWave Studios, Global Stay Tours, youth empowerment and Mazingira climate action.",
};

export default function ProgrammesPage() {
  return (
    <>
      <PageHero
        eyebrow="Programmes"
        title="Seven ways creativity becomes opportunity"
        intro="On stage, behind the camera, on air and across borders, every programme builds skills, confidence and community."
      />
      {programmes.map((programme, i) => (
        <ProgrammeFeature key={programme.slug} programme={programme} index={i} />
      ))}
      <DonateBanner />
    </>
  );
}
