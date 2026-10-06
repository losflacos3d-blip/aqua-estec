# MEMORY.md — Memoria Persistente de AQUA ESTEC

## Estado del Proyecto
- **Fase**: Estructura perfecta (Agente en raíz vs Web completa en `web/`).
- **Control de Versiones**: Repositorio Git inicializado en la raíz con tag `v1.0-prototipo-completo`.
- **Plataforma**: Vanilla Web en `web/` con servidor seguro `web/server.mjs`.
- **Datos Reales Integrados**: Teléfono oficial `630 359 472`, WhatsApp activo, email `aguaestec@hotmail.com`, sede `C/ Ribera d'Adobadors, 24, La Vall d'Uixó`, formatos oficiales `12,5L` y `18,9L`.
- **Diseño & Features**: Fuente oficial en manantial, comprobador de ruta `12600`, mapa comarcal y homenaje 50 años (1970).
- **Tests**: 7/7 tests pasando en verde con `cd web && npm test`.

## Separación Física de Carpetas
- **Cerebro del Agente (Raíz)**: `AGENTS.md`, `CLAUDE.md`, `MEMORY.md`, `.gitignore`, `docs/`, `specs/`, `.opencode/`.
- **Aplicación Web Completa (`web/`)**: HTML, CSS, JS, imágenes, `server.mjs`, `package.json`, `tests/`.

## Siguiente Tarea Inmediata
- [ ] Servidor ejecutándose en segundo plano en http://127.0.0.1:4178/ listo para pruebas.
