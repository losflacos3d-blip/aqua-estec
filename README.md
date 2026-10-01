# Prototipo Local de la Web de AQUA ESTEC

Bienvenido al prototipo de la nueva web de **AQUA ESTEC**.

Este prototipo se ha creado para que puedas probar y ver en tu propio ordenador cómo será la experiencia visual, la navegación y el recorrido comercial de la futura web antes de tocar la web pública.

---

## 1. Qué es este prototipo

- Es una maqueta interactiva y funcional completa que se ejecuta **única y exclusivamente en tu ordenador** (`http://127.0.0.1:8080`).
- No está conectada a Internet, no es accesible desde otros teléfonos o equipos y **no modifica en absoluto la web actual**.
- Te permite revisar cómo se ve la web tanto en ordenador como en teléfono móvil.
- Permite probar el formulario de solicitud: valida que el teléfono o el código postal estén bien escritos, pero **no envía ningún dato a ningún sitio ni guarda información personal**.

---

## 2. Cómo ponerlo en marcha (en Windows)

Tienes dos opciones muy sencillas:

### Opción A (La más fácil - Doble clic)
1. Abre la carpeta `prototipo-local`.
2. Haz doble clic sobre el archivo **`iniciar.bat`**.
3. Se abrirá una ventana negra de control y, automáticamente, se abrirá tu navegador web con la portada de AQUA ESTEC.

### Opción B (Desde PowerShell)
Si prefieres usar la consola de PowerShell, abre la carpeta `prototipo-local` y escribe:
```powershell
.\iniciar.ps1
```

La dirección exacta en la que se abre es:  
👉 **`http://127.0.0.1:8080`** (o `http://localhost:8080`)

---

## 3. Cómo detenerlo

Cuando termines de revisar la web:

- **Opción rápida:** Haz doble clic en el archivo **`detener.bat`** (o pulsa `Ctrl + C` en la ventana negra del servidor si la tienes abierta).
- **Desde PowerShell:** Ejecuta `./detener.ps1`.

---

## 4. Qué archivos puede editar Joan

No necesitas saber programación para cambiar textos o corregir frases. Puedes abrir estos archivos con el **Bloc de notas** de Windows (clic derecho > *Abrir con* > *Bloc de notas*):

- **`index.html`**: Es la portada principal de la web. Aquí puedes cambiar los textos de bienvenida, las frases destacadas y los mensajes principales.
- **`hogares.html`**: La página pensada para familias y casas particulares.
- **`empresas.html`**: La página orientada a oficinas, despachos y comercios.
- **`aguas-formatos.html`**: La lista de marcas de agua (Orotana, Bezoya, Chóvar, Bejís).
- **`dispensadores.html`**: La información de los dispensadores de agua.
- **`zonas-reparto.html`**: La página donde se explica el reparto prioritario en Vall d’Uixó y comarcas.
- **`historia.html`**: La historia familiar de la empresa desde 1970.
- **`pedir-agua.html`**: La página dedicada al formulario de contacto.

*Consejo:* Si vas a cambiar algún texto, busca la frase entre las etiquetas (por ejemplo entre `<p>` y `</p>`) y guárdalo. Al recargar la página en el navegador (`F5`), verás el cambio al instante.

---

## 5. Qué partes siguen pendientes de confirmar

Para que la web sea 100% real, AQUA ESTEC (a través de José) debe confirmar varios datos antes de que pasen a la web definitiva:

1. **Teléfono público y WhatsApp:** Los botones actuales muestran `[Pendiente de confirmación]`. No están activos para evitar que nadie llame a números erróneos.
2. **Fotografías reales e históricas:** Hemos reservado cajas marcadas para las fotos de la familia, las furgonetas, el almacén y recuerdos desde 1970. No hemos puesto fotos falsas de stock.
3. **Formatos y precios:** El catálogo muestra las marcas reales (Orotana, Bezoya, Chóvar, Bejís), pero los litros exactos de cada envase y sus precios están marcados como pendientes. El posible formato de 20 litros no está confirmado y no se ha incluido.
4. **Rutas y días de entrega:** Vall d'Uixó es la prioridad confirmada; los días exactos para el resto de pueblos de Castellón y Valencia se añadirán cuando se validen.
5. **Textos legales:** Razón social, CIF y política de privacidad formal.

---

## 6. Dónde ver las capturas de pantalla

Dentro de la subcarpeta `capturas/` puedes consultar dos imágenes de muestra:
- `capturas/portada-escritorio.png`: Cómo se ve la portada en un ordenador grande.
- `capturas/portada-movil.png`: Cómo se ve la portada en un teléfono móvil.
