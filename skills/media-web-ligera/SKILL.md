---
name: media-web-ligera
description: Prepara y respalda la media de un sitio corporativo — videos H.264 ligeros con versión vertical para teléfono, fotos JPEG progresivas, planos recoloreados para el fondo de cada página, nombres versionados por la caché inmutable, y respaldo verificable en un bucket privado de Supabase con manifiesto (sha256/md5) para que nada se pierda fuera de git. Úsala cuando la página pese mucho o cargue lento, al recibir videos o fotos del cliente, al cambiar el color de fondo de una sección con plano, cuando pidan "sube la media a un bucket", "respáldalo para estar tranquilo", "que no se borre", o antes de publicar un prototipo.
---

# Media ligera y respaldada

La media no va en git (pesa cientos de MB y cambia de nombre). Vive en la carpeta del sitio, se publica con él y
se respalda en un bucket con un manifiesto que permite restaurarla y comprobarla byte por byte.

## Scripts (`scripts/`)
| Script | Para qué | Requiere |
|---|---|---|
| `video_web.sh in.mp4 [dir] [meta] [meta_movil]` | `<n>-v2.mp4` (escritorio) y `<n>-movil-v2.mp4` (540×720, recorte central); sube el CRF hasta la meta; reporta SSIM | ffmpeg |
| `foto_web.py <img o carpeta> [--max 2000] [--calidad 78]` | JPEG progresivo sin metadatos, `-v2`; no toca lo que ahorra < 15 % ni PNG con transparencia | Pillow |
| `recolorear.py in out --fondo A:B --linea C:D` | Plano de líneas a otro fondo/color de línea (p. ej. morado sobre tinta → blanco sobre negro) | Pillow, numpy |
| `manifiesto.py <sitio> <prefijo> m.json --tsv s.tsv` | Manifiesto con ruta, bytes, sha256, md5 y objeto ASCII | — |
| `subir_supabase.py s.tsv` | Sube sin sobrescribir, con reintentos; llave por variable de entorno | — |
| `etag_multiparte.py archivo` | ETag esperado de archivos grandes subidos en partes de 16 MiB | — |
Pillow/numpy: `python3 -m venv /tmp/v && /tmp/v/bin/python -m pip install pillow numpy`.

## Videos
- Metas del sitio de PRODI: escritorio < 4 MB (máx. 6 MB), teléfono < 1.5 MB. Sin audio, `+faststart`.
- En el HTML del hero: póster JPEG inmediato + `<source media="(max-width: 767px) and (max-aspect-ratio: 1/1)" src="…-movil-v2.mp4">`
  antes del de escritorio. Reglas del hero en `prototipo/CLAUDE.md` de PRODI (póster, opacidad al reproducir).
- Videos que no son el hero: `preload="metadata"`, sin `autoPlay`, y que los reproduzca solo el que está activo y
  cerca de pantalla (`paginas-claude-design`, patrón "video perezoso").
- Revisar el resultado con un cuadro comparado (`ffmpeg -ss T -i a -ss T -i b -filter_complex vstack …`) además
  del SSIM: los degradados de cielo son lo primero que se nota.

## Fotos
- Lado mayor 2000 px (2400 en planos o fotos que se ven a sangre en pantallas grandes), calidad 78; 82 en planos
  de líneas. Heroes: versión JPEG comprimida como fondo, nunca el PNG original.
- **Nombre nuevo cada vez que cambia una imagen** (`-v2`, `-v3`): `vercel.json` cachea `/assets` un año como
  `immutable` y WhatsApp/Slack guardan la vieja. Actualizar todas las referencias (incluidas las que el JS arma
  con prefijos, p. ej. `assets/fotos/dep-` + número) y dejar el original en su lugar.

## Planos según el fondo
El color de línea del plano sigue al de la página: acento sobre tinta en general, blanco sobre negro en una
página negra. Con `recolorear.py` se cambia sin rehacer el plano; después ajustar también etapas, barra y línea
de escaneo de la sección para que no queden morados sueltos.

## Respaldo en Supabase (bucket privado)
1. Proyecto propio del cliente (crear uno tiene costo mensual: confirmar con el usuario antes). Bucket privado.
2. `manifiesto.py <sitio> "<quien>/<AAAA-MM-DD>" media/<quien>-<fecha>.json --tsv subida.tsv`. El manifiesto
   se guarda en git; la media no.
3. Política temporal para subir con la llave publicable (borrarla al terminar; el bucket queda sin políticas):
   ```sql
   create policy tmp_subida on storage.objects for insert to anon with check (bucket_id = '<bucket>');
   create policy tmp_lectura on storage.objects for select to anon using (bucket_id = '<bucket>');  -- solo si hace falta verificar
   -- al terminar:
   drop policy tmp_subida on storage.objects; drop policy if exists tmp_lectura on storage.objects;
   ```
4. `SUPABASE_URL=… SUPABASE_KEY=… BUCKET=… subir_supabase.py subida.tsv`. Reintentar las filas con error.
5. Verificar: listar objetos y comparar tamaño + eTag con el manifiesto (md5; en archivos grandes,
   `etag_multiparte.py`).
6. Para restaurar o publicar: bajar del bucket por manifiesto y comprobar sha256 antes de usar.

## Trampas
- Supabase rechaza nombres con acentos: el manifiesto guarda la ruta original y el objeto en ASCII.
- `unzip` de macOS rompe nombres con acentos de exportaciones de Claude Design: extraer con Python `zipfile`.
- No pegar llaves en archivos versionados ni en el chat; pasarlas por variable de entorno.
