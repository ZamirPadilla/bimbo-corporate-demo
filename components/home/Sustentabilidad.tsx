"use client";

import { paginaPorSlug } from "@/content/paginas";
import { resolver } from "@/lib/copy";
import { useReveal } from "@/lib/useReveal";
import { Apilado } from "@/components/branding/Apilado";

/**
 * Sustentabilidad: un color por pilar en bloques completos.
 * (BMB-00334 §2: "el color de pilar cubre bloques completos, nunca degradados").
 */
const pilares = {
  "Para Ti": {
    color: "#DF8A35",
    acento: "#954F1E",
    textoAcento: "#FAE5C5",
    silabas: ["PARA", "TI"],
    cifra: "95%",
    cifraEtiqueta: "productos con mejor perfil nutrimental hacia 2030",
  },
  "Para la Vida": {
    color: "#D33D66",
    acento: "#A02949",
    textoAcento: "#E2838C",
    silabas: ["PARA", "LA", "VIDA"],
    cifra: "+30%",
    cifraEtiqueta: "mujeres en posiciones de liderazgo",
  },
  "Para la Naturaleza": {
    color: "#479851",
    acento: "#1B4A31",
    textoAcento: "#DFC389",
    silabas: ["PARA", "LA", "NAT"],
    cifra: "2050",
    cifraEtiqueta: "cero emisiones netas · 100% agricultura regenerativa",
  },
};

export default function Sustentabilidad() {
  const inicio = paginaPorSlug("inicio")!;
  const seccion = inicio.secciones.find((s) => s.id === "sustentabilidad")!;
  if (seccion.tipo !== "tarjetas") throw new Error("Esperaba tarjetas");

  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="sustentabilidad" className="relative bg-tinta text-papel">
      {/* Introducción */}
      <div ref={ref} className="relative max-w-7xl mx-auto px-6 md:px-12 pt-24 md:pt-32 pb-16 reveal">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-20 items-end">
          <div>
            <p className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-cimientos-arena mb-6">
              {seccion.rotulo} · estrategia 2021—2050
            </p>
            <Apilado silabas={["ALIMEN", "TAMOS"]} tamano="normal" variante="mixto" />
          </div>
          <div>
            <h2 className="font-display font-black uppercase text-silaba-sm leading-[0.9] text-cimientos-arena">
              un mundo mejor
            </h2>
            {seccion.intro && (
              <p className="mt-8 font-sans text-lg md:text-xl text-papel/80 leading-relaxed max-w-xl">
                {resolver(seccion.intro)}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Tres pilares, cada uno su color en bloque completo */}
      <div className="grid md:grid-cols-3">
        {seccion.items.map((pilar) => {
          const p = pilares[pilar.titulo as keyof typeof pilares] ?? pilares["Para Ti"];
          return (
            <article
              key={pilar.titulo}
              className="relative overflow-hidden min-h-[520px] md:min-h-[640px] p-8 md:p-10 flex flex-col justify-between group"
              style={{ background: p.color, color: "#F6EEDF" }}
            >
              <div className="absolute inset-0 mantel-azul opacity-25" aria-hidden />
              {/* número del pilar */}
              <div className="relative">
                <p
                  className="font-mono font-bold text-xs uppercase tracking-widest mb-2"
                  style={{ color: p.textoAcento }}
                >
                  Pilar · 0{seccion.items.indexOf(pilar) + 1} / 03
                </p>
                <Apilado silabas={p.silabas} tamano="sm" variante="mixto" />
              </div>

              {/* cifra ancla del pilar */}
              <div className="relative">
                <div
                  className="font-display font-black text-6xl md:text-7xl leading-none tabular-nums mb-2"
                  style={{ color: p.textoAcento }}
                >
                  {p.cifra}
                </div>
                <p className="font-sans text-sm text-papel/90 leading-snug max-w-xs mb-8">
                  {p.cifraEtiqueta}
                </p>
                <p className="font-sans text-base md:text-lg text-papel leading-relaxed mb-6">
                  {resolver(pilar.texto)}
                </p>
                {pilar.cta && (
                  <a
                    href={pilar.cta.destino}
                    className="inline-flex items-center gap-2 text-sm font-sans font-bold uppercase tracking-widest group/cta"
                    style={{ color: p.textoAcento }}
                  >
                    {pilar.cta.texto}
                    <span className="transition-transform group-hover/cta:translate-x-1" aria-hidden>
                      →
                    </span>
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* Cuatro cimientos como banda compacta */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 border-t border-papel/10">
        <p className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-cimientos-arena mb-6">
          Cuatro cimientos que sostienen la estrategia
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            "Estándares ambientales y edificios sustentables",
            "Calidad e inocuidad alimentaria",
            "Derechos humanos y estándares laborales",
            "Abastecimiento sustentable de materias primas",
          ].map((c, i) => (
            <div key={c} className="border-t-2 border-cimientos-arena/40 pt-4">
              <span className="font-mono font-bold text-xs text-cimientos-arena/80">
                0{i + 1}
              </span>
              <p className="mt-2 font-sans text-sm md:text-base text-papel/90 leading-snug">
                {c}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
