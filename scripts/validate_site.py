#!/usr/bin/env python3
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse, unquote
import argparse

parser = argparse.ArgumentParser()
parser.add_argument("root", nargs="?", default=".")
parser.add_argument("--clean", action="store_true")
args = parser.parse_args()

ROOT = Path(args.root).resolve()
PREFIX = "/nexgenbinary-stage/"
BUILD = "v28-phone-ui-no-green-badge-2026-07-17"
CACHE = "20260717v28"
GOOGLE_FALLBACK_URL = "https://www.google.com/maps/search/?api=1&query=NexGen%20Binary%20LLC%20%28804%29%20460-9640"

REQUIRED = [
    "index.html", "404.html", "robots.txt", "site.webmanifest",
    "assets/site.css", "assets/site.js", "book/index.html",
    "privacy/index.html", "terms/index.html", "nexgenbinary-logo.png",
    "favicon.ico", "favicon.svg", "favicon-16x16.png",
    "favicon-32x32.png", "favicon-192x192.png",
    "favicon-512x512.png", "apple-touch-icon.png",
]

for item in REQUIRED:
    if not (ROOT / item).is_file():
        raise SystemExit(f"Missing required file: {item}")

class Parser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.refs = []
        self.ids = set()
        self.duplicates = set()
        self.phones = []
        self.google_links = []

    def handle_starttag(self, tag, attrs):
        data = dict(attrs)
        element_id = data.get("id")

        if element_id:
            if element_id in self.ids:
                self.duplicates.add(element_id)
            self.ids.add(element_id)

        if "data-call-phone" in data:
            self.phones.append(
                (tag, data.get("type"), data.get("title"), data.get("aria-label"))
            )

        if "google-business" in data.get("class", "").split():
            self.google_links.append((tag, data.get("href")))

        for key in ("href", "src", "data-src"):
            value = data.get(key)
            if value:
                self.refs.append(value)

errors = []
phone_count = 0
html_files = sorted(ROOT.rglob("*.html"))

for path in html_files:
    text = path.read_text(encoding="utf-8")
    parsed = Parser()
    parsed.feed(text)

    if parsed.duplicates:
        errors.append(f"{path.relative_to(ROOT)} duplicate IDs: {sorted(parsed.duplicates)}")

    if BUILD not in text:
        errors.append(f"{path.relative_to(ROOT)} missing build marker")

    if f"site.css?v={CACHE}" not in text:
        errors.append(f"{path.relative_to(ROOT)} missing CSS cache version")

    if f"site.js?v={CACHE}" not in text:
        errors.append(f"{path.relative_to(ROOT)} missing JS cache version")

    if 'name="viewport"' not in text:
        errors.append(f"{path.relative_to(ROOT)} missing viewport metadata")

    for tag, control_type, title, aria_label in parsed.phones:
        phone_count += 1
        if tag != "button" or control_type != "button":
            errors.append(f"{path.relative_to(ROOT)} phone control must be a button")
        if title is not None:
            errors.append(f"{path.relative_to(ROOT)} phone control still has a tooltip title")
        if not aria_label or any(character.isdigit() for character in aria_label):
            errors.append(f"{path.relative_to(ROOT)} phone aria-label is detectable numeric text")

    if not parsed.google_links:
        errors.append(f"{path.relative_to(ROOT)} missing Google Business link")

    for tag, href in parsed.google_links:
        if tag != "a" or href != GOOGLE_FALLBACK_URL:
            errors.append(f"{path.relative_to(ROOT)} incorrect Google link: {href}")

    for ref in parsed.refs:
        if ref.startswith(("#", "mailto:", "tel:", "javascript:", "data:")):
            continue

        parsed_url = urlparse(ref)
        if parsed_url.scheme in ("http", "https"):
            continue

        clean = unquote(parsed_url.path)
        if clean.startswith(PREFIX):
            clean = clean[len(PREFIX):]
        elif clean.startswith("/"):
            clean = clean[1:]

        if not clean:
            clean = "index.html"

        target = ROOT / clean
        if clean.endswith("/"):
            target = target / "index.html"
        elif not target.suffix and target.is_dir():
            target = target / "index.html"

        if not target.exists():
            errors.append(f"{path.relative_to(ROOT)} missing local reference: {ref}")

if phone_count != 14:
    errors.append(f"Expected 14 phone controls, found {phone_count}")

index = (ROOT / "index.html").read_text(encoding="utf-8")

if "(804) 460-9640</span>" in index:
    errors.append("Homepage still has a numeric phone text node")

for symbol in ("📞", "☎", "📱", "📲", "🤙"):
    if symbol in index:
        errors.append(f"Homepage still contains unwanted phone symbol: {symbol}")

if index.count('class="plan-row"') != 24:
    errors.append("index.html must contain 24 service-plan rows")

for marker in (
    "https://formspree.io/f/mdalpbzo",
    "267e959c-42c0-45b2-a4d2-45621dbc4f28",
    "https://outlook.office.com/book/MeetNexGenBinary@nexgenbinary.com/",
    "VoIP, business audio systems, and camera solutions planned for reliable coverage",
    "data-booking-open", "data-back-to-top",
):
    if marker not in index:
        errors.append(f"index.html missing marker: {marker}")

site_css = (ROOT / "assets/site.css").read_text(encoding="utf-8")
if '.phone-number-display::before' not in site_css:
    errors.append("assets/site.css is missing the visible phone number")

site_js = (ROOT / "assets/site.js").read_text(encoding="utf-8")
for marker in (
    "const dialUri = 'tel:+18044609640'",
    "document.querySelectorAll('[data-call-phone]')",
    "window.location.href = dialUri",
    "scrollReloadToTop",
):
    if marker not in site_js:
        errors.append(f"assets/site.js missing marker: {marker}")

for stale in ("sanitizePhoneLink", "decorativePhoneCharacters"):
    if stale in site_js:
        errors.append(f"assets/site.js contains obsolete sanitizer: {stale}")

if "Disallow: /" not in (ROOT / "robots.txt").read_text(encoding="utf-8"):
    errors.append("robots.txt must block staging crawling")

if errors:
    raise SystemExit("\n".join(errors))

print(f"Validated {len(html_files)} HTML files, {phone_count} phone controls, and Google links in {ROOT}")
