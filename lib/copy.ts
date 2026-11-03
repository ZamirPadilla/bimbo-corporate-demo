// Helper para resolver {idCifra} dentro del copy, leyendo content/cifras.ts.
// Igual que lo que hacen los wireframes, pero expuesto como función pura.

import { cifras, type IdCifra } from "@/content/cifras";

const TOKEN = /\{([a-zA-Z]+)\}/g;

export function resolver(texto: string): string {
  return texto.replace(TOKEN, (_, id: string) => {
    const cifra = (cifras as Record<string, { valor: string }>)[id];
    return cifra ? cifra.valor : `{${id}}`;
  });
}

export function cifraPorId(id: IdCifra) {
  return cifras[id];
}
