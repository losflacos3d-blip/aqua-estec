# Plan Técnico de Implementación — 002 Seguridad y Cumplimiento Legal

## 1. Arquitectura y Componentes Técnicos

### A. Capa de Cumplimiento Legal
- **Ubicación**: Subdirectorio modular en `web/legal/`:
  - `web/legal/aviso-legal.html`: Identificación social (LSSI-CE Art. 10), condiciones de uso y propiedad intelectual.
  - `web/legal/privacidad.html`: Política de privacidad íntegra (RGPD Art. 13/14, derechos ARCO, AEPD).
  - `web/legal/cookies.html`: Política transparente de cookies técnicas y ausencia de rastreo invasivo.
- **Integración en la Portada (`web/index.html`)**:
  - Enlaces directos en el pie de página hacia los documentos legales.
  - Inclusión de la **Primera Capa RGPD** en el formulario de pedido/contacto con checkbox accesible `name="acepta_privacidad"` (requerido).

### B. Capa de Seguridad Defensiva en la Aplicación Web
- **Honeypot Antispam**: Campo invisible para humanos mediante CSS (`opacity: 0; position: absolute; pointer-events: none;`) con nombre trampa `name="website_url"`. Si contiene algún valor, la validación descarta el envío.
- **Escape y Sanitización**: Reforzar `validation.mjs` y `app.mjs` garantizando que todo dato de usuario se maneje con `textContent` y funciones de escape.
- **Servidor Web (`web/server.mjs`)**:
  - Incorporar las nuevas rutas de `/legal/*` a la lista blanca estricta `assets`.
  - Asegurar cabeceras de respuesta seguras:
    - `Content-Security-Policy`: `default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self'; font-src 'none'; connect-src 'none'; frame-ancestors 'none'; base-uri 'none'; object-src 'none'`.
    - `X-Content-Type-Options: nosniff`
    - `X-Frame-Options: DENY`
    - `Referrer-Policy: strict-origin-when-cross-origin`

### C. Capa de Protección del Repositorio (Git Security)
- **Pre-commit Hook**: Implementar un script en `.githooks/pre-commit` para:
  1. Ejecutar las pruebas automatizadas (`cd web && node --test`).
  2. Verificar que no se introduzcan cadenas sospechosas de claves privadas, contraseñas o tokens.
  3. Bloquear el commit si alguna condición no se cumple.
- Configurar Git para utilizar la carpeta de hooks: `git config core.hooksPath .githooks`.

---

## 2. Estrategia de Pruebas Automatizadas (Harness / TDD)
- Archivo de pruebas: `web/tests/security-legal.test.mjs`.
- Casos de prueba a verificar:
  1. Detección y rechazo de envíos cuando el honeypot contiene datos.
  2. Obligatoriedad de la casilla de verificación de privacidad en el formulario.
  3. Presencia de los datos legales obligatorios (LSSI-CE: Agua-Estec S.L., CIF, domicilio, email, teléfono).
  4. Presencia de la primera capa RGPD en el formulario.
  5. Cero uso de `innerHTML` o scripts de terceros en los archivos de la aplicación.
  6. Disponibilidad en el servidor de las páginas legales con cabeceras HTTP de seguridad.
