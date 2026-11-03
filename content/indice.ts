// Índice de la demo: documentos, decisiones tomadas, benchmark y dudas vigentes.
// Lo leen /demo y scripts/copy-docs.ts (docs/INDICE.md).

import { paginas } from "./paginas";

const REPO = "https://github.com/ZamirPadilla/bimbo-corporate-demo/blob/propuesta/copy-y-wireframes";
const IA25 = "https://d2rwhogv2mrkk6.cloudfront.net/s3fs-public/reportes-2026/IA25_GB_Celebramos_ESP_VF_28%20de%20septiembre%2026.pdf";

export const estado = {
  actualizado: "2 de noviembre de 2026",
  rama: "propuesta/copy-y-wireframes",
  pr: "https://github.com/ZamirPadilla/bimbo-corporate-demo/pull/2",
  etapa: "Copy y wireframes listos; sigue el diseño visual.",
};

export const documentos = [
  { titulo: "Cómo se trabajó el copy", ruta: "docs/copy/README.md", descripcion: "Método, documentos y cómo editar el copy." },
  { titulo: "Revisión crítica del copy actual", ruta: "docs/copy/01-revision-critica.md", descripcion: "Ocho problemas de fondo, 15 correcciones de redacción." },
  { titulo: "Fuente única de cifras", ruta: "docs/copy/02-fuente-unica-de-cifras.md", descripcion: "Cada cifra con su valor, su fuente y dónde aparece hoy (generado)." },
  { titulo: "Arquitectura y voz", ruta: "docs/copy/03-arquitectura-y-voz.md", descripcion: "Audiencias, mapa del sitio y guía de estilo." },
  { titulo: "Copy deck", ruta: "docs/copy/04-copy-deck.md", descripcion: "El copy de las 8 páginas, sección por sección (generado)." },
  { titulo: "Decisiones tomadas", ruta: "docs/copy/05-decisiones.md", descripcion: "Las seis decisiones abiertas, resueltas con el Informe Anual 2025." },
  { titulo: "Contexto creativo", ruta: "docs/contexto/CONTEXTO.md", descripcion: "Diagnóstico, intención, concepto y lenguaje visual del equipo creativo." },
  { titulo: "Benchmark de referencias", ruta: "docs/benchmark/README.md", descripcion: "Qué tomar de cada sitio de referencia y a qué sección aplica." },
  { titulo: "Banco de ideas", ruta: "docs/ideas/README.md", descripcion: "Ideas de interacción por aprobar; la primera: el pan del hero se vuelve el gorro del osito." },
].map((d) => ({ ...d, url: `${REPO}/${d.ruta}` }));

export const fuentes = [
  { titulo: "Informe Anual 2025 «Celebramos» (publicado en sept. 2026)", url: IA25 },
  { titulo: "Reporte de resultados del 3T26", url: "https://d2rwhogv2mrkk6.cloudfront.net/s3fs-public/reportes-2026/Grupo%20Bimbo%20Reporta%20Resultados%20del%203T26_0.pdf" },
  { titulo: "Sitio público grupobimbo.com (44 páginas leídas el 2 nov 2026)", url: "https://www.grupobimbo.com/es" },
];

export const decisiones = [
  {
    pregunta: "Países con presencia: ¿96 o 102?",
    decision: "93: operamos en 39 y atendemos otros 54 con socios estratégicos.",
    fuente: "Informe Anual 2025, «Nuestra empresa»",
    efecto: "Ninguna de las dos cifras del sitio era la vigente. Hay que corregir Nosotros (96) e Inversionistas › Quiénes somos (102).",
  },
  {
    pregunta: "Panaderías: ¿250 o 251?",
    decision: "249 panaderías y plantas: 75 en Norteamérica, 38 en México, 94 en EAA y 42 en Latinoamérica.",
    fuente: "Informe Anual 2025, «Nuestra empresa» y presencia por región",
    efecto: "La cifra de los metadatos de Prensa y Únete era la correcta; 251, 250 y 214 se corrigen.",
  },
  {
    pregunta: "Colaboradores: ¿cuántos y con qué fecha de corte?",
    decision: "Más de 153,000, al cierre de 2025.",
    fuente: "Informe Anual 2025",
    efecto: "La Home y Únete (152 mil) se actualizan. En México, más de 77,000 (las preguntas frecuentes dicen 78,000).",
  },
  {
    pregunta: "¿Qué dirección corporativa se publica?",
    decision: "Prolongación Paseo de la Reforma 1000, col. Peña Blanca Santa Fe, alcaldía Álvaro Obregón, C.P. 01210, Ciudad de México.",
    fuente: "Informe Anual 2025, «Oficinas corporativas»",
    efecto: "Las preguntas frecuentes (Alfonso Nápoles Gándara 1117) se corrigen. El teléfono queda pendiente.",
  },
  {
    pregunta: "¿Las regiones siguen las del informe anual?",
    decision: "Sí: Norteamérica (Estados Unidos y Canadá), México, Latinoamérica (Centro y Sudamérica) y EAA (Europa, Asia y África).",
    fuente: "Informe Anual 2025 y reporte 3T26 (notas de segmentos)",
    efecto: "Marcas y Carreras dejan de poner a Colombia, Ecuador y Venezuela en «Centroamérica».",
  },
  {
    pregunta: "Nutrición: ¿página propia o dentro de Para Ti?",
    decision: "Dentro de Sustentabilidad › Para Ti; /nutricion redirige ahí.",
    fuente: "Informe Anual 2025: los perfiles nutrimentales se reportan dentro del pilar Para Ti",
    efecto: "Un tema, una casa. Los tres pilares de Nutrición se reparten en los tres temas de Para Ti.",
  },
];

