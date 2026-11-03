# Integrar la animación «el camión que cambia de época»

Guía para quien lleve el prototipo de `public/prototipos/camiones/` al sitio de Next (Nosotros › historia) y lo
una con el resto de las secciones. Antes de integrarlo, lee **Pendientes** al final: los modelos actuales son
aproximaciones y no pueden quedarse en producción tal cual.

## 1. Qué hay y dónde

```
public/prototipos/camiones/
  index.html          página de prueba: intro, sección de scroll (700vh, lienzo sticky), etiqueta de época
  main.js             toda la lógica three.js (escena, carretera, arcos, recortes, scroll)
  modelos/
    c40.glb   c40.json      camión de los 40 (Super·pan)
    c70.glb   c70.json      van de los 70
    c80.glb   c80.json      van de reparto de los 80
    c90.glb   c90.json      camión de los 90
    c2025.glb c2025.json    camión 2025
    trailer.glb trailer.json  tráiler de los 80 años
scripts/camiones/exportar_glb.py   genera cada GLB + JSON desde su escena de Blender (.blend)
docs/ideas/README.md               idea 02: estado y decisiones pendientes
```

Flujo de los datos:

```
escena .blend (fuera del repo) ──exportar_glb.py──▶ modelos/<id>.glb + <id>.json ──main.js──▶ lienzo WebGL
```

Las escenas `.blend` no están en el repo; las guarda el equipo de Nuclea. Pídelas para regenerar o
reemplazar un modelo.

## 2. Contrato de cada modelo

Todo lo que `main.js` asume de un GLB. Un modelo oficial que lo reemplace debe cumplir lo mismo.

| Regla | Valor |
|---|---|
| Formato | glTF binario (`.glb`), texturas WebP (extensión **requerida** `EXT_texture_webp`), materiales PBR con `KHR_materials_clearcoat` |
| Unidades y ejes | metros; Y arriba (convención de three.js) |
| Dirección | la **nariz** en `x = 0` y el camión hacia atrás: ocupa `x ∈ [-largo, 0]`. Avanza hacia **+X** |
| Costado principal | el izquierdo (el del arte) mira a **−Z**, hacia donde está la cámara |
| Altura | 2.2 m (el tráiler 1.99 m; es más largo, 6.76 m) |
| Llantas | nodos cuyo nombre empieza con `Llanta` y tienen el **origen en el centro** de la llanta: giran en `rotation.z` |
| Nombres de nodos | llevan sufijo `.001` del exportador (`Llanta_del_izq.001`): busca por prefijo, nunca por nombre exacto |
| Peso | 220–390 KB por camión, 1.7 MB los seis |

El `<id>.json` acompaña a cada GLB:

```json
{ "nombre": "Camion_70", "largo": 4.632, "alto": 2.2, "radio_llanta": 0.224 }
```

`largo` sirve para saber cuándo el camión terminó de cruzar un arco y `radio_llanta` para que las llantas giren
sin patinar.

## 3. Cómo funciona `main.js`

**Escena.**
- Un `HemisphereLight` y un `DirectionalLight` con sombras (mapa de 2048 px).
- Niebla del mismo color que el fondo (`FONDO`) para que la carretera se pierda.
- Render con `outputColorSpace = SRGB`, `pixelRatio` máximo 2 y `localClippingEnabled = true`, sin el cual
  no funcionan los recortes.

**El camión se queda quieto y el mundo se mueve.**
- Los seis camiones están en el origen.
- El grupo `mundo` (piso, carretera, rayas y arcos) se desplaza `-d` en X, donde `d` son los metros recorridos.
- Las llantas giran `-d / radio_llanta`.

**Épocas y arcos.**
- `CAMIONES` lista `id`, `epoca` y `nombre`.
- Cada época ocupa `TRAMO = 15` m de carretera y los arcos quedan en `x = 15, 30, 45, 60, 75`.
- El recorrido total es `RECORRIDO = 86` m.

**El cambio (recorte por planos).**
- Cada camión clona sus materiales con dos `THREE.Plane`: `entrada` deja ver `x ≥ sEntrada` y `salida` deja
  ver `x ≤ sSalida`. Los materiales usan `clipShadows = true`, para que la sombra también se corte, y
  `side = DoubleSide`, para que el corte no deje ver el hueco.
- `sEntrada = ARCOS[i-1] − d` y `sSalida = ARCOS[i] − d` son la posición de cada arco en el marco del
  camión.
- Mientras el camión cruza el arco, adelante se ve el modelo nuevo y atrás el anterior.
- Los camiones que no tocan su tramo se ocultan (`visible = false`) para no dibujarlos.

**Scroll.**
- La sección `.recorrido` mide `700vh` y el lienzo es `position: sticky`.
- El avance `t ∈ [0, 1]` sale de `getBoundingClientRect()` de la sección, y `d = t · RECORRIDO`.
- `d` sigue a su objetivo con inercia (`0.12` por cuadro); con `prefers-reduced-motion: reduce` la inercia se
  quita.

**Época visible.** La etiqueta (década, nombre y puntos) cambia cuando el camión nuevo ya cruzó la mitad de
su largo.

