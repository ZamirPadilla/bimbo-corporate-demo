# Instrucciones para la IA: llevar esta demo al nivel del sitio de referencia

Copia este documento como primer mensaje a la IA que trabaje en este repo (Claude Code u otra). Está escrito para
que arranque sin más contexto.

---

## Tu papel
Vas a mejorar **bimbo-corporate-demo**, una demo técnica y pública de página corporativa para Grupo Bimbo
(Next.js 15, React 19, Tailwind 3.4, TypeScript). **No está afiliada a Grupo Bimbo** (ver la nota legal del
README) y nunca debe presentarse como su sitio oficial.

La meta es aplicar las técnicas del sitio que Nuclea Solutions hizo como **sitio de referencia**: secciones ligadas al
scroll, un ciclo de etapas interactivo, un mapa de relieve con la presencia, una sección "del plano a la obra",
media ligera y vistas previas cuidadas al compartir. Toma las técnicas, no el contenido ni el look del sitio de referencia: aquí
manda la identidad de Bimbo que ya está en `tailwind.config.ts` (`bimbo.red #E30613`, `bimbo.blue #003DA5`,
`bimbo.cream #FFF8E7`, `bimbo.dark #1A1A1A`).

## Las skills
Están en `skills/` de este repo. Lee primero `skills/README.md` y `skills/sitio-prospecto/SKILL.md`. Están
escritas para el sitio de referencia, hecho con páginas `.dc.html` de Claude Design. Aquí el stack es Next.js, así que
usa su **lógica y sus reglas**, no su formato de archivo. Equivalencias:

| Skill | Qué tomar para este repo |
|---|---|
| `sitio-prospecto` | Reglas de trabajo, catálogo de secciones, cómo investigar al prospecto |
| `paginas-claude-design` → `references/patrones-interaccion.md` | Los patrones en sí (progreso de scroll, temporizador con pausa por hover, filas sin brincos, video perezoso), llevados a componentes `"use client"` con `useRef`/`useEffect` |
| `mapa-relieve` | `scripts/generar_relieve.py` para crear la retícula (en `public/data/`), y la API y reglas del mapa. El dibujo (`sitio-relieve.js`) es privado: pídelo al equipo de Nuclea o reimpleméntalo a partir de la skill |
| `gemelo-desde-foto`, `lamina-tecnica` | Skills internas de Nuclea (producción 3D), no incluidas en este repo: plano → obra y láminas técnicas de un activo (camión de reparto, línea de horneado). Pedirlas al equipo si se usan |
| `media-web-ligera` | `video_web.sh`, `foto_web.py` y las metas de peso. El repo es público y GitHub limita archivos a 100 MB: media ligera o en almacenamiento externo |
| `vista-previa-compartir` | Las **reglas** de íconos y vistas previas. En Next usa la Metadata API (`metadata.openGraph` en `app/layout.tsx`), `app/opengraph-image.tsx` con `next/og`, `app/icon.svg` y `app/apple-icon.png` (cuadrado y opaco) en vez de `generar.py` |
| `verificar-en-navegador` | Cómo probar animaciones, canvas y hover midiendo con JS, en escritorio y teléfono |
| `publicar-vercel` | La parte de Vercel; este repo es público, así que no aplica la página de contraseña salvo que el dueño la pida |
| `fusion-disenos-git` | Solo si alguien trae diseños de Claude Design para portarlos |

## Reglas (no negociables)
1. **Paso a paso.** Para cambios grandes, abre primero un issue con la propuesta (lo pide `CONTRIBUTING.md`) y
   espera el visto bueno.
2. **Datos reales con fuente.** Toda cifra, año, marca, planta o país debe salir de una fuente pública de Bimbo:
   el sitio oficial, el informe anual, los comunicados en la BMV o la sala de prensa. Anota cada dato con su URL en
   `docs/investigacion.md`. Si falta, deja `[dato por confirmar]`. No inventes citas de directivos, comunicados,
   voceros ni datos de contacto; usa texto de muestra marcado. La única excepción son las láminas rotuladas
   "ESQUEMA ILUSTRATIVO".
