import { Heart, Mail, ShieldCheck } from "lucide-react";
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
    <div className="flex min-h-[calc(100vh-5rem)] flex-col justify-center bg-[#fbf8f4] py-10 sm:py-16">
      <Container className="mx-auto max-w-xl">
        {/* COMPACT INTRO HEADER */}
        <Reveal className="mb-8 text-center">
          <p className="text-xs font-black uppercase tracking-widest text-mustard-600">
            — Support Nafsi Africa —
          </p>
          <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-cocoa-950 sm:text-4xl">
            Your support creates opportunity
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-cocoa-800">
            Help young people in Nairobi discover talent, develop skills and build a different future. Give once, or give monthly.
          </p>
        </Reveal>

        {/* DONATION CARD (COMPACT, COVERS HALF PAGE, CENTERED) */}
        <Reveal delay={60} className="mx-auto w-full rounded-3xl border border-sand-200/90 bg-white p-5 sm:p-7 shadow-xl shadow-cocoa-900/5">
          <DonateForm defaultProgramme={defaultProgramme} />
        </Reveal>

        {/* COMPACT TRUST & WAYS TO GIVE */}
        <Reveal delay={120} className="mx-auto mt-6 w-full rounded-2xl border border-sand-200/80 bg-white/70 p-4 text-center text-xs text-cocoa-800 shadow-sm">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <ShieldCheck className="size-4 text-mustard-600" />
              Secure PayPal Checkout
            </span>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-1 font-medium transition-colors hover:text-mustard-600"
            >
              <Mail className="size-3.5 text-mustard-600" />
              {site.email}
            </a>
            <Link
              href="/get-involved/sponsor"
              className="inline-flex items-center gap-1 font-bold text-mustard-600 hover:text-mustard-700 underline underline-offset-2"
            >
              <Heart className="size-3.5" />
              Sponsor a programme
            </Link>
          </div>
        </Reveal>
      </Container>
    </div>
  );
}
