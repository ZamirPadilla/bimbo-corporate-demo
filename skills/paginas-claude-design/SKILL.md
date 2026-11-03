---
name: paginas-claude-design
description: >-
  Cómo leer, escribir y modificar páginas ".dc.html" de Claude Design (formato x-dc con helmet, plantillas {{ }}, sc-for, sc-if, dc-import y class Component extends DCLogic), exportarlas, servirlas en local, llevar secciones de una página a otra y hacerlas responsivas. Incluye patrones de interacción probados (secciones ligadas al scroll, temporizadores que se pausan con hover, carruseles con video perezoso, reveal). Úsala siempre que haya que editar o crear una página .dc.html, mover una sección entre páginas, agregar una página nueva a la Nav/Footer, arreglar algo que solo falla en teléfono, o depurar una animación o un hover en un sitio hecho con Claude Design (el sitio de referencia, Bimbo u otro prospecto).
---

# Páginas de Claude Design (.dc.html)

Claude Design guarda cada página como un HTML que se abre solo en el navegador: el runtime (`support.js`)
monta React, lee la plantilla dentro de `<x-dc>` y la lógica de `<script type="text/x-dc" data-dc-script>`.
El mismo archivo se edita en Claude Design o a mano; por eso hay que respetar el formato al pie de la letra.

## Anatomía
```html
<!DOCTYPE html><html lang="es"><head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- metadatos para compartir (estáticos, fuera de x-dc: WhatsApp no corre JS) -->
  <script src="./support.js"></script>
</head><body>
<x-dc>
  <helmet>  <!-- lo que va al <head>: fuentes, <style>, scripts propios (sitio-*.js), CSS de teléfono -->  </helmet>
  <dc-import name="Nav" theme="dark" active="act" bar="{{ true }}" hint-size="100%,96px" style="…"></dc-import>
  <section data-screen-label="01 Hero" ref="{{ heroRef }}"> … {{ titulo }} … </section>
  <sc-for list="{{ items }}" as="it" hint-placeholder-count="5"> <a href="{{ it.href }}">{{ it.t }}</a> </sc-for>
  <sc-if value="{{ it.foto }}" hint-placeholder-val="{{ false }}"> … </sc-if>
  <dc-import name="Footer" hint-size="100%,900px"></dc-import>
</x-dc>
<script type="text/x-dc" data-dc-script>
class Component extends DCLogic {
  state = { p: 0 };
  heroRef = React.createRef();
  componentDidMount() { /* listeners, timers, librerías */ }
  componentWillUnmount() { /* quitar todo lo que se puso */ }
  renderVals() { return { titulo: 'Hola', items: [...], heroRef: this.heroRef }; }
}
</script></body></html>
```
- **Todo lo que la plantilla usa sale de `renderVals()`**: valores, listas, refs y funciones (`onClick="{{ go }}"`).
  Se recalcula en cada render; ahí se derivan estilos (`opacity:{{ s.op }}`) del estado.
- `data-screen-label="NN Nombre"` nombra la sección: lo usan Claude Design, el índice de fusión y el CSS de
  teléfono. Una sección por rótulo y con número (en el CSS de `<helmet>` el rótulo se repite como selector; eso
  está bien). Usar un prefijo distinto por página (en el sitio de referencia Energía y Destinos comparten `E` y confunde).
- `hint-placeholder-count` / `hint-placeholder-val` / `hint-size` solo sirven al editor; poner valores realistas.
- Componentes compartidos (`Nav`, `Footer`) son otros `.dc.html` con sus props. Una página nueva
  se agrega en la lista de enlaces de la Nav y del Footer.
- Librerías propias (`sitio-relieve.js`, `sitio-planos.js`) se cargan en `<helmet>` y se esperan con
  `lib(name, cb) { const t = () => (window[name] ? cb(window[name]) : (this._lt = setTimeout(t, 40))); t(); }`.

## Trampas del runtime (todas pasaron)
- **Los estilos se serializan como `prop: value` con espacio y `0px`** (`grid-template-columns: 56px minmax(0px, 1fr)`).
  El CSS de teléfono (`sitio-mobile.css`) apunta a esos estilos con selectores `[style*="…"]`; escribir el
  selector con la forma serializada, no con la del código fuente.
- El texto interpolado se envuelve en `<span>`; dentro de `<text>` de SVG no se dibuja. Las etiquetas sobre un
  SVG van como capa HTML posicionada en % encima.
- `{{ }}` sin resolver aparece en `src`/`data-src` en el primer render: no asignar `src` a mano si contiene `{{`.
- Las imágenes que una sección usa por dentro (`<image href>` en SVG, `url()` en CSS, nombres armados en JS)
  no salen en una búsqueda simple de `src=`. Al mover secciones, barrer `assets/...` en html, js y css.
- `<image-slot>` (marcador de imagen del editor) nunca detrás de un video de hero: su texto "arrastra un
  archivo" se ve mientras carga. Usar `<div>` con color + póster JPEG.
- Hover que cambia el alto de una fila mueve las demás y dispara `mouseenter` en otra fila sin que el mouse se
  mueva → la selección brinca sola. Ver `references/patrones-interaccion.md`.
- Un temporizador que avanza etapas debe pausarse mientras el usuario interactúa (mismo archivo).

## Exportar de Claude Design
- Proyecto completo con media: **Share → Project HTML → Project archive** (zip). Guardarlo en
  `~/Downloads` y extraerlo con Python (`zipfile`): `unzip` de macOS rompe nombres con acentos.
- Una sola página sin media: botón de descarga de la página (archivos `ddremote__<Página>.dc.html`).
- Confirmar con el autor que es la versión más reciente antes de fusionar (comparar fecha y contenido).

## Servir en local
`python3 -m http.server 8790 --bind 127.0.0.1 --directory prototipo` (o la configuración de
`.claude/launch.json`). Abrir `http://127.0.0.1:8790/<Página>.dc.html`. Los scripts propios se cachean: subir
`?v=N` en su `<script src>` al editarlos.

## Llevar una sección de una página a otra
1. Copiar el bloque `<section data-screen-label=…>` completo, su CSS de `<helmet>` (incluidas reglas de
   teléfono con el `data-screen-label` o `#id`), su estado, refs, métodos y lo que devuelve `renderVals()`.
2. Conectar sus ganchos al ciclo de la página destino (p. ej. su función de scroll dentro del `onScroll` /
   `measure()` existente, no un segundo listener que compita).
3. Copiar sus assets (barrido de `assets/`), conservar la Nav/Footer de la página destino.
4. Probar en escritorio y teléfono (`verificar-en-navegador`).

## Teléfono
- Overrides en `sitio-mobile.css` o en `<helmet>` con `@media (max-width:760px)` y `!important` (los estilos
  en línea ganan sin él). Selector por `[data-screen-label="…"]` o atributo `data-*` propio.
- Preferir ocultar lo que se encima a apretarlo. Revisar a 375 px y ~550 px.
- Distinguir dispositivo táctil de ventana angosta: `matchMedia('(hover:hover) and (pointer:fine)')` = hay
  mouse. No usar solo el ancho para decidir si hay hover o clic (un portátil con ventana angosta no es teléfono).

## Patrones listos
`references/patrones-interaccion.md`: progreso de scroll en secciones `sticky`, medición con rAF, temporizador
con pausa por hover, filas que responden a movimiento real, video perezoso en carruseles, tope de alto en
horizontal para franjas anchas, entrada (`sitio-reveal.js`) y cómo excluir una sección (`data-noreveal`).
