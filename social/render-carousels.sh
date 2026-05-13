#!/usr/bin/env bash
# Render LHFF carousels to PNG panels at 1080×1350.
# Output: exports/carousel-NN/panel-01.png ... panel-NN.png
# Each carousel has its own folder for easy download/handoff.

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
  "08-the-foundation-app:9"
  "09-navid-in-depth:8"
  "10-studio-one-how-we-find-you:8"
  "11-a-day-at-studio-one:8"
  "12-why-studio-one-exists:8"
)

# Usage: render-carousels.sh [slug1 slug2 ...]
# With no args: render all. With args: render only those slugs.
TARGETS=("$@")

mkdir -p exports

for entry in "${CAROUSELS[@]}"; do
  slug="${entry%%:*}"
  count="${entry##*:}"
  num="${slug%%-*}"

  # If specific targets given, skip anything not requested
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
