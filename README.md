# NexGen Binary staging website

Astro 7 static website for the NexGen Binary GitHub Pages staging environment.

## Current staging configuration

- Staging URL base: `/nexgenbinary-stage`
- Deployment: GitHub Actions workflow in `.github/workflows/astro.yml`
- Staging is intentionally set to `noindex` and `public/robots.txt` blocks crawlers.
- The navbar logo, page-header logos, favicon, Apple touch icon, and web-app icons use the supplied NexGen Binary transparent logo artwork.
- Main phone: `(804) 460-9640`
- Address: `11357 Nuckols Rd, Glen Allen, VA 23059`

## Edit site content

Most business copy, contact details, plan descriptions, and booking/form settings are in:

- `src/content/site.json`

Global styles are in:

- `src/styles/custom.css`

## Contact form behavior

`contact.formEndpoint` is currently blank. Until an endpoint is added, the validated contact form opens the visitor's email app with a prepared message addressed to `info@nexgenbinary.com`. To submit directly from the website, add a Formspree or compatible HTTPS endpoint to `contact.formEndpoint` in `src/content/site.json`.

## Booking behavior

`bookings.url` and `bookings.embedUrl` are currently blank. Booking buttons therefore route visitors to the contact section, and the booking page displays phone/email/contact options instead of a broken iframe. Add the final scheduling URL in `src/content/site.json` when available.

## Local build

Requires Node.js 22 or newer.

```bash
npm ci
npm run build
```

The generated static site is written to `dist/`.

## Deploy to GitHub Pages

1. Extract/copy this package into the staging repository root.
2. Commit and push to the `main` branch.
3. In GitHub repository settings, set **Pages → Source** to **GitHub Actions**.
4. The included workflow installs dependencies, builds Astro, and deploys `dist/`.

For production, update `site` and `base` in `astro.config.mjs`, remove the staging `noindex` meta tag from `src/layouts/Base.astro`, and replace `public/robots.txt` with the production crawl policy.
