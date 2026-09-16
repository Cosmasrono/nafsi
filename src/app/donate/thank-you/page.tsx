import { CircleCheck, CircleAlert } from "lucide-react";
import type { Metadata } from "next";
import { SocialPills } from "@/components/sections";
import { ButtonLink, Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false },
};

async function verifyPayment(reference: string) {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) return null;
  try {
    const res = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      headers: { Authorization: `Bearer ${secret}` },
      cache: "no-store",
    });
    const json = (await res.json()) as { data?: { status: string; amount: number; currency: string } };
    return json.data ?? null;
  } catch {
    return null;
  }
}

export default async function ThankYouPage({ searchParams }: { searchParams: Promise<{ reference?: string | string[] }> }) {
  const { reference } = await searchParams;
  const payment = typeof reference === "string" ? await verifyPayment(reference) : null;
  const failed = payment && payment.status !== "success";

  return (
    <section className="bg-cream-50">
      <Container className="max-w-2xl py-28 text-center">
        {failed ? (
          <>
            <CircleAlert className="mx-auto size-14 text-mustard-600" />
            <h1 className="mt-6 font-display text-5xl font-extrabold tracking-tight">Payment not completed</h1>
            <p className="mt-5 text-lg text-muted">Your payment didn&apos;t go through. No money was taken — you can try again.</p>
            <ButtonLink href="/donate" className="mt-8">
              Try again
            </ButtonLink>
          </>
        ) : (
          <>
            <CircleCheck className="mx-auto size-14 text-mustard-500" />
            <h1 className="mt-6 font-display text-5xl font-extrabold tracking-tight">Asante sana!</h1>
            <p className="mt-5 text-lg text-muted">
              {payment
                ? `Your gift of ${payment.currency} ${(payment.amount / 100).toLocaleString("en-KE")} was received.`
                : "Thank you for supporting Nafsi Africa."}{" "}
              You&apos;re helping young people in Nairobi turn creativity into opportunity.
            </p>
            <div className="mt-10 flex justify-center">
              <SocialPills />
            </div>
            <ButtonLink href="/stories" variant="outline" className="mt-8">
              Read stories of change
            </ButtonLink>
          </>
        )}
      </Container>
    </section>
  );
}
