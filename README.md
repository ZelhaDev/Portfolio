# Saeed Ahmad — Portfolio

Personal portfolio for OJT/internship recruiting, built with **React 18 + Vite 6** and plain CSS design tokens. No UI framework, no Tailwind, only three runtime dependencies (`react`, `react-dom`, `react-router-dom`).

**Deployed at:** https://zelhadev.github.io/Portfolio/ (GitHub Pages via Actions)

## What's inside

| Path | What it is |
|---|---|
| `src/data/profile.js` | Name, links, headline, about text |
| `src/data/projects.js` | **Source of truth for all projects** — add a project here |
| `src/data/skills.js` | Skill categories |
| `src/styles/tokens.css` | Design tokens (dark palette, amber/cyan accents) |
| `src/styles/styles.css` | Reset, buttons, cards, section layout, component styles |
| `src/components/` | Header, Footer, Section, Reveal, ProjectCard |
| `src/pages/` | Home (single scroll), ProjectDetailPage, NotFoundPage |
| `scripts/contrast-check.mjs` | WCAG AA (4.5:1) contrast check over every token pair |
| `scripts/copy-404.mjs` | Copies `dist/index.html` → `dist/404.html` for SPA deep links |
| `.github/workflows/deploy.yml` | Build + deploy to GitHub Pages |

## Commands

```bash
npm install
npm run dev            # http://localhost:5173/Portfolio/
npm run build          # vite build + writes dist/404.html
npm run preview        # serve the built site at http://localhost:4173/Portfolio/
npm run check:contrast # contrast check over tokens.css — 0 failures required
```

## Adding a new project

1. Append an object to `src/data/projects.js` — the card grid, detail page, and meta tags generate from it.
2. If it has a visual: drop the image into `public/images/` and set `visual.type: 'screenshot'` (otherwise the card gets a monogram tile).
3. `npm run build && npm run preview` to check it, then push.

## Deploying

`main` branch → GitHub Actions builds and deploys automatically (`.github/workflows/deploy.yml`). First time only: Settings → Pages → Source → **GitHub Actions**.

## Accessibility

- Contrast ≥ 4.5:1 on every token pair — verified by `npm run check:contrast` (0 failures).
- Every route renders `header`, `nav`, `main`, `footer` and exactly one `h1`.
- Focus rings visible, `prefers-reduced-motion` respected, images have alt text.

## Content rules

Everything shown is sourced from the real repositories and the author's answers — project descriptions, roles, and metrics are not invented. Project links point to the real repos (`ZelhaDev/GameOverIt`, `ZelhaDev/TSC-Model`, `vnctdg/MarketMate`).
