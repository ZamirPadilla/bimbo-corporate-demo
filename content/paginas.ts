// Guion de copy de la propuesta (ES). Fuente para los wireframes y para docs/copy/04-copy-deck.md.
// {idCifra} se resuelve con content/cifras.ts. Marcadores: [por confirmar], [enlace pendiente], [por migrar].

import type { Pagina } from "./tipos";

const home: Pagina = {
  slug: "inicio",
  nombre: "Inicio",
  ruta: "/",
  meta: {
    title: "Grupo Bimbo | Alimentamos un mundo mejor",
    description: "La panificadora más grande del mundo: {marcas} marcas, {paisesOperacion} países de operación y una estrategia pública de sustentabilidad.",
  },
  audiencias: ["todas"],
  secciones: [
    {
      id: "hero",
      tipo: "hero",
      rotulo: "Grupo Bimbo · desde {fundacion}",
      titular: "Alimentamos un mundo mejor",
      bajada: "Somos la panificadora más grande del mundo. Horneamos pan, pan dulce, galletas, tortillas y botanas en {paisesOperacion} países, y nuestros productos llegan a {paisesPresencia} países.",
      ctas: [
        { texto: "Explora nuestras marcas", destino: "/wireframes/marcas" },
        { texto: "Conoce nuestra estrategia", destino: "/wireframes/sustentabilidad" },
      ],
      medio: "Video a sangre: del horno a la mesa, sin audio. Póster inmediato; versión vertical para teléfono. Sin carrusel automático.",
      nota: "Reemplaza el carrusel actual (alt vacío, controles en dos idiomas, sin pausa visible). El H1 es el propósito, no «Últimas noticias».",
    },
    {
      id: "accesos",
      tipo: "distribuidor",
      titulo: "¿Qué estás buscando?",
      rutas: [
        { audiencia: "Inversionistas", texto: "Resultados trimestrales, reportes anuales y gobierno corporativo.", cta: { texto: "Ver el último reporte", destino: "/wireframes/inversionistas" } },
        { audiencia: "Carreras", texto: "Vacantes en los {paisesOperacion} países donde operamos.", cta: { texto: "Buscar vacantes", destino: "/wireframes/carreras" } },
        { audiencia: "Marcas", texto: "Encuentra una marca por país o categoría.", cta: { texto: "Abrir el directorio", destino: "/wireframes/marcas" } },
        { audiencia: "Prensa", texto: "Comunicados, noticias y kit de medios.", cta: { texto: "Ir a la sala de prensa", destino: "/wireframes/prensa" } },
        { audiencia: "Proveedores", texto: "Registro, portal y políticas para proveedores.", cta: { texto: "Ir al portal", destino: "https://proveedores.grupobimbo.com/" } },
        { audiencia: "Contacto", texto: "Dudas sobre un producto, denuncias éticas y más.", cta: { texto: "Elegir un canal", destino: "/wireframes/contacto" } },
      ],
      nota: "Fila de accesos en el primer pantallazo bajo el hero. En teléfono, lista de 6 renglones.",
    },
    {
      id: "cifras",
      tipo: "cifras",
      titulo: "Bimbo en cifras",
      ids: ["paisesOperacion", "panaderias", "marcas", "colaboradores"],
      nota: "Contadores al entrar en pantalla. Cada cifra muestra su fecha de corte; todas salen de content/cifras.ts.",
    },
    {
      id: "mision",
      tipo: "texto",
      rotulo: "Nuestra misión",
      titulo: "Alimentos deliciosos y nutritivos en las manos de todos",
      parrafos: [
        "Esa es nuestra misión desde que seis socios abrieron una panadería en la colonia Santa María Insurgentes, en {fundacion}. Hoy la cumplimos con {productos} productos y una filosofía que no ha cambiado: ser una empresa sustentable, altamente productiva y plenamente humana.",
      ],
      cta: { texto: "Conoce quiénes somos", destino: "/wireframes/nosotros" },
      nota: "Texto grande que se revela por palabras con el scroll.",
    },
    {
      id: "ciclo",
      tipo: "etapas",
      titulo: "Del campo a tu mesa",
      intro: "Cinco etapas, una sola operación.",
      items: [
        { titulo: "Campo", texto: "Trabajamos con agricultores en agricultura regenerativa. Meta: {agriculturaMeta}." },
        { titulo: "Panaderías", texto: "Horneamos cada día en {panaderias} panaderías y plantas." },
        { titulo: "Distribución", texto: "Llevamos el pan fresco con {rutas} rutas y {centrosVenta} centros de ventas." },
        { titulo: "Tiendas", texto: "Desde la tienda de la esquina hasta el supermercado, en {paisesPresencia} países." },
        { titulo: "Tu mesa", texto: "Llegamos con {marcas} marcas para cada momento del día." },
      ],
      nota: "Sección «ciclo completo»: avanza sola cada 3.4 s, se pausa con el cursor y con un botón visible (WCAG 2.2.2).",
    },
    {
      id: "marcas",
      tipo: "tarjetas",
      rotulo: "Nuestras marcas",
      titulo: "{marcas} marcas, una para cada momento del día",
      items: [
        { titulo: "Bimbo", texto: "Pan de caja y bollería" },
        { titulo: "Marinela", texto: "Pastelitos y galletas" },
        { titulo: "Barcel · Takis", texto: "Botanas saladas" },
        { titulo: "Thomas'", texto: "English muffins y bagels" },
        { titulo: "Entenmann's", texto: "Pan dulce y repostería" },
        { titulo: "Oroweat", texto: "Pan de granos enteros" },
        { titulo: "Sara Lee", texto: "Pan de caja" },
        { titulo: "Donuts", texto: "Bollería" },
      ],
      columnas: 4,
      nota: "Logos reales con texto alternativo. Cada tarjeta enlaza al sitio de la marca (enlace verificado en el catálogo). Categorías por confirmar con el catálogo.",
    },
    {
      id: "sustentabilidad",
      tipo: "tarjetas",
      rotulo: "Sustentabilidad",
      titulo: "Una estrategia con metas públicas",
      intro: "En 2021 lanzamos «Alimentamos un mundo mejor», con tres pilares y una base común.",
      items: [
        { titulo: "Para Ti", texto: "Mejores perfiles nutrimentales, etiquetas claras y más ingredientes de origen vegetal.", cta: { texto: "Ver Para Ti", destino: "/wireframes/sustentabilidad" } },
        { titulo: "Para la Vida", texto: "Comunidades más fuertes y un trabajo seguro, incluyente y bien pagado.", cta: { texto: "Ver Para la Vida", destino: "/wireframes/sustentabilidad" } },
        { titulo: "Para la Naturaleza", texto: "Cero emisiones netas en {emisionesMeta}, cero desperdicios y agricultura regenerativa.", cta: { texto: "Ver Para la Naturaleza", destino: "/wireframes/sustentabilidad" } },
      ],
      columnas: 3,
      nota: "Los tres pilares con su nombre oficial. Reemplaza la imagen con texto incrustado y las tres anclas que hoy van al mismo lugar.",
    },
    {
      id: "presencia",
      tipo: "texto",
      rotulo: "Presencia",
      titulo: "Operamos en {paisesOperacion} países de cuatro continentes",
      parrafos: ["Y con socios estratégicos, nuestros productos llegan a {paisesPresencia} países."],
      cta: { texto: "Ver países y marcas", destino: "/wireframes/marcas" },
      nota: "Mapa de relieve en nube de puntos (skill mapa-relieve) con los 39 países; clic en un país abre sus marcas.",
    },
    {
      id: "noticias",
      tipo: "noticias",
      titulo: "Lo más reciente",
      cantidad: 3,
      cta: { texto: "Ver todos los comunicados", destino: "/wireframes/prensa" },
      nota: "Tres notas del CMS con fecha, categoría e imagen con texto alternativo.",
    },
    {
      id: "reconocimientos",
      tipo: "lista",
      titulo: "Reconocimientos 2026",
      items: [
        "Forbes · World's Best Employers 2026",
        "Ethisphere · World's Most Ethical Companies, por décima vez",
        "Merco · Empresa con mejor reputación de México",
        "TIME · Una de las mejores empresas del mundo [año por confirmar]",
      ],
      nota: "Un solo componente de sellos con año; sustituye el sello Forbes 2024 del pie.",
    },
    {
      id: "cta",
      tipo: "cta",
      titular: "¿Quieres hablar con nosotros?",
      texto: "Cuéntanos quién eres y te llevamos al canal correcto.",
      ctas: [{ texto: "Ir a Contacto", destino: "/wireframes/contacto" }],
    },
  ],
};

