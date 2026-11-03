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
`scripts/llegada_salida.py` arma la escena desde los tres modelos y `scripts/exportar_web.py` la exporta a
`public/animaciones/planta-llegada/assets/planta_llegada.glb` (glTF con la animación horneada, WebP y Draco).
El paso a paso, el contenido del `.glb` y las formas de integrarla al sitio están en
[`docs/animaciones/planta-llegada.md`](../docs/animaciones/planta-llegada.md).

## Material de referencia
Las calcas de los camiones salen de fotos de camioncitos de juguete y las fachadas del almacén de una foto aérea
de una planta. Ver la nota del PR sobre su uso en este repo.
