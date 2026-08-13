#!/usr/bin/env bash
# Render LHFF Drop-03 (Education & Empowerment) story sets to PNG frames at 1080×1920 (9:16).
# Output: exports/<slug>/frame-01.png ... frame-NN.png
set -e
cd "$(dirname "$0")"

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

# slug : frame_count
declare -a SETS=(
  "01-the-school-that-grew:5"
  "02-why-education:5"
  "03-metalearning:5"
  "04-wefree-points:5"
  "05-girls-who-lead:5"
  "06-second-chances:4"
  "07-a-day-in-class:6"
  "08-the-teacher:4"
  "09-skills-open-doors:5"
  "10-the-digital-classroom:5"
  "11-what-were-building:6"
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
