"""Ejemplo: generador del SVG de la lámina del buque 1944 (ver lamina-tecnica/SKILL.md). `--sin-datos` omite la columna de datos (viewBox 262 0 938 452).
Las tres vistas (PNG de aristas) se colocan por proyección: misma escala, proa alineada en altura con el alzado."""
import math, sys

S = 6.75                          # unidades SVG por metro
PX0, PY0 = 468.0, 26.0            # alzado: x -5.5..98.5 m, z 33..-1 m
PLY0 = 300.0                      # planta: y +8..-8 m
FX0 = 318.0                       # proa: y -8..+8 m (babor a la derecha)
def X(x): return PX0 + (x + 5.5) * S
def Y(z): return PY0 + (33.0 - z) * S
def YP(y): return PLY0 + (8.0 - y) * S
def XF(y): return FX0 + (y + 8.0) * S
f = lambda v: f"{v:.1f}"

T, LB = 5.8, 0.0
AP, FP = -1.05, 93.36             # perpendiculares: eje de mecha del timón / roda en la flotación
LOA0, LOA1 = -4.0, 96.82
B = 13.4
holds = [(12.5, 24.0), (24.0, 38.0), (57.0, 67.0), (67.0, 77.0)]

def sec_pts(n=7.15, depth=7.5, hb=6.7, N=24):
    pts = []
    for i in range(N + 1):
        t = (i / N) ** 1.6
        y = hb * (1 - (1 - t) ** n) ** (1 / n); z = t * depth
        pts.append((y, z))
    return pts

o = []
A = o.append
DATA = "--sin-datos" not in sys.argv     # sin columna de datos: los datos van en el HTML y el dibujo empieza en x=262
VB = "0 0 1200 452" if DATA else "262 0 938 452"
A(f'<svg viewBox="{VB}" role="img" aria-label="Lámina técnica ilustrativa de un buque de carga refrigerado tipo tres islas, años cuarenta: alzado, planta, vista de proa y cuaderna maestra">')
if DATA:
    # --- columna de datos (izquierda)
    A('<g fill="#9AA6FF" style="font:500 11px \'Geist Mono\',monospace;letter-spacing:.14em">')
    A('<text x="32" y="74" style="font:300 46px Geist,sans-serif;letter-spacing:-.04em">1944</text>')
    A('<text x="32" y="106">→ EMPRESA NAVIERA</text>')
    rows = [("ORIGEN", ["TABASCO Y VERACRUZ"]), ("DESTINO", ["BROWNSVILLE, TEXAS"]), ("CARGA", ["PLÁTANO Y PIÑA"]),
            ("MÉTODO", ["EMPAQUE EN CAMPO", "BODEGA REFRIGERADA"])]
    y = 158
    for k, vals in rows:
        A(f'<text x="32" y="{y}" opacity=".55">{k}</text>'); y += 18
        for v in vals: A(f'<text x="32" y="{y}">{v}</text>'); y += 18
        y += 16
    A('</g>')
    A('<g fill="#9AA6FF" style="font:500 9px \'Geist Mono\',monospace;letter-spacing:.14em" opacity=".6">')
    A('<text x="62" y="392">BODEGAS REFRIGERADAS</text><text x="62" y="408">CÁMARA DE MÁQUINAS</text>')
    A('<text x="32" y="440" opacity=".8">ESQUEMA ILUSTRATIVO</text>')
    A('</g>')
    A('<g fill="none" stroke="#9AA6FF" stroke-width=".8"><path d="M32 389 H54" stroke-dasharray="4 3" opacity=".7"/><path d="M32 405 H54" stroke-dasharray="7 3 1.5 3" opacity=".45"/></g>')
# --- escala vertical de alturas (0–30 m)
A('<g>')
for i in range(6):
    z0, z1 = i * 5, (i + 1) * 5
    A(f'<rect x="276" y="{f(Y(z1))}" width="3" height="{f(Y(z0) - Y(z1))}" fill="{"#9AA6FF" if i % 2 == 0 else "none"}" stroke="#9AA6FF" stroke-width=".6" opacity=".75"/>')
A('</g><g fill="#9AA6FF" opacity=".55" style="font:500 8px \'Geist Mono\',monospace;letter-spacing:.1em">')
for i in range(7):
    A(f'<text x="285" y="{f(Y(i * 5) + 3)}">{i * 5}</text>')
