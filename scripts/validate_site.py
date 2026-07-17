#!/usr/bin/env python3
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse, unquote
import argparse

parser = argparse.ArgumentParser(description="Validate the NexGen Binary static website.")
parser.add_argument("root", nargs="?", default=".")
parser.add_argument("--clean", action="store_true")
args = parser.parse_args()

ROOT = Path(args.root).resolve()
PREFIX = "/nexgenbinary-stage/"
BUILD = "v26-remove-green-phone-decorations-2026-07-17"
CACHE = "20260717v26"
PHONE_HREF = "tel:+18044609640"

REQUIRED = [
    "index.html", "404.html", "robots.txt", "site.webmanifest",
    "assets/site.css", "assets/site.js", "book/index.html",
    "privacy/index.html", "terms/index.html", "nexgenbinary-logo.png",
    "favicon.ico", "favicon.svg", "favicon-16x16.png",
    "favicon-32x32.png", "favicon-192x192.png",
    "favicon-512x512.png", "apple-touch-icon.png",
]

OBSOLETE = [
    "_astro", "site-fixes-v3.css", "site-fixes-v4.css",
    "site-fixes-v5.css", "site-fixes-v6.css",
]

for item in REQUIRED:
    if not (ROOT / item).is_file():
        raise SystemExit(f"Missing required file: {item}")

if args.clean:
    for item in OBSOLETE:
        if (ROOT / item).exists():
            raise SystemExit(f"Obsolete item in deployment artifact: {item}")

class Parser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.refs = []
        self.ids = set()
        self.duplicates = set()
        self.phones = []
        self.images_without_alt = []

    def handle_starttag(self, tag, attrs):
        data = dict(attrs)
        element_id = data.get("id")
        if element_id:
            if element_id in self.ids:
                self.duplicates.add(element_id)
            self.ids.add(element_id)

        if "data-call-phone" in data:
            self.phones.append((tag, data.get("href"), data.get("title")))

        if tag == "img" and "alt" not in data:
            self.images_without_alt.append(data.get("src", "<unknown>"))

        for key in ("href", "src", "data-src"):
            if data.get(key):
                self.refs.append(data[key])

errors = []
phone_count = 0
html_files = sorted(ROOT.rglob("*.html"))

for path in html_files:
    text = path.read_text(encoding="utf-8")
    parsed = Parser()
    parsed.feed(text)

    if parsed.duplicates:
        errors.append(f"{path.relative_to(ROOT)} duplicate IDs: {sorted(parsed.duplicates)}")
    if parsed.images_without_alt:
        errors.append(f"{path.relative_to(ROOT)} images missing alt: {parsed.images_without_alt}")
    if BUILD not in text:
        errors.append(f"{path.relative_to(ROOT)} missing build marker")
    if f"site.css?v={CACHE}" not in text:
        errors.append(f"{path.relative_to(ROOT)} missing CSS cache version")
    if f"site.js?v={CACHE}" not in text:
        errors.append(f"{path.relative_to(ROOT)} missing JS cache version")
    if 'name="viewport"' not in text:
        errors.append(f"{path.relative_to(ROOT)} missing viewport meta")

    for tag, href, title in parsed.phones:
        phone_count += 1
        if tag != "a":
            errors.append(f"{path.relative_to(ROOT)} phone control is <{tag}> instead of <a>")
        if href != PHONE_HREF:
            errors.append(f"{path.relative_to(ROOT)} incorrect phone href: {href}")
        if not title:
            errors.append(f"{path.relative_to(ROOT)} phone link missing title")

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
    errors.append(f"Expected 14 native phone links, found {phone_count}")

index = (ROOT / "index.html").read_text(encoding="utf-8")
for marker in [
    "https://formspree.io/f/mdalpbzo",
    "267e959c-42c0-45b2-a4d2-45621dbc4f28",
    "https://outlook.office.com/book/MeetNexGenBinary@nexgenbinary.com/",
    "Send Message", "Email Us Directly",
    "data-booking-open", "data-back-to-top",
    "VoIP, business audio systems, and camera solutions planned for reliable coverage",
]:
    if marker not in index:
        errors.append(f"index.html missing marker: {marker}")

if index.count('class="plan-row"') != 24:
    errors.append("index.html must contain 24 service-plan rows")

site_js = (ROOT / "assets/site.js").read_text(encoding="utf-8")
for obsolete in ("const dialUri", "window.location.href = dialUri",
                 "sanitizePhoneControls", "sanitizePhoneControl"):
    if obsolete in site_js:
        errors.append(f"assets/site.js contains obsolete phone code: {obsolete}")

if "scrollReloadToTop" not in site_js:
    errors.append("assets/site.js missing refresh-to-top behavior")

for required_phone_cleanup in (
    "const sanitizePhoneLink",
    "decorativePhoneCharacters",
    "data-phone-text",
):
    if required_phone_cleanup not in site_js and required_phone_cleanup != "data-phone-text":
        errors.append(f"assets/site.js missing phone-cleanup marker: {required_phone_cleanup}")

for page in html_files:
    page_text = page.read_text(encoding="utf-8")
    if "data-call-phone" in page_text and "data-phone-text" not in page_text:
        errors.append(f"{page.relative_to(ROOT)} missing data-phone-text protection")

book = (ROOT / "book/index.html").read_text(encoding="utf-8")
for marker in ("Microsoft Bookings", "Open Booking in a New Tab",
               "Please do not include", "Send a Message Instead"):
    if marker not in book:
        errors.append(f"book/index.html missing: {marker}")

if "Disallow: /" not in (ROOT / "robots.txt").read_text(encoding="utf-8"):
    errors.append("robots.txt must block staging crawling")

if errors:
    raise SystemExit("\n".join(errors))

print(f"Validated {len(html_files)} HTML files and {phone_count} native telephone links in {ROOT}")
