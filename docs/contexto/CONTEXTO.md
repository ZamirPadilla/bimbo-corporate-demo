# Grupo Bimbo · Página de marcas México: contexto para el prototipo

> **Cómo leer este documento**
> Esto es contexto, no especificación. Reúne el diagnóstico, la intención y las referencias que ha juntado el equipo de Nuclea. Nada de aquí es una regla: los colores, las tipografías, las librerías y las estructuras son puntos de partida para explorar, mejorar o descartar si aparece algo mejor.
> - Lo que está bajo **Hechos** se verificó en el sitio actual.
> - Lo que dice **propuesta**, **idea** o **posible** está abierto.
> - Todas las cifras de Bimbo que aparezcan deben validarse con fuentes oficiales (informes anuales, grupobimbo.com) antes de usarse como reales. En el demo pueden ir como provisionales.

---

## 1. El proyecto

- **Quién:** Nuclea Studio, agencia creativa y tecnológica de Guadalajara (branding, producción audiovisual, desarrollo web, marketing).
- **Para quién:** Grupo Bimbo, como prospecto.
- **Qué:** un **prototipo o demo** que muestre cómo podría verse una nueva versión de la página de marcas México: https://www.grupobimbo.com/es/marcas/mexico
- **Para qué:** abrir la conversación con Bimbo. El demo tiene que vender una visión, no ser un sitio terminado. Es más importante que impresione y se sienta "Bimbo" que cubrir todas las secciones.
- **Después:** si avanza, la visión se extiende al sitio corporativo completo (ver sección 6).

---

## 2. Diagnóstico del sitio actual (hechos)

La página hoy es un **directorio de logos**:

- Un banner, un H1 que dice "México" y dos párrafos de historia (1945, cuatro productos, diez camiones). Uno de ellos habla del castillo y los museos de la CDMX, que no tiene relación con las marcas.
- **21 marcas** en una cuadrícula plana, sin categorías, filtros, descripciones ni producto.
  - Con enlace "Visita aquí" (11): Bimbo, El Globo, El Molino, Gabi, Marinela, Oroweat, Sanissimo, Stonemill, Suandy, Tía Rosa, Wonder.
  - Sin enlace (10): Barcel, Bimbo Artesano, Del Hogar, Lara, Little Bites, Lonchibon, Milpa Real, Sara Lee, Takis, Thomas.
- No hay jerarquía de marca: Barcel y Takis están al mismo nivel, igual que Bimbo y Bimbo Artesano.
- Temas técnicos: Drupal 8 (sin soporte), menús y banners duplicados, enlaces muertos ("Contacto", "Ok!", "Información sobre posibles fraudes"), logos sin texto alternativo, canonical en http, rutas con `/index.php/`.
- Hay una ventana emergente y un aviso en el footer sobre **fraudes** (Bimbo no cobra en reclutamiento, vende autos solo vía MORTON), lo que indica que el fraude es un problema real para ellos.
- Lo esencial: **la página dice que Bimbo tiene marcas, pero no dice por qué esas marcas importan.**

---

## 3. Intención y tono

Lo que se busca, en palabras del equipo:

- **Limpio y profesional, pero no aburrido ni institucional.** Es el balance más importante de todo el proyecto.
- **Principalmente light:** fondos claros y cálidos, no oscuros.
- **Amistoso**, porque es Bimbo: cercano, familiar, con humor suave.
- **Parcialmente empresarial:** es el sitio de un grupo global que cotiza en bolsa, así que debe transmitir escala y solidez sin sentirse informe anual.
- **Moderno y con animación:** el movimiento es parte de la propuesta de valor del demo.
- **Ajustado al cliente:** que se sienta inconfundiblemente Bimbo (pan, trigo, horno, osito), no una plantilla de agencia con el logo cambiado.

Una forma de pensarlo: **orden y espacio de una marca corporativa premium, con la calidez y el juego de una marca de snacks.**

---

## 4. Concepto y oportunidades (ideas para el salto 10x)

Más allá de corregir lo que está mal, estas son las ideas grandes:

