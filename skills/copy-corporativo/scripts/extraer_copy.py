"""Extrae el copy visible de páginas HTML guardadas y lo deja como inventario.

Uso:
    python3 -I extraer_copy.py --html html/ --out inventario/ [--inicio '</header>'] [--fin '<footer']

Por cada página escribe <slug>.md (bloques en orden: encabezados, párrafos, listas, botones,
textos alternativos) y un inventario.json con todo. Solo usa la biblioteca estándar.
"""
import argparse
import html
import json
import re
from html.parser import HTMLParser
from pathlib import Path

BLOQUES = {'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'li', 'blockquote', 'figcaption', 'td', 'th', 'button', 'summary', 'dt', 'dd'}
IGNORAR = {'script', 'style', 'noscript', 'svg', 'template', 'select', 'option', 'iframe'}


class Extractor(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.salida, self.pila, self.ignorar, self.buffer, self.tag = [], [], 0, [], None
        self.enlace = None

    def _vaciar(self):
        texto = re.sub(r'\s+', ' ', ''.join(self.buffer)).strip()
        if texto and self.tag:
            self.salida.append({'tipo': self.tag, 'texto': texto, **({'href': self.enlace} if self.enlace else {})})
        self.buffer, self.enlace = [], None

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag in IGNORAR:
            self.ignorar += 1
            return
        if self.ignorar:
            return
        if tag in BLOQUES:
            self._vaciar()
            self.tag = tag
        elif tag == 'br':
            self.buffer.append(' ')
        elif tag == 'img':
            alt = a.get('alt')
            src = (a.get('src') or '').split('?')[0]
            self.salida.append({'tipo': 'img', 'texto': alt if alt is not None else None, 'src': src[-80:]})
        elif tag == 'a':
            if self.tag is None or self.tag in ('div',):
                self._vaciar()
                self.tag = 'a'
            self.enlace = a.get('href')
        elif tag in ('div', 'section', 'article', 'span') and self.tag is None and self.buffer:
            self._vaciar()

    def handle_endtag(self, tag):
        if tag in IGNORAR:
            self.ignorar = max(0, self.ignorar - 1)
            return
        if self.ignorar:
            return
        if tag in BLOQUES or (tag == 'a' and self.tag == 'a'):
            self._vaciar()
            self.tag = None
        elif tag in ('div', 'section', 'article') and self.tag is None:
            self._vaciar()

    def handle_data(self, data):
        if self.ignorar:
            return
        if self.tag is None and data.strip():
            self.tag = 'texto'
        self.buffer.append(data)


def extraer(ruta, inicio, fin):
    h = ruta.read_text(encoding='utf-8', errors='replace')
    meta = {
        'title': (re.search(r'<title>(.*?)</title>', h, re.S) or [None, ''])[1].strip(),
        'description': (re.search(r'<meta name="description" content="([^"]*)"', h) or [None, ''])[1],
        'lang': (re.search(r'<html[^>]*lang="([^"]*)"', h) or [None, ''])[1],
    }
    meta = {k: html.unescape(v) for k, v in meta.items()}
    i = h.find(inicio)
    j = h.find(fin, i + 1) if i >= 0 else -1
    cuerpo = h[i + len(inicio): j if j > 0 else None] if i >= 0 else h
    p = Extractor()
    p.feed(cuerpo)
    p._vaciar()
    # Quitar duplicados consecutivos (menús y carruseles repetidos para móvil)
    bloques, previo = [], None
    for b in p.salida:
        clave = (b['tipo'], b.get('texto'))
        if clave != previo:
            bloques.append(b)
        previo = clave
    return meta, bloques


def a_markdown(slug, url, meta, bloques):
    lineas = [f'# {slug}', '', f'- URL: {url}', f"- title: {meta['title']}", f"- description: {meta['description'] or '(sin description)'}", f"- lang: {meta['lang']}", '']
    for b in bloques:
        t, x = b['tipo'], b.get('texto')
        if t in ('h1', 'h2', 'h3', 'h4', 'h5', 'h6'):
            lineas += ['', '#' * (int(t[1]) + 1) + ' ' + x + f'  `{t}`']
        elif t == 'img':
            lineas.append(f"- [img] alt={'(sin alt)' if x is None else repr(x)} · {b['src']}")
        elif t == 'li':
            lineas.append(f'- {x}')
        elif t == 'a':
            lineas.append(f"- [enlace] {x} → {b.get('href')}")
        elif t == 'button':
            lineas.append(f'- [botón] {x}')
        else:
            lineas.append(x)
    return '\n'.join(lineas) + '\n'


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--html', required=True)
    ap.add_argument('--out', required=True)
    ap.add_argument('--urls', help='JSON {slug: url} para documentar el origen')
    ap.add_argument('--inicio', default='</header>')
    ap.add_argument('--fin', default='<footer')
    args = ap.parse_args()
    urls = json.loads(Path(args.urls).read_text()) if args.urls else {}
    out = Path(args.out)
    out.mkdir(parents=True, exist_ok=True)
    todo = {}
    for f in sorted(Path(args.html).glob('*.html')):
        slug = f.stem
        meta, bloques = extraer(f, args.inicio, args.fin)
        todo[slug] = {'url': urls.get(slug, ''), 'meta': meta, 'bloques': bloques}
        (out / f'{slug}.md').write_text(a_markdown(slug, urls.get(slug, ''), meta, bloques), encoding='utf-8')
    (out / 'inventario.json').write_text(json.dumps(todo, ensure_ascii=False, indent=1), encoding='utf-8')
    print(len(todo), 'páginas;', sum(len(v['bloques']) for v in todo.values()), 'bloques')


if __name__ == '__main__':
    main()
