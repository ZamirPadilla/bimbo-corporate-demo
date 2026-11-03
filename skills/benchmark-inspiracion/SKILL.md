---
name: benchmark-inspiracion
description: Benchmark de inspiración para la demo de un prospecto — busca referencias premiadas en Awwwards, destila el léxico del cliente (formas, texturas, verbos y magnitudes de su proceso) en un kit de motivos abstractos repartidos por la página (fondos de dos tonos con la silueta del producto, texturas, viñetas, cargadores, transiciones, indicadores) y define el carácter de cada página (home clara, productos para explorar, historia con scroll y animación rica). Entrega una página HTML de benchmark. Úsala cuando pidan "benchmark de inspiración", "referencias en Awwwards", "qué hacen los mejores sitios de X", "diferenciador para la demo", "abstracciones de la marca" (el pan, el horno, el trigo; el acero, la obra, el agua…), "que se note la marca en los detalles", "cada página con su propio flujo y UI", "nivel Webflow pero personalizado", o al arrancar el diseño de un prototipo de `sitio-prospecto`.
---

# Benchmark de inspiración y motivos de marca

Una demo convence cuando el cliente siente que el sitio solo puede ser suyo. Eso no lo logra el logo: lo
logra que su materia prima, su oficio y su ritmo se filtren en lo pequeño — el corte entre dos fondos, la
textura detrás del texto, la viñeta de una lista, el cargador, la manera en que entra una cifra. Esta skill
convierte esa intuición en un método repetible en dos partes: **mirar afuera** (qué marca la pauta en
Awwwards y en el sector) y **mirar adentro** (qué abstracciones salen del negocio del cliente).

El ejemplo completo es Grupo Bimbo (`assets/ejemplo-bimbo.html`, se abre directo en el navegador; las
imágenes de referencias viven en `~/Factory/bimbo/benchmark-inspiracion/refs/`).

## Flujo

### 1 · Encuadrar (10 min, con el usuario)
- ¿Qué decide el cliente con esta demo y quién la ve? (p. ej. Arquitectura y Estándares vs. Comunicación).
- ¿Qué tono pide la marca? Corporativo sobrio, consumo juguetón, industrial preciso.
- ¿Hay sitio de referencia interno? (PRODI, otra demo). Si sí, el benchmark lo complementa, no lo reemplaza.

### 2 · Mirar afuera: Awwwards y pares
Método detallado y snippets en `references/metodo-awwwards.md`. Resumen:
- Buscar por categoría (`/websites/food-drink/`) y por texto (`/websites/?text=bread`), con 6–12 términos
  del léxico del cliente en inglés (materia prima, producto, proceso, industria).
- Leer la ficha de cada sitio con `fetch` desde una pestaña de awwwards.com (el título dice el premio:
  `SOTD`, `Honorable Mention`, `Nominee`; la fecha y el enlace "Visit" están en la ficha). ~1 s entre fichas.
- Quedarse con 12–18: premiados primero, últimos 18 meses primero, y siempre 2–3 que sean **del mismo tipo
  de empresa** (corporativo, fabricante B2B) aunque sean menos vistosos.
- Usar la captura oficial de Awwwards (`og:image`) como miniatura y revisarlas en hoja de contactos
  (`scripts/hoja-contactos.py`); describir solo lo que se ve o lo que dice la ficha. Si un sitio no se pudo
  abrir o la captura del panel salió en negro, decirlo — no inventar la técnica.
- Agregar 2–3 pares directos del cliente (competidores) si el usuario los pide; el benchmark de pares
  técnico vive en la auditoría (`auditoria-grupobimbo/` es el ejemplo).

### 3 · Mirar adentro: léxico y motivos
Marco completo en `references/lexico-y-motivos.md`:
- Pasar el negocio por **seis lentes** — Materia (forma, textura, color), Proceso (verbos → movimiento),
  Lugar (espacios → composición), Ritual (momento de uso → narrativa), **Íconos** (los clásicos de la marca:
  su personaje, su flota, su empaque; obligatoria) y Escala (cifras).
- Responder las **once preguntas** (qué transforma, qué forma se reconoce sin logo, qué magnitud física tiene
  su proceso, etc.).
- Traducir cada palabra a una **capa web**: forma → máscara/divisor/botón; textura → fondo/cargador;
  color de la materia → rampa; verbo → curva de animación/transición; magnitud → indicador de avance;
  lugar → marco/composición; ritual → estado del hero; cifra → entrada de números.
- Elegir **un motivo protagonista y dos de apoyo**. El resto, silencio.

### 3b · Darle a cada página su carácter
Detalle en `references/caracter-por-pagina.md`. Lo que une al sitio es el kit de motivos; lo que cambia de
página a página es el flujo, la estructura, la interfaz y **cuánto** se expresa:
- **Home:** claridad. Intensidad 2: pocas secciones, salidas por audiencia, el motivo solo en los cortes.
- **Marcas / productos:** exploración. Intensidad 3–4: filtros, tarjetas vivas, y el color lo pone cada
  marca; el sitio se vuelve neutro.