const nosotros: Pagina = {
  slug: "nosotros",
  nombre: "Nosotros",
  ruta: "/nosotros",
  meta: {
    title: "Quiénes somos | Grupo Bimbo",
    description: "Nuestra filosofía, misión, propósito y creencias; la historia desde {fundacion}, los fundadores y el equipo que dirige Grupo Bimbo.",
  },
  audiencias: ["todas", "inversionistas", "candidatos", "prensa"],
  secciones: [
    {
      id: "hero",
      tipo: "hero",
      rotulo: "Nosotros",
      titular: "Una panadería de {fundacion} que hoy hornea en {paisesOperacion} países",
      bajada: "Somos {colaboradores} personas con una misma forma de trabajar. Esto es lo que creemos.",
      medio: "Foto de archivo de la primera panadería junto a una planta actual.",
    },
    {
      id: "identidad",
      tipo: "tarjetas",
      titulo: "Lo que nos guía",
      items: [
        { titulo: "Filosofía", texto: "Ser una empresa sustentable, altamente productiva y plenamente humana." },
        { titulo: "Misión", texto: "Tener alimentos deliciosos y nutritivos en las manos de todos." },
        { titulo: "Propósito", texto: "Alimentar un mundo mejor." },
      ],
      columnas: 3,
      nota: "Texto oficial tomado del sitio actual, donde hoy solo existe dentro del texto alternativo de una imagen.",
    },
    {
      id: "creencias",
      tipo: "tarjetas",
      titulo: "Nuestras creencias",
      intro: "Siete ideas que orientan cada decisión.",
      items: [
        { titulo: "Valoramos a la persona", texto: "La persona está al centro de lo que hacemos." },
        { titulo: "Somos una comunidad", texto: "Crecemos junto con quienes nos rodean." },
        { titulo: "Conseguimos resultados", texto: "Cumplimos lo que prometemos." },
        { titulo: "Competimos y ganamos", texto: "Buscamos ser la mejor opción para cada cliente." },
        { titulo: "Somos operadores eficientes", texto: "Cuidamos cada recurso." },
        { titulo: "Actuamos con integridad", texto: "Hacemos lo correcto aunque nadie esté viendo." },
        { titulo: "Trascendemos y permanecemos", texto: "Construimos para las siguientes generaciones." },
      ],
      columnas: 4,
      nota: "Los siete títulos son oficiales. Las frases de apoyo son propuesta y deben validarse con el área de Cultura.",
    },
    {
      id: "cifras",
      tipo: "cifras",
      titulo: "Hoy",
      ids: ["paisesOperacion", "paisesPresencia", "panaderias", "centrosVenta", "rutas", "productos"],
    },
    {
      id: "categorias",
      tipo: "lista",
      titulo: "Qué horneamos",
      items: ["Pan de caja", "Bollería", "Pan dulce", "Pastelitos", "Galletas", "Pan tostado", "English muffins", "Bagels", "Tortillas y flatbread", "Botanas saladas"],
    },
    {
      id: "historia",
      tipo: "eras",
      titulo: "{anios} años en ocho eras",
      items: [
        { periodo: "1945–1950", titulo: "Una panadería y un pan envuelto en celofán", texto: "Seis socios fundan Bimbo en Santa María Insurgentes y lanzan un pan de caja envuelto, novedad en la Ciudad de México." },
        { periodo: "1950–1960", titulo: "Nace Marinela", texto: "Llegan las donas, los Bimbollos, las Medias Noches y los primeros pastelitos." },
        { periodo: "1960–1970", titulo: "La primera gran reorganización", texto: "Lorenzo Servitje asume la Dirección General y la empresa se profesionaliza." },
        { periodo: "1970–1980", titulo: "La planta más grande de América Latina", texto: "Construimos la panificadora más grande de la región y una de las diez más grandes del mundo." },
        { periodo: "1980–1990", titulo: "Empresa pública", texto: "El 15% de las acciones empieza a cotizar en la Bolsa Mexicana de Valores." },
        { periodo: "1990–2000", titulo: "Rumbo a Latinoamérica", texto: "La Organización Latinoamérica lleva nuestras panaderías más allá de México." },
        { periodo: "2000–2010", titulo: "Un nuevo continente", texto: "Llegamos a Asia, a la costa oeste de Estados Unidos y sumamos El Globo y Chocolates La Corona." },
        { periodo: "2010–hoy", titulo: "La panificadora más grande del mundo", texto: "Sumamos operaciones en Norteamérica, Europa, África y Asia, lanzamos la estrategia de sustentabilidad y la meta de cero emisiones netas." },
      ],
      nota: "Línea por eras con fotos de archivo. Cada era abre las historias que hoy existen como notas sueltas.",
    },
    {
      id: "fundadores",
      tipo: "tarjetas",
      titulo: "Fundadores",
      items: [
        { titulo: "Lorenzo Servitje", texto: "[semblanza por migrar]" },
        { titulo: "Roberto Servitje", texto: "[semblanza por migrar]" },
        { titulo: "Jaime Sendra", texto: "[semblanza por migrar]" },
        { titulo: "Alfonso Velasco", texto: "[semblanza por migrar]" },
        { titulo: "José T. Mata", texto: "[semblanza por migrar]" },
        { titulo: "Jaime Jorba", texto: "[semblanza por migrar]" },
      ],
      columnas: 3,
    },
    {
      id: "liderazgo",
      tipo: "tarjetas",
      titulo: "Liderazgo",
      items: [
        { titulo: "Alejandro Rodríguez Bas", texto: "Director General desde noviembre de 2025. Antes dirigió Barcel Global." },
        { titulo: "Comité Directivo", texto: "[integrantes por migrar desde Inversionistas › Gobierno corporativo]" },
      ],
      columnas: 2,
      nota: "Semblanzas profesionales, sin datos personales.",
    },
    {
      id: "cta",
      tipo: "cta",
      titular: "Trabaja con nosotros",
      texto: "Buscamos personas que quieran alimentar un mundo mejor.",
      ctas: [{ texto: "Ver vacantes", destino: "/wireframes/carreras" }],
    },
  ],
};

