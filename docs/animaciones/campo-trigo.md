# Campo de trigo: cómo está guardado y cómo unirlo a la animación general

Escena 3D en vivo, hecha con three.js, que avanza con el scroll y dura 12 s de animación original:
1. Una **espiga de trigo** a contraluz, en macro, como el banner «Horneando el futuro» de Bimbo Ventures.
2. La cámara sube a la altura de una persona de pie y se ve la **parcela**.
3. Camina hasta la orilla del campo, donde el **camión Bimbo de los 40** pasa por la terracería levantando polvo.

No es video: la cámara y el camión vienen de Blender, y el trigo, el terreno y el cielo se arman en el navegador.

Esta guía es para quien la vaya a unir con las otras piezas en la animación general del sitio, el recorrido
«Del campo a tu mesa».

## Dónde está cada cosa

```
public/animaciones/campo-trigo/        ← lo que se publica (Next lo sirve desde /animaciones/campo-trigo/)
  index.html                           página de prueba: la escena ocupa la pantalla y el scroll la avanza
  main.js                              une el scroll de esa página con el módulo (20 líneas)
  campo3d.js                           módulo con montarCampo(raiz, opciones) → { fijarAvance, pausar, destruir… }
  assets/trigo.glb                     5 espigas detalladas y 5 protagonistas del macro (220 KB)
  assets/arboles.glb                   especies de árbol del fondo (600 KB)
  assets/camion.glb                    camión de los 40 con sus calcas (1 MB)
  assets/escena.json                   cámara, camión y polvo por cuadro; árboles, lomas y sol (55 KB)

modelos-3d/campo-trigo/                ← fuente de Blender 5.2 (no se publica en la página)
  campo-trigo.blend                    escena completa, con las calcas del camión empaquetadas
  scripts/campo_persona.py             arma la escena desde cero
  scripts/campo.py                     espiga procedural, materiales y utilidades que usa campo_persona.py
  scripts/exportar_web.py              exporta el .blend a public/animaciones/campo-trigo/assets/
```

Las fuentes de trabajo, como las fotos del camión y la versión anterior en mini-planeta, viven en el drive privado
del equipo. Pídelas a Nuclea si hace falta rehacer algo.

## Cómo verla
```bash
npm run dev
```
Abre `http://localhost:3000/animaciones/campo-trigo/index.html` (Next no sirve el índice de una carpeta de `public/`).

| En la URL | Qué hace |
|---|---|
| `?debug` | Muestra fps, triángulos y el segundo de la animación |
| `?t=6` | Congela la escena en ese segundo, sin cargador; sirve para capturas |

## Qué hay en la escena
| Parte | De dónde sale |
|---|---|
| Cámara | `escena.json`: posición, punto de mira, lente y diafragma de los 300 cuadros (25 fps) |
| Camión, llantas y polvo | `escena.json` (trayectoria) y `camion.glb` (modelo) |
| Espigas | `trigo.glb`. Se reparten por anillos alrededor del recorrido de la cámara: 110 por m² en el macro, 90 en la orilla final, 70 en la media distancia y 12 a lo lejos |
| Terreno, parcela, terracería y cielo | `campo3d.js`, con las mismas fórmulas que `campo_persona.py` |
| Árboles y lomas | `arboles.glb` y `escena.json` |

- **Viento:** en el shader de vértices de las espigas.
- **Contraluz:** las espigas dejan pasar la luz cuando el sol está detrás.
- **Desenfoque:** solo en el macro (BokehPass mientras el diafragma es menor a f/3.6).
- **Ejes:** los de three (Y arriba), en metros. Las fórmulas del terreno usan coordenadas de Blender y se
  convierten con `V3(x, y, z) → (x, z, -y)`.

