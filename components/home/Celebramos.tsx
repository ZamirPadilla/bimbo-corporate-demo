"use client";

import Link from "next/link";
import { Apilado } from "@/components/branding/Apilado";
import { Sello } from "@/components/branding/Sello";
import { useReveal } from "@/lib/useReveal";

/**
 * Sección "Celebramos 80 años" — herencia + presente.
 * Camión antiguo ilustrado (SVG) + osito 1945 vs 3D ya está en el hero,
 * aquí es la narrativa de los 8 periodos.
 */
const eras = [
  { periodo: "1945", titulo: "Una panadería, un pan envuelto", acento: "paraTi" as const },
  { periodo: "1950", titulo: "Nace Marinela", acento: "rojo" as const },
  { periodo: "1960", titulo: "Primera gran reorganización", acento: "cimientos" as const },
  { periodo: "1980", titulo: "Empresa pública en la BMV", acento: "paraLaVida" as const },
  { periodo: "2000", titulo: "Un nuevo continente", acento: "gobierno" as const },
  { periodo: "hoy", titulo: "Panificadora más grande del mundo", acento: "paraLaNaturaleza" as const },
];

const colores: Record<string, string> = {
  paraTi: "#DF8A35",
  rojo: "#EE353A",
  cimientos: "#BE973C",
  paraLaVida: "#D33D66",
  gobierno: "#6EB3AD",
  paraLaNaturaleza: "#479851",
};

function CamionAntiguo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 160" className={className} aria-label="Camión repartidor de 1945">
      {/* Ruedas */}
      <circle cx="80" cy="135" r="18" fill="#1A1D24" />
      <circle cx="80" cy="135" r="10" fill="#F6EEDF" />
      <circle cx="80" cy="135" r="3" fill="#1A1D24" />
      <circle cx="230" cy="135" r="18" fill="#1A1D24" />
      <circle cx="230" cy="135" r="10" fill="#F6EEDF" />
      <circle cx="230" cy="135" r="3" fill="#1A1D24" />
      {/* Caja */}
      <rect x="40" y="60" width="200" height="70" rx="4" fill="#15359D" />
      <rect x="40" y="60" width="200" height="70" rx="4" fill="none" stroke="#F6EEDF" strokeWidth="1" strokeDasharray="2 4" />
      {/* Cabina */}
      <path d="M 240 60 L 275 60 L 285 90 L 285 130 L 240 130 Z" fill="#EE353A" />
      <rect x="245" y="68" width="30" height="22" rx="2" fill="#8FC9E6" />
      {/* Logo BIMBO blanco en el costado */}
      <text
        x="140"
        y="100"
        textAnchor="middle"
        fontFamily="var(--font-outfit), sans-serif"
        fontWeight="900"
        fontSize="26"
        fill="#F6EEDF"
        letterSpacing="2"
      >
        BIMBO
      </text>
      <text
        x="140"
        y="118"
        textAnchor="middle"
        fontFamily="var(--font-outfit), sans-serif"
        fontWeight="600"
        fontSize="7"
        fill="#F6EEDF"
        letterSpacing="2"
        opacity="0.8"
      >
        PAN FRESCO · DIARIO
      </text>
    </svg>
  );
}

export default function Celebramos() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="celebramos" className="relative py-24 md:py-36 bg-crema overflow-hidden">
      {/* Patrón de ositos tono sobre tono */}
      <div className="absolute inset-0 patron-osito opacity-50" aria-hidden />
      <div className="absolute inset-0 textura-harina" aria-hidden />

      <div ref={ref} className="relative max-w-7xl mx-auto px-6 md:px-12 reveal">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-center">
          <div>
            <div className="flex items-center gap-6 mb-6">
              <span className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-paraTi-hornear">
                80 años · 1945—2025
              </span>
              <span className="h-px flex-1 bg-tinta/15" />
            </div>

            <Apilado silabas={["CELE", "BRA", "MOS"]} tamano="sm" variante="mixto" className="text-tinta" />
            <h2 className="mt-4 font-display font-black uppercase text-silaba-sm leading-[0.9] text-paraTi-hornear">
              80 años de hornear
            </h2>

            <p className="mt-10 font-sans text-lg md:text-xl text-tinta/80 leading-relaxed max-w-xl">
              De una panadería en Santa María Insurgentes a <strong>249 panaderías y plantas</strong> en{" "}
              <strong>39 países</strong>. Lo que empezó con cuatro productos y diez camiones hoy llega a{" "}
              <strong>93 países</strong>.
            </p>

            <Link
              href="/wireframes/nosotros"
              className="mt-10 inline-flex items-center gap-3 text-tinta font-sans font-semibold group"
            >
              <span className="relative">
                Recorre nuestra historia
                <span className="absolute left-0 right-0 bottom-0 h-px bg-tinta transition-transform origin-left group-hover:scale-x-110" />
              </span>
              <span className="transition-transform group-hover:translate-x-1" aria-hidden>
                →
              </span>
            </Link>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] bg-azul rounded-3xl p-8 md:p-12 flex items-center justify-center overflow-hidden mantel-azul shadow-2xl">
              <CamionAntiguo className="w-full max-w-md relative z-10" />
            </div>
            <div className="absolute -top-6 -right-6 md:-top-10 md:-right-10">
              <Sello
                texto="DESDE 1945 · HORNEANDO ·"
                centro="1945"
                size={120}
                color="#1A1D24"
                fondo="#DFC389"
              />
            </div>
            <p className="mt-4 text-center text-xs font-sans text-tinta/50 italic">
              Camión repartidor de 1945 · ilustración
            </p>
          </div>
        </div>

        {/* Línea de tiempo compacta */}
        <div className="mt-20 md:mt-28">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-5 md:gap-4">
            {eras.map((era) => (
              <div key={era.periodo} className="group">
                <div className="h-1 mb-4 transition-all duration-500 group-hover:h-2" style={{ background: colores[era.acento] }} />
                <p className="font-display font-black text-2xl md:text-3xl text-tinta tabular-nums">
                  {era.periodo}
                </p>
                <p className="mt-2 font-sans text-xs md:text-sm text-tinta/70 leading-snug">
                  {era.titulo}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
