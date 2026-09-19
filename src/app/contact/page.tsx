import { Clock, Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ContactForm } from "@/components/contact-form";
import { SocialIcons } from "@/components/sections";
import { Reveal } from "@/components/reveal";
import { Container, PageHero } from "@/components/ui";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Questions, partnerships, bookings or just curiosity? Get in touch with Nafsi Africa in Nairobi.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk"
        intro="Questions, partnerships, bookings or just curiosity, we'd love to hear from you."
      />
      <section className="bg-cream-50">
        <Container className="grid items-start gap-12 py-20 md:grid-cols-2">
          <Reveal>
            <ul className="space-y-7">
              <ContactItem icon={<MapPin className="size-5" />} label="Visit us">
                {site.address}
                <br />
                {site.poBox}
              </ContactItem>
              <ContactItem icon={<Mail className="size-5" />} label="Email">
                <a href={`mailto:${site.email}`} className="inline-block py-1 text-mustard-600 hover:text-cocoa-900">
                  {site.email}
                </a>
              </ContactItem>
              <ContactItem icon={<Phone className="size-5" />} label="Call">
                <a href={site.phoneHref} className="inline-block py-1 text-mustard-600 hover:text-cocoa-900">
                  {site.phone}
                </a>
              </ContactItem>
              <ContactItem icon={<Clock className="size-5" />} label="Studio bookings">
                To hire the NaiWave podcast studio, call {site.phone}.
              </ContactItem>
            </ul>
            <p className="mt-10 text-sm font-bold uppercase tracking-[0.14em] text-cocoa-900">Follow</p>
            <SocialIcons className="mt-3" />
          </Reveal>
          <Reveal delay={120}>
            <ContactForm />
          </Reveal>
        </Container>
      </section>
    </>
  );
}

function ContactItem({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <li className="flex gap-4">
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-mustard-100 text-mustard-600">{icon}</span>
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-cocoa-900">{label}</p>
        <p className="mt-1 leading-relaxed text-cocoa-800">{children}</p>
      </div>
    </li>
  );
}
