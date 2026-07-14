#!/usr/bin/env python3
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse, unquote
import re, sys

ROOT = Path(sys.argv[1]).resolve()
PREFIX = '/nexgenbinary-stage/'
REQUIRED = [
    'index.html','404.html','robots.txt','site.webmanifest','assets/site.css','assets/site.js',
    'book/index.html','privacy/index.html','terms/index.html','nexgenbinary-logo.png','favicon.ico'
]
for item in REQUIRED:
    if not (ROOT / item).is_file(): raise SystemExit(f'Missing required file: {item}')

class Parser(HTMLParser):
    def __init__(self):
        super().__init__(); self.refs=[]
    def handle_starttag(self, tag, attrs):
        d=dict(attrs)
        for key in ('href','src','data-src'):
            value=d.get(key)
            if value: self.refs.append((tag,key,value))

html_files=list(ROOT.rglob('*.html'))
if not html_files: raise SystemExit('No HTML files found.')
errors=[]
for path in html_files:
    text=path.read_text(encoding='utf-8')
    p=Parser(); p.feed(text)
    for tag,key,ref in p.refs:
        if ref.startswith(('#','mailto:','tel:','javascript:','data:')): continue
        parsed=urlparse(ref)
        if parsed.scheme in ('http','https'): continue
        clean=unquote(parsed.path)
        if clean.startswith(PREFIX): clean=clean[len(PREFIX):]
        elif clean.startswith('/'): clean=clean[1:]
        if not clean: clean='index.html'
        target=ROOT / clean
        if clean.endswith('/'): target=target/'index.html'
        elif not target.suffix and target.is_dir(): target=target/'index.html'
        if not target.exists(): errors.append(f'{path.relative_to(ROOT)}: missing {ref}')

index=(ROOT/'index.html').read_text(encoding='utf-8')
for required in [
    'https://formspree.io/f/mdalpbzo',
    '267e959c-42c0-45b2-a4d2-45621dbc4f28',
    'https://outlook.office.com/book/MeetNexGenBinary@nexgenbinary.com/',
    'Send Message', 'data-booking-open', 'data-back-to-top'
]:
    if required not in index: errors.append(f'index.html missing required marker: {required}')
if index.count('class="plan-row"') != 24: errors.append('index.html must contain 24 service-plan rows.')
if 'default email app will open' in index: errors.append('Old mail-app-only form wording remains.')
if 'select healthcare organizations' in index: errors.append('Old mixed healthcare positioning remains.')
for legal in ('privacy/index.html','terms/index.html'):
    text=(ROOT/legal).read_text(encoding='utf-8')
    if 'Last updated:' in text: errors.append(f'{legal} still contains Last updated text.')
    if 'with an updated date' in text: errors.append(f'{legal} still promises a visible updated date.')
if 'Online scheduling is being finalized' in (ROOT/'book/index.html').read_text(encoding='utf-8'):
    errors.append('book/index.html still contains stale scheduling text.')
if errors:
    raise SystemExit('\n'.join(errors))
print(f'Validated {len(html_files)} HTML files in {ROOT}')