const marcas: Pagina = {
  slug: "marcas",
  nombre: "Marcas",
  ruta: "/marcas",
  meta: {
    title: "Nuestras marcas | Grupo Bimbo",
    description: "{marcas} marcas en {paisesOperacion} países: Bimbo, Marinela, Barcel, Takis, Thomas', Oroweat y más. Busca por país o categoría.",
  },
  audiencias: ["consumidores", "prensa", "clientes"],
  secciones: [
    {
      id: "hero",
      tipo: "hero",
      rotulo: "Marcas",
      titular: "{marcas} marcas, una para cada momento del día",
      bajada: "Busca por país, región o categoría y llega directo al sitio de cada marca.",
    },
    {
      id: "directorio",
      tipo: "directorio",
      titulo: "Directorio de marcas",
      intro: "Escribe el nombre de una marca o usa los filtros.",
      filtros: ["Región", "País", "Categoría"],
      muestra: ["Bimbo", "Marinela", "Barcel", "Takis", "Tía Rosa", "Wonder", "Oroweat", "Thomas'", "Entenmann's", "Sara Lee", "Arnold", "Dempster's", "Pullman", "Plus Vita", "Ideal", "Donuts", "Bollycao", "New York Bakery Co."],
      nota: "Alimentado por un catálogo único de marcas (nombre, logo, categorías, países, URL verificada). Hoy 10 de 21 marcas de México no enlazan a su sitio.",
    },
    {
      id: "regiones",
      tipo: "regiones",
      titulo: "Dónde operamos",
      intro: "{paisesOperacion} países agrupados como en nuestro informe anual [agrupación por confirmar].",
      regiones: [
        { nombre: "Norteamérica", paises: ["Canadá", "Estados Unidos"] },
        { nombre: "México", paises: ["México"] },
        { nombre: "Latinoamérica", paises: ["Argentina", "Brasil", "Chile", "Colombia", "Costa Rica", "Ecuador", "El Salvador", "Guatemala", "Honduras", "Nicaragua", "Panamá", "Paraguay", "Perú", "Uruguay", "Venezuela"] },
        { nombre: "Europa, Asia y África", paises: ["China", "Corea del Sur", "Croacia", "Eslovenia", "España", "Francia", "India", "Italia", "Kazajistán", "Marruecos", "Montenegro", "Portugal", "Reino Unido", "Rumanía", "Rusia", "Serbia", "Sudáfrica", "Suiza", "Túnez", "Turquía", "Ucrania"] },
      ],
      nota: "Corrige la agrupación actual, que pone a Colombia, Ecuador y Venezuela en «Centroamérica». Suma 39 países.",
    },
    {
      id: "cta",
      tipo: "cta",
      titular: "¿Vendes o distribuyes nuestros productos?",
      texto: "Escríbenos y te ponemos en contacto con el equipo comercial de tu país.",
      ctas: [{ texto: "Ir a Contacto", destino: "/wireframes/contacto" }],
    },
  ],
};

