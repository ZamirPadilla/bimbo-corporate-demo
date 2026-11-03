# bimbo-corporate-demo — instrucciones para la IA y para quien contribuya

Este archivo es la **única fuente de instrucciones** del repo. Si otro documento o una skill dice algo distinto,
manda este archivo. Si algo no está aquí ni en las fuentes de verdad de abajo, pregunta antes de decidirlo.

## Qué es
Demo **pública** de un sitio corporativo para Grupo Bimbo: Next.js 15 (App Router), React 19, Tailwind 3.4 y
TypeScript. **No está afiliada a Grupo Bimbo.** En títulos, metadatos y vistas previas debe leerse que es una demo,
con la forma `<Página> · Demo Grupo Bimbo`, y nunca como el sitio oficial. No hay contraseña ni página de acceso:
el repo y la demo son abiertos.

## Fuentes de verdad
| Qué | Dónde | Regla |
|---|---|---|
| Mapa del sitio y copy | `content/paginas.ts` | 8 páginas: inicio, nosotros, marcas, sustentabilidad, inversionistas, prensa, carreras, contacto. Sin otras páginas ni secciones sin pasar por un issue |
| Cifras | `content/cifras.ts` | Validadas con el Informe Anual 2025. En el texto van como `{idCifra}` y se resuelven con `content/resolver.ts`. **Ninguna cifra a mano**, tampoco en `metadata`, textos alternativos, contadores ni líneas de tiempo. Un dato nuevo entra primero a `cifras.ts` con su fuente |
| Decisiones y dudas | `content/indice.ts` y `docs/copy/05-decisiones.md` | Lo que está como duda sigue abierto: no se resuelve inventando |
| Colores, tipografía y medidas | `tailwind.config.ts` | No se escriben colores hex sueltos en los componentes |
| Sistema visual | Manual de identidad de referencia 2025 (abstraído del Informe Anual Integrado 2025) | Claro y cálido, un color por pilar en bloques completos y sin degradados. Tipografía Outfit; Poleno para títulos y cifras cuando haya licencia web |

Se generan con `npm run copy:docs` y no se editan a mano: `docs/INDICE.md`, `docs/copy/02-fuente-unica-de-cifras.md`,
`docs/copy/04-copy-deck.md` y `docs/copy/05-decisiones.md`. Para trabajar, lee `content/`, no estos documentos.

Son **inspiración, no reglas**: `docs/contexto/CONTEXTO.md` (sus colores y tipografías de las secciones 7.3 y 7.4
quedaron superados por el manual de 2025), `docs/benchmark/` y `docs/ideas/` (ideas sin aprobar).

## Marca y material
- **El logotipo, el Osito, los camiones y los empaques no se redibujan ni se aproximan**, ni se usan como adorno
  o textura. Hasta tener el archivo oficial va un marcador visible (`[logo oficial]`, `[osito oficial]`).
- Fotos y videos solo de fuentes oficiales de Bimbo o con permiso. No uses fotos escaladas con IA donde haya
  logos o letreros. Las fotos de terceros (por ejemplo, camioncitos de juguete de vendedores) son solo
  referencia y nunca se publican.
- Al recortar o encuadrar no cortes personas, productos ni logos. Ante la duda, `object-fit: contain` o el
  original completo.
- No inventes citas de directivos, comunicados, voceros ni datos de contacto: usa texto de muestra marcado
  (`[cita de muestra]`, `[correo de prensa por confirmar]`).
- El repo es público: aquí no entra material interno de Nuclea, IDs del drive (`BMB-…`), rutas locales ni
  material con derechos por confirmar.

## Diseño
- **Intensidad por página** (1 = sobria, 5 = narrativa rica): Inicio 2 (es la más clara, no la más animada),
  Nosotros e historia 5, Marcas 4, Sustentabilidad 3, Carreras 2, Inversionistas, Prensa y Contacto 1.
- **El teléfono es otro diseño.** Revisa cada sección a 375 px y en escritorio. Lo que se encime en el teléfono
  se oculta, no se achica.
- `prefers-reduced-motion` desactiva temporizadores y efectos y deja el estado final directo.
- Media ligera: video H.264 con póster y versión vertical para el teléfono, fotos JPEG progresivas. GitHub
  limita cada archivo a 100 MB.
- Vistas previas e íconos con la Metadata API de Next (`metadata.openGraph`, `app/opengraph-image.tsx`,
  `app/icon.svg`, `app/apple-icon.png` cuadrado y opaco).

## Flujo de trabajo
1. Un cambio grande empieza con un issue que traiga la propuesta. Espera el visto bueno antes de construir.
2. Rama `feat/…`, `fix/…` o `docs/…`, Conventional Commits y un PR por sección, con capturas de escritorio y
   teléfono.
3. Antes del PR: `npm run lint` y `npm run build` (los corre el CI). Si tocaste `content/`, corre también
   `npm run copy:docs`.

## Skills de `skills/`
Úsalas solo cuando la tarea lo pida. Están adaptadas a Next y a esta demo.

| Skill | Cuándo |
|---|---|
| `interacciones-scroll` | Secciones ligadas al scroll, etapas con temporizador y hover, filas que se expanden, video perezoso |
| `verificar-en-navegador` | Después de cada cambio visible: medir con JS en escritorio y teléfono |
| `media-web-ligera` | Al recibir video o fotos: `video_web.sh`, `foto_web.py` y metas de peso |
| `vista-previa-compartir` | Metadatos, imagen para compartir e íconos con la Metadata API |
| `mapa-relieve` | Sección Presencia de Inicio: qué mapa proponer, generador de la retícula y reglas. El dibujo es privado; pídelo al equipo de Nuclea |
| `media-drive-ia` | Solo si tienes acceso al shared drive de Bimbo: se opera únicamente con `media_db.py` |

Las demás técnicas (copy, wireframes, benchmark, manual de identidad, producción 3D) ya se aplicaron y viven en
el plugin privado de Nuclea. Sus resultados están en `content/` y `docs/`.
