import { ArrowDown, ArrowUpRight, Heart, Play } from "lucide-react";
import Image from "next/image";
import {
  CreatorsSpotlight,
  DonateBanner,
  EventsList,
  FollowJourney,
  ImpactStats,
  MapEmbed,
  PartnersGrid,
  ProgrammeCard,
  Timeline,
  VideoGrid,
} from "@/components/sections";
import { Reveal } from "@/components/reveal";
import { StoryCard } from "@/components/story-card";
import { ButtonLink, Container, Eyebrow, SectionHeading } from "@/components/ui";
import { programmes, site, stories } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-cocoa-900 text-cream-50">
        <div className="absolute inset-y-0 right-0 -z-10 w-full md:w-3/5">
          <Image src="/images/hero.jpg" alt="" fill priority sizes="60vw" className="object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-r from-cocoa-900 via-cocoa-900/60 to-cocoa-900/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-cocoa-900 via-transparent to-cocoa-900/40" />
        </div>
        <Container className="pb-12 pt-24 sm:pt-32">
          <Reveal>
            <Eyebrow>Nafsi Pamoja · Nairobi, Kenya · Since {site.founded}</Eyebrow>
            <h1 className="mt-6 font-display text-6xl font-bold leading-[0.92] tracking-tight sm:text-7xl lg:text-8xl">
              Creativity can
              <span className="block text-mustard-500">change lives.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-cream-50/75">{site.description}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/donate">
                <Heart className="size-4" />
                Donate now
              </ButtonLink>
              <ButtonLink href="/programmes" variant="outline-light">
                <Play className="size-4" />
                Discover our work
              </ButtonLink>
              <ButtonLink href="/get-involved" variant="outline-light">
                Get involved
              </ButtonLink>
            </div>
          </Reveal>
          <a href="#impact" className="mx-auto mt-16 flex w-fit flex-col items-center gap-2 text-[0.65rem] uppercase tracking-[0.3em] text-cream-50/50 hover:text-cream-50">
            Scroll
            <ArrowDown className="size-3.5 animate-bounce" />
          </a>
        </Container>

        <Container className="scroll-mt-24 pb-24 pt-8" >
          <div id="impact" className="scroll-mt-28">
            <Reveal>
              <Eyebrow>Impact in motion</Eyebrow>
              <h2 className="mt-4 max-w-2xl font-display text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl">
                From creativity to opportunity — measured.
              </h2>
            </Reveal>
            <div className="mt-12">
              <ImpactStats />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-cream-50">
        <Container className="py-24">
          <SectionHeading
            eyebrow="What we do"
            title="Six programmes, one creative soul"
            intro="We provide creative opportunities for children and young people from Nairobi's informal settlements — on stage, behind the camera, on air and across borders."
            action={
              <ButtonLink href="/programmes" variant="outline">
                All programmes
                <ArrowUpRight className="size-4" />
              </ButtonLink>
            }
          />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {programmes.map((programme, i) => (
              <li key={programme.slug}>
                <ProgrammeCard programme={programme} index={i} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CreatorsSpotlight />

      <section className="bg-sand-100">
        <Container className="py-24">
          <SectionHeading
            eyebrow="Video-first"
            title="See it. Hear it. Feel it."
            intro="Nafsi stories, Tangaza films, NaiWave podcasts and performance reels — the work is alive on screen."
            action={
              <ButtonLink href="/stories/videos" variant="outline">
                All videos
                <ArrowUpRight className="size-4" />
              </ButtonLink>
            }
          />
          <VideoGrid />
        </Container>
      </section>

      <section className="bg-cream-50">
        <Container className="py-24">
          <SectionHeading
            eyebrow="Stories of change"
            title="Young people are the protagonists"
            intro="Not beneficiaries. Artists, creators, storytellers and change-makers."
            action={
              <ButtonLink href="/stories" variant="outline">
                All stories
                <ArrowUpRight className="size-4" />
              </ButtonLink>
            }
          />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stories.slice(0, 3).map((story, i) => (
              <Reveal as="li" key={story.slug} delay={i * 80}>
                <StoryCard story={story} />
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-sand-100">
        <Container className="py-24">
          <SectionHeading eyebrow="Our story" title="A journey rooted in Nairobi" intro="From a community organisation in the city's informal settlements to a global creative hub." />
          <Timeline />
        </Container>
      </section>

      <section className="bg-sand-100">
        <Container className="pb-24">
          <SectionHeading
            eyebrow="Partners"
            title="We go further, together"
            intro="Nafsi's work is made possible by a network of funders, media partners and cultural organizations across the world."
          />
          <PartnersGrid />
        </Container>
      </section>

      <FollowJourney />

      <section className="border-t border-sand-200 bg-cream-50">
        <Container className="py-24">
          <SectionHeading
            eyebrow="Events"
            title="Performances, workshops & exchanges"
            action={
              <ButtonLink href="/events" variant="outline">
                All events
                <ArrowUpRight className="size-4" />
              </ButtonLink>
            }
          />
          <div className="mt-12">
            <EventsList />
          </div>
        </Container>
      </section>

      <DonateBanner />

      <section className="bg-sand-100">
        <Container className="py-16">
          <MapEmbed />
        </Container>
      </section>
    </>
  );
}
