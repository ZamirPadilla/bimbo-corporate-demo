# Genera las tablas de videos clave del README a partir de datos/youtube-videos.json y la curaduría de abajo.
# Uso: python3 herramientas/tablas_videos.py > datos/tablas-videos.md
import json, os
base = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
V = {v['id']: v for v in json.load(open(os.path.join(base, 'datos', 'youtube-videos.json')))}
CURADURIA = {
  'Historia y herencia (80 años)': [
    ('Td6a_1Wzepw', 'Relato oficial de la historia en 3.5 min; base del guion de la página Historia.'),
    ('zs3QjSIPnoc', 'El primer vehículo de reparto, conservado: punto de partida de la animación de camioncitos.'),
    ('RYSF1BwoB8U', 'Serie "Memorias que nos unen" (80 años): testimonios para la línea de tiempo.'),
    ('kNOUXIjBcPA', 'Show de drones "Bimbo 80" en Monterrey: imagen de cierre para el 80 aniversario.'),
    ('QWWc1kq0LmI', 'Propósito "Alimentamos un mundo mejor" (oct 2026): abre con el anuncio "Yo soy Bimbo" de época.'),
  ],
  'Camioncitos y reparto': [
    ('qY1UbQst-rA', 'Elegido por el equipo. Los camioncitos de juguete del 80 aniversario ("Celebrando contigo 80 años").'),
    ('vFoSDst0NGY', 'Confirma la colección: "¡Son 6 camioncitos diferentes!"; se ven los seis en fila.'),
    ('R7oL2slQrMs', 'Flota eléctrica: el camión actual con el que termina la transformación.'),
    ('9F1kggZ4OA4', 'Moldex, la empresa de Bimbo que "hornea" vehículos eléctricos: dato de manufactura propia.'),
  ],
  'Osito Bimbo': [
    ('x2uKgMLtKjI', 'Elegido por el equipo. Bimbo España usa al Osito en 3D; tono tierno y cotidiano.'),
    ('LtRf5OC0F7E', '"¿Adiós al Osito Bimbo?": la postura de la empresa sobre el personaje y el etiquetado.'),
    ('H8tAfRzbhzw', 'El Osito en acción en vivo (botarga): referencia de cómo se mueve el personaje.'),
  ],
  'Campañas de marca (otra línea, tono de producto)': [
    ('KLZKyXxRtt8', 'Elegido por el equipo. Panqué Bimbo: rebanada con pasas flotando sobre fondo de color plano.'),
    ('PGrOeXvRj6o', 'Bimbópolis: productos animados como personajes.'),
    ('QUzqLH_KfY8', '"Haz sándwich": producto real, tomas cálidas y cotidianas.'),
    ('q2Dn1HN0MMA', 'Spot "Es querer", el más visto del canal de Bimbo España.'),
    ('5SREz_-vtTc', 'Rebanada Estilo Artesano: macro de textura de pan; útil para fondos.'),
  ],
  'Cómo se hace el pan (manufactura y gente)': [
    ('H2iIeOPV8RE', 'Serie "Más allá del pan", cap. 1: agricultura regenerativa, del campo a la mesa.'),
    ('mzLwq8yF5H8', 'Cap. 2: Víctor Contreras, maestro hornero. Toma aérea de planta.'),
    ('BBfi7iibAfk', 'Cap. 3: más que una vendedora.'),
    ('JcJOYeUnUwQ', 'Cap. 4: el alma de la tiendita.'),
    ('hEGzFMfNU0E', 'Cap. 5: más allá del pan. Aérea de centro de distribución con flota.'),
    ('bliNMgiw2Y4', 'Hornear con pasión: maestro panadero en planta.'),
    ('tF7Ocv-SH3Y', 'Visitas virtuales: el Osito invita a conocer la panadería.'),
    ('ag23RVEFEds', 'Tecnología de empaques (biodegradables y compostables).'),
    ('3Wvdz9tr9ZQ', 'Primera mujer gerente de producción en Bimbo México.'),
  ],
  'Tecnología y visión (para la lectora de Arquitectura)': [
    ('PI-ARu-4AtI', 'Satya Nadella (Microsoft) en la Junta Internacional de Dirección de Grupo Bimbo.'),
    ('FZRdk5QV1fg', 'Llegamos a 100 plantas: el más visto del canal corporativo.'),
  ],
  'Sustentabilidad': [
    ('R8G2cT-oUZM', 'Agricultura regenerativa en el campo mexicano.'),
    ('SNOfYtJ0uo0', 'Parque eólico Piedra Larga (Oaxaca).'),
    ('Or3wUlPcZFI', 'Informe anual 2025 en 1:43: cifras narradas, útil para validar datos.'),
    ('9ML9-BdCcdw', 'Mujeres que creen y crean (8M 2026): el banner de la home actual apunta a un dominio caído.'),
    ('vIlT9G7wu-Y', 'Bimbo Global Race: comunidad en varios países.'),
  ],
}
for tema, lista in CURADURIA.items():
    print(f'### {tema}\n')
    print('| Video | Canal | Duración | Vistas | Para qué nos sirve |')
    print('|---|---|---:|---:|---|')
    for i, nota in lista:
        v = V.get(i, {})
        t = (v.get('titulo') or i).replace('|', '·')
        print(f"| [{t}](https://www.youtube.com/watch?v={i}) | {v.get('canal', '—')} | {v.get('duracion') or '—'} | {v.get('vistas') or '—'} | {nota} |")
    print()
