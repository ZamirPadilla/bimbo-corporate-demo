"""Plano territorial registrado a una foto aérea (variante del skill lamina-tecnica).

Saca de UNA foto cenital las capas de un plano limpio, en coordenadas de píxel de la propia foto, para que
plano y foto coincidan píxel a píxel (la foto se funde en su plano). Uso:

    python plano_desde_foto.py foto.jpg salida.json [--debug carpeta]

Capas: coast (borde mar/tierra, sin los tramos del marco), sea (polígono del mar), sand, water (agua interior:
lagos, río, canales), golf (fairways y prados), roads (automáticos + trazados a mano y ajustados a la cresta
más cercana), blds (techos), docks (muelles), fields (parcelas agrícolas), contours (curvas de nivel de un
relieve sintético coherente con la costa: acantilado donde hay acantilado, planicie donde hay playa),
bathy (isobatas) y elev (retícula 1/8 para leer la elevación bajo el cursor).

Requiere numpy, opencv-python-headless, scikit-image, scipy.
Los umbrales de color están calibrados para render aéreo tipo Nauka · Costa Canuva (selva, golf, playa, mar
turquesa); para otra foto se ajustan con --debug mirando las máscaras.
"""
import sys, json, argparse
import numpy as np, cv2
from scipy import ndimage as ndi
from skimage.filters import sato
from skimage.morphology import skeletonize
from skimage.measure import find_contours, label, regionprops

ap = argparse.ArgumentParser(); ap.add_argument('src'); ap.add_argument('out'); ap.add_argument('--debug')
a = ap.parse_args()
im = cv2.imread(a.src); h, w = im.shape[:2]
hsv = cv2.cvtColor(im, cv2.COLOR_BGR2HSV).astype(np.float32); H, S, V = hsv[..., 0], hsv[..., 1], hsv[..., 2]
lab = cv2.cvtColor(cv2.GaussianBlur(im, (0, 0), 2), cv2.COLOR_BGR2LAB).astype(np.float32); L, A, B = lab[..., 0], lab[..., 1], lab[..., 2]
u8 = lambda m: (m > 0).astype(np.uint8) * 255
K = lambda n: cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (n, n))

def dbg(name, m):
    if a.debug: cv2.imwrite(f'{a.debug}/{name}.png', u8(m) if m.dtype == bool else m)

# ---------- mar (azul conectado al borde inferior) + espuma ----------
blue = (H >= 85) & (H <= 125) & (S > 60) & (V > 40)
n, cc = cv2.connectedComponents(cv2.morphologyEx(u8(blue), cv2.MORPH_CLOSE, K(9)))
sea = np.isin(cc, list(set(np.unique(cc[-3:, :])) - {0}))
near = cv2.dilate(u8(sea), K(31)) > 0
yy0, xx0 = np.mgrid[0:h, 0:w]
surf = near & (S < 70) & (V > 165) & ~((xx0 > w * .79) & (yy0 < h * .66))   # espuma, no los andadores de la dársena
sea = sea | surf
sea = cv2.morphologyEx(u8(sea), cv2.MORPH_CLOSE, K(7)) > 0
sea = cv2.morphologyEx(u8(sea), cv2.MORPH_OPEN, K(5)) > 0
inv = u8(~sea); n2, cc2, st, _ = cv2.connectedComponentsWithStats(inv)
for i in range(1, n2):   # tapa manchas de arrecife en mar abierto, no las penínsulas de la dársena
    if st[i, 4] < 4000 and st[i, 1] > h * .62: sea[cc2 == i] = True
n2, cc2, st, _ = cv2.connectedComponentsWithStats(u8(sea))
sea = cc2 == (1 + np.argmax(st[1:, 4]))
land = ~sea
dbg('sea', sea)

# ---------- utilidades de vectorización ----------
def smooth_pts(p, sig, closed):
    if len(p) < 5 or sig <= 0: return p
    mode = 'wrap' if closed else 'nearest'
    return np.stack([ndi.gaussian_filter1d(p[:, 0], sig, mode=mode), ndi.gaussian_filter1d(p[:, 1], sig, mode=mode)], 1)

