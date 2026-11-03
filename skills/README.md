# Skills para construir la demo

Solo las técnicas que hacen falta para construir y publicar el sitio en Next.js. Las instrucciones del repo están
en [`../CLAUDE.md`](../CLAUDE.md): si una skill dice algo distinto, manda ese archivo. Cada carpeta es una
skill (`SKILL.md` + `scripts/` + `references/`).

| Skill | Qué cubre |
|---|---|
| `interacciones-scroll` | Secciones ligadas al scroll, etapas con temporizador y hover, filas sin brincos, video perezoso (React) |
| `verificar-en-navegador` | Probar animaciones, canvas, hover y teléfono midiendo con JS |
| `media-web-ligera` | Video y foto ligeros (`video_web.sh`, `foto_web.py`) y metas de peso |
| `vista-previa-compartir` | Metadatos, imagen Open Graph con `next/og` e íconos sin esquinas blancas |
| `mapa-relieve` | Mapa de relieve de presencia: qué mapa proponer para Bimbo, generador de la retícula y reglas |
| `media-drive-ia` | Solo con acceso al shared drive de Bimbo: se opera únicamente con `media_db.py` |

Todas están adaptadas a Next y a esta demo; lo que solo aplicaba al sitio de referencia de Nuclea (páginas
`.dc.html`, página de contraseña, respaldo en un bucket, planos recoloreados) se quitó.

## Instalar
- **Claude Code:** desde esta carpeta, `for s in */; do ln -sfn "$PWD/${s%/}" ~/.claude/skills/${s%/}; done`
  (o copiarlas a `.claude/skills/` del proyecto).
- **Claude.ai:** comprimir cada carpeta en zip (renombrado a `.skill`) y subirla desde Settings → Skills.

## Fuente y copias
Estas carpetas son copias públicas adaptadas a este repo, así que ya no son idénticas a las versiones
privadas de Nuclea (salvo `media-drive-ia`, que se copia tal cual desde el plugin y no se edita aquí). Si mejoras
una, avisa al equipo de Nuclea para que lleve el cambio a su versión.

Las etapas que ya se cerraron (copy, wireframes, benchmark, repositorio de contenido,
manual de identidad) siguen en el plugin privado de Nuclea; sus resultados están en `content/` y `docs/`.
