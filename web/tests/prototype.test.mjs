import { test } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { once } from 'node:events';
import { createServer, HOST, CSP } from '../server.mjs';
import { validateContact, validatePostcode } from '../validation.mjs';

test('valida código postal sin atribuir cobertura', () => {
  for (const value of ['00000', '12345', ' 12345 ']) assert.equal(validatePostcode(value), true);
  for (const value of ['', '1234', '123456', '12a45', '<svg>']) assert.equal(validatePostcode(value), false);
});

test('detecta los cuatro campos vacíos y rechaza entradas inválidas', () => {
  assert.deepEqual(Object.keys(validateContact()).sort(), ['client', 'consumption', 'phone', 'postcode']);
  const errors = validateContact({ phone: '<script>', postcode: 'abcd', client: 'otro', consumption: '-5' });
  assert.equal(Object.keys(errors).length, 4);
  for (const consumption of ['0', '-1', '1.5', '1e3', 'Infinity', '9007199254740992']) {
    assert.ok(validateContact({ phone: '000000000', postcode: '00000', client: 'hogar', consumption }).consumption);
  }
});

test('acepta datos ficticios de hogar y empresa y consumo desconocido', () => {
  assert.deepEqual(validateContact({ phone: '000 000 000', postcode: '00000', client: 'hogar', consumption: '30' }), {});
  assert.deepEqual(validateContact({ phone: '+00 000 000 000', postcode: '00000', client: 'empresa', unknown: true }), {});
});

test('servidor: loopback, archivos públicos, bloqueo de envíos y rutas privadas', async () => {
  const server = createServer();
  server.listen(0, HOST);
  await once(server, 'listening');
  const address = server.address();
  const request = (path, { method = 'GET', host = `${HOST}:${address.port}` } = {}) => new Promise((resolve, reject) => {
    const req = http.request({ hostname: HOST, port: address.port, path, method, headers: { Host: host } }, res => {
      let body = '';
      res.setEncoding('utf8');
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body }));
    });
    req.on('error', reject);
    req.end();
  });
  try {
    assert.equal(address.address, '127.0.0.1');
    assert.equal(address.family, 'IPv4');
    for (const path of ['/', '/index.html', '/styles.css', '/app.mjs', '/validation.mjs', '/favicon.svg', '/assets/dispensadores-agua-estec.jpg', '/assets/historia-los-pujades.jpg', '/assets/logo-agua-estec.png']) {
      const response = await request(path);
      assert.equal(response.status, 200, path);
      assert.equal(response.headers['content-security-policy'], CSP);
      assert.equal(response.headers['cache-control'], 'no-store');
      assert.equal(response.headers['x-content-type-options'], 'nosniff');
      assert.equal(response.headers['x-frame-options'], 'DENY');
      assert.equal(response.headers['set-cookie'], undefined);
    }
    assert.equal((await request('/', { method: 'HEAD' })).body, '');
    assert.equal((await request('/', { host: `localhost:${address.port}` })).status, 200);
    assert.equal((await request('/', { host: 'attacker.invalid' })).status, 403);
    for (const method of ['POST', 'PUT', 'DELETE', 'OPTIONS']) assert.equal((await request('/', { method })).status, 405);
    for (const path of ['/README.md', '/server.mjs', '/package.json', '/tests/prototype.test.mjs', '/../ESTADO_PROYECTO_AQUA_ESTEC.md', '/%2e%2e/server.mjs', '/.env', '/capturas/portada-escritorio.png', '/?phone=000000000', '/fuentes/imagenes-originales/familia-estec.jpg', '/assets/../server.mjs']) {
      assert.equal((await request(path)).status, 404, path);
    }
  } finally {
    await new Promise(resolve => server.close(resolve));
  }
});

test('imágenes reales: copias intactas, archivos existentes y formatos correctos', async () => {
  for (const [source, publicFile, format] of [
    ['familia-estec.jpg', 'historia-los-pujades.jpg', 'jpeg'],
    ['imagen-portada-original.jpg', 'dispensadores-agua-estec.jpg', 'jpeg'],
    ['logo-estec.png', 'logo-agua-estec.png', 'png'],
  ]) {
    const original = await readFile(new URL(`../fuentes/imagenes-originales/${source}`, import.meta.url));
    const delivered = await readFile(new URL(`../assets/${publicFile}`, import.meta.url));
    assert.deepEqual(delivered, original, publicFile);
    if (format === 'jpeg') assert.equal(delivered.subarray(0, 3).toString('hex'), 'ffd8ff');
    else assert.equal(delivered.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
  }
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  for (const match of html.matchAll(/<img\b[^>]*src="(?:\.\/)?([^\"]+)"/g)) {
    const contents = await readFile(new URL(`../${match[1]}`, import.meta.url));
    assert.ok(contents.length > 0);
  }
});

test('todos los enlaces apuntan a secciones presentes o canales directos verificados y no hay recursos externos', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]));
  for (const match of html.matchAll(/\bhref="#([^"]+)"/g)) assert.ok(ids.has(match[1]), match[1]);
  for (const id of ['contenido-principal', 'seccion-hogares', 'seccion-empresas', 'seccion-aguas', 'seccion-dispensadores', 'seccion-zonas', 'seccion-historia', 'seccion-formulario']) assert.ok(ids.has(id));
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1);
  // Verificamos que no se carguen scripts o recursos de terceros (src externo) y que sólo se permitan enlaces directos autorizados
  assert.doesNotMatch(html, /\bsrc="(?:https?:|\/\/)/i);
  for (const match of html.matchAll(/\bhref="([^"]+)"/g)) {
    const href = match[1];
    if (href.startsWith('#') || href.startsWith('./') || href.startsWith('assets/') || href === 'styles.css') continue;
    assert.ok(
      href.startsWith('tel:') || 
      href.startsWith('mailto:') || 
      href.startsWith('https://wa.me/'),
      `Enlace no permitido: ${href}`
    );
  }
  for (const file of ['app.mjs', 'validation.mjs', 'styles.css']) {
    const source = await readFile(new URL(`../${file}`, import.meta.url), 'utf8');
    assert.doesNotMatch(source, /\b(?:fetch|XMLHttpRequest|WebSocket|localStorage|sessionStorage|indexedDB|sendBeacon)\b/);
    assert.doesNotMatch(source, /@import\s/);
    // Verificar que cualquier URL externa sea únicamente el canal autorizado de WhatsApp
    const urls = [...source.matchAll(/https?:\/\/[^\s"'`)]+/g)].map(m => m[0]);
    for (const url of urls) {
      assert.ok(url.startsWith('https://wa.me/'), `URL externa no autorizada en ${file}: ${url}`);
    }
  }
});

test('evaluador de rutas reconoce 12600 como ruta prioritaria de Vall d’Uixó', async () => {
  const { evaluarRuta } = await import('../validation.mjs');
  const vallUixo = evaluarRuta('12600');
  assert.equal(vallUixo.esRuta, true);
  assert.equal(vallUixo.tipo, 'prioritaria');
  assert.match(vallUixo.mensaje, /prioritaria/i);

  const comarcal = evaluarRuta('12004');
  assert.equal(comarcal.esRuta, true);
  assert.equal(comarcal.tipo, 'comarcal');

  const externa = evaluarRuta('28001');
  assert.equal(externa.esRuta, false);
  assert.equal(externa.tipo, 'revision');
});
