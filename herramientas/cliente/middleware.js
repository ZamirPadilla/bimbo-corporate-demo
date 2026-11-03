// Acceso del cliente: página propia que pide solo la contraseña (plantilla de la skill publicar-vercel).
// La contraseña vive en la variable CLIENTE_PASS del proyecto Vercel; al cambiarla hay que volver a desplegar y
// todas las sesiones abiertas se cierran. Sin CLIENTE_PASS nadie entra.
// Copia de Bimbo de la plantilla de la skill publicar-vercel. Cambios: bloque MARCA, página de acceso en tono claro
// con el logotipo oficial a color (no se pinta de un solo color) y thumbnails en /design/compartir/.
// herramientas/cliente/publicar.sh copia este archivo a la carpeta de publicación y llena META.
export const config = { matcher: '/:path*' };

// ── MARCA ───────────────────────────────────────────────────────────────────────────────────────────────────
const MARCA = 'Prototipo para Grupo Bimbo';     // nombre visible y og:site_name
const LOGO = '/logo-grupo-bimbo.svg';           // logotipo oficial a color (public/iconos de la rama feat/iconos)
const LOGO_ASPECTO = '129/75.2';                // ancho/alto del viewBox del logo
const C = { tinta: '#FBF7F0', papel: '#0F2F51', acento: '#15359D', niebla: '#4A5D75', gris: '#6F7F93', resplandor: 'rgba(238,177,79,.22)' };
const TITULO = 'Propuesta de sitio · Nuclea';
const COOKIE = 'bimbo_acceso', DIAS = 14;
const COMPARTIR = '/design/compartir/';
const OG_GENERICA = COMPARTIR + 'og-inicio-v1.jpg';
// ────────────────────────────────────────────────────────────────────────────────────────────────────────────

// Lo que la página de acceso necesita antes de entrar (logo e íconos); los thumbnails de /assets/compartir/ también.
const LIBRES = new Set(['/favicon.ico', '/apple-touch-icon.png', LOGO]);
const META = /*META*/{}/*META*/;
const GEN = { t: MARCA, d: 'Prototipo privado del sitio de ' + MARCA + '.', i: OG_GENERICA, a: MARCA };

const seguir = () => new Response(null, { headers: { 'x-middleware-next': '1' } });
const firma = async pass => {
  const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(COOKIE + ':' + pass));
  return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join('');
};
// Solo rutas del mismo sitio para regresar después de entrar.
const destino = v => (typeof v === 'string' && v.startsWith('/') && !v.startsWith('//') && !v.startsWith('/\\') ? v : '/');
const esc = s => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const vista = (m, origin, path) => `<meta name="description" content="${esc(m.d)}">
<meta property="og:type" content="website"><meta property="og:site_name" content="${esc(MARCA)}"><meta property="og:locale" content="es_MX">
<meta property="og:title" content="${esc(m.t)}"><meta property="og:description" content="${esc(m.d)}">
<meta property="og:url" content="${esc(origin + path)}">
<meta property="og:image" content="${esc(origin + m.i)}"><meta property="og:image:type" content="image/jpeg">
<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="${esc(m.a)}">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(m.t)}">
<meta name="twitter:description" content="${esc(m.d)}"><meta name="twitter:image" content="${esc(origin + m.i)}">`;

