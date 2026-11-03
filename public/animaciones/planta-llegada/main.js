// Planta Bimbo en vivo: el camión 2025 llega al andén y el tráiler full sale a la calle.
// Escena y animación exportadas desde llegada_salida_planta.blend (scripts/exportar_web.py): planta_llegada.glb trae
// la planta, el ambiente, los vehículos y la cámara con 20 s de animación horneada (un clip por objeto).
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

const DURACION = 20;          // s (500 cuadros a 25 fps)
const PAUSA_FINAL = 1.6;      // s quieto al final antes de reiniciar
const reducirMovimiento = matchMedia('(prefers-reduced-motion: reduce)').matches;
const depurar = new URLSearchParams(location.search).has('debug');

const raiz = document.getElementById('planta-3d');
const canvas = raiz.querySelector('canvas');
const velo = raiz.querySelector('.velo');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.NoToneMapping;                 // Blender usa "Standard"
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const V = '?v=2';                                           // subir al regenerar el .glb
const draco = new DRACOLoader().setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
const gltf = await new GLTFLoader().setDRACOLoader(draco).loadAsync('assets/planta_llegada.glb' + V);

const CIELO = 0xdfe7ef;
const scene = new THREE.Scene();
scene.background = new THREE.Color(CIELO);
scene.fog = new THREE.Fog(CIELO, 260, 760);                 // borra el borde del piso a lo lejos
scene.add(gltf.scene);

// materiales: calcas con recorte de alfa (sin problemas de orden) y un poco adelante de su muro
const sobrantes = [];
gltf.scene.traverse(o => {
  if (!o.isMesh) return;
  if (/^Patio_maniobras/.test(o.name)) { sobrantes.push(o); return; }   // la planta trae su patio; el del ambiente lo cubre

  o.castShadow = !/^(Piso|Patio|Calle|Cruce|Banqueta|Raya|Pasto)/.test(o.name);
  o.receiveShadow = true;
  const m = o.material;
  if (m.transparent) {
    const fachada = /fachada/.test(m.name);
    m.transparent = false; m.alphaTest = fachada ? 0 : 0.35; m.depthWrite = true;
    m.polygonOffset = true; m.polygonOffsetFactor = -2; m.polygonOffsetUnits = -2;
    o.castShadow = false;
  }
});
sobrantes.forEach(o => o.removeFromParent());

// sol del .blend: rotación (42°, 0, 205°) -> dirección en ejes de three (Y arriba)
const dirSol = new THREE.Vector3(0.283, -0.743, 0.606).normalize();
const centro = new THREE.Vector3(-45, 0, -20);
const sol = new THREE.DirectionalLight(0xfff8ee, 3.2);
sol.position.copy(centro).addScaledVector(dirSol, -260); sol.target.position.copy(centro);
sol.castShadow = true;
sol.shadow.mapSize.set(4096, 4096);
Object.assign(sol.shadow.camera, { left: -125, right: 125, top: 125, bottom: -125, near: 60, far: 520 });
sol.shadow.bias = -0.0003; sol.shadow.normalBias = 0.04; sol.shadow.radius = 2.5;
scene.add(sol, sol.target);
scene.add(new THREE.HemisphereLight(0xdde6f2, 0xa9b39a, 1.25));

// cámara animada del .blend; se conserva el ancho de campo horizontal y en pantallas angostas se recorta un poco
const camara = gltf.cameras[0];
const fovV0 = THREE.MathUtils.degToRad(camara.fov), aspecto0 = 16 / 9;
const fovH = 2 * Math.atan(Math.tan(fovV0 / 2) * aspecto0);
function redimensionar() {
  const w = raiz.clientWidth, h = raiz.clientHeight;
  renderer.setSize(w, h, false);
  const a = w / h; camara.aspect = a;
  const k = THREE.MathUtils.clamp((a - 0.6) / (aspecto0 - 0.6), 0, 1);   // 0 = teléfono vertical, 1 = 16:9
  const fh = fovH * (0.62 + 0.38 * k);
  camara.fov = THREE.MathUtils.radToDeg(Math.min(2 * Math.atan(Math.tan(fh / 2) / a), THREE.MathUtils.degToRad(72)));
  camara.updateProjectionMatrix();
}
new ResizeObserver(redimensionar).observe(raiz); redimensionar();

// animación: todos los clips a la vez (uno por objeto)
const mixer = new THREE.AnimationMixer(gltf.scene);
for (const clip of gltf.animations) { const a = mixer.clipAction(clip); a.setLoop(THREE.LoopOnce); a.clampWhenFinished = true; a.play(); }

let t = reducirMovimiento ? DURACION - 0.05 : 0;
let visible = true, estado = 'corre', espera = 0;
new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.05 }).observe(raiz);
document.addEventListener('visibilitychange', () => { if (document.hidden) reloj.getDelta(); });

const reloj = new THREE.Clock();
const panel = document.getElementById('depurar');
if (depurar) panel.style.display = 'block';
let fpsN = 0, fpsT = 0, fps = 0;
if (depurar) window.__planta = { renderer, scene, camara, mixer, fijar(s) { t = s; estado = 'fijo'; dibujar(0); }, seguir() { estado = 'corre'; } };

raiz.querySelector('.cargando').remove();
dibujar(0);
requestAnimationFrame(() => velo.classList.add('fuera'));

renderer.setAnimationLoop(() => {
  const dt = Math.min(reloj.getDelta(), 0.05);
  if (!visible || estado === 'fijo') return;
  if (!reducirMovimiento) {
    if (estado === 'corre') { t += dt; if (t >= DURACION) { t = DURACION; estado = 'final'; espera = 0; } }
    else if (estado === 'final') {
      espera += dt;
      if (espera > PAUSA_FINAL && !velo.classList.contains('cerrando')) { velo.classList.add('cerrando'); velo.classList.remove('fuera'); }
      if (espera > PAUSA_FINAL + 0.75) {            // el velo ya cubre: reiniciar y destapar
        t = 0; estado = 'corre'; velo.classList.remove('cerrando'); velo.classList.add('fuera');
      }
    }
  }
  dibujar(dt);
});

function dibujar(dt) {
  mixer.setTime(Math.min(t, DURACION - 0.001));
  renderer.render(scene, camara);
  if (depurar) {
    fpsN++; fpsT += dt;
    if (fpsT > 0.5) { fps = Math.round(fpsN / fpsT); fpsN = 0; fpsT = 0; }
    panel.textContent = `${fps} fps · t ${t.toFixed(1)} s · ${(renderer.info.render.triangles / 1e3).toFixed(0)} k tri · ${renderer.info.render.calls} llamadas`;
  }
}
