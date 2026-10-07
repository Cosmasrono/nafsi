import { ArrowRight, ArrowUpRight, CalendarDays, CalendarHeart, Clock, Globe, Heart, MapPin, Smartphone, Sparkles, Handshake, Leaf, Radio, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { events, impactStats, partners, site, studioBooking, timeline, type NafsiEvent, type Programme } from "@/lib/content";
import { FacebookIcon, InstagramIcon, TikTokIcon, YouTubeIcon } from "./brand-icons";
import { Counter } from "./counter";
import { VideoGridClient } from "./video-grid-client";
import { Reveal } from "./reveal";
import { ButtonLink, Container, Eyebrow, SectionHeading, TagList, TextLink } from "./ui";

const socialLinks = [
  { label: "Instagram", href: site.socials.instagram, Icon: InstagramIcon },
  { label: "Facebook", href: site.socials.facebook, Icon: FacebookIcon },
  { label: "TikTok", href: site.socials.tiktok, Icon: TikTokIcon },
  { label: "YouTube (NaiWave)", href: site.socials.youtube, Icon: YouTubeIcon },
];

export function SocialIcons({ className = "", tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  return (
    <ul className={`flex gap-2 ${className}`}>
      {socialLinks.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            className={`grid size-10 place-items-center rounded-full transition-colors ${
              tone === "dark"
                ? "bg-cream-50/10 text-cream-50 hover:bg-mustard-500 hover:text-cocoa-900"
                : "bg-sand-100 text-cocoa-900 hover:bg-mustard-500"
            }`}
          >
            <Icon />
          </a>
        </li>
      ))}
    </ul>
  );
}

export function SocialPills() {
  return (
    <ul className="flex flex-wrap gap-3">
      {socialLinks.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-sand-200 bg-white px-4 py-2.5 text-sm font-semibold text-cocoa-900 transition-colors hover:border-mustard-500 hover:bg-mustard-100"
          >
            <Icon className="size-4 text-mustard-600" />
            {label}
            <ArrowUpRight className="size-3.5 opacity-60" />
          </a>
        </li>
      ))}
    </ul>
  );
}

const statIcons = { calendar: CalendarHeart, phone: Smartphone, pin: MapPin, globe: Globe };

