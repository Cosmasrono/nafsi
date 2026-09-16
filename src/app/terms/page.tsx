import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Terms" };

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Terms"
      title="Terms of use"
      sections={[
        {
          heading: "Using this website",
          paragraphs: [
            "This website is provided by Nafsi Pamoja Organization to share information about our work. By using it you agree to use it lawfully and respectfully.",
          ],
        },
        {
          heading: "Content",
          paragraphs: [
            "Photos, videos and stories on this site belong to Nafsi Africa, our participants or our partners. Please ask before reusing them.",
          ],
        },
        {
          heading: "Donations",
          paragraphs: [
            "Donations support Nafsi's programmes. If you believe a donation was made in error, contact us within 14 days and we will review it.",
          ],
        },
      ]}
    />
  );
}
