"""Genera el manual de identidad de referencia (Informe Anual Integrado 2025 de Grupo Bimbo).

    <venv con Pillow>/bin/python generar_manual.py
Salida: manual-identidad-bimbo-2025.html (autocontenido, imágenes embebidas). El PDF se imprime aparte con Playwright.
Las imágenes vienen de ~/Downloads/manual de identidad/ (mismas capturas que están en el shared drive, IDs en ids.json)
y de recortes/ (recortes sin texto, también en el drive).
"""
import base64
import io
import json
import os

from PIL import Image

AQUI = os.path.dirname(os.path.abspath(__file__))
CAPTURAS = os.path.expanduser('~/Downloads/manual de identidad/')
ORDEN = json.load(open(os.path.join(AQUI, 'orden.json')))
IDS = json.load(open(os.path.join(AQUI, 'ids.json')))


def img(n, ancho=900, recorte=False):
    ruta = os.path.join(AQUI, 'recortes', f'{n}.jpg') if recorte else CAPTURAS + ORDEN[int(n) - 1]
    im = Image.open(ruta).convert('RGB')
    if im.width > ancho:
        im = im.resize((ancho, round(im.height * ancho / im.width)), Image.LANCZOS)
    b = io.BytesIO(); im.save(b, 'JPEG', quality=72, optimize=True, progressive=True)
    return 'data:image/jpeg;base64,' + base64.b64encode(b.getvalue()).decode()


def fig(n, pie, ancho=900, recorte=False, clase=''):
    ref = f'captura {n} · {IDS.get(n, "")}' if not recorte else f'recorte sin texto de {IDS.get(n, "")}'
    return f'<figure class="{clase}"><img src="{img(n, ancho, recorte)}" alt="{pie}"><figcaption>{pie} <span>{ref}</span></figcaption></figure>'


def fig_pdf(pagina, pie, ancho=900):
    ruta = os.path.join(AQUI, 'especimenes', f'anexos-p{pagina:02d}.png')
    im = Image.open(ruta).convert('RGB')
    if im.width > ancho:
        im = im.resize((ancho, round(im.height * ancho / im.width)), Image.LANCZOS)
    b = io.BytesIO(); im.save(b, 'JPEG', quality=78, optimize=True)
    src = 'data:image/jpeg;base64,' + base64.b64encode(b.getvalue()).decode()
    return f'<figure><img src="{src}" alt="{pie}"><figcaption>{pie} <span>Anexos de datos de desempeño 2025, página {pagina} completa · BMB-00337</span></figcaption></figure>'


COLORES = [
    ('Corporativo', [('Azul Bimbo (informe)', '#15359D'), ('Azul medio', '#2253B1'), ('Azul claro', '#8FC9E6'), ('Azul noche (datos)', '#0F2F51'), ('Rojo logotipo', '#EE353A')]),
    ('Para ti · nutrición', [('Naranja', '#DF8A35'), ('Ámbar', '#EEB14F'), ('Crema', '#FAE5C5')]),
    ('Para la vida · gente y comunidad', [('Magenta', '#D33D66'), ('Vino', '#A02949'), ('Rosa', '#E2838C')]),
    ('Para la naturaleza · planeta', [('Verde', '#479851'), ('Verde bosque', '#1B4A31')]),
    ('Cimientos · calidad e inocuidad', [('Café horneado', '#954F1E'), ('Caramelo', '#BD8952')]),
    ('Gobierno corporativo', [('Menta', '#6EB3AD'), ('Menta clara', '#91CEC9'), ('Pizarra', '#34596E')]),
    ('Casos de éxito', [('Mostaza', '#BE973C'), ('Arena', '#DFC389')]),
]


def paleta():
    out = []
    for grupo, cs in COLORES:
        chips = ''.join(f'<div class="chip"><div class="m" style="background:{h}"></div><b>{n}</b><code>{h}</code></div>' for n, h in cs)
        out.append(f'<div class="grupo"><h4>{grupo}</h4><div class="chips">{chips}</div></div>')
    return ''.join(out)


