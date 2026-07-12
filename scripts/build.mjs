import { cp, mkdir, readFile, rm, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceDir = path.join(projectRoot, 'site');
const outputDir = path.join(projectRoot, 'dist');

const requiredFiles = [
  'index.html',
  'book/index.html',
  'privacy/index.html',
  'terms/index.html',
  'favicon.ico',
  'favicon.svg',
  'nexgenbinary-logo.png',
  'site.webmanifest',
  'robots.txt',
  '.nojekyll'
];

for (const relativePath of requiredFiles) {
  const filePath = path.join(sourceDir, relativePath);
  const fileStat = await stat(filePath).catch(() => null);
  if (!fileStat?.isFile()) {
    throw new Error(`Required deployment file is missing: site/${relativePath}`);
  }
}

const pageFiles = [
  'index.html',
  'book/index.html',
  'privacy/index.html',
  'terms/index.html'
];

const requiredContent = [
  '(804) 460-9640',
  'tel:+18044609640'
];

for (const relativePath of pageFiles) {
  const html = await readFile(path.join(sourceDir, relativePath), 'utf8');
  for (const expected of requiredContent) {
    if (!html.includes(expected)) {
      throw new Error(`Expected content is missing from site/${relativePath}: ${expected}`);
    }
  }
}

const homeHtml = await readFile(path.join(sourceDir, 'index.html'), 'utf8');
for (const expected of ['11357 Nuckols Rd', 'Glen Allen, VA 23059']) {
  if (!homeHtml.includes(expected)) {
    throw new Error(`Expected contact content is missing from site/index.html: ${expected}`);
  }
}

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });
await cp(sourceDir, outputDir, { recursive: true, force: true });

console.log('Static site copied to dist and verified successfully.');
