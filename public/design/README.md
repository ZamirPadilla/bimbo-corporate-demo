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
| `globo/` | Globo de presencia v2 (sección `07b Mapa`, entre Íconos y la cinta de idiomas) |
| `campo-mesa/` | Director que monta «Del campo a tu mesa» en la sección `08` |

## Mapa (globo de presencia)

La sección `07b Mapa` monta el mismo componente de `/demo/globo/v2` (multigrano en color natural, sin el panel
del laboratorio). No se copia a mano: `components/globo/montar.tsx` lo expone como `window.BimboGlobo` y
`scripts/globo-estatico.ts` lo empaqueta con three.js en `globo/bimbo-globo.js` y sus estilos de Tailwind,
acotados a `[data-globo-raiz]`, en `globo/bimbo-globo.css`. Los datos los lee de `public/globo/`.

Cuando cambie el globo (`components/globo/`) o las cifras (`content/`), regenera y sube `?v=` en el `<helmet>`:

```bash
npx tsx scripts/globo-estatico.ts
```

Lo que **no** se trajo: `uploads/` (capturas y documentos de contexto del proyecto), `Inicio v1` y `Inicio v2`
(versiones anteriores) y los assets que Inicio ya no usa.

## Del campo a tu mesa (sección 08)

La sección monta la animación de `public/animaciones/del-campo-a-tu-mesa/` (PR #15) con
`campo-mesa/director-inicio.js`: el mismo director de la animación, pero con el avance que le pasa el scroll de
la sección (1200vh) en lugar de su propia pista. Las escenas no se copian. Se cargan al acercarse a la sección y
se pausan fuera de pantalla. Los textos (`cmTextos`) y las cifras (`cmDatos`) de `renderVals()` tienen el avance
`P` en que entran y salen, alineado con los momentos de la animación: los cambios de época del camión (`ARCOS`),
las fases de la planta (`FASES`) y las regiones del planeta (`OLEADAS`). El contador de países repite el reparto
de `OLEADAS`. Si cambian esos tiempos allá, hay que moverlos aquí.

## Pendientes conocidos

- La Nav y el Footer enlazan a `Contacto.dc.html`, que aún no existe en el proyecto.
- Varias fotos de producto se cargan del S3 público de bimbo.com.mx y los videos de marcas de YouTube.
- `assets/pan-bimbo.mp4` pesa 19 MB: candidato a versión ligera (skill `media-web-ligera`).

## Volver a sincronizar

Si Zamir sigue editando en Claude Design, exporta de nuevo el *Project archive*, extrae con Python
(`zipfile`, porque `unzip` de macOS rompe los acentos) y compara contra esta carpeta antes de copiar, para no
pisar mejoras hechas aquí.
