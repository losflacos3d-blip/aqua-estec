# Plan Tecnico — MVP-001 Portada y Contacto

## Arquitectura

### Componentes

1. **Portada (template de WordPress)**
   - Archivo de plantilla: `page-portada.php` o modificacion de `front-page.php`.
   - Estructura responsive (mobile-first):
     - Header: logo, menu principal, botones de contacto.
     - Hero: mensaje principal, imagen de fondo, CTA "Pedir Agua".
     - Secciones: Hogares / Empresas, Aguas y formatos, Zonas de servicio, Historia.
     - Footer: contacto, redes sociales, datos legales.

2. **Botones de contacto**
   - WhatsApp: enlace `https://wa.me/+34XXXXXXXXX` con mensaje predefinido.
   - Llamada: enlace `tel:+34XXXXXXXXX` (solo tras confirmar numero publico).

3. **Formulario de contacto**
   - Plugin nativo de WordPress o custom con PHP.
   - Campos: telefono movil, codigo postal, domicilio/empresa, consumo aproximado.
   - Honeypot field oculto.
   - Validacion frontend y backend.
   - Envio por email a la persona responsable.
   - Copia local en base de datos o archivo.

4. **Medicion**
   - Integracion con Google Analytics (si hay accesos).
   - Eventos: Formulario enviado, Clic WhatsApp, Clic Llamada.

5. **SEO Inicial**
   - Title, description, encabezados H1/H2 optimizados para Vall d'Uixó.
   - Sitemap XML (plugin existente o configurado).

### Flujo de Datos

```
Visitante
  │
  ├─→ Portada (HTML/CSS/JS)
  │     │
  │     ├─→ Botón WhatsApp → wa.me
  │     ├─→ Botón Llamada → tel:
  │     └─→ Formulario → Validación → Email + Copia Local
  │
  └─→ Google Analytics → Eventos
```

## Tecnologias

- **Frontend**: HTML5, CSS3, JavaScript vanilla.
- **Backend**: PHP (WordPress).
- **Formulario**: PHP mail() o WP Mail SMTP + base de datos MySQL.
- **Medicion**: Google Analytics (gtag.js).
- **SEO**: Plugins de WordPress (Yoast SEO o similar) o configuracion manual.

## Seguridad

- Validacion y sanitizacion de todos los campos del formulario.
- Honeypot anti-spam.
- No hardcodear credenciales; usar variables de entorno o configuracion de WordPress.
- Copia de seguridad antes de cualquier cambio.
- Auditoria de solo lectura antes de escribir codigo.

## Pruebas

- Portada responsive: movil (320px, 375px, 414px) y escritorio (1024px, 1440px).
- Formulario: envio exitoso, campos obligatorios vacios, honeypot activado.
- WhatsApp y llamada: enlaces funcionan en movil y escritorio.
- Medicion: eventos registrados en Google Analytics.
- SEO: title, description, encabezados correctos.
- Sitemap: XML disponible y visible para Search Console.

## Entregables

- Portada renovada (HTML/CSS/JS integrado en WordPress).
- Botones de contacto funcionando.
- Formulario funcional con email y copia local.
- Configuración de medicion.
- SEO inicial para Vall d'Uixó.
- Documentacion de uso y procedimientos.