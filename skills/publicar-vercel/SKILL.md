---
name: publicar-vercel
description: Publica un prototipo de sitio estático en Vercel de forma privada — vista previa para el equipo con Vercel Authentication y alias fijo, acceso gratis para colaboradores sin darlos de alta como usuarios de pago, y una URL para el cliente protegida con una página propia que pide solo contraseña (sin pagar Password Protection), con caché inmutable de assets y la vista previa al compartir intacta. Úsala cuando pidan "publícalo en una URL privada", "súbelo a Vercel", "dale acceso a X", "quiero que el cliente lo vea con contraseña", "que pida solo contraseña", "actualiza la versión del cliente", o al decidir cómo compartir un prototipo sin hacerlo público.
---

# Publicar en Vercel sin hacerlo público

Tres niveles, de más cerrado a más abierto. Usar el que corresponda y no abrir más de lo que el usuario pidió.

| Para | Qué | Costo |
|---|---|---|
| Equipo interno | Despliegue preview con **Vercel Authentication** (protección "all") y alias fijo `<proyecto>-fusion.vercel.app` | Incluido |
| Colaborador puntual (diseñador) | Invitarlo al equipo con rol **Viewer** gratuito de Pro (`VIEWER_FOR_PLUS` en la API; en el panel, "Viewer") | Gratis en Pro |
| Cliente y quien él quiera | Proyecto aparte `<cliente>-cliente` con la **página de contraseña propia** (`scripts/`) | Gratis (cómputo mínimo del middleware) |
La Password Protection nativa de Vercel cuesta 20 USD/mes por proyecto en Pro; los Shareable Links son gratis pero
cualquiera con el enlace entra y, con despliegues desde la CLI, puede que haya que regenerarlos en cada despliegue.

## Antes de la primera publicación
- La CLI necesita sesión: el usuario corre `vercel login` en su terminal (flujo de dispositivo). No manejar
  credenciales por él.
- `vercel link` crea `.env.local` con un token OIDC y lo agrega a `.gitignore`: borrar `.env.local` antes de
  desplegar o de hacer commit.
- `vercel.json` del sitio:
  ```json
  { "rewrites": [{ "source": "/", "destination": "/<Home>.dc.html" }],
    "headers": [{ "source": "/assets/(.*)", "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }] }] }
  ```
  Con la caché inmutable, **toda imagen que cambie lleva nombre nuevo** (`-v2`). Solo `/` se reescribe: las demás
  páginas se abren con su nombre completo (`/Deporte%20y%20Entretenimiento.dc.html`); `/Deporte` da 404.
- La media va dentro de la carpeta (no en git): copiarla del bucket y verificar sha256 contra el manifiesto
  (`media-web-ligera`).

## Vista previa del equipo
```bash
cd <sitio> && url=$(vercel deploy --target preview --yes 2>/dev/null | grep -o 'https://[a-z0-9-]*\.vercel\.app' | head -1)
vercel alias set "$url" <proyecto>-fusion.vercel.app
```
Producción del mismo proyecto se queda con la versión estable (p. ej. la de otro autor). Revisar después con
`fetch` desde una pestaña ya autenticada que el HTML publicado trae el cambio.

## URL del cliente con contraseña (`scripts/`)
0. Antes: las páginas ya deben tener su bloque para compartir (`vista-previa-compartir`); `meta.py` se detiene
   si la Home no trae `og:image`.
1. Copiar `scripts/middleware.js` al proyecto del cliente (`herramientas/cliente/middleware.js`) y editar ahí su
   bloque **MARCA** (nombre, logo SVG de un color, colores, título, nombre de la cookie). No editar la plantilla
   de la skill: la comparten todos los clientes. Para un prospecto, que se lea como propuesta y no como su sitio
   oficial: `MARCA = 'Prototipo para Grupo Bimbo'`, `TITULO = 'Propuesta de sitio · Nuclea'`.
2. `vercel project add <cliente>-cliente` y luego la primera publicación, que crea la carpeta, la enlaza y despliega
   (todavía cerrado para todos, porque no hay contraseña):
   `MIDDLEWARE=herramientas/cliente/middleware.js scripts/publicar.sh <sitio> <cliente>-cliente [carpeta] ["<Home>.dc.html"]`
3. Contraseña, desde la carpeta de publicación:
   `printf '%s' "$CONTRASENA" | vercel env add CLIENTE_PASS production --sensitive`. Generarla legible
   (`Marca-xxxx-xxxx`, sin 0/O/1/l) y guardarla en un archivo local fuera de git (`umask 077`). Volver a correr
   el paso 2 para que el despliegue la tome.
4. Probar con `curl`: sin cookie → 200 con la página de acceso; contraseña mala → 401 con error; buena → 303 +
   cookie `HttpOnly` 14 días; con cookie → páginas, scripts, JSON y videos en 200. Ver la página de acceso en
   escritorio y teléfono. No teclear la contraseña real en el navegador de pruebas: basta con `curl`.
5. Con Standard Protection el dominio de producción queda libre (solo lo cierra la contraseña) y las URLs por
   despliegue siguen detrás de Vercel Authentication. No hace falta tocar la protección.

Cómo funciona: el middleware corre antes de todo. Si no hay cookie válida (sha256 de la contraseña), responde
la página de acceso con **200** (así WhatsApp/Slack leen título y thumbnail de la página pedida), deja pasar el
logo, los íconos y `/assets/compartir/`, y al entrar regresa a la página que se pidió. Cambiar `CLIENTE_PASS` y
volver a publicar cierra todas las sesiones.

## Explicarle al cliente cómo entrar
"Abre el enlace, escribe la contraseña y presiona Entrar; el dispositivo la recuerda 14 días." Si abren el enlace
dentro de WhatsApp/Instagram y algo falla, que usen "Abrir en el navegador".

## Trampas
- Un 401 en la página de acceso rompe las vistas previas de los enlaces: responder 200.
- HTTP Basic siempre pide usuario además de contraseña y no se ve en navegadores integrados (panel de la app,
  WhatsApp): por eso la página propia.
- El navegador guarda favicons mucho tiempo: enlazarlos con `?v=N` (`vista-previa-compartir`).
- Antes de borrar o abrir al público cualquier despliegue, preguntar.
