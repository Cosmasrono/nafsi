import { Mail, Phone } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InvolveForm } from "@/components/involve-form";
import { InvolvementIcon } from "@/components/involvement-icon";
import { Reveal } from "@/components/reveal";
import { Container, PageHero } from "@/components/ui";
import { involvementTypes, site, type InvolvementType } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(involvementTypes).map((type) => ({ type }));
}

type Props = { params: Promise<{ type: string }> };

function getType(type: string) {
  return type in involvementTypes ? (type as InvolvementType) : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const type = getType((await params).type);
  return type ? { title: involvementTypes[type].title, description: involvementTypes[type].text } : {};
}

const steps = ["Send us your request using the form.", "A member of the Nafsi team replies within two working days.", "We agree the details together and get started."];

export default async function InvolvementPage({ params }: Props) {
  const type = getType((await params).type);
  if (!type) notFound();
  const item = involvementTypes[type];

  return (
    <>
      <PageHero eyebrow={`Get involved · ${item.title}`} title={item.heading} intro={item.text} />
      <section className="bg-sand-100">
        <Container className="grid items-start gap-12 py-20 md:grid-cols-[2fr_3fr]">
          <Reveal>
            <span className="grid size-14 place-items-center rounded-2xl bg-mustard-500 text-cocoa-900">
              <InvolvementIcon name={item.icon} className="size-6" />
            </span>
            <h2 className="mt-6 font-display text-2xl font-bold text-cocoa-900">What happens next</h2>
            <ol className="mt-5 space-y-4">
              {steps.map((step, i) => (
                <li key={step} className="flex gap-4">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-cocoa-900 font-display text-sm font-bold text-mustard-500">
                    {i + 1}
                  </span>
                  <span className="pt-1 text-cocoa-800">{step}</span>
                </li>
              ))}
            </ol>
            <div className="mt-10 space-y-3 rounded-2xl bg-white p-6 text-sm">
              <p className="font-semibold text-cocoa-900">Prefer to talk?</p>
              <a href={site.phoneHref} className="flex items-center gap-2 py-1.5 text-cocoa-800 hover:text-mustard-600">
                <Phone className="size-4 text-mustard-600" />
                {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="flex items-center gap-2 py-1.5 text-cocoa-800 hover:text-mustard-600">
                <Mail className="size-4 text-mustard-600" />
                {site.email}
              </a>
            </div>
            <Link href="/get-involved" className="mt-4 inline-block py-2 text-sm font-semibold text-mustard-600 hover:text-cocoa-900">
              ← All ways to get involved
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <InvolveForm type={type} />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