const sustentabilidad: Pagina = {
  slug: "sustentabilidad",
  nombre: "Sustentabilidad",
  ruta: "/sustentabilidad",
  meta: {
    title: "Sustentabilidad | Grupo Bimbo",
    description: "Nuestra estrategia «Alimentamos un mundo mejor»: metas públicas para Para Ti, Para la Vida y Para la Naturaleza, y cómo vamos.",
  },
  audiencias: ["comunidad", "inversionistas", "prensa"],
  secciones: [
    {
      id: "hero",
      tipo: "hero",
      rotulo: "Sustentabilidad",
      titular: "Alimentamos un mundo mejor: para ti, para la vida y para la naturaleza",
      bajada: "En 2021 fijamos metas públicas. Aquí está lo que nos propusimos y cuánto hemos avanzado.",
    },
    {
      id: "origen",
      tipo: "texto",
      titulo: "Viene de nuestra filosofía",
      parrafos: ["Desde el inicio quisimos ser una empresa sustentable, altamente productiva y plenamente humana. La estrategia de 2021 convierte esa idea en metas medibles, organizadas en tres pilares y cuatro cimientos."],
    },
    {
      id: "pilares",
      tipo: "tarjetas",
      titulo: "Tres pilares",
      items: [
        { titulo: "Para Ti", texto: "Mejores perfiles nutrimentales para todos · Marcas sustentables y transparentes · Dietas más saludables a base de plantas.", cta: { texto: "Ver Para Ti", destino: "#para-ti" } },
        { titulo: "Para la Vida", texto: "Fortalecer nuestras comunidades · Cuidar a nuestra gente.", cta: { texto: "Ver Para la Vida", destino: "#para-la-vida" } },
        { titulo: "Para la Naturaleza", texto: "Hacia cero desperdicios · Cero emisiones netas · Agricultura regenerativa.", cta: { texto: "Ver Para la Naturaleza", destino: "#para-la-naturaleza" } },
      ],
      columnas: 3,
      nota: "Reemplaza «8 principios básicos»: son 3 pilares con 8 temas, más 4 cimientos. La página de Nutrición se integra en Para Ti.",
    },
    {
      id: "metas",
      tipo: "cifras",
      titulo: "Metas y avance",
      ids: ["emisionesMeta", "agriculturaMeta", "hectareas", "empaques", "energia"],
      nota: "Cada meta muestra año objetivo, avance y fecha de corte. Las cifras de hectáreas, empaques y energía hoy solo aparecen en metadatos: confirmar fuente.",
    },
    {
      id: "cimientos",
      tipo: "lista",
      titulo: "Cuatro cimientos",
      intro: "Lo que sostiene a los tres pilares.",
      items: ["Estándares ambientales y edificios sustentables", "Calidad e inocuidad alimentaria", "Derechos humanos y estándares laborales", "Abastecimiento sustentable de materias primas"],
    },
    {
      id: "descargas",
      tipo: "descargas",
      titulo: "Reportes y descargas",
      items: [
        { titulo: "Informe anual integrado", detalle: "[enlace pendiente] · PDF" },
        { titulo: "Análisis de doble materialidad 2025", detalle: "PDF" },
        { titulo: "Planes de acción de agricultura y aceite de palma", detalle: "2023–2025 · PDF" },
        { titulo: "Contribución a los ODS", detalle: "PDF" },
      ],
      nota: "Concentra el Centro de Descargas. Cada archivo muestra año y peso.",
    },
  ],
};

