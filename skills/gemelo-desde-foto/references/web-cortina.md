# Sección web "Del plano a la obra" — variante 3 etapas (plano → modelo → obra) y variante 2 etapas (plano → obra)

Implementación probada: sección `#plano-obra` de `prototipo/Activos.dc.html` (rama `fusion/sitio`; antes en `prototipo/Grupo PRODI Home v3.dc.html`, rama `marlon`) (framework dc:
estilos en `<helmet>`, lógica en `class Component`). Abajo, la misma lógica en HTML/CSS/JS sin framework,
para llevarla a otro sitio. Sustituir `W×H` por la proporción de la foto (Tepic: 1024×368).

## Comportamiento
- Sección de `440vh` con contenedor `sticky` de `100vh`; el progreso `p ∈ [0,1]` sale del scroll.
- `p .16→.40`: **barrido** plano → modelo (`clip-path: inset`) con línea de escaneo de 1 px.
- `p .54→.84`: **persiana escalonada** modelo → obra, 14 costillas de izquierda a derecha, **sin contorno**.
  El cielo extendido y la foto comparten una sola persiana (si no, se ve una doble escalera).
- `--zoom` 1.06 → 1 durante todo el recorrido (acercamiento sutil). Barra de progreso + 3 etapas clicables.
- Sin etiquetas ni textos sobre la imagen: título de sección y Plano · Modelo · Obra, nada más.
- Responsivo:
  - teléfono, iPad, laptops y monitores 16:9/16:10 → imagen **a sangre**; en vertical la banda mide hasta
    160 % del ancho y se recorre con el scroll (`--pan`);
  - solo panorámicos (`min-width:1100px and min-aspect-ratio:21/10`) → recuadro redondo, tope 1240 px.
- Horizontal: la caja se centra en el hueco real entre el título y la barra de etapas (medido en JS, no `top:%`).
- Vertical (`max-aspect-ratio:1/1`): título → imagen → etapas en un bloque compacto centrado (sin huecos).
- La línea de escaneo se desvanece en sus extremos (máscara suave), nunca se corta en el borde.

## HTML
```html
<section id="plano-obra" class="p2o">
  <div class="p2o-stick">
    <div class="p2o-band"><div class="p2o-zoom">
      <img class="p2o-l" src="plano.jpg"  alt="Plano del edificio en líneas">
      <img class="p2o-l" src="modelo.jpg" alt="Modelo 3D del edificio" style="clip-path:inset(0 calc(100% - var(--wipeX)) 0 0)">
      <img class="p2o-l p2o-obra" src="obra-hd.jpg" alt="Edificio terminado" style="clip-path:var(--comb)">
      <div class="p2o-scan" aria-hidden="true"></div>
    </div></div>
    <div class="p2o-sky" aria-hidden="true"></div>
    <div class="p2o-veil" aria-hidden="true"></div>
    <header class="p2o-col p2o-head"><p class="p2o-kicker">Del plano a la obra</p><h2>Primero existe en el modelo.</h2></header>
    <nav class="p2o-col p2o-foot">
      <div class="p2o-track"><div class="p2o-bar"></div></div>
      <div class="p2o-stages"><button data-i="0">01 · Plano</button><button data-i="1">02 · Modelo</button><button data-i="2">03 · Obra</button></div>
    </nav>
  </div>
</section>
```

