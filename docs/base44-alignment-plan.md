# Aligning the Next.js site with the Base44 build

Source: screen recording of `app.base44.com/apps/6a8fcc30ee0f8ebb54b65301` (97s,
2 October 2026). Frames extracted to `scratch/b44-frames/` by
`scratch/extract-frames.py`. The Base44 preview itself needs a login, so this
plan is written from the recording.

## The headline

The two are the **same site built twice**, not two different sites. Same brand,
same nav, same section order on the home page, same copy in most places. Every
difference below is presentation detail, a routing choice, or a content
discrepancy — none of it is structural.

So this is a styling-and-detail pass, not a rebuild.

## Already done (2 October 2026)

- **Studio bookings** route to NaiWave's Goldie page. The Base44 build does the
  same thing via a "Book NaiWave Podcast" tile — see item 4 below for the one
  piece still missing.
- **Photographs.** The Base44 build uses the same real photographs Nafsi
  supplied in `NAFSI PICTURES.zip`; those are now in `public/images/`. The
  acrobat-lift-sky shot the Base44 "Who we are" section uses is our `one.jpeg`;
  the Tangaza phone shot is our `tangaza-lab.jpg` / `creator-camera.jpg`.

## Do not copy

- **The global map.** Base44 renders it with Leaflet on a Carto basemap and it
  is visibly broken — the tiles read "API KEY REQUIRED" across the whole
  section, on both the home page and `/about`. Our `GlobalConnections` draws a
  self-contained SVG world map with no key and no third-party request. Keep
  ours.
- **The inconsistent numbers.** Base44's home page says Tangaza reached **208**
  young people; its `/programmes` page says **255**. Its home stats say **5**
  community training centres while our `centres` list has six (Kariobangi,
  Babadogo, Kibera, Dagoretti, Kivuli, Glad Kids School). Nafsi needs to settle
  both figures before either site ships — do not just copy one.
- **"From 2002 to a global creative hub"** over a timeline whose first milestone
  is 2010. Both builds have this; both are wrong. Fix it here rather than
  matching it.

---

## Home page

### 1. Hero — the biggest visual difference

| | Base44 | Here |
| --- | --- | --- |
| Layout | Full-bleed photo, content left, nothing right | Split: copy left, dark glass programme card right |
| Photo | Children on stage, warm purple grade | Generated stock acrobat at sunset |
| Badge | Circular Nafsi logo mark, top right over the photo | — |
| Eyebrow | Rule + `NAFSI PAMOJA · NAIROBI, KENYA · SINCE 2010` | `Nafsi Pamoja · Nairobi, Kenya` |
| H1 | "Creativity can" (cream) / "change lives." (mustard) | Same two-tone treatment |
| CTAs | Donate now (mustard) · ▶ Discover our work (outline) · Get involved (outline) | Explore programmes · Support a young person |
| Below CTAs | `SCROLL ↓` hint, centred | Three-item value checklist |

Work: drop the right-hand programme card, widen the copy column, add the
circular logo badge and the scroll hint, add the third CTA. **Blocked on a real
hero photograph** — none of the six supplied photos is wide or high-resolution
enough for a full-bleed hero (needs ~2560px wide). Ask Nafsi for the stage photo
the Base44 build uses.

### 2. Impact stats

