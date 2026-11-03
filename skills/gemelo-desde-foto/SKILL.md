---
name: gemelo-desde-foto
description: >-
  Reconstruye en Blender un gemelo 3D exacto de un edificio a partir de UNA foto o render (fachada, aeropuerto, estación, museo), con la cámara resuelta desde la imagen para que modelo y foto queden registrados píxel a píxel, hace primero el upscale fiel de la foto (para calcar sobre la HD), produce los pases "plano" (aristas reales en líneas) y "modelo" (arcilla con personas MPFB) y monta la sección web responsiva en una de dos variantes: 3 etapas (plano → modelo → obra) o 2 etapas (plano → obra, sin el volumétrico). Sirve para PRODI y para cualquier prospecto (una planta, una tienda, un centro de distribución). Úsala cuando pidan "haz el edificio de esta imagen en Blender", "gemelo digital de la foto", "que el modelo coincida con la foto", "plano → modelo → obra", "plano a obra", "transición tipo cortina", o cualquier prueba estilo Palantir/Anduril donde un render 3D se funde con la fotografía real.
---

# Gemelo exacto desde una foto

Resultado esperado: tres imágenes con **el mismo encuadre** — plano (líneas `#9AA6FF` sobre `#171726`),
modelo (arcilla) y obra (la foto) — que en la web se revelan una sobre otra con el scroll sin que nada
"salte". Eso solo pasa si el modelo cae encima de la foto: cada arista del modelo corresponde a una arista
visible en la imagen. Se trabaja de lo general a lo particular y **cada etapa se valida con overlay**.

Casos: Aeropuerto de Tepic (3 etapas, ver final), villa Nauka (3 y 2 etapas, relieve maqueta), central de ciclo
combinado Enagas (foto aérea, 3 puntos de fuga, ajuste de cajas, chimeneas, racks), La Casa del Atlas (estadio,
dos puntos, celosía medida, graderío ovalado). Todos en `blender/<proyecto>/` con README.
Caso de referencia completo: Aeropuerto Internacional de Tepic (ver final). Archivos del caso:
`blender-test/aeropuerto_tepic_gemelo.blend`, `prototipo/assets/proyectos/aeropuerto-tepic-*`,
sección `#plano-obra` en `prototipo/Activos.dc.html` (rama `fusion/sitio`; nació en `prototipo/Grupo PRODI Home v3.dc.html`, que solo está en la rama `marlon`). Segundo caso, con las dos variantes web:
villa Nauka (`blender/nauka-villa-nayarit/`, `05-web/index.html` = 3 etapas, `05-web/plano-obra.html` = 2 etapas).

## Antes de empezar: preguntar la variante
El usuario usa **las dos** variantes según el caso. Al arrancar un gemelo nuevo (o antes de montar la web, si el
gemelo ya existe), si el usuario no lo dijo, preguntarle con `AskUserQuestion` cuál quiere; no elegir por él:

| Variante | Etapas | Qué cambia en el trabajo |
|---|---|---|
| **3 etapas** · plano → modelo → obra | Plano · Modelo · Obra | El render de arcilla se publica: su acabado importa (materiales, luz, personas MPFB, mobiliario). Barrido plano → modelo con línea de escaneo y persiana modelo → obra. Sección de 440vh. |
| **2 etapas** · plano → obra | Plano · Obra | No se muestra el volumétrico: el plano pasa directo a la foto con un solo barrido. El modelo sigue siendo necesario (de él salen las aristas del plano y la verificación), pero el render de arcilla queda solo como verificación y no hay que pulirlo para publicar. Sección de 340vh. |

Opciones sugeridas para la pregunta: "3 etapas (plano → modelo → obra)" y "2 etapas (plano → obra)". Se puede
ofrecer montar las dos (cuestan poco una vez hechos los pases) para compararlas, como en Nauka. Guardar la
elección en el README del proyecto.

En el mismo arranque, pedir la **API key de Clarity**: el upscale va antes del calco (ver paso 0).

## Herramientas
- Blender 5.x con MCP for Blender (`mcp__blender__*`). Los `scripts/*.py` se cargan como textos de Blender
  y se ejecutan con `exec(bpy.data.texts[...].as_string(), ns)`; nombres de texto usados en el caso:
  `measure.py`, `check.py`, `passes.py`, `poselib.py` y el constructor del proyecto (`tepic_build.py`, `ej_build.py`…).
