"""Qué fuente usa cada texto en un PDF del cliente (requiere PyMuPDF: pip install pymupdf).

    python3 fuentes_pdf.py archivo.pdf
Lista cada fuente incrustada con sus tamaños y ejemplos de texto, de la más grande a la más chica: los titulares
salen arriba. Complementa a `pdffonts archivo.pdf` (poppler), que solo da nombres.
"""
import collections
import sys

import pymupdf

d = pymupdf.open(sys.argv[1])
uso = collections.defaultdict(list)
for pno, p in enumerate(d):
    for b in p.get_text("dict")["blocks"]:
        for l in b.get("lines", []):
            for s in l["spans"]:
                t = s["text"].strip()
                if t: uso[s["font"].split("+")[-1]].append((pno + 1, round(s["size"]), t[:40]))
for f, v in sorted(uso.items(), key=lambda x: -max(y[1] for y in x[1])):
    tam = sorted({y[1] for y in v})
    print(f"{f:24} tamaños {tam[:6]}  ejemplos: {[(y[0], y[2]) for y in sorted(v, key=lambda y: -y[1])[:4]]}")
