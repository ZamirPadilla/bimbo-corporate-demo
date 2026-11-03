# Léxico del cliente y kit de motivos

El objetivo es una lista corta de abstracciones que, repartidas en detalles, hagan que la página "huela" a la
industria y a la marca sin decirlo. Se construye en tres pasos: léxico, traducción a capas web y dosis.

## 1 · Seis lentes para sacar el léxico
Escribir 4–6 palabras por lente. La lente de **Íconos** es obligatoria: los clásicos de la marca (su
personaje, su flota, su empaque) son lo primero que la gente asocia con ella y no pueden faltar en el
benchmark. Sustantivos concretos y verbos de oficio; nada de adjetivos de folleto.

| Lente | Pregunta | Bimbo | Constructora (ejemplo) | Agua / energía (ejemplo) |
|---|---|---|---|---|
| **Materia** | ¿De qué está hecho? ¿Qué forma, textura y color tiene de cerca? | silueta del pan de caja, miga, corteza, espiga, harina | concreto, varilla, cimbra, plano | gota, cauce, turbina, cable |
| **Proceso** | ¿Qué verbos describen su oficio? | amasar, levar, hornear, rebanar, empacar, repartir | trazar, colar, levantar, entregar | captar, filtrar, generar, conducir |
| **Lugar** | ¿Dónde ocurre? | campo en surcos, molino, horno en arco, línea, ruta | obra, grúa, fachada | presa, red, subestación |
| **Ritual** | ¿Cuándo y cómo lo vive el usuario? | momentos del día, desayuno, lonchera, mesa | mudanza, primera llave | abrir la llave, encender |
| **Íconos** | ¿Qué reconoce cualquiera de la marca, aunque no sepa nada de la empresa? Personaje, flota, empaque, jingle | Osito Bimbo y su gorro de panadero, camiones de reparto, rojo y azul | grúa con logo, casco | pipa, uniforme |
| **Escala** | ¿Qué cifras lo hacen grande? | países, panaderías, rutas, marcas | m², pisos, años | litros, MW, km de red |

## 2 · Diez preguntas antes de diseñar
1. ¿Qué transforma el cliente? Materia prima → proceso → producto → entrega.
2. ¿Qué **forma** reconocería alguien sin ver el logo?
3. ¿Qué **textura** tiene su producto de cerca? (foto macro o textura procedural).
4. ¿Qué **verbo** resume su oficio? Ese verbo es la animación principal.
5. ¿Hay una **magnitud física** en su proceso (temperatura, presión, altura, tiempo, distancia)? Sirve de
   indicador de avance (Shorodo: 320 °C → 36.5 °C).
6. ¿Qué colores salen de la **materia** y cuáles de la **marca**? Se combinan, no se mezclan.
7. ¿Qué **momento** de la vida del usuario toca? Ese momento ordena la narrativa o el estado del hero.
8. ¿Qué **cifra** lo hace grande? Se anima con el verbo del oficio, no con un contador genérico.
9. ¿Qué tiene de **herencia**? Línea de tiempo con el tono de cada época; motivo cultural propio.
10. ¿Dónde se notará en **lo pequeño**? Cursor, viñetas, cargador, 404, favicon, divisores, pie.
11. ¿Cuáles son sus **íconos clásicos** (personaje, flota, empaque) y en qué momentos de la página aparecen?
    Se planean como momentos clave, no como adorno, y siempre con el archivo oficial del cliente.

## 3 · De palabra a capa web
| Del léxico | Capa web | Ejemplo Bimbo | Receta |
|---|---|---|---|
| Forma | Corte entre fondos, máscara de imagen, botón, favicon | Corona del pan de caja | A |
| Textura | Fondo, cargador, estado vacío | Miga (alvéolos) | B |
| Elemento repetible | Viñeta, progreso, separador | Espiga de trigo | C |
| Color de la materia | Rampa ligada al scroll, hover | Masa → dorado → tostado → corteza | D |
| Verbo de crecimiento | Curva de entrada, cifras | Levar | E |
| Verbo de corte | Transición de página o imagen | Rebanar | F |
| Lugar | Marco de video, luz de escena | Boca del horno en arco | G |
| Logística | Línea que se traza con el scroll | Ruta de reparto | H |
| Ritual | Estado del hero según la hora | Momentos del día | I |
| Magnitud física | Indicador de capítulo | Termómetro del horno | J |
| Personaje de la marca | Remate de una secuencia | Del pan al gorro, del gorro al osito | K |
| Flota / logística | Barra de avance, cargador | Camión de reparto | L |

