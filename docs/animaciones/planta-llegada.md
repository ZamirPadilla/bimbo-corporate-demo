# Animación de la planta: cómo está guardada y cómo integrarla

Animación 3D en vivo, hecha con three.js. En una planta Bimbo, el **camión 2025 llega** por la calle, entra al patio y
se mete en reversa a su andén. A un costado, el **tráiler full sale** del andén vecino y se va por la calle. Dura
20 s, corre en loop y no usa video: es una escena glTF con la animación ya horneada.

Esta guía es para quien la vaya a unir con el resto del sitio.

## Dónde está cada cosa

```
public/animaciones/planta-llegada/      ← lo que se publica (Next lo sirve tal cual desde /animaciones/planta-llegada/)
  index.html                            página autónoma de prueba; también funciona dentro de un <iframe>
  planta3d.js                           módulo con montarPlanta(raiz, opciones) → { destruir }
  assets/planta_llegada.glb             escena + animación (1.1 MB): planta, calles, vehículos y cámara

modelos-3d/                             ← fuentes de Blender 5.2 (no se publican en la página)
  animacion-llegada-salida.blend        escena completa de la animación (de aquí sale el .glb)
  planta-bimbo.blend                    planta sola: almacén con sus dos fachadas, techo solar, anexo, nave y andenes
  camion-bimbo-2025.blend               camión 2025
  trailer-full.blend                    tractocamión con remolque
  scripts/llegada_salida.py             arma la escena de la animación desde los tres modelos de arriba
  scripts/exportar_web.py               exporta el .blend a public/animaciones/planta-llegada/assets/planta_llegada.glb
  README.md
```

- Cada `.blend` trae sus texturas **empaquetadas** y abre solo, sin depender de otras carpetas.
- Las fuentes de trabajo (fotos de referencia, recortes intermedios y medidas) viven en el drive privado del equipo.
  Pídelas a Nuclea si hace falta rehacer un modelo.

## Cómo verla
```bash
npm run dev
```
Abre `http://localhost:3000/animaciones/planta-llegada/index.html`. El `index.html` hay que escribirlo: Next no
sirve el índice de una carpeta de `public/`. Con `?debug` se muestran los fps, el tiempo y las llamadas de dibujo.

## Qué hay dentro del `.glb`
| Nodo | Qué es |
|---|---|
| `Camara` | Cámara animada (lente equivalente a 28 mm en 16:9). La página la usa tal cual |
| `Camion_2025` | Raíz del camión que llega; sus llantas (`Llanta_*`) giran con el avance |
| `Camion_trailer` | Raíz del tráiler que sale, con sus 8 llantas animadas |
| `Planta_Bimbo` | Planta (almacén, nave, anexo, andenes) |
| `Coche*` | Coches: estacionados y dos en movimiento por la calle |
| Resto | Calles, banquetas, cerca, árboles, volúmenes vecinos y tráileres estacionados |

- **Animaciones:** un clip por objeto animado, todos de 20 s. Se reproducen juntos con un solo `AnimationMixer`.
- **Ejes y unidades:** ejes glTF (Y arriba), en metros.
- **Compresión:** las mallas van con Draco y las texturas en WebP.

## Cómo se comporta
- Ocupa el tamaño de su contenedor: 16:9 en escritorio y 4:5 en teléfono, en la página de prueba.
  - Conserva el ancho de campo horizontal del render original.
  - En pantallas angostas se acerca un poco para que el camión no quede diminuto.
- Se **pausa** cuando sale de pantalla (`IntersectionObserver`) y cuando la pestaña está oculta.
- **Loop:** al terminar se queda quieta 1.6 s, un velo con el color del cielo la cubre y vuelve a empezar.
- Con `prefers-reduced-motion` no anima: muestra la escena final (el 2025 ya en su andén).
- **Rendimiento en escritorio:** unas 80 mil caras y unas 650 llamadas de dibujo; corre a 120 fps.
- **Sombras:** un sol con mapa de 4096 px.

## Tres formas de integrarla

### 1. `<iframe>`: lo más rápido, sin dependencias
```tsx
<section className="relative aspect-[16/9] max-md:aspect-[4/5]">
  <iframe
    src="/animaciones/planta-llegada/index.html"
    title="Un camión Bimbo llega al andén de la planta mientras un tráiler sale a la calle"
    loading="lazy"
    className="absolute inset-0 h-full w-full border-0"
  />
</section>
```
Dentro de un iframe, la página detecta que está incrustada y llena el marco que le dé la sección. El tamaño lo
decide el sitio. Para que el iframe no se note, el fondo de la sección debe ser `#dfe7ef`, el color del cielo.
Conviene guardarlo como token en `tailwind.config.ts`, porque el repo no admite hex sueltos en componentes.

