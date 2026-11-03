#!/usr/bin/env python3
"""Metadatos para compartir del sitio de Grupo PRODI.

Lee un paginas.json (ver el ejemplo de PRODI junto a este script) y:
  1. Dibuja con Chrome headless un thumbnail de 1200×630 por página (plantilla.html)
     y lo guarda como JPEG en prototipo/assets/compartir/og-<slug>-v<version>.jpg.
  2. Arma favicon.svg, favicon.ico (16/32/48) y apple-touch-icon.png en prototipo/.
  3. Escribe en el <head> estático de cada .dc.html el bloque compartir:inicio … compartir:fin
     (title, description, canonical, iconos, Open Graph y Twitter) y pone <html lang="es">.

El bloque va en el HTML crudo y no dentro de <helmet>: WhatsApp, LinkedIn, Slack e iMessage
no corren JavaScript, así que solo ven lo que trae el archivo tal cual.

Uso: python3 generar.py <paginas.json> [--sin-imagenes | --iconos]
  --iconos: solo rehace los íconos y los <head> (sin thumbnails).

Claves del JSON además de "paginas": "sitio_dir" (carpeta del sitio, relativa al JSON), "logo" (SVG en el sitio),
"colores" {tinta, papel, niebla, acento}, "marca_plataforma" (rótulo de las láminas tipo plataforma), "mosaico"
(slugs para la lámina tipo mosaico) e "icono": {"trazo_logo": "M0.19"} (toma la primera letra del logo cuyo
path empieza así), o {"svg": "assets/icono.svg"} (SVG 64×64 propio), más "escala"/"mover" para encuadrar la letra.
Solo usa la biblioteca estándar, Chrome y `sips` (macOS).
"""
import html, json, os, re, shutil, struct, subprocess, sys, tempfile
from pathlib import Path
from urllib.parse import quote

AQUI = Path(__file__).resolve().parent
if len(sys.argv) < 2 or sys.argv[1].startswith('--'):
    sys.exit(__doc__)
CONFIG = Path(sys.argv[1]).resolve()
CFG = json.loads(CONFIG.read_text())
SITIO = (CONFIG.parent / CFG.get('sitio_dir', '.')).resolve()
COL = {'tinta': '#171726', 'papel': '#F4F5F5', 'niebla': '#ADB3B5', 'acento': '#9AA6FF', **CFG.get('colores', {})}
CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
INICIO, FIN = '<!-- compartir:inicio', '<!-- compartir:fin -->'
# Sube al cambiar los íconos: los navegadores guardan el favicon por mucho tiempo.
ICONOS_V = 2

# Plataformas del ecosistema para el mosaico (mismas fotos que sus thumbnails).
PLATAFORMAS = CFG.get('mosaico', [])


def logo_svg():
    s = (SITIO / CFG.get('logo', 'assets/logo.svg')).read_text()
    s = re.sub(r'<metadata>.*?</metadata>', '', s, flags=re.S)
    return re.sub(r'\s+xmlns:c2pa="[^"]*"', '', s)


def p_del_logo():
    """La primera letra del logotipo: el trazo cuyo d empieza con icono.trazo_logo (en PRODI, la «P»: 'M0.19')."""
    trazos = re.findall(r'<path d="([^"]+)"', logo_svg())
    pref = CFG.get('icono', {}).get('trazo_logo', 'M0.19')
    return next(d for d in trazos if d.startswith(pref))


def chrome(html_path, png_path, w, h, transparente=False):
    # Sin fondo transparente Chrome pinta de blanco lo que el SVG deja vacío (las esquinas redondeadas).
    fondo = ['--default-background-color=00000000'] if transparente else []
    subprocess.run([CHROME, '--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1', *fondo,
                    f'--window-size={w},{h}', '--virtual-time-budget=8000', '--allow-file-access-from-files',
                    f'--screenshot={png_path}', html_path.as_uri()],
                   check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)


