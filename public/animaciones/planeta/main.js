// Planeta Ventures en vivo: el mismo planeta del video (Blender) dibujado con three.js.
// Assets exportados desde planeta_ventures.blend: planeta.glb (esfera, especies simplificadas, nubes),
// instancias.bin (matrices 4x4 de los 4,851 árboles en el marco local del planeta), escena.json.
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { materialPlaneta } from './planeta_material.js';

const FPS_BLENDER = 25;                 // el crecimiento está medido en cuadros de 25 fps
const GIRO_LENTO = -0.0523599 / 1;      // rad/s: -30° en 10 s, igual que el video
const reducirMovimiento = matchMedia('(prefers-reduced-motion: reduce)').matches;
const depurar = new URLSearchParams(location.search).has('debug');

const canvas = document.getElementById('escena');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.NoToneMapping;          // Blender usa "Standard"
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const V = '?v=3';                       // subir al regenerar assets (evita la caché del navegador)
const [meta, binario, gltf, sdfCosta] = await Promise.all([
  fetch('assets/escena.json' + V).then(r => r.json()),
  fetch('assets/instancias.bin' + V).then(r => r.arrayBuffer()),
  new GLTFLoader().loadAsync('assets/planeta.glb' + V),
  new THREE.TextureLoader().loadAsync('assets/costa_sdf.png' + V),
]);
const matrices = new Float32Array(binario);

const scene = new THREE.Scene();
scene.background = new THREE.Color(meta.fondo);

// luz: sol fijo en el mundo (el planeta gira debajo) + cielo frío tenue, como el mundo de Blender
const dirSol = new THREE.Vector3(...meta.sol_dir).normalize();
const sol = new THREE.DirectionalLight(0xfff9f2, meta.sol_energia);
sol.position.copy(dirSol).multiplyScalar(-40);
sol.castShadow = true;
sol.shadow.mapSize.set(4096, 4096);
Object.assign(sol.shadow.camera, { left: -12, right: 12, top: 12, bottom: -12, near: 20, far: 60 });
sol.shadow.bias = -0.0004; sol.shadow.normalBias = 0.02; sol.shadow.radius = 3;
scene.add(sol, sol.target);
// en Blender el mundo da 0.55; aquí va más bajo porque three no tiene la oclusión ambiental que oscurece el bosque
scene.add(new THREE.HemisphereLight(0xd3deee, 0x9fb0c8, 1.15));

// planeta y bosque viven en un grupo que gira
const planeta = new THREE.Group();
scene.add(planeta);
const nodos = {};
gltf.scene.updateMatrixWorld(true);
gltf.scene.traverse(o => { if (o.name) nodos[o.name] = o; });

const { material: matPlaneta } = materialPlaneta(sdfCosta, renderer);
const esfera = nodos['planeta_web'];
esfera.traverse(o => { if (o.isMesh) { o.material = matPlaneta; o.receiveShadow = true; } });
planeta.add(esfera);