- Fuera de Blender (venv con OpenCV/SciPy): `lines.py`, `vp.py`, `fit_boxes.py`.
- Personas realistas: extensión **MPFB** (MakeHuman, catálogo oficial extensions.blender.org; verificar el
  sha256 al descargar). Cuerpos con `HumanService.create_human(..., detailed_helpers=True)` — sin los
  helpers detallados el rig queda mal colocado y las poses destrozan la malla — y `add_builtin_rig(body,"default")`.
  Posar con `scripts/poselib.py` (apunta huesos a direcciones del mundo). Es el look tipo SAM 3D Body.
- Upscale: Clarity AI (`scripts/upscale.py`, key por variable de entorno). **Va al inicio** (paso 0), antes del calco.
- Web: `references/web-cortina.md` (HTML/CSS/JS portable) y servidor local `.claude/launch.json`.

## Lo que el usuario ya rechazó (no repetir)
1. **Retículas genéricas** ("cuadrícula muy fea"): nada de paneles cada N m ni Wireframe sobre todo el
   modelo. Las líneas son aristas reales medidas en la foto.
2. **Volúmenes que no coinciden** con la imagen: hay que medir, no aproximar a ojo.
3. **Personas tipo títere**: usar cuerpos MPFB posados, en arcilla limpia, sin Wireframe.
4. **Uniones mal interpretadas**: en Tepic los paraguas no terminan en punta; cierran en una U plana del
   ancho de la columna con capitel redondeado. Revisar uniones a 8–10×.
5. **Objetos desproporcionados** (la van parecía carroza): juzgar proporción, no solo bordes.
6. **Etiquetas y textos sobre la imagen**: la página debe ir limpia (solo título y Plano · Modelo · Obra).
7. **Contorno en la persiana** y **doble escalera** (cielo y foto con persianas separadas).
8. **Degradados bruscos** entre la foto y el fondo de la página.
9. **Recuadro en laptops/monitores normales**: a sangre; recuadro solo en panorámicos.
10. **Demasiado recorte en teléfono/iPad**: el edificio debe leerse (≈ 60 % visible y paneo con scroll).
11. **Huecos grandes en teléfono** entre el título, la imagen y las etapas: en vertical van como un solo
    bloque compacto centrado.
12. **Luz de la línea de escaneo cortada** en los bordes de la imagen: la línea se desvanece en sus extremos.
13. **Vegetación en el modelo/plano** ("se ve sucio"): sin árboles, arbustos ni palmeras. Si hace falta terreno,
    relieve tipo maqueta (capas planas escalonadas, curvas de nivel) — caso Nauka.
14. **Personas y vehículos en la variante plano → obra**: no los lleva; el plano es solo arquitectura y sitio.
    (Si se modelan, dejarlos en su colección excluida de la capa de vista, no borrarlos.)
15. **Patrones genéricos sobre elementos con patrón real** (celosía "cada 8 m con una diagonal"): el patrón se
    mide de la foto (ver "Celosías y fachadas con patrón"). Una retícula que no coincide se nota de inmediato.
16. **Volúmenes que no coinciden** en revisiones de detalle: revisar todo el modelo con `fit_boxes.py` y recortes
    zona por zona antes de entregar; partir cajas con dos alturas reales.
17. **Techo flotando** en el plano: si en la foto hay un apoyo (columna, muro) aunque sea parcial, modelarlo.
18. **Elementos inventados** (un plafón cuyo canto aparece como viga): si no se ve en la foto, no va.
19. **Techos como polígonos abstractos**: azoteas con pretil, andadores, equipos y paneles medidos.

## Flujo

### 0 · Upscale PRIMERO, antes de medir y calcar (`scripts/upscale.py`)
Se hace al arrancar, **antes** de resolver la cámara y de calcar el blueprint, no al final. En la foto original los
detalles finos se leen como manchas de 2–3 px: tubos y diagonales de ménsulas, el grosor real de un poste, la nariz de
un tren, montantes, guarniciones. Sobre esa foto el calco sale con postes delgados, ménsulas incompletas y un frente
mal interpretado, y el usuario tiene que dibujar a mano lo que faltó (caso Tren ligero Zapopan, 770×485). En la HD
esos bordes son nítidos: el calco, `fit_boxes.py`, `lines.py`/`vp.py` y los perfiles de brillo trabajan mejor.
- Pedir la API key de Clarity al arrancar (junto con la variante). Si el usuario no la tiene a mano, avanzar con la
  original y hacer el upscale en cuanto llegue, **antes** del pase de detalle.