## CSS
```css
.p2o{--W:1024;--H:368;position:relative;height:440vh;background:#171726;color:#F4F5F5;--wipeX:0%;--zoom:1.06;--pan:0px}
.p2o-stick{position:sticky;top:0;height:100vh;min-height:560px;overflow:hidden}
.p2o-band{position:absolute;left:50%;top:var(--bandTop,55%);aspect-ratio:var(--W)/var(--H);
  width:max(100%,min(calc(min(46vh,var(--bandMaxH,46vh)) * var(--W) / var(--H)),160%));
  transform:translate(calc(-50% + var(--pan)),-50%);overflow:hidden}
.p2o-zoom{position:absolute;inset:0;transform:scale(var(--zoom));transform-origin:50% 60%}
.p2o-l{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}
.p2o-scan{position:absolute;top:0;bottom:0;left:var(--wipeX);width:1px;background:#C9CEFF;box-shadow:0 0 18px 2px rgba(154,166,255,.55);opacity:var(--wipe,0)}
.p2o-sky{position:absolute;left:50%;top:var(--skyTop,0);height:var(--skyH,0);width:var(--bandW,100%);
  transform:translateX(calc(-50% + var(--pan)));background:url(cielo.png) 0 0/100% 100% no-repeat;
  clip-path:var(--combSky,polygon(0 0,0 0,0 0));pointer-events:none}
.p2o-veil{position:absolute;inset:0;pointer-events:none}
.p2o-col{position:absolute;left:0;right:0;max-width:var(--p2oCol,1440px);margin:0 auto;padding:0 clamp(20px,4vw,56px);box-sizing:border-box}
.p2o-head{top:0;padding-top:clamp(104px,13vh,140px)}
.p2o-foot{bottom:0;padding-bottom:clamp(28px,4vh,44px)}
.p2o-track{position:relative;height:1px;background:rgba(255,255,255,.16);margin-bottom:18px}
.p2o-bar{position:absolute;left:0;top:0;height:1px;width:var(--bar,0%);background:#9AA6FF}
.p2o-stages{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(12px,3vw,48px)}
.p2o-stages button{all:unset;cursor:pointer;font:500 11px/1 'Geist Mono',monospace;letter-spacing:.16em;text-transform:uppercase;color:#9AA6FF;opacity:.38;transition:opacity .4s}
.p2o-stages button.on{opacity:1}
@media (max-aspect-ratio:1/1){.p2o-head{top:var(--headTop,0px);padding-top:0}.p2o-foot{top:var(--footTop,auto);bottom:auto;padding-bottom:0}}
@media (min-width:1100px) and (min-aspect-ratio:21/10){
  .p2o{--p2oCol:calc(1240px + 2 * clamp(20px,4vw,56px))}
  .p2o-band{width:min(calc(100% - 2 * clamp(20px,4vw,56px)),1240px,calc(var(--bandMaxH,60vh) * var(--W) / var(--H)));
    border-radius:18px;box-shadow:0 0 0 1px rgba(154,166,255,.18),0 40px 120px -20px rgba(0,0,0,.55)}
  .p2o-l{-webkit-mask-image:none!important;mask-image:none!important}
  .p2o-sky{display:none}
}
```

