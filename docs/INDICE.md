# Índice de la demo

> Generado por `npm run copy:docs` desde `content/`. No editar a mano: editar `content/paginas.ts` o `content/cifras.ts`.

**Estado:** Copy y wireframes listos; sigue el diseño visual. · Actualizado el 3 de noviembre de 2026 · Rama `main` · [PR](https://github.com/ZamirPadilla/bimbo-corporate-demo/pull/2) · Versión navegable: `npm run dev` y abrir `/demo`.

> Propuesta de sitio corporativo. No es el sitio oficial ni está afiliada a Grupo Bimbo.

## Documentación

- [Cómo se trabajó el copy](copy/README.md): Método, documentos y cómo editar el copy.
- [Revisión crítica del copy actual](copy/01-revision-critica.md): Ocho problemas de fondo, 15 correcciones de redacción.
- [Fuente única de cifras](copy/02-fuente-unica-de-cifras.md): Cada cifra con su valor, su fuente y dónde aparece hoy (generado).
- [Arquitectura y voz](copy/03-arquitectura-y-voz.md): Audiencias, mapa del sitio y guía de estilo.
- [Copy deck](copy/04-copy-deck.md): El copy de las 8 páginas, sección por sección (generado).
- [Decisiones tomadas](copy/05-decisiones.md): Las seis decisiones abiertas, resueltas con el reporte del 3T26 y el Informe Anual 2025.
- [Contexto creativo](contexto/CONTEXTO.md): Diagnóstico, intención, concepto y lenguaje visual del equipo creativo.
- [Benchmark de referencias](benchmark/README.md): Qué tomar de cada sitio de referencia y a qué sección aplica.
- [Banco de ideas](ideas/README.md): Ideas de interacción por aprobar; la primera: el pan del hero se vuelve el gorro del osito.

## Wireframes

- **Inicio** · `/wireframes/inicio` · 11 secciones
- **Nosotros** · `/wireframes/nosotros` · 9 secciones
- **Marcas** · `/wireframes/marcas` · 4 secciones
- **Sustentabilidad** · `/wireframes/sustentabilidad` · 6 secciones
- **Inversionistas** · `/wireframes/inversionistas` · 5 secciones
- **Prensa** · `/wireframes/prensa` · 4 secciones
- **Carreras** · `/wireframes/carreras` · 5 secciones
- **Contacto** · `/wireframes/contacto` · 5 secciones

## Decisiones tomadas

| Pregunta | Decisión | Fuente |
|---|---|---|
| Países con presencia: ¿96 o 102? | 102: operamos en 39 y servimos a otros 63 a través de socios estratégicos. | Reporte de resultados del 3T26 (22 de octubre de 2026), «Acerca de Grupo Bimbo» |
| Panaderías: ¿250 o 251? | 250 panaderías y botaneras. | Reporte de resultados del 3T26, «Acerca de Grupo Bimbo» |
| Colaboradores: ¿cuántos y con qué fecha de corte? | Más de 152,000, según el reporte del 3T26 (octubre de 2026). | Reporte de resultados del 3T26, «Acerca de Grupo Bimbo» |
| ¿Qué dirección corporativa se publica? | Prolongación Paseo de la Reforma 1000, col. Peña Blanca Santa Fe, alcaldía Álvaro Obregón, C.P. 01210, Ciudad de México. | Informe Anual 2025, «Oficinas corporativas» |
| ¿Las regiones siguen las del informe anual? | Sí: Norteamérica (Estados Unidos y Canadá), México, Latinoamérica (Centro y Sudamérica) y EAA (Europa, Asia y África). | Informe Anual 2025 y reporte 3T26 (notas de segmentos) |
| Nutrición: ¿página propia o dentro de Para Ti? | Dentro de Sustentabilidad › Para Ti; /nutricion redirige ahí. | Informe Anual 2025: los perfiles nutrimentales se reportan dentro del pilar Para Ti |

## Benchmark de rendimiento

Página de inicio de cada empresa, medida desde México el 2 de noviembre de 2026 con Lighthouse 13.6; mediana de 3 corridas por dispositivo, misma red para todas. Sirve como línea base para la propuesta.

El benchmark de referencias visuales está en [benchmark/README.md](benchmark/README.md).

| Sitio | Móvil | Escritorio | Contenido principal en móvil | Peso | Peticiones |
|---|---:|---:|---:|---:|---:|
| Grupo Bimbo · sitio actual | 68 | 87 | 11.9 s | 8.4 MB | 112 |
| Mondelez International | 61 | 83 | 12.6 s | 2.3 MB | 49 |
| Gruma | 67 | 78 | 16.6 s | 8.5 MB | 95 |
| Nestlé (No comparable: respondió con una verificación anti-bots.) | n/c | n/c | n/c | n/c | n/c |

Objetivo de la propuesta en móvil: rendimiento de 90 o más y contenido principal en menos de 2.5 s.

## Dudas vigentes (15)

| Tema | Pregunta | A quién |
|---|---|---|
| Cifras | El Informe Anual 2025 (93 países, 249 panaderías, más de 1,700 centros, más de 153,000 colaboradores) y el reporte del 3T26 (102, 250, más de 1,600, más de 152,000) no coinciden. ¿Cuál es el juego vigente? La demo usa el del 3T26. | Relación con Inversionistas |
| Sitio actual | ¿Bimbo corregirá en su sitio las cifras desactualizadas (96 países en Nosotros, 10 mil productos) antes del lanzamiento? | Comunicación |
| Contacto | Teléfono corporativo que se publica. | Comunicación |
| Contacto | Canal para clientes y distribuidores. | Comercial |
| Prensa | Correo y responsable de prensa. | Comunicación |
| Inversionistas | Correo y teléfono de Relación con Inversionistas (migrar de la página actual). | Relación con Inversionistas |
| Carreras | Bolsas de trabajo de México, Estados Unidos y Europa. | Talento |
| Nosotros | Semblanzas de los fundadores e integrantes del Comité Directivo. | Comunicación |
| Nosotros | Frases de apoyo de las siete creencias (propuesta nuestra). | Cultura |
| Reconocimientos | Año del reconocimiento de TIME. | Comunicación |
| Marcas | Catálogo de marcas con categorías, países y sitio oficial de cada una. | Marketing |
| Marcas | ¿Ricolino sigue en el portafolio? La demo original la incluía y el sitio actual no la muestra. | Marketing |
| Inversionistas | ¿Habrá versión en español del CbCR? | Relación con Inversionistas |
| Idiomas | Copy en inglés: se redactará a partir del español una vez aprobado. | Equipo de la propuesta |
| Media | Logotipos en vector, fotos y video con derechos de uso para el diseño. | Comunicación |

### Marcadores en el copy (14)

- Inicio › reconocimientos: `[año por confirmar]`
- Nosotros › fundadores: `[semblanza por migrar]`
- Nosotros › fundadores: `[semblanza por migrar]`
- Nosotros › fundadores: `[semblanza por migrar]`
- Nosotros › fundadores: `[semblanza por migrar]`
- Nosotros › fundadores: `[semblanza por migrar]`
- Nosotros › fundadores: `[semblanza por migrar]`
- Nosotros › liderazgo: `[integrantes por migrar desde Inversionistas › Gobierno corporativo]`
- Inversionistas › contacto: `[correo y teléfono por migrar desde Inversionistas › Contacto]`
- Prensa › contacto: `[correo de prensa por confirmar]`
- Carreras › vacantes: `[enlace pendiente]`
- Carreras › vacantes: `[enlace pendiente]`
- Carreras › vacantes: `[enlace pendiente]`
- Contacto › canales: `[canal por confirmar]`

## Fuentes

- [Informe Anual 2025 «Celebramos» (publicado en sept. 2026)](https://d2rwhogv2mrkk6.cloudfront.net/s3fs-public/reportes-2026/IA25_GB_Celebramos_ESP_VF_28%20de%20septiembre%2026.pdf)
- [Reporte de resultados del 3T26](https://d2rwhogv2mrkk6.cloudfront.net/s3fs-public/reportes-2026/Grupo%20Bimbo%20Reporta%20Resultados%20del%203T26_0.pdf)
- [Sitio público grupobimbo.com (44 páginas leídas el 2 nov 2026)](https://www.grupobimbo.com/es)
