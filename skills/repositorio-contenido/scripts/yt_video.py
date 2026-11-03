# Metadatos de videos de YouTube desde la página de reproducción (título, canal, fecha, duración, vistas, descripción).
import json, re, sys, time, urllib.request
UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36'
res = []
for vid in sys.argv[2:]:
    req = urllib.request.Request('https://www.youtube.com/watch?v=' + vid, headers={'User-Agent': UA, 'Accept-Language': 'es-MX', 'Cookie': 'CONSENT=YES+1'})
    h = urllib.request.urlopen(req, timeout=30).read().decode('utf-8')
    m = re.search(r'var ytInitialPlayerResponse = (\{.*?\});(?:var|</script>)', h, re.S)
    p = json.loads(m.group(1)); vd = p.get('videoDetails', {}); mf = p.get('microformat', {}).get('playerMicroformatRenderer', {})
    res.append({'id': vid, 'titulo': vd.get('title'), 'canal': vd.get('author'), 'canal_id': vd.get('channelId'),
                'fecha': mf.get('publishDate'), 'segundos': int(vd.get('lengthSeconds', 0)), 'vistas': int(vd.get('viewCount', 0)),
                'pais_canal': mf.get('availableCountries', [])[:3] and None, 'categoria': mf.get('category'),
                'descripcion': (vd.get('shortDescription') or '')[:600], 'miniatura': f'https://i.ytimg.com/vi/{vid}/maxresdefault.jpg'})
    time.sleep(1)
json.dump(res, open(sys.argv[1], 'w'), ensure_ascii=False, indent=1)
for r in res: print(json.dumps({k: r[k] for k in ['id','titulo','canal','canal_id','fecha','segundos','vistas']}, ensure_ascii=False)); print('   ', r['descripcion'][:400].replace('\n',' '))
