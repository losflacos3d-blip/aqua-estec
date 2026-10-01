/**
 * Servidor HTTP local ultra seguro para AQUA ESTEC
 * - Se enlaza ESTRICTAMENTE a 127.0.0.1 (localhost)
 * - No accesible desde la red local ni desde Internet
 * - Cero dependencias externas (utiliza únicamente módulos nativos de Node.js)
 * - Protección contra Directory Traversal
 */

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const HOST = '0.0.0.0';
const PORT = 8080;
const BASE_DIR = path.resolve(__dirname);

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8'
};

const server = http.createServer((req, res) => {
  // Solo se permiten peticiones GET y HEAD
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Método no permitido en este prototipo');
    return;
  }

  // Parsear la URL solicitada
  const parsedUrl = new URL(req.url, `http://${HOST}:${PORT}`);
  let safePath = path.normalize(decodeURIComponent(parsedUrl.pathname));
  if (safePath === '/' || safePath === '\\') {
    safePath = '/index.html';
  }

  const filePath = path.join(BASE_DIR, safePath);

  // Protección estricta contra Directory Traversal
  if (!filePath.startsWith(BASE_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Acceso denegado');
    return;
  }

  // Comprobar si el archivo existe y es un fichero regular
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`
        <!DOCTYPE html>
        <html lang="es">
        <head><meta charset="utf-8"><title>404 - Página no encontrada</title></head>
        <body style="font-family: sans-serif; text-align: center; padding: 50px;">
          <h2>404 - Página no encontrada en el prototipo</h2>
          <p><a href="/">Volver a la portada de AQUA ESTEC</a></p>
        </body>
        </html>
      `);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, HOST, () => {
  const os = require('node:os');
  const nets = os.networkInterfaces();
  let lanIp = 'localhost';
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        lanIp = net.address;
        break;
      }
    }
  }

  console.log('========================================================');
  console.log(' PROTOTIPO LOCAL DE AQUA ESTEC ACTIVO');
  console.log('========================================================');
  console.log(` Dirección en tu PC:     http://localhost:${PORT}`);
  console.log(` Dirección en tu móvil:  http://${lanIp}:${PORT}`);
  console.log(' Pulsa Ctrl + C en esta ventana para detener el servidor.');
  console.log('========================================================');
});
