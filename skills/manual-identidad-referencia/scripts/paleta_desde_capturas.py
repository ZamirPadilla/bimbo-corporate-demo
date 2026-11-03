"""Colores dominantes de zonas planas en capturas de una pieza de marca (requiere Pillow).

    python3 paleta_desde_capturas.py carpeta 'archivo.png:x0,y0,x1,y1' …   (coordenadas en fracción 0–1)
Sin coordenadas usa la imagen completa. Descarta casi blancos. Los valores son aproximados (pantalla y compresión):
en el manual se marcan así y se piden los oficiales al cliente.
"""
import os
import sys

from PIL import Image


def dominantes(ruta, caja=None, k=6):
    im = Image.open(ruta).convert('RGB')
    if caja:
        w, h = im.size; im = im.crop((int(caja[0] * w), int(caja[1] * h), int(caja[2] * w), int(caja[3] * h)))
    im = im.resize((120, max(1, int(120 * im.size[1] / im.size[0]))))
    q = im.quantize(colors=k, method=Image.Quantize.MEDIANCUT); pal = q.getpalette(); cnt = sorted(q.getcolors(), reverse=True)
    total = sum(c for c, _ in cnt); out = []
    for c, i in cnt:
        r, g, b = pal[i * 3:i * 3 + 3]
        if min(r, g, b) > 225: continue
        out.append(('#%02X%02X%02X' % (r, g, b), round(c / total * 100)))
    return out[:4]


carpeta = sys.argv[1]
for arg in sys.argv[2:]:
    nombre, _, coords = arg.partition(':')
    caja = tuple(float(x) for x in coords.split(',')) if coords else None
    print(nombre, dominantes(os.path.join(carpeta, nombre), caja))
