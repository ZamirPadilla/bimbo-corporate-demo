// Tramo 2 de «Del campo a tu mesa»: el camión Bimbo cambia de época al cruzar cada arco, rumbo del campo a la ciudad.
// Parte de la copia de prototipos/camiones/main.js (PR #13), que se queda intacta como respaldo. Cambios de la fusión:
// - módulo montable con el mismo contrato que el campo: fijarAvance(p), pausar(), reanudar(), destruir();
// - cinco épocas (40 → 2025): el tráiler aparece ya estacionado en la planta, en el tramo siguiente;
// - paisaje que pasa de trigal con terracería a casas y a ciudad; luz de amanecer que se vuelve día;
// - arcos sin letreros (sin textos hasta aprobar el flujo);
// - la cámara entra con el encuadre final del campo (mismo camión, mismo lugar en pantalla) y sale con el que
//   recibe la planta.
// Modelos: modelos/*.glb (exportar_glb.py): misma altura, nariz en x = 0, el camión ocupa x ∈ [-largo, 0].
// El camión se queda en el origen y el mundo se mueve hacia atrás; un plano de corte en cada arco muestra el modelo
// nuevo adelante del arco y el anterior detrás.
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { plantarArboles } from '../arboles-campo.js';

const CAMIONES = ['c40', 'c70', 'c80', 'c90', 'c2025'];
const TRAMO = 15, PRIMERO = 24;                      // metros de carretera por época; la primera es más larga para que
                                                     // la cámara termine de girar antes del primer arco
const ARCOS = CAMIONES.slice(1).map((_, i) => PRIMERO + TRAMO * i);
export const RECORRIDO = ARCOS[ARCOS.length - 1] + TRAMO - 4;   // metros totales del tramo
const ZONA = { campo: 27, casas: 46, ciudad: 61 };    // x donde termina el trigal, empiezan casas y empieza la ciudad

// luz: amanecer (empata con el final del campo) → día (empata con la planta)
const LUZ = {
  cielo: [0xc98f5e, 0xdfe7ef], sol: [0xffb878, 0xfff8ef], solI: [2.0, 2.6], hemi: [0xf3c9a0, 0xffffff], hemiI: [1.2, 1.55],
};
// cámaras relativas al camión (marco: x adelante, y arriba, z a la izquierda del camión)
// ENTRADA: el último cuadro del campo, pasado a este marco. En el campo la cámara queda 10.49 m adelante del origen
// del camión, 4.43 m a su izquierda y 1.66 m arriba, mirando 1.2 m arriba del origen, con lente de 40 mm. Ese camión
// mide 4.45 m y tiene el origen a 2.27 m de la nariz; el de aquí mide 3.708 m y tiene el origen en la nariz, así que
// todo se escala por K y se recorre el origen: el camión queda del mismo tamaño y en el mismo lugar de la pantalla.
const K = 3.708 / 4.45, ORIGEN_CAMPO = -2.27 * K;
const ENTRADA = {
  pos: new THREE.Vector3(ORIGEN_CAMPO + 10.488 * K, 1.6645 * K, 4.4314 * K),
  mira: new THREE.Vector3(ORIGEN_CAMPO, 1.2 * K, 0), fovH: 2 * Math.atan(18 / 40),
};
// VIAJE: 3/4 frontal, como los renders del prototipo
const VIAJE = { pos: new THREE.Vector3(5.2, 3.6, -12.5), mira: new THREE.Vector3(-2.4, 1.0, 0), fovH: null };

const aleatorio = (s) => () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
const suave = (x) => x * x * (3 - 2 * x);
const tramo = (x, a, b) => Math.min(Math.max((x - a) / (b - a), 0), 1);

/**
 * @param {HTMLElement} raiz  contenedor con tamaño propio y un <canvas> dentro
 * @param {{ modelos?: string|URL }} [opciones]
 */
