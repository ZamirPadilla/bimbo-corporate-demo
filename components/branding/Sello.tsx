/**
 * Sello circular con texto en curva. Para marcas como "80 AÑOS", "Celebramos".
 * Inspirado en el badge "VIEW PRODUCT" del benchmark (Henrietta) y los sellos
 * circulares del informe anual.
 */
export function Sello({
  texto,
  centro,
  size = 160,
  color = "#1A1D24",
  fondo = "transparent",
  className = "",
  animar = true,
}: {
  texto: string;
  centro?: string;
  size?: number;
  color?: string;
  fondo?: string;
  className?: string;
  animar?: boolean;
}) {
  // Repetimos el texto para que llene el círculo
  const textoRepetido = `${texto}  ·  `.repeat(3);

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      aria-label={texto}
    >
      <svg
        viewBox="0 0 200 200"
        width={size}
        height={size}
        className={animar ? "sello-giro" : ""}
      >
        <defs>
          <path id="circulo-sello" d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0" />
        </defs>
        {fondo !== "transparent" && (
          <circle cx="100" cy="100" r="92" fill={fondo} />
        )}
        <text fontSize="14" fontFamily="var(--font-outfit), sans-serif" fontWeight="800" letterSpacing="2" fill={color}>
          <textPath href="#circulo-sello" startOffset="0">
            {textoRepetido}
          </textPath>
        </text>
      </svg>
      {centro && (
        <span className="absolute font-display font-black uppercase text-center text-2xl md:text-3xl leading-none" style={{ color }}>
          {centro}
        </span>
      )}
    </div>
  );
}
