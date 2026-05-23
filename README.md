# Huddle Marketing Site

The marketing site for [huddlesurety.co](https://huddlesurety.co) — built with Next.js 15, React 19, and TypeScript, deployed to Railway.

## Quick start

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. Hot reload is on; changes to components or CSS show up on save.

## Stack

- **Next.js 15** (App Router, server components by default)
- **React 19**
- **TypeScript 5** (strict mode)
- **Plain CSS** in `globals.css` — no Tailwind, no CSS-in-JS. Design tokens (the OKLCH palette, font stacks, spacing) live as CSS variables under `:root` at the top of the file.
- **Hosted on Railway** as a Node server (`next start`).

## Project structure

```
src/
├── app/
│   ├── layout.tsx          ← <html> wrapper, fonts, metadata
│   ├── page.tsx            ← composes the home page
│   └── globals.css         ← all styles
└── components/
    ├── Logo.tsx
    ├── Navigation.tsx      ← scroll-blur effect + mobile drawer (client)
    ├── Hero.tsx
    ├── Wave.tsx            ← 60-bar animated SVG wave (client)
    ├── Introduction.tsx    ← bid-package → bond visual flow
    ├── Features.tsx        ← six-feature showcase with auto-rotate (client)
    ├── FeatureVisuals.tsx  ← the animated "screenshots" for each feature
    ├── Process.tsx         ← scroll-driven sticky steps (client)
    ├── ProcessMocks.tsx    ← three mocks for the process visuals
    ├── Team.tsx            ← team grid (client) — see "Editing team bios" below
    ├── Contact.tsx
    ├── ContactForm.tsx     ← controlled form, validation (client)
    ├── Footer.tsx
    └── effects/
        ├── ScrollReveal.tsx    ← section-header reveal animations (client)
        └── DiamondDots.tsx     ← scroll-linked diamond dot scaling (client)
```

Only the components marked `(client)` use `"use client"`. Everything else server-renders at build time.

## Editing team bios

Each team member's data lives in `src/components/Team.tsx` as an entry in the `team` array (around line 17). To update your own bio, find your entry by `slug` and edit the fields.

Each entry looks like this:

```tsx
{
  slug: "hunter",                                                    // internal id, don't change
  name: "Hunter",                                                    // displayed under the portrait
  role: "CEO",                                                       // optional — small grey label
  badge: "Co-founder",                                               // either "Co-founder" or "Team"
  linkedin: "https://www.linkedin.com/in/hunterdecristo/",           // the small in-portrait link
  image: "/assets/hunter.png",                                       // see "Updating your photo" below
  facts: [
    { k: "Education",  v: <>Economics, <em>Emory University</em> &mdash; class of 2026.</> },
    { k: "Background", v: <>Family has worked in surety for <em>30 years</em>.</> },
    { k: "Off-hours",  v: "Soccer on the pitch, chess at the board." },
  ],
}
```

**Common edits:**

- **Change wording:** edit `name`, `role`, or any `v` text inside `facts`.
- **Add an italicized phrase:** wrap it in `<em>...</em>`. Use this for school names, company names, or anything that deserves emphasis.
- **Add or remove a fact row:** add a `{ k: "Label", v: "Value" }` object to the `facts` array, or delete one. The card auto-expands to fit. Typical labels are "Education", "Background", and "Off-hours" — keep them short (one or two words).
- **Update your LinkedIn URL:** swap the `linkedin` value with your full profile URL.
- **Change your badge:** flip `"Team"` to `"Co-founder"` (or vice versa) if a role changes.
- **`role` is optional:** leave it off for non-titled team members (compare Hunter's and Nate's entries).
- **`size` is an optional portrait-crop tweak:** add `size: "smaller"` or `size: "larger"` if your photo crops awkwardly. Most members don't need this.

**Updating your photo:**

Drop a new file at `public/assets/<your-slug>.png` (e.g. `public/assets/hunter.png`). Filenames are case-sensitive. The site re-uses whatever's at the existing path — no code change needed if you keep the same filename.

Photo specs:
- Square, at least 800×800px (1200×1200 ideal)
- Transparent background works best, but plain white/cream also fine
- Head-and-shoulders crop, centered
- PNG or JPG

**Shipping your changes:**

```bash
git checkout -b update-<your-slug>-bio        # work on a branch
git add src/components/Team.tsx public/assets # commit the file(s) you changed
git commit -m "Update <your name>'s bio"
git push -u origin update-<your-slug>-bio
```

Open a pull request on GitHub. When it's merged into `main`, Railway redeploys automatically and your changes appear on the live site within ~90 seconds.

If you're comfortable pushing directly to `main`:

```bash
git add src/components/Team.tsx public/assets
git commit -m "Update <your name>'s bio"
git push
```

## Editing other content

Most copy is inline in the relevant component's JSX. Two other places use typed arrays for content:

- **Features** → `src/components/Features.tsx`, the `features: Feature[]` array near the top.
- **Process steps** → `src/components/Process.tsx`, the `steps: Step[]` array near the top.

Section headlines, the hero, the intro copy, and contact form labels are all inline in their respective components.

## Type checking

```bash
npm run type-check
```

Runs `tsc --noEmit` to verify types. Run this before committing if you've touched anything beyond plain text — it catches typos in component props or array shapes immediately.

We skip Next's in-build type check (`typescript.ignoreBuildErrors: true` in `next.config.mjs`) because Next 15.5's worker has a bug where it occasionally fails to find its own auto-generated route types. CI should run `npm run type-check` before `npm run build` to keep type safety.

## Deploying

Push to `main` and Railway auto-deploys. Build takes ~90 seconds.

Manually triggering a deploy: Railway dashboard → project → service → **Deployments** tab → click **Redeploy** on the latest commit.

Custom domain setup lives in **Settings → Networking → Custom Domain**. Railway provides a CNAME record; add it at your DNS registrar.

## Local development tips

- `npm run dev` watches everything; no build step needed during development.
- After editing `next.config.mjs` or `package.json`, restart the dev server.
- If the CSS isn't updating in the browser, check the Network tab — sometimes hot reload misses CSS changes. A hard refresh (`Cmd+Shift+R` / `Ctrl+F5`) always works.
- Mobile preview: open Chrome DevTools (`Cmd+Option+I` / `Ctrl+Shift+I`) → click the device-toolbar icon (top-left of the DevTools panel) → pick an iPhone profile.

## Known deferred items

- **Contact form doesn't submit anywhere.** It validates and shows a success state, but there's no backend wired up. See the `TODO` comment in `ContactForm.tsx`. Options when you're ready: Formspree (no-code, free for low volume), Resend + a Next.js API route, or HubSpot Forms API if you want demo requests landing in the CRM.
- **Fonts load via a `<link>` tag** in `layout.tsx` rather than `next/font`. The upgrade is straightforward (import from `next/font/google`, attach the variable to `<html>`, remove the `<link>` tag) and gets you self-hosting + zero CLS. Worth doing once font choices are stable.

## Troubleshooting

**Build fails on Railway but works locally.** Usually a Node version mismatch. Railway should be on Node 20+ — check **Settings → Build** in the Railway dashboard.

**Pushed a change but the site looks identical.** Browser CSS cache. Hard refresh, or open in an incognito window. Railway's CDN can hold the previous CSS file for a minute.

**`git push` rejected with "fetch first".** Someone else (or you, from the GitHub web UI) pushed a commit you don't have locally. Run `git pull --rebase` then `git push`.

**Merge conflict in `globals.css`.** If both branches edited the same CSS, you'll need to manually pick which version wins. Easiest path: `git checkout --ours src/app/globals.css` (keeps your local version) or `--theirs` (keeps the remote version), then `git add` and `git commit`. Verify the result with `npm run build` before pushing.

**Codespaces is slow or unresponsive.** Stop and restart the codespace from github.com/codespaces. Most issues resolve with a fresh container.
