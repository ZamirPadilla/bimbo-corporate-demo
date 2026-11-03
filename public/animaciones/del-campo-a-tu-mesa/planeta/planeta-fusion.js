// Tramo 4 de «Del campo a tu mesa»: zoom out al planeta. Parte de main.js del planeta limpio, que se queda intacto
// junto a este archivo. Cambios de la fusión:
// - el avance lo marca el director (fijarAvance); sin arrastre ni reloj propio y con el bosque ya crecido;
// - la cámara empieza muy cerca, sobre la planta (Ciudad de México), se aleja hasta ver el globo y lo gira de
//   América hacia Europa, África y Asia;
// - los 39 países con operación directa se encienden por oleadas (México → Norteamérica → Latinoamérica →
//   Europa, Asia y África). A cada uno llega un arco desde México que se borra al llegar: al final quedan
//   solo los puntos, para no saturar. Sin etiquetas hasta aprobar el flujo.
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { materialPlaneta } from './planeta_material.js';

const R = 10;
const ORIGEN = { lat: 19.43, lon: -99.13 };          // la planta del tramo anterior
// recorrido del centro de la vista (lat, lon) y de la distancia de la cámara al centro del planeta
const RUTA = [
  { p: 0.00, lat: 19.4, lon: -99.1, dist: R + 2.2 },
  { p: 0.38, lat: 18, lon: -88, dist: null },          // null = distancia final (globo completo)
  { p: 0.52, lat: 18, lon: -80, dist: null },
  { p: 0.92, lat: 30, lon: 38, dist: null },
  { p: 1.00, lat: 30, lon: 40, dist: null },
];
// cuándo se enciende cada región (inicio, fin del avance); dentro de la región, en orden de lejanía a México
// (Europa, Asia y África: de oeste a este, conforme el giro las trae al frente)
const OLEADAS = { 2: [0.05, 0.05], 1: [0.16, 0.24], 3: [0.26, 0.4], 4: [0.56, 0.9] };
const VIAJE_ARCO = 0.045, VIDA_ARCO = 0.025;         // avance que tarda un arco en llegar y en borrarse (2 o 3 a la vez)

const rad = THREE.MathUtils.degToRad;
const suave = (x) => x * x * (3 - 2 * x);
const tramo = (x, a, b) => Math.min(Math.max((x - a) / (b - a), 0), 1);
function normal(lat, lon) {                           // mismo mapeo que la textura equirectangular del planeta
  const p = rad(lat), l = rad(lon);
  return new THREE.Vector3(Math.cos(p) * Math.cos(l), Math.sin(p), -Math.cos(p) * Math.sin(l));
}
// rotación del planeta que pone (lat, lon) frente a la cámara (eje +z) con el norte arriba
const qx = new THREE.Quaternion(), qy = new THREE.Quaternion(), EX = new THREE.Vector3(1, 0, 0), EY = new THREE.Vector3(0, 1, 0);
function orientar(q, lat, lon) { qy.setFromAxisAngle(EY, -Math.PI / 2 - rad(lon)); qx.setFromAxisAngle(EX, rad(lat)); return q.copy(qx).multiply(qy); }