const pagina = (next, error, prev = '') => `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow"><title>${esc(MARCA)} · Acceso</title>
${prev}
<link rel="icon" href="/favicon.ico?v=1" sizes="16x16">
<link rel="apple-touch-icon" href="/apple-touch-icon.png?v=1"><meta name="theme-color" content="${C.tinta}">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600&family=Geist+Mono:wght@500&display=swap" rel="stylesheet">
<style>
:root{color-scheme:light}
*{box-sizing:border-box}
body{margin:0;min-height:100vh;min-height:100dvh;display:grid;place-items:center;padding:24px 16px;background:${C.tinta};
 background-image:radial-gradient(60% 50% at 70% 20%,${C.resplandor},transparent 70%);color:${C.papel};font:400 16px/1.5 Outfit,system-ui,sans-serif}
main{width:100%;max-width:380px}
.logo{display:block;width:120px;aspect-ratio:${LOGO_ASPECTO};background:url(${LOGO}) left center/contain no-repeat;margin-bottom:48px}
.k{font:500 12px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.16em;text-transform:uppercase;color:${C.acento};margin:0 0 16px}
h1{margin:0 0 12px;font-weight:400;font-size:clamp(30px,8vw,40px);line-height:1.05;letter-spacing:-.04em}
p{margin:0 0 32px;color:${C.niebla};font-size:15px}
label{display:block;font:500 11px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.14em;text-transform:uppercase;color:${C.niebla};margin-bottom:10px}
input{width:100%;height:52px;padding:0 16px;border-radius:12px;border:1px solid rgba(15,47,81,.22);background:#fff;color:${C.papel};font:400 17px Outfit,system-ui,sans-serif;outline:none;transition:border-color .2s}
input:focus{border-color:${C.acento}}
input[aria-invalid=true]{border-color:#C62828}
.err{margin:10px 0 0;color:#C62828;font-size:14px}
button{margin-top:20px;width:100%;height:52px;border:0;border-radius:999px;background:${C.papel};color:${C.tinta};font:500 16px Outfit,system-ui,sans-serif;cursor:pointer;transition:background .2s}
button:hover{background:${C.acento};color:#fff}
small{display:block;margin-top:40px;color:${C.gris};font-size:13px}
</style></head>
<body><main>
<span class="logo" role="img" aria-label="${esc(MARCA)}"></span>
<div class="k">Prototipo privado</div>
<h1>${esc(TITULO)}</h1>
<p>Escribe la contraseña que te compartimos para ver el prototipo.</p>
<form method="post" action="/__acceso">
<input type="hidden" name="next" value="${esc(next)}">
<label for="pass">Contraseña</label>
<input id="pass" name="pass" type="password" autocomplete="current-password" required autofocus${error ? ' aria-invalid="true" aria-describedby="err"' : ''}>
${error ? '<div class="err" id="err">La contraseña no es correcta. Revísala e intenta de nuevo.</div>' : ''}
<button type="submit">Entrar</button>
</form>
<small>Este dispositivo recordará el acceso durante ${DIAS} días.</small>
</main></body></html>`;

const html = (body, status) => new Response(body, {
  status, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' },
});

export default async function middleware(request) {
  const url = new URL(request.url), pass = process.env.CLIENTE_PASS;
  if (LIBRES.has(url.pathname) || url.pathname.startsWith(COMPARTIR)) return seguir();
  const token = pass ? await firma(pass) : null;
  const ck = (request.headers.get('cookie') || '').split(/;\s*/).find(x => x.startsWith(COOKIE + '='));
  if (token && ck && ck.slice(COOKIE.length + 1) === token) return seguir();

  if (url.pathname === '/__acceso' && request.method === 'POST') {
    let f = null;
    try { f = await request.formData(); } catch (e) {}
    const next = destino(f && f.get('next'));
    if (token && f && String(f.get('pass') || '').trim() === pass) {
      return new Response(null, { status: 303, headers: {
        Location: next, 'Cache-Control': 'no-store',
        'Set-Cookie': `${COOKIE}=${token}; Max-Age=${DIAS * 86400}; Path=/; Secure; HttpOnly; SameSite=Lax`,
      } });
    }
    return html(pagina(next, true), 401);
  }
  // 200 (no 401) para que WhatsApp, Slack, etc. lean la vista previa; el contenido del sitio sigue cerrado.
  let ruta = url.pathname;
  try { ruta = decodeURIComponent(ruta); } catch (e) {}
  return html(pagina(destino(url.pathname + url.search), false, vista(META[ruta] || META['/'] || GEN, url.origin, url.pathname + url.search)), 200);
}
