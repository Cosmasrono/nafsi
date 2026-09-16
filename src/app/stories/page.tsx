import type { Metadata } from "next";
import { DonateBanner } from "@/components/sections";
import { ShareButtons } from "@/components/share-buttons";
import { StoriesBrowser } from "@/components/stories-browser";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Stories of Change",
  description: "Young people are the protagonists — artists, creators, storytellers and change-makers.",
};

export default function StoriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Stories of change"
        title="Young people are the protagonists"
        intro="Not beneficiaries. Artists, creators, storytellers and change-makers."
      >
        <ShareButtons path="/stories" title="Stories of Change" />
      </PageHero>
      <StoriesBrowser />
      <DonateBanner />
    </>
  );
}
