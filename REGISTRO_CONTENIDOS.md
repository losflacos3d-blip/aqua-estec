# Registro de Contenidos del Prototipo Local - AQUA ESTEC

Este documento registra de forma rigurosa la trazabilidad de los contenidos utilizados en el prototipo local, diferenciando lo que está confirmado por la empresa, lo que es provisional para diseño y lo que está pendiente de validación oficial.

---

## 1. Información Confirmada (Fuentes verificadas del proyecto)

| Elemento | Origen / Fuente | Estado en el prototipo |
|---|---|---|
| **Nombre comercial** | AQUA ESTEC / aguaestec.es | Utilizado en cabecera, logotipo provisional y textos. |
| **Año de inicio de actividad** | 1970 (más de 50 años de experiencia familiar) | Destacado en el hero, cabecera y sección de historia. |
| **Actividad principal** | Reparto y suministro de agua mineral a domicilio y empresas | Eje central del contenido y diferenciación en menús. |
| **Diferenciación de clientes** | Hogares (particulares) y Empresas (oficinas, comercios) | Secciones y páginas independientes (`hogares.html` y `empresas.html`). |
| **Marcas de agua distribuidas** | Orotana, Bezoya, Chóvar y Bejís | Incluidas en el catálogo de aguas con ficha individual. |
| **Dispensadores de agua** | Dispensadores higiénicos frío/caliente presentes en su oferta | Incluidos en la sección y página de dispensadores. |
| **Prioridad geográfica** | Vall d’Uixó (CP 12600) como prioridad inicial de captación y SEO local | Señalada como zona prioritaria en cabecera, hero y mapa. |
| **Canales previstos** | Formulario web y WhatsApp (teléfono público sujeto a confirmación) | Formulario plenamente funcional en simulación local; botones directos identificados como pendientes. |
| **Campos del formulario** | Teléfono móvil, código postal, tipo de cliente y consumo mensual aproximado | Los 4 campos requeridos implementados con validación en cliente. |
| **Criterio sobre consumos mínimos** | No publicar consumos mínimos rígidos; asesorar tras recibir solicitud | Aclarado explícitamente en el formulario y en la página de hogares. |

---

## 2. Contenido Provisional (Redactado como propuesta de diseño y flujo)

| Elemento | Descripción provisional | Justificación / Propósito |
|---|---|---|
| **Textos comerciales de la portada** | Argumentos de comodidad, puntualidad, salud y trato familiar | Guiar al usuario hacia los CTAs "Pedir agua" y "Comprobar mi zona". |
| **Explicación de ventajas en Hogares** | Sin cargar peso, subida a piso, periodicidad adaptada | Diferenciar la propuesta de valor para familias. |
| **Explicación de ventajas en Empresas** | Máquinas frío/caliente para descansos, reposición periódica, factura mensual | Resolver dudas operativas de despachos y comercios. |
| **Línea de tiempo histórica (1970 - Hoy)** | Hitos de origen familiar, consolidación comarcal y servicio actual | Construir confianza y solera empresarial. |
| **Mensaje de confirmación del formulario** | Pantalla de simulación con resumen de los datos introducidos | Demostrar cómo se valida el formulario sin enviar datos reales. |

---

## 3. Datos Pendientes de Confirmación (Con marcadores visuales explícitos)

| Elemento | Qué falta confirmar | Tratamiento en el prototipo |
|---|---|---|
| **Teléfono público y WhatsApp** | El número de teléfono oficial para atención al cliente | Botones desactivados con la etiqueta `⏳ [Pendiente de confirmación]`. |
| **Fotografías reales e históricas** | Incorporadas fotografías y recursos gráficos auténticos extraídos del repositorio oficial de la empresa (`aguaestec.es`):<br>1. **Logotipo corporativo oficial** (`logo-aqua-estec.png`).<br>2. **Fotografía histórica original de 1970** con los fundadores y la primera flota de camiones de reparto *"Los Pujades"* (`historia-fundadores-camiones-1970.jpg`).<br>3. **Fotografía de equipamiento oficial**: dispensador serigrafiado AQUA-ESTEC con botellón Orotana y botellero (`dispensador-aqua-estec-oficial.jpg`).<br>4. **Mapa oficial de cobertura comarcal** (`mapa-cobertura-oficial.jpg`).<br>5. **Logos oficiales de marcas**: Orotana, Bezoya, Chóvar y Bejís.<br>*Nota: Queda pendiente si la empresa desea aportar fotografías actuales adicionales de instalaciones o personal en alta resolución.* | Integradas con pies descriptivos e indicación de archivo en `index.html`, `historia.html`, `dispensadores.html`, `zonas-reparto.html` y `aguas-formatos.html`. Cero imágenes inventadas o de stock genérico. |
| **Formatos y envases** | Capacidad exacta de garrafas y botellas comercializadas | Marcados como pendientes. **El formato de 20L queda estrictamente excluido.** |
| **Precios y tarifas** | Precios de venta, cuotas de dispensadores y depósitos retornables | Sin inventar cifras; se indica que se facilitan previa consulta. |
| **Condiciones contractuales de dispensadores** | Si son en cesión gratuita, alquiler mensual o venta | Identificadas como pendientes en `dispensadores.html`. |
| **Días y rutas comarcales** | Calendario de días de entrega en poblaciones de Castellón y Valencia | Marcador de rutas en revisión en `zonas-reparto.html`. |
| **Datos legales y política de privacidad** | Razón social completa, CIF, dirección fiscal y correo DPO | Aviso legal provisional en el pie de página indicando pendiente de redacción formal. |
| **Idiomas** | Posible versión en valenciano | Pendiente de decisión; prototipo en castellano neutro. |
| **Correo de destino del formulario** | Buzón de correo al que deben llegar los avisos reales | Simulado en local sin transmisión. |
