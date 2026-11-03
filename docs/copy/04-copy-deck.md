# Copy deck (ES)

> Generado por `npm run copy:docs` desde `content/`. No editar a mano: editar `content/paginas.ts` o `content/cifras.ts`.

Wireframes navegables: `npm run dev` y abrir `/wireframes`.

## Inicio · `/`

- **title** (40 car.): Grupo Bimbo | Alimentamos un mundo mejor
- **description** (135 car.): La empresa de panificación más grande del mundo: más de 100 marcas, operación directa en 39 países y metas públicas de sustentabilidad.
- **Audiencias:** todas

### hero · hero

**Rótulo:** Grupo Bimbo · desde 1945  
**Titular:** Alimentamos un mundo mejor  
**Bajada:** Somos la empresa de panificación más grande del mundo y un jugador relevante en botanas. Hacemos pan, pan dulce, pastelitos, galletas, tortillas y botanas en 39 países, y nuestros productos llegan a 102.  
**Botones:** Explora nuestras marcas · Conoce nuestra estrategia  
**Visual:** Video a sangre: del horno a la mesa, sin audio. Póster inmediato; versión vertical para teléfono. Sin carrusel automático.  

> Nota de diseño: Reemplaza el carrusel actual (alt vacío, controles en dos idiomas, sin pausa visible). El H1 es el propósito, no «Últimas noticias». La bajada sigue la frase oficial del reporte 3T26 («empresa de panificación líder y más grande del mundo y un jugador relevante en snacks»); «hornear» no aplica a las botanas.

### accesos · distribuidor

**Título:** ¿Qué estás buscando?

| Para | Texto | Botón |
|---|---|---|
| Inversionistas | Resultados trimestrales, reportes anuales y gobierno corporativo. | Ver el último reporte |
| Carreras | Vacantes en los 39 países donde operamos. | Buscar vacantes |
| Marcas | Encuentra una marca por país o categoría. | Abrir el directorio |
| Prensa | Comunicados, noticias y kit de medios. | Ir a la sala de prensa |
| Proveedores | Registro, portal y políticas para proveedores. | Ir al portal |
| Contacto | Dudas sobre un producto, denuncias éticas y más. | Elegir un canal |

> Nota de diseño: Fila de accesos en el primer pantallazo bajo el hero. En teléfono, lista de 6 renglones.

### cifras · cifras

**Título:** Bimbo en cifras

- Países donde operamos: 39
- Panaderías y botaneras: 250
- Marcas: Más de 100
- Colaboradores: Más de 152,000

> Nota de diseño: Contadores al entrar en pantalla. Cada cifra muestra su fecha de corte; todas salen de content/cifras.ts.

### mision · texto

**Rótulo:** Nuestra misión  
**Título:** Alimentos deliciosos y nutritivos en las manos de todos

Esa es nuestra misión desde 1945, cuando seis emprendedores encabezados por Lorenzo Servitje abrieron una panadería en la colonia Santa María Insurgentes, con 34 colaboradores y cuatro productos. Hoy son más de 9,000, y la filosofía es la misma: ser una empresa sustentable, altamente productiva y plenamente humana.

**Botón:** Conoce quiénes somos

> Nota de diseño: Texto grande que se revela por palabras con el scroll. Fundación, 34 colaboradores y cuatro productos: Informe Anual 2025, pp. 8 y 14.

### ciclo · etapas

**Título:** Del campo a tu mesa

Cinco etapas, una sola operación.

1. **Campo.** Trabajamos con agricultores para que el trigo, el maíz, la papa y el azúcar vengan de agricultura regenerativa. Hoy son más de 500 mil hectáreas; la meta es 100% de ingredientes clave en 2050.
2. **Panaderías.** Producimos en 250 panaderías y botaneras de cuatro continentes.
3. **Distribución.** Una de las redes de distribución directa más grandes del mundo: más de 54,000 rutas y más de 1,600 centros de ventas.
4. **Tiendas.** De la tienda de la esquina al supermercado, en 102 países.
5. **Tu mesa.** Más de 100 marcas para cada momento del día, del desayuno a la cena.

