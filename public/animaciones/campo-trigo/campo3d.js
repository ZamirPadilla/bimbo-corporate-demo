// Campo de trigo Bimbo en three.js: espiga -> parcela a ojos de persona -> terracería con el camión de los 40.
// La escena original vive en Blender (campo-trigo.blend); de ahí salen assets/*.glb y escena.json
// (scripts/exportar_web.py). Terreno, parcela, terracería y trigo lejano se reconstruyen aquí con las mismas fórmulas.
//
// montarCampo(raiz, opciones) no lee el scroll: quien la monta decide el avance con fijarAvance(0..1).
// Así la misma escena sirve en su página de prueba (avance = scroll de la página) y dentro de una animación mayor
// (avance = tramo de esa animación).
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { BokehPass } from 'three/addons/postprocessing/BokehPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

const VERSION_ASSETS = 1;   // súbela al regenerar los assets, para que el navegador no use la copia en caché

// ---------- geografía (mismas fórmulas que scripts/campo_persona.py, en coordenadas de Blender) ----------
const X_CAMPO = [-60, 12.9], Y_CAMPO = [-14, 115], ANCHO_CAMINO = 2.6;
const xCamino = (y) => 16 + 2.2 * Math.sin(y / 35);
function altura(x, y) {
  const r = Math.hypot(x, y - 30), amp = Math.min(Math.max((r - 60) / 120, 0.08), 1) * 4;
  return amp * (Math.sin(x / 47 + 0.7) * Math.cos(y / 61 - 0.3) + 0.5 * Math.sin(x / 23 + y / 31));
}
const enCampo = (x, y) => x > X_CAMPO[0] && x < X_CAMPO[1] && y > Y_CAMPO[0] && y < Y_CAMPO[1];
// Blender (x, y, z) -> three (x, z, -y)
const V3 = (x, y, z) => new THREE.Vector3(x, z, -y);
function aleatorio(semilla) { let a = semilla >>> 0; return () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const col = (hex) => new THREE.Color(hex);
const lerp = (a, b, t) => a + (b - a) * t, lerp3 = (a, b, t) => a.map((v, i) => lerp(v, b[i], t));

/**
 * @param {HTMLElement} raiz  contenedor con tamaño propio y un <canvas> dentro. Si existen, usa `.cargando`
 *   (lo quita al cargar) y `.depurar` (fps y triángulos).
 * @param {object} [opciones]
 * @param {string|URL} [opciones.assets]  carpeta de trigo.glb, arboles.glb, camion.glb y escena.json
 * @param {number} [opciones.avance=0]     avance inicial, de 0 (espiga) a 1 (camión en la terracería)
 * @param {number} [opciones.inercia=0.2]  segundos que tarda en alcanzar el avance pedido; 0 = salto directo
 * @param {boolean} [opciones.movil]       versión ligera (menos trigo, sin sombras); por defecto, pantallas < 700 px
 * @param {boolean} [opciones.depurar]
 * @returns {Promise<{duracion:number, fijarAvance:(p:number)=>void, fijarSegundo:(t:number)=>void,
 *   readonly avance:number, pausar:()=>void, reanudar:()=>void, destruir:()=>void}>}
 */
export async function montarCampo(raiz, opciones = {}) {
  const base = new URL(opciones.assets ?? './assets/', opciones.assets ? location.href : import.meta.url);
  const url = (n) => new URL(`${n}?v=${VERSION_ASSETS}`, base).href;
  const MOVIL = opciones.movil ?? Math.min(screen.width, screen.height) < 700;
  const CALIDAD = MOVIL ? 0.45 : 1;                       // densidad de trigo relativa
  const quieto = matchMedia('(prefers-reduced-motion: reduce)').matches;   // sin viento, polvo ni inercia
  const inercia = quieto ? 0 : (opciones.inercia ?? 0.2);
  const lienzo = raiz.querySelector('canvas');

  // ---------- render ----------
  const renderer = new THREE.WebGLRenderer({ canvas: lienzo, antialias: !MOVIL, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, MOVIL ? 1.5 : 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 0.9;
  renderer.shadowMap.enabled = !MOVIL; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.info.autoReset = false;
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xc98a55, 90, 650);
  const camera = new THREE.PerspectiveCamera(30, 1, 0.05, 1500);

  const res = await fetch(url('escena.json')).then((r) => r.json());
  const SOL = new THREE.Vector3(...res.sol).normalize();      // hacia el sol
  const COLOR_SOL = col(0xffb36b);

  // ---------- luz ----------
  const sol = new THREE.DirectionalLight(0xffa25a, 2.4); sol.position.copy(SOL).multiplyScalar(120);
  sol.castShadow = !MOVIL; sol.shadow.mapSize.set(2048, 2048);
  Object.assign(sol.shadow.camera, { left: -12, right: 12, top: 12, bottom: -12, near: 1, far: 400 });
  scene.add(sol, sol.target);
  scene.add(new THREE.HemisphereLight(0xf0a868, 0x4a3018, 0.55));
  const relleno = new THREE.DirectionalLight(0xffc489, 1.1); relleno.position.set(-0.35, 0.55, 1.0).multiplyScalar(60); scene.add(relleno);

  // ---------- cielo: degradado por elevación + resplandor del sol ----------
  scene.add(new THREE.Mesh(new THREE.SphereGeometry(1200, 32, 16), new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, fog: false,
    uniforms: { sol: { value: SOL }, cSol: { value: col(0xffc477) } },
    vertexShader: 'varying vec3 d; void main(){ d = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
    fragmentShader: `uniform vec3 sol; uniform vec3 cSol; varying vec3 d;
      void main(){
        float e = clamp(d.y, -0.1, 1.0);
        vec3 hor = vec3(0.62, 0.27, 0.08), med = vec3(0.36, 0.13, 0.05), alto = vec3(0.05, 0.04, 0.085);
        vec3 c = mix(hor, med, smoothstep(0.0, 0.18, e)); c = mix(c, alto, smoothstep(0.15, 0.7, e));
        float s = max(dot(d, sol), 0.0);
        c += cSol * (pow(s, 900.0) * 20.0 + pow(s, 60.0) * 0.8 + pow(s, 8.0) * 0.22);
        gl_FragColor = vec4(c, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }` })));

  // ---------- terreno: parcela, terracería con rodadas, arado, trigo lejano, pasto ----------
  {
    const g = new THREE.PlaneGeometry(320, 320, 256, 256); g.rotateX(-Math.PI / 2); g.translate(0, 0, -60);
    const p = g.attributes.position, colores = new Float32Array(p.count * 3), c = new THREE.Color();
    const C = { pasto: col(0x7f8a3f), trigo: col(0xa77b36), lejos: col(0xd6a24a), arado: col(0x7a5234), camino: col(0xc39a6b), rodada: col(0x93704c) };
    const rnd = aleatorio(4);
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i), y = -p.getZ(i), dc = Math.abs(x - xCamino(y));
      let h = altura(x, y);
      if (dc < ANCHO_CAMINO) { h -= 0.06; c.copy(Math.abs(dc - 0.95) < 0.3 ? C.rodada : C.camino); }
      else if (enCampo(x, y)) c.copy(C.trigo);
      else if (x > xCamino(y) + 6 && x < 95 && y > -30 && y < 140) c.copy(C.arado).multiplyScalar(0.8 + 0.25 * (Math.sin(x * 0.75) > 0 ? 1 : 0));
      else if ((x < -64 && x > -170 && y > 0 && y < 160) || (y > 122 && y < 230 && x < 10 && x > -120)) c.copy(C.lejos);
      else c.copy(C.pasto);
      c.multiplyScalar(0.88 + 0.24 * rnd());
      p.setY(i, h); colores.set([c.r, c.g, c.b], i * 3);
    }
    g.setAttribute('color', new THREE.BufferAttribute(colores, 3)); g.computeVertexNormals();
    const t = new THREE.Mesh(g, new THREE.MeshLambertMaterial({ vertexColors: true })); t.receiveShadow = true; scene.add(t);
  }

  // ---------- material del trigo: viento en el vértice + luz que traspasa a contraluz ----------
  const uTiempo = { value: 0 }, uSolVista = { value: new THREE.Vector3() };
  function materialTrigo() {
    const m = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.6, metalness: 0 });
    m.onBeforeCompile = (s) => {
      s.uniforms.uTiempo = uTiempo; s.uniforms.uSolVista = uSolVista; s.uniforms.cSol = { value: COLOR_SOL };
      s.vertexShader = 'uniform float uTiempo;\n' + s.vertexShader.replace('#include <begin_vertex>', `#include <begin_vertex>
        #ifdef USE_INSTANCING
          vec3 ip = (instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
          float ola = sin(ip.x * 0.11 + uTiempo * 2.4) * 0.6 + sin(ip.z * 0.07 - ip.x * 0.05 + uTiempo * 1.5) * 0.4;
          float temblor = sin(uTiempo * 3.1 + ip.x * 3.7 + ip.z * 5.3) * 0.12;
          float h = max(transformed.y, 0.0);
          vec3 dirL = transpose(mat3(instanceMatrix)) * normalize(vec3(1.0, 0.0, 0.45));
          transformed += dirL * (ola * 0.16 + temblor * 0.1 + 0.05) * h * h;
        #endif`);
      s.fragmentShader = 'uniform vec3 uSolVista; uniform vec3 cSol;\n' + s.fragmentShader.replace('#include <opaque_fragment>', `
        float tras = pow(max(dot(normalize(-vViewPosition), uSolVista), 0.0), 5.0);
        outgoingLight += diffuseColor.rgb * cSol * tras * 0.6;
        #include <opaque_fragment>`);
    };
    return m;
  }
  const MAT_TRIGO = materialTrigo();
  const COLOR_PARTE = { M_tallo: 0xc9a24e, M_grano: 0xe2ad4c, M_barba: 0xefd08a, M_hoja: 0xb9984a };
  function aGeometria(obj) {   // fusiona las primitivas de un glTF en una geometría con color por vértice
    const partes = [];
    obj.updateMatrixWorld(true);
    obj.traverse((o) => {
      if (!o.isMesh) return;
      const g = o.geometry.clone(); g.applyMatrix4(o.matrixWorld);
      const c = col(COLOR_PARTE[o.material.name] ?? o.material.color?.getHex() ?? 0xd9a441);
      const arr = new Float32Array(g.attributes.position.count * 3); for (let i = 0; i < arr.length; i += 3) arr.set([c.r, c.g, c.b], i);
      g.setAttribute('color', new THREE.BufferAttribute(arr, 3));
      for (const k of Object.keys(g.attributes)) if (!['position', 'normal', 'color'].includes(k)) g.deleteAttribute(k);
      partes.push(g.index ? g.toNonIndexed() : g);
    });
    return mergeGeometries(partes);
  }
  function espigaMinima(semilla) {   // tallo + espiga en rombo alargado (~20 triángulos), para media distancia y fondo
    const r = aleatorio(semilla), h = 0.9 + 0.15 * r();
    const tallo = new THREE.CylinderGeometry(0.003, 0.004, h, 3, 1, true); tallo.translate(0.015, h / 2, 0);
    const esp = new THREE.OctahedronGeometry(1, 0); esp.scale(0.016, 0.085, 0.012); esp.rotateZ(-0.25); esp.translate(0.04, h + 0.06, 0);
    const pinta = (g, hex) => { if (g.index) g = g.toNonIndexed(); const c = col(hex), a = new Float32Array(g.attributes.position.count * 3); for (let i = 0; i < a.length; i += 3) a.set([c.r, c.g, c.b], i); g.setAttribute('color', new THREE.BufferAttribute(a, 3)); g.deleteAttribute('uv'); return g; };
    return mergeGeometries([pinta(tallo, 0xc9a24e), pinta(esp, 0xe2ad4c)]);
  }
  // reparto de espigas por anillos alrededor del recorrido de la cámara
  const CENTRO = { x: 3, y: 4 }, MACRO = { x: 0, y: 1.6, r: 3.2 }, FINAL = { x: 10.4, y: 0.5, r: 3.4 }, CLARO = { x: 0.25, y: 0.55, r: 0.9 };
  function repartir(r0, r1, dens, semilla, c = CENTRO, excluir = null) {
    const rnd = aleatorio(semilla), n = Math.round(Math.PI * (r1 * r1 - r0 * r0) * dens * CALIDAD), pts = [], claro = [];
    for (let i = 0; i < n; i++) {
      const a = rnd() * Math.PI * 2, rr = Math.sqrt(r0 * r0 + rnd() * (r1 * r1 - r0 * r0));
      const x = c.x + Math.cos(a) * rr, y = c.y + Math.sin(a) * rr;
      if (!enCampo(x, y) || Math.abs(x - xCamino(y)) < ANCHO_CAMINO + 0.4) continue;
      if (excluir && Math.hypot(x - excluir.x, y - excluir.y) < excluir.r) continue;
      const p = { x, y, z: altura(x, y), giro: rnd() * Math.PI * 2, esc: 0.85 + 0.3 * rnd(), tipo: Math.floor(rnd() * 5) };
      (Math.hypot(x - CLARO.x, y - CLARO.y) < CLARO.r ? claro : pts).push(p);
    }
    return { pts, claro };
  }
  function instancias(geos, pts) {   // un InstancedMesh por variante de espiga
    const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3(), eje = new THREE.Vector3(0, 1, 0), grupo = new THREE.Group();
    geos.forEach((g, k) => {
      const mios = pts.filter((p) => p.tipo % geos.length === k); if (!mios.length) return;
      const im = new THREE.InstancedMesh(g, MAT_TRIGO, mios.length);
      mios.forEach((p, i) => { q.setFromAxisAngle(eje, p.giro); s.setScalar(p.esc); m4.compose(V3(p.x, p.y, p.z), q, s); im.setMatrixAt(i, m4); });
      im.frustumCulled = false; grupo.add(im);
    });
    scene.add(grupo); return grupo;
  }

  // ---------- cargar assets ----------
  const loader = new GLTFLoader();
  const [gTrigo, gArboles, gCamion] = await Promise.all(['trigo', 'arboles', 'camion'].map((n) => loader.loadAsync(url(`${n}.glb`))));
  const porNombre = (gltf, pref) => gltf.scene.children.filter((o) => o.name.startsWith(pref)).sort((a, b) => a.name.localeCompare(b.name));
  const GEO_DET = porNombre(gTrigo, 'Espiga_').map(aGeometria);
  const GEO_MIN = [1, 2, 3, 4].map(espigaMinima);
  const cerca = repartir(0, MACRO.r, 110, 1, MACRO), lejos = repartir(16, 60, 12, 3);
  const cercaFinal = repartir(0, FINAL.r, 90, 4, FINAL);          // primer plano del último encuadre (orilla del campo)
  const media = repartir(0, 16, 70, 2, CENTRO, MACRO); media.pts = media.pts.filter((p) => Math.hypot(p.x - FINAL.x, p.y - FINAL.y) > FINAL.r);
  instancias(GEO_DET, cercaFinal.pts);
  instancias(GEO_DET, cerca.pts); instancias(GEO_MIN, media.pts); instancias(GEO_MIN, lejos.pts);
  const rellenoClaro = instancias(GEO_DET, cerca.claro.concat(media.claro)); rellenoClaro.visible = false;   // aparece cuando la cámara ya subió
  // protagonistas del macro
  const protas = porNombre(gTrigo, 'Protagonista_').map((o, k) => {
    const info = res.protagonistas[k], m = new THREE.Mesh(aGeometria(o), MAT_TRIGO.clone());
    m.material.onBeforeCompile = MAT_TRIGO.onBeforeCompile;
    m.position.set(...info.pos); m.rotation.y = info.giro; m.userData.fase = k * 1.7; scene.add(m); return m;
  });
  // árboles y lomas del fondo
  {
    const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler();
    res.especies.forEach((nom, k) => {
      const nodo = gArboles.scene.getObjectByName('esp_' + nom) ?? gArboles.scene.children[k]; if (!nodo) return;
      const mios = res.arboles.filter((a) => a.especie === k);
      nodo.updateMatrixWorld(true);
      nodo.traverse((o) => {
        if (!o.isMesh) return;
        const g = o.geometry.clone(); g.applyMatrix4(o.matrixWorld.clone().premultiply(new THREE.Matrix4().copy(nodo.matrixWorld).invert()));
        // los colores de los árboles salían de nodos en Blender (no viajan en glTF): mismos tonos aquí
        const tono = { M_hoja: 0x6f8a46, M_pino: 0x55734a, M_tronco: 0x6b4a35 }[o.material.name.replace(/\.\d+$/, '')] ?? 0x6f8a46;
        const im = new THREE.InstancedMesh(g, new THREE.MeshLambertMaterial({ color: tono }), mios.length);
        mios.forEach((a, i) => { e.set(0, a.giro, 0); q.setFromEuler(e); m4.compose(new THREE.Vector3(...a.pos), q, new THREE.Vector3(...a.esc)); im.setMatrixAt(i, m4); });
        scene.add(im);
      });
    });
    const mLoma = new THREE.MeshLambertMaterial({ color: 0x8a8f45 });
    for (const l of res.lomas) { const s = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 16), mLoma); s.position.set(...l.pos); s.scale.set(...l.esc); scene.add(s); }
  }
  // camión, llantas y polvo
  const camion = gCamion.scene; scene.add(camion);
  camion.traverse((o) => { if (o.isMesh) { o.castShadow = true; } });
  const llantas = res.llantas.map((n) => camion.getObjectByName(n)).filter(Boolean);
  const polvoTex = (() => { const c = document.createElement('canvas'); c.width = c.height = 64; const x = c.getContext('2d'); const g = x.createRadialGradient(32, 32, 0, 32, 32, 32); g.addColorStop(0, 'rgba(214,170,120,0.9)'); g.addColorStop(1, 'rgba(214,170,120,0)'); x.fillStyle = g; x.fillRect(0, 0, 64, 64); return new THREE.CanvasTexture(c); })();
  const polvo = Array.from({ length: 18 }, (_, i) => { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: polvoTex, transparent: true, depthWrite: false, opacity: 0 })); s.userData.k = i; scene.add(s); return s; });

  // ---------- postproceso: desenfoque solo mientras dura el macro ----------
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bokeh = new BokehPass(scene, camera, { focus: 1, aperture: 0.02, maxblur: 0.016 });
  composer.addPass(bokeh); composer.addPass(new OutputPass());

  // ---------- tamaño: el del contenedor ----------
  function redimensionar() {
    const w = Math.max(raiz.clientWidth, 1), h = Math.max(raiz.clientHeight, 1);
    camera.aspect = w / h; renderer.setSize(w, h, false); composer.setSize(w, h);
  }
  const ro = new ResizeObserver(redimensionar); ro.observe(raiz); redimensionar();

  // ---------- animación: el avance marca el segundo; se persigue con inercia ----------
  const F = res.cuadros, N = F.length, DURACION = N / res.fps;
  function cuadro(t) {   // interpolación entre cuadros exportados
    const f = Math.min(Math.max(t * res.fps, 0), N - 1.001), i = Math.floor(f), u = f - i, a = F[i], b = F[i + 1];
    return { c: lerp3(a.c, b.c, u), m: lerp3(a.m, b.m, u), lente: lerp(a.lente, b.lente, u), f: lerp(a.f, b.f, u),
             camion: lerp3(a.camion, b.camion, u), yaw: lerp(a.yaw, b.yaw, u), llanta: lerp(a.llanta, b.llanta, u), polvo: lerp(a.polvo, b.polvo, u) };
  }
  const limitar = (t) => Math.min(Math.max(t, 0), DURACION);
  let objetivo = limitar((opciones.avance ?? 0) * DURACION), actual = objetivo, antes = performance.now(), saltar = false;
  const panel = raiz.querySelector('.depurar'); if (opciones.depurar && panel) panel.hidden = false;
  let fpsN = 0, fpsT = performance.now();
  const tmp = new THREE.Vector3(), atras = new THREE.Vector3();
  function dibujar(ahora) {
    const dt = Math.min((ahora - antes) / 1000, 0.1); antes = ahora;
    actual = saltar || inercia === 0 ? objetivo : actual + (objetivo - actual) * (1 - Math.exp(-dt / inercia));
    saltar = false;
    const t = actual;
    if (!quieto) uTiempo.value = ahora / 1000;
    const k = cuadro(t);
    camera.position.set(...k.c); camera.lookAt(...k.m);
    const hfov = 2 * Math.atan(18 / k.lente); camera.fov = THREE.MathUtils.radToDeg(2 * Math.atan(Math.tan(hfov / 2) / camera.aspect)); camera.updateProjectionMatrix();
    camera.updateMatrixWorld(); uSolVista.value.copy(SOL).transformDirection(camera.matrixWorldInverse);
    rellenoClaro.visible = t * res.fps > 90;
    // desenfoque: fuerte en el macro (f/3.2), se apaga al abrir el plano
    bokeh.enabled = k.f < 3.6;
    bokeh.uniforms.focus.value = tmp.set(...k.m).distanceTo(camera.position); bokeh.uniforms.aperture.value = 0.07 / k.f;
    for (const p of protas) { p.rotation.x = Math.sin(uTiempo.value * 1.3 + p.userData.fase) * 0.035; p.rotation.z = Math.cos(uTiempo.value * 1.1 + p.userData.fase) * 0.03; }
    camion.position.set(...k.camion); camion.rotation.y = k.yaw;
    for (const l of llantas) l.rotation.z = -k.llanta;
    atras.set(-Math.cos(k.yaw), 0, Math.sin(k.yaw));
    for (const s of polvo) {
      const u = ((uTiempo.value * 0.6 + s.userData.k / polvo.length) % 1);
      s.position.set(...k.camion).addScaledVector(atras, 2.2 + u * 6).add(tmp.set(Math.sin(s.userData.k * 12.9) * 0.9 * u, 0.4 + u * 1.4, Math.cos(s.userData.k * 7.1) * 0.9 * u));
      s.scale.setScalar(0.8 + u * 3.5); s.material.opacity = k.polvo * (1 - u) * 0.9;
    }
    sol.target.position.set(...k.camion); sol.position.copy(sol.target.position).addScaledVector(SOL, 120);
    renderer.info.reset(); composer.render();   // el conteo suma todas las pasadas del cuadro
    if (opciones.depurar && panel) { fpsN++; if (ahora - fpsT > 1000) { panel.textContent = `${fpsN} fps · ${renderer.info.render.triangles.toLocaleString()} tri · t ${t.toFixed(2)} s`; fpsN = 0; fpsT = ahora; } }
  }

  // ---------- bucle: corre solo si está en pantalla, con la pestaña visible y sin pausa externa ----------
  let raf = 0, visible = true, pausado = false;
  const debeCorrer = () => visible && !pausado && !document.hidden;
  function bucle(ahora) { dibujar(ahora); raf = requestAnimationFrame(bucle); }
  function actualizar() {
    if (debeCorrer() && !raf) { antes = performance.now(); raf = requestAnimationFrame(bucle); }
    else if (!debeCorrer() && raf) { cancelAnimationFrame(raf); raf = 0; }
  }
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; actualizar(); }, { threshold: 0 });
  io.observe(raiz);
  document.addEventListener('visibilitychange', actualizar);
  dibujar(performance.now());   // primer cuadro ya en su lugar, antes de quitar el cargador
  raiz.querySelector('.cargando')?.classList.add('listo');
  actualizar();

  return {
    duracion: DURACION,
    /** Avance de 0 (espiga) a 1 (camión en la terracería). */
    fijarAvance(p) { objetivo = limitar(p * DURACION); },
    /** Lo mismo en segundos de la animación original (0..duracion). Salta sin inercia. */
    fijarSegundo(t) { objetivo = limitar(t); saltar = true; if (!raf) dibujar(performance.now()); },
    get avance() { return actual / DURACION; },
    /** Para cuando la escena queda tapada por otra (por ejemplo, en un fundido entre escenas). */
    pausar() { pausado = true; actualizar(); },
    reanudar() { pausado = false; actualizar(); },
    destruir() {
      cancelAnimationFrame(raf); raf = 0; io.disconnect(); ro.disconnect();
      document.removeEventListener('visibilitychange', actualizar);
      scene.traverse((o) => {
        o.geometry?.dispose();
        for (const m of [].concat(o.material ?? [])) { m.map?.dispose(); m.dispose(); }
      });
      polvoTex.dispose(); composer.passes.forEach((p) => p.dispose?.()); renderer.dispose();
    },
  };
}
