# Revisión crítica del copy actual

> Base: sitio público grupobimbo.com (ES y EN), leído el 2 de noviembre de 2026: 44 páginas y 1,868 bloques de texto.
> Las citas son fragmentos breves del sitio público y se usan solo para análisis. Este proyecto no está afiliado a Grupo Bimbo.

## La conclusión en una línea

El sitio tiene buen material, pero **no lo cuenta en un solo idioma de marca**. La identidad está escondida, las cifras cambian de página a página y un mismo tema vive en dos o tres secciones con nombres distintos. Antes de escribir copy nuevo hay que decidir qué es oficial: qué cifra, qué nombre y qué página es dueña de cada tema.

---

## 1 · La identidad de la empresa no está en el texto

La filosofía, la misión, el propósito y las siete creencias de la compañía **solo existen dentro del texto alternativo de una imagen** en /es/nosotros. El encabezado visible, «Una cultura que nos distingue», no tiene texto debajo. Un buscador, un lector de pantalla o alguien que copia y pega no encuentra la misión de Bimbo en ningún lugar del sitio.

| Elemento | Texto actual (en el `alt` de la imagen) |
|---|---|
| Filosofía | «ser una empresa sustentable, altamente productiva y plenamente humana» |
| Misión | «tener alimentos deliciosos y nutritivos en las manos de todos» |
| Propósito | «alimentar un mundo mejor» |
| Creencias | valoramos a la persona · somos una comunidad · conseguimos resultados · competimos y ganamos · somos operadores eficientes · actuamos con integridad · trascendemos y permanecemos con el tiempo |

**Propuesta:** estas cuatro piezas son el esqueleto del copy nuevo. Van en texto real en Nosotros y la Home las cita. El propósito, «Alimentamos un mundo mejor», se escribe siempre igual: hoy aparece también como «Alimentar a un mundo mejor» (Marcas) y «Nutriendo un mundo mejor» (demo actual de este repo).

## 2 · Las cifras no tienen dueño

Las mismas magnitudes aparecen con valores distintos según la página. El detalle completo, con la fuente de cada valor, está en [02-fuente-unica-de-cifras.md](02-fuente-unica-de-cifras.md).

| Magnitud | Valores encontrados |
|---|---|
| Países con presencia | 39 · «más de 39» · 96 (39 directos + 57 con socios) · 102 (39 + 63) |
| Panaderías | 251 «panaderías y plantas» · 250 «panaderías y botaneras» · 249 · 214 |
| Colaboradores | más de 152,000 · más de 152 mil · más de 153,000 · +153 mil |
| Bimbo Global Race 2026 | 29 ciudades de 23 países · 28 ciudades de 22 países |
| Marcas en México | «más de 19» (y lista 17) · 21 logotipos en la página de México |
| Años | «Siete décadas» · «más de 80 años» · «80 years» |

**Propuesta:** un módulo único de cifras (dato, fecha de corte, fuente) del que leen la Home, Nosotros, Inversionistas, Prensa, Carreras y los metadatos. Ninguna cifra se escribe a mano en una página.

## 3 · La geografía no cuadra

- En Marcas y en Carreras, **«Centroamérica» incluye Colombia, Ecuador y Venezuela**, que son países de Sudamérica. Por eso «Sudamérica» queda con seis países y deja fuera a tres.
- «39 países» describe dónde Bimbo **opera**; 96 o 102 describe dónde **llegan sus productos**. El sitio usa las dos ideas sin decir cuál es cuál. Solo /es/nosotros lo explica, en una oración.
- Marcas repite la lista completa de países dos veces seguidas.

**Propuesta:** regiones del informe anual (Norteamérica, México, Latinoamérica, EAA: Europa, Asia y África) y dos verbos fijos: «operamos en 39 países» y «nuestros productos llegan a [N] países».

## 4 · Un tema, varias casas y varios nombres

| Tema | Dónde vive hoy | Problema |
|---|---|---|
| Nutrición | /es/nutricion y Sustentabilidad › Para Ti | Dos páginas con pilares distintos para el mismo tema: Nutrición, Transparencia, Calidad (Nutrición) frente a Perfiles, Marcas transparentes, Dietas (Para Ti) |
| Estrategia de sustentabilidad | Sustentabilidad, Home, Únete, FAQ | Se le llama «estrategia», «receta», «8 principios básicos», «compromisos» y «prioridades». Dice «8 principios», pero muestra 3 pilares más 4 cimientos: 12 temas |
| Contacto | Footer «Contacto» (correo), «Comenta», Inversionistas › Contacto | No existe una página de contacto. «Contacto» abre un correo. «Comenta», el canal de denuncias éticas, aparece como botón destacado en el pie, como si fuera contacto general |
| Fraude | Modal desde un texto del pie | Información útil, escondida y fuera de Contacto o Carreras |
| Sustentabilidad / sostenibilidad | Sitio actual / demo de este repo | Bimbo usa «sustentabilidad»; la demo de este repo usa «sostenibilidad» |

**Propuesta:** cada tema tiene **una página dueña** y las demás enlazan. Nutrición se integra en Sustentabilidad › Para Ti. Contacto se vuelve un distribuidor por audiencia, y Comenta y el aviso de fraude viven ahí con su explicación.

## 5 · Contenido que envejece mal

