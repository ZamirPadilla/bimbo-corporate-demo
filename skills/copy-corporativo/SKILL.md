---
name: copy-corporativo
description: Trabaja el copy de un sitio corporativo nuevo partiendo del sitio actual del cliente — inventario del texto visible de todas sus páginas, revisión crítica (cifras que no coinciden, identidad escondida, temas con varias casas, geografía, mezcla de idiomas, redacción), fuente única de cifras con fuente y estado, arquitectura por audiencias, guía de voz y copy deck tipado que alimenta wireframes. Úsala cuando pidan "trabaja el copy", "revisa los textos del sitio actual", "encuentra inconsistencias en la página de X", "copy deck", "mensajes por audiencia", "arquitectura de contenidos" o "reescribe el sitio de un prospecto", aunque no digan "copy".
---

# Copy corporativo desde el sitio actual

El copy nuevo no se inventa: se **destila** del sitio actual después de cuestionarlo. El orden importa: primero se decide qué es oficial (cifras, nombres, qué página es dueña de cada tema) y después se escribe.

## Flujo

### 1 · Inventario (medio día)
1. Descarga el HTML de las páginas públicas: navegación principal, una URL por plantilla y las subpáginas que cuentan identidad (Nosotros, misión/valores, historia), producto o marcas, sustentabilidad, inversionistas, carreras, contacto, preguntas frecuentes. Ritmo ~1 petición por segundo; respeta robots.txt.
2. Extrae el texto visible con `scripts/extraer_copy.py`:
   ```bash
   python3 -I scripts/extraer_copy.py --html html/ --out inventario/ --urls urls.json --inicio '</header>' --fin '<footer'
   ```
   Ajusta `--inicio` y `--fin` a los marcadores del CMS del cliente. Deja un `.md` por página y un `inventario.json`.
3. Revisa también los **textos alternativos** (`[img] alt=…`): en sitios corporativos es común que la misión o las cifras vivan dentro de una imagen.
4. **El inventario completo no va a un repositorio público**: es texto del cliente. Al repo solo va el análisis, con fragmentos breves.

### 2 · Revisión crítica
Lee el inventario con la lista de `references/revision-checklist.md`. Para un inventario grande, delega una primera pasada a un subagente con esa lista y verifica tú cada hallazgo contra el HTML antes de escribirlo. Escribe `docs/copy/01-revision-critica.md` con esta forma:
- Una conclusión en una línea.
- Problemas de fondo, uno por sección, cada uno con evidencia (página y fragmento breve) y propuesta.
- Tabla de correcciones de redacción (ID, página, fragmento, problema, propuesta).
- Si ya existe un prototipo o demo, revisa también su copy: suele tener cifras inventadas.
- **Decisiones abiertas** que el cliente debe tomar (qué cifra es la oficial, qué dirección se publica…).

### 3 · Fuente única de cifras
**Antes de marcar algo «por confirmar», lee el último reporte publicado** (informe anual integrado; el reporte trimestral solo trae finanzas). Criterio por defecto: cuando las páginas no coinciden, manda el último reporte. En Bimbo, el Informe Anual 2025 dio una cifra que no estaba en el sitio (93 países frente a 96 y 102) y corrigió otras tres (centros de ventas, productos y una creencia). Extrae el texto con `pdftotext -layout` (tablas) y `-raw` (columnas de identidad: misión, creencias), en una carpeta aparte.

`content/cifras.ts` (plantilla en `../wireframes-desde-copy/assets/plantilla/`): cada cifra con valor propuesto, estado (`confirmada` / `por-confirmar`), fecha de corte, nota y **todas las fuentes donde aparece hoy**, con la frase textual. Si las fuentes no coinciden, la cifra es `por-confirmar` y se propone la más reciente. Nunca se escribe un número a mano en el copy: se usa `{id}`.

### 4 · Arquitectura y voz
`docs/copy/03-arquitectura-y-voz.md`: tabla de audiencias (pregunta con la que llegan, página dueña, acción principal), mapa del sitio, tabla de cambios «antes / ahora / por qué» y guía de voz (tres rasgos y una tabla «usamos / evitamos» con los términos de la marca). Plantilla: `references/guia-voz-plantilla.md`.

### 5 · Copy deck
`content/paginas.ts` con los tipos de sección de `content/tipos.ts`. Reglas:
- H1 de la Home = propósito o promesa, no «Últimas noticias».
- Titulares de 4 a 9 palabras; una idea por párrafo; botones con verbo y destino.
- El texto oficial del cliente (misión, creencias, nombres de pilares) se copia literal; lo que redactemos de apoyo se marca en la `nota` para validación.
- Marcadores visibles: `[por confirmar]`, `[enlace pendiente]`, `[por migrar]`, `[cita de muestra]`. Nunca inventar personas, citas, correos ni teléfonos.
- `meta.title` ≤ 60 caracteres; `meta.description` ≤ 155.
- Genera el documento con `npm run copy:docs` (`docs/copy/04-copy-deck.md`).

### 6 · Decisiones e índice de la demo
Resuelve las decisiones abiertas con el reporte y regístralas en `content/indice.ts` (pregunta, decisión, fuente, efecto). Ese mismo archivo lleva documentos, benchmark de rendimiento y dudas vigentes con a quién preguntar; `/demo` y `docs/INDICE.md` se generan de ahí. En un repo público, el benchmark solo lleva rendimiento (Lighthouse), no calificaciones de seguridad ni plataforma.

### 7 · Entrega de la etapa
Commit pequeño por etapa, con mensaje que diga qué cambió y por qué. Lista de cifras por confirmar y decisiones abiertas para el cliente.

## Lo que no se hace
- No publicar material interno (auditorías, notas comerciales, nombres de contactos del cliente) en repos públicos.
- No presentar el prototipo como sitio oficial: «Propuesta» o «Wireframe de una propuesta» en cada página.
- No reproducir el copy del cliente completo fuera de su contexto de trabajo.

## Caso de referencia
Grupo Bimbo, noviembre de 2026: 44 páginas, 1,868 bloques. Hallazgos que se repiten en otros corporativos: misión y creencias solo en el `alt` de una imagen; cuatro valores distintos para «panaderías»; «Centroamérica» con países de Sudamérica; Nutrición y Sustentabilidad › Para Ti contando lo mismo; «Contacto» que abre un correo y la línea ética presentada como contacto general. En este repo: `content/` y `docs/copy/`.
