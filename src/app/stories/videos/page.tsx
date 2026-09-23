import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { DonateBanner, SocialPills, VideoGrid } from "@/components/sections";
import { ButtonLink, Container, PageHero } from "@/components/ui";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Videos",
  description: "Nafsi stories, Tangaza films, NaiWave podcasts and performance reels.",
};

export default function VideosPage() {
  return (
    <>
      <PageHero
        eyebrow="Video-first"
        title="See it. Hear it. Feel it."
        intro="Nafsi stories, Tangaza films, NaiWave podcasts and performance reels. The work is alive on screen."
      >
        <div className="mt-6">
          <ButtonLink href={site.socials.youtube} variant="outline-light">
            Watch all on YouTube
            <ArrowUpRight className="size-4" />
          </ButtonLink>
        </div>
      </PageHero>
      <section className="bg-sand-100">
        <Container className="py-20">
          <VideoGrid />
          <div className="mt-14">
            <p className="mb-4 font-display text-lg font-bold text-cocoa-900">Watch more on our channels</p>
            <SocialPills />
          </div>
        </Container>
      </section>
      <DonateBanner />
    </>
  );
}
