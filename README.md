# Carson Woodside - Portfolio

> A cinematic, interactive personal portfolio built to feel like a premium product.

---

## Stack

| Layer | Tech |
|---|---|
| Framework | React + Vite + TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion + GSAP |
| Smooth Scroll | Lenis |
| 3D | Three.js + React Three Fiber |
| Routing | React Router v6 |
| Sound | Howler.js |
| Icons | Lucide React |
| Data fetching | TanStack Query |
| Deploy | Vercel |

---

## Features

- **Animated star field background** — twinkling stars with slow upward drift and cross sparkles on bright stars
- **Constellation drawing** — stars near the cursor connect with faint lines on mouse movement
- **Shooting stars** — random shooting stars streak across the screen every few seconds
- **Custom cursor** — four states: default dot, hover ring, link glow, project OPEN label

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
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```

---

## Branch Strategy

```
main        → production (Vercel auto-deploys)
dev         → staging / integration branch
feature/*   → individual features, PR into dev
```

---

*Built by [Carson Woodside](https://github.com/CarsonWoodside)*