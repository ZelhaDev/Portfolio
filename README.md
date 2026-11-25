# Saeed Ahmad — Portfolio

A six-section personal portfolio for OJT / internship recruiting, styled after the restrained
menu language of **NieR:Automata** (PlatinumGames / Square Enix, 2017) — faded technical
document, two-tone ink-on-beige, inverted selection states. It is an aesthetic homage only:
no game assets, logos, characters, music, or proprietary fonts are used, and nothing implies
affiliation with the game or its publishers.

**Live:** https://zelhadev.github.io/Portfolio/

## Stack

Static HTML + CSS + a ~2 KB vanilla JS island. No framework, no build step, no animation
library. Works without JavaScript: all content is real HTML, navigation is plain anchors,
and project entries use native `<details>`.

## Structure

```
index.html              all content, semantic sections (home, work, about, skills, experience, contact)
assets/styles.css       design tokens + all components (both themes)
assets/main.js          theme toggle, scrollspy, menu arrow-key navigation
assets/fonts/jost.woff2 self-hosted Jost (variable, OFL)
assets/images/          project screenshots
assets/cv/              downloadable CV (PDF)
scripts/contrast-check.mjs  WCAG check for both themes (text 4.5:1, UI 3:1)
.github/workflows/deploy.yml  GitHub Pages deploy (static copy, no build)
```

## Editing content

All copy lives directly in `index.html`. The common edits:

- **A new project:** duplicate one `<details class="entry">` block inside `#work`, update the
  summary row (index, name, meta) and the panel (summary, role, stack, links). Drop a screenshot
  in `assets/images/` if you have one.
- **A new credential:** add one `<li>` to `.cred` in `#experience`.
- **Skills:** edit the `.gauges` list and the `.chips` groups in `#skills`.
- **Contact links:** edit the `.contact-rows` list in `#contact` (also update `JSON-LD` in `<head>`).

## Theming

Colors are defined once in `assets/styles.css` as `light-dark(lightHex, darkHex)` pairs; the
theme toggle flips `color-scheme` via `data-theme`. The OS preference is respected when the
visitor has not chosen explicitly, and the choice persists in localStorage.

## Checks

```bash
node scripts/contrast-check.mjs   # both themes; exits 1 on any failure
npx serve .                       # or: python -m http.server 8000
```

Keyboard: Tab reaches everything; ↑/↓ move between menu rows; Enter opens; native Esc works on
links/details. A skip-to-content link is the first tab stop.

## Deploy

Push to `main` — `.github/workflows/deploy.yml` deploys the static files to GitHub Pages
(Settings → Pages → Source → GitHub Actions, first time only). Any static host works
(Netlify/Vercel: publish directory is the repo root, no build command).