A(f'<text x="276" y="{f(Y(30) - 9)}">M</text></g>')
# --- vistas renderizadas (aristas reales del modelo)
A(f'<image href="assets/proyectos/barco-1944-alzado.png" x="{f(X(-5.5))}" y="{f(Y(33))}" width="{f(104 * S)}" height="{f(34 * S)}" preserveAspectRatio="none"/>')
A(f'<image href="assets/proyectos/barco-1944-planta.png" x="{f(X(-5.5))}" y="{f(YP(8))}" width="{f(104 * S)}" height="{f(16 * S)}" preserveAspectRatio="none"/>')
A(f'<image href="assets/proyectos/barco-1944-proa.png" x="{f(XF(-8))}" y="{f(Y(33))}" width="{f(16 * S)}" height="{f(34 * S)}" preserveAspectRatio="none"/>')
# --- capa técnica
A('<g fill="none" stroke="#9AA6FF" stroke-width=".75" stroke-linecap="round">')
# flotación y línea base
A(f'<path d="M{f(X(-5.5))} {f(Y(T))} H{f(X(98.5))} M{f(XF(-8))} {f(Y(T))} H{f(XF(8))}" stroke-dasharray="9 4" opacity=".5"/>')
A(f'<path d="M{f(X(-5.5))} {f(Y(LB))} H{f(X(98.5))}" opacity=".22"/>')
# bodegas ocultas, doble fondo y entrepuente
for x0, x1 in holds:
    A(f'<path d="M{f(X(x0))} {f(Y(1.2))} H{f(X(x1))} V{f(Y(7.4))} H{f(X(x0))} Z M{f(X(x0))} {f(Y(4.4))} H{f(X(x1))}" stroke-dasharray="4 3" opacity=".42"/>')
A(f'<path d="M{f(X(38))} {f(Y(1.2))} H{f(X(57))} V{f(Y(9.6))} H{f(X(38))} Z" stroke-dasharray="7 3 1.5 3" opacity=".3"/>')
# perpendiculares y cuadernas de trazado 0–10
yb = Y(LB)
A(f'<path d="M{f(X(AP))} {f(Y(9))} V{f(yb + 16)} M{f(X(FP))} {f(Y(12))} V{f(yb + 16)}" stroke-dasharray="2 3" opacity=".45"/>')
st = ""
for i in range(11):
    xx = X(AP + (FP - AP) * i / 10); st += f"M{f(xx)} {f(yb + 4)} V{f(yb + (10 if i % 5 == 0 else 7))} "