1. **De directorio a "México en un día".** Las marcas acompañan momentos: desayuno, lonche, antojo de la tarde, botana, sobremesa, celebración. Navegar por momentos y no por logos convierte la página en una historia (por ejemplo, un scroll que va de las 7 am a la noche). Es amistoso y le pertenece a Bimbo, porque nadie más tiene esa presencia en la mesa mexicana.
2. **Arquitectura de marca clara.** Agrupar por familias, por ejemplo Pan de caja, Pan dulce y pastelitos, Galletas, Botanas, Tortillas y bollería, Saludable y Pastelería. La agrupación es tentativa y se valida con Bimbo. Al cambiar de vista, las marcas se reacomodan con animación.
3. **Fichas de marca con alma.** Color de la marca, producto icónico, año de origen, un dato curioso y un enlace claro. En el sitio real, cada marca tendría su URL (`/marcas/mexico/marinela`) y ganaría SEO.
4. **Los productos icónicos como gancho emocional.** Gansito, Mantecadas, Pan Blanco, Takis, Chocorroles, Medias Noches: la gente se conecta con productos más que con marcas corporativas. Una sección tipo "¿Con cuál creciste?" daría ese gancho.
5. **Contar la escala con datos, con ligereza.** "1945: 4 productos y 10 camiones" pide una línea de tiempo animada hasta la operación actual. Esta es la capa empresarial.
6. **Conectar la página con el resto del grupo:** panaderías que se pueden visitar, sustentabilidad, talento, presencia global con un mapa.

---

## 5. Estructura posible del demo (página de marcas México)

Es un punto de partida, no un orden obligatorio:

1. **Hero:** un producto icónico al frente con un mensaje detrás que se revela con el scroll (ver Le Pain Quotidien). Copy ilustrativo: "NO ES SOLO PAN. / ES LO QUE COMPARTIMOS / DESDE 1945."
2. **Un día en México:** un recorrido por momentos del día, con el fondo cambiando de color según la hora (ver Barcoop) y las marcas apareciendo en contexto. El osito podría acompañar este recorrido.
3. **Explora nuestras marcas:** cards o paneles filtrables por familia o momento, con transición fluida (ver Akaru) y el color de cada marca.
4. **Íconos:** productos legendarios en 3D o con su palabra gigante detrás (ver FIX y Henrietta Said).
5. **De 10 camiones a…:** línea de tiempo por épocas, con cifras y contador (ver la estructura de Still Here, con tono cálido).
6. **Más allá del pan:** presencia global en un mapa-globo (ver Time Out), sustentabilidad, panaderías y talento.
7. **Footer** limpio. El aviso de fraude como banda discreta, no como ventana emergente.

Para el demo se sugiere construir completas las secciones 1 a 3, que son las que venden el concepto, y el resto en versión más ligera.

---

## 6. Arquitectura ideal del sitio completo (visión a futuro)

El principio es pasar de organizar **como organigrama** (Nosotros, Sustentabilidad, Inversionistas…) a organizar **por audiencia e intención**: consumidores, inversionistas, talento, proveedores y medios. Cada uno debería encontrar su camino en un clic.

