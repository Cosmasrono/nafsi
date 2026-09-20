# Nafsi Africa website

Next.js 16 (App Router) + Tailwind CSS 4 rebuild of the Nafsi Africa site for Nafsi Pamoja Organization, Nairobi.

## Run it

```bash
npm install
cp .env.example .env.local   # optional — everything works without keys
npm run dev
```

Open http://localhost:3000.

## What's inside

| Area | Routes |
| --- | --- |
| Home | `/` |
| About | `/about`, `/about/story`, `/about/approach`, `/about/partners`, `/about/impact` |
| Programmes | `/programmes`, `/programmes/[slug]` (6 programmes) |
| Stories | `/stories` (filterable), `/stories/[slug]`, `/stories/youth-voices`, `/stories/videos`, `/stories/journal` |
| Get involved | `/get-involved`, `/get-involved/[type]` (volunteer, partner, sponsor, book-performance, book-studio) |
| Donate | `/donate`, `/donate/thank-you` |
| Other | `/events`, `/contact`, `/privacy`, `/safeguarding`, `/terms`, `sitemap.xml`, `robots.txt` |

- **Content** — all copy, programmes, stories, events, partners and contacts live in `src/lib/content.ts`. Search for `TODO` to find items Nafsi must confirm (social links, story copy, event details, policies).
- **Forms** — contact, get-involved, bookings and newsletter use Server Actions (`src/app/actions.ts`) with validation and a honeypot. Set `RESEND_API_KEY` + `NOTIFY_EMAIL` to receive them by email; otherwise they are appended to `.data/submissions.jsonl`.
- **Donations** — donations are processed securely through PayPal. Pledges made via the direct donation form are saved locally or sent to email.
- **Images** — community, Tangaza, GST and youth photos now use larger assets from Nafsi's website; video thumbnails use the matching YouTube originals. See `public/images/SOURCES.md`. The dance, NaiWave, creator and portrait crops still need full-resolution originals; enlarging those files cannot restore missing detail.

## Deploy

Deploy to Vercel (or any Node host), add the environment variables and point `nafsiafrica.org` at it.
