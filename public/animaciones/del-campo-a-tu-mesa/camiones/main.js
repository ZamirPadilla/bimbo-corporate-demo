// Camión Bimbo que cambia de época al cruzar un arco, ligado al scroll.
// Modelos: modelos/*.glb (exportar_glb.py): misma altura, nariz en x = 0, el camión ocupa x ∈ [-largo, 0].
// El camión se queda en el origen y el mundo (carretera, arcos) se mueve hacia atrás. Cada arco está fijo en la
// carretera; mientras el camión lo cruza, un plano de corte en la posición del arco muestra el modelo nuevo
// adelante del arco y el anterior detrás.
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const CAMIONES = [
  { id: 'c40', epoca: '1940s', nombre: 'Camión Super·pan' },
  { id: 'c70', epoca: '1970s', nombre: 'Van de los 70' },
  { id: 'c80', epoca: '1980s', nombre: 'Van de reparto' },
  { id: 'c90', epoca: '1990s', nombre: 'Camión de los 90' },
  { id: 'c2025', epoca: '2025', nombre: 'Camión 2025' },
  { id: 'trailer', epoca: '80 años', nombre: 'Tráiler · Celebramos contigo' },
];
const TRAMO = 15;                                    // metros de carretera por época
const ARCOS = CAMIONES.slice(1).map((_, i) => TRAMO * (i + 1));
const RECORRIDO = TRAMO * CAMIONES.length - 4;       // metros totales del scroll
const FONDO = 0xd6d8dc;
const reducirMovimiento = matchMedia('(prefers-reduced-motion: reduce)').matches;

const lienzo = document.getElementById('lienzo');
const renderer = new THREE.WebGLRenderer({ canvas: lienzo, antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.localClippingEnabled = true;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene = new THREE.Scene();
scene.background = new THREE.Color(FONDO);
scene.fog = new THREE.Fog(FONDO, 26, 70);
scene.add(new THREE.HemisphereLight(0xffffff, 0xaeb3bc, 1.6));
const sol = new THREE.DirectionalLight(0xfff8ef, 2.4);
sol.position.set(4, 12, -7);
sol.castShadow = true;
sol.shadow.mapSize.set(2048, 2048);
Object.assign(sol.shadow.camera, { left: -9, right: 9, top: 6, bottom: -6, near: 1, far: 40 });
sol.shadow.radius = 4; sol.shadow.bias = -0.0005;
sol.target.position.set(-3, 0, 0);
scene.add(sol, sol.target);

// ---------- mundo que se mueve: piso, carretera, rayas y arcos ----------
const mundo = new THREE.Group(); scene.add(mundo);
const mat = (c, extra = {}) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.92, ...extra });
const piso = new THREE.Mesh(new THREE.PlaneGeometry(600, 300), mat(0xdfe1e4));
piso.rotation.x = -Math.PI / 2; piso.position.set(RECORRIDO / 2, -0.002, 0); piso.receiveShadow = true; mundo.add(piso);
const carretera = new THREE.Mesh(new THREE.PlaneGeometry(RECORRIDO + 200, 7.2), mat(0xc9ccd1));
carretera.rotation.x = -Math.PI / 2; carretera.position.set(RECORRIDO / 2, 0, 0); carretera.receiveShadow = true; mundo.add(carretera);
const blanco = mat(0xf4f5f6);
const orilla = new THREE.Mesh(new THREE.PlaneGeometry(RECORRIDO + 200, 0.12), blanco);
orilla.rotation.x = -Math.PI / 2; orilla.position.set(RECORRIDO / 2, 0.001, -3.35); mundo.add(orilla);
const raya = new THREE.PlaneGeometry(2, 0.15);
for (let x = -60; x < RECORRIDO + 60; x += 4.5) {
  const r = new THREE.Mesh(raya, blanco); r.rotation.x = -Math.PI / 2; r.position.set(x, 0.001, 2.9); mundo.add(r);
}
function letrero(texto) {
  const c = document.createElement('canvas'); c.width = 512; c.height = 160;
  const g = c.getContext('2d');
  g.fillStyle = '#ffffff'; g.beginPath(); g.roundRect(0, 0, 512, 160, 28); g.fill();
  g.fillStyle = '#1d2a4d'; g.font = '700 92px Outfit, system-ui, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillText(texto, 256, 88);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8;
  return t;
}
const cortina = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.16, depthWrite: false, side: THREE.DoubleSide });
ARCOS.forEach((x, i) => {
  const arco = new THREE.Group(); arco.position.x = x; mundo.add(arco);
  const banda = new THREE.Mesh(new THREE.PlaneGeometry(0.35, 7.2), blanco);
  banda.rotation.x = -Math.PI / 2; banda.position.y = 0.002; arco.add(banda);
  const velo = new THREE.Mesh(new THREE.PlaneGeometry(7.2, 3.4), cortina);
  velo.rotation.y = Math.PI / 2; velo.position.y = 1.7; arco.add(velo);
  for (const z of [-3.75, 3.75]) {
    const poste = new THREE.Mesh(new THREE.BoxGeometry(0.16, 3.6, 0.16), mat(0xffffff)); poste.position.set(0, 1.8, z); poste.castShadow = true; arco.add(poste);
  }
  const viga = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.16, 7.66), mat(0xffffff)); viga.position.y = 3.6; arco.add(viga);
  const panel = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 0.75), new THREE.MeshBasicMaterial({ map: letrero(CAMIONES[i + 1].epoca) }));
  panel.rotation.y = Math.PI; panel.position.set(0.1, 4.15, 0); arco.add(panel);
});

