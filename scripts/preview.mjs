import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const siteRoot = path.join(projectRoot, 'site');
const basePath = '/nexgenbinary-stage';
const port = Number(process.env.PORT || 4321);

const mimeTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.ico', 'image/x-icon'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml; charset=utf-8'],
  ['.txt', 'text/plain; charset=utf-8'],
  ['.webmanifest', 'application/manifest+json; charset=utf-8']
]);

const server = createServer(async (request, response) => {
  try {
    const requestUrl = new URL(request.url || '/', `http://${request.headers.host || 'localhost'}`);
    let pathname = decodeURIComponent(requestUrl.pathname);

    if (pathname === '/') {
      response.writeHead(302, { Location: `${basePath}/` });
      response.end();
      return;
    }

    if (!pathname.startsWith(basePath)) {
      response.writeHead(404);
      response.end('Not found');
      return;
    }

    let relativePath = pathname.slice(basePath.length).replace(/^\/+/, '');
    if (!relativePath || relativePath.endsWith('/')) relativePath += 'index.html';

    const filePath = path.resolve(siteRoot, relativePath);
    if (!filePath.startsWith(siteRoot + path.sep)) {
      response.writeHead(403);
      response.end('Forbidden');
      return;
    }

    const fileStat = await stat(filePath);
    if (!fileStat.isFile()) throw new Error('Not a file');

    response.writeHead(200, {
      'Content-Type': mimeTypes.get(path.extname(filePath).toLowerCase()) || 'application/octet-stream',
      'Cache-Control': 'no-store'
    });
    createReadStream(filePath).pipe(response);
  } catch {
    response.writeHead(404);
    response.end('Not found');
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Preview: http://127.0.0.1:${port}${basePath}/`);
});
