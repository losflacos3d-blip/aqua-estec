# MEMORY.md — Memoria Persistente de AQUA ESTEC

## Estado del Proyecto
- **Fase**: Estructura perfecta (Agente en raíz vs Web completa en `web/`).
- **Seguridad & Legal (Feature 002)**: Honeypot antispam, Capa 1 y 2 RGPD, Aviso Legal LSSI-CE, Política de Cookies, Git pre-commit hook con validación de tests y cero secretos.
- **Control de Versiones**: Sincronizado en GitHub (`https://github.com/losflacos3d-blip/aqua-estec`).
- **Plataforma**: Vanilla Web en `web/` con servidor seguro `web/server.mjs`.
- **Datos Reales Integrados**: Teléfono `630 359 472`, WhatsApp, email `aguaestec@hotmail.com`, sede La Vall d'Uixó, formatos `12,5L` y `18,9L`.
- **Tests**: 11/11 tests pasando en verde con `cd web && npm test`.

## Separación Física de Carpetas
- **Cerebro del Agente (Raíz)**: `AGENTS.md`, `CLAUDE.md`, `MEMORY.md`, `.gitignore`, `.githooks/`, `docs/`, `specs/`, `.opencode/`.
- **Aplicación Web Completa (`web/`)**: HTML, CSS, JS, imágenes, `legal/`, `server.mjs`, `package.json`, `tests/`.

## Siguiente Tarea Inmediata
- [ ] Servidor ejecutándose en segundo plano en http://127.0.0.1:4178/ listo para pruebas.
