import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { watch } from 'chokidar';
import { spawn } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT, 'dist');

const PORT = 3000;
const LIVE_RELOAD_PORT = 35729;

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

// Connected clients for live reload
const clients = new Set();

/**
 * Live reload script injected into HTML pages
 */
const LIVE_RELOAD_SCRIPT = `
<script>
  (function() {
    const ws = new WebSocket('ws://localhost:${LIVE_RELOAD_PORT}');
    ws.onmessage = function(event) {
      if (event.data === 'reload') {
        location.reload();
      }
    };
    ws.onclose = function() {
      console.log('Live reload disconnected. Attempting reconnect...');
      setTimeout(() => location.reload(), 1000);
    };
  })();
</script>
</body>`;

/**
 * Run the build script
 */
const runBuild = () => {
  return new Promise((resolve, reject) => {
    console.log('\n🔄 Rebuilding...\n');
    const build = spawn('node', ['scripts/build.js'], {
      cwd: ROOT,
      stdio: 'inherit',
    });
    
    build.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Build failed with code ${code}`));
      }
    });
  });
};

/**
 * Notify all connected clients to reload
 */
const notifyClients = () => {
  for (const client of clients) {
    try {
      client.send('reload');
    } catch {
      clients.delete(client);
    }
  }
};

/**
 * Create the static file server
 */
const createServer = () => {
  return http.createServer(async (req, res) => {
    let filePath = path.join(DIST_DIR, req.url === '/' ? 'index.html' : req.url);
    
    // Handle clean URLs (no .html extension)
    const ext = path.extname(filePath);
    if (!ext) {
      filePath += '.html';
    }
    
    try {
      let content = await fs.readFile(filePath);
      const mimeType = MIME_TYPES[path.extname(filePath)] || 'application/octet-stream';
      
      // Inject live reload script into HTML pages
      if (mimeType === 'text/html') {
        content = content.toString().replace('</body>', LIVE_RELOAD_SCRIPT);
      }
      
      res.writeHead(200, { 'Content-Type': mimeType });
      res.end(content);
    } catch (error) {
      // Try 404 page
      try {
        const notFound = await fs.readFile(path.join(DIST_DIR, '404.html'));
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(notFound.toString().replace('</body>', LIVE_RELOAD_SCRIPT));
      } catch {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not found');
      }
    }
  });
};

/**
 * Create WebSocket server for live reload
 */
const createLiveReloadServer = async () => {
  const { WebSocketServer } = await import('ws');
  
  const wss = new WebSocketServer({ port: LIVE_RELOAD_PORT });
  
  wss.on('connection', (ws) => {
    clients.add(ws);
    ws.on('close', () => clients.delete(ws));
  });
  
  return wss;
};

/**
 * Main dev server function
 */
const dev = async () => {
  console.log('🚀 Starting development server...\n');
  
  // Initial build
  try {
    await runBuild();
  } catch (error) {
    console.error('Initial build failed:', error.message);
  }
  
  // Start HTTP server
  const server = createServer();
  server.listen(PORT, () => {
    console.log(`\n🌐 Server running at http://localhost:${PORT}`);
  });
  
  // Start live reload WebSocket server
  try {
    await createLiveReloadServer();
    console.log(`🔄 Live reload enabled on port ${LIVE_RELOAD_PORT}`);
  } catch (error) {
    console.warn('Live reload requires "ws" package. Install with: npm install -D ws');
  }
  
  // Watch for file changes
  const watcher = watch([
    path.join(ROOT, 'content'),
    path.join(ROOT, 'src'),
    path.join(ROOT, 'static'),
  ], {
    ignored: /node_modules/,
    persistent: true,
  });
  
  let buildTimeout = null;
  
  const triggerRebuild = (event, filePath) => {
    console.log(`\n📝 ${event}: ${path.relative(ROOT, filePath)}`);
    
    // Debounce builds
    if (buildTimeout) clearTimeout(buildTimeout);
    buildTimeout = setTimeout(async () => {
      try {
        await runBuild();
        notifyClients();
      } catch (error) {
        console.error('Build failed:', error.message);
      }
    }, 100);
  };

  watcher.on('change', (filePath) => triggerRebuild('Changed', filePath));
  watcher.on('add', (filePath) => triggerRebuild('Added', filePath));
  watcher.on('unlink', (filePath) => triggerRebuild('Deleted', filePath));
  
  console.log('\n👀 Watching for changes...\n');
};

// Run dev server
dev().catch((error) => {
  console.error('Dev server failed:', error);
  process.exit(1);
});
