import { ButtonLink, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="bg-cocoa-900 text-cream-50">
      <Container className="py-32 text-center">
        <p className="font-display text-7xl font-extrabold text-mustard-500 sm:text-8xl">404</p>
        <h1 className="mt-4 font-display text-3xl font-bold sm:text-4xl">This page has danced off stage</h1>
        <p className="mt-4 text-cream-50/70">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <ButtonLink href="/" className="mt-8">
          Back to home
        </ButtonLink>
      </Container>
    </section>
  );
}
