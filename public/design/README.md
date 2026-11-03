# Inicio (Claude Design)

Copia fiel de la página principal del proyecto de Claude Design **Rediseño de Grupo Bimbo** (autor: Zamir),
exportada el 3 nov 2026 con *Share → Project HTML → Project archive*. Versión de `Inicio.dc.html`:
2026-11-03T09:10:01Z.

## Ver en local

```bash
npm run dev
```

Abrir `http://localhost:3000/design/Inicio.dc.html`. También funciona con cualquier servidor estático
sobre `public/` (por ejemplo `python3 -m http.server 8818 --directory public`).

## Qué contiene

| Archivo | Qué es |
|---|---|
| `Inicio.dc.html` | Página principal (15 secciones, de `01 Hero` a `15 Contacto`) |
| `Nav.dc.html`, `Footer.dc.html` | Componentes compartidos que Inicio carga con `dc-import` |
| `support.js` | Runtime de Claude Design (monta la plantilla `<x-dc>`) |
| `assets/` | Solo las 11 imágenes y videos que Inicio usa |

Lo que **no** se trajo: `uploads/` (capturas y documentos de contexto del proyecto), `Inicio v1` y `Inicio v2`
(versiones anteriores) y los assets que Inicio ya no usa.

## Pendientes conocidos

- La Nav y el Footer enlazan a `Contacto.dc.html`, que aún no existe en el proyecto.
- Varias fotos de producto se cargan del S3 público de bimbo.com.mx y los videos de marcas de YouTube.
- `assets/pan-bimbo.mp4` pesa 19 MB: candidato a versión ligera (skill `media-web-ligera`).

## Volver a sincronizar

Si Zamir sigue editando en Claude Design, exporta de nuevo el *Project archive*, extrae con Python
(`zipfile`, porque `unzip` de macOS rompe los acentos) y compara contra esta carpeta antes de copiar, para no
pisar mejoras hechas aquí.
