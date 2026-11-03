---
name: mapa-relieve
description: Mapa de relieve 3D en nube de puntos (sitio-relieve.js) para mostrar presencia — el de México del sitio de referencia (hero y sección Presencia) o el de cualquier otro país o región para otro prospecto (Bimbo en América, una constructora en Centroamérica) — con marcadores de proyectos, plantas u oficinas, etiquetas que rotan, clic en marcadores, filtro por categoría, encuadre centrado por su contorno real, comportamiento distinto en teléfono y un generador de la retícula de relieve para cualquier país. Úsala cuando pidan un mapa de presencia, "dónde estamos", plantas por país, cambiar, mover, centrar, filtrar o hacer interactivo el mapa, el "mapa del hero", sus etiquetas o marcadores, llevar el relieve a otra sección, página o país, o cuando el mapa salga en blanco, descentrado o "sucio" en móvil.
---

# Mapa de relieve (cualquier prospecto)

Relieve real (ETOPO1, retícula 0.2° en `prototipo/assets/mx-relieve.json`) dibujado como nube de puntos en
perspectiva sobre un `<canvas>`, con los proyectos del grupo como marcadores. Un solo archivo,
`prototipo/sitio-relieve.js` (repo privado del sitio de referencia; pedir el archivo al equipo de Nuclea), compartido por
todas las páginas. El encuadre, la escala y la perspectiva salen del recuadro de la retícula, así que el mismo
archivo sirve para otro país o región cambiando `src` (opción) por la retícula nueva.

## Otro país o región (`scripts/generar_relieve.py`)
```bash
python3 scripts/generar_relieve.py --paises 484 --paso 0.2 --salida assets/mx-relieve.json --solo-contar   # cuántos puntos
python3 scripts/generar_relieve.py --paises 484,320,84,222,340,558,188,591 --paso 0.25 --salida assets/mesoamerica.json --cache /tmp/elev.json
```
- Mismo método que el original (contorno Natural Earth 1:50m + ETOPO1 de opentopodata.org): con `484` a 0.2°
  da exactamente los 4 356 puntos de `mx-relieve.json`.
- Apuntar a 3 000–6 000 puntos: subir `--paso` para regiones grandes (América completa ≈ 0.8–1°). La API pública
  permite 1 llamada/s de 100 puntos y 1 000 llamadas al día; `--cache` permite reintentar sin repetir.
- EE. UU. o Francia traen territorios lejanos: recortar con `--bbox lon0,lat0,lon1,lat1`.
- Regiones muy anchas: la proyección es equirectangular corregida por `cos(lat central)`; por arriba de ~60° de
  ancho (América completa mide ~120°) dividir en dos mapas (p. ej. Norteamérica y Sudamérica) o usar un mapa plano.
- `--solo-contar` no pide elevaciones, pero sí baja el contorno de países (jsDelivr).
- Después: `Relieve.start(cv, { src: 'assets/<region>.json', sites, … })` y renombrar el archivo JS y el
  objeto global para el cliente (p. ej. `bimbo-relieve.js`) si se lleva a otro repo.

## Dónde se usa
| Lugar | Cómo | Etiquetas | Interacción |
|---|---|---|---|
| Hero de Home v3 (`startHero`, `Home v3.dc.html`, **solo en una rama anterior**; la Home de `fusion/sitio` usa video) | `R.start(heroCanvas, {...})` | **Ninguna** (`labelMinW: Infinity`): el nombre va en la ficha "En el mapa · NN / 22" | Rota sola (`state.site`) |
| Presencia de Home | iframe `mapa-presencia.html?…&relieve=1` | Con mouse a cualquier ancho, o táctil desde 720 px: etiqueta junto al marcador activo | Igual: clic/toque en marcador + leyenda filtra |
| Presencia en v2 y otras páginas | iframe sin `relieve=1` | — | Mapa plano D3 original (no se tocó) |

## API (`Relieve.start(canvas, opciones) → { stop(), pick(x, y) }`)
- `sites: [{ n, ll:[lon,lat] }]`, `state: i => ({ on, active })` (se llama cada cuadro).
- `labelMinW`: ancho mínimo del canvas para dibujar el nombre junto al marcador activo (`Infinity` = nunca).
- `frame(W,H,narrow) → { left, right, cy }`: encuadre fijo (por defecto, el del hero; `narrow = W < 960`).
- `fit(W,H,narrow) → { left, right, top, bottom }`: **encaja el contorno visible** en ese rectángulo. Usar
  este, no `frame`, cuando el mapa debe quedar centrado con márgenes parejos.
- `pick(x, y, tol=14)`: índice del marcador (palito + cabeza) bajo un punto del canvas, o −1.
- También: `routes`, `routeOn`, `reduce`, `src`, `exag`, `band`, `fade` (ver cabecera del archivo).

## Reglas que el usuario ya fijó
1. **Teléfono limpio**: nada de texto flotando sobre el mapa (se encimaba con el título). En Presencia,
   el proyecto activo va en **una línea fija sobre la leyenda** (`.cap`: "03 / 22 · Nombre · Lugar"), que
   cambia con la animación. Sin clic/toque en marcadores.
