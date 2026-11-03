# Copy y wireframes de la propuesta

Trabajo de copy para una propuesta de sitio corporativo, hecho sobre el contenido público de grupobimbo.com. **No es el sitio oficial ni está afiliado a Grupo Bimbo.**

## Cómo se trabajó

1. **Inventario.** Se extrajo el texto visible de 44 páginas públicas (títulos, párrafos, botones, textos alternativos y metadatos) leídas el 2 de noviembre de 2026. El texto completo se queda fuera del repositorio; aquí solo van el análisis y fragmentos breves.
2. **Revisión crítica.** Se cuestionó cada pieza: cifras, nombres, geografía, a quién le habla, dónde vive cada tema y la redacción.
3. **Fuente única.** Las cifras viven en [`content/cifras.ts`](../../content/cifras.ts), con su fuente y su estado. Las que no coinciden entre páginas quedan marcadas **por confirmar**.
4. **Arquitectura y voz.** Se definió quién llega, a qué página y cómo se le habla.
5. **Copy deck.** El copy de cada página vive en [`content/paginas.ts`](../../content/paginas.ts) y alimenta a la vez los wireframes y el documento.
6. **Wireframes.** Ocho páginas navegables en `/wireframes`, en grises, con notas de diseño.

## Documentos

| # | Documento | Qué contiene |
|---|---|---|
| 01 | [Revisión crítica](01-revision-critica.md) | Ocho problemas de fondo, 15 correcciones de redacción y las decisiones abiertas |
| 02 | [Fuente única de cifras](02-fuente-unica-de-cifras.md) | Cada cifra con su valor propuesto y dónde aparece hoy (generado) |
| 03 | [Arquitectura y voz](03-arquitectura-y-voz.md) | Audiencias, mapa del sitio, cambios y guía de estilo |
| 04 | [Copy deck](04-copy-deck.md) | Copy de las 8 páginas, sección por sección (generado) |

## Ver los wireframes

```bash
npm install
npm run dev
```

Abre <http://localhost:3000/wireframes>. Las cifras subrayadas con línea punteada están por confirmar; los textos entre corchetes (`[enlace pendiente]`) son marcadores.

## Editar el copy

Edita `content/paginas.ts` o `content/cifras.ts` y regenera los documentos:

```bash
npm run copy:docs
```

Una cifra se escribe como `{idCifra}` dentro del texto, por ejemplo `Operamos en {paisesOperacion} países`. Nunca se escribe el número a mano.
