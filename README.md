# Huddle Marketing

The marketing site for huddlesurety.co, migrated from the standalone HTML prototype to Next.js 15 + React 19 + TypeScript. Pixel-faithful to the prototype, broken into reusable components, ready to deploy on Railway.

## Stack

- **Next.js 15** (App Router, server components by default)
- **React 19**
- **TypeScript 5** (strict mode)
- **Plain CSS** in `globals.css` — no Tailwind, no CSS-in-JS. The design tokens (oklch palette, fonts, spacing) live there as CSS variables. If you migrate the marketing site into the same repo as the product app and that app uses Tailwind, you can swap easily — every utility class here has a direct Tailwind equivalent.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Project structure

```
src/
├── app/
│   ├── layout.tsx          ← <html> wrapper, fonts, metadata
│   ├── page.tsx            ← composes the home page
│   └── globals.css         ← all styles (ported 1:1 from the prototype)
└── components/
    ├── Logo.tsx
    ├── Navigation.tsx      ← scroll-blur effect (client)
    ├── Hero.tsx
    ├── Wave.tsx            ← 60-bar animated SVG wave (client)
    ├── Introduction.tsx
    ├── Features.tsx        ← features array — edit here to update cards
    ├── Process.tsx         ← scroll-driven sticky steps (client)
    ├── ProcessMocks.tsx    ← three "screenshot" mocks for the process visuals
    ├── Contact.tsx
    ├── ContactForm.tsx     ← controlled form, validation, fake submit (client)
    └── Footer.tsx
```

Only four components are `"use client"`: Navigation, Wave, Process, ContactForm. Everything else server-renders.

## Editing content

Most copy is inline in the component JSX. Two places use typed arrays:

- **Features** — `src/components/Features.tsx`, `features: Feature[]`
- **Process steps** — `src/components/Process.tsx`, `steps: Step[]`

To add a fourth process step, append to `steps` and add a matching mock component to the `visuals` array. The wrapper height auto-scales from `NUM_STEPS`.

## Type checking

Run `npm run type-check` to validate types. The Next build itself doesn't run `tsc` (we disabled the redundant in-build check in `next.config.ts` — Next 15.5's worker has a bug where it occasionally fails to find its own auto-generated route types). Add `npm run type-check` to your CI step before `npm run build`.

## Deploying to Railway

The standard Next.js Node-server flow. Railway's Nixpacks builder detects Next.js automatically — no config needed.

1. Push to GitHub.
2. In Railway, **New Project → Deploy from GitHub repo** → pick this one.
3. Railway runs `npm install`, `npm run build`, `npm start`. The site is live.
4. Add your custom domain (e.g. `huddlesurety.co`) in Railway's settings.

Railway will keep one Node process running 24/7 to serve the site. For a marketing site that's overkill — see the static-export upgrade below.

### Optional: switch to static export

The site has no SSR data fetching, no API routes, no middleware — it's fully static. To save money and get faster cold loads, switch to a static export served by a tiny static server:

1. Uncomment `output: "export"` in `next.config.ts`.
2. Replace `npm start` in your Railway run command with something like `npx serve out -p $PORT` (after adding `serve` to dependencies). Or use Caddy / Nginx in a Dockerfile.
3. Rebuild.

The whole site becomes ~10 files in `out/`. You can also point Cloudflare Pages or Vercel at the same repo for free edge-cached hosting if you ever want to move it off Railway — both auto-detect `output: "export"`.

## Font loading (upgrade opportunity)

Fonts currently load via a `<link>` tag in `layout.tsx`, matching the prototype. Once you've confirmed both fonts are stable, swap to `next/font` for self-hosting and zero-CLS:

```tsx
// in layout.tsx
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

// then <html className={playfair.variable}>
// and remove the <link> tags
```

`Asta_Sans` may or may not be available in `next/font/google` depending on its Google Fonts status. If `next/font/google` doesn't accept it, host the `.woff2` files in `public/fonts/` and load them via `next/font/local` instead. Then remove the corresponding `@font-face` entries from globals.css (none exist yet — they'd be added in the migration).

## Wiring up the contact form

The form in `ContactForm.tsx` validates and shows a success state but doesn't submit anywhere yet. There's a `TODO` comment marking the spot. Three reasonable paths:

1. **Resend or Postmark** — POST to a `/api/contact` route that sends an email.
2. **HubSpot Forms API** — drop captured leads straight into the CRM.
3. **Formspree / Basin** — no-code form backend, zero infrastructure.

If you go with option 1, note that the site is currently configured for the Node-server build. If you switch to static export later, you'd need to move that endpoint off the marketing site (e.g. into the main Huddle backend).

## What carried over from the prototype

Everything visual — same OKLCH palette, same Playfair Display / Asta Sans pairing, same noise overlay, same hero headline reveal, same wave animation logic (60 bars, irregular sine, 30s period), same scroll-driven process section, same asymmetric features grid (7/5, 5/7, 6/6), same contact form layout and validation rules.

The only meaningful behavior change is that the wave animation now cleans up its DOM nodes on unmount (the prototype didn't need to because the page never unmounted). This matters for React Strict Mode in dev — without cleanup, you'd see duplicate bars.
