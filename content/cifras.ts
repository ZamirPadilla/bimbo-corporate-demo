// Fuente única de cifras corporativas para el copy y los wireframes.
// Regla: ninguna página escribe una cifra a mano; la toma de aquí.
// estado "confirmada": el valor coincide en todas las fuentes públicas revisadas.
// estado "por-confirmar": las fuentes no coinciden o el dato no tiene fuente pública; se muestra marcado.

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

const GB = "https://www.grupobimbo.com";

export const cifras = {
  fundacion: {
    id: "fundacion",
    etiqueta: "Año de fundación",
    valor: "1945",
    estado: "confirmada",
    fuentes: [
      { pagina: "Home (metadatos y JSON-LD)", url: `${GB}/es`, dice: "fundada en 1945" },
      { pagina: "Preguntas frecuentes", url: `${GB}/es/faq/generales`, dice: "nació en México en 1945" },
    ],
  },
  anios: {
    id: "anios",
    etiqueta: "Años de historia",
    valor: "más de 80",
    unidad: "años",
    estado: "confirmada",
    nota: "81 años en 2026. Cimientos dice «Siete décadas»: desactualizado.",
    fuentes: [
      { pagina: "Nosotros", url: `${GB}/es/nosotros`, dice: "más de 80 años" },
      { pagina: "Preguntas frecuentes", url: `${GB}/es/faq/generales`, dice: "A lo largo de más de 80 años" },
    ],
  },
  paisesOperacion: {
    id: "paisesOperacion",
    etiqueta: "Países donde operamos",
    valor: "39",
    unidad: "países",
    estado: "confirmada",
    nota: "Marcas dice «más de 39» en un titular; el resto del sitio dice 39.",
    fuentes: [
      { pagina: "Nosotros", url: `${GB}/es/nosotros`, dice: "operamos directamente en 39" },
      { pagina: "Inversionistas › Quiénes somos", url: `${GB}/es/inversionistas/quienes-somos`, dice: "opera directamente en 39" },
      { pagina: "Marcas (listado)", url: `${GB}/es/marcas`, dice: "39 países enlazados" },
    ],
  },
  paisesPresencia: {
    id: "paisesPresencia",
    etiqueta: "Países a los que llegan nuestros productos",
    valor: "102",
    unidad: "países",
    estado: "por-confirmar",
    nota: "Nosotros dice 96 (39 + 57 con socios); Inversionistas dice 102 (39 + 63). Proponemos 102 por ser la más reciente.",
    fuentes: [
      { pagina: "Nosotros", url: `${GB}/es/nosotros`, dice: "presencia en 96 países" },
      { pagina: "Inversionistas › Quiénes somos", url: `${GB}/es/inversionistas/quienes-somos`, dice: "presencia en 102 países" },
    ],
  },
  panaderias: {
    id: "panaderias",
    etiqueta: "Panaderías y plantas",
    valor: "más de 250",
    estado: "por-confirmar",
    nota: "Cuatro valores distintos. «Más de 250» es seguro con los dos más recientes; falta definir si incluye plantas de botanas.",
    fuentes: [
      { pagina: "Nosotros", url: `${GB}/es/nosotros`, dice: "251 panaderías y plantas" },
      { pagina: "Inversionistas › Quiénes somos", url: `${GB}/es/inversionistas/quienes-somos`, dice: "250 panaderías y botaneras" },
      { pagina: "Prensa y Únete (metadatos)", url: `${GB}/es/prensa`, dice: "249 panaderías" },
      { pagina: "Marcas (texto alternativo de la infografía)", url: `${GB}/es/marcas`, dice: "214 panaderías" },
    ],
  },
  colaboradores: {
    id: "colaboradores",
    etiqueta: "Colaboradores",
    valor: "más de 152,000",
    estado: "por-confirmar",
    corte: "2026",
    nota: "Home y Únete dicen 152 mil; Prensa y la búsqueda dicen 153 mil.",
    fuentes: [
      { pagina: "Únete", url: `${GB}/es/unete-a-nuestro-equipo`, dice: "Este 2026, ya somos una comunidad de más de 152 mil personas" },
      { pagina: "Home (metadatos)", url: `${GB}/es`, dice: "más de 152,000 colaboradores" },
      { pagina: "Prensa (metadatos)", url: `${GB}/es/prensa`, dice: "+153 mil colaboradores" },
    ],
  },
  marcas: {
    id: "marcas",
    etiqueta: "Marcas",
    valor: "más de 100",
    unidad: "marcas",
    estado: "confirmada",
    fuentes: [
      { pagina: "Home", url: `${GB}/es`, dice: "más de 100 marcas" },
      { pagina: "Marcas", url: `${GB}/es/marcas`, dice: "+ 100 marcas" },
    ],
  },
  productos: {
    id: "productos",
    etiqueta: "Productos",
    valor: "más de 10,000",
    unidad: "productos",
    estado: "confirmada",
    fuentes: [{ pagina: "Inversionistas › Quiénes somos", url: `${GB}/es/inversionistas/quienes-somos`, dice: "Más de 10mil productos" }],
  },
  centrosVenta: {
    id: "centrosVenta",
    etiqueta: "Centros de ventas",
    valor: "más de 1,600",
    estado: "confirmada",
    fuentes: [
      { pagina: "Nosotros", url: `${GB}/es/nosotros`, dice: "más de 1,600 centros de ventas" },
      { pagina: "Inversionistas › Quiénes somos", url: `${GB}/es/inversionistas/quienes-somos`, dice: "más de 1,600 centros de ventas" },
    ],
  },
  rutas: {
    id: "rutas",
    etiqueta: "Rutas de distribución",
    valor: "más de 54,000",
    unidad: "rutas",
    estado: "confirmada",
    fuentes: [{ pagina: "Inversionistas › Quiénes somos", url: `${GB}/es/inversionistas/quienes-somos`, dice: "más de 54,000 rutas" }],
  },
  ventas: {
    id: "ventas",
    etiqueta: "Ventas netas últimos 12 meses",
    valor: "Ps. 420,168 millones",
    estado: "confirmada",
    corte: "3T26, últimos 12 meses",
    fuentes: [{ pagina: "Inversionistas › Quiénes somos", url: `${GB}/es/inversionistas/quienes-somos`, dice: "Ventas Netas U12M 3T26 de Ps. $420,168 millones" }],
  },
  emisionesMeta: {
    id: "emisionesMeta",
    etiqueta: "Meta de cero emisiones netas",
    valor: "2050",
    estado: "confirmada",
    fuentes: [{ pagina: "Sustentabilidad", url: `${GB}/es/sustentabilidad`, dice: "alcanzar emisiones netas cero para 2050" }],
  },
  agriculturaMeta: {
    id: "agriculturaMeta",
    etiqueta: "Meta de agricultura regenerativa",
    valor: "100% de ingredientes clave en 2050",
    estado: "confirmada",
    fuentes: [{ pagina: "Prensa", url: `${GB}/es/prensa`, dice: "que el 100% de sus ingredientes clave provenga de tierras cultivadas bajo prácticas regenerativas" }],
  },
  hectareas: {
    id: "hectareas",
    etiqueta: "Hectáreas con agricultura regenerativa",
    valor: "más de 500 mil",
    estado: "por-confirmar",
    nota: "Solo aparece en la meta description de Sustentabilidad, sin fecha ni fuente en el cuerpo.",
    fuentes: [{ pagina: "Sustentabilidad (metadatos)", url: `${GB}/es/sustentabilidad`, dice: "+500 mil hectáreas con agricultura regenerativa" }],
  },
  empaques: {
    id: "empaques",
    etiqueta: "Empaques reciclables",
    valor: "99%",
    estado: "por-confirmar",
    nota: "Solo en metadatos. Falta definir si es «reciclable por diseño» o «reciclado».",
    fuentes: [{ pagina: "Sustentabilidad (metadatos)", url: `${GB}/es/sustentabilidad`, dice: "99% empaques reciclables" }],
  },
  energia: {
    id: "energia",
    etiqueta: "Energía renovable",
    valor: "100%",
    estado: "por-confirmar",
    nota: "Metadatos dicen «100% energía renovable»; Historia dice «migración a energías limpias en todas nuestras operaciones». Falta precisar si es electricidad.",
    fuentes: [
      { pagina: "Sustentabilidad (metadatos)", url: `${GB}/es/sustentabilidad`, dice: "100% energía renovable" },
      { pagina: "Historia", url: `${GB}/es/nosotros/historia`, dice: "concretamos la migración a energías limpias en todas nuestras operaciones" },
    ],
  },
  bgr: {
    id: "bgr",
    etiqueta: "Bimbo Global Race 2026",
    valor: "29 ciudades de 23 países",
    estado: "por-confirmar",
    nota: "Marcas dice 28 ciudades de 22 países.",
    fuentes: [
      { pagina: "Prensa", url: `${GB}/es/prensa`, dice: "29 ciudades de 23 países" },
      { pagina: "Marcas", url: `${GB}/es/marcas`, dice: "22 países y 28 ciudades" },
    ],
  },
  mexicoColaboradores: {
    id: "mexicoColaboradores",
    etiqueta: "Colaboradores en México",
    valor: "más de 78,000",
    estado: "confirmada",
    fuentes: [{ pagina: "Preguntas frecuentes", url: `${GB}/es/faq/generales`, dice: "más de 78,000 personas en México" }],
  },
  mexicoPlantas: {
    id: "mexicoPlantas",
    etiqueta: "Plantas en México",
    valor: "38",
    estado: "confirmada",
    fuentes: [{ pagina: "Preguntas frecuentes", url: `${GB}/es/faq/generales`, dice: "38 plantas de producción en México" }],
  },
} satisfies Record<string, Cifra>;

export type IdCifra = keyof typeof cifras;

export const porConfirmar = Object.values(cifras).filter((c) => c.estado === "por-confirmar");
