# AQUA ESTEC · Prototipo local v01

Esta web permite revisar el diseño y probar la navegación y los formularios en tu ordenador. Es una propuesta interna. Los textos y el diseño necesitan la aprobación de AQUA ESTEC.

## Abrir la web

1. Haz doble clic en `iniciar.cmd` dentro de esta carpeta. Deja abierta la ventana que aparece.
2. Abre **http://127.0.0.1:4178/** en tu navegador.

Si Codex ya ha dejado el servidor en marcha, basta con abrir esa dirección. Si aparece «El puerto 4178 está ocupado», no cierres procesos desconocidos; comprueba si la web ya está abierta en esa dirección.

También puedes arrancar desde PowerShell:

```powershell
Set-Location -LiteralPath 'C:\Users\jobam\OneDrive\Desktop\AQUA ESTEC\prototipo-local'
node server.mjs
```

Necesita Node.js 22 o superior. En este ordenador se ha comprobado Node.js 24.19.0. No necesitas instalar paquetes, WordPress ni una base de datos.

## Detenerla

Pulsa **Ctrl+C** en la ventana que inició el servidor. Si lo ha iniciado Codex, pídele que detenga el prototipo. Cerrar la pestaña del navegador no detiene el servidor.

## Qué puedes probar

- «Quiero pedir agua» lleva al formulario.
- «Consultar para mi hogar» y «Consultar para mi empresa» marcan el tipo de cliente correspondiente.
- «Comprobar mi zona» lleva a un campo de código postal. Solo comprueba que tenga cinco cifras y lo prepara en el formulario; no confirma cobertura.
- «Probar mi consulta» muestra errores si falta información. Una prueba válida borra los campos y muestra un mensaje de finalización.
- «Todavía no lo sé» permite probar sin indicar consumo.
- En móvil, abre «Menú» para llegar a cualquier sección. También funciona con teclado.

**Usa solo datos ficticios:** móvil `000 000 000`, código postal `00000` y consumo `30`. No se envían solicitudes ni se confirman pedidos. WhatsApp y llamada están desactivados hasta disponer de números aprobados.

La información introducida solo permanece temporalmente en los campos de la página. Se borra al terminar una prueba válida o abandonar la página. No hay cookies, almacenamiento del navegador, registro de consultas ni servicios externos.

## Editar textos y colores

- `dist/index.html`: textos y secciones.
- `dist/styles.css`: colores, tamaños y distribución. Los colores principales están al comienzo, dentro de `:root`.
- `dist/app.mjs`: comportamiento de los formularios y menú.
- `dist/validation.mjs`: reglas de los campos.

Guarda los cambios y recarga la página. No hay compilación. Para cambiar productos, fotos o cobertura, primero consulta `CONTENIDO_Y_PENDIENTES.md`.

La versión inicial reúne las ocho secciones en una página con enlaces internos. No existen fichas comerciales ni páginas por localidad porque faltan contenidos confirmados.

## Archivos de revisión

- `CONTENIDO_Y_PENDIENTES.md`: fuentes y datos pendientes.
- `FUENTES_IMAGENES.md`: procedencia de las fotos y el logo originales, tratamiento y archivos conservados.
- `INFORME_TECNICO.md`: elección técnica, coste, límites y pruebas.
- `capturas/`: vistas guardadas de escritorio y móvil.
- `tests/prototype.test.mjs`: comprobaciones automáticas.

Solo se sirven los archivos públicos de `dist` incluidos en la lista del servidor. El navegador no puede descargar estos documentos, las pruebas ni los archivos del proyecto principal.

Las fotos de dispensadores y del archivo Los Pujades, además del logotipo, proceden de la web oficial de AQUA ESTEC. Se guardan localmente para que la prueba no dependa de Internet. Los archivos originales se conservan íntegros en `fuentes/imagenes-originales`. Las capturas actualizadas tienen nombres `portada-con-fotos-escritorio.png`, `portada-con-fotos-movil.png` e `historia-con-foto.png`.

## Comprobar el prototipo

Desde PowerShell en esta carpeta:

```powershell
node --check server.mjs
node --check dist/app.mjs
node --check dist/validation.mjs
node --test tests/prototype.test.mjs
```

El servidor escucha exclusivamente en `127.0.0.1`, sin túneles ni reenvío de puertos configurado por este proyecto. Otro equipo no puede conectarse directamente. No cambies ese valor para compartirlo.

## Coste y futura publicación

El prototipo no añade gastos de alojamiento, dominio, herramientas o licencias. Usa el ordenador y Node.js ya disponibles. El consumo eléctrico y el tiempo de trabajo no están incluidos en esa cifra de 0 €.

Publicar y recibir solicitudes reales será otra fase. Su coste y la conveniencia de mantener WordPress siguen pendientes de la revisión del alojamiento actual. Esta versión no representa una aprobación del precio, plazo o alcance comercial del MVP.