// ---------- camiones: todos en el origen, cada uno recortado entre su arco de entrada y el de salida ----------
const loader = new GLTFLoader();
const camiones = await Promise.all(CAMIONES.map(async (c, i) => {
  const [gltf, meta] = await Promise.all([loader.loadAsync(`modelos/${c.id}.glb`), fetch(`modelos/${c.id}.json`).then(r => r.json())]);
  const entrada = new THREE.Plane(new THREE.Vector3(1, 0, 0), 1e4);   // visible donde x ≥ corte de entrada
  const salida = new THREE.Plane(new THREE.Vector3(-1, 0, 0), 1e4);   // visible donde x ≤ corte de salida
  const llantas = [];
  const vistos = new Map();
  gltf.scene.traverse(o => {
    if (o.name.startsWith('Llanta')) llantas.push(o);
    if (!o.isMesh) return;
    o.castShadow = true; o.receiveShadow = true;
    const m0 = o.material;
    if (!vistos.has(m0)) {
      const m = m0.clone(); m.clippingPlanes = [entrada, salida]; m.clipShadows = true; m.side = THREE.DoubleSide;
      vistos.set(m0, m);
    }
    o.material = vistos.get(m0);
  });
  scene.add(gltf.scene);
  return { ...c, ...meta, raiz: gltf.scene, entrada, salida, llantas };
}));
document.getElementById('cargando').remove();

// ---------- cámara (3/4 frontal izquierda, como los renders) ----------
const camara = new THREE.PerspectiveCamera(30, 1, 0.1, 200);
function encuadre() {
  const w = lienzo.clientWidth, h = lienzo.clientHeight;
  renderer.setSize(w, h, false); camara.aspect = w / h;
  const lejos = w / h < 1 ? 1.75 : 1;                  // teléfono vertical: más atrás para que quepa el tráiler
  camara.position.set(5.2 * lejos, 3.6 * lejos, -12.5 * lejos);
  camara.lookAt(-2.4, 1.0, 0);
  camara.updateProjectionMatrix();
}
addEventListener('resize', encuadre); encuadre();

// ---------- etiquetas ----------
const linea = document.getElementById('linea');
CAMIONES.forEach(() => linea.appendChild(document.createElement('i')));
let etiqueta = -1;
function etiquetar(i) {
  if (i === etiqueta) return; etiqueta = i;
  document.getElementById('anio').textContent = CAMIONES[i].epoca;
  document.getElementById('nombre').textContent = CAMIONES[i].nombre;
  [...linea.children].forEach((d, k) => d.classList.toggle('activa', k === i));
}

// ---------- scroll → distancia recorrida ----------
const seccion = document.querySelector('.recorrido');
let objetivo = 0, d = 0;
function leerScroll() {
  const r = seccion.getBoundingClientRect();
  const t = Math.min(Math.max(-r.top / (r.height - innerHeight), 0), 1);
  objetivo = t * RECORRIDO;
}
addEventListener('scroll', leerScroll, { passive: true }); leerScroll(); d = objetivo;

function cuadro() {
  d = reducirMovimiento ? objetivo : d + (objetivo - d) * 0.12;   // inercia suave (sin ella si se pide menos movimiento)
  mundo.position.x = -d;
  let actual = 0;
  camiones.forEach((c, i) => {
    const sEntrada = i === 0 ? -1e4 : ARCOS[i - 1] - d; // x del arco de entrada en el marco del camión
    const sSalida = i === camiones.length - 1 ? 1e4 : ARCOS[i] - d;
    c.entrada.constant = -sEntrada;                     // x ≥ sEntrada
    c.salida.constant = sSalida;                        // x ≤ sSalida
    c.raiz.visible = sEntrada < 0.05 && sSalida > -c.largo - 0.05;
    for (const ll of c.llantas) ll.rotation.z = -d / c.radio_llanta;
    if (i > 0 && sEntrada < -c.largo / 2) actual = i;   // la época cambia cuando el camión nuevo va a la mitad
  });
  etiquetar(actual);
  renderer.render(scene, camara);
  requestAnimationFrame(cuadro);
}
cuadro();
