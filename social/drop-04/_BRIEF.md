# LHFF — Social Drop 04 · Sustainability & The Land

Eight Instagram carousels, 1080×1350 panels, built the same way as Drop 01.

## The gap this fills
- Drop 01 = the retreat, Studio One, the app (Spirituality pillar)
- Drop 02 = wildlife, ocean, seeds (conservation, story format)
- Drop 03 = the school, MetaLearning, teachers (Education pillar, story format)
- **Drop 04 = Sustainability, the third pillar.** Food, water, energy, waste, land. Carousel format.

## Build system
- One HTML file per carousel at `carousels/NN-slug.html`
- Each `<section class="panel">` = one 1080×1350 slide
- Shared classes only, from `carousels/_shared-base.css` (Drop 01 base + Drop 04 additions: `.stat` `.source` `.kicker` `.numbered` `.rule`)
- Images referenced as `../ai-assets/FILENAME`
- Render: `./render-carousels.sh` (Chrome headless strip → PIL crop) → `exports/carousel-NN/panel-NN.png`
- Preview: `index.html`

## Brand
- Handle bottom-right on every panel: `@lovehappinessfreedom`
- Tagline on CTA panels: `Grow. Sustain. Transform.`
- Display type = Playfair Display italic. Body = Open Sans. Chrome = JetBrains Mono.
- Rainbow bar on cover + CTA panels only. Accent one word per headline with a palette var.
- Voice: editorial, warm, literary, dignified. Hopeful, never pitying. Never "poverty porn."

## HARD RULES
- **No em-dashes.** Commas, colons, periods.
- **No invented LHFF metrics.** We have no audited numbers for the school, the gardens, the villa. Qualitative and honest only ("a garden that started as a strip of dead ground"). Big numbers on `.stat` panels are external, sourced facts ONLY, and every one carries a `<p class="source">`.
- Every photo panel needs a `.scrim` over the `.bg`.

## STATS BANK (the only precise figures used, with exact sources)
- About **a third** of all food produced for human consumption is lost or wasted. — Source: FAO
- Food systems account for roughly **a third** of global greenhouse gas emissions. — Source: IPCC (2019)
- The Cape Floral Kingdom holds about **9,000** plant species, roughly 70% found nowhere else on earth. — Source: SANBI
- In **2018**, Cape Town came within months of Day Zero, the day the taps would be shut off. — Source: City of Cape Town
- South Africa is one of the world's **30** driest countries. — Source: SA Dept. of Water and Sanitation

## The eight carousels
| # | Slug | Panels | Angle |
|---|------|--------|-------|
| 01 | the-garden-that-feeds-the-school | 7 | The Maputo food garden: dead ground to dinner |
| 02 | seed-to-plate | 8 | The full cycle, seed → soil → harvest → kitchen → table → compost → seed |
| 03 | why-sustainability-is-a-pillar | 7 | The argument: why a foundation about people teaches soil |
| 04 | water | 7 | The most basic resource, and the one we take for granted |
| 05 | the-house-that-runs-on-sun | 7 | The Cape Town villa: solar, garden, the retreat that funds the school |
| 06 | seven-small-things | 9 | Seven rainbow-coded habits anyone can start this week |
| 07 | what-we-throw-away | 7 | Waste, plastic, offcuts, the idea that "away" is a place |
| 08 | the-land-remembers | 7 | Fynbos, restoration, planting for people you will not meet |

## Motion (`remotion/` → `motion/`)
One Remotion composition per carousel, 1080×1920 @ 30fps, for Reels and Stories. Cloned from the Drop 03 project: same `ui.tsx` component set (`SceneBG` Ken Burns push, `MScene`, `BigStat`, `Counter`, `RainbowBar`, `PersistentChrome`), same `TransitionSeries` + `fade()` grammar, same fonts.

| Comp ID | Output | Frames | Length |
|---|---|---|---|
| `TheGarden` | motion-the-garden.mp4 | 426 | 14.2s |
| `SeedToPlate` | motion-seed-to-plate.mp4 | 546 | 18.3s |
| `WhySustainability` | motion-why-sustainability.mp4 | 426 | 14.2s |
| `Water` | motion-water.mp4 | 426 | 14.2s |
| `HouseThatRunsOnSun` | motion-house-runs-on-sun.mp4 | 426 | 14.2s |
| `SevenSmallThings` | motion-seven-small-things.mp4 | 562 | 18.8s |
| `WhatWeThrowAway` | motion-what-we-throw-away.mp4 | 426 | 14.2s |
| `TheLandRemembers` | motion-the-land-remembers.mp4 | 426 | 14.2s |

Render one: `npx remotion render <CompId> ../motion/<name>.mp4`. Studio: `npm run dev`.
Frame maths must stay in sync with `Root.tsx`: total = sum(sequences) − sum(transition durations). Each composition carries that arithmetic in a comment at the top.

Drop 04 diverges from the Drop 03 `ui.tsx` in two places, both spacing fixes: `BigStat` gained `marginBottom: 46` (Playfair italic numerals at 250px+ have deep descenders that crossed the caption) and `Handle` gained `marginTop: 64` (pill was touching the display descender above it).

## Asset manifest (`ai-assets/`)
Food & garden: `garden-beds` `soil-hands` `seedling-hands` `garden-watering` `harvest-basket` `tomatoes-vine` `school-kitchen` `shared-meal` `compost` `seed-bank`
Water: `water-tap` `water-tank` `dry-earth` `rain-leaves`
Energy & villa: `solar-roof` `villa-garden` `villa-dusk`
Land: `fynbos-macro` `cape-landscape` `tree-planting` `restored-hillside`
Waste & materials: `plastic-shore` `reuse-workshop` `natural-fabric`
People: `gardener-portrait` `kids-seedlings` `community-planting`
