#!/bin/bash
# Publica Inicio (public/design) en el proyecto Vercel bimbo-cliente, detrás de la página de contraseña.
# Uso: herramientas/cliente/publicar.sh [carpeta de publicación; por defecto _cliente junto al repo, fuera de git]
# La contraseña vive en la variable CLIENTE_PASS del proyecto (ver herramientas/cliente/README.md).
set -euo pipefail
REPO="$(cd "$(dirname "$0")/../.." && pwd)"; DEST="${1:-$(dirname "$REPO")/_cliente}"; PROYECTO=bimbo-cliente
mkdir -p "$DEST"

# Solo lo que Inicio carga: la página con sus assets, los datos del globo (/globo) y la animación de la sección 08.
for d in design globo animaciones/del-campo-a-tu-mesa; do
  mkdir -p "$DEST/$d"
  rsync -a --delete --delete-excluded --exclude .DS_Store --exclude README.md "$REPO/public/$d/" "$DEST/$d/"
done
# Íconos y logotipo oficiales (PR #10); mientras no esté fusionado, se toman de su rama.
for f in favicon.ico apple-touch-icon.png logo-grupo-bimbo.svg; do
  if [ -f "$REPO/public/iconos/$f" ]; then cp "$REPO/public/iconos/$f" "$DEST/$f"
  else git -C "$REPO" show "origin/feat/iconos:public/iconos/$f" > "$DEST/$f"; fi
done

# "/" lleva a Inicio con redirección (no reescritura): sus rutas relativas (assets/, globo/, campo-mesa/) dependen
# de que la URL sea /design/Inicio.dc.html.
cat > "$DEST/vercel.json" <<'JSON'
{ "redirects": [{ "source": "/", "destination": "/design/Inicio.dc.html", "permanent": false }] }
JSON

# Middleware de acceso con la vista previa de Inicio (título, descripción y thumbnail de su <head>).
python3 - "$REPO/herramientas/cliente/middleware.js" "$REPO/public/design/Inicio.dc.html" "$DEST/middleware.js" <<'PY'
import html, json, re, sys
mw, pagina, salida = sys.argv[1:]
head = open(pagina, encoding='utf-8').read().split('</head>')[0]
get = lambda k: html.unescape(re.search(r'<meta (?:property|name)="%s" content="([^"]*)"' % re.escape(k), head).group(1))
m = {'t': get('og:title'), 'd': get('og:description'), 'i': get('og:image'), 'a': get('og:image:alt')}
s = open(mw, encoding='utf-8').read()
assert '/*META*/{}/*META*/' in s, 'middleware.js sin la marca de META'
open(salida, 'w', encoding='utf-8').write(s.replace('/*META*/{}/*META*/', json.dumps({'/': m, '/design/Inicio.dc.html': m}, ensure_ascii=False)))
PY

# vercel link crea .env.local con un token OIDC: se borra para que no se suba.
if [ ! -f "$DEST/.vercel/project.json" ]; then
  (cd "$DEST" && vercel link --yes --project "$PROYECTO" && rm -f .env.local)
fi
cd "$DEST" && vercel deploy --prod --yes
