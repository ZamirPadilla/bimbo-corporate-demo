#!/bin/zsh
# Video para web: H.264 sin audio, faststart, sin metadatos. Deja <nombre>-v2.mp4 (escritorio) y
# <nombre>-movil-v2.mp4 (teléfono vertical, recorte central 540×720). Sube el CRF hasta quedar bajo la meta.
# Uso: video_web.sh <entrada.mp4> [carpeta de salida] [meta escritorio bytes] [meta móvil bytes]
#   Metas por defecto: 3.9 MB y 1.45 MB (nunca más de 6 MB en escritorio).
set -e
src=$1; [ -f "$src" ] || { echo "uso: video_web.sh entrada.mp4 [salida] [meta] [meta_movil]"; exit 1; }
dir=${2:-$(dirname "$src")}; meta=${3:-3900000}; metam=${4:-1450000}
n=$(basename "$src" .mp4); out="$dir/$n-v2.mp4"; outm="$dir/$n-movil-v2.mp4"
X=(-an -c:v libx264 -preset veryslow -tune film -profile:v high -pix_fmt yuv420p -g 60 -movflags +faststart -map_metadata -1)
for crf in 23 24 25 26 27 28; do
  ffmpeg -v error -y -i "$src" $X -level 4.0 -crf $crf "$out.tmp.mp4"
  s=$(stat -f%z "$out.tmp.mp4"); [ $s -lt $meta ] && break
done; mv "$out.tmp.mp4" "$out"; echo "$n escritorio crf=$crf bytes=$s"; [ $s -lt $meta ] || echo "  aviso: no llegó a la meta; recortar duración o bajar resolución (-vf scale=1280:-2)"
for crf in 25 26 27 28 29 30 31; do
  ffmpeg -v error -y -i "$src" -vf "crop=min(iw\,ih*3/4):ih:(iw-min(iw\,ih*3/4))/2:0,scale=540:720" $X -level 3.1 -crf $crf "$outm.tmp.mp4"
  s=$(stat -f%z "$outm.tmp.mp4"); [ $s -lt $metam ] && break
done; mv "$outm.tmp.mp4" "$outm"; echo "$n movil crf=$crf bytes=$s"; [ $s -lt $metam ] || echo "  aviso: la versión móvil no llegó a la meta"
# Calidad contra el original (SSIM ≥ 0.95 se ve igual; avisar si baja de 0.93)
ssim=$(ffmpeg -i "$out" -i "$src" -lavfi "[0:v][1:v]ssim" -f null - 2>&1 | grep -o 'All:[0-9.]*')
echo "$n SSIM escritorio $ssim"
