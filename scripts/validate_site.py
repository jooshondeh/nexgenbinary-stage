#!/usr/bin/env python3
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse, unquote
import argparse

parser = argparse.ArgumentParser(description="Validate the NexGen Binary static website.")
parser.add_argument("root", nargs="?", default=".")
parser.add_argument("--clean", action="store_true", help="Require a clean deployment artifact.")
args = parser.parse_args()

ROOT = Path(args.root).resolve()
PREFIX = "/nexgenbinary-stage/"
BUILD = "v20-recommended-adjustments-2026-07-14"
CACHE = "20260714v20"

REQUIRED = [
    "index.html",
    "404.html",
    "robots.txt",
    "site.webmanifest",
    "assets/site.css",
    "assets/site.js",
    "book/index.html",
    "privacy/index.html",
    "terms/index.html",
    "nexgenbinary-logo.png",
    "favicon.ico",
    "favicon.svg",
    "favicon-16x16.png",
    "favicon-32x32.png",
    "favicon-192x192.png",
    "favicon-512x512.png",
    "apple-touch-icon.png",
]

OBSOLETE = [
    "_astro",
    "site-fixes-v3.css",
    "site-fixes-v4.css",
    "site-fixes-v5.css",
    "site-fixes-v6.css",
]

for item in REQUIRED:
    if not (ROOT / item).is_file():
        raise SystemExit(f"Missing required file: {item}")

if args.clean:
    for item in OBSOLETE:
        if (ROOT / item).exists():
            raise SystemExit(f"Obsolete item must not be in deployment artifact: {item}")

class Parser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.refs = []
        self.ids = set()
        self.duplicate_ids = set()

    def handle_starttag(self, tag, attrs):
        data = dict(attrs)
        element_id = data.get("id")
        if element_id:
            if element_id in self.ids:
                self.duplicate_ids.add(element_id)
            self.ids.add(element_id)

        for key in ("href", "src", "data-src"):
            value = data.get(key)
            if value:
                self.refs.append((tag, key, value))

html_files = sorted(ROOT.rglob("*.html"))
if not html_files:
    raise SystemExit("No HTML files found.")

errors = []

for path in html_files:
    text = path.read_text(encoding="utf-8")
    parsed_html = Parser()
    parsed_html.feed(text)

    if parsed_html.duplicate_ids:
        errors.append(
            f"{path.relative_to(ROOT)}: duplicate IDs: "
            + ", ".join(sorted(parsed_html.duplicate_ids))
        )

    if BUILD not in text:
        errors.append(f"{path.relative_to(ROOT)}: missing build marker {BUILD}")

    if f"site.css?v={CACHE}" not in text:
        errors.append(f"{path.relative_to(ROOT)}: missing CSS cache version {CACHE}")

    if f"site.js?v={CACHE}" not in text:
        errors.append(f"{path.relative_to(ROOT)}: missing JS cache version {CACHE}")

    for tag, key, ref in parsed_html.refs:
        if ref.startswith(("#", "mailto:", "tel:", "javascript:", "data:")):
            continue

        parsed = urlparse(ref)
        if parsed.scheme in ("http", "https"):
            continue

        clean = unquote(parsed.path)
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
            errors.append(f"{path.relative_to(ROOT)}: missing local reference {ref}")

index = (ROOT / "index.html").read_text(encoding="utf-8")

required_markers = [
    "https://formspree.io/f/mdalpbzo",
    "267e959c-42c0-45b2-a4d2-45621dbc4f28",
    "https://outlook.office.com/book/MeetNexGenBinary@nexgenbinary.com/",
    "Send Message",
    "Email Us Directly",
    "data-booking-open",
    "data-back-to-top",
    "VoIP, business audio systems, and camera solutions planned for reliable coverage",
    "Support availability",
    "Standard business-hours coverage",
    "Priority and after-hours coverage",
]

for marker in required_markers:
    if marker not in index:
        errors.append(f"index.html missing required marker: {marker}")

if index.count('class="plan-row"') != 24:
    errors.append("index.html must contain exactly 24 service-plan rows.")

for stale in [
    "VoIP, audio, and camera solutions planned for reliable coverage",
    "Email Using My Mail App",
    "Online scheduling is being finalized",
    "select healthcare organizations",
]:
    if stale in index:
        errors.append(f"index.html still contains stale text: {stale}")

for legal in ("privacy/index.html", "terms/index.html"):
    text = (ROOT / legal).read_text(encoding="utf-8")
    if "Last updated:" in text:
        errors.append(f"{legal} still contains Last updated text.")
    if "with an updated date" in text:
        errors.append(f"{legal} still promises a visible updated date.")

book = (ROOT / "book/index.html").read_text(encoding="utf-8")
if "Online scheduling is being finalized" in book:
    errors.append("book/index.html still contains stale scheduling text.")

manifest = (ROOT / "site.webmanifest").read_text(encoding="utf-8")
for required in (
    '"start_url": "/nexgenbinary-stage/"',
    '"scope": "/nexgenbinary-stage/"',
):
    if required not in manifest:
        errors.append(f"site.webmanifest missing staging setting: {required}")

robots = (ROOT / "robots.txt").read_text(encoding="utf-8")
if "Disallow: /" not in robots:
    errors.append("robots.txt must continue blocking staging-site crawling.")

if errors:
    raise SystemExit("\n".join(errors))

print(f"Validated {len(html_files)} HTML files in {ROOT}")