const inversionistas: Pagina = {
  slug: "inversionistas",
  nombre: "Inversionistas",
  ruta: "/inversionistas",
  meta: {
    title: "Inversionistas | Grupo Bimbo",
    description: "Resultados trimestrales, informes anuales, eventos y gobierno corporativo de Grupo Bimbo (BMV: BIMBO).",
  },
  audiencias: ["inversionistas", "analistas"],
  secciones: [
    {
      id: "hero",
      tipo: "hero",
      rotulo: "Inversionistas",
      titular: "Resultados, reportes y gobierno corporativo",
      bajada: "Grupo Bimbo cotiza en la Bolsa Mexicana de Valores con la clave BIMBO.",
      ctas: [{ texto: "Descarga el reporte 3T26", destino: "#reporte" }],
    },
    {
      id: "cifras",
      tipo: "cifras",
      titulo: "La compañía en cifras",
      ids: ["ventas", "paisesOperacion", "rutas", "productos"],
    },
    {
      id: "tesis",
      tipo: "tarjetas",
      titulo: "Por qué invertir en Bimbo",
      items: [
        { titulo: "Distribución", texto: "Red de distribución directa y plantas que garantizan calidad y frescura." },
        { titulo: "Diversificación", texto: "Productos, canales y geografías balanceados entre mercados desarrollados y emergentes." },
        { titulo: "Innovación", texto: "Categorías, precios y presentaciones para cada ocasión de consumo." },
        { titulo: "Eficiencia", texto: "Capacidad de producción y modelos de bajo costo." },
        { titulo: "Equipo directivo", texto: "Experiencia probada y compromiso con los colaboradores." },
        { titulo: "Rentabilidad", texto: "Generación consistente de efectivo para crecer de forma orgánica y con adquisiciones." },
        { titulo: "Sustentabilidad", texto: "Metas públicas y una cultura corporativa distintiva." },
      ],
      columnas: 4,
      nota: "Mismo contenido que «Valor Bimbo», en texto y no en imágenes descargables.",
    },
    {
      id: "accesos",
      tipo: "distribuidor",
      titulo: "Información financiera",
      rutas: [
        { audiencia: "Reportes trimestrales", texto: "Del más reciente al más antiguo.", cta: { texto: "Ver reportes", destino: "#" } },
        { audiencia: "Informes anuales", texto: "Informe anual integrado de cada ejercicio.", cta: { texto: "Ver informes", destino: "#" } },
        { audiencia: "Reportes BMV", texto: "Información entregada a la Bolsa Mexicana de Valores.", cta: { texto: "Ver reportes BMV", destino: "#" } },
        { audiencia: "Eventos y presentaciones", texto: "Conferencias de resultados y presentaciones.", cta: { texto: "Ver eventos", destino: "#" } },
        { audiencia: "Gobierno corporativo", texto: "Consejo, comités, asambleas y código.", cta: { texto: "Ver gobierno corporativo", destino: "#" } },
        { audiencia: "Financiamiento sustentable", texto: "Marco y reportes de bonos sustentables.", cta: { texto: "Ver el marco", destino: "#" } },
      ],
      nota: "CbCR solo existe en inglés: se enlaza con la etiqueta «(en inglés)».",
    },
    {
      id: "contacto",
      tipo: "texto",
      titulo: "Relación con Inversionistas",
      parrafos: ["[correo y teléfono por migrar desde Inversionistas › Contacto]"],
    },
  ],
};

