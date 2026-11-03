---
name: vista-previa-compartir
description: Hace que los enlaces de un sitio Next.js se vean bien al compartirlos (WhatsApp, iMessage, Slack, LinkedIn, X) y en la pestaña del navegador — title/description/canonical/Open Graph/Twitter con la Metadata API, imagen 1200×630 por página con next/og, icon.svg y apple-icon sin esquinas blancas, y cómo comprobarlo como lo ve un robot. Úsala cuando pidan "agrega un thumbnail", "que se vea bien al compartir la URL", "el preview sale sin foto", "arregla el favicon / el ícono", "las esquinas del ícono se ven blancas", o al preparar la demo para mandarla por mensaje.
---

# Vista previa al compartir e íconos (Next.js)

WhatsApp, iMessage, Slack y LinkedIn **no corren JavaScript**: solo leen el HTML que llega. En Next, los
metadatos de la Metadata API se escriben en el HTML del servidor, así que cumplen esto siempre que la página
no los arme en el cliente.

## Metadatos
- En `app/layout.tsx`: `metadataBase` con la URL pública, y `title.template` con la forma `%s · Demo Grupo Bimbo`
  (ver `CLAUDE.md`: nunca como el sitio oficial).
- En cada `page.tsx`: `export const metadata` (o `generateMetadata`) con `title` (≤ 60 caracteres), `description`
  (≤ 160), `alternates.canonical` y `openGraph`/`twitter` (`card: "summary_large_image"`).
- Las cifras de la descripción también salen de `content/cifras.ts` (con `plano()` de `content/resolver.ts`).

## Imagen por página (1200×630)
- `app/<ruta>/opengraph-image.tsx` con `ImageResponse` de `next/og`: foto de la página con velo, rótulo, titular
  y pie con "Demo · Grupo Bimbo". La foto debe ser oficial o con permiso.
- Elegir la foto más reconocible, con espacio a la izquierda para el texto, y revisar la imagen generada en
  grande (texto legible, la foto no tapa el titular).
- Si cambias una imagen ya compartida: WhatsApp guarda la vista previa vieja; para forzar una nueva, comparte
  el enlace con `?v=2`.

## Íconos
- `app/icon.svg`: cuadro redondeado (`rx=12` en 64×64) con la letra o el símbolo; esquinas transparentes.
  No se redibuja el logotipo: hasta tener el archivo oficial, un marcador sobrio.
- `app/apple-icon.png` 180×180: **cuadrado y opaco**; iOS lo redondea solo y rellena lo transparente.
- Si exportas un `.ico` o `.png` con Chrome headless, usa `--default-background-color=00000000`; sin esa
  bandera Chrome pinta de blanco las esquinas y se notan en cualquier fondo que no sea blanco.
- Comprobar píxeles: esquina del ícono con alfa 0, esquina del apple-icon con el color de fondo.

## Comprobar como lo ve un robot
```bash
curl -s -A "WhatsApp/2.23.20.0" <url> | grep -o 'og:[a-z:]*" content="[^"]*'
```
La `og:image` debe ser una URL absoluta del dominio donde se compartirá y responder 200 sin sesión.
