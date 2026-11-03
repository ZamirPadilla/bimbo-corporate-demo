// «Del campo a tu mesa» dentro de Inicio (sección 08). Es el director de
// /animaciones/del-campo-a-tu-mesa/director.js con dos cambios: no lee el scroll de la ventana (Inicio le pasa el
// avance de su sección con fijarAvance) y avisa cada cuadro el avance ya suavizado, para que los textos de la página
// vayan exactamente con lo que se ve. Las escenas se cargan de la animación original, sin copiarlas: si cambian
// TRAMOS allá, cámbialos aquí también.
const BASE = new URL('../../animaciones/del-campo-a-tu-mesa/', import.meta.url);
const TRAMOS = [
  { id: 'campo',    inicio: 0.00, fin: 0.22, modulo: 'campo/campo3d.js',          montar: (m, raiz) => m.montarCampo(raiz, { inercia: 0 }) },
  { id: 'camiones', inicio: 0.20, fin: 0.50, modulo: 'camiones/camiones3d.js',    montar: (m, raiz) => m.montarCamiones(raiz) },
  { id: 'planta',   inicio: 0.48, fin: 0.78, modulo: 'planta/planta-fusion.js',   montar: (m, raiz) => m.montarPlantaFusion(raiz) },
  { id: 'planeta',  inicio: 0.77, fin: 1.00, modulo: 'planeta/planeta-fusion.js', montar: (m, raiz) => m.montarPlanetaFusion(raiz) },
];

/**
 * Monta la animación en `raiz` (un contenedor pegado a la pantalla).
 * @param {HTMLElement} raiz
 * @param {{ alAvanzar?: (P: number) => void, alCargar?: () => void }} opciones
 */
export async function montarCampoMesa(raiz, { alAvanzar, alCargar } = {}) {
  const quieto = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const INERCIA = quieto ? 0 : 0.25;
  const capas = {}, escenas = {};
  for (const t of TRAMOS) {
    const capa = document.createElement('div');
    capa.style.cssText = 'position:absolute;inset:0;opacity:0';
    capa.appendChild(document.createElement('canvas')).style.cssText = 'display:block;width:100%;height:100%';
    raiz.appendChild(capa);
    capas[t.id] = capa;
  }

  const opacidad = (i, p) => {
    const t = TRAMOS[i], antes = TRAMOS[i - 1], despues = TRAMOS[i + 1];
    const entra = antes ? (p - t.inicio) / (antes.fin - t.inicio) : 1;
    const sale = despues ? (t.fin - p) / (t.fin - despues.inicio) : 1;
    const o = Math.min(Math.max(Math.min(entra, sale), 0), 1);
    return quieto ? (o >= 0.5 ? 1 : 0) : o;
  };
  let visible = true;
  const dirigir = (p) => TRAMOS.forEach((t, i) => {
    const o = opacidad(i, p), e = escenas[t.id];
    capas[t.id].style.opacity = String(o);
    if (!e) return;
    const desde = TRAMOS[i - 1]?.fin ?? t.inicio, hasta = TRAMOS[i + 1]?.inicio ?? t.fin;
    e.fijarAvance(Math.min(Math.max((p - desde) / (hasta - desde), 0), 1));
    if (o > 0 && visible) e.reanudar(); else e.pausar();
  });

  let objetivo = 0, P = 0, antes = performance.now(), raf = 0, vivo = true;
  const cuadro = (ahora) => {
    const dt = Math.min((ahora - antes) / 1000, 0.1); antes = ahora;
    P = INERCIA ? P + (objetivo - P) * (1 - Math.exp(-dt / INERCIA)) : objetivo;
    if (Math.abs(objetivo - P) < 1e-5) P = objetivo;
    dirigir(P);
    alAvanzar?.(P);
    raf = visible ? requestAnimationFrame(cuadro) : 0;
  };

  const cargar = async (t) => {
    const e = await t.montar(await import(new URL(t.modulo, BASE).href), capas[t.id]);
    if (!vivo) return e.destruir();
    escenas[t.id] = e;
    dirigir(P);
  };
  // primero el campo (lo que se ve al llegar); las demás escenas se montan en orden después de devolver el control
  await cargar(TRAMOS[0]);
  if (!vivo) return null;
  alCargar?.();
  raf = requestAnimationFrame(cuadro);
  (async () => { for (const t of TRAMOS.slice(1)) if (vivo) await cargar(t); })()
    .catch((err) => console.warn('Del campo a tu mesa: falló una escena', err));

  return {
    fijarAvance(p) { objetivo = Math.min(Math.max(p, 0), 1); },
    /** Fuera de pantalla se pausan todas las escenas y se detiene el ciclo. */
    fijarVisible(v) {
      if (v === visible) return;
      visible = v;
      if (v) { antes = performance.now(); raf = raf || requestAnimationFrame(cuadro); } else { cancelAnimationFrame(raf); raf = 0; dirigir(P); }
    },
    destruir() {
      vivo = false; cancelAnimationFrame(raf);
      for (const e of Object.values(escenas)) e.destruir();
      raiz.replaceChildren();
    },
  };
}
