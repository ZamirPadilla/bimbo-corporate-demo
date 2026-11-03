---
name: media-web-ligera
description: Prepara la media de un sitio Next.js para que cargue rápido — videos H.264 ligeros con versión vertical para teléfono y póster inmediato, fotos JPEG progresivas, nombres versionados cuando cambia una imagen y límites de peso para un repo público en GitHub. Úsala cuando la página pese mucho o cargue lento, al recibir videos o fotos del cliente, o antes de publicar la demo.
---

# Media ligera

La media va en `public/` (por ejemplo `public/media/`) y entra al repo. El repo es público: solo material
oficial de Bimbo o con permiso (ver `CLAUDE.md`). GitHub rechaza archivos de más de 100 MB, y la demo debe pesar
poco: si algo no cabe en las metas de abajo, no va en el repo.

## Scripts (`scripts/`)
| Script | Para qué | Requiere |
|---|---|---|
| `video_web.sh in.mp4 [dir] [meta] [meta_movil]` | `<n>-v2.mp4` (escritorio) y `<n>-movil-v2.mp4` (540×720, recorte central); sube el CRF hasta la meta; reporta SSIM | ffmpeg, zsh |
| `foto_web.py <img o carpeta> [--max 2000] [--calidad 78]` | JPEG progresivo sin metadatos, `-v2`; no toca lo que ahorra < 15 % ni PNG con transparencia | Pillow |

Pillow: `python3 -m venv /tmp/v && /tmp/v/bin/python -m pip install pillow`.

## Videos
- Metas: escritorio < 4 MB (máx. 6 MB), teléfono < 1.5 MB. Sin audio, `+faststart`.
- Hero: póster JPEG que se ve de inmediato y el video encima con `opacity: 0`, que sube cuando empieza a
  reproducirse. Versión de teléfono primero:
  ```tsx
  <video autoPlay muted loop playsInline poster="/media/hero-poster-v2.jpg">
    <source media="(max-width: 767px) and (max-aspect-ratio: 1/1)" src="/media/hero-movil-v2.mp4" type="video/mp4" />
    <source src="/media/hero-v2.mp4" type="video/mp4" />
  </video>
  ```
- Videos que no son el hero: `preload="none"` o `"metadata"`, sin `autoPlay`, y que se reproduzca solo el que
  está activo y cerca de la pantalla (`interacciones-scroll`, patrón 4).
- `prefers-reduced-motion`: se queda el póster.
- Revisa el resultado con un cuadro comparado (`ffmpeg -ss T -i a -ss T -i b -filter_complex vstack …`) además
  del SSIM: los degradados de cielo son lo primero que se nota.

## Fotos
- Lado mayor 2000 px (2400 en fotos que se ven a sangre en pantallas grandes), calidad 78. Para fondos de hero,
  la versión JPEG comprimida, nunca el PNG original.
- En componentes, `next/image` con `sizes` correcto; para una imagen de fondo a sangre, `priority` solo en la
  primera pantalla.
- **Nombre nuevo cada vez que cambia una imagen** (`-v2`, `-v3`): los navegadores y WhatsApp/Slack guardan la
  versión vieja. Actualiza todas las referencias.
- Al recortar o encuadrar no cortes personas, productos ni logos; ante la duda, `object-fit: contain`.

## Trampas
- `unzip` de macOS rompe nombres con acentos: extrae con Python `zipfile`.
- Nombres de archivo en ASCII y sin espacios (`pan-blanco-v2.jpg`).