2. **Con mouse a cualquier ancho, o táctil desde 720 px**, solo en el mapa de Presencia: etiqueta junto al marcador activo,
   que rota cada 3.2 s; **clic/toque en un marcador** lo vuelve activo y pausa el recorrido 7 s; clic fuera
   no hace nada; siempre hay una etiqueta visible. Cursor `pointer` sobre marcadores. En ese rango la
   línea fija se oculta (no repetir el nombre). Se decide con `matchMedia('(hover:hover) and (pointer:fine)')`
   (`desk`): `labelMinW: desk ? 0 : 720` y CSS `@media (min-width:720px),(hover:hover) and (pointer:fine){.cap{display:none}}`.
   Antes dependía solo del ancho y en una ventana angosta de computadora el mapa quedaba sin etiquetas.
   La etiqueta nunca sale del canvas (se acota a `[4, W - ancho - 4]`).
3. **Hero sin etiquetas** en ningún tamaño (el nombre ya está en su ficha).
4. **Centrado real**: la perspectiva achica el norte (Baja California) y ensancha el sureste (Yucatán), así
   que centrar la retícula deja el mapa corrido. `fit` mide el contorno ya proyectado (con marcadores
   incluidos) y lo encaja con márgenes parejos.
5. La leyenda filtra por plataforma: `state.on` apaga los demás, la rotación y el clic solo usan los visibles.
6. Márgenes laterales iguales al texto de la sección: `clamp(20px, 4vw, 56px)` (los `padl/padr` del iframe
   son el máximo).

## Encaje en Presencia (`mapa-presencia.html`, modo relieve)
```js
fit:(W,H,narrow)=>{
  const pad=Math.max(24,Math.min(64,W*.05));
  // texto de la sección en la página padre (mismo origen): techo del mapa y, en ancho, su borde izquierdo
  const fr=frameElement.getBoundingClientRect(), txt=frameElement.parentElement.querySelector('h2').parentElement.getBoundingClientRect();
  const tb=txt.bottom-fr.top, tr=txt.right-fr.left;
  const floor=(capVisible?cap.offsetTop:leg.offsetTop)-pad;           // piso: línea fija o leyenda
  return narrow?{left:pad,right:W-pad,top:tb+pad,bottom:floor}
               :{left:Math.max(W*.3,tr+pad*1.5),right:W-pad,top:Math.max(pad*2,H*.1),bottom:floor};
}
```
`fit` se recalcula al cambiar el tamaño y cada ~90 cuadros (por si el texto de la página se reacomoda).
La escala del encaje también escala el tamaño de los puntos (`√k`) para que no se vean ralos.

## Clic en marcadores (Presencia)
```js
const hit=e=>{ if((innerWidth<720&&!desk)||!rel) return -1;
  const r=cv.getBoundingClientRect(), i=rel.pick(e.clientX-r.left, e.clientY-r.top);
  return visIdx().includes(i)?i:-1; };                 // solo los de la plataforma filtrada
cv.addEventListener('click',e=>{ const i=hit(e); if(i<0) return; cur=i; showCap(); holdUntil=Date.now()+7000; });
cv.addEventListener('mousemove',e=>{ cv.style.cursor = hit(e)>=0 ? 'pointer' : ''; });
// el intervalo de rotación hace `if (Date.now() < holdUntil) return;`
```

## Al editar `sitio-relieve.js`
- **Correr siempre** `node <esta skill>/scripts/smoke-test.js prototipo/sitio-relieve.js [NombreGlobal]` (si se renombró
  el archivo, pasar su global, p. ej. `BimboRelieve`).
  Un error dentro de `requestAnimationFrame` no impide que el script cargue: solo deja el canvas en blanco,
  en **todas** las páginas a la vez. Ya pasó: un comentario `// …` añadido al final de una línea se tragó
  `const t0 = performance.now();` y desaparecieron el hero y Presencia.
- Al reemplazar una línea con varias sentencias, comprobar que no quede código después de un `//`.
- Subir la versión en los dos lugares que cargan el archivo (`<script src="./sitio-relieve.js?v=N">` en
  la página y `s.src='sitio-relieve.js?v=N'` en `mapa-presencia.html`) y la del iframe (`relieve=1&v=N`):
  el servidor local deja que el navegador cachee y se ven versiones viejas.
- Cambios de comportamiento nuevos van como **opción** (`labelMinW`, `frame`, `fit`, `pick`…), con valor
  por defecto que no altere a quienes ya lo usan.

## Cómo verificar
- Ver también `verificar-en-navegador`.
- **El panel del navegador debe estar visible** (`mcp__ccd_view__show_pane` → `preview`): oculto,
  `document.visibilityState === 'hidden'`, `requestAnimationFrame` no corre y el canvas sale vacío.
- Las capturas con el viewport emulado (tablet/escritorio) a veces salen mal escaladas o con un cuadro
  viejo: medir con JS en lugar de confiar en la imagen.
  - **¿Dibuja?** contar píxeles con alfa en `canvas.getContext('2d').getImageData(...)`.
  - **¿Encaja?** exponer temporalmente el resultado de `fit` (rectángulo y caja medida) y revisar márgenes.
  - **¿Clic?** recorrer el canvas con `mousemove` sintéticos hasta que `cursor === 'pointer'`, mandar `click`
    y leer `.cap b` (el nombre activo) al instante, a los 4 s (sigue igual) y a los 10 s (ya rotó).
  - **Teléfono**: el mismo barrido no debe encontrar ningún punto con `pointer`; `.cap` debe verse.
- Tamaños: teléfono 375×812 y ~550 px, tablet 820×1180 y 1180×820, MacBook 1440×900, panorámica 2560×1080.
- Para entrar al iframe desde la página: `iframe.contentDocument` / `contentWindow` (mismo origen).
