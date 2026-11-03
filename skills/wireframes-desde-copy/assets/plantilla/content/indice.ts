// Índice de la demo: documentos, decisiones tomadas, benchmark y dudas vigentes.
// Lo leen /demo y scripts/copy-docs.ts (docs/INDICE.md). Reemplaza los ejemplos.

import { paginas } from "./paginas";

const REPO = "https://github.com/organizacion/repo/blob/main";

export const estado = {
  actualizado: "[fecha]",
  rama: "main",
  pr: "https://github.com/organizacion/repo/pulls",
  etapa: "Copy y wireframes en curso.",
};

export const documentos = [
  { titulo: "Revisión crítica del copy actual", ruta: "docs/copy/01-revision-critica.md", descripcion: "Problemas de fondo y correcciones de redacción." },
  { titulo: "Fuente única de cifras", ruta: "docs/copy/02-fuente-unica-de-cifras.md", descripcion: "Cada cifra con su valor y su fuente (generado)." },
  { titulo: "Arquitectura y voz", ruta: "docs/copy/03-arquitectura-y-voz.md", descripcion: "Audiencias, mapa del sitio y guía de estilo." },
  { titulo: "Copy deck", ruta: "docs/copy/04-copy-deck.md", descripcion: "El copy de cada página (generado)." },
  { titulo: "Decisiones tomadas", ruta: "docs/copy/05-decisiones.md", descripcion: "Decisiones abiertas y cómo se resolvieron (generado)." },
].map((d) => ({ ...d, url: `${REPO}/${d.ruta}` }));

export const fuentes = [{ titulo: "Último informe anual del cliente", url: "https://cliente.com/informe-anual.pdf" }];

// Una decisión por cada pregunta abierta de la revisión. Criterio por defecto: manda el último reporte publicado.
export const decisiones = [
  {
    pregunta: "Países donde operamos: ¿11 o 12?",
    decision: "12.",
    fuente: "Informe anual [año], «Nuestra empresa»",
    efecto: "Corregir la página Nosotros, que dice 11.",
  },
];

export const correccionesDelInforme: string[] = [];

export type FilaBenchmark = { sitio: string; movil: number | null; escritorio: number | null; lcpMovil: number | null; pesoMb: number | null; peticiones: number | null; nota?: string };

export const benchmark: { nota: string; filas: FilaBenchmark[]; metas: string } = {
  nota: "Página de inicio de cada empresa, Lighthouse, mediana de 3 corridas por dispositivo, misma red para todas.",
  filas: [{ sitio: "Cliente · sitio actual", movil: null, escritorio: null, lcpMovil: null, pesoMb: null, peticiones: null }],
  metas: "Objetivo en móvil: rendimiento de 90 o más y contenido principal en menos de 2.5 s.",
};

export const dudas = [{ tema: "Contacto", pregunta: "Teléfono corporativo que se publica.", quien: "Comunicación" }];

// Marcadores que siguen en el copy ([enlace pendiente], [por migrar]…), con su página y sección.
export function marcadoresPendientes() {
  const salida: { pagina: string; seccion: string; marcador: string }[] = [];
  for (const p of paginas) {
    for (const s of p.secciones) {
      for (const m of JSON.stringify(s).matchAll(/\[(?:por |enlace|semblanza|integrantes|canal|año|correo|cita)[^\]"]*\]/g)) {
        salida.push({ pagina: p.nombre, seccion: s.id, marcador: m[0] });
      }
    }
  }
  return salida;
}
