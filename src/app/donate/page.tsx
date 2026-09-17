import { Smartphone } from "lucide-react";
import type { Metadata } from "next";
import { DonateForm } from "@/components/donate-form";
import { Reveal } from "@/components/reveal";
import { Container, Eyebrow, PageHero } from "@/components/ui";
import { programmes } from "@/lib/content";

export const metadata: Metadata = {
  title: "Donate",
  description: "Give once or monthly to help young people in Nairobi discover talent, build skills and see a different future.",
};

const impact = [
  "Keeps weekly training running at five community centres",
  "Pays trainers and mentors who show up for young people every week",
  "Equips Tangaza filmmakers and NaiWave hosts with the tools they need",
  "Opens the world to young people through Global Stay Tours",
];

export default async function DonatePage({ searchParams }: { searchParams: Promise<{ programme?: string | string[] }> }) {
  const { programme } = await searchParams;
  const defaultProgramme =
    typeof programme === "string" && programmes.some((p) => p.slug === programme) ? programme : "where-needed";

  return (
    <>
      <PageHero
        eyebrow="Donate"
        title="Art becomes confidence. Confidence becomes change."
        intro="Your support creates a safe space where a young person can discover talent, develop skills and see a different future."
      />
      <section className="bg-sand-100">
        <Container className="grid items-start gap-12 py-20 lg:grid-cols-[5fr_6fr]">
          <Reveal>
            <Eyebrow>What your gift does</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">Every shilling reaches the programmes</h2>
            <ul className="mt-8 space-y-4">
              {impact.map((line) => (
                <li key={line} className="flex gap-3 text-lg text-cocoa-800">
                  <span className="mt-2.5 size-2 shrink-0 rounded-full bg-mustard-500" />
                  {line}
                </li>
              ))}
            </ul>
            <div className="mt-10 rounded-3xl bg-cocoa-900 p-7 text-cream-50">
              <p className="flex items-center gap-2 font-display text-lg font-bold">
                <Smartphone className="size-5 text-mustard-500" />
                Give with M-Pesa
              </p>
              {/* TODO: add Nafsi's M-Pesa Paybill and account number once confirmed. */}
              <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-cream-50/60">Paybill</dt>
                  <dd className="mt-1 font-display text-xl font-bold text-mustard-400">Coming soon</dd>
                </div>
                <div>
                  <dt className="text-cream-50/60">Account</dt>
                  <dd className="mt-1 font-display text-xl font-bold text-mustard-400">NAFSI</dd>
                </div>
              </dl>
              <p className="mt-4 text-xs text-cream-50/60">Or use the form. Checkout supports M-Pesa and card payments.</p>
            </div>
          </Reveal>
          <Reveal delay={120} className="rounded-3xl border border-sand-200 bg-white p-6 shadow-xl shadow-cocoa-900/5 sm:p-8">
            <DonateForm defaultProgramme={defaultProgramme} />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