export async function montarPlanetaFusion(raiz, opciones = {}) {
  const base = new URL(opciones.assets ?? './assets/', opciones.assets ? location.href : import.meta.url);
  const url = (n) => new URL(n + '?v=3', base).href;
  const canvas = raiz.querySelector('canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NoToneMapping;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const [meta, binario, gltf, sdfCosta, datos] = await Promise.all([
    fetch(url('escena.json')).then((r) => r.json()),
    fetch(url('instancias.bin')).then((r) => r.arrayBuffer()),
    new GLTFLoader().loadAsync(url('planeta.glb')),
    new THREE.TextureLoader().loadAsync(url('costa_sdf.png')),
    fetch(url('paises.json')).then((r) => r.json()),
  ]);
  const matrices = new Float32Array(binario);
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(meta.fondo);

  // luz: el sol acompaña a la cámara (arriba a la izquierda) para que la cara visible siempre esté iluminada
  const sol = new THREE.DirectionalLight(0xfff9f2, meta.sol_energia);
  sol.position.set(-22, 20, 30);
  sol.castShadow = true; sol.shadow.mapSize.set(4096, 4096);
  Object.assign(sol.shadow.camera, { left: -12, right: 12, top: 12, bottom: -12, near: 20, far: 80 });
  sol.shadow.bias = -0.0004; sol.shadow.normalBias = 0.02; sol.shadow.radius = 3;
  scene.add(sol, sol.target);
  scene.add(new THREE.HemisphereLight(0xd3deee, 0x9fb0c8, 1.15));

  const planeta = new THREE.Group(); scene.add(planeta);
  const nodos = {}; gltf.scene.updateMatrixWorld(true); gltf.scene.traverse((o) => { if (o.name) nodos[o.name] = o; });
  const { material: matPlaneta } = materialPlaneta(sdfCosta, renderer);
  nodos['planeta_web'].traverse((o) => { if (o.isMesh) { o.material = matPlaneta; o.receiveShadow = true; } });
  planeta.add(nodos['planeta_web']);

  // bosque ya crecido (las mismas instancias y tintes que el planeta limpio)
  const azar = (() => { let s = 20261103; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; })();
  const m4 = new THREE.Matrix4();
  meta.especies.forEach((nombre, e) => {
    const idx = []; meta.esp_idx.forEach((v, i) => { if (v === e) idx.push(i); });
    const raizEsp = nodos['esp_' + nombre]; if (!raizEsp || !idx.length) return;
    raizEsp.traverse((malla) => {
      if (!malla.isMesh) return;
      const geo = malla.geometry.clone();
      geo.applyMatrix4(malla.matrixWorld.clone().premultiply(new THREE.Matrix4().copy(raizEsp.matrixWorld).invert()));
      const inst = new THREE.InstancedMesh(geo, new THREE.MeshStandardMaterial({ color: malla.material.color, map: malla.material.map || null, roughness: 0.8, metalness: 0 }), idx.length);
      const tinte = new THREE.Color();
      idx.forEach((i, k) => { m4.fromArray(matrices, i * 16); inst.setMatrixAt(k, m4); const v = 0.74 + 0.24 * azar(); tinte.setRGB(v, v * (0.97 + 0.06 * azar()), v); inst.setColorAt(k, tinte); });
      inst.castShadow = true; inst.receiveShadow = true; inst.frustumCulled = false;
      planeta.add(inst);
    });
  });
  // nubes
  const pivoteNubes = new THREE.Group(); scene.add(pivoteNubes);
  const matNube = new THREE.MeshStandardMaterial({ color: 0xf3f4ff, roughness: 0.55, emissive: 0xe9ebff, emissiveIntensity: 0.35, transparent: true });
  for (const [nombre, o] of Object.entries(nodos)) { if (!nombre.startsWith('nube_')) continue; o.traverse((c) => { if (c.isMesh) c.material = matNube; }); pivoteNubes.add(o); }

  // ---------- países: punto rojo con aro, y un arco de entrega desde México ----------
  const ROJO = 0xd2232a;
  const puntoGeo = new THREE.SphereGeometry(0.075, 16, 12), aroGeo = new THREE.RingGeometry(0.11, 0.135, 40);
  const puntoMat = new THREE.MeshBasicMaterial({ color: ROJO });
  const origen = normal(ORIGEN.lat, ORIGEN.lon);
  const porRegion = {};
  for (const p of datos.paises) (porRegion[p.region] ??= []).push(p);
  const paises = [];
  for (const [region, lista] of Object.entries(porRegion)) {
    const [a, b] = OLEADAS[region];
    if (region === '4') lista.sort((x, y) => x.lon - y.lon); else lista.sort((x, y) => normal(x.lat, x.lon).angleTo(origen) - normal(y.lat, y.lon).angleTo(origen));
    lista.forEach((p, i) => {
      if (region === '2') p = { ...p, ...ORIGEN };   // México: el punto va en la planta, sin arco
      const n = normal(p.lat, p.lon), llega = a + (b - a) * (lista.length > 1 ? i / (lista.length - 1) : 0);
      const punto = new THREE.Mesh(puntoGeo, puntoMat); punto.position.copy(n).multiplyScalar(R + 0.32);
      const aro = new THREE.Mesh(aroGeo, new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, depthWrite: false, side: THREE.DoubleSide }));
      aro.position.copy(n).multiplyScalar(R + 0.31); aro.lookAt(n.clone().multiplyScalar(R * 2));
      planeta.add(punto, aro);
      // arco: gran círculo levantado según la distancia; no hay arco a México mismo
      let arco = null;
      const ang = n.angleTo(origen);
      if (ang > 0.02) {
        const puntos = [];
        for (let k = 0; k <= 64; k++) {
          const t = k / 64, v = new THREE.Vector3().copy(origen).lerp(n, t).normalize();
          puntos.push(v.multiplyScalar(R + 0.32 + Math.sin(Math.PI * t) * Math.min(0.35 + ang * 1.4, 3.2)));
        }
        const geo = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(puntos), 96, 0.016, 6, false);
        arco = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: ROJO, transparent: true, depthWrite: false }));
        arco.userData.indices = geo.index.count; planeta.add(arco);
      }
      paises.push({ ...p, llega, punto, aro, arco });
    });
  }

  // ---------- cámara ----------
  const camara = new THREE.PerspectiveCamera(30, 1, 0.05, 300);
  const fovH = 2 * Math.atan(meta.sensor_mm / 2 / meta.lente_mm);
  let aspecto = 1, sucio = true, DIST_FINAL = 40;
  function redimensionar() {
    const w = raiz.clientWidth, h = raiz.clientHeight; if (!w || !h) return;
    renderer.setSize(w, h, false); aspecto = w / h; camara.aspect = aspecto;
    // ancho de campo horizontal del video; en vertical, que el globo completo quepa a lo ancho
    camara.fov = THREE.MathUtils.radToDeg(2 * Math.atan(Math.tan(fovH / 2) / Math.min(aspecto, 1.6)));
    camara.updateProjectionMatrix(); sucio = true;
    // distancia a la que el globo completo cabe con margen en el lado más corto de la pantalla
    const medioV = rad(camara.fov) / 2, medioH = Math.atan(Math.tan(medioV) * aspecto);
    DIST_FINAL = (R * 1.22) / Math.sin(Math.min(medioV, medioH));
  }
  const ro = new ResizeObserver(redimensionar); ro.observe(raiz); redimensionar();

  const q = new THREE.Quaternion();
  function ruta(p) {
    let i = 0; while (i < RUTA.length - 2 && p > RUTA[i + 1].p) i++;
    const a = RUTA[i], b = RUTA[i + 1], k = suave(tramo(p, a.p, b.p));
    const da = a.dist ?? DIST_FINAL, db = b.dist ?? DIST_FINAL;
    // distancia en escala logarítmica: el alejamiento se siente parejo de la calle al globo
    return { lat: a.lat + (b.lat - a.lat) * k, lon: a.lon + (b.lon - a.lon) * k, dist: Math.exp(Math.log(da) + (Math.log(db) - Math.log(da)) * k) };
  }
  function dibujar(p) {
    const r = ruta(p);
    orientar(q, r.lat, r.lon); planeta.quaternion.copy(q);
    camara.position.set(0, 0, r.dist); camara.up.set(0, 1, 0); camara.lookAt(0, 0, 0);
    pivoteNubes.quaternion.copy(q); pivoteNubes.rotateY(p * 0.4);
    matNube.opacity = suave(tramo(r.dist, R + 1.5, R + 4));   // de cerca, las nubes estorban
    const tam = Math.max(1, r.dist / 16);           // los puntos conservan su tamaño en pantalla al alejarse
    for (const c of paises) {
      const x = tramo(p, c.llega, c.llega + 0.025);   // el punto aparece al llegar el arco
      const m = x - 1; c.punto.scale.setScalar(x > 0 ? tam * (1 + 2.70158 * m * m * m + 1.70158 * m * m) : 0.0001);
      const pulso = tramo(p, c.llega, c.llega + 0.06);
      c.aro.scale.setScalar(tam * (0.6 + pulso * 1.6)); c.aro.material.opacity = pulso > 0 && pulso < 1 ? (1 - pulso) * 0.9 : 0;
      if (c.arco) {
        const viaje = tramo(p, c.llega - VIAJE_ARCO, c.llega), borra = tramo(p, c.llega, c.llega + VIDA_ARCO);
        c.arco.visible = viaje > 0 && borra < 1;
        c.arco.geometry.setDrawRange(0, Math.floor(c.arco.userData.indices * viaje / 3) * 3);
        c.arco.material.opacity = 0.85 * (1 - borra);
      }
    }
    renderer.render(scene, camara);
  }

  let avance = 0, raf = 0, visible = true, pausado = false;
  const debeCorrer = () => visible && !pausado && !document.hidden;
  function bucle() { if (sucio) { dibujar(avance); sucio = false; } raf = requestAnimationFrame(bucle); }
  function actualizar() {
    if (debeCorrer() && !raf) { sucio = true; raf = requestAnimationFrame(bucle); }
    else if (!debeCorrer() && raf) { cancelAnimationFrame(raf); raf = 0; }
  }
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; actualizar(); }); io.observe(raiz);
  document.addEventListener('visibilitychange', actualizar);
  dibujar(0); actualizar();

  return {
    fijarAvance(p) { p = Math.min(Math.max(p, 0), 1); if (p !== avance) { avance = p; sucio = true; } },
    pausar() { pausado = true; actualizar(); },
    reanudar() { pausado = false; actualizar(); },
    destruir() {
      cancelAnimationFrame(raf); raf = 0; ro.disconnect(); io.disconnect();
      document.removeEventListener('visibilitychange', actualizar);
      scene.traverse((o) => { o.geometry?.dispose(); for (const m of [].concat(o.material ?? [])) { m.map?.dispose(); m.dispose(); } });
      sdfCosta.dispose(); renderer.dispose();
    },
  };
}
