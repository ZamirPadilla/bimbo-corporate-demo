"use client";

import { paginaPorSlug } from "@/content/paginas";
import { cifras, type Cifra } from "@/content/cifras";
import { useReveal } from "@/lib/useReveal";
import { CifraGrande } from "@/components/branding/CifraGrande";
import { Apilado } from "@/components/branding/Apilado";

function partirValor(valor: string): { prefijo: string; numero: number | null; sufijo: string } {
  const limpio = valor.replace(/\s+/g, " ").trim();
  const match = limpio.match(/^(.*?)([\d,]+)(.*)$/);
  if (!match) return { prefijo: "", numero: null, sufijo: limpio };
  const prefijoBruto = match[1].trim();
  const n = parseInt(match[2].replace(/,/g, ""), 10);
  return {
    prefijo: prefijoBruto === "más de" ? "+" : prefijoBruto,
    numero: n,
    sufijo: match[3].trim(),
  };
}

export default function Cifras() {
  const inicio = paginaPorSlug("inicio")!;
  const seccion = inicio.secciones.find((s) => s.id === "cifras")!;
  if (seccion.tipo !== "cifras") throw new Error("Esperaba cifras");

  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="relative py-24 md:py-36 bg-azul-noche text-papel overflow-hidden">
      {/* Mantel azul + textura de granos (como el mapa del informe) */}
      <div className="absolute inset-0 mantel-azul opacity-80" aria-hidden />
      <div className="absolute inset-0 textura-granos text-crema/30" aria-hidden />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(21, 53, 157, 0.5) 0%, transparent 60%)",
        }}
        aria-hidden
      />

      <div ref={ref} className="relative max-w-7xl mx-auto px-6 md:px-12 reveal">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 md:mb-24">
          <div>
            <p className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-cimientos-arena mb-6">
              Grupo Bimbo en cifras · Informe Anual 2025
            </p>
            <Apilado silabas={["ALIMEN", "TAMOS"]} tamano="sm" variante="mixto" />
            <h2 className="mt-4 font-display font-black uppercase text-silaba-sm leading-[0.9] text-cimientos-arena">
              un mundo mejor
            </h2>
          </div>
          <p className="font-sans text-sm text-papel/60 max-w-xs leading-relaxed">
            Cifras al cierre de 2025. Verificar con el cliente antes de publicar en producción.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-14">
          {seccion.ids.map((id) => {
            const c: Cifra = cifras[id];
            const { prefijo, numero, sufijo } = partirValor(c.valor);
            return (
              <CifraGrande
                key={id}
                numero={numero ?? c.valor}
                prefijo={prefijo}
                sufijo={sufijo}
                etiqueta={c.etiqueta}
                nota={c.corte}
                color="#F6EEDF"
                tamano="sm"
              />
            );
          })}
        </div>

        <div className="mt-20 pt-8 border-t border-papel/15 grid md:grid-cols-3 gap-10 md:gap-14 text-papel/90">
          <div>
            <div className="font-display font-black text-4xl md:text-5xl text-cimientos-arena leading-none tabular-nums">
              Ps. 420,168
            </div>
            <p className="mt-3 font-sans font-bold uppercase text-sm tracking-wider">Ventas netas U12M</p>
            <p className="mt-1 font-sans text-xs text-papel/50">millones de pesos · 3T26</p>
          </div>
          <div>
            <div className="font-display font-black text-4xl md:text-5xl text-cimientos-arena leading-none tabular-nums">
              +4.6%
            </div>
            <p className="mt-3 font-sans font-bold uppercase text-sm tracking-wider">Crecimiento vs. 2024</p>
            <p className="mt-1 font-sans text-xs text-papel/50">Informe Anual 2025</p>
          </div>
          <div>
            <div className="font-display font-black text-4xl md:text-5xl text-cimientos-arena leading-none tabular-nums">
              +7.2%
            </div>
            <p className="mt-3 font-sans font-bold uppercase text-sm tracking-wider">UAFIDA ajustada</p>
            <p className="mt-1 font-sans text-xs text-papel/50">59,456 mdp · vs. 2024</p>
          </div>
        </div>
      </div>
    </section>
  );
}
