"use client";

// Globo de presencia: recorre el mundo y las cuatro regiones de reporte. Avanza solo, se pausa con el
// cursor sobre el texto y se detiene en cuanto alguien gira, acerca o elige una región.
import { useEffect, useRef, useState } from "react";
import type { EscenaGlobo, PaisGlobo, Parada } from "./escena";

export type DatoGlobo = { valor: string; etiqueta: string; corte: string | null };
export type ParadaGlobo = {
  id: string;
  nombre: string;
  detalle?: string | null;
  region: number;
  destacados: DatoGlobo[];
  datos: DatoGlobo[];
  paises: string[];
};

// Encuadres de cámara: la parada viaja de `desde` a `hasta` (lat, lon y distancia en radios del globo).
const VISTAS: Record<number, Omit<Parada, "region">> = {
  0: { desde: { lat: 14, lon: -100, dist: 5.6 }, hasta: { lat: 22, lon: -72, dist: 5.0 }, giro: 1.5 },
  1: { desde: { lat: 50, lon: -112, dist: 3.6 }, hasta: { lat: 44, lon: -94, dist: 3.35 } },
  2: { desde: { lat: 25, lon: -105, dist: 2.85 }, hasta: { lat: 21, lon: -99, dist: 2.6 } },
  3: { desde: { lat: 0, lon: -74, dist: 3.75 }, hasta: { lat: -18, lon: -64, dist: 3.5 } },
  4: { desde: { lat: 18, lon: 16, dist: 3.9 }, hasta: { lat: 38, lon: 60, dist: 4.0 } },
};
const DURACION = { mundo: 11, region: 8 };
const SWATCH = ["bg-globo-tierra", "bg-globo-norteamerica", "bg-globo-mexico", "bg-globo-latinoamerica", "bg-globo-eaa"];

