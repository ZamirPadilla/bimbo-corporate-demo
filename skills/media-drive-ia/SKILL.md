---
name: media-drive-ia
description: Administra el drive de media de un cliente (p. ej. el shared drive "Bimbo") como una base de datos que solo una IA modifica — estructura fija de carpetas, IDs y nombres estables, base de datos media.json con origen, derechos, tema y uso en la demo de cada archivo, bitácora de cada operación, papelera en vez de borrado, verificación de huérfanos y faltantes, e ingreso desde Descargas o desde el buzón 00_entrada. Úsala siempre que haya que guardar, ordenar, renombrar, mover, etiquetar, buscar o retirar material de un cliente en su drive ("organiza el drive de Bimbo", "mete estas imágenes al drive", "administra la carpeta de camiones", "qué tenemos de X", "limpia el drive"), y antes de cualquier operación en un drive que tenga `_sistema/media.json`, aunque la petición parezca un simple copiar o mover.
---

# Drive de media administrado por IA

El drive del cliente no es una carpeta compartida cualquiera: es una **base de datos de media**. Ninguna persona
lo gestiona; solo una IA que leyó esta skill. Así cada archivo tiene un ID, un origen, unos derechos y un
propósito, y nada se pierde ni se duplica. Las personas aportan dejando material en `00_entrada/` y consultan en
`_sistema/INDICE.md`.

Caso de referencia: shared drive **Bimbo** (prefijo `BMB`), iniciado el 2 nov 2026.

## Dónde vive esta skill (para no confundir copias)
| Copia | Ruta | Uso |
|---|---|---|
| **Fuente** (la única que se edita) | repo privado del workspace de Nuclea, plugin `nuclea-demo-kit`, carpeta `skills/media-drive-ia/` | Cambios a la skill o al script: pedirlos al equipo de Nuclea |
| Publicada | marketplace privado de plugins de Nuclea, plugin `nuclea-demo-kit` (incluye el hook `guardia_media.py`) | Instalarla con el hook de guardia |
| **Esta copia** (pública, saneada) | repo de la demo, `skills/media-drive-ia/` | Leerla y operar el drive sin el plugin; no se edita aquí, se actualiza desde la fuente |
| Copia en cada drive | `<drive>/_sistema/herramientas/` (`SKILL.md` y `media_db.py`) | Operar ese drive |

Si la versión de `media_db.py` del drive (`VERSION = …`) es menor que la de la fuente, corre desde la fuente
`media_db.py --drive "<drive>" actualizar-herramientas`. Nunca edites la copia del drive, la publicada ni esta.

## Antes de tocar nada
1. Ubica la raíz: en esta Mac, `~/Library/CloudStorage/GoogleDrive-<cuenta>/Shared drives/<Cliente>`
   (Drive para escritorio sincroniza solo). Expórtala: `export MEDIA_DRIVE="…/Shared drives/Bimbo"`.
2. Usa la copia del script que vive en el drive: `python3 -I "$MEDIA_DRIVE/_sistema/herramientas/media_db.py" …`
   (la fuente está en el plugin, `skills/media-drive-ia/scripts/media_db.py`; tras actualizarla, corre
   `actualizar-herramientas`).
3. Corre `verificar`. Si hay huérfanos o faltantes, investiga antes de seguir (probablemente alguien editó a mano)
   y repórtalo al usuario.

## La única regla dura
**Todo cambio en `01_media/`, `02_documentos/`, `03_datos/`, `99_papelera/` o `_sistema/` pasa por
`media_db.py`.** Nunca `cp`, `mv`, `rm`, `rsync` ni escritura directa ahí. Con el plugin `nuclea-demo-kit` instalado, su hook `guardia_media.py` lo
bloquea; sin el plugin, la regla se cumple a mano; si el usuario pide expresamente una excepción, se usa `MEDIA_PERMITIR_MANUAL=1` una vez y se anota en la
respuesta. `00_entrada/` es el único lugar donde se puede escribir libremente.

