"""Regenera assets/ de la página a partir de planeta_ventures.blend (ejecutar dentro de Blender, con el archivo abierto).

Salida en web/assets/:
  planeta.glb         esfera 160x80 con UV, especies simplificadas (esp_<nombre>) y nubes (nube_<nombre>, relativas al pivote)
  instancias.bin      Float32 4x4 column-major por árbol, en el marco local del planeta, ya en ejes de three (Y arriba)
  escena.json         especies, capa de cada árbol, crecimiento por capa, cámara (cuadros 1 y 250), sol, rotaciones
  planeta_color.jpg   color horneado (océano, halo de costa, tierra con ruido) desde texturas/mascara_tierra.png
Después: `ffmpeg -i planeta_color.jpg -q:v 5` para bajarla a ~350 KB.
"""
import bpy, json, os
import numpy as np
from mathutils import Matrix, Vector

BASE = os.path.dirname(bpy.data.filepath) + '/'
OUT = BASE + 'web/assets/'; os.makedirs(OUT, exist_ok=True)
scn = bpy.context.scene
C = Matrix(((1, 0, 0, 0), (0, 0, 1, 0), (0, -1, 0, 0), (0, 0, 0, 1)))   # Blender (Z arriba) -> three (Y arriba)
CAPAS = ['Capa_conifera', 'Capa_emblema', 'Capa_piso']
# triángulos objetivo por especie (el bosque completo queda en ~1.4 M)
OBJETIVO = {'Fern_1': 288, 'yucca_plant_medium': 220, 'Bush_Common': 220, 'Pine_3': 450, 'Pine_4': 450, 'Pine_5': 450,
            'CommonTree_1': 600, 'Environment_PalmTree_3': 700, 'PalmTree_2': 700, 'CommonTree_2': 800, 'CommonTree_3': 700,
            'TwistedTree_3': 900}


