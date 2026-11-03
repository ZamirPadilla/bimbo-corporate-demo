# Planeta Ventures — fuentes y licencias

Escena: `planeta_ventures.blend` (Blender 5.2, EEVEE). Recursos empaquetados dentro del .blend.

| Recurso | Fuente | Licencia |
|---|---|---|
| Contornos de continentes (`fuentes/ne_50m_land.geojson`) | Natural Earth 1:50m Land | Dominio público |
| Palm Tree | Quaternius — https://poly.pizza/m/A6cKJYFsIb | CC0 |
| Palm Tree | Quaternius — https://poly.pizza/m/nr1B5DbICA | CC0 |
| Pine | Quaternius — https://poly.pizza/m/79gmlLnweB | CC0 |
| Pine | Quaternius — https://poly.pizza/m/igSu0cPoBz | CC0 |
| Bush | Quaternius — https://poly.pizza/m/EoTERLq3z2 | CC0 |
| Tree | Quaternius — https://poly.pizza/m/qZtx0AHhcy | CC0 |
| Tree | Quaternius — https://poly.pizza/m/aVOxaHRPWe | CC0 |
| Tree | Quaternius — https://poly.pizza/m/QVOop92WmG | CC0 |
| Twisted Tree | Quaternius — https://poly.pizza/m/8oraKn9m0x | CC0 |
| Pine | Quaternius — https://poly.pizza/m/699sFuLCN2 | CC0 |
| Fern | Quaternius — https://poly.pizza/m/jqcanvH7D6 | CC0 |
| Yucca Plant | Isa Lousberg — https://poly.pizza/m/rR6S0uzgYa | CC0 |

CC0 no exige atribución; se deja registro para rastrear el origen.

## Partes de la escena

- **Planeta**: esfera UV de radio 10 m; `M_planeta` lee `texturas/mascara_tierra.png`
  (R = tierra suavizada, G = halo de costa, B = distancia a la costa / 0.6 m) y pinta
  océano, costa y tierra.
- **Vegetación**: tres modificadores con el mismo grupo `GN_capa`, uno por capa de
  `Vegetacion_fuente`, imitando el video de Bimbo:
  - `Veg_conifera` (pinos y árbol común): densidad media, forma el bosque; nace primero.
  - `Veg_emblema` (palmeras y árboles redondos/torcidos): pocos y grandes, repartidos
    también en tierras lejanas; nace a los ~0.25 s.
  - `Veg_piso` (helecho, yuca, arbusto): denso y bajo; rellena el suelo al final.
  Cada capa reparte solo sobre la malla del planeta (no sobre las capas anteriores), con
  claros por ruido. Cada planta se encoge hasta que su copa (`Radio copa` × escala) cabe
  antes de la costa; si queda muy chica se elimina, así ninguna toca el agua.
  Crecimiento: cada planta nace en `Inicio + Propagación × (0.75·distancia al Origen +
  0.25·azar)` y escala de 0 a 1 en `Crecer` cuadros con un pequeño rebote (ease-out-back).
- **Nubes**: metaballs en la colección `Nubes`, hijas de `Nubes_pivote`.
- **Luz**: sol con ángulo de 7°; el mundo da el color exacto del fondo a la cámara
  (`Fondo_camara`, #e3e9f1) y una luz ambiental más fría y tenue (`Luz_ambiente`).
- **Animación**: 250 cuadros a 25 fps (10 s). El planeta gira −30°, las nubes −44° y la
  cámara se acerca con suavizado. El bosque crece en los primeros ~1.8 s; el video
  reinicia con el planeta vacío, igual que el de Bimbo (sin fundido).
