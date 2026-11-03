---
name: mapa-relieve
description: Mapa de relieve 3D en nube de puntos para mostrar presencia (países, plantas, oficinas) en un componente de Next.js — generador de la retícula de relieve para cualquier país o región, reglas de etiquetas, clic en marcadores, filtro por categoría, encuadre centrado por el contorno real y comportamiento distinto en teléfono. Úsala para la sección Presencia de Inicio, cuando pidan un mapa de presencia, "dónde estamos", plantas por país, o cuando el mapa salga en blanco, descentrado o "sucio" en el teléfono.
---

# Mapa de relieve

Relieve real (ETOPO1) dibujado como nube de puntos en perspectiva sobre un `<canvas>`, con marcadores. El
dibujo (`relieve.js`, API `Relieve.start(canvas, opciones)`) es privado de Nuclea: pídelo al equipo o
reimpleméntalo con las reglas de abajo. En este repo va como componente `"use client"` que llama a
`start` en un `useEffect` y a `stop()` al desmontar; la retícula va en `public/data/`.

## Antes de construir: qué mapa para Bimbo
Bimbo opera en {paisesOperacion} países de cuatro continentes (`content/cifras.ts`). Un solo relieve no sirve
para eso: por arriba de ~60° de ancho la proyección se deforma (América completa mide ~120°). Propón en un
issue una de estas opciones antes de generar nada:
- relieves regionales (por ejemplo Norteamérica y Latinoamérica) y una lista para Europa, Asia y África;
- un mapa plano del mundo para la presencia global y el relieve solo para México.

## Generar la retícula (`scripts/generar_relieve.py`)
```bash
python3 skills/mapa-relieve/scripts/generar_relieve.py --paises 484 --paso 0.2 --salida public/data/mx-relieve.json --solo-contar   # cuántos puntos
python3 skills/mapa-relieve/scripts/generar_relieve.py --paises 484,320,84,222,340,558,188,591 --paso 0.25 --salida public/data/mesoamerica.json --cache /tmp/elev.json
```
- Contorno Natural Earth 1:50m + ETOPO1 de opentopodata.org. Con `484` (México) a 0.2° da 4 356 puntos.
- Apunta a 3 000–6 000 puntos: sube `--paso` para regiones grandes. La API pública permite 1 llamada/s de
  100 puntos y 1 000 llamadas al día; `--cache` permite reintentar sin repetir.
- EE. UU. o Francia traen territorios lejanos: recórtalos con `--bbox lon0,lat0,lon1,lat1`.
- `--solo-contar` no pide elevaciones, pero sí baja el contorno de países (jsDelivr).

## Opciones del dibujo
- `src`: URL de la retícula. `sites: [{ n, ll: [lon, lat] }]`. `state: i => ({ on, active })`, que se llama
  en cada cuadro.
- `labelMinW`: ancho mínimo del canvas para dibujar el nombre junto al marcador activo (`Infinity` = nunca).
- `fit(W, H, narrow) → { left, right, top, bottom }`: encaja el contorno visible en ese rectángulo.
- `pick(x, y, tol = 14)`: índice del marcador bajo un punto del canvas, o −1.

## Reglas
1. **Teléfono limpio**: nada de texto flotando sobre el mapa. El marcador activo va en una línea fija bajo el
   mapa ("03 / 12 · País"), que cambia con la animación. Sin clic ni toque en marcadores.
2. **Con mouse a cualquier ancho, o táctil desde 720 px**: etiqueta junto al marcador activo, que rota cada
   3.2 s. Un clic en un marcador lo vuelve activo y pausa el recorrido 7 s; un clic fuera no hace nada. Cursor
   `pointer` sobre marcadores, y la línea fija se oculta. Decídelo con
   `matchMedia('(hover:hover) and (pointer:fine)')`, no solo con el ancho: si no, una ventana angosta de
   computadora queda sin etiquetas. La etiqueta nunca sale del canvas.
3. **Centrado real**: la perspectiva achica el norte y ensancha el sur, así que centrar la retícula deja el mapa
   corrido. Usa `fit`, que mide el contorno ya proyectado (con marcadores) y lo encaja con márgenes parejos.
   Recalcúlalo al cambiar el tamaño.
4. **La leyenda filtra** por categoría o región: `state.on` apaga los demás, y la rotación y el clic solo usan los
   visibles.
5. Márgenes laterales iguales al texto de la sección: `clamp(20px, 4vw, 56px)`.
6. `prefers-reduced-motion`: sin rotación; queda un marcador activo fijo.

## Al editar el archivo del dibujo
- **Corre siempre** `node skills/mapa-relieve/scripts/smoke-test.js <ruta>/relieve.js [NombreGlobal]`. Un error
  dentro de `requestAnimationFrame` no impide que el script cargue: solo deja el canvas en blanco.
- Al reemplazar una línea con varias sentencias, comprueba que no quede código después de un `//`.
- Los cambios nuevos van como opción con un valor por defecto que no altere lo que ya funciona.

## Cómo verificar
Ver `verificar-en-navegador`. En resumen: el panel del navegador debe estar visible (oculto, `requestAnimationFrame`
no corre y el canvas sale vacío); cuenta píxeles con alfa en `getImageData` para saber si dibuja; recorre el canvas
con `mousemove` sintéticos hasta encontrar `cursor === 'pointer'`, haz clic y comprueba que el activo se mantiene
7 s. En teléfono, ese barrido no debe encontrar ningún marcador clicable.
