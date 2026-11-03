// Tipos del guion de copy. Cada página es una lista de secciones; cada sección
// trae su copy y una nota para el wireframe (qué hace, de dónde salen los datos).
// En cualquier texto, {idCifra} se reemplaza por el valor de content/cifras.ts.

import type { IdCifra } from "./cifras";

export type Cta = { texto: string; destino: string };

type Base = { id: string; nota?: string };

export type Seccion = Base &
  (
    | { tipo: "hero"; rotulo?: string; titular: string; bajada: string; ctas?: Cta[]; medio?: string }
    | { tipo: "texto"; rotulo?: string; titulo: string; parrafos: string[]; cta?: Cta }
    | { tipo: "cifras"; titulo?: string; ids: IdCifra[] }
    | { tipo: "tarjetas"; rotulo?: string; titulo: string; intro?: string; items: { titulo: string; texto: string; cta?: Cta }[]; columnas?: 2 | 3 | 4 }
    | { tipo: "lista"; titulo: string; intro?: string; items: string[] }
    | { tipo: "etapas"; titulo: string; intro?: string; items: { titulo: string; texto: string }[] }
    | { tipo: "eras"; titulo: string; items: { periodo: string; titulo: string; texto: string }[] }
    | { tipo: "directorio"; titulo: string; intro: string; filtros: string[]; muestra: string[] }
    | { tipo: "regiones"; titulo: string; intro: string; regiones: { nombre: string; paises: string[] }[] }
    | { tipo: "noticias"; titulo: string; cantidad: number; cta: Cta }
    | { tipo: "distribuidor"; titulo: string; intro?: string; rutas: { audiencia: string; texto: string; cta: Cta }[] }
    | { tipo: "descargas"; titulo: string; items: { titulo: string; detalle: string }[] }
    | { tipo: "preguntas"; titulo: string; items: { pregunta: string; respuesta: string }[] }
    | { tipo: "aviso"; titulo: string; texto: string }
    | { tipo: "cta"; titular: string; texto: string; ctas: Cta[] }
  );

export type Pagina = {
  slug: string;
  nombre: string;
  ruta: string;
  meta: { title: string; description: string };
  audiencias: string[];
  secciones: Seccion[];
};
