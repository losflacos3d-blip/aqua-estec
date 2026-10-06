# Informe técnico · AQUA ESTEC, prototipo local v01

Fecha de comprobación: 28 de septiembre de 2026.

## Resultado y elección técnica

Se ha construido una página responsive con ocho secciones navegables, consulta simulada de zona y formulario de demostración. El servidor se ha detenido y vuelto a iniciar con `iniciar.cmd`; después ha respondido HTTP 200 en `http://127.0.0.1:4178/`.

| Opción | Coste añadido local | Mantenimiento | Aplicación al proyecto |
|---|---|---|---|
| HTML, CSS y JavaScript, con servidor Node.js | 0 € | Archivos editables; sin paquetes instalados | Elegida para probar diseño y recorrido comercial. |
| WordPress local | Núcleo gratuito; otras licencias sin confirmar | Requiere PHP, base de datos, actualizaciones y revisión de complementos | Útil después si se necesita probar la edición con un panel. |

Se ha elegido la opción estática porque esta fase no requiere administrar contenido ni recibir solicitudes reales. La versión no tiene base de datos, cuentas, librerías descargadas, fuentes externas ni servicios de terceros. Usa exclusivamente módulos incluidos en Node.js y las funciones del navegador.

Coste de herramientas, licencias, dominio y alojamiento añadido por este prototipo: **0 €**. No incluye el tiempo de trabajo, electricidad ni los costes de la web futura.

## Seguridad comprobada

- Escucha solo en `127.0.0.1:4178`. Se ha comprobado con Windows. No existe un servicio de este proyecto escuchando en `0.0.0.0`, la IP de la red o IPv6.
- Solo se sirven nueve rutas de archivos públicos mediante una lista cerrada, incluidas tres imágenes locales. Documentos, originales de las fotos, capturas, pruebas, servidor y archivos del proyecto principal quedan fuera de esa lista.
- Se rechazan cabeceras Host ajenas, rutas privadas, rutas con traversal y peticiones distintas de GET/HEAD.
- Content Security Policy impide conexiones salientes, envíos de formularios, marcos y recursos externos. También se aplican `nosniff`, `no-referrer`, `DENY`, `no-store` y `noindex`.
- No hay cookies, almacenamiento local, base de datos ni registro de las consultas. No se imprime el contenido de las peticiones.
- En pruebas reales del navegador, enviar consultas válidas o inválidas y consultar un código postal produjo **cero peticiones de red**. Solo se modificó la página.
- Los campos se borran tras una prueba válida; WhatsApp y llamada permanecen desactivados.
- Se revisó el código público y del servidor sin encontrar credenciales ni claves. No se utilizaron datos personales reales.

El enlace es de acceso directo desde este ordenador. No se ha configurado ningún túnel, proxy ni exposición pública. La comprobación no representa una auditoría completa de otros programas o mecanismos de acceso remoto ya existentes en Windows.

## Runtime y revisión de avisos

Node.js instalado: **24.19.0**. No se han instalado dependencias de npm, por lo que no existe una cadena de paquetes de terceros que auditar en este prototipo.

