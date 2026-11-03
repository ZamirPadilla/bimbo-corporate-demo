---
name: fusion-disenos-git
description: >-
  Fusiona sin mezclar el trabajo de dos personas sobre el mismo sitio — una en Claude Design y otra en local (o dos exportaciones distintas) — con git: ramas base / autor A / autor B, worktree de fusión, combinación en tres vías por página aunque los archivos tengan otro nombre ("Página v2", "Design"), índice de páginas y secciones, barrido de imágenes faltantes y avance sección por sección dictado por el usuario. Úsala cuando pidan "fusionar lo de mi compañero con lo mío", "juntar dos versiones del sitio", "traer esta sección de mi versión a la de él", "que no se empiece a mezclar todo", "arma las ramas", o al recibir una exportación nueva de Claude Design que hay que combinar con trabajo local.
---

# Fusionar dos versiones de un sitio sin que se mezcle

Caso real: una persona trabajó en Claude Design y otra en local, ambas sobre la misma exportación de partida. Quien
trabajó en local casi siempre creó archivos nuevos (`Liderazgo v2.dc.html`, `Destinos y Desarrollos Design.dc.html`) en vez de
editar los originales, así que **git no marca choques aunque los dos hayan cambiado la misma página**: hay que
comparar por página, no por archivo.

## 1 · Preparar el repo
- Versionar solo el sitio y sus herramientas (`.gitignore` con `/*` y excepciones `!/prototipo/`, `!/herramientas/`).
  La media pesada fuera de git, en un bucket (`media-web-ligera`).
- Identidad local del repo (`git config user.name/email`) si la máquina no la tiene.
- Repo privado en la organización (`gh repo create Org/nombre --private`).

## 2 · Ramas
| Rama | Contenido |
|---|---|
| `base` | La exportación común de la que partieron los dos (el ancestro). Sin ella no hay tres vías |
| `autor-a` (p. ej. `marlon`) | Su trabajo local, montado sobre `base` |
| `autor-b` (p. ej. `zamir`) | Su exportación íntegra de Claude Design, **sin editar**, sobre `base` |
| `fusion/sitio` | Sale de la rama del autor cuya versión es la base del sitio final; se le traen secciones del otro |
Respaldar con una rama extra antes de cada paso grande y subir todo a GitHub.

Worktree para la fusión, así el checkout principal no cambia de rama:
`git worktree add prototipo/_fusion fusion/sitio` (excluirlo en `.git/info/exclude`). Servirlo en local y
copiarle la media del bucket.

## 3 · Exportación más reciente
Antes de fusionar, confirmar con el autor de Claude Design que terminó ("nos vamos a esperar hasta que la tenga
al cien"). Exportar con **Share → Project HTML → Project archive**, extraer con Python `zipfile` y comparar
fechas/contenido con la anterior. Ver `paginas-claude-design`.

## 4 · Reporte e índice
- Reporte página por página: qué cambió cada quien respecto a `base` (`git diff --stat base autor-b -- prototipo/`),
  y qué archivos nuevos del otro autor corresponden a qué página.
- Índice navegable de páginas y secciones (en PRODI, en una rama aparte: `herramientas/generar-indice.py` → `prototipo/index.html`,
  con la lista dictada por el usuario en `herramientas/indice-fusion.json`). Cada título abre la página en la
  sección (`#ancla` o `?query`).

## 5 · Traer una sección (cuando el usuario lo pida, una a la vez)
1. Ubicar la sección en las dos versiones por su `data-screen-label`.
2. Si es reemplazo completo de una sección: copiarla con su CSS, estado, métodos y `renderVals()`
   (`paginas-claude-design`, "Llevar una sección").
3. Si los dos tocaron la misma página: combinar en tres vías con `scripts/tres_vias.sh`, que acepta nombres
   distintos en cada rama:
   `scripts/tres_vias.sh "prototipo/Liderazgo.dc.html" base marlon "prototipo/Liderazgo v2.dc.html"`.
   Si la base correcta es una descarga intermedia (p. ej. `ddremote__…` del día anterior), usar ese archivo
   como ancestro con `git merge-file` directo.
4. Conservar siempre lo que el usuario dijo que se queda (la Nav y el Footer del sitio base, secciones marcadas).
5. `scripts/barrer_assets.py <sitio> --copiar-de <otra copia>` para traer imágenes que la sección usa por dentro.
6. Verificar en escritorio y teléfono, commit con mensaje claro, push, y desplegar la vista previa
   (`publicar-vercel`).

## Trampas
- No fusionar por adelantado: el usuario va dictando cada paso.
- Una sección puede depender de un script compartido (`prodi-relieve.js`) que también cambió; combinarlo y subir
  su `?v=` en todos los lugares que lo cargan.
- `git stash` es compartido entre worktrees y sesiones: usar commits temporales.
- Imágenes cambiadas con el mismo nombre no se ven por la caché inmutable de `assets/`: nombre nuevo (`-v2`).
