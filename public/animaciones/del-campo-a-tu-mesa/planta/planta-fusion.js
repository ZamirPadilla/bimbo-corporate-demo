// Tramo 3 de «Del campo a tu mesa»: la planta. Parte de planta3d.js (PR #12), que se queda intacto junto a este archivo.
// Cambios de la fusión: el avance lo marca el director (fijarAvance) y las acciones van en secuencia, no a la vez:
//   A · el camión 2025 llega por la calle y se estaciona en su andén (clip del 2025, 0 → 19.4 s);
//   B · después sale el tractocamión que estaba estacionado (clip del tráiler, 0 → 20 s);
//   C · la cámara sube y se aleja hasta ver la zona desde arriba: ahí entra el planeta.
// Al empezar, la cámara sigue al 2025 con el mismo encuadre con que lo deja el tramo de camiones.
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

const CIELO = 0xdfe7ef;
const FIN_2025 = 19.4, FIN_TRAILER = 20, DURACION = 20;
const FASES = { llega: [0, 0.46], sale: [0.5, 0.82], sube: [0.8, 1] };
// encuadre del tramo de camiones relativo a la nariz del camión (adelante, arriba, a su izquierda), en metros del
// modelo de camiones, donde el 2025 mide LARGO_CAMIONES; aquí se escala al largo que tiene el 2025 en la planta
const VIAJE = { pos: [5.2, 3.6, -12.5], mira: [-2.4, 1.0, 0] }, LARGO_CAMIONES = 4.546;

const suave = (x) => x * x * (3 - 2 * x);
const tramo = (x, [a, b]) => Math.min(Math.max((x - a) / (b - a), 0), 1);