## Estructura
| Carpeta | Contenido |
|---|---|
| `LEEME - drive administrado por IA.md` | Aviso para personas y para otras IA: reglas, ruta, estado y contexto del cliente. Lo regenera el script en cada operación; no se edita a mano |
| `00_entrada/` | Buzón de material nuevo |
| `01_media/imagenes/<tema>/`, `01_media/video/<tema>/` | Oficial del cliente o producido por Nuclea |
| `01_media/referencias-terceros/<tema>/` | De terceros (Mercado Libre, prensa, Awwwards): referencia interna, nunca se publica |
| `02_documentos/<tema>/`, `03_datos/<tema>/` | Documentos e inventarios |
| `99_papelera/` | Lo retirado; nada se borra |
| `_sistema/` | `media.json` (la base), `media.csv` e `INDICE.md` (vistas generadas), `bitacora.jsonl`, `contexto-cliente.md`, `herramientas/` |

Nombre de archivo: `<ID>_<slug-del-titulo>.<ext>` (p. ej. `BMB-00012_tractocamion-80-anos-de-frente.webp`). El
ID no cambia nunca, aunque el archivo cambie de tema o vaya a la papelera.

## Registro (campos de cada activo en `media.json`)
`id`, `archivo`, `titulo`, `tipo` (imagen, video, documento, dato), `formato`, `bytes`, `ancho`, `alto`,
`duracion_s`, `sha256`, `tema`, `etiquetas`, `origen` (tipo `oficial | tercero | cliente | nuclea`, fuente, url,
página, nombre original, fecha), `derechos` (`oficial-cliente`, `referencia-interna`, `licencia-libre`,
`nuclea`, `por-confirmar`), `rol` (`contenido | referencia`), `alt`, `uso_demo` (sección, estado
`candidato | aprobado | descartado`), `relacionados`, `notas`, `estado` (`activo | papelera`), `creado`, `actualizado`.

## Contenido o referencia (campo `rol`)
El drive mezcla dos clases de material, y quien arma la página necesita saber cuál puede usar sin pensarlo:

| Rol | Qué es | Ejemplos |
|---|---|---|
| `contenido` | Listo para la página tal cual: foto, ilustración o video limpio, sin texto horneado ni interfaz de otro sitio, con resolución suficiente para su uso y derechos `oficial-cliente`, `nuclea` o `licencia-libre` | Retratos, fotos de planta y de gente, renders del personaje, fondos sin texto, recortes sin texto, loops de video limpios |
| `referencia` | Para consultar, inspirar, modelar o sacar datos; no va a la página | Capturas del sitio actual o del informe, piezas con texto o cifras dentro, miniaturas y logos chicos, material de terceros, documentos e inventarios |

- **Todo entra como `referencia`** (es el valor por defecto) y pasa a `contenido` solo cuando alguien confirma que
  sirve tal cual: `editar ID rol=contenido`, o `--rol contenido` al ingresar.
- El script lo hace cumplir: lo `referencia-interna` y lo `por-confirmar` no pueden ser contenido, y
  `uso_demo.estado=aprobado` solo se acepta en contenido. `verificar` cuenta como falla un activo sin rol o incoherente.
- Si el usuario declara que algo no sirve para la página (en Bimbo, la línea del tiempo del sitio actual), es
  `referencia` aunque sea oficial y de buena calidad; anótalo en `notas` y en el contexto del cliente.
- El índice separa cada tema en "Contenido para la página" y "Referencia"; `buscar --rol contenido --tema gente`
  lista lo usable de un tema.

