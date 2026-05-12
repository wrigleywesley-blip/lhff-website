#!/usr/bin/env bash
# Render 3 LHFF carousels to 18 PNG panels (6 per carousel) at 1080×1350.
# Uses Chrome headless to capture full-page screenshots in render mode,
# then PIL to slice each into 6 panels.

set -e
cd "$(dirname "$0")"

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

CAROUSELS=(
  "01-empower-your-true-inner-self"
  "02-three-pillars"
  "03-inside-the-work"
)

mkdir -p exports

for slug in "${CAROUSELS[@]}"; do
  echo "→ Rendering $slug"
  HTML="$(pwd)/carousels/${slug}.html?render=1"
  STRIP="exports/${slug}-strip.png"
  "$CHROME" \
    --headless \
    --disable-gpu \
    --hide-scrollbars \
    --window-size=1080,8100 \
    --default-background-color=00000000 \
    --screenshot="$STRIP" \
    "file://$HTML" 2>/dev/null

  if [ ! -f "$STRIP" ]; then
    echo "  ✗ strip not produced"
    continue
  fi

  python3 - <<PY
from PIL import Image
import os
strip = Image.open("$STRIP")
W, H = strip.size
print(f"  strip: {W}x{H}")
PANEL_H = 1350
for i in range(6):
    box = (0, i * PANEL_H, W, (i + 1) * PANEL_H)
    panel = strip.crop(box)
    out = f"exports/${slug}-panel-{i+1:02d}.png"
    panel.save(out, optimize=True)
    print(f"  ✓ {out}")
PY

done

# Clean up strips
rm -f exports/*-strip.png

echo ""
echo "Done. Files:"
ls -lh exports/*.png | head -30