Base44 lays the four stats in a row divided by vertical rules, each with the
icon above the number and a one-line footnote under the label ("Nafsi Pamoja was
founded in Nairobi in 2010."). Ours is close; add the footnotes and the
dividers.

### 3. "Who we are" badge

Base44 puts the `16+ years of community impact in Nairobi` badge as a **solid
mustard card overlapping the bottom-left corner of the photo**. Ours is a
white/glass card. Swap to the mustard treatment — it is stronger against the
sky photo now in that slot.

### 4. Programmes grid — includes the studio booking tile

Base44: heading "Seven pathways from creativity to opportunity", **no filter
pills**, a plain 3-column grid of 8 tiles.

Programme tile anatomy:
- Photo on top, mustard circular icon badge top-left over it
- Small uppercase tag at the bottom of the photo (`TALENT · CONFIDENCE · LIVELIHOODS`)
- White body: title + `↗` on the same row, then the summary
- No "Explore programme" link — the whole card is the link

The **8th tile is the booking entry point**: a dark card over a podcast photo,
mustard calendar badge, title "Book NaiWave Podcast", body "Record your episode
in the NaiWave studio — pick a slot and book your podcast session in minutes.",
and a `Book a session ↗` CTA. That tile should link to
`https://book.heygoldie.com/0a8fc8b28078` (or to `/get-involved/book-studio`,
which now forwards there).

Work: add the booking tile to the grid, restyle the cards, and decide whether to
keep our filter pills. **Recommendation: keep the pills.** They are a genuine
improvement over the flat grid and cost nothing.

### 5. Creators spotlight

Base44 puts the caption **below** the photo on the dark background with a
mustard "Creator spotlight" pill overlapping the photo's bottom edge. Ours
stacks both inside a gradient overlay on the photo. Base44's reads better —
move the caption out.

### 6. Videos

Base44: one full-width featured player, then a single row of four thumbnails.
Ours: large player left, 2×2 grid right. Low priority; either works.

### 7. Follow the journey

Base44 has **five** social pills — Instagram, Facebook, TikTok, YouTube
(NaiWave), **NaiWave Instagram** — and two photo tiles (a dancer, a studio
session). We have four pills and both tiles are still generated stock. Add the
fifth pill. The tiles are blocked on real photos.

### 8. Donate banner

Base44: full-bleed **solid mustard** band, dark cocoa text, white "Donate now"
and an outline "Join the journey". Ours: dark cocoa with a photo at 25% opacity.
Base44's is the stronger break in the page rhythm — switch.

### 9. Newsletter

Base44: dark band, `STAY CONNECTED` eyebrow, three-line heading left, email
field + consent checkbox + full-width mustard Subscribe button right. Check ours
matches, including the consent checkbox wording ("I agree to receive updates
from Nafsi Africa and accept the privacy policy.").

### 10. Footer

Base44: four columns — brand blurb + five social icons, Programmes, Get
Involved, Contact (address, email, phone, **Donate now** button) — then a bottom
bar with copyright left and Impact & Transparency / Privacy Policy /
Safeguarding / Terms right. "Book the Studio" sits in the Get Involved column.
Check ours matches.

---

## Other pages

### `/programmes`

Base44 abandons the card grid entirely: a dark hero ("PROGRAMMES" eyebrow,
"Seven pathways from creativity to opportunity"), then one **alternating
two-column row per programme** — photo one side, text the other — with
checkmark tag pills (`✓ Smartphone filmmaking`) and two CTAs per row ("Explore
Tangaza →" and "Support this").

This is a real difference and the alternating rows read well at this programme
count. Worth adopting.

### `/stories`

Dark hero, then a filter pill row immediately under it (All, From the Community,
Youth Voices, Artist Stories, Tangaza Stories, …, Nafsi Alumni). Close to ours.

### Journal

Base44 serves it at **`/journal`**; we serve `/stories/journal`. Base44's hero is
dark with a SHARE row (comment, Facebook, Twitter, LinkedIn, copy-link) and a
wide category pill row: All, Youth, Arts, Digital Media, Community, Culture,
Global Stay Tours, Tangaza, NaiWave, Opportunities, News.

Decision needed: move the route, or add a redirect. **Recommendation: keep
`/stories/journal`** (it nests correctly under Stories) and add the share row
and the category pills.

### `/events`

Dark hero, then a **row-style list** rather than cards: date chip (day over
month) on the left, type tag + title + summary in the middle, "Details soon" on
the right, and a meta line with date, time and venue. Ours uses cards. Base44's
list is tighter for a short event list.

### `/about`

Dark hero, "ABOUT NAFSI" eyebrow, H1 "A Nairobi community organization with a
creative soul". Then "WHAT WE DO — Seven pathways…" reusing the home programme
grid, the global map section, and the timeline.

### Route differences

Base44 links to `/stories#videos` and `/programmes#naiwave` (anchors on index
pages); we have real pages at `/stories/videos` and `/programmes/naiwave`. Ours
is better for SEO and sharing. Keep ours.

---

## Suggested order

1. **Donate banner → solid mustard** and **"Who we are" badge → mustard card.**
   Two small changes, biggest visual payoff.
2. **Programme card restyle + the "Book NaiWave Podcast" tile.** Completes the
   studio-booking routing that is otherwise done.
3. **`/programmes` alternating rows.**
4. **Creators spotlight caption, fifth social pill, impact stat footnotes.**
5. **`/events` row list.**
6. **Journal share row and category pills.**
7. **Hero rebuild** — last, because it is blocked on a photograph.

## Open questions for Nafsi

- A full-width hero photograph, 2560px or wider (the stage shot in the Base44
  build would do).
- Real NaiWave Studios interiors — `naiwave.jpg` and `podcast-tall.jpg` are
  still generated stock, and the Base44 build has real ones.
- Five community training centres or six?
- Tangaza: 208 young people or 255?
- The timeline heading says 2002; the first milestone is 2010.