> Nota de diseño: Sección «ciclo completo»: avanza sola cada 3.4 s, se pausa con el cursor y con un botón visible (WCAG 2.2.2).

### marcas · tarjetas

**Rótulo:** Nuestras marcas  
**Título:** Más de 100 marcas, una para cada momento del día

- **Bimbo.** Pan de caja y bollería
- **Marinela.** Pastelitos y galletas
- **Barcel · Takis.** Botanas saladas
- **Thomas'.** English muffins y bagels
- **Entenmann's.** Pan dulce y repostería
- **Oroweat.** Pan de granos enteros
- **Sara Lee.** Pan de caja
- **Donuts.** Bollería

> Nota de diseño: Logos reales con texto alternativo. Cada tarjeta enlaza al sitio de la marca (enlace verificado en el catálogo). Categorías por confirmar con el catálogo.

### sustentabilidad · tarjetas

**Rótulo:** Sustentabilidad  
**Título:** Metas públicas, y cuánto llevamos

En 2021 lanzamos nuestra estrategia de sustentabilidad, con tres pilares y una base común. Cada año publicamos lo que avanzamos y lo que nos falta.

- **Para Ti.** Mejores perfiles nutrimentales: el 48% de nuestras ventas viene de productos con 3.5 estrellas o más en el Health Star Rating. → *Ver Para Ti*
- **Para la Vida.** Comunidades más fuertes y un trabajo seguro e incluyente: más de 270 proyectos Buen Vecino en 2025. → *Ver Para la Vida*
- **Para la Naturaleza.** Vamos hacia cero desperdicios, cero emisiones de carbono en 2050 y agricultura regenerativa. → *Ver Para la Naturaleza*

> Nota de diseño: Los tres pilares con su nombre oficial y un dato cada uno. Tono de camino, no de logro: «vamos hacia», nunca «logramos». Se quitó «bien pagado»: el informe dice que no busca una meta fija de paridad salarial (p. 81). Reemplaza la imagen con texto incrustado y las tres anclas que hoy van al mismo lugar.

### presencia · texto

**Rótulo:** Presencia  
**Título:** Operamos en 39 países de cuatro continentes

Y con socios estratégicos, nuestros productos llegan a 102 países.

**Botón:** Ver países y marcas

> Nota de diseño: Mapa de relieve en nube de puntos (skill mapa-relieve) con los 39 países; clic en un país abre sus marcas.

### noticias · noticias

**Título:** Lo más reciente · 3 notas del CMS · Botón: Ver todos los comunicados

> Nota de diseño: Tres notas del CMS con fecha, categoría e imagen con texto alternativo.

### reconocimientos · lista

**Título:** Reconocimientos

En 2025 recibimos más de 90 premios y reconocimientos. Estos son los más recientes.

- Forbes · World's Best Employers 2026
- Ethisphere · World's Most Ethical Companies, por décima vez
- Merco · Empresa con mejor reputación de México
- TIME · Una de las mejores empresas del mundo [año por confirmar]

> Nota de diseño: Un solo componente de sellos con año; sustituye el sello Forbes 2024 del pie.

### cta · cta

**Titular:** ¿Quieres hablar con nosotros?  
**Texto:** Cuéntanos quién eres y te llevamos al canal correcto.  
**Botones:** Ir a Contacto

## Nosotros · `/nosotros`

- **title** (27 car.): Quiénes somos | Grupo Bimbo
- **description** (124 car.): Nuestra filosofía, misión, propósito y creencias; la historia desde 1945, los fundadores y el equipo que dirige Grupo Bimbo.
- **Audiencias:** todas, inversionistas, candidatos, prensa

### hero · hero

