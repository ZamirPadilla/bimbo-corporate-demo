---
name: interacciones-scroll
description: Patrones de interacción probados para un sitio corporativo en Next.js/React — progreso de una sección sticky ligada al scroll, etapas que avanzan solas y se pausan con el hover sin pelearse, filas que se expanden sin brincos, video perezoso en carruseles y franjas anchas con tope de alto. Úsala al construir o depurar una sección animada por scroll, un ciclo de etapas ("Del campo a tu mesa"), un carrusel con video o cuando "el hover se pelea con la animación" o "la fila brinca".
---

# Patrones de interacción (Next.js)

Cada patrón viene de un bug real o de una corrección en un sitio anterior. Todos van en componentes
`"use client"` y respetan `prefers-reduced-motion`.

## 1 · Progreso de scroll en una sección `sticky`
Sección alta (300–440 vh) con un hijo `sticky top-0 h-screen`. Un solo listener por sección, una medición por
cuadro, y el avance se escribe como variable CSS para no re-renderizar en cada cuadro:
```tsx
function useScrollProgress(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const el = ref.current; if (!el) return;
    let raf = 0;
    const medir = () => {
      raf = 0;
      const r = el.getBoundingClientRect(), span = r.height - innerHeight;
      const p = span <= 0 ? 0 : Math.min(1, Math.max(0, -r.top / span));
      el.style.setProperty("--p", p.toFixed(4));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(medir); };
    medir();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => { cancelAnimationFrame(raf); removeEventListener("scroll", onScroll); removeEventListener("resize", onScroll); };
  }, [ref]);
}
```
El CSS hace el resto (`transform: translateX(calc(var(--p) * -100%))`). Usa `setState` solo para cambios
discretos (qué lámina toca), no para valores continuos.

## 2 · Etapas con temporizador + hover que manda
Problema: el hover adelantaba la etapa pero el temporizador seguía y "se peleaba" con él. Solución: mientras el
mouse está encima, el temporizador se detiene; al salir, el conteo **empieza de cero**.
```tsx
const [paso, setPaso] = useState(0);
const [enPausa, setEnPausa] = useState(false);
const visible = useEnPantalla(ref);               // IntersectionObserver
const reducido = usePrefersReducedMotion();
useEffect(() => {
  if (!visible || enPausa || reducido) return;
  const t = setInterval(() => setPaso((s) => (s + 1) % ETAPAS), 3400);
  return () => clearInterval(t);                  // volver a montar = reiniciar el conteo
}, [visible, enPausa, reducido]);
// onMouseEnter/onMouseLeave en el contenedor de toda la lámina, no en cada fila
```

## 3 · Filas que se expanden sin brincar
Si la fila activa muestra texto extra, las demás se recorren y el navegador dispara `mouseenter` en otra fila
sin que el usuario mueva el mouse. Usa movimiento real:
```tsx
const ultimo = useRef<{ x: number; y: number }>();
const mover = (i: number) => (e: React.MouseEvent) => {
  const u = ultimo.current;
  if (u && u.x === e.clientX && u.y === e.clientY) return;   // fue el reacomodo, no el usuario
  ultimo.current = { x: e.clientX, y: e.clientY };
  setPaso(i);
};
// <button onMouseMove={mover(i)} onClick={() => setPaso(i)}>
```
Las piezas que no cambian de tamaño pueden usar `onMouseEnter`. El clic sigue funcionando en táctil.

## 4 · Video perezoso en carruseles
Solo se carga el video cercano a la pantalla y solo se reproduce el activo:
```tsx
<video ref={v} muted loop playsInline preload="none" poster={poster} />
// con IntersectionObserver (rootMargin "50% 0px"):
//   cerca y sin src -> v.src = esTelefono ? srcVertical : src
//   cerca y activo  -> v.play().catch(() => {})
//   lejos o inactivo -> v.pause()
// esTelefono = matchMedia("(max-width: 767px) and (max-aspect-ratio: 1/1)").matches
```
El póster es un JPEG ligero que se ve de inmediato. El video sube de opacidad cuando empieza a reproducirse.

## 5 · Franja ancha con tope de alto en horizontal
En pantallas anchas, una imagen 5:2 a todo el ancho crece hasta subirse sobre el título. Limita el alto con el
espacio libre medido en JS (`--bandMaxH`):
```css
@media (min-aspect-ratio: 1/1) and (max-aspect-ratio: 21/10), (min-aspect-ratio: 1/1) and (max-width: 1099px) {
  .franja { aspect-ratio: auto; width: 100%; height: min(var(--bandMaxH, 46vh), calc(100vw * 2 / 5)); }
}
```
Deja separación con la sección siguiente (`padding-top: clamp(48px, 6vw, 96px)`).

## 6 · Entradas al aparecer
Un hook con IntersectionObserver (`useReveal`) anima la entrada una sola vez. Lo que tiene movimiento propio, o
lo que debe verse de inmediato (un listado cuyo único efecto es el hover), no lleva reveal.
