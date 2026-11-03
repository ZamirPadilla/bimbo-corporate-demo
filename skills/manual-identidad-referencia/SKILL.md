---
name: manual-identidad-referencia
description: Abstrae un manual de identidad de referencia a partir de piezas recientes del cliente (informe anual, campaña, presentación) cuando no hay manual oficial — revisa las capturas en hojas de contactos, las ordena en el drive por tipo (titulares, color por pilar, fotografía, infografías, mascota), saca recortes sin texto solo de las fotos que valen la pena, mide la paleta sobre zonas planas, describe tipografía, iconografía, fotografía y composición, y genera un manual HTML autocontenido y PDF guardados en el drive. Úsala cuando pidan "haz un manual de identidad", "abstrae la identidad de este reporte", "qué colores y tipografía usa la marca", "biblioteca pulida de recursos", "quita los textos de estas capturas", aunque no digan "manual".
---

# Manual de identidad de referencia

Cuando el cliente no nos da su manual, la pieza más reciente que publicó (en Bimbo, el Informe Anual Integrado
2025 "Celebramos lo que nos une") es la mejor fuente de su lenguaje visual actual. El resultado es una
**referencia para la demo**, rotulada como tal; nunca sustituye el manual oficial.

Caso: Bimbo, 2 nov 2026. Manual en el shared drive (BMB-00334 PDF, BMB-00335 HTML); capturas BMB-00272…00323;
recortes sin texto BMB-00324…00333. El generador y sus fuentes los guarda el equipo de Nuclea.

## Fase 1 · Ordenar (modo administrador de contenido)
1. Hojas de contactos numeradas (12 por hoja) para ver todo sin abrir imagen por imagen; anota tamaño.
2. Excluye lo que no es recurso (capturas de la app, del visor de PDF con interfaz, duplicados).
3. Clasifica en una tabla `n · subcarpeta · título · etiquetas` y ingresa todo con la skill `media-drive-ia` (mismo plugin, `skills/media-drive-ia/`)
   (tema `marca-identidad`, subcarpetas `AAAA-portadas-y-titulares`, `-pilares-y-color`, `-fotografia-personas`,
   `-fotografia-producto`, `-fotografia-campo-y-texturas`, `-fotografia-manufactura`, `-infografias`,
   `-mascota`), origen oficial, derechos `oficial-cliente`.
4. **Biblioteca pulida con criterio de costo:** quitar texto solo de las fotos que se reutilizarán (gente,
   producto, campo, herencia). Se hace **recortando** la zona sin texto, no con IA generativa (cara, lenta y
   altera logos). Cada recorte entra en su tema con subcarpeta `<pieza>-sin-texto`, etiqueta `biblioteca-pulida`
   y `relacionados=<ID original>`.

   **Cuidado con los recortes (corrección del equipo, 2 nov 2026).** En Bimbo, 5 de 10 recortes salieron mal y
   se retiraron. Un recorte solo se acepta si cumple todo esto; si no, se usa el original completo:
   - No corta a ninguna persona (cara, cabeza, manos, brazos) ni un producto o logo (la bolsa de Takis, el
     rayo de la flota) en un borde que el recorte creó. Los bordes que ya tenía la foto original no cuentan.
   - No deja restos de texto, franjas de color ni marcas del diseño (números de GRI, filetes).
   - Conserva una proporción útil (nada de tiras angostas) y al menos ~600 px en el lado corto.
   - Se revisa **en grande** (alto ~500 px por imagen), nunca solo en miniatura: los cortes de manos y de
     logos no se ven en las hojas de contactos chicas.
   - Si el texto toca al sujeto, no hay recorte posible: se descarta sin intentar variantes.

## Fase 2 · Abstraer (modo manual de identidad)
1. **Idea rectora:** el lema o verbo que organiza la pieza y el tono.
2. **Color:** `scripts/paleta_desde_capturas.py` sobre zonas planas de cada bloque (fondos de pilar, índice,
   portada). Agrupa por función (corporativo, un color por pilar o línea) y marca los valores como aproximados.
   Complementa con la hoja de estilos del sitio (p. ej. el rojo del logotipo).
3. **Tipografía: primero un PDF oficial, después el ojo.** Consigue un PDF del cliente hecho en InDesign
   (informe, anexos, presentación) y corre `pdffonts archivo.pdf` y `scripts/fuentes_pdf.py archivo.pdf`: dan
   el nombre real de cada fuente y qué textos usa. En Bimbo, las capturas parecían una letra "propietaria" y el
   PDF de anexos mostró Poleno Bold/Medium (DizajnDesign), Bozilla (Creative Fabrica) y Outfit (Google Fonts):
   todas con licencia comercial o libre, ninguna propia de Bimbo. Busca la fundidora y la licencia de cada una
   y dilo en el manual (Adobe Fonts, MyFonts, Google Fonts). Nunca extraigas las fuentes incrustadas del PDF.
   Solo si no hay PDF, mira de cerca 2–3 titulares, describe rasgos y propone sustitutos marcados como tales.
   Las muestras se ilustran con **páginas completas** del PDF renderizadas (sin recortes).
4. **Mascota y sellos:** cómo aparece (embajador, patrón, versión clásica frente a la actual) y la advertencia
   de no redibujarla.
5. **Iconografía, fotografía, composición:** reglas observadas con "así se ve / evitar".
6. **Aplicación a la demo:** tabla página → qué tomar, conectada con el carácter de cada página
   (skill `benchmark-inspiracion`).
7. **Cifras de la pieza:** confirma de cerca las que vayas a citar y compáralas con el sitio actual (suelen
   diferir); se marcan "verificar antes de publicar".

## Generar y guardar
- Copia `scripts/generar_manual_ejemplo_bimbo.py`, cambia textos, `COLORES` y las figuras (`fig(n, pie)`); las
  imágenes se embeben en base64 para que el HTML funcione suelto.
- **El diseño tampoco recorta:** las figuras usan `object-fit: contain` sobre fondo gris claro, nunca `cover`
  (con `cover` el PDF cortaba caras, el "80" del Osito y los diagramas).
- PDF con Playwright: `page.pdf({ preferCSSPageSize: true, printBackground: true })`; el CSS trae
  `@page A4 landscape` y una sección por página. Antes de imprimir, con `emulateMedia({media:'print'})`, mide
  `scrollHeight - clientHeight` de cada `.pag`: debe ser 0 (si no, algo se corta al pie). Revisa las páginas
  rasterizadas (`pdftoppm -r 40`).
- Para una versión nueva usa `media_db.py reemplazar ID archivo --motivo …` (mismo ID; la anterior queda en la
  papelera con su número de versión).
- Ingresa PDF, HTML y generador al drive con `media_db.py` (tema `marca-identidad`, subcarpeta
  `manual-de-identidad`, origen `nuclea`).