**Rótulo:** Nosotros  
**Titular:** Una panadería de 1945 que hoy opera en 39 países  
**Bajada:** Somos más de 152,000 colaboradores. Esto es lo que creemos y cómo llegamos hasta aquí.  
**Visual:** Foto de archivo de la primera panadería junto a una planta actual.  

### identidad · tarjetas

**Título:** Lo que nos guía

- **Filosofía.** Ser una empresa sustentable, altamente productiva y plenamente humana.
- **Misión.** Alimentos deliciosos y nutritivos en las manos de todos.
- **Propósito.** Alimentamos un mundo mejor.

> Nota de diseño: Redacción oficial del Informe Anual 2025 (p. 6). En el sitio actual solo existe dentro del texto alternativo de una imagen, y con otra redacción («Tener alimentos…», «alimentar un mundo mejor»).

### creencias · lista

**Título:** Nuestras creencias

Siete creencias guían cómo trabajamos.

- Valoramos a la persona.
- Somos una comunidad.
- Conseguimos resultados.
- Competimos y ganamos con calidad superior.
- Somos operadores eficaces.
- Actuamos con integridad.
- Trascendemos y permanecemos en el tiempo.

> Nota de diseño: Redacción literal del Informe Anual 2025 (p. 6); el sitio actual dice «operadores eficientes». Se quitaron las frases de apoyo que habíamos redactado: si Bimbo quiere una explicación por creencia, la escribe o valida el área de Cultura.

### cifras · cifras

**Título:** Hoy

- Países donde operamos: 39
- Países a los que llegan nuestros productos: 102
- Panaderías y botaneras: 250
- Centros de ventas: Más de 1,600
- Rutas de distribución: Más de 54,000
- Productos: Más de 9,000
- Ventas anuales: Más de US$23 mil millones

### categorias · lista

**Título:** Qué hacemos

- Pan de caja y artesanal
- Bollería
- Pan dulce
- Pastelitos
- Galletas
- Pan tostado
- English muffins
- Bagels
- Tortillas y flatbread
- Botanas saladas

### historia · eras

**Título:** Más de 80 años en ocho eras

- **1945–1950 · Una panadería y un pan envuelto en celofán.** Seis emprendedores encabezados por Lorenzo Servitje fundan Panificación Bimbo con 34 colaboradores y lanzan un pan de caja envuelto, novedad en la Ciudad de México.
- **1950–1960 · Nace Marinela.** Llegan las donas, los Bimbollos, las Medias Noches y los primeros pastelitos.
- **1960–1970 · La primera gran reorganización.** Lorenzo Servitje asume la Dirección General y la empresa se profesionaliza.
- **1970–1980 · La planta más grande de América Latina.** Construimos la panificadora más grande de la región y una de las diez más grandes del mundo.
- **1980–1990 · Empresa pública.** El 15% de las acciones empieza a cotizar en la Bolsa Mexicana de Valores.
- **1990–2000 · Rumbo a Latinoamérica.** La Organización Latinoamérica lleva nuestras panaderías más allá de México.
- **2000–2010 · Un nuevo continente.** Llegamos a Asia, a la costa oeste de Estados Unidos y sumamos El Globo y Chocolates La Corona.
- **2010–hoy · La panificadora más grande del mundo.** Sumamos operaciones en Norteamérica, Europa, África y Asia y en 2021 lanzamos nuestra estrategia de sustentabilidad. En 2025 cumplimos 80 años y abrimos MiBIMBO, un museo interactivo en la Ciudad de México.

> Nota de diseño: Línea por eras con fotos de archivo. Cada era abre las historias que hoy existen como notas sueltas.

### fundadores · tarjetas

**Título:** Fundadores

- **Lorenzo Servitje.** [semblanza por migrar]
- **Roberto Servitje.** [semblanza por migrar]
- **Jaime Sendra.** [semblanza por migrar]
- **Alfonso Velasco.** [semblanza por migrar]
- **José T. Mata.** [semblanza por migrar]
- **Jaime Jorba.** [semblanza por migrar]

