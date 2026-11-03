// Guion de copy. Cada página es una lista de secciones de content/tipos.ts.
// Escribe las cifras como {id} (ver content/cifras.ts). Marcadores: [por confirmar], [enlace pendiente], [por migrar].
import type { Pagina } from "./tipos";

const inicio: Pagina = {
  slug: "inicio",
  nombre: "Inicio",
  ruta: "/",
  meta: { title: "Cliente | Propósito en una frase", description: "Qué hace la empresa, dónde y para quién, en menos de 155 caracteres. Operamos en {paises} países." },
  audiencias: ["todas"],
  secciones: [
    {
      id: "hero",
      tipo: "hero",
      titular: "El propósito de la empresa, en 4 a 9 palabras",
      bajada: "Qué hacemos y la prueba: operamos en {paises} países.",
      ctas: [{ texto: "Verbo y destino", destino: "/wireframes/inicio" }],
      nota: "Qué reemplaza del sitio actual y por qué.",
    },
  ],
};

export const paginas: Pagina[] = [inicio];
export const paginaPorSlug = (slug: string) => paginas.find((p) => p.slug === slug);