```
grupobimbo.com
│
├── HOME
│   ├── Hero de marca ("Alimentamos un mundo mejor")
│   ├── Accesos por audiencia → Consumidor · Inversionista · Talento · Proveedor · Medios
│   ├── Marcas destacadas
│   ├── Cifras globales animadas            [validar]
│   ├── Mapa global (países, plantas)        [validar]
│   └── Últimas noticias
│
├── NOSOTROS
│   ├── Quiénes somos          ← fusiona "Conoce Bimbo" + "Grupo Bimbo" + Reconocimientos
│   ├── Nuestra historia       ← fusiona Historia + Fundadores (timeline)
│   ├── Presencia global       ← NUEVO: mapa de países, plantas y marcas por región
│   ├── Innovación y Ventures  ← fusiona los dos enlaces de Ventures duplicados
│   └── Visita nuestras panaderías (con reserva)
│
├── MARCAS ★
│   ├── Explorador de marcas   ← UNA página con filtros región · categoría · momento
│   │                            (reemplaza las 7 páginas regionales)
│   ├── /marcas/[marca]        ← NUEVO: ficha por marca
│   ├── Productos icónicos     ← NUEVO
│   └── Dónde comprar          ← NUEVO
│
├── SUSTENTABILIDAD
│   ├── Estrategia (4 pilares: Para Ti · Para la Vida · Para la Naturaleza · Cimientos)
│   └── Indicadores visuales   ← NUEVO (en lugar de solo PDFs)
│
├── INVERSIONISTAS
│   ├── Resumen · Resultados y reportes · Gobierno corporativo · Contacto RI
│
├── TALENTO                    ← sube al menú principal
│   ├── Vida en Bimbo · Vacantes · Aviso "Bimbo no cobra en procesos de selección"
│
├── PRENSA
│   ├── Sala de noticias (categorías como filtros) · Comunicados · Kit de prensa (NUEVO)
│
├── CENTRO DE DOCUMENTOS       ← NUEVO: concentra informes, descargas y reportes
│
└── CONFIANZA Y CONTACTO
    ├── Contacto por audiencia · Proveedores
    ├── Verificador anti-fraude ← NUEVO
    └── Políticas · Privacidad · Términos · FAQ

GLOBAL: buscador (marcas + productos + documentos) · ES/EN · BIDA como asistente flotante
```

Navegación principal resultante: **Nosotros · Marcas · Sustentabilidad · Inversionistas · Talento · Prensa**, con Proveedores, Contacto, Buscar y ES/EN en la barra utilitaria.

---

## 7. Lenguaje visual

### 7.1 El osito como personaje

Una idea clave del equipo: **usar al osito como personaje que aparece en distintos apartados, con animación**, no solo como logo.

Ideas posibles:
- **Guía del recorrido** en "Un día en México": aparece en cada momento haciendo algo distinto (desayunando, con lonchera, en la sobremesa).
- **Asomándose** en el hero o desde los bordes de las cards como microinteracción, y reaccionando a hover o clic.
- **Loader**: el osito con su gorro de chef mientras algo "se hornea".
- **Estados vacíos y 404**: un filtro sin resultados, una página no encontrada.
- **Footer**: el osito despidiéndose.
- **Línea de tiempo**: el osito a través de las décadas, si existe material histórico.

Consideraciones:
- El osito es un activo de marca de Bimbo. En el sitio real se usarían sus recursos oficiales y cualquier variación o animación requiere su aprobación. Para el demo se puede usar material público o una silueta provisional, sin rediseñar al personaje.
- Su presencia debe ser **dosificada**: unos cuantos momentos con intención, no en cada sección. Es la referencia de Duckbill Cookies con su mascota.
- Formatos posibles para animarlo: Lottie, Rive (permite estados interactivos) o SVG animado.

### 7.2 Elementos de Bimbo en todo el sitio

Otra idea clave: que a lo largo del sitio aparezcan **elementos que remitan a Bimbo y a la panadería**, en gráficos, fondos, branding y animaciones. Ideas para explorar:

**Motivos gráficos:**
- **Espigas de trigo** como ornamento, separador o patrón sutil de fondo.
- **La silueta de la rebanada de pan** (la forma de "hongo" del pan de caja) como **máscara de imágenes o forma de cards**. Es reconocible al instante y muy propia.
- **Migas, semillas y ajonjolí** como partículas o texturas.
- **Harina espolvoreada:** una textura suave en fondos crema o partículas que se dispersan.
- **Corteza dorada:** degradados cálidos que evocan el horneado.
- **El camión repartidor** de 1945 en la sección de historia.
- **El gorro de chef** del osito como ícono o detalle.

**Ideas de animación:**
- **"Sale del horno":** las cards o secciones entran con un brillo cálido, como al abrir el horno.
- **Masa que sube:** elementos que crecen suavemente con un efecto de resorte al entrar.
- **Tostador:** algo que "salta" (un loader, un botón, un contador).
- **Vapor:** líneas suaves que suben sobre un producto recién hecho.
- **Harina al pasar el cursor:** una nube de partículas finas en hover.
- **Rebanadas que se separan** para revelar contenido.
- **Una barra de progreso de lectura** que se va "dorando".

Todo esto se aplica con **mesura**: lo limpio y profesional manda, y estos detalles son los que evitan que se sienta institucional.

