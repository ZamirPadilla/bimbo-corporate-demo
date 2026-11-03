#!/usr/bin/env python3
"""Sube a Supabase Storage cada fila "ruta_local<TAB>objeto" de un TSV (lo genera manifiesto.py --tsv).

Variables de entorno (no escribir llaves en archivos ni en el chat):
  SUPABASE_URL   https://<ref>.supabase.co
  SUPABASE_KEY   llave publicable/anon del proyecto (el bucket debe tener una política temporal de insert,
                 ver SKILL.md) o una llave de servicio que el usuario pegue en su terminal.
  BUCKET         nombre del bucket (p. ej. cliente-media)
Uso: subir_supabase.py subida.tsv [--hilos 6]
No sobrescribe (x-upsert false): lo que ya existe se reporta como 409 y cuenta como hecho. Reintenta 429/5xx.
"""
import concurrent.futures as cf, mimetypes, os, sys, time, urllib.error, urllib.parse, urllib.request

faltan = [v for v in ('SUPABASE_URL', 'SUPABASE_KEY', 'BUCKET') if not os.environ.get(v)]
if faltan or len(sys.argv) < 2:
    sys.exit(__doc__ + ('\nFaltan variables: ' + ', '.join(faltan) if faltan else ''))
URL = os.environ['SUPABASE_URL'].rstrip('/') + '/storage/v1/object/' + os.environ['BUCKET'] + '/'
KEY = os.environ['SUPABASE_KEY']
mimetypes.add_type('image/svg+xml', '.svg'); mimetypes.add_type('video/mp4', '.mp4'); mimetypes.add_type('image/avif', '.avif')

def subir(fila):
    local, objeto = fila
    tipo = mimetypes.guess_type(local)[0] or 'application/octet-stream'
    req = urllib.request.Request(URL + urllib.parse.quote(objeto, safe='/'), data=open(local, 'rb').read(), method='POST',
                                 headers={'apikey': KEY, 'Authorization': 'Bearer ' + KEY, 'Content-Type': tipo,
                                          'x-upsert': 'false', 'cache-control': 'max-age=31536000'})
    for intento in range(5):
        try:
            with urllib.request.urlopen(req, timeout=300) as r:
                return objeto, r.status, ''
        except urllib.error.HTTPError as e:
            cuerpo = e.read().decode(errors='replace')[:200]
            if e.code == 409 or 'Duplicate' in cuerpo or 'already exists' in cuerpo:
                return objeto, 409, 'ya existía'
            if e.code in (429, 500, 502, 503, 504):
                time.sleep(2 ** intento); continue
            return objeto, e.code, cuerpo
        except (urllib.error.URLError, TimeoutError) as e:
            time.sleep(2 ** intento); err = str(e)
    return objeto, 0, 'sin respuesta tras reintentos'

filas = [l.rstrip('\n').split('\t') for l in open(sys.argv[1], encoding='utf-8') if l.strip()]
hilos = int(sys.argv[sys.argv.index('--hilos') + 1]) if '--hilos' in sys.argv else 6
mal = 0
with cf.ThreadPoolExecutor(hilos) as ex:
    for objeto, st, msg in ex.map(subir, filas):
        if st not in (200, 201, 409):
            mal += 1; print('ERROR', st, objeto, msg)
print(f'{len(filas) - mal} de {len(filas)} en el bucket ({mal} con error)')
sys.exit(1 if mal else 0)
