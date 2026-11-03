// Material del planeta calculado en el shader: la costa sale de un campo de distancia (costa_sdf.png) y se dibuja
// nítida a cualquier zoom; agua con halo claro junto a la costa; tierra con ruido 3D en varias escalas (sin JPEG).
import * as THREE from 'three';

const RANGO = 0.6;   // el PNG codifica ± 0.6 unidades (ver costa_sdf.py)

export function materialPlaneta(sdf, renderer, { paises = null } = {}) {
  sdf.flipY = false; sdf.colorSpace = THREE.NoColorSpace;
  sdf.anisotropy = renderer.capabilities.getMaxAnisotropy();
  if (paises) { paises.flipY = false; paises.colorSpace = THREE.NoColorSpace; }
  const u = {
    uRango: { value: RANGO },
    uMarProfundo: { value: new THREE.Color('#4f9fcc') }, uMarClaro: { value: new THREE.Color('#8fcbe3') },
    uTierraA: { value: new THREE.Color('#7d9455') }, uTierraB: { value: new THREE.Color('#98aa69') },
    uArena: { value: new THREE.Color('#c9cf94') },
    uPaises: { value: paises }, uPresencia: { value: 0 }, uTinte: { value: new THREE.Color('#f2c14e') },
  };
  const mat = new THREE.MeshStandardMaterial({ map: sdf, roughness: 0.85, metalness: 0 });
  mat.onBeforeCompile = (sh) => {
    Object.assign(sh.uniforms, u);
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vPosObj;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvPosObj = position;');
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', `#include <common>
        varying vec3 vPosObj;
        uniform float uRango, uPresencia; uniform vec3 uMarProfundo, uMarClaro, uTierraA, uTierraB, uArena, uTinte;
        ${paises ? 'uniform sampler2D uPaises;' : ''}
        float hash3(vec3 p) { p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
        float ruido(vec3 x) {
          vec3 i = floor(x), f = fract(x); f = f * f * (3.0 - 2.0 * f);
          return mix(mix(mix(hash3(i), hash3(i + vec3(1,0,0)), f.x), mix(hash3(i + vec3(0,1,0)), hash3(i + vec3(1,1,0)), f.x), f.y),
                     mix(mix(hash3(i + vec3(0,0,1)), hash3(i + vec3(1,0,1)), f.x), mix(hash3(i + vec3(0,1,1)), hash3(i + vec3(1,1,1)), f.x), f.y), f.z);
        }
        float tierraF;`)
      .replace('#include <map_fragment>', `
        float d = (texture2D(map, vMapUv).r - 0.5) * 2.0 * uRango;          // + tierra, − agua (unidades)
        float w = fwidth(d) * 0.8 + 1e-4;
        tierraF = smoothstep(-w, w, d);
        float h = smoothstep(-0.42, 0.0, d);
        vec3 agua = mix(uMarProfundo, uMarClaro, pow(h, 1.6));
        vec3 p = normalize(vPosObj) * 10.0;
        float n = ruido(p * 0.35) * 0.6 + ruido(p * 1.1) * 0.3 + ruido(p * 4.0) * 0.1;
        vec3 suelo = mix(uTierraA, uTierraB, smoothstep(0.3, 0.7, n));
        suelo *= 0.965 + 0.07 * ruido(p * 26.0);                            // grano fino para los acercamientos
        suelo = mix(suelo, uArena, (1.0 - smoothstep(0.0, 0.035, d)) * 0.45);  // hilo de arena en la orilla
        ${paises ? 'suelo = mix(suelo, mix(suelo, uTinte, 0.75), texture2D(uPaises, vMapUv).r * uPresencia);' : ''}
        diffuseColor.rgb = mix(agua, suelo, tierraF);`)
      .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
        roughnessFactor = mix(0.68, 0.88, tierraF);                        // el mar brilla apenas con el sol (más bajo deja manchas)`);
  };
  return { material: mat, uniformes: u };
}
