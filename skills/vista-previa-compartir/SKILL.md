---
name: vista-previa-compartir
description: Hace que los enlaces de un sitio se vean bien al compartirlos (WhatsApp, iMessage, Slack, LinkedIn, X) y en la pestaña del navegador — thumbnail 1200×630 por página generado con Chrome headless, bloque title/description/canonical/Open Graph/Twitter en el HTML estático, favicon.svg/.ico y apple-touch-icon sin esquinas blancas, con versión para romper la caché. Úsala cuando pidan "agrega un thumbnail", "que se vea bien al compartir la URL", "el preview sale sin foto", "arregla el favicon / el ícono", "las esquinas del ícono se ven blancas", o al preparar cualquier sitio o prototipo para mandarlo por mensaje.
---

# Vista previa al compartir e íconos

WhatsApp, iMessage, Slack y LinkedIn **no corren JavaScript**: solo leen el HTML tal cual llega. Por eso el
bloque de metadatos va en el `<head>` estático de cada página (fuera de `<x-dc>`/`<helmet>`), y si el sitio
está detrás de una página de acceso, esa página debe repetir los metadatos de la página pedida y responder 200
(en este repo no hay página de acceso: ver `CLAUDE.md`).

## Generador (`scripts/`)
- `generar.py <paginas.json> [--sin-imagenes | --iconos]`: dibuja con Chrome headless un thumbnail por página
  con `plantilla.html`, arma los íconos y escribe el bloque `<!-- compartir:inicio … compartir:fin -->` en cada
  página. Solo usa la biblioteca estándar, Google Chrome y `sips` (macOS).
- `paginas.json`: ejemplo genérico (un sitio con cuatro unidades de negocio). Copiarlo junto al sitio del cliente y ajustar `sitio_dir`, `base` (URL
  pública que irá en `og:url`/`og:image`), `sitio`, `logo`, `colores`, `icono`, `mosaico` y las páginas.
- Tipos de lámina (`og.tipo`): `foto` (foto con velo, etiqueta, titular, pie), `plataforma` (además, índice
  01–04 como el slider de la Home), `mosaico` (fotos de varias páginas), `plano-obra` (mitad plano, mitad foto).
  `titular` admite `<br>` y `<em>` (el `<em>` va en color acento).

## Pasos
1. Elegir la foto de cada página (la más reconocible, con espacio a la izquierda para el texto) y escribir
   título (≤ 60 caracteres, `Página · Marca`) y descripción (≤ 160).
2. `python3 generar.py paginas.json` → revisar las láminas abriendo los JPG (texto legible, logo claro, la foto
   no tapa el titular).
3. Publicar y comprobar como lo ve un robot:
   `curl -s -A "WhatsApp/2.23.20.0" <url> | grep -o 'og:[a-z:]*" content="[^"]*'` y que la imagen dé 200
   sin sesión.
4. Si se cambia una lámina: subir `version` (cambia el nombre del JPG; `assets/` tiene caché inmutable y
   WhatsApp guarda la vista previa vieja). Para forzar una vista nueva de un enlace ya compartido: `?v=2`.

## Íconos
- `favicon.svg`: cuadro redondeado (`rx=12` en 64×64) con la letra del logo; esquinas transparentes.
- `favicon.ico` (16/32/48): se fotografía el SVG con **fondo transparente** (`--default-background-color=00000000`).
  Sin esa bandera Chrome pinta de blanco las esquinas y se ven en cualquier fondo que no sea blanco (pasó en el sitio de referencia).
- `apple-touch-icon.png` 180×180: **cuadrado y opaco**; iOS lo redondea solo y rellena lo transparente.
- Enlaces con versión (`favicon.ico?v=2`) porque los navegadores guardan el favicon mucho tiempo; subir
  `ICONOS_V` en `generar.py` al cambiarlos. `--iconos` rehace solo íconos y `<head>`.
- Comprobar píxeles: esquina del .ico con alfa 0, esquina del apple-touch-icon con el color de tinta.

## Trampas
- `og:image` debe ser URL absoluta del dominio donde se compartirá (no la del sitio interno protegido).
- Una página de acceso que responde 401 no muestra vista previa en casi ninguna app.
- `<title>` dentro de `<helmet>` no cuenta para los robots: el estático manda.
