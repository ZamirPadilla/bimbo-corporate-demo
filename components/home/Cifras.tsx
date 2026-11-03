"use client";

import { useEffect, useRef, useState } from "react";
import { paginaPorSlug } from "@/content/paginas";
import { cifras, type Cifra } from "@/content/cifras";
import { useReveal } from "@/lib/useReveal";

function parseValor(valor: string): { prefijo: string; numero: number | null; sufijo: string } {
  // Extrae "más de 153,000" → prefijo="más de ", numero=153000, sufijo=""
  // "más de 100" → prefijo="más de ", numero=100
  // "39" → numero=39
  const limpio = valor.replace(/\s+/g, " ").trim();
  const match = limpio.match(/^(.*?)([\d,]+)(.*)$/);
  if (!match) return { prefijo: limpio, numero: null, sufijo: "" };
  return {
    prefijo: match[1].trim() ? match[1] : "",
    numero: parseInt(match[2].replace(/,/g, ""), 10),
    sufijo: match[3],
  };
}

function Contador({ hasta }: { hasta: number }) {
  const [valor, setValor] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setValor(hasta);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            const inicio = performance.now();
            const duracion = 1800;
            const tick = (ahora: number) => {
              const t = Math.min((ahora - inicio) / duracion, 1);
              const eased = 1 - Math.pow(1 - t, 3);
              setValor(Math.floor(eased * hasta));
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasta]);

  return (
    <span ref={ref} className="tabular-nums">
      {valor.toLocaleString("es-MX")}
    </span>
  );
}

export default function Cifras() {
  const inicio = paginaPorSlug("inicio")!;
  const seccion = inicio.secciones.find((s) => s.id === "cifras")!;
  if (seccion.tipo !== "cifras") throw new Error("Esperaba cifras");

  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="relative py-24 md:py-32 bg-tinta text-harina overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" aria-hidden>
        <div className="franja-marcas h-full" />
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto px-6 reveal">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-trigo-200 mb-4">
              Bimbo en cifras
            </p>
            <h2 className="font-display font-black uppercase text-5xl md:text-7xl lg:text-8xl leading-[0.9] max-w-3xl">
              La panificadora más grande del mundo
            </h2>
          </div>
          <p className="font-sans text-sm text-harina/60 md:max-w-xs">
            Cifras del Informe Anual 2025 de Grupo Bimbo (cierre de 2025).
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12 md:gap-y-16">
          {seccion.ids.map((id) => {
            const cifra: Cifra = cifras[id];
            const { prefijo, numero, sufijo } = parseValor(cifra.valor);
            return (
              <div key={id} className="group">
                <div className="font-display font-black text-trigo-200 leading-none mb-3">
                  {prefijo && (
                    <span className="block font-sans font-semibold text-sm uppercase tracking-widest text-harina/50 mb-2">
                      {prefijo}
                    </span>
                  )}
                  <span className="text-6xl md:text-7xl lg:text-8xl">
                    {numero !== null ? <Contador hasta={numero} /> : cifra.valor}
                  </span>
                  {sufijo && (
                    <span className="font-sans font-normal text-sm text-harina/50 ml-2">
                      {sufijo}
                    </span>
                  )}
                </div>
                <p className="font-sans text-sm md:text-base text-harina/80 border-t border-harina/10 pt-4">
                  {cifra.etiqueta}
                </p>
                {cifra.unidad && (
                  <p className="font-sans text-xs text-harina/40 mt-1 uppercase tracking-wider">
                    {cifra.unidad}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
