# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- `npm run dev` — dev server at http://localhost:3000 (no base path in dev)
- `npm run build` — static export to `out/` (this is what CI deploys)
- `npm run lint` — ESLint (flat config, `eslint-config-next`)

There is no test suite. Verify changes with `npm run build` (type-checks and catches static-export problems) and by viewing the page in the dev server.

## Stack

Next.js 16 App Router, React 19, Tailwind CSS v4 (CSS-first config, no `tailwind.config`), framer-motion, TypeScript. Per AGENTS.md, check `node_modules/next/dist/docs/` before using Next APIs — e.g. pages use the generated global `PageProps<"/route">` / `LayoutProps<"/">` types and `await props.params`.

## Deployment / static export constraints

- Deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.
- `next.config.ts` sets `output: "export"`, `trailingSlash: true`, and `basePath` from `src/lib/site.ts`. `BASE_PATH` is `/lmiller_portfolio` only in production builds.
- Because it is a static export: no server actions, route handlers, or runtime dynamic routes. Every dynamic route must have `generateStaticParams` (see `src/app/work/[slug]` and `src/app/other/[slug]`).
- `next/link` and `next/image` apply the base path automatically; plain `<a href>` to files in `public/` (e.g. a resume PDF) must prefix `BASE_PATH` manually.

## Architecture

**Content is data-driven.** Projects live in `src/data/work.ts` (professional work, with structured `sections` rendered on `/work/[slug]`) and `src/data/otherThings.ts` (side projects with repo links, rendered on `/other/[slug]`; optional `mediumUrl` and a `post` write-up with objectives / engineering / science / takeaways paragraphs). Adding an entry to either array automatically adds a cow to the home page and generates its detail page. Each entry picks a `CowVariant` defined in `src/components/Cow.tsx`. Skills are in `src/data/skills.ts`.

**Home page "walking field".** `src/app/page.tsx` merges both data arrays into cows rendered inside `WalkingField`:
- `WalkingField` hijacks vertical wheel scroll on desktop (≥768px) and converts it into a horizontal `shift` motion value until the row is fully scrolled, then lets the page scroll normally to the footer. On mobile it's a plain vertical stack. It also tracks pointer position and a `locked` flag (set while a cow's speech bubble is open, freezing scroll).
- These values are shared via `WalkingFieldContext`. `CowUnit` reads the context but must also work **without** a provider (the footer's About/Contact cows), so it falls back to inert local motion values — keep that fallback when changing the context shape.
- `CowUnit` drives walking, mouse-magnet attraction, and open/scale via a hand-rolled spring (`stepSpring`) inside `useAnimationFrame`, deliberately not framer-motion's `useSpring` (which didn't react to motion values updated outside its tree). Every cow chases the same shared target so they converge to the same rest position.
- Per-cow speed, depth, and entrance angle come from `seededRange` (`src/lib/cowMotion.ts`), a deterministic hash of the slug, so values are stable across SSR and client renders. Values that end up in SSR'd inline styles are rounded to avoid hydration mismatch warnings.
- Visited cows are tracked in `localStorage` via `useVisited` (`useSyncExternalStore`, server snapshot always `false`).
- Respect `useReducedMotion()` for any new animation, as existing components do.

**Page transitions** come from `src/app/template.tsx` (fade/slide on every navigation). `Footer` is rendered globally from `layout.tsx`.

## Styling

Theme colors are CSS variables in `src/app/globals.css` (`--paper`, `--ink`, `--ink-soft`, `--rule`, `--accent`, `--cream`, ...) exposed to Tailwind via `@theme inline`, so use utilities like `bg-paper`, `text-ink`, `text-accent` rather than hard-coded colors. The whole site uses IBM Plex Mono (`--font-plex-mono`). Cow-specific keyframes also live in `globals.css`.
