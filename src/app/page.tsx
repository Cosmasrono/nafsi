import { ArrowDown, ArrowUpRight, Heart, Play } from "lucide-react";
import Image from "next/image";
import {
  CreatorsSpotlight,
  DonateBanner,
  FollowJourney,
  ImpactStats,
  PartnersGrid,
  ProgrammeCard,
  Timeline,
  VideoGrid,
} from "@/components/sections";
import { GlobalConnections } from "@/components/global-connections";
import { Counter } from "@/components/counter";
import { Reveal } from "@/components/reveal";
import { StoryCard } from "@/components/story-card";
import { ButtonLink, Container, Eyebrow, SectionHeading } from "@/components/ui";
import { programmes, site, stories } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-cocoa-900 text-cream-50">
        <div className="absolute inset-y-0 right-0 -z-10 w-full md:w-3/5">
          <Image src="/images/hero.jpg" alt="A young acrobat mid-flip against a Nairobi golden-hour sky" fill preload sizes="(min-width: 768px) 60vw, 100vw" className="object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-r from-cocoa-900 via-cocoa-900/60 to-cocoa-900/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-cocoa-900 via-transparent to-cocoa-900/40" />
        </div>
        <Container className="pb-12 pt-24 sm:pt-32">
          <Reveal>
            <Eyebrow>Nafsi Pamoja · Nairobi, Kenya · Since {site.founded}</Eyebrow>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[0.92] tracking-tight break-words min-[380px]:text-6xl sm:text-7xl lg:text-8xl">
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
        <Container className="grid items-center gap-12 py-24 lg:grid-cols-2">
          <Reveal>
            <SectionHeading eyebrow="Who we are" title="A community organization with a creative soul" />
            <p className="mt-6 leading-relaxed text-muted">Nafsi Africa — registered as Nafsi Pamoja Organization — is a Community Based Organization in Nairobi, Kenya. “Nafsi” is Swahili for “soul”, and it reflects the heart of our mission: to inspire, uplift and empower young people through creativity and community.</p>
            <p className="mt-5 leading-relaxed text-muted">Through music, acrobatics, circus, dance, yoga, percussion, theatre and visual arts, we create safe spaces where children and youth can express themselves, gain confidence and grow. We integrate media and technology, and connect young people across cultures — nurturing creative, resilient and socially conscious leaders.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/about/story">Our story</ButtonLink>
              <ButtonLink href="/about/impact" variant="outline">Our impact</ButtonLink>
            </div>
          </Reveal>
          <Reveal className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
              <Image src="/images/community.jpg" alt="Nafsi community in performance" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-cream-50/95 p-6 text-cocoa-900 backdrop-blur-sm">
              <p className="font-display text-5xl font-extrabold"><Counter value={new Date().getFullYear() - site.founded} suffix="+" /></p>
              <p className="mt-2 text-sm">years of community impact in Nairobi</p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-cream-50">
        <Container className="py-24">
          <SectionHeading
            eyebrow="What we do"
            title="Six pathways from creativity to opportunity"
            intro="Nafsi is not a charity that hands out help. It is a platform where art becomes confidence, confidence becomes skills, and skills become opportunity."
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

      <section className="bg-cream-50">
        <Container className="py-24">
          <SectionHeading
            eyebrow="Stories of change"
            title="Young people are the protagonists"
            intro="Not beneficiaries. Artists, creators, storytellers and change-makers. These are their stories."
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

      <GlobalConnections />

      <section className="bg-sand-100">
        <Container className="py-24">
          <SectionHeading eyebrow="Our journey" title="From 2002 to a global creative hub" intro="Verified milestones from Nafsi Pamoja's story — founded in Nairobi, growing into the world." />
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
          <div className="mt-10 rounded-3xl border border-sand-200 bg-cream-50 p-8 sm:flex sm:items-center sm:justify-between sm:gap-8">
            <div className="max-w-2xl">
              <h3 className="font-display text-2xl font-bold text-cocoa-900">Interested in partnering with Nafsi?</h3>
              <p className="mt-3 leading-relaxed text-muted">Foundations, CSR partners, cultural institutions, schools and development organizations — let&apos;s build something together.</p>
            </div>
            <ButtonLink href="/get-involved/partner" className="mt-6 shrink-0 sm:mt-0">Partner with us</ButtonLink>
          </div>
        </Container>
      </section>

      <FollowJourney />

      <DonateBanner />
    </>
  );
}
