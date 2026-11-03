# Bimbo Corporate Demo

Demo pública de una página corporativa para **Grupo Bimbo**, construida con Next.js 15, React 19 y Tailwind CSS. Proyecto abierto a contribuciones de la comunidad — cualquier persona puede abrir issues y pull requests.

> **Nota legal**: Este proyecto es un ejercicio educativo y una demo técnica. **No está afiliado oficialmente con Grupo Bimbo, S.A.B. de C.V.** Las marcas y referencias se usan únicamente con fines ilustrativos.

---

## 🚀 Vista rápida

- **Hero** con métricas corporativas
- **Valores** de la compañía
- **Marcas globales** del portafolio
- **Sostenibilidad** (bienestar, planeta, comunidad)
- **Footer** corporativo

Totalmente responsive, con paleta oficial Bimbo (rojo `#E30613`, azul `#003DA5`).

### Propuesta de copy y wireframes

- **Índice de la demo** (documentación, decisiones, benchmark y dudas vigentes): [`docs/INDICE.md`](docs/INDICE.md) o `/demo` en la app.
- **Revisión del copy actual**, fuente única de cifras, arquitectura y copy deck en [`docs/copy/`](docs/copy/README.md).
- **Wireframes navegables** de 8 páginas en `/wireframes` (`npm run dev` → <http://localhost:3000/wireframes>).
- El copy vive en `content/` y alimenta a la vez los wireframes y los documentos (`npm run copy:docs`).

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

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Build de producción

```bash
npm run build
npm start
```

---

## 📁 Estructura

```
bimbo-corporate-demo/
├── app/
│   ├── layout.tsx          # Layout raíz
│   ├── page.tsx            # Página principal
│   └── globals.css         # Estilos globales + Tailwind
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Values.tsx
│   ├── Brands.tsx
│   ├── Sustainability.tsx
│   └── Footer.tsx
├── public/                 # Assets estáticos
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
- Agregar nuevas secciones (noticias, inversionistas, carreras)
- Mejorar accesibilidad (WCAG AA)
- Internacionalización (ES / EN / PT)
- Modo oscuro
- Animaciones y micro-interacciones
- Tests (Vitest / Playwright)
- Integración con un CMS (Sanity, Contentful)

---

## 📜 Licencia

[MIT](LICENSE) — libre para usar, modificar y distribuir con atribución.

---

## 👥 Contribuidores

Gracias a quienes han aportado a este proyecto. ¡Tu nombre puede aparecer aquí!
