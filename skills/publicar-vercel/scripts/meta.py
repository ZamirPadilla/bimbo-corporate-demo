#!/usr/bin/env python3
"""Mete en middleware.js (copia de publicación) la vista previa para compartir de cada página.

Los enlaces del cliente abren primero la página de acceso, que es lo único que leen WhatsApp, Slack, iMessage,
etc. Por eso esa página repite el título, la descripción y el thumbnail (assets/compartir/og-*.jpg) de la página
pedida. Se leen del <head> de cada .dc.html ya copiado; las URLs absolutas se arman con el dominio del cliente.
Uso: meta.py <carpeta de publicación> [archivo de la Home, por defecto la primera página con og:image llamada *Home*]
"""
import html, json, pathlib, re, sys
from urllib.parse import urlparse

dest = pathlib.Path(sys.argv[1])
meta = {}
for f in sorted(dest.glob('*.dc.html')):
    head = f.read_text(encoding='utf-8').split('</head>')[0]
    get = lambda k: (m := re.search(r'<meta (?:property|name)="%s" content="([^"]*)"' % re.escape(k), head)) and html.unescape(m.group(1))
    if not get('og:image'):
        continue
    meta['/' + f.name] = {'t': get('og:title'), 'd': get('og:description'), 'i': urlparse(get('og:image')).path, 'a': get('og:image:alt') or ''}
nombre_home = sys.argv[2] if len(sys.argv) > 2 else next((k[1:] for k in meta if 'home' in k.lower() or k == '/index.html'), None)
home = meta.get('/' + nombre_home) if nombre_home else None
assert home, 'falta la Home: pásala como segundo argumento (p. ej. "Bimbo Home.dc.html")'
meta['/'] = home
mw = dest / 'middleware.js'
s = mw.read_text(encoding='utf-8')
marca = '/*META*/{}/*META*/'
assert marca in s, 'middleware.js sin la marca de META'
mw.write_text(s.replace(marca, json.dumps(meta, ensure_ascii=False)), encoding='utf-8')
print(len(meta) - 1, 'páginas con vista previa')
