"""Construye la sección Origen (texto + lámina) en dos sabores a partir de una sola plantilla:
   - "pkg": clases .origen__* (paquete para el colaborador y vista previa)
   - "dc":  atributos data-o="…" (Home v3; el framework dc no garantiza `class`)
Escritorio (> 960 px): texto a la izquierda, lámina a la derecha, sin scroll horizontal.
Tableta (601–960 px): apilado, lámina completa.
Teléfono (≤ 600 px): una sola pantalla (100svh): texto arriba, lámina abajo recortada al alzado + planta
y escalada para caber en el alto restante (container query)."""
import re, sys

SVG_FULL_W, SVG_X0 = 938, 262           # viewBox "262 0 938 452"
PHONE_X0 = 462                          # en teléfono: solo alzado + planta (x 462–1200)
PH_W = 1200 - PHONE_X0                  # 738
H = 452

def tpl():
    return '''<section {ROOT}>
  <div {C:inner}>
    <div {C:copy}>
      <p {C:kicker}>Origen · 1944</p>
      <h2 {C:title}>Empezamos resolviendo lo que nadie había resuelto.</h2>
      <p {C:p}>En 1944, Don José Miguel Nader fundó una naviera para llevar plátano de Tabasco y piña de Veracruz a Brownsville, Texas. Para que la fruta llegara fresca, empacó en el campo y cruzó el Golfo en barco refrigerado.</p>
      <p {C:p} {C2:strong}>Ochenta años después trabajamos igual: vemos el problema completo y construimos lo que falta.</p>
      <dl {C:facts}>
        <div><dt>Origen</dt><dd>Tabasco y Veracruz</dd></div>
        <div><dt>Destino</dt><dd>Brownsville, Texas</dd></div>
        <div><dt>Carga</dt><dd>Plátano y piña</dd></div>
        <div><dt>Método</dt><dd>Empaque en campo · bodega refrigerada</dd></div>
      </dl>
      <a {C:link} href="{LINK}">Conoce nuestra historia →</a>
    </div>
    <figure {C:plano}>
      <div {C:frame}><div {C:crop}>{SVG}</div></div>
      <figcaption {C:cap}>
        <span><svg width="22" height="6" aria-hidden="true"><path d="M0 3H22" stroke="#9AA6FF" stroke-dasharray="4 3" opacity=".7"/></svg>Bodegas refrigeradas</span>
        <span><svg width="22" height="6" aria-hidden="true"><path d="M0 3H22" stroke="#9AA6FF" stroke-dasharray="7 3 1.5 3" opacity=".5"/></svg>Cámara de máquinas</span>
        <span {C:note}>Esquema ilustrativo</span>
      </figcaption>
    </figure>
  </div>
</section>'''

