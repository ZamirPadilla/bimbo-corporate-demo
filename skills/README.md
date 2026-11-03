# Skills de sitios corporativos (Nuclea)

Técnicas del sitio de Grupo PRODI (hecho por Nuclea Solutions), empaquetadas para reutilizarlas con otros
prospectos. El código del sitio de PRODI es privado; las skills traen lo necesario para aplicar cada técnica sin él. Cada carpeta es una
skill (`SKILL.md` + `scripts/` + `references/`).

| Skill | Qué cubre |
|---|---|
| `sitio-prospecto` | **Empieza aquí.** Flujo completo, catálogo de secciones, sistema visual, reglas de trabajo |
| `paginas-claude-design` | Formato `.dc.html`, exportar, mover secciones, teléfono, patrones de interacción |
| `fusion-disenos-git` | Fusionar el trabajo de dos personas (Claude Design + local) con git |
| `gemelo-desde-foto` | Gemelo Blender desde una foto y sección "plano → obra" |
| `lamina-tecnica` | Láminas técnicas estilo Palantir y planos territoriales |
| `mapa-relieve` | Mapa de relieve de presencia y generador de retícula para cualquier país |
| `media-web-ligera` | Video/foto ligeros, recolorear planos, respaldo en Supabase con manifiesto |
| `verificar-en-navegador` | Probar animaciones, canvas, hover y teléfono midiendo con JS |
| `publicar-vercel` | URL privada del equipo y URL del cliente con contraseña |
| `vista-previa-compartir` | Thumbnails Open Graph e íconos sin esquinas blancas |

## Instalar
- **Claude Code:** desde esta carpeta, `for s in */; do ln -sfn "$PWD/${s%/}" ~/.claude/skills/${s%/}; done`
  (o copiarlas a `.claude/skills/` del proyecto).
- **Claude.ai / Claude Design:** comprimir cada carpeta en zip (renombrado a `.skill`) y subirla desde Settings → Skills.
- **Otra IA:** darle a leer `sitio-prospecto/SKILL.md` y las skills que ese archivo indique en cada etapa; los
  scripts funcionan solos (Python 3, ffmpeg, Google Chrome, Node para el smoke test del mapa). Pensados para
  macOS: `generar.py` usa la ruta de Chrome de macOS y `sips`, y `video_web.sh` corre con zsh.

## Prospectos
- Bimbo: instrucciones de arranque en `../docs/INSTRUCCIONES-BIMBO.md` (este repo, Next.js).
