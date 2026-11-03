#!/usr/bin/env python3
"""Lista los archivos de media que las páginas usan y no existen en la carpeta del sitio.

Busca rutas assets/… y uploads/… en .html, .js y .css (incluye <image href> de SVG, url() de CSS y cadenas en
JS), las decodifica (%20, acentos) y revisa que existan. Las rutas armadas en JS (terminan en "-" o llevan *)
se reportan aparte como "dinámicas" para revisarlas a mano.

Uso: barrer_assets.py <carpeta del sitio> [--copiar-de <otra carpeta>]
  --copiar-de: copia los faltantes desde otra copia del sitio (p. ej. el prototipo local del otro autor).
"""
import re, shutil, sys
from pathlib import Path
from urllib.parse import unquote

args = sys.argv[1:]
if not args:
    sys.exit(__doc__)
sitio = Path(args[0]).resolve()
origen = Path(args[args.index('--copiar-de') + 1]).resolve() if '--copiar-de' in args else None
pat = re.compile(r'''(?:assets|uploads)/[^"'()\s`<>{}$\\]+''')
faltan, dinamicas = {}, set()
for f in sorted([*sitio.glob('*.html'), *sitio.glob('*.js'), *sitio.glob('*.css')]):
    for m in pat.findall(f.read_text(encoding='utf-8', errors='ignore')):
        p = unquote(m.split('?')[0].split('#')[0]).rstrip('.,;')
        if p.endswith(('-', '/')) or '*' in p or '…' in p:
            dinamicas.add((f.name, p)); continue
        if not (sitio / p).exists():
            faltan.setdefault(p, set()).add(f.name)
for p, quien in sorted(faltan.items()):
    estado = ''
    if origen:
        src = origen / p
        if src.exists():
            (sitio / p).parent.mkdir(parents=True, exist_ok=True); shutil.copy2(src, sitio / p); estado = '  → copiado'
        else:
            estado = '  → tampoco está en el origen'
    print(f'FALTA {p}  (en {", ".join(sorted(quien))}){estado}')
for f, p in sorted(dinamicas):
    print(f'dinámica {p}*  (en {f}) — revisar a mano')
print(f'{len(faltan)} faltantes, {len(dinamicas)} rutas dinámicas')
