#!/usr/bin/env python3
"""Upscale fiel con Clarity AI (modo clarity-pro, creativity 0). Se ejecuta fuera de Blender.
Va AL INICIO del gemelo (paso 0 del SKILL), antes de resolver la cámara y calcar: el calco se hace sobre la HD.

La API key se lee de la variable de entorno CLARITY_API_KEY: nunca escribirla en este archivo, en el
SKILL ni en el proyecto. Pedírsela al usuario para la sesión y recordarle que la expire al terminar.

Uso:
    CLARITY_API_KEY=... python3 -I upscale.py entrada.png salida.png [--scale 2] [--creativity 0]

La imagen se envía como data URI base64 (la API la acepta), así no hay que subirla a un host público.
Coste: ~$0.03 por megapíxel de salida (mínimo $0.03). 1656×595 a 2x → 3312×1190 ≈ 3.9 MP ≈ $0.12.
La salida viene redondeada (770×485 a 4x → 3072×1936): llevarla a k× exacto de la original.
Después: verificar registro (passes.registration) y revisar recortes 1:1 antes de integrar.
"""
import base64, json, os, sys, urllib.request, argparse

ap = argparse.ArgumentParser()
ap.add_argument("src"); ap.add_argument("dst")
ap.add_argument("--scale", type=int, default=2, choices=[2, 4, 8, 16])
ap.add_argument("--creativity", type=int, default=0)
ap.add_argument("--format", default="png", choices=["png", "jpg"])
a = ap.parse_args()

key = os.environ.get("CLARITY_API_KEY")
if not key: sys.exit("Falta CLARITY_API_KEY en el entorno")
mime = "image/png" if a.src.lower().endswith(".png") else "image/jpeg"
body = json.dumps({"mode": "clarity-pro", "image": f"data:{mime};base64," + base64.b64encode(open(a.src, "rb").read()).decode(),
                   "creativity": a.creativity, "scale_factor": a.scale, "output_format": a.format}).encode()
req = urllib.request.Request("https://api-upscale.clarityai.co", data=body, method="POST",
                             headers={"Content-Type": "application/json", "Authorization": f"Bearer {key}"})
res = json.load(urllib.request.urlopen(req, timeout=600))
url = res.get("message", "")
print(json.dumps({k: res.get(k) for k in ("status", "credit_cost", "cost_usd", "balance")}))
if not url.startswith("http"): sys.exit(f"Respuesta inesperada: {res}")
urllib.request.urlretrieve(url, a.dst)
print("ok →", a.dst)
