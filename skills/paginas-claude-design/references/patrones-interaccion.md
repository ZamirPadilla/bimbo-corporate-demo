# Patrones de interacción probados

Cada patrón viene de un bug real o de una corrección del usuario en el sitio de referencia.

## 1 · Progreso de scroll en una sección `sticky`
Sección alta (300–440 vh) con hijo `position:sticky; top:0; height:100vh`. El avance:
```js
prog(ref) {
  const el = ref.current; if (!el) return 0;
  const r = el.getBoundingClientRect(), span = r.height - innerHeight;
  return span <= 0 ? 0 : Math.min(1, Math.max(0, -r.top / span));
}
```
Un solo listener de scroll que agenda una medición por cuadro:
```js
this.onScroll = () => { if (!this.raf) this.raf = requestAnimationFrame(() => { this.raf = null; this.measure(); }); };
addEventListener('scroll', this.onScroll, { passive: true }); addEventListener('resize', this.onScroll);
```
Para animaciones finas (barridos, zoom) escribir variables CSS (`el.style.setProperty('--wipe', v)`) en vez de
`setState`, y que el CSS haga el resto: evita re-render en cada cuadro.

## 2 · Temporizador que avanza etapas + hover que manda
Problema que tuvo el usuario: el hover adelantaba la etapa pero el temporizador seguía corriendo y "se peleaba"
con él. Solución:
```js
cycMs = 3400;
cycTick() { clearInterval(this.cycT); this.cycT = setInterval(() => { if (!this.cycHold) this.setState(s => ({ step: (s.step + 1) % 5 })); }, this.cycMs); }
// al entrar la sección en pantalla: this.cycTick(); al salir: clearInterval, this.cycT = null, this.cycHold = false
// en renderVals:
const pick = i => { if (this.state.step !== i) this.setState({ step: i }); };
this.cycIn  = this.cycIn  || (() => { this.cycHold = true;  clearInterval(this.cycT); });
this.cycOut = this.cycOut || (() => { this.cycHold = false; if (this.cycT) this.cycTick(); }); // reinicia el conteo
```
- `onMouseEnter="{{ cycIn }}" onMouseLeave="{{ cycOut }}"` en el contenedor de toda la lámina, no en cada fila.
- Al salir, el conteo empieza de cero: no salta de golpe a la siguiente etapa.
- `prefers-reduced-motion`: no arrancar el temporizador.

## 3 · Filas que se expanden sin brincar
Si la fila activa muestra un texto extra, las demás se recorren y el navegador dispara `mouseenter` en otra
fila sin que el usuario mueva el mouse. Usar movimiento real:
```js
const move = i => e => {
  if (e && e.clientX === this.mx && e.clientY === this.my) return;   // mismo punto: fue el reacomodo
  this.mx = e && e.clientX; this.my = e && e.clientY; pick(i);
};
// <button onMouseMove="{{ s.move }}" onClick="{{ s.go }}">
```
Las piezas que no cambian de tamaño (placas de un SVG) pueden usar `onMouseEnter`. El clic sigue funcionando en
táctil.

## 4 · Video perezoso en carruseles
```html
<video data-vid="{{ p.on }}" data-src="{{ p.video }}" data-src-m="{{ p.videoMovil }}" muted loop playsinline preload="metadata"></video>
```
```js
tickVids() {
  const vh = innerHeight, movil = matchMedia('(max-width: 767px) and (max-aspect-ratio: 1/1)').matches;
  document.querySelectorAll('video[data-vid]').forEach(v => {
    const r = v.getBoundingClientRect(), near = r.bottom > -vh * .5 && r.top < vh * 1.5, on = near && v.dataset.vid === 'on';
    if (near && v.dataset.src && !v.dataset.src.includes('{{') && !v.getAttribute('src')) v.src = movil && v.dataset.srcM ? v.dataset.srcM : v.dataset.src;
    if (on && v.paused) { v.muted = true; v.play().catch(() => {}); } else if (!on && !v.paused) v.pause();
  });
}
```
Solo reproduce el proyecto activo y cerca de pantalla; nada se pide antes de tiempo ni da 404 con `{{ }}`.

## 5 · Franja ancha con tope de alto en horizontal
En pantallas anchas una imagen 5:2 a todo el ancho crece tanto que sube sobre el título. Limitar con la altura
libre medida en JS (`--bandMaxH`):
```css
@media (min-aspect-ratio:1/1) and (max-aspect-ratio:21/10), (min-aspect-ratio:1/1) and (max-width:1099px){
  #seccion [data-p2o-band]{aspect-ratio:auto;width:100%;height:min(var(--bandMaxH,46vh),calc(100vw * H / W))}
}
```
(`W×H` = proporción de la imagen.) Dejar separación (`padding-top: clamp(48px,6vw,96px)`) con la sección
siguiente; el usuario lo pidió dos veces.

## 6 · Entrada de elementos (`sitio-reveal.js`)
Anima `h1…p, img, video, a, button, [data-reveal]` al entrar en pantalla, salvo los que ya tienen movimiento
propio. Para que algo cargue de inmediato y sin animación (p. ej. el listado de activos, cuyo único efecto debe
ser el hover) poner `data-noreveal` en su contenedor y no usar `loading="lazy"` en esas imágenes.

## 7 · Elementos dentro de un iframe del mismo origen
El mapa de presencia vive en un iframe. Desde la página: `iframe.contentWindow` / `contentDocument`. Desde el
iframe: `frameElement.parentElement` para medir el texto de la sección y encajar el mapa. Subir `?v=N` en el
`src` del iframe al cambiar su HTML.