### 2. Componente de React: integración nativa
1. `npm i three@0.169.0`, la misma versión con que se probó.
2. Copia `public/animaciones/planta-llegada/planta3d.js` a `components/planta-3d/planta3d.js`. Sus imports
   (`three`, `three/addons/...`) los resuelve el bundler.
3. Deja el `.glb` donde está (`public/`) y pasa su URL.
4. Opcional, para no depender del CDN de Google: copia `node_modules/three/examples/jsm/libs/draco/gltf/` a
   `public/draco/` y pasa `draco: '/draco/'`.

```tsx
'use client';
import { useEffect, useRef } from 'react';

export function Planta3D() {
  const raiz = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let destruir: (() => void) | undefined;
    let vivo = true;
    import('./planta3d.js').then(async ({ montarPlanta }) => {
      if (!vivo || !raiz.current) return;
      const h = await montarPlanta(raiz.current, { glb: '/animaciones/planta-llegada/assets/planta_llegada.glb?v=2' });
      if (vivo) destruir = h.destruir; else h.destruir();
    });
    return () => { vivo = false; destruir?.(); };
  }, []);
  return (
    <div ref={raiz} className="relative aspect-[16/9] overflow-hidden max-md:aspect-[4/5]">
      <canvas className="absolute inset-0 h-full w-full" />
      {/* opcionales: .velo (fundido del loop) y .cargando; ver los estilos en index.html */}
    </div>
  );
}
```

**El contrato de `montarPlanta(raiz, opciones)`:**
- `raiz` necesita tamaño propio y un `<canvas>` dentro.
- Si existen, usa `.velo` (fundido del loop), `.cargando` (lo quita al cargar) y `.depurar` (panel de `?debug`).
- `opciones`:
  - `glb`: URL del modelo; por defecto, el que está junto al módulo;
  - `draco`: carpeta del decodificador;
  - `depurar`: muestra el panel de depuración.
- Devuelve una promesa con `{ destruir }`. Llámalo al desmontar: detiene el loop, desconecta los observadores y
  libera la GPU.

### 3. Script de módulo en una página estática
```html
<script type="importmap">{ "imports": { "three": "https://cdn.jsdelivr.net/npm/three@0.169.0/build/three.module.js",
  "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.169.0/examples/jsm/" } }</script>
<script type="module">
  import { montarPlanta } from '/animaciones/planta-llegada/planta3d.js';
  montarPlanta(document.querySelector('.planta-3d'));
</script>
```

## Cómo regenerarla después de cambiar algo en Blender
1. Si cambias la **escena** (trayectorias, cámara, ambiente), edita `modelos-3d/scripts/llegada_salida.py`.
   Arma la escena desde cero en Blender, con un archivo vacío:
   ```python
   exec(open('modelos-3d/scripts/llegada_salida.py').read(), {'D': '<ruta absoluta a modelos-3d>/'})
   ```
   Guarda el resultado como `modelos-3d/animacion-llegada-salida.blend`.
   - Si solo retocas el `.blend` a mano, salta este paso.
2. Exporta sin interfaz, porque el exportador de glTF necesita el contexto completo de Blender:
   ```bash
   blender -b modelos-3d/animacion-llegada-salida.blend --python modelos-3d/scripts/exportar_web.py
   ```
   - Escribe `public/animaciones/planta-llegada/assets/planta_llegada.glb` y no modifica el `.blend`.
   - De paso vuelve reales los tráileres estacionados (son instancias en Blender) y cambia los materiales
     procedurales que glTF no entiende: los paneles solares quedan como una textura de módulo repetida.
3. Sube la versión `?v=` del `.glb`, en `planta3d.js` y donde la pases como `glb`, para que el navegador no use la
   copia en caché.
4. Revisa a 375 px y en escritorio, y prueba con `prefers-reduced-motion`.

Hacer los camiones o la planta otra vez desde fotos es otro proceso, con sus propias herramientas y referencias
privadas. Pídelo a Nuclea.

## Antes de publicarla en una página
- **Decisión pendiente** (ver el PR): `CLAUDE.md` dice que los camiones no se redibujan y que las fotos de
  camioncitos de vendedores no se publican.
  - Las calcas de los camiones y las fachadas del almacén (logo y Osito) salen recortadas de fotos.
  - Hay que confirmar si se quedan o se cambian por material oficial antes de llevarla a una página del sitio.
- **Sección nueva:** agregarla a una página es una sección nueva. Según `CLAUDE.md` va primero en un issue, con la
  página e intensidad propuestas. Sugerencia: Nosotros o la historia, que tienen intensidad 5.
- **Texto alternativo:** la descripción del `aria-label` o del `title` se queda como está: no lleva cifras ni
  nombres de plantas reales.
