"""Pull distinct frames out of the Base44 walkthrough recording.

A scroll-through gives you hundreds of near-identical frames, so sample at a
fixed interval and keep a frame only when it differs enough from the last one
kept. Difference is measured on a downscaled greyscale copy so slow scrolling
registers but video noise does not.
"""

from __future__ import annotations

import sys
from pathlib import Path

import cv2
import numpy as np

SRC = Path(sys.argv[1])
OUT = Path(sys.argv[2])
SAMPLE_SECONDS = float(sys.argv[3]) if len(sys.argv) > 3 else 0.5
THRESHOLD = float(sys.argv[4]) if len(sys.argv) > 4 else 9.0

OUT.mkdir(parents=True, exist_ok=True)

cap = cv2.VideoCapture(str(SRC))
fps = cap.get(cv2.CAP_PROP_FPS) or 30
total = int(cap.get(cv2.CAP_PROP_FRAMES_COUNT if hasattr(cv2, "CAP_PROP_FRAMES_COUNT") else cv2.CAP_PROP_FRAME_COUNT))
step = max(1, round(fps * SAMPLE_SECONDS))
print(f"{SRC.name}: {total} frames @ {fps:.1f}fps = {total / fps:.1f}s, sampling every {step}")

prev = None
kept = 0
for idx in range(0, total, step):
    cap.set(cv2.CAP_PROP_POS_FRAMES, idx)
    ok, frame = cap.read()
    if not ok:
        continue
    small = cv2.cvtColor(cv2.resize(frame, (160, 90)), cv2.COLOR_BGR2GRAY).astype(np.float32)
    if prev is not None and np.abs(small - prev).mean() < THRESHOLD:
        continue
    prev = small
    kept += 1
    path = OUT / f"f{kept:03d}_{idx / fps:06.2f}s.jpg"
    cv2.imwrite(str(path), frame, [cv2.IMWRITE_JPEG_QUALITY, 82])
    print(f"  {path.name}  {frame.shape[1]}x{frame.shape[0]}")

cap.release()
print(f"kept {kept} frames")