### liderazgo · tarjetas

**Título:** Liderazgo

- **Daniel Servitje.** Presidente Ejecutivo de Grupo Bimbo.
- **Alejandro Rodríguez Bas.** Director General desde noviembre de 2025. Encabeza el Comité Directivo; antes dirigió Barcel Global.
- **Comité Directivo.** Diego Gaxiola Cuevas (Administración y Finanzas), Juan Muldoon Barrena (Personas), Raúl Ignacio Obregón Servitje y Fernando Lerdo de Tejada Servitje (directores generales adjuntos), José Manuel González Guzmán (Bimbo México), Jorge Guillermo Zárate Lupercio (Cadena de Suministro), Greg Kohersen (Bimbo Bakeries USA) y Alejandro Pintado (Barcel México).

> Nota de diseño: Cargos del Informe Anual 2025 (pp. 13 y 142); confirmar vigencia con Bimbo antes de publicar. Semblanzas profesionales y fotos por migrar, sin datos personales.

### cta · cta

**Titular:** Trabaja con nosotros  
**Texto:** Buscamos personas que quieran alimentar un mundo mejor.  
**Botones:** Ver vacantes

## Marcas · `/marcas`

- **title** (29 car.): Nuestras marcas | Grupo Bimbo
- **description** (115 car.): Más de 100 marcas en 39 países: Bimbo, Marinela, Barcel, Takis, Thomas', Oroweat y más. Busca por país o categoría.
- **Audiencias:** consumidores, prensa, clientes

### hero · hero

**Rótulo:** Marcas  
**Titular:** Más de 100 marcas, una para cada momento del día  
**Bajada:** Busca por país, región o categoría y llega directo al sitio de cada marca.  

### directorio · directorio

**Título:** Directorio de marcas

Escribe el nombre de una marca o usa los filtros.

Filtros: Región, País, Categoría. Muestra: Bimbo, Marinela, Barcel, Takis, Tía Rosa, Wonder, Oroweat, Thomas', Entenmann's, Sara Lee, Arnold, Dempster's, Pullman, Plus Vita, Ideal, Donuts, Bollycao, New York Bakery Co..

> Nota de diseño: Alimentado por un catálogo único de marcas (nombre, logo, categorías, países, URL verificada). Hoy 10 de 21 marcas de México no enlazan a su sitio.

### innovacion · texto

**Rótulo:** Innovación  
**Título:** Marcas que crecen y viajan

En 2025 nuestro índice de innovación llegó a más de 12%, con lanzamientos como Artesano Masa Madre en México y Latinoamérica, el pan brioche de Plus Vita en Brasil y formatos más accesibles, como la media hogaza.
Cero Cero ya está en 16 países, y el Pan Blanco y el Pan Integral Bimbo llegan a 12.

> Nota de diseño: Carta del Director General, Informe Anual 2025 (pp. 9–10). Fotos de producto sin recortar el empaque ni el logo.

### regiones · regiones

**Título:** Dónde operamos

39 países, agrupados en las cuatro regiones con las que reportamos resultados.

- **Norteamérica (2):** Canadá, Estados Unidos
- **México (1):** México
- **Latinoamérica (Centro y Sudamérica) (15):** Argentina, Brasil, Chile, Colombia, Costa Rica, Ecuador, El Salvador, Guatemala, Honduras, Nicaragua, Panamá, Paraguay, Perú, Uruguay, Venezuela
- **EAA (Europa, Asia y África) (21):** China, Corea del Sur, Croacia, Eslovenia, España, Francia, India, Italia, Kazajistán, Marruecos, Montenegro, Portugal, Reino Unido, Rumanía, Rusia, Serbia, Sudáfrica, Suiza, Túnez, Turquía, Ucrania

