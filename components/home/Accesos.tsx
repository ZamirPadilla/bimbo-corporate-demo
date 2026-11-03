"use client";

import { paginaPorSlug } from "@/content/paginas";
import { resolver } from "@/lib/copy";
import { useReveal } from "@/lib/useReveal";

/**
 * Mosaico de bloques por audiencia (manual BMB-00334 §7: mosaico de bloques).
 * Cada ruta tiene un color del sistema de pilares, en bloque completo.
 */
const estilosPorAudiencia: Record<string, { bg: string; fg: string; acento: string }> = {
  Inversionistas: { bg: "bg-azul-noche", fg: "text-papel", acento: "text-cimientos-arena" },
  Carreras: { bg: "bg-paraLaVida", fg: "text-papel", acento: "text-paraLaVida-rosa" },
  Marcas: { bg: "bg-rojo", fg: "text-papel", acento: "text-crema" },
  Prensa: { bg: "bg-gobierno-pizarra", fg: "text-papel", acento: "text-gobierno-clara" },
  Proveedores: { bg: "bg-cimientos", fg: "text-papel", acento: "text-cimientos-arena" },
  Contacto: { bg: "bg-paraLaNaturaleza", fg: "text-papel", acento: "text-cimientos-arena" },
};

export default function Accesos() {
  const inicio = paginaPorSlug("inicio")!;
  const seccion = inicio.secciones.find((s) => s.id === "accesos")!;
  if (seccion.tipo !== "distribuidor") throw new Error("Esperaba distribuidor");

  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="relative py-24 md:py-32 bg-papel">
      <div ref={ref} className="max-w-7xl mx-auto px-6 md:px-12 reveal">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <p className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-rojo mb-4">
              ¿Quién nos busca?
            </p>
            <h2 className="font-display font-black uppercase text-4xl md:text-6xl leading-[0.9] text-tinta max-w-3xl">
              {seccion.titulo}
            </h2>
          </div>
          <p className="font-sans text-sm text-tinta/60 max-w-xs">
            Elige tu caso y te llevamos al canal correcto.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {seccion.rutas.map((ruta, idx) => {
            const estilo = estilosPorAudiencia[ruta.audiencia] ?? {
              bg: "bg-tinta",
              fg: "text-papel",
              acento: "text-cimientos-arena",
            };
            return (
              <a
                key={ruta.audiencia}
                href={ruta.cta.destino}
                className={`group relative overflow-hidden rounded-2xl ${estilo.bg} ${estilo.fg} p-7 md:p-8 min-h-[220px] flex flex-col justify-between hover:scale-[1.015] transition-transform`}
              >
                <div className="absolute inset-0 mantel-azul opacity-30" aria-hidden />
                <div className="relative">
                  <span className={`font-mono font-bold text-xs tracking-widest ${estilo.acento}`}>
                    0{idx + 1} / {seccion.rutas.length.toString().padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display font-black uppercase text-2xl md:text-3xl leading-none break-words">
                    {ruta.audiencia}
                  </h3>
                </div>
                <div className="relative">
                  <p className="font-sans text-sm leading-relaxed opacity-85 mb-5">
                    {resolver(ruta.texto)}
                  </p>
                  <span className="inline-flex items-center gap-2 font-sans font-semibold text-sm">
                    {ruta.cta.texto}
                    <span className="transition-transform group-hover:translate-x-1" aria-hidden>
                      →
                    </span>
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
