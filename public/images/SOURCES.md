# Media sources

Updated 2026-09-19. Programme photos were retrieved from Nafsi Africa's existing website at https://www.nafsiafrica.org/ (2000px versions, preserving aspect ratio). Community uses the same photograph as before; Tangaza, GST and youth use programme photographs in place of the small design crops.

| Local file | Original source |
| --- | --- |
| community-hd.jpg | https://static.wixstatic.com/media/942e2d_98ff94ff9a1e446e8d1a53863f65a80e~mv2.jpg |
| tangaza-hd.jpg | https://static.wixstatic.com/media/942e2d_c82b5567ad3742a0a0c64281faea434a~mv2.jpeg |
| tangaza-session.jpg | User-provided IMG_8676.JPG.jpeg; now used for Tangaza on Smartphone |
| gst-hd.jpg | https://static.wixstatic.com/media/942e2d_0436765d76b84230b08fd7a44d167289~mv2.jpg |
| youth-hd.jpg | https://static.wixstatic.com/media/942e2d_fbda8e297a8742249ca029d173b31b6d~mv2.jpeg |
| video-main-hd.jpg | https://i.ytimg.com/vi/WAEEA5t-wNs/maxresdefault.jpg |
| video-1-hd.jpg | https://i.ytimg.com/vi/xkMq-bYMTFI/maxresdefault.jpg |
| video-2-hd.jpg | https://i.ytimg.com/vi/Us37EUGXltY/maxresdefault.jpg |
| video-3-hd.jpg | https://i.ytimg.com/vi/VgMaakoms9M/maxresdefault.jpg |
| video-4-hd.jpg | https://i.ytimg.com/vi/h_roaAxRJcs/maxresdefault.jpg |
| mazingira.jpg | User-provided Mazingira climate action performance photograph |
| outreach-bus.jpg | User-provided community outreach excursion bus photograph |
| youth-movement.jpg | User-provided outdoor procession of Nafsi youth and leaders; used for Nafsi Alumni story |
| tangaza-lab.jpg | User-provided video/digital media editing computer session; used for Tangaza cohort story |
| creator-camera.jpg | User-provided young creator with Canon DSLR camera; used for Creator Spotlight |
| community-mentor.jpg | User-provided Nafsi mentor with school children; used for Community Centres story |

All five video IDs were checked against YouTube's oEmbed endpoint, including matching the episode titles and NaiWave channel. The first four were sourced from https://www.nafsiafrica.org/services-3 and the fifth from https://www.youtube.com/@Naiwave/search?query=silent. Thumbnails are 1280 × 720 pixels.

Remaining small design crops: dance-tall.jpg, naiwave.jpg, and podcast-tall.jpg. Replace these with the corresponding full-resolution originals when available. Use at least 1600–2000px-wide source photos for large desktop panels, and a 2560px-wide or larger original for a full-width hero. Do not upscale small crops and expect additional detail.

## Nafsi photographs added 2 October 2026

Supplied by Nafsi as `NAFSI PICTURES.zip`. Each one replaced a generated stock
image or a small crop. They came off WhatsApp, so `scratch/process-photos.py`
crops them to the aspect the slot renders at, resamples with LANCZOS (never
more than 1.6x), unsharp-masks and re-encodes at 4:4:4. Re-run that script if
the originals are ever re-supplied at higher resolution. The files they replaced
are in `lowres-backup/`.

| Local file | Original | Shows | Size |
| --- | --- | --- | --- |
| one.jpeg | IMG-20230316-WA0003 | An acrobat lifting a child overhead against the sky | 1200 x 1600 |
| dance.jpg, dance-hd.jpg | IMG-20230513-WA0005 | A young acrobat in the splits while her group watches | 1280 x 960 |
| community-hd.jpg, community.jpg | IMG-20221201-WA0003 | Children singing in face paint and costume | 1280 x 853 |
| tangaza-lab.jpg | IMG-20221007-WA0006 | Three young creators round a phone | 1500 x 844 |
| creator-camera.jpg | IMG-20221007-WA0009 | Two young creators reviewing footage on a phone | 1500 x 1125 |
| acrobats-pyramid.jpg | IMG-20210928-WA0016 | The troupe holding a pyramid in Nafsi kit (photo: Jose Contez) | 750 x 1000 |

Still generated stock, still waiting on real Nafsi photographs: `hero.jpg` /
`hero-hd.jpg` (needs a 2560px-wide original), `naiwave.jpg` / `naiwave-hd.jpg`
and `podcast-tall.jpg` (both need real NaiWave Studios interiors).

## Second batch, placed to match the Base44 build (2 October 2026)

Twenty more photographs, kept in `scratch/new-photos-2/` and processed by
`scratch/process-photos-2.py` (same treatment as above). Slots follow the Base44
walkthrough recorded that morning: where Base44 shows one of these photos, it
goes in the same slot here. This supersedes the "still generated stock" note
above for `hero.jpg`, `naiwave*.jpg` and `podcast-tall*.jpg`.

| Slot | Local file | Source |
| --- | --- | --- |
| Home hero | hero.jpg, hero-hd.jpg | 20.jpg, three kids in Nafsi tees under the big top (1600 x 900; still not 2560px) |
| Home "Who we are" | one.jpeg | from the first batch, as Base44 |
| Outreach programme | outreach.jpg | 3.jpg, cropped to x 560-1600 / y 0-780 because the supplied file has a lion photo pasted onto it. Ask Nafsi for a clean original. |
| Tangaza programme | tangaza-phone.jpg | 9.jpg, three creators round a phone |
| Global Stay Tours programme | gst-hd.jpg | 12.jpg, Nafsi kids performing under a European big top |
| "Nairobi meets Copenhagen" story | creator-camera.jpg | from the first batch, as Base44 |
| "Inside a Tangaza cohort" story | tangaza-session.jpg | 7.jpg |
| "From participant to mentor" story | workshop.jpg | 15.jpg |
| Creator spotlight | drummer-stage.jpg | 14.jpg (Base44 shows a young drummer here) |
| Follow the journey, @nafsiafrica tile | podcast-tall.jpg | 13.jpg, the dancer Base44 uses there (photo: Jose Contez) |
| Follow the journey, NaiWave tile | naiwave-hd.jpg | 6.jpg |

Not shown in Base44 and unplaced: `training-splits.jpg` (1.jpg),
`sisters-field.jpg` (18.jpg), `outreach-drums.jpg` (5.jpg), `youth-movement.jpg`
(20.jpg at 3:2). Base44 also uses photos that are not in either batch: the
Performing Arts drummer in orange, the NaiWave host in headphones, the GST gym
jump and the Mazingira tree planting.