HTML = f'''<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Manual de identidad de referencia · Bimbo 2025</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
:root{{--azul:#15359D;--noche:#0F2F51;--tinta:#1C1F2A;--gris:#5E6371;--regla:#E3E6EE;--papel:#FFFFFF}}
*{{box-sizing:border-box}} body{{margin:0;font:400 15.5px/1.6 Outfit,system-ui,sans-serif;color:var(--tinta);background:var(--papel)}}
.pag{{max-width:1080px;margin:0 auto;padding:56px 48px;page-break-after:always}}
h1,h2,.display{{font-family:Outfit,sans-serif;font-weight:900;letter-spacing:-.01em;line-height:.92;text-transform:uppercase}}
h1{{font-size:88px;margin:0}} h2{{font-size:46px;margin:0 0 18px;color:var(--azul)}} h3{{font:800 18px/1.3 Outfit;margin:26px 0 8px}} h4{{font:700 13px/1.2 Outfit;letter-spacing:.08em;text-transform:uppercase;color:var(--gris);margin:0 0 10px}}
.k{{font:700 12px/1 Outfit;letter-spacing:.16em;text-transform:uppercase;color:#8FC9E6;margin-bottom:14px}}
p{{max-width:70ch;margin:0 0 12px}} ul{{margin:0 0 12px;padding-left:20px;max-width:72ch}} li{{margin:0 0 6px}}
.portada{{background:var(--azul);color:#fff;max-width:none;min-height:100vh;display:flex;flex-direction:column;justify-content:center;padding:72px max(48px,calc(50vw - 492px))}}
.portada p{{color:#DCE3F7;font-size:18px}} .apilado{{font-size:120px;line-height:.86}} .contorno{{color:transparent;-webkit-text-stroke:2px #fff}}
.grid2{{display:grid;grid-template-columns:1fr 1fr;gap:18px}} .grid3{{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}}
figure{{margin:0 0 6px;break-inside:avoid}} figure img{{width:100%;display:block;border-radius:10px;border:1px solid var(--regla);object-fit:contain;object-position:center;background:#F2F3F6;max-height:420px}} .grid3 figure img{{height:240px}} .grid2 figure img{{height:300px}}
figcaption{{font-size:12px;color:var(--gris);margin-top:6px}} figcaption span{{color:#9AA0AE}}
.grupo{{margin:0 0 18px;break-inside:avoid}} .chips{{display:flex;flex-wrap:wrap;gap:12px}} .chip{{width:150px;font-size:12.5px}} .chip .m{{height:74px;border-radius:10px;margin-bottom:6px;border:1px solid rgba(0,0,0,.06)}} .chip b{{display:block;font-weight:700}} .chip code{{color:var(--gris)}}
.nota{{font-size:12.5px;color:var(--gris);border-left:3px solid var(--regla);padding-left:12px;margin-top:14px}}
.tipo-demo{{background:#34596E;color:#6EB3AD;border-radius:12px;padding:26px 30px;margin:10px 0 16px}}
.tipo-demo .display{{font-size:76px}} .tipo-demo .linea{{font-size:76px;color:transparent;-webkit-text-stroke:1.5px #91CEC9}} .fuentes td:first-child{{font-weight:700;white-space:nowrap}}
.si{{border-top:4px solid #479851;padding-top:10px}} .no{{border-top:4px solid #D33D66;padding-top:10px}}
table{{width:100%;border-collapse:collapse;font-size:13.5px;margin-top:10px}} th,td{{text-align:left;padding:9px 8px;border-bottom:1px solid var(--regla);vertical-align:top}} th{{font-size:11.5px;letter-spacing:.06em;text-transform:uppercase;color:var(--gris)}}
@page{{size:A4 landscape;margin:0}} @media print{{body{{font-size:12.5px}} .pag{{width:297mm;height:210mm;max-width:none;padding:12mm 15mm;overflow:hidden;page-break-after:always;break-after:page}} .portada{{min-height:0}} h2{{font-size:36px;margin-bottom:10px}} h3{{margin:12px 0 6px;font-size:15px}} p,li{{margin-bottom:5px}} .grid3 figure img{{height:46mm}} .grid2 figure img{{height:58mm}} .paleta{{columns:2;column-gap:28px}} .chip{{width:104px}} .chip .m{{height:22px;margin-bottom:2px}} .chips{{gap:8px}} .pag-color .grid3 figure img{{height:22mm}} .pag-color .nota{{margin-top:6px}} .pag-tipo .grid2 figure img{{height:50mm}} .pag-tipo .nota{{margin-top:6px}} .grupo{{margin-bottom:8px}} .tipo-demo{{padding:14px 22px}} .tipo-demo .display,.tipo-demo .linea{{font-size:54px}} .apilado{{font-size:104px}} table{{font-size:11.5px}} th,td{{padding:5px 6px}} figcaption{{font-size:10px;margin-top:3px}} a{{color:inherit}}}}
@media (max-width:760px){{.grid2,.grid3{{grid-template-columns:1fr}} h1{{font-size:56px}} .apilado{{font-size:72px}} .pag{{padding:36px 18px}}}}
</style></head><body>

<section class="pag portada">
  <div class="k">Manual de identidad de referencia · uso interno de Nuclea</div>
  <div class="display apilado">CELE<br>BRA<br><span class="contorno">MOS</span></div>
  <h1 style="font-size:54px;margin-top:22px">lo que nos une</h1>
  <p style="margin-top:22px">Abstracción del lenguaje visual del <b>Informe Anual Integrado 2025 de Grupo Bimbo</b>, la pieza más reciente de la marca (80 años). Sirve de referencia para la demo web; no es el manual oficial de Bimbo ni lo sustituye.</p>
  <p style="font-size:13px;color:#AFC0EC">Preparado por Nuclea Solutions · 2 de noviembre de 2026 · Fuente: 52 capturas del informe guardadas en el shared drive Bimbo (marca-identidad / informe 2025).</p>
</section>

<section class="pag">
  <h2>1 · La idea</h2>
  <p><b>"Celebramos lo que nos une"</b> organiza todo el informe: cada capítulo arranca con el verbo <i>Celebramos</i> y un complemento (<i>ochenta años de estar cerca de la gente</i>, <i>estar juntos</i>, <i>estar conectados</i>, <i>transformar</i>). El tono es festivo, cercano y orgulloso del oficio, sin perder la sobriedad de un informe financiero.</p>
  <ul>
    <li><b>Herencia y presente juntos:</b> el Osito de 1945 en línea sepia convive con el Osito 3D actual en la portada.</li>
    <li><b>Un color por pilar:</b> la estrategia "Alimentamos un mundo mejor" se reconoce por color (Para ti, Para la vida, Para la naturaleza, Cimientos, Gobierno).</li>
    <li><b>Tipografía como imagen:</b> titulares enormes, partidos en sílabas apiladas, alternando sólido y contorno.</li>
    <li><b>Gente real y pan de cerca:</b> fotografía cálida de personas sonriendo, colaboradores con uniforme y texturas de pan y trigo.</li>
  </ul>
  <div class="grid2">{fig('23', 'Portada: Osito de 1945 y Osito 3D, sello 80 años')}{fig('27', 'Índice: un bloque de color por pilar')}</div>
</section>

<section class="pag pag-color">
  <h2>2 · Color</h2>
  <p>Base corporativa en azul y un color de acento por pilar. Los valores se midieron sobre las capturas (pantalla, compresión), así que son aproximados: <b>antes de producción pedir los valores oficiales a Bimbo</b>. El rojo del logotipo viene de la hoja de estilos de grupobimbo.com.</p>
  <div class="paleta">{paleta()}</div>
  <p class="nota">Regla observada: el color de pilar cubre bloques completos (fondos a sangre o mosaicos), nunca se usa en degradados. El texto sobre color va en blanco o en el tono más claro del mismo pilar.</p>
  <div class="grid3">{fig('51', 'Para la vida: magenta, vino y rosa', 700)}{fig('18', 'Gobierno: menta sobre pizarra', 700)}{fig('20', 'Casos de éxito: mostaza con trigo', 700)}</div>
</section>

<section class="pag pag-tipo">
  <h2>3 · Tipografía</h2>
  <p>Confirmado con las fuentes incrustadas en un PDF de Bimbo (<i>Anexos: datos de desempeño 2025</i>, BMB-00337, hecho en InDesign en julio de 2026). <b>No son tipografías propietarias de Bimbo:</b> son fuentes comerciales y libres con licencia, que Bimbo eligió para su material 2025.</p>
  <table class="fuentes"><tr><th>Uso</th><th>Fuente</th><th>Origen y licencia</th></tr>
  <tr><td>Titulares, palabras apiladas, contornos</td><td>Poleno Bold</td><td>DizajnDesign (Eslovaquia, Ján Filípek, 2006). Comercial: Adobe Fonts (incluida en Creative Cloud, con uso web), MyFonts o Fontspring.</td></tr>
  <tr><td>Cifras grandes y rótulos ("DESEMPEÑO", 95%)</td><td>Poleno Medium</td><td>Misma familia.</td></tr>
  <tr><td>Portada gigante ("DATOS DE")</td><td>Bozilla</td><td>Creative Fabrica, solo con suscripción.</td></tr>
  <tr><td>Texto, subtítulos, tablas y cifras de tabla</td><td>Outfit (Light a Black)</td><td>Google Fonts, gratuita (licencia libre OFL). Es la que usa este manual.</td></tr>
  <tr><td>Notas puntuales</td><td>Roboto</td><td>Google Fonts, gratuita.</td></tr></table>
  <p class="nota">Poleno nació como identidad de un grupo de danza folclórica y se inspira en un grabado en madera: de ahí su borde irregular, "tallado" o "horneado". Trae alternativas contextuales al azar cuando se repiten letras. Para la demo web: Poleno por Adobe Fonts (proyecto web con la cuenta de Creative Cloud) y Outfit de Google Fonts. No extraer las fuentes incrustadas de los PDF del cliente: son subconjuntos y su licencia no lo permite. Si no hay licencia de Poleno, Outfit Black es la opción más fiel sin costo. Ojo: el sitio actual de grupobimbo.com usa Montserrat; el material 2025 ya migró a Outfit.</p>
  <div class="grid2">{fig_pdf(1, 'Bozilla ("DATOS DE") y Poleno Medium ("DESEMPEÑO")')}{fig_pdf(2, 'Poleno Bold en contorno ("Exclusiones") y Outfit en el texto')}</div>
</section>

<section class="pag">
  <h2>3 · Recursos tipográficos</h2>
  <ul>
    <li><b>Sílabas apiladas:</b> la palabra se parte para llenar el bloque: CELE / BRA / MOS, IN / FOR / ME, VI / DA, NA / TU / RA / LE / ZA.</li>
    <li><b>Sólido + contorno:</b> el subtítulo va sólido y la palabra grande en contorno (o al revés), a menudo sobre fotografía o sobre el color del pilar.</li>
    <li><b>Letras rellenas de foto:</b> "ALIMENTAMOS" con imágenes dentro de cada letra.</li>
    <li><b>Cifras gigantes en Poleno Medium</b> con una línea de explicación en Outfit Bold debajo.</li>
  </ul>
  <div class="grid2">{fig_pdf(5, 'Para ti: TI apilado en Poleno Bold, 95% en Poleno Medium, tablas en Outfit')}{fig_pdf(8, 'Para la vida: VI / DA en contorno sobre magenta')}</div>
  <div class="grid3">{fig('03', 'Contorno sobre azul', 600)}{fig('38', 'Letras rellenas de fotografía', 600)}{fig('05', 'Contorno sobre foto de masa', 600)}</div>
</section>

<section class="pag">
  <h2>4 · Osito y 80 años</h2>
  <p>El Osito aparece como <b>embajador</b>, no como decoración: el Osito 3D caminando con pan bajo el brazo en las piezas de aniversario, el Osito clásico de línea para hablar de herencia y un <b>patrón de ositos de línea tono sobre tono</b> en azul como textura de fondo.</p>
  <div class="grid3">{fig('29', '80 años de creer y crear', 600)}{fig('30', 'Patrón de ositos de línea en azul', 600)}{fig('01', 'Osito en contorno detrás del titular', 600)}</div>
  <p class="nota">El Osito es mascota de la marca Bimbo y aparece en los sitios de México, España, Portugal, Colombia, Centroamérica, Perú, Brasil y Argentina. En una pieza corporativa del grupo, su uso es decisión de Bimbo. Pedir los vectores y renders oficiales; no redibujarlo.</p>
</section>

<section class="pag">
  <h2>5 · Iconografía y gráficos</h2>
  <p>Íconos planos, gruesos y de esquinas redondeadas, en dos tonos del color del pilar (portapapeles, balanza en manos, corazón con manos, espiga con flecha, tazón). Las infografías usan el mismo lenguaje: mapas hechos con granos sobre el <b>mantel de cuadros azules</b> (el mismo patrón de la bolsa de pan y de los camiones), diagramas con la <b>B</b> al centro y gráficas de área en azul sobre azul noche.</p>
  <div class="grid2">{fig('28', 'Mapa hecho con granos: cifras del grupo', 800)}{fig('36', 'Cadena de valor en pentágono con la B al centro', 800)}</div>
  <div class="grid2">{fig('40', 'Íconos duotono del pilar Para ti', 700)}{fig('37', 'Gráfica de 80 años de crecimiento', 700)}</div>
</section>

<section class="pag">
  <h2>6 · Fotografía</h2>
  <div class="grid2"><div class="si"><h3>Así se ve</h3><ul><li>Personas reales riendo, luz natural cálida (tarde dorada).</li><li>Colaboradores con uniforme, cofia o casco, mirando a cámara.</li><li>Pan en macro: miga, semillas, corteza; sándwiches sobre madera.</li><li>Campo de trigo y manos con espigas.</li><li>Herencia: el camión antiguo como escenario.</li></ul></div>
  <div class="no"><h3>Evitar</h3><ul><li>Fotos de banco de imagen frías o posadas sin contexto.</li><li>Fondos grises de estudio para personas.</li><li>Escalar con IA fotos con logos o letreros.</li><li>Texto encima de rostros.</li></ul></div></div>
  <div class="grid3" style="margin-top:14px">{fig('24', 'Celebramos: momentos compartidos', 600, True)}{fig('31', 'Herencia: el camión antiguo (original del informe)', 600)}{fig('48', 'Campo: manos con trigo', 600, True)}</div>
  <div class="grid3">{fig('25', 'Estar juntos', 600, True)}{fig('41', 'Pan en macro', 600)}{fig('54', 'Colaboradora con uniforme', 600)}</div>
</section>

<section class="pag">
  <h2>7 · Composición</h2>
  <ul>
    <li><b>Mosaico de bloques:</b> retícula de rectángulos de color y foto (índice, categorías, anexos). Cada bloque tiene un título apilado y una flecha o número.</li>
    <li><b>Foto a sangre + titular en contorno</b> en la mitad libre de la imagen.</li>
    <li><b>Bloque de color con ícono grande</b> para abrir capítulo (pilares).</li>
    <li><b>Columna estrecha de texto</b> en blanco sobre azul, con mucho aire.</li>
  </ul>
  <div class="grid2">{fig('32', 'Mosaico de categorías de producto', 800)}{fig('02', 'Mosaico de anexos con fotos de pan', 800)}</div>
</section>

<section class="pag">
  <h2>8 · Cómo usarlo en la demo web</h2>
  <table><tr><th>Página</th><th>Qué tomar del informe</th></tr>
  <tr><td>Toda la demo</td><td>Titulares en Poleno (Adobe Fonts) con Outfit para texto y datos; Outfit Black como respaldo sin licencia.</td></tr>
  <tr><td>Home</td><td>Azul Bimbo a sangre, titular apilado sólido + contorno ("CELE/BRA/MOS"), una sola foto cálida. Claridad ante todo.</td></tr>
  <tr><td>Nuestra estrategia</td><td>Un color por pilar en bloques completos y sus íconos duotono; el índice en mosaico como navegación.</td></tr>
  <tr><td>Marcas y categorías</td><td>Mosaico de categorías (pan de caja, bollería, tortillas, botanas, galletas) con foto de producto en macro.</td></tr>
  <tr><td>Historia (80 años)</td><td>Osito de 1945 frente al Osito 3D, el camión antiguo, la gráfica de crecimiento y los camioncitos de juguete por década.</td></tr>
  <tr><td>Sustentabilidad</td><td>Verde para la naturaleza, campo de trigo, mapa de la flotilla eléctrica.</td></tr>
  <tr><td>Inversionistas</td><td>Azul noche para datos, cifras gigantes en display, gráficas de área.</td></tr></table>
  <h3>Cifras que aparecen en el informe (verificar antes de publicar)</h3>
  <p>93 países (39 con operación directa y 54 con socios estratégicos), +100 marcas, +9 mil productos, 249 panaderías y plantas, +153 mil colaboradores, +54 mil rutas, +1.7 mil centros de venta, ventas netas de $426,952 millones de pesos (+4.6 % contra 2024) y UAFIDA ajustada de $59,456 millones (+7.2 %). Son las cifras de la captura 28 ({IDS.get("28")}); el sitio actual dice 39 países y 152,000 colaboradores, así que hay que alinear con el cliente cuál se publica.</p>
  <p class="nota">Recursos: todas las capturas están en el shared drive Bimbo, tema <code>marca-identidad</code>, subcarpetas <code>2025-*</code> (BMB-00272 a BMB-00323); los recortes sin texto, en la subcarpeta <code>informe-2025-sin-texto</code> de cada tema (BMB-00324, 00325, 00327, 00328 y 00332). Solo se recortó cuando el corte no toca personas, productos ni logos; en los demás casos se usa el original completo. Búsqueda: <code>media_db.py buscar informe-2025</code>.</p>
</section>
</body></html>'''

open(os.path.join(AQUI, 'manual-identidad-bimbo-2025.html'), 'w', encoding='utf-8').write(HTML)
print('manual-identidad-bimbo-2025.html', round(len(HTML) / 1e6, 2), 'MB')
