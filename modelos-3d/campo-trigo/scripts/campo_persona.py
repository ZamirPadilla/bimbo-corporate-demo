"""Campo de trigo Bimbo a escala humana: de la espiga (como el banner "Horneando el futuro") a la parcela vista
por una persona de pie, y de ahí a la terracería donde llega el camión Bimbo de los 40.

blender -b --python campo_persona.py -- [--salida archivo.blend]
Reutiliza de campo.py la espiga procedural, los materiales y utilidades. Metros, Z arriba. La cámara arranca en
el origen mirando a +Y (hacia el sol bajo); la terracería corre a la derecha (x≈16) a lo largo del campo.
"""
import bpy, bmesh, math, random, sys, os
import numpy as np
from mathutils import Vector, Matrix, Quaternion, Euler

AQUI = os.path.dirname(os.path.abspath(__file__))
lib = {'__name__': 'campo_lib', '__file__': os.path.join(AQUI, 'campo.py')}; exec(open(os.path.join(AQUI, 'campo.py')).read(), lib)
rgb, material, espiga, curvas, coleccion = lib['rgb'], lib['material'], lib['espiga'], lib['curvas'], lib['coleccion']

P = os.path.dirname(AQUI) + '/'                                                      # carpeta de arriba de scripts/
CAMION = os.environ.get('CAMION_40', P + '../camiones-3d/camion_40.blend')          # .blend del camión de los 40
ARBOLES = os.environ.get('ARBOLES', P + '../planeta-3d/planeta_ventures.blend')     # .blend del planeta, de donde salen los árboles
FPS, F_FIN = 25, 300
rnd = random.Random(11)

# ---------------------------------------------------------------- geografía
X_CAMPO = (-60.0, 12.9); Y_CAMPO = (-14.0, 115.0)          # la parcela (hectárea y algo más)
def x_camino(y): return 16.0 + 2.2 * math.sin(y / 35.0)      # eje de la terracería
ANCHO_CAMINO = 2.6                                           # medio ancho
def altura(x, y):
    """Lomerío suave; casi plano cerca de la cámara y del camino."""
    r = math.hypot(x, y - 30)
    amp = min(max((r - 60) / 120, 0.08), 1.0) * 4.0
    return amp * (math.sin(x / 47 + 0.7) * math.cos(y / 61 - 0.3) + 0.5 * math.sin(x / 23 + y / 31))