Se consultó el [registro oficial de avisos](https://nodejs.org/en/blog/vulnerability). El último boletín mostrado, del [29 de julio de 2026](https://nodejs.org/en/blog/vulnerability/july-2026-security-releases), identifica 24.18.1 como versión corregida de la línea 24. La versión instalada es posterior. Los avisos altos descritos se refieren a HTTP/2 y al modelo de permisos; esta aplicación usa HTTP/1 y no utiliza ese modelo. No se ha identificado en esa revisión un aviso alto pendiente aplicable a las funciones usadas.

La versión instalada no es la última LTS: el sitio oficial muestra [24.21.0, publicada el 8 de septiembre](https://nodejs.org/en/blog/release/v24.21.0). Se recomienda mantener Node.js actualizado. No se ha cambiado la instalación de Windows. Esta revisión es limitada y no certifica ausencia de vulnerabilidades desconocidas.

## Evidencia de ejecución

Entorno: Windows, PowerShell y Node.js 24.19.0.

Directorio de trabajo:

```text
C:\Users\jobam\OneDrive\Desktop\AQUA ESTEC\prototipo-local
```

Se ejecutaron por separado:

| Comando exacto | Salida | Código de salida |
|---|---|---:|
| `node --check server.mjs` | Sin errores ni salida | 0 |
| `node --check dist/app.mjs` | Sin errores ni salida | 0 |
| `node --check dist/validation.mjs` | Sin errores ni salida | 0 |
| `node --test tests/prototype.test.mjs` | 5 pruebas aprobadas, 0 fallos | 0 |

Salida real de la ejecución inicial de pruebas, anterior a la incorporación de fotos:

```text
✔ valida código postal sin atribuir cobertura (1.1896ms)
✔ detecta los cuatro campos vacíos y rechaza entradas inválidas (1.1516ms)
✔ acepta datos ficticios de hogar y empresa y consumo desconocido (0.2124ms)
✔ servidor: loopback, archivos públicos, bloqueo de envíos y rutas privadas (63.3886ms)
✔ todos los enlaces apuntan a secciones presentes y no hay recursos externos (3.0346ms)
ℹ tests 5
ℹ suites 0
ℹ pass 5
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 195.1403
```

Arranque desde cero probado con:

```powershell
.\iniciar.cmd
```

Salida real:

```text
AQUA ESTEC - Prototipo local v01
URL: http://127.0.0.1:4178/
Solo este ordenador. Ctrl+C para detener.
Sin envíos, datos guardados ni dependencias externas.
```

El servidor queda en ejecución; no tiene todavía código de salida final. Se verificó después con:

```powershell
$aquaResponse = Invoke-WebRequest -Uri 'http://127.0.0.1:4178/' -UseBasicParsing
[PSCustomObject]@{Status=$aquaResponse.StatusCode;Prototype=$aquaResponse.Headers['X-Aqua-Prototype']} | Format-List
Get-NetTCPConnection -State Listen -LocalPort 4178 | Select-Object LocalAddress,LocalPort,State
```

Resultado real, código de salida de la comprobación 0:

```text
Status    : 200
Prototype : {local-v1}

LocalAddress LocalPort  State
------------ ---------  -----
127.0.0.1         4178 Listen
```

## Pruebas en navegador

Se revisó visualmente la página completa en escritorio y móvil. Se guardaron capturas de portada y página completa en `capturas/`.

- Tamaños de ventana probados: 320, 390, 768, 1024 y 1440 píxeles de ancho. No se detectó desplazamiento horizontal de la página.
- Navegación de las ocho secciones comprobada mediante los enlaces reales.
- Formulario vacío: errores en los cuatro campos y foco en teléfono.
- Hogar con datos ficticios: prueba correcta, campos borrados y mensaje accesible.
- Empresa y consumo desconocido: opción preseleccionada, consumo desactivado y prueba correcta.
- Código postal inválido: error visible. Código de cinco cifras: se prepara en el formulario, sin atribuir cobertura.
- Teclado: enlace de salto al contenido, apertura del menú y cierre con Escape. Elegir una sección cierra el menú y mueve el foco al destino.
- Registro del navegador revisado sin errores ni avisos de aplicación.

Datos ficticios: teléfono `000000000`, código postal `00000` y consumo `30`.

## Pendientes y traslado futuro

El contenido pendiente está detallado en `CONTENIDO_Y_PENDIENTES.md`. No se han probado entrega de correo, WhatsApp, telefonía, pedidos reales, analítica, cobertura ni funcionamiento de WordPress. Son funciones fuera de la prueba local.

El diseño puede trasladarse a una plantilla de WordPress después de revisar su instalación, alojamiento, licencias y copias. Se reutilizarían estructura, textos y estilos aprobados; el formulario simulado debe sustituirse por un flujo real y probarse de extremo a extremo. El prototipo no es un tema instalable de WordPress.

La guía de construcción de Sites se aplicó a la elección de una estructura pequeña, diseño responsive, metadatos, vista previa local y comprobación visual. La instrucción de trabajo local permitió omitir publicación y servicios de alojamiento.

## Actualización fotográfica del 28 de septiembre

Se incorporaron dos imágenes y el logotipo del dominio oficial de AQUA ESTEC, con originales intactos y enlaces documentados en `FUENTES_IMAGENES.md`. La cabecera y el pie utilizan el logo; la portada muestra los dispensadores; la sección de historia muestra la foto de Los Pujades.

Comandos ejecutados en el mismo entorno y carpeta:

```powershell
node --check server.mjs
node --test tests/prototype.test.mjs
```

Comprobación de sintaxis sin errores. Código de salida del comando de verificación: 0. Salida real de las pruebas actualizadas:

```text
✔ valida código postal sin atribuir cobertura (1.6339ms)
✔ detecta los cuatro campos vacíos y rechaza entradas inválidas (1.4376ms)
✔ acepta datos ficticios de hogar y empresa y consumo desconocido (0.2119ms)
✔ servidor: loopback, archivos públicos, bloqueo de envíos y rutas privadas (69.1381ms)
✔ imágenes reales: copias intactas, archivos existentes y formatos correctos (4.5686ms)
✔ todos los enlaces apuntan a secciones presentes y no hay recursos externos (3.393ms)
ℹ tests 6
ℹ suites 0
ℹ pass 6
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 195.061
```

El servidor local se reinició para incorporar las tres rutas de imágenes a la lista cerrada. Las dimensiones originales y la carga completa se verificaron en el navegador. No se instalaron programas o paquetes para tratar las imágenes.
