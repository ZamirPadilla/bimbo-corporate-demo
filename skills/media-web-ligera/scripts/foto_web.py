#!/usr/bin/env python3
"""Fotos para web: JPEG progresivo sin metadatos, lado mayor acotado y nombre nuevo (-v2).

Uso: foto_web.py <imagen o carpeta> [--max 2000] [--calidad 78] [--sufijo -v2] [--min-ahorro 0.15]
- Calidad 78 (76 si el resultado pasa de 300 KB; 82 para planos de líneas: pasar --calidad 82).
- PNG opacos se convierten a JPG; PNG con transparencia se dejan igual.
- Si ahorra menos que --min-ahorro, no escribe nada (no vale la pena cambiar el nombre).
Requiere Pillow (python3 -m venv v && v/bin/pip install pillow).
"""
import argparse, io
from pathlib import Path
from PIL import Image

ap = argparse.ArgumentParser(); ap.add_argument('ruta'); ap.add_argument('--max', type=int, default=2000)
ap.add_argument('--calidad', type=int, default=78); ap.add_argument('--sufijo', default='-v2'); ap.add_argument('--min-ahorro', type=float, default=.15)
a = ap.parse_args()
p = Path(a.ruta)
files = [p] if p.is_file() else sorted(x for x in p.rglob('*') if x.suffix.lower() in ('.jpg', '.jpeg', '.png'))
for f in files:
    if a.sufijo in f.stem:
        continue
    im = Image.open(f)
    if im.mode in ('RGBA', 'LA') or 'transparency' in im.info:
        if im.convert('RGBA').getextrema()[3][0] < 255:
            print(f'omitido (transparencia): {f}'); continue
    im = im.convert('RGB')
    if max(im.size) > a.max:
        im.thumbnail((a.max, a.max), Image.LANCZOS)
    def enc(q):
        b = io.BytesIO(); im.save(b, 'JPEG', quality=q, optimize=True, progressive=True); return b.getvalue()
    data = enc(a.calidad)
    if len(data) > 300_000 and a.calidad > 76:
        data = enc(76)
    antes = f.stat().st_size
    if len(data) > antes * (1 - a.min_ahorro):
        print(f'sin cambio (ahorro < {a.min_ahorro:.0%}): {f}'); continue
    out = f.with_name(f.stem + a.sufijo + '.jpg')
    out.write_bytes(data)
    print(f'{f.name} {antes // 1024} KB → {out.name} {len(data) // 1024} KB {im.size[0]}×{im.size[1]}')
