/**
 * Marca "BIMBO" en caja roja con óvalo blanco al centro, aproximación del logo oficial.
 * El SVG oficial se intercambia cuando Comunicación entregue el vector.
 */
export function LogoBimbo({
  size = 80,
  variante = "sobre-claro",
  className = "",
}: {
  size?: number;
  variante?: "sobre-claro" | "sobre-oscuro" | "mono";
  className?: string;
}) {
  const rojo = variante === "mono" ? "currentColor" : "#EE353A";
  const claro = variante === "sobre-oscuro" ? "#F6EEDF" : "#FFFFFF";
  const letras = variante === "mono" ? "currentColor" : "#EE353A";

  return (
    <svg
      viewBox="0 0 120 48"
      width={size}
      height={(size * 48) / 120}
      className={className}
      aria-label="Grupo Bimbo"
      role="img"
    >
      <rect x="0" y="0" width="120" height="48" rx="4" fill={rojo} />
      <ellipse cx="60" cy="24" rx="48" ry="16" fill={claro} />
      <text
        x="60"
        y="30"
        textAnchor="middle"
        fontFamily="var(--font-outfit), sans-serif"
        fontWeight="900"
        fontSize="20"
        fill={letras}
        letterSpacing="-0.5"
      >
        BIMBO
      </text>
    </svg>
  );
}
