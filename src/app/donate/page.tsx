import { Heart, Mail, Phone, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { DonateForm, donationPurposes } from "@/components/donate-form";
import { Reveal } from "@/components/reveal";
import { Container } from "@/components/ui";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Your support helps create a safe space where a young person can discover talent, develop skills and see a different future. Give once, or give monthly.",
};

const impactTiers = [
  {
    amount: "$25",
    description: "helps stock a community training session with materials.",
  },
  {
    amount: "$50",
    description: "can put a smartphone in the hands of a Tangaza trainee.",
  },
  {
    amount: "$100",
    description: "supports a young person through a workshop cycle.",
  },
  {
    amount: "$250",
    description: "helps sustain a trainer at a community centre.",
  },
];

export default async function DonatePage({
  searchParams,
}: {
  searchParams: Promise<{ programme?: string | string[] }>;
}) {
  const { programme } = await searchParams;
  const defaultProgramme =
    typeof programme === "string" && donationPurposes.some((p) => p.slug === programme)
      ? programme
      : "where-needed";

  return (
    <>
      {/* YELLOW HERO BANNER */}
      <section className="bg-mustard-500 py-14 sm:py-20">
        <Container>
          <Reveal>
            <p className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-cocoa-950/80">
              — DONATE
            </p>
            <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-cocoa-950 sm:text-6xl md:text-7xl leading-[1.06]">
              Your support
              <br />
              creates
              <br />
              opportunity
            </h1>
            <p className="mt-5 max-w-xl text-sm font-medium leading-relaxed text-cocoa-950/90 sm:text-base md:text-lg">
              Your support helps create a safe space where a young person can discover talent, develop
              skills and see a different future. Give once, or give monthly.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* TWO-COLUMN DONATION SECTION */}
      <section className="bg-[#fbf8f4] py-12 sm:py-16">
        <Container className="grid items-start gap-8 lg:grid-cols-[1.28fr_0.72fr]">
          {/* LEFT: DONATE FORM CARD */}
          <Reveal className="rounded-[2rem] border border-sand-200/80 bg-white p-6 shadow-xl shadow-cocoa-900/5 sm:p-8">
            <DonateForm defaultProgramme={defaultProgramme} />
          </Reveal>

          {/* RIGHT: THREE STACKED INFORMATION CARDS */}
          <div className="space-y-6">
            {/* CARD 1: WHAT YOUR SUPPORT ENABLES */}
            <Reveal delay={80} className="rounded-[2rem] bg-[#efe8de] p-6 sm:p-7 shadow-sm">
              <h3 className="font-display text-lg font-bold text-cocoa-950">
                What your support enables
              </h3>

              <div className="mt-5 space-y-4">
                {impactTiers.map((tier) => (
                  <div key={tier.amount} className="flex items-center gap-3.5">
                    <span className="flex h-8 min-w-14 items-center justify-center rounded-full bg-mustard-500 px-3 text-xs font-black tracking-tight text-cocoa-950 shadow-sm shrink-0">
                      {tier.amount}
                    </span>
                    <p className="text-xs sm:text-sm font-medium leading-snug text-cocoa-800">
                      {tier.description}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-6 border-t border-sand-200/80 pt-4 text-[0.72rem] leading-relaxed text-muted">
                Examples are illustrative. Verified bookings are confirmed with Nafsi before publication.
              </p>
            </Reveal>

            {/* CARD 2: SECURE & TRANSPARENT */}
            <Reveal
              delay={140}
              className="rounded-[2rem] border border-sand-200/80 bg-white p-6 sm:p-7 shadow-sm"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-5 text-mustard-500" />
                <h3 className="font-display text-lg font-bold text-cocoa-950">
                  Secure & transparent
                </h3>
              </div>

              <p className="mt-3 text-xs sm:text-sm leading-relaxed text-cocoa-800">
                Your details are stored securely. A Nafsi team member follows up with secure payment
                options — PayPal, card or bank transfer. You receive a confirmation, and your giving is
                reflected in our public impact reporting.
              </p>

              <div className="mt-5 space-y-2.5 border-t border-sand-200/70 pt-4 text-xs sm:text-sm">
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-2 font-medium text-cocoa-800 transition-colors hover:text-mustard-600"
                >
                  <Mail className="size-4 text-mustard-500 shrink-0" />
                  <span>{site.email}</span>
                </a>
                <a
                  href={site.phoneHref}
                  className="flex items-center gap-2 font-medium text-cocoa-800 transition-colors hover:text-mustard-600"
                >
                  <Phone className="size-4 text-mustard-500 shrink-0" />
                  <span>{site.phone}</span>
                </a>
              </div>
            </Reveal>

            {/* CARD 3: PREFER TO GIVE ANOTHER WAY? */}
            <Reveal
              delay={200}
              className="rounded-[2rem] bg-cocoa-950 p-6 sm:p-7 text-cream-50 shadow-sm"
            >
              <Heart className="size-5 text-mustard-400" />
              <h3 className="mt-3 font-display text-lg font-bold text-cream-50">
                Prefer to give another way?
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-cream-50/70 leading-relaxed">
                Sponsor a programme, a centre or a trainer — or partner with us.
              </p>
              <Link
                href="/get-involved/sponsor"
                className="mt-4 inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-mustard-400 hover:text-mustard-300 underline underline-offset-4"
              >
                Explore options →
              </Link>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
