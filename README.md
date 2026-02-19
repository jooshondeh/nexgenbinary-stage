# NexGen Binary Website (Astro + Bootstrap)

## What this is
Single-page (scrolling) site for NexGen Binary.

## Edit content (easy)
- `src/content/site.json` (most text + links)
- `src/styles/custom.css` (colors, spacing)

## Deploy (GitHub Pages)
Settings → Pages → **Source: GitHub Actions**
Then push to `main`.

## Important for staging
If your staging URL is `https://ORG.github.io/REPO/` then you must set:
- `base: '/REPO'` in `astro.config.mjs`
