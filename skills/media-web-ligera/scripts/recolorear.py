#!/usr/bin/env python3
"""Recolorea un plano de líneas para el fondo de otra página, canal por canal.

Mapea linealmente cada canal RGB de forma que el color de fondo actual pase al fondo nuevo y el color de línea
actual pase al de línea nuevo; lo intermedio (antialias, líneas tenues) se interpola y no se ensucia.
Uso: recolorear.py <entrada> <salida> --fondo 181725:0B0B0C --linea 9AA6FF:FFFFFF [--calidad 82]
Ejemplo real: el plano del estadio pasó de morado sobre tinta a blanco sobre el negro #0B0B0C de Deporte.
Guardar con nombre nuevo (la caché de assets/ es inmutable). Requiere Pillow y numpy.
"""
import argparse
import numpy as np
from PIL import Image

hexrgb = lambda h: np.array([int(h[i:i + 2], 16) for i in (0, 2, 4)], float)
ap = argparse.ArgumentParser(); ap.add_argument('entrada'); ap.add_argument('salida')
ap.add_argument('--fondo', required=True); ap.add_argument('--linea', required=True); ap.add_argument('--calidad', type=int, default=82)
a = ap.parse_args()
f0, f1 = map(hexrgb, a.fondo.split(':')); l0, l1 = map(hexrgb, a.linea.split(':'))
im = np.asarray(Image.open(a.entrada).convert('RGB')).astype(float)
den = np.where(np.abs(l0 - f0) < 1, 1, l0 - f0)
t = (im - f0) / den                       # 0 en el fondo, 1 en la línea, por canal
# Usar el canal con más contraste para que los tres se muevan juntos (evita bordes de color)
k = int(np.argmax(np.abs(l0 - f0)))
t = np.clip(t[..., k:k + 1], 0, 1.2)
out = np.clip(f1 + t * (l1 - f1), 0, 255).astype(np.uint8)
img = Image.fromarray(out)
img.save(a.salida, quality=a.calidad, optimize=True, progressive=True) if a.salida.lower().endswith(('.jpg', '.jpeg')) else img.save(a.salida)
print('listo', a.salida, img.size)