def terreno():
    bm = bmesh.new(); bmesh.ops.create_grid(bm, x_segments=320, y_segments=320, size=320)
    me = bpy.data.meshes.new('terreno'); bm.to_mesh(me); bm.free()
    V = np.array([v.co[:] for v in me.vertices]); X, Y = V[:, 0], V[:, 1] + 60
    xc = 16.0 + 2.2 * np.sin(Y / 35.0); dcam = np.abs(X - xc)
    campo = (X > X_CAMPO[0]) & (X < X_CAMPO[1]) & (Y > Y_CAMPO[0]) & (Y < Y_CAMPO[1])
    camino = dcam < ANCHO_CAMINO
    rodada = (np.abs(dcam - 0.95) < 0.3) & camino
    arado = (X > xc + 6) & (X < 95) & (Y > -30) & (Y < 140)
    trigo_lejos = (((X < -64) & (X > -170) & (Y > 0) & (Y < 160)) | ((Y > 122) & (Y < 230) & (X < 10) & (X > -120)))
    r = np.hypot(X, Y - 30); amp = np.clip((r - 60) / 120, 0.08, 1.0) * 4.0
    Z = amp * (np.sin(X / 47 + 0.7) * np.cos(Y / 61 - 0.3) + 0.5 * np.sin(X / 23 + Y / 31))
    Z = np.where(camino, Z - 0.06, Z)
    for v, x, y, z in zip(me.vertices, X, Y, Z): v.co = (x, y, z)
    for nombre, val in (('trigo', campo & ~camino), ('camino', camino), ('rodada', rodada), ('arado', arado & ~camino),
                        ('trigo_lejos', trigo_lejos)):
        at = me.attributes.new(nombre, 'FLOAT', 'POINT'); at.data.foreach_set('value', val.astype(np.float32))
    for p in me.polygons: p.use_smooth = True
    o = bpy.data.objects.new('Terreno', me)
    m = bpy.data.materials.new('M_suelo'); m.use_nodes = True; nt = m.node_tree
    b = next(n for n in nt.nodes if n.type == 'BSDF_PRINCIPLED'); b.inputs['Roughness'].default_value = 0.95
    base = nt.nodes.new('ShaderNodeRGB'); base.outputs[0].default_value = rgb('#7f8a3f'); col = base.outputs[0]   # pasto
    capas = (('trigo', '#a77b36'), ('trigo_lejos', '#d6a24a'), ('arado', '#7a5234'), ('camino', '#c39a6b'), ('rodada', '#93704c'))
    for clave, hx in capas:
        at = nt.nodes.new('ShaderNodeAttribute'); at.attribute_name = clave
        c = nt.nodes.new('ShaderNodeRGB'); c.outputs[0].default_value = rgb(hx)
        mx = nt.nodes.new('ShaderNodeMix'); mx.data_type = 'RGBA'
        nt.links.new(at.outputs['Fac'], mx.inputs['Factor']); nt.links.new(col, mx.inputs['A']); nt.links.new(c.outputs[0], mx.inputs['B'])
        col = mx.outputs['Result']
    # surcos del arado y grano de tierra
    tc = nt.nodes.new('ShaderNodeTexCoord'); wv = nt.nodes.new('ShaderNodeTexWave'); wv.inputs['Scale'].default_value = 0.12
    wv.bands_direction = 'Y'; nt.links.new(tc.outputs['Object'], wv.inputs['Vector'])
    ar = nt.nodes.new('ShaderNodeAttribute'); ar.attribute_name = 'arado'
    k = nt.nodes.new('ShaderNodeMath'); k.operation = 'MULTIPLY'; nt.links.new(ar.outputs['Fac'], k.inputs[0]); k.inputs[1].default_value = 0.35
    surc = nt.nodes.new('ShaderNodeMix'); surc.data_type = 'RGBA'; surc.blend_type = 'MULTIPLY'
    nt.links.new(k.outputs[0], surc.inputs['Factor']); nt.links.new(col, surc.inputs['A']); nt.links.new(wv.outputs['Color'], surc.inputs['B'])
    nz = nt.nodes.new('ShaderNodeTexNoise'); nz.inputs['Scale'].default_value = 3.0; nz.inputs['Detail'].default_value = 6
    nt.links.new(tc.outputs['Object'], nz.inputs['Vector'])
    mul = nt.nodes.new('ShaderNodeMix'); mul.data_type = 'RGBA'; mul.blend_type = 'MULTIPLY'; mul.inputs['Factor'].default_value = 0.25
    nt.links.new(surc.outputs['Result'], mul.inputs['A']); nt.links.new(nz.outputs['Color'], mul.inputs['B'])
    nt.links.new(mul.outputs['Result'], b.inputs['Base Color'])
    me.materials.append(m)
    return o

def espiga_minima(nombre, mats, semilla):
    """Para el fondo de la parcela: tallo triangular + espiga en rombo alargado (~40 triángulos)."""
    r = random.Random(semilla); bm = bmesh.new(); h = r.uniform(0.9, 1.05)
    a = [bm.verts.new((0.004 * math.cos(t), 0.004 * math.sin(t), 0)) for t in (0, 2.1, 4.2)]
    b = [bm.verts.new((0.003 * math.cos(t) + 0.03, 0.003 * math.sin(t), h - 0.15)) for t in (0, 2.1, 4.2)]
    for i in range(3): j = (i + 1) % 3; bm.faces.new((a[i], a[j], b[j], b[i]))
    n_t = len(bm.faces)
    c = Vector((0.04, 0, h - 0.06)); M = Matrix.Translation(c) @ Matrix.Rotation(0.3, 4, 'Y') @ Matrix.Diagonal((0.016, 0.011, 0.085, 1))
    res = bmesh.ops.create_uvsphere(bm, u_segments=5, v_segments=4, radius=1, matrix=M)
    for f in {f for v in res['verts'] for f in v.link_faces}: f.material_index = 1; f.smooth = True
    me = bpy.data.meshes.new(nombre); bm.to_mesh(me); bm.free()
    for m in mats: me.materials.append(m)
    return bpy.data.objects.new(nombre, me)

