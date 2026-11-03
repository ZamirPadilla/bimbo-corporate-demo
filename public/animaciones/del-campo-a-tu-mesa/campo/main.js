// Página de prueba: el scroll de #pista marca el avance del campo (campo3d.js).
// ?t=6 congela la escena en ese segundo (para capturas); ?debug muestra fps, triángulos y tiempo.
import { montarCampo } from './campo3d.js';

const params = new URLSearchParams(location.search);
const T_FIJO = params.has('t') ? parseFloat(params.get('t')) : null;
const raiz = document.querySelector('.campo-3d'), pista = document.getElementById('pista'), aviso = document.getElementById('aviso');

if ('scrollRestoration' in history) history.scrollRestoration = 'manual';   // siempre arranca en la espiga
scrollTo(0, 0);
const campo = await montarCampo(raiz, { depurar: params.has('debug') });

function leerScroll() {
  const recorrido = Math.max(pista.offsetHeight - innerHeight, 1);
  campo.fijarAvance(Math.min(Math.max(scrollY / recorrido, 0), 1));
  aviso.classList.toggle('oculto', scrollY > 40);
}
if (T_FIJO !== null) campo.fijarSegundo(T_FIJO);
else { addEventListener('scroll', leerScroll, { passive: true }); leerScroll(); }
if (params.has('debug')) window.__campo = campo;