## JS
```js
(() => {
  const root = document.getElementById('plano-obra'); if (!root) return;
  const $ = s => root.querySelector(s), S = root.style, K = 14;
  const band = $('.p2o-band'), stick = $('.p2o-stick'), sky = $('.p2o-sky'), head = $('h2'), foot = $('.p2o-stages');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cl = v => Math.max(0, Math.min(1, v));
  const ease = t => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const sine = t => (1 - Math.cos(Math.PI * t)) / 2;
  // Fundidos con curva suave (12 paradas), nunca un linear-gradient de 2 paradas
  const ramp = (a, b, rev, col = '0,0,0', amax = 1) => Array.from({ length: 13 }, (_, i) => {
    const t = i / 12, al = (rev ? 1 - sine(t) : sine(t)) * amax; return `rgba(${col},${al.toFixed(3)}) ${(a + (b - a) * t).toFixed(1)}%`; });
  const mask = (el, stops) => { el.style.webkitMaskImage = el.style.maskImage = `linear-gradient(180deg,${stops.join(',')})`; };
  root.querySelectorAll('.p2o-l').forEach(el => mask(el, el.classList.contains('p2o-obra')
    ? ['#000 0%', ...ramp(78, 100, true)]               // la foto solo se funde abajo (arriba sigue el cielo extendido)
    : [...ramp(0, 24), ...ramp(78, 100, true)]));       // plano y modelo, arriba y abajo
  mask(sky, ramp(0, 100));
  mask($('.p2o-scan'), [...ramp(0, 30), ...ramp(70, 100, true)]);   // la luz del barrido se desvanece, no se corta
  $('.p2o-veil').style.background =
    `linear-gradient(180deg,${ramp(0, 30, true, '23,23,38', .9).join(',')}),linear-gradient(0deg,${ramp(0, 24, true, '23,23,38', .92).join(',')})`;

  function update() {
    const r = root.getBoundingClientRect(), vh = innerHeight;
    if (r.bottom < -vh || r.top > 2 * vh) return;
    const p = cl(-r.top / Math.max(1, r.height - vh));
    const t1 = ease(cl((p - .16) / .24));
    S.setProperty('--wipeX', (t1 * 100).toFixed(2) + '%'); S.setProperty('--wipe', t1 > 0 && t1 < 1 ? 1 : 0);
    const t2 = cl((p - .54) / .3), hs = Array.from({ length: K }, (_, i) => ease(cl(t2 * 1.7 - (i / (K - 1)) * .7)));
    S.setProperty('--zoom', reduce ? 1 : (1.06 - .06 * ease(cl(p / .9))).toFixed(4));
    S.setProperty('--bar', (p * 100).toFixed(2) + '%');
    const o = stick.getBoundingClientRect().top;
    if (matchMedia('(max-aspect-ratio: 1/1)').matches) {
      // vertical: bloque compacto título → imagen → etapas, centrado bajo la barra de navegación
      const hH = $('.p2o-head').offsetHeight, fH = $('.p2o-foot').offsetHeight, bh0 = band.offsetHeight, g1 = 44, g2 = 36;
      const y0 = Math.max(96, (stick.clientHeight - (hH + g1 + bh0 + g2 + fH)) / 2 + 24);
      S.setProperty('--headTop', y0 + 'px'); S.setProperty('--bandTop', (y0 + hH + g1 + bh0 / 2) + 'px'); S.setProperty('--footTop', (y0 + hH + g1 + bh0 + g2) + 'px');
    } else {
      // horizontal: centrar la imagen en el hueco real entre título y etapas
      const top = head.getBoundingClientRect().bottom - o + 32, bot = foot.getBoundingClientRect().top - o - 48;
      S.setProperty('--bandTop', ((top + bot) / 2).toFixed(0) + 'px'); S.setProperty('--bandMaxH', Math.max(160, bot - top).toFixed(0) + 'px');
    }
    // cielo extendido encima de la banda + persiana compartida (cielo y foto = una sola imagen)
    const bw = band.offsetWidth, bh = band.offsetHeight, sh = Math.round(bh * .55), btop = band.getBoundingClientRect().top - o;
    S.setProperty('--bandW', bw + 'px'); S.setProperty('--skyH', sh + 'px'); S.setProperty('--skyTop', (btop - sh + 1).toFixed(0) + 'px');
    const s0 = getComputedStyle(sky).display !== 'none' ? sh : 0, tot = s0 + bh;
    const comb = f => { let q = '0% 0%'; hs.forEach((h, i) => { const v = Math.max(0, Math.min(100, f(h * tot))).toFixed(2);
      q += `,${(i / K) * 100}% ${v}%,${((i + 1) / K) * 100}% ${v}%`; }); return `polygon(${q},100% 0%)`; };
    S.setProperty('--combSky', comb(y => (s0 ? y / s0 * 100 : 0))); S.setProperty('--comb', comb(y => (y - s0) / bh * 100));
    // banda más ancha que la pantalla: se recorre siguiendo al barrido
    const ov = Math.max(0, bw - root.clientWidth); S.setProperty('--pan', (ov * (.5 - cl((p - .04) / .9))).toFixed(1) + 'px');
    const st = p < .36 ? 0 : p < .68 ? 1 : 2;
    foot.querySelectorAll('button').forEach((b, i) => b.classList.toggle('on', i === st));
  }
  let raf = 0; const onScroll = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; update(); }); };
  addEventListener('scroll', onScroll, { passive: true }); addEventListener('resize', onScroll); update();
  foot.addEventListener('click', e => { const i = +e.target.dataset.i; if (isNaN(i)) return;
    const t = root.getBoundingClientRect().top + scrollY, span = root.offsetHeight - innerHeight;
    scrollTo({ top: t + [.08, .48, .94][i] * span, behavior: reduce ? 'auto' : 'smooth' }); });
})();
```