## Cómo se comporta
- **Tamaño:** el de su contenedor (`ResizeObserver`). Conserva el ancho de campo horizontal del render original.
- **Inercia:** persigue el avance pedido con 0.2 s de retraso, para que el scroll no se sienta a saltos.
- **Pausa:** sin pintar cuando sale de pantalla, cuando la pestaña está oculta o cuando se llama `pausar()`.
- **Teléfono (pantalla < 700 px):** 45 % del trigo, sin sombras ni antialias.
- **`prefers-reduced-motion`:** sin viento, sin polvo y sin inercia. La cámara se mueve solo con el scroll de
  quien la ve.
- **Versiones de three:** probada con 0.169.0, la de la planta, y con 0.170.0, la del globo. Ninguna da errores.
- **Rendimiento en una Mac de escritorio:** unos 120 fps. **Falta probarla en un teléfono real.**

## El módulo: `montarCampo(raiz, opciones)`
```js
import { montarCampo } from '/animaciones/campo-trigo/campo3d.js';

const campo = await montarCampo(document.querySelector('.campo-3d'), { avance: 0 });
campo.fijarAvance(0.5);   // 0 = espiga · 1 = camión en la terracería
```

- **`raiz`:** necesita tamaño propio y un `<canvas>` dentro.
  - Si existe `.cargando`, le pone la clase `listo` al terminar de cargar.
  - Si existe `.depurar` y se pasa `depurar: true`, ahí escribe fps, triángulos y tiempo.
- **`opciones`:**
  | Opción | Qué hace | Por defecto |
  |---|---|---|
  | `assets` | Carpeta de los `.glb` y `escena.json` | `assets/` junto al módulo |
  | `avance` | Avance inicial | `0` |
  | `inercia` | Segundos para alcanzar el avance pedido (`0` = salto) | `0.2` |
  | `movil` | Versión ligera | Pantalla menor a 700 px |
  | `depurar` | Muestra fps y tiempo | `false` |
- **Lo que devuelve:**
  | Miembro | Qué hace |
  |---|---|
  | `fijarAvance(p)` | Lleva la escena al avance `p ∈ [0, 1]`. Es la única entrada que necesita la animación general |
  | `fijarSegundo(t)` | Lo mismo, en segundos de la animación original (`0..duracion`), sin inercia |
  | `avance` | Avance en pantalla, de 0 a 1 |
  | `duracion` | Duración de la animación original: `12` s |
  | `pausar()` / `reanudar()` | Deja de pintar mientras otra escena la tapa |
  | `destruir()` | Detiene el bucle, desconecta los observadores y libera la GPU. Llámalo al desmontar |

El módulo **no lee el scroll**. Quien lo monta decide qué avance le toca, y por eso entra en la animación general
sin cambios.

## Unirla a la animación general «Del campo a tu mesa»

### La idea
Las tres piezas 3D que hay hoy cuentan una sola historia si se encadenan con el camión como hilo:

