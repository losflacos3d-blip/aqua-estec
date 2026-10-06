# Especificación EARS — 002 Seguridad Defensiva y Cumplimiento Normativo Legal

## Feature ID
`002-seguridad-y-cumplimiento-legal`

## Objetivo
Blindar el proyecto AQUA ESTEC contra ataques, inyecciones (XSS), accesos no autorizados y modificaciones sin testear, e implementar el cumplimiento normativo exigido por la legislación española y europea (LSSI-CE, RGPD, LOPDGDD y Directiva ePrivacy).

---

## 1. Especificación en Sintaxis EARS (Easy Approach to Requirements Syntax)

### Requisitos Ubicuos (Siempre activos)
- **EARS-UBI-001**: El sistema **siempre** deberá aplicar cabeceras HTTP de seguridad (`Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`).
- **EARS-UBI-002**: El sistema **siempre** deberá prohibir la ejecución de scripts externos no autorizados, librerías de tracking invasivo o CDNs de terceros no verificadas.
- **EARS-UBI-003**: El código fuente **siempre** deberá evitar el uso de `innerHTML` con entradas proporcionadas por el usuario para mitigar riesgos de Cross-Site Scripting (XSS).
- **EARS-UBI-004**: Los repositorios y ramas de trabajo **siempre** deberán bloquear commits si no se superan las pruebas automatizadas del arnés (`npm test`) o si se detectan credenciales/secretos.

### Requisitos Basados en Eventos (Cuando ocurra un evento)
- **EARS-EVT-001**: **Cuando** un usuario visualice el formulario de contacto o pedido, el sistema deberá presentar una primera capa informativa de protección de datos (Responsable, Finalidad, Legitimación, Destinatarios y Derechos) y una casilla de verificación obligatoria no premarcada para aceptar la Política de Privacidad.
- **EARS-EVT-002**: **Cuando** un bot o script automatizado rellene el campo trampa oculto (*honeypot*), el sistema deberá neutralizar el procesamiento silenciosamente sin ejecutar envíos ni alertas.
- **EARS-EVT-003**: **Cuando** un usuario pulse sobre los enlaces del pie de página (*Aviso Legal*, *Política de Privacidad*, *Política de Cookies*), el sistema deberá mostrar la información legal completa redactada según la LSSI-CE y el RGPD.
- **EARS-EVT-004**: **Cuando** se ejecute un intento de commit en Git, el hook de seguridad local deberá verificar la integridad de las pruebas y la ausencia de claves privadas antes de autorizar el guardado.

### Requisitos de Estado (Mientras el sistema se encuentre en un estado)
- **EARS-STA-001**: **Mientras** el servidor web esté en ejecución, únicamente responderá a solicitudes `GET` y `HEAD` dirigidas a rutas estáticas verificadas en la lista blanca, retornando código `404` para archivos sensibles (`.env`, `package.json`, `.git`, etc.) y `405` para métodos no permitidos.

---

## 2. Cumplimiento Normativo Obligatorio (Marco Legal)

1. **LSSI-CE (Ley 34/2002)**:
   - Identificación del prestador de servicios: *Agua-Estec S.L.*
   - Domicilio: *C/ Ribera d'Adobadors, 24, 12600 La Vall d'Uixó (Castellón)*.
   - Datos de contacto: *Teléfono 630 359 472*, *Email aguaestec@hotmail.com*.
   - Propiedad intelectual, limitación de responsabilidad y jurisdicción (Castellón).
2. **RGPD (Reglamento UE 2016/679) & LOPDGDD (Ley Orgánica 3/2018)**:
   - Capa 1 (Informativa en formulario): Resumen de tratamiento, base jurídica (consentimiento) y ejercicio de derechos ARCO.
   - Capa 2 (Política de Privacidad completa): Plazos de conservación, finalidades de reparto/atención, medidas técnicas de seguridad y derecho a reclamar ante la AEPD.
3. **Directiva ePrivacy (2002/58/CE) y Política de Cookies**:
   - Transparencia activa: Declaración de *Cero Cookies de Rastreo de Terceros*.
   - Explicación del almacenamiento técnico esencial estrictamente necesario para la navegación.

---

## 3. Casos Límite y Gestión de Errores
- **CL-001**: Intento de envío de formulario sin marcar la aceptación de privacidad -> Bloqueo con mensaje accesible y foco en la casilla.
- **CL-002**: Intento de envío con honeypot completado -> Rechazo sin error visible para el atacante.
- **CL-003**: Intento de inyección de código `<script>` o etiquetas HTML en campos de texto -> Sanitización y escape estricto.
- **CL-004**: Petición HTTP manipulada hacia rutas privadas (`/.git`, `/package.json`, `/server.mjs`) -> Retorno inmediato de `404 Not Found`.
