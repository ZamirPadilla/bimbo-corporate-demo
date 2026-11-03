// Reemplaza {idCifra} por su valor. Devuelve segmentos para que la vista marque
// las cifras por confirmar, o texto plano para metadatos y documentos.

import { cifras, type Cifra } from "./cifras";

export type Segmento = { texto: string; cifra?: Cifra };

const PATRON = /\{(\w+)\}/g;

export function segmentar(texto: string): Segmento[] {
  const salida: Segmento[] = [];
  let ultimo = 0;
  for (const m of texto.matchAll(PATRON)) {
    const cifra = (cifras as Record<string, Cifra>)[m[1]];
    if (!cifra) throw new Error(`Cifra desconocida en el copy: {${m[1]}}`);
    if (m.index > ultimo) salida.push({ texto: texto.slice(ultimo, m.index) });
    salida.push({ texto: cifra.valor, cifra });
    ultimo = m.index + m[0].length;
  }
  if (ultimo < texto.length) salida.push({ texto: texto.slice(ultimo) });
  // Mayúscula inicial cuando el texto empieza con una cifra ("más de 100" → "Más de 100").
  if (salida[0]) salida[0] = { ...salida[0], texto: salida[0].texto.charAt(0).toUpperCase() + salida[0].texto.slice(1) };
  return salida;
}

export function plano(texto: string, marcar = false): string {
  return segmentar(texto)
    .map((s) => (marcar && s.cifra?.estado === "por-confirmar" ? `${s.texto} [por confirmar]` : s.texto))
    .join("");
}
