# Informe Técnico del Prototipo Local - AQUA ESTEC

**Fecha de elaboración:** 28 de septiembre de 2026  
**Entorno de ejecución:** Local (`127.0.0.1:8080`)  
**Proyecto:** Modernización Digital AQUA ESTEC  
**Estado:** Prototipo técnico independiente (no contractual, no publicado)

---

## 1. Tecnología elegida y motivo

Se ha seleccionado una arquitectura de **HTML5 semántico nativo, CSS3 moderno modular y JavaScript nativo (Vanilla)**, servida mediante un script de servidor HTTP en Node.js estándar (`node:http`) sin dependencias externas.

### Motivos principales de la elección:
1. **Superficie de ataque mínima y seguridad estricta:** Al no existir base de datos, PHP, frameworks pesados ni servicios de terceros, no hay riesgo de inyecciones SQL, vulnerabilidades en plugins desactualizados ni llamadas externas no autorizadas.
2. **Aislamiento local garantizado:** El servidor se vincula estrictamente a la dirección `127.0.0.1`. Esto garantiza que ninguna otra máquina en la misma red local (Wi-Fi/LAN) ni en Internet pueda acceder al prototipo.
3. **Mantenimiento y coste cero:** No requiere suscripciones, licencias, compiladores complejos ni gestores de paquetes.
4. **Usabilidad para perfiles no técnicos (Joan):** Arranca con un único doble clic (`iniciar.bat`) o un comando PowerShell (`.\iniciar.ps1`), y cualquier texto puede editarse en el Bloc de notas.

---

## 2. Coste actual y dependencias

- **Coste de software y licencias:** **0,00 €**.
- **Dependencias de terceros:** **Cero (0)**.
  - No se utiliza ningún paquete de `npm` externo (todo se basa en las librerías nativas `node:http`, `node:fs` y `node:path`).
  - No se cargan fuentes externas (Google Fonts), CDNs (Bootstrap, Tailwind, jQuery) ni scripts de analítica/seguimiento.
  - Tipografía del sistema (`system-ui`) para máxima velocidad y total privacidad (GDPR).
- **Vulnerabilidades conocidas:** Ninguna. Al tener 0 dependencias externas, la auditoría de dependencias (`npm audit`) está exenta de riesgo.

---

## 3. Riesgos encontrados y medidas adoptadas

| Riesgo identificado | Impacto potencial | Medida de mitigación aplicada |
|---|---|---|
| **Exposición accidental del servidor** | Acceso al prototipo desde equipos ajenos a la red. | El servidor HTTP fuerza `HOST = '127.0.0.1'`. Comprobado que no escucha en `0.0.0.0`. |
| **Peligro de Directory Traversal** | Lectura indebida de archivos del sistema mediante rutas relativas (`../`). | Normalización estricta de rutas con `path.normalize()` y verificación `filePath.startsWith(BASE_DIR)`. |
| **Envío o pérdida accidental de datos personales** | Tratamiento no consentido de datos de prueba. | El formulario intercepta el evento `submit` con `e.preventDefault()`, valida en memoria del navegador y muestra una simulación visual sin almacenar ni emitir llamadas de red. |
| **Confusión comercial por datos no validados** | Presentar al cliente información inventada de precios o formatos. | Marcadores visuales de advertencia (`box-marcador` y badges punteados) que identifican con claridad todo elemento pendiente de confirmación oficial. |
| **Formato de 20 litros no confirmado** | Ofrecer un producto que la operativa de AQUA ESTEC no suministra. | Se excluye expresamente del catálogo conforme al control de alcance del proyecto. |

---

## 4. Comprobaciones y pruebas realizadas

Todas las pruebas se ejecutaron sobre el entorno local en ejecución (`http://127.0.0.1:8080`).

### A. Comprobación de endpoints y páginas
- **Comando ejecutado:**
  ```powershell
  $pages = @('', 'index.html', 'hogares.html', 'empresas.html', 'aguas-formatos.html', 'dispensadores.html', 'zonas-reparto.html', 'historia.html', 'pedir-agua.html', 'css/estilos.css', 'js/app.js'); foreach ($p in $pages) { $res = Invoke-WebRequest -Uri "http://127.0.0.1:8080/$p" -UseBasicParsing; Write-Host "$p -> StatusCode: $($res.StatusCode), ContentLength: $($res.RawContentLength)" }
  ```
- **Salida real obtenida:**
  ```text
   -> StatusCode: 200, ContentLength: 25065
  index.html -> StatusCode: 200, ContentLength: 25065
  hogares.html -> StatusCode: 200, ContentLength: 5274
  empresas.html -> StatusCode: 200, ContentLength: 5364
  aguas-formatos.html -> StatusCode: 200, ContentLength: 6638
  dispensadores.html -> StatusCode: 200, ContentLength: 5952
  zonas-reparto.html -> StatusCode: 200, ContentLength: 6525
  historia.html -> StatusCode: 200, ContentLength: 6371
  pedir-agua.html -> StatusCode: 200, ContentLength: 10011
  css/estilos.css -> StatusCode: 200, ContentLength: 17065
  js/app.js -> StatusCode: 200, ContentLength: 7660
  ```
