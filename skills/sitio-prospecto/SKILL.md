---
name: sitio-prospecto
description: Arma el prototipo de sitio corporativo para un prospecto de Nuclea (Bimbo, un grupo industrial, una constructora, un fondo) tomando como referencia el sitio de referencia. Cubre investigación del cliente, mapa del sitio, sistema visual, catálogo de secciones probadas (hero con video, ciclo con etapas, mapa de relieve, plano → obra, listado de activos, cifras, historia, ecosistema), forma de trabajo paso a paso con el usuario y qué skill usar en cada etapa. Úsala siempre que pidan "un sitio como el del sitio de referencia para…", "prototipo para un prospecto", "propuesta web para Bimbo / otro cliente", "arranca el sitio de X", "toma de referencia la página del sitio de referencia", o cuando haya que planear o coordinar un sitio corporativo nuevo aunque no mencionen el sitio de referencia.
---

# Sitio corporativo para un prospecto (referencia: un sitio de Nuclea)

El sitio de referencia es el ejemplo vivo de lo que esta serie de skills sabe hacer: un sitio corporativo
oscuro y editorial, con animaciones ligadas al scroll, planos técnicos que se convierten en obra, un mapa de
relieve con presencia y media ligera. Esta skill coordina el trabajo; cada técnica vive en su propia skill.

## Dónde está la referencia
- Código: repo privado de Nuclea (rama `fusion/sitio`, carpeta `prototipo/`); pedir acceso al equipo. La media
  pesada no está en git, vive en un bucket privado; los modelos Blender también son privados.
- Sitio en línea: URL privada con contraseña; pedirla al equipo de Nuclea.
- `references/catalogo-secciones.md`: cada sección probada, qué hace, en qué archivo y línea buscarla y cómo
  adaptarla. Léela antes de proponer el mapa del sitio.
- `references/sistema-visual.md`: paleta, tipografía, medidas y reglas de composición.

## Cómo trabajar con el usuario (lo aprendido en el sitio de referencia)
Estas reglas salen de correcciones reales; seguirlas ahorra vueltas:
1. **Paso a paso.** Proponer el plan y avanzar sección por sección. El usuario dicta el orden; no fusionar,
   reemplazar ni publicar nada que no haya pedido.
2. **Mostrar antes de montar.** Antes de agregar un plano, una foto o un render, enseñarlo y esperar el sí
   ("ese es el correcto, ahora agrégalo").
3. **Reusar antes de rehacer.** Si ya existe un modelo Blender, un plano o una sección parecida, partir de
   ahí. Si no se encuentra lo que el usuario dice que existe, detenerse y preguntar.
4. **Datos reales o marcados.** Cifras, años, nombres de proyectos y ubicaciones deben salir de fuentes
   públicas del cliente (sitio oficial, informe anual, sala de prensa). Si falta un dato, dejar un
   marcador visible (`[dato por confirmar]`) en vez de inventarlo, y listarlo al final. Lo mismo con
   **personas y palabras**: no escribir citas atribuidas a directivos, comunicados de prensa, nombres de
   voceros, correos ni teléfonos que no sean públicos; en su lugar, texto de muestra marcado como tal
   (`[cita de muestra]`, `contacto@ejemplo`). Única excepción: láminas técnicas rotuladas "ESQUEMA ILUSTRATIVO".
5. **Teléfono es otro diseño.** Revisar cada sección en 375 px y en escritorio. En teléfono se ocultan los
   textos que se enciman en vez de apretarlos.
6. **Nada público sin permiso.** Los prototipos van privados (Vercel con protección o contraseña). Confirmar
   costos antes de crear recursos de pago.
7. **Probar en una pestaña propia** y dejar la del usuario como estaba (ver `verificar-en-navegador`).
8. **Es una propuesta, no el sitio del cliente.** En títulos, página de acceso y vistas previas debe leerse
   "Prototipo para …" o "Propuesta …"; nunca presentarlo como el sitio oficial del prospecto.

## Flujo
### 1 · Investigar al prospecto
- Giro, historia (año de fundación, hitos), cifras públicas, presencia (países, plantas, oficinas), marcas o
  unidades de negocio, proyectos emblemáticos, tono de su comunicación.
- Reunir fuentes con URL. Guardar un `investigacion.md` en el proyecto con cada dato y su fuente.
- Leer el **último informe anual** del cliente: cuando su sitio se contradice, manda el informe (en Bimbo,
  el sitio decía 96 y 102 países; el Informe Anual 2025, 93).
- Pedir al usuario el material que solo él tiene: logo en vector, fotos o videos con derechos, renders.

### 2 · Mapa del sitio y guion
- Partir del mapa del sitio de referencia (Home, Nosotros, unidades de negocio, Activos, Medios, Contacto) y traducirlo al
  negocio del prospecto. Cada página es una secuencia de secciones del catálogo.
- Escribir el guion de la Home sección por sección (titular, texto, qué animación) y validarlo con el
  usuario antes de diseñar.
- Si el cliente ya tiene sitio, el copy sale de cuestionar el actual: `copy-corporativo` (inventario,
  revisión crítica, fuente única de cifras, arquitectura y voz, copy deck). Los wireframes navegables se
  generan desde ese copy con `wireframes-desde-copy`.

### 3 · Sistema visual
- Antes de fijar color y tipografía: `benchmark-inspiracion` (referencias en Awwwards, léxico del cliente,
  motivos abstractos y la intensidad de cada página: home clara, productos exploratorios, historia viva).
- Adaptar `references/sistema-visual.md` a la marca del prospecto: conservar la estructura (fondo oscuro de
  tinta, texto claro, un acento, tipografía Geist + Geist Mono para rótulos) y cambiar acento y logo. Si la
  marca es clara y cálida, invertir a fondo papel con tinta y probar contraste.

### 4 · Construir páginas
- Formato de página: `paginas-claude-design` (archivos `.dc.html` que también abre Claude Design).
- Si dos personas trabajan en paralelo (una en Claude Design, otra en local): `fusion-disenos-git`.
- Secciones especiales:
  - plano → obra con un edificio real y lámina técnica de un activo: skills internas de Nuclea
    (`gemelo-desde-foto`, `lamina-tecnica`), no incluidas en este repo; pedirlas al equipo.
  - mapa de presencia en relieve: `mapa-relieve` (sirve para cualquier país o región).
- Patrones de interacción (temporizadores, hover, carruseles, scroll): `paginas-claude-design`, en
  `references/patrones-interaccion.md`.

### 5 · Media
- Videos H.264 ligeros con versión para teléfono, fotos JPEG progresivas, nombres versionados y respaldo
  en un bucket: `media-web-ligera`.

### 6 · Verificar
- En navegador, en escritorio y teléfono, midiendo con JS: `verificar-en-navegador`.

### 7 · Compartir y publicar (en este orden)
- Thumbnail, título e íconos para que el enlace se vea bien en WhatsApp/Slack: `vista-previa-compartir`.
- URL privada para el equipo y URL con contraseña para el cliente: `publicar-vercel`.

## Entregables al cerrar una etapa
- Qué quedó hecho y dónde verlo (URL y página), qué falta y qué datos siguen marcados por confirmar.
- Commits pequeños por sección, con mensaje que diga qué cambió y por qué.