def rdp(p, eps):
    if len(p) < 3: return p
    c = cv2.approxPolyDP(p.astype(np.float32).reshape(-1, 1, 2), eps, False).reshape(-1, 2)
    return c

def polys(mask, min_area=40, sig=1.5, eps=.6):
    cs, _ = cv2.findContours(u8(mask), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
    out = []
    for c in cs:
        if cv2.contourArea(c) < min_area: continue
        p = smooth_pts(c.reshape(-1, 2).astype(np.float32), sig, True)
        p = cv2.approxPolyDP(p.reshape(-1, 1, 2), eps, True).reshape(-1, 2)
        if len(p) >= 3: out.append(p)
    return out

def open_line(p, sig=1.5, eps=.6):
    p = smooth_pts(np.asarray(p, np.float32), sig, False)
    return rdp(p, eps)

R = lambda p: [round(float(v), 1) for xy in p for v in xy]   # [x0,y0,x1,y1,...]

# ---------- costa: contorno del mar sin los tramos sobre el marco ----------
cs, hier = cv2.findContours(u8(sea), cv2.RETR_CCOMP, cv2.CHAIN_APPROX_NONE)
oi = max((i for i in range(len(cs)) if hier[0][i][3] < 0), key=lambda i: cv2.contourArea(cs[i]))
c = cs[oi].reshape(-1, 2).astype(np.float32)
sea_polys = [cv2.approxPolyDP(smooth_pts(c, 2, True).reshape(-1, 1, 2), .6, True).reshape(-1, 2)]
islands = [cs[i].reshape(-1, 2).astype(np.float32) for i in range(len(cs)) if hier[0][i][3] == oi and cv2.contourArea(cs[i]) > 60]
for q in islands: sea_polys.append(cv2.approxPolyDP(smooth_pts(q, 1.5, True).reshape(-1, 1, 2), .5, True).reshape(-1, 2))
onb = (c[:, 0] <= 1) | (c[:, 0] >= w - 2) | (c[:, 1] <= 1) | (c[:, 1] >= h - 2)
coast, cur = [], []
for p, b in zip(c, onb):
    if b:
        if len(cur) > 20: coast.append(open_line(cur, 2, .5))
        cur = []
    else: cur.append(p)
if len(cur) > 20: coast.append(open_line(cur, 2, .5))
for q in sea_polys[1:]: coast.append(np.vstack([q, q[:1]]))   # orillas de islas y penínsulas de la dársena

# ---------- playa ----------
sand = land & (H >= 8) & (H <= 24) & (S > 40) & (S < 170) & (V > 150) & (cv2.dilate(u8(sea), K(61)) > 0)
sand = cv2.morphologyEx(u8(sand), cv2.MORPH_CLOSE, K(7)) > 0
dbg('sand', sand)

# ---------- agua interior ----------
water = land & blue & ~(cv2.dilate(u8(sea), K(5)) > 0)
water = cv2.morphologyEx(u8(water), cv2.MORPH_CLOSE, K(3)) > 0
dbg('water', water)

# ---------- golf y prados ----------
golf = land & (L > 122) & (A < 117) & (B > 150)
golf = cv2.morphologyEx(u8(golf), cv2.MORPH_OPEN, K(3)); golf = cv2.morphologyEx(golf, cv2.MORPH_CLOSE, K(5)) > 0
dbg('golf', golf)

# ---------- textura (selva vs. campo abierto) ----------
Lr = cv2.cvtColor(im, cv2.COLOR_BGR2LAB)[..., 0].astype(np.float32)
Lm = cv2.GaussianBlur(Lr, (0, 0), 3); tex = np.sqrt(np.maximum(cv2.GaussianBlur(Lr * Lr, (0, 0), 3) - Lm * Lm, 0))
texb = cv2.GaussianBlur(tex, (0, 0), 5)

# ---------- corredores de golf y prados del desarrollo (verde claro y liso alrededor de los fairways) ----------
rough = land & (texb < 13) & (A < 121) & (L > 92) & ~water & ~sand & ~(cv2.dilate(u8(sea), K(15)) > 0)
rough = rough & (cv2.dilate(u8(golf), K(41)) > 0)
rough = cv2.morphologyEx(u8(rough | golf), cv2.MORPH_CLOSE, K(9)); rough = cv2.morphologyEx(rough, cv2.MORPH_OPEN, K(5)) > 0
dbg('rough', rough)

# ---------- parcelas agrícolas y claros ----------
brown = (H >= 8) & (H <= 26) & (S > 50) & (S < 170) & (V > 70) & (V < 215)
openf = ~rough & land & ((texb < 10.5) | (cv2.GaussianBlur(brown.astype(np.float32), (0, 0), 4) > .45)) & ~golf & ~sand & ~water & ~(cv2.dilate(u8(sea), K(41)) > 0)
openf = cv2.morphologyEx(u8(openf), cv2.MORPH_OPEN, K(7)); openf = cv2.morphologyEx(openf, cv2.MORPH_CLOSE, K(9)) > 0
dbg('fields', openf)

# divisiones entre parcelas: bordes rectos dentro del campo abierto
fl = []
edges = cv2.Canny(cv2.GaussianBlur(Lr, (0, 0), 1.6).astype(np.uint8), 18, 42)
edges[~(cv2.erode(u8(openf), K(7)) > 0)] = 0
hl = cv2.HoughLinesP(edges, 1, np.pi / 180, 22, minLineLength=26, maxLineGap=4)
if hl is not None:
    for x1, y1, x2, y2 in hl.reshape(-1, 4): fl.append([[x1, y1], [x2, y2]])
dbg('fedges', edges)

# ---------- techos ----------
roof = land & (S < 50) & (V > 150) & ~sand & ~(cv2.dilate(u8(sea), K(25)) > 0)
roof = cv2.morphologyEx(u8(roof), cv2.MORPH_OPEN, K(3)) > 0
blds = []
lb = label(roof)
for p in regionprops(lb):
    if 10 <= p.area <= 900:
        ys, xs = np.nonzero(lb[p.slice] == p.label); pts = np.stack([xs + p.slice[1].start, ys + p.slice[0].start], 1).astype(np.float32)
        box = cv2.boxPoints(cv2.minAreaRect(pts)); blds.append(box)
dbg('roofs', roof)

# ---------- muelles (trazados sobre la foto: espigón + dedos cada 6 px) ----------
PIERS = [((1450, 482), (1495, 482)), ((1525, 482), (1560, 482)), ((1460, 500), (1495, 500)), ((1525, 500), (1565, 500)),
         ((1465, 512), (1485, 512)), ((1520, 512), (1560, 512)), ((1520, 527), (1560, 527)), ((1515, 537), (1555, 537))]
docks = []
for (x1, y1), (x2, y2) in PIERS:
    docks.append([[x1, y1], [x2, y2]])
    for x in range(x1 + 3, x2, 6): docks.append([[x, y1 - 3], [x, y1 + 3]])

# ---------- caminos ----------
gl = (cv2.GaussianBlur(Lr, (0, 0), .8))
Am = cv2.GaussianBlur(A, (0, 0), 6); Sm = cv2.GaussianBlur(S, (0, 0), 6)
score = np.clip((A - Am) * 2, 0, None) + np.clip((Sm - S) * .35, 0, None); score[sea] = 0
score = cv2.GaussianBlur(score / max(1, score.max()), (0, 0), 1.5)
rid = sato(score, sigmas=[1.5, 2.5], black_ridges=False)
far = ~(cv2.dilate(u8(sea), K(31)) > 0); rid[~far] = 0
sk = skeletonize(rid > np.percentile(rid[far], 96.5))
lb = label(sk, connectivity=2); keep = np.zeros_like(sk)
for p in regionprops(lb):
    if p.area >= 110: keep[lb == p.label] = True

def trace_skel(m):
    """Esqueleto → polilíneas (corta en nodos)."""
    m = m.copy(); ys, xs = np.nonzero(m); pts = set(zip(xs.tolist(), ys.tolist()))
    nb = lambda x, y: [(x + dx, y + dy) for dx in (-1, 0, 1) for dy in (-1, 0, 1) if (dx or dy) and (x + dx, y + dy) in pts]
    deg = {p: len(nb(*p)) for p in pts}; seen = set(); lines = []
    starts = [p for p in pts if deg[p] != 2] + list(pts)
    for s in starts:
        for q in nb(*s):
            e = frozenset((s, q))
            if e in seen: continue
            line = [s, q]; seen.add(e); prev, cur = s, q
            while deg.get(cur, 0) == 2:
                nx = [r for r in nb(*cur) if r != prev]
                if not nx: break
                e = frozenset((cur, nx[0]))
                if e in seen: break
                seen.add(e); prev, cur = cur, nx[0]; line.append(cur)
            if len(line) >= 12: lines.append(np.array(line, np.float32))
    return lines

auto_roads = [open_line(l, 2.5, .8) for l in trace_skel(keep)]

# trazados a mano (coordenadas de la foto), ajustados a la cresta más cercana ±5 px
MANUAL = [
    [(357, 685), (375, 666), (398, 648), (421, 644), (444, 637), (466, 616), (485, 603), (503, 589), (521, 553), (544, 535), (562, 521), (585, 507), (612, 489), (639, 475), (666, 462), (685, 460)],
    [(685, 460), (708, 442), (731, 424), (758, 405), (781, 392), (792, 378), (795, 355), (799, 342), (817, 328), (840, 319), (858, 308), (867, 292), (881, 274), (890, 255), (888, 240), (876, 228), (867, 215), (858, 196), (854, 165), (853, 137), (854, 115), (863, 101), (881, 87), (904, 74), (922, 65)],
    [(792, 380), (822, 378), (854, 369), (876, 355), (899, 337), (917, 319), (931, 301), (945, 283), (954, 260), (960, 246)],
    [(1289, 375), (1287, 434), (1282, 470), (1275, 511), (1271, 525)],
]
def snap(poly, rad=5):
    p = np.array(poly, np.float32); d = []
    for i in range(len(p) - 1):
        a0, a1 = p[i], p[i + 1]; n = max(2, int(np.hypot(*(a1 - a0)) / 3))
        for t in np.linspace(0, 1, n, endpoint=False): d.append(a0 + (a1 - a0) * t)
    d.append(p[-1]); d = np.array(d)
    out = []
    for i, q in enumerate(d):
        t = d[min(len(d) - 1, i + 1)] - d[max(0, i - 1)]; t = t / (np.hypot(*t) + 1e-6); nrm = np.array([-t[1], t[0]])
        best, bv = q, -1
        for s in range(-rad, rad + 1):
            r = q + nrm * s; x, y = int(round(r[0])), int(round(r[1]))
            if 0 <= x < w and 0 <= y < h and score[y, x] > bv: bv, best = score[y, x], r
        out.append(best)
    return open_line(np.array(out), 3, .8)
man_roads = [snap(m) for m in MANUAL]

# ---------- zonas que el plano debe "contar" (perímetros + techos finos dentro) ----------
def zone_from(mask, box, close=31, grow=10):
    m = np.zeros_like(mask); x0, y0, x1, y1 = box; m[y0:y1, x0:x1] = mask[y0:y1, x0:x1]
    m = cv2.dilate(u8(m), K(grow)); m = cv2.morphologyEx(m, cv2.MORPH_CLOSE, K(close)) > 0
    m = ndi.binary_fill_holes(m)
    n, cc, st, _ = cv2.connectedComponentsWithStats(u8(m))
    return [cc == i for i in range(1, n) if st[i, 4] > 1500]
golfzone = zone_from(golf | rough | (water & (cv2.dilate(u8(golf), K(31)) > 0)), (870, 80, 1265, 505))
# resort (SIARI · Ritz-Carlton Reserve): perímetro trazado sobre la foto
RESORT = [(548, 612), (540, 585), (548, 560), (565, 540), (582, 525), (605, 505), (625, 490), (648, 475), (668, 462), (690, 458),
          (700, 470), (690, 490), (685, 515), (700, 525), (720, 530), (735, 540), (700, 555), (675, 565), (650, 575), (620, 580), (600, 585), (575, 600), (560, 612)]
rz = np.zeros((h, w), np.uint8); cv2.fillPoly(rz, [np.array(RESORT, np.int32)], 255); rz = rz > 0
# techos rosados/beige dentro del resort y en el club de golf (los blancos ya salen arriba)
pink = ((H <= 22) | (H >= 160)) & (S > 18) & (S < 110) & (V > 125) & (V < 235) & land & ~sand
CLUB = (1100, 270, 1250, 375)
cz = np.zeros((h, w), bool); cz[CLUB[1]:CLUB[3], CLUB[0]:CLUB[2]] = True
roofz = (pink | roof) & (rz | cz) & ~golf & ~rough
roofz = cv2.morphologyEx(u8(roofz), cv2.MORPH_OPEN, K(3)) > 0
lb = label(cv2.erode(u8(roofz), K(3)) > 0)   # erosión: separa techos contiguos (fila de villas)
for p in regionprops(lb):
    if p.major_axis_length > 34: continue        # bandas largas = andadores/caminos claros, no techos
    if 6 <= p.area <= 600:
        ys, xs = np.nonzero(lb[p.slice] == p.label); pts = np.stack([xs + p.slice[1].start, ys + p.slice[0].start], 1).astype(np.float32)
        blds.append(cv2.boxPoints(cv2.minAreaRect(pts)))
# albercas (azul claro saturado, pequeñas) en resort y club
pool = (H >= 85) & (H <= 105) & (S > 90) & (V > 150) & (rz | cz)
pools = [p for p in polys(cv2.morphologyEx(u8(pool), cv2.MORPH_OPEN, K(2)) > 0, 6, .6, .4)]
# dársena de la marina: el agua del mar dentro de la caja del puerto
basin = sea.copy(); basin[:, :1280] = False; basin[:330, :] = False; basin[600:, :] = False
zones = {
    'golf': [R(q) for m in golfzone for q in polys(m, 1500, 4, 1.2)],
    'resort': [R(np.array(RESORT, np.float32))],
    'club': [R(np.array([(CLUB[0], CLUB[1]), (CLUB[2], CLUB[1]), (CLUB[2], CLUB[3]), (CLUB[0], CLUB[3])], np.float32))],
    'basin': [R(q) for q in polys(basin, 500, 1.5, .6)],
}

# ---------- relieve sintético coherente con la costa ----------
dl = ndi.distance_transform_edt(land).astype(np.float32)
ds = ndi.distance_transform_edt(sea).astype(np.float32)
yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
g = lambda cx, cy, r: np.exp(-((xx - cx) ** 2 + (yy - cy) ** 2) / (2 * r * r))
# pendiente por zona: acantilado al poniente, planicie costera al oriente, meseta agrícola al norte
cliff = 1 / (1 + np.exp((xx - 520) / 40))
plain = (1 - cliff) * (1 / (1 + np.exp((300 - yy) / 40)))
slope = .35 + 1.15 * cliff - .1 * plain
E = 150 * (1 - np.exp(-dl * slope / 150))          # rampa desde la costa que se aplana tierra adentro
E = E + 150 * g(200, 470, 120) + 190 * g(330, 250, 150) + 230 * g(560, 170, 140) + 170 * g(760, 60, 120) \
      + 120 * g(110, 120, 120) + 90 * g(650, 360, 90) + 70 * g(1030, 40, 110) + 45 * g(1480, 200, 140) + 35 * g(1250, 120, 90)
E = E - 30 * g(1010, 330, 110) - 25 * g(1150, 430, 100)   # valle del golf
E = cv2.GaussianBlur(E, (0, 0), 9)
E[sea] = 0
E = np.where(land, np.maximum(E, 1), -ds * .22)
Es = cv2.GaussianBlur(E, (0, 0), 3)

def iso(F, lv, minlen):
    out = []
    for c in find_contours(F, lv):
        p = c[:, ::-1].astype(np.float32)
        if len(p) < 8: continue
        if np.sum(np.hypot(*np.diff(p, axis=0).T)) < minlen: continue
        out.append(open_line(p, 2, .6))
    return out

contours = []
print('E land', float(Es[land].min()), float(np.percentile(Es[land], 50)), float(Es[land].max()))
for k, lv in enumerate(range(10, 800, 10)):
    for p in iso(np.where(land, Es, -50), lv, 50):
        contours.append({'z': lv, 'm': 1 if lv % 50 == 0 else 0, 'p': R(p)})
    
bathy = []
for lv in (-6, -14, -24, -36, -50):
    for p in iso(np.where(sea, Es, 20), lv, 120): bathy.append({'z': lv, 'p': R(p)})

elev = cv2.resize(E, (w // 8, h // 8), interpolation=cv2.INTER_AREA)

data = {
    'w': w, 'h': h,
    'coast': [R(p) for p in coast], 'sea': [R(p) for p in sea_polys],
    'sand': [R(p) for p in polys(sand, 300, 2, .8)],
    'water': [R(p) for p in polys(water, 30, 1.2, .5)],
    'golf': [R(p) for p in polys(golf, 120, 1.5, .6)], 'rough': [R(p) for p in polys(rough, 400, 2.5, .8)],
    'fields': [R(p) for p in polys(openf, 500, 3, 1)], 'flines': [R(p) for p in fl],
    'roads': [R(p) for p in man_roads] + [R(p) for p in auto_roads],
    'blds': [R(p) for p in blds], 'docks': [R(p) for p in docks], 'pools': [R(p) for p in pools], 'zones': zones,
    'contours': contours, 'bathy': bathy,
    'elev': {'w': elev.shape[1], 'h': elev.shape[0], 's': 8, 'v': [int(round(v)) for v in elev.ravel()]},
}
json.dump(data, open(a.out, 'w'), separators=(',', ':'))
print({k: (len(v) if isinstance(v, list) else '') for k, v in data.items()})

if a.debug:   # control: el plano sobre la foto
    ov = (cv2.cvtColor(cv2.cvtColor(im, cv2.COLOR_BGR2GRAY), cv2.COLOR_GRAY2BGR) * .45 + 140).astype(np.uint8)
    P = lambda f: np.array(f, np.float32).reshape(-1, 2).astype(np.int32)
    for c in data['contours']: cv2.polylines(ov, [P(c['p'])], False, (90, 90, 90) if c['m'] else (170, 170, 170), 1, cv2.LINE_AA)
    for c in data['bathy']: cv2.polylines(ov, [P(c['p'])], False, (200, 170, 150), 1, cv2.LINE_AA)
    for p in data['fields']: cv2.polylines(ov, [P(p)], True, (60, 120, 160), 1, cv2.LINE_AA)
    for p in data['flines']: cv2.polylines(ov, [P(p)], False, (60, 120, 160), 1, cv2.LINE_AA)
    for p in data['golf']: cv2.polylines(ov, [P(p)], True, (40, 160, 40), 1, cv2.LINE_AA)
    for p in data['water']: cv2.polylines(ov, [P(p)], True, (200, 100, 0), 1, cv2.LINE_AA)
    for p in data['sand']: cv2.polylines(ov, [P(p)], True, (60, 170, 230), 1, cv2.LINE_AA)
    for p in data['roads']: cv2.polylines(ov, [P(p)], False, (0, 0, 220), 1, cv2.LINE_AA)
    for p in data['blds']: cv2.polylines(ov, [P(p)], True, (120, 0, 120), 1, cv2.LINE_AA)
    for p in data['docks']: cv2.polylines(ov, [P(p)], False, (0, 0, 0), 1, cv2.LINE_AA)
    for k2, zl in data['zones'].items():
        for p in zl: cv2.polylines(ov, [P(p)], True, (0, 140, 255), 2, cv2.LINE_AA)
    for p in data['coast']: cv2.polylines(ov, [P(p)], False, (20, 20, 20), 2, cv2.LINE_AA)
    cv2.imwrite(f'{a.debug}/control.png', ov)