### 7.3 Propuesta de color (inicial, para explorar)

> Los valores son aproximados y orientativos. El azul de Bimbo y los colores de cada marca deben tomarse de sus guías oficiales o de sus logos, no de esta tabla.

**Base (la mayor parte del sitio):**

| Rol | Nombre sugerido | Aprox. | Uso |
|---|---|---|---|
| Fondo principal | Harina | `#FBF7F0` | Base crema cálida en lugar de blanco clínico |
| Fondo alterno | Migaja | `#FFFDF9` | Cards y superficies elevadas |
| Fondo cálido | Trigo claro | `#F3E8D5` | Secciones de respiro y bandas |
| Texto | Tinta | `#1E2230` | Texto principal (no negro puro) |
| Texto secundario | Gris cálido | `#6E675C` | Etiquetas y apoyos |

**Marca:**

| Rol | Nombre sugerido | Aprox. | Uso |
|---|---|---|---|
| Primario | Azul Bimbo | `#0A4DA2` *(validar)* | Identidad, titulares clave, navegación activa |
| Primario profundo | Azul noche | `#0D2A52` | Sección de noche, contraste, footer |
| Acento cálido | Corteza | `#C8873A` | Detalles de "horneado", íconos, subrayados |
| Acento suave | Trigo | `#E9C47C` | Espigas, ilustraciones, highlights |
| Acento de acción | Rojo cálido | `#E0442E` | CTA principal (con moderación) |

**Tintes por momento del día** (para el fondo que cambia con el scroll):

| Momento | Aprox. |
|---|---|
| Desayuno | `#FFF3D6` (amarillo mantequilla pálido) |
| Mediodía / lonche | `#FFE6B8` (dorado suave) |
| Tarde / antojo | `#FFD9C7` (durazno) |
| Botana | `#FFE0D1` → acentos del color de Barcel o Takis |
| Noche | `#DCE6F5` (azul claro) → `#0D2A52` en el cierre |

**Color de cada marca:** cuando una marca está activa, su color aparece **a saturación completa en acentos y producto**, y como **tinte suave en el fondo**. Así el sitio se mantiene light aunque haya 21 colores en juego.

Para la interpolación de color con el scroll conviene usar un espacio perceptual (OKLCH), para que los tonos intermedios no se vean grisáceos.

### 7.4 Tipografía (dirección, no elección)

Tres voces que podrían convivir:

- **Titulares:** sans pesada, condensada o redondeada, en **MAYÚSCULAS** (referencias: Henrietta Said, Le Pain Quotidien). Da impacto y amistad.
- **Texto de mensaje o narrativa:** serif editorial de alto contraste y peso ligero (referencia: Polpharma), que da el tono de "marca con historia desde 1945". Opciones a explorar: Fraunces (gratuita), Tiempos, GT Super, Reckless.
- **Interfaz, etiquetas y datos:** sans limpia (Inter, DM Sans o similar).

**Pregunta abierta:** Henrietta usa texto corrido en mayúsculas condensadas y Polpharma usa serif. Ambas gustaron. Puede elegirse una, o usar cada una según el tipo de sección (lo juguetón frente a lo corporativo).

### 7.5 Fotografía e imagen

- Producto **en macro**, con textura de miga, glaseado y corteza.
- **Producto recortado** (PNG/WebP con transparencia) para los efectos de capas.
- Momentos reales de familias, escuelas y oficinas. Evitar el stock genérico.
- Para el demo pueden usarse imágenes provisionales, marcadas como tales.

### 7.6 Movimiento (principios)

- **Continuo y fluido:** nada aparece de golpe. Todo transiciona: colores, tamaños, enfoque.
- **Ligado al scroll** donde cuenta una historia y **con efecto resorte** en las microinteracciones.
- **Desenfoque a nitidez** como lenguaje común de entrada (Le Pain Quotidien, Polpharma).
- Ritmo **pausado y seguro** en las secciones corporativas, y más **juguetón** en marcas y productos.
- Respetar `prefers-reduced-motion` y cuidar el rendimiento en móvil.

---

## 8. Referencias

