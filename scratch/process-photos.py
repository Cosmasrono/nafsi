"""Clean up the user-supplied Nafsi photographs and write them into public/images.

WhatsApp re-compresses photos, so each source is mildly soft and carries JPEG
ringing. We auto-orient, crop to the aspect the slot actually renders at,
resize with LANCZOS, then unsharp-mask and re-encode at 4:4:4 so the detail that
survives stays crisp. Nothing is upscaled more than 1.6x -- beyond that you are
inventing pixels, not recovering them.
"""

from __future__ import annotations

import shutil
from pathlib import Path

from PIL import Image, ImageEnhance, ImageFilter, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "scratch" / "new-photos"
OUT = ROOT / "public" / "images"
BACKUP = OUT / "lowres-backup"

MAX_UPSCALE = 1.6

# source file -> (destination stems, target aspect w/h, target long edge, crop focus)
JOBS = [
    (
        "IMG-20230316-WA0003.jpg.jpeg",
        ["one.jpeg"],
        (3, 4),
        1600,
        "center",
    ),
    (
        "IMG-20230513-WA0005.jpg.jpeg",
        ["dance.jpg", "dance-hd.jpg"],
        (4, 3),
        1280,
        "center",
    ),
    (
        "IMG-20221201-WA0003.jpg.jpeg",
        ["community-hd.jpg", "community.jpg"],
        (3, 2),
        1280,
        "center",
    ),
    (
        "IMG-20221007-WA0006.jpg.jpeg",
        ["tangaza-lab.jpg"],
        (16, 9),
        1500,
        "top",
    ),
    (
        "IMG-20221007-WA0009.jpg.jpeg",
        ["creator-camera.jpg"],
        (4, 3),
        1500,
        "center",
    ),
    (
        "IMG-20210928-WA0016.jpg.jpeg",
        ["acrobats-pyramid.jpg"],
        (3, 4),
        1000,
        "center",
    ),
]


def crop_to_aspect(im: Image.Image, aspect: tuple[int, int], focus: str) -> Image.Image:
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


def process(src: Path, aspect: tuple[int, int], long_edge: int, focus: str) -> Image.Image:
    im = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
    im = crop_to_aspect(im, aspect, focus)

    # Smooth the WhatsApp blocking a touch before resampling so we sharpen
    # detail rather than compression artefacts.
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
            im.save(
                path,
                "JPEG",
                quality=88,
                optimize=True,
                progressive=True,
                subsampling=0,
            )
            kb = path.stat().st_size // 1024
            print(f"{dest:28} {im.width}x{im.height}  {kb}KB   <- {name}")


if __name__ == "__main__":
    main()
