// Fuente única de cifras. Regla: ninguna página escribe una cifra a mano; usa {id}.
// "por-confirmar" = las fuentes públicas no coinciden o no hay fuente; se muestra marcada.

export type EstadoCifra = "confirmada" | "por-confirmar";
export type Fuente = { pagina: string; url: string; dice: string };
export type Cifra = {
  id: string;
  etiqueta: string;
  valor: string;
  unidad?: string;
  estado: EstadoCifra;
  corte?: string;
  nota?: string;
  fuentes: Fuente[];
};

export const cifras = {
  paises: {
    id: "paises",
    etiqueta: "Países donde operamos",
    valor: "12",
    estado: "por-confirmar",
    nota: "Ejemplo: la Home dice 12 y Nosotros dice 11.",
    fuentes: [{ pagina: "Home", url: "https://cliente.com", dice: "presencia en 12 países" }],
  },
} satisfies Record<string, Cifra>;

export type IdCifra = keyof typeof cifras;
export const porConfirmar = Object.values(cifras).filter((c) => c.estado === "por-confirmar");
