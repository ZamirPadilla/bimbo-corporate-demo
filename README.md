# Bimbo Corporate Demo

Demo pública de una página corporativa para **Grupo Bimbo**, construida con Next.js 15, React 19 y Tailwind CSS. Proyecto abierto a contribuciones de la comunidad — cualquier persona puede abrir issues y pull requests.

> **Nota legal**: Este proyecto es un ejercicio educativo y una demo técnica. **No está afiliado oficialmente con Grupo Bimbo, S.A.B. de C.V.** Las marcas y referencias se usan únicamente con fines ilustrativos.

---

## 🧭 Por dónde empezar

| Quiero… | Ve a |
|---|---|
| Ver todo el proyecto en una página: documentos, wireframes, decisiones, benchmark y dudas vigentes | `/demo` en la app · [`docs/INDICE.md`](docs/INDICE.md) |
| Recorrer las 8 páginas propuestas con su copy | `/wireframes` en la app |
| Entender por qué cambia el copy y de dónde sale cada cifra | [`docs/copy/`](docs/copy/README.md) |
| Leer el brief creativo y las referencias visuales | [`docs/contexto/CONTEXTO.md`](docs/contexto/CONTEXTO.md) · [`docs/benchmark/`](docs/benchmark/README.md) |
| Ver la página principal de la demo | `/` en la app |
| Trabajar en el repo (personas o IA): fuentes de verdad, reglas de marca y flujo | [`CLAUDE.md`](CLAUDE.md) |

**Estado (2 de noviembre de 2026):** el copy y los wireframes de 8 páginas están listos y las cifras están validadas con el Informe Anual 2025 de Grupo Bimbo. Sigue el diseño visual. Las preguntas que siguen abiertas están en `/demo#dudas`.

---

## 🚀 Vista rápida

| Ruta | Qué es |
|---|---|
| `/` | Redirige a `/demo` mientras se diseña la página principal |
| `/demo` | Índice del proyecto |
| `/wireframes` | Mapa del sitio propuesto y wireframes en grises de Inicio, Nosotros, Marcas, Sustentabilidad, Inversionistas, Prensa, Carreras y Contacto |

Los colores y la tipografía viven en `tailwind.config.ts`; la paleta actual es provisional hasta que se decida el sistema visual (ver [`CLAUDE.md`](CLAUDE.md)). `/demo` y `/wireframes` llevan `noindex`.

---

## 🛠 Stack

| Capa | Tecnología |
|------|------------|
| Framework | [Next.js 15](https://nextjs.org) (App Router) |
| UI | [React 19](https://react.dev) |
| Estilos | [Tailwind CSS 3.4](https://tailwindcss.com) |
| Lenguaje | TypeScript |
| Hosting sugerido | Vercel |

---

## 📦 Primeros pasos

### Prerrequisitos

- Node.js **18.17+** o **20+**
- npm, pnpm o yarn

### Instalación

```bash
git clone https://github.com/ZamirPadilla/bimbo-corporate-demo.git
cd bimbo-corporate-demo
npm install
```

### Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador; el índice del proyecto está en [http://localhost:3000/demo](http://localhost:3000/demo).

### Build de producción

```bash
npm run build
npm start
```

---

## ✍️ Copy y cifras

El copy de la propuesta no vive en los componentes: vive en `content/` y de ahí lo leen los wireframes, `/demo` y los documentos.

| Archivo | Qué contiene |
|---|---|
| `content/cifras.ts` | Fuente única de cifras corporativas, cada una con su valor, fecha de corte y fuente |
| `content/paginas.ts` | Copy de las 8 páginas, sección por sección |
| `content/indice.ts` | Documentos, decisiones, benchmark de rendimiento y dudas vigentes |

Reglas:

- Las cifras se escriben como `{idCifra}` dentro del texto (por ejemplo, `Operamos en {paisesOperacion} países`), nunca a mano.
- Cuando dos fuentes no coinciden, manda el último reporte publicado por Grupo Bimbo.
- Lo que falta se marca a la vista: `[por confirmar]`, `[enlace pendiente]`, `[por migrar]`.

Después de editar `content/`, regenera los documentos:

```bash
npm run copy:docs
```

Actualiza `docs/INDICE.md` y `docs/copy/02`, `04` y `05`. Esos archivos no se editan a mano.

---

## 📁 Estructura

```
bimbo-corporate-demo/
├── app/
│   ├── layout.tsx              # Layout raíz
│   ├── page.tsx                # Redirige a /demo
│   ├── globals.css             # Estilos globales + Tailwind
│   ├── demo/page.tsx           # Índice del proyecto
│   └── wireframes/             # Mapa del sitio y una ruta por página propuesta
├── components/
│   └── wireframe/              # Secciones de wireframe y resaltado de cifras
├── content/                    # Copy, cifras e índice (fuente única)
├── docs/
│   ├── INDICE.md               # Índice del proyecto (generado)
│   ├── copy/                   # Revisión del copy, cifras, arquitectura, copy deck y decisiones
│   ├── contexto/               # Brief creativo y capturas de referencia
│   └── benchmark/              # Benchmark de referencias visuales
├── scripts/copy-docs.ts        # Genera los documentos desde content/
├── public/                     # Assets estáticos
├── tailwind.config.ts
├── next.config.mjs
└── tsconfig.json
```

---

## 🤝 Cómo contribuir

¡Las contribuciones son bienvenidas! Lee la guía completa en [CONTRIBUTING.md](CONTRIBUTING.md).

Flujo rápido:

1. Haz **fork** del repo
2. Crea una rama: `git checkout -b feat/mi-mejora`
3. Haz tus cambios y commits con [Conventional Commits](https://www.conventionalcommits.org)
4. Abre un **Pull Request** apuntando a `main`

Ideas para contribuir:
- Llevar el diseño visual a las páginas de `/wireframes`, empezando por Marcas
- Mejorar accesibilidad (WCAG AA)
- Internacionalización (ES / EN / PT)
- Animaciones y micro-interacciones
- Tests (Vitest / Playwright)
- Integración con un CMS (Sanity, Contentful)

---

## 📚 Contexto del proyecto

Lee el brief creativo completo y las referencias visuales en [`docs/`](docs/README.md):

- **[Benchmark de referencias](docs/benchmark/README.md)** — Qué tomamos de cada sitio y a qué sección del demo aplica.
- **[CONTEXTO.md](docs/contexto/CONTEXTO.md)** — Diagnóstico, intención, concepto, lenguaje visual y referencias.
- **[docs/contexto/referencias/](docs/contexto/referencias/)** — Capturas de los sitios de referencia.
- **[docs/copy/](docs/copy/README.md)** — Revisión del copy actual, fuente única de cifras, arquitectura y copy deck.

---

## 📜 Licencia

[MIT](LICENSE) — libre para usar, modificar y distribuir con atribución.

---

## 👥 Contribuidores

Gracias a quienes han aportado a este proyecto. ¡Tu nombre puede aparecer aquí!
