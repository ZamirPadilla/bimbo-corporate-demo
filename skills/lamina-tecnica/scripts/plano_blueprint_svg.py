#!/usr/bin/env python3
"""Plano territorial (JSON de plano_desde_foto.py) → SVG con estilo blueprint (#9AA6FF sobre #171726).

Mismas coordenadas que la foto (viewBox = w × h del JSON), así el SVG queda registrado con ella y sirve
para la cortina plano → obra de las tarjetas de Activos. Trazos con vector-effect non-scaling-stroke:
el grosor es en píxeles de pantalla sin importar a qué tamaño se muestre.

Uso: python3 plano_blueprint_svg.py nauka-plano.json canuva-blueprint.svg [--k 0.8]
  --k  factor de grosor de línea (1 = mismos px que el hero de Destinos; la tarjeta usa ~0.8)
"""
import argparse, json

L = '154,166,255'          # #9AA6FF
BG, SEA, WATER = '#171726', '#1B1D34', '#1E2242'


def d_of(a, closed):
    pts = ' '.join(f'{a[i]:.1f},{a[i + 1]:.1f}' for i in range(0, len(a) - 1, 2))
    return f'M{pts}' + ('Z' if closed else '')


def many(lst, closed):
    return ''.join(d_of(a, closed) for a in lst if len(a) >= 4)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('src'); ap.add_argument('out'); ap.add_argument('--k', type=float, default=.8)
    o = ap.parse_args()
    D = json.load(open(o.src))
    W, H, k = D['w'], D['h'], o.k
    lw = lambda v: f'{v * k:.2f}'
    Z = D['zones']
    sea = many(D['sea'], True)
    minor = ''.join(d_of(c['p'], False) for c in D['contours'] if not c['m'])
    major = ''.join(d_of(c['p'], False) for c in D['contours'] if c['m'])
    hatch = ''.join(f'M-20,{y}H{W + 20}' for y in range(6, H, 10))
    st = lambda d, w, a, extra='': f'<path d="{d}" fill="none" stroke="rgba({L},{a})" stroke-width="{lw(w)}" {extra}/>' if d else ''
    fl = lambda d, fill, w=0, a=0, extra='': (f'<path d="{d}" fill="{fill}"' + (f' stroke="rgba({L},{a})" stroke-width="{lw(w)}"' if w else '') + f' {extra}/>') if d else ''
    dash = f'stroke-dasharray="{5 * k:.1f} {3 * k:.1f}"'
    out = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">
<defs>
<style>path{{vector-effect:non-scaling-stroke;stroke-linejoin:round;stroke-linecap:round}}</style>
<clipPath id="sea"><path d="{sea}" clip-rule="evenodd"/></clipPath>
<clipPath id="land"><path d="M-400,-400H{W + 400}V{H + 400}H-400Z{sea}" clip-rule="evenodd"/></clipPath>
<pattern id="dots" width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r=".6" fill="rgba({L},.38)"/></pattern>
<pattern id="diag" width="8" height="8" patternUnits="userSpaceOnUse"><path d="M0,8L8,0" stroke="rgba({L},.26)" stroke-width=".7" fill="none"/></pattern>
<pattern id="wave" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M1,5Q3.5,3 6,5" stroke="rgba({L},.32)" stroke-width=".6" fill="none"/></pattern>
</defs>
<rect x="-10" y="-10" width="{W + 20}" height="{H + 20}" fill="{BG}"/>
{fl(sea, SEA, extra='fill-rule="evenodd"')}
<g clip-path="url(#sea)">{st(hatch, .8, .1, f'stroke-dasharray="{3 * k:.1f} {7 * k:.1f}"')}{st(''.join(d_of(b['p'], False) for b in D['bathy']), .8, .12)}</g>
<g clip-path="url(#land)">{st(minor, .8, .16)}{st(major, 1.5, .42)}</g>
{fl(many(D['fields'], True), f'rgba({L},.03)', .7, .22)}{st(many(D['flines'], False), .7, .15)}
{fl(many(D['sand'], True), f'rgba({L},.07)', .6, .24)}
{fl(many(D['rough'], True), f'rgba({L},.04)', .7, .26)}
{fl(many(Z['golf'], True), 'url(#dots)', 1, .55, dash)}
{fl(many(D['golf'], True), f'rgba({L},.16)', .9, .62)}
{fl(many(Z['resort'], True), 'url(#diag)', 1, .55, dash)}
{fl(many(D['water'], True), WATER, .9, .7)}
{st(many(D['roads'], False), 3, .5)}{f'<path d="{many(D["roads"], False)}" fill="none" stroke="{BG}" stroke-width="{lw(1.2)}"/>'}
{fl(many(D['blds'], True), f'rgba({L},.72)')}
{fl(many(D.get('pools', []), True), WATER, .6, .7)}
{fl(many(Z['basin'], True), WATER)}{fl(many(Z['basin'], True), 'url(#wave)')}
{st(many(D['docks'], False), 1, .78)}
{st(many(D['coast'], False), 1.9, .92)}
</svg>
'''
    open(o.out, 'w').write(out)
    print(o.out, len(out) // 1024, 'KB')


if __name__ == '__main__':
    main()
