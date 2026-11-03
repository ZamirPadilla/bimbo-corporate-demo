# Lista todos los videos de un canal de YouTube usando la API interna (youtubei/v1/browse) con continuaciones.
# Uso: python3 yt_canal.py <url_videos_canal> <salida.json>
import json, re, sys, time, urllib.request
UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36'
def get(url, data=None):
    req = urllib.request.Request(url, data=json.dumps(data).encode() if data else None,
        headers={'User-Agent': UA, 'Accept-Language': 'es-MX', 'Content-Type': 'application/json', 'Cookie': 'CONSENT=YES+1'})
    return urllib.request.urlopen(req, timeout=30).read().decode('utf-8')
def items(o, out):
    if isinstance(o, dict):
        if 'lockupViewModel' in o:
            l = o['lockupViewModel']; md = l.get('metadata', {}).get('lockupMetadataViewModel', {})
            rows = [p.get('text', {}).get('content') for r in md.get('metadata', {}).get('contentMetadataViewModel', {}).get('metadataRows', []) for p in r.get('metadataParts', [])]
            dur = re.findall(r'"text": "(\d+:\d+(?::\d+)?)"', json.dumps(l.get('contentImage', {})))
            out.append({'id': l.get('contentId'), 'titulo': md.get('title', {}).get('content'), 'vistas': rows[0] if rows else None,
                        'hace': rows[1] if len(rows) > 1 else None, 'duracion': dur[0] if dur else None})
        if 'richItemRenderer' in o and 'reelItemRenderer' in json.dumps(o)[:200]:
            pass
        for v in o.values(): items(v, out)
    elif isinstance(o, list):
        for v in o: items(v, out)
def token(o):
    s = json.dumps(o); t = re.findall(r'"continuationCommand": \{"token": "([^"]+)"', s)
    return max(t, key=len) if t else None
url, salida = sys.argv[1], sys.argv[2]
h = get(url)
cfg = json.loads(re.search(r'ytcfg\.set\((\{"CLIENT_CANARY_STATE".*?\})\);', h, re.S).group(1)) if re.search(r'ytcfg\.set\((\{"CLIENT_CANARY_STATE".*?\})\);', h, re.S) else {}
ver = re.search(r'"INNERTUBE_CLIENT_VERSION":"([^"]+)"', h).group(1)
d = json.loads(re.search(r'var ytInitialData = (\{.*?\});</script>', h, re.S).group(1))
out = []; items(d, out); tok = token(d); n = 0
while tok and n < 30:
    time.sleep(2.5); n += 1
    r = json.loads(get('https://www.youtube.com/youtubei/v1/browse?prettyPrint=false',
        {'context': {'client': {'clientName': 'WEB', 'clientVersion': ver, 'hl': 'es', 'gl': 'MX'}}, 'continuation': tok}))
    antes = len(out); items(r, out); tok = token(r)
    print('página', n, '+', len(out) - antes, file=sys.stderr)
    if len(out) == antes: break
vistos = set(); limpio = []
for v in out:
    if v['id'] and v['id'] not in vistos: vistos.add(v['id']); limpio.append(v)
json.dump(limpio, open(salida, 'w'), ensure_ascii=False, indent=1)
print(len(limpio), 'videos')
