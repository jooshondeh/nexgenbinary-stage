# Staging update — July 12, 2026

## Requested changes completed

- Replaced the top-left navigation logo with the supplied transparent NexGen Binary logo.
- Created and connected matching browser-tab/favicon assets, Apple touch icon, and web-app icons.
- Updated the phone number in the navigation/top row, home call-to-action, contact section, booking page, and legal pages to `(804) 460-9640` with `tel:+18044609640` links.
- Updated the contact address to `11357 Nuckols Rd, Glen Allen, VA 23059` and linked it to Google Maps.

## Quality and compatibility improvements

- Restored missing homepage content data so hero, services, philosophy, comparison plans, and contact copy render completely.
- Bundled Bootstrap locally through Astro rather than relying on a third-party CDN.
- Upgraded the build stack to Astro 7 on Node.js 22 and refreshed dependencies; `npm audit` reports zero known vulnerabilities.
- Added responsive logo sizing, mobile navigation refinements, keyboard focus styles, reduced-motion support, touch-friendly controls, and mobile-safe layout rules.
- Added canonical, Open Graph, Twitter, manifest, and refreshed favicon metadata.
- Added graceful fallbacks for unconfigured booking and contact-form services.
- Kept staging private from search indexing with `noindex` and `public/robots.txt`.

## Verification performed

- Clean Astro production build completed successfully.
- Render-tested desktop, tablet, mobile, and small-mobile layouts at 1440×1100, 768×1024, 390×844, and 320×700.
- Verified no horizontal overflow at any tested viewport and verified the mobile navigation opens correctly.
- All four routes generated: home, booking, privacy, and terms.
- Verified the new phone number appears in the navigation, home call button, and contact section.
- Verified the address and map link in the contact section.
- Verified the supplied full logo is used in page headers and the extracted orange brand mark is used for browser icons.
- Verified there are no stale placeholder phone numbers or placeholder production-domain links in shipped source/build output.