> Nota de diseño: Regiones del Informe Anual 2025 y de los reportes trimestrales (Norteamérica, México, Latinoamérica, EAA). Corrige la agrupación actual, que pone a Colombia, Ecuador y Venezuela en «Centroamérica». Suma 39 países.

### cta · cta

**Titular:** ¿Vendes o distribuyes nuestros productos?  
**Texto:** Escríbenos y te ponemos en contacto con el equipo comercial de tu país.  
**Botones:** Ir a Contacto

## Sustentabilidad · `/sustentabilidad`

- **title** (29 car.): Sustentabilidad | Grupo Bimbo
- **description** (144 car.): Nuestra estrategia de sustentabilidad: metas públicas para Para Ti, Para la Vida y Para la Naturaleza, lo que hemos avanzado y lo que nos falta.
- **Audiencias:** comunidad, inversionistas, prensa

### hero · hero

**Rótulo:** Sustentabilidad  
**Titular:** Un camino con metas públicas  
**Bajada:** Para ti, para la vida y para la naturaleza. En 2021 nos pusimos metas con fecha; cada año publicamos cuánto avanzamos, qué cumplimos y qué todavía no.  

### origen · texto

**Título:** Viene de nuestra filosofía

Desde el inicio quisimos ser una empresa sustentable, altamente productiva y plenamente humana. La estrategia de 2021 convierte esa idea en metas medibles, organizadas en tres pilares y cuatro cimientos.

### pilares · tarjetas

**Título:** Tres pilares

- **Para Ti.** Mejores perfiles nutrimentales para todos · Marcas sustentables y transparentes · Dietas más saludables a base de plantas. → *Ver Para Ti*
- **Para la Vida.** Fortalecer nuestras comunidades · Cuidar a nuestra gente. → *Ver Para la Vida*
- **Para la Naturaleza.** Hacia cero desperdicios · Avanzando hacia cero emisiones de carbono · Agricultura regenerativa. → *Ver Para la Naturaleza*

> Nota de diseño: Reemplaza «8 principios básicos»: son 3 pilares con 8 temas, más 4 cimientos. Decidido: la página de Nutrición se integra en Para Ti, que es donde el Informe Anual 2025 reporta los perfiles nutrimentales; /nutricion redirige a /sustentabilidad#para-ti.

### metas · cifras

**Título:** Cómo vamos

- Ventas de productos con 3.5 estrellas o más (Health Star Rating): 48%
- Consumo diario sin colorantes artificiales: 100%
- Proyectos Buen Vecino: Más de 270
- Mujeres en posiciones de liderazgo: Más del 30%
- Hectáreas con agricultura regenerativa: Más de 500 mil
- Empaques diseñados para ser reciclables: 99%
- Electricidad renovable según los criterios de RE100: 99%
- Reúso de agua tratada en servicios: 100%
- Vehículos eléctricos: Más de 4,000

> Nota de diseño: Avances del Informe Anual 2025, cada uno con su alcance en la etiqueta: electricidad (no toda la energía), agua de servicios, empaques diseñados para ser reciclables, consumo diario. Agrupar por pilar: Para Ti (3), Para la Vida (2), Para la Naturaleza (4).

### pendientes · texto

**Rótulo:** Lo que falta  
**Título:** Lo que todavía no logramos

No alcanzamos la meta de 2025 para reducir las emisiones de nuestra cadena de valor. Estamos recalculando nuestra línea base, y mientras terminamos pedimos pausar la validación de nuestros objetivos ante la iniciativa Science Based Targets. La meta no cambia: cero emisiones de carbono en 2050.
En nutrición nos propusimos que en 2025 el 50% de nuestras ventas viniera de productos con 3.5 estrellas o más. Llegamos a 48% y esperamos cerrar la diferencia en 2026.

> Nota de diseño: Pedido por la revisión del supervisor (3 nov 2026): Sustentabilidad habla de camino, no de logro. Bimbo lo reporta abiertamente (Informe Anual 2025, pp. 31–32, 101, 109 y 169). Validar con Bimbo el tono de esta sección antes de publicar.

