# Constitución del Proyecto AQUA ESTEC

## 1. Principios Innegociables
1. **Spec-Driven First (SDD)**: Ninguna línea de código se crea ni modifica sin especificación EARS en `specs/`, plan técnico y tareas atómicas.
2. **Mobile-First & Touch-Friendly**: El diseño se construye a partir de 375px (iPhone SE baseline). Targets táctiles mínimos de 44x44px.
3. **Cero Dependencias Innecesarias ni Frameworks Pesados**: HTML5 semántico, CSS3 puro y JavaScript moderno en ES Modules.
4. **Separación Estricta de Responsabilidades**: Lógica pura, validación y estado desacoplados de la interfaz y del DOM.
5. **Harness Testing Obligatorio**: Tests unitarios y de integración ejecutables con `node --test`. Prohibido avanzar con pruebas en rojo.
6. **Consola y Entorno Limpio**: Cero errores en consola de navegador y cero advertencias en pruebas de servidor.

## 2. Guardarraíles de Seguridad y Privacidad
- **Cero Secretos**: Prohibido almacenar contraseñas, tokens, credenciales o API keys en código fuente o repositorios.
- **Sanitización y Validación Defensiva**: Validación estricta en tiempo de ejecución de todos los inputs (código postal 5 dígitos, teléfono móvil, tipo de cliente, consumo).
- **Protección Antispam**: Campo Honeypot transparente y limitación de tasa para prevenir bots.
- **Content Security Policy (CSP)**: `default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'`.
- **Cabeceras HTTP Seguras**: `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Cache-Control: no-store`, `Referrer-Policy: strict-origin-when-cross-origin`.
- **Respeto a Datos Empresariales**: Usar exclusivamente los datos verificados de AQUA ESTEC (empresa familiar desde 1970, reparto en Vall d'Uixó / Valencia y Castellón). Prohibido inventar marcas o productos fuera de catálogo.
