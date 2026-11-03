# Copy deck (ES)

> Generado por `npm run copy:docs` desde `content/`. No editar a mano: editar `content/paginas.ts` o `content/cifras.ts`.

Wireframes navegables: `npm run dev` y abrir `/wireframes`.

## Inicio · `/`

- **title** (40 car.): Grupo Bimbo | Alimentamos un mundo mejor
- **description** (124 car.): La panificadora más grande del mundo: más de 100 marcas, 39 países de operación y una estrategia pública de sustentabilidad.
- **Audiencias:** todas

### hero · hero

**Rótulo:** Grupo Bimbo · desde 1945  
**Titular:** Alimentamos un mundo mejor  
**Bajada:** Somos la panificadora más grande del mundo. Horneamos pan, pan dulce, galletas, tortillas y botanas en 39 países, y nuestros productos llegan a 102 países.  
**Botones:** Explora nuestras marcas · Conoce nuestra estrategia  
**Visual:** Video a sangre: del horno a la mesa, sin audio. Póster inmediato; versión vertical para teléfono. Sin carrusel automático.  

> Nota de diseño: Reemplaza el carrusel actual (alt vacío, controles en dos idiomas, sin pausa visible). El H1 es el propósito, no «Últimas noticias».

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

Esa es nuestra misión desde que seis socios abrieron una panadería en la colonia Santa María Insurgentes, en 1945. Hoy la cumplimos con más de 9,000 productos y una filosofía que no ha cambiado: ser una empresa sustentable, altamente productiva y plenamente humana.

**Botón:** Conoce quiénes somos

> Nota de diseño: Texto grande que se revela por palabras con el scroll.

### ciclo · etapas

**Título:** Del campo a tu mesa

Cinco etapas, una sola operación.

1. **Campo.** Trabajamos con agricultores en agricultura regenerativa. Meta: 100% de ingredientes clave en 2050.
2. **Panaderías.** Horneamos cada día en 250 panaderías y botaneras.
3. **Distribución.** Llevamos el pan fresco con más de 54,000 rutas y más de 1,600 centros de ventas.
4. **Tiendas.** Desde la tienda de la esquina hasta el supermercado, en 102 países.
5. **Tu mesa.** Llegamos con más de 100 marcas para cada momento del día.

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
**Título:** Una estrategia con metas públicas

En 2021 lanzamos «Alimentamos un mundo mejor», con tres pilares y una base común.

- **Para Ti.** Mejores perfiles nutrimentales, etiquetas claras y más ingredientes de origen vegetal. → *Ver Para Ti*
- **Para la Vida.** Comunidades más fuertes y un trabajo seguro, incluyente y bien pagado. → *Ver Para la Vida*
- **Para la Naturaleza.** Cero emisiones de carbono en 2050, cero desperdicios y agricultura regenerativa. → *Ver Para la Naturaleza*

> Nota de diseño: Los tres pilares con su nombre oficial. Reemplaza la imagen con texto incrustado y las tres anclas que hoy van al mismo lugar.

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

**Título:** Reconocimientos 2026

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
**Titular:** Una panadería de 1945 que hoy hornea en 39 países  
**Bajada:** Somos más de 152,000 personas con una misma forma de trabajar. Esto es lo que creemos.  
**Visual:** Foto de archivo de la primera panadería junto a una planta actual.  

### identidad · tarjetas

**Título:** Lo que nos guía

- **Filosofía.** Ser una empresa sustentable, altamente productiva y plenamente humana.
- **Misión.** Alimentos deliciosos y nutritivos en las manos de todos.
- **Propósito.** Alimentamos un mundo mejor.

> Nota de diseño: Redacción oficial del Informe Anual 2025. En el sitio actual solo existe dentro del texto alternativo de una imagen, y con otra redacción («Tener alimentos…», «alimentar un mundo mejor»).

### creencias · tarjetas

**Título:** Nuestras creencias

Siete ideas que orientan cada decisión.

- **Valoramos a la persona.** La persona está al centro de lo que hacemos.
- **Somos una comunidad.** Crecemos junto con quienes nos rodean.
- **Conseguimos resultados.** Cumplimos lo que prometemos.
- **Competimos y ganamos con calidad superior.** Buscamos ser la mejor opción para cada cliente.
- **Somos operadores eficaces.** Cuidamos cada recurso.
- **Actuamos con integridad.** Hacemos lo correcto aunque nadie esté viendo.
- **Trascendemos y permanecemos en el tiempo.** Construimos para las siguientes generaciones.

> Nota de diseño: Los siete títulos siguen la redacción del Informe Anual 2025 (el sitio dice «operadores eficientes»; el informe, «eficaces»). Las frases de apoyo son propuesta y deben validarse con el área de Cultura.

### cifras · cifras

**Título:** Hoy

- Países donde operamos: 39
- Países a los que llegan nuestros productos: 102
- Panaderías y botaneras: 250
- Centros de ventas: Más de 1,600
- Rutas de distribución: Más de 54,000
- Productos: Más de 9,000

### categorias · lista

**Título:** Qué horneamos

- Pan de caja
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

