"""Exporta un camión a GLB para la página three.js.

Uso: blender -b --python scripts/camiones/exportar_glb.py -- <archivo.blend> <Coleccion> public/prototipos/camiones/modelos/<id>.glb
Los .blend de cada camión no están en el repo (los guarda el equipo de Nuclea).
- Aplica modificadores (biseles, booleanos) en mallas nuevas y deja fuera los cortadores ocultos.
- Iguala la altura (2.2 m; el tráiler 1.15× su tamaño, como en transformar.py) y pone la NARIZ en x = 0:
  el camión ocupa x ∈ [-largo, 0]. Así todos coinciden en la nariz y el corte barre de adelante hacia atrás.
- Llantas (Llanta_*) con el origen en su centro para girarlas en three (eje Y de Blender = -Z de three).
- Texturas en WebP. Escribe además <salida>.json con largo, alto y radio de llanta.
"""
import bpy, sys, json
from mathutils import Matrix, Vector

src, nombre, out = sys.argv[sys.argv.index('--') + 1:][:3]
ALTO = 2.2
bpy.ops.wm.open_mainfile(filepath=src)
scn = bpy.context.scene
col = bpy.data.collections[nombre]
dg = bpy.context.evaluated_depsgraph_get()
fuentes = [o for o in col.all_objects if o.type == 'MESH' and not o.hide_render]
mallas = []
for o in fuentes:
    me = bpy.data.meshes.new_from_object(o.evaluated_get(dg), preserve_all_data_layers=True, depsgraph=dg)
    me.transform(o.matrix_world)
    mallas.append((o.name.split('.')[0], me))
for c in list(scn.collection.children): scn.collection.children.unlink(c)
for o in list(scn.collection.objects): scn.collection.objects.unlink(o)

zs = [v.co.z for _, me in mallas for v in me.vertices]; xs = [v.co.x for _, me in mallas for v in me.vertices]
k = 1.15 if 'trailer' in nombre else ALTO / max(zs)
T = Matrix.Translation((-k * max(xs), 0, 0)) @ Matrix.Scale(k, 4)
radios, nuevos = [], []
for n, me in mallas:
    me.transform(T)
    ob = bpy.data.objects.new(n, me); scn.collection.objects.link(ob); nuevos.append(ob)
    if n.startswith('Llanta'):
        vs = [v.co for v in me.vertices]
        c = Vector([(min(v[i] for v in vs) + max(v[i] for v in vs)) / 2 for i in range(3)])
        me.transform(Matrix.Translation(-c)); ob.location = c
        radios.append((max(v.z for v in vs) - min(v.z for v in vs)) / 2)
bpy.ops.object.select_all(action='DESELECT')
for ob in nuevos: ob.select_set(True)
bpy.ops.export_scene.gltf(filepath=out, use_selection=True, export_format='GLB', export_yup=True,
                          export_image_format='WEBP', export_image_quality=88, export_apply=False)
largo = k * (max(xs) - min(xs))
json.dump(dict(nombre=nombre, largo=round(largo, 3), alto=round(k * max(zs), 3),
               radio_llanta=round(sum(radios) / max(len(radios), 1), 3)), open(out.replace('.glb', '.json'), 'w'))
print('RES', nombre, 'largo', round(largo, 2), 'piezas', len(nuevos))
