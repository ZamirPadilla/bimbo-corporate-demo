#!/usr/bin/env node
// Prueba rápida del dibujo del relieve (relieve.js) sin navegador: ejecuta cuadros reales con un canvas falso y comprueba que
// (1) el script carga, (2) los cuadros dibujan sin lanzar errores, (3) `fit` encaja y (4) `pick` encuentra el marcador.
// Uso:  node skills/mapa-relieve/scripts/smoke-test.js <ruta>/relieve.js [NombreGlobal]
// Correrla después de CUALQUIER edición del archivo: un error dentro de requestAnimationFrame no rompe la carga,
// solo deja el mapa en blanco (pasó: un comentario se tragó `const t0 = …` y desapareció el mapa).
const fs = require('fs');
const file = process.argv[2] || 'relieve.js';
const src = fs.readFileSync(file, 'utf8');

global.window = {}; global.document = { documentElement: {} };
global.addEventListener = () => {}; global.removeEventListener = () => {};
global.devicePixelRatio = 1; global.innerHeight = 800;
global.getComputedStyle = () => ({ getPropertyValue: () => '' });
let cb = null; global.requestAnimationFrame = f => { cb = f; return 1; }; global.cancelAnimationFrame = () => {};
global.performance = { now: () => 0 };
global.IntersectionObserver = class { constructor(f) { this.f = f; } observe() { this.f([{ isIntersecting: true }]); } disconnect() {} };
global.fetch = () => Promise.resolve({ json: () => Promise.resolve({
  lon0: -118, lat0: 14, cols: 4, rows: 4, step: 5, pts: [[0, 0, 100], [1, 1, 500], [2, 2, 900], [3, 3, 10]] }) });

let fills = 0, texts = 0;
const ctx = new Proxy({}, { get: (t, k) =>
  k === 'measureText' ? () => ({ width: 10 }) :
  k === 'createLinearGradient' ? () => ({ addColorStop() {} }) :
  k === 'fillRect' ? () => { fills++; } :
  k === 'fillText' ? () => { texts++; } : () => {}, set: () => true });
const cv = { getContext: () => ctx, clientWidth: 1000, clientHeight: 800,
  getBoundingClientRect: () => ({ top: 0, bottom: 800, left: 0, width: 1000, height: 800 }),
  parentElement: { addEventListener() {}, removeEventListener() {} } };

new Function(src)();
const fail = m => { console.error('FALLA:', m); process.exit(1); };
const G = process.argv[3] || 'Relieve';
if (!window[G]) fail('no se definió window.' + G);

const R = window[G].start(cv, { sites: [{ n: 'A', ll: [-110, 20] }], labelMinW: 0,
  state: () => ({ on: true, active: true }), fit: () => ({ left: 100, right: 900, top: 200, bottom: 600 }) });
setTimeout(() => {
  try { for (let k = 0; k < 5; k++) cb(5000 + k * 16); } catch (e) { fail('error dentro de un cuadro: ' + e.message); }
  if (!fills) fail('no dibujó ningún punto');
  if (!texts) fail('no dibujó la etiqueta del marcador activo (labelMinW: 0)');
  let found = null;
  for (let y = 0; y < 800 && !found; y += 4) for (let x = 0; x < 1000; x += 4) if (R.pick(x, y) >= 0) { found = [x, y]; break; }
  if (!found) fail('pick() no encuentra el marcador');
  if (found[0] < 100 || found[0] > 900) fail('el marcador quedó fuera del rectángulo de fit');
  console.log('ok · puntos dibujados:', fills, '· etiqueta: sí · pick en', found);
}, 20);
