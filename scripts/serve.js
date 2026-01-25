import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT, 'dist');

const PORT = process.env.PORT || 8080;

// MIME types for serving files
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.otf': 'font/otf',
  '.ttf': 'font/ttf',
  '.pdf': 'application/pdf',
};

const server = http.createServer(async (req, res) => {
  let filePath = path.join(DIST_DIR, req.url === '/' ? 'index.html' : req.url);
  
  // Handle clean URLs
  const ext = path.extname(filePath);
  if (!ext) {
    filePath += '.html';
  }
  
  try {
    const content = await fs.readFile(filePath);
    const mimeType = MIME_TYPES[path.extname(filePath)] || 'application/octet-stream';
    
    res.writeHead(200, { 'Content-Type': mimeType });
    res.end(content);
  } catch {
    try {
      const notFound = await fs.readFile(path.join(DIST_DIR, '404.html'));
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end(notFound);
    } catch {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
    }
  }
});

server.listen(PORT, () => {
  console.log(`🌐 Preview server running at http://localhost:${PORT}`);
  console.log(`   Serving: ${DIST_DIR}`);
});
