"""media_db.py — única vía para modificar el drive de media de un cliente (skill `media-drive-ia`).

El drive (p. ej. "Shared drives/Bimbo") lo administra solo una IA que leyó la skill. Este script mueve
archivos, mantiene la base de datos `_sistema/media.json`, regenera las vistas (`media.csv`, `INDICE.md`) y
deja cada operación en `_sistema/bitacora.jsonl`. Nada se borra: lo retirado va a `99_papelera/`.

Uso (la raíz se pasa con --drive o con la variable MEDIA_DRIVE):
  media_db.py --drive RAIZ iniciar --cliente "Grupo Bimbo" --prefijo BMB
  media_db.py --drive RAIZ ingresar ARCHIVO_O_CARPETA --tema camioncitos --origen tercero \
              --fuente "Mercado Libre" [--url URL] [--derechos referencia-interna] [--titulo T] \
              [--etiquetas a,b] [--seccion historia] [--subcarpeta "Camion Bimbo 40"] [--rol contenido] [--mover] [--json metadatos.json]
  media_db.py --drive RAIZ importar-manifiesto CSV CARPETA_BASE --origen oficial --fuente grupobimbo.com
  media_db.py --drive RAIZ editar ID campo=valor [campo=valor …]      (campos con punto: origen.url=…)
  media_db.py --drive RAIZ mover ID [--tema NUEVO_TEMA] [--subcarpeta "Camion Bimbo 40"]
  media_db.py --drive RAIZ retirar ID --motivo "duplicado de BMB-0001"
  media_db.py --drive RAIZ reemplazar ID ARCHIVO_NUEVO --motivo "versión corregida"   (mismo ID; la anterior va a 99_papelera)
  media_db.py --drive RAIZ buscar TEXTO [--rol contenido|referencia] [--tema gente]
  media_db.py --drive RAIZ verificar          (archivos faltantes, huérfanos, hash distinto; código 1 si hay fallas)
  media_db.py --drive RAIZ vista              (regenera media.csv, INDICE.md y el LEEME)
  media_db.py --drive RAIZ contexto contexto.md   (contexto del cliente que se incluye en el LEEME)
"""
import argparse
import contextlib
import csv
import datetime as dt
import fcntl
import hashlib
import json
import os
import re
import shutil
import struct
import subprocess
import sys
import unicodedata

VERSION = "1.4.0"
SISTEMA = "_sistema"
CARPETAS = ["00_entrada", "01_media/imagenes", "01_media/video", "01_media/referencias-terceros",
            "02_documentos", "03_datos", "99_papelera", SISTEMA]
TIPOS = {"imagen": {".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif", ".svg", ".tif", ".tiff", ".heic"},
         "video": {".mp4", ".mov", ".webm", ".m4v"},
         "documento": {".pdf", ".docx", ".pptx", ".key", ".md", ".txt", ".html"},
         "dato": {".csv", ".json", ".xlsx", ".tsv"}}
DERECHOS = {"oficial-cliente": "Material publicado por el cliente en sus canales oficiales",
            "referencia-interna": "De terceros; solo para inspiración o modelado, nunca se publica",
            "licencia-libre": "Licencia que permite uso (anotar cuál en notas)",
            "nuclea": "Producido por Nuclea",
            "por-confirmar": "Sin certeza de derechos; no usar hasta confirmar"}
ORIGENES = {"oficial", "tercero", "cliente", "nuclea"}
ROLES = {"contenido": "Listo para la página: limpio (sin texto ni interfaz de otro sitio), con resolución y derechos para usarse",
         "referencia": "Para consultar, inspirar, modelar o sacar datos; no va a la página tal cual"}


def problema_rol(a):
    """Regresa el motivo si el rol de un activo no es coherente con sus derechos o su uso, o None."""
    rol = a.get("rol", "")
    if rol not in ROLES: return f"rol inválido o vacío ({rol!r}; usa {', '.join(ROLES)})"
    if rol == "contenido" and a["derechos"] in ("referencia-interna", "por-confirmar"):
        return f"un activo con derechos {a['derechos']} no puede ser contenido"
    if a["uso_demo"]["estado"] == "aprobado" and rol != "contenido":
        return "solo el contenido se aprueba para la demo; lo de referencia no va a la página"
    return None
ACTOR = os.environ.get("MEDIA_ACTOR", "claude")


def ahora():
    return dt.datetime.now().astimezone().isoformat(timespec="seconds")


