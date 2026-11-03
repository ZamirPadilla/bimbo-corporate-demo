# Guía de contribución

¡Gracias por tu interés en contribuir a **bimbo-corporate-demo**! Este proyecto es una demo técnica abierta y toda contribución —código, documentación, diseño, traducción, bug reports— es bienvenida.

## 📜 Código de conducta

Nos regimos por el [Contributor Covenant](https://www.contributor-covenant.org/version/2/1/code_of_conduct/). Al participar, aceptas mantener un ambiente respetuoso e inclusivo.

## 🧭 Antes de empezar

1. Revisa los [issues abiertos](https://github.com/ZamirPadilla/bimbo-corporate-demo/issues) — quizás alguien ya está trabajando en lo que piensas.
2. Para cambios grandes, **abre primero un issue** describiendo tu propuesta.
3. Para cambios pequeños (typo, bug, estilo), ve directo al PR.

## 🔧 Setup local

```bash
# 1. Fork en GitHub y clona tu fork
git clone https://github.com/<tu-usuario>/bimbo-corporate-demo.git
cd bimbo-corporate-demo

# 2. Agrega el remoto upstream
git remote add upstream https://github.com/ZamirPadilla/bimbo-corporate-demo.git

# 3. Instala dependencias
npm install

# 4. Arranca el servidor de desarrollo
npm run dev
```

## 🌱 Flujo de trabajo

```bash
# Sincroniza con upstream
git fetch upstream
git checkout main
git merge upstream/main

# Crea tu rama
git checkout -b feat/mi-cambio      # feat/, fix/, docs/, refactor/, chore/

# Haz tus cambios, commits y push
git add .
git commit -m "feat: agrega sección de inversionistas"
git push origin feat/mi-cambio
```

Luego abre un **Pull Request** desde tu fork hacia `main`.

## ✍️ Convenciones de commits

Usamos [Conventional Commits](https://www.conventionalcommits.org):

- `feat:` nueva funcionalidad
- `fix:` corrección de bug
- `docs:` solo documentación
- `style:` formato, sin cambio de código
- `refactor:` cambio que no es fix ni feature
- `test:` agrega o corrige tests
- `chore:` tareas de mantenimiento

Ejemplos:
```
feat(hero): agrega CTA secundario
fix(navbar): corrige scroll suave en Safari
docs: actualiza README con instrucciones de despliegue
```

## ✅ Checklist antes del PR

- [ ] El código compila sin errores (`npm run build`)
- [ ] No hay warnings nuevos de ESLint (`npm run lint`)
- [ ] Probé los cambios en el navegador (desktop + mobile)
- [ ] Actualicé la documentación si fue necesario
- [ ] Los commits siguen Conventional Commits
- [ ] El PR tiene un título claro y una descripción explicando el **por qué**

## 🎨 Guía de estilo

- **Nombres de componentes** en PascalCase (`Hero.tsx`, no `hero.tsx`)
- **Tailwind primero** — evita CSS custom salvo que sea imprescindible
- **Accesibilidad**: usa `aria-*`, contraste adecuado, HTML semántico
- **Mobile first**: diseña para móvil y luego expande

## 🐛 Reportar bugs

Abre un issue usando la plantilla de bug e incluye:
- Pasos para reproducir
- Comportamiento esperado vs. real
- Navegador / sistema operativo
- Capturas de pantalla si aplica

## 💡 Sugerir features

Abre un issue con la plantilla de feature request. Explica:
- El problema que resuelve
- Cómo imaginas la solución
- Alternativas que consideraste

## 🙏 Reconocimiento

Todos los contribuidores aparecen en el README. ¡Gracias por ayudar a construir esto!