# ---------------------------------------------------------------- trigo por distancia a la cámara (Geometry Nodes)
def gn_campo(cols, centro, claro, radio_claro=0.9, f_claro=90):
    """cols: [(colección, r_min, r_max, densidad)] anillos alrededor de 'centro' (XY)."""
    ng = bpy.data.node_groups.new('GN_campo', 'GeometryNodeTree'); I = ng.interface
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
    pos = N.new('GeometryNodeInputPosition'); sp = N.new('ShaderNodeSeparateXYZ'); L.new(pos.outputs[0], sp.inputs[0])
    dxy = N.new('ShaderNodeCombineXYZ'); L.new(sp.outputs['X'], dxy.inputs['X']); L.new(sp.outputs['Y'], dxy.inputs['Y'])
    dc = N.new('ShaderNodeVectorMath'); dc.operation = 'DISTANCE'; L.new(dxy.outputs[0], dc.inputs[0]); dc.inputs[1].default_value = (centro.x, centro.y, 0)
    dk = N.new('ShaderNodeVectorMath'); dk.operation = 'DISTANCE'; L.new(dxy.outputs[0], dk.inputs[0]); dk.inputs[1].default_value = (claro.x, claro.y, 0)
    tm = N.new('GeometryNodeInputSceneTime')
    hueco = mth('MULTIPLY', mth('LESS_THAN', dk.outputs['Value'], radio_claro), mth('LESS_THAN', tm.outputs['Frame'], f_claro))
    base = mth('MULTIPLY', at.outputs['Attribute'], mth('SUBTRACT', 1.0, hueco))
    # viento: ola que viaja por el campo + temblor individual
    vel = N.new('ShaderNodeCombineXYZ'); L.new(mth('MULTIPLY', tm.outputs['Seconds'], 2.6), vel.inputs['X']); L.new(mth('MULTIPLY', tm.outputs['Seconds'], -1.4), vel.inputs['Y'])
    sh = N.new('ShaderNodeVectorMath'); sh.operation = 'ADD'; L.new(pos.outputs[0], sh.inputs[0]); L.new(vel.outputs[0], sh.inputs[1])
    nz = N.new('ShaderNodeTexNoise'); nz.inputs['Scale'].default_value = 0.07; nz.inputs['Detail'].default_value = 1.2; L.new(sh.outputs[0], nz.inputs['Vector'])
    ola = mth('MULTIPLY', mth('SUBTRACT', nz.outputs['Fac'], 0.40), 0.75)
    fl = N.new('FunctionNodeRandomValue'); fl.data_type = 'FLOAT'; fl.inputs['Max'].default_value = 6.28
    temblor = mth('MULTIPLY', mth('SINE', mth('ADD', mth('MULTIPLY', tm.outputs['Seconds'], 2.7), fl.outputs['Value'])), 0.04)
    rv = N.new('FunctionNodeRandomValue'); rv.data_type = 'FLOAT'; rv.inputs['Min'].default_value = -0.10; rv.inputs['Max'].default_value = 0.10
    incl = N.new('ShaderNodeCombineXYZ'); L.new(mth('ADD', mth('ADD', ola, temblor), rv.outputs['Value']), incl.inputs['X'])
    yaw = N.new('FunctionNodeRandomValue'); yaw.data_type = 'FLOAT'; yaw.inputs['Max'].default_value = 6.28
    out = N.new('GeometryNodeJoinGeometry'); L.new(gi.outputs[0], out.inputs[0])
    for k, (colx, r0, r1, dens) in enumerate(cols):
        dentro = mth('MULTIPLY', mth('GREATER_THAN', dc.outputs['Value'], r0), mth('LESS_THAN', dc.outputs['Value'], r1))
        dist = N.new('GeometryNodeDistributePointsOnFaces'); dist.distribute_method = 'RANDOM'
        L.new(sc.outputs['Mesh'], dist.inputs['Mesh']); dist.inputs['Density'].default_value = dens; dist.inputs['Seed'].default_value = 5 + k
        L.new(mth('MULTIPLY', at.outputs['Attribute'], dentro), dist.inputs['Selection'])
        # el claro de la cámara macro se aplica por punto (las caras del terreno miden 1 m: por cara no alcanza)
        dl = N.new('GeometryNodeDeleteGeometry'); dl.domain = 'POINT'
        L.new(dist.outputs['Points'], dl.inputs['Geometry']); L.new(hueco, dl.inputs['Selection'])
        # rotación: de pie (eje Z del mundo, el terreno es casi plano) + giro al azar + inclinación del viento en X
        yv = N.new('ShaderNodeCombineXYZ'); L.new(yaw.outputs['Value'], yv.inputs['Z'])
        r1n = N.new('FunctionNodeEulerToRotation'); L.new(yv.outputs[0], r1n.inputs[0])
        wv = N.new('FunctionNodeEulerToRotation'); L.new(incl.outputs[0], wv.inputs[0])
        rr = N.new('FunctionNodeRotateRotation'); rr.rotation_space = 'GLOBAL'; L.new(r1n.outputs[0], rr.inputs['Rotation']); L.new(wv.outputs[0], rr.inputs['Rotate By'])
        esc = N.new('FunctionNodeRandomValue'); esc.data_type = 'FLOAT'; esc.inputs['Min'].default_value = 0.85; esc.inputs['Max'].default_value = 1.15
        ci = N.new('GeometryNodeCollectionInfo'); ci.inputs['Collection'].default_value = colx
        ci.inputs['Separate Children'].default_value = True; ci.inputs['Reset Children'].default_value = True
        ri = N.new('FunctionNodeRandomValue'); ri.data_type = 'INT'; ri.inputs['Max'].default_value = 99
        iop = N.new('GeometryNodeInstanceOnPoints'); iop.inputs['Pick Instance'].default_value = True
        L.new(dl.outputs['Geometry'], iop.inputs['Points']); L.new(ci.outputs[0], iop.inputs['Instance']); L.new(ri.outputs['Value'], iop.inputs['Instance Index'])
        L.new(rr.outputs[0], iop.inputs['Rotation']); L.new(esc.outputs['Value'], iop.inputs['Scale'])
        L.new(iop.outputs[0], out.inputs[0])
    L.new(out.outputs[0], go.inputs[0])
    return ng