- Factor: el que lleve la foto a ≈ 3000–3300 px de ancho (4× para fotos de < 1000 px, 2× para ~1600 px). Así la HD
  mide lo mismo que el plano final y ambos comparten coordenadas.
- Clarity AI `clarity-pro`, `creativity: 0`; la imagen va como data URI base64. ≈ $0.03/MP de salida
  (770×485 a 4× → 3080×1940 ≈ 6 MP ≈ $0.18; 1656×595 a 2× ≈ $0.12).
- La salida viene **redondeada** (770×485 a 4× dio 3072×1936): llevarla al tamaño exacto k× la original y comprobar
  el registro con `passes.registration(original, nueva)` (debe dar ≈ (0,0); Zapopan: −0.05, −0.11 px).
- Revisar recortes 1:1: respeta formas pero **inventa texto** donde el original era ilegible. La foto escalada sirve
  para medir y calcar, **nunca se publica con letreros, logotipos o marcas escaladas** (en fotos de un cliente
  cambiaría su logo): en la web va la foto original o su versión sin escalar en esas zonas. No medir letreros en
  la HD.
- Guardar la salida PNG tal cual (`*-hd-clarity-raw-*.png`) y la HD a tamaño exacto en JPEG q≈86 en `01-imagen-hd/`.
- Desde aquí **todo se mide y se calca sobre la HD**: la cámara se resuelve con el ancho de la HD (W, H, f y u0 en
  píxeles de la HD) y el plano se renderiza a ese mismo tamaño. Si ya había medidas sobre la original, se
  multiplican por k.
- Si el usuario entrega una versión nueva de la foto, comprobar el registro **antes** de gastar créditos.
- La API key nunca se escribe en archivos del proyecto ni del skill; recordar al usuario que la expire.

### 1 · Medir la foto (`scripts/measure.py`)
- Medir sobre la **HD** del paso 0.
- `crop_ruler(A, x0,y0,x1,y1, k, out)`: recorte ampliado con regla (cian cada 10 px, rojo cada 50 px, en
  coordenadas absolutas). Medir en recortes de 4–14×, nunca en la imagen completa.
- Elementos repetidos (aletas, parteluces): **mínimos locales del perfil de brillo** de una franja
  horizontal. Bandas horizontales (travesaños, bordillos): picos del gradiente de un perfil vertical.
- Simetría: promediar ±du alrededor del eje u0 para quitar ruido.

### 2 · Resolver la cámara
Vista frontal con verticales rectas → cámara nivelada (rot X = 90°) + `shift`.
- **Horizonte y altura**: dos objetos de altura conocida a distinta profundidad (personas ≈1.70–1.75 m,
  van ≈2.6 m). Para cada uno `s = alto_px / alto_m` y `pie_v − v_h = h·s` → `h` y `v_h`.
- **Escala de un plano**: `s = (v_base − v_h)/h` px/m donde el suelo cae en `v_base`.
- **Profundidades relativas**: elementos repetidos en el plano frontal y el posterior dan `k = Y_fondo/Y_frente`.
- **Focal**: la foto no la fija en un alzado frontal; elegirla para que la geometría sea lógica (módulos
  cuadrados en planta). No cambia el calce; sí la coherencia 3D.
- Conversión en el plano Y: `X = (u − u0)·Y/f`, `Z = h + (v_h − v)·Y/f`.
- Blender: `lens = f·36/W`, `sensor_fit=HORIZONTAL`, `shift_x = (W/2 − u0)/W`, `shift_y = (v_h − H/2)/W`.
- **Dos puntos de fuga** (esquina en perspectiva, verticales rectas): ajustar dos aristas horizontales largas por
  gradiente (ajuste de recta por mínimos cuadrados, residuo < 0.5 px) → fugas `uL`, `uR` sobre el horizonte; sin desplazamiento horizontal
  `f² = (u0 − uL)(uR − u0)`. Horizonte por la altura de personas cercanas y lejanas. Escala por gente o barandales.
