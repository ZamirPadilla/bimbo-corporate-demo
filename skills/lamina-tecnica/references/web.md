# Integración de la lámina en la página (framework dc de PRODI)

Implementación de referencia: sección `02 Origen` de `prototipo/Activos.dc.html` (rama `fusion/sitio`; antes en `prototipo/Grupo PRODI Home v3.dc.html`, rama `marlon`).

## Estructura
Generada por `scripts/ejemplo_seccion_origen.py` (plantilla única → clases `.origen__*` para compartir o
atributos `data-o="…"` para el framework dc, que no garantiza `class`):
```html
<section class="origen">
  <div class="origen__inner">                      <!-- grid de 2 columnas; flex en columna en teléfono -->
    <div class="origen__copy"> kicker · h2 · párrafos · <dl class="origen__facts"> datos · enlace </div>
    <figure class="origen__plano">
      <div class="origen__frame"><div class="origen__crop"><svg viewBox="262 0 938 452">…</svg></div></div>
      <figcaption class="origen__cap"> leyenda de trazos · Esquema ilustrativo </figcaption>
    </figure>
  </div>
</section>
```
- Sin animación de entrada; la lámina carga al instante.
- Las vistas van como `<image href="assets/…png" preserveAspectRatio="none">` dentro del SVG.

## Responsivo
- `> 960 px`: texto izquierda, lámina derecha (imagen fija, `width:100%`).
- `601–960 px`: apilado, lámina completa.
- `≤ 600 px`: sección = una pantalla. Recorte a alzado + planta con un contenedor de proporción fija:
```css
.origen__frame { flex:1; min-height:120px; container-type:size; display:grid; place-items:center; }
.origen__crop  { width:min(100cqw, calc(100cqh * 738 / 452)); aspect-ratio:738/452; overflow:hidden; }
.origen__crop svg { width:127.1%; max-width:none; margin-left:-27.1%; }   /* viewBox 262–1200 → 462–1200 */
```
- `≤ 600 px` y `≤ 740 px` de alto: texto más compacto.

## Revisión
- HTML temporal en `prototipo/_tmp_*.html` con la lámina a 2400 px de ancho para revisar detalle;
  borrarlo al terminar.
- Probar 375×812, 820×1180, 1440×900 y 1920×1080.
