# Planeta limpio: cómo está guardado

Planeta de juguete en el estilo de Bimbo Ventures, en vivo con three.js. Tiene 4,851 árboles que crecen, nubes y
la costa dibujada en el shader. Es la versión **limpia** para la web: tres especies de árbol y un arbusto escaso, y
bosque solo donde es creíble. En la animación general es el remate: el zoom out final al mundo.

## Dónde está cada cosa

```
public/animaciones/planeta/            ← lo que se publica (/animaciones/planeta/index.html)
  index.html                           página de prueba: se arrastra para girar; con clic el bosque vuelve a crecer
  main.js                              escena, árboles instanciados, crecimiento, giro y arrastre
  planeta_material.js                  material del planeta: océano, halo de costa y tierra desde costa_sdf.png
  assets/planeta.glb                   esfera, especies simplificadas y nubes (1.1 MB)
  assets/instancias.bin                matrices de los 4,851 árboles en el marco del planeta (90 KB)
  assets/escena.json                   especies, capas, crecimiento, cámara, sol y rotaciones
  assets/costa_sdf.png                 distancia a la costa, 8192×4096 (2 MB)

modelos-3d/planeta/                    ← fuentes (no se publican en la página)
  planeta-ventures-limpio.blend        escena de Blender 5.2 con las texturas empaquetadas
  web/limpiar_planeta.py               deja la versión limpia a partir del planeta completo del video
  web/exportar_desde_blender.py        exporta planeta.glb, instancias.bin y escena.json
  web/costa_sdf.py                     genera costa_sdf.png desde los contornos de Natural Earth
  fuentes/ne_50m_land.geojson          Natural Earth 1:50m Land (dominio público)
  CREDITOS.md                          origen y licencia de cada árbol (Quaternius, CC0)
```

## Coordenadas
- La textura del planeta es equirectangular y el radio es 10.
- Un punto de latitud y longitud `(lat, lon)` en grados cae en
  `(cos lat · cos lon, sin lat, −cos lat · sin lon) × 10`, en ejes de three y antes de la rotación del planeta.
- Con esa fórmula se ponen los marcadores de países en la animación general.

## Cómo regenerarlo
1. `blender -b planeta-ventures-limpio.blend --python web/exportar_desde_blender.py`.
   - Escribe en `web/assets/` junto al `.blend`.
   - Copia el resultado a `public/animaciones/planeta/assets/`.
2. Sube `V = '?v=…'` en `main.js` para que el navegador no use la copia en caché.
3. `costa_sdf.py` solo hace falta si cambian los contornos de la costa.

## Antes de publicarlo
Los árboles son CC0 y los contornos son de dominio público: no hay derechos por confirmar. Agregarlo a una página
es una sección nueva y va primero en un issue, según `CLAUDE.md`.