- **Foto aérea oblicua (tres puntos)**: `scripts/lines.py` (segmentos LSD) + `scripts/vp.py` (RANSAC por familia de
  dirección); el ortocentro de los tres puntos de fuga es el punto principal y `f² = −(A−P)·(B−P)`. Escala por un
  elemento de tamaño conocido (ventilador de aerocondensador 10 m, contenedor, carril 3.5 m). OpenCV/SciPy van en un
  venv aparte (`python3 -m venv …; pip install opencv-python-headless scipy`), nunca dentro de Blender.
- **Ortofoto del suelo**: con la cámara resuelta, reproyectar la foto al plano Z = 0 (o a la cota de una azotea) con
  regla en metros; calles, bordes y patrones de azotea se miden ahí directamente en metros.

### 3 · Masas → detalle
Orden: losa/faldón → cubierta → columnas → muro de vidrio y su remate → bloques laterales →
aletas/travesaños → pórticos → letrero → suelo → contexto (personas, vehículos, postes, palmeras).
Cada etapa: construir → overlay → corregir → siguiente. Todas las cotas en una tabla de medidas en píxeles
(`M`, `F_MEAS`, `CTX`, `VAN` en `tepic_build.py`), derivadas a metros con la cámara.

Interpretar la estructura antes de modelar: una lectura correcta hace que varias medidas independientes
cuadren a la vez (en Tepic, los bordes medidos de cada "zigzag" quedan equidistantes de su columna →
son paraguas invertidos centrados en cada columna).

**Uniones** (columna–cubierta, losa–faldón): recortes de 8–10× de foto, modelo y plano lado a lado.
Columna y paraguas en **una sola malla** (columna → tronco de pirámide cuyo fondo es la sección de la
columna → borde superior) con peso de bevel solo en el anillo de unión.

**Ajuste automático de cajas** (`scripts/fit_boxes.py`, fuera de Blender): bordes Canny separados por familia
de dirección (A, B, vertical); cada caja (x0, y0, x1, y1, h) se ajusta minimizando la distancia de sus aristas
visibles al borde de su familia. Sale un overlay rojo (antes) / verde (después). Revisar el resultado: si una caja
"salta" a otro volumen, descartar ese ajuste y medir sus esquinas a 5–7×.

**Volúmenes curvos u ovalados** (graderío de estadio): sus horizontales no fugan a los puntos del edificio
rectangular; reconstruir cada zona sobre un plano vertical local (`VPlane`: punto + fuga propia) y llevar los
puntos de la foto por rayo a ese plano.

**Celosías y fachadas con patrón**: mapa de orientación de listones (tensor de estructura sobre la foto, umbral por
familia) → se ven los paneles reales y su alternancia. Las juntas se miden siguiendo el cambio de orientación a
varias profundidades (RANSAC), se pasan al mundo por rayo y se ajusta su ley (paso constante, inclinación). Los
listones de cada panel toman el ángulo de la foto en el centro del panel; todo se traza en la imagen, se recorta al
polígono medido de la fachada y se lleva a la malla con `objeto.ray_cast` (solo contra esa malla). Densidad: ≥ 7 px
entre líneas en la foto para que el plano no se empaste. Caso: La Casa del Atlas (`ej_detail.build_lattice_measured`).

**Azoteas**: pretil por todo el borde y, si se ven, andadores, paneles y equipos medidos en la ortofoto a la cota del
techo. Chimeneas: franjas de color como objetos separados (cada cambio de color es una línea del plano), con
plataformas y corona.

**Vehículos y objetos de contexto**: modelar desde su silueta medida (perfil extruido a lo ancho,
ventanas como placas, ruedas con llanta + rin oscuro chico, parrilla, faros, espejo, moldura, franjas).
Juzgar con `compare_region()` las proporciones que delatan el objeto: alto de techo vs. largo, largo del
cofre, inclinación y largo del parabrisas, distancia entre ejes, tamaño de rueda.
**Cara frontal en perspectiva**: si la cámara está del lado hacia donde apunta el vehículo, su silueta
incluye el frente visto de lado. Medir a 12–14× dónde está la esquina frontal **del lado cercano** (en
Tepic el faro la marcaba en u≈777, no el extremo de la silueta en 765). Con una caja recta y esa esquina,
la perspectiva genera sola el frente; no inventar cofre largo ni barrer el frente.