- **Historia:** experiencia. Intensidad 5: scroll narrativo, línea de tiempo, secciones pegajosas, todo el
  kit. Quien llega ahí ya quiere saber más.
- **Inversionistas, prensa, trámites:** intensidad 1–2, directo al documento o al formulario.
Escribir en el guion de cada página: audiencia, intención, intensidad (1–5), flujo en una frase y la interfaz
que la distingue. Si dos páginas comparten estructura, una de las dos está mal pensada.

### 4 · Construir la página de benchmark
- Copiar `assets/ejemplo-bimbo.html` como plantilla: hero con el motivo protagonista ya aplicado, léxico,
  referencias (arreglo `REFS`), ocho patrones, kit de motivos en vivo, dosis y tabla "sección → motivo".
- La página misma debe usar los motivos (el termómetro que se enfría, el corte con la silueta): es la mejor
  prueba de que funcionan.
- Paleta y tipografía: sacarlas de la hoja de estilos pública del cliente (ver `metodo-awwwards.md`,
  "Paleta real del cliente") y anotarlas en el pie con su fuente.
- Verificar en escritorio y teléfono con Playwright o `verificar-en-navegador` (las capturas del panel
  integrado no siguen el scroll; medir con JS).

### 5 · Entregar
- La página (`benchmark-inspiracion/index.html` + `refs/`) y un resumen de 5 líneas: motivo protagonista,
  dos de apoyo, tres referencias clave y dónde va cada motivo en la demo.
- Complementar con el repositorio de contenido oficial del cliente (skill `repositorio-contenido` del plugin
  `nuclea-demo-kit`): videos, fotos y elementos icónicos como los camioncitos de juguete de Bimbo.
- Pasar los motivos elegidos a `sitio-prospecto` (sistema visual) y a las secciones de `paginas-claude-design`.

## Reglas
1. **Abstracto, no literal.** Si un elemento parece clipart, emoji o icono de app de recetas, sobra. La
   prueba: tapa el logo; ¿se adivina la industria? ¿se ve elegante?
2. **Disciplina de repetición.** El motivo protagonista se usa siempre igual (misma curva, mismo radio, misma
   animación) para que se aprenda como firma.
3. **Color de la materia, acento de la marca.** Los tonos de la materia prima (masa, dorado, acero, tierra)
   hacen el ambiente; los colores de marca quedan para acción y énfasis.
4. **Lo pequeño cuenta doble:** favicon, cursor, cargador, 404, viñetas, pie de página.
5. **Ligero y accesible.** SVG, CSS y canvas pequeño antes que video o WebGL; `prefers-reduced-motion`
   siempre; contraste AA sobre las texturas.
6. **Los íconos clásicos son básicos, y van con archivo oficial.** El personaje y la flota de la marca (en
   Bimbo, el Osito y los camiones) siempre entran al benchmark como momentos clave: remate del hero,
   historia, distribución, 404. Nunca se redibujan ni se usan de adorno: se piden los archivos al cliente y,
   mientras, van marcadores. Tampoco el logo en el benchmark.
7. **Datos marcados.** Cifras y valores de proceso (temperaturas, tiempos) que no estén verificados van como
   "ilustrativos" o `[dato por confirmar]`, igual que en `sitio-prospecto`.
8. **Intensidad según intención.** La home es la más clara, no la más animada; la complejidad se gana en las
   páginas a las que solo llega quien está interesado (historia, proceso).
9. **Inspiración, no copia.** De cada referencia se toma el principio ("la materia es el fondo"), nunca su
   composición, ilustración o código.

## Archivos
- `references/metodo-awwwards.md` — búsquedas, lectura de fichas, filtros, capturas, paleta del cliente.
- `references/lexico-y-motivos.md` — cinco lentes, diez preguntas, tabla palabra → capa web, recetas de
  motivos con código (silueta como corte, textura procedural, espiga/progreso, rampa de color, curva de
  "levado", transición en tajadas, ruta, momentos del día, indicador por magnitud física), dosis.
- `references/caracter-por-pagina.md` — presupuesto de expresión por página: audiencia, intensidad 1–5,
  flujo, interfaz propia, color y motivos para home, marcas, historia, manufactura, presencia,
  sustentabilidad, inversionistas, prensa, trámites y 404.
- `references/patrones-awwwards.md` — los ocho patrones que se repiten en sitios premiados de alimentos y
  oficio, con sus referencias (noviembre de 2026).
- `references/ejemplo-bimbo.md` — el caso completo: léxico, motivo protagonista, mapa de secciones.
- `scripts/awwwards-buscar.js` — snippet para pegar en la consola de awwwards.com (o `javascript_tool`).
- `scripts/hoja-contactos.py` — hoja de contactos de las miniaturas para revisarlas de un vistazo.
- `assets/ejemplo-bimbo.html` — plantilla de la página de benchmark.
