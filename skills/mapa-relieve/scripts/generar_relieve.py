#!/usr/bin/env python3
"""Genera la retícula de relieve (formato de assets/mx-relieve.json) para uno o varios países.

Contorno: Natural Earth 1:50m (world-atlas countries-50m.json, códigos ISO 3166 numéricos).
Elevación: ETOPO1 por la API pública de opentopodata.org (100 puntos por llamada, 1 llamada/s, 1000 llamadas/día).
Salida: {"step", "lon0", "lat0", "cols", "rows", "src", "pts": [[col, fila, elevación_m], …]} solo con puntos en tierra.

Uso:
  generar_relieve.py --paises 484 --paso 0.2 --salida assets/mx-relieve.json          # México (el original)
  generar_relieve.py --paises 188,591 --paso 0.1 --salida assets/cr-pa-relieve.json    # Costa Rica + Panamá
  generar_relieve.py --paises 484,840,124 --paso 0.6 --bbox -170,14,-50,72 --salida assets/norteamerica.json
Opciones: --bbox lon0,lat0,lon1,lat1 recorta (útil con EE. UU. por Alaska/Hawái); --margen grados (0.4);
          --cache archivo.json guarda elevaciones ya pedidas (para reintentar sin repetir llamadas);
          --solo-contar dice cuántos puntos y llamadas saldrían, sin llamar a la API.
Cuidar el total de puntos: prodi-relieve.js dibuja cada punto en cada cuadro; ~3 000–6 000 va fluido.
Códigos: 484 México, 840 EE. UU., 124 Canadá, 76 Brasil, 32 Argentina, 152 Chile, 170 Colombia, 604 Perú,
218 Ecuador, 862 Venezuela, 320 Guatemala, 222 El Salvador, 340 Honduras, 558 Nicaragua, 188 Costa Rica,
591 Panamá, 214 Rep. Dominicana, 858 Uruguay, 600 Paraguay, 68 Bolivia, 724 España, 620 Portugal, 250 Francia,
826 Reino Unido, 380 Italia, 156 China, 410 Corea del Sur, 356 India, 504 Marruecos, 710 Sudáfrica.
"""
import argparse, json, math, time, urllib.parse, urllib.request
from pathlib import Path

ATLAS = 'https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-50m.json'
API = 'https://api.opentopodata.org/v1/etopo1?locations='


def bajar_json(url):
    with urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': 'relieve-nuclea'}), timeout=120) as r:
        return json.load(r)


def anillos(topo, ids):
    """Polígonos (lista de anillos en lon/lat) de los países pedidos, decodificando el TopoJSON."""
    sx, sy = topo['transform']['scale']; tx, ty = topo['transform']['translate']
    arcs = []
    for a in topo['arcs']:
        x = y = 0; pts = []
        for dx, dy in a:
            x += dx; y += dy; pts.append((x * sx + tx, y * sy + ty))
        arcs.append(pts)
    def anillo(idx):
        out = []
        for i in idx:
            seg = arcs[i] if i >= 0 else arcs[~i][::-1]
            out.extend(seg if not out else seg[1:])
        return out
    polis = []
    for g in topo['objects']['countries']['geometries']:
        if str(int(g.get('id', '-1') or -1)) not in ids:
            continue
        cuerpos = [g['arcs']] if g['type'] == 'Polygon' else g['arcs'] if g['type'] == 'MultiPolygon' else []
        for p in cuerpos:
            polis.append([anillo(r) for r in p])
    return polis


def dentro(lon, lat, poli):
    """Par-impar sobre todos los anillos del polígono (el exterior y sus huecos)."""
    c = False
    for r in poli:
        j = len(r) - 1
        for i in range(len(r)):
            xi, yi = r[i]; xj, yj = r[j]
            if (yi > lat) != (yj > lat) and lon < (xj - xi) * (lat - yi) / (yj - yi) + xi:
                c = not c
            j = i
    return c


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--paises', required=True); ap.add_argument('--paso', type=float, default=0.2)
    ap.add_argument('--salida', required=True); ap.add_argument('--bbox'); ap.add_argument('--margen', type=float, default=.4)
    ap.add_argument('--cache'); ap.add_argument('--solo-contar', action='store_true', help='cuenta puntos y llamadas sin pedir elevaciones')
    a = ap.parse_args()
    ids = {str(int(x)) for x in a.paises.split(',')}
    polis = anillos(bajar_json(ATLAS), ids)
    if not polis:
        raise SystemExit('ningún país con esos códigos')
    if a.bbox:
        b0, b1, b2, b3 = map(float, a.bbox.split(','))
        polis = [p for p in polis if any(b0 <= x <= b2 and b1 <= y <= b3 for x, y in p[0])]
    xs = [x for p in polis for x, _ in p[0]]; ys = [y for p in polis for _, y in p[0]]
    s = a.paso
    lon0 = math.floor((min(xs) - a.margen) / s) * s; lat0 = math.floor((min(ys) - a.margen) / s) * s
    cols = math.ceil((max(xs) + a.margen - lon0) / s); rows = math.ceil((max(ys) + a.margen - lat0) / s)
    cajas = [(min(x for x, _ in p[0]), min(y for _, y in p[0]), max(x for x, _ in p[0]), max(y for _, y in p[0])) for p in polis]
    celdas = []
    for r in range(rows + 1):
        lat = lat0 + r * s
        for c in range(cols + 1):
            lon = lon0 + c * s
            if any(b[0] <= lon <= b[2] and b[1] <= lat <= b[3] and dentro(lon, lat, p) for b, p in zip(cajas, polis)):
                celdas.append((c, r, round(lat, 4), round(lon, 4)))
    print(f'{len(celdas)} puntos en tierra ({cols + 1}×{rows + 1}); {math.ceil(len(celdas) / 100)} llamadas a la API')
    if a.solo_contar:
        print(f'retícula lon0={round(lon0, 4)} lat0={round(lat0, 4)} cols={cols} rows={rows}'); return
    cache = json.loads(Path(a.cache).read_text()) if a.cache and Path(a.cache).exists() else {}
    falta = [x for x in celdas if f'{x[2]},{x[3]}' not in cache]
    for i in range(0, len(falta), 100):
        lote = falta[i:i + 100]
        q = '|'.join(f'{la},{lo}' for _, _, la, lo in lote)
        for intento in range(5):
            try:
                d = bajar_json(API + urllib.parse.quote(q, safe=',|'))
                break
            except Exception as e:
                time.sleep(2 + 3 * intento)
        else:
            raise SystemExit('la API no respondió; vuelve a correr con --cache para continuar')
        for (_, _, la, lo), res in zip(lote, d['results']):
            cache[f'{la},{lo}'] = res['elevation']
        if a.cache:
            Path(a.cache).write_text(json.dumps(cache))
        print(f'  {min(i + 100, len(falta))}/{len(falta)}', flush=True)
        time.sleep(1.05)
    pts = [[c, r, max(0, round(cache[f'{la},{lo}'] or 0))] for c, r, la, lo in celdas]
    out = {'step': s, 'lon0': round(lon0, 4), 'lat0': round(lat0, 4), 'cols': cols, 'rows': rows,
           'src': f'ETOPO1 via opentopodata.org; contorno Natural Earth 1:50m (world-atlas); países {a.paises}', 'pts': pts}
    Path(a.salida).write_text(json.dumps(out, separators=(',', ':')))
    print(f'listo {a.salida}: {len(pts)} puntos, elevación máx {max(p[2] for p in pts)} m')


if __name__ == '__main__':
    main()
