"""Exporta de campo_persona.blend lo que la página three.js no puede reconstruir sola.

blender -b campo_persona.blend --python exportar_web.py
Salida en web/assets/ junto al .blend o, dentro del repo de la demo, en public/animaciones/campo-trigo/assets/
(o donde diga la variable SALIDA_WEB):
  trigo.glb     5 espigas detalladas + 5 protagonistas (simplificadas con Decimate)
  arboles.glb   especies de árbol del fondo (simplificadas)
  camion.glb    camión Bimbo de los 40 con sus calcas
  escena.json   cámara, camión y polvo por cuadro; protagonistas, árboles, lomas y sol. Ejes de three (Y arriba).
El terreno, la parcela, la terracería y el trigo de media distancia los genera main.js con las mismas fórmulas.
"""
import bpy, json, os, math
from mathutils import Vector, Matrix

BASE = os.path.dirname(bpy.data.filepath) + '/'
EN_REPO = os.path.normpath(BASE + '../../public/animaciones/campo-trigo') + '/'
OUT = os.environ.get('SALIDA_WEB') or (EN_REPO + 'assets/' if os.path.isdir(EN_REPO) else BASE + 'web/assets/')
os.makedirs(OUT, exist_ok=True)
scn = bpy.context.scene
T = lambda v: [round(v[0], 4), round(v[2], 4), round(-v[1], 4)]          # Blender (Z arriba) -> three (Y arriba)

def solo(objs):
    bpy.ops.object.select_all(action='DESELECT')
    for o in objs:
        o.hide_set(False); o.hide_viewport = False; o.select_set(True)
    bpy.context.view_layer.objects.active = objs[0]

def diezmar(o, ratio):
    if ratio < 1:
        m = o.modifiers.new('Web', 'DECIMATE'); m.ratio = ratio

def exportar(nombre, objs, ratio=1.0):
    for c in bpy.data.collections: c.hide_viewport = False
    for lc in bpy.context.view_layer.layer_collection.children: lc.exclude = False; lc.hide_viewport = False
    for o in objs: diezmar(o, ratio)
    solo(objs)
    bpy.ops.export_scene.gltf(filepath=OUT + nombre, export_format='GLB', use_selection=True, export_apply=True,
                              export_yup=True, export_animations=False, export_draco_mesh_compression_enable=False)
    tris = sum(len(o.evaluated_get(bpy.context.evaluated_depsgraph_get()).data.loop_triangles) for o in objs if o.type == 'MESH')
    print('WEB', nombre, len(objs), 'objetos', tris, 'triángulos', os.path.getsize(OUT + nombre) // 1024, 'KB')

# --- espigas: las protagonistas en el origen (su colocación va en escena.json)
prot = sorted(bpy.data.collections['Trigo_protagonistas'].objects, key=lambda o: o.name)
prot_info = []
for o in prot:
    prot_info.append({'nombre': o.name, 'pos': T(o.location), 'giro': round(o.rotation_euler.z, 4)})
for o in prot:
    o.animation_data_clear(); o.location = (0, 0, 0); o.rotation_euler = (0, 0, 0)
espigas = sorted(bpy.data.collections['Trigo_detalle'].objects, key=lambda o: o.name)
for o in espigas: o.location = (0, 0, 0)
exportar('trigo.glb', espigas + prot, ratio=0.3)

# --- árboles del fondo: una malla por especie + transformaciones
fondo = bpy.data.collections['Fondo'].objects
especies = sorted({o.data.name for o in fondo if o.name.startswith('Arbol_')})
fuente = [o for o in bpy.data.collections['Arboles_fuente'].objects]
arboles = [{'especie': especies.index(o.data.name), 'pos': T(o.location), 'esc': [round(o.scale.x, 3), round(o.scale.z, 3), round(o.scale.y, 3)],
            'giro': round(o.rotation_euler.z, 3)} for o in fondo if o.name.startswith('Arbol_')]
lomas = [{'pos': T(o.location), 'esc': [round(o.scale.x, 2), round(o.scale.z, 2), round(o.scale.y, 2)]} for o in fondo if o.name.startswith('Loma_')]
mallas = []
for nom in especies:
    src = next(o for o in fuente if o.data.name == nom)
    src.location = (0, 0, 0); src.name = 'esp_' + nom; mallas.append(src)
exportar('arboles.glb', mallas, ratio=0.4)

# --- camión
raiz = bpy.data.objects['Camion_40']
piezas = [o for o in bpy.data.collections['Camion_40'].objects if o.type == 'MESH' and not o.name.startswith('_') and o.visible_get()]
llantas = [o.name for o in piezas if o.name.startswith('Llanta')]
# trayectoria por cuadro antes de mover la raíz
tray = []
for f in range(scn.frame_start, scn.frame_end + 1):
    scn.frame_set(f)
    cam = scn.camera; mira = bpy.data.objects['Camara_mira']
    pol = bpy.data.materials['M_polvo'].node_tree.nodes['Densidad'].outputs[0].default_value
    ll = bpy.data.objects[llantas[0]].rotation_euler.y if llantas else 0
    tray.append({'c': T(cam.matrix_world.translation), 'm': T(mira.matrix_world.translation), 'lente': round(cam.data.lens, 2),
                 'f': round(cam.data.dof.aperture_fstop, 2), 'camion': T(raiz.matrix_world.translation),
                 'yaw': round(raiz.rotation_euler.z, 4), 'llanta': round(ll, 3), 'polvo': round(pol, 3)})
scn.frame_set(1)
raiz.animation_data_clear(); raiz.location = (0, 0, 0); raiz.rotation_euler = (0, 0, 0)
for o in piezas: o.animation_data_clear()
exportar('camion.glb', piezas, ratio=1.0)

# --- sol, cielo y metadatos
sol = bpy.data.objects['Sol']; S = sol.matrix_world.to_quaternion() @ Vector((0, 0, -1))
json.dump({'fps': scn.render.fps, 'cuadros': tray, 'protagonistas': prot_info, 'arboles': arboles, 'especies': especies,
           'lomas': lomas, 'sol': T(-S), 'llantas': llantas,
           'nota': 'Ejes de three (Y arriba). Terreno, parcela (x -60..12.9, y_blender -14..115), terracería x=16+2.2 sin(y/35) y trigo lejano se reconstruyen en main.js'},
          open(OUT + 'escena.json', 'w'), separators=(',', ':'))
print('WEB escena.json', os.path.getsize(OUT + 'escena.json') // 1024, 'KB')
