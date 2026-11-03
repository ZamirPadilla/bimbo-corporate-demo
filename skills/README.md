# Skills para construir la demo

Solo las técnicas que hacen falta para construir y publicar el sitio en Next.js. Las instrucciones del repo están
en [`../CLAUDE.md`](../CLAUDE.md): si una skill dice algo distinto, manda ese archivo. Cada carpeta es una
skill (`SKILL.md` + `scripts/` + `references/`).

| Skill | Qué cubre |
|---|---|
| `interacciones-scroll` | Secciones ligadas al scroll, etapas con temporizador y hover, filas sin brincos, video perezoso (React) |
| `verificar-en-navegador` | Probar animaciones, canvas, hover y teléfono midiendo con JS |
| `media-web-ligera` | Video y foto ligeros (`video_web.sh`, `foto_web.py`); el respaldo en un bucket es interno de Nuclea |
| `vista-previa-compartir` | Reglas de thumbnails Open Graph e íconos sin esquinas blancas |
| `mapa-relieve` | Mapa de relieve de presencia y generador de la retícula para cualquier país |
| `media-drive-ia` | Solo con acceso al shared drive de Bimbo: se opera únicamente con `media_db.py` |

Algunas skills se escribieron para sitios estáticos (`.html`). En este repo toma su método y sus reglas y
llévalos a componentes de Next.

## Instalar
- **Claude Code:** desde esta carpeta, `for s in */; do ln -sfn "$PWD/${s%/}" ~/.claude/skills/${s%/}; done`
  (o copiarlas a `.claude/skills/` del proyecto).
- **Claude.ai:** comprimir cada carpeta en zip (renombrado a `.skill`) y subirla desde Settings → Skills.

## Fuente y copias
Estas carpetas son copias públicas saneadas: no se editan aquí. Los cambios se piden al equipo de Nuclea, que
las vuelve a copiar. Las etapas que ya se cerraron (copy, wireframes, benchmark, repositorio de contenido,
manual de identidad) siguen en el plugin privado de Nuclea; sus resultados están en `content/` y `docs/`.