def a_jpeg(png, jpg, calidad=82):
    subprocess.run(['sips', '-s', 'format', 'jpeg', '-s', 'formatOptions', str(calidad), str(png), '--out', str(jpg)],
                   check=True, stdout=subprocess.DEVNULL)


def redimensionar(png, salida, lado):
    subprocess.run(['sips', '-z', str(lado), str(lado), str(png), '--out', str(salida)], check=True, stdout=subprocess.DEVNULL)


def ico(pngs, salida):
    """ICO con entradas PNG (válido desde Windows Vista y en todos los navegadores)."""
    datos = [Path(p).read_bytes() for _, p in pngs]
    cab = struct.pack('<HHH', 0, 1, len(datos))
    off = 6 + 16 * len(datos)
    ent = b''
    for (lado, _), d in zip(pngs, datos):
        ent += struct.pack('<BBBBHHII', lado % 256, lado % 256, 0, 0, 1, 32, len(d), off)
        off += len(d)
    Path(salida).write_bytes(cab + ent + b''.join(datos))


def icono_svg(rx):
    ic = CFG.get('icono', {})
    if ic.get('svg'):                          # SVG propio de 64×64: se usa tal cual; la versión cuadrada quita el rx
        svg = (SITIO / ic['svg']).read_text()
        return svg if rx else re.sub(r'\srx="[^"]*"', '', svg, count=1)
    t = ic.get('escala', 0.684); dx, dy = ic.get('mover', [11.9, 2.8])  # en PRODI la P ocupa ~40 de 64 unidades
    return ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">'
            f'<rect width="64" height="64"{f' rx="{rx}"' if rx else ''} fill="{COL['tinta']}"/>'
            f'<path fill="{COL['papel']}" transform="translate({dx} {dy}) scale({t})" d="{p_del_logo()}"/></svg>\n')


def a_png(tmp, svg, nombre, transparente):
    fuente, pagina, png = tmp / f'{nombre}.svg', tmp / f'{nombre}.html', tmp / f'{nombre}-512.png'
    fuente.write_text(svg)
    pagina.write_text('<!DOCTYPE html><style>html,body{margin:0;background:transparent}img{display:block;width:512px;height:512px}</style>'
                      f'<img src="{fuente.as_uri()}">')
    chrome(pagina, png, 512, 512, transparente)
    return png


def iconos(tmp):
    # Pestañas (svg e ico): cuadro redondeado con esquinas transparentes.
    (SITIO / 'favicon.svg').write_text(icono_svg(12))
    grande = a_png(tmp, icono_svg(12), 'redondo', True)
    # iPhone/iPad redondean el apple-touch-icon por su cuenta y rellenan lo transparente: va cuadrado y opaco.
    redimensionar(a_png(tmp, icono_svg(0), 'cuadrado', False), SITIO / 'apple-touch-icon.png', 180)
    tam = []
    for lado in (16, 32, 48):
        redimensionar(grande, tmp / f'i{lado}.png', lado)
        tam.append((lado, tmp / f'i{lado}.png'))
    ico(tam, SITIO / 'favicon.ico')
    print('iconos: favicon.svg, favicon.ico, apple-touch-icon.png')


def thumbnails(cfg, tmp):
    plantilla = (AQUI / 'plantilla.html').read_text()
    plantilla = re.sub(r':root\{[^}]*\}', ':root{--ink:%s;--paper:%s;--mist:%s;--accent:%s}' % (COL['tinta'], COL['papel'], COL['niebla'], COL['acento']), plantilla, count=1)
    plantilla = plantilla.replace('Ecosistema PRODI', html.escape(cfg.get('marca_plataforma', cfg.get('sitio', ''))))
    por_slug = {p['slug']: p for p in cfg['paginas']}
    plataformas = [{'nombre': por_slug[s]['og']['etiqueta'], 'foto': por_slug[s]['og']['foto'],
                    'posicion': por_slug[s]['og'].get('posicion')} for s in PLATAFORMAS]
    destino = SITIO / 'assets/compartir'
    destino.mkdir(exist_ok=True)
    for p in cfg['paginas']:
        datos = {'og': p['og'], 'raiz': SITIO.as_uri(), 'plataformas': plataformas}
        doc = plantilla.replace('__DATOS__', json.dumps(datos, ensure_ascii=False)).replace('__LOGO__', logo_svg())
        h = tmp / f'og-{p["slug"]}.html'
        h.write_text(doc)
        png = tmp / f'og-{p["slug"]}.png'
        chrome(h, png, 1200, 630)
        jpg = destino / nombre_og(cfg, p)
        a_jpeg(png, jpg)
        print(f'thumbnail: {jpg.relative_to(SITIO)}  {jpg.stat().st_size // 1024} KB')


