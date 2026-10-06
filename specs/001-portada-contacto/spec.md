# Especificacion EARS — MVP-001 Portada y Contacto

## Feature ID
MVP-001-portada-contacto

## Objetivo
Renovar la portada de AQUA ESTEC para movil y escritorio, facilitar el contacto via WhatsApp, telefono y formulario, y medir la conversion de leads.

## Especificacion EARS

### Gado que (Given que)
Dado que la reunion de descubrimiento del 22 de septiembre de 2026 ha confirmado los acuerdos,
**cuando** el proyecto reciba la aprobacion commercial de Joan y los accesos, contenidos e imagenes de AQUA ESTEC,
**entonces** se podra iniciar la auditoria tecnica y el desarrollo del MVP.

### Cuando (When)
**Cuando** la auditoria tecnica de WordPress confirma que la instalacion actual es segura,
**entonces** se podra proceder con la construccion sobre la plataforma.

**Cuando** el disenador entregue la propuesta visual de la portada,
**entonces** Jose (AQUA ESTEC) podra aprobarla o solicitar correcciones.

### Entonces (Then)
**Entonces** la portada aprobada se construira en la zona de pruebas y se validara en movil y escritorio antes de publicar.

## Casos de Uso

### UC-001: Portada Principal
- Como visitante, quiero ver claramente que AQUA ESTEC es una empresa familiar desde 1970 que reparte agua y dispensadores.
- Como visitante, quiero distinguir rapidamente las opciones para hogares y empresas.
- Como visitante, quiero encontrar un acceso rapido a "Pedir Agua".

### UC-002: Boton WhatsApp
- Como visitante, quiero hacer clic en un botón visible de WhatsApp para iniciar una conversacion.
- El botón debe estar visible en la portada (movil y escritorio).

### UC-003: Boton de Llamada
- Como visitante, quiero hacer clic en un botón de llamada para contactar telefonicamente.
- El botón solo se activa despues de que AQUA ESTEC confirme el numero publico.

### UC-004: Formulario de Contacto
- Como visitante, quiero completar un formulario con:
  - Telefono movil (obligatorio)
  - Codigo postal (obligatorio)
  - Domicilio o empresa (segun selected)
  - Consumo aproximado (opcional)
- Como sistema, quiero enviar un aviso por correo electronico al recibir el formulario.
- Como sistema, quiero guardar una copia del formulario localmente.
- Como sistema, quiero aplicar proteccion basica contra spam (honeypot, validacion de campos).

### UC-005: Medicion
- Como coordinador, quiero registrar los siguientes eventos:
  - Formulario enviado
  - Clic en botón WhatsApp
  - Clic en botón de llamada
- La medicion se hara mediante Google Analytics / Search Console si hay accesos.

### UC-006: SEO Inicial
- Como coordinador, quiero optimizar la portada para Vall d'Uixó:
  - Title tag con nombre de la localidad y servicio.
  - Meta description con mensaje comercial.
  - Encabezados H1, H2 con palabras clave locales.

### UC-007: Sitemap e Indexacion
- Como coordinador, quiero comprobar que el sitemap se envia correctamente a Google Search Console.
- Quiero verificar que la portada sea indexable.

## Casos Limite

### CL-001: Formulario sin campos obligatorios
- Si el usuario envia el formulario sin telefono movil o codigo postal, el formulario debe mostrar un error claro y no enviarse.

### CL-002: Spam detectado
- Si el honeypot se activa o la validacion falla, el formulario debe rechazar el envio sin mostrar mensaje publico de error.

### CL-003: WhatsApp no disponible
- Si WhatsApp no esta disponible en el dispositivo del usuario, el botón debe redirigir a la app nativa o a la web de WhatsApp.

### CL-004: Accesos no disponibles
- Si no hay accesos a Google Analytics / Search Console, la medicion se omitira y se registrara como no disponible.

### CL-005: Imagenes no autorizadas
- Si no se reciben imagenes autorizadas, la portada se construira con imagenes de stock o placeholders, y se notificara a AQUA ESTEC.

## Fuera del Alcance (Out of Scope)

- Automatizaciones, CRM o respuestas automaticas.
- Rediseño completo de todas las paginas.
- Ecommerce, pagos o area privada.
- Campañas publicitarias y SEO continuado.
- Paginas de otras localidades.
- Fotografia profesional, traduccion o redaccion juridica.
- Alojamiento, dominio, licencias.
- Reparaciones de problemas graves anteriores al proyecto.
- Integracion con rutas, facturación/ERP.
- Area de cliente o historial de pedidos.