/**
 * Osito de línea estilo clásico 1945 (sepia). Es una ilustración provisional
 * inspirada en la silueta reconocible; el archivo oficial del Osito es de Grupo Bimbo
 * y se intercambia cuando se autoriza su uso.
 */
export function OsitoLinea({
  size = 160,
  className = "",
  color = "#954F1E",
}: {
  size?: number;
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 200 220"
      width={size}
      height={(size * 220) / 200}
      className={className}
      aria-label="Osito Bimbo (ilustración provisional, uso del archivo oficial por confirmar)"
      role="img"
    >
      <g fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* Gorro de panadero */}
        <path d="M 70 36 Q 68 22 80 20 Q 85 10 100 12 Q 115 10 120 20 Q 132 22 130 36 L 130 48 L 70 48 Z" />
        <path d="M 70 48 L 130 48" />
        {/* Orejas */}
        <ellipse cx="68" cy="68" rx="12" ry="14" />
        <ellipse cx="132" cy="68" rx="12" ry="14" />
        <ellipse cx="68" cy="68" rx="6" ry="7" fill={color} opacity="0.35" />
        <ellipse cx="132" cy="68" rx="6" ry="7" fill={color} opacity="0.35" />
        {/* Cabeza */}
        <ellipse cx="100" cy="90" rx="40" ry="38" />
        {/* Ojos */}
        <circle cx="85" cy="86" r="4" fill={color} />
        <circle cx="115" cy="86" r="4" fill={color} />
        {/* Hocico */}
        <ellipse cx="100" cy="104" rx="14" ry="10" />
        <ellipse cx="100" cy="100" rx="3.5" ry="2.5" fill={color} />
        <path d="M 96 108 Q 100 112 104 108" />
        {/* Pañuelo */}
        <path d="M 72 126 L 100 134 L 128 126 L 128 140 L 72 140 Z" />
        <path d="M 100 134 L 100 140" />
        {/* Cuerpo */}
        <path d="M 65 140 Q 55 170 68 198 L 132 198 Q 145 170 135 140 Z" />
        {/* Logo circular */}
        <circle cx="100" cy="170" r="13" />
        <text
          x="100"
          y="174"
          textAnchor="middle"
          fontFamily="var(--font-outfit), sans-serif"
          fontWeight="900"
          fontSize="10"
          fill={color}
        >
          BIMBO
        </text>
      </g>
    </svg>
  );
}

/**
 * Silueta rellena del osito (versión "3D" plana, para contrastar con la de línea).
 */
export function OsitoSilueta({
  size = 160,
  className = "",
  fill = "#15359D",
  highlight = "#FFFFFF",
}: {
  size?: number;
  className?: string;
  fill?: string;
  highlight?: string;
}) {
  return (
    <svg
      viewBox="0 0 200 220"
      width={size}
      height={(size * 220) / 200}
      className={className}
      aria-label="Osito Bimbo moderno (silueta provisional)"
      role="img"
    >
      <g fill={fill}>
        <ellipse cx="68" cy="68" rx="14" ry="16" />
        <ellipse cx="132" cy="68" rx="14" ry="16" />
        <ellipse cx="100" cy="92" rx="44" ry="42" />
        <path d="M 60 138 Q 48 174 65 205 L 135 205 Q 152 174 140 138 Z" />
      </g>
      <g fill={highlight}>
        <circle cx="88" cy="86" r="5" />
        <circle cx="112" cy="86" r="5" />
        <circle cx="90" cy="84" r="1.5" fill={fill} />
        <circle cx="114" cy="84" r="1.5" fill={fill} />
        <ellipse cx="100" cy="106" rx="12" ry="8" />
        <ellipse cx="100" cy="103" rx="3" ry="2" fill={fill} />
      </g>
      {/* Gorro */}
      <path
        d="M 72 40 Q 70 25 82 22 Q 86 12 100 14 Q 114 12 118 22 Q 130 25 128 40 L 128 54 L 72 54 Z"
        fill={highlight}
      />
      <circle cx="100" cy="170" r="14" fill={highlight} />
      <text
        x="100"
        y="175"
        textAnchor="middle"
        fontFamily="var(--font-outfit), sans-serif"
        fontWeight="900"
        fontSize="11"
        fill={fill}
      >
        BIMBO
      </text>
    </svg>
  );
}