## Prueba obligatoria
Teléfono 375×812, iPad 820×1180 y 1180×820, MacBook 13" 1440×900, 1920×1080, panorámica 2560×1080,
ultrawide 3440×1440. En cada uno, a `p ≈ .10`, `.70` y `.97`: sin scroll horizontal, la imagen no invade
título ni etapas, una sola escalera, el cielo se funde sin corte, la persiana registra con el modelo.
Las capturas del navegador integrado a veces muestran el frame anterior tras un scroll programático:
leer el estado con JS (`--bar`, opacidad de etapas) o tomar la captura dos veces.

## Variante 2 etapas: plano → obra (sin volumétrico)
Implementación probada: `blender/nauka-villa-nayarit/05-web/plano-obra.html` (publicada como Artifact para
prueba). Parte de la versión de 3 etapas y cambia solo esto:

- **Sin capa de modelo** y **sin persiana**: un solo barrido con la línea de escaneo convierte el plano en la
  foto. El barrido también descubre la capa azul de respaldo y el cielo extendido, con el mismo `inset`, así
  cielo y foto entran juntos sin escalón.
- Sección de `340vh` (no 440): con una sola transición, 440 se siente lento.
- Etapas: `01 · Plano` y `02 · Obra` en una rejilla de 2 columnas.

### HTML (capas dentro de `.p2o-zoom`)
```html
<img class="p2o-l" src="plano.jpg" alt="Plano del edificio en líneas">
<div class="p2o-back" aria-hidden="true" style="clip-path:inset(0 calc(100% - var(--wipeX)) 0 0)"></div>
<div class="p2o-sky"  aria-hidden="true" style="clip-path:inset(0 calc(100% - var(--wipeX)) 0 0)"></div>
<img class="p2o-l p2o-obra" src="obra-hd.jpg" alt="Edificio terminado" style="clip-path:inset(0 calc(100% - var(--wipeX)) 0 0)">
<div class="p2o-scan" aria-hidden="true"></div>
```
`.p2o-back` es un `div` azul `#171726` a toda la caja: tapa el plano donde ya entró la foto (si no, el plano se
ve a través del fundido inferior de la foto). En esta variante el cielo va **dentro** de `.p2o-zoom`
(`bottom: calc(100% - 1px)`, `aspect-ratio` de la tira) y `.p2o-band` sin `overflow:hidden` (solo en
panorámicos, donde el cielo se oculta), así el zoom escala cielo y foto juntos y no se abre una costura.

### CSS (diferencias)
```css
.p2o{height:340vh}
.p2o-stages{grid-template-columns:repeat(2,1fr)}
.p2o-back{position:absolute;inset:0;background:#171726}
```

### JS (diferencias con la versión de 3 etapas)
```js
// un solo barrido: el plano se convierte en la foto (con su cielo) detrás de la línea de escaneo
const t1 = ease(cl((p - .18) / .52));
S.setProperty('--wipeX', (t1 * 100).toFixed(2) + '%'); S.setProperty('--wipe', t1 > 0 && t1 < 1 ? 1 : 0);
// … sin hs / comb / --combSky …
const st = p < .44 ? 0 : 1;                               // etapa activa
scrollTo({ top: t + [.08, .94][i] * span, ... });         // clic en etapa
```
Máscaras: la foto y `.p2o-back` solo se funden abajo (`['#000 0%', ...ramp(80,100,true)]`); el plano arriba y
abajo. La prueba en los 7 tamaños es la misma que para la versión de 3 etapas.