// La escena de la planta termina a 220 m y sus árboles son conos. Como el tractocamión sale por la calle A (x ≈ 19,
// hacia -z) y la cámara lo sigue, aquí se completa: la calle con sus banquetas y su raya sigue hasta perderse en la
// bruma, el piso llega al horizonte, y los cipreses se cambian por los árboles del campo (mismo glb y mismos tonos),
// que además bordean la calle extendida junto con algunas manzanas bajas.
const TONO_ARBOL = { M_hoja: 0x6f8a46, M_pino: 0x55734a, M_tronco: 0x6b4a35 };
async function completarEntorno(escena, urlArboles) {
  escena.updateMatrixWorld(true);
  const mallas = (re) => { const l = []; escena.traverse((o) => { if (o.isMesh && re.test(o.name)) l.push(o); }); return l; };
  const caja = (o) => new THREE.Box3().setFromObject(o);
  const rnd = (() => { let s = 91; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; })();
  const Z_FIN = -220, Z_INI = 140, LEJOS = -2600, CERCA = 900;   // la calle original va de Z_FIN a Z_INI

  // piso hasta el horizonte (la bruma lo funde con el cielo antes del borde)
  for (const o of mallas(/^Piso_lejano/)) { o.scale.x *= 10; o.scale.z *= 10; }
  // calle, banquetas y raya amarilla más allá de sus dos extremos
  const tiras = [];
  for (const o of mallas(/^(Calle_A|Banqueta_A)/)) {
    const b = caja(o), ancho = b.max.x - b.min.x, y = b.max.y + 0.001, x = (b.min.x + b.max.x) / 2;
    for (const [z0, z1] of [[LEJOS, Z_FIN], [Z_INI, CERCA]]) {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(ancho, z1 - z0).rotateX(-Math.PI / 2), o.material);
      m.position.set(x, y, (z0 + z1) / 2); m.receiveShadow = true; tiras.push(m);
    }
  }
  const rayas = mallas(/^Raya_A/).sort((a, c) => caja(a).min.z - caja(c).min.z);
  if (rayas.length > 1) {
    const r0 = caja(rayas[0]), paso = (caja(rayas[rayas.length - 1]).min.z - r0.min.z) / (rayas.length - 1);
    const geo = new THREE.PlaneGeometry(r0.max.x - r0.min.x, r0.max.z - r0.min.z).rotateX(-Math.PI / 2);
    const zs = [];
    for (let z = r0.min.z - paso; z > LEJOS; z -= paso) zs.push(z);
    for (let z = caja(rayas[rayas.length - 1]).min.z + paso; z < CERCA; z += paso) zs.push(z);
    const im = new THREE.InstancedMesh(geo, rayas[0].material, zs.length), m4 = new THREE.Matrix4();
    zs.forEach((z, i) => im.setMatrixAt(i, m4.makeTranslation((r0.min.x + r0.max.x) / 2, r0.max.y + 0.002, z + (r0.max.z - r0.min.z) / 2)));
    tiras.push(im);
  }
  tiras.forEach((t) => escena.add(t));

  // manzanas bajas a los lados de la calle extendida, del mismo material que las vecinas
  const vecina = mallas(/^Vecino/)[0];
  if (vecina) {
    const lista = [];
    for (let z = Z_FIN - 20; z > -1400; z -= 22 + rnd() * 18) {
      for (const lado of [-1, 1]) {
        if (rnd() < 0.35) continue;
        const x = lado < 0 ? -12 - rnd() * 40 : 40 + rnd() * 40, h = 4 + rnd() * 6;
        lista.push([x, z, 10 + rnd() * 14, h, 10 + rnd() * 10]);
      }
    }
    const im = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1).translate(0, 0.5, 0), vecina.material, lista.length), m4 = new THREE.Matrix4();
    lista.forEach(([x, z, w, h, d], i) => im.setMatrixAt(i, m4.makeScale(w, h, d).setPosition(x, 0, z)));
    im.castShadow = true; im.receiveShadow = true; escena.add(im);
  }

  // árboles: los del campo donde estaban los cipreses, y en hileras a los dos lados de la calle
  const sitios = mallas(/^Cipres/).map((o) => { const b = caja(o); return [(b.min.x + b.max.x) / 2, (b.min.z + b.max.z) / 2, b.max.y]; });
  mallas(/^(Cipres|Tronco)/).forEach((o) => o.removeFromParent());
  for (let z = Z_FIN - 8; z > -1500; z -= 14 + rnd() * 10) {
    sitios.push([29.5 + rnd() * 3, z, 7 + rnd() * 3]);
    if (rnd() < 0.8) sitios.push([8.5 - rnd() * 3, z + 6 * rnd(), 7 + rnd() * 3]);
  }
  for (let z = Z_INI + 10; z < CERCA; z += 16 + rnd() * 10) { sitios.push([29.5 + rnd() * 3, z, 7 + rnd() * 3]); sitios.push([8.5 - rnd() * 3, z, 7 + rnd() * 3]); }
  const g = await new GLTFLoader().loadAsync(urlArboles);
  const especies = g.scene.children.filter((o) => o.name.startsWith('esp_'));
  if (!especies.length) return;
  g.scene.updateMatrixWorld(true);
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler();
  especies.forEach((nodo, k) => {
    const mios = sitios.filter((_, i) => i % especies.length === k);
    if (!mios.length) return;
    const alto = new THREE.Box3().setFromObject(nodo).getSize(new THREE.Vector3()).y || 1;
    const inv = new THREE.Matrix4().copy(nodo.matrixWorld).invert();
    nodo.traverse((o) => {
      if (!o.isMesh) return;
      const geo = o.geometry.clone(); geo.applyMatrix4(o.matrixWorld.clone().premultiply(inv));
      const tono = TONO_ARBOL[o.material.name.replace(/\.\d+$/, '')] ?? TONO_ARBOL.M_hoja;
      const im = new THREE.InstancedMesh(geo, new THREE.MeshStandardMaterial({ color: tono, roughness: 0.9 }), mios.length);
      mios.forEach(([x, z, h], i) => { const r = Math.abs(Math.sin(x * 12.9 + z * 78.2) * 43758) % 1; e.set(0, r * 6.28, 0); q.setFromEuler(e); const s = h * (0.85 + 0.3 * r) / alto; m4.compose(new THREE.Vector3(x, 0, z), q, new THREE.Vector3(s, s, s)); im.setMatrixAt(i, m4); });
      im.castShadow = true; im.receiveShadow = true; escena.add(im);
    });
  });
}

