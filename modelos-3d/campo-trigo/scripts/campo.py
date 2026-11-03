"""Campo de trigo Bimbo en mini-planeta: estilo juguete suave del planeta Ventures + luz del banner
"Horneando el futuro" (atardecer a contraluz, bruma cálida, desenfoque).

Se ejecuta sin interfaz:  blender -b --python campo.py -- [--salida archivo.blend]
Construye todo desde cero en una escena vacía. Medidas en metros; planeta de radio R.
"""
import bpy, bmesh, math, random, sys, os
import numpy as np
from mathutils import Vector, Matrix, Quaternion

P = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) + '/'   # carpeta de arriba de scripts/
R = 20.0
FPS, F_FIN = 25, 300
rnd = random.Random(7)

def rgb(h):
    h = h.lstrip('#'); s = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    return [((c / 12.92) if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4) for c in s] + [1]

def limpiar():
    bpy.ops.wm.read_homefile(use_empty=True)

def curvas(idb):
    """F-curves de un ID (Blender 5: acciones por capas/ranuras)."""
    ad = idb.animation_data
    if not ad or not ad.action: return []
    act = ad.action
    if hasattr(act, 'layers') and act.layers:
        out = []
        for ly in act.layers:
            for st in ly.strips:
                for cb in st.channelbags: out += list(cb.fcurves)
        return out
    return list(getattr(act, 'fcurves', []))

def coleccion(nombre, padre=None):
    c = bpy.data.collections.new(nombre); (padre or bpy.context.scene.collection).children.link(c); return c

def material(nombre, hexc, rough=0.5, sss=0.0, sss_hex=None, coat=0.0, variacion=None):
    m = bpy.data.materials.new(nombre); m.use_nodes = True; nt = m.node_tree
    b = next(n for n in nt.nodes if n.type == 'BSDF_PRINCIPLED')
    b.inputs['Base Color'].default_value = rgb(hexc); b.inputs['Roughness'].default_value = rough
    if sss:
        b.inputs['Subsurface Weight'].default_value = sss
        b.inputs['Subsurface Radius'].default_value = (0.04, 0.025, 0.008)
        b.inputs['Subsurface Scale'].default_value = 0.05
    if coat and 'Coat Weight' in b.inputs: b.inputs['Coat Weight'].default_value = coat
    if variacion:   # variación por instancia (Object Info > Random) entre dos tonos
        oi = nt.nodes.new('ShaderNodeObjectInfo'); r = nt.nodes.new('ShaderNodeValToRGB')
        nt.links.new(oi.outputs['Random'], r.inputs[0])
        r.color_ramp.elements[0].color = rgb(variacion[0]); r.color_ramp.elements[1].color = rgb(variacion[1])
        nt.links.new(r.outputs['Color'], b.inputs['Base Color'])
    return m

# ---------------------------------------------------------------- espiga de trigo (bmesh)
def _tubo(bm, pts, radios, lados):
    anillos = []
    for i, p in enumerate(pts):
        t = (pts[min(i + 1, len(pts) - 1)] - pts[max(i - 1, 0)]).normalized()
        q = Vector((0, 0, 1)).rotation_difference(t)
        anillos.append([bm.verts.new(p + q @ Vector((math.cos(a) * radios[i], math.sin(a) * radios[i], 0)))
                        for a in (2 * math.pi * k / lados for k in range(lados))])
    for a, b in zip(anillos[:-1], anillos[1:]):
        for k in range(lados):
            j = (k + 1) % lados; bm.faces.new((a[k], a[j], b[j], b[k]))
    return anillos

