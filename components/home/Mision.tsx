"use client";

import { useEffect, useRef, useState } from "react";
import { paginaPorSlug } from "@/content/paginas";
import { resolver } from "@/lib/copy";

/**
 * Nuestra misión: texto grande revelado palabra por palabra con el scroll.
 * El titular usa la técnica de "letras rellenas de foto" del manual (BMB-00334).
 */
export default function Mision() {
  const inicio = paginaPorSlug("inicio")!;
  const seccion = inicio.secciones.find((s) => s.id === "mision")!;
  if (seccion.tipo !== "texto") throw new Error("Esperaba texto");

  const titulo = resolver(seccion.titulo);
  const parrafo = resolver(seccion.parrafos.join(" "));
  const palabras = parrafo.split(" ");

  const ref = useRef<HTMLDivElement>(null);
  const [progreso, setProgreso] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setProgreso(1);
      return;
    }

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.75;
      const end = vh * 0.1;
      const t = (start - rect.top) / (start - end);
      setProgreso(Math.max(0, Math.min(1, t)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const palabrasRevelas = Math.floor(progreso * palabras.length);

  return (
    <section id="nosotros" className="relative py-32 md:py-48 bg-papel">
      <div ref={ref} className="max-w-6xl mx-auto px-6 md:px-12">
        <p className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-rojo mb-10">
          Nuestra misión
        </p>

        {/* Titular con letras rellenas de textura cálida */}
        <h2 className="font-display font-black uppercase text-silaba-sm md:text-silaba leading-[0.88] mb-16 max-w-4xl letra-foto">
          {titulo}
        </h2>

        {/* Texto grande revelado palabra por palabra */}
        <p className="font-sans text-2xl md:text-3xl lg:text-4xl leading-tight text-tinta font-medium max-w-5xl">
          {palabras.map((w, i) => (
            <span
              key={i}
              className="transition-all duration-500 ease-out"
              style={{
                opacity: i < palabrasRevelas ? 1 : 0.15,
                filter: i < palabrasRevelas ? "blur(0)" : "blur(5px)",
              }}
            >
              {w}{" "}
            </span>
          ))}
        </p>

        {seccion.cta && (
          <a
            href={seccion.cta.destino}
            className="mt-16 inline-flex items-center gap-3 group text-tinta font-sans font-semibold"
          >
            <span className="relative">
              {seccion.cta.texto}
              <span className="absolute left-0 right-0 bottom-0 h-px bg-tinta transition-transform origin-left group-hover:scale-x-110" />
            </span>
            <span className="transition-transform group-hover:translate-x-1" aria-hidden>
              →
            </span>
          </a>
        )}
      </div>
    </section>
  );
}