# ---------------------------------------------------------------- fondo: lomas y cortina de árboles
def fondo(scn):
    col = coleccion('Fondo')
    m_loma = material('M_loma', '#8a8f45', 0.95, variacion=('#7d8640', '#b8913f'))
    for k in range(14):
        ang = math.radians(rnd.uniform(-70, 70)); dist = rnd.uniform(230, 330)
        c = Vector((math.sin(ang) * dist, 30 + math.cos(ang) * dist, -2))
        bm = bmesh.new(); bmesh.ops.create_icosphere(bm, subdivisions=4, radius=1)
        me = bpy.data.meshes.new(f'loma_{k}'); bm.to_mesh(me); bm.free()
        for p in me.polygons: p.use_smooth = True
        me.materials.append(m_loma); o = bpy.data.objects.new(f'Loma_{k}', me); col.objects.link(o)
        o.location = c; o.scale = (rnd.uniform(60, 120), rnd.uniform(50, 90), rnd.uniform(8, 18))
    # árboles redondos del planeta Ventures (Quaternius, CC0) como cortina rompevientos y bosquecillos
    nombres = ['CommonTree_1', 'CommonTree_2', 'CommonTree_3', 'Pine_3']
    with bpy.data.libraries.load(ARBOLES, link=False) as (src, dst):
        dst.objects = [n for n in nombres if n in src.objects]
    fuente = coleccion('Arboles_fuente'); fuente.hide_render = True
    for o in dst.objects: fuente.objects.link(o); o.location = (0, 0, 0)
    puestos = [(x_camino(y) + 7 + rnd.uniform(-1, 1), y) for y in np.arange(-40, 150, 5.5)]
    puestos += [(rnd.uniform(-150, 60), rnd.uniform(150, 200)) for _ in range(40)]
    puestos += [(rnd.uniform(-120, -70), rnd.uniform(-10, 140)) for _ in range(18)]
    for i, (x, y) in enumerate(puestos):
        src_o = dst.objects[i % len(dst.objects)]
        o = bpy.data.objects.new(f'Arbol_{i}', src_o.data); col.objects.link(o)
        o.location = (x, y, altura(x, y) - 0.1); s = rnd.uniform(5.5, 8.0); o.scale = (s, s, s * rnd.uniform(0.9, 1.15))
        o.rotation_euler = (0, 0, rnd.uniform(0, 6.28))
    return col

