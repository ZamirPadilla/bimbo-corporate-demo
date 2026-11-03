---
name: verificar-en-navegador
description: Comprueba en un navegador real que una página animada funciona — secciones ligadas al scroll, canvas (mapas, relieves), temporizadores, hover, videos y versiones de teléfono — midiendo con JavaScript en vez de confiar en capturas, sin tocar la pestaña que el usuario está viendo. Incluye trampas del panel de navegador integrado (rAF detenido si está oculto, capturas viejas con viewport emulado, emulación móvil que activa táctil) y recetas para instrumentar canvas, simular hover y medir tiempos. Úsala después de cada cambio visible en un sitio, cuando el usuario reporte "a veces no se ve", "en teléfono se encima", "el hover se pelea con la animación", o antes de publicar.
---

# Verificar en el navegador

Regla: **medir, no mirar**. Las capturas sirven como prueba final para el usuario; el diagnóstico se hace con
JavaScript ejecutado en la página.

## Antes de empezar
- **Pestaña propia.** Crear una pestaña nueva para probar; el usuario está mirando la suya. Al terminar: quitar la
  emulación de tamaño, volver a poner al frente la pestaña del usuario y cerrar la propia.
- **Panel visible.** Si el panel/ventana del navegador está oculto, `document.visibilityState === 'hidden'`:
  `requestAnimationFrame` no corre (canvas en blanco, 0 cuadros) y los `setInterval` se agrupan a 1 s. Mostrar el
  panel y poner la pestaña al frente antes de medir animaciones; comprobar `visibilityState` en cada medición.
- **Caché.** Subir `?v=N` en la URL de la página y en los scripts/iframes que cambiaron.

## Tamaños
- Teléfono 375×812 y ~550 px; tablet 820×1180 y 1180×820; portátil 1440×900; panorámico 2560×1080.
- La emulación de teléfono (cualquier ancho < 768 en el panel integrado) **también emula táctil**
  (`pointer: coarse`). Para probar una ventana angosta *con mouse*, insertar en la página un `<iframe>` de ancho
  fijo (p. ej. 480 px) con la URL a probar: dentro rigen el ancho del iframe y el puntero real.
- Con viewport emulado, las capturas a veces salen con un cuadro viejo o mal escaladas: confirmar el estado con JS.

## Recetas
**¿El canvas dibuja?** Contar píxeles con alfa:
```js
const c = document.querySelector('canvas'), d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data;
let n = 0; for (let i = 3; i < d.length; i += 4) if (d[i]) n++; n
```
**¿Qué texto dibuja el canvas y cuándo?** Interceptar `fillText` (en el `window` del iframe si el canvas vive ahí)
y muestrear cada segundo:
```js
const w = iframe.contentWindow, P = w.CanvasRenderingContext2D.prototype, of = P.fillText; let ft = [];
P.fillText = function (t, ...a) { ft.push(t); return of.call(this, t, ...a); };
// luego, en un bucle: esperar 1 s, guardar [...new Set(ft)], vaciar ft
```
Así se encontró que el mapa de PRODI no dibujaba etiquetas en ventanas angostas de computadora (la condición era el
ancho, no el tipo de puntero).

**¿Cuántos cuadros corren?** Envolver `requestAnimationFrame` y contar por segundo (≈ 60 visible, 0 oculto).

**Temporizadores.** Muestrear el estado cada 100 ms con marca de tiempo y registrar solo los cambios
(`"2@3.0", "3@6.4"`): se ve el periodo real, si se detiene con hover y si al salir reinicia el conteo.

**Hover y clics simulados.** React deriva `onMouseEnter/Leave` de `mouseover/mouseout` con `relatedTarget`;
`onMouseMove` de `mousemove` con `clientX/Y`:
```js
const fire = (el, type, x, y, rel) => el.dispatchEvent(new MouseEvent(type, { bubbles: true, cancelable: true, clientX: x, clientY: y, relatedTarget: rel || null }));
```
Volver a buscar los elementos después de cada cambio: las listas se re-renderizan y una referencia vieja ya no
está en el documento (`el.isConnected`). Para trayectorias reales del mouse, usar la herramienta de clic/hover del
navegador con coordenadas de una captura reciente.

**Marcadores clicables en canvas.** Recorrer el canvas con `mousemove` sintéticos hasta que `cursor === 'pointer'`,
mandar `click` y leer el estado al instante, a los 4 s y a los 10 s.

**Iframe del mismo origen.** `iframe.contentWindow` / `contentDocument` desde la página; `getComputedStyle` de sus
elementos para ver qué regla de `@media` aplica.

**Lo publicado.** Desde una pestaña ya autenticada en el sitio: `await (await fetch('/pagina', {cache:'no-store'})).text()`
y buscar el cambio. Para flujos con contraseña o cookies, `curl` con `-c/-b` (no teclear contraseñas reales en el
navegador de pruebas).

**Robots de vista previa.** `curl -A "WhatsApp/2.23.20.0"`, `-A "Slackbot-LinkExpanding 1.0"`,
`-A "facebookexternalhit/1.1"` y leer las etiquetas `og:`.

## Cierre
Reportar con evidencia: qué se midió, en qué tamaños, con qué resultado; una captura final para lo visual y lo que
no se pudo verificar (p. ej. "probado con eventos sintéticos, no con mouse real").
