// Tramo 4 de «Del campo a tu mesa»: zoom out al planeta. Parte de main.js del planeta limpio (localhost:8812), que se
// queda intacto junto a este archivo. Cambios de la fusión:
// - el avance lo marca el director (fijarAvance); sin arrastre ni reloj propio y con el bosque ya crecido;
// - el planeta queda fijo, girado para que México quede al frente del encuadre final, que es el mismo de :8812
//   (horizonte curvo, de cerca). La vista del globo completo vive en otra sección;
// - la cámara empieza justo arriba de la planta (Ciudad de México), mirando hacia abajo con el norte arriba como
//   termina la planta, y se aleja hasta ese encuadre;
// - aerogeneradores girando sobre tierra, con un parque en el Istmo de Tehuantepec;
// - los 39 países con operación directa se encienden como puntos blancos, por región. Sin arcos ni etiquetas.
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { materialPlaneta } from './planeta_material.js';

const R = 10;
const ORIGEN = { lat: 19.43, lon: -99.13 };           // la planta del tramo anterior
const FRENTE = { lat: 31, lon: -100 };                // lo que queda al centro de la tierra visible al final
const DIST_INICIO = R + 2.2;
const LLEGA = 0.6;                                   // avance en que se llega al encuadre de :8812
const GIRO_FINAL = -0.4, ALEJA_FINAL = 4.5;          // después: el planeta gira ~23° (la tierra se va a la izquierda) y la cámara se aleja
// cuándo se enciende cada región (inicio, fin del avance); dentro de cada una, de lo cercano a lo lejano de México
const OLEADAS = { 2: [0.3, 0.3], 1: [0.42, 0.55], 3: [0.55, 0.75], 4: [0.75, 0.95] };
// aerogeneradores (lat, lon): uno por parque, a 5° o más entre sí para que no se encimen (el rotor mide ~3° de
// lado a lado a esta escala). El del Istmo de Tehuantepec es el parque que abastece a Bimbo en México
const AEROGENERADORES = [
  [16.5, -95.0], [25.7, -98.2], [31.5, -115.5], [27.8, -105.0], [22.0, -103.0],                       // México
  [32.8, -100.5], [37.4, -97.5], [42.2, -93.0], [41.5, -105.8], [36.2, -120.2], [46.8, -100.8], [51.0, -112.0], // EUA y Canadá
  [10.5, -85.2], [-5.5, -37.0], [-45.0, -68.5], [-32.5, -57.5],                                       // Latinoamérica
  [42.0, -4.0], [54.5, -2.5], [39.0, 28.5], [42.0, 113.0], [-32.5, 24.5], [22.5, 71.0],
];

const rad = THREE.MathUtils.degToRad;
const suave = (x) => x * x * (3 - 2 * x);
const tramo = (x, a, b) => Math.min(Math.max((x - a) / (b - a), 0), 1);
// mismo mapeo que la textura equirectangular del planeta; N y E: norte y este en el plano tangente (E = N × n)
function base(lat, lon) {
  const p = rad(lat), l = rad(lon);
  return { n: new THREE.Vector3(Math.cos(p) * Math.cos(l), Math.sin(p), -Math.cos(p) * Math.sin(l)),
           N: new THREE.Vector3(-Math.sin(p) * Math.cos(l), Math.cos(p), Math.sin(p) * Math.sin(l)),
           E: new THREE.Vector3(-Math.sin(l), 0, -Math.cos(l)) };
}
const normal = (lat, lon) => base(lat, lon).n;

