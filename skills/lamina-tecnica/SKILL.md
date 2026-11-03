---
name: lamina-tecnica
description: >-
  Crea láminas técnicas "estilo Palantir" para el sitio de Grupo PRODI o de otro prospecto — planos serios de un activo (buque, aeropuerto, presa/hidroeléctrica, tren, estadio, terminal, planta industrial, camión de reparto) con vistas ortográficas sacadas de un modelo 3D real en Blender (alzado, planta, frente/sección), alineadas por proyección y con capa vectorial de trazado (cotas, ejes, cotas de nivel, líneas ocultas, escala gráfica, cajetín). Úsala cuando pidan "un plano más real / más profesional / más serio", "blueprint estilo Palantir o Anduril", "lámina técnica", "rehaz el plano del barco/aeropuerto/presa", o reemplazar un esquema dibujado a mano por un dibujo técnico. También planos territoriales registrados a una foto aérea (costa, golf, marina, caminos, curvas de nivel limpias en gris sobre blanco) con la animación foto → barrido blanco → recorrido del plano: úsala cuando pidan "el plano del hero", "curvas de nivel", "que la foto se convierta en plano" o un plano de un desarrollo turístico.
---

# Lámina técnica estilo Palantir

Lo que hace "serio" un plano no es el color sino la **coherencia**: todas las vistas salen del mismo
objeto, a la misma escala, alineadas por proyección, con detalle real y convenciones de dibujo técnico.
Un esquema trazado a mano (casco trapezoidal, planta en forma de píldora, rótulos dentro del dibujo)
se lee como infografía. Caso de referencia: buque refrigerado de 1944, sección **02 Origen** de
`prototipo/Activos.dc.html`, sección `02 Origen` (rama `fusion/sitio`; nació en `prototipo/Grupo PRODI Home v3.dc.html`, rama `marlon`) (modelo en `blender-test/barco_1944.blend`, archivo privado de Nuclea: pedirlo al equipo si hace falta).

## Herramientas
- Blender 5.x con MCP for Blender (`mcp__blender__*`). Los scripts se cargan como textos de Blender y se
  ejecutan con `exec(bpy.data.texts[...].as_string(), ns)`.
- `scripts/ortho_draw.py` (autocontenido): `setup_scene`, `render_view`, `world_bounds`.
- `scripts/ejemplo_buque_build.py`: modelo paramétrico del buque (referencia de cómo modelar).
- `scripts/ejemplo_buque_lamina_svg.py`: generador del SVG de la lámina (referencia de composición).
- `scripts/ejemplo_seccion_origen.py`: genera la sección (texto + lámina) responsiva, con clases o con
  atributos `data-o` para el framework dc.
- `scripts/plano_desde_foto.py`: plano territorial registrado a una foto aérea (ver "Variante" abajo).
- `references/convenciones.md`: qué trazado lleva cada tipo de activo.
- `references/web.md`: integración en la página (marcado, carga instantánea sin animación, responsivo, recorte en teléfono).

## Flujo

### 1 · Investigar y decidir el objeto
- Tipo y época plausibles (el buque de 1944 es un carguero "tres islas": castillo, puente central y
  toldilla; roda lanzada, popa de crucero, palos con plumas). Si no hay planos reales, la lámina dice
  **ESQUEMA ILUSTRATIVO** y las cifras son de la reconstrucción. Es la única excepción a "datos reales con fuente": la
  lámina debe decir que es ilustrativa y sus cotas no se presentan como datos oficiales del cliente.
- Fijar dimensiones principales (eslora, manga, puntal, calado / largo, ancho, alturas por nivel).

### 2 · Modelar de lo general a lo particular
- Forma principal por **funciones** (no cajas): en el buque, semimanga, exponente de sección (pantoque),
  arrufo, quilla con pie de roda y corte de popa, lanzamiento de roda y voladizo de popa → malla
  continua con sombreado suave. Islas/niveles como escalones suaves de la cubierta.
- Después volúmenes secundarios, y al final **el detalle real que da seriedad**: barandales con
  candeleros, jarcia (obenques, estays, amantillos), botes con pescantes, portillos, ventanas, escotillas
  con cuarteles, timón con perfil, hélice, bitas, ventiladores.
- **Nada flota.** Todo cable o elemento colgante termina donde lo haría en la realidad: las betas de
  carga bajan del penol a la escotilla con el gancho trincado; las plumas apuntan al centro de la
  escotilla que sirven (en la primera versión colgaban en el aire y el usuario lo notó).
- Verificar con `mcp__blender__look` desde varios ángulos antes de dibujar.

### 3 · Vistas ortográficas (`ortho_draw.render_view`)
- Objeto con frente hacia +X, babor/izquierda +Y, Z arriba. Alzado (rot 90,0,0 desde −Y), planta
  (rot 0,0,0 desde +Z), frente (rot 90,0,90 desde +X). Mismo `pxm` (14 px/m) para todas.
- Encuadres con `world_bounds` + márgenes; anotar las extensiones (x0..x1, z0..z1, y0..y1) porque la
  composición las necesita para colocar cada vista.
