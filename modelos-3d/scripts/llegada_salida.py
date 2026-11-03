"""Animación "uno llega, el otro se va" en la planta Bimbo.

El camión 2025 entra por la calle, cruza la puerta del patio, pasa frente a los andenes y se mete en reversa al
andén 0. A un costado, el tráiler full sale del andén 2, cruza el patio en sentido contrario, sale por la puerta
y se va por la calle. Alrededor: calles con banquetas y rayas, cerca del patio, tráileres estacionados en otros
andenes, árboles y volúmenes de manzanas vecinas.

Toma los modelos empaquetados de modelos-3d/ (planta, camión 2025 y tráiler). Unidades en metros; la planta ya está en metros
reales y los camioncitos se escalan a tamaño real aproximado (2025 ≈ 7 m, tráiler ≈ 13.6 m).
Ejecutar dentro de Blender, con un archivo vacío: exec(open(ESTE).read(), {'D': '<ruta a modelos-3d>/'}).
"""
import bpy, bmesh, math, random
from mathutils import Vector, Matrix

D = globals()['D']
FPS, F0, F1 = 25, 1, 500
scn = bpy.context.scene
scn.render.fps = FPS; scn.frame_start = F0; scn.frame_end = F1


def rgb(h):
    h = h.lstrip('#'); s = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    return [((c / 12.92) if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4) for c in s] + [1]


def mat(name, hexc, rough=0.7, metal=0.0):
    m = bpy.data.materials.get(name) or bpy.data.materials.new(name); m.use_nodes = True
    b = next(n for n in m.node_tree.nodes if n.type == 'BSDF_PRINCIPLED')
    b.inputs['Base Color'].default_value = rgb(hexc); b.inputs['Roughness'].default_value = rough; b.inputs['Metallic'].default_value = metal
    return m


def coleccion(name):
    c = bpy.data.collections.get(name) or bpy.data.collections.new(name)
    if c.name not in scn.collection.children: scn.collection.children.link(c)
    return c


AMB = coleccion('Ambiente')