3. **Marca.** Logotipo y fotos solo de fuentes oficiales (kit de prensa) o con permiso. Nada de logos redibujados,
   ni fotos escaladas con IA donde aparezcan logos o letreros.
4. **No afiliada.** En títulos, metadatos y vistas previas debe leerse que es una demo (p. ej. "Demo · Grupo
   Bimbo"), nunca como el sitio oficial.
5. **Teléfono es otro diseño.** Revisa a 375 px y en escritorio; lo que se encime en teléfono se oculta.
   `prefers-reduced-motion` desactiva temporizadores y efectos.
6. **Flujo del repo.** Rama `feat/…`/`fix/…`/`docs/…`, Conventional Commits, PR con la plantilla. Antes de abrir
   el PR: `npm run lint` y `npm run build` (los corre el CI).

## Datos: usa `content/cifras.ts`
Las cifras ya están validadas con el **Informe Anual 2025** de Grupo Bimbo (publicado en septiembre de 2026, con cifras al
cierre de 2025). Cuando su sitio se contradice, manda el informe. No escribas cifras a mano en los componentes:
impórtalas de `content/cifras.ts`, que trae el valor, la fecha de corte y la fuente de cada una.

| Dato | Valor (Informe Anual 2025) |
|---|---|
| Fundación | 1945, Ciudad de México |
| Presencia | 93 países: operación directa en 39 y otros 54 con socios estratégicos |
| Panaderías y plantas | 249 (75 en Norteamérica, 38 en México, 94 en EAA, 42 en Latinoamérica) |
| Centros de ventas | más de 1,700 |
| Rutas de distribución | más de 54,000 |
| Colaboradores | más de 153,000 |
| Portafolio | más de 100 marcas y más de 9,000 productos |

Las decisiones y su justificación están en `docs/copy/05-decisiones.md`. El copy de cada página propuesta está en
`content/paginas.ts` (ver `/wireframes` y `/demo` en la app).

Ojo: `components/Hero.tsx` hoy dice "+30 países", "+140K colaboradores" y "Más de 75 años"; `components/Values.tsx`
usa valores que no son las creencias oficiales. Corrígelos con `content/cifras.ts` y el copy de Nosotros.

## Propuesta de secciones (para validar en un issue)
La Home actual tiene `Hero`, `Values`, `Brands`, `Sustainability` y `Footer`. Propuesta de orden y mejoras:

1. **Hero** con video ligero (horneado o reparto) y póster inmediato; versión vertical para teléfono.
2. **Cifras** que cuentan al entrar en pantalla, con fuente.
3. **"Del campo a la mesa"**: ciclo de 5 etapas (abastecimiento, horneado, distribución, punto de venta,
   sostenibilidad) con un ejemplo real en cada una. Avanza solo y se pausa mientras el mouse está encima
   (patrón 2 de `patrones-interaccion.md`).
4. **Presencia en relieve**: México con sus plantas, o México + Centroamérica. Para la presencia global no hay un
   solo mapa de América (es demasiado ancho): usa dos mapas o un mapa plano.
5. **Marcas** como fila horizontal guiada por el scroll (ecosistema del sitio de referencia).
6. **Del plano a la obra** de una planta real a partir de una foto aérea oficial.
7. **Sostenibilidad** con datos y fuente.
8. **Footer**.

## Primer paso
1. Lee `skills/README.md`, `skills/sitio-prospecto/SKILL.md` y sus referencias, y `skills/benchmark-inspiracion/` antes de fijar el sistema visual.
2. Lee `docs/INDICE.md` (decisiones, dudas vigentes y benchmark) y `docs/copy/` antes de escribir copy nuevo.
3. Abre un issue con la propuesta de secciones, el guion de la Home (titular, texto y animación de cada sección)
   y la lista de material que necesitas: logo en vector, fotos o videos con derechos, foto aérea de una planta.
4. Implementa sección por sección, un PR por sección, con capturas de escritorio y teléfono.
