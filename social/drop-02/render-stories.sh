#!/usr/bin/env bash
# Render LHFF Drop-02 story sets to PNG frames at 1080×1920 (9:16).
# Output: exports/<slug>/frame-01.png ... frame-NN.png
set -e
cd "$(dirname "$0")"

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

# slug : frame_count
declare -a SETS=(
  "01-mozambique-wild-wonders:5"
  "02-ocean-conservation:4"
  "03-studio-one-fashion:4"
  "04-seeds-of-change:4"
  "05-studio-one-lookbook:5"
  "06-a-day-at-studio-one:6"
  "07-the-patterns-we-wear:4"
  "08-stillness-the-retreat:5"
  "09-the-seven-pillars:5"
  "10-nature-heals:4"
  "11-for-the-creators:5"
  "12-faces-of-studio-one:4"
  "13-the-makers-hands:4"
  "14-the-school:5"
  "15-the-foundation-app:5"
  "16-meet-navid:4"
  "17-empower-your-true-self:5"
  "18-what-we-are-building:6"
)

TARGETS=("$@")
mkdir -p exports

for entry in "${SETS[@]}"; do
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

  height=$((count * 1920))
  folder="exports/${slug}"
  mkdir -p "$folder"
  strip="$folder/_strip.png"

  echo "→ $slug ($count frames, ${height}px) → $folder/"

  "$CHROME" \
    --headless \
    --disable-gpu \
    --no-sandbox \
    --hide-scrollbars \
    --default-background-color=00000000 \
    --window-size=1080,${height} \
    --run-all-compositor-stages-before-draw \
    --virtual-time-budget=6000 \
    --screenshot="$strip" \
    "file://$(pwd)/stories/${slug}.html?render=1" 2>/dev/null

  if [ ! -f "$strip" ]; then
    echo "  ✗ strip not produced for $slug"; continue
  fi

  python3 - "$folder" "$count" <<'PY'
import sys
from PIL import Image
folder, count = sys.argv[1], int(sys.argv[2])
strip = Image.open(f"{folder}/_strip.png")
for i in range(count):
    box = (0, i * 1920, 1080, (i + 1) * 1920)
    strip.crop(box).save(f"{folder}/frame-{i+1:02d}.png", optimize=True)
    print(f"  ✓ frame-{i+1:02d}.png")
PY
  rm -f "$strip"
done

echo ""
echo "Total frames: $(find exports -name 'frame-*.png' | wc -l | tr -d ' ')"