### 4 · Verificar (`scripts/check.py`)
- `edge_map(scene, prefix, scale)`: pase de **normales** + pase de **ID de objeto** (overrides emisivos);
  sus discontinuidades son todas las aristas reales. `overlay_edges` + `pair`: foto / foto + aristas.
- `compare_region(scene, foto, caja, out)`: foto / modelo / plano del mismo recorte apilados — para
  juzgar **proporción y lectura**, no solo bordes.
- Criterio: desfase ≤ 2 px en estructura; uniones idénticas en forma; objetos reconocibles en los 3 pases.
- No usar Freestyle para verificar (se salta aristas con caras coincidentes).

### 5 · Pases finales (`scripts/passes.py`)
- `render_model`: arcilla clara, vidrio oscuro casi opaco, franjas de luz interior emisivas **delante**
  del vidrio, mundo `#171726`, exposición ≈ −0.4, letreros gris oscuro. 2× la resolución de la foto.
- `render_plano`: `edge_map` a 4× promediado a 2×, `#9AA6FF` sobre `#171726`. Solo aristas reales.
- Un solo modelo para ambos pases: si algo se ve distinto entre plano y render, está subdetallado.
- Variante **2 etapas**: `render_model` se corre igual (sirve para `compare_region` y para detectar faltantes),
  pero no se copia a la web.

### 6 · Foto en alta para la web
- La HD ya existe desde el paso 0; aquí solo se copia a la web (`05-web/…-obra.jpg`) con `?v=N` nuevo.
- Debe medir ≈ 2× el ancho de pantalla si va a sangre (en 1080p), con la misma proporción y tamaño que el plano.
- Si por alguna razón el upscale se hizo hasta este punto, verificar el registro contra el plano antes de publicar.

### 7 · Integración web (`references/web-cortina.md`)
- Montar la variante elegida (ver "Antes de empezar"). La de 2 etapas está al final de `web-cortina.md`: misma
  base, sin la capa de modelo, sin persiana y con un solo barrido plano → foto que también descubre el cielo.
- Las tres capas en una caja con la **proporción exacta de la foto**; el scroll solo escribe variables
  CSS (`--wipeX`, `--comb`, `--combSky`, `--zoom`, `--pan`, `--bandTop`…), nunca estado por frame.
- Barrido plano → modelo con línea de escaneo **que se desvanece arriba y abajo** (máscara seno 0–30 % y
  70–100 %; si no, su brillo se corta en seco en el borde de la imagen); persiana escalonada modelo → obra
  **sin contorno**.
- **Cielo extendido sin editar la foto** (`passes.sky_strip`): tira del borde superior estirada encima de
  la banda (55 % de su alto) con fundido suave; **persiana compartida** con la foto.
- Fundidos con curva seno de 12 paradas, nunca `linear-gradient` de 2 paradas. Foto: fundido solo abajo.
- Responsivo: a sangre por defecto (vertical ≤ 160 % del ancho + paneo); recuadro redondo de ≤ 1240 px
  solo en panorámicos (`min-aspect-ratio:21/10`). Horizontal: caja centrada en el hueco real título–etapas.
  **Vertical** (`max-aspect-ratio:1/1`): título → imagen → etapas como un bloque compacto (44 px y 36 px de
  separación) centrado en pantalla y debajo de la barra de navegación (≥ 96 px); en teléfono el bloque
  repartido dejaba ~550 px vacíos para una imagen de 216 px.
- Probar: 375×812, 820×1180, 1180×820, 1440×900, 1920×1080, 2560×1080, 3440×1440.
- Como **sección completa entre otras secciones** de una página (franja 5:2 a todo el ancho, tope de alto en
  horizontal, colores según el fondo de la página): `references/variantes-a-todo-el-ancho.md`.

## Relacionado
Para planos técnicos de un activo sin foto de referencia (alzado/planta/frente desde un modelo 3D,
estilo Palantir), usar la skill **lamina-tecnica**.

## Trampas conocidas
- `bpy.data.images.load(check_existing=True)` devuelve la imagen **en caché**: al releer un render
  regenerado salen datos viejos. Siempre `check_existing=False` y borrar la imagen tras leerla.
- Sin luces, un render normal sale negro: para verificar se usan materiales emisivos (override).
- Sombreado suave + bevel: si todas las caras son smooth, los pliegues vecinos se suavizan y
  **desaparecen del plano**. Marcar `sharp_edge` en todas las aristas excepto las que llevan bevel; sin
  `harden_normals`.