def nombre_og(cfg, p):
    return f'og-{p["slug"]}-v{cfg["version"]}.jpg'


def url_de(cfg, p):
    return cfg['base'] + (p.get('ruta') or '/' + quote(p['archivo']))


def bloque(cfg, p):
    e = lambda s: html.escape(s, quote=True)
    url = url_de(cfg, p)
    img = f'{cfg["base"]}/assets/compartir/{nombre_og(cfg, p)}'
    alt = re.sub(r'<[^>]+>', ' ', p['og']['titular'])
    alt = e(re.sub(r'\s+', ' ', f'{p["og"]["etiqueta"]} — {alt}').strip())
    t, d = e(p['titulo']), e(p['descripcion'])
    return '\n'.join([
        f'{INICIO} · generado por herramientas/compartir/generar.py, no editar a mano -->',
        f'<title>{t}</title>',
        f'<meta name="description" content="{d}">',
        f'<link rel="canonical" href="{url}">',
        f'<link rel="icon" href="favicon.ico?v={ICONOS_V}" sizes="48x48">',
        f'<link rel="icon" href="favicon.svg?v={ICONOS_V}" type="image/svg+xml">',
        f'<link rel="apple-touch-icon" href="apple-touch-icon.png?v={ICONOS_V}">',
        '<meta name="theme-color" content="#171726">',
        '<meta property="og:type" content="website">',
        f'<meta property="og:site_name" content="{e(cfg["sitio"])}">',
        '<meta property="og:locale" content="es_MX">',
        f'<meta property="og:title" content="{t}">',
        f'<meta property="og:description" content="{d}">',
        f'<meta property="og:url" content="{url}">',
        f'<meta property="og:image" content="{img}">',
        '<meta property="og:image:type" content="image/jpeg">',
        '<meta property="og:image:width" content="1200">',
        '<meta property="og:image:height" content="630">',
        f'<meta property="og:image:alt" content="{alt}">',
        '<meta name="twitter:card" content="summary_large_image">',
        f'<meta name="twitter:title" content="{t}">',
        f'<meta name="twitter:description" content="{d}">',
        f'<meta name="twitter:image" content="{img}">',
        FIN,
    ])


def escribir_heads(cfg):
    for p in cfg['paginas']:
        f = SITIO / p['archivo']
        s = f.read_text()
        b = bloque(cfg, p)
        if INICIO in s:
            s = re.sub(re.escape(INICIO) + r'.*?' + re.escape(FIN), lambda _: b, s, count=1, flags=re.S)
        else:
            # Justo después del primer viewport del <head> estático.
            m = re.search(r'<meta name="viewport"[^>]*>\n', s[:s.index('</head>')])
            s = s[:m.end()] + b + '\n' + s[m.end():]
        s = re.sub(r'<html(?![^>]*\blang=)([^>]*)>', r'<html lang="es"\1>', s, count=1)
        f.write_text(s)
        print(f'head: {p["archivo"]}')


def main():
    cfg = CFG
    tmp = Path(tempfile.mkdtemp(prefix='compartir-'))
    try:
        if '--sin-imagenes' not in sys.argv:
            iconos(tmp)
            if '--iconos' not in sys.argv:
                thumbnails(cfg, tmp)
        escribir_heads(cfg)
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


if __name__ == '__main__':
    main()