// Otras correcciones que trajo el informe, además de las seis decisiones.
export const correccionesDelInforme = [
  "Centros de ventas: más de 1,700 (el sitio dice 1,600).",
  "Productos: más de 9,000 (Inversionistas dice «más de 10mil»).",
  "Creencias: «Somos operadores eficaces», «Competimos y ganamos con calidad superior» y «Trascendemos y permanecemos en el tiempo» (el sitio dice «eficientes» y acorta las otras dos).",
  "Misión y propósito: «Alimentos deliciosos y nutritivos en las manos de todos» y «Alimentamos un mundo mejor».",
  "Energía: el 100% renovable es de la electricidad, no de toda la energía.",
  "Las acciones también cotizan en Estados Unidos con ADR Nivel 1 (BMBOY).",
];

export const benchmark = {
  nota: "Página de inicio de cada empresa, medida desde México el 2 de noviembre de 2026 con Lighthouse 13.6; mediana de 3 corridas por dispositivo, misma red para todas. Sirve como línea base para la propuesta.",
  filas: [
    { sitio: "Grupo Bimbo · sitio actual", movil: 68, escritorio: 87, lcpMovil: 11.9, pesoMb: 8.4, peticiones: 112 },
    { sitio: "Mondelez International", movil: 61, escritorio: 83, lcpMovil: 12.6, pesoMb: 2.3, peticiones: 49 },
    { sitio: "Gruma", movil: 67, escritorio: 78, lcpMovil: 16.6, pesoMb: 8.5, peticiones: 95 },
    { sitio: "Nestlé", movil: null, escritorio: null, lcpMovil: null, pesoMb: null, peticiones: null, nota: "No comparable: respondió con una verificación anti-bots." },
  ],
  metas: "Objetivo de la propuesta en móvil: rendimiento de 90 o más y contenido principal en menos de 2.5 s.",
};

// Lo que todavía no se puede cerrar con fuentes públicas.
export const dudas = [
  { tema: "Sitio actual", pregunta: "¿Bimbo corregirá en su sitio las cifras que contradicen el informe (96 y 102 países, 1,600 centros, 10 mil productos, 152 mil colaboradores) antes del lanzamiento?", quien: "Comunicación" },
  { tema: "Contacto", pregunta: "Teléfono corporativo que se publica.", quien: "Comunicación" },
  { tema: "Contacto", pregunta: "Canal para clientes y distribuidores.", quien: "Comercial" },
  { tema: "Prensa", pregunta: "Correo y responsable de prensa.", quien: "Comunicación" },
  { tema: "Inversionistas", pregunta: "Correo y teléfono de Relación con Inversionistas (migrar de la página actual).", quien: "Relación con Inversionistas" },
  { tema: "Carreras", pregunta: "Bolsas de trabajo de México, Estados Unidos y Europa.", quien: "Talento" },
  { tema: "Nosotros", pregunta: "Semblanzas de los fundadores e integrantes del Comité Directivo.", quien: "Comunicación" },
  { tema: "Nosotros", pregunta: "Frases de apoyo de las siete creencias (propuesta nuestra).", quien: "Cultura" },
  { tema: "Reconocimientos", pregunta: "Año del reconocimiento de TIME.", quien: "Comunicación" },
  { tema: "Marcas", pregunta: "Catálogo de marcas con categorías, países y sitio oficial de cada una.", quien: "Marketing" },
  { tema: "Marcas", pregunta: "¿Ricolino sigue en el portafolio? La demo original la incluía y el sitio actual no la muestra.", quien: "Marketing" },
  { tema: "Inversionistas", pregunta: "¿Habrá versión en español del CbCR?", quien: "Relación con Inversionistas" },
  { tema: "Idiomas", pregunta: "Copy en inglés: se redactará a partir del español una vez aprobado.", quien: "Equipo de la propuesta" },
  { tema: "Media", pregunta: "Logotipos en vector, fotos y video con derechos de uso para el diseño.", quien: "Comunicación" },
];

// Marcadores que siguen en el copy ([enlace pendiente], [por migrar]…), con su página y sección.
export function marcadoresPendientes() {
  const salida: { pagina: string; seccion: string; marcador: string }[] = [];
  for (const p of paginas) {
    for (const s of p.secciones) {
      const texto = JSON.stringify(s);
      for (const m of texto.matchAll(/\[(?:por |enlace|semblanza|integrantes|canal|año|correo|cita)[^\]"]*\]/g)) {
        salida.push({ pagina: p.nombre, seccion: s.id, marcador: m[0] });
      }
    }
  }
  return salida;
}
