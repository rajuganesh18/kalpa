# Kalpa — Season 1: Meera

Interactive stories where your choices are remembered.
Web-first PWA (Next.js App Router) — the same build serves the webpage and the installable mobile app.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

Production:

```bash
npm run build && npm start
```

Deploy: push to GitHub → import in Vercel (zero config). The manifest + theme color make it installable ("Add to Home Screen") on Android/Chrome immediately.

## What's inside

```
app/
  page.tsx               Shelf (home): today strip, series cards, continue logic
  s/[slug]/page.tsx      Series page: episode list, locking, restart
  s/[slug]/[ep]/page.tsx Episode route → Reader
  layout.tsx, globals.css
components/
  Reader.tsx             Recap interstitial + gated branching reader + end card
  SceneArt.tsx           Storyboard SVG scenes (swap for sprite/splash images)
lib/
  types.ts               Episode DSL types
  content/meera.ts       All 4 episodes as data (5 flags, braided branching)
  state.ts               Per-series persistence (localStorage; Supabase-ready seam)
public/
  manifest.webmanifest, icon.svg
```

## The content model

Episodes are **data, not code**: arrays of typed nodes (`label | panel | phone | choice | end`).
Conditional nodes/blocks carry `when: (flags) => boolean`. Choices write flags once (final),
and every flag is read again later — recaps, dialogue variants, and Episode 4's confession all
depend on choices made in Episodes 1–3.

Flags in Season 1: `kabir_open`, `asked_aditya`, `texted_unknown`, `met_rhea`, `gave_chance`.

## Swapping in real art

`SceneArt.tsx` maps scene ids → SVG storyboards. In production, map the same ids to
composited sprite/background WebP images (or generated splash panels) and nothing else changes.

## Path to Supabase / payments (per the build plan)

- `lib/state.ts` is the seam: replace localStorage read/write with `reader_state` upserts
  behind the same hook API. Anonymous Supabase auth first, phone OTP at purchase.
- Locked episodes / coins: add an unlock check in the episode route before rendering `Reader`
  (server RPC decides, never the client).

## Play Store later

Wrap the deployed PWA as a TWA with Bubblewrap:
`npx @bubblewrap/cli init --manifest https://yourdomain/manifest.webmanifest` — no rewrite.
