"use client";

import { paginaPorSlug } from "@/content/paginas";
import { resolver } from "@/lib/copy";
import { useReveal } from "@/lib/useReveal";

const colorPilar: Record<string, string> = {
  "Para Ti": "#C8873A",
  "Para la Vida": "#E0442E",
  "Para la Naturaleza": "#5A8A3E",
};

export default function Sostenibilidad() {
  const inicio = paginaPorSlug("inicio")!;
  const seccion = inicio.secciones.find((s) => s.id === "sustentabilidad")!;
  if (seccion.tipo !== "tarjetas") throw new Error("Esperaba tarjetas");

  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="sostenibilidad" className="relative py-24 md:py-32 bg-azul-700 text-harina overflow-hidden">
      {/* Textura cálida sutil */}
      <div className="absolute inset-0 opacity-10 textura-harina" aria-hidden />

      <div ref={ref} className="relative max-w-7xl mx-auto px-6 reveal">
        <div className="max-w-3xl mb-16">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-trigo-200 mb-4">
            {seccion.rotulo}
          </p>
          <h2 className="font-display font-black uppercase text-5xl md:text-7xl lg:text-8xl leading-[0.9] mb-8">
            {resolver(seccion.titulo)}
          </h2>
          {seccion.intro && (
            <p className="font-serif text-xl md:text-2xl text-harina/80 max-w-2xl leading-relaxed">
              {resolver(seccion.intro)}
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {seccion.items.map((pilar, i) => {
            const color = colorPilar[pilar.titulo] ?? "#E9C47C";
            return (
              <div
                key={pilar.titulo}
                className="group relative rounded-2xl border border-harina/10 bg-harina/5 hover:bg-harina/10 p-8 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
              >
                {/* Barra lateral de color */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-500 group-hover:w-2"
                  style={{ background: color }}
                  aria-hidden
                />
                <div className="relative">
                  <span
                    className="font-mono tabular-nums text-xs font-semibold uppercase tracking-widest"
                    style={{ color }}
                  >
                    0{i + 1} / 03
                  </span>
                  <h3 className="font-display font-black uppercase text-3xl md:text-4xl mt-4 mb-5 leading-tight">
                    {pilar.titulo}
                  </h3>
                  <p className="font-sans text-sm md:text-base text-harina/70 leading-relaxed mb-8">
                    {resolver(pilar.texto)}
                  </p>
                  {pilar.cta && (
                    <a
                      href={pilar.cta.destino}
                      className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-harina group/cta"
                    >
                      {pilar.cta.texto}
                      <span className="transition-transform group-hover/cta:translate-x-1" aria-hidden>
                        →
                      </span>
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