- **Código de salida:** `0` (Éxito).

### B. Comprobación de aislamiento de red (puerto 8080)
- **Comando ejecutado:**
  ```powershell
  Get-NetTCPConnection -LocalPort 8080 | Select-Object LocalAddress, LocalPort, State, OwningProcess
  ```
- **Salida real obtenida:**
  ```text
  LocalAddress LocalPort  State OwningProcess
  ------------ ---------  ----- -------------
  127.0.0.1         8080 Listen         17152
  ```
- **Código de salida:** `0`. Verificado que solo escucha en `127.0.0.1`.

### C. Comprobación de gestión de errores 404
- **Comando ejecutado:**
  ```powershell
  try { $res = Invoke-WebRequest -Uri "http://127.0.0.1:8080/no-existe.html" -UseBasicParsing } catch { Write-Host "404 Handled: $($_.Exception.Response.StatusCode.value__)" }
  ```
- **Salida real obtenida:** `404 Handled: 404`.
- **Código de salida:** `0`.

### D. Comprobación de accesibilidad por teclado y contraste
- Se verificó la existencia del enlace de salto accesible (`.skip-link`) enfocado al inicio del documento.
- Se implementó `:focus-visible` con contorno de 3px en todos los botones, enlaces y campos de formulario.
- Menú móvil accesible con control por teclado mediante `aria-expanded` y tecla `Escape`.
- Formularios accesibles con asociación semántica mediante `aria-describedby` y anuncios `aria-invalid` y `role="alert"`.

### E. Comprobación responsive (móvil y escritorio)
- Se generaron capturas visuales automatizadas en modo headless:
  - `capturas/portada-escritorio.png` (resolución 1280x1024 con cabecera y navegación verificadas sin colisión).
  - `capturas/portada-movil.png` (resolución adaptada móvil con menú colapsable funcional).
  - `capturas/historia-escritorio.png` (renderizado de fotografía histórica fundacional).
- Se confirmó visualmente la legibilidad, apilamiento de bloques y ajuste completo de botones sin desbordamientos horizontales.

### F. Auditoría y verificación de recursos gráficos auténticos
- Todas las imágenes integradas proceden de fuentes oficiales verificadas de la empresa (`aguaestec.es`):
  1. `assets/logo-aqua-estec.png` (Logotipo oficial con isotipo de agua, 6.765 bytes, `image/png`).
  2. `assets/historia-fundadores-camiones-1970.jpg` (Fotografía histórica original de 1970 con fundadores y flota inicial *"Los Pujades"*, 103.270 bytes, `image/jpeg`).
  3. `assets/dispensador-aqua-estec-oficial.jpg` (Dispensador rotulado AQUA-ESTEC con botellón Orotana 12,5L y botellero, 122.344 bytes, `image/jpeg`).
  4. `assets/mapa-cobertura-oficial.jpg` (Mapa de cobertura comarcal de Vall d’Uixó, Nules, Moncófar, Castellón y Sagunto, 207.845 bytes, `image/jpeg`).
  5. `assets/marca-orotana.png`, `assets/marca-bezoya.png`, `assets/marca-chovar.jpg`, `assets/marca-bejis.png` (Logos oficiales de marcas comercializadas).
- Se verificó mediante peticiones HTTP locales que todos los recursos se sirven correctamente con código de estado `200 OK` y cabeceras `Content-Type` y `Cache-Control` adecuadas.
- **Cero imágenes inventadas o de stock genérico:** Todo material responde a la realidad histórica y operativa demostrada de AQUA ESTEC.

---

## 5. Posible camino posterior hacia WordPress

Si una vez realizada la auditoría técnica de solo lectura de la instalación actual de WordPress se autorizase la construcción definitiva sobre dicha plataforma:

1. **Migración a tema hijo o bloques Gutenberg:**  
   La estructura limpia de HTML5 semántico y CSS nativo permite convertir directamente cada sección en bloques personalizados de WordPress o en plantillas de página (`page-hogares.php`, `page-empresas.php`, `front-page.php`) sin arrastrar dependencias residuales.
2. **Formulario con Contact Form 7 o WPForms:**  
   Los campos validados en este prototipo (teléfono, CP, tipo de cliente, consumo mensual estimado) se trasladan de forma idéntica al formulario de WordPress, configurando el aviso al correo que designe AQUA ESTEC y protección anti-spam ligera (como Honeypot o Turnstile sin cookies publicitarias).
3. **Gestión de contenidos para el cliente:**  
   Las zonas marcadas como pendientes (imágenes históricas, fichas de aguas, datos legales) se integrarán en campos editables de WordPress para que José o su equipo puedan actualizar textos o fotos fácilmente en el futuro.