### cimientos · lista

**Título:** Cuatro cimientos

Lo que sostiene a los tres pilares.

- Estándares ambientales y edificios sustentables
- Calidad e inocuidad alimentaria
- Derechos humanos y estándares laborales
- Abastecimiento sustentable de materias primas

### descargas · descargas

**Título:** Reportes y descargas

- Informe Anual Integrado 2025 «Celebramos lo que nos une» · 182 páginas · PDF
- Datos de Desempeño 2025 · Anexo del informe · PDF
- Análisis de doble materialidad 2025 · PDF
- Planes de acción de agricultura y aceite de palma · 2023–2025 · PDF
- Contribución a los ODS · PDF

> Nota de diseño: Concentra el Centro de Descargas. Cada archivo muestra año y peso.

### contacto · texto

**Título:** ¿Preguntas sobre sustentabilidad?

Escríbenos a sustentabilidad@grupobimbo.com.

> Nota de diseño: Correo del Informe Anual 2025 (p. 182).

## Inversionistas · `/inversionistas`

- **title** (28 car.): Inversionistas | Grupo Bimbo
- **description** (102 car.): Resultados trimestrales, informes anuales, eventos y gobierno corporativo de Grupo Bimbo (BMV: BIMBO).
- **Audiencias:** inversionistas, analistas

### hero · hero

**Rótulo:** Inversionistas  
**Titular:** Resultados, reportes y gobierno corporativo  
**Bajada:** Cotizamos en la Bolsa Mexicana de Valores con la clave BIMBO y en el mercado extrabursátil de Estados Unidos con un programa de ADR Nivel 1, clave BMBOY.  
**Botones:** Descarga el reporte 3T26  

### cifras · cifras

**Título:** La compañía en cifras

- Ventas netas últimos 12 meses: Ps. 420,168 millones
- Ventas anuales: Más de US$23 mil millones
- Países donde operamos: 39
- Rutas de distribución: Más de 54,000
- Productos: Más de 9,000

### anio · texto

**Rótulo:** 2025 en breve  
**Título:** Ventas y UAFIDA Ajustada récord en nuestro 80 aniversario

Cerramos 2025 con ventas netas de Ps. 426,952 millones y una UAFIDA Ajustada de Ps. 59,456 millones, ambas récord. Redujimos el apalancamiento a 2.7 veces y regresamos Ps. 5,569 millones a nuestros accionistas en dividendos y recompra de acciones.

**Botón:** Leer el Informe Anual 2025

> Nota de diseño: Informe Anual 2025 (pp. 7 y 11). Se actualiza con cada informe anual; los trimestres van en «Reportes trimestrales».

### tesis · tarjetas

**Título:** Por qué invertir en Bimbo

- **Distribución.** Red de distribución directa y plantas que garantizan calidad y frescura.
- **Diversificación.** Productos, canales y geografías balanceados entre mercados desarrollados y emergentes.
- **Innovación.** Categorías, precios y presentaciones para cada ocasión de consumo.
- **Eficiencia.** Capacidad de producción y modelos de bajo costo.
- **Equipo directivo.** Experiencia probada y compromiso con los colaboradores.
- **Rentabilidad.** Generación consistente de efectivo para crecer de forma orgánica y con adquisiciones.
- **Sustentabilidad.** Metas públicas y una cultura corporativa distintiva.

> Nota de diseño: Mismo contenido que «Valor Bimbo», en texto y no en imágenes descargables.

### accesos · distribuidor

**Título:** Información financiera

| Para | Texto | Botón |
|---|---|---|
| Reportes trimestrales | Del más reciente al más antiguo. | Ver reportes |
| Informes anuales | Informe anual integrado de cada ejercicio. | Ver informes |
| Reportes BMV | Información entregada a la Bolsa Mexicana de Valores. | Ver reportes BMV |
| Eventos y presentaciones | Conferencias de resultados y presentaciones. | Ver eventos |
| Gobierno corporativo | Consejo, comités, asambleas y código. | Ver gobierno corporativo |
| Deuda vinculada a la sustentabilidad | Certificados bursátiles ligados a metas de emisiones y su avance. | Ver los instrumentos |

