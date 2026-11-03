# Instrucciones para la IA: llevar esta demo al nivel del sitio de Grupo PRODI

Copia este documento como primer mensaje a la IA que trabaje en este repo (Claude Code u otra). Está escrito para
que arranque sin más contexto.

---

## Tu papel
Vas a mejorar **bimbo-corporate-demo**, una demo técnica y pública de página corporativa para Grupo Bimbo
(Next.js 15, React 19, Tailwind 3.4, TypeScript). **No está afiliada a Grupo Bimbo** (ver la nota legal del
README) y nunca debe presentarse como su sitio oficial.

La meta es aplicar las técnicas del sitio que Nuclea Solutions hizo para **Grupo PRODI**: secciones ligadas al
scroll, un ciclo de etapas interactivo, un mapa de relieve con la presencia, una sección "del plano a la obra",
media ligera y vistas previas cuidadas al compartir. Toma las técnicas, no el contenido ni el look de PRODI: aquí
manda la identidad de Bimbo que ya está en `tailwind.config.ts` (`bimbo.red #E30613`, `bimbo.blue #003DA5`,
`bimbo.cream #FFF8E7`, `bimbo.dark #1A1A1A`).

## Las skills
Están en `skills/` de este repo. Lee primero `skills/README.md` y `skills/sitio-prospecto/SKILL.md`. Están
escritas para el sitio de PRODI, hecho con páginas `.dc.html` de Claude Design. Aquí el stack es Next.js, así que
usa su **lógica y sus reglas**, no su formato de archivo. Equivalencias:

| Skill | Qué tomar para este repo |
|---|---|
| `sitio-prospecto` | Reglas de trabajo, catálogo de secciones, cómo investigar al prospecto |
| `paginas-claude-design` → `references/patrones-interaccion.md` | Los patrones en sí (progreso de scroll, temporizador con pausa por hover, filas sin brincos, video perezoso), llevados a componentes `"use client"` con `useRef`/`useEffect` |
| `mapa-relieve` | `scripts/generar_relieve.py` para crear la retícula (en `public/data/`), y la API y reglas del mapa. El dibujo (`prodi-relieve.js`) es privado: pídelo al equipo de Nuclea o reimpleméntalo a partir de la skill |
| `gemelo-desde-foto` | Cómo obtener plano y foto con el mismo encuadre, y la sección web (`references/web-cortina.md`, `variantes-a-todo-el-ancho.md`) |
| `lamina-tecnica` | Lámina técnica de un activo (camión de reparto, línea de horneado) rotulada "ESQUEMA ILUSTRATIVO" |
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

## Datos para empezar (de prensa 2025, por verificar)
Las fuentes no coinciden entre sí; confirma cada dato en el informe anual más reciente.

| Dato | Valor en prensa |
|---|---|
| Fundación | 1945, Ciudad de México |
| Presencia | 91 países (39 con operación directa) según su sitio; 76 según un comunicado de sept. 2025 |
| Plantas y panaderías | 245–249 |
| Centros y puntos de venta | más de 1,500 centros; 3.3 millones de puntos de venta |
| Rutas de distribución | más de 54,000 |
| Colaboradores | alrededor de 152,000–153,000 |
| Portafolio | más de 100 marcas y 10,000 productos |
| Ventas | más de 22,000 millones de USD |

Ojo: `components/Hero.tsx` hoy dice "+30 países" y "más de 30 países", lo que no cuadra con estas fuentes.
Verifícalo y corrígelo con su fuente.

Fuentes de partida: [perfil BMV de BIMBO](https://www.bmv.com.mx/en/issuers/profile/BIMBO-5163),
[Expansión: marcas y países (nov. 2025)](https://expansion.mx/empresas/2025/11/08/marcas-de-grupo-bimbo-y-paises-en-los-que-opera),
[Expansión: marcas y países donde vende](https://expansion.mx/empresas/2025/11/07/marcas-de-grupo-bimbo-y-paises-donde-vende).

## Propuesta de secciones (para validar en un issue)
La Home actual tiene `Hero`, `Values`, `Brands`, `Sustainability` y `Footer`. Propuesta de orden y mejoras:

1. **Hero** con video ligero (horneado o reparto) y póster inmediato; versión vertical para teléfono.
2. **Cifras** que cuentan al entrar en pantalla, con fuente.
3. **"Del campo a la mesa"**: ciclo de 5 etapas (abastecimiento, horneado, distribución, punto de venta,
   sostenibilidad) con un ejemplo real en cada una. Avanza solo y se pausa mientras el mouse está encima
   (patrón 2 de `patrones-interaccion.md`).
4. **Presencia en relieve**: México con sus plantas, o México + Centroamérica. Para la presencia global no hay un
   solo mapa de América (es demasiado ancho): usa dos mapas o un mapa plano.
5. **Marcas** como fila horizontal guiada por el scroll (ecosistema de PRODI).
6. **Del plano a la obra** de una planta real a partir de una foto aérea oficial.
7. **Sostenibilidad** con datos y fuente.
8. **Footer**.

## Primer paso
1. Lee `skills/README.md`, `skills/sitio-prospecto/SKILL.md` y sus referencias.
2. Llena `docs/investigacion.md` con los datos confirmados.
3. Abre un issue con la propuesta de secciones, el guion de la Home (titular, texto y animación de cada sección)
   y la lista de material que necesitas: logo en vector, fotos o videos con derechos, foto aérea de una planta.
4. Implementa sección por sección, un PR por sección, con capturas de escritorio y teléfono.
