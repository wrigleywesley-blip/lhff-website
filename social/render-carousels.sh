#!/usr/bin/env bash
# Render all LHFF carousels to PNG panels at 1080×1350.
# Slug → panel count map; Chrome headless captures the full strip,
# PIL slices it into individual panels.

set -e
cd "$(dirname "$0")"

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

# slug : panel_count
declare -a CAROUSELS=(
  "01-empower-your-true-inner-self:6"
  "02-three-pillars:6"
  "03-inside-the-work:6"
  "04-the-seven-pillars:9"
  "05-studio-one-open-call:7"
  "06-a-retreat-day:8"
  "07-what-we-are-building:7"
)

mkdir -p exports

for entry in "${CAROUSELS[@]}"; do
  slug="${entry%%:*}"
  count="${entry##*:}"
  height=$((count * 1350))
  echo "→ Rendering $slug ($count panels, ${height}px tall)"

  HTML="$(pwd)/carousels/${slug}.html?render=1"
  STRIP="exports/${slug}-strip.png"

  "$CHROME" \
    --headless \
    --disable-gpu \
    --hide-scrollbars \
    --window-size=1080,${height} \
    --default-background-color=00000000 \
    --screenshot="$STRIP" \
    "file://$HTML" 2>/dev/null

  if [ ! -f "$STRIP" ]; then
    echo "  ✗ strip not produced"
    continue
  fi

  python3 - "$slug" "$count" <<'PY'
import sys
from PIL import Image
slug = sys.argv[1]
count = int(sys.argv[2])
strip = Image.open(f"exports/{slug}-strip.png")
W, H = strip.size
PANEL_H = 1350
for i in range(count):
    box = (0, i * PANEL_H, W, (i + 1) * PANEL_H)
    strip.crop(box).save(f"exports/{slug}-panel-{i+1:02d}.png", optimize=True)
    print(f"  ✓ panel {i+1}")
PY
done

# Clean up strips
rm -f exports/*-strip.png

echo ""
echo "Done. Total panels:"
ls exports/*.png | wc -l
