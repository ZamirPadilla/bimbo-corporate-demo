"use client";

import { useEffect, useState } from "react";
import { resolver } from "@/lib/copy";
import { paginaPorSlug } from "@/content/paginas";
import { Apilado } from "@/components/branding/Apilado";
import { OsitoLinea, OsitoSilueta } from "@/components/branding/Osito";
import { Sello } from "@/components/branding/Sello";

const SALUDOS = [
  "¡Buen provecho!",
  "Enjoy!",
  "Bom apetite!",
  "Buon appetito!",
  "Guten Appetit!",
  "Smacznego!",
  "Afiyet olsun!",
  "¡Que lo disfrutes!",
];

export default function Hero() {
  const inicio = paginaPorSlug("inicio")!;
  const hero = inicio.secciones.find((s) => s.id === "hero")!;
  if (hero.tipo !== "hero") throw new Error("Esperaba hero");

  const [saludoIdx, setSaludoIdx] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const id = setInterval(() => setSaludoIdx((i) => (i + 1) % SALUDOS.length), 2400);
    return () => clearInterval(id);
  }, []);

  const propositoBajada = resolver(hero.bajada);

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-azul text-papel">
      {/* Capas de fondo: mantel sutil + patrón osito muy sutil */}
      <div className="absolute inset-0 mantel-azul opacity-60" aria-hidden />
      <div className="absolute inset-0 patron-osito-sobre-azul opacity-30" aria-hidden />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(34, 83, 177, 0.6) 0%, transparent 50%), radial-gradient(ellipse at 80% 90%, rgba(15, 47, 81, 0.8) 0%, transparent 50%)",
        }}
        aria-hidden
      />

      {/* Barra superior: saludo multilenguaje + sello 80 años */}
      <div className="relative z-10 pt-24 md:pt-28 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex items-start justify-between gap-6">
          <div className="flex items-center gap-3 font-sans text-sm text-papel/70">
            <span className="inline-block w-2 h-2 rounded-full bg-rojo animate-pulse" />
            <span
              key={saludoIdx}
              className="font-mono tabular-nums animate-blur-in"
            >
              {SALUDOS[saludoIdx]}
            </span>
          </div>
          <div className="hidden md:block">
            <Sello
              texto="CELEBRAMOS · 80 AÑOS · ALIMENTANDO ·"
              centro="80"
              size={120}
              color="#F6EEDF"
            />
          </div>
        </div>
      </div>

      {/* Grid principal: titular + ositos */}
      <div className="relative z-10 flex-1 flex items-center px-6 md:px-12 py-12">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-[1.3fr_0.9fr] gap-8 lg:gap-16 items-center">
          {/* Columna izquierda: titular apilado + propósito */}
          <div>
            <p className="font-sans text-xs md:text-sm font-semibold uppercase tracking-[0.3em] text-crema/80 mb-6 animate-fade-up">
              {resolver(hero.rotulo ?? "")}
            </p>

            <div className="animate-blur-in">
              <Apilado silabas={["CELE", "BRA", "MOS"]} tamano="normal" variante="mixto" />
              <div className="mt-4 md:mt-6 font-display font-black uppercase text-silaba-sm leading-[0.9]">
                lo que{" "}
                <em className="not-italic text-rojo">nos une</em>
              </div>
            </div>

            <div className="mt-10 max-w-xl space-y-6">
              <p
                className="font-sans text-lg md:text-xl text-papel/90 leading-relaxed animate-fade-up"
                style={{ animationDelay: "0.9s" }}
              >
                <strong className="font-bold">{resolver(hero.titular)}.</strong>{" "}
                {propositoBajada}
              </p>
              <div
                className="flex flex-col sm:flex-row gap-3 animate-fade-up"
                style={{ animationDelay: "1.1s" }}
              >
                {hero.ctas?.map((cta, i) => (
                  <a
                    key={cta.destino}
                    href={cta.destino}
                    className={`group inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-sans font-semibold text-sm transition-colors whitespace-nowrap ${
                      i === 0
                        ? "bg-papel text-azul hover:bg-crema"
                        : "border border-papel/30 text-papel hover:bg-papel/10"
                    }`}
                  >
                    {cta.texto}
                    <span className="transition-transform group-hover:translate-x-1" aria-hidden>
                      →
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Columna derecha: osito 1945 (línea sepia) + osito moderno (silueta) */}
          <div className="relative animate-fade-up" style={{ animationDelay: "0.5s" }}>
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Osito moderno al fondo */}
              <div className="absolute right-4 top-6 w-[70%] opacity-95">
                <OsitoSilueta
                  size={320}
                  fill="#F6EEDF"
                  highlight="#EE353A"
                  className="drop-shadow-2xl w-full h-auto"
                />
              </div>
              {/* Osito línea 1945 al frente */}
              <div className="absolute left-0 bottom-0 w-[60%]">
                <OsitoLinea
                  size={240}
                  color="#954F1E"
                  className="w-full h-auto"
                />
              </div>
              {/* Etiqueta "1945 ↔ hoy" */}
              <div className="absolute top-0 left-0 text-xs font-sans font-bold uppercase tracking-widest text-papel/70">
                1945
              </div>
              <div className="absolute bottom-0 right-0 text-xs font-sans font-bold uppercase tracking-widest text-papel/70 text-right">
                hoy
              </div>
            </div>
            <p className="mt-6 text-center text-xs font-sans text-papel/50 italic">
              Osito Bimbo · ilustración provisional, uso del archivo oficial por confirmar
            </p>
          </div>
        </div>
      </div>

      {/* Pie: franja de pilares + propósito */}
      <div className="relative z-10 border-t border-papel/15">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="font-display font-black uppercase text-sm md:text-base tracking-widest">
            Alimentamos un mundo mejor
          </p>
          <div className="flex items-center gap-3 text-xs font-sans text-papel/60">
            <span>Baja para conocer</span>
            <span className="inline-block w-8 h-px bg-papel/40" />
            <span className="font-mono">↓</span>
          </div>
        </div>
        <div className="h-1.5 franja-pilares" aria-hidden />
      </div>
    </section>
  );
}
