"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Cifra gigante estilo informe 2025: número en display Black + línea en Bold debajo.
 * (BMB-00334 · "95%", "+100", "249").
 */
export function CifraGrande({
  numero,
  prefijo = "",
  sufijo = "",
  etiqueta,
  nota,
  color = "currentColor",
  animar = true,
  tamano = "normal",
  className = "",
}: {
  numero: number | string;
  prefijo?: string;
  sufijo?: string;
  etiqueta: string;
  nota?: string;
  color?: string;
  animar?: boolean;
  tamano?: "sm" | "normal";
  className?: string;
}) {
  const [valor, setValor] = useState<number | string>(animar && typeof numero === "number" ? 0 : numero);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animar || typeof numero !== "number") return;
    const el = ref.current;
    if (!el) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setValor(numero);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          obs.unobserve(e.target);
          const inicio = performance.now();
          const d = 1800;
          const tick = (ahora: number) => {
            const t = Math.min((ahora - inicio) / d, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setValor(Math.floor(eased * numero));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [animar, numero]);

  const tam = tamano === "sm" ? "text-cifra-sm" : "text-cifra";

  return (
    <div ref={ref} className={className}>
      <div
        className={`font-display font-black leading-none ${tam} tabular-nums`}
        style={{ color }}
      >
        {prefijo && (
          <span className="text-[0.4em] align-top mr-1 opacity-80">{prefijo}</span>
        )}
        {typeof valor === "number" ? valor.toLocaleString("es-MX") : valor}
        {sufijo && <span className="text-[0.4em] align-top ml-1">{sufijo}</span>}
      </div>
      <p className="mt-3 font-sans font-bold uppercase tracking-wider text-sm">
        {etiqueta}
      </p>
      {nota && (
        <p className="mt-1 font-sans text-xs opacity-60">{nota}</p>
      )}
    </div>
  );
}
