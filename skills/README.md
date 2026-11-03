# Skills de sitios corporativos (Nuclea)

Técnicas de un sitio de referencia hecho por Nuclea Solutions y del trabajo de copy de esta demo, empaquetadas para
reutilizarlas con otros prospectos. El código del sitio de referencia es privado; las skills traen lo necesario para aplicar cada técnica sin él. Aquí solo van skills públicas y de páginas: las de producción 3D (gemelo desde foto, láminas técnicas) son internas de Nuclea. Cada carpeta es una
skill (`SKILL.md` + `scripts/` + `references/`).

| Skill | Qué cubre |
|---|---|
| `sitio-prospecto` | **Empieza aquí.** Flujo completo, catálogo de secciones, sistema visual, reglas de trabajo |
| `paginas-claude-design` | Formato `.dc.html`, exportar, mover secciones, teléfono, patrones de interacción |
| `fusion-disenos-git` | Fusionar el trabajo de dos personas (Claude Design + local) con git |
| `mapa-relieve` | Mapa de relieve de presencia y generador de retícula para cualquier país |
| `media-web-ligera` | Video/foto ligeros, recolorear planos, respaldo en Supabase con manifiesto |
| `verificar-en-navegador` | Probar animaciones, canvas, hover y teléfono midiendo con JS |
| `publicar-vercel` | URL privada del equipo y URL del cliente con contraseña |
| `vista-previa-compartir` | Thumbnails Open Graph e íconos sin esquinas blancas |
| `benchmark-inspiracion` | Referencias en Awwwards, léxico del cliente en motivos de marca y carácter de cada página |
| `copy-corporativo` | Copy desde el sitio actual: inventario, revisión crítica, fuente única de cifras, arquitectura y voz, copy deck |
| `wireframes-desde-copy` | Wireframes en grises e índice de la demo (`/demo`) generados desde el copy deck; plantilla Next.js + Tailwind |
| `repositorio-contenido` | Material oficial del cliente para la demo: inventario de YouTube por canal, videos clave por sección, imágenes con manifiesto, mascota por país |
| `media-drive-ia` | El shared drive del cliente como base de datos de media que solo una IA modifica (`media_db.py`): IDs, derechos, papelera, verificación, LEEME con contexto |
| `manual-identidad-referencia` | Manual de identidad de referencia desde piezas recientes del cliente: color, tipografía confirmada con PDF, fotografía, recortes sin texto con cuidado |

## Instalar
- **Claude Code:** desde esta carpeta, `for s in */; do ln -sfn "$PWD/${s%/}" ~/.claude/skills/${s%/}; done`
  (o copiarlas a `.claude/skills/` del proyecto).
- **Claude.ai / Claude Design:** comprimir cada carpeta en zip (renombrado a `.skill`) y subirla desde Settings → Skills.
- **Otra IA:** darle a leer `sitio-prospecto/SKILL.md` y las skills que ese archivo indique en cada etapa; los
  scripts funcionan solos (Python 3, ffmpeg, Google Chrome, Node para el smoke test del mapa). Pensados para
  macOS: `generar.py` usa la ruta de Chrome de macOS y `sips`, y `video_web.sh` corre con zsh.

## Orden sugerido
`sitio-prospecto` (investigación) → `repositorio-contenido` y `manual-identidad-referencia` (material en el drive con
`media-drive-ia`) → `copy-corporativo` → `wireframes-desde-copy` → `benchmark-inspiracion` →
diseño con el catálogo de `sitio-prospecto` → `verificar-en-navegador` → `vista-previa-compartir` → `publicar-vercel`.

## Fuente y copias
Estas carpetas son **copias públicas saneadas** (sin rutas, nombres ni datos internos). La fuente vive en los repos
privados de Nuclea; los cambios se piden al equipo de Nuclea y se vuelven a copiar aquí. `media-drive-ia` funciona
sin el plugin, pero con el plugin `nuclea-demo-kit` un hook bloquea cualquier escritura al drive que no pase por
`media_db.py`.

## Prospectos
- Bimbo: instrucciones de arranque en `../docs/INSTRUCCIONES-BIMBO.md` (este repo, Next.js). Material en el shared
  drive "Bimbo", administrado con `media-drive-ia`: antes de tocarlo, leer su `LEEME - drive administrado por IA.md`.
