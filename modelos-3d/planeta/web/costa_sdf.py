"""Campo de distancia con signo a la costa (SDF) para dibujar el planeta en el shader con costa nítida a cualquier zoom.

Correr sin interfaz:  Blender -b --python web/costa_sdf.py
Entrada: fuentes/ne_50m_land.geojson. Salida: web/assets/costa_sdf.png (8192x4096, gris de 8 bits):
  valor = 0.5 + d / (2*RANGO), con d = distancia a la costa en unidades del planeta (R=10), + en tierra, − en agua.
Distancia aproximada (erosiones sucesivas con corrección por latitud), suficiente para el halo y el borde.
"""
import bpy, json, math, os, time
import numpy as np

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) + '/'   # carpeta de arriba de web/
W, H = 8192, 4096
R = 10.0; PX_U = W / (2 * math.pi * R)        # píxeles por unidad en el ecuador
RANGO = 0.6                                  # ± unidades codificadas
K = int(math.ceil(RANGO * PX_U))
t0 = time.time()

d = json.load(open(BASE + 'fuentes/ne_50m_land.geojson'))
ex0, ey0, ex1, ey1 = [], [], [], []
for f in d['features']:
    g = f['geometry']; polys = [g['coordinates']] if g['type'] == 'Polygon' else g['coordinates']
    for p in polys:
        for r in p:
            r = np.array(r, float); x = (r[:, 0] + 180) / 360 * W; y = (90 - r[:, 1]) / 180 * H
            ex0.append(x[:-1]); ey0.append(y[:-1]); ex1.append(x[1:]); ey1.append(y[1:])
ex0, ey0, ex1, ey1 = map(np.concatenate, (ex0, ey0, ex1, ey1))
ymin, ymax = np.minimum(ey0, ey1), np.maximum(ey0, ey1)
tierra = np.zeros((H, W), bool); cols = np.arange(W) + 0.5
for row in range(H):
    yc = row + 0.5; s = (ymin <= yc) & (ymax > yc)
    if not s.any(): continue
    xs = np.sort(ex0[s] + (yc - ey0[s]) * (ex1[s] - ex0[s]) / (ey1[s] - ey0[s]))
    tierra[row] = (np.searchsorted(xs, cols) % 2 == 1)
print('raster', round(time.time() - t0, 1), 's')

lat = 90 - (np.arange(H) + 0.5) * 180 / H
inv = 1 / np.maximum(np.cos(np.radians(lat)), 1e-3)
PAD = W // 4; idx = np.arange(W) + PAD


def distancia(m):
    """Píxeles (escala del ecuador) desde cada punto de m=True hasta el primer False, hasta K."""
    mp = np.concatenate([m[:, -PAD:], m, m[:, :PAD]], axis=1)
    V = mp.copy(); acc = np.zeros((H, W), np.float32)
    for k in range(1, K + 1):
        Vn = V.copy(); Vn[1:] &= V[:-1]; Vn[:-1] &= V[1:]; Vn[0] = False; Vn[-1] = False; V = Vn
        rh = np.minimum(np.ceil(k * inv), PAD - 1).astype(int)
        cs = np.concatenate([np.zeros((H, 1), np.int32), np.cumsum(V, axis=1, dtype=np.int32)], axis=1)
        s = np.take_along_axis(cs, idx[None, :] + rh[:, None] + 1, 1) - np.take_along_axis(cs, idx[None, :] - rh[:, None], 1)
        E = s == (2 * rh + 1)[:, None]
        if not E.any(): break
        acc += E
    return acc


din = distancia(tierra); dout = distancia(~tierra)
sdf = np.where(tierra, din + 0.5, -(dout + 0.5)) / PX_U
print('distancias', round(time.time() - t0, 1), 's', 'min/max', sdf.min().round(3), sdf.max().round(3))
# suavizado: la distancia por erosiones deja facetas en diamante en el halo; un desenfoque de caja (3 pasadas)
# las borra y casi no mueve la línea de costa (el cero de una rampa simétrica no se desplaza)
for _ in range(3):
    r = 5
    c = np.cumsum(np.concatenate([sdf[:, -r - 1:], sdf, sdf[:, :r]], axis=1), axis=1)
    sdf = (c[:, 2 * r + 1:] - c[:, :-2 * r - 1]) / (2 * r + 1)
    p = np.pad(sdf, ((r + 1, r), (0, 0)), mode='edge'); c = np.cumsum(p, axis=0)
    sdf = (c[2 * r + 1:] - c[:-2 * r - 1]) / (2 * r + 1)
sdf = sdf.astype(np.float32)
val = np.clip(0.5 + sdf / (2 * RANGO), 0, 1).astype(np.float32)
img = np.ones((H, W, 4), np.float32); img[..., 0] = img[..., 1] = img[..., 2] = val
im = bpy.data.images.new('costa_sdf', W, H, alpha=False)
im.pixels.foreach_set(np.ascontiguousarray(img[::-1]).ravel()); im.update()
im.filepath_raw = BASE + 'web/assets/costa_sdf.png'; im.file_format = 'PNG'
bpy.context.scene.render.image_settings.color_mode = 'BW'
im.save()
im.reload(); a = np.empty(len(im.pixels), np.float32); im.pixels.foreach_get(a)
print('guardado', os.path.getsize(im.filepath_raw) // 1024, 'KB', 'media', a.reshape(-1, 4)[:, 0].mean().round(4), round(time.time() - t0, 1), 's')
