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
- **Studio bookings** — `/get-involved/book-studio` does not collect a form. It lists NaiWave's services, rates, hours and terms from `studioBooking` in `src/lib/content.ts` and hands the booking to NaiWave's Goldie page at https://book.heygoldie.com/0a8fc8b28078. Keep the rates in sync with that page.
- **Forms** — contact, get-involved, bookings and newsletter use Server Actions (`src/app/actions.ts`) with validation and a honeypot. Set `RESEND_API_KEY` + `NOTIFY_EMAIL` to receive them by email; otherwise they are appended to `.data/submissions.jsonl`.
- **Donations** — donations are processed securely through PayPal. Pledges made via the direct donation form are saved locally or sent to email.
- **Images** — the performing-arts, community, Tangaza and creator slots use Nafsi's own photographs (processed by `scratch/process-photos.py`); programme and video shots use larger assets from Nafsi's website and YouTube. See `public/images/SOURCES.md`. The hero and the two NaiWave studio crops are still generated stock and need real full-resolution originals.

## Deploy

Deploy to Vercel (or any Node host), add the environment variables and point `nafsiafrica.org` at it.

## Latest YouTube uploads

The homepage and `/stories/videos` load the 5 newest public uploads from NaiWave (`UCxdaiu7u2n8wsdEsCTKgobQ`), ordered by publication date. The server reads YouTube’s public Atom feed; no API key is needed. Next.js revalidates the feed and pages every 300 seconds when visited, so updates require no rebuild. Upload dates replace the old hard-coded durations. If the feed cannot be loaded, the section links to the channel rather than presenting the old curated videos as latest. The host must allow outbound HTTPS to YouTube.

Feed reference: https://developers.google.com/youtube/v3/guides/push_notifications

Parser checks: `node --experimental-strip-types --test tests/youtube-feed.test.mjs`.
