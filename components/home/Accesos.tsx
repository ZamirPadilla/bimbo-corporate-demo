"use client";

import { paginaPorSlug } from "@/content/paginas";
import { resolver } from "@/lib/copy";
import { useReveal } from "@/lib/useReveal";

export default function Accesos() {
  const inicio = paginaPorSlug("inicio")!;
  const seccion = inicio.secciones.find((s) => s.id === "accesos")!;
  if (seccion.tipo !== "distribuidor") throw new Error("Esperaba distribuidor");

  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="relative bg-harina pt-16 md:pt-24 pb-10">
      <div ref={ref} className="max-w-7xl mx-auto px-6 reveal">
        <div className="flex items-end justify-between mb-8 md:mb-12">
          <h2 className="font-serif text-2xl md:text-3xl text-tinta/80 italic">
            {seccion.titulo}
          </h2>
          <span className="hidden md:inline font-sans text-xs uppercase tracking-widest text-tinta/40">
            6 rutas
          </span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-tinta/10 rounded-2xl overflow-hidden">
          {seccion.rutas.map((ruta) => (
            <a
              key={ruta.audiencia}
              href={ruta.cta.destino}
              className="group bg-harina hover:bg-migaja p-6 md:p-8 transition-colors flex flex-col justify-between min-h-[180px]"
            >
              <div>
                <h3 className="font-display font-bold uppercase text-xl md:text-2xl text-tinta leading-tight mb-2">
                  {ruta.audiencia}
                </h3>
                <p className="font-sans text-sm text-tinta/60 leading-relaxed">
                  {resolver(ruta.texto)}
                </p>
              </div>
              <span className="mt-4 inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-widest text-accion-rojoBimbo">
                {ruta.cta.texto}
                <span className="transition-transform group-hover:translate-x-1" aria-hidden>
                  →
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
