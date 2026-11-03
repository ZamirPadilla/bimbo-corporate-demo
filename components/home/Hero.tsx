"use client";

import { useEffect, useState } from "react";
import { resolver } from "@/lib/copy";
import { paginaPorSlug } from "@/content/paginas";

const SALUDOS = [
  "¡Buen provecho!",
  "Enjoy!",
  "Bom apetito!",
  "Buon appetito!",
  "¡Buen día!",
  "Smacznego!",
  "Afiyet olsun!",
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

  const titular = resolver(hero.titular);
  const bajada = resolver(hero.bajada);
  const [palabra1, ...resto] = titular.split(" ");
  const palabras = resto.join(" ");

  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden gradiente-horneado textura-harina pt-28 pb-10 md:pb-16">
      {/* Rotador de saludos arriba */}
      <div className="absolute top-24 md:top-28 left-6 md:left-12 flex items-center gap-3 text-sm font-sans text-tinta/50">
        <span className="inline-block w-2 h-2 rounded-full bg-accion-rojoBimbo animate-pulse" />
        <span className="font-mono tabular-nums">
          <span key={saludoIdx} className="inline-block animate-blur-in">
            {SALUDOS[saludoIdx]}
          </span>
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full">
        {/* Rótulo pequeño */}
        <p className="font-sans text-xs md:text-sm font-semibold uppercase tracking-[0.3em] text-accion-rojoBimbo mb-6 md:mb-10 animate-fade-up">
          {resolver(hero.rotulo ?? "")}
        </p>

        {/* Titular monumental */}
        <h1 className="font-display font-black uppercase text-tinta text-hero animate-blur-in">
          <span className="block">{palabra1}</span>
          <span className="block">
            {palabras.split(" ").map((w, i) => (
              <span
                key={i}
                className="inline-block mr-[0.25em] opacity-0 animate-fade-up"
                style={{ animationDelay: `${0.3 + i * 0.08}s` }}
              >
                {w === "mejor" ? (
                  <em className="not-italic text-accion-rojoBimbo">{w}</em>
                ) : (
                  w
                )}
              </span>
            ))}
          </span>
        </h1>

        <div className="mt-10 grid md:grid-cols-[1.3fr_1fr] gap-8 md:gap-16 items-end">
          <p
            className="font-serif text-xl md:text-2xl text-tinta/80 max-w-2xl leading-relaxed animate-fade-up"
            style={{ animationDelay: "0.9s" }}
          >
            {bajada}
          </p>
          <div
            className="flex flex-col sm:flex-row gap-3 md:justify-end animate-fade-up"
            style={{ animationDelay: "1.1s" }}
          >
            {hero.ctas?.map((cta) => (
              <a
                key={cta.destino}
                href={cta.destino}
                className="group inline-flex items-center gap-2 rounded-full bg-tinta text-harina px-6 py-3.5 font-sans font-semibold text-sm hover:bg-azul-700 transition-colors whitespace-nowrap"
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

      {/* Silueta de pan al pie (idea del banco de ideas #01: pan → osito) */}
      <div className="relative mt-16 md:mt-24 h-20 md:h-28 w-full">
        <svg
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
        >
          <path
            d="M0,160 L0,80 C240,40 360,20 480,20 C600,20 660,50 720,70 C780,90 840,50 960,30 C1080,10 1200,30 1320,60 C1380,75 1420,85 1440,90 L1440,160 Z"
            fill="#003DA5"
          />
        </svg>
        {/* Línea de puntos decorativa como ajonjolí */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 opacity-30">
          {Array.from({ length: 7 }).map((_, i) => (
            <span key={i} className="inline-block w-1 h-1 rounded-full bg-harina" />
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-4 right-6 flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-harina/60">
        Baja
        <span className="inline-block w-6 h-px bg-harina/40" />
      </div>
    </section>
  );
}
