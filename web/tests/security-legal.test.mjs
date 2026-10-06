import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createServer, HOST, CSP } from '../server.mjs';
import { validateContact, validatePostcode, evaluarRuta } from '../validation.mjs';
import http from 'node:http';
import { once } from 'node:events';

test('seguridad formulario: honeypot detecta bots y neutraliza el procesamiento', () => {
  // Un bot rellena el campo oculto website_url
  const intentoBot = validateContact({
    phone: '630359472',
    postcode: '12600',
    client: 'hogar',
    consumption: '30',
    privacy: true,
    website_url: 'http://spam-bot.ru/link'
  });
  assert.equal(intentoBot.spam, true, 'Debe marcar como spam si el honeypot contiene datos');
});

test('legal formulario: exige consentimiento explícito de la política de privacidad (RGPD)', () => {
  // Sin aceptar la casilla de privacidad
  const sinPrivacidad = validateContact({
    phone: '630359472',
    postcode: '12600',
    client: 'hogar',
    consumption: '30',
    privacy: false
  });
  assert.ok(sinPrivacidad.privacy, 'Debe devolver un error si no se acepta la privacidad');

  // Aceptando la casilla de privacidad
  const conPrivacidad = validateContact({
    phone: '630359472',
    postcode: '12600',
    client: 'hogar',
    consumption: '30',
    privacy: true
  });
  assert.equal(conPrivacidad.privacy, undefined, 'No debe dar error si la privacidad está aceptada');
});

test('cumplimiento normativo: existen los documentos legales obligatorios con contenido LSSI y RGPD', async () => {
  const avisoLegal = await readFile(new URL('../legal/aviso-legal.html', import.meta.url), 'utf8');
  assert.match(avisoLegal, /Agua-Estec\s+S\.L\./i, 'Aviso legal debe identificar al titular');
  assert.match(avisoLegal, /Ribera\s+d'Adobadors/i, 'Aviso legal debe incluir el domicilio social');
  assert.match(avisoLegal, /630\s*359\s*472/, 'Aviso legal debe incluir teléfono');
  assert.match(avisoLegal, /aguaestec@hotmail\.com/, 'Aviso legal debe incluir email');

  const privacidad = await readFile(new URL('../legal/privacidad.html', import.meta.url), 'utf8');
  assert.match(privacidad, /Reglamento\s+\(UE\)\s+2016\/679/i, 'Debe citar el RGPD');
  assert.match(privacidad, /derechos\s+de\s+acceso,\s+rectificaci[oó]n/i, 'Debe detallar los derechos ARCO');
  assert.match(privacidad, /Agencia\s+Espa[ñn]ola\s+de\s+Protecci[oó]n\s+de\s+Datos/i, 'Debe mencionar a la AEPD');

  const cookies = await readFile(new URL('../legal/cookies.html', import.meta.url), 'utf8');
  assert.match(cookies, /cookies\s+t[ée]cnicas/i, 'Debe explicar las cookies técnicas');
  assert.match(cookies, /no\s+utiliza\s+cookies\s+de\s+publicidad/i, 'Debe declarar ausencia de cookies de rastreo');
});

test('servidor entrega rutas legales con cabeceras estrictas de seguridad', async () => {
  const server = createServer();
  server.listen(0, HOST);
  await once(server, 'listening');
  const address = server.address();
  
  const request = (path) => new Promise((resolve, reject) => {
    const req = http.request({ hostname: HOST, port: address.port, path, method: 'GET' }, res => {
      let body = '';
      res.setEncoding('utf8');
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body }));
    });
    req.on('error', reject);
    req.end();
  });

  try {
    for (const path of ['/legal/aviso-legal.html', '/legal/privacidad.html', '/legal/cookies.html']) {
      const res = await request(path);
      assert.equal(res.status, 200, `Ruta legal ${path} debe existir y devolver 200`);
      assert.equal(res.headers['content-security-policy'], CSP);
      assert.equal(res.headers['x-content-type-options'], 'nosniff');
      assert.equal(res.headers['x-frame-options'], 'DENY');
    }
  } finally {
    await new Promise(resolve => server.close(resolve));
  }
});