export function ImpactStats({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const dark = tone === "dark";
  return (
    <div
      className={`grid overflow-hidden rounded-3xl sm:grid-cols-2 lg:grid-cols-4 ${
        dark ? "border border-cream-50/10 bg-cocoa-800/50" : "gap-4"
      }`}
    >
      {impactStats.map((stat, i) => {
        const Icon = statIcons[stat.icon];
        return (
          <Reveal
            key={stat.label}
            delay={i * 90}
            className={
              dark
                ? "border-cream-50/10 p-7 sm:[&:nth-child(odd)]:border-r lg:border-r lg:last:border-r-0 max-lg:[&:nth-child(-n+2)]:border-b"
                : "rounded-3xl bg-sand-100 p-7"
            }
          >
            <Icon className="size-6 text-mustard-500" />
            <p className={`mt-5 font-display text-5xl font-extrabold tracking-tight ${dark ? "text-cream-50" : "text-cocoa-900"}`}>
              <Counter value={stat.value} suffix={stat.suffix} />
            </p>
            <p className={`mt-3 text-sm font-semibold uppercase tracking-wide ${dark ? "text-cream-50/85" : "text-cocoa-800"}`}>
              {stat.label}
            </p>
            <p className={`mt-2 text-xs leading-relaxed ${dark ? "text-cream-50/50" : "text-muted"}`}>{stat.note}</p>
          </Reveal>
        );
      })}
    </div>
  );
}

export function DonateBanner() {
  return (
    <section className="programme-donate py-20 sm:py-24">
      <Container className="programme-container">
        <Reveal className="max-w-xl">
          <p className="programme-eyebrow text-cream-50/80">Your support creates opportunity</p>
          <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl">
            Art becomes confidence. Confidence becomes change.
          </h2>
          <p className="mt-5 text-base leading-relaxed">
            Your support helps create a safe space where a young person can discover talent, develop skills and see a different future. Give once, or give monthly.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <ButtonLink href="/donate" variant="light"><Heart className="size-4" aria-hidden />Donate now</ButtonLink>
            <ButtonLink href="/get-involved" className="border border-white/40 bg-transparent text-white hover:bg-white/15">Join the journey</ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

const programmeIcons: Record<string, typeof Sparkles> = {
  "performing-arts": Sparkles,
  outreach: Handshake,
  tangaza: Smartphone,
  naiwave: Radio,
  "global-stay-tours": Globe,
  mazingira: Leaf,
  "youth-empowerment": TrendingUp,
};

export function ProgrammeCard({ programme, index = 0 }: { programme: Programme; index?: number }) {
  const Icon = programmeIcons[programme.slug] ?? Sparkles;
  return (
    <Reveal delay={index * 80} className="h-full">
      <Link href={`/programmes/${programme.slug}`} className="group flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-sand-200 bg-white transition-shadow hover:shadow-lg">
        <div className="relative aspect-[4/3] overflow-hidden bg-sand-100">
          <Image src={programme.image} alt={programme.title} fill quality={85} sizes="(min-width: 1280px) 384px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-cocoa-950/75 via-transparent to-transparent" />
          <span className="programme-icon absolute left-3.5 top-3.5"><Icon className="size-5" aria-hidden /></span>
          <p className="absolute inset-x-3.5 bottom-3.5 text-[0.65rem] font-bold uppercase leading-relaxed text-white">{programme.eyebrow}</p>
        </div>
        <div className="flex-1 p-5">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-display text-lg font-bold leading-snug text-cocoa-900">{programme.title}</h3>
            <ArrowUpRight className="mt-1 size-4 shrink-0 text-muted" aria-hidden />
          </div>
          <p className="mt-3 text-[0.8125rem] leading-relaxed text-muted">{programme.summary}</p>
        </div>
      </Link>
    </Reveal>
  );
}

export function StudioBookingCard() {
  return (
    <Reveal className="h-full">
      <a href={studioBooking.url} target="_blank" rel="noreferrer" className="group relative isolate flex h-full min-h-[25rem] flex-col overflow-hidden rounded-[1.25rem] bg-cocoa-900 p-5 text-white">
        <Image src="/images/naiwave.jpg" alt="" fill sizes="(min-width: 1280px) 384px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" className="-z-20 object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-cocoa-950/65 via-cocoa-950/50 to-cocoa-950/90" />
        <span className="programme-icon"><CalendarDays className="size-5" aria-hidden /></span>
        <h3 className="mt-5 font-display text-lg font-bold">Book NaiWave Podcast</h3>
        <p className="mt-3 text-[0.8125rem] leading-relaxed text-white/90">Record your episode in the NaiWave studio — pick a slot and book your podcast session in minutes.</p>
        <span className="mt-auto flex items-center gap-2 pt-8 font-semibold text-mustard-400">Book a session <ArrowUpRight className="size-4" aria-hidden /></span>
      </a>
    </Reveal>
  );
}

export function ProgrammeFeature({ programme, index }: { programme: Programme; index: number }) {
  const flipped = index % 2 === 1;
  return (
    <section id={programme.slug} className={`programme-feature scroll-mt-24 ${flipped ? "bg-sand-100" : "bg-cream-50"}`}>
      <Container className="programme-container grid items-center gap-12 py-20 md:grid-cols-2 md:gap-14 md:py-24">
        <Reveal className={`relative aspect-[4/3] overflow-hidden rounded-[1.25rem] shadow-lg shadow-cocoa-900/10 ${flipped ? "md:order-2" : ""}`}>
          <Image src={programme.image} alt={programme.title} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        </Reveal>
        <Reveal delay={120}>
          <p className="programme-eyebrow">{programme.eyebrow}</p>
          <h2 className="mt-4 font-display text-3xl font-bold leading-[1.08] tracking-tight text-cocoa-900 sm:text-4xl">
            {programme.title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted">{programme.feature ?? programme.body.join(" ")}</p>
          <div className="mt-6">
            <TagList tags={programme.tags} />
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={programme.ctaHref ?? `/programmes/${programme.slug}`} className="programme-primary">
              {programme.cta}
              <ArrowRight className="size-4" />
            </ButtonLink>
            <ButtonLink href={`/donate?programme=${programme.slug}`} variant="outline">
              Support this
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export function Timeline() {
  return (
    <ol className="relative mt-14">
      <span className="absolute inset-y-0 left-3 w-px bg-sand-200 md:left-1/2" aria-hidden />
      {timeline.map((item, i) => (
        <li key={item.title} className="relative grid pb-10 last:pb-0 md:grid-cols-2 md:gap-20">
          <span
            className="absolute left-3 top-7 size-4 -translate-x-1/2 rounded-full border-4 border-sand-100 bg-mustard-500 md:left-1/2"
            aria-hidden
          />
          <Reveal className={`ml-10 md:ml-0 ${i % 2 === 0 ? "md:col-start-1 md:text-right" : "md:col-start-2"}`}>
            <div className="rounded-2xl border border-sand-200 bg-white p-6 shadow-sm">
              <p className="font-display text-xl font-extrabold text-mustard-500">{item.label}</p>
              <h3 className="mt-1 font-display text-lg font-bold text-cocoa-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
              {item.note && <p className="mt-3 text-xs text-muted">{item.note}</p>}
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

export function PartnersGrid() {
  return (
    <ul className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-3">
      {partners.map((partner, i) => (
        <Reveal as="li" key={partner.name} delay={i * 60}>
          <div className="flex h-full flex-col items-center rounded-2xl border border-sand-200 bg-white px-4 py-7 text-center transition-colors hover:border-mustard-500">
            {partner.logo ? (
              <Image src={partner.logo} alt={`${partner.name} logo`} width={96} height={96} className="size-20 rounded-xl object-contain" />
            ) : (
              <span className="grid size-20 place-items-center rounded-full bg-mustard-100 font-display text-2xl font-extrabold text-mustard-600">
                {partner.name
                  .split(" ")
                  .map((word) => word[0])
                  .slice(0, 2)
                  .join("")}
              </span>
            )}
            <p className="mt-4 font-display font-bold text-cocoa-900">{partner.name}</p>
            <p className="mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted">{partner.role}</p>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}


export function EventCard({ event }: { event: NafsiEvent }) {
  return (
    <Reveal>
      <article className="group flex flex-col gap-5 rounded-3xl border border-sand-200 bg-white p-5 transition-shadow hover:shadow-lg hover:shadow-cocoa-900/5 sm:flex-row sm:items-center sm:p-6">
        <div className="grid size-20 shrink-0 place-items-center content-center rounded-2xl bg-mustard-100 text-center">
          <span className="font-display text-3xl font-extrabold leading-none text-mustard-500">{event.day}</span>
          <span className="mt-1 text-xs font-semibold uppercase text-mustard-600">{event.month}</span>
        </div>
        <div className="flex-1">
          <span className="rounded-full bg-sand-100 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-cocoa-800">
            {event.type}
          </span>
          <h3 className="mt-3 font-display text-xl font-bold text-cocoa-900 transition-colors group-hover:text-mustard-600">
            {event.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{event.text}</p>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted">
            <li className="flex items-center gap-1.5">
              <CalendarDays className="size-3.5" />
              {event.date}
            </li>
            <li className="flex items-center gap-1.5">
              <Clock className="size-3.5" />
              {event.time}
            </li>
            <li className="flex items-center gap-1.5">
              <MapPin className="size-3.5" />
              {event.venue}
            </li>
          </ul>
        </div>
        <Link href="/contact" className="shrink-0 py-2 text-sm font-semibold text-mustard-600 hover:text-cocoa-900">
          Ask about this
        </Link>
      </article>
    </Reveal>
  );
}

export function EventsList() {
  return (
    <div className="grid gap-4">
      {events.map((event) => (
        <EventCard key={event.title} event={event} />
      ))}
      <p className="text-xs text-muted">Some events shown are illustrative pending confirmation by the Nafsi team.</p>
    </div>
  );
}

export function VideoGrid() {
  return <VideoGridClient />;
}

export function CreatorsSpotlight() {
  return (
    <section className="bg-cocoa-900 text-cream-50">
      <Container className="grid items-center gap-12 py-24 lg:grid-cols-2">
        <Reveal className="min-w-0">
          <Eyebrow tone="gold">Meet the creators</Eyebrow>
          <h2 className="mt-5 font-display text-[min(1.9rem,calc((100vw-2.5rem)/11.4))] font-extrabold leading-[0.98] tracking-tight break-words sm:text-5xl lg:text-[min(2.9rem,calc((50vw-4rem)/10.8))]">
            These are not beneficiaries. These are creators.
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-cream-50/70">
            Across every programme, young people are building skills, telling their own stories and shaping their futures. Meet
            the artists, filmmakers and voices of Nafsi.
          </p>
          <ButtonLink href="/stories/youth-voices" className="mt-8">
            Meet the youth
            <ArrowUpRight className="size-4" />
          </ButtonLink>
        </Reveal>
        <Reveal delay={150} className="relative aspect-[4/3] overflow-hidden rounded-3xl">
          <Image src="/images/drummer-stage.jpg" alt="A young Nafsi drummer in the group's kit, mid-beat on stage" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-cocoa-950/90 to-transparent p-6 pt-16">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-mustard-500 px-3 py-1 text-xs font-semibold text-cocoa-900">
              <Sparkles className="size-3.5" />
              Creator spotlight
            </span>
            <p className="mt-3 font-display text-lg font-bold leading-snug">
              Real youth profiles are added by the Nafsi team — each one a creator, not a case study.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export function FollowJourney() {
  return (
    <section className="bg-cream-50">
      <Container className="grid items-center gap-12 py-24 md:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Follow the journey"
            title="Nafsi is active every day"
            intro="From the centres to the studio to the stage — follow the real, daily story of Nafsi's young creators across platforms."
          />
          <div className="mt-8">
            <SocialPills />
          </div>
          <p className="mt-5 text-sm text-muted">
            NaiWave also has its own channels — <TextLink href={site.socials.youtube}>YouTube</TextLink>, Instagram and more.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Reveal className="group relative aspect-[3/4] overflow-hidden rounded-3xl shadow-xl transition-all duration-300 hover:-translate-y-1">
            <Image
              src="/images/podcast-tall.jpg"
              alt="A Nafsi dancer performing in front of the drum line"
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cocoa-950/85 via-cocoa-950/20 to-transparent" />
            <span className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full bg-cocoa-950/60 px-3.5 py-1.5 text-xs font-semibold text-cream-50 backdrop-blur-md border border-cream-50/20">
              <InstagramIcon className="size-3.5 text-mustard-400" />
              @nafsiafrica
            </span>
          </Reveal>
          <Reveal delay={120} className="group relative mt-8 aspect-[3/4] overflow-hidden rounded-3xl shadow-xl transition-all duration-300 hover:-translate-y-1">
            <Image
              src="/images/naiwave-hd.jpg"
              alt="Two young NaiWave creators in a session at the studio"
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cocoa-950/85 via-cocoa-950/20 to-transparent" />
            <span className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full bg-cocoa-950/60 px-3.5 py-1.5 text-xs font-semibold text-cream-50 backdrop-blur-md border border-cream-50/20">
              <YouTubeIcon className="size-3.5 text-mustard-400" />
              NaiWave Studios
            </span>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
