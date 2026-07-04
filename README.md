# Carson Woodside — Portfolio (Black Box)

> A cinematic, interactive personal portfolio built like a flight recorder: near-black surfaces, one cyan signal, monospace telemetry.

---

## Stack

| Layer | Tech |
|---|---|
| Framework | React 19 + Vite + TypeScript |
| Styling | CSS with design tokens (+ Tailwind preflight) |
| Animation | Framer Motion + Canvas API |
| Routing | React Router v7 (data router, route-level lazy) |
| Fonts | Inter Variable + JetBrains Mono Variable (Fontsource) |
| Deploy | Vercel (SPA rewrites via `vercel.json`) |

---

## Features

- **Boot sequence** — typed terminal boot on first visit (session-gated, reduced-motion aware)
- **Animated star field** — canvas layer with twinkle, drift, cursor constellations, and shooting stars; renders a static frame under `prefers-reduced-motion` and pauses on hidden tabs
- **Custom cursor** — four spring-physics states (dot, hover ring, link glow, project OPEN label), disabled on touch
- **Route transitions** — true exit animations via a frozen-outlet pattern with AnimatePresence
- **Command palette** — Ctrl/Cmd+K anywhere: fuzzy filter, arrow-key navigation, every route plus email/GitHub; doubles as the mobile menu
- **Case files** — data-driven project case studies at `/projects/:slug`
- **A11y** — skip link, focus-visible states, focus return, one `h1` per page, `aria-current` nav

---

## Color System

| Swatch | Name | Hex |
|---|---|---|
| ![#050505](https://placehold.co/20x20/050505/050505.png) | Background | `#050505` |
| ![#0D0D0D](https://placehold.co/20x20/0D0D0D/0D0D0D.png) | Surface | `#0D0D0D` |
| ![#1A1A1A](https://placehold.co/20x20/1A1A1A/1A1A1A.png) | Border | `#1A1A1A` |
| ![#F5F5F5](https://placehold.co/20x20/F5F5F5/F5F5F5.png) | Primary Text | `#F5F5F5` |
| ![#8A8A8A](https://placehold.co/20x20/8A8A8A/8A8A8A.png) | Secondary Text | `#8A8A8A` |
| ![#00E0FF](https://placehold.co/20x20/00E0FF/00E0FF.png) | Accent | `#00E0FF` |
| ![#66ECFF](https://placehold.co/20x20/66ECFF/66ECFF.png) | Hover Accent | `#66ECFF` |

---

## Getting Started

```bash
npm install       # install dependencies
npm run dev       # dev server
npm run lint      # eslint
npm run build     # typecheck + production build
npm run preview   # serve the production build locally
```

---

## Structure

```
src/
  components/   layout (Nav, Footer, PageTransition), cursor, background, terminal (palette)
  data/         all editable content: profile.ts, projects.ts, stack.ts, about.ts
  routes/       router, Layout, frozen-outlet transition wiring
  sections/     one folder per page (Hero, Projects, CaseStudy, About, Stack, Contact, NotFound)
```

All content is edited in `src/data/` — no page markup changes needed for copy updates.

---

## Content TODO (before sharing widely)

- [ ] LinkedIn URL → `src/data/profile.ts`
- [ ] CV PDF → `public/cv/carson-woodside-cv.pdf` + `profile.cvUrl`
- [ ] Real bio paragraphs (replace `[DRAFT]`) → `src/data/about.ts`
- [ ] Verify stack list / add `since` years → `src/data/stack.ts`
- [ ] Repo/live links for remaining projects → `src/data/projects.ts`
- [ ] Screenshots for the Black Box case study → `public/projects/black-box-portfolio/`
- [ ] Replace `[DRAFT]` outcome metrics in the Black Box case study after deploy
- [ ] `og:url` + `og:image` in `index.html` once the deploy URL exists

---

## Branch Strategy

```
main        → production (Vercel auto-deploys)
dev         → staging / integration branch
feature/*   → individual features, PR into dev
```

---

*Built by [Carson Woodside](https://github.com/CarsonWoodside)*
