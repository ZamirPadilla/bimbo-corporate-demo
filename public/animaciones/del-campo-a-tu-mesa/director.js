// Director de «Del campo a tu mesa»: un solo scroll reparte el avance entre las cuatro escenas.
// Cada escena es un módulo con el mismo contrato (fijarAvance, pausar, reanudar, destruir) y su propio canvas;
// el director no sabe qué hay dentro de ninguna. Los tramos se traslapan: en el traslape se funden las dos escenas,
// que en ese momento muestran el mismo camión en el mismo lugar de la pantalla.
//   ?p=0.35  congela la historia en ese avance (para capturas)   ·   ?debug  muestra avance, tramo y fps
const TRAMOS = [
  { id: 'campo',    inicio: 0.00, fin: 0.22, montar: async (raiz) => (await import('./campo/campo3d.js')).montarCampo(raiz, { inercia: 0 }) },
  { id: 'camiones', inicio: 0.20, fin: 0.50, montar: async (raiz) => (await import('./camiones/camiones3d.js')).montarCamiones(raiz) },
  { id: 'planta',   inicio: 0.48, fin: 0.78, montar: async (raiz) => (await import('./planta/planta-fusion.js')).montarPlantaFusion(raiz) },
  { id: 'planeta',  inicio: 0.76, fin: 1.00, montar: async (raiz) => (await import('./planeta/planeta-fusion.js')).montarPlanetaFusion(raiz) },
];
const params = new URLSearchParams(location.search);
const P_FIJO = params.has('p') ? parseFloat(params.get('p')) : null;
const DEPURAR = params.has('debug');
const quieto = matchMedia('(prefers-reduced-motion: reduce)').matches;
const INERCIA = quieto ? 0 : 0.25;                    // s; una sola inercia para todas las escenas, así van juntas

const pista = document.getElementById('pista'), aviso = document.getElementById('aviso'), carga = document.getElementById('carga');
const panel = document.getElementById('depurar'); panel.hidden = !DEPURAR;
const capas = Object.fromEntries([...document.querySelectorAll('.escena')].map((n) => [n.dataset.escena, n]));
const escenas = {};

if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
scrollTo(0, 0);

let objetivo = P_FIJO ?? 0, P = objetivo;
function leerScroll() {
  const recorrido = Math.max(pista.offsetHeight - innerHeight, 1);
  objetivo = Math.min(Math.max(scrollY / recorrido, 0), 1);
  aviso.classList.toggle('oculto', scrollY > 40);
}
if (P_FIJO === null) addEventListener('scroll', leerScroll, { passive: true });

// opacidad de cada tramo: entra y sale en el traslape con sus vecinos; con movimiento reducido, corte directo
function opacidad(i, p) {
  const t = TRAMOS[i], antes = TRAMOS[i - 1], despues = TRAMOS[i + 1];
  const entra = antes ? (p - t.inicio) / (antes.fin - t.inicio) : 1;
  const sale = despues ? (t.fin - p) / (t.fin - despues.inicio) : 1;
  const o = Math.min(Math.max(Math.min(entra, sale), 0), 1);
  return quieto ? (o >= 0.5 ? 1 : 0) : o;
}
function dirigir(p) {
  TRAMOS.forEach((t, i) => {
    const o = opacidad(i, p), e = escenas[t.id];
    capas[t.id].style.opacity = String(o);
    if (!e) return;
    // el avance propio corre entre los fundidos: durante cada fundido las dos escenas se quedan en el cuadro que casa
    const desde = TRAMOS[i - 1]?.fin ?? t.inicio, hasta = TRAMOS[i + 1]?.inicio ?? t.fin;
    e.fijarAvance(Math.min(Math.max((p - desde) / (hasta - desde), 0), 1));
    if (o > 0) e.reanudar(); else e.pausar();
  });
}

let antes = performance.now(), fpsN = 0, fpsT = antes, fps = 0;
function cuadro(ahora) {
  const dt = Math.min((ahora - antes) / 1000, 0.1); antes = ahora;
  P = INERCIA ? P + (objetivo - P) * (1 - Math.exp(-dt / INERCIA)) : objetivo;
  if (Math.abs(objetivo - P) < 1e-5) P = objetivo;
  dirigir(P);
  if (DEPURAR) {
    fpsN++; if (ahora - fpsT > 500) { fps = Math.round(fpsN * 1000 / (ahora - fpsT)); fpsN = 0; fpsT = ahora; }
    const activos = TRAMOS.filter((t, i) => opacidad(i, P) > 0).map((t) => t.id).join(' + ');
    panel.textContent = `P ${P.toFixed(3)} · ${activos} · ${fps} fps`;
  }
  requestAnimationFrame(cuadro);
}

// montaje: primero la escena que se ve al llegar; las demás, en orden, mientras tanto
const primera = TRAMOS.findIndex((t, i) => opacidad(i, objetivo) > 0);
for (const i of [primera, ...TRAMOS.keys()].filter((v, k, a) => a.indexOf(v) === k)) {
  const t = TRAMOS[i];
  escenas[t.id] = await t.montar(capas[t.id]);
  dirigir(P);
  if (i === primera) { carga.classList.add('listo'); requestAnimationFrame(cuadro); }
}
if (P_FIJO === null) leerScroll();
if (DEPURAR) window.__fusion = { escenas, get P() { return P; }, fijar(p) { objetivo = P = p; } };