- Línea con jerarquía: silueta 100 %, interiores 55 %, relleno de silueta 7 %; superresolución 3×.
- Repetir el render tras cualquier cambio de modelo (los PNG son el entregable).

### 4 · Componer la lámina (SVG)
- Un `viewBox` (p. ej. 1200×452) y **una sola escala** (u/m) para todas las vistas; funciones
  `X(x)`, `Y(z)`, `YP(y)`, `XF(y)` de mundo → lámina. El frente comparte altura con el alzado; la planta
  comparte eslora con el alzado.
- Las vistas entran como `<image>` en coordenadas exactas; encima, la capa vectorial con medidas
  **sacadas del modelo** (extremos reales, flotación, perpendiculares…), ver `references/convenciones.md`.
- Columna de datos a la izquierda (año grande, tipo, origen/destino, carga, método) + leyenda de trazos.
- Escala gráfica (vertical de alturas o horizontal), cajetín abajo a la derecha (`OBJETO · TIPO · LÁMINA 01`).
- Rótulos **solo en los márgenes** de cada vista (ALZADO · ESTRIBOR, PLANTA · CUBIERTA, PROA…), nunca
  dentro del dibujo; textos en Geist Mono 8.5–11 px con tracking .14em, opacidad .55–.75.
- Trazos SVG de 0.75 u: cotas .6, extensiones .3, ocultas `4 3` a .42, ejes `12 4 2 4` a .3.

### 5 · Integrar y probar (`references/web.md`, `scripts/ejemplo_seccion_origen.py`)
- **La lámina es una imagen fija, nunca con scroll horizontal.** Los datos del activo (origen, destino,
  carga, método…) van en el HTML junto al texto, no dentro del SVG: el SVG se genera sin columna de datos
  (`--sin-datos`) y queda solo el dibujo.
- **Escritorio (> 960 px):** dos columnas, con texto y datos a la izquierda y la lámina a la derecha
  (`grid-template-columns: minmax(300px,.8fr) minmax(0,1.65fr)`).
- **Tableta (601–960 px):** apilado, lámina completa.
- **Teléfono (≤ 600 px):** **toda la sección en una pantalla** (`min-height:100svh`, columna flex): texto
  arriba y lámina abajo, recortada a la vista principal (alzado + planta) y escalada al alto restante con
  container queries (`width: min(100cqw, 100cqh·W/H)`). En pantallas de ≤ 740 px de alto el texto se
  compacta. `padding-top` ≈ 92 px para librar la barra fija de navegación.
- Carga **instantánea, sin animación de entrada** (la lámina acompaña, no protagoniza).
- Leyenda de trazos y "Esquema ilustrativo" como `figcaption` bajo la lámina.
- Probar 375×667, 375×812, 430×932, 820×1180, 1024×768, 1440×900 y 1920×1080: medir con JS que
  `scrollWidth == innerWidth` y, en teléfono, que la sección mida exactamente el alto de pantalla.
- Revisar el detalle en un HTML temporal a 2–3×; borrarlo al terminar.

## Variante · plano territorial desde una foto aérea (hero de Destinos y Desarrollos)
Cuando el activo es un **territorio** (desarrollo turístico, costa, campo de golf, marina) y hay un render o
foto cenital, el plano no se modela en Blender: se **extrae de la propia foto** para que coincida píxel a
píxel y la foto se funda en su plano. Caso de referencia: hero de `prototipo/Destinos y Desarrollos.dc.html` (rama `fusion/sitio`; en la rama `marlon` se llama `Destinos y Desarrollos Design.dc.html`)
(Nauka · Costa Canuva, foto `assets/fotos/des-nauka-plano.jpg` → `assets/planos/nauka-plano.json`).
- `scripts/plano_desde_foto.py foto.jpg salida.json --debug carpeta`: costa (borde mar/tierra sin los tramos
  del marco, con islas y penínsulas de la dársena), playa, agua interior, fairways y corredores de golf,
  parcelas y claros, techos, caminos, muelles, curvas de nivel e isobatas, y retícula de elevación para el
  cursor. Todo en coordenadas de la foto. Revisar siempre `control.png` (plano sobre la foto) antes de integrar.
- **Caminos:** la detección automática (cresta "no verde" + esqueleto) deja huecos; los que faltan se trazan
  a mano en `MANUAL` sobre recortes cuadriculados del mapa de contraste y se ajustan solos a la cresta ±5 px.
  Muelles y cosas finas dentro del agua, a mano (`PIERS`).
- **Curvas de nivel limpias:** relieve sintético coherente con la costa (rampa desde la orilla que se aplana,
  acantilado donde hay acantilado, planicie donde hay playa, cerros como gaussianas, valle en el golf),
  suavizado fuerte; equidistancia 10, índice cada 50. Recortadas a tierra (`clip` evenodd con el mar).
