# Modelos 3D (Blender)

Archivos fuente de la animación de la planta (`public/animaciones/planta-llegada/`). Blender 5.2, texturas
empaquetadas dentro de cada `.blend` (abren solos). Medidas en metros.

| Archivo | Qué es |
|---|---|
| `animacion-llegada-salida.blend` | La escena completa: planta, calles y volúmenes sencillos, el camión 2025 que llega en reversa a su andén y el tráiler full que sale a la calle. 500 cuadros a 25 fps (20 s), con la cámara animada |
| `planta-bimbo.blend` | Planta genérica: almacén alto con sus dos fachadas tomadas de una foto aérea, techo solar, anexo y nave con andenes |
| `camion-bimbo-2025.blend` | Camión 2025, modelado a partir de fotos del camioncito de juguete |
| `trailer-full.blend` | Tractocamión con remolque, modelado a partir de fotos del juguete |

## Exportar a la página
La página carga `assets/planta_llegada.glb`: la escena exportada a glTF con la animación horneada (un clip por
objeto), texturas WebP y mallas comprimidas con Draco. Al exportar, los paneles solares (material procedural en
Blender) se cambian por una textura de módulo repetida y los tráileres estacionados se vuelven objetos reales.
Después de regenerar el `.glb`, sube el número de versión `V` en `main.js` para que el navegador no use la copia
en caché.

## Material de referencia
Las calcas de los camiones salen de fotos de camioncitos de juguete y las fachadas del almacén de una foto aérea
de una planta. Ver la nota del PR sobre su uso en este repo.
