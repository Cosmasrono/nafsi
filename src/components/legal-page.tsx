import { Container, PageHero } from "./ui";
import { site } from "@/lib/content";

export type LegalSection = { heading: string; paragraphs: string[] };

export function LegalPage({ eyebrow, title, sections }: { eyebrow: string; title: string; sections: LegalSection[] }) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} intro={`Last updated September 2026 · ${site.legalName}`} />
      <section className="bg-cream-50">
        <Container className="max-w-3xl py-20">
          {/* TODO: have the Nafsi board review this policy before launch. */}
          {sections.map((section) => (
            <div key={section.heading} className="mb-10">
              <h2 className="font-display text-2xl font-bold text-cocoa-900">{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="mt-3 leading-relaxed text-cocoa-800">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
          <p className="rounded-2xl bg-sand-100 p-5 text-sm text-muted">
            Questions about this policy? Email <a href={`mailto:${site.email}`} className="font-semibold text-mustard-600">{site.email}</a>.
          </p>
        </Container>
      </section>
    </>
  );
}
