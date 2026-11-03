# Íconos de la demo

Favicon, ícono de pantalla de inicio (iOS y Android) y manifiesto. Se declaran en `app/layout.tsx`
(`metadata.icons` y `metadata.manifest`).

| Archivo | Tamaño | De dónde sale |
|---|---|---|
| `favicon.ico` | 16×16 | El favicon de grupobimbo.com (`/themes/custom/bimbo/favicon.ico`), sin cambios |
| `favicon-16x16.png` | 16×16 | El mismo favicon pasado a PNG, sin cambios de píxeles |
| `logo-grupo-bimbo.svg` | vector | El logotipo de grupobimbo.com (`/themes/custom/bimbo/logo.svg`), sin cambios |
| `apple-touch-icon.png` | 180×180 | Logotipo completo al 80 % del ancho, centrado sobre blanco. Cuadrado y opaco: iOS redondea las esquinas solo |
| `icon-192.png`, `icon-512.png` | 192 y 512 | Igual que el anterior, para Android y el manifiesto |
| `icon-512-maskable.png` | 512×512 | Logotipo al 62 % del ancho, para que quede dentro del círculo seguro cuando Android lo recorta |
| `site.webmanifest` | — | Nombre "Demo Grupo Bimbo", fondo blanco, color `#263576` (el azul del logotipo) |

## Reglas
- **No se redibuja ni se recorta el logotipo** (`CLAUDE.md`). El sitio oficial solo publica el favicon en 16×16
  y, de la figura del favicon (óvalo y B), no hay un vector suelto. Por eso los tamaños grandes llevan el
  logotipo oficial completo, sin cortar ni ampliar el favicon de 16 px. Si Bimbo entrega el ícono en vector o en
  tamaños grandes, se reemplazan estos archivos.
- Al cambiar un ícono, sube `?v=` en `app/layout.tsx` y en `site.webmanifest`.

## Cómo se generaron los PNG
Chrome headless fotografía una página con `logo-grupo-bimbo.svg` centrado sobre blanco:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --hide-scrollbars \
  --force-device-scale-factor=1 --default-background-color=FFFFFFFF \
  --window-size=180,180 --screenshot=apple-touch-icon.png pagina.html
```

En `pagina.html`, el `<img>` del logotipo mide 80 % del ancho (62 % en el maskable). Comprobación: la esquina
de los PNG grandes es blanca opaca y la del favicon es transparente.
