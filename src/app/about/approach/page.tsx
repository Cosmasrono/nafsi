import { ArrowDown, ArrowUpRight, Check, ChevronDown, Megaphone, Sprout, Users } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { DonateBanner } from "@/components/sections";
import { Reveal } from "@/components/reveal";
import { ButtonLink, Container, Eyebrow, SectionHeading, TextLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Our Approach",
  description: "Youth empowerment, talent development and advocacy, aligned with the Sustainable Development Goals.",
};

const pillars = [
  {
    Icon: Users,
    title: "Youth empowerment",
    image: "/images/youth-hd.jpg",
    href: "/programmes/youth-empowerment",
    action: "Explore youth empowerment",
    text: "A holistic approach focused on skill development, self-esteem and economic sustainability. Projects in education, creative arts, media and outreach equip children and young adults with marketable skills for future independence.",
  },
  {
    Icon: Sprout,
    title: "Talent development",
    image: "/images/tangaza-lab.jpg",
    href: "/programmes/tangaza",
    action: "Discover creative training",
    text: "Structured mentorship, hands-on training and real-world assignments in media, community development and ICT. Participants run an online radio station, create podcasts and help manage community centres.",
  },
  {
    Icon: Megaphone,
    title: "Advocacy",
    image: "/images/mazingira.jpg",
    href: "/programmes/mazingira",
    action: "See climate action",
    text: "Environmental conservation and gender equality through tree planting, awareness workshops, sanitary workshops for girls and global conversations through Global Stay Tours.",
  },
];

const goals = [
  { number: 1, title: "No poverty", text: "Marketable creative and media skills that build self-reliance." },
  { number: 3, title: "Good health & well-being", text: "Mental-health conversations, counselling and creative outlets." },
  { number: 4, title: "Quality education", text: "Training in media production, broadcasting and the arts." },
  { number: 5, title: "Gender equality", text: "A focus on young women in Tangaza and advocacy in the community." },
  { number: 10, title: "Reduced inequalities", text: "International exchange for youth from disadvantaged backgrounds." },
  { number: 13, title: "Climate action", text: "Tree planting and climate storytelling by young reporters." },
];

