// Fuente única de cifras corporativas para el copy y los wireframes.
// Regla: ninguna página escribe una cifra a mano; la toma de aquí.
// Criterio (2 nov 2026, corregido el 3 nov): cuando las páginas del sitio no coinciden, manda el último
// reporte publicado. Cifras de escala (países, panaderías, centros, colaboradores): reporte del 3T26
// (22 oct 2026, «Acerca de Grupo Bimbo»). Resultados y metas de 2025: Informe Anual 2025 (sept. 2026).
// estado "confirmada": tiene fuente en un reporte o coincide en todas las fuentes públicas.
// estado "por-confirmar": no tiene fuente pública suficiente; se muestra marcado.

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
const IA25 = "https://d2rwhogv2mrkk6.cloudfront.net/s3fs-public/reportes-2026/IA25_GB_Celebramos_ESP_VF_28%20de%20septiembre%2026.pdf";
const IA = { pagina: "Informe Anual 2025, «Nuestra empresa»", url: IA25 };
const CORTE_IA = "Informe Anual 2025 (cierre de 2025)";
const T326 = "https://d2rwhogv2mrkk6.cloudfront.net/s3fs-public/reportes-2026/Grupo%20Bimbo%20Reporta%20Resultados%20del%203T26_0.pdf";
const RT = { pagina: "Reporte de resultados 3T26, «Acerca de Grupo Bimbo»", url: T326 };
const CORTE_RT = "Reporte 3T26 (22 de octubre de 2026)";