const prensa: Pagina = {
  slug: "prensa",
  nombre: "Prensa",
  ruta: "/prensa",
  meta: {
    title: "Sala de prensa | Grupo Bimbo",
    description: "Comunicados oficiales, noticias, kit de medios y contacto de prensa de Grupo Bimbo.",
  },
  audiencias: ["prensa"],
  secciones: [
    {
      id: "hero",
      tipo: "hero",
      rotulo: "Prensa",
      titular: "Noticias y comunicados de Grupo Bimbo",
      bajada: "Comunicados oficiales, notas y material para medios.",
    },
    {
      id: "listado",
      tipo: "noticias",
      titulo: "Comunicados y noticias",
      cantidad: 6,
      cta: { texto: "Cargar más", destino: "#" },
      nota: "Filtro por seis categorías (Negocio y resultados, Marcas e innovación, Sustentabilidad, Comunidad, Nuestra gente, Reconocimientos) en lugar de las 17 actuales, que incluyen duplicados. La categoría de cada nota va pegada a su título.",
    },
    {
      id: "kit",
      tipo: "descargas",
      titulo: "Kit de medios",
      items: [
        { titulo: "Logotipos", detalle: "SVG y PNG" },
        { titulo: "Fotografías", detalle: "Plantas, productos y directivos" },
        { titulo: "Ficha de la compañía", detalle: "Cifras de content/cifras.ts con fecha de corte" },
      ],
    },
    {
      id: "contacto",
      tipo: "texto",
      titulo: "Contacto de prensa",
      parrafos: ["[correo de prensa por confirmar]"],
    },
  ],
};