def espiga(nombre, alto, inclina, caida, n_esp, detalle, mats, semilla):
    """Tallo curvo + espiga dística (dos hileras alternadas de espiguillas con 2 granos y barbas)."""
    r = random.Random(semilla)
    bm = bmesh.new()
    lados = 6 if detalle else 4
    # tallo: curva suave que se inclina (inclina) hacia +X
    n = 10
    pts = [Vector((inclina * (t ** 2) * alto, 0, t * alto)) for t in (i / n for i in range(n + 1))]
    _tubo(bm, pts, [0.0045 - 0.0015 * (i / n) for i in range(n + 1)], lados)
    n_tallo = len(bm.faces)
    tope = pts[-1]; tan = (pts[-1] - pts[-2]).normalized()
    # la espiga sigue la tangente y cae un poco (caida, radianes) hacia +X
    eje = (Quaternion(Vector((0, 1, 0)), caida) @ tan).normalized()
    q_eje = Vector((0, 0, 1)).rotation_difference(eje)
    largo = 0.17 if detalle else 0.15
    granos, barbas = [], []
    seg_u, seg_v = (8, 6) if detalle else (5, 4)
    for i in range(n_esp):
        t = i / (n_esp - 1)
        tam = 0.55 + 0.45 * math.sin(math.pi * (0.12 + 0.8 * t))        # más chicas en la punta y en la base
        lado = 1 if i % 2 == 0 else -1
        base = Vector((0, 0, t * largo * 0.92))
        for g in ((-1, 1) if detalle else (0,)):
            rot = Matrix.Rotation(lado * math.radians(32), 4, 'Y') @ Matrix.Rotation(g * math.radians(18), 4, 'X')
            off = Vector((lado * 0.0055, g * 0.004, 0))
            M = (Matrix.Translation(tope + q_eje @ (base + off)) @ q_eje.to_matrix().to_4x4() @ rot
                 @ Matrix.Diagonal((0.0075 * tam, 0.0062 * tam, 0.0145 * tam, 1)))
            res = bmesh.ops.create_uvsphere(bm, u_segments=seg_u, v_segments=seg_v, radius=1.0, matrix=M)
            granos += [f for f in {f for v in res['verts'] for f in v.link_faces}]
        if detalle:   # barba: cono fino desde la punta de la espiguilla
            L = 0.07 + 0.05 * t + r.uniform(-0.01, 0.01)
            rot = Matrix.Rotation(lado * math.radians(24 + 10 * (1 - t)), 4, 'Y')
            pie = tope + q_eje @ (base + Vector((lado * 0.008, 0, 0.012 * tam)))
            M = Matrix.Translation(pie) @ q_eje.to_matrix().to_4x4() @ rot @ Matrix.Translation((0, 0, L / 2))
            res = bmesh.ops.create_cone(bm, cap_ends=False, segments=3, radius1=0.0011, radius2=0.0002, depth=L, matrix=M)
            barbas += [f for f in {f for v in res['verts'] for f in v.link_faces}]
    # hojas: dos cintas que salen del tallo y se arquean
    hojas = []
    if detalle:
        for h, ang in ((0.32, 0.4), (0.55, 3.4)):
            base = Vector((inclina * h * h * alto, 0, h * alto)); d = Vector((math.cos(ang), math.sin(ang), 0))
            fila = []
            for k in range(7):
                s = k / 6; c = base + d * (0.24 * s) + Vector((0, 0, 0.10 * s - 0.16 * s * s))
                w = 0.011 * math.sin(math.pi * (0.15 + 0.85 * s)) + 0.001
                perp = d.cross(Vector((0, 0, 1))).normalized()
                fila.append((bm.verts.new(c + perp * w), bm.verts.new(c - perp * w)))
            for a, b in zip(fila[:-1], fila[1:]): hojas.append(bm.faces.new((a[0], b[0], b[1], a[1])))
    bm.faces.ensure_lookup_table()
    for f in granos: f.material_index = 1; f.smooth = True
    for f in barbas: f.material_index = 2
    for f in hojas: f.material_index = 3
    for f in bm.faces[:n_tallo]: f.smooth = True
    me = bpy.data.meshes.new(nombre); bm.to_mesh(me); bm.free()
    for m in mats: me.materials.append(m)
    return bpy.data.objects.new(nombre, me)