export async function montarPlantaFusion(raiz, opciones = {}) {
  const glb = opciones.glb ?? new URL('./assets/planta_llegada.glb?v=2', import.meta.url).href;
  const canvas = raiz.querySelector('canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NoToneMapping;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const draco = new DRACOLoader().setDecoderPath(opciones.draco ?? 'https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
  const gltf = await new GLTFLoader().setDRACOLoader(draco).loadAsync(glb);
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(CIELO);
  scene.fog = new THREE.Fog(CIELO, 260, 760);
  scene.add(gltf.scene);

  // materiales como en planta3d.js
  const sobrantes = [];
  gltf.scene.traverse((o) => {
    if (!o.isMesh) return;
    if (/^Patio_maniobras/.test(o.name)) { sobrantes.push(o); return; }
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
  sobrantes.forEach((o) => o.removeFromParent());
  await completarEntorno(gltf.scene, opciones.arboles ?? new URL('../campo/assets/arboles.glb?v=1', import.meta.url).href);

  const dirSol = new THREE.Vector3(0.283, -0.743, 0.606).normalize();
  const centro = new THREE.Vector3(-45, 0, -20);
  const sol = new THREE.DirectionalLight(0xfff8ee, 3.2);
  sol.position.copy(centro).addScaledVector(dirSol, -260); sol.target.position.copy(centro);
  sol.castShadow = true; sol.shadow.mapSize.set(4096, 4096);
  Object.assign(sol.shadow.camera, { left: -125, right: 125, top: 125, bottom: -125, near: 60, far: 520 });
  sol.shadow.bias = -0.0003; sol.shadow.normalBias = 0.04; sol.shadow.radius = 2.5;
  scene.add(sol, sol.target);
  scene.add(new THREE.HemisphereLight(0xdde6f2, 0xa9b39a, 1.25));

  // la cámara del .blend solo da la trayectoria; se dibuja con una cámara propia para poder mezclarla
  const horneada = gltf.cameras[0];
  const camara = new THREE.PerspectiveCamera(30, 16 / 9, 0.1, 2500);
  const fovV0 = THREE.MathUtils.degToRad(horneada.fov), aspecto0 = 16 / 9;
  const fovH = 2 * Math.atan(Math.tan(fovV0 / 2) * aspecto0);
  let aspecto = aspecto0, fovHorneada = horneada.fov, sucio = true;
  function redimensionar() {
    const w = raiz.clientWidth, h = raiz.clientHeight; if (!w || !h) return;
    renderer.setSize(w, h, false); aspecto = w / h; camara.aspect = aspecto;
    const k = THREE.MathUtils.clamp((aspecto - 0.6) / (aspecto0 - 0.6), 0, 1);
    const fh = fovH * (0.62 + 0.38 * k);
    fovHorneada = THREE.MathUtils.radToDeg(Math.min(2 * Math.atan(Math.tan(fh / 2) / aspecto), THREE.MathUtils.degToRad(72)));
    sucio = true;
  }
  const ro = new ResizeObserver(redimensionar); ro.observe(raiz); redimensionar();

  // una acción por clip, cada una con su propio reloj
  const mixer = new THREE.AnimationMixer(gltf.scene);
  const acciones = gltf.animations.map((clip) => { const a = mixer.clipAction(clip); a.setLoop(THREE.LoopOnce); a.clampWhenFinished = true; a.play(); return a; });
  const de = (nombre) => acciones.filter((a) => a.getClip().name.startsWith(nombre));
  const a2025 = de('Camion_2025').concat(de('Llanta_').filter((a) => !/\.\d+$/.test(a.getClip().name)));
  const aTrailer = de('Camion_trailer').concat(de('Llanta_').filter((a) => /\.\d+$/.test(a.getClip().name)));
  const aCamara = de('Camara');
  const aResto = acciones.filter((a) => !a2025.includes(a) && !aTrailer.includes(a) && !aCamara.includes(a));
  const camion = gltf.scene.getObjectByName('Camion_2025'), trailer = gltf.scene.getObjectByName('Camion_trailer');
  // largo y nariz del 2025 medidos en su propio marco (x adelante)
  const caja = new THREE.Box3();
  { const q0 = camion.quaternion.clone(), p0 = camion.position.clone(); camion.quaternion.identity(); camion.position.set(0, 0, 0); camion.updateMatrixWorld(true);
    caja.setFromObject(camion); camion.quaternion.copy(q0); camion.position.copy(p0); camion.updateMatrixWorld(true); }
  const NARIZ = caja.max.x, ESCALA = (caja.max.x - caja.min.x) / LARGO_CAMIONES;

  const v = new THREE.Vector3(), w = new THREE.Vector3(), f = new THREE.Vector3(), s = new THREE.Vector3(), arriba = new THREE.Vector3(0, 1, 0);
  const pos = new THREE.Vector3(), mira = new THREE.Vector3(), posH = new THREE.Vector3(), miraH = new THREE.Vector3();
  const alto = new THREE.Vector3(-30, 520, -60), centroZona = new THREE.Vector3(-30, 0, -62);
  function dibujar(p) {
    const pa = tramo(p, FASES.llega), pb = tramo(p, FASES.sale), pc = suave(tramo(p, FASES.sube));
    const t25 = pa * FIN_2025, tTr = pb * FIN_TRAILER;
    for (const a of a2025) a.time = t25;
    for (const a of aTrailer) a.time = tTr;
    for (const a of aResto) a.time = Math.min((pa * 0.5 + pb * 0.5) * DURACION, DURACION - 0.001);
    for (const a of aCamara) a.time = Math.min(t25 * (DURACION / FIN_2025), DURACION - 0.001);
    mixer.update(0);
    gltf.scene.updateMatrixWorld(true);

    // cámara horneada (la del .blend) en este instante
    horneada.updateMatrixWorld(true);
    horneada.getWorldPosition(posH); miraH.set(0, 0, -1).applyQuaternion(horneada.getWorldQuaternion(new THREE.Quaternion())).multiplyScalar(80).add(posH);

    // A · al entrar: el encuadre del tramo de camiones, pegado al 2025; se suelta hacia la horneada
    camion.getWorldPosition(v); f.set(1, 0, 0).applyQuaternion(camion.quaternion); s.crossVectors(f, arriba);
    const nariz = w.copy(v).addScaledVector(f, NARIZ);
    const lejos = aspecto < 1 ? 1.75 : 1;            // misma regla que el tramo de camiones en teléfono vertical
    const e = ESCALA * lejos;
    const sigue = pos.copy(nariz).addScaledVector(f, VIAJE.pos[0] * e).addScaledVector(arriba, VIAJE.pos[1] * e).addScaledVector(s, VIAJE.pos[2] * e);
    const miraSigue = new THREE.Vector3().copy(nariz).addScaledVector(f, VIAJE.mira[0] * ESCALA).addScaledVector(arriba, VIAJE.mira[1] * ESCALA);
    const k = suave(tramo(pa, [0.04, 0.4]));
    camara.position.lerpVectors(sigue, posH, k); mira.lerpVectors(miraSigue, miraH, k);
    let fov = 30 + (fovHorneada - 30) * k;

    // B · el tractocamión sale: la cámara se le pega por detrás y lo sigue a la calle
    if (pb > 0) {
      trailer.getWorldPosition(v); f.set(1, 0, 0).applyQuaternion(trailer.quaternion); s.crossVectors(f, arriba);
      const persigue = w.copy(v).addScaledVector(f, -17).addScaledVector(arriba, 8).addScaledVector(s, -7);
      const kb = suave(Math.min(pb / 0.3, 1));
      camara.position.lerp(persigue, kb); mira.lerp(v.addScaledVector(f, 7), kb);
      fov += (34 - fov) * kb;
    }
    // C · desde el tractocamión, sube en vertical hasta ver la zona desde arriba (ahí entra el planeta)
    if (pc > 0) {
      trailer.getWorldPosition(v);
      const centro = v.lerp(centroZona, pc), altura = Math.exp(Math.log(30) + (Math.log(alto.y) - Math.log(30)) * pc);
      camara.position.lerp(w.set(centro.x, altura, centro.z + 0.01), suave(Math.min(pc * 2.5, 1)));
      mira.lerp(centro, suave(Math.min(pc * 2.5, 1)));
      fov += (40 - fov) * pc;
    }
    camara.up.set(0, 1 - pc, -pc).normalize();        // al mirar hacia abajo, el norte de la escena queda arriba
    camara.lookAt(mira);
    camara.fov = fov; camara.updateProjectionMatrix();
    scene.fog.near = 260 + 1400 * pc; scene.fog.far = 760 + 2200 * pc;   // que desde arriba no se borre todo
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
      mixer.stopAllAction();
      scene.traverse((o) => { if (!o.isMesh) return; o.geometry.dispose(); for (const m of [].concat(o.material)) { for (const x of Object.values(m)) if (x?.isTexture) x.dispose(); m.dispose(); } });
      sol.shadow.map?.dispose(); draco.dispose(); renderer.dispose();
    },
  };
}