const carreras: Pagina = {
  slug: "carreras",
  nombre: "Carreras",
  ruta: "/carreras",
  meta: {
    title: "Trabaja en Grupo Bimbo | Carreras",
    description: "Vacantes en los {paisesOperacion} países donde operamos. Conoce cómo es trabajar en la panificadora más grande del mundo.",
  },
  audiencias: ["candidatos"],
  secciones: [
    {
      id: "hero",
      tipo: "hero",
      rotulo: "Carreras",
      titular: "Haz carrera en la panificadora más grande del mundo",
      bajada: "Somos {colaboradores} personas en {paisesOperacion} países. Valoramos a la persona y la ponemos al centro de lo que hacemos.",
      ctas: [{ texto: "Buscar vacantes en mi país", destino: "#vacantes" }],
    },
    {
      id: "vacantes",
      tipo: "distribuidor",
      titulo: "Vacantes por país",
      intro: "Cada región publica sus vacantes en su propia bolsa de trabajo.",
      rutas: [
        { audiencia: "México", texto: "Plantas, ventas, distribución y corporativo.", cta: { texto: "Ver vacantes en México", destino: "[enlace pendiente]" } },
        { audiencia: "Latinoamérica", texto: "Colombia, Costa Rica, Ecuador, Guatemala, Panamá y más.", cta: { texto: "Ver vacantes", destino: "https://careers.grupobimbo.com/careers-home" } },
        { audiencia: "Brasil", texto: "Vagas em todo o Brasil.", cta: { texto: "Ver vagas", destino: "https://trabalheconosco.vagas.com.br/grupo-bimbo" } },
        { audiencia: "Estados Unidos", texto: "Bimbo Bakeries USA, Barcel USA y Bimbo QSR.", cta: { texto: "Ver vacantes", destino: "[enlace pendiente]" } },
        { audiencia: "Europa", texto: "España y otros países de la región.", cta: { texto: "Ver vacantes", destino: "[enlace pendiente]" } },
      ],
      nota: "Reemplaza la lista actual, que mete a Colombia, Ecuador y Venezuela en «Latinoamérica Centro».",
    },
    {
      id: "proceso",
      tipo: "etapas",
      titulo: "Cómo es el proceso",
      items: [
        { titulo: "Encuentra tu vacante", texto: "Busca por país y área." },
        { titulo: "Postúlate", texto: "Comparte tu experiencia en línea." },
        { titulo: "Entrevistas", texto: "Conoce al equipo y al puesto." },
        { titulo: "Bienvenida", texto: "Tu primer día en Bimbo." },
      ],
      nota: "Etapas genéricas: validar con «Nuestros procesos de selección» del sitio actual.",
    },
    {
      id: "fraude",
      tipo: "aviso",
      titulo: "Cuidado con los fraudes",
      texto: "Grupo Bimbo no solicita ningún tipo de pago durante el proceso de selección. Si alguien te lo pide en nuestro nombre, repórtalo.",
      nota: "Texto tomado del pie del sitio actual; aquí es donde el candidato lo necesita.",
    },
  ],
};