Las capturas están en `./referencias/`. Cada referencia indica **qué tomar específicamente**: no se trata de copiar los sitios.

### ★ Henrietta Said · referencia principal de tono y comunicación
https://henrietta.wearetattoodigital.com/ · capturas `07-henrietta-*`

Es la más cercana al sitio completo en estilo y comunicación.
- **Estilo juguetón y amistoso con orden:** etiquetas tipo cinta o sticker ligeramente inclinadas, ilustraciones tipo sticker con contorno blanco, badge circular "VIEW PRODUCT" con texto en curva, franja vertical con los colores de la marca.
- **Tipografía en mayúsculas bold:** titulares condensados y pesados, y también texto corrido en mayúsculas condensadas ligeras.
- **Secciones de producto:** palabra gigante del sabor detrás del producto ("BUFFALO", "PEPPER"), en un tono pálido del color de la sección, con el empaque al frente y una línea de descripción abajo. Al cambiar de sección cambia el fondo y el producto entra girado o inclinado.
- **Cintilla lateral de características:** el reverso del empaque queda fijo al centro y desde la derecha entran paneles verticales de color que se apilan, cada uno con un atributo ("XL VIRGINIA PEANUTS", "KETO FRIENDLY") y su ilustración. A la izquierda queda el mensaje principal fijo.
- **Para Bimbo:** aplicarlo en productos icónicos y fichas de marca ("GANSITO" gigante detrás del empaque). La cintilla podría contar atributos de marca o la historia ("De 10 camiones a…") con un dato por panel. **Bajar el volumen:** menos stickers por pantalla, copy cálido en lugar de pícaro y etiquetas menos inclinadas. La cintilla quizá es demasiado juguetona para la página corporativa, pero funciona en fichas de producto.
- *Técnica probable:* scroll pinneado (GSAP ScrollTrigger), sin 3D.

### Time Out Top Eats × Pepsi · mapa con curvatura de globo
https://pepsi.timeout.com/ · captura `01-timeout-mapa-globo.jpg`
- **Qué tomar:** el mapa se siente como **globo terráqueo**, no plano. Además: lista lateral de destinos en tipografía grande, filtros como píldoras con ícono arriba (la activa resaltada) y avatares flotando sobre el mapa.
- **Para Bimbo:** presencia global (países, plantas, marcas por región) y navegación por región del explorador de marcas.
- **Adaptar:** el original es oscuro; para Bimbo, mapa en crema o azul muy claro.
- *Técnica probable:* Mapbox GL con proyección globo (por el nombre de la imagen de vista previa, sin confirmar). Alternativas: MapLibre (gratuito, con globo) o globe.gl / Three.js.

### Akaru · transición entre cards
https://www.akaru.fr/ · capturas `02-akaru-cards-*`
- **Qué tomar:** la **fluidez y el estilo de la transición entre cards**. Los proyectos son paneles verticales de color sólido, numerados. Los inactivos quedan como franjas angostas a la derecha, y al avanzar la siguiente se expande mientras la anterior se comprime, como un acordeón horizontal continuo. La imagen vive dentro del panel con márgenes de color y se reencuadra o revela mientras el panel crece. Los paneles expandidos llevan nombre grande, etiquetas pequeñas y botón circular con flecha.
- **Para Bimbo:** explorador de marcas (cada marca, un panel con su color) o "Un día en México" (un panel por momento).
- **Adaptar:** colores de marca más vivos y cálidos sobre la base crema, en lugar de los tonos apagados del original.
- *Técnica probable:* GSAP ScrollTrigger + Lenis, animando el ancho del panel y el clip-path o la escala de la imagen. Hay que verlo en vivo para captar el easing.

### Le Pain Quotidien · texto detrás del pan
https://www.lepainquotidien.com/be/en · capturas `03-lepainquotidien-hero-*`
- **Qué tomar:** **tres capas**: foto de textura al fondo, titular en medio y pan recortado al frente, de modo que el pan tapa parte del texto. El texto se **revela palabra por palabra con el scroll**, pasando de desenfocado a nítido. La línea anterior queda en gris, la actual en negro y la siguiente borrosa detrás del pan.
- **Para Bimbo:** hero de la página, con un producto icónico al frente y un mensaje detrás. El producto podría cambiar en cada frase.
- **Adaptar:** fondo más cálido, tipografía igual de pesada pero más amable, con un toque de azul en la palabra activa.
- **Requiere** fotos de producto recortadas de buena calidad.
- *Técnica:* capas con z-index y animación ligada al scroll de translateY, blur, opacidad y color por palabra.

