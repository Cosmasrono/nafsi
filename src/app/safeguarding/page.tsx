import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Safeguarding" };

export default function SafeguardingPage() {
  return (
    <LegalPage
      eyebrow="Safeguarding"
      title="Keeping every young person safe"
      sections={[
        {
          heading: "Our commitment",
          paragraphs: [
            "Nafsi works with children and young people from vulnerable communities. Their safety and dignity come before any programme, performance or story.",
          ],
        },
        {
          heading: "Staff, trainers and volunteers",
          paragraphs: [
            "Everyone who works with participants is vetted, agrees to our code of conduct and receives safeguarding guidance.",
          ],
        },
        {
          heading: "Consent and storytelling",
          paragraphs: [
            "We ask for informed consent — from parents or guardians for minors — before sharing photos, videos or stories. Participants can withdraw consent at any time.",
          ],
        },
        {
          heading: "Raising a concern",
          paragraphs: [
            "If you are worried about the safety of a child or young person connected to Nafsi, contact us immediately at info@nafsiafrica.org or +254 748 501 458. In an emergency, call Childline Kenya on 116.",
          ],
        },
      ]}
    />
  );
}
