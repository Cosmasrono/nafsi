import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy"
      title="Privacy Policy"
      sections={[
        {
          heading: "What we collect",
          paragraphs: [
            "When you contact us, subscribe to updates, request a booking or donate, we collect the details you give us — such as your name, email, phone number, organization and message.",
            "Payments are processed by our payment provider. We never see or store your full card or M-Pesa PIN details.",
          ],
        },
        {
          heading: "How we use it",
          paragraphs: [
            "We use your information only to reply to you, process donations, send updates you have agreed to receive and meet our legal obligations under Kenya's Data Protection Act, 2019.",
            "We do not sell or rent your personal data.",
          ],
        },
        {
          heading: "Your choices",
          paragraphs: [
            "You can unsubscribe from updates at any time, and you can ask us to access, correct or delete the information we hold about you.",
          ],
        },
        {
          heading: "Photos of children and young people",
          paragraphs: [
            "Images and stories of participants are shared only with consent, following our safeguarding policy.",
          ],
        },
      ]}
    />
  );
}