## Operaciones
```bash
M="$MEDIA_DRIVE/_sistema/herramientas/media_db.py"
python3 -I "$M" verificar
python3 -I "$M" ingresar ARCHIVO… --tema camioncitos --origen tercero --fuente "Mercado Libre" \
        --titulo "Tractocamión 80 años, de frente" --etiquetas juguete,80-anos --seccion historia
python3 -I "$M" ingresar "$MEDIA_DRIVE/00_entrada/lote" --tema historia --origen oficial --fuente grupobimbo.com --mover
python3 -I "$M" importar-manifiesto manifiesto.csv CARPETA --origen oficial --fuente grupobimbo.com --mapa-temas youtube=youtube-miniaturas
python3 -I "$M" editar BMB-00012 rol=contenido uso_demo.estado=aprobado notas="Hero de Historia"
python3 -I "$M" mover BMB-00012 --tema historia
python3 -I "$M" mover BMB-00012 --subcarpeta "Camion Bimbo 90"      # dentro del mismo tema
python3 -I "$M" retirar BMB-00030 --motivo "duplicado visual de BMB-00012"
python3 -I "$M" reemplazar BMB-00334 manual-v2.pdf --motivo "versión corregida"   # mismo ID, la v1 a la papelera
python3 -I "$M" buscar tractocamion
python3 -I "$M" buscar --rol contenido --tema gente      # lo que sí puede ir a la página
python3 -I "$M" editar-config --agregar-tema logistica
python3 -I "$M" contexto contexto-cliente.md       # contexto del cliente que aparece en el LEEME
```
- `ingresar` detecta duplicados por sha256 y no los vuelve a copiar.
- Con `--mover` el original sale de su lugar (úsalo para `00_entrada/`); sin él, se copia (úsalo para Descargas
  y para carpetas del usuario, que no son nuestras).
- Un título por archivo: para varios archivos con títulos distintos, ingrésalos uno por uno.
- `--subcarpeta` crea `…/<tema>/<subcarpeta>/` y se guarda en el campo `subcarpeta`. Úsala para respetar la
  organización que ya hizo el usuario (en Bimbo, `Camiones/Camion Bimbo 40`, `70`, `80`, `90`, `2025`,
  `Trailer Full`).

## Flujo para material nuevo
0. **Pregunta si el usuario ya lo organizó.** Si trae carpetas propias (por año, por modelo), esa clasificación
   manda: cruza por sha256 lo que ya está en el drive, reubica conservando el ID, ingresa lo nuevo con
   `--subcarpeta` y retira (papelera) lo que el usuario dejó fuera, si así lo pide.
1. **Mirar antes de ingresar:** hoja de contactos (ver `benchmark-inspiracion/scripts/hoja-contactos.py`) para
   saber qué es cada archivo y darle un título que lo describa (modelo, época, ángulo).
2. **Decidir origen y derechos:** oficial del cliente → `oficial-cliente`; tienda, prensa o fan → `referencia-interna`
   (va a `referencias-terceros/` y nunca se publica); si no hay certeza, `por-confirmar`.
3. **Decidir el rol:** `--rol contenido` solo si va a la página tal cual; si trae texto, es captura, es chica o
   no hay certeza, se queda como `referencia` (el valor por defecto).
4. **Ingresar** con tema, título, etiquetas, rol y sección de la demo.
5. **Agrupar:** si varios archivos son el mismo objeto (seis fotos del mismo camioncito), ligarlos con
   `editar ID relacionados=…` o una etiqueta común (`modelo-tractocamion`).
6. **Verificar** y reportar al usuario: qué entró (IDs), qué se omitió por duplicado, qué quedó por confirmar.

## Contexto del cliente
El LEEME se genera solo, pero lo que una IA nueva necesita saber del cliente (decisiones del usuario, dónde está
el material fuente, qué no hacer) va en `_sistema/contexto-cliente.md`. Escríbelo fuera del drive y súbelo con
`contexto ARCHIVO`; actualízalo cada vez que el usuario tome una decisión que otra IA podría deshacer por error
(retirar algo "por decisión", una clasificación propia, una cifra que no se debe usar). En Bimbo, el
contenido vigente se lee al final del LEEME del drive; su fuente la guarda el equipo de Nuclea.

## Temas del drive Bimbo
`historia`, `camioncitos`, `osito`, `marcas-producto`, `manufactura`, `gente`, `sustentabilidad`, `prensa`,
`reconocimientos`, `marca-identidad`, `video-web`, `youtube-miniaturas`, `inspiracion`, `investigacion`, `general`.
Para un tema nuevo: `editar-config --agregar-tema`.

## Trampas
- Drive para escritorio tarda en subir; si otra máquina edita a la vez puede crear "(1)" duplicados: `verificar`
  los muestra como huérfanos. Resolverlos con el usuario, nunca borrándolos.
- El candado (`_sistema/.lock`) evita dos escrituras a la vez en esta máquina; no protege entre máquinas.
- No guardes datos personales ni credenciales en el drive; tampoco material interno de
  Nuclea (análisis comerciales, notas de venta).
