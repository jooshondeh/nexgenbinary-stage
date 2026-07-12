# NexGen Binary staging deployment package

This package contains a fully built static version of the NexGen Binary staging website. It intentionally does not require Astro, Bootstrap, or any other npm dependency during GitHub Actions deployment.

## Why this package fixes exit code 127

The staging repository currently combines an Astro 7 `package.json` with an older workflow that still selects Node.js 20. Astro 7 requires Node.js 22.12 or newer, so the **Build site** step fails.

This package removes that runtime conflict entirely:

- `npm ci` installs no third-party packages.
- `npm run build` uses only Node.js built-in modules.
- The build works with the repository's existing Node 20 workflow and with the included Node 22 workflow.
- The build validates the logo assets, phone number, address, and required pages before copying the static site to `dist/`.

## Included site corrections

- Transparent NexGen Binary logo in the top-left navigation.
- Matching favicon, Apple touch icon, web-app icons, and browser-tab branding.
- Phone number `(804) 460-9640` in the top navigation, home Call button, contact section, booking page, privacy page, and terms page.
- Contact address `11357 Nuckols Rd, Glen Allen, VA 23059` with a Google Maps link.
- Responsive navigation and layouts for desktop, tablet, mobile, and small mobile widths.
- Keyboard focus styling, reduced-motion support, and local compiled CSS/JavaScript assets.
- Staging-only `noindex` and crawler blocking.

## Upload to GitHub

1. Extract this ZIP. Do not upload the ZIP file itself.
2. Upload the extracted contents to the root of `jooshondeh/nexgenbinary-stage`.
3. Replace `package.json` and `package-lock.json` together in the same commit.
4. Make sure the new `site/` and `scripts/` folders are included.
5. The `.github/workflows/astro.yml` file is also updated. After upload, open that file on GitHub and verify it shows Node 22 and `actions/checkout@v5`.
6. Commit to `main`.

Even if the hidden `.github` folder is accidentally missed, the existing Node 20 workflow will still succeed because this package's build script supports Node 20.

## Local verification

```bash
npm ci
npm run build
npm run preview
```

Then open `http://127.0.0.1:4321/nexgenbinary-stage/`.