- **Paleta de esta variante:** fondo **blanco**, todas las líneas **grises** — curvas `rgba(23,23,38,.12)`
  0.8 px, índice `rgba(71,75,96,.5)` 1.6 px, costa `rgba(71,75,96,.9)` 1.9 px, mar `#EEF0F1` con rayado
  punteado; caminos con doble línea (gris 3 px + blanco 1.2 px); sin colores de acento en el dibujo (el
  lila `#9AA6FF` queda solo para pines, zonas encendidas y cruces de la interfaz; nada de ámbar).
- **Animación (excepción a la regla 8, solo en hero):** 1) carga la foto sola, a sangre, sin velos blancos
  (marco oscuro hasta que decodifica, entra con fundido y un leve asentamiento de escala; texto en blanco con
  degradado oscuro); 2) con el scroll llega el blanco como un barrido de izquierda a derecha con borde suave,
  y detrás del barrido el plano ya está dibujado y registrado con la foto; 3) después la cámara recorre el
  plano por capas. La línea de tiempo vive en `HT` (fracciones del scroll del hero).
- **Que el plano se entienda (las piezas clave deben leerse sin la foto):** zonas con símbolo propio y rótulo.
  Golf: perímetro del campo punteado (sale de fairways + corredores + lagos) con trama de puntos y fairways
  en gris sólido. Resort: lote trazado a mano, punteado con achurado diagonal y techos individuales (erosionar
  antes de etiquetar para separar filas de villas). Marina: dársena con relleno propio y trama de ondas, muelles
  con dedos. Cada zona lleva rótulo con línea guía (nombre + tipo, Geist Mono 10 px, caja blanca) y hay una
  leyenda abajo a la derecha. Los rótulos nunca caen sobre la columna de texto (en teléfono, debajo del velo).
- **Cámara del recorrido:** un solo camino continuo atado al scroll que avanza en una dirección (poniente →
  oriente: resort → playa → golf → marina), con smootherstep entre paradas y un leve alejamiento (−20 % de
  zoom) a mitad de cada tramo; sin perseguir puntos alejados con interpolación exponencial (eso se sentía como
  pinball). Los pines de cada capa se agrupan por cercanía geográfica para que la cámara no rebote. Paralaje
  del cursor mínimo (6 px). En teléfono el foco baja al 74 % de la altura y la columna de texto lleva velo blanco.
- **Mapa fijo (decisión del cliente; reemplazó al recorrido con cámara):** la cámara se queda en un
  encuadre que deja todo el desarrollo a la derecha de la columna de texto, y cada capa **enciende** lo suyo:
  marcadores en reposo como puntos grises, los de la capa activa con halo lila, pulso y rótulo; la zona
  ligada (resort, golf, marina) se rellena y contornea en lila (`#9AA6FF`). Encendido con suavizado dependiente del tiempo
  (`1 − .9^dtf`), no por cuadro. Al alejar, los bordes del plano se desvanecen a blanco.
- **Rótulos de zona en el océano:** caja blanca bajo la costa con guía punteada vertical hacia la zona; así
  contrastan y no tapan el dibujo. La frase rotativa del hero también va en la celda inferior derecha (mar).
- **Barra superior:** oscura (morada, logo blanco) sobre la foto y blanca al llegar al plano: el hero cambia su
  `data-nav` según el barrido y avisa con un evento `scroll` para que la barra lo lea.
- **Pruebas en el navegador integrado:** si el panel está oculto, `requestAnimationFrame` no corre y el canvas
  sale vacío u oscuro; no es un error de la página. Verificar en Chrome.
- **Foto nítida:** upscale ×2 con Clarity (`creativity: 0`, para no inventar detalle ni mover nada); verificar
  con correlación de fase que el desfase sea < 0.1 px, porque el plano está registrado a la foto original.

## Reglas aprendidas (no repetir)
1. Nada de trazos inventados ni formas genéricas: del modelo salen las vistas y las cotas.
2. Vistas alineadas por proyección y a la misma escala.
3. Sin rótulos dentro del dibujo; leyenda para explicar trazos (ocultas, ejes).
4. Ningún elemento colgante sin terminar en su punto real de amarre.
5. Etiquetas de cota que no pisen el dibujo (el "LF 5.80" se movió fuera de la roda).
6. "ESQUEMA ILUSTRATIVO" siempre que sea reconstrucción.
7. Nunca scroll horizontal: en escritorio la lámina va al lado del texto; en teléfono, texto arriba y
   lámina abajo, toda la sección en una pantalla.
8. Sin barridos ni revelados: la lámina aparece completa de inmediato (excepción: el hero territorial,
   donde el barrido foto → plano es la animación pedida).
9. En el plano territorial, nada de trazos inventados: si un rasgo no sale de la foto, no se dibuja.

## Trampas
- `bpy.data.images.load(check_existing=True)` devuelve caché → `ortho_draw.load_np` ya usa False.
- El pase de ID necesita mundo negro (`setup_scene`); si el mundo tiene color, la silueta se pierde.
- Las capturas del navegador integrado pueden mostrar el frame anterior: capturar dos veces.
- Servidor local con caché: añadir `?v=N`.