| Tramo | Pieza | Empieza | Termina |
|---|---|---|---|
| 1 · Campo | Esta: `campo-trigo` (este PR) | Espiga en macro | El camión de los 40 en la terracería |
| 2 · Distribución | Camión que cambia de época al cruzar un arco: `prototipos/camiones` (PR #13) | Camión de los 40 | Camión 2025 y el tráiler |
| 3 · Panaderías | La planta: `planta-llegada` (PR #12) | El camión 2025 llega por la calle | El 2025 en su andén y el tráiler en la calle |

El tramo 1 termina con el mismo camión con el que empieza el 2, y el 2 termina con el camión que llega en el 3.
Por eso el corte entre escenas se lee como continuidad y no como cambio de tema.

### Cómo se arma: un escenario pegajoso y un director
- **El escenario:** una sección alta (por ejemplo, `1200vh`) con un contenedor `position: sticky` del alto de la
  pantalla. Dentro van las tres escenas apiladas, cada una en su propio contenedor con `<canvas>`.
- **El director:** un solo listener de scroll que calcula el avance global `P ∈ [0, 1]` y lo reparte entre los
  tramos:
  - convierte `P` al avance local de cada tramo (`(P - inicio) / (fin - inicio)`);
  - hace el fundido entre tramos con la opacidad de los contenedores;
  - pausa las escenas que no se ven.

```tsx
'use client';
import { useEffect, useRef } from 'react';

// inicio y fin de cada tramo dentro del avance global; el traslape es el fundido
const TRAMOS = [
  { id: 'campo',   inicio: 0.00, fin: 0.40 },
  { id: 'camiones', inicio: 0.37, fin: 0.72 },
  { id: 'planta',  inicio: 0.69, fin: 1.00 },
] as const;
const FUNDIDO = 0.03;

type Escena = { fijarAvance(p: number): void; pausar(): void; reanudar(): void; destruir(): void };

export function DelCampoATuMesa() {
  const pista = useRef<HTMLDivElement>(null);
  const capas = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const escenas: Partial<Record<string, Escena>> = {};
    let vivo = true;
    // el campo se monta de inmediato; las demás, cuando el tramo anterior va a la mitad (ver «Carga» abajo)
    import('@/components/campo-3d/campo3d.js').then(async ({ montarCampo }) => {
      const e = await montarCampo(capas.current.campo!, { assets: '/animaciones/campo-trigo/assets/' });
      if (vivo) escenas.campo = e; else e.destruir();
      dirigir();
    });

    function dirigir() {
      const r = pista.current!.getBoundingClientRect();
      const P = Math.min(Math.max(-r.top / (r.height - innerHeight), 0), 1);
      for (const t of TRAMOS) {
        const local = Math.min(Math.max((P - t.inicio) / (t.fin - t.inicio), 0), 1);
        const opacidad = Math.min(1, (P - t.inicio) / FUNDIDO + (t.inicio === 0 ? 1 : 0), (t.fin - P) / FUNDIDO + (t.fin === 1 ? 1 : 0));
        const capa = capas.current[t.id]!, e = escenas[t.id];
        capa.style.opacity = String(Math.max(opacidad, 0));
        e?.fijarAvance(local);
        if (opacidad > 0) e?.reanudar(); else e?.pausar();
      }
    }
    addEventListener('scroll', dirigir, { passive: true });
    return () => { vivo = false; removeEventListener('scroll', dirigir); Object.values(escenas).forEach((e) => e?.destruir()); };
  }, []);

  return (
    <section ref={pista} className="relative h-[1200vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {TRAMOS.map((t) => (
          <div key={t.id} ref={(n) => { capas.current[t.id] = n; }} className="absolute inset-0" style={{ opacity: 0 }}>
            <canvas className="absolute inset-0 h-full w-full" />
            <div className="cargando" />
          </div>
        ))}
        {/* textos de cada etapa encima, con su propio avance (Campo, Panaderías, Distribución…) */}
      </div>
    </section>
  );
}
```

### Lo que le falta a cada pieza para entrar
| Pieza | Estado | Qué falta |
|---|---|---|
| Campo (este PR) | Módulo con `fijarAvance`, `pausar` y `destruir` | Nada: entra como está |
| Camiones (PR #13) | `main.js` lee el scroll de la ventana y escribe en `#lienzo` | Pasarlo a `montarCamiones(raiz)` con el mismo contrato. Su `leerScroll()` ya calcula una distancia `d` a partir del avance: `fijarAvance(p)` solo debe hacer `objetivo = p * RECORRIDO` |
| Planta (PR #12) | Módulo `montarPlanta(raiz)` que corre sola en loop de 20 s | Agregar `fijarAvance(p)`. Ya tiene `fijar(s)` en `window.__planta` (modo `?debug`), que detiene el loop y pinta el segundo `s`: basta con devolverlo como `fijarAvance(p) { fijar(p * 20) }` sin el velo. También `pausar()` y `reanudar()` sobre su bucle |

El contrato es el mismo para las tres: `fijarAvance(p)`, `pausar()`, `reanudar()` y `destruir()`. Con eso el
director no necesita saber qué hay dentro de cada escena.

### Carga y memoria
- **Peso:** el campo pesa 1.9 MB, los camiones 1.7 MB y la planta 1.1 MB.
- **Carga:** monta el campo al entrar a la sección y cada escena siguiente cuando la anterior va a la mitad, con
  `import()` dinámico. Así nunca hay un cargador a la vista.
- **Contextos WebGL:** son tres a la vez, cada uno con su canvas. En escritorio no es problema. En teléfono,
  destruye la escena que quedó dos tramos atrás y vuelve a montarla si el scroll regresa.
- **Una sola versión de three** para todas las piezas: la de `package.json` cuando entre el globo (PR #11), que es
  0.170.0. El campo ya está probado con esa versión.

### Integración nativa en Next
1. `npm i three@0.170.0` (o la que ya esté en `package.json`).
2. Copia `public/animaciones/campo-trigo/campo3d.js` a `components/campo-3d/campo3d.js`. Sus imports (`three`,
   `three/addons/...`) los resuelve el bundler.
3. Deja los assets en `public/` y pasa `assets: '/animaciones/campo-trigo/assets/'`.
4. **Colores:** el fondo del cargador (`#1d140d`) va como token en `tailwind.config.ts`, porque el repo no admite
   hex sueltos en componentes.

Si solo hace falta mostrar el campo suelto, sin director, un `<iframe>` con
`src="/animaciones/campo-trigo/index.html"` funciona. Pero dentro de un iframe el scroll es el del iframe y no el
de la página, así que para la animación general conviene el módulo.

### `prefers-reduced-motion` en la animación general
`CLAUDE.md` pide dejar el estado final directo. Propuesta:
- el director no hace fundidos: cambia de escena de golpe al pasar cada tramo;
- cada escena se queda en el cuadro más claro de su tramo: el campo en `fijarSegundo(11)`, la orilla con el camión.

## Cómo regenerarla después de cambiar algo en Blender
1. **Si cambias la escena** (trayectoria, cámara, densidades del campo en Blender), edita
   `modelos-3d/campo-trigo/scripts/campo_persona.py` y ármala de nuevo:
   ```bash
   CAMION_40=/ruta/a/camion-bimbo-40.blend ARBOLES=/ruta/a/planeta-ventures.blend \
     blender -b --python modelos-3d/campo-trigo/scripts/campo_persona.py -- --salida modelos-3d/campo-trigo/campo-trigo.blend
   ```
   - El camión y los árboles salen de otros `.blend` que están en el drive del equipo, por eso van por variable.
   - Si solo retocas el `.blend` a mano, salta este paso.
2. **Exporta** sin interfaz:
   ```bash
   blender -b modelos-3d/campo-trigo/campo-trigo.blend --python modelos-3d/campo-trigo/scripts/exportar_web.py
   ```
   - Escribe `public/animaciones/campo-trigo/assets/` y no modifica el `.blend`.
   - Para escribir en otra carpeta, usa `SALIDA_WEB=/otra/carpeta/`.
3. **Sube `VERSION_ASSETS`** en `campo3d.js`, para que el navegador no use la copia en caché.
4. **Si cambiaste la parcela o la terracería** (límites, ancho o curva del camino), cambia también las mismas
   constantes en `campo3d.js`: `X_CAMPO`, `Y_CAMPO`, `ANCHO_CAMINO`, `xCamino` y `altura`.
5. **Revisa** a 375 px y en escritorio, y prueba con `prefers-reduced-motion`.

## Antes de publicarla en una página
- **Decisión pendiente, la misma de los PR #12 y #13:** `CLAUDE.md` dice que los camiones no se redibujan y que
  las fotos de camioncitos de vendedores no se publican.
  - El camión de los 40 es un modelo hecho a partir de esas fotos.
  - Sus calcas están recortadas de ellas.
  - Hay que confirmar si se queda o se cambia por material oficial antes de llevarlo a una página.
- **Sección nueva:** la animación general es una sección nueva, y según `CLAUDE.md` va primero en un issue.
  - Por intensidad le toca Nosotros o la historia (5).
  - En Inicio (2), la sección `ciclo` puede quedarse como está, con sus cinco etapas, y llevar a la historia.
- **Texto alternativo:** el `aria-label` de la página de prueba describe la escena sin cifras ni lugares reales.
