# APEX OS

A cinematic AI-native operating system for human potential — a design-first hackathon project that feels like Netflix + Apple + Jarvis combined into a futuristic AI OS.

## Run & Operate

- `pnpm --filter @workspace/apex-os run dev` — run the APEX OS frontend (port 24672, preview at `/`)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080, preview at `/api`)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + Tailwind CSS v4
- Animations: Framer Motion, GSAP, Lenis smooth scroll
- Fonts: Inter (body), Syne (headlines via Google Fonts)
- API: Express 5 (minimal, apex-os is frontend-only)

## Where things live

- `artifacts/apex-os/src/` — APEX OS React frontend
  - `components/CinematicIntro.tsx` — Boot sequence with particles + console lines
  - `components/CursorGlow.tsx` — Custom red glowing cursor
  - `components/Navigation.tsx` — Fixed glassmorphism nav
  - `components/HeroSection.tsx` — Fullscreen hero with particle field
  - `components/AgentEcosystem.tsx` — 11 AI agent cards with live activity
  - `components/AIThinkingSpace.tsx` — Neural network visualization (big wow moment)
  - `components/CareerGalaxy.tsx` — Interactive cosmic career map
  - `components/CareerCards.tsx` — Netflix-style career rows + fullscreen modal
  - `components/StudyCommandCenter.tsx` — Mission-control study dashboard
  - `components/WorkflowUniverse.tsx` — Autonomous workflow cards
  - `components/FutureSelf.tsx` — 1/3/5-year future simulation
  - `components/FinalSection.tsx` — Cinematic closing sequence
  - `index.css` — Dark theme color system (APEX OS palette)

## Architecture decisions

- Frontend-only: No backend/database — all data is hardcoded/simulated for the hackathon demo
- Cinematic intro plays on every load (3s auto-dismiss or click Skip)
- Lenis smooth scroll activates after intro completes
- Dark mode forced permanently via `document.documentElement.classList.add("dark")`
- Canvas-based particle animations for hero, galaxy, neural network, and final sections
- All sections use Framer Motion `whileInView` for scroll-triggered entrance animations

## Product

APEX OS combines AI agents, career intelligence, adaptive learning, automation workflows, and future self simulation inside one cinematic ecosystem. Designed to win national-level hackathons through visual dominance and immersive interaction design.

## Color System

- Background: `#0B0B0F` / Secondary: `#141414`
- Card: `#1C1C1F` / Elevated: `#232326`
- Primary Accent: `#E50914` (Netflix red) / Glow: `#FF3B47`
- AI Blue: `rgba(88,101,242,0.12)`
- Text: `#FFFFFF` / Secondary: `#B3B3B3` / Muted: `#7A7A7A`
- Borders: `#2A2A2E`

## User preferences

- Design-first, cinematic quality over feature quantity
- No emojis in the UI
- All animations should feel premium and intentional

## Gotchas

- Google Fonts import MUST be the first line in index.css (before tailwind imports)
- Lenis smooth scroll only initializes after intro completes
- Canvas elements use `absolute inset-0` and need a `relative` parent with explicit height