# ---------------------------------------------------------------- planeta con parcelas y camino
def planeta(mats_suelo, eje_camino, polo=Vector((0, 0, 1))):
    bm = bmesh.new(); bmesh.ops.create_icosphere(bm, subdivisions=7, radius=R)
    me = bpy.data.meshes.new('planeta'); bm.to_mesh(me); bm.free()
    P_ = np.array([v.co[:] for v in me.vertices]); U = P_ / np.linalg.norm(P_, axis=1, keepdims=True)
    # parcelas: Voronoi sobre la esfera; dentro del casquete del polo casi todo es trigo
    nc = 70; rs = np.random.default_rng(3)
    semillas = rs.normal(size=(nc, 3)); semillas /= np.linalg.norm(semillas, axis=1, keepdims=True)
    celda = np.argmax(U @ semillas.T, axis=1)
    lat = U @ np.array(polo[:])
    tipo_c = rs.choice([0, 1, 2], size=nc, p=[0.68, 0.2, 0.12])       # 0 trigo, 1 pasto, 2 tierra arada
    tipo = tipo_c[celda]; tipo[lat < 0.15] = 1                        # fuera del casquete: pasto
    # bordes de parcela: franja de pasto entre celdas vecinas (seto bajo)
    d2 = np.sort(U @ semillas.T, axis=1)
    borde = (d2[:, -1] - d2[:, -2]) < 0.006
    a = np.array(eje_camino[:]); dist_camino = np.abs(U @ a) * R
    camino = dist_camino < 1.1
    trigo = ((tipo == 0) & ~borde & (dist_camino > 1.8)).astype(np.float32)
    # relieve suave (no en el camino)
    ruido = (np.sin(U[:, 0] * 7.1 + 1.3) * np.sin(U[:, 1] * 6.3) * np.sin(U[:, 2] * 5.7 + 0.7))
    alto = 0.35 * ruido * (1 - camino)
    P2 = U * (R + alto)[:, None]
    for v, p in zip(me.vertices, P2): v.co = p
    for nombre, val in (('trigo', trigo), ('pasto', ((tipo == 1) | borde).astype(np.float32)),
                        ('tierra', (tipo == 2).astype(np.float32)), ('camino', camino.astype(np.float32))):
        at = me.attributes.new(nombre, 'FLOAT', 'POINT'); at.data.foreach_set('value', val)
    for p in me.polygons: p.use_smooth = True
    o = bpy.data.objects.new('Planeta', me)
    # material del suelo: mezcla por atributos
    m = bpy.data.materials.new('M_suelo'); m.use_nodes = True; nt = m.node_tree
    b = next(n for n in nt.nodes if n.type == 'BSDF_PRINCIPLED'); b.inputs['Roughness'].default_value = 0.9
    col = None
    base = nt.nodes.new('ShaderNodeRGB'); base.outputs[0].default_value = rgb(mats_suelo['trigo']); col = base.outputs[0]
    for clave in ('pasto', 'tierra', 'camino'):
        at = nt.nodes.new('ShaderNodeAttribute'); at.attribute_name = clave
        c = nt.nodes.new('ShaderNodeRGB'); c.outputs[0].default_value = rgb(mats_suelo[clave])
        mx = nt.nodes.new('ShaderNodeMix'); mx.data_type = 'RGBA'
        nt.links.new(at.outputs['Fac'], mx.inputs['Factor']); nt.links.new(col, mx.inputs['A']); nt.links.new(c.outputs[0], mx.inputs['B'])
        col = mx.outputs['Result']
    # surcos en la tierra arada y textura sutil en todo
    nz = nt.nodes.new('ShaderNodeTexNoise'); nz.inputs['Scale'].default_value = 60
    mul = nt.nodes.new('ShaderNodeMix'); mul.data_type = 'RGBA'; mul.blend_type = 'MULTIPLY'; mul.inputs['Factor'].default_value = 0.18
    nt.links.new(col, mul.inputs['A']); nt.links.new(nz.outputs['Color'], mul.inputs['B'])
    nt.links.new(mul.outputs['Result'], b.inputs['Base Color'])
    me.materials.append(m)
    return o

