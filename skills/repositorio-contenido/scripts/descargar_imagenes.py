# Descarga imágenes de una lista JSON [(pagina, url, alt)] a imagenes/<categoria>/ y escribe imagenes/manifiesto.csv
# con archivo, categoría, página de origen, URL, alt, bytes, dimensiones y sha256. Ritmo: ~2 por segundo.
import csv, hashlib, json, os, re, struct, sys, time, urllib.parse, urllib.request
UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36'
CAT = {'nosotros_historia': 'historia', 'nosotros_fundadores': 'historia', 'sustentabilidad': 'sustentabilidad',
       'nutricion': 'producto-nutricion', 'unete-a-nuestro-equipo': 'gente', 'prensa': 'prensa', 'nosotros': 'marca',
       'nosotros_visita-nuestras-panaderias': 'manufactura', 'nosotros_reconocimientos': 'reconocimientos'}
def dims(b):
    if b[:8] == b'\x89PNG\r\n\x1a\n': return struct.unpack('>II', b[16:24])
    if b[:2] == b'\xff\xd8':
        i = 2
        while i < len(b) - 9:
            if b[i] != 0xFF: i += 1; continue
            m = b[i + 1]
            if m in (0xC0, 0xC1, 0xC2): h, w = struct.unpack('>HH', b[i + 5:i + 9]); return (w, h)
            i += 2 + struct.unpack('>H', b[i + 2:i + 4])[0]
    return ('', '')
lista, base, origen = json.load(open(sys.argv[1])), sys.argv[2], sys.argv[3]
man = os.path.join(base, 'manifiesto.csv'); nuevo = not os.path.exists(man)
with open(man, 'a', newline='') as fh:
    w = csv.writer(fh)
    if nuevo: w.writerow(['archivo', 'categoria', 'origen', 'pagina', 'url', 'alt', 'bytes', 'ancho', 'alto', 'sha256'])
    for pag, url, alt in lista:
        if not url.startswith('http'): continue
        cat = next((v for k, v in sorted(CAT.items(), key=lambda x: -len(x[0])) if pag.startswith(k)), 'otros') if origen == 'grupobimbo.com' else pag
        nombre = urllib.parse.unquote(os.path.basename(urllib.parse.urlparse(url).path))
        nombre = re.sub(r'[^\w.\-]+', '-', nombre).strip('-').lower()
        os.makedirs(os.path.join(base, cat), exist_ok=True)
        ruta = os.path.join(base, cat, nombre)
        if os.path.exists(ruta): continue
        try:
            b = urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': UA}), timeout=30).read()
        except Exception as e:
            print('falló', url, e, file=sys.stderr); continue
        if len(b) < 2000: continue  # píxeles, íconos
        open(ruta, 'wb').write(b); wd, ht = dims(b)
        w.writerow([os.path.relpath(ruta, base), cat, origen, pag, url, alt, len(b), wd, ht, hashlib.sha256(b).hexdigest()])
        time.sleep(0.5)
print('listo')
