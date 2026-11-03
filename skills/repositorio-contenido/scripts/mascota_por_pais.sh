#!/bin/zsh
# Busca a la mascota (o cualquier elemento de marca) en los sitios de la marca por país.
# Uso: zsh mascota_por_pais.sh 'osito|oso-bimbo|bear|urso|ourson' bimbo.com.mx www.bimbo.es www.bimbo.pt …
# Imprime: dominio | código y URL final | coincidencias en HTML (alt, nombres de archivo, texto).
set -u
patron=$1; shift
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36"
dir=$(mktemp -d)
for d in "$@"; do
  r=$(curl -sSL -A "$UA" --compressed --max-time 25 -o "$dir/$d.html" -w '%{http_code}|%{url_effective}' "https://$d/" 2>/dev/null || echo "000|sin respuesta")
  m=$(grep -oiE "($patron)[^\"<]{0,40}" "$dir/$d.html" 2>/dev/null | sort -u | head -4 | tr '\n' ';')
  echo "$d | $r | ${m:-no encontrado}"
  sleep 1.5
done
echo "HTML guardado en $dir"
