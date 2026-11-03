import type { ReactNode } from "react";

/**
 * Palabra partida en sílabas apiladas. Recurso tipográfico del Informe 2025
 * (BMB-00334 · "CELE / BRA / MOS", "VI / DA", "NA / TU / RA / LE / ZA").
 * Las sílabas se pasan ya partidas por el autor; no se intenta separar en runtime.
 */
export function Apilado({
  silabas,
  tamano = "normal",
  variante = "solido",
  className = "",
  as: Tag = "span",
}: {
  silabas: string[];
  tamano?: "sm" | "normal" | "lg";
  variante?: "solido" | "contorno" | "mixto";
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "p" | "div";
}) {
  const tamClass = {
    sm: "text-silaba-sm",
    normal: "text-silaba",
    lg: "text-silaba-lg",
  }[tamano];

  return (
    <Tag className={`font-display font-black uppercase block ${tamClass} ${className}`}>
      {silabas.map((s, i) => (
        <span
          key={i}
          className={`block ${
            variante === "contorno"
              ? "contorno-grueso"
              : variante === "mixto" && i % 2 === 1
                ? "contorno-grueso"
                : ""
          }`}
        >
          {s}
        </span>
      ))}
    </Tag>
  );
}

/**
 * Variante inline: las sílabas en una sola línea pero con interlínea cerrada.
 */
export function ApiladoInline({ silabas, className = "" }: { silabas: string[]; className?: string }) {
  return (
    <span className={`font-display font-black uppercase inline-flex items-baseline gap-1 ${className}`}>
      {silabas.map((s, i) => (
        <span key={i} className={i === 0 ? "" : "ml-[-0.08em]"}>
          {s}
          {i < silabas.length - 1 && <span className="opacity-30">/</span>}
        </span>
      ))}
    </span>
  );
}

export function SolidoContorno({
  solido,
  contorno,
  separador,
  className = "",
}: {
  solido: ReactNode;
  contorno: ReactNode;
  separador?: ReactNode;
  className?: string;
}) {
  return (
    <span className={className}>
      <span className="font-display font-black">{solido}</span>
      {separador}
      <span className="font-display font-black contorno-grueso">{contorno}</span>
    </span>
  );
}