### Barcoop Bevy · cambio de color de fondo con transición
https://www.barcoopbevy.com/ · capturas `04-barcoop-fondo-*`
- **Qué tomar:** el fondo **no cambia de golpe entre secciones: se interpola** con el scroll, como si fuera una sola superficie que cambia de luz. El contenido de cada sección está diseñado para su color de fondo.
- **Para Bimbo:** "Un día en México" (el color sigue la hora del día) y el explorador de marcas (el fondo toma un tinte de la marca activa).
- **Adaptar:** usar versiones suaves o pastel para mantener la base light, y la saturación completa solo en acentos.
- **Extra:** las ilustraciones planas y amables (guirnalda, nubes) son un buen recurso; en Bimbo serían espigas, nubes de harina y migas.
- *Técnica:* fondo fijo con color interpolado (ScrollTrigger o IntersectionObserver), en OKLCH.

### Polpharma Biologics · lo limpio y profesional
https://www.polpharmabiologics.com/ · capturas `05-polpharma-*`
- **Qué tomar:**
  - **Pulcritud:** mucho espacio, una idea por sección y paleta corta con un solo acento cálido para la CTA principal.
  - **Datos elegantes:** etiqueta pequeña gris, cifra grande y líneas finas.
  - **Navegación en píldoras** unidas con conector curvo, y etiquetas de sección pequeñas en mayúsculas con un punto de color.
  - **Transiciones de sección con scroll:** las imágenes entran desenfocadas y se enfocan, entran formas grandes y el texto se compone escalonado.
  - **Tipografía de texto (no de títulos):** serif editorial de alto contraste y peso ligero para los párrafos de mensaje, más una sans geométrica para interfaz y datos.
- **Para Bimbo:** es la referencia del lado empresarial: cifras, historia, sustentabilidad, inversionistas.
- **Adaptar:** el original es frío y técnico (farmacéutica). Llevar el mismo orden a la paleta cálida y no usar el hero de burbujas tipo laboratorio.
- *Plataforma:* Webflow; el hero probablemente con Unicorn Studio.

### FIX Dessert Chocolatier · productos en 3D
https://www.fixchocolatier.com/ · capturas `06-fix-3d-*`
- **Qué tomar:** **empaques como modelos 3D reales** (volumen, brillo, sombras) en un **carrusel curvo en perspectiva**: el activo al centro y de frente, los demás girados hacia los lados con **profundidad de campo** (desenfocados). La rotación es fluida y debajo corre una **cinta con los nombres** sincronizada, con el activo resaltado.
- **Para Bimbo:** productos icónicos o fichas de marca (bolsa de Pan Blanco, Gansito, Takis, Mantecadas). Combina con el fondo que toma el color del producto activo.
- **Adaptar:** fondo claro con tinte del producto, en lugar del chocolate oscuro.
- **Requiere** modelos 3D de los empaques (GLB/GLTF con texturas). Para el demo bastan 3 a 5 sencillos.
- *Técnica:* Three.js o React Three Fiber con postprocesado. En móvil, una versión ligera o una secuencia prerenderizada.

### De Foodtruck Club · apoyo de tono
https://defoodtruckclub.nl/
- Refuerza el estilo de Henrietta. Tomar el **copy cercano y directo** con un eslogan corto que se repite, los **stickers ilustrados** y bloques que cuentan sin aburrir (cifras grandes, proceso en pasos, tira de logos).
- **Idea para Bimbo:** saludos en varios idiomas en el hero ("¡buen provecho!", "Buon appetito"…). Un "¡Buen provecho!" rotando en los idiomas de los países donde opera Bimbo une lo amistoso con la escala global.
- No se verificaron animaciones, colores ni tipografía: hay que revisarlo en vivo.

