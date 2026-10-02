import { ArrowRight, ArrowUpRight, Check, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  CreatorsSpotlight,
  DonateBanner,
  FollowJourney,
  ImpactStats,
  PartnersGrid,
  ProgrammeCard,
  Timeline,
} from "@/components/sections";
import { VideoGridClient } from "@/components/video-grid-client";
import { GlobalConnections } from "@/components/global-connections";
import { Counter } from "@/components/counter";
import { ProgrammeBrowser } from "@/components/programme-browser";
import { Reveal } from "@/components/reveal";
import { StoryCard } from "@/components/story-card";
import { ButtonLink, Container, Eyebrow, SectionHeading } from "@/components/ui";
import { programmes, site, stories } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-cocoa-900 text-cream-50">
        <div className="relative isolate">
        <div className="absolute inset-0 -z-10">
          <Image src="/images/hero.jpg" alt="Three young Nafsi performers in Nafsi T-shirts on stage under the big top" fill preload quality={85} sizes="100vw" className="object-cover object-[65%_center]" />
          <div className="absolute inset-0 bg-gradient-to-r from-cocoa-950/95 via-cocoa-950/75 to-cocoa-950/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-cocoa-900 via-transparent to-transparent" />
          <div className="hero-grid absolute inset-0" />
        </div>
        <Container className="grid items-center gap-12 py-16 sm:py-20 lg:min-h-[690px] lg:grid-cols-[1.25fr_0.85fr] lg:gap-16 lg:py-24">
          <Reveal className="min-w-0">
            <p className="flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-cream-50/85">
              <span className="h-px w-10 bg-current" aria-hidden />
              Nafsi Pamoja · Nairobi, Kenya · Since {site.founded}
            </p>
            <h1 className="mt-6 font-display text-[clamp(2.65rem,5.2vw,4.75rem)] font-bold leading-[1.06] tracking-tight">
              Creativity can
              <span className="block text-mustard-500">change lives.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-cream-50/80 sm:text-lg">We help young people in Kenya turn creative talent into confidence, practical skills and opportunity — through arts, media and cultural exchange.</p>
            <div className="mt-8 flex flex-col gap-3 min-[400px]:flex-row min-[400px]:flex-wrap">
              <ButtonLink href="/programmes">
                Explore our programmes
                <ArrowUpRight className="size-4" />
              </ButtonLink>
              <ButtonLink href="/donate" variant="outline-light">
                <Heart className="size-4" /> Support a young person
              </ButtonLink>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium text-cream-50/80 sm:text-sm">
              {["Rooted in Nairobi", "Led by creativity", "Connected globally"].map((value) => <li key={value} className="flex items-center gap-2"><Check className="size-4 text-mustard-400" aria-hidden />{value}</li>)}
            </ul>
          </Reveal>
          <Reveal delay={120} className="rounded-3xl border border-cream-50/20 bg-cocoa-900/85 p-6 shadow-2xl backdrop-blur-md sm:p-8">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">What you can do at Nafsi</h2>
            <ul className="mt-7 space-y-3">
              {[
                { title: "Performing arts", text: "Take part in dance, music, acrobatics and theatre with other young people.", href: "/programmes/performing-arts" },
                { title: "Film and storytelling", text: "Learn to film, edit and tell stories using a smartphone.", href: "/programmes/tangaza" },
                { title: "Cultural exchange", text: "Meet other young creatives and share your work across cultures.", href: "/programmes/global-stay-tours" },
              ].map((programme) => (
                <li key={programme.title}>
                  <Link href={programme.href} className="group flex items-start gap-3 rounded-2xl border border-cream-50/10 bg-cream-50/5 p-4 transition-colors hover:border-mustard-400/50 hover:bg-cream-50/10">
                    <div className="min-w-0 flex-1"><h3 className="text-sm font-semibold sm:text-base">{programme.title}</h3><p className="mt-1 text-xs leading-relaxed text-cream-50/65 sm:text-sm">{programme.text}</p></div>
                    <ArrowUpRight className="mt-1 size-4 shrink-0 text-mustard-400 transition-transform group-hover:-translate-y-0.5" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/programmes" className="mt-6 flex min-h-11 items-center justify-between gap-4 border-t border-cream-50/15 pt-5 text-sm font-semibold text-mustard-300 hover:text-white">View all programmes <ArrowRight className="size-4" aria-hidden /></Link>
          </Reveal>
        </Container>
        </div>

        <Container className="scroll-mt-24 pb-16 pt-4 sm:pb-20" >
          <div id="impact" className="scroll-mt-28">
            <Reveal>
              <Eyebrow tone="gold">Impact in motion</Eyebrow>
              <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                Rooted in community. Built for lasting change.
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
              <Image src="/images/one.jpeg" alt="A Nafsi acrobat lifting a child overhead against the Nairobi sky" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
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
            title="Seven pathways from creativity to opportunity"
            intro="Nafsi is not a charity that hands out help. It is a platform where art becomes confidence, confidence becomes skills, and skills become opportunity."
          />
          <ProgrammeBrowser items={programmes.map((programme) => ({
            slug: programme.slug,
            card: <ProgrammeCard programme={programme} />,
          }))} />
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
              <ButtonLink href={site.socials.youtube} variant="outline">
                All videos
                <ArrowUpRight className="size-4" />
              </ButtonLink>
            }
          />
          <VideoGridClient />
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