- Caras coincidentes (losa sobre tapas de pirámides): quitar tapas ocultas y separar 1–2 cm.
- Elementos que sobresalen del plano (pórticos) muestran su cara lateral: el borde frontal no es el último
  borde oscuro visible.
- Profundidad cerca del horizonte: ±1 px son metros. Fijarla con objetos de altura conocida.
- Imágenes generadas por IA no son del todo coherentes en perspectiva: en lo secundario se prioriza la
  geometría plausible; en la estructura principal, no se acepta desfase.
- Objetos detrás de volúmenes: verificar en el overlay que no queden tapados.
- Texto 3D rotado 90° en X: su altura es la dimensión **Y local** (Z es la extrusión).
- Los cuerpos MPFB comparten malla entre copias: cambiar su material afecta a todas las escenas.
- **JPEG con colores exactos**: `image.save_render()` aplica la vista de la escena (AgX, exposición −0.4), así
  que fotos y plano salían alterados y el fondo del render no era `#171726` (se notaba el borde de la imagen en
  la página). Usar `passes.save_jpg()` (vista Standard temporal) y `render_model()` con fondo transparente
  compuesto sobre el azul exacto. `Image.save()` a secas guarda PNG aunque el archivo diga `.jpg`.
- **Fantasmas en la persiana**: si la foto se funde (máscara), debajo se ven el modelo y el plano. Poner una capa
  azul con la misma `--comb` entre modelo y foto, y no fundir la foto arriba: arriba va el cielo extendido.
- **Copas cortadas por el marco** (palmeras que tocan el borde superior): el cielo extendido las continúa
  reflejando las filas de la propia foto y disolviéndolas en el cielo, solo en columnas donde la fila 0 no es cielo
  (si no, aparecen palmeras flotando). Ver `nauka_paisaje`/caso Nauka.
- **Blender interactivo ocupado** (otra sesión cambió el archivo abierto): trabajar en un Blender sin interfaz
  (`Blender -b archivo.blend --python run.py -- tarea.py [--save]`) con los textos del proyecto cargados; nunca
  cerrar ni guardar encima del archivo de otra sesión.
- **MPFB sin interfaz**: `addon_utils.enable("bl_ext.user_default.mpfb")` y `HumanService.create_human(...)`.
- **Imagen alta (≈ 16:9 o más vertical) en la web**: en horizontal la banda no va a sangre (tapa el título): cabe en
  el hueco título–etapas con fundido lateral (`@media (min-aspect-ratio:1/1)`). Foto aérea sin cielo: fundido arriba y
  abajo, sin tira de cielo.
- **Puertos del servidor local**: comprobar `lsof -i :PUERTO` antes de asignar uno en `.claude/launch.json`; no tocar
  entradas de otros servidores.
- Servidor local `python -m http.server`: el navegador cachea → añadir `?v=N`; si la página no carga,
  el servidor pudo haberse detenido (reiniciarlo con `preview_start`).
- Capturas del navegador integrado tras un scroll programático pueden mostrar el frame anterior:
  confirmar con JS o capturar dos veces. Al cargar con `#ancla`, repetir el scroll tras ~0.5 s.

## Caso de referencia: Aeropuerto de Tepic (foto 1024×368; HD 3312×1190)
- Cámara: f = 630 px (22.1 mm), h = 2.6 m, horizonte v = 254.5, eje u0 = 513.5.
- Plano de columnas Y = 67.5 m, faldón Y = 60 m (k = 1.126), módulos de cubierta cuadrados de 15 m.
- Columnas X = ±8.34, ±22.62, ±37.5, sección ≈ 0.96 m (9 px), cabeza Z = 10.75 con capitel r ≈ 0.24 m.
- Faldón Z 15.84–17.88; remate del vidrio a media crujía Z = 14.88; 68 aletas en posiciones medidas.
- Van Sprinter: plano de ruedas Y ≈ 38 m, esquina frontal cercana u ≈ 777, ruedas r ≈ 0.4 m.
- 47 personas MPFB (5 cuerpos base, poses de `poselib.py`), 5 palmeras, postes, pasillo cubierto.
- Construcción: `scripts/tepic_build.py` (`build_masses`, `build_facade`, `build_context`, `build_van`).
