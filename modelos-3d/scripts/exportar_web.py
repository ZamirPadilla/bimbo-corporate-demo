"""Exporta animacion-llegada-salida.blend a la página web (three.js). Ejecutar en Blender con el archivo abierto;
NO guarda el .blend (prepara una copia en memoria y exporta).

Salida en public/animaciones/planta-llegada/assets/ (el .blend vive en modelos-3d/):
  planta_llegada.glb   escena completa con la animación horneada (camiones, llantas, coches y cámara, 500 cuadros
                       a 25 fps = 20 s), texturas WebP y mallas con Draco.
Preparación: las instancias de colección (tráileres estacionados) se vuelven objetos reales; los materiales
procedurales que glTF no entiende se sustituyen: paneles solares → textura de módulo repetida con UV en metros,
lámina de azotea → color liso.
"""
import bpy, bmesh, os
import numpy as np

BASE = os.path.dirname(bpy.data.filepath) + '/'
OUT = BASE + '../public/animaciones/planta-llegada/assets/'; os.makedirs(OUT, exist_ok=True)
scn = bpy.context.scene

# 1) instancias -> objetos reales
for o in [o for o in scn.objects if o.instance_type == 'COLLECTION' and o.instance_collection]:
    for s in scn.objects: s.select_set(False)
    o.select_set(True); bpy.context.view_layer.objects.active = o
    with bpy.context.temp_override(selected_objects=[o], active_object=o, object=o):
        bpy.ops.object.duplicates_make_real(use_base_parent=False, use_hierarchy=True)
for o in [o for o in scn.objects if o.type == 'EMPTY' and o.name.startswith('Estacionado')]:
    bpy.data.objects.remove(o, do_unlink=True)

# 2) paneles solares: textura de un módulo (1.0 × 1.7 m, 6 × 10 celdas, marco claro)
W, H = 120, 204
img = np.zeros((H, W, 4), np.float32); img[..., 3] = 1
cel = np.array([0x1f, 0x2d, 0x3e]) / 255; cel2 = np.array([0x24, 0x34, 0x49]) / 255; marco = np.array([0xb9, 0xc0, 0xc6]) / 255
img[..., :3] = cel
yy, xx = np.mgrid[0:H, 0:W]
img[(yy // 20 + xx // 20) % 2 == 1, :3] = cel2
img[(xx % 20 == 0) | (yy % 20 == 0), :3] = cel * 0.8
img[(xx < 3) | (xx >= W - 3) | (yy < 3) | (yy >= H - 3), :3] = marco
lin = np.where(img[..., :3] <= 0.04045, img[..., :3] / 12.92, ((img[..., :3] + 0.055) / 1.055) ** 2.4)
im = bpy.data.images.new('panel_modulo', W, H, alpha=False); px = img.copy(); px[..., :3] = lin
im.pixels.foreach_set(px[::-1].ravel()); im.file_format = 'PNG'; im.pack()
for m in [m for m in bpy.data.materials if m.name.endswith('panel_solar')]:
    nt = m.node_tree; b = next(n for n in nt.nodes if n.type == 'BSDF_PRINCIPLED')
    for n in [n for n in nt.nodes if n.type not in ('BSDF_PRINCIPLED', 'OUTPUT_MATERIAL')]: nt.nodes.remove(n)
    t = nt.nodes.new('ShaderNodeTexImage'); t.image = im; t.extension = 'REPEAT'
    nt.links.new(t.outputs['Color'], b.inputs['Base Color']); b.inputs['Metallic'].default_value = 0.3; b.inputs['Roughness'].default_value = 0.3
    for o in [o for o in bpy.data.objects if o.type == 'MESH' and o.data.materials and o.data.materials[0] == m]:
        me = o.data
        if o.data.users > 1: o.data = me = me.copy()
        bm = bmesh.new(); bm.from_mesh(me); uv = bm.loops.layers.uv.verify()
        for f in bm.faces:
            for l in f.loops: l[uv].uv = (l.vert.co.x / 1.0, l.vert.co.y / 1.7)
        bm.to_mesh(me); bm.free()
for m in [m for m in bpy.data.materials if m.name.endswith('lamina')]:
    nt = m.node_tree; b = next(n for n in nt.nodes if n.type == 'BSDF_PRINCIPLED')
    for n in [n for n in nt.nodes if n.type not in ('BSDF_PRINCIPLED', 'OUTPUT_MATERIAL')]: nt.nodes.remove(n)
    b.inputs['Base Color'].default_value = (0.74, 0.76, 0.76, 1)

# 3) exportar
bpy.ops.export_scene.gltf(
    filepath=OUT + 'planta_llegada.glb', export_format='GLB', use_visible=True, export_apply=True,
    export_cameras=True, export_lights=False, export_animations=True, export_animation_mode='SCENE',
    export_frame_range=True, export_force_sampling=True, export_optimize_animation_size=True,
    export_image_format='WEBP', export_image_quality=80,
    export_draco_mesh_compression_enable=True, export_draco_mesh_compression_level=7)
print('glb', round(os.path.getsize(OUT + 'planta_llegada.glb') / 1e6, 2), 'MB')
