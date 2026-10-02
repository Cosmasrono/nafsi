"""Place the second batch of Nafsi photographs into public/images.

Same treatment as `process-photos.py` -- crop to the aspect the slot renders at,
resample with LANCZOS (never more than 1.6x), unsharp-mask, re-encode at 4:4:4.
Slot assignments follow the Base44 build (see the note above JOBS) and
`docs/base44-alignment-plan.md`.
"""

from __future__ import annotations

import shutil
from pathlib import Path

from PIL import Image, ImageEnhance, ImageFilter, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "scratch" / "new-photos-2"
OUT = ROOT / "public" / "images"
BACKUP = OUT / "lowres-backup"

MAX_UPSCALE = 1.6

# source -> (destination filenames, aspect w/h, target long edge, crop focus)
# Crop focus is "center", "top", or an explicit (left, top, right, bottom) box
# in source pixels that is cut first and then centre-cropped to the aspect.
#
# Slots follow the Base44 walkthrough recorded 2 October 2026
# (02.10.2026_08.07.27_REC.mp4). Where that build shows a photo from this batch,
# the same photo goes in the same slot here.
JOBS = [
    # Home hero -- Base44 uses this exact shot: three kids in Nafsi tees under the big top.
    ("20.jpg", ["hero.jpg", "hero-hd.jpg"], (16, 9), 1600, "center"),
    # Performing Arts, the donate banner and the Open Graph card.
    ("2.jpg", ["dance.jpg", "dance-hd.jpg"], (4, 3), 1600, "center"),
    # Outreach -- Base44's Outreach card. The supplied file has a lion photo
    # pasted onto the backdrop left of the girl (x 430-555, y 185-310); the box
    # starts right of it so it never reaches the site.
    ("3.jpg", ["outreach.jpg"], (4, 3), 1280, (560, 0, 1600, 780)),
    # Spare since Outreach moved to 3.jpg.
    ("5.jpg", ["outreach-drums.jpg"], (4, 3), 1200, "center"),
    # Tangaza programme card -- Base44's Tangaza shot, three creators round a phone.
    ("9.jpg", ["tangaza-phone.jpg"], (4, 3), 1333, "center"),
    # "Inside a Tangaza cohort" -- a whole cohort round one phone.
    ("7.jpg", ["tangaza-session.jpg"], (3, 2), 1600, "center"),
    # NaiWave programme card, "Hard conversations, on air" and the NaiWave
    # tile in "Follow the journey".
    ("6.jpg", ["naiwave.jpg", "naiwave-hd.jpg"], (3, 2), 1280, "center"),
    # The @nafsiafrica tile in "Follow the journey" -- Base44 uses this dancer there.
    ("13.jpg", ["podcast-tall.jpg", "podcast-tall-hd.jpg"], (3, 4), 1000, "center"),
    # Global Stay Tours -- Nafsi kids performing under a European big top.
    ("12.jpg", ["gst-hd.jpg"], (4, 3), 1600, "center"),
    # Youth Empowerment.
    ("4.jpg", ["youth-hd.jpg"], (3, 2), 1600, "center"),
    # "A week at the community centres" -- a trainer and a child, literally.
    ("17.jpg", ["community-mentor.jpg"], (4, 3), 1280, "center"),
    # Spare since the hero took 20.jpg.
    ("20.jpg", ["youth-movement.jpg"], (3, 2), 1600, "center"),
    # "The stage as a classroom".
    ("10.jpg", ["theatre-duo.jpg"], (3, 2), 1600, "center"),
    # "From participant to mentor" -- young people working through a session together.
    ("15.jpg", ["workshop.jpg"], (3, 2), 1600, "center"),
    # Creator spotlight -- Base44 shows a young drummer there; this is ours.
    ("14.jpg", ["drummer-stage.jpg"], (3, 2), 1600, "center"),
    # Spare, documented in SOURCES.md for the team to place.
    ("1.jpg", ["training-splits.jpg"], (4, 3), 1280, "center"),
    ("18.jpg", ["sisters-field.jpg"], (3, 4), 1280, "center"),
]


def crop_to_aspect(im: Image.Image, aspect: tuple[int, int], focus: str | tuple[int, int, int, int]) -> Image.Image:
    if isinstance(focus, tuple):
        im = im.crop(focus)
        focus = "center"
    want = aspect[0] / aspect[1]
    have = im.width / im.height
    if abs(want - have) < 0.01:
        return im
    if have > want:  # too wide -- trim the sides
        new_w = round(im.height * want)
        left = (im.width - new_w) // 2
        return im.crop((left, 0, left + new_w, im.height))
    new_h = round(im.width / want)  # too tall -- trim top/bottom
    top = 0 if focus == "top" else (im.height - new_h) // 2
    return im.crop((0, top, im.width, top + new_h))


def process(src: Path, aspect: tuple[int, int], long_edge: int, focus: str | tuple[int, int, int, int]) -> Image.Image:
    im = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
    im = crop_to_aspect(im, aspect, focus)
    im = im.filter(ImageFilter.SMOOTH)

    cur_long = max(im.width, im.height)
    target = min(long_edge, round(cur_long * MAX_UPSCALE))
    scale = target / cur_long
    if abs(scale - 1) > 0.01:
        im = im.resize((round(im.width * scale), round(im.height * scale)), Image.LANCZOS)

    im = im.filter(ImageFilter.UnsharpMask(radius=1.4, percent=120, threshold=3))
    im = ImageEnhance.Contrast(im).enhance(1.04)
    im = ImageEnhance.Color(im).enhance(1.05)
    return im


def main() -> None:
    BACKUP.mkdir(parents=True, exist_ok=True)
    for name, dests, aspect, long_edge, focus in JOBS:
        im = process(SRC / name, aspect, long_edge, focus)
        for dest in dests:
            path = OUT / dest
            if path.exists() and not (BACKUP / dest).exists():
                shutil.copy2(path, BACKUP / dest)
            im.save(path, "JPEG", quality=88, optimize=True, progressive=True, subsampling=0)
            print(f"{dest:26} {im.width}x{im.height}  {path.stat().st_size // 1024}KB   <- {name}")


if __name__ == "__main__":
    main()