# ---------------------------------------------------------------- reparto de trigo con viento (Geometry Nodes)
def gn_trigo(col_cerca, col_lejos, heroe, claro, radio_claro=0.9, densidad=55.0, radio_heroe=7.0):
    ng = bpy.data.node_groups.new('GN_trigo', 'GeometryNodeTree'); I = ng.interface
    I.new_socket('Geometry', in_out='INPUT', socket_type='NodeSocketGeometry')
    I.new_socket('Geometry', in_out='OUTPUT', socket_type='NodeSocketGeometry')
    N, L = ng.nodes, ng.links
    gi = N.new('NodeGroupInput'); go = N.new('NodeGroupOutput')
    def mth(op, a, b=None):
        m = N.new('ShaderNodeMath'); m.operation = op
        for i, v in enumerate((a, b)):
            if v is None: continue
            if isinstance(v, (int, float)): m.inputs[i].default_value = v
            else: L.new(v, m.inputs[i])
        return m.outputs[0]
    sc = N.new('GeometryNodeSeparateComponents'); L.new(gi.outputs[0], sc.inputs[0])
    at = N.new('GeometryNodeInputNamedAttribute'); at.data_type = 'FLOAT'; at.inputs['Name'].default_value = 'trigo'
    pos = N.new('GeometryNodeInputPosition')
    dh = N.new('ShaderNodeVectorMath'); dh.operation = 'DISTANCE'; L.new(pos.outputs[0], dh.inputs[0]); dh.inputs[1].default_value = heroe
    # más denso cerca de la cámara macro, para que el primer plano sea un bosque de espigas
    dc = N.new('ShaderNodeVectorMath'); dc.operation = 'DISTANCE'; L.new(pos.outputs[0], dc.inputs[0]); dc.inputs[1].default_value = claro
    tclaro = N.new('GeometryNodeInputSceneTime')
    r_eff = mth('MULTIPLY', radio_claro, mth('LESS_THAN', tclaro.outputs['Frame'], 110))
    boost = mth('MULTIPLY', 3.0, mth('GREATER_THAN', dc.outputs['Value'], r_eff))   # claro frente a la cámara macro
    dist = N.new('GeometryNodeDistributePointsOnFaces'); dist.distribute_method = 'POISSON'
    L.new(sc.outputs['Mesh'], dist.inputs['Mesh']); dist.inputs['Distance Min'].default_value = 0.06
    dist.inputs['Density Max'].default_value = densidad * 3
    L.new(mth('MULTIPLY', at.outputs['Attribute'], mth('DIVIDE', boost, 3.0)), dist.inputs['Density Factor'])
    dist.inputs['Seed'].default_value = 11
    # viento: inclinación sobre el eje local X con un ruido que viaja por el campo
    t = N.new('GeometryNodeInputSceneTime')
    pos2 = N.new('GeometryNodeInputPosition')
    vel = N.new('ShaderNodeCombineXYZ'); L.new(mth('MULTIPLY', t.outputs['Seconds'], 2.2), vel.inputs['X']); L.new(mth('MULTIPLY', t.outputs['Seconds'], 0.9), vel.inputs['Y'])
    sh = N.new('ShaderNodeVectorMath'); sh.operation = 'ADD'; L.new(pos2.outputs[0], sh.inputs[0]); L.new(vel.outputs[0], sh.inputs[1])
    nz = N.new('ShaderNodeTexNoise'); nz.inputs['Scale'].default_value = 0.09; nz.inputs['Detail'].default_value = 1.5
    L.new(sh.outputs[0], nz.inputs['Vector'])
    ola = mth('MULTIPLY', mth('SUBTRACT', nz.outputs['Fac'], 0.42), 0.9)          # radianes
    rnd_v = N.new('FunctionNodeRandomValue'); rnd_v.data_type = 'FLOAT'; rnd_v.inputs['Min'].default_value = -0.12; rnd_v.inputs['Max'].default_value = 0.12
    fl = N.new('FunctionNodeRandomValue'); fl.data_type = 'FLOAT'; fl.inputs['Min'].default_value = 0.0; fl.inputs['Max'].default_value = 6.28
    temblor = mth('MULTIPLY', mth('SINE', mth('ADD', mth('MULTIPLY', t.outputs['Seconds'], 3.1), fl.outputs['Value'])), 0.035)
    ang = N.new('ShaderNodeCombineXYZ'); L.new(mth('ADD', mth('ADD', ola, rnd_v.outputs['Value']), temblor), ang.inputs['Y'])
    yaw = N.new('FunctionNodeRandomValue'); yaw.data_type = 'FLOAT'; yaw.inputs['Max'].default_value = 6.28
    yv = N.new('ShaderNodeCombineXYZ'); L.new(yaw.outputs['Value'], yv.inputs['Z'])
    r1 = N.new('FunctionNodeRotateRotation'); r1.rotation_space = 'LOCAL'; L.new(dist.outputs['Rotation'], r1.inputs['Rotation']); L.new(yv.outputs[0], r1.inputs['Rotate By'])
    # el viento empuja en una dirección del mundo: se aplica en el espacio global sobre el eje perpendicular al viento
    r2 = N.new('FunctionNodeRotateRotation'); r2.rotation_space = 'LOCAL'; L.new(r1.outputs[0], r2.inputs['Rotation']); L.new(ang.outputs[0], r2.inputs['Rotate By'])
    esc = N.new('FunctionNodeRandomValue'); esc.data_type = 'FLOAT'; esc.inputs['Min'].default_value = 0.85; esc.inputs['Max'].default_value = 1.15
    # cerca de la cámara: espigas detalladas; lejos: versión ligera
    cerca = mth('LESS_THAN', dh.outputs['Value'], radio_heroe)
    sep = N.new('GeometryNodeSeparateGeometry'); sep.domain = 'POINT'
    L.new(dist.outputs['Points'], sep.inputs['Geometry']); L.new(cerca, sep.inputs['Selection'])
    out = N.new('GeometryNodeJoinGeometry'); L.new(gi.outputs[0], out.inputs[0])
    for salida, colx in ((sep.outputs['Selection'], col_cerca), (sep.outputs['Inverted'], col_lejos)):
        ci = N.new('GeometryNodeCollectionInfo'); ci.inputs['Collection'].default_value = colx
        ci.inputs['Separate Children'].default_value = True; ci.inputs['Reset Children'].default_value = True
        ri = N.new('FunctionNodeRandomValue'); ri.data_type = 'INT'; ri.inputs['Max'].default_value = 99
        iop = N.new('GeometryNodeInstanceOnPoints'); iop.inputs['Pick Instance'].default_value = True
        L.new(salida, iop.inputs['Points']); L.new(ci.outputs[0], iop.inputs['Instance']); L.new(ri.outputs['Value'], iop.inputs['Instance Index'])
        L.new(r2.outputs[0], iop.inputs['Rotation']); L.new(esc.outputs['Value'], iop.inputs['Scale'])
        L.new(iop.outputs[0], out.inputs[0])
    L.new(out.outputs[0], go.inputs[0])
    return ng