> Nota de diseño: CbCR solo existe en inglés: se enlaza con la etiqueta «(en inglés)». «Deuda vinculada a la sustentabilidad» sigue al informe («certificados bursátiles vinculados a la sustentabilidad», p. 169); no usar «bonos verdes» ni «bonos sustentables». Confirmar el término con Relación con Inversionistas.

### contacto · texto

**Título:** Relación con Inversionistas

Escríbenos a ir@grupobimbo.com.
[teléfono por migrar desde Inversionistas › Contacto]

> Nota de diseño: Correo del Informe Anual 2025 (p. 182).

## Prensa · `/prensa`

- **title** (28 car.): Sala de prensa | Grupo Bimbo
- **description** (83 car.): Comunicados oficiales, noticias, kit de medios y contacto de prensa de Grupo Bimbo.
- **Audiencias:** prensa

### hero · hero

**Rótulo:** Prensa  
**Titular:** Noticias y comunicados de Grupo Bimbo  
**Bajada:** Comunicados oficiales, notas y material para medios.  

### listado · noticias

**Título:** Comunicados y noticias · 6 notas del CMS · Botón: Cargar más

> Nota de diseño: Filtro por seis categorías (Negocio y resultados, Marcas e innovación, Sustentabilidad, Comunidad, Nuestra gente, Reconocimientos) en lugar de las 17 actuales, que incluyen duplicados. La categoría de cada nota va pegada a su título.

### kit · descargas

**Título:** Kit de medios

- Logotipos · SVG y PNG
- Fotografías · Plantas, productos y directivos
- Ficha de la compañía · Cifras de content/cifras.ts con fecha de corte

### contacto · texto

**Título:** Contacto de prensa

[correo de prensa por confirmar]

## Carreras · `/carreras`

- **title** (33 car.): Trabaja en Grupo Bimbo | Carreras
- **description** (106 car.): Vacantes en los 39 países donde operamos. Conoce cómo es trabajar en la panificadora más grande del mundo.
- **Audiencias:** candidatos

### hero · hero

**Rótulo:** Carreras  
**Titular:** Haz carrera en la panificadora más grande del mundo  
**Bajada:** Somos más de 152,000 colaboradores en 39 países. «Valoramos a la persona» es la primera de nuestras creencias, y la persona es el eje de nuestras decisiones.  
**Botones:** Buscar vacantes en mi país  

### cifras · cifras

**Título:** Quiénes somos

- Colaboradores: Más de 152,000
- Países donde operamos: 39
- Mujeres en posiciones de liderazgo: Más del 30%
- Horas de capacitación por colaborador: 28

### cuidado · tarjetas

**Título:** Cómo cuidamos a nuestra gente

El cuidado de nuestra gente es la base de todo lo que hacemos.

- **Pertenencia.** Queremos que cada persona se sienta valorada, respetada y libre de ser auténtica.
- **Formación.** 28 horas de capacitación al año en promedio, con GB University y programas de liderazgo.
- **Seguridad y bienestar.** Nuestros líderes siguen cuatro verbos: cuido, corrijo, capacito y celebro.

> Nota de diseño: Frases del Informe Anual 2025 (pp. 62, 64, 71 y 75). No prometer «cero accidentes» ni paridad salarial.

### vacantes · distribuidor

**Título:** Vacantes por país

Cada región publica sus vacantes en su propia bolsa de trabajo.