def rgb(h):
    s = [int(h.lstrip('#')[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    return [((c / 12.92) if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4) for c in s] + [1]


def wmat(name, hexc, rough=0.8):
    m = bpy.data.materials.get(name) or bpy.data.materials.new(name); m.use_nodes = True
    b = next(n for n in m.node_tree.nodes if n.type == 'BSDF_PRINCIPLED')
    b.inputs['Base Color'].default_value = rgb(hexc); b.inputs['Roughness'].default_value = rough
    return m


# 1) instancias y metadatos (cuadro 250: todo crecido)
scn.frame_set(250); bpy.context.view_layer.update(); dg = bpy.context.evaluated_depsgraph_get()
pl = bpy.data.objects['Planeta']; inv = pl.matrix_world.inverted()
capa_de = {o.name: c for c in CAPAS for o in bpy.data.collections[c].objects}
especies = sorted(capa_de)
mats, esp_idx, capa_idx = [], [], []
for inst in dg.object_instances:
    if not inst.is_instance or inst.parent is None or inst.parent.original.name != 'Planeta': continue
    n = inst.object.original.name
    if n not in capa_de: continue
    M = C @ (inv @ inst.matrix_world) @ C.inverted()
    mats.append([M[r][c] for c in range(4) for r in range(4)])
    esp_idx.append(especies.index(n)); capa_idx.append(CAPAS.index(capa_de[n]))
np.array(mats, np.float32).tofile(OUT + 'instancias.bin')
cfg = {}
for m in pl.modifiers:
    ins = m.properties.inputs; vals = {}
    for it in m.node_group.interface.items_tree:
        if getattr(it, 'in_out', None) != 'INPUT' or it.name == 'Geometry': continue
        v = getattr(ins, it.identifier).value
        if it.name == 'Colección': vals['coleccion'] = v.name
        elif it.name == 'Origen': o = C @ Vector(tuple(v)); vals['origen'] = [o.x, o.y, o.z]
        else: vals[it.name] = v
    cfg[vals['coleccion']] = vals
cam = bpy.data.objects['Camara']


def camdata(f):
    scn.frame_set(f); bpy.context.view_layer.update(); M = C @ cam.matrix_world
    return {'pos': list(M.translation), 'fwd': list((M.to_3x3() @ Vector((0, 0, -1))).normalized()),
            'up': list((M.to_3x3() @ Vector((0, 1, 0))).normalized())}


def rot(o, f): scn.frame_set(f); return list(o.rotation_euler)


sol = bpy.data.objects['Sol']
meta = {'especies': especies, 'capas': CAPAS, 'esp_idx': esp_idx, 'capa_idx': capa_idx, 'crecimiento': cfg,
        'camara': {'f1': camdata(1), 'f250': camdata(250)}, 'lente_mm': cam.data.lens, 'sensor_mm': cam.data.sensor_width,
        'fps': scn.render.fps, 'frames': [1, 250],
        'planeta_rot_z': [rot(pl, 1)[2], rot(pl, 250)[2]],
        'nubes_rot': [rot(bpy.data.objects['Nubes_pivote'], 1), rot(bpy.data.objects['Nubes_pivote'], 250)],
        'sol_dir': list(((C @ sol.matrix_world).to_3x3() @ Vector((0, 0, -1))).normalized()),
        'sol_energia': bpy.data.lights['Sol'].energy, 'radio': 10.0, 'fondo': '#e3e9f1', 'luz_ambiente': '#b9c8de'}
json.dump(meta, open(OUT + 'escena.json', 'w'))

# 2) GLB: especies simplificadas, esfera y nubes
scn.frame_set(1); dg = bpy.context.evaluated_depsgraph_get()
col = bpy.data.collections.get('Export_web') or bpy.data.collections.new('Export_web')
if col.name not in scn.collection.children: scn.collection.children.link(col)
for o in list(col.objects): bpy.data.objects.remove(o, do_unlink=True)
W = {'M_tronco': wmat('web_tronco', '#6a4c39'), 'M_hoja': wmat('web_hoja', '#7f9a52'), 'M_pino': wmat('web_pino', '#66855a'),
     'M_hoja_clara': wmat('web_hoja_clara', '#a3b673'), 'Atlas': wmat('web_palma', '#93ad62')}
for o in (o for c in CAPAS for o in bpy.data.collections[c].objects):
    n = bpy.data.objects.new('esp_' + o.name, o.data.copy()); col.objects.link(n)
    for s in n.material_slots: s.material = W.get(s.material.name, W['M_hoja'])
    tris = sum(len(p.vertices) - 2 for p in n.data.polygons)
    if OBJETIVO[o.name] < tris:
        d = n.modifiers.new('Dec', 'DECIMATE'); d.ratio = OBJETIVO[o.name] / tris
bpy.ops.mesh.primitive_uv_sphere_add(segments=160, ring_count=80, radius=10, calc_uvs=True)
sph = bpy.context.active_object; sph.name = 'planeta_web'
for p in sph.data.polygons: p.use_smooth = True
for c in list(sph.users_collection): c.objects.unlink(sph)
col.objects.link(sph); sph.data.materials.append(wmat('web_planeta', '#ffffff', 0.85))
pinv = bpy.data.objects['Nubes_pivote'].matrix_world.inverted(); cm = wmat('web_nube', '#f3f4ff', 0.55)
for o in bpy.data.collections['Nubes'].objects:
    if o.type != 'META': continue
    me = bpy.data.meshes.new_from_object(o.evaluated_get(dg))
    if not me.polygons: continue
    n = bpy.data.objects.new('nube_' + o.name, me); col.objects.link(n); n.matrix_world = pinv @ o.matrix_world
    me.materials.clear(); me.materials.append(cm)
    for p in me.polygons: p.use_smooth = True
    tris = sum(len(p.vertices) - 2 for p in me.polygons)
    if tris > 1500: n.modifiers.new('Dec', 'DECIMATE').ratio = 1500 / tris
bpy.ops.object.select_all(action='DESELECT')
for o in col.objects: o.select_set(True)
bpy.context.view_layer.objects.active = sph
bpy.ops.export_scene.gltf(filepath=OUT + 'planeta.glb', use_selection=True, export_apply=True, export_format='GLB', export_yup=True)

# 3) color del planeta horneado desde la máscara (mismos colores que M_planeta)
im = bpy.data.images['mascara_tierra']; H, Wd = im.size[1], im.size[0]
a = np.empty(len(im.pixels), np.float32); im.pixels.foreach_get(a); a = a.reshape(H, Wd, 4)[::-1]


def lin(h):
    s = np.array([int(h[i:i + 2], 16) / 255 for i in (1, 3, 5)]); return np.where(s <= 0.04045, s / 12.92, ((s + 0.055) / 1.055) ** 2.4)


def ramp(t, p0, c0, p1, c1):
    f = np.clip((t - p0) / (p1 - p0), 0, 1)[..., None]; return lin(c0) * (1 - f) + lin(c1) * f


rng = np.random.default_rng(3); ruido = np.zeros((H, Wd), np.float32)
for gh, amp in ((24, 0.5), (48, 0.3), (96, 0.2)):
    g = rng.random((gh, gh * 2)).astype(np.float32); g = np.concatenate([g, g[:, :1]], 1)
    ys = np.linspace(0, gh - 1, H); xs = np.linspace(0, gh * 2, Wd)
    y0 = np.floor(ys).astype(int); x0 = np.floor(xs).astype(int) % (gh * 2); y1 = np.minimum(y0 + 1, gh - 1); x1 = x0 + 1
    fy = (ys - y0)[:, None]; fx = (xs - np.floor(xs))[None, :]; fy = fy * fy * (3 - 2 * fy); fx = fx * fx * (3 - 2 * fx)
    ruido += amp * ((g[y0][:, x0] * (1 - fx) + g[y0][:, x1] * fx) * (1 - fy) + (g[y1][:, x0] * (1 - fx) + g[y1][:, x1] * fx) * fy)
color = ramp(a[..., 1], 0.02, '#4f9fcc', 0.42, '#8fcbe3')
f = np.clip((a[..., 0] - 0.42) / 0.16, 0, 1)[..., None]
color = color * (1 - f) + ramp(ruido, 0.35, '#7d9455', 0.70, '#98aa69') * f
srgb = np.where(color <= 0.0031308, color * 12.92, 1.055 * np.power(color, 1 / 2.4) - 0.055)
img = bpy.data.images.new('planeta_color', Wd, H, alpha=False)
img.pixels.foreach_set(np.ascontiguousarray(np.concatenate([srgb, np.ones((H, Wd, 1))], -1)[::-1], dtype=np.float32).ravel())
img.file_format = 'JPEG'; img.save_render(OUT + 'planeta_color.jpg')
print('listo', len(mats), 'árboles')
