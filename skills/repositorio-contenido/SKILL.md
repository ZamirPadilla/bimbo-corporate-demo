---
name: repositorio-contenido
description: Arma el repositorio de contenido oficial de un prospecto para su demo — inventario completo de sus canales de YouTube (corporativo y de marca por país) ordenado por vistas, videos clave curados por sección del sitio, imágenes oficiales de su sitio y de sus marcas descargadas con manifiesto (fuente, tamaño, sha256), loops de video de su web, Vimeo e informes, revisión de en qué países aplica su mascota o un elemento de marca, y un README con todo, copiado a Google Drive. Úsala cuando pidan "busca contenido de X que podamos usar", "repositorio de contenido", "qué hay en YouTube de la marca", "descarga las imágenes a Drive", "lista los videos importantes", "en qué países aplica la mascota", o al arrancar el diseño de la demo de un prospecto, aunque no digan "repositorio".
---

# Repositorio de contenido del prospecto

La demo se ve real cuando usa el material del propio cliente: su historia contada por ellos, sus fotos, sus
anuncios, su mascota bien usada. Esta skill reúne ese material de forma ordenada y verificable antes de diseñar.
Es una rama del benchmark de inspiración (skill `benchmark-inspiracion`): el benchmark dice **cómo** se puede
ver; el repositorio dice **con qué**.

El caso de referencia es Grupo Bimbo (2 nov 2026): el README del repositorio de contenido de Bimbo, guardado en su drive como `BMB-00242`.

## Flujo

### 1 · Fuentes (en este orden)
1. **Sitio corporativo:** Nosotros, Historia, Fundadores, Sustentabilidad, Únete, Prensa, Centro de descargas.
   Las imágenes de historia suelen traer la línea de tiempo completa dentro de la imagen.
2. **Sitios de marca por país** (los enlaza el propio corporativo en Marcas): renders de mascota, secciones de
   historia de la marca (Bimbo México tenía la evolución oficial del Osito 1945–2012 con texto por etapa).
3. **YouTube:** canal corporativo y canales de marca de los países clave. Inventario completo con
   `scripts/yt_canal.py` (API interna con continuaciones; ~2.5 s entre páginas). Ordenar por vistas, pero
   recordar que los anuncios de marca traen pauta pagada.
4. **Videos de la web actual:** los MP4 que usa su sitio (loops de hero, escritorio y móvil) y los Vimeo
   incrustados (`vimeo.com/api/oembed.json?url=…` da título y duración).
5. **Informes y prensa:** informe anual, centro de descargas, notas de prensa; la prensa de terceros se enlaza,
   no se descarga.
6. **Lo que pida el usuario en el camino** (videos que le gustaron, ideas): se anotan con su nombre en la curaduría.

### 2 · Descargar con manifiesto
- Imágenes: `scripts/descargar_imagenes.py lista.json imagenes/ <origen>`; lista = `[[pagina, url, alt], …]`.
  Escribe `imagenes/manifiesto.csv` con archivo, categoría, página, URL, alt, bytes, ancho, alto y sha256.
- Categorías por página (historia, sustentabilidad, gente, prensa, producto, marca, manufactura, mascota).
- Miniaturas de YouTube **nombradas por ID** (`i.ytimg.com/vi/<id>/maxresdefault.jpg`, con `hqdefault` de
  respaldo); si se descargan con el nombre original, todas se llaman `maxresdefault.jpg` y se pisan.
- Los videos de YouTube no se descargan: se enlazan o incrustan.

### 3 · Revisar visualmente
Hoja de contactos de cada carpeta (ver `benchmark-inspiracion/scripts/hoja-contactos.py`) para ubicar las piezas
clave (en Bimbo: camiones de reparto por época, primer vehículo, colección de juguetes del 80 aniversario) y
descartar íconos o sellos sin valor.

### 4 · Mascota o elemento de marca por país
`zsh scripts/mascota_por_pais.sh 'osito|bear|urso' dominio1 dominio2 …`. Registrar Sí / No se encontró /
Sin verificar con la evidencia (nombre de archivo, texto) y abrir una imagen para confirmar. Una búsqueda web
rara vez responde esto; el sitio de cada país sí.

### 5 · Curar por sección de la demo
Copiar `scripts/tablas_videos_ejemplo.py`, cambiar el diccionario `CURADURIA` (tema → [(id, para qué sirve)])
y generar las tablas desde el inventario, para que títulos, duraciones y vistas no se escriban a mano.
Secciones típicas: historia, logística o reparto, mascota, campañas de marca, manufactura y gente,
sustentabilidad, tecnología.

### 6 · README y Drive
- README con: reglas de uso, qué hay por carpeta, videos clave por sección, ideas del usuario con el material
  que ya existe y lo que falta conseguir, mascota por país, otros medios, lo que no se pudo verificar y cómo
  actualizarlo.
- Google Drive: si el cliente tiene shared drive administrado (raíz con `_sistema/media.json`), todo entra con
  la skill `media-drive-ia` (en este repo: `skills/media-drive-ia/`; `media_db.py importar-manifiesto` / `ingresar`), nunca copiando a mano. Si aún no
  existe, iniciarlo con esa skill. Drive para escritorio lo sincroniza; subir archivo por archivo por la API en
  base64 no es práctico para decenas de imágenes.

## Reglas
1. **Solo canales oficiales** del cliente para lo que se descarga. Terceros: enlace y nota de derechos.
2. **Confidencial de trabajo:** el repositorio de contenido no va al repo público de
   la demo: vive en el drive del cliente.
3. **Cifras dentro de imágenes no son fuente:** se verifican contra el informe anual antes de usarse.
4. **Ritmo amable:** ~1 petición por segundo a sitios del cliente; YouTube responde 429 si se le insiste.
5. **Decir lo que faltó:** videos que no entregó la paginación, países sin verificar, material por conseguir.

## Trampas conocidas
- YouTube cambió a `lockupViewModel`: el parser viejo de `gridVideoRenderer` no encuentra nada. El token de
  continuación correcto es el más largo de la página (los cortos son de filtros).
- Las vistas vienen con coma decimal según idioma ("3,2 K", "4,1 M de"): normalizar antes de ordenar.
- El panel de navegador integrado oculto no pinta YouTube ni animaciones; usar `curl`/API.
- Algunos dominios de marca redirigen a redes sociales o no responden: marcarlos "sin verificar".