export default function ApproachPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-cocoa-900 text-cream-50">
        <div className="hero-grid pointer-events-none absolute inset-0 -z-10" aria-hidden />
        <Container className="grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div className="min-w-0">
            <Eyebrow tone="gold">Our approach</Eyebrow>
            <h1 className="mt-6 font-display text-[clamp(2.5rem,4.8vw,4.5rem)] font-bold leading-[1.08] tracking-tight">Creative expression.<br /><span className="text-mustard-400">Real opportunity.</span></h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-cream-50/75 sm:text-lg">Every young person deserves the space to discover who they are — and the support to shape what comes next. We bring together arts, media and cultural exchange to make that possible.</p>
            <div className="mt-8 flex flex-col gap-3 min-[400px]:flex-row min-[400px]:flex-wrap">
              <ButtonLink href="/programmes">Explore our programmes <ArrowUpRight className="size-4" aria-hidden /></ButtonLink>
              <ButtonLink href="#how-it-works" variant="outline-light">How it works <ArrowDown className="size-4" aria-hidden /></ButtonLink>
            </div>
            <p className="mt-7 flex items-center gap-2 text-sm text-cream-50/65"><Users className="size-4 shrink-0 text-mustard-400" aria-hidden />Built with young people, rooted in community.</p>
          </div>
          <figure className="overflow-hidden rounded-3xl border border-cream-50/15 bg-cocoa-800">
            <div className="relative aspect-[4/3] sm:aspect-[5/4]">
              <Image src="/images/community-hd.jpg" alt="Nafsi's creative community coming together in performance" fill preload quality={85} sizes="(min-width: 1344px) 560px, (min-width: 1024px) 45vw, 100vw" className="object-cover" />
            </div>
            <figcaption className="flex items-center justify-between gap-4 px-5 py-5 sm:px-7"><span className="text-sm font-medium">From belonging to becoming.</span><span className="text-xs uppercase tracking-widest text-mustard-400">Nafsi Pamoja</span></figcaption>
          </figure>
        </Container>
      </section>
      <nav aria-label="On this page" className="border-b border-sand-200 bg-white">
        <Container className="flex flex-wrap gap-x-6 gap-y-1 py-3 sm:gap-x-10">
          {[{ href: "#our-pillars", label: "Our three pillars" }, { href: "#how-it-works", label: "How it works" }, { href: "#global-goals", label: "Global goals" }, { href: "#questions", label: "Common questions" }].map((link) => <a key={link.href} href={link.href} className="inline-flex min-h-11 items-center text-sm font-semibold text-muted transition-colors hover:text-cocoa-900">{link.label}</a>)}
        </Container>
      </nav>
      <section id="our-pillars" className="scroll-mt-24 bg-cream-50">
        <Container className="section-space">
          <SectionHeading eyebrow="Three connected pillars" title="The whole person. The bigger picture." intro="Creative skills are one part of the journey. Confidence, connection and a voice in the community matter just as much." />
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {pillars.map(({ Icon, title, text, image, href, action }, i) => (
              <Reveal as="li" key={title} delay={i * 90}>
                <div className="card-elevation flex h-full flex-col overflow-hidden rounded-3xl border border-sand-200 bg-white">
                  <div className="relative aspect-[4/3]">
                    <Image src={image} alt="" fill quality={85} sizes="(min-width: 1328px) 390px, (min-width: 768px) 30vw, 100vw" className="object-cover" />
                    <span className="absolute left-5 top-5 rounded-full bg-cream-50 px-3 py-1 font-display text-sm font-bold text-cocoa-900">0{i + 1}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-6 lg:p-8">
                  <span className="grid size-12 place-items-center rounded-2xl bg-mustard-100 text-mustard-600">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-bold text-cocoa-900">{title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{text}</p>
                  <div className="mt-auto pt-6"><TextLink href={href}>{action}</TextLink></div>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>
      <section id="how-it-works" className="scroll-mt-24 bg-cocoa-900 text-cream-50">
        <Container className="section-space grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <Eyebrow tone="gold">How it works</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">Small steps.<br />New possibilities.</h2>
            <p className="mt-5 leading-relaxed text-cream-50/70">From a first creative session to a project of their own, young people learn through practice, mentorship and shared responsibility.</p>
            <ButtonLink href="/contact" variant="outline-light" className="mt-7">Talk to our team <ArrowUpRight className="size-4" aria-hidden /></ButtonLink>
          </div>
          <ol className="divide-y divide-cream-50/15">
            {[
              { title: "Find a place to belong", text: "Community spaces and creative sessions bring young people together to explore their interests and express themselves." },
              { title: "Learn by creating", text: "Hands-on training and mentorship turn curiosity into practical skills in performance, digital media and community work." },
              { title: "Put skills into practice", text: "Young people contribute to productions, podcasts, community projects and cultural exchanges — taking on real responsibility." },
            ].map((step, i) => <li key={step.title} className="flex gap-5 py-7 first:pt-0 last:pb-0"><span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-mustard-400/30 text-sm font-semibold text-mustard-400">0{i + 1}</span><div><h3 className="font-display text-xl font-bold">{step.title}</h3><p className="mt-2 text-sm leading-relaxed text-cream-50/70 sm:text-base">{step.text}</p></div></li>)}
          </ol>
        </Container>
      </section>
      <section id="global-goals" className="scroll-mt-24 bg-sand-100">
        <Container className="section-space">
          <SectionHeading
            eyebrow="Sustainable Development Goals"
            title="Individual growth, wider transformation"
            intro="By integrating the SDGs into our empowerment agenda, young people don't just gain skills, they take part in their communities' economic and social development."
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {goals.map((goal, i) => (
              <Reveal as="li" key={goal.number} delay={i * 60}>
                <div className="flex h-full gap-5 rounded-2xl bg-white p-6">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-mustard-100 font-display text-2xl font-bold text-cocoa-900">{goal.number}</span>
                  <div>
                    <h3 className="font-display font-bold text-cocoa-900">{goal.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{goal.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>
      <section id="questions" className="scroll-mt-24 bg-cream-50">
        <Container className="section-space grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div><SectionHeading eyebrow="A little more clarity" title="Your next step starts here." /><p className="mt-5 leading-relaxed text-muted">Looking for a programme or a way to contribute? Here are a few useful starting points.</p><div className="mt-5"><TextLink href="/contact">Get in touch with our team</TextLink></div></div>
          <div className="divide-y divide-sand-200 border-y border-sand-200">
            {[
              { title: "How can a young person get involved?", text: "Explore our programmes to find an area of interest, then contact the team about current activities, locations and participation details.", href: "/programmes", action: "Find a programme" },
              { title: "Can I volunteer or share my skills?", text: "Visit our volunteer page to tell us about your skills, interests and availability. Our team can discuss where your contribution may fit.", href: "/get-involved/volunteer", action: "Explore volunteering" },
              { title: "How can my organisation support Nafsi?", text: "We welcome conversations with schools, cultural institutions, foundations and businesses about programme support and partnership opportunities.", href: "/get-involved/partner", action: "Become a partner" },
              { title: "Where can I learn about Nafsi's impact?", text: "Our impact and transparency page brings together programme results and information about our work in the community.", href: "/about/impact", action: "Explore our impact" },
            ].map((faq) => <details key={faq.title} className="group py-1"><summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold text-cocoa-900 [&::-webkit-details-marker]:hidden">{faq.title}<ChevronDown className="size-5 shrink-0 text-muted transition-transform group-open:rotate-180" aria-hidden /></summary><div className="pb-5 pr-6"><p className="text-sm leading-relaxed text-muted sm:text-base">{faq.text}</p><div className="mt-3"><TextLink href={faq.href}>{faq.action}</TextLink></div></div></details>)}
          </div>
        </Container>
      </section>
      <div className="border-y border-sand-200 bg-white"><Container className="flex flex-wrap justify-center gap-x-10 gap-y-3 py-6 text-sm font-medium text-muted">{["Community-led", "Practical learning", "Youth participation"].map((value) => <span key={value} className="flex items-center gap-2"><Check className="size-4 text-mustard-600" aria-hidden />{value}</span>)}</Container></div>
      <DonateBanner />
    </>
  );
}
