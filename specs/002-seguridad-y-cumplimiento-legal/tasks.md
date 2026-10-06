# Tareas de Implementación — 002 Seguridad y Cumplimiento Legal

- [ ] **Fase 1: Arnés de Pruebas (TDD)**
  - [ ] Crear `web/tests/security-legal.test.mjs` con pruebas automatizadas de seguridad, honeypot, cabeceras y validación legal.
  - [ ] Ejecutar `node --test` para confirmar que las pruebas fallan inicialmente (rojo controlado).

- [ ] **Fase 2: Redacción e Integración de Textos Legales (LSSI / RGPD / Cookies)**
  - [ ] Crear `web/legal/aviso-legal.html` con todos los requisitos del Art. 10 de la LSSI-CE.
  - [ ] Crear `web/legal/privacidad.html` con la política integral de privacidad conforme al RGPD y LOPDGDD.
  - [ ] Crear `web/legal/cookies.html` con la declaración transparente de cookies técnicas y cero rastreo.
  - [ ] Enlazar los textos legales en el pie de página de `web/index.html`.

- [ ] **Fase 3: Seguridad en Formulario y Aplicación Web**
  - [ ] Añadir campo trampa *honeypot* (`name="website_url"`) en `web/index.html` invisible para usuarios reales.
  - [ ] Añadir la Primera Capa informativa de protección de datos (Responsable, Finalidad, Derechos) en el formulario.
  - [ ] Añadir checkbox obligatorio `name="acepta_privacidad"` para consentimiento explícito.
  - [ ] Actualizar `web/validation.mjs` y `web/app.mjs` para validar el honeypot y el consentimiento.

- [ ] **Fase 4: Configuración del Servidor y Cabeceras Seguras**
  - [ ] Registrar las rutas `/legal/*` en la lista blanca de `web/server.mjs`.
  - [ ] Verificar y endurecer las cabeceras HTTP de respuesta (CSP estricto, nosniff, DENY, etc.).

- [ ] **Fase 5: Blindaje del Repositorio Git**
  - [ ] Crear directorio `.githooks/` con script `pre-commit` ejecutable.
  - [ ] Configurar `git config core.hooksPath .githooks`.
  - [ ] Verificar que el hook previene commits con tests rotos o credenciales expuestas.

- [ ] **Fase 6: Verificación, Hito y Sincronización**
  - [ ] Ejecutar suite completa de tests (`npm test` en `web/`).
  - [ ] Sincronizar `MEMORY.md`.
  - [ ] Realizar commit atómico de seguridad y subir a GitHub con nuevo tag de versión.
