# Cargar en Blender como texto ("ortho_draw.py") y ejecutar con exec(); ver SKILL.md
# Vistas ortográficas de línea (aristas reales) de un modelo 3D, listas para una lámina web.
# Autocontenido: no depende de otros scripts.
import bpy, math, numpy as np

PERI = (154 / 255, 166 / 255, 255 / 255)   # #9AA6FF, color de línea del sitio PRODI


def load_np(path):
    im = bpy.data.images.load(path, check_existing=False)       # nunca la caché: los renders cambian
    W, H = im.size
    A = np.array(im.pixels[:], dtype=np.float32).reshape(H, W, 4)[::-1]
    bpy.data.images.remove(im); return A


def save_np(A, out):
    H, W = A.shape[:2]
    im = bpy.data.images.new("tmp_np", W, H, alpha=True)
    im.pixels[:] = A[::-1].ravel(); im.filepath_raw = out; im.file_format = 'PNG'; im.save()
    bpy.data.images.remove(im)


def _override_render(sc, out, mode, scale):
    """Render con material emisivo forzado: 'normal' (normales en color) o 'id' (color aleatorio por objeto)."""
    vl = sc.view_layers[0]
    m = bpy.data.materials.get("LT_OV_" + mode) or bpy.data.materials.new("LT_OV_" + mode); m.use_nodes = True
    nt = m.node_tree; nt.nodes.clear()
    o = nt.nodes.new("ShaderNodeOutputMaterial"); e = nt.nodes.new("ShaderNodeEmission")
    if mode == "normal":
        g = nt.nodes.new("ShaderNodeNewGeometry"); vm = nt.nodes.new("ShaderNodeVectorMath"); vm.operation = 'MULTIPLY_ADD'
        vm.inputs[1].default_value = (.5, .5, .5); vm.inputs[2].default_value = (.5, .5, .5)
        nt.links.new(g.outputs["Normal"], vm.inputs[0]); nt.links.new(vm.outputs[0], e.inputs[0])
    else:
        oi = nt.nodes.new("ShaderNodeObjectInfo"); h = nt.nodes.new("ShaderNodeCombineColor"); h.mode = 'HSV'
        nt.links.new(oi.outputs["Random"], h.inputs[0]); h.inputs[1].default_value = 1; h.inputs[2].default_value = 1
        nt.links.new(h.outputs[0], e.inputs[0])
    nt.links.new(e.outputs[0], o.inputs[0])
    old = vl.material_override; vl.material_override = m
    vt = sc.view_settings.view_transform
    ids = [i.identifier for i in bpy.types.ColorManagedViewSettings.bl_rna.properties['view_transform'].enum_items]
    sc.view_settings.view_transform = 'Raw' if 'Raw' in ids else 'Standard'
    sc.render.use_freestyle = False; sc.render.resolution_percentage = 100 * scale
    try: sc.eevee.taa_render_samples = 1
    except Exception: pass
    sc.render.filepath = out; sc.render.image_settings.file_format = 'PNG'
    bpy.ops.render.render(write_still=True, scene=sc.name)
    vl.material_override = old; sc.render.resolution_percentage = 100; sc.view_settings.view_transform = vt


def setup_scene(sc):
    """Mundo negro (el pase de ID usa el fondo como 'vacío') y EEVEE."""
    w = bpy.data.worlds.get("LT_World") or bpy.data.worlds.new("LT_World"); w.use_nodes = True; sc.world = w
    bg = next(n for n in w.node_tree.nodes if n.type == "BACKGROUND")
    bg.inputs[0].default_value = (0, 0, 0, 1); bg.inputs[1].default_value = 0
    sc.render.engine = 'BLENDER_EEVEE'


def render_view(sc, name, view, out_png, tmp, pxm=14.0, ss=3,
                w_sil=1.0, w_inner=0.55, fill=0.07, color=PERI):
    """view = dict(loc=(x,y,z), rot=(grados X,Y,Z), w=ancho_m, h=alto_m). Cámara ORTHO.
    Ejemplos (objeto con proa/frente hacia +X, babor +Y, Z arriba):
      alzado (desde estribor, frente a la derecha): rot (90,0,0), cámara en -Y
      planta (desde arriba, frente a la derecha):   rot (0,0,0),  cámara en +Z
      frente (desde proa, babor a la derecha):      rot (90,0,90), cámara en +X
    Salida: PNG RGBA de líneas en `color`; silueta al 100 %, aristas interiores al 55 %, relleno 7 %."""
    cd = bpy.data.cameras.get("LT_Cam_" + name) or bpy.data.cameras.new("LT_Cam_" + name)
    cd.type = 'ORTHO'; cd.clip_start = 0.5; cd.clip_end = 5000; cd.sensor_fit = 'AUTO'
    cd.ortho_scale = max(view["w"], view["h"]); cd.shift_x = cd.shift_y = 0
    cam = bpy.data.objects.get("LT_Cam_" + name) or bpy.data.objects.new("LT_Cam_" + name, cd)
    if cam.name not in sc.collection.objects: sc.collection.objects.link(cam)
    cam.location = view["loc"]; cam.rotation_euler = tuple(math.radians(a) for a in view["rot"]); sc.camera = cam
    W = int(round(view["w"] * pxm)); H = int(round(view["h"] * pxm))
    sc.render.resolution_x = W; sc.render.resolution_y = H
    _override_render(sc, tmp + name + "_n.png", "normal", ss)
    _override_render(sc, tmp + name + "_id.png", "id", ss)
    N = load_np(tmp + name + "_n.png")[..., :3]; I = load_np(tmp + name + "_id.png")[..., :3]

    def grad(A, th):
        d = np.zeros(A.shape[:2], bool)
        d[:, 1:] |= np.abs(np.diff(A, axis=1)).max(2) > th; d[1:, :] |= np.abs(np.diff(A, axis=0)).max(2) > th
        return d

    def dil(m):
        o = m.copy(); o[1:, :] |= m[:-1, :]; o[:-1, :] |= m[1:, :]; o[:, 1:] |= m[:, :-1]; o[:, :-1] |= m[:, 1:]; return o

    occ = I.max(2) > 0.02
    sil = dil(grad(occ[..., None].astype(np.float32), 0.5))
    E = dil(grad(N, 0.08) | grad(I, 0.02))
    inner = E & ~sil
    Hs, Ws = occ.shape
    ds = lambda m: m.astype(np.float32).reshape(Hs // ss, ss, Ws // ss, ss).mean((1, 3))
    a = np.clip(ds(sil) * 1.35, 0, 1) * w_sil
    b = np.clip(ds(inner) * 1.35, 0, 1) * w_inner
    f = ds(occ) * fill
    line = np.maximum(a, b)
    alpha = np.clip(line + f * (1 - line), 0, 1)
    img = np.dstack([np.full_like(alpha, color[0]), np.full_like(alpha, color[1]), np.full_like(alpha, color[2]), alpha])
    save_np(img.astype(np.float32), out_png)
    return W, H


def world_bounds(sc, types=('MESH',)):
    """Extremos reales del modelo (para encuadres y cotas): nunca inventar medidas."""
    xs = []; ys = []; zs = []
    for o in sc.objects:
        if o.type not in types: continue
        for v in o.data.vertices:
            w = o.matrix_world @ v.co; xs.append(w.x); ys.append(w.y); zs.append(w.z)
    return (min(xs), max(xs)), (min(ys), max(ys)), (min(zs), max(zs))
