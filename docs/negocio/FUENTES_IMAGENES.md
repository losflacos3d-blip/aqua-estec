# Imágenes reales incorporadas al prototipo

Fecha de consulta y descarga: 28 de septiembre de 2026.

Joan pidió buscar e integrar fotos de AQUA ESTEC sin inventarlas. Se revisaron la portada y la página «Quiénes somos» del dominio oficial `www.aguaestec.es`. Se inspeccionó cada archivo antes de incorporarlo. No se generaron imágenes.

## Procedencia y uso

| Archivo local público | Página donde aparece | Archivo original público | Uso |
|---|---|---|---|
| `dist/assets/dispensadores-agua-estec.jpg` | [Inicio](https://www.aguaestec.es/) | [imagen-web-final-1.jpg](https://www.aguaestec.es/wp-content/uploads/imagen-web-final-1.jpg) | Imagen de portada: dispensador con etiqueta Agua-Estec y soporte con garrafas. |
| `dist/assets/historia-los-pujades.jpg` | [Quiénes somos](https://www.aguaestec.es/quienes-somos/) | [IMG-20250201-WA0010-1.jpg](https://www.aguaestec.es/wp-content/uploads/IMG-20250201-WA0010-1.jpg) | Foto de archivo de dos personas delante de camiones rotulados Los Pujades. La página la presenta bajo «Los Pujades». |
| `dist/assets/logo-agua-estec.png` | [Inicio](https://www.aguaestec.es/) | [logo-11.png](https://www.aguaestec.es/wp-content/uploads/logo-11.png) | Logotipo original en cabecera y pie. |

No se ha atribuido una fecha a la fotografía antigua ni se han identificado las personas que aparecen. La fotografía de dispensadores no confirma disponibilidad comercial actual, formatos ni condiciones.

## Tratamiento de los archivos

Los archivos públicos son copias idénticas de los descargados. No se cambiaron caras, vehículos, etiquetas, colores ni contenido. No se aplicaron filtros, ampliación artificial, reconstrucción o retoque generativo.

Solo se ajusta la presentación mediante CSS: el encuadre de la imagen de dispensadores se centra en el lado derecho; la foto de archivo se muestra completa. El logo conserva su proporción. Los originales están en `fuentes/imagenes-originales`, fuera de la lista de archivos accesibles por HTTP.

| Archivo | Tamaño | Dimensiones originales | SHA-256 |
|---|---:|---|---|
| Historia | 103270 bytes | 1000 × 563 | `BC3EB92E360AEA608582E0DA64ED7DE18FABC3EDE4DE0BCA91308F0487092B90` |
| Dispensadores | 122344 bytes | 1920 × 1080 | `E952FACAE1AE7E2042A4B0749F36348293CE3CA27FDC445B281A401804D2FAAC` |
| Logotipo | 6765 bytes | 200 × 32 | `3B4C106565E4EE4CB5EEE49811F23B4D706C39E9E79B5B8435BAE9FF05DF3D72` |

Las dimensiones se comprobaron con la carga real en el navegador; los tamaños y hashes, con los archivos locales.

Se descargó también `b9b2393a-5a21-4317-bc41-aa635fd4784b.jpeg` para inspección. Resultó ser un mapa, no una fotografía de empresa. Se conserva con el nombre de descarga inicial `dispensadores-original.jpeg` en la carpeta privada de originales, pero **no se ha incorporado a la web**. No se utiliza para confirmar cobertura.

## Autorización y alcance

La autorización de Joan cubre su integración en este prototipo local. La presencia de imágenes en una web pública no acredita por sí sola una licencia para otros usos. La revisión del uso público y la aprobación final de AQUA ESTEC continúan pendientes antes de cualquier publicación.

Los tres archivos se sirven desde `127.0.0.1`. La web de prueba no carga imágenes desde el dominio de AQUA ESTEC ni transmite datos a ese dominio.