export async function montarCamiones(raiz, opciones = {}) {
  const base = new URL(opciones.modelos ?? './modelos/', opciones.modelos ? location.href : import.meta.url);
  const lienzo = raiz.querySelector('canvas');
  const movil = Math.min(screen.width, screen.height) < 700;
  const renderer = new THREE.WebGLRenderer({ canvas: lienzo, antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.localClippingEnabled = true;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(LUZ.cielo[0]);
  scene.fog = new THREE.Fog(LUZ.cielo[0], 30, 95);
  const hemi = new THREE.HemisphereLight(LUZ.hemi[0], 0xa8a090, LUZ.hemiI[0]); scene.add(hemi);
  const sol = new THREE.DirectionalLight(LUZ.sol[0], LUZ.solI[0]);
  sol.castShadow = true; sol.shadow.mapSize.set(2048, 2048);
  Object.assign(sol.shadow.camera, { left: -16, right: 16, top: 12, bottom: -12, near: 1, far: 80 });
  sol.shadow.radius = 4; sol.shadow.bias = -0.0005;
  sol.target.position.set(-3, 0, 0);
  scene.add(sol, sol.target);

  // ---------- mundo que se mueve ----------
  const mundo = new THREE.Group(); scene.add(mundo);
  const mat = (c, extra = {}) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.92, ...extra });
  const X0 = -70, X1 = RECORRIDO + 90;               // lo que alcanza a verse antes del primer arco y después del último
  const col = new THREE.Color(), c1 = new THREE.Color(), c2 = new THREE.Color();
  // piso: trigal dorado en surcos → pasto → concreto, por vértice
  {
    const g = new THREE.PlaneGeometry(X1 - X0, 220, 320, 60); g.rotateX(-Math.PI / 2); g.translate((X0 + X1) / 2, -0.01, 0);
    const p = g.attributes.position, cs = new Float32Array(p.count * 3), rnd = aleatorio(7);
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i), z = p.getZ(i);
      const surco = Math.sin(z * 2.2) > 0 ? 1 : 0.86;
      c1.set(0xc99a4c).multiplyScalar(surco);                        // trigal
      c2.set(0x9fb36f);                                              // pasto (el mismo de la planta)
      col.copy(c1).lerp(c2, suave(tramo(x, ZONA.campo - 6, ZONA.campo + 6)));
      col.multiplyScalar(0.93 + 0.1 * rnd());
      cs.set([col.r, col.g, col.b], i * 3);
    }
    g.setAttribute('color', new THREE.BufferAttribute(cs, 3));
    const piso = new THREE.Mesh(g, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1 })); piso.receiveShadow = true; mundo.add(piso);
  }
  // carretera: terracería → asfalto; rayas y orillas solo donde ya es asfalto
  {
    const g = new THREE.PlaneGeometry(X1 - X0, 7.2, 200, 1); g.rotateX(-Math.PI / 2); g.translate((X0 + X1) / 2, 0, 0);
    const p = g.attributes.position, cs = new Float32Array(p.count * 3);
    for (let i = 0; i < p.count; i++) {
      col.set(0xc39a6b).lerp(c2.set(0xa9adb3), suave(tramo(p.getX(i), ZONA.campo - 4, ZONA.campo + 8)));
      cs.set([col.r, col.g, col.b], i * 3);
    }
    g.setAttribute('color', new THREE.BufferAttribute(cs, 3));
    const c = new THREE.Mesh(g, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.95 })); c.position.y = 0.002; c.receiveShadow = true; mundo.add(c);
  }
  const blanco = mat(0xf4f5f6);
  {
    const raya = new THREE.PlaneGeometry(2, 0.15), partes = [];
    for (let x = ZONA.campo + 6; x < X1; x += 4.5) partes.push(raya.clone().rotateX(-Math.PI / 2).translate(x, 0.004, 2.9));
    for (const z of [-3.35, 3.35]) partes.push(new THREE.PlaneGeometry(X1 - ZONA.campo - 4, 0.12).rotateX(-Math.PI / 2).translate((ZONA.campo + 4 + X1) / 2, 0.004, z));
    mundo.add(new THREE.Mesh(mergeGeometries(partes), blanco));
  }
  // trigo junto a la terracería (espiga mínima instanciada), cada vez más ralo hacia las casas
  {
    const espiga = (() => {
      const tallo = new THREE.CylinderGeometry(0.004, 0.006, 0.95, 3, 1, true).translate(0, 0.475, 0);
      const esp = new THREE.OctahedronGeometry(1, 0).scale(0.022, 0.1, 0.016).translate(0.01, 1.0, 0);
      const pinta = (g, hex) => { if (g.index) g = g.toNonIndexed(); const c = new THREE.Color(hex), a = new Float32Array(g.attributes.position.count * 3); for (let i = 0; i < a.length; i += 3) a.set([c.r, c.g, c.b], i); g.setAttribute('color', new THREE.BufferAttribute(a, 3)); g.deleteAttribute('uv'); return g; };
      return mergeGeometries([pinta(tallo, 0xc9a24e), pinta(esp, 0xe2ad4c)]);
    })();
    // denso junto a la terracería (como el campo) y cada vez más ralo hacia el fondo
    const rnd = aleatorio(3), pts = [], n = movil ? 9000 : 24000;
    for (let i = 0; i < n * 3 && pts.length < n; i++) {
      const x = X0 + rnd() * (ZONA.campo + 4 - X0), z = (rnd() < 0.3 ? -1 : 1) * (4.0 + Math.pow(rnd(), 2.2) * 30);
      if (rnd() < tramo(x, ZONA.campo - 8, ZONA.campo + 4)) continue;     // ralea al acercarse a las casas
      pts.push([x, z]);
    }
    const im = new THREE.InstancedMesh(espiga, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.7 }), pts.length);
    const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3(), e = new THREE.Euler();
    pts.forEach(([x, z], i) => { e.set((rnd() - 0.5) * 0.25, rnd() * 6.3, (rnd() - 0.5) * 0.25); q.setFromEuler(e); s.setScalar(0.8 + 0.4 * rnd()); m4.compose(new THREE.Vector3(x, 0, z), q, s); im.setMatrixAt(i, m4); });
    mundo.add(im);
  }
  // árboles (los mismos del campo), casas con techo de dos aguas y edificios en tonos de juguete
  const arboles = [];
  {
    const rnd = aleatorio(11), m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler();
    const instanciar = (geo, material, lista, sombra = true) => {
      const im = new THREE.InstancedMesh(geo, material, lista.length);
      lista.forEach((o, i) => { e.set(0, o.giro ?? 0, 0); q.setFromEuler(e); m4.compose(new THREE.Vector3(o.x, o.y ?? 0, o.z), q, new THREE.Vector3(...o.esc)); im.setMatrixAt(i, m4); if (o.color) im.setColorAt(i, col.set(o.color)); });
      im.castShadow = sombra; im.receiveShadow = true; mundo.add(im); return im;
    };
    const lado = () => 9 + rnd() * 40;               // detrás de la carretera (z > 0), donde no tapa al camión
    const casas = [], techos = [], edificios = [];
    for (let x = X0; x < X1; x += 2 + rnd() * 5) {
      const urbano = tramo(x, ZONA.casas - 4, ZONA.ciudad + 10);
      if (rnd() < 0.55 * (1 - urbano) + 0.12) arboles.push([x, lado(), 6 + rnd() * 4]);
    }
    for (let x = ZONA.casas - 10; x < X1; x += 6 + rnd() * 4) {
      const urbano = tramo(x, ZONA.ciudad - 4, ZONA.ciudad + 14);
      for (let fila = 0; fila < 1 + Math.round(urbano * 2); fila++) {
        const z = 9 + fila * 11 + rnd() * 4;
        if (rnd() < urbano) {
          const h = 6 + rnd() * (8 + 22 * urbano);
          edificios.push({ x, z: z + 2, esc: [5 + rnd() * 3, h, 5 + rnd() * 4], y: h / 2, color: [0xe8e2d6, 0xd9dde3, 0xc9d3dc, 0xe6d3c0, 0xbfc8d2][Math.floor(rnd() * 5)] });
        } else if (x < ZONA.ciudad + 16) {
          const w = 3.6 + rnd() * 1.5, d = 4 + rnd() * 2, h = 2.6 + rnd() * 0.6;
          casas.push({ x, z, esc: [w, h, d], y: h / 2, color: [0xf1e3cf, 0xe9d2b4, 0xf4ece0, 0xdcc6a8][Math.floor(rnd() * 4)] });
          techos.push({ x, z, y: h, esc: [w * 1.08, 1.4, d * 1.08], color: [0xb6563f, 0xa34a36, 0x8f5a44][Math.floor(rnd() * 3)] });
        }
      }
    }
    // techo de dos aguas: triángulo de 1 × 1 extruido 1 m, con la cumbrera a lo largo de x
    const techo = new THREE.ExtrudeGeometry(new THREE.Shape([new THREE.Vector2(-0.5, 0), new THREE.Vector2(0.5, 0), new THREE.Vector2(0, 1)]), { depth: 1, bevelEnabled: false })
      .translate(0, 0, -0.5).rotateY(Math.PI / 2);
    if (casas.length) instanciar(new THREE.BoxGeometry(1, 1, 1), mat(0xffffff), casas);
    if (techos.length) instanciar(techo, mat(0xffffff), techos);
    if (edificios.length) instanciar(new THREE.BoxGeometry(1, 1, 1), mat(0xffffff, { roughness: 0.8 }), edificios);
  }
  await plantarArboles(mundo, arboles);

  // el cambio de época es un cristal sin marco que cruza todo el paisaje: sus bordes nunca entran a cuadro
  {
    const g = new THREE.PlaneGeometry(600, 160, 1, 40).rotateY(Math.PI / 2).translate(0, 80 - 0.5, 0);
    // más denso abajo y casi invisible arriba, como un vidrio que refleja el piso
    const p = g.attributes.position, cs = new Float32Array(p.count * 4);
    for (let i = 0; i < p.count; i++) cs.set([1, 1, 1, 0.22 * Math.exp(-Math.max(p.getY(i), 0) / 9) + 0.05], i * 4);
    g.setAttribute('color', new THREE.BufferAttribute(cs, 4));
    const cristal = new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, depthWrite: false, side: THREE.DoubleSide, fog: false });
    for (const x of ARCOS) { const c = new THREE.Mesh(g, cristal); c.position.x = x; c.renderOrder = 2; mundo.add(c); }
  }

  // ---------- camiones: todos en el origen, cada uno recortado entre su arco de entrada y el de salida ----------
  const loader = new GLTFLoader();
  const camiones = await Promise.all(CAMIONES.map(async (id) => {
    const [gltf, meta] = await Promise.all([loader.loadAsync(new URL(`${id}.glb`, base).href), fetch(new URL(`${id}.json`, base)).then((r) => r.json())]);
    const entrada = new THREE.Plane(new THREE.Vector3(1, 0, 0), 1e4), salida = new THREE.Plane(new THREE.Vector3(-1, 0, 0), 1e4);
    const llantas = [], vistos = new Map();
    gltf.scene.traverse((o) => {
      if (o.name.startsWith('Llanta')) llantas.push(o);
      if (!o.isMesh) return;
      o.castShadow = true; o.receiveShadow = true;
      if (!vistos.has(o.material)) { const m = o.material.clone(); m.clippingPlanes = [entrada, salida]; m.clipShadows = true; m.side = THREE.DoubleSide; vistos.set(o.material, m); }
      o.material = vistos.get(o.material);
    });
    scene.add(gltf.scene);
    return { id, ...meta, raiz: gltf.scene, entrada, salida, llantas };
  }));

  // ---------- cámara ----------
  const camara = new THREE.PerspectiveCamera(30, 1, 0.1, 300);
  let aspecto = 1, sucio = true;
  function redimensionar() {
    const w = Math.max(raiz.clientWidth, 1), h = Math.max(raiz.clientHeight, 1);
    renderer.setSize(w, h, false); aspecto = w / h; camara.aspect = aspecto; sucio = true;
  }
  const ro = new ResizeObserver(redimensionar); ro.observe(raiz); redimensionar();
  const pos = new THREE.Vector3(), mira = new THREE.Vector3();
  function encuadrar(u) {
    // VIAJE con su fov vertical de 30° (en teléfono vertical, más atrás para que quepa el camión); ENTRADA conserva
    // el ancho de campo horizontal del campo para que el camión quede del mismo tamaño en el corte
    const lejos = aspecto < 1 ? 1.75 : 1;
    const k = suave(tramo(u, 0, 0.16));             // la cámara gira de la entrada al 3/4 frontal en el primer 16 %
    // interpolación en cilíndricas alrededor del camión: rodea la nariz en vez de atravesarla
    const a0 = Math.atan2(ENTRADA.pos.z, ENTRADA.pos.x), a1 = Math.atan2(VIAJE.pos.z, VIAJE.pos.x);
    const r0 = Math.hypot(ENTRADA.pos.x, ENTRADA.pos.z), r1 = Math.hypot(VIAJE.pos.x, VIAJE.pos.z) * lejos;
    const a = a0 + (a1 - a0) * k, r = r0 + (r1 - r0) * k;
    pos.set(Math.cos(a) * r, ENTRADA.pos.y + (VIAJE.pos.y * lejos - ENTRADA.pos.y) * k, Math.sin(a) * r);
    mira.lerpVectors(ENTRADA.mira, VIAJE.mira, k);
    camara.position.copy(pos); camara.lookAt(mira);
    const fovEntrada = 2 * Math.atan(Math.tan(ENTRADA.fovH / 2) / aspecto);
    camara.fov = THREE.MathUtils.radToDeg(fovEntrada + (THREE.MathUtils.degToRad(30) - fovEntrada) * k);
    camara.updateProjectionMatrix();
  }

  // ---------- luz y avance ----------
  const ilumina = (u) => {
    const k = suave(tramo(u, 0.05, 0.7));
    scene.background.set(LUZ.cielo[0]).lerp(col.set(LUZ.cielo[1]), k); scene.fog.color.copy(scene.background);
    sol.color.set(LUZ.sol[0]).lerp(col.set(LUZ.sol[1]), k); sol.intensity = LUZ.solI[0] + (LUZ.solI[1] - LUZ.solI[0]) * k;
    hemi.color.set(LUZ.hemi[0]).lerp(col.set(LUZ.hemi[1]), k); hemi.intensity = LUZ.hemiI[0] + (LUZ.hemiI[1] - LUZ.hemiI[0]) * k;
    sol.position.set(12 - 8 * k, 5 + 9 * k, -10 + 3 * k);   // sol bajo de frente que sube
  };
  let d = 0;
  function dibujar() {
    const u = d / RECORRIDO;
    mundo.position.x = -d;
    camiones.forEach((c, i) => {
      const sEntrada = i === 0 ? -1e4 : ARCOS[i - 1] - d, sSalida = i === camiones.length - 1 ? 1e4 : ARCOS[i] - d;
      c.entrada.constant = -sEntrada; c.salida.constant = sSalida;
      c.raiz.visible = sEntrada < 0.05 && sSalida > -c.largo - 0.05;
      for (const ll of c.llantas) ll.rotation.z = -d / c.radio_llanta;
    });
    ilumina(u); encuadrar(u);
    renderer.render(scene, camara);
  }

  let raf = 0, visible = true, pausado = false;
  const debeCorrer = () => visible && !pausado && !document.hidden;
  function bucle() { if (sucio) { dibujar(); sucio = false; } raf = requestAnimationFrame(bucle); }
  function actualizar() {
    if (debeCorrer() && !raf) { sucio = true; raf = requestAnimationFrame(bucle); }
    else if (!debeCorrer() && raf) { cancelAnimationFrame(raf); raf = 0; }
  }
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; actualizar(); }); io.observe(raiz);
  document.addEventListener('visibilitychange', actualizar);
  dibujar(); actualizar();

  return {
    /** 0 = el camión de los 40 con el encuadre final del campo · 1 = el 2025 entrando a la ciudad */
    fijarAvance(p) { const n = Math.min(Math.max(p, 0), 1) * RECORRIDO; if (n !== d) { d = n; sucio = true; } },
    pausar() { pausado = true; actualizar(); },
    reanudar() { pausado = false; actualizar(); },
    /** Cámara y camión actuales, para que el director empate el corte con la escena siguiente. */
    estado: () => ({ camara, camion: camiones[camiones.length - 1].raiz }),
    destruir() {
      cancelAnimationFrame(raf); raf = 0; io.disconnect(); ro.disconnect();
      document.removeEventListener('visibilitychange', actualizar);
      scene.traverse((o) => { o.geometry?.dispose(); for (const m of [].concat(o.material ?? [])) { m.map?.dispose(); m.dispose(); } });
      renderer.dispose();
    },
  };
}
