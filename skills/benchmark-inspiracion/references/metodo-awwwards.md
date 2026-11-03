# Método: referencias en Awwwards

Probado el 2 de noviembre de 2026 desde el navegador integrado de Claude Code. Awwwards cambia sus rutas;
si algo de esto deja de funcionar, comprobar la URL en el navegador antes de seguir.

## Rutas que sirven
| Qué | URL | Nota |
|---|---|---|
| Categoría | `https://www.awwwards.com/websites/food-drink/` | Otras: `business-corporate`, `architecture`, `technology`… |
| Texto libre | `https://www.awwwards.com/websites/?text=bakery` | Busca en nombre y descripción; devuelve hasta ~24 por página |
| Ficha | `https://www.awwwards.com/sites/<slug>` | Título = "Nombre - Awwwards SOTD / Honorable Mention / Nominee" |

No funcionan (404 o ignoran el filtro): `/search?text=`, `/websites/sites_of_the_day/food-drink/`,
`?category=` sobre la lista de premiados. El filtro por premio se hace leyendo el título de cada ficha.

## Términos de búsqueda
Sacarlos del léxico del cliente (lente Materia y Proceso), en inglés: para Bimbo fueron
`bread, bakery, flour, wheat, grain, dough, pastry, snack, cereal, biscuit, chocolate, food company`.
Añadir siempre uno del **tipo de empresa** (`manufacturer`, `corporate`, `group`, `heritage`) para no quedarse
solo con tiendas pequeñas.

## Procedimiento (navegador integrado)
1. Abrir cualquier página de awwwards.com (las peticiones `fetch` deben ser del mismo origen).
2. Pegar `scripts/awwwards-buscar.js` con `javascript_tool`: junta slugs por término, luego lee cada ficha a
   ~1 s de distancia **en segundo plano** (las llamadas largas exceden los 45 s de la herramienta; el script
   guarda el avance en `window.__det` y se consulta con llamadas cortas).
3. Exportar `window.__rows` (JSON) y guardarlo en el proyecto (`benchmark-inspiracion/awwwards.json`).
4. Filtrar: título con `SOTD`, `Honorable Mention`, `Developer`, `Site of the Month/Year`, o fecha de los
   últimos 18 meses. Leer descripciones y elegir 12–18.

## Miniaturas y revisión visual
- Usar el `og:image` de la ficha (captura oficial) y bajarla con `curl` a `refs/<slug>.jpg`, reducida a
  1000 px (`sips -Z 1000 … --setProperty format jpeg`).
- `python3 scripts/hoja-contactos.py refs/ salida/` genera hojas de 3×3 para revisarlas de una vez.
- **No confiar en capturas del panel integrado** de sitios con animación: con el panel oculto el
  `requestAnimationFrame` se detiene y salen pantallas en negro. Para entender una técnica, leer el DOM
  (`canvas`, `video`, `clip-path`, fuentes, textos con unidades como `°C`) y la descripción de la ficha.
- Las miniaturas son para uso interno del benchmark; no se publican ni se meten a la demo del cliente.

## Paleta real del cliente
Sacarla de su propia hoja de estilos, no de memoria:
```bash
curl -sS --compressed 'https://www.cliente.com/ruta/style.css' | grep -oiE '#[0-9a-f]{6}\b' | tr a-f A-F | sort | uniq -c | sort -rn | head
curl -sS --compressed 'https://www.cliente.com/ruta/style.css' | grep -oE "font-family:[^;]+" | sort | uniq -c | sort -rn | head -5
```
Bimbo: `#EE353A` (rojo), `#0033A0` (azul), `#002269` (azul profundo), `#C9983D` (dorado/trigo),
`#EF7F13` (naranja), Montserrat. Anotar la fuente en el pie de la página de benchmark.

## Qué registrar de cada referencia
Nombre, premio, fecha, URL, una línea de **qué hace** (observable) y una de **qué tomamos para el cliente**
(el principio, no la forma). Ese par de líneas es lo que va en el arreglo `REFS` de la plantilla.