def slug(t, n=48):
    t = unicodedata.normalize("NFKD", t).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", "-", t.lower()).strip("-")[:n].strip("-") or "sin-nombre"


def sha256(ruta):
    h = hashlib.sha256()
    with open(ruta, "rb") as f:
        for b in iter(lambda: f.read(1 << 20), b""):
            h.update(b)
    return h.hexdigest()


def tipo_de(ruta):
    ext = os.path.splitext(ruta)[1].lower()
    return next((t for t, s in TIPOS.items() if ext in s), "documento")


def dimensiones(ruta):
    """Ancho, alto y duración (si aplica) sin dependencias; usa ffprobe/sips si existen."""
    ext = os.path.splitext(ruta)[1].lower()
    try:
        b = open(ruta, "rb").read(1 << 16)
        if b[:8] == b"\x89PNG\r\n\x1a\n":
            w, h = struct.unpack(">II", b[16:24]); return w, h, None
        if b[:2] == b"\xff\xd8":
            i = 2
            while i < len(b) - 9:
                if b[i] != 0xFF: i += 1; continue
                m = b[i + 1]
                if m in (0xC0, 0xC1, 0xC2):
                    h, w = struct.unpack(">HH", b[i + 5:i + 9]); return w, h, None
                i += 2 + struct.unpack(">H", b[i + 2:i + 4])[0]
        if b[:4] == b"RIFF" and b[8:12] == b"WEBP":
            if b[12:16] == b"VP8X": return 1 + int.from_bytes(b[24:27], "little"), 1 + int.from_bytes(b[27:30], "little"), None
            if b[12:16] == b"VP8 ": w, h = struct.unpack("<HH", b[26:30]); return w & 0x3FFF, h & 0x3FFF, None
            if b[12:16] == b"VP8L":
                v = int.from_bytes(b[21:25], "little"); return (v & 0x3FFF) + 1, ((v >> 14) & 0x3FFF) + 1, None
    except OSError:
        pass
    if ext in TIPOS["video"] and shutil.which("ffprobe"):
        r = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height:format=duration",
                            "-of", "json", ruta], capture_output=True, text=True)
        try:
            d = json.loads(r.stdout); s = d["streams"][0]
            return s.get("width"), s.get("height"), round(float(d["format"]["duration"]), 2)
        except Exception:
            pass
    if shutil.which("sips") and ext in TIPOS["imagen"]:
        r = subprocess.run(["sips", "-g", "pixelWidth", "-g", "pixelHeight", ruta], capture_output=True, text=True)
        n = re.findall(r"pixel(?:Width|Height): (\d+)", r.stdout)
        if len(n) == 2: return int(n[0]), int(n[1]), None
    return None, None, None