function Numero({ valor, className }: { valor: string; className?: string }) {
  const texto = valor.replace(/^más de /, "+");
  const m = texto.match(/\d[\d,]*/);
  const meta = m ? Number(m[0].replace(/,/g, "")) : 0;
  const [n, setN] = useState(meta);
  useEffect(() => {
    if (!m || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setN(meta);
    let cuadro = 0;
    const inicio = performance.now();
    const paso = (ahora: number) => {
      const t = Math.min(1, (ahora - inicio) / 1100);
      setN(Math.round(meta * (1 - Math.pow(1 - t, 3))));
      if (t < 1) cuadro = requestAnimationFrame(paso);
    };
    cuadro = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(cuadro);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valor]);
  if (!m) return <span className={className}>{texto}</span>;
  const i = m.index ?? 0;
  return (
    <span className={`tabular-nums ${className ?? ""}`} aria-label={texto}>
      {texto.slice(0, i)}
      {n.toLocaleString("en-US")}
      {texto.slice(i + m[0].length)}
    </span>
  );
}

export default function GloboPresencia({ rotulo, titulo, bajada, paradas }: { rotulo: string; titulo: string; bajada: string; paradas: ParadaGlobo[] }) {
  const lienzo = useRef<HTMLCanvasElement>(null);
  const capa = useRef<HTMLDivElement>(null);
  const seccion = useRef<HTMLElement>(null);
  const barra = useRef<HTMLElement>(null);
  const escena = useRef<EscenaGlobo | null>(null);
  const [paises, setPaises] = useState<PaisGlobo[]>([]);
  const [indice, setIndice] = useState(0);
  const [reproduciendo, setReproduciendo] = useState(true);
  const [enVista, setEnVista] = useState(false);
  const [listo, setListo] = useState(false);
  const parada = paradas[indice];
  const duracion = parada.region === 0 ? DURACION.mundo : DURACION.region;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setReproduciendo(false);
    let vivo = true;
    let instancia: EscenaGlobo | null = null;
    (async () => {
      const [{ EscenaGlobo }, datos] = await Promise.all([import("./escena"), fetch("/globo/paises.json").then((r) => r.json())]);
      if (!vivo || !lienzo.current || !capa.current) return;
      instancia = new EscenaGlobo(lienzo.current, capa.current, datos.paises);
      instancia.onInteraccion = () => setReproduciendo(false);
      escena.current = instancia;
      setPaises(datos.paises);
      await instancia.cargar("/globo/granos.bin");
      if (vivo) setListo(true);
    })();
    return () => {
      vivo = false;
      instancia?.destruir();
      escena.current = null;
    };
  }, []);

  // Escritorio: el globo vive a la derecha del texto. Teléfono: centrado en su propia caja.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const aplicar = () => escena.current?.ajustar(mq.matches ? { x: 0.17, y: 0 } : { x: 0, y: 0 });
    aplicar();
    mq.addEventListener("change", aplicar);
    return () => mq.removeEventListener("change", aplicar);
  }, [paises]);

  useEffect(() => {
    const el = seccion.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      setEnVista(e.isIntersecting);
      escena.current?.setVisible(e.isIntersecting);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [paises]);

  useEffect(() => {
    escena.current?.irA({ region: parada.region, ...VISTAS[parada.region] }, duracion);
    escena.current?.enfocar(-1);
  }, [parada, duracion, paises]);

  // Teléfono: la barra de regiones se desplaza sola hasta la parada activa (sin mover la página).
  useEffect(() => {
    const nav = barra.current;
    const boton = nav?.querySelectorAll("button")[indice];
    if (nav && boton && nav.scrollWidth > nav.clientWidth) nav.scrollTo({ left: boton.offsetLeft - 16, behavior: "smooth" });
  }, [indice]);

  const elegir = (i: number) => {
    setIndice(i);
    setReproduciendo(false);
  };
  const enfocar = (nombre: string | null) => escena.current?.enfocar(nombre ? paises.findIndex((p) => p.nombre === nombre) : -1);
  const cortes = [...new Set([...parada.destacados, ...parada.datos].map((d) => d.corte).filter(Boolean))];

  return (
    <section
      ref={seccion}
      aria-labelledby="globo-titulo"
      data-globo
      className="relative isolate flex flex-col overflow-clip bg-globo-noche font-display text-white md:block md:h-[calc(100svh-2rem)] md:min-h-[36rem]"
    >
      <div className="relative order-2 h-[58svh] min-h-[340px] md:absolute md:inset-0 md:h-auto">
        <canvas
          ref={lienzo}
          aria-label={`Globo terráqueo con los países donde opera Grupo Bimbo. Vista actual: ${parada.nombre}.`}
          role="img"
          className={`absolute inset-0 h-full w-full cursor-grab touch-pan-y transition-opacity duration-1000 active:cursor-grabbing ${listo ? "opacity-100" : "opacity-0"}`}
        />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 hidden w-[58%] bg-gradient-to-r from-globo-noche from-40% via-globo-noche/70 to-transparent md:block" />
        <div ref={capa} aria-hidden className="pointer-events-none absolute inset-0" />
        <p className="pointer-events-none absolute bottom-3 right-4 hidden text-xs text-white/50 md:block">Arrastra para girar · pellizca o usa + / − para acercar</p>
      </div>

      <div className="pointer-events-none relative z-10 order-1 contents md:flex md:h-full md:w-[46%] md:max-w-[38.75rem] md:flex-col md:py-12 md:pl-16">
        <header className="order-1 px-4 pt-10 md:px-0 md:pt-0">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-globo-rotulo">{rotulo}</p>
          <h1 id="globo-titulo" className="mt-3 text-4xl font-black uppercase leading-[0.95] tracking-tight md:text-5xl">
            {titulo}
          </h1>
          <p className="mt-4 max-w-md text-base text-white/75">{bajada}</p>
        </header>

        <nav
          ref={barra}
          aria-label="Regiones"
          className="pointer-events-auto order-3 -mt-2 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] md:order-4 md:mt-auto md:flex-wrap md:overflow-visible md:px-0"
          onMouseEnter={() => seccion.current?.style.setProperty("--pausa", "paused")}
          onMouseLeave={() => seccion.current?.style.removeProperty("--pausa")}
        >
          {paradas.map((p, i) => {
            const activa = i === indice;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => elegir(i)}
                aria-pressed={activa}
                className={`relative shrink-0 overflow-hidden rounded-full border px-4 py-2 text-sm font-extrabold uppercase tracking-wide transition-colors ${
                  activa ? "border-white bg-white text-globo-noche" : "border-white/25 text-white hover:border-white/70"
                }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${p.region === 0 ? "bg-gradient-to-r from-globo-norteamerica via-globo-mexico to-globo-eaa" : SWATCH[p.region]}`} />
                  {p.nombre}
                </span>
                {activa && reproduciendo && enVista && (
                  <span
                    key={`${p.id}-${indice}`}
                    aria-hidden
                    onAnimationEnd={() => setIndice((indice + 1) % paradas.length)}
                    className="absolute inset-y-0 left-0 w-full origin-left bg-globo-mexico/60 motion-safe:animate-[globo-avance_linear_forwards]"
                    style={{ animationDuration: `${duracion}s`, animationPlayState: "var(--pausa, running)" }}
                  />
                )}
              </button>
            );
          })}
          <span className="ml-auto flex shrink-0 gap-2 md:ml-0">
            <button
              type="button"
              onClick={() => setReproduciendo((r) => !r)}
              aria-label={reproduciendo ? "Pausar recorrido" : "Reanudar recorrido"}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/25 text-sm hover:border-white/70"
            >
              {reproduciendo ? "❚❚" : "▶"}
            </button>
            <button type="button" onClick={() => escena.current?.acercar(0.8)} aria-label="Acercar" className="grid h-10 w-10 place-items-center rounded-full border border-white/25 text-xl leading-none hover:border-white/70">
              +
            </button>
            <button type="button" onClick={() => escena.current?.acercar(1.25)} aria-label="Alejar" className="grid h-10 w-10 place-items-center rounded-full border border-white/25 text-xl leading-none hover:border-white/70">
              −
            </button>
          </span>
        </nav>

        <div
          key={parada.id}
          className="pointer-events-auto order-4 px-4 pb-12 pt-6 motion-safe:animate-[globo-entra_0.6s_ease-out] md:order-3 md:px-0 md:pb-6 md:pt-8"
          onMouseEnter={() => seccion.current?.style.setProperty("--pausa", "paused")}
          onMouseLeave={() => seccion.current?.style.removeProperty("--pausa")}
        >
          {parada.region === 0 ? (
            <div className="flex items-end gap-8">
              {parada.destacados.map((d, i) => (
                <div key={d.etiqueta}>
                  <Numero
                    valor={d.valor}
                    className={`block font-black leading-none ${i === 0 ? "text-8xl md:text-9xl" : "text-6xl md:text-7xl"}`}
                  />
                  <p className="mt-2 max-w-[11rem] text-xs font-semibold uppercase leading-tight tracking-wide text-globo-rotulo">{d.etiqueta}</p>
                </div>
              ))}
            </div>
          ) : (
            <>
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-globo-rotulo">
                <span className={`h-3 w-3 rounded-full ${SWATCH[parada.region]}`} />
                Región {parada.region} de {paradas.length - 1}
                {parada.detalle && <span className="normal-case tracking-normal text-white/60">· {parada.detalle}</span>}
              </p>
              <h2 className="mt-2 text-[2.5rem] font-black uppercase leading-none tracking-tight sm:text-5xl md:text-6xl">{parada.nombre}</h2>
              <div className="mt-6 flex flex-wrap items-end gap-x-8 gap-y-4">
                {parada.destacados.map((d) => (
                  <div key={d.etiqueta}>
                    <Numero valor={d.valor} className="block text-5xl font-black leading-none md:text-6xl" />
                    <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-globo-rotulo">{d.etiqueta}</p>
                  </div>
                ))}
                <div>
                  <Numero valor={String(parada.paises.length)} className="block text-5xl font-black leading-none md:text-6xl" />
                  <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-globo-rotulo">{parada.paises.length === 1 ? "País" : "Países"}</p>
                </div>
              </div>
            </>
          )}

          {parada.datos.length > 0 && (
            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/15 pt-6 sm:grid-cols-3">
              {parada.datos.map((d) => (
                <div key={d.etiqueta}>
                  <dd>
                    <Numero valor={d.valor} className="block text-3xl font-black leading-none" />
                  </dd>
                  <dt className="mt-1.5 text-[0.6875rem] font-semibold uppercase leading-tight tracking-wide text-globo-rotulo">{d.etiqueta}</dt>
                </div>
              ))}
            </dl>
          )}

          {parada.paises.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-1.5" aria-label={`Países de ${parada.nombre}`}>
              {parada.paises.map((nombre) => (
                <li key={nombre}>
                  <button
                    type="button"
                    onMouseEnter={() => enfocar(nombre)}
                    onMouseLeave={() => enfocar(null)}
                    onFocus={() => enfocar(nombre)}
                    onBlur={() => enfocar(null)}
                    className="rounded-full bg-white/10 px-3 py-1 text-sm font-semibold transition-colors hover:bg-white hover:text-globo-noche focus-visible:bg-white focus-visible:text-globo-noche"
                  >
                    {nombre}
                  </button>
                </li>
              ))}
            </ul>
          )}

          {cortes.length > 0 && <p className="mt-6 text-[0.6875rem] text-white/45">Corte: {cortes.join(" · ")}.</p>}
        </div>
      </div>
    </section>
  );
}