const contacto: Pagina = {
  slug: "contacto",
  nombre: "Contacto",
  ruta: "/contacto",
  meta: {
    title: "Contacto | Grupo Bimbo",
    description: "Escríbenos según tu caso: consumidores, clientes, proveedores, inversionistas, prensa, candidatos o línea ética Comenta.",
  },
  audiencias: ["todas"],
  secciones: [
    {
      id: "hero",
      tipo: "hero",
      rotulo: "Contacto",
      titular: "¿Con quién quieres hablar?",
      bajada: "Elige tu caso y te llevamos al canal correcto.",
    },
    {
      id: "canales",
      tipo: "distribuidor",
      titulo: "Canales",
      rutas: [
        { audiencia: "Consumidores", texto: "Una duda o una queja sobre un producto.", cta: { texto: "atencionenlinea@grupobimbo.com", destino: "mailto:atencionenlinea@grupobimbo.com" } },
        { audiencia: "Clientes y distribuidores", texto: "Compras, pedidos y nuevas cuentas.", cta: { texto: "[canal por confirmar]", destino: "#" } },
        { audiencia: "Proveedores", texto: "Registro, pagos y portal.", cta: { texto: "Portal de proveedores", destino: "https://proveedores.grupobimbo.com/" } },
        { audiencia: "Inversionistas", texto: "Relación con Inversionistas.", cta: { texto: "Ir a Inversionistas", destino: "/wireframes/inversionistas" } },
        { audiencia: "Prensa", texto: "Solicitudes de medios.", cta: { texto: "Ir a Prensa", destino: "/wireframes/prensa" } },
        { audiencia: "Candidatos", texto: "Vacantes y procesos de selección.", cta: { texto: "Ir a Carreras", destino: "/wireframes/carreras" } },
        { audiencia: "Visitas", texto: "Visitas virtuales y escolares a nuestras panaderías.", cta: { texto: "Agendar una visita", destino: "https://visitas.bimboconnect.com" } },
      ],
    },
    {
      id: "comenta",
      tipo: "texto",
      rotulo: "Línea ética",
      titulo: "Comenta: reporta una posible falta al Código de Ética",
      parrafos: [
        "Para colaboradores y proveedores. Los reportes son confidenciales: no revelamos la identidad de quien reporta ni de las personas involucradas.",
        "Comenta no atiende quejas de producto, servicio o pagos; para eso, escribe a atención a consumidores.",
      ],
      cta: { texto: "Reportar en Comenta", destino: "#" },
      nota: "Hoy Comenta es un botón naranja destacado en el pie, sin explicación.",
    },
    {
      id: "fraude",
      tipo: "aviso",
      titulo: "Aviso sobre fraudes",
      texto: "No solicitamos pagos para procesos de selección ni vendemos automóviles por internet fuera de la casa de subastas MORTON. Verifica siempre en nuestros canales oficiales.",
      nota: "Contenido del modal actual de fraudes y del pie. Aquí se lee sin abrir nada.",
    },
    {
      id: "oficinas",
      tipo: "texto",
      titulo: "Oficinas corporativas",
      parrafos: ["Ciudad de México · [dirección por confirmar: hoy hay dos versiones publicadas] · Tel. +52 (55) 1638 9027"],
    },
  ],
};

export const paginas: Pagina[] = [home, nosotros, marcas, sustentabilidad, inversionistas, prensa, carreras, contacto];

export const paginaPorSlug = (slug: string) => paginas.find((p) => p.slug === slug);
