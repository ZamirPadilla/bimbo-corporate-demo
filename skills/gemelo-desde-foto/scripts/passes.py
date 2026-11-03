# Cargar en Blender como texto y ejecutar con exec(); ver SKILL.md
# Pases finales para la web: "modelo" (render arcilla) y "plano" (aristas reales), mismo encuadre que la foto,
# y la tira de cielo para extender el cielo de la foto sin editarla.
# Requiere en Blender los textos "measure.py" y "check.py".
import bpy, numpy as np

NAVY = np.array([23, 23, 38]) / 255      # #171726, fondo del sitio
PERI = np.array([154, 166, 255]) / 255   # #9AA6FF, líneas de plano del sitio


def _ns(text):
    ns = {}; exec(bpy.data.texts[text].as_string(), ns); return ns


def render_model(sc, out_jpg, scale_pct=200, samples=128, quality=92, tmpdir=None):
    """Render EEVEE del modelo a 2x la foto, con fondo transparente compuesto sobre #171726 exacto (el mundo
    pasado por AgX y la exposición salía #0B0D19 y se veía el borde de la imagen contra la página)."""
    import os
    try: sc.eevee.taa_render_samples = samples
    except Exception: pass
    tmp = (tmpdir or os.path.dirname(out_jpg) + "/") + "_modelo_rgba.png"
    sc.render.film_transparent = True; sc.render.resolution_percentage = scale_pct
    sc.render.image_settings.file_format = 'PNG'; sc.render.image_settings.color_mode = 'RGBA'
    sc.render.filepath = tmp
    bpy.ops.render.render(write_still=True, scene=sc.name)
    sc.render.resolution_percentage = 100; sc.render.film_transparent = False; sc.render.image_settings.color_mode = 'RGB'
    ms = _ns("measure.py"); A = ms["load_np"](tmp); a = A[..., 3:4]
    A[..., :3] = A[..., :3]*a + NAVY*(1 - a); A[..., 3] = 1     # PNG sin premultiplicar
    ms["save_np"](A.astype(np.float32), tmp); save_jpg(tmp, out_jpg, quality, sc); os.remove(tmp)


def render_plano(sc, out_jpg, tmpdir, quality=92, gain=1.6, sup=4, out=2):
    """Aristas reales (saltos de normal + ID de objeto) calculadas a `sup`x y promediadas a `out`x: líneas
    finas con antialias. Nada de wireframe ni retículas. (Nauka, foto de 2500 px: sup=2, out=1.)"""
    ck = _ns("check.py"); ms = _ns("measure.py")
    E = ck["edge_map"](sc, tmpdir + "bp", sup).astype(np.float32)
    H, W = E.shape; k = sup // out
    E2 = np.clip(E.reshape(H // k, k, W // k, k).mean((1, 3)) * gain, 0, 1)
    h, w = E2.shape
    img = NAVY * np.ones((h, w, 3)); img = img * (1 - E2[..., None]) + PERI * E2[..., None]
    ms["save_np"](np.dstack([img, np.ones((h, w))]).astype(np.float32), tmpdir + "plano_tmp.png")
    save_jpg(tmpdir + "plano_tmp.png", out_jpg, quality, sc)


def save_jpg(src_png, out_jpg, quality=90, sc=None):
    """PNG → JPEG con los colores tal cual: save_render con vista 'Standard', exposición 0 y gamma 1 (con la vista
    de la escena —AgX, exposición −0.4— el azul del plano dejaba de ser #171726 y se notaba el borde en la página;
    Image.save() a secas guarda PNG aunque el nombre diga .jpg)."""
    sc = sc or bpy.context.scene; vs = sc.view_settings; ims = sc.render.image_settings
    old = (vs.view_transform, vs.look, vs.exposure, vs.gamma, ims.file_format, ims.quality)
    vs.view_transform = 'Standard'; vs.look = 'None'; vs.exposure = 0.0; vs.gamma = 1.0
    ims.file_format = 'JPEG'; ims.quality = quality
    im = bpy.data.images.load(src_png, check_existing=False)
    try: im.save_render(out_jpg, scene=sc)
    finally:
        bpy.data.images.remove(im)
        vs.view_transform, vs.look, vs.exposure, vs.gamma, ims.file_format, ims.quality = old


def sky_strip(photo, out_png, W=1024, H=368, rows=6, sigma=26.0):
    """Tira 1024×4 con el color del borde superior de la foto: mediana de `rows` filas (descarta nubes
    sueltas) + desenfoque horizontal fuerte (sin él, cada nube deja una raya vertical al estirarla)."""
    ms = _ns("measure.py")
    im = bpy.data.images.load(photo, check_existing=False); im.scale(W, H)
    A = np.array(im.pixels[:], dtype=np.float32).reshape(H, W, 4)[::-1]; bpy.data.images.remove(im)
    row = np.median(A[0:rows, :, :3], axis=0)
    R = int(sigma * 3); k = np.exp(-0.5 * (np.arange(-R, R + 1) / sigma) ** 2); k /= k.sum()
    pad = np.pad(row, ((R, R), (0, 0)), mode='reflect')
    sm = np.stack([np.convolve(pad[:, c], k, mode='valid') for c in range(3)], 1)
    ms["save_np"](np.dstack([sm[None, :, :].repeat(4, 0), np.ones((4, W))]).astype(np.float32), out_png)


def registration(photo_ref, photo_new, W=1024, H=368, search=6):
    """¿La foto nueva (upscale, otra versión) tiene el mismo encuadre? Correlación de gradientes con
    búsqueda de desfase. Aceptar solo desfase (0,0) y correlación alta (≥ 0.8)."""
    def load(p):
        im = bpy.data.images.load(p, check_existing=False); im.scale(W, H)
        A = np.array(im.pixels[:], dtype=np.float32).reshape(H, W, 4)[::-1][..., :3].mean(2)
        bpy.data.images.remove(im); return A
    g = lambda a: np.abs(np.diff(a, axis=1))[:-1, :] + np.abs(np.diff(a, axis=0))[:, :-1]
    a, b = g(load(photo_ref)), g(load(photo_new)); m = search + 4
    best = max((np.corrcoef(a[m:-m, m:-m].ravel(), np.roll(np.roll(b, dy, 0), dx, 1)[m:-m, m:-m].ravel())[0, 1], dx, dy)
               for dy in range(-search, search + 1) for dx in range(-search, search + 1))
    return dict(corr=round(float(best[0]), 3), dx=best[1], dy=best[2])
