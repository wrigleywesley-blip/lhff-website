# LHFF — Social Drop 03 · Education & Empowerment
Shared build brief for all story-set agents. READ THIS FIRST, then read the two reference files below.

## What you are building
One Instagram-Stories set = one self-contained HTML file at
`/Users/wesley/Desktop/LHFF-website/social/drop-03/stories/NN-slug.html`
Each `<section class="frame">` is a 1080×1920 (9:16) story frame. Your prompt tells you the exact slug, frame count, and frame-by-frame content.

## MUST read before writing (they define the system exactly)
1. `/Users/wesley/Desktop/LHFF-website/social/drop-03/stories/_story-base.css` — the full class system. Use ONLY these classes.
2. `/Users/wesley/Desktop/LHFF-website/social/drop-02/stories/01-mozambique-wild-wonders.html` — the canonical example. Mirror its head, structure, `render=1` script, progress logic, chrome, scrims. Your file's `<head>` must be identical (same Google Fonts link + `<link rel="stylesheet" href="_story-base.css" />`).

## Brand (LHFF = Love, Happiness & Freedom Foundation)
- Handle in every bottom-right chrome: `@lovehappinessfreedom`
- Tagline (use on the closing/CTA frame): `Grow. Sustain. Transform.`
- Pillars: Education · Sustainability · Spirituality. Focus areas: human rights, environment & conservation, education & empowerment.
- Bases: Cape Town (HQ + retreat) and Maputo, Mozambique (school + studio).
- Rainbow = 7 colours for diversity ("322 sums to 7"). Use the `.rainbow-bar` on cover + CTA frames.
- Voice: editorial, warm, literary, dignified. Hopeful, never pitying or "poverty-porn." Children are protagonists with agency, not objects of charity.

## HARD RULES
- **NO EM-DASHES** anywhere. Use commas, colons, or periods. (Non-negotiable house style.)
- Accent single words inside a headline with `<em style="color:var(--COLOR)">word</em>` using the palette vars (--red --orange --yellow --green --sky --blue --purple). Green and yellow read best on dark photos.
- Progress bar: N spans, the current frame's span has class `on`. Chrome-top right shows `NN / TT` (e.g. `03 / 05`).
- Reference images as `../ai-assets/FILENAME`. Use ONLY files in the manifest below. Never invent a filename.
- Every photo frame needs a `.scrim` (or `scrim--solid` / `scrim--light` / `scrim--bottom`) over the `.bg` for text legibility.
- End the file with the exact render script from the canonical example:
  `<script>if (new URLSearchParams(location.search).get("render") === "1") document.body.classList.add("render");</script>`

## FACTUAL ACCURACY (public-facing — do not fabricate)
- For **global / Africa / Mozambique education facts**, use ONLY the vetted STATS BANK below, and include the `<p class="source">` line exactly as given. Do not invent other precise numbers.
- For **LHFF's own programmes** (the school, MetaLearning, WeFree Points, Redemption, the app), we do NOT have audited metrics. Do NOT invent precise figures (no "1,200 kids", no "%"). Use qualitative, movement language ("a school that started with one classroom", "every child fed, taught, and seen"). Aspirational, honest, unquantified.

### STATS BANK (each line = the claim + the exact source string to put in `<p class="source">`)
- `250 million` children and youth are out of school worldwide. — Source: UNESCO (2024)
- `9 in 10` ten-year-olds in sub-Saharan Africa cannot read and understand a simple sentence. — Source: World Bank, Learning Poverty (2022)
- Over `1 in 5` primary-age children in sub-Saharan Africa are out of school, the highest rate of any region. — Source: UNESCO UIS
- Every extra year of schooling raises a person's earnings by about `10%`. — Source: Psacharopoulos & Patrinos, World Bank
- A child whose mother can read is `50%` more likely to live past age five. — Source: UNESCO
- In Mozambique, fewer than half of children complete primary school. — Source: UNESCO UIS
- Education is one of the highest-return investments in global development. — Source: World Bank

## ASSET MANIFEST (exact filenames in ../ai-assets/)
New education stills (cinematic, warm, documentary — Mozambique/African context):
- `edu-girl-reading.jpg` — girl reading by a sunlit barred window, green shirt. HERO image. Dark empty space on left = great for text. Best cover/emotional frames.
- `edu-boy-writing.jpg` — close-up of a child's hand writing in an exercise book. Great for "learning/lessons".
- `edu-mentor.jpg` — teacher leaning over, pointing at a book with a seated student. Great for teacher/mentorship.
- `edu-graduation.jpg` — joyful graduate in cap holding a certificate. NOTE: the certificate has garbled text — use `scrim--solid` and keep text overlays over the LOWER third so the certificate is darkened; lean on the face/cap.
School / foundation:
- `school-build.jpg`, `school-aerial.jpg` — the school building / aerial of the Maputo school grounds.
- `school-fountain-day.jpg`, `school-fountain-night.jpg` — school courtyard fountain (day = bright/hopeful, night = moody/reflective).
- `school-classroom.jpg` — inside a classroom.
- `school-kids.jpg` — group of schoolchildren.
- `school-teacher.jpg` — a teacher.
- `school-seedlings.jpg` — children with seedlings (growth metaphor).
People:
- `women-circle.jpg` — women/community gathered in a circle.
- `women-portrait.jpg` — dignified portrait of a woman.
Foundation app (use inside a `.phone` mockup like drop-02's app set):
- `app-welcome.png`, `app-home.png`, `app-course.png`, `app-practice.png`, `app-journal.png`
Other:
- `fashion.jpg`, `fashion-2.jpg` — Studio One fashion (fashion as a tool for change / skills).
- `hero-mural.jpg` — colourful community mural (good for vision/community frames).

## Output
Write your single HTML file to the exact path given in your prompt. Do not run the renderer. Do not touch other files. Reply with just the path and a one-line note on any image you swapped.