**Cámara.**
- Es fija, a tres cuartos frontal izquierda: posición `(5.2, 3.6, −12.5)`, mirando a `(−2.4, 1.0, 0)`, con
  30° de campo vertical.
- Si la pantalla está en vertical (`ancho/alto < 1`), se aleja 1.75× para que quepa el tráiler.

## 4. Llevarlo a Next (App Router)

Pasos sugeridos. El prototipo es JS plano con three.js desde CDN; en el sitio debe ser un componente.

1. **Dependencia.** `npm i three` y `npm i -D @types/three`, fijando la misma versión menor que se probó
   (0.169). Ya no se usa el `importmap` del CDN.
2. **Modelos.** Muévelos a `public/modelos/camiones/` (o al CDN de media) y pasa la ruta base al componente.
   Así quedan fuera de `prototipos/`.
3. **Componente cliente.** `components/historia/CamionEpocas.tsx` con `'use client'`. En la página, cárgalo con
   `dynamic(() => import(...), { ssr: false })`: three.js no corre en el servidor.
4. **Ciclo de vida.**
   - Crea el renderer en un `useEffect` sobre un `<canvas ref>`.
   - Al desmontar: cancela el `requestAnimationFrame`, quita los listeners, haz `renderer.dispose()` y libera
     geometrías, materiales y texturas (`traverse` + `dispose()`).
   - Cambia el `addEventListener('resize')` por un `ResizeObserver` sobre el contenedor: el lienzo ya no
     ocupa toda la ventana.
5. **Avance controlado desde afuera.** Ese es el punto de unión con el resto.
   - Cambia `leerScroll()` por una prop `progreso: number` entre 0 y 1, o por un `MotionValue` si la página usa
     Framer Motion o GSAP ScrollTrigger.
   - La sección de historia decide cuánto scroll le toca, y el componente solo convierte `progreso` en
     `d = progreso · RECORRIDO`.
   - Expón también `onEpoca(i)` para que el texto de la historia, a un lado del lienzo, cambie junto con el
     camión, en vez de las etiquetas dibujadas dentro del componente.
6. **Contenido.**
   - Los textos de `CAMIONES` (`epoca`, `nombre`) y el texto de cada época van en `content/paginas.ts`, no en
     el componente: es copy.
   - Los colores (`FONDO`, carretera, rayas, letrero) deben salir de los tokens de `tailwind.config.ts`; léelos
     en tiempo de ejecución con variables CSS. No dejes hex sueltos.
7. **Rendimiento.**
   - Pausa el ciclo con un `IntersectionObserver` cuando la sección no esté en pantalla.
   - Carga los GLB cuando la sección se acerque (`rootMargin` de una pantalla), no al cargar la página.
   - En teléfonos de gama baja, baja `shadow.mapSize` a 1024 y `pixelRatio` a 1.5.
8. **Accesibilidad.**
   - Pon `aria-label` en el lienzo y una alternativa en texto: la lista de épocas con su descripción.
   - Con `prefers-reduced-motion`, además de quitar la inercia, puedes mostrar una sola imagen por época y
     cambiarla por pasos, sin barrido.
9. **Verificar.** Revísalo en 375 px y en escritorio (regla de `CLAUDE.md`), y mide los fps y que no queden
   contextos WebGL vivos después de navegar.

## 5. Regenerar o reemplazar un modelo

Desde la raíz del repo, con Blender 5.x:

```bash
blender -b --python scripts/camiones/exportar_glb.py -- <ruta/camion_70.blend> Camion_70 public/prototipos/camiones/modelos/c70.glb
```

Qué hace el exportador con la escena:
- Aplica los modificadores (biseles y booleanos) y deja fuera los objetos ocultos de render.
- Iguala la altura y pone la nariz en `x = 0`.
- Centra el origen de las llantas.
- Exporta las texturas en WebP y escribe el `.json`.

**Modelo oficial de otra fuente.** Si llega un modelo oficial que no viene de nuestras escenas, ajústalo al
contrato de la sección 2:
- Escala y nariz en el mismo lugar.
- Llantas como nodos separados con el prefijo `Llanta` y el origen en su centro.
- Su `.json` con `largo` y `radio_llanta`.

`main.js` no necesita cambios.

**Agregar o quitar una época.** Basta con agregar o quitar entradas en `CAMIONES`: los arcos y el recorrido
se calculan solos. Cuida que la sección de scroll mantenga más o menos 115vh por época.

## 6. Pendientes antes de producción

- **Material oficial.** Los seis modelos son aproximaciones hechas a partir de fotos de juguetes de colección,
  y sus calcomanías (logos, Osito, empaques) salen de esas fotos. `CLAUDE.md` pide que los camiones no se
  aproximen y que las fotos de terceros no se publiquen: hay que reemplazarlos por modelos o renders oficiales
  de Bimbo, o retirarlos.
- **Aprobación de la idea** (idea 02 en `docs/ideas/README.md`): si va en Nosotros, con qué diseño de arco
  (hoy es un marco blanco con la década) y con qué texto por época.
- **Lo que no tienen los modelos.** No tienen interior ni puertas que abran, y el frente de algunos es más
  simple que el juguete. Sirven para una cámara a media distancia, no para acercamientos.
