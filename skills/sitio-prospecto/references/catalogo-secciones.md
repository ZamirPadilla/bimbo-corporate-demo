# Catálogo de secciones probadas (sitio de referencia)

Rutas relativas a `prototipo/` de la rama `fusion/sitio` del repo privado del sitio de referencia. Cada sección
se ubica buscando su `data-screen-label` **dentro de la página indicada** (las líneas cambian; el rótulo no). Ojo:
Energía y Destinos comparten prefijo `E` (Energía `E6 Cifras`, Destinos `E6 Ubicaciones`), y algunos rótulos se
repiten dentro de una página porque el CSS de teléfono los usa como selector (`06 Ciclo completo` en `<helmet>`).
La media (fotos y videos) no está en git: pedir al equipo de Nuclea el acceso al bucket o una copia. Al llevar una
sección a otro sitio, copiar también lo que usa por dentro: imágenes en `<image href>` de SVG, `url()` de CSS,
scripts `sitio-*.js` y sus datos (`assets/*.json`).

## Contenido
1. Aperturas (heroes)
2. Narrativa y datos
3. Interactivas
4. Planos y activos
5. Listados y medios
6. Cierre y componentes compartidos

## 1 · Aperturas
| Sección | Dónde | Qué hace | Adaptar a otro cliente |
|---|---|---|---|
| Hero con video | Home `01 Hero` | Video a sangre con póster inmediato, titular por palabras, versión de teléfono recortada 540×720 con `<source media>` | Seguir `prototipo/CLAUDE.md` (póster JPEG, `opacity` al reproducir). Video propio del cliente, sin audio |
| Hero foto → plano → curvas de nivel | Destinos `E1 Hero` | Foto aérea que se barre a plano territorial y a curvas de nivel con el scroll | `lamina-tecnica`, variante plano territorial |
| Hero de recorrido | Liderazgo `Li4`, `sitio-recorrido.js` | Una cámara vuela sobre el relieve de parada en parada guiada por el scroll | Pesado de rehacer: requiere retículas regionales y geometría OSM. Proponerlo solo si el cliente tiene 5–8 lugares icónicos |
| Hero de página interna | Logística `L1`, Energía `E1`, Deporte `S1`, Ecosistema `Eco1` | Foto o video con titular grande y rótulo mono | Igual, con la foto de cada unidad de negocio |

## 2 · Narrativa y datos
| Sección | Dónde | Qué hace |
|---|---|---|
| Somos / Misión | Home `02 Somos`, `03 Misión` | Texto grande que se revela por palabras con el scroll (`missionP`) |
| Cifras | Home `04 Cifras`, Logística `L6`, Energía `E6 Cifras`, Deporte `S4` | Contadores que suben al entrar en pantalla (`runStats`), rótulos mono |
| Frase / Manifiesto | Logística `L2 Frase` y `L5 Manifiesto`, Destinos `E2 Frase`, Home `08 Manifiesto` | Una sola frase a pantalla completa |
| Historia por eras | `Nuestra Historia.dc.html` | Línea de tiempo por eras (`era.label`) con fotos de archivo |
| Mensaje de dirección | Liderazgo `Li2 Mensaje`, `Li3` | Retrato + carta, citas destacadas |

## 3 · Interactivas
| Sección | Dónde | Qué hace | Notas |
|---|---|---|---|
| Ciclo completo con nombre propio | Home `06 Ciclo completo`, primera lámina del carrusel | 5 etapas (lista a la izquierda, placas isométricas en tarjeta oscura a la derecha); avanza sola cada 3.4 s; con el mouse encima se pausa y la etapa la elige el usuario | Ver `paginas-claude-design/references/patrones-interaccion.md` (temporizador + hover). Para Bimbo: "del campo a la mesa" |
| Carrusel de 3 láminas pegado al scroll | Home `06 Ciclo completo` | La sección mide varias pantallas; cada tercio del avance muestra una lámina (`cycleP`, `chState`) | |
| Ecosistema horizontal | Home `07 Ecosistema`, `07b Plataformas` | Scroll vertical que mueve una fila horizontal de plataformas (`ecoMax`, `goEco`) | Unidades de negocio o marcas |
| Presencia en relieve | Home `05 Presencia`, `mapa-presencia.html?relieve=1` | Mapa 3D de puntos con marcadores, etiqueta rotativa, filtro por leyenda, clic en marcador | `mapa-relieve`. Para presencia global, generar la retícula de la región |
| Proyectos por categoría | Logística `L3 Proyectos`, Energía `E4 Proyectos`, Destinos `E3 Proyectos` | Carrusel con pestañas de categoría (en Logística: Ciudad, Aire, Tierra, Mar), video solo del proyecto activo | Videos con `data-src` y `preload="metadata"` (ver `media-web-ligera`) |

## 4 · Planos y activos
| Sección | Dónde | Qué hace | Skill |
|---|---|---|---|
| Del plano a la obra (portada) | Activos `04b Del plano a la obra` (antes en Home v3, en una rama anterior) | Plano en líneas → (modelo) → foto, con barrido y persiana ligados al scroll; cielo extendido en pantallas altas | `gemelo-desde-foto` |
| Plano → obra a todo el ancho entre secciones | Una por página de unidad de negocio (`L3b`, `E4b`, `E3b`, `S3b`) | La misma mecánica como sección completa; franja 5:2 con tope de alto en horizontal; colores del plano según el fondo de la página | `gemelo-desde-foto`, `references/variantes-a-todo-el-ancho.md` |
| Lámina técnica | Activos `02 Origen` | Alzado/planta con cotas y cajetín, sacado de un modelo Blender | `lamina-tecnica` |
| Catálogo de activos | Activos `04 Activos` | Lista de filas; al pasar el mouse una cortina muestra plano y foto. Carga inmediata, sin animación de entrada (`data-noreveal`) | `sitio-planos.js` para esquemas SVG |

## 5 · Listados y medios
| Sección | Dónde | Qué hace |
|---|---|---|
| Sala de prensa | `Sala de Prensa.dc.html` | Listado de comunicados con filtro, suscripción |
| Centro de medios | `Centro de Medios.dc.html` | Descargas de logos y fotos, contacto de prensa |
| Prensa en Home | Home `09 Prensa` | Últimas 3 notas |
| Contacto | `Contacto.dc.html` | Formulario simple (en prototipo no envía) |

## 6 · Cierre y componentes compartidos
| Pieza | Dónde | Notas |
|---|---|---|
| Nav | `Nav.dc.html` | `theme` (dark/light), `active` (clave de la página), `bar` (barra lateral fija sin tapar el texto). Menú con grupos y tarjetas con subtítulo |
| Footer | `Footer.dc.html` | Enlaces por grupo; al crear página nueva, agregarla aquí y en la Nav |
| CTA final | Home `10 CTA`, `S7 CTA` | Bloque de contacto a pantalla completa |
| Ecosistema al pie | Logística `L8`, Energía y Destinos `E7`, Deporte `S8` | Tarjetas hacia las otras unidades de negocio |

## Mapa de páginas del sitio de referencia (para traducir al prospecto)
Home · Nuestra Historia · Liderazgo · Ecosistema · cuatro páginas de plataforma (Logística, Energía, Destinos,
Deporte) · Activos · Centro de Medios · Sala de Prensa · Contacto.
