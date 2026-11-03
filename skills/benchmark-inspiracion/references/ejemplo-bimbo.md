# Caso completo: Grupo Bimbo (2 nov 2026)

Página: `~/Factory/bimbo/benchmark-inspiracion/index.html` (servir con
`python3 -m http.server 8811 --directory benchmark-inspiracion`, configuración `benchmark-inspiracion` en
`~/Factory/bimbo/.claude/launch.json`). Copia en `assets/ejemplo-bimbo.html`.

## Léxico
- **Materia:** silueta del pan de caja, miga, corteza, espiga de trigo, harina.
- **Proceso:** amasar, levar, hornear, rebanar, empacar, repartir.
- **Lugar:** campo en surcos, molino, boca del horno en arco, línea de producción, ruta, punto de venta.
- **Ritual:** "para todos los momentos de tu día" (frase del sitio actual): desayuno, lonchera, merienda, cena.
- **Íconos:** el Osito Bimbo y su gorro de panadero, los camiones de reparto (Bimbo empezó en 1945 con 4
  productos y 10 camiones repartidores, según grupobimbo.com/es/marcas/mexico), el rojo y azul de marca.
- **Escala:** países, panaderías, rutas, marcas, colaboradores (cifras oficiales por confirmar: la auditoría
  encontró tres versiones distintas del número de panaderías).

## Decisión de motivos
- **Protagonista:** la corona del pan de caja como corte entre fondos y como máscara de fotos y botones.
- **Apoyo 1 (textura/color):** miga al 6–10 % y rampa de tostado ligada al scroll.
- **Apoyo 2 (movimiento):** levar para cifras y entradas; rebanar para cambios de página.
- **Clásicos:** la corona del pan se vuelve el gorro del osito y un zoom out lo revela (idea 01, en
  `docs/ideas` del repo `bimbo-corporate-demo`); el camión de reparto es la barra de avance del sitio, el
  capítulo 1945 de Historia y la ruta de Presencia.
- **Detalles:** espiga como viñeta y línea de tiempo, termómetro del horno como indicador de capítulo en la
  sección de manufactura, ruta de reparto sobre el mapa de relieve, harina en el hero.

## Mapa de secciones
| Sección | Protagonista | Apoyo | Referencia |
|---|---|---|---|
| Home · hero | Corte de rebanada azul/papel, harina | Momentos del día | Agrumea, Bernice |
| Historia (desde 1945) | Espiga como línea de tiempo | Tostado por décadas | Shorodo, Mâm Cơm |
| Marcas | Tarjetas con máscara de rebanada; filtro por momento | Ingredientes flotando | Hozon, Simply Chocolate |
| Manufactura | Termómetro del horno | Arco del horno enmarcando video | Shorodo, Kindi Land |
| Presencia y distribución | Ruta sobre mapa de relieve | Cifras que levan | Morpho |
| Sustentabilidad | Campo en surcos (líneas en dorado) | Espiga como progreso de metas | Agrumea, Delta Cafés |
| Inversionistas | Solo el corte de sección | Miga al 6 % en cifras | Delta Cafés, Kindi Land |
| 404 | Miga animada ("esta página no levó") | Harina que se asienta | IGIN |

## Carácter por página
Home intensidad 2 (claridad), Marcas 4 (exploración, color de cada marca), Historia 5 (scroll narrativo),
Cómo hacemos pan 4, Presencia y Sustentabilidad 3, Inversionistas y Prensa 1. Ver la sección 05 de la
página y `caracter-por-pagina.md`.

## Fuente de paleta
Hoja de estilos pública de grupobimbo.com: `#EE353A`, `#0033A0`, `#002269`, `#C9983D`, `#EF7F13`;
Montserrat. Los tonos de materia (masa, dorado, tostado, corteza) son propuesta de Nuclea.

## Qué no se hizo
- No se usó el logo ni se dibujó al osito: la demo anima solo el gorro y pide el archivo oficial.
- Las temperaturas del termómetro (220 °C → 22 °C) son ilustrativas.
- Las técnicas de las referencias se describieron con la captura oficial de Awwwards y el DOM; el panel
  integrado estaba oculto y no renderizaba animaciones.