- **1945–1950 · Una panadería y un pan envuelto en celofán.** Seis socios fundan Bimbo en Santa María Insurgentes y lanzan un pan de caja envuelto, novedad en la Ciudad de México.
- **1950–1960 · Nace Marinela.** Llegan las donas, los Bimbollos, las Medias Noches y los primeros pastelitos.
- **1960–1970 · La primera gran reorganización.** Lorenzo Servitje asume la Dirección General y la empresa se profesionaliza.
- **1970–1980 · La planta más grande de América Latina.** Construimos la panificadora más grande de la región y una de las diez más grandes del mundo.
- **1980–1990 · Empresa pública.** El 15% de las acciones empieza a cotizar en la Bolsa Mexicana de Valores.
- **1990–2000 · Rumbo a Latinoamérica.** La Organización Latinoamérica lleva nuestras panaderías más allá de México.
- **2000–2010 · Un nuevo continente.** Llegamos a Asia, a la costa oeste de Estados Unidos y sumamos El Globo y Chocolates La Corona.
- **2010–hoy · La panificadora más grande del mundo.** Sumamos operaciones en Norteamérica, Europa, África y Asia, lanzamos la estrategia de sustentabilidad y la meta de cero emisiones de carbono.

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

- **Alejandro Rodríguez Bas.** Director General desde noviembre de 2025. Antes dirigió Barcel Global.
- **Comité Directivo.** [integrantes por migrar desde Inversionistas › Gobierno corporativo]

> Nota de diseño: Semblanzas profesionales, sin datos personales.

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
- **description** (126 car.): Nuestra estrategia «Alimentamos un mundo mejor»: metas públicas para Para Ti, Para la Vida y Para la Naturaleza, y cómo vamos.
- **Audiencias:** comunidad, inversionistas, prensa

### hero · hero

**Rótulo:** Sustentabilidad  
**Titular:** Alimentamos un mundo mejor: para ti, para la vida y para la naturaleza  
**Bajada:** En 2021 fijamos metas públicas. Aquí está lo que nos propusimos y cuánto hemos avanzado.  

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

**Título:** Metas y avance

- Meta de cero emisiones de carbono: 2050
- Meta de agricultura regenerativa: 100% de ingredientes clave en 2050
- Hectáreas con agricultura regenerativa: Más de 500 mil
- Empaques reciclables: 99%
- Electricidad de fuentes renovables: 100%
- Vehículos eléctricos: Más de 4,000

> Nota de diseño: Avances del Informe Anual 2025. «100%» es de la electricidad, no de toda la energía: así debe decirse en el texto y en los metadatos.

### cimientos · lista

**Título:** Cuatro cimientos

Lo que sostiene a los tres pilares.

- Estándares ambientales y edificios sustentables
- Calidad e inocuidad alimentaria
- Derechos humanos y estándares laborales
- Abastecimiento sustentable de materias primas

### descargas · descargas

**Título:** Reportes y descargas

- Informe Anual 2025 «Celebramos» · 182 páginas · PDF
- Análisis de doble materialidad 2025 · PDF
- Planes de acción de agricultura y aceite de palma · 2023–2025 · PDF
- Contribución a los ODS · PDF

> Nota de diseño: Concentra el Centro de Descargas. Cada archivo muestra año y peso.

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
- Países donde operamos: 39
- Rutas de distribución: Más de 54,000
- Productos: Más de 9,000

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
| Financiamiento sustentable | Marco y reportes de bonos sustentables. | Ver el marco |

> Nota de diseño: CbCR solo existe en inglés: se enlaza con la etiqueta «(en inglés)».

### contacto · texto

**Título:** Relación con Inversionistas

[correo y teléfono por migrar desde Inversionistas › Contacto]

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
**Bajada:** Somos más de 152,000 personas en 39 países. Valoramos a la persona y la ponemos al centro de lo que hacemos.  
**Botones:** Buscar vacantes en mi país  

### cifras · cifras

**Título:** Quiénes somos

- Colaboradores: Más de 152,000
- Países donde operamos: 39
- Mujeres en posiciones de liderazgo: Más del 30%

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
| Visitas | Visitas virtuales y escolares a nuestras panaderías. | Agendar una visita |

### comenta · texto

**Rótulo:** Línea ética  
**Título:** Comenta: reporta una posible falta al Código de Ética

Para colaboradores y proveedores. Los reportes son confidenciales: no revelamos la identidad de quien reporta ni de las personas involucradas.
Comenta no atiende quejas de producto, servicio o pagos; para eso, escribe a atención a consumidores.

**Botón:** Reportar en Comenta

> Nota de diseño: Hoy Comenta es un botón naranja destacado en el pie, sin explicación.

### fraude · aviso

**Título:** Aviso sobre fraudes

No solicitamos pagos para procesos de selección ni vendemos automóviles por internet fuera de la casa de subastas MORTON. Verifica siempre en nuestros canales oficiales.

> Nota de diseño: Contenido del modal actual de fraudes y del pie. Aquí se lee sin abrir nada.

### oficinas · texto

**Título:** Oficinas corporativas

Prolongación Paseo de la Reforma 1000, col. Peña Blanca Santa Fe, alcaldía Álvaro Obregón, C.P. 01210, Ciudad de México.

> Nota de diseño: Dirección del Informe Anual 2025. Las preguntas frecuentes del sitio dan otra (Alfonso Nápoles Gándara 1117) y deben corregirse. El teléfono se publica cuando Bimbo confirme cuál.
