---
name: wireframes-desde-copy
description: Monta wireframes navegables de baja fidelidad en una app Next.js + Tailwind a partir de un copy deck tipado (content/paginas.ts) y una fuente única de cifras (content/cifras.ts) — mismas secciones que el sitio final (hero, accesos por audiencia, cifras, etapas, tarjetas, eras, directorio, regiones, noticias, distribuidor, descargas, avisos, CTA), cifras por confirmar subrayadas, marcadores enmarcados, notas de diseño por sección y documentos generados con npm run copy:docs. Úsala cuando pidan "wireframes", "maqueta en grises", "estructura de páginas", "lleva el copy a pantallas", "mapa del sitio navegable" o después de terminar un copy deck con la skill copy-corporativo.
---

# Wireframes desde el copy

El wireframe **lee el copy**, no lo duplica: si alguien corrige un texto o una cifra en `content/`, cambian a la vez el wireframe y el documento. Eso evita la deriva típica entre el copy deck y el diseño.

## Instalar la plantilla en una app Next.js 15 + Tailwind

En este repo la plantilla ya está instalada y en uso (`content/`, `app/wireframes/`, `app/demo/`); es el ejemplo vivo. Para otro proyecto:

```bash
cp -R ruta/a/skills/wireframes-desde-copy/assets/plantilla/* ./
npm i -D tsx
npm pkg set scripts.copy:docs="tsx scripts/copy-docs.ts"
```

Requiere el alias `@/*` en `tsconfig.json` (lo trae `create-next-app`) y que Tailwind lea `app/**` y `components/**`. Crea antes `docs/copy/`. Si la app ya tiene `content/cifras.ts`, `content/paginas.ts` o `content/indice.ts`, no los sobrescribas: copia solo `tipos.ts`, `resolver.ts`, `components/wireframe/`, `app/wireframes/`, `app/demo/` y `scripts/copy-docs.ts`. Agrega `skills` (o la carpeta donde viva la plantilla) al `exclude` de `tsconfig.json` para que Next no la compile.

| Archivo | Qué hace |
|---|---|
| `content/proyecto.ts` | Nombre del cliente y fuente de los datos |
| `content/tipos.ts` | Tipos de sección. Para agregar uno: tipo aquí, `case` en `Seccion.tsx` y en `scripts/copy-docs.ts` |
| `content/cifras.ts` | Fuente única de cifras (valor, estado, corte, fuentes) |
| `content/resolver.ts` | Sustituye `{id}` por el valor; pone mayúscula inicial si el texto empieza con cifra |
| `content/paginas.ts` | Copy deck |
| `components/wireframe/Texto.tsx` | Subraya cifras por confirmar y enmarca `[marcadores]` |
| `components/wireframe/Seccion.tsx` | Un componente por tipo de sección, en grises |
| `app/wireframes/` | Índice con mapa del sitio y cifras por confirmar; una ruta estática por página, con `noindex` |
| `content/indice.ts` + `app/demo/page.tsx` | Índice de la demo: documentos, decisiones, benchmark de rendimiento, dudas vigentes y marcadores pendientes del copy |
| `scripts/copy-docs.ts` | Genera `docs/INDICE.md` y `docs/copy/02`, `04` y `05` desde `content/` |

## Reglas
- Una página = una lista de secciones en el orden en que se leen. La primera es siempre un `hero` (único H1).
- Cada sección lleva `nota` cuando reemplaza algo del sitio actual o pide una interacción: qué cambia y por qué.
- Interacciones que conviene anunciar en notas: ciclo con temporizador (debe tener **pausa visible**, WCAG 2.2.2), mapa de presencia (skill `mapa-relieve`), video a sangre con versión vertical (skill `media-web-ligera`).
- El banner superior dice «Wireframe de una propuesta · no es el sitio oficial de …». No se quita.

## Verificar antes de cada commit
1. `npx tsc --noEmit`, `npm run lint` y `npm run build`: todas las páginas se generan como estáticas.
2. En el navegador (skill `verificar-en-navegador`), en cada página: un solo `h1`, ninguna llave `{id}` visible y `scrollWidth` igual al ancho de la ventana en 375 px y en 1440 px. Con JS:
   ```js
   const d = new DOMParser().parseFromString(await (await fetch('/wireframes/inicio')).text(), 'text/html');
   ({ h1: d.querySelectorAll('h1').length, secciones: d.querySelectorAll('[data-seccion]').length, porConfirmar: d.querySelectorAll('mark').length })
   ```
3. `npm run copy:docs` y revisar el diff del copy deck.

## Siguiente etapa
Con el copy aprobado, el diseño visual sigue la skill `sitio-prospecto` (sistema visual, catálogo de secciones probadas) y se publica en privado con `publicar-vercel`.
