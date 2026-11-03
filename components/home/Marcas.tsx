"use client";

import Link from "next/link";
import { paginaPorSlug } from "@/content/paginas";
import { resolver } from "@/lib/copy";
import { useReveal } from "@/lib/useReveal";

// Colores aproximados por marca (del logo). Validar con guías oficiales.
const colorMarca: Record<string, string> = {
  Bimbo: "#003DA5",
  Marinela: "#E30613",
  "Barcel · Takis": "#FF8C32",
  "Thomas'": "#8B4513",
  "Entenmann's": "#1F3A68",
  Oroweat: "#C8873A",
  "Sara Lee": "#B91C1C",
  Donuts: "#F4A4C0",
};

export default function Marcas() {
  const inicio = paginaPorSlug("inicio")!;
  const seccion = inicio.secciones.find((s) => s.id === "marcas")!;
  if (seccion.tipo !== "tarjetas") throw new Error("Esperaba tarjetas");

  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="marcas" className="relative py-24 md:py-32 bg-migaja">
      <div ref={ref} className="max-w-7xl mx-auto px-6 reveal">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-accion-rojoBimbo mb-4">
              {seccion.rotulo}
            </p>
            <h2 className="font-display font-black uppercase text-5xl md:text-7xl lg:text-8xl text-tinta leading-[0.9]">
              {resolver(seccion.titulo)}
            </h2>
          </div>
          <Link
            href="/wireframes/marcas"
            className="group inline-flex items-center gap-2 font-sans font-semibold text-tinta whitespace-nowrap"
          >
            <span className="relative">
              Ver todas
              <span className="absolute left-0 right-0 bottom-0 h-px bg-tinta transition-transform origin-left group-hover:scale-x-110" />
            </span>
            <span className="transition-transform group-hover:translate-x-1" aria-hidden>
              →
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {seccion.items.map((item) => {
            const color = colorMarca[item.titulo] ?? "#1E2230";
            return (
              <a
                key={item.titulo}
                href="#"
                className="group relative overflow-hidden rounded-2xl aspect-[4/5] bg-harina border border-tinta/5 p-6 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-500"
                style={{
                  // tinte sutil del color de la marca en el fondo
                  background: `linear-gradient(135deg, ${color}08 0%, #FFFDF9 60%)`,
                }}
              >
                <div
                  className="absolute top-0 left-0 w-1 h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: color }}
                  aria-hidden
                />
                <div className="relative">
                  <span
                    className="inline-block w-3 h-3 rounded-full mb-4"
                    style={{ background: color }}
                    aria-hidden
                  />
                  <h3 className="font-display font-black uppercase text-2xl md:text-3xl text-tinta leading-none">
                    {item.titulo}
                  </h3>
                </div>
                <div className="relative">
                  <p className="font-sans text-sm text-tinta/60 mb-3">{item.texto}</p>
                  <span
                    className="inline-flex items-center gap-1 text-xs font-sans font-semibold uppercase tracking-widest"
                    style={{ color }}
                  >
                    Visitar <span aria-hidden>→</span>
                  </span>
                </div>
              </a>
            );
          })}
        </div>

        <p className="mt-10 font-sans text-xs text-tinta/40 max-w-3xl">
          Las categorías por confirmar con el catálogo. Enlaces apuntan al sitio de cada marca cuando esté verificado.
        </p>
      </div>
    </section>
  );
}
