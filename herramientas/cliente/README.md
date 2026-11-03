# Publicación privada para el cliente

Inicio (`public/design/Inicio.dc.html`) se publica en el proyecto Vercel **bimbo-cliente** (equipo Nuclea),
detrás de una página propia que pide solo la contraseña (método de la skill `publicar-vercel`, sin pagar la
Password Protection de Vercel).

- URL para compartir: https://bimbo-cliente.vercel.app (lleva a `/design/Inicio.dc.html`).
- Solo se publica lo que Inicio carga: `public/design/`, `public/globo/`, `public/animaciones/del-campo-a-tu-mesa/`
  y los íconos oficiales (`public/iconos/`, o la rama `feat/iconos` mientras no se fusione).

## Volver a publicar
```bash
herramientas/cliente/publicar.sh
```
Arma la carpeta de publicación `../_cliente` (fuera de git), copia `middleware.js` con la vista previa de Inicio y
despliega a producción. Requiere sesión en la CLI (`vercel login`).

## Contraseña
Vive en la variable `CLIENTE_PASS` del proyecto (sensible, solo producción) y en una copia local fuera de git; nunca
en el repo. Para cambiarla:
```bash
cd ../_cliente && vercel env rm CLIENTE_PASS production --yes && vercel env add CLIENTE_PASS production --sensitive
```
y volver a publicar. Cambiarla cierra todas las sesiones abiertas (la cookie `bimbo_acceso` dura 14 días).

## Cómo entrar
"Abre el enlace, escribe la contraseña y presiona Entrar; el dispositivo la recuerda 14 días." Si se abre dentro
de WhatsApp o Instagram y algo falla, usar "Abrir en el navegador".
