import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

export const HOST = '127.0.0.1';
export const DEFAULT_PORT = 4178;
export const CSP = "default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self'; font-src 'none'; connect-src 'none'; form-action 'none'; frame-ancestors 'none'; base-uri 'none'; object-src 'none'";
const assets = new Map([
  ['/', ['index.html', 'text/html; charset=utf-8']],
  ['/index.html', ['index.html', 'text/html; charset=utf-8']],
  ['/styles.css', ['styles.css', 'text/css; charset=utf-8']],
  ['/app.mjs', ['app.mjs', 'text/javascript; charset=utf-8']],
  ['/validation.mjs', ['validation.mjs', 'text/javascript; charset=utf-8']],
  ['/favicon.svg', ['favicon.svg', 'image/svg+xml']],
  ['/assets/dispensadores-agua-estec.jpg', ['assets/dispensadores-agua-estec.jpg', 'image/jpeg']],
  ['/assets/historia-los-pujades.jpg', ['assets/historia-los-pujades.jpg', 'image/jpeg']],
  ['/assets/logo-agua-estec.png', ['assets/logo-agua-estec.png', 'image/png']],
  ['/assets/orotana.png', ['assets/orotana.png', 'image/png']],
  ['/assets/chovar.jpg', ['assets/chovar.jpg', 'image/jpeg']],
  ['/assets/bejis.png', ['assets/bejis.png', 'image/png']],
  ['/assets/bezoya.png', ['assets/bezoya.png', 'image/png']],
  ['/assets/hero-manantial-montaje.jpg', ['assets/hero-manantial-montaje.jpg', 'image/jpeg']],
  ['/assets/mapa-cobertura-oficial.jpg', ['assets/mapa-cobertura-oficial.jpg', 'image/jpeg']],
  ['/assets/historia-fundadores-camiones-1970.jpg', ['assets/historia-fundadores-camiones-1970.jpg', 'image/jpeg']],
  ['/assets/marca-orotana.png', ['assets/marca-orotana.png', 'image/png']],
  ['/assets/marca-bezoya.png', ['assets/marca-bezoya.png', 'image/png']],
  ['/assets/marca-chovar.jpg', ['assets/marca-chovar.jpg', 'image/jpeg']],
  ['/assets/marca-bejis.png', ['assets/marca-bejis.png', 'image/png']],
  ['/assets/logo-aqua-estec.png', ['assets/logo-agua-estec.png', 'image/png']],
]);

export function createServer() {
  const server = http.createServer(async (request, response) => {
    response.setHeader('Content-Security-Policy', CSP);
    response.setHeader('X-Content-Type-Options', 'nosniff');
    response.setHeader('Referrer-Policy', 'no-referrer');
    response.setHeader('X-Frame-Options', 'DENY');
    response.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');
    response.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive');
    response.setHeader('Cache-Control', 'no-store');
    response.setHeader('X-Aqua-Prototype', 'local-v1');
    const sendText = (status, text) => {
      response.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end(request.method === 'HEAD' ? undefined : text);
    };
    const port = server.address()?.port;
    if (![`${HOST}:${port}`, `localhost:${port}`].includes(request.headers.host)) return sendText(403, 'Host no permitido.');
    if (!['GET', 'HEAD'].includes(request.method)) {
      response.setHeader('Allow', 'GET, HEAD');
      return sendText(405, 'Este prototipo no acepta envíos.');
    }
    // Lista cerrada de archivos públicos. No se resuelven rutas arbitrarias.
    const asset = assets.get(request.url);
    if (!asset) return sendText(404, 'Página no encontrada.');
    try {
      const data = await readFile(new URL(`./${asset[0]}`, import.meta.url));
      response.writeHead(200, { 'Content-Type': asset[1], 'Content-Length': data.length });
      response.end(request.method === 'HEAD' ? undefined : data);
    } catch {
      sendText(500, 'No se pudo cargar el archivo local.');
    }
  });
  server.requestTimeout = 5000;
  server.headersTimeout = 5000;
  return server;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const server = createServer();
  server.on('error', error => {
    if (error.code === 'EADDRINUSE') console.error(`El puerto ${DEFAULT_PORT} está ocupado. Si el prototipo ya está abierto, usa http://${HOST}:${DEFAULT_PORT}/. No se ha detenido ningún otro proceso.`);
    else console.error(`No se pudo iniciar el servidor: ${error.code || 'error'}.`);
    process.exitCode = 1;
  });
  server.listen(DEFAULT_PORT, HOST, () => {
    console.log(`AQUA ESTEC - Prototipo local v01\nURL: http://${HOST}:${DEFAULT_PORT}/\nSolo este ordenador. Ctrl+C para detener.\nSin envíos, datos guardados ni dependencias externas.`);
  });
  for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.close(() => process.exit(0)));
}