## 4 · Recetas (todas en `assets/ejemplo-bimbo.html`)
**A · Silueta como corte y como máscara.** Dibujar la silueta una sola vez en `clipPathUnits="objectBoundingBox"`
(coordenadas 0–1) y reutilizarla con `clip-path:url(#id)` en tarjetas, fotos y botones. Para el corte entre
dos fondos, un `<svg preserveAspectRatio="none">` a todo el ancho con el mismo trazo estirado. Mantener los
"hombros" legibles en teléfono (probar a 390 px).

**B · Textura procedural con semilla fija.** Canvas con un generador `s = s*16807 % 2147483647` y semilla
constante (Bimbo: 1945) para que el dibujo sea siempre el mismo. Elipses de 3–17 px al 10–22 % de opacidad;
como fondo de texto, bajar a 6–10 %. Animar solo cuando está visible (`IntersectionObserver`).

**C · Elemento repetible como progreso.** SVG generado por JS con N piezas (granos alternados a ±32°);
"encender" las primeras k según el paso. Una sola pieza sirve de viñeta vía `mask` CSS con SVG en data-URI.

**D · Rampa de color de la materia.** 3–5 paradas (masa `#F6EEDF`, dorado `#D9A54E`, tostado `#9A5B26`,
corteza `#4E2C14`), interpoladas en RGB según `p ∈ [0,1]` del scroll o de un control. Cambiar el color del
texto cuando la luminancia baja.

**E · Curva del verbo.** Levar = `cubic-bezier(.34,1.45,.64,1)` con `scaleY(.55) scaleX(1.12)` → `none` y de
pálido a saturado, escalonado 0.12 s. Cada verbo tiene su curva y se reutiliza siempre.

**F · Transición en tajadas.** N franjas absolutas con `overflow:hidden`, cada una con una copia del mismo
contenido desplazada `top:-i*h`, entrando con `translateX(-110%) → 0` y retraso `i*70ms`.

**G · Marco de lugar.** `border-radius` grande arriba (arco), `radial-gradient` de brasa y una rejilla con
`repeating-linear-gradient` en `multiply`. Sirve para enmarcar el video del hero.

**H · Ruta.** `path` con `getTotalLength()`; `stroke-dasharray = L`, `stroke-dashoffset` de `L` a `0` según el
avance. Conecta con `mapa-relieve` cuando hay presencia por país.

**I · Momentos del día.** Cuatro estados (fondo, astro, color de texto) elegidos por `new Date().getHours()` y
seleccionables con botones `aria-pressed`.

**J · Indicador por magnitud física.** Cada sección declara `data-temp` y `data-etapa`; en `scroll` se
interpola entre la sección actual y la siguiente y se pinta un indicador fijo. En teléfono pasa a una
píldora horizontal abajo. Valores marcados como ilustrativos si no vienen del cliente.

**K · Del motivo al personaje.** El motivo protagonista se transforma en un atributo del personaje (la corona
del pan en el gorro de panadero) y un zoom out revela al personaje completo. Morph SVG entre dos trazos con
las mismas instrucciones (interpolar número por número), relleno que cambia de color y, al final,
`transform: scale()` sobre el contenedor. El personaje va en su **archivo oficial** (SVG o Lottie); sin él,
la secuencia llega hasta el atributo y marca el resto `[ilustración oficial por confirmar]`.

**L · La flota como barra de avance.** Un vehículo abstracto (caja, franja de color de marca, cabina) avanza
con el scroll en una línea fija arriba de la página o recorre paradas que se encienden. Sin logos dibujados
por nosotros; si se quiere el vehículo con su rotulación real, se pide el archivo al cliente.

## 5 · Dosis
- **1 protagonista** (se ve en el hero, en cada cambio de sección y en el botón principal).
- **2 de apoyo** (uno de textura o color, uno de movimiento).
- **Detalles en silencio** (favicon, cargador, 404, viñetas) que reutilizan los mismos tres.
- Si el cliente es corporativo/inversionista, el protagonista baja de volumen en esas páginas (solo el corte
  de sección) y la textura queda por debajo del 8 %.
- Los **íconos clásicos** (personaje, flota) se usan en momentos clave: remate del hero, Historia,
  distribución, 404. Nunca dibujados por nosotros: archivo oficial o marcador.
- Sobra: ilustración literal, personajes redibujados o usados de adorno, más de una animación por pantalla, cualquier motivo
  que empeore la carga en teléfono.