# ---------------------------------------------------------------- camión + polvo
def camion(scn, f0=140, f1=F_FIN, y0=105.0, y1=9.0):
    with bpy.data.libraries.load(CAMION, link=False) as (src, dst):
        dst.collections = ['Camion_40']
    col = dst.collections[0]; scn.collection.children.link(col)
    raiz = bpy.data.objects['Camion_40']
    # llantas con su origen en el centro, para que giren sobre su eje
    for o in col.objects:
        if o.name.startswith('Llanta'):
            vs = [v.co for v in o.data.vertices]; c = sum(vs, Vector()) / len(vs)
            o.data.transform(Matrix.Translation(-c)); o.location = c
    llantas = [o for o in col.objects if o.name.startswith('Llanta')]
    ys = []
    for f in range(f0, f1 + 1, 5):
        t = (f - f0) / (f1 - f0); t = 1 - (1 - t) ** 2.2          # llega y frena
        y = y0 + (y1 - y0) * t; ys.append((f, y))
        x = x_camino(y) - 0.9
        dx = (x_camino(y - 1) - x_camino(y + 1)) / 2              # tangente del camino (avanzando hacia -Y)
        fw = Vector((dx, -1, 0)).normalized()
        raiz.location = (x, y, altura(x, y) + 0.02 - 0.06)
        raiz.rotation_euler = (0, 0, math.atan2(fw.y, fw.x)); raiz.keyframe_insert('location', frame=f); raiz.keyframe_insert('rotation_euler', frame=f)
        for o in llantas: o.rotation_euler = (0, -(y0 - y) / 0.235, 0); o.keyframe_insert('rotation_euler', frame=f)
    raiz.location = (x_camino(y0) - 0.9, y0, altura(x_camino(y0), y0)); raiz.keyframe_insert('location', frame=1)
    # polvo: volumen con ruido detrás del camión, se apaga cuando frena
    bm = bmesh.new(); bmesh.ops.create_icosphere(bm, subdivisions=3, radius=1)
    me = bpy.data.meshes.new('polvo'); bm.to_mesh(me); bm.free()
    mp = bpy.data.materials.new('M_polvo'); mp.use_nodes = True; nt = mp.node_tree
    for n in list(nt.nodes):
        if n.type != 'OUTPUT_MATERIAL': nt.nodes.remove(n)
    vol = nt.nodes.new('ShaderNodeVolumePrincipled'); vol.inputs['Color'].default_value = rgb('#c79a6a'); vol.inputs['Anisotropy'].default_value = 0.5
    tc = nt.nodes.new('ShaderNodeTexCoord'); nz = nt.nodes.new('ShaderNodeTexNoise'); nz.inputs['Scale'].default_value = 1.6; nz.inputs['Detail'].default_value = 4
    nt.links.new(tc.outputs['Object'], nz.inputs['Vector'])
    gr = nt.nodes.new('ShaderNodeTexGradient'); gr.gradient_type = 'SPHERICAL'; nt.links.new(tc.outputs['Object'], gr.inputs['Vector'])
    m1 = nt.nodes.new('ShaderNodeMath'); m1.operation = 'MULTIPLY'; nt.links.new(nz.outputs['Fac'], m1.inputs[0]); nt.links.new(gr.outputs['Fac'], m1.inputs[1])
    dens = nt.nodes.new('ShaderNodeValue'); dens.name = 'Densidad'; dens.outputs[0].default_value = 0.0
    m2 = nt.nodes.new('ShaderNodeMath'); m2.operation = 'MULTIPLY'; nt.links.new(m1.outputs[0], m2.inputs[0]); nt.links.new(dens.outputs[0], m2.inputs[1])
    nt.links.new(m2.outputs[0], vol.inputs['Density']); nt.links.new(vol.outputs[0], next(n for n in nt.nodes if n.type == 'OUTPUT_MATERIAL').inputs['Volume'])
    me.materials.append(mp); polvo = bpy.data.objects.new('Polvo', me); scn.collection.objects.link(polvo)
    polvo.parent = raiz; polvo.location = (-4.2, 0, 0.9); polvo.scale = (3.6, 1.8, 1.1)
    for f, d in ((1, 0.0), (f0, 0.0), (f0 + 20, 0.55), (f1 - 70, 0.45), (f1, 0.06)):
        dens.outputs[0].default_value = d; dens.outputs[0].keyframe_insert('default_value', frame=f)
    return raiz