# ---------------------------------------------------------------- camión Bimbo de los 40 recorriendo el camino
CAMION = os.environ.get('CAMION_40', P + '../camiones-3d/camion_40.blend')
def agregar_camion(scn, eje, polo, d_vista, escala=0.5, f0=110, f1=F_FIN):
    with bpy.data.libraries.load(CAMION, link=False) as (src, dst):
        dst.collections = ['Camion_40']
    col = dst.collections[0]; scn.collection.children.link(col)
    raiz = bpy.data.objects['Camion_40']; raiz.scale = (escala,) * 3
    a = Vector(eje[:]).normalized(); u = a.cross(polo).normalized(); v = a.cross(u).normalized()
    pos = lambda al: (u * math.cos(al) + v * math.sin(al))
    # tramo del camino más cercano a la vista final, para que el camión cruce por el frente del planeta
    al0 = max((math.radians(k) for k in range(0, 360, 2)), key=lambda al: pos(al).dot(d_vista))
    raiz.rotation_mode = 'QUATERNION'
    for f in range(f0, f1 + 1, 10):
        al = al0 - 0.30 + 0.55 * (f - f0) / (f1 - f0)
        n = pos(al); fw = (-u * math.sin(al) + v * math.cos(al)).normalized(); y = n.cross(fw)
        M = Matrix((fw, y, n)).transposed()
        raiz.location = n * (R + 0.02); raiz.rotation_quaternion = M.to_quaternion()
        raiz.keyframe_insert('location', frame=f); raiz.keyframe_insert('rotation_quaternion', frame=f)
    print('CAMPO camión en el camino, ángulo', round(math.degrees(al0)))
    return raiz

