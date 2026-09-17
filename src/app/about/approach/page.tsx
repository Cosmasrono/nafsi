import { Megaphone, Sprout, Users } from "lucide-react";
import type { Metadata } from "next";
import { DonateBanner } from "@/components/sections";
import { Reveal } from "@/components/reveal";
import { Container, PageHero, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Our Approach",
  description: "Youth empowerment, talent development and advocacy, aligned with the Sustainable Development Goals.",
};

const pillars = [
  {
    Icon: Users,
    title: "Youth empowerment",
    text: "A holistic approach focused on skill development, self-esteem and economic sustainability. Projects in education, creative arts, media and outreach equip children and young adults with marketable skills for future independence.",
  },
  {
    Icon: Sprout,
    title: "Talent development",
    text: "Structured mentorship, hands-on training and real-world assignments in media, community development and ICT. Participants run an online radio station, create podcasts and help manage community centres.",
  },
  {
    Icon: Megaphone,
    title: "Advocacy",
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
      <PageHero
        eyebrow="Our approach"
        title="Art, media and exchange for the whole young person"
        intro="We don't treat young people as case studies. We train them, trust them with real responsibility and help them take their place in the creative economy."
      />
      <section className="bg-cream-50">
        <Container className="py-24">
          <ul className="grid gap-6 md:grid-cols-3">
            {pillars.map(({ Icon, title, text }, i) => (
              <Reveal as="li" key={title} delay={i * 90}>
                <div className="h-full rounded-3xl border border-sand-200 bg-white p-8">
                  <span className="grid size-12 place-items-center rounded-2xl bg-mustard-100 text-mustard-600">
                    <Icon className="size-6" />
                  </span>
                  <h2 className="mt-6 font-display text-2xl font-bold text-cocoa-900">{title}</h2>
                  <p className="mt-3 leading-relaxed text-muted">{text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>
      <section className="bg-sand-100">
        <Container className="py-24">
          <SectionHeading
            eyebrow="Sustainable Development Goals"
            title="Individual growth, wider transformation"
            intro="By integrating the SDGs into our empowerment agenda, young people don't just gain skills, they take part in their communities' economic and social development."
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {goals.map((goal, i) => (
              <Reveal as="li" key={goal.number} delay={i * 60}>
                <div className="flex h-full gap-5 rounded-2xl bg-white p-6">
                  <span className="font-display text-4xl font-extrabold text-mustard-500">{goal.number}</span>
                  <div>
                    <p className="font-display font-bold text-cocoa-900">SDG {goal.number} · {goal.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{goal.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>
      <DonateBanner />
    </>
  );
}
