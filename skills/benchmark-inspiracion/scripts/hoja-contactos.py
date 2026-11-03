"""Hoja de contactos 3x3 de las miniaturas de referencias, para revisarlas de un vistazo.

    python3 hoja-contactos.py refs/ salida/      (requiere Pillow: pip install pillow)

Genera salida/hoja-0.jpg, hoja-1.jpg, … con el nombre de cada archivo sobre su miniatura.
"""
import glob
import os
import sys

from PIL import Image, ImageDraw


def main():
    origen, destino = sys.argv[1], sys.argv[2]
    os.makedirs(destino, exist_ok=True)
    archivos = sorted(glob.glob(os.path.join(origen, '*.jpg')) + glob.glob(os.path.join(origen, '*.png')))
    W, H, ROT = 600, 400, 30
    for n in range(0, len(archivos), 9):
        grupo = archivos[n:n + 9]
        hoja = Image.new('RGB', (W * 3, (H + ROT) * 3), 'white')
        d = ImageDraw.Draw(hoja)
        for i, f in enumerate(grupo):
            im = Image.open(f).convert('RGB')
            im.thumbnail((W, H))
            x, y = (i % 3) * W, (i // 3) * (H + ROT)
            hoja.paste(im, (x, y + ROT))
            d.text((x + 6, y + 8), os.path.basename(f), fill='black')
        salida = os.path.join(destino, f'hoja-{n // 9}.jpg')
        hoja.save(salida, quality=80)
        print(salida)


if __name__ == '__main__':
    main()
