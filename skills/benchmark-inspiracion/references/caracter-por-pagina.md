# Cada página con su propio carácter

Un sitio de nivel Webflow/Awwwards no es una plantilla repetida con distinto texto: cada página tiene **su
propio flujo, su propia estructura y su propia interfaz**, ajustados a quién llega ahí y para qué. Lo que
une al sitio es el kit de motivos (la silueta, la textura, la curva del verbo); lo que cambia es **cuánto**
se expresa y **cómo** se navega.

La regla de fondo: **la intensidad sube con la intención del visitante.** A la home llega todo el mundo,
con prisa y sin contexto: claridad. A Historia solo llega quien ya quiere saber más: ahí sí, darse vuelo.

## Presupuesto de expresión
Escala de 1 (sobrio) a 5 (experiencia). Definirlo por página **antes** de diseñar y anotarlo en el guion.

| Página | Quién llega y qué quiere | Intensidad | Flujo y estructura | Interfaz propia | Color | Motivos |
|---|---|---|---|---|---|---|
| **Home** | Todos; entender quién es en 10 s y a dónde ir | 2 | Pocas secciones, cortas; una idea por pantalla; salidas claras por audiencia | Navegación evidente, CTA por audiencia (consumidor, inversionista, proveedor, candidato, prensa) | Marca + papel; mucho blanco | Protagonista en el corte del hero y entre secciones; remate con el personaje de la marca |
| **Marcas / productos** | Encontrar una marca o un producto | 3–4 | Exploración, no lectura: filtrar, comparar, saltar | Catálogo con filtros (país, categoría, momento del día), tarjetas con hover vivo, vista de detalle | **Cada marca trae su color**; el sitio se vuelve neutro para que el producto mande | Máscara de la silueta en tarjetas; ingredientes que flotan en el detalle |
| **Historia** | Interesados reales; tienen tiempo | 5 | Scroll narrativo largo, por capítulos; línea de tiempo que se recorre | Secciones pegajosas (`sticky`), años que cambian, fotos de archivo que se revelan, ritmo de "documental" | Rampa de época (sepia → color actual) | Todo el kit: espiga como línea de tiempo, tostado por décadas, transiciones en tajadas |
| **Cómo se hace / manufactura** | Curiosos, prensa, talento técnico | 4 | Proceso paso a paso; un indicador del oficio guía el avance | Indicador por magnitud física (temperatura, tiempo), video enmarcado, pasos numerados | Cálidos del proceso sobre fondo oscuro | Termómetro, marco del horno, verbo del oficio |
| **Presencia / distribución** | Inversionistas, prensa | 3 | Mapa primero, cifras después | Mapa de relieve interactivo, filtro por región, ruta que se traza | Neutro + acento por región | La flota recorriendo la ruta, cifras que levan |
| **Sustentabilidad** | Inversionistas ESG, prensa, ONG | 3 | Metas → avance → evidencia; descargable al final | Indicadores de meta, gráficas simples, informe en PDF a un clic | Tonos de campo (verde, dorado) | Surcos, espiga como progreso |
| **Inversionistas** | Analistas; buscan un documento | 1 | Directo a reportes, calendario y contacto; sin preámbulo | Tablas, filtros por año (solo años con contenido), descargas con peso | Sobrio: tinta y un acento | Solo el corte de sección; textura bajo el 8 % |
| **Prensa** | Periodistas; buscan la nota y la cifra oficial | 1–2 | Lista editorial por fecha y categoría; ficha de cifras oficiales | Retícula editorial, kit de prensa descargable | Neutro | Mínimos |
| **Proveedores / Únete** | Alguien con un trámite | 1–2 | Directo al formulario o a la plataforma externa | Pasos claros, requisitos en lista | Marca | Viñeta del kit; nada que distraiga |
| **404 / estados vacíos** | Alguien perdido | 3 | Una salida útil y un guiño | Micro-juego breve o animación del verbo (IGIN) | Marca | Textura animada ("esta página no levó") |

## Cómo aplicarlo
1. En el guion de cada página (`sitio-prospecto`, paso 2) escribir: audiencia, intención, intensidad (1–5),
   flujo en una frase y la interfaz propia que la distingue. Si dos páginas tienen la misma estructura,
   una de las dos está mal pensada.
2. Probar cada página con la pregunta "¿qué quiere hacer aquí el visitante en los primeros 5 segundos?". La
   interfaz responde a eso; la animación viene después.
3. La intensidad alta exige más cuidado técnico: secciones pegajosas con alto de 300–440 vh, versión de
   teléfono propia, `prefers-reduced-motion` con estado final directo, y medir el peso (no pasar de ~2 MB en
   la primera vista en teléfono).
4. **Inspiración, no copia.** De Awwwards se toma el principio (p. ej. "el proceso es la barra de avance"),
   nunca la composición, la ilustración ni el código de otro sitio.

## Referencias por intensidad (de `patrones-awwwards.md`)
- Intensidad 1–2 (claridad): Delta Cafés (corporativo), Lajoya (editorial), Kindi Land (fabricante).
- Intensidad 3–4 (exploración/proceso): Impasto Forno Antico (lista que revela producto), Hozon
  (ingredientes en órbita), Shorodo (indicador del oficio).
- Intensidad 5 (experiencia): Shorodo (eras desde 1877), Mâm Cơm (ornamento cultural), TÒPAS y Morpho
  (producto que se arma o viaja con el scroll).