# ---------------------------------------------------------------- escena
def construir(salida):
    lib['limpiar']()
    scn = bpy.context.scene; scn.render.fps = FPS; scn.frame_start = 1; scn.frame_end = F_FIN
    m_tallo = material('M_tallo', '#c9a24e', 0.55, sss=0.45, variacion=('#b88f3e', '#d8b464'))
    m_grano = material('M_grano', '#e2ad4c', 0.55, sss=0.6, variacion=('#c99234', '#e8b85a'))
    m_barba = material('M_barba', '#efd08a', 0.45, sss=0.7)
    m_hoja = material('M_hoja', '#b9984a', 0.6, sss=0.5, variacion=('#a88a40', '#c7aa5c'))
    mats = (m_tallo, m_grano, m_barba, m_hoja)
    fuente = coleccion('Trigo_fuente'); fuente.hide_render = True
    c_det, c_lig, c_min = coleccion('Trigo_detalle', fuente), coleccion('Trigo_ligero', fuente), coleccion('Trigo_minimo', fuente)
    for k in range(5):
        c_det.objects.link(espiga(f'Espiga_{k}', rnd.uniform(0.92, 1.08), rnd.uniform(0.02, 0.08), rnd.uniform(0.05, 0.35), rnd.randint(13, 16), True, mats, k))
    for k in range(4):
        c_lig.objects.link(espiga(f'Espiga_ligera_{k}', rnd.uniform(0.92, 1.08), rnd.uniform(0.02, 0.08), rnd.uniform(0.05, 0.3), 9, False, mats, 20 + k))
    for k in range(4):
        c_min.objects.link(espiga_minima(f'Espiga_minima_{k}', mats, 40 + k))

    t = terreno(); scn.collection.objects.link(t)
    centro = Vector((3.0, 4.0, 0)); claro = Vector((0.25, 0.55, 0))
    mod = t.modifiers.new('Trigo', 'NODES')
    mod.node_group = gn_campo([(c_det, 0, 7, 150), (c_lig, 7, 22, 70), (c_min, 22, 75, 22)], centro, claro)
    # espigas protagonistas del macro (a la izquierda: el tercio derecho queda libre para el titular)
    prot = coleccion('Trigo_protagonistas')
    for k, (x, y, h) in enumerate(((-0.05, 0.82, 1.04), (-0.15, 0.95, 0.99), (-0.26, 0.88, 1.06), (-0.34, 1.25, 1.0), (-0.08, 1.35, 1.02))):
        o = espiga(f'Protagonista_{k}', h, rnd.uniform(0.03, 0.07), rnd.uniform(0.18, 0.4), 16, True, mats, 50 + k)
        prot.objects.link(o); o.location = (x, y, altura(x, y)); o.rotation_euler = (0, 0, rnd.uniform(0, 6.28))
        o.keyframe_insert('rotation_euler', frame=1)
        for fc in curvas(o):
            nm = fc.modifiers.new('NOISE'); nm.scale = 35; nm.strength = 0.06; nm.phase = k * 7.3 + fc.array_index * 2.1
    fondo(scn)
    tr = camion(scn)

    # sol bajo adelante-izquierda (contraluz en el macro, luz de lado sobre el camión al girar)
    S = Vector((-0.15, 1.0, 0.16)).normalized()
    sd = bpy.data.lights.new('Sol', 'SUN'); sd.energy = 8.5; sd.angle = math.radians(2.0); sd.color = (1.0, 0.62, 0.32)
    so = bpy.data.objects.new('Sol', sd); scn.collection.objects.link(so); so.rotation_euler = (-S).to_track_quat('-Z', 'Y').to_euler()
    rd = bpy.data.lights.new('Relleno', 'SUN'); rd.energy = 1.6; rd.color = (1.0, 0.74, 0.5); rd.use_shadow = False
    ro = bpy.data.objects.new('Relleno', rd); scn.collection.objects.link(ro); ro.rotation_euler = Vector((0.35, 1.0, -0.55)).to_track_quat('-Z', 'Y').to_euler()   # desde atrás de la cámara
    # cielo: degradado de pantalla (ámbar en el horizonte, malva arriba); luz ambiente cálida y baja
    w = bpy.data.worlds.new('Atardecer'); scn.world = w; w.use_nodes = True; nt = w.node_tree
    for n in list(nt.nodes):
        if n.type != 'OUTPUT_WORLD': nt.nodes.remove(n)
    out = next(n for n in nt.nodes if n.type == 'OUTPUT_WORLD')
    tc = nt.nodes.new('ShaderNodeTexCoord'); sx = nt.nodes.new('ShaderNodeSeparateXYZ'); nt.links.new(tc.outputs['Window'], sx.inputs[0])
    rp = nt.nodes.new('ShaderNodeValToRGB'); nt.links.new(sx.outputs['Y'], rp.inputs[0]); e = rp.color_ramp.elements
    e[0].position = 0.35; e[0].color = rgb('#f6b768'); e[1].position = 1.0; e[1].color = rgb('#5b5577'); e.new(0.65).color = rgb('#d9895a')
    bgc = nt.nodes.new('ShaderNodeBackground'); nt.links.new(rp.outputs['Color'], bgc.inputs['Color'])
    bga = nt.nodes.new('ShaderNodeBackground'); bga.inputs['Color'].default_value = rgb('#c98a5a'); bga.inputs['Strength'].default_value = 0.32
    lp = nt.nodes.new('ShaderNodeLightPath'); mx = nt.nodes.new('ShaderNodeMixShader')
    nt.links.new(lp.outputs['Is Camera Ray'], mx.inputs[0]); nt.links.new(bga.outputs[0], mx.inputs[1]); nt.links.new(bgc.outputs[0], mx.inputs[2])
    nt.links.new(mx.outputs[0], out.inputs['Surface'])
    # disco y halo del sol
    for nombre, rad, fuerza, hx, halo in (('Sol_disco', 14, 18, '#ffc477', False), ('Sol_halo', 60, 2.2, '#ffb45e', True)):
        bm = bmesh.new(); bmesh.ops.create_uvsphere(bm, u_segments=32, v_segments=16, radius=rad)
        me = bpy.data.meshes.new(nombre); bm.to_mesh(me); bm.free()
        for pp in me.polygons: pp.use_smooth = True
        m = bpy.data.materials.new('M_' + nombre); m.use_nodes = True; mt = m.node_tree
        for n in list(mt.nodes):
            if n.type != 'OUTPUT_MATERIAL': mt.nodes.remove(n)
        em = mt.nodes.new('ShaderNodeEmission'); em.inputs['Color'].default_value = rgb(hx); em.inputs['Strength'].default_value = fuerza
        salida_ = em.outputs[0]
        if halo:
            lw = mt.nodes.new('ShaderNodeLayerWeight'); lw.inputs['Blend'].default_value = 0.5
            inv = mt.nodes.new('ShaderNodeMath'); inv.operation = 'SUBTRACT'; inv.inputs[0].default_value = 1.0; mt.links.new(lw.outputs['Facing'], inv.inputs[1])
            pw = mt.nodes.new('ShaderNodeMath'); pw.operation = 'POWER'; pw.inputs[1].default_value = 3.0; mt.links.new(inv.outputs[0], pw.inputs[0])
            trn = mt.nodes.new('ShaderNodeBsdfTransparent'); mx2 = mt.nodes.new('ShaderNodeMixShader')
            mt.links.new(pw.outputs[0], mx2.inputs[0]); mt.links.new(trn.outputs[0], mx2.inputs[1]); mt.links.new(em.outputs[0], mx2.inputs[2]); salida_ = mx2.outputs[0]
            if hasattr(m, 'surface_render_method'): m.surface_render_method = 'BLENDED'
        mt.links.new(salida_, next(n for n in mt.nodes if n.type == 'OUTPUT_MATERIAL').inputs['Surface'])
        me.materials.append(m); o = bpy.data.objects.new(nombre, me); scn.collection.objects.link(o)
        o.location = S * 600 + Vector((3, 0, 0)); o.visible_shadow = False
    # bruma: caja de volumen sobre el terreno (perspectiva aérea hacia el fondo)
    bm = bmesh.new(); bmesh.ops.create_cube(bm, size=1); me = bpy.data.meshes.new('bruma'); bm.to_mesh(me); bm.free()
    mb = bpy.data.materials.new('M_bruma'); mb.use_nodes = True; nb = mb.node_tree
    for n in list(nb.nodes):
        if n.type != 'OUTPUT_MATERIAL': nb.nodes.remove(n)
    vb = nb.nodes.new('ShaderNodeVolumePrincipled'); vb.inputs['Color'].default_value = rgb('#f2b06a'); vb.inputs['Density'].default_value = 0.0022; vb.inputs['Anisotropy'].default_value = 0.65
    nb.links.new(vb.outputs[0], next(n for n in nb.nodes if n.type == 'OUTPUT_MATERIAL').inputs['Volume'])
    me.materials.append(mb); ob = bpy.data.objects.new('Bruma', me); scn.collection.objects.link(ob)
    ob.location = (0, 120, 20); ob.scale = (560, 560, 60)

    # cámara: espiga -> se levanta a ojos de persona mirando la parcela -> gira a la terracería y sigue al camión
    cd = bpy.data.cameras.new('Cam'); cd.sensor_width = 36; cd.dof.use_dof = True
    cam = bpy.data.objects.new('Camara', cd); scn.collection.objects.link(cam); scn.camera = cam
    mira = bpy.data.objects.new('Camara_mira', None); scn.collection.objects.link(mira)
    tk = cam.constraints.new('TRACK_TO'); tk.target = mira; tk.track_axis = 'TRACK_NEGATIVE_Z'; tk.up_axis = 'UP_Y'
    cd.dof.focus_object = mira
    def p(x, y, z): return Vector((x, y, altura(x, y) + z))
    claves = [  # cuadro, cámara, mira, lente, f
        (1,   p(0.0, -0.05, 1.12), p(-0.15, 0.95, 1.10), 85, 3.2),     # enfoca la espiga protagonista
        (45,  p(0.0, -0.10, 1.30), p(-0.15, 0.95, 1.12), 80, 3.2),     # sube en vertical dentro del claro
        (80,  p(0.2, -0.50, 1.78), p(-0.6, 12.0, 1.0), 55, 2.8),       # ya por encima de las espigas
        (125, p(0.6, -2.4, 1.68), p(-2.0, 30.0, 1.0), 40, 4.0),
        (170, p(2.5, -3.0, 1.68), p(4.0, 40.0, 1.4), 32, 5.6),
        (230, p(7.5, -2.0, 1.70), p(x_camino(40), 40.0, 1.2), 35, 5.6),
        (300, p(10.6, -1.2, 1.72), None, 40, 4.0),
    ]
    for f, c, m, lens, fs in claves:
        cam.location = c; cam.keyframe_insert('location', frame=f)
        if m is None:   # al final la mira sigue al camión
            scn.frame_set(f); m = tr.matrix_world.translation + Vector((0, 0, 1.2))
        mira.location = m; mira.keyframe_insert('location', frame=f)
        cd.lens = lens; cd.keyframe_insert('lens', frame=f)
        cd.dof.aperture_fstop = fs; cd.dof.keyframe_insert('aperture_fstop', frame=f)
    for idb in (cam, mira, cd):
        for fc in curvas(idb):
            for k in fc.keyframe_points: k.interpolation = 'BEZIER'; k.easing = 'AUTO'
    # render
    scn.render.engine = 'BLENDER_EEVEE'; ee = scn.eevee
    for k, v in (('taa_render_samples', 48), ('use_shadows', True), ('use_volumetric_shadows', True), ('volumetric_end', 400.0),
                 ('volumetric_tile_size', '8'), ('use_raytracing', True), ('use_fast_gi', True), ('volumetric_shadow_samples', 16)):
        if hasattr(ee, k):
            try: setattr(ee, k, v)
            except Exception as ex: print('eevee', k, ex)
    scn.render.resolution_x, scn.render.resolution_y = 1920, 890
    try: scn.view_settings.view_transform = 'AgX'; scn.view_settings.look = 'AgX - Punchy'
    except Exception as ex: print('cm', ex)
    cam.data.clip_end = 1200
    bpy.ops.wm.save_as_mainfile(filepath=salida)

if __name__ == '__main__':
    argv = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
    salida = argv[argv.index('--salida') + 1] if '--salida' in argv else P + 'campo_persona.blend'
    construir(salida); print('CAMPO listo', salida)