// --- crecimiento: cada árbol nace en un cuadro y escala 0→1 con rebote (ease-out-back), en el shader
const uniformes = { uCuadro: { value: reducirMovimiento ? 1e4 : 0 } };
function conCrecimiento(material) {
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uCuadro = uniformes.uCuadro;
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', `#include <common>
        attribute float aNace; attribute float aCrece; uniform float uCuadro;
        float crecer() {
          float x = clamp((uCuadro - aNace) / aCrece, 0.0, 1.0);
          float m = x - 1.0;
          return (1.0 + 2.70158 * m * m * m + 1.70158 * m * m) * step(0.0001, x);
        }`)
      .replace('#include <begin_vertex>', `#include <begin_vertex>
        transformed *= crecer();`);
  };
  return material;
}

function aleatorio(semilla) {           // determinista por instancia
  let s = semilla >>> 0;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
}
const azar = aleatorio(20261103);
const total = meta.esp_idx.length;
const nace = new Float32Array(total), crece = new Float32Array(total);
const pos = new THREE.Vector3(), m4 = new THREE.Matrix4();
for (let i = 0; i < total; i++) {
  const capa = meta.crecimiento[meta.capas[meta.capa_idx[i]]];
  m4.fromArray(matrices, i * 16); pos.setFromMatrixPosition(m4);
  const d = Math.min(pos.distanceTo(new THREE.Vector3(...capa.origen)) / capa['Alcance'], 1);
  nace[i] = capa['Inicio'] + capa['Propagación'] * (0.75 * d + 0.25 * azar());
  crece[i] = capa['Crecer'];
}

let triangulos = 0;
meta.especies.forEach((nombre, e) => {
  const idx = []; meta.esp_idx.forEach((v, i) => { if (v === e) idx.push(i); });
  const raiz = nodos['esp_' + nombre];
  if (!raiz || !idx.length) return;
  const mallas = []; raiz.traverse(o => { if (o.isMesh) mallas.push(o); });
  for (const malla of mallas) {
    const geo = malla.geometry.clone();
    geo.applyMatrix4(malla.matrixWorld.clone().premultiply(new THREE.Matrix4().copy(raiz.matrixWorld).invert()));
    geo.setAttribute('aNace', new THREE.InstancedBufferAttribute(Float32Array.from(idx, i => nace[i]), 1));
    geo.setAttribute('aCrece', new THREE.InstancedBufferAttribute(Float32Array.from(idx, i => crece[i]), 1));
    const base = malla.material;
    const mat = conCrecimiento(new THREE.MeshStandardMaterial({
      color: base.color, map: base.map || null, roughness: 0.8, metalness: 0 }));
    const inst = new THREE.InstancedMesh(geo, mat, idx.length);
    const tinte = new THREE.Color();
    idx.forEach((i, k) => {
      m4.fromArray(matrices, i * 16); inst.setMatrixAt(k, m4);
      const v = 0.74 + 0.24 * azar(); tinte.setRGB(v, v * (0.97 + 0.06 * azar()), v);
      inst.setColorAt(k, tinte);
    });
    inst.castShadow = true; inst.receiveShadow = true;
    inst.customDepthMaterial = conCrecimiento(new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking }));
    inst.frustumCulled = false;
    planeta.add(inst);
    triangulos += (geo.index ? geo.index.count : geo.attributes.position.count) / 3 * idx.length;
  }
});

// nubes: un pivote que gira a otra velocidad que el planeta
const pivoteNubes = new THREE.Group(); scene.add(pivoteNubes);
const matNube = new THREE.MeshStandardMaterial({ color: 0xf3f4ff, roughness: 0.55, emissive: 0xe9ebff, emissiveIntensity: 0.35 });
for (const [nombre, o] of Object.entries(nodos)) {
  if (!nombre.startsWith('nube_')) continue;
  o.traverse(c => { if (c.isMesh) c.material = matNube; });   // sin sombra: manchaba el océano
  pivoteNubes.add(o);
}
const rotNubes = meta.nubes_rot.map(r => new THREE.Euler(r[0], r[2], -r[1], 'YZX'));   // Blender XYZ -> three Y arriba

// cámara: misma lente que en Blender; mantener el ancho de campo horizontal del video
const camara = new THREE.PerspectiveCamera(30, 1, 0.1, 200);
const fovH = 2 * Math.atan(meta.sensor_mm / 2 / meta.lente_mm);
const cam0 = meta.camara.f1, cam1 = meta.camara.f250;
function encuadre(t) {
  const k = 1 - Math.pow(1 - t, 3);                     // ease-out
  const p = new THREE.Vector3().lerpVectors(new THREE.Vector3(...cam0.pos), new THREE.Vector3(...cam1.pos), k);
  const f = new THREE.Vector3().lerpVectors(new THREE.Vector3(...cam0.fwd), new THREE.Vector3(...cam1.fwd), k).normalize();
  const u = new THREE.Vector3().lerpVectors(new THREE.Vector3(...cam0.up), new THREE.Vector3(...cam1.up), k).normalize();
  camara.position.copy(p); camara.up.copy(u); camara.lookAt(p.clone().add(f));
}
function redimensionar() {
  const w = innerWidth, h = innerHeight;
  renderer.setSize(w, h, false);
  camara.aspect = w / h;
  camara.fov = THREE.MathUtils.radToDeg(2 * Math.atan(Math.tan(fovH / 2) / camara.aspect));
  camara.updateProjectionMatrix();
}
addEventListener('resize', redimensionar); redimensionar();

// interacción: arrastrar gira el planeta (con inercia); clic vuelve a sembrar el bosque
let giro = 0, velocidad = 0, inclinacion = 0, arrastrando = false, ultimoX = 0, ultimoY = 0, movido = 0;
canvas.addEventListener('pointerdown', e => {
  arrastrando = true; movido = 0; ultimoX = e.clientX; ultimoY = e.clientY;
  canvas.setPointerCapture(e.pointerId); canvas.classList.add('arrastrando');
});
canvas.addEventListener('pointermove', e => {
  if (!arrastrando) return;
  const dx = e.clientX - ultimoX, dy = e.clientY - ultimoY; ultimoX = e.clientX; ultimoY = e.clientY;
  movido += Math.abs(dx) + Math.abs(dy);
  const k = 2.2 / innerWidth;
  giro += dx * k; velocidad = dx * k * 60;
  inclinacion = THREE.MathUtils.clamp(inclinacion + dy * k * 0.6, -0.35, 0.35);
});
const soltar = e => {
  if (!arrastrando) return;
  arrastrando = false; canvas.classList.remove('arrastrando');
  if (movido < 6 && !reducirMovimiento) uniformes.uCuadro.value = 0;   // clic: volver a crecer
};
canvas.addEventListener('pointerup', soltar); canvas.addEventListener('pointercancel', soltar);
canvas.addEventListener('pointerdown', () => document.getElementById('pista').classList.add('oculta'), { once: true });

const reloj = new THREE.Clock();
let tiempo = 0;
const INTRO = 10;                                       // s, igual que el video
const panel = document.getElementById('depurar');
if (depurar) {
  panel.style.display = 'block';
  // medir sin depender de requestAnimationFrame (el panel puede estar oculto): ms por cuadro con la GPU sincronizada
  window.__planeta = {
    renderer, scene, camara, uniformes, encuadre, planeta,
    fijar(s) { pausa = true; tiempo = s; uniformes.uCuadro.value = s * FPS_BLENDER; dibujar(0); },
    seguir() { pausa = false; },
    medir(n = 30) {
      const gl = renderer.getContext(); gl.finish(); const t0 = performance.now();
      for (let i = 0; i < n; i++) renderer.render(scene, camara);
      gl.finish(); return (performance.now() - t0) / n;
    },
  };
}
let fpsCuadros = 0, fpsT = 0, fps = 0;

document.getElementById('cargando').remove();
let pausa = false;
renderer.setAnimationLoop(() => {
  const dt = Math.min(reloj.getDelta(), 0.05);
  if (pausa) return;
  tiempo += dt;
  if (!reducirMovimiento) uniformes.uCuadro.value += dt * FPS_BLENDER;
  dibujar(dt);
});
function dibujar(dt) {
  const t = reducirMovimiento ? 1 : Math.min(tiempo / INTRO, 1);
  encuadre(t);
  if (!arrastrando) { giro += velocidad * dt; velocidad *= Math.pow(0.04, dt); inclinacion *= Math.pow(0.3, dt); }
  const base = reducirMovimiento ? meta.planeta_rot_z[1] : meta.planeta_rot_z[1] * Math.min(tiempo / INTRO, 1)
    + (tiempo > INTRO ? GIRO_LENTO * (tiempo - INTRO) : 0);
  planeta.rotation.set(inclinacion, base + giro, 0, 'XYZ');
  const q0 = new THREE.Quaternion().setFromEuler(rotNubes[0]), q1 = new THREE.Quaternion().setFromEuler(rotNubes[1]);
  pivoteNubes.quaternion.slerpQuaternions(q0, q1, t);
  if (tiempo > INTRO) pivoteNubes.rotateY(GIRO_LENTO * 1.45 * dt);
  renderer.render(scene, camara);
  if (depurar) {
    fpsCuadros++; fpsT += dt;
    if (fpsT > 0.5) { fps = Math.round(fpsCuadros / fpsT); fpsCuadros = 0; fpsT = 0; }
    panel.textContent = `${fps} fps · ${(renderer.info.render.triangles / 1e6).toFixed(2)} M tri dibujados · bosque ${(triangulos / 1e6).toFixed(2)} M · ${renderer.info.render.calls} llamadas`;
  }
}
