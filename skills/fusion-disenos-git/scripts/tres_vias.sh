#!/bin/bash
# Combina en tres vías una página entre dos ramas tomando como ancestro común la rama base.
# Uso: tres_vias.sh <archivo en la rama nuestra> <rama base> <rama de ellos> [archivo en ellos] [archivo en base]
#   Ejemplo: tres_vias.sh "prototipo/Liderazgo.dc.html" base marlon "prototipo/Liderazgo v2.dc.html"
# Deja el resultado en el árbol de trabajo (con marcadores <<<<<<< si hay choques) y dice cuántos choques hubo.
# No hace commit: revisar el resultado en el navegador antes.
set -euo pipefail
NUESTRO="$1"; BASE="$2"; ELLOS="$3"; EN_ELLOS="${4:-$1}"; EN_BASE="${5:-$1}"
T=$(mktemp -d)
git show "$BASE:$EN_BASE" > "$T/base"
git show "$ELLOS:$EN_ELLOS" > "$T/ellos"
set +e
git merge-file -L "nuestro" -L "base:$BASE" -L "ellos:$ELLOS" "$NUESTRO" "$T/base" "$T/ellos"
N=$?
set -e
rm -rf "$T"
if [ $N -eq 0 ]; then echo "sin choques: $NUESTRO"; else echo "$N choque(s) en $NUESTRO: buscar <<<<<<<"; fi