CSS = '''{S:root} {
  background: #171726; color: #F4F5F5; border-top: 1px solid rgba(255,255,255,.08);
  padding-block: clamp(80px, 9vw, 128px);
  padding-left: max(clamp(20px, 4vw, 56px), env(safe-area-inset-left, 0px));
  padding-right: max(clamp(20px, 4vw, 56px), env(safe-area-inset-right, 0px));
  font-family: Geist, system-ui, sans-serif; box-sizing: border-box;
}
{S:inner} {
  max-width: 1440px; margin: 0 auto; display: grid; align-items: center;
  grid-template-columns: minmax(300px, .8fr) minmax(0, 1.65fr); gap: clamp(32px, 4.5vw, 72px);
}
{S:copy} { display: flex; flex-direction: column; gap: 18px; min-width: 0; }
{S:kicker} { margin: 0 0 6px; font: 500 12px/1 'Geist Mono', ui-monospace, monospace; letter-spacing: .16em; text-transform: uppercase; color: #838889; }
{S:title} { margin: 0 0 6px; font: 400 clamp(32px, 3vw, 48px)/1.04 Geist, system-ui, sans-serif; letter-spacing: -.045em; text-wrap: balance; }
{S:p} { margin: 0; font: 400 16px/1.6 Geist, system-ui, sans-serif; color: #CDD1D3; text-wrap: pretty; max-width: 520px; }
{S:strong} { color: #F4F5F5; }
{S:facts} { margin: 6px 0 0; padding-top: 18px; border-top: 1px solid rgba(154,166,255,.18); display: grid; grid-template-columns: 1fr 1fr; gap: 14px 24px; max-width: 520px; }
{S:facts} dt { font: 500 10px/1.4 'Geist Mono', ui-monospace, monospace; letter-spacing: .14em; text-transform: uppercase; color: #838889; }
{S:facts} dd { margin: 4px 0 0; font: 500 11.5px/1.45 'Geist Mono', ui-monospace, monospace; letter-spacing: .1em; text-transform: uppercase; color: #9AA6FF; }
{S:link} { align-self: flex-start; display: inline-flex; align-items: center; gap: 10px; margin-top: 4px; color: #F4F5F5; text-decoration: none;
  font: 500 15px/1 Geist, system-ui, sans-serif; border-bottom: 1px solid rgba(255,255,255,.3); padding-bottom: 6px; transition: gap .3s, border-color .3s; }
{S:link}:hover { gap: 16px; border-color: #F4F5F5; }
{S:link}:focus-visible { outline: 1px solid #9AA6FF; outline-offset: 4px; }
{S:plano} { margin: 0; min-width: 0; display: flex; flex-direction: column; gap: 12px; }
{S:frame} { border: 1px solid rgba(154,166,255,.18); border-radius: 4px; padding: clamp(10px, 1.4vw, 20px) clamp(8px, 1vw, 16px); }
{S:crop} svg { display: block; width: 100%; height: auto; }
{S:cap} { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 22px; font: 500 10px/1 'Geist Mono', ui-monospace, monospace; letter-spacing: .14em; text-transform: uppercase; color: #838889; }
{S:cap} span { display: inline-flex; align-items: center; gap: 8px; }
{S:note} { margin-left: auto; }

/* Tableta: apilado, lámina completa */
@media (max-width: 960px) {
  {S:inner} { grid-template-columns: minmax(0, 1fr); gap: 36px; }
}

/* Teléfono: toda la sección en una pantalla; la lámina ocupa el alto que queda y se recorta a alzado + planta */
@media (max-width: 600px) {
  {S:root} { min-height: 100svh; display: flex; padding-block: 92px 20px; }
  {S:inner} { flex: 1; min-height: 0; display: flex; flex-direction: column; gap: 16px; }
  {S:copy} { gap: 10px; }
  {S:kicker} { margin: 0; font-size: 11px; }
  {S:title} { margin: 0; font-size: clamp(26px, 7.4vw, 30px); }
  {S:p} { font-size: 14.5px; line-height: 1.45; }
  {S:facts} { margin: 2px 0 0; padding-top: 12px; gap: 10px 16px; }
  {S:facts} dt { font-size: 9px; }
  {S:facts} dd { margin-top: 2px; font-size: 10px; }
  {S:link} { font-size: 14px; margin-top: 2px; }
  {S:plano} { flex: 1; min-height: 0; gap: 8px; }
  {S:frame} { flex: 1; min-height: 120px; border: 0; padding: 0; container-type: size; display: grid; place-items: center; }
  {S:crop} { width: min(100cqw, calc(100cqh * PHW / PHH)); aspect-ratio: PHW / PHH; overflow: hidden;
    border: 1px solid rgba(154,166,255,.18); border-radius: 4px; box-sizing: border-box; }
  {S:crop} svg { width: PCTW%; max-width: none; margin-left: -PCTX%; }
  {S:cap} { gap: 6px 14px; font-size: 8.5px; }
  {S:note} { margin-left: 0; }
}
/* Teléfonos de pantalla corta (iPhone SE, Android compactos): texto más compacto para dejar alto a la lámina */
@media (max-width: 600px) and (max-height: 740px) {
  {S:root} { padding-block: 84px 14px; }
  {S:inner} { gap: 12px; }
  {S:copy} { gap: 8px; }
  {S:title} { font-size: 24px; }
  {S:p} { font-size: 13.5px; line-height: 1.4; }
  {S:facts} { padding-top: 10px; gap: 8px 14px; }
  {S:link} { font-size: 13px; }
}
'''

def render(kind, svg, link):
    def C(name):
        return f'class="origen__{name}"' if kind == "pkg" else f'data-o="{name}"'
    def C2(name):     # segundo modificador en el mismo elemento
        return f'data-o2="{name}"'
    def S(name):
        if name == "root": return ".origen" if kind == "pkg" else '[data-o="root"]'
        if name == "strong": return '[data-o2="strong"]'
        return f".origen__{name}" if kind == "pkg" else f'[data-o="{name}"]'
    html = tpl()
    root = 'class="origen" id="origen"' if kind == "pkg" else 'data-screen-label="02 Origen" ref="{{ originRef }}" data-o="root"'
    html = html.replace("{ROOT}", root).replace("{LINK}", link).replace("{SVG}", svg)
    html = re.sub(r"\{C:(\w+)\}", lambda m: C(m.group(1)), html)
    html = re.sub(r"\{C2:(\w+)\}", lambda m: C2(m.group(1)), html)
    css = re.sub(r"\{S:(\w+)\}", lambda m: S(m.group(1)), CSS)
    w_pct = SVG_FULL_W / PH_W * 100; x_pct = (PHONE_X0 - SVG_X0) / PH_W * 100
    css = css.replace("PHW", str(PH_W)).replace("PHH", str(H)).replace("PCTW", f"{w_pct:.3f}").replace("PCTX", f"{x_pct:.3f}")
    return html, css

if __name__ == "__main__":
    svg = open(sys.argv[1]).read().replace('href="assets/proyectos/', 'href="ASSETS/')
    kind = sys.argv[2]; out = sys.argv[3]; assets = sys.argv[4]; link = sys.argv[5]
    html, css = render(kind, svg.replace("ASSETS/", assets), link)
    open(out + ".html", "w").write(html); open(out + ".css", "w").write(css)
