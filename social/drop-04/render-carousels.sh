#!/usr/bin/env bash
# Render LHFF Drop 04 carousels to PNG panels at 1080×1350.
# Output: exports/carousel-NN/panel-01.png ... panel-NN.png

set -e
cd "$(dirname "$0")"

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

# slug : panel_count
declare -a CAROUSELS=(
  "01-the-garden-that-feeds-the-school:7"
  "02-seed-to-plate:8"
  "03-why-sustainability-is-a-pillar:7"
  "04-water:7"
  "05-the-house-that-runs-on-sun:7"
  "06-seven-small-things:9"
  "07-what-we-throw-away:7"
  "08-the-land-remembers:7"
)

# Usage: render-carousels.sh [slug1 slug2 ...]  (no args = render all)
TARGETS=("$@")

mkdir -p exports

for entry in "${CAROUSELS[@]}"; do
  slug="${entry%%:*}"
  count="${entry##*:}"
  num="${slug%%-*}"

  if [ ${#TARGETS[@]} -gt 0 ]; then
    matched=false
    for t in "${TARGETS[@]}"; do
      [[ "$slug" == "$t"* || "$num" == "$t" ]] && matched=true
    done
    $matched || continue
  fi

  height=$((count * 1350))
  folder="exports/carousel-${num}"
  mkdir -p "$folder"
  strip="$folder/_strip.png"

  echo "→ $slug ($count panels, ${height}px) → $folder/"

  "$CHROME" \
    --headless \
    --disable-gpu \
    --hide-scrollbars \
    --window-size=1080,${height} \
    --default-background-color=00000000 \
    --virtual-time-budget=12000 \
    --screenshot="$strip" \
    "file://$(pwd)/carousels/${slug}.html?render=1" 2>/dev/null

  if [ ! -f "$strip" ]; then
    echo "  ✗ strip not produced for $slug"
    continue
  fi

  python3 - "$folder" "$count" <<'PY'
import sys
from PIL import Image
folder, count = sys.argv[1], int(sys.argv[2])
strip = Image.open(f"{folder}/_strip.png")
for i in range(count):
    box = (0, i * 1350, 1080, (i + 1) * 1350)
    strip.crop(box).save(f"{folder}/panel-{i+1:02d}.png", optimize=True)
    print(f"  ✓ panel-{i+1:02d}.png")
PY
  rm -f "$strip"
done

echo ""
echo "Total panels:"
find exports -name "panel-*.png" | wc -l
