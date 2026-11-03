// Los árboles del campo (campo/assets/arboles.glb, con los tonos de campo3d.js) para cualquier escena de la fusión,
// para que el campo, la carretera y la planta tengan el mismo tipo de árbol.
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const TONO = { M_hoja: 0x6f8a46, M_pino: 0x55734a, M_tronco: 0x6b4a35 };
const URL_ARBOLES = new URL('./campo/assets/arboles.glb?v=1', import.meta.url).href;

/**
 * Siembra árboles instanciados en `padre`.
 * @param {THREE.Object3D} padre
 * @param {Array<[number, number, number]>} sitios  [x, z, alto en metros]; el árbol se apoya en y = 0
 * @param {{ url?: string, sombra?: boolean }} [opciones]
 */
export async function plantarArboles(padre, sitios, opciones = {}) {
  const g = await new GLTFLoader().loadAsync(opciones.url ?? URL_ARBOLES);
  const especies = g.scene.children.filter((o) => o.name.startsWith('esp_'));
  if (!especies.length || !sitios.length) return;
  g.scene.updateMatrixWorld(true);
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), s = new THREE.Vector3();
  especies.forEach((nodo, k) => {
    const mios = sitios.filter((_, i) => i % especies.length === k);
    if (!mios.length) return;
    const alto = new THREE.Box3().setFromObject(nodo).getSize(new THREE.Vector3()).y || 1;
    const inv = new THREE.Matrix4().copy(nodo.matrixWorld).invert();
    nodo.traverse((o) => {
      if (!o.isMesh) return;
      const geo = o.geometry.clone(); geo.applyMatrix4(o.matrixWorld.clone().premultiply(inv));
      const tono = TONO[o.material.name.replace(/\.\d+$/, '')] ?? TONO.M_hoja;
      const im = new THREE.InstancedMesh(geo, new THREE.MeshStandardMaterial({ color: tono, roughness: 0.9 }), mios.length);
      mios.forEach(([x, z, h], i) => {
        const r = Math.abs(Math.sin(x * 12.9 + z * 78.2) * 43758) % 1;     // variación fija por sitio
        e.set(0, r * 6.28, 0); q.setFromEuler(e); s.setScalar(h * (0.85 + 0.3 * r) / alto);
        m4.compose(new THREE.Vector3(x, 0, z), q, s); im.setMatrixAt(i, m4);
      });
      im.castShadow = opciones.sombra ?? true; im.receiveShadow = true; padre.add(im);
    });
  });
}
