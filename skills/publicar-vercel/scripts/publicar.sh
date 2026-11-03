#!/bin/bash
# Publica un sitio estático en el proyecto Vercel del cliente, protegido con la página de contraseña.
# Uso: publicar.sh <carpeta del sitio> <proyecto vercel> [carpeta de publicación] [archivo de la Home]
#   p. ej.: MIDDLEWARE=herramientas/cliente/middleware.js publicar.sh prototipo bimbo-cliente ../_cliente "Bimbo Home.dc.html"
# MIDDLEWARE: copia del cliente de middleware.js con su bloque MARCA editado (no editar la plantilla de la skill:
# la comparten todos los clientes). Sin MIDDLEWARE se usa la plantilla, con la marca del sitio de referencia.
# La contraseña se pone aparte (ver SKILL.md); sin CLIENTE_PASS el sitio queda cerrado para todos.
set -euo pipefail
AQUI="$(cd "$(dirname "$0")" && pwd)"
SITIO="$(cd "$1" && pwd)"; PROYECTO="$2"; DEST="${3:-$(dirname "$SITIO")/_cliente}"; HOME_PAGE="${4:-}"
mkdir -p "$DEST"
rsync -a --delete --exclude .vercel --exclude .gitignore --exclude .thumbnail --exclude scraps --exclude CLAUDE.md --exclude .DS_Store \
  "$SITIO/" "$DEST/"
cp "${MIDDLEWARE:-$AQUI/middleware.js}" "$DEST/middleware.js"
python3 "$AQUI/meta.py" "$DEST" ${HOME_PAGE:+"$HOME_PAGE"}
# El enlace .vercel del destino apunta al proyecto del cliente (rsync no lo toca). vercel link crea .env.local con un
# token OIDC: se borra para que no se suba.
if [ ! -f "$DEST/.vercel/project.json" ]; then
  (cd "$DEST" && vercel link --yes --project "$PROYECTO" && rm -f .env.local)
fi
cd "$DEST" && vercel deploy --prod --yes
