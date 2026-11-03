"""Versión limpia del planeta para la web: menos especies, menos densidad, bosque solo donde es creíble.

Correr SIN interfaz (no toca el Blender abierto ni el archivo del video):
  /Applications/Blender.app/Contents/MacOS/Blender -b planeta_ventures.blend --python web/limpiar_planeta.py
Guarda planeta_ventures_limpio.blend junto al original y, con EXPORTAR=1 en el entorno, regenera web/assets.
"""
import bpy, os, math
import numpy as np

BASE = os.path.dirname(bpy.data.filepath) + '/'
scn = bpy.context.scene

# 1) especies: tres tipos (pino, árbol redondo, palmera de acento) y un arbusto bajo muy escaso
QUEDAN = {'Capa_conifera': ['Pine_4', 'Pine_3'], 'Capa_emblema': ['CommonTree_2', 'PalmTree_2'], 'Capa_piso': ['Bush_Common']}
fuera = bpy.data.collections.get('Especies_fuera') or bpy.data.collections.new('Especies_fuera')
for capa, quedan in QUEDAN.items():
    col = bpy.data.collections[capa]
    for o in list(col.objects):
        if o.name not in quedan:
            col.objects.unlink(o)
            if o.name not in fuera.objects: fuera.objects.link(o)

# 2) bioma: dónde es creíble un bosque (cajas geográficas suavizadas + ruido), 0.04 en el resto
W, H = 2048, 1024
lat = 90 - (np.arange(H) + 0.5) * 180 / H
lon = -180 + (np.arange(W) + 0.5) * 360 / W
LON, LAT = np.meshgrid(lon, lat)
ZONAS = [  # (lat0, lat1, lon0, lon1, valor)
    (-15, 8, -78, -45, 1.0), (8, 18, -92, -77, 0.9), (15, 21, -98, -88, 0.8),            # Amazonia, Centroamérica, sur de México
    (-8, 6, 10, 30, 1.0), (4, 10, -13, 10, 0.7), (-10, 25, 95, 150, 0.9), (8, 20, 73, 78, 0.5),   # Congo, África occidental, SE asiático, Ghats
    (48, 62, -130, -60, 0.85), (55, 66, 10, 140, 0.85), (58, 65, -160, -140, 0.5),       # boreal: Canadá, Rusia-Escandinavia, Alaska
    (30, 47, -95, -70, 0.65), (40, 55, -125, -115, 0.8), (43, 56, -5, 30, 0.45),         # templado: este de EE. UU., noroeste, Europa
    (23, 40, 105, 122, 0.45), (31, 45, 129, 146, 0.6), (-28, -10, -52, -38, 0.55),       # China, Japón, Mata Atlántica
    (-50, -37, -75, -71, 0.55), (-38, -15, 145, 154, 0.35), (-25, -12, 46, 51, 0.4),     # sur de Chile, este de Australia, Madagascar
    (17, 28, -108, -99, 0.35), (-47, -34, 166, 179, 0.5),                                # Sierra Madre (pinos), Nueva Zelanda
]
b = np.full((H, W), 0.04, np.float32)
for la0, la1, lo0, lo1, v in ZONAS:
    m = ((LAT > la0) & (LAT < la1) & (LON > lo0) & (LON < lo1)).astype(np.float32) * v
    b = np.maximum(b, m)
for _ in range(6):   # bordes suaves (≈ 4°)
    b = (np.roll(b, 3, 1) + b + np.roll(b, -3, 1)) / 3
    b = (np.pad(b, ((3, 3), (0, 0)), mode='edge')[:-6] + b + np.pad(b, ((3, 3), (0, 0)), mode='edge')[6:]) / 3
img = np.ones((H, W, 4), np.float32); img[..., 0] = b
im = bpy.data.images.get('bioma') or bpy.data.images.new('bioma', W, H, alpha=False)
im.pixels.foreach_set(np.ascontiguousarray(img[::-1]).ravel()); im.update()
im.filepath_raw = BASE + 'texturas/bioma.png'; im.file_format = 'PNG'; im.save(); im.colorspace_settings.name = 'Non-Color'
im.pack()

# 3) el factor de densidad de GN_capa se multiplica por el bioma
ng = bpy.data.node_groups['GN_capa']; N = ng.nodes; L = ng.links
dist = next(n for n in N if n.bl_idname == 'GeometryNodeDistributePointsOnFaces')
fuente = dist.inputs['Density Factor'].links[0].from_socket
if not any(n.name == 'Bioma' for n in N):
    uv = N.new('GeometryNodeInputNamedAttribute'); uv.data_type = 'FLOAT_VECTOR'; uv.inputs['Name'].default_value = 'UVMap'
    t = N.new('GeometryNodeImageTexture'); t.name = 'Bioma'; t.inputs['Image'].default_value = im
    L.new(uv.outputs['Attribute'], t.inputs['Vector'])
    sp = N.new('FunctionNodeSeparateColor'); L.new(t.outputs['Color'], sp.inputs['Color'])
    mul = N.new('ShaderNodeMath'); mul.operation = 'MULTIPLY'
    L.new(fuente, mul.inputs[0]); L.new(sp.outputs['Red'], mul.inputs[1]); L.new(mul.outputs[0], dist.inputs['Density Factor'])

# 4) densidades y tamaños más bajos
AJUSTE = {
    'Veg_conifera': {'Densidad': 7.0, 'Distancia mínima': 0.42, 'Escala mín': 0.55, 'Escala máx': 0.85, 'Claros': 0.40},
    'Veg_emblema': {'Densidad': 0.5, 'Distancia mínima': 1.3, 'Escala mín': 0.7, 'Escala máx': 0.95},
    'Veg_piso': {'Densidad': 3.0, 'Distancia mínima': 0.4, 'Escala mín': 0.6, 'Escala máx': 0.9, 'Claros': 0.5},
}
pl = bpy.data.objects['Planeta']
for mod in pl.modifiers:
    ids = {i.name: i.identifier for i in mod.node_group.interface.items_tree if getattr(i, 'in_out', None) == 'INPUT'}
    for k, v in AJUSTE.get(mod.name, {}).items():
        getattr(mod.properties.inputs, ids[k]).value = v

# 5) menos nubes: las protagonistas y 4 de las 10 al azar
for n in [f'Nube_{i:02d}' for i in (0, 2, 3, 5, 7, 9)]:
    o = bpy.data.objects.get(n)
    if o: bpy.data.objects.remove(o, do_unlink=True)

scn.frame_set(250); bpy.context.view_layer.update()
dg = bpy.context.evaluated_depsgraph_get()
cuenta = {}
for inst in dg.object_instances:
    if inst.is_instance and inst.parent and inst.parent.original.name == 'Planeta':
        cuenta[inst.object.original.name] = cuenta.get(inst.object.original.name, 0) + 1
print('LIMPIO', sum(cuenta.values()), cuenta)
scn.frame_set(1)
bpy.ops.wm.save_as_mainfile(filepath=BASE + 'planeta_ventures_limpio.blend', copy=False)

if os.environ.get('EXPORTAR') == '1':
    exec(open(BASE + 'web/exportar_desde_blender.py').read(), {'__name__': '__main__'})
