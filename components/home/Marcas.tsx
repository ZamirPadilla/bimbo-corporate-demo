"use client";

import Link from "next/link";
import { paginaPorSlug } from "@/content/paginas";
import { resolver } from "@/lib/copy";
import { useReveal } from "@/lib/useReveal";
import { Apilado } from "@/components/branding/Apilado";

// Colores aproximados por marca (del logo). Validar con guías oficiales.
const estilos: Record<string, { bg: string; fg: string; icon: string }> = {
  Bimbo: { bg: "#15359D", fg: "#F6EEDF", icon: "🍞" },
  Marinela: { bg: "#EE353A", fg: "#F6EEDF", icon: "🧁" },
  "Barcel · Takis": { bg: "#DF8A35", fg: "#1A1D24", icon: "🌶" },
  "Thomas'": { bg: "#954F1E", fg: "#F6EEDF", icon: "🥯" },
  "Entenmann's": { bg: "#0F2F51", fg: "#F6EEDF", icon: "🍩" },
  Oroweat: { bg: "#BE973C", fg: "#1A1D24", icon: "🌾" },
  "Sara Lee": { bg: "#A02949", fg: "#F6EEDF", icon: "🥪" },
  Donuts: { bg: "#D33D66", fg: "#F6EEDF", icon: "🍩" },
};

export default function Marcas() {
  const inicio = paginaPorSlug("inicio")!;
  const seccion = inicio.secciones.find((s) => s.id === "marcas")!;
  if (seccion.tipo !== "tarjetas") throw new Error("Esperaba tarjetas");

  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="marcas" className="relative py-24 md:py-32 bg-hueso">
      <div ref={ref} className="max-w-7xl mx-auto px-6 md:px-12 reveal">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-3xl">
            <p className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-rojo mb-4">
              Nuestras marcas · +100 en el portafolio
            </p>
            <Apilado silabas={["UNA", "MARCA"]} tamano="sm" variante="mixto" />
            <h2 className="mt-4 font-display font-black uppercase text-silaba-sm leading-[0.9] text-tinta">
              para cada momento del día
            </h2>
          </div>
          <Link
            href="/wireframes/marcas"
            className="group inline-flex items-center gap-2 font-sans font-semibold text-tinta whitespace-nowrap self-start md:self-end"
          >
            <span className="relative">
              Explorar marcas por país
              <span className="absolute left-0 right-0 bottom-0 h-px bg-tinta transition-transform origin-left group-hover:scale-x-110" />
            </span>
            <span className="transition-transform group-hover:translate-x-1" aria-hidden>
              →
            </span>
          </Link>
        </div>

        {/* Mosaico de categorías / marcas con color propio por bloque */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {seccion.items.map((item) => {
            const e = estilos[item.titulo] ?? { bg: "#1A1D24", fg: "#F6EEDF", icon: "·" };
            return (
              <a
                key={item.titulo}
                href="#"
                className="group relative overflow-hidden rounded-2xl aspect-[4/5] p-6 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-500"
                style={{ background: e.bg, color: e.fg }}
              >
                <div className="absolute inset-0 mantel-azul opacity-25" aria-hidden />
                <div className="relative flex items-start justify-between gap-3">
                  <span className="text-3xl md:text-4xl" aria-hidden>
                    {e.icon}
                  </span>
                  <span className="font-mono text-xs font-bold uppercase tracking-widest opacity-70">
                    .{String(seccion.items.indexOf(item) + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="relative">
                  <h3 className="font-display font-black uppercase text-xl md:text-2xl leading-none mb-2 break-words">
                    {item.titulo}
                  </h3>
                  <p className="font-sans text-xs md:text-sm opacity-80 mb-4">
                    {resolver(item.texto)}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-sans font-bold uppercase tracking-widest">
                    Visitar <span aria-hidden>→</span>
                  </span>
                </div>
              </a>
            );
          })}
        </div>

        <p className="mt-10 font-sans text-xs text-tinta/40 max-w-3xl italic">
          Categorías por confirmar con el catálogo oficial de marcas. Enlaces apuntan al sitio de cada marca cuando esté verificado.
        </p>
      </div>
    </section>
  );
}
