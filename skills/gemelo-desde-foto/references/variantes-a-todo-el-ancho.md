# Plano → obra como sección completa entre secciones (variante "a todo el ancho")

Usada en PRODI en `Logistica y Movilidad.dc.html` (`#mexipuerto`, L3b), `Energia y Petroquimica.dc.html`
(`#ciclo`, E4b), `Destinos y Desarrollos.dc.html` (`#nauka`, E3b) y `Deporte y Entretenimiento.dc.html`
(`#estadio`, S3b). Es la variante de 2 etapas (plano → obra) de `web-cortina.md`, montada como una sección
propia de la página y no como ficha o tarjeta (el usuario lo pidió así: "ese plano debe de ser una sección
completa").

## Antes de montarla
1. Buscar el gemelo ya hecho: `blender/<proyecto>/05-web` (plano, obra, cielo) y `03-blueprint`. No rehacerlo.
2. **Enseñar al usuario la imagen del plano encontrada** y esperar confirmación.
3. Copiar las imágenes con nombre versionado y respaldarlas (`media-web-ligera`).

## Estructura (resumen del código de `#mexipuerto`)
- `<section id="…" data-screen-label="L3b …" ref="{{ p2oRef }}" style="height:340vh;background:<fondo de la página>;--wipe:0;--wipeX:0%;--zoom:1.06;--stage0:1;--stage1:.35;--bar:0%">`
- Hijo `sticky` 100 vh con: `[data-p2o-band]` > `[data-p2o-zoom]` > plano, `[data-p2o-back]` (respaldo del color
  del fondo que tapa el plano donde ya entró la foto), foto `[data-obra]` con `clip-path: inset(0 calc(100% - var(--wipeX)) 0 0)`,
  línea de escaneo `[data-p2o-scan]` en `left: var(--wipeX)`.
- Degradado de legibilidad arriba, encabezado (`[data-p2o-head]`: rótulo "Del plano a la obra · Lugar, año" +
  `h2`), pie (`[data-p2o-foot]`: barra `width: var(--bar)` y botones de etapa con `opacity: var(--stageN)`).
- JS: `setupP2O()` (cachea nodos), `updateP2O()` llamado desde el `onS`/`measure` de scroll **que ya tiene la
  página**, y `p2oGo(i)` para saltar a cada etapa. Avance: barrido `t1 = ease((p - .18) / .52)`, zoom
  1.06 → 1, etapa activa con `p ≥ .44`.
- Centrado real: en horizontal la banda se coloca en el hueco medido entre el `h2` y la barra (`--bandTop`,
  `--bandMaxH`); en vertical, bloque compacto título → imagen → etapas (`--headTop`, `--footTop`).
- Banda más ancha que la pantalla (teléfono): `--pan` la recorre de izquierda a derecha siguiendo el barrido.

## Proporción y alto
- Fotos recortadas a **5:2** (p. ej. 2500×1000) para que quepan a sangre; Nauka usó 2500×1100 con cielo propio.
- Regla de tope en horizontal (si no, en pantallas anchas la franja sube sobre el título):
  ```css
  @media (min-aspect-ratio:1/1) and (max-aspect-ratio:21/10), (min-aspect-ratio:1/1) and (max-width:1099px){
    #seccion [data-p2o-band]{aspect-ratio:auto;width:100%;height:min(var(--bandMaxH,46vh),calc(100vw * 2 / 5))}
  }
  ```
- Panorámicos (`min-width:1100px and min-aspect-ratio:21/10`): recuadro con radio 18 px, tope 1240 px.
- Sin cielo extendido: `#seccion [data-p2o-sky]{display:none}`. Con cielo: imagen `-cielo` y variables
  `--skyTop/--skyH/--bandW/--combSky` (ya calculadas en `updateP2O`).
- Separación con la sección siguiente: `padding-top: clamp(48px, 6vw, 96px)` en la que sigue (pedido dos veces).

## Color según la página
En una página de fondo negro (Deporte, `#0B0B0C`) el plano morado se veía ajeno: se recoloreó a líneas blancas
sobre negro (`media-web-ligera/scripts/recolorear.py`) y se pasaron a blanco la línea de escaneo, la barra y los
números de etapa. Regla: ningún morado suelto en una página que no lo usa.
