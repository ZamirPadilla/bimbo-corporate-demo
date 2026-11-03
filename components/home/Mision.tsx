"use client";

import { useEffect, useRef, useState } from "react";
import { paginaPorSlug } from "@/content/paginas";
import { resolver } from "@/lib/copy";

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
      // Comienza cuando el top de la sección está a 70% del viewport
      // Termina cuando el top está a 10% del viewport
      const start = vh * 0.7;
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
    <section id="nosotros" className="relative py-32 md:py-48 bg-harina">
      <div ref={ref} className="max-w-5xl mx-auto px-6">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-accion-rojoBimbo mb-6">
          Nuestra misión
        </p>
        <h2 className="font-display font-black uppercase text-4xl md:text-6xl lg:text-7xl text-tinta leading-[0.95] mb-16 max-w-4xl">
          {titulo}
        </h2>
        <p className="font-serif text-2xl md:text-3xl lg:text-4xl leading-tight text-tinta/80 max-w-4xl">
          {palabras.map((w, i) => (
            <span
              key={i}
              className="transition-all duration-500 ease-out"
              style={{
                opacity: i < palabrasRevelas ? 1 : 0.18,
                filter: i < palabrasRevelas ? "blur(0)" : "blur(4px)",
              }}
            >
              {w}{" "}
            </span>
          ))}
        </p>
        {seccion.cta && (
          <a
            href={seccion.cta.destino}
            className="mt-12 inline-flex items-center gap-3 group text-tinta font-sans font-semibold"
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