def caja(name, x0, x1, y0, y1, z0, z1, m, col=AMB):
    bm = bmesh.new(); bmesh.ops.create_cube(bm, size=1)
    bmesh.ops.scale(bm, vec=(x1 - x0, y1 - y0, z1 - z0), verts=bm.verts)
    bmesh.ops.translate(bm, vec=((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2), verts=bm.verts)
    me = bpy.data.meshes.new(name); bm.to_mesh(me); bm.free(); me.materials.append(m)
    o = bpy.data.objects.new(name, me); col.objects.link(o); return o


def anexar(archivo, nombre):
    with bpy.data.libraries.load(archivo, link=False) as (src, dst):
        dst.collections = [nombre]
    c = dst.collections[0]; scn.collection.children.link(c); return c


# ---------------------------------------------------------------- modelos
planta = anexar(D + 'planta-bimbo.blend', 'Planta_Bimbo')
c25 = anexar(D + 'camion-bimbo-2025.blend', 'Camion_2025')
ctr = anexar(D + 'trailer-full.blend', 'Camion_trailer')
ctr_fijo = anexar(D + 'trailer-full.blend', 'Camion_trailer')     # copia fuente para los estacionados
c25_fijo = anexar(D + 'camion-bimbo-2025.blend', 'Camion_2025')
for c in (ctr_fijo, c25_fijo):   # fuentes de instancias: fuera de la capa de vista (sus instancias sí se ven)
    lc = bpy.context.view_layer.layer_collection.children.get(c.name)
    if lc: lc.exclude = True
root = lambda c: next(o for o in c.objects if o.type == 'EMPTY' and o.parent is None)
R25, RTR = root(c25), root(ctr)
S25, STR = 1.8, 2.3
R25.scale = (S25,) * 3; RTR.scale = (STR,) * 3
REAR25, REARTR = 2.22 * S25, 3.09 * STR          # del origen a la defensa trasera


def llantas_rodando(col):
    """Pone el origen de cada llanta en su centro para poder girarlas sobre su eje (Y local)."""
    out = []
    for o in col.objects:
        if not o.name.startswith('Llanta') or o.type != 'MESH': continue
        vs = [v.co for v in o.data.vertices]
        c = Vector((sum(v.x for v in vs) / len(vs), sum(v.y for v in vs) / len(vs), sum(v.z for v in vs) / len(vs)))
        r = max(v.z for v in vs) - c.z
        o.data.transform(Matrix.Translation(-c)); o.location = o.location + c
        out.append((o, r))
    return out


W25, WTR = llantas_rodando(c25), llantas_rodando(ctr)

# ---------------------------------------------------------------- piso, patio, calles
m_pasto = mat('A_pasto', '#9fb36f', 0.9); m_patio = mat('A_concreto', '#cfcdc6', 0.85); m_asf = mat('A_asfalto', '#55585c', 0.9)
m_banq = mat('A_banqueta', '#dcdad3', 0.85); m_raya = mat('A_raya', '#f4f3ee', 0.6); m_amar = mat('A_raya_amarilla', '#e8b931', 0.6)
m_cerca = mat('A_cerca', '#9ea3a6', 0.5, 0.4); m_tronco = mat('A_tronco', '#6b5240', 0.8); m_hoja = mat('A_ciprés', '#5f7f47', 0.8)
caja('Piso_pasto', -220, 200, -140, 220, -0.2, -0.06, m_pasto)
caja('Patio_planta', -140, 10, -24, 61.5, -0.06, 0.0, m_patio)
# calle A (a lo largo de Y, frente a la planta) y calle B (a lo largo de X, detrás del patio)
caja('Calle_A', 12, 26, -140, 220, -0.06, 0.0, m_asf); caja('Banqueta_A1', 10, 12, -140, 64, 0, 0.15, m_banq); caja('Banqueta_A2', 26, 28, -140, 220, 0, 0.15, m_banq)
caja('Calle_B', -220, 12, 64, 78, -0.06, 0.0, m_asf); caja('Banqueta_B1', -220, 10, 61.5, 64, 0, 0.15, m_banq); caja('Banqueta_B2', -220, 12, 78, 80, 0, 0.15, m_banq)
caja('Cruce', 10, 28, 62, 80, -0.055, 0.005, m_asf)
for y in range(-136, 216, 8):
    if 62 < y < 80: continue
    caja('Raya_A', 18.9, 19.1, y, y + 4, 0.0, 0.01, m_amar)
for x in range(-216, 8, 8): caja('Raya_B', x, x + 4, 70.9, 71.1, 0.0, 0.01, m_amar)
caja('Raya_paso', 12, 26, 60.2, 61.2, 0.0, 0.012, m_raya); caja('Raya_alto', 12.5, 18.5, 59.0, 59.6, 0.0, 0.012, m_raya)
# cerca del patio con la puerta abierta (y 43–60 en x = 10)
for (x0, x1, y0, y1) in ((-140, 10, 61.4, 61.6), (9.9, 10.1, -24, 43), (9.9, 10.1, 60, 61.6)):
    caja('Cerca', x0, x1, y0, y1, 0, 2.2, m_cerca)
caja('Caseta', 3, 8, 37, 42, 0, 3.0, mat('A_caseta', '#f1f1ee', 0.6))
caja('Pluma_puerta', 9.8, 10.2, 60, 61.5, 0, 1.2, m_amar)
# franjas de cajones pintados en el patio
for x in range(-130, -60, 4): caja('Raya_cajon', x, x + 0.15, 38, 48, 0.0, 0.01, m_raya)


def cipres(x, y, h):
    bm = bmesh.new(); bmesh.ops.create_cone(bm, cap_ends=True, segments=10, radius1=h * 0.16, radius2=0.05, depth=h * 0.85)
    bmesh.ops.translate(bm, vec=(x, y, h * 0.15 + h * 0.425), verts=bm.verts)
    me = bpy.data.meshes.new('Cipres'); bm.to_mesh(me); bm.free(); me.materials.append(m_hoja)
    for p in me.polygons: p.use_smooth = True
    o = bpy.data.objects.new('Cipres', me); AMB.objects.link(o)
    caja('Tronco', x - 0.15, x + 0.15, y - 0.15, y + 0.15, 0, h * 0.18, m_tronco)


rnd = random.Random(80)
for y in range(-100, 200, 20): cipres(29.5, y + rnd.uniform(-1, 1), rnd.uniform(6, 8))
for y in (-20, -8, 4): cipres(8.5, y, 7)

# volúmenes de las manzanas vecinas (colores suaves, alturas variadas)
pal = ['#ecebe6', '#e1e4e5']
mats = [mat(f'A_vecino_{i}', h, 0.75) for i, h in enumerate(pal)]
m_vidrio = mat('A_ventana', '#8f9ca6', 0.3, 0.2)


def manzana(x0, x1, y0, y1):
    """Volúmenes simples y bajos (4–9 m), dos tonos suaves, sin ventanas y con huecos de pasto: contexto que no
    compite con la planta."""
    x = x0
    while x < x1 - 10:
        w = rnd.uniform(22, 34); y = y0
        while y < y1 - 10:
            d = rnd.uniform(22, 34)
            if rnd.random() < 0.65:
                h = rnd.choice([4, 5, 6, 7, 9])
                caja('Vecino', x + 3, min(x + w, x1) - 3, y + 3, min(y + d, y1) - 3, 0, h, rnd.choice(mats[:2]))
            y += d
        x += w


manzana(32, 110, -130, 50); manzana(32, 110, 84, 210); manzana(-210, 8, 86, 160)
caja('Banqueta_manzanas', 28, 112, 50, 84, 0, 0.15, m_banq)

# tráileres y camiones estacionados en otros andenes (instancias de las copias fuente)
def instancia(col, x, y, yaw, s):
    e = bpy.data.objects.new('Estacionado', None); e.instance_type = 'COLLECTION'; e.instance_collection = col
    e.location = (x, y, 0); e.rotation_euler = (0, 0, yaw); e.scale = (s,) * 3; AMB.objects.link(e)
    return e


NX1 = -2.086 * 19.0                       # la nave empieza detrás del almacén (planta_bimbo.py)
ANDEN = lambda i: NX1 - 3.0 - i * 4.0     # centro de cada andén
Y_ANDEN = 31.5 + 0.6                      # cara del borde de andén
for i in (4, 5, 7, 9, 10, 12, 14, 15, 17, 19):
    instancia(ctr_fijo, ANDEN(i), Y_ANDEN + REARTR + 0.3, math.pi / 2, STR)
for i in (6, 11, 16):
    instancia(c25_fijo, ANDEN(i), Y_ANDEN + REAR25 + 0.3, math.pi / 2, S25)

# ---------------------------------------------------------------- trayectorias (segmentos rectos y arcos)
def recta(p, ang, largo): return ('L', Vector((p[0], p[1], 0)), ang, largo)
def arco(c, r, a0, a1): return ('A', Vector((c[0], c[1], 0)), r, a0, a1)     # ángulos polares (rad) del punto sobre el círculo


def muestrear(segs, paso=0.05):
    """Devuelve [(punto, dirección de avance)] cada `paso` m."""
    out = []
    for s in segs:
        if s[0] == 'L':
            _, p, ang, largo = s; d = Vector((math.cos(ang), math.sin(ang), 0))
            n = max(1, int(largo / paso))
            for k in range(n): out.append((p + d * (largo * k / n), d.copy()))
        else:
            _, c, r, a0, a1 = s; n = max(1, int(abs(a1 - a0) * r / paso)); sg = 1 if a1 > a0 else -1
            for k in range(n):
                a = a0 + (a1 - a0) * k / n
                p = c + Vector((math.cos(a), math.sin(a), 0)) * r
                d = Vector((-math.sin(a), math.cos(a), 0)) * sg
                out.append((p, d))
    return out


def en(muestras, s):
    i = min(int(s / 0.05), len(muestras) - 1); return muestras[i]


def perfil(claves, arranque='parado', final='parado'):
    """claves [(cuadro, distancia)]: interpolación suave (Hermite monótona) de la distancia recorrida.
    arranque/final: 'parado' (velocidad 0) o 'movimiento' (sigue la pendiente del primer/último tramo)."""
    fs = [k[0] for k in claves]; ss = [k[1] for k in claves]; n = len(fs)
    sec = [(ss[i + 1] - ss[i]) / (fs[i + 1] - fs[i]) for i in range(n - 1)]
    m = [0.0] * n
    for i in range(1, n - 1):
        m[i] = 0.0 if sec[i - 1] * sec[i] <= 0 else 2 / (1 / sec[i - 1] + 1 / sec[i])
    if arranque == 'movimiento': m[0] = sec[0]
    if final == 'movimiento': m[-1] = sec[-1]
    def f(t):
        if t <= fs[0]: return ss[0]
        if t >= fs[-1]: return ss[-1] + (m[-1] * (t - fs[-1]) if final == 'movimiento' else 0)
        i = max(k for k in range(n - 1) if fs[k] <= t)
        h = fs[i + 1] - fs[i]; u = (t - fs[i]) / h
        h00, h10, h01, h11 = 2 * u ** 3 - 3 * u ** 2 + 1, u ** 3 - 2 * u ** 2 + u, -2 * u ** 3 + 3 * u ** 2, u ** 3 - u ** 2
        return h00 * ss[i] + h10 * h * m[i] + h01 * ss[i + 1] + h11 * h * m[i + 1]
    return f


# camión 2025: baja por la calle A (carril x=15, hacia -Y), da vuelta a la derecha y entra al patio por y=50,
# avanza hasta pasar el andén 0, se detiene y se mete en reversa
X0_25 = ANDEN(0); RREV = 13.4; CX = X0_25 - RREV; Y_PARK = Y_ANDEN + REAR25 + 0.3; CY = Y_PARK
ida25 = muestrear([recta((15, 96), -math.pi / 2, 40), arco((9, 56), 6, 0, -math.pi / 2), recta((9, 50), math.pi, 9 - CX)])
rev25 = muestrear([arco((CX, CY), RREV, math.pi / 2, 0)])      # de (CX, 50) a (X0, CY); se avanza en reversa
L_ida25 = len(ida25) * 0.05; L_rev25 = len(rev25) * 0.05
p_ida25 = perfil([(1, 0), (95, 30), (135, 40.5), (175, 52), (300, L_ida25 - 12), (365, L_ida25)], arranque='movimiento')
p_rev25 = perfil([(380, 0), (420, 7), (470, L_rev25 - 1.0), (488, L_rev25)])

# tráiler: sale del andén 2 hacia +Y, vuelta a la derecha, cruza el patio hacia +X por y=56, sale por la puerta,
# vuelta a la izquierda y se va por la calle A (carril x=21, hacia +Y)
X2 = ANDEN(2); Y0_TR = Y_ANDEN + REARTR + 0.3
sal = muestrear([recta((X2, Y0_TR), math.pi / 2, 44 - Y0_TR), arco((X2 + 12, 44), 12, math.pi, math.pi / 2),
                 recta((X2 + 12, 56), 0, 11 - (X2 + 12)), arco((11, 66), 10, -math.pi / 2, 0), recta((21, 66), math.pi / 2, 160)])
L_sal = len(sal) * 0.05
p_sal = perfil([(15, 0), (70, 6), (130, 23), (240, 70), (300, 88), (500, 88 + 0.45 * 200)], final='movimiento')

for o in (R25, RTR): o.animation_data_clear()
for o, _ in W25 + WTR: o.animation_data_clear()
giro25 = 0.0; girotr = 0.0; prev25 = None; prevtr = None
for f in range(F0, F1 + 1):
    # 2025
    if f < 380:
        s = p_ida25(f); p, d = en(ida25, s); yaw = math.atan2(d.y, d.x); dist = s
    else:
        s = p_rev25(f); p, d = en(rev25, s); yaw = math.atan2(-d.y, -d.x); dist = L_ida25 - s   # reversa: mira al revés
    R25.location = (p.x, p.y, 0); R25.rotation_euler = (0, 0, yaw)
    R25.keyframe_insert('location', frame=f); R25.keyframe_insert('rotation_euler', frame=f)
    if prev25 is not None: giro25 += (dist - prev25)
    prev25 = dist
    for o, r in W25:
        o.rotation_euler = (0, giro25 / (r * S25), 0); o.keyframe_insert('rotation_euler', index=1, frame=f)
    # tráiler
    s = min(p_sal(f), L_sal - 0.1); p, d = en(sal, s)
    RTR.location = (p.x, p.y, 0); RTR.rotation_euler = (0, 0, math.atan2(d.y, d.x))
    RTR.keyframe_insert('location', frame=f); RTR.keyframe_insert('rotation_euler', frame=f)
    if prevtr is not None: girotr += (s - prevtr)
    prevtr = s
    for o, r in WTR:
        o.rotation_euler = (0, girotr / (r * STR), 0); o.keyframe_insert('rotation_euler', index=1, frame=f)
print('2025 ida', round(L_ida25, 1), 'reversa', round(L_rev25, 1), '| tráiler', round(L_sal, 1))

# ---------------------------------------------------------------- más ambiente: calle trasera, manzanas, coches, postes
caja('Calle_C', -220, 12, -42, -30, -0.06, 0.0, m_asf); caja('Banqueta_C1', -220, 12, -30, -28, 0, 0.15, m_banq)
caja('Banqueta_C2', -220, 12, -44, -42, 0, 0.15, m_banq)
for x in range(-216, 8, 8): caja('Raya_C', x, x + 4, -36.1, -35.9, 0.0, 0.01, m_amar)
caja('Pasto_frente', -140, 10, -28, -24, -0.06, 0.02, m_pasto)
manzana(-220, 8, -140, -46)
# poniente de la planta (lo que se ve detrás de los andenes al final): mismas manzanas bajas y sencillas
manzana(-330, -146, -24, 62); manzana(-330, -222, -140, -26); manzana(-330, -222, 84, 170)
caja('Piso_lejano', -600, 600, -600, 600, -0.3, -0.2, m_pasto)

m_coche = [mat(f'A_coche_{i}', h, 0.35, 0.3) for i, h in enumerate(['#f2f2f2', '#b3262b', '#8e9399', '#2f4a73', '#d8d8d8', '#5a5f66'])]
m_llanta = mat('A_llanta_coche', '#1a1b1d', 0.7); m_vid_coche = mat('A_vidrio_coche', '#2a3440', 0.15, 0.3)


def coche(x, y, yaw, m):
    e = bpy.data.objects.new('Coche', None); AMB.objects.link(e)
    for name, (x0, x1, y0, y1, z0, z1), mm in (('Carroceria', (-2.2, 2.2, -0.88, 0.88, 0.3, 1.0), m),
                                                ('Cabina', (-1.2, 1.0, -0.8, 0.8, 1.0, 1.55), m_vid_coche)):
        o = caja('Coche_' + name, x0, x1, y0, y1, z0, z1, mm); o.parent = e
    for wx in (-1.4, 1.4):
        for wy in (-0.82, 0.82):
            o = caja('Coche_llanta', wx - 0.34, wx + 0.34, wy - 0.12, wy + 0.12, 0.0, 0.68, m_llanta); o.parent = e
    e.location = (x, y, 0); e.rotation_euler = (0, 0, yaw)
    return e


for i, x in enumerate(range(-20, 0, 3)):        # estacionamiento junto al almacén
    coche(x + 1.5, 27.5, math.pi / 2, m_coche[i % len(m_coche)])
    caja('Raya_coche', x, x + 0.12, 25, 30, 0.0, 0.01, m_raya)


def coche_en_movimiento(m, x, y0, y1, f0, f1):
    """Coche por la calle A en línea recta de y0 a y1 entre los cuadros f0 y f1 (lineal)."""
    e = coche(x, y0, math.pi / 2 if y1 > y0 else -math.pi / 2, m)
    for f, y in ((f0, y0), (f1, y1)):
        e.location = (x, y, 0); e.keyframe_insert('location', frame=f)
    for fc in (e.animation_data.action.layers[0].strips[0].channelbags[0].fcurves
               if hasattr(e.animation_data.action, 'layers') else e.animation_data.action.fcurves):
        for k in fc.keyframe_points: k.interpolation = 'LINEAR'
    return e


coche_en_movimiento(m_coche[1], 21, -140, 220, 1, 200)      # sube antes de que salga el tráiler
coche_en_movimiento(m_coche[3], 15, 170, -140, 60, 360)     # baja detrás del 2025

m_poste = mat('A_poste', '#8f9498', 0.4, 0.6); m_lampara = mat('A_lampara', '#f5f3e8', 0.3)
for x in range(-110, 10, 40):
    caja('Poste_luz', x - 0.15, x + 0.15, 60.5, 60.8, 0, 9, m_poste); caja('Lampara', x - 0.3, x + 0.3, 58.8, 60.8, 8.8, 9.1, m_lampara)

# ---------------------------------------------------------------- cielo, sol y cámara
w = bpy.data.worlds.get('Cielo') or bpy.data.worlds.new('Cielo'); scn.world = w; w.use_nodes = True; nt = w.node_tree
for n in list(nt.nodes):
    if n.type != 'OUTPUT_WORLD': nt.nodes.remove(n)
out = next(n for n in nt.nodes if n.type == 'OUTPUT_WORLD')
bc = nt.nodes.new('ShaderNodeBackground'); bc.inputs['Color'].default_value = rgb('#dfe7ef')
bl = nt.nodes.new('ShaderNodeBackground'); bl.inputs['Color'].default_value = rgb('#b8c8dc'); bl.inputs['Strength'].default_value = 0.7
lp = nt.nodes.new('ShaderNodeLightPath'); mx = nt.nodes.new('ShaderNodeMixShader')
nt.links.new(lp.outputs['Is Camera Ray'], mx.inputs[0]); nt.links.new(bl.outputs[0], mx.inputs[1]); nt.links.new(bc.outputs[0], mx.inputs[2])
nt.links.new(mx.outputs[0], out.inputs['Surface'])
if not bpy.data.objects.get('Sol'):
    sd = bpy.data.lights.new('Sol', 'SUN'); sd.energy = 3.4; sd.angle = math.radians(6); sd.color = (1.0, 0.97, 0.93)
    so = bpy.data.objects.new('Sol', sd); scn.collection.objects.link(so); so.rotation_euler = (math.radians(42), 0, math.radians(205))
scn.view_settings.view_transform = 'Standard'
cam = bpy.data.objects.get('Camara')
if not cam:
    cd = bpy.data.cameras.new('Cam'); cd.lens = 28; cd.clip_end = 2000
    cam = bpy.data.objects.new('Camara', cd); scn.collection.objects.link(cam)
scn.camera = cam; cam.animation_data_clear()
for f, loc, t in ((1, (52, 104, 34), (-12, 46, 2)), (300, (36, 92, 29), (-24, 44, 2)), (500, (6, 78, 21), (-46, 38, 1))):
    cam.location = Vector(loc); cam.rotation_euler = (Vector(t) - cam.location).to_track_quat('-Z', 'Y').to_euler()
    cam.keyframe_insert('location', frame=f); cam.keyframe_insert('rotation_euler', frame=f)
for fc in (cam.animation_data.action.layers[0].strips[0].channelbags[0].fcurves
           if hasattr(cam.animation_data.action, 'layers') else cam.animation_data.action.fcurves):
    for k in fc.keyframe_points: k.interpolation = 'BEZIER'; k.handle_left_type = 'AUTO_CLAMPED'; k.handle_right_type = 'AUTO_CLAMPED'
scn.render.resolution_x, scn.render.resolution_y = 1920, 1080