export const cifras = {
  fundacion: {
    id: "fundacion",
    etiqueta: "Año de fundación",
    valor: "1945",
    estado: "confirmada",
    fuentes: [
      { ...IA, dice: "comenzó en 1945 como una pequeña panadería en México" },
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
      { ...IA, dice: "Durante ocho décadas" },
    ],
  },
  paisesOperacion: {
    id: "paisesOperacion",
    etiqueta: "Países donde operamos",
    valor: "39",
    unidad: "países",
    estado: "confirmada",
    corte: CORTE_IA,
    nota: "Marcas dice «más de 39» en un titular; el resto del sitio y el informe dicen 39.",
    fuentes: [
      { ...RT, dice: "opera directamente en 39" },
      { ...IA, dice: "operamos directamente en 39" },
      { pagina: "Nosotros", url: `${GB}/es/nosotros`, dice: "operamos directamente en 39" },
    ],
  },
  paisesPresencia: {
    id: "paisesPresencia",
    etiqueta: "Países a los que llegan nuestros productos",
    valor: "102",
    unidad: "países",
    estado: "confirmada",
    corte: CORTE_RT,
    nota: "Último reporte: 102 (39 directos + 63 con socios). El Informe Anual 2025 dice 93 al cierre de 2025 y Nosotros dice 96; Nosotros debe actualizarse.",
    fuentes: [
      { ...RT, dice: "Tiene presencia en 102 países alrededor del mundo, de los cuales opera directamente en 39 y sirve a otros 63" },
      { ...IA, dice: "Tenemos presencia en 93 países, operamos directamente en 39 y atendemos otros 54" },
      { pagina: "Nosotros", url: `${GB}/es/nosotros`, dice: "presencia en 96 países" },
      { pagina: "Inversionistas › Quiénes somos", url: `${GB}/es/inversionistas/quienes-somos`, dice: "presencia en 102 países" },
    ],
  },
  panaderias: {
    id: "panaderias",
    etiqueta: "Panaderías y botaneras",
    valor: "250",
    estado: "confirmada",
    corte: CORTE_RT,
    nota: "Último reporte: 250 «panaderías y botaneras». El Informe Anual 2025 dice 249 «panaderías y plantas» al cierre de 2025 (75 en Norteamérica, 38 en México, 94 en EAA y 42 en Latinoamérica). El sitio también dice 251 y 214.",
    fuentes: [
      { ...RT, dice: "cuenta con 250 panaderías y botaneras" },
      { ...IA, dice: "contamos con 249 panaderías y plantas" },
      { pagina: "Nosotros", url: `${GB}/es/nosotros`, dice: "251 panaderías y plantas" },
      { pagina: "Inversionistas › Quiénes somos", url: `${GB}/es/inversionistas/quienes-somos`, dice: "250 panaderías y botaneras" },
      { pagina: "Marcas (texto alternativo de la infografía)", url: `${GB}/es/marcas`, dice: "214 panaderías" },
    ],
  },
  colaboradores: {
    id: "colaboradores",
    etiqueta: "Colaboradores",
    valor: "más de 152,000",
    estado: "confirmada",
    corte: CORTE_RT,
    nota: "Último reporte: más de 152,000, igual que la Home y Únete. El Informe Anual 2025 dice más de 153,000 al cierre de 2025 (por región: +26 mil en Norteamérica, +77 mil en México, +18 mil en EAA y +28 mil en Latinoamérica).",
    fuentes: [
      { ...RT, dice: "más de 152,000 colaboradores" },
      { ...IA, dice: "más de 153,000 colaboradores" },
      { pagina: "Únete", url: `${GB}/es/unete-a-nuestro-equipo`, dice: "más de 152 mil personas" },
    ],
  },
  marcas: {
    id: "marcas",
    etiqueta: "Marcas",
    valor: "más de 100",
    unidad: "marcas",
    estado: "confirmada",
    fuentes: [
      { ...IA, dice: "más de 100 marcas" },
      { pagina: "Home", url: `${GB}/es`, dice: "más de 100 marcas" },
    ],
  },
  productos: {
    id: "productos",
    etiqueta: "Productos",
    valor: "más de 9,000",
    unidad: "productos",
    estado: "confirmada",
    corte: CORTE_IA,
    nota: "Inversionistas dice «Más de 10mil productos».",
    fuentes: [
      { ...IA, dice: "más de 9,000 productos" },
      { pagina: "Inversionistas › Quiénes somos", url: `${GB}/es/inversionistas/quienes-somos`, dice: "Más de 10mil productos" },
    ],
  },
  centrosVenta: {
    id: "centrosVenta",
    etiqueta: "Centros de ventas",
    valor: "más de 1,600",
    estado: "confirmada",
    corte: CORTE_RT,
    nota: "Último reporte: más de 1,600, igual que Nosotros e Inversionistas. El Informe Anual 2025 dice más de 1,700 al cierre de 2025.",
    fuentes: [
      { ...RT, dice: "más de 1,600 centros de ventas" },
      { ...IA, dice: "más de 1,700 centros de ventas" },
      { pagina: "Nosotros", url: `${GB}/es/nosotros`, dice: "más de 1,600 centros de ventas" },
    ],
  },
  rutas: {
    id: "rutas",
    etiqueta: "Rutas de distribución",
    valor: "más de 54,000",
    unidad: "rutas",
    estado: "confirmada",
    corte: CORTE_RT,
    fuentes: [
      { ...RT, dice: "más de 54,000 rutas" },
      { ...IA, dice: "más de 54,000 rutas" },
      { pagina: "Inversionistas › Quiénes somos", url: `${GB}/es/inversionistas/quienes-somos`, dice: "más de 54,000 rutas" },
    ],
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
    etiqueta: "Meta de cero emisiones de carbono",
    valor: "2050",
    estado: "confirmada",
    nota: "El informe dice «emisiones cero» y «Cero Emisiones de Carbono», nunca «netas»; el sitio actual sí dice «netas».",
    fuentes: [
      { pagina: "Informe Anual 2025, «Avanzando hacia cero emisiones de carbono»", url: IA25, dice: "Reforzamos nuestro compromiso de alcanzar emisiones cero al 2050" },
      { pagina: "Sustentabilidad", url: `${GB}/es/sustentabilidad`, dice: "alcanzar emisiones netas cero para 2050" },
    ],
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
    estado: "confirmada",
    corte: CORTE_IA,
    fuentes: [
      { ...IA, dice: "Más de 500 mil hectáreas se cultivan con prácticas de agricultura regenerativa" },
      { pagina: "Sustentabilidad (metadatos)", url: `${GB}/es/sustentabilidad`, dice: "+500 mil hectáreas con agricultura regenerativa" },
    ],
  },
  empaques: {
    id: "empaques",
    etiqueta: "Empaques reciclables",
    valor: "99%",
    estado: "confirmada",
    corte: CORTE_IA,
    fuentes: [{ ...IA, dice: "El 99% de nuestros empaques son reciclables" }],
  },
  energia: {
    id: "energia",
    etiqueta: "Electricidad de fuentes renovables",
    valor: "100%",
    estado: "confirmada",
    corte: CORTE_IA,
    nota: "Es electricidad, no toda la energía: el informe lo mide respecto a la línea base de 2020, con esquemas de abastecimiento y atributos renovables. Los metadatos de Sustentabilidad dicen «100% energía renovable»: hay que precisarlo.",
    fuentes: [
      { ...IA, dice: "El 100%* del consumo de energía eléctrica, respecto a la línea base de 2020, proviene de fuentes renovables" },
      { pagina: "Sustentabilidad (metadatos)", url: `${GB}/es/sustentabilidad`, dice: "100% energía renovable" },
    ],
  },
  vehiculosElectricos: {
    id: "vehiculosElectricos",
    etiqueta: "Vehículos eléctricos",
    valor: "más de 4,000",
    estado: "confirmada",
    corte: CORTE_IA,
    fuentes: [{ ...IA, dice: "Más de 4,000 vehículos eléctricos forman parte de nuestras operaciones" }],
  },
  mujeresLiderazgo: {
    id: "mujeresLiderazgo",
    etiqueta: "Mujeres en posiciones de liderazgo",
    valor: "más del 30%",
    estado: "confirmada",
    corte: CORTE_IA,
    fuentes: [{ ...IA, dice: "más del 30% de participación de mujeres en posiciones de liderazgo" }],
  },
  bgr: {
    id: "bgr",
    etiqueta: "Bimbo Global Race 2026",
    valor: "29 ciudades de 23 países",
    estado: "confirmada",
    corte: "Comunicado del 30 de septiembre de 2026",
    nota: "Se toma el comunicado más reciente. Marcas dice 28 ciudades de 22 países (probablemente la edición anterior).",
    fuentes: [
      { pagina: "Prensa", url: `${GB}/es/prensa`, dice: "29 ciudades de 23 países" },
      { pagina: "Marcas", url: `${GB}/es/marcas`, dice: "22 países y 28 ciudades" },
    ],
  },
  mexicoColaboradores: {
    id: "mexicoColaboradores",
    etiqueta: "Colaboradores en México",
    valor: "más de 77,000",
    estado: "confirmada",
    corte: CORTE_IA,
    nota: "Las preguntas frecuentes dicen «más de 78,000».",
    fuentes: [
      { pagina: "Informe Anual 2025, presencia por región", url: IA25, dice: "COLABORADORES +77k (México)" },
      { pagina: "Preguntas frecuentes", url: `${GB}/es/faq/generales`, dice: "más de 78,000 personas en México" },
    ],
  },
  mexicoPlantas: {
    id: "mexicoPlantas",
    etiqueta: "Panaderías y plantas en México",
    valor: "38",
    estado: "confirmada",
    corte: CORTE_IA,
    fuentes: [
      { pagina: "Informe Anual 2025, presencia por región", url: IA25, dice: "PANADERÍAS Y PLANTAS 38 (México)" },
      { pagina: "Preguntas frecuentes", url: `${GB}/es/faq/generales`, dice: "38 plantas de producción en México" },
    ],
  },
} satisfies Record<string, Cifra>;

export type IdCifra = keyof typeof cifras;

export const porConfirmar: Cifra[] = Object.values(cifras).filter((c: Cifra) => c.estado === "por-confirmar");