class Base:
    def __init__(self, raiz):
        self.raiz = os.path.abspath(os.path.expanduser(raiz))
        self.sis = os.path.join(self.raiz, SISTEMA)
        self.ruta_db = os.path.join(self.sis, "media.json")
        self.db = None

    @contextlib.contextmanager
    def abierta(self, escribir=True):
        os.makedirs(self.sis, exist_ok=True)
        with open(os.path.join(self.sis, ".lock"), "w") as lk:
            fcntl.flock(lk, fcntl.LOCK_EX)
            if not os.path.exists(self.ruta_db):
                sys.exit("No hay base de datos. Corre primero: media_db.py --drive RAIZ iniciar --cliente … --prefijo …")
            self.db = json.load(open(self.ruta_db, encoding="utf-8"))
            yield self.db
            if escribir:
                self.db["actualizado"] = ahora()
                tmp = self.ruta_db + ".tmp"
                json.dump(self.db, open(tmp, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
                os.replace(tmp, self.ruta_db)
                self.vistas()

    def bitacora(self, accion, **datos):
        with open(os.path.join(self.sis, "bitacora.jsonl"), "a", encoding="utf-8") as f:
            f.write(json.dumps({"fecha": ahora(), "actor": ACTOR, "version": VERSION, "accion": accion, **datos}, ensure_ascii=False) + "\n")

    def nuevo_id(self):
        self.db["siguiente"] = self.db.get("siguiente", 1)
        i = f'{self.db["prefijo"]}-{self.db["siguiente"]:05d}'
        self.db["siguiente"] += 1
        return i

    def por_hash(self, h):
        return next((a for a in self.db["activos"] if a["sha256"] == h and a["estado"] == "activo"), None)

    def destino(self, tipo, tema, derechos, sub=""):
        if derechos == "referencia-interna":
            base = os.path.join("01_media", "referencias-terceros", tema)
        else:
            base = {"imagen": os.path.join("01_media", "imagenes", tema), "video": os.path.join("01_media", "video", tema),
                    "documento": os.path.join("02_documentos", tema), "dato": os.path.join("03_datos", tema)}[tipo]
        return os.path.join(base, slug(sub)) if sub else base

    def agregar(self, origen_archivo, tema, origen, fuente, url="", derechos=None, titulo="", etiquetas=(),
                seccion="", pagina="", alt="", notas="", mover=False, extra=None, sub="", rol=""):
        if tema not in self.db["temas"]:
            sys.exit(f"Tema desconocido: {tema}. Temas válidos: {', '.join(self.db['temas'])} (agrégalo en config con 'editar-config').")
        if origen not in ORIGENES: sys.exit(f"Origen inválido: {origen} ({', '.join(sorted(ORIGENES))})")
        derechos = derechos or ("oficial-cliente" if origen in ("oficial", "cliente") else "nuclea" if origen == "nuclea" else "referencia-interna")
        if derechos not in DERECHOS: sys.exit(f"Derechos inválidos: {derechos} ({', '.join(DERECHOS)})")
        rol = rol or "referencia"   # todo entra como referencia hasta que alguien confirme que sirve para la página
        if rol not in ROLES: sys.exit(f"Rol inválido: {rol} ({', '.join(ROLES)})")
        if rol == "contenido" and derechos in ("referencia-interna", "por-confirmar"):
            sys.exit(f"Con derechos {derechos} el rol solo puede ser referencia")
        h = sha256(origen_archivo)
        dup = self.por_hash(h)
        if dup:
            self.bitacora("duplicado-omitido", archivo=origen_archivo, igual_a=dup["id"])
            return dup, False
        tipo = tipo_de(origen_archivo)
        aid = self.nuevo_id()
        ext = os.path.splitext(origen_archivo)[1].lower()
        base_nombre = slug(titulo or os.path.splitext(os.path.basename(origen_archivo))[0])
        carpeta = self.destino(tipo, tema, derechos, sub)
        rel = os.path.join(carpeta, f"{aid}_{base_nombre}{ext}")
        os.makedirs(os.path.join(self.raiz, carpeta), exist_ok=True)
        (shutil.move if mover else shutil.copy2)(origen_archivo, os.path.join(self.raiz, rel))
        w, hh, dur = dimensiones(os.path.join(self.raiz, rel))
        a = {"id": aid, "archivo": rel, "titulo": titulo or os.path.basename(origen_archivo), "tipo": tipo, "formato": ext.lstrip("."),
             "bytes": os.path.getsize(os.path.join(self.raiz, rel)), "ancho": w, "alto": hh, "duracion_s": dur, "sha256": h,
             "tema": tema, "subcarpeta": slug(sub) if sub else "", "etiquetas": sorted({e.strip() for e in etiquetas if e.strip()}),
             "origen": {"tipo": origen, "fuente": fuente, "url": url, "pagina": pagina, "nombre_original": os.path.basename(origen_archivo),
                        "obtenido": ahora()},
             "derechos": derechos, "rol": rol, "alt": alt, "uso_demo": {"seccion": seccion, "estado": "candidato"},
             "relacionados": [], "notas": notas, "estado": "activo", "creado": ahora(), "actualizado": ahora()}
        if extra: a.update(extra)
        self.db["activos"].append(a)
        self.bitacora("ingresar", id=aid, archivo=rel, origen=origen_archivo, movido=mover)
        return a, True

    def vistas(self):
        act = [a for a in self.db["activos"] if a["estado"] == "activo"]
        with open(os.path.join(self.sis, "media.csv"), "w", newline="", encoding="utf-8") as f:
            w = csv.writer(f)
            w.writerow(["id", "archivo", "titulo", "tipo", "tema", "etiquetas", "derechos", "rol", "origen", "fuente", "url", "ancho", "alto",
                        "duracion_s", "bytes", "seccion", "estado_uso"])
            for a in act:
                w.writerow([a["id"], a["archivo"], a["titulo"], a["tipo"], a["tema"], ";".join(a["etiquetas"]), a["derechos"],
                            a.get("rol", ""), a["origen"]["tipo"], a["origen"]["fuente"], a["origen"]["url"], a["ancho"], a["alto"], a["duracion_s"],
                            a["bytes"], a["uso_demo"]["seccion"], a["uso_demo"]["estado"]])
        lineas = [f"# Índice de media · {self.db['cliente']}", "",
                  f"Generado por `media_db.py` {VERSION} el {ahora()}. **No editar a mano**: este archivo y "
                  f"`media.json` los mantiene solo la IA con la skill `media-drive-ia`.", "",
                  f"{len(act)} activos · {sum(a['bytes'] for a in act) / 1e6:.1f} MB · "
                  f"{sum(1 for a in act if a.get('rol') == 'contenido')} de contenido para la página y "
                  f"{sum(1 for a in act if a.get('rol') == 'referencia')} de referencia.", "",
                  "**Contenido** está listo para usarse en la página. **Referencia** sirve para consultar, inspirar, modelar o "
                  "sacar datos, pero no va a la página tal cual.", "",
                  "| Tema | Activos | Contenido | Referencia | Imágenes | Videos | Documentos | Datos | De terceros |",
                  "|---|---:|---:|---:|---:|---:|---:|---:|---:|"]
        for t in self.db["temas"]:
            s = [a for a in act if a["tema"] == t]
            if not s: continue
            c = lambda k: sum(1 for a in s if a["tipo"] == k)
            r = lambda k: sum(1 for a in s if a.get("rol") == k)
            lineas.append(f"| {t} | {len(s)} | {r('contenido')} | {r('referencia')} | {c('imagen')} | {c('video')} | {c('documento')} | {c('dato')} | {sum(1 for a in s if a['derechos'] == 'referencia-interna')} |")
        for t in self.db["temas"]:
            s = [a for a in act if a["tema"] == t]
            if not s: continue
            lineas += ["", f"## {t}"]
            for rol, nombre in (("contenido", "Contenido para la página"), ("referencia", "Referencia"), ("", "Sin clasificar")):
                g = [a for a in s if a.get("rol", "") == rol]
                if not g: continue
                lineas += ["", f"### {nombre} ({len(g)})", "", "| ID | Título | Tipo | Derechos | Uso en la demo | Archivo |", "|---|---|---|---|---|---|"]
                for a in g:
                    uso = " · ".join(x for x in (a["uso_demo"]["estado"], a["uso_demo"]["seccion"]) if x)
                    lineas.append(f"| {a['id']} | {a['titulo'].replace('|', '·')} | {a['tipo']} | {a['derechos']} | {uso} | `{a['archivo']}` |")
        open(os.path.join(self.sis, "INDICE.md"), "w", encoding="utf-8").write("\n".join(lineas) + "\n")
        escribir_leeme(self)


SKILL_FUENTE = "skill `media-drive-ia` del plugin `nuclea-demo-kit` (carpeta `skills/media-drive-ia/`)"

LEEME = """# {cliente} · drive de media administrado por IA

> Generado por `media_db.py` {version} el {fecha}. **No editar a mano**: el script lo reescribe en cada operación.
> Contexto del cliente: `_sistema/contexto-cliente.md` (se cambia con `media_db.py contexto ARCHIVO`).

**Este drive es una base de datos de media.** Ninguna persona lo gestiona; lo administra una IA (Claude) que ya
leyó la skill `media-drive-ia`. Todo cambio pasa por `_sistema/herramientas/media_db.py`, que actualiza la base
(`_sistema/media.json`), las vistas (`_sistema/INDICE.md`, `_sistema/media.csv`) y la bitácora
(`_sistema/bitacora.jsonl`). Prefijo de IDs: **{prefijo}**.

## Si eres una persona
- Para aportar material, déjalo en **`00_entrada/`** con una nota de dónde salió, y pide a la IA que lo ingrese.
- Para encontrar algo, abre **`_sistema/INDICE.md`** (catálogo por tema) o `_sistema/media.csv`; cada archivo
  empieza con su ID (`{prefijo}-00012_…`).
- **Para la página usa solo lo marcado como contenido.** En el índice, cada tema separa el *contenido* (listo para
  usarse) de la *referencia* (capturas, piezas con texto, material de terceros, miniaturas y documentos para consultar).
- No muevas, renombres ni borres nada: la verificación lo marca como huérfano o faltante y hay que repararlo.

## Si eres una IA (lee todo antes de operar)
1. **Lee la skill completa.** Fuente: {skill}. Hay una copia en `_sistema/herramientas/SKILL.md` que puede estar
   atrasada: si su versión de `media_db.py` no coincide con la de la fuente, manda la fuente y corre
   `actualizar-herramientas` desde ella.
2. **Ubica la raíz.** En la máquina que la sincroniza con Drive para escritorio: `{raiz}`. Si tiene espacios, usa comillas.
   ```bash
   export MEDIA_DRIVE="{raiz}"
   M="$MEDIA_DRIVE/_sistema/herramientas/media_db.py"
   python3 -I "$M" verificar
   ```
3. **Solo con el script:** `verificar`, `buscar`, `ingresar`, `importar-manifiesto`, `editar`, `mover`,
   `reemplazar`, `retirar`, `editar-config`, `contexto`, `vista`, `actualizar-herramientas`. Nunca `cp`, `mv`,
   `rm` ni escritura directa fuera de `00_entrada/` (el hook `guardia_media.py` del plugin lo bloquea).
4. **Al empezar y al terminar, `verificar`.** Si hay huérfanos o faltantes, alguien editó a mano o Drive creó
   duplicados "(1)": investiga y repórtalo al usuario antes de seguir; no los borres.
5. **Antes de restaurar o reingresar algo, lee sus `notas`** (`buscar ID`): ahí quedan las decisiones del usuario
   (p. ej. "decidió dejarlo retirado"). Lo retirado no se recupera sin que el usuario lo pida.

## Reglas
- **Nada se borra:** `retirar` manda a `99_papelera/` y deja el motivo; las versiones viejas de un archivo
  (`reemplazar`) también van ahí con su número. Los IDs nunca se reutilizan.
- **Derechos:** lo oficial del cliente es `oficial-cliente`; lo de terceros (tiendas, prensa, Awwwards, fans) es
  `referencia-interna`, va a `01_media/referencias-terceros/` y **nunca se publica**; sin certeza, `por-confirmar`.
- **Carpetas del usuario (Descargas, etc.) se copian, no se mueven.** `--mover` solo para `00_entrada/`.
- **Si el usuario ya organizó el material** (carpetas por año o modelo), su clasificación manda: se respeta con
  `--subcarpeta` y se reubica conservando IDs.
- **Recortes:** solo si no cortan personas, productos ni logos y no dejan texto; si no, se usa el original.
- **Material interno de Nuclea no entra aquí:** análisis comerciales, notas de venta, estrategia, nombres de
  contactos del cliente, credenciales o datos personales.
- **Cifras dentro de imágenes no son fuente:** se verifican contra el informe anual antes de usarse.
- **Rol:** cada activo es `contenido` (limpio, con resolución y derechos para ir a la página) o `referencia` (para
  consultar, inspirar, modelar o sacar datos). Todo entra como referencia; pasa a contenido solo cuando sirve tal
  cual. Lo de terceros y lo `por-confirmar` siempre es referencia, y solo el contenido se aprueba en `uso_demo`.

## Estado al {fecha}
{estado}

## Estructura
| Carpeta | Contenido |
|---|---|
| `00_entrada/` | Buzón de material nuevo por ingresar |
| `01_media/imagenes/<tema>/[subcarpeta]/` | Imágenes oficiales o propias |
| `01_media/video/<tema>/` | Videos oficiales o propios |
| `01_media/referencias-terceros/<tema>/[subcarpeta]/` | Material de terceros: solo referencia interna |
| `02_documentos/<tema>/` | PDFs, manuales, README de investigación |
| `03_datos/<tema>/` | Inventarios (CSV, JSON) |
| `99_papelera/` | Lo retirado y las versiones anteriores |
| `_sistema/` | Base de datos, índice, bitácora, contexto del cliente y herramientas |

Temas válidos: {temas}. Para uno nuevo: `editar-config --agregar-tema`.
{contexto}"""


def escribir_leeme(b):
    db = b.db
    act = [a for a in db["activos"] if a["estado"] == "activo"]
    por_tema = ", ".join(f"{t} {n}" for t in db["temas"] for n in [sum(1 for a in act if a["tema"] == t)] if n)
    estado = (f"{len(act)} activos ({sum(a['bytes'] for a in act) / 1e6:.0f} MB): "
              f"{sum(1 for a in act if a.get('rol') == 'contenido')} de contenido y {sum(1 for a in act if a.get('rol') == 'referencia')} de referencia; "
              f"{sum(1 for a in db['activos'] if a['estado'] == 'papelera')} en papelera. Por tema: {por_tema or 'sin activos'}. "
              f"Siguiente ID: {db['prefijo']}-{db.get('siguiente', 1):05d}.")
    ctx = os.path.join(b.sis, "contexto-cliente.md")
    contexto = ("\n## Contexto del cliente\n\n" + open(ctx, encoding="utf-8").read().strip() + "\n") if os.path.exists(ctx) else ""
    texto = LEEME.format(cliente=db["cliente"], version=VERSION, fecha=ahora(), prefijo=db["prefijo"], skill=db.get("skill_fuente") or SKILL_FUENTE,
                         raiz=b.raiz, estado=estado, temas=", ".join(f"`{t}`" for t in db["temas"]), contexto=contexto)
    open(os.path.join(b.raiz, "LEEME - drive administrado por IA.md"), "w", encoding="utf-8").write(texto)


def herramientas(b, cliente):
    h = os.path.join(b.sis, "herramientas"); os.makedirs(h, exist_ok=True)
    aqui = os.path.dirname(os.path.abspath(__file__))
    if os.path.abspath(__file__) != os.path.abspath(os.path.join(h, "media_db.py")):
        shutil.copy2(os.path.abspath(__file__), os.path.join(h, "media_db.py"))
    skill = os.path.join(os.path.dirname(aqui), "SKILL.md")
    if os.path.exists(skill): shutil.copy2(skill, os.path.join(h, "SKILL.md"))
    if b.db is None: b.db = json.load(open(b.ruta_db, encoding="utf-8"))
    escribir_leeme(b)


def poner(d, clave, valor):
    partes = clave.split(".")
    for p in partes[:-1]: d = d.setdefault(p, {})
    if partes[-1] in ("etiquetas", "relacionados"): valor = sorted({v.strip() for v in valor.split(",") if v.strip()})
    d[partes[-1]] = valor


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--drive", default=os.environ.get("MEDIA_DRIVE"), required=not os.environ.get("MEDIA_DRIVE"))
    sub = ap.add_subparsers(dest="cmd", required=True)
    s = sub.add_parser("iniciar"); s.add_argument("--cliente", required=True); s.add_argument("--prefijo", required=True)
    s.add_argument("--temas", default="")
    s = sub.add_parser("ingresar"); s.add_argument("rutas", nargs="+")
    for k in ("tema", "origen", "fuente"): s.add_argument("--" + k, required=True)
    for k in ("url", "derechos", "titulo", "etiquetas", "seccion", "pagina", "alt", "notas", "json", "subcarpeta", "rol"): s.add_argument("--" + k, default="")
    s.add_argument("--mover", action="store_true")
    s = sub.add_parser("importar-manifiesto"); s.add_argument("csv"); s.add_argument("base")
    s.add_argument("--origen", required=True); s.add_argument("--fuente", required=True); s.add_argument("--derechos", default="")
    s.add_argument("--rol", default="")
    s.add_argument("--tema-por-defecto", default=""); s.add_argument("--mapa-temas", default="", help="cat1=tema1,cat2=tema2")
    s = sub.add_parser("editar"); s.add_argument("id"); s.add_argument("cambios", nargs="+")
    s = sub.add_parser("editar-config"); s.add_argument("--agregar-tema", action="append", default=[])
    s.add_argument("--skill-fuente", default=None, help="Dónde vive la skill para este drive (texto del LEEME)")
    s = sub.add_parser("mover"); s.add_argument("id"); s.add_argument("--tema", default=""); s.add_argument("--subcarpeta", default=None)
    s = sub.add_parser("retirar"); s.add_argument("id"); s.add_argument("--motivo", required=True)
    s = sub.add_parser("reemplazar"); s.add_argument("id"); s.add_argument("archivo"); s.add_argument("--motivo", required=True)
    s = sub.add_parser("buscar"); s.add_argument("texto", nargs="?", default="")
    s.add_argument("--rol", default=""); s.add_argument("--tema", default="")
    sub.add_parser("verificar"); sub.add_parser("vista"); sub.add_parser("actualizar-herramientas")
    s = sub.add_parser("contexto"); s.add_argument("archivo", help="Markdown con el contexto del cliente para el LEEME")
    a = ap.parse_args()
    b = Base(a.drive)

    if a.cmd == "iniciar":
        if os.path.exists(b.ruta_db): sys.exit("Ya existe una base de datos; no se reinicia.")
        for c in CARPETAS: os.makedirs(os.path.join(b.raiz, c), exist_ok=True)
        temas = [t.strip() for t in a.temas.split(",") if t.strip()] or ["general"]
        db = {"cliente": a.cliente, "prefijo": a.prefijo.upper(), "version_esquema": 1, "creado": ahora(), "actualizado": ahora(),
              "temas": temas, "derechos": DERECHOS, "siguiente": 1, "activos": []}
        json.dump(db, open(b.ruta_db, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
        b.db = db; b.vistas(); b.bitacora("iniciar", cliente=a.cliente, prefijo=db["prefijo"], temas=temas)
        herramientas(b, a.cliente)
        print("Drive iniciado en", b.raiz); return 0

    if a.cmd == "actualizar-herramientas":
        with b.abierta(escribir=False) as db:
            herramientas(b, db["cliente"])
        b.bitacora("actualizar-herramientas", version=VERSION); print("Herramientas y LEEME actualizados"); return 0

    if a.cmd in ("buscar", "verificar"):
        with b.abierta(escribir=False) as db:
            if a.cmd == "buscar":
                q = a.texto.lower()
                for x in db["activos"]:
                    if a.rol and x.get("rol", "") != a.rol: continue
                    if a.tema and x["tema"] != a.tema: continue
                    if q in json.dumps(x, ensure_ascii=False).lower():
                        print(f"{x['id']}  {x['estado']:8} {x.get('rol', '') or '¿rol?':10} {x['tema']:18} {x['titulo'][:60]}  ->  {x['archivo']}")
                return 0
            fallas = 0; registrados = set()
            for x in db["activos"]:
                ruta = os.path.join(b.raiz, x["archivo"]); registrados.add(os.path.normpath(x["archivo"]))
                if not os.path.exists(ruta): print("FALTA", x["id"], x["archivo"]); fallas += 1
                elif os.path.getsize(ruta) != x["bytes"] or sha256(ruta) != x["sha256"]: print("CAMBIÓ", x["id"], x["archivo"]); fallas += 1
            for x in db["activos"]:
                for ver in x.get("versiones", []): registrados.add(os.path.normpath(ver["archivo"]))
            for raiz_c in ("01_media", "02_documentos", "03_datos", "99_papelera"):
                for dp, _, fs in os.walk(os.path.join(b.raiz, raiz_c)):
                    for f in fs:
                        if f.startswith(".") or f.endswith(".tmp"): continue
                        rel = os.path.normpath(os.path.relpath(os.path.join(dp, f), b.raiz))
                        if rel not in registrados: print("HUÉRFANO (¿edición manual?)", rel); fallas += 1
            for x in db["activos"]:
                if x["estado"] == "activo" and problema_rol(x): print("ROL", x["id"], problema_rol(x)); fallas += 1
            entrada = [f for f in os.listdir(os.path.join(b.raiz, "00_entrada")) if not f.startswith(".")]
            if entrada: print(f"PENDIENTE en 00_entrada: {len(entrada)} elementos por ingresar")
            act = sum(1 for x in db["activos"] if x["estado"] == "activo")
            print(f"{act} activos, {len(db['activos']) - act} en papelera, {fallas} fallas")
            b.bitacora("verificar", fallas=fallas, activos=act)
            return 1 if fallas else 0

    with b.abierta() as db:
        if a.cmd == "vista":
            pass
        elif a.cmd == "contexto":
            shutil.copy2(a.archivo, os.path.join(b.sis, "contexto-cliente.md"))
            b.bitacora("contexto", origen=a.archivo, sha256=sha256(a.archivo))
        elif a.cmd == "editar-config":
            for t in a.agregar_tema:
                if t not in db["temas"]: db["temas"].append(slug(t))
            if a.skill_fuente is not None: db["skill_fuente"] = a.skill_fuente
            b.bitacora("editar-config", temas=db["temas"], skill_fuente=db.get("skill_fuente", ""))
        elif a.cmd == "ingresar":
            extra = json.load(open(a.json)) if a.json else None
            archivos = []
            for r in a.rutas:
                if os.path.isdir(r):
                    archivos += sorted(os.path.join(dp, f) for dp, _, fs in os.walk(r) for f in fs if not f.startswith("."))
                else:
                    archivos.append(r)
            n = 0
            for f in archivos:
                x, nuevo = b.agregar(f, a.tema, a.origen, a.fuente, a.url, a.derechos or None, a.titulo if len(archivos) == 1 else "",
                                     a.etiquetas.split(","), a.seccion, a.pagina, a.alt, a.notas, a.mover, extra, a.subcarpeta, a.rol)
                n += nuevo
                print(("NUEVO " if nuevo else "YA EXISTÍA ") + x["id"], x["archivo"])
            print(n, "ingresados")
        elif a.cmd == "importar-manifiesto":
            mapa = dict(p.split("=", 1) for p in a.mapa_temas.split(",") if "=" in p)
            n = 0
            for fila in csv.DictReader(open(a.csv, encoding="utf-8")):
                ruta = os.path.join(a.base, fila["archivo"])
                if not os.path.exists(ruta): print("no existe", ruta); continue
                tema = mapa.get(fila.get("categoria", ""), fila.get("categoria") or a.tema_por_defecto)
                if tema not in db["temas"]: tema = a.tema_por_defecto or tema
                x, nuevo = b.agregar(ruta, tema, a.origen, fila.get("origen") or a.fuente, fila.get("url", ""), a.derechos or None,
                                     fila.get("alt") or "", (), "", fila.get("pagina", ""), fila.get("alt", ""), rol=fila.get("rol") or a.rol)
                n += nuevo
            print(n, "importados")
        elif a.cmd == "editar":
            x = next((y for y in db["activos"] if y["id"] == a.id), None) or sys.exit("No existe " + a.id)
            for c in a.cambios:
                k, _, v = c.partition("=")
                if k in ("id", "sha256", "archivo", "bytes"): sys.exit(f"'{k}' no se edita a mano (usa mover/retirar)")
                if k == "derechos" and v not in DERECHOS: sys.exit("Derechos inválidos")
                poner(x, k, v)
            if x["estado"] == "activo" and problema_rol(x): sys.exit(f"{a.id}: {problema_rol(x)}. No se guardó nada.")
            x["actualizado"] = ahora(); b.bitacora("editar", id=a.id, cambios=a.cambios)
        elif a.cmd == "mover":
            x = next((y for y in db["activos"] if y["id"] == a.id), None) or sys.exit("No existe " + a.id)
            tema = a.tema or x["tema"]
            if tema not in db["temas"]: sys.exit("Tema desconocido: " + tema)
            sub = x.get("subcarpeta", "") if a.subcarpeta is None else a.subcarpeta
            nueva = os.path.join(b.destino(x["tipo"], tema, x["derechos"], sub), os.path.basename(x["archivo"]))
            os.makedirs(os.path.dirname(os.path.join(b.raiz, nueva)), exist_ok=True)
            shutil.move(os.path.join(b.raiz, x["archivo"]), os.path.join(b.raiz, nueva))
            b.bitacora("mover", id=a.id, de=x["archivo"], a=nueva)
            x.update(archivo=nueva, tema=tema, subcarpeta=slug(sub) if sub else "", actualizado=ahora())
        elif a.cmd == "reemplazar":
            x = next((y for y in db["activos"] if y["id"] == a.id and y["estado"] == "activo"), None) or sys.exit("No existe o no está activo " + a.id)
            h = sha256(a.archivo)
            if h == x["sha256"]: sys.exit("El archivo nuevo es idéntico al actual; no hay nada que reemplazar.")
            v = x.get("version", 1)
            anterior = os.path.join("99_papelera", f"{x['id']}_v{v}_" + os.path.basename(x["archivo"]).split("_", 1)[-1])
            shutil.move(os.path.join(b.raiz, x["archivo"]), os.path.join(b.raiz, anterior))
            shutil.copy2(a.archivo, os.path.join(b.raiz, x["archivo"]))
            w, hh, dur = dimensiones(os.path.join(b.raiz, x["archivo"]))
            x.setdefault("versiones", []).append({"version": v, "archivo": anterior, "sha256": x["sha256"], "bytes": x["bytes"], "reemplazado": ahora(), "motivo": a.motivo})
            x.update(sha256=h, bytes=os.path.getsize(os.path.join(b.raiz, x["archivo"])), ancho=w, alto=hh, duracion_s=dur, version=v + 1, actualizado=ahora())
            b.bitacora("reemplazar", id=a.id, version=v + 1, anterior=anterior, motivo=a.motivo)
        elif a.cmd == "retirar":
            x = next((y for y in db["activos"] if y["id"] == a.id), None) or sys.exit("No existe " + a.id)
            nueva = os.path.join("99_papelera", os.path.basename(x["archivo"]))
            shutil.move(os.path.join(b.raiz, x["archivo"]), os.path.join(b.raiz, nueva))
            b.bitacora("retirar", id=a.id, de=x["archivo"], motivo=a.motivo)
            x.update(archivo=nueva, estado="papelera", actualizado=ahora(), notas=(x["notas"] + f" · Retirado: {a.motivo}").strip(" ·"))
    return 0


if __name__ == "__main__":
    sys.exit(main())