A(f'<path d="{st}M{f(X(AP))} {f(yb + 4)} H{f(X(FP))}" opacity=".55"/>')
# eje de crujía en planta
A(f'<path d="M{f(X(-6.5))} {f(YP(0))} H{f(X(99.5))}" stroke-dasharray="12 4 2 4" opacity=".3"/>')
# cota de eslora total
yd = YP(-8) + 12
A(f'<path d="M{f(X(LOA0))} {f(YP(-6.8))} V{f(yd + 4)} M{f(X(LOA1))} {f(YP(0))} V{f(yd + 4)}" opacity=".3"/>')
xm = (X(LOA0) + X(LOA1)) / 2
A(f'<path d="M{f(X(LOA0))} {f(yd)} H{f(xm - 70)} M{f(xm + 70)} {f(yd)} H{f(X(LOA1))}" opacity=".6"/>')
A(f'<path d="M{f(X(LOA0) + 6)} {f(yd - 2.5)} L{f(X(LOA0))} {f(yd)} L{f(X(LOA0) + 6)} {f(yd + 2.5)} M{f(X(LOA1) - 6)} {f(yd - 2.5)} L{f(X(LOA1))} {f(yd)} L{f(X(LOA1) - 6)} {f(yd + 2.5)}" opacity=".6"/>')
# cota de manga bajo la vista de proa
ym = Y(-1) + 12
A(f'<path d="M{f(XF(-B / 2))} {f(Y(0))} V{f(ym + 4)} M{f(XF(B / 2))} {f(Y(0))} V{f(ym + 4)}" opacity=".3"/>')
A(f'<path d="M{f(XF(-B / 2))} {f(ym)} H{f(XF(B / 2))}" opacity=".6"/>')
A(f'<path d="M{f(XF(-B / 2) + 5)} {f(ym - 2.5)} L{f(XF(-B / 2))} {f(ym)} L{f(XF(-B / 2) + 5)} {f(ym + 2.5)} M{f(XF(B / 2) - 5)} {f(ym - 2.5)} L{f(XF(B / 2))} {f(ym)} L{f(XF(B / 2) - 5)} {f(ym + 2.5)}" opacity=".6"/>')
# cota de calado junto a la proa
xc = XF(8) + 14
A(f'<path d="M{f(xc)} {f(Y(0))} V{f(Y(T))}" opacity=".6"/><path d="M{f(xc - 2.5)} {f(Y(0) - 5)} L{f(xc)} {f(Y(0))} L{f(xc + 2.5)} {f(Y(0) - 5)} M{f(xc - 2.5)} {f(Y(T) + 5)} L{f(xc)} {f(Y(T))} L{f(xc + 2.5)} {f(Y(T) + 5)}" opacity=".6"/>')
# cuaderna maestra (misma escala, centrada bajo la vista de proa)
cx, ky = XF(0), 404.0
pts = sec_pts()
def SX(yy): return cx + yy * S
def SY(zz): return ky - zz * S
R = " ".join(f"{f(SX(yy))},{f(SY(zz))}" for yy, zz in pts)
Lp = " ".join(f"{f(SX(-yy))},{f(SY(zz))}" for yy, zz in reversed(pts))
A(f'<polyline points="{Lp} {R}" opacity=".85"/>')
cam = " ".join(f"{f(SX(yy))},{f(SY(7.5 + .15 * (1 - (yy / 6.7) ** 2)))}" for yy in [-6.7 + 13.4 * i / 20 for i in range(21)])
A(f'<polyline points="{cam}" opacity=".85"/>')
A(f'<path d="M{f(SX(-6.6))} {f(SY(1.2))} H{f(SX(6.6))} M{f(SX(-6.7))} {f(SY(4.4))} H{f(SX(6.7))}" opacity=".55"/>')
A(f'<path d="M{f(SX(-3.3))} {f(SY(7.6))} V{f(SY(8.55))} H{f(SX(3.3))} V{f(SY(7.6))}" opacity=".7"/>')
A(f'<path d="M{f(cx)} {f(SY(-.6))} V{f(SY(9.3))}" stroke-dasharray="6 3 1.5 3" opacity=".35"/>')
A(f'<path d="M{f(SX(-7.6))} {f(SY(T))} H{f(SX(7.6))}" stroke-dasharray="6 3" opacity=".45"/>')
A('</g>')
# --- rótulos (mínimos, en los márgenes de cada vista)
A('<g fill="#9AA6FF" style="font:500 8.5px \'Geist Mono\',monospace;letter-spacing:.14em">')
A(f'<text x="{f(X(-5.5))}" y="16" opacity=".6">ALZADO · ESTRIBOR</text>')
A(f'<text x="{f(XF(0))}" y="16" text-anchor="middle" opacity=".6">PROA</text>')
A(f'<text x="{f(X(FP) + 8)}" y="{f(Y(T) - 5)}" opacity=".55">LF 5.80</text>')
A(f'<text x="{f(X(AP))}" y="{f(yb + 22)}" text-anchor="middle" opacity=".55">PPp</text><text x="{f(X(FP))}" y="{f(yb + 22)}" text-anchor="middle" opacity=".55">PPr</text>')
for i in (5,):
    A(f'<text x="{f(X(AP + (FP - AP) * i / 10))}" y="{f(yb + 22)}" text-anchor="middle" opacity=".45">5</text>')
A(f'<text x="{f(xm)}" y="{f(yd + 3)}" text-anchor="middle" opacity=".75">ESLORA TOTAL 100.80 M</text>')
A(f'<text x="{f(XF(0))}" y="{f(ym + 13)}" text-anchor="middle" opacity=".75">MANGA 13.40</text>')
A(f'<text x="{f(xc + 5)}" y="{f((Y(0) + Y(T)) / 2)}" opacity=".75" transform="rotate(-90 {f(xc + 5)} {f((Y(0) + Y(T)) / 2)})" text-anchor="middle" dy="7">CALADO 5.80</text>')
A(f'<text x="{f(X(-5.5))}" y="440" opacity=".6">PLANTA · CUBIERTA</text>')
A(f'<text x="{f(cx)}" y="{f(ky + 16)}" text-anchor="middle" opacity=".6">CUADERNA MAESTRA</text>')
A(f'<text x="{f(X(98.5))}" y="440" text-anchor="end" opacity=".6">BUQUE REFRIGERADO · TRES ISLAS · LÁMINA 01</text>')
A('</g>')
A('</svg>')
sys.stdout.write("".join(o))
