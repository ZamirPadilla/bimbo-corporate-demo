#!/usr/bin/env python3
"""Manifiesto de la media de un sitio para respaldarla en un bucket.

Recorre la carpeta del sitio, toma la media (imágenes, video, pdf, fuentes, json de datos grandes) y escribe un
JSON con ruta original, bytes, sha256, md5 y el nombre de objeto en el bucket. Los nombres de objeto van en ASCII
(Supabase rechaza acentos y algunos símbolos); el manifiesto guarda la ruta original para restaurar.
Uso: manifiesto.py <carpeta del sitio> <prefijo en el bucket> <salida.json> [--tsv subida.tsv]
  prefijo: p. ej. "bimbo/2026-11-02" (quién / fecha). --tsv escribe "ruta_local<TAB>objeto" para subir_supabase.py.
"""
import hashlib, json, sys, unicodedata, re
from pathlib import Path

EXT = {'.png', '.jpg', '.jpeg', '.webp', '.avif', '.gif', '.svg', '.mp4', '.webm', '.mov', '.pdf', '.woff', '.woff2', '.ico'}
if len(sys.argv) < 4:
    sys.exit(__doc__)
raiz, prefijo, salida = Path(sys.argv[1]).resolve(), sys.argv[2].strip('/'), Path(sys.argv[3])
tsv = Path(sys.argv[sys.argv.index('--tsv') + 1]) if '--tsv' in sys.argv else None

def ascii_key(p):
    s = unicodedata.normalize('NFD', p).encode('ascii', 'ignore').decode()
    return re.sub(r'[^A-Za-z0-9._/-]+', '-', s)

filas, vistos = [], {}
for f in sorted(raiz.rglob('*')):
    if not f.is_file() or f.suffix.lower() not in EXT or any(x.startswith('.') for x in f.relative_to(raiz).parts):
        continue
    rel = f.relative_to(raiz).as_posix()
    obj = f'{prefijo}/{ascii_key(rel)}'
    if obj in vistos:                       # dos nombres que quedan iguales sin acentos
        obj = obj.replace(f.suffix, f'-{hashlib.md5(rel.encode()).hexdigest()[:6]}{f.suffix}')
    vistos[obj] = rel
    b = f.read_bytes()
    filas.append({'ruta': rel, 'bytes': len(b), 'sha256': hashlib.sha256(b).hexdigest(), 'md5': hashlib.md5(b).hexdigest(), 'objeto': obj})
salida.write_text(json.dumps({'raiz': raiz.name, 'prefijo': prefijo, 'archivos': filas}, ensure_ascii=False, indent=1))
if tsv:
    tsv.write_text(''.join(f'{raiz / r["ruta"]}\t{r["objeto"]}\n' for r in filas))
print(f'{len(filas)} archivos, {sum(r["bytes"] for r in filas) / 1e6:.1f} MB → {salida}')
