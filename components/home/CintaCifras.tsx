"use client";

import { useReveal } from "@/lib/useReveal";

/**
 * Cinta compacta con las 5 cifras-insignia debajo del hero.
 * Alineada al estilo del informe (BMB-00297: mapa hecho con granos).
 */
const cifras = [
  { numero: "+100", etiqueta: "Marcas" },
  { numero: "39", etiqueta: "Países con operación" },
  { numero: "249", etiqueta: "Panaderías y plantas" },
  { numero: "+153k", etiqueta: "Colaboradores" },
  { numero: "+9k", etiqueta: "Productos" },
] as const;

export default function CintaCifras() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="relative bg-papel border-y border-tinta/10">
      <div ref={ref} className="max-w-7xl mx-auto reveal">
        <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-tinta/10">
          {cifras.map((c) => (
            <div
              key={c.etiqueta}
              className="px-5 py-7 md:py-10 group hover:bg-hueso transition-colors"
            >
              <div className="font-display font-black text-azul text-4xl md:text-5xl lg:text-6xl leading-none tabular-nums">
                {c.numero}
              </div>
              <p className="mt-3 font-sans font-bold uppercase text-[11px] md:text-xs tracking-widest text-tinta/70">
                {c.etiqueta}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