### Duckbill Cookies · mascota y producto como gráfico
https://www.duckbillcookies.com.br/
- **Qué tomar:** la **mascota como personaje** en varios puntos del sitio (ilustrada, en un peluche, en el footer con una galleta), es decir, el modelo para el osito. Copy cálido, **elementos del producto como recurso gráfico** (granos de café como separadores y patrones) y mapa de presencia con localizador.
- Es el caso más parecido a Bimbo en giro (galletas, consumo masivo, franquicias).

### Still Here · Human Development Fund · solo la estructura narrativa
https://stillhere.hdfund.org/
- **Contexto:** es un reporte humanitario sobre Gaza, con tono sobrio y oscuro. **No se toma nada de su tono ni de su estética.**
- **Qué tomar:** la **estructura de storytelling con scroll por etapas** (año uno, dos, tres), cada una con cronología y cifras; un **marcador de progreso** visible ("2023 · 01/04"); datos intercalados con narrativa; un bloque final de totales y un **contador** como recurso.
- **Para Bimbo:** el esqueleto de "De 10 camiones a…" o la historia desde 1945, por épocas, con el tono cálido de las demás referencias.

---

## 9. Mapa rápido: referencia → sección

| Sección del demo | Referencias que aplican |
|---|---|
| Hero | Le Pain Quotidien (capas + revelado), Henrietta (palabra gigante), Foodtruck Club (saludos multilingües) |
| Un día en México | Barcoop (fondo por momento), Akaru (paneles), osito como guía |
| Explora nuestras marcas | Akaru (transición de cards), Time Out (filtros en píldora), Barcoop (tinte de marca) |
| Íconos / productos | FIX (3D), Henrietta (palabra gigante + cintilla de atributos) |
| De 10 camiones a… | Still Here (estructura), Polpharma (datos elegantes) |
| Presencia global | Time Out (mapa-globo), Duckbill (localizador) |
| Sistema general | Henrietta (tono), Polpharma (orden y tipografía de texto), motivos de Bimbo (7.2) |

---

## 10. Material que se necesitaría

| Material | Demo | Proyecto real |
|---|---|---|
| Fotos de producto recortadas | Provisionales | Producción o entrega del cliente |
| Modelos 3D de empaques | 3–5 sencillos | Producción 3D (posible servicio de Nuclea) |
| Osito | Silueta o material público | Recursos oficiales y aprobación de animaciones |
| Logos de las 21 marcas | Del sitio actual | Versiones vectoriales oficiales |
| Colores de cada marca | Tomados de logos | Guías de marca |
| Cifras e historia | Provisionales, marcadas | Validadas con fuentes oficiales |
| Ilustraciones (trigo, migas, horno) | Creación propia | Sistema gráfico completo |

---

## 11. Notas técnicas (opciones, no decisiones)

- Scroll suave y animaciones ligadas al scroll: GSAP + ScrollTrigger + Lenis son la combinación común en estas referencias. Las scroll-driven animations de CSS son una alternativa ligera.
- 3D: Three.js o React Three Fiber.
- Mapa-globo: Mapbox GL, MapLibre o globe.gl.
- Osito animado: Lottie o Rive.
- Interpolación de color en OKLCH.
- Rendimiento y accesibilidad: soporte de `prefers-reduced-motion`, versiones ligeras en móvil, texto alternativo en todos los logos (el sitio actual no lo tiene) y contraste suficiente sobre los fondos de color.
- El stack (framework, CMS) queda abierto. Para un demo de pitch importa más la velocidad de iteración y el impacto visual que la arquitectura final.

---

## 12. Preguntas abiertas

- ¿Qué secciones se construyen completas en el demo y cuáles quedan como bosquejo?
- Agrupación final de marcas por familia y momento de consumo.
- Tipografía de texto: ¿serif editorial (Polpharma), mayúsculas condensadas (Henrietta) o ambas según la sección?
- ¿Qué tan presente está el osito: guía constante o apariciones puntuales?
- ¿Cuánto 3D cabe en el demo frente a imágenes recortadas?
- Cifras reales de escala e historia (pendientes de validar).
- Copy: el tono cálido-juguetón necesita textos propios en español. Los que aparecen aquí son ilustrativos.
