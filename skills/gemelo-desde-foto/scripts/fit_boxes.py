# Ajuste automático de cajas a la foto (fuera de Blender; OpenCV + SciPy):
#   python3 -I fit_boxes.py foto.jpg boxes.json salida.json overlay.png
# Bordes de la foto (Canny) separados por familia de dirección: hacia la fuga A, hacia la fuga B y verticales.
# Para cada caja (x0, y0, x1, y1, h) se proyectan sus aristas visibles y se minimiza la distancia (truncada) de
# cada arista al borde de SU familia. Así la caja "se pega" a las aristas reales de la foto. Ver cc_build.py.
import cv2, numpy as np, json, sys
from scipy.optimize import minimize

foto, jin, jout, ovl = sys.argv[1:5]
J = json.load(open(jin)); R = np.array(J["R_WC"]); C = np.array(J["C0"]); F = J["F"]; PP = J["PP"]
VP = {"A": (3241.3, -738.5), "B": (-1329.9, -882.5), "V": (516.4, 3180.7)}
img = cv2.imread(foto); g = cv2.GaussianBlur(cv2.cvtColor(img, cv2.COLOR_BGR2GRAY), (3, 3), 0)
E = cv2.Canny(g, 40, 110) > 0
gx = cv2.Sobel(g, cv2.CV_32F, 1, 0); gy = cv2.Sobel(g, cv2.CV_32F, 0, 1)
H, W = g.shape; yy, xx = np.mgrid[0:H, 0:W]
ed = np.stack([-gy, gx], -1); ed /= np.linalg.norm(ed, axis=-1, keepdims=True) + 1e-6    # dirección del borde
DT = {}
for k, (vu, vv) in VP.items():
    d = np.stack([vu - xx, vv - yy], -1).astype(np.float32); d /= np.linalg.norm(d, axis=-1, keepdims=True)
    fam = E & (np.abs((ed*d).sum(-1)) > np.cos(np.radians(10)))
    DT[k] = cv2.distanceTransform((~fam).astype(np.uint8), cv2.DIST_L2, 3)

def proj(P):
    c = (np.asarray(P) - C) @ R; return np.stack([PP[0] + F*c[..., 0]/c[..., 2], PP[1] + F*c[..., 1]/c[..., 2]], -1)

def edges(p):
    x0, y0, x1, y1, h = p
    V = {(i, j, k): np.array([(x0, x1)[i], (y0, y1)[j], (0, h)[k]]) for i in (0, 1) for j in (0, 1) for k in (0, 1)}
    faces = {"top": ([(0, 0, 1), (1, 0, 1), (1, 1, 1), (0, 1, 1)], True),
             "x0": ([(0, 0, 0), (0, 1, 0), (0, 1, 1), (0, 0, 1)], C[0] < x0), "x1": ([(1, 0, 0), (1, 1, 0), (1, 1, 1), (1, 0, 1)], C[0] > x1),
             "y0": ([(0, 0, 0), (1, 0, 0), (1, 0, 1), (0, 0, 1)], C[1] < y0), "y1": ([(0, 1, 0), (1, 1, 0), (1, 1, 1), (0, 1, 1)], C[1] > y1)}
    es = set()
    for vs, vis in faces.values():
        if vis:
            for a, b in zip(vs, vs[1:] + vs[:1]): es.add(tuple(sorted((a, b))))
    out = []
    for a, b in es:
        fam = "A" if a[0] != b[0] else "B" if a[1] != b[1] else "V"
        out.append((V[a], V[b], fam))
    return out

def cost(p, p0, T=6.0, lam=0.002):
    if p[2] - p[0] < 2 or p[3] - p[1] < 2 or p[4] < 1: return 1e9
    s, n = 0.0, 0
    for a, b, fam in edges(p):
        uv = proj(np.linspace(a, b, 40)); u, v = uv[:, 0], uv[:, 1]
        ok = (u >= 0) & (u < W - 1) & (v >= 0) & (v < H - 1)
        if ok.sum() < 3: continue
        d = DT[fam][v[ok].astype(int), u[ok].astype(int)]; s += (np.minimum(d, T)**2).sum(); n += ok.sum()
    return s/max(n, 1) + lam*((np.array(p) - p0)**2).sum()

res = {}; vis = img.copy()
for name, b in J["boxes"].items():
    if name in J.get("skip", []): continue
    p0 = np.array([b[0], b[1], b[2], b[3], b[5]])
    c0 = cost(p0, p0)
    best = None
    for dh in (0.0, -4.0, 4.0):                               # varias semillas de altura (mínimos locales)
        s = p0.copy(); s[4] = max(2, s[4] + dh)
        r = minimize(cost, s, args=(p0,), method="Powell", options=dict(xtol=0.02, ftol=1e-4, maxiter=4000))
        if best is None or r.fun < best.fun: best = r
    p = best.x; res[name] = dict(old=p0.round(2).tolist(), new=p.round(2).tolist(), c0=round(c0, 2), c1=round(best.fun, 2))
    print(f"{name:22s} coste {c0:6.2f} → {best.fun:6.2f}   Δ = {np.round(p - p0, 1).tolist()}")
    for col, q in (((0, 0, 255), p0), ((0, 255, 0), p)):
        for a, bb, fam in edges(q):
            u = proj(np.array([a, bb])); cv2.line(vis, tuple(u[0].astype(int)), tuple(u[1].astype(int)), col, 1)
json.dump(res, open(jout, "w"), indent=1); cv2.imwrite(ovl, cv2.resize(vis, None, fx=2, fy=2, interpolation=cv2.INTER_NEAREST))