| Para | Texto | Botón |
|---|---|---|
| México | Plantas, ventas, distribución y corporativo. | Ver vacantes en México |
| Latinoamérica | Colombia, Costa Rica, Ecuador, Guatemala, Panamá y más. | Ver vacantes |
| Brasil | Vagas em todo o Brasil. | Ver vagas |
| Estados Unidos | Bimbo Bakeries USA, Barcel USA y Bimbo QSR. | Ver vacantes |
| Europa | España y otros países de la región. | Ver vacantes |

> Nota de diseño: Reemplaza la lista actual, que mete a Colombia, Ecuador y Venezuela en «Latinoamérica Centro».

### proceso · etapas

**Título:** Cómo es el proceso

1. **Encuentra tu vacante.** Busca por país y área.
2. **Postúlate.** Comparte tu experiencia en línea.
3. **Entrevistas.** Conoce al equipo y al puesto.
4. **Bienvenida.** Tu primer día en Bimbo.

> Nota de diseño: Etapas genéricas: validar con «Nuestros procesos de selección» del sitio actual.

### fraude · aviso

**Título:** Cuidado con los fraudes

Grupo Bimbo no solicita ningún tipo de pago durante el proceso de selección. Si alguien te lo pide en nuestro nombre, repórtalo.

> Nota de diseño: Texto tomado del pie del sitio actual; aquí es donde el candidato lo necesita.

## Contacto · `/contacto`

- **title** (22 car.): Contacto | Grupo Bimbo
- **description** (120 car.): Escríbenos según tu caso: consumidores, clientes, proveedores, inversionistas, prensa, candidatos o línea ética Comenta.
- **Audiencias:** todas

### hero · hero

**Rótulo:** Contacto  
**Titular:** ¿Con quién quieres hablar?  
**Bajada:** Elige tu caso y te llevamos al canal correcto.  

### canales · distribuidor

**Título:** Canales

| Para | Texto | Botón |
|---|---|---|
| Consumidores | Una duda o una queja sobre un producto. | Atencionenlinea@grupobimbo.com |
| Clientes y distribuidores | Compras, pedidos y nuevas cuentas. | [canal por confirmar] |
| Proveedores | Registro, pagos y portal. | Portal de proveedores |
| Inversionistas | Relación con Inversionistas. | Ir a Inversionistas |
| Prensa | Solicitudes de medios. | Ir a Prensa |
| Candidatos | Vacantes y procesos de selección. | Ir a Carreras |
| Organizaciones sociales | Propuestas de inversión social y donativos. | Inversionsocial@grupobimbo.com |
| Visitas | Visitas virtuales y escolares a nuestras panaderías. | Agendar una visita |

### comenta · texto

**Rótulo:** Línea ética  
**Título:** Comenta: reporta una posible falta al Código de Ética

Para colaboradores y proveedores. Los reportes son confidenciales: no revelamos la identidad de quien reporta ni de las personas involucradas.
Puedes reportar por teléfono las 24 horas (según tu país), en comenta@grupobimbo.com o en el sitio de Comenta.
Comenta no atiende quejas de producto, servicio o pagos; para eso, escribe a atención a consumidores.

**Botón:** Reportar en Comenta

> Nota de diseño: Hoy Comenta es un botón naranja destacado en el pie, sin explicación. Canales del Informe Anual 2025 (p. 167).

### fraude · aviso

**Título:** Aviso sobre fraudes

No solicitamos pagos para procesos de selección ni vendemos automóviles por internet fuera de la casa de subastas MORTON. Verifica siempre en nuestros canales oficiales.

> Nota de diseño: Contenido del modal actual de fraudes y del pie. Aquí se lee sin abrir nada.

### oficinas · texto

**Título:** Oficinas corporativas

Prolongación Paseo de la Reforma 1000, col. Peña Blanca Santa Fe, alcaldía Álvaro Obregón, C.P. 01210, Ciudad de México.

> Nota de diseño: Dirección del Informe Anual 2025. Las preguntas frecuentes del sitio dan otra (Alfonso Nápoles Gándara 1117) y deben corregirse. El teléfono se publica cuando Bimbo confirme cuál.
