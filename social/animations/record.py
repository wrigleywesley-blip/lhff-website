#!/usr/bin/env python3
"""
LHFF animation recorder (v3 — virtual time + parallel Chrome).

For each frame, launch Chrome headless with --virtual-time-budget=<ms>
which advances the page's clock instantly. The CSS @keyframes animations
run virtually until that timestamp, then Chrome takes a screenshot and
exits. Parallelize via subprocess concurrency. Assemble with ffmpeg.

Usage:
  python3 record.py <html> <output.mp4> [duration_s] [fps]
"""
import os
import shutil
import subprocess
import sys
import tempfile
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
FFMPEG = "/Users/wesley/Library/Python/3.9/lib/python/site-packages/imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1"


def capture_frame(html_path: Path, frame_idx: int, virtual_time_ms: int, out: Path):
    user_data = tempfile.mkdtemp(prefix=f"chrome_f{frame_idx}_")
    try:
        # --virtual-time-budget makes Chrome advance the page clock by N ms
        # before taking the screenshot. CSS animations are paused otherwise.
        # --run-all-compositor-stages-before-draw makes sure layout is final.
        # We add a tiny offset (50ms) so animations have settled into the keyframe.
        result = subprocess.run(
            [
                CHROME,
                "--headless",
                "--disable-gpu",
                "--no-sandbox",
                "--no-first-run",
                "--hide-scrollbars",
                "--disable-extensions",
                f"--user-data-dir={user_data}",
                "--window-size=1080,1920",
                "--run-all-compositor-stages-before-draw",
                f"--virtual-time-budget={virtual_time_ms + 50}",
                f"--screenshot={out}",
                f"file://{html_path}",
            ],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            timeout=30,
        )
        return out.exists()
    finally:
        shutil.rmtree(user_data, ignore_errors=True)


def record(html_path: str, output_mp4: str, duration_s: float = 10.0, fps: int = 24, parallel: int = 6):
    html_path = Path(html_path).resolve()
    output_mp4 = Path(output_mp4).resolve()
    frames_dir = Path(tempfile.mkdtemp(prefix="lhff_frames_"))
    n_frames = int(duration_s * fps)

    print(f"→ {html_path.name}  →  {output_mp4.name}  ({duration_s}s @ {fps}fps = {n_frames} frames, parallel={parallel})", flush=True)
    t0 = time.time()

    try:
        with ThreadPoolExecutor(max_workers=parallel) as pool:
            futures = []
            for i in range(n_frames):
                t_ms = int(i * (1000.0 / fps))
                out = frames_dir / f"frame_{i:05d}.png"
                futures.append(pool.submit(capture_frame, html_path, i, t_ms, out))

            done = 0
            for f in as_completed(futures):
                try:
                    ok = f.result()
                except Exception:
                    ok = False
                done += 1
                if done % 30 == 0 or done == n_frames:
                    print(f"  {done}/{n_frames} frames captured ({time.time()-t0:.1f}s)", flush=True)

        n_written = len(list(frames_dir.glob("frame_*.png")))
        print(f"  {n_written} frames on disk after {time.time()-t0:.1f}s", flush=True)
        if n_written < n_frames * 0.9:
            raise RuntimeError(f"only {n_written}/{n_frames} frames captured")

        # ffmpeg assemble
        subprocess.run(
            [
                FFMPEG, "-y",
                "-framerate", str(fps),
                "-i", str(frames_dir / "frame_%05d.png"),
                "-c:v", "libx264",
                "-pix_fmt", "yuv420p",
                "-preset", "fast",
                "-crf", "20",
                "-movflags", "+faststart",
                str(output_mp4),
            ],
            check=True,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )
        size_kb = output_mp4.stat().st_size // 1024
        print(f"  ✓ {output_mp4.name}  ({size_kb} KB, total {time.time()-t0:.1f}s)", flush=True)
    finally:
        shutil.rmtree(frames_dir, ignore_errors=True)


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("usage: record.py <html> <output.mp4> [duration_s] [fps]")
        sys.exit(1)
    dur = float(sys.argv[3]) if len(sys.argv) > 3 else 10.0
    fps = int(sys.argv[4]) if len(sys.argv) > 4 else 24
    record(sys.argv[1], sys.argv[2], dur, fps, parallel=6)