export async function montarPlanetaFusion(raiz, opciones = {}) {
  const baseUrl = new URL(opciones.assets ?? './assets/', opciones.assets ? location.href : import.meta.url);
  const url = (n) => new URL(n + '?v=3', baseUrl).href;
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

  // luz igual que en :8812: sol fijo del .blend y cielo frío tenue
  const sol = new THREE.DirectionalLight(0xfff9f2, meta.sol_energia);
  sol.position.copy(new THREE.Vector3(...meta.sol_dir).normalize()).multiplyScalar(-40);
  sol.castShadow = true; sol.shadow.mapSize.set(4096, 4096);
  Object.assign(sol.shadow.camera, { left: -12, right: 12, top: 12, bottom: -12, near: 20, far: 60 });
  sol.shadow.bias = -0.0004; sol.shadow.normalBias = 0.02; sol.shadow.radius = 3;
  scene.add(sol, sol.target);
  scene.add(new THREE.HemisphereLight(0xd3deee, 0x9fb0c8, 1.15));

  // ---------- cámara final (la de :8812) y giro del planeta que pone México al frente ----------
  const final = meta.camara.f250;
  const posFinal = new THREE.Vector3(...final.pos), fwdFinal = new THREE.Vector3(...final.fwd).normalize(), upFinal = new THREE.Vector3(...final.up);
  // punto de la superficie que queda al centro de la tierra visible: entre el más cercano a la cámara y donde el
  // eje de la vista toca el planeta
  const cerca = posFinal.clone().normalize();
  const b = posFinal.dot(fwdFinal), c = posFinal.lengthSq() - R * R, t = -b - Math.sqrt(Math.max(b * b - c, 0));
  const toca = posFinal.clone().addScaledVector(fwdFinal, t).normalize();
  const D = cerca.clone().lerp(toca, 0.45).normalize();
  const Nt = upFinal.clone().addScaledVector(D, -upFinal.dot(D)).normalize(), Et = new THREE.Vector3().crossVectors(Nt, D);
  const fr = base(FRENTE.lat, FRENTE.lon);
  const giro = new THREE.Matrix4().makeBasis(Et, Nt, D).multiply(new THREE.Matrix4().makeBasis(fr.E, fr.N, fr.n).transpose());

  const planeta = new THREE.Group(); planeta.quaternion.setFromRotationMatrix(giro); scene.add(planeta);
  const qBase = planeta.quaternion.clone(), qGiro = new THREE.Quaternion(), EJE = new THREE.Vector3(0, 1, 0);
  const rn = meta.nubes_rot[1], qNubes = new THREE.Quaternion().setFromEuler(new THREE.Euler(rn[0], rn[2], -rn[1], 'YZX'));   // Blender XYZ → three, como main.js
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
  // nubes: en la misma posición que en :8812 (al final de su intro), que las deja en la orilla del encuadre; con el
  // avance se recorren poco
  const pivoteNubes = new THREE.Group(); scene.add(pivoteNubes);
  const matNube = new THREE.MeshStandardMaterial({ color: 0xf3f4ff, roughness: 0.55, emissive: 0xe9ebff, emissiveIntensity: 0.35, transparent: true });
  for (const [nombre, o] of Object.entries(nodos)) { if (!nombre.startsWith('nube_')) continue; o.traverse((ch) => { if (ch.isMesh) ch.material = matNube; }); pivoteNubes.add(o); }

  // ---------- aerogeneradores: torre y góndola fijas, rotor que gira ----------
  const blancoAero = new THREE.MeshStandardMaterial({ color: 0xf4f6f8, roughness: 0.5 });
  const ALTO = 0.62, ASPA = 0.26;                      // en unidades del planeta (radio 10): más altos que los árboles
  const piezasFijas = [
    new THREE.CylinderGeometry(0.013, 0.026, ALTO, 10).translate(0, ALTO / 2, 0),         // torre
    new THREE.BoxGeometry(0.034, 0.034, 0.09).translate(0, ALTO, -0.018),                 // góndola
  ];
  const piezasRotor = [0, 1, 2].map((k) => new THREE.BoxGeometry(0.022, ASPA, 0.006).translate(0, ASPA / 2 + 0.012, 0).rotateZ(k * Math.PI * 2 / 3))
    .concat(new THREE.SphereGeometry(0.02, 10, 8));                                       // tres aspas y buje
  const marcos = AEROGENERADORES.map(([lat, lon], i) => {
    const { n, N, E } = base(lat, lon);
    const rumbo = rad(70 + (i * 37) % 40);           // casi todos de cara al mismo viento
    const x = N.clone().multiplyScalar(Math.cos(rumbo)).add(E.clone().multiplyScalar(Math.sin(rumbo)));
    const z = new THREE.Vector3().crossVectors(x, n);
    return new THREE.Matrix4().makeBasis(x, n, z).setPosition(n.clone().multiplyScalar(R - 0.01));
  });
  const instanciar = (geos) => geos.map((g) => { const im = new THREE.InstancedMesh(g, blancoAero, marcos.length); im.castShadow = true; im.receiveShadow = true; im.frustumCulled = false; planeta.add(im); return im; });
  instanciar(piezasFijas).forEach((im) => marcos.forEach((m, i) => im.setMatrixAt(i, m)));
  const rotores = instanciar(piezasRotor);
  const giroRotor = new THREE.Matrix4(), alRotor = new THREE.Matrix4().makeTranslation(0, ALTO, 0.032), tmp = new THREE.Matrix4();
  function girarRotores(segundos) {
    marcos.forEach((m, i) => {
      giroRotor.makeRotationZ(segundos * 1.8 + i * 0.7);
      tmp.copy(m).multiply(alRotor).multiply(giroRotor);
      for (const im of rotores) im.setMatrixAt(i, tmp);
    });
    for (const im of rotores) im.instanceMatrix.needsUpdate = true;
  }

  // ---------- países: punto blanco con un aro que late al encenderse ----------
  const puntoGeo = new THREE.SphereGeometry(0.06, 16, 12), aroGeo = new THREE.RingGeometry(0.09, 0.11, 40);
  const puntoMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const origen = normal(ORIGEN.lat, ORIGEN.lon);
  const porRegion = {};
  for (const p of datos.paises) (porRegion[p.region] ??= []).push(p);
  const paises = [];
  for (const [region, lista] of Object.entries(porRegion)) {
    const [a, z] = OLEADAS[region];
    lista.sort((x, y) => normal(x.lat, x.lon).angleTo(origen) - normal(y.lat, y.lon).angleTo(origen));
    lista.forEach((p, i) => {
      if (region === '2') p = { ...p, ...ORIGEN };     // México: el punto va en la planta
      const n = normal(p.lat, p.lon), llega = a + (z - a) * (lista.length > 1 ? i / (lista.length - 1) : 0);
      const punto = new THREE.Mesh(puntoGeo, puntoMat); punto.position.copy(n).multiplyScalar(R + 0.3);
      const aro = new THREE.Mesh(aroGeo, new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, depthWrite: false, side: THREE.DoubleSide }));
      aro.position.copy(n).multiplyScalar(R + 0.29); aro.lookAt(n.clone().multiplyScalar(R * 2));
      planeta.add(punto, aro);
      paises.push({ llega, punto, aro });
    });
  }

  // ---------- cámara: de arriba de la planta al encuadre de :8812 ----------
  const camara = new THREE.PerspectiveCamera(30, 1, 0.02, 300);
  const fovH = 2 * Math.atan(meta.sensor_mm / 2 / meta.lente_mm);
  let sucio = true;
  function redimensionar() {
    const w = raiz.clientWidth, h = raiz.clientHeight; if (!w || !h) return;
    renderer.setSize(w, h, false); camara.aspect = w / h;
    camara.fov = THREE.MathUtils.radToDeg(2 * Math.atan(Math.tan(fovH / 2) / camara.aspect));   // como :8812
    camara.updateProjectionMatrix(); sucio = true;
  }
  const ro = new ResizeObserver(redimensionar); ro.observe(raiz); redimensionar();

  const dirInicio = origen.clone().applyQuaternion(planeta.quaternion);
  const norteInicio = base(ORIGEN.lat, ORIGEN.lon).N.applyQuaternion(planeta.quaternion);
  const qInicio = new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().lookAt(dirInicio.clone().multiplyScalar(DIST_INICIO), new THREE.Vector3(), norteInicio));
  const qFinal = new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().lookAt(posFinal, posFinal.clone().add(fwdFinal), upFinal));
  const dirFinal = posFinal.clone().normalize(), distFinal = posFinal.length(), dir = new THREE.Vector3();
  function dibujar(p, segundos) {
    const k = suave(tramo(p, 0, LLEGA));
    dir.copy(dirInicio).lerp(dirFinal, k).normalize();
    const dist = Math.exp(Math.log(DIST_INICIO) + (Math.log(distFinal) - Math.log(DIST_INICIO)) * k);
    camara.position.copy(dir).multiplyScalar(dist);
    camara.quaternion.slerpQuaternions(qInicio, qFinal, suave(tramo(p, 0.05, LLEGA)));
    // ya en el encuadre, el scroll sigue moviendo: el planeta gira sobre su eje y la cámara se aleja por su eje de vista
    const kf = suave(tramo(p, LLEGA - 0.15, 1));
    planeta.quaternion.copy(qBase).multiply(qGiro.setFromAxisAngle(EJE, GIRO_FINAL * kf));
    camara.position.addScaledVector(fwdFinal, -ALEJA_FINAL * suave(tramo(p, LLEGA, 1)));
    pivoteNubes.quaternion.copy(qNubes); pivoteNubes.rotateY(-0.12 * p);
    matNube.opacity = suave(tramo(dist, R + 3, R + 6));   // de cerca, las nubes estorban
    girarRotores(segundos);
    for (const c of paises) {
      const x = tramo(p, c.llega, c.llega + 0.03);
      const m = x - 1; c.punto.scale.setScalar(x > 0 ? 1 + 2.70158 * m * m * m + 1.70158 * m * m : 0.0001);
      const pulso = tramo(p, c.llega, c.llega + 0.07);
      c.aro.scale.setScalar(0.6 + pulso * 1.8); c.aro.material.opacity = pulso > 0 && pulso < 1 ? (1 - pulso) * 0.9 : 0;
    }
    renderer.render(scene, camara);
  }

  // los rotores giran siempre: mientras se vea, se dibuja cada cuadro
  let avance = 0, raf = 0, visible = true, pausado = false;
  const quieto = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const debeCorrer = () => visible && !pausado && !document.hidden;
  function bucle(ahora) { if (sucio || !quieto) { dibujar(avance, quieto ? 0 : ahora / 1000); sucio = false; } raf = requestAnimationFrame(bucle); }
  function actualizar() {
    if (debeCorrer() && !raf) { sucio = true; raf = requestAnimationFrame(bucle); }
    else if (!debeCorrer() && raf) { cancelAnimationFrame(raf); raf = 0; }
  }
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; actualizar(); }); io.observe(raiz);
  document.addEventListener('visibilitychange', actualizar);
  dibujar(0, 0); actualizar();

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