- **Reconocimientos** abre con premios de 2007 a 2012. El más reciente queda al final de la paginación.
- **Cimientos** dice «Siete décadas»; la empresa cumplió 81 años.
- El pie muestra **Forbes Best Employers 2024** mientras la portada anuncia el reconocimiento 2026.
- La **Home en inglés** titula una sección «Mexican startup with 80 years of history». Es contradictorio para un lector anglosajón: *startup* y 80 años.
- La línea del tiempo de **Historia** termina en 2025 con un bloque de una oración por año.

**Propuesta:** todo texto con año lleva fecha de revisión; los listados se ordenan del más reciente al más antiguo; los sellos con año salen de un solo componente.

## 6 · Inglés y español cuentan cosas distintas

La Home en inglés no es una traducción de la española: tiene otro carrusel (Ethisphere, Aeroméxico), otra sección de diversidad y un titular propio. Sus metadatos, en cambio, están en español. Hay erratas («Ethispher»).

**Propuesta:** un solo guion por página, con la versión EN redactada a partir de la ES, no aparte. Las diferencias por mercado se marcan como tales.

## 7 · Redacción

| # | Página | Fragmento | Problema | Propuesta |
|---|---|---|---|---|
| R-01 | Sustentabilidad (todos los bloques) | El subtítulo se repite como primera oración del párrafo | Duplicación: el lector lee lo mismo dos veces | El subtítulo resume; el párrafo aporta el dato |
| R-02 | Nutrición | «Consumidor objetivo: niños o adlutos» | Errata | «niños o adultos» |
| R-03 | Nutrición | Descripción de 300+ caracteres en una sola oración | Ilegible y se corta en Google | Una oración de 150 caracteres |
| R-04 | Marcas | «…aprovechando las sinergias… y hacer de la tecnología…» | Falta concordancia | «…aprovechando sus sinergias y haciendo de la tecnología…» |
| R-05 | Únete | «Valoramos a la Persona y esta al centro» | Falta acento; mayúscula innecesaria | «Valoramos a la persona y la ponemos al centro» |
| R-06 | Únete | «personas con sentido humano que aporte su talento» | Concordancia | «personas con sentido humano que aporten su talento» |
| R-07 | Ventures | «cuando uno o más racionales puedan ser desarrolladas» | Anglicismo y concordancia | «cuando hay razones de negocio para hacerlo» |
| R-08 | Ventures | «empoderamiento de nuestro frontline» | Anglicismo | «de nuestros equipos de ventas y distribución» |
| R-09 | Reconocimientos | «Categorias», «Reconocimientos generales» repetido | Errata y opción duplicada en el filtro | Corregir el acento y la taxonomía |
| R-10 | Inversionistas › Quiénes somos | Semblanza del Director General con estado civil e hijos | Tono personal en una página para inversionistas | Trayectoria y responsabilidades |
| R-11 | Varias | MAYÚSCULAS sostenidas («TRABAJA EN GRUPO BIMBO», «NUESTRA MISIÓN») | Se leen como grito y empeoran la accesibilidad | Mayúsculas por estilo (CSS), no en el texto |
| R-12 | Home | El único H1 es «Últimas noticias» | La página principal no dice qué es Bimbo en su titular | H1 con el propósito |
| R-13 | Home | «Conócelas», «Leer más», «Ver más» | Llamadas a la acción genéricas | Verbo y destino: «Explora las marcas por país» |
| R-14 | Historia | «Se inició la primer gran reorganización» | Concordancia | «Se inició la primera gran reorganización» |
| R-15 | Varias | Enlaces internos con `/index.php/` | URL técnica visible para el usuario | URL limpia |

## 8 · El copy actual de esta demo también necesita revisión

La demo de este repositorio usa cifras y textos que no salen de fuentes públicas o que ya no están vigentes:

| Pieza | Dice | Lo que encontramos en el sitio público |
|---|---|---|
| Hero | «+30 países», «+140K colaboradores» | 39 países de operación; más de 152 mil colaboradores (2026) |
| Valores | «Más de 75 años»; Pasión, Confianza, Rentabilidad, Trabajo en equipo | 81 años; las creencias publicadas son otras siete (ver §1) |
| Marcas | Incluye Ricolino entre las 12 marcas globales | Ricolino no aparece en ninguna página de marcas del sitio actual; por confirmar antes de usarla. Rainbo sí aparece, en Norteamérica |
| Sostenibilidad | «0 residuos a vertedero», «+1M personas», «100% reformulados para 2030» | Sin fuente en el sitio. Las metas públicas son cero emisiones netas en 2050 y 100% de ingredientes clave de agricultura regenerativa en 2050 |
| Footer | Prolongación Paseo de la Reforma 1000 | Las FAQ del sitio dan otra dirección (Alfonso Nápoles Gándara 1117, Santa Fe). Por confirmar cuál publicar |
| Pilares | Bienestar, Planeta, Comunidad | Los pilares oficiales son Para Ti, Para la Vida y Para la Naturaleza, más los Cimientos |

## 9 · Decisiones que necesitamos antes del copy final

1. **Países totales:** ¿96 o 102? Proponemos 102, la cifra de la página de inversionistas, la más reciente.
2. **Panaderías:** ¿251 «panaderías y plantas» o 250 «panaderías y botaneras»? Proponemos «más de 250» hasta confirmar.
3. **Colaboradores:** ¿152 mil o 153 mil, y con qué fecha de corte?
4. **Dirección corporativa** que se publica.
5. **Regiones** para Marcas y Carreras: ¿las del informe anual?
6. **Nutrición** como página propia o dentro de Para Ti.