# ---------------------------------------------------------------- escena
def construir(salida_blend):
    limpiar()
    scn = bpy.context.scene; scn.render.fps = FPS; scn.frame_start = 1; scn.frame_end = F_FIN
    # materiales de la espiga (dorado de atardecer con luz que traspasa)
    m_tallo = material('M_tallo', '#c9a24e', 0.55, sss=0.45, variacion=('#b88f3e', '#d8b464'))
    m_grano = material('M_grano', '#e2ad4c', 0.55, sss=0.6, variacion=('#c99234', '#e8b85a'))
    m_barba = material('M_barba', '#efd08a', 0.45, sss=0.7)
    m_hoja = material('M_hoja', '#b9984a', 0.6, sss=0.5, variacion=('#a88a40', '#c7aa5c'))
    mats = (m_tallo, m_grano, m_barba, m_hoja)
    fuente = coleccion('Trigo_fuente'); cerca = coleccion('Trigo_cerca', fuente); lejos = coleccion('Trigo_lejos', fuente)
    for k in range(5):
        o = espiga(f'Espiga_{k}', alto=rnd.uniform(0.92, 1.08), inclina=rnd.uniform(0.02, 0.08), caida=rnd.uniform(0.05, 0.35),
                   n_esp=rnd.randint(13, 16), detalle=True, mats=mats, semilla=k)
        cerca.objects.link(o)
    for k in range(4):
        o = espiga(f'Espiga_ligera_{k}', alto=rnd.uniform(0.92, 1.08), inclina=rnd.uniform(0.02, 0.08), caida=rnd.uniform(0.05, 0.3),
                   n_esp=9, detalle=False, mats=mats, semilla=20 + k)
        lejos.objects.link(o)
    fuente.hide_render = True; fuente.hide_viewport = True

    # geometría base: polo = centro del campo; cámara macro en el borde de una parcela mirando hacia el polo
    polo = Vector((0, 0, 1))
    th0 = math.radians(38)
    n0 = Vector((-math.sin(th0), 0, math.cos(th0)))                     # normal en el punto de la cámara macro
    t0 = (polo - n0 * n0.dot(polo)).normalized()                         # mira hacia el polo, rasante
    eje_camino = Vector((0.15, 1.0, 0.25)).normalized()                 # camino: círculo máximo que cruza el campo
    suelo = {'trigo': '#b98a3e', 'pasto': '#8e9a47', 'tierra': '#7a5132', 'camino': '#b79d74'}
    pl = planeta(suelo, eje_camino, polo); scn.collection.objects.link(pl)
    # la cámara macro debe caer dentro de una parcela de trigo: buscar el punto con más trigo alrededor
    V = np.array([v.co[:] for v in pl.data.vertices]); Un = V / np.linalg.norm(V, axis=1, keepdims=True)
    tri = np.empty(len(V), np.float32); pl.data.attributes['trigo'].data.foreach_get('value', tri)
    mejor = None
    for th in np.radians(np.arange(30, 52, 2)):
        for ph in np.radians(np.arange(0, 360, 6)):
            c = np.array([math.sin(th) * math.cos(ph), math.sin(th) * math.sin(ph), math.cos(th)])
            cerca_ = (Un @ c) > math.cos(5.0 / R)
            cob = tri[cerca_].mean() if cerca_.any() else 0
            if mejor is None or cob > mejor[0] + 1e-6: mejor = (cob, th, ph)
    _, th0, ph0 = mejor; print('CAMPO macro en', round(math.degrees(th0)), round(math.degrees(ph0)), 'cobertura', round(float(mejor[0]), 2))
    n0 = Vector((math.sin(th0) * math.cos(ph0), math.sin(th0) * math.sin(ph0), math.cos(th0)))
    t0 = (polo - n0 * n0.dot(polo)).normalized()
    heroe = n0 * R + t0 * 1.6
    claro = n0 * R + t0 * 0.55 + n0.cross(t0).normalized() * 0.25   # corrido a la derecha: tercio libre para el titular
    mod = pl.modifiers.new('Trigo', 'NODES'); mod.node_group = gn_trigo(cerca, lejos, heroe, claro)
    # espigas protagonistas del macro (objetos propios, colocadas para la composición, con viento suave)
    lado0 = n0.cross(t0).normalized()
    prot = coleccion('Trigo_protagonistas')
    for k, (adelante, lat_, alto_) in enumerate(((0.82, -0.05, 1.04), (0.95, -0.15, 0.99), (0.88, -0.26, 1.06), (1.25, -0.34, 1.00), (1.35, -0.08, 1.02))):
        o = espiga(f'Protagonista_{k}', alto=alto_, inclina=rnd.uniform(0.03, 0.07), caida=rnd.uniform(0.18, 0.4), n_esp=16,
                   detalle=True, mats=mats, semilla=50 + k)
        prot.objects.link(o)
        base = n0 * R + t0 * adelante + lado0 * lat_
        hit = base.normalized() * (R + 0.4)
        o.location = base; o.rotation_mode = 'QUATERNION'
        o.rotation_quaternion = Vector((0, 0, 1)).rotation_difference(base.normalized()) @ Quaternion(Vector((0, 0, 1)), rnd.uniform(0, 6.28))
        o.rotation_mode = 'XYZ'
        o.keyframe_insert('rotation_euler', frame=1)   # vaivén: ruido sobre la rotación
        for fc in curvas(o):
            nm = fc.modifiers.new('NOISE'); nm.scale = 35; nm.strength = 0.06; nm.phase = k * 7.3 + fc.array_index * 2.1

    # sol bajo detrás del campo (contraluz desde la cámara macro) y un poco de lado
    luz = (-(t0 * math.cos(math.radians(9)) + n0 * math.sin(math.radians(9)))).normalized()
    luz = Quaternion(n0, math.radians(8)) @ luz
    sd = bpy.data.lights.new('Sol', 'SUN'); sd.energy = 7.5; sd.angle = math.radians(2.5); sd.color = (1.0, 0.62, 0.30)
    so = bpy.data.objects.new('Sol', sd); scn.collection.objects.link(so)
    so.rotation_euler = luz.to_track_quat('-Z', 'Y').to_euler()
    rd = bpy.data.lights.new('Relleno', 'SUN'); rd.energy = 0.8; rd.color = (1.0, 0.72, 0.45); rd.use_shadow = False
    ro = bpy.data.objects.new('Relleno', rd); scn.collection.objects.link(ro)
    rel = (Quaternion(n0, math.radians(110)) @ luz).normalized(); rel = (rel - n0 * 0.3).normalized()
    ro.rotation_euler = rel.to_track_quat('-Z', 'Y').to_euler()
    # cielo: degradado cálido en pantalla (ámbar abajo, malva arriba) + bruma volumétrica
    w = bpy.data.worlds.new('Atardecer'); scn.world = w; w.use_nodes = True; nt = w.node_tree
    for n in list(nt.nodes):
        if n.type != 'OUTPUT_WORLD': nt.nodes.remove(n)
    out = next(n for n in nt.nodes if n.type == 'OUTPUT_WORLD')
    tc = nt.nodes.new('ShaderNodeTexCoord'); sx = nt.nodes.new('ShaderNodeSeparateXYZ'); nt.links.new(tc.outputs['Window'], sx.inputs[0])
    rp = nt.nodes.new('ShaderNodeValToRGB'); nt.links.new(sx.outputs['Y'], rp.inputs[0])
    e = rp.color_ramp.elements; e[0].position = 0.0; e[0].color = rgb('#f3ad57'); e[1].position = 1.0; e[1].color = rgb('#4d4566')
    e.new(0.42).color = rgb('#d98a52')
    bgc = nt.nodes.new('ShaderNodeBackground'); nt.links.new(rp.outputs['Color'], bgc.inputs['Color']); bgc.inputs['Strength'].default_value = 1.0
    bga = nt.nodes.new('ShaderNodeBackground'); bga.inputs['Color'].default_value = rgb('#c98a5a'); bga.inputs['Strength'].default_value = 0.16
    lp = nt.nodes.new('ShaderNodeLightPath'); mx = nt.nodes.new('ShaderNodeMixShader')
    nt.links.new(lp.outputs['Is Camera Ray'], mx.inputs[0]); nt.links.new(bga.outputs[0], mx.inputs[1]); nt.links.new(bgc.outputs[0], mx.inputs[2])
    nt.links.new(mx.outputs[0], out.inputs['Surface'])
    # bruma: esfera de volumen (el volumen del mundo en EEVEE es infinito y se come el fondo)
    bmv = bmesh.new(); bmesh.ops.create_icosphere(bmv, subdivisions=3, radius=R * 7)
    mev = bpy.data.meshes.new('bruma'); bmv.to_mesh(mev); bmv.free()
    mv = bpy.data.materials.new('M_bruma'); mv.use_nodes = True; nv = mv.node_tree
    for n in list(nv.nodes):
        if n.type != 'OUTPUT_MATERIAL': nv.nodes.remove(n)
    vol = nv.nodes.new('ShaderNodeVolumePrincipled'); vol.inputs['Color'].default_value = rgb('#f2b06a')
    vol.inputs['Density'].default_value = 0.0012; vol.inputs['Anisotropy'].default_value = 0.7
    nv.links.new(vol.outputs[0], next(n for n in nv.nodes if n.type == 'OUTPUT_MATERIAL').inputs['Volume'])
    mev.materials.append(mv); ov = bpy.data.objects.new('Bruma', mev); scn.collection.objects.link(ov)
    # disco del sol: esfera emisiva lejana en la dirección de la luz (se lee el contraluz)
    S = -luz
    bms = bmesh.new(); bmesh.ops.create_uvsphere(bms, u_segments=24, v_segments=12, radius=4)
    mes = bpy.data.meshes.new('sol_disco'); bms.to_mesh(mes); bms.free()
    ms = bpy.data.materials.new('M_sol'); ms.use_nodes = True; ns = ms.node_tree
    for n in list(ns.nodes):
        if n.type != 'OUTPUT_MATERIAL': ns.nodes.remove(n)
    em = ns.nodes.new('ShaderNodeEmission'); em.inputs['Color'].default_value = rgb('#ffc477'); em.inputs['Strength'].default_value = 18
    ns.links.new(em.outputs[0], next(n for n in ns.nodes if n.type == 'OUTPUT_MATERIAL').inputs['Surface'])
    mes.materials.append(ms); od = bpy.data.objects.new('Sol_disco', mes); scn.collection.objects.link(od)
    od.location = S * 130; od.visible_shadow = False
    bmh = bmesh.new(); bmesh.ops.create_uvsphere(bmh, u_segments=32, v_segments=16, radius=26)
    meh = bpy.data.meshes.new('sol_halo'); bmh.to_mesh(meh); bmh.free()
    for pp in meh.polygons: pp.use_smooth = True
    mh = bpy.data.materials.new('M_halo'); mh.use_nodes = True; nh = mh.node_tree
    for n in list(nh.nodes):
        if n.type != 'OUTPUT_MATERIAL': nh.nodes.remove(n)
    lw = nh.nodes.new('ShaderNodeLayerWeight'); lw.inputs['Blend'].default_value = 0.5
    pw = nh.nodes.new('ShaderNodeMath'); pw.operation = 'POWER'; pw.inputs[1].default_value = 3.0
    inv = nh.nodes.new('ShaderNodeMath'); inv.operation = 'SUBTRACT'; inv.inputs[0].default_value = 1.0
    nh.links.new(lw.outputs['Facing'], inv.inputs[1]); nh.links.new(inv.outputs[0], pw.inputs[0])
    emh = nh.nodes.new('ShaderNodeEmission'); emh.inputs['Color'].default_value = rgb('#ffb45e'); emh.inputs['Strength'].default_value = 2.5
    trh = nh.nodes.new('ShaderNodeBsdfTransparent'); mxh = nh.nodes.new('ShaderNodeMixShader')
    nh.links.new(pw.outputs[0], mxh.inputs[0]); nh.links.new(trh.outputs[0], mxh.inputs[1]); nh.links.new(emh.outputs[0], mxh.inputs[2])
    nh.links.new(mxh.outputs[0], next(n for n in nh.nodes if n.type == 'OUTPUT_MATERIAL').inputs['Surface'])
    if hasattr(mh, 'surface_render_method'): mh.surface_render_method = 'BLENDED'
    meh.materials.append(mh); oh = bpy.data.objects.new('Sol_halo', meh); scn.collection.objects.link(oh)
    oh.location = S * 135; oh.visible_shadow = False

    # cámara: macro rasante entre espigas -> se eleva y retrocede hasta ver el mini-planeta completo
    cd = bpy.data.cameras.new('Cam'); cd.sensor_width = 36; cd.dof.use_dof = True
    cam = bpy.data.objects.new('Camara', cd); scn.collection.objects.link(cam); scn.camera = cam
    obj = bpy.data.objects.new('Camara_mira', None); scn.collection.objects.link(obj)
    tr = cam.constraints.new('TRACK_TO'); tr.target = obj; tr.track_axis = 'TRACK_NEGATIVE_Z'; tr.up_axis = 'UP_Y'
    cd.dof.focus_object = obj
    lado = n0.cross(t0).normalized()
    # vista final: buscar alrededor del polo la dirección donde el sol entra de lado (S·d ≈ 0.35) con el campo a la vista
    S_ = -luz; mejor_d = None
    for az in range(0, 360, 3):
        for el in (0.5, 0.6, 0.7):
            d = Vector((math.cos(math.radians(az)) * math.sqrt(1 - el * el), math.sin(math.radians(az)) * math.sqrt(1 - el * el), el))
            pen = abs(S_.dot(d) - 0.35) + 0.3 * (1 - d.dot((n0 - t0).normalized()))
            if mejor_d is None or pen < mejor_d[0]: mejor_d = (pen, d)
    d_fin = mejor_d[1]
    claves = [  # (cuadro, posición, mira, lente, f-stop)
        (1,   n0 * (R + 1.0) - t0 * 0.05, n0 * (R + 1.0) + t0 * 0.95, 85, 1.2),
        (70,  n0 * (R + 1.5) - t0 * 1.6 + lado * 0.5, n0 * (R + 0.9) + t0 * 2.5, 50, 2.8),
        (160, n0 * (R + 9.0) - t0 * 9.0 + lado * 6.0, polo * (R * 0.85) + t0 * 2, 40, 6.0),
        (300, d_fin * (R * 4.3), Vector((0, 0, 0)), 30, 11.0),
    ]
    for f, p, m, lens, fs in claves:
        cam.location = p; cam.keyframe_insert('location', frame=f)
        obj.location = m; obj.keyframe_insert('location', frame=f)
        cd.lens = lens; cd.keyframe_insert('lens', frame=f)
        cd.dof.aperture_fstop = fs; cd.dof.keyframe_insert('aperture_fstop', frame=f)

    # render
    scn.render.engine = 'BLENDER_EEVEE'
    ee = scn.eevee
    for k, v in (('taa_render_samples', 48), ('use_shadows', True), ('use_volumetric_shadows', True),
                 ('volumetric_end', 140.0), ('volumetric_tile_size', '4'), ('use_raytracing', True),
                 ('use_fast_gi', True), ('volumetric_shadow_samples', 32)):
        if hasattr(ee, k):
            try: setattr(ee, k, v)
            except Exception as ex: print('eevee', k, ex)
    scn.render.resolution_x, scn.render.resolution_y = 1920, 890
    vs = scn.view_settings
    try: vs.view_transform = 'AgX'; vs.look = 'AgX - Punchy'
    except Exception as ex: print('cm', ex)
    agregar_camion(scn, eje_camino, polo, d_fin)
    d_fin = claves[-1][1].normalized()
    print('CAMPO luz·vista_final', round(S.dot(d_fin), 2), 'luz·polo', round(S.dot(polo), 2), 'luz·macro', round(S.dot(n0), 2))
    bpy.ops.wm.save_as_mainfile(filepath=salida_blend)
    return scn

if __name__ == '__main__':
    argv = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
    salida = argv[argv.index('--salida') + 1] if '--salida' in argv else P + 'campo_trigo.blend'
    construir(salida)
    print('CAMPO listo', salida)
