# «Del campo a tu mesa»: la animación general

Una sola animación de scroll une las cuatro piezas 3D:

| Tramo | Avance | Qué se ve |
|---|---|---|
| 1 · Campo | 0 – 0.22 | Espiga a contraluz → parcela → el camión de los 40 en la terracería |
| 2 · Camiones | 0.20 – 0.50 | El camión cambia de época en cada arco (40 → 70 → 80 → 90 → 2025) mientras la carretera pasa de trigal a casas y a ciudad; la luz pasa de amanecer a día |
| 3 · Planta | 0.48 – 0.78 | El 2025 llega y se estaciona; después sale el tractocamión, la cámara lo sigue a la calle y sube en vertical hasta ver la zona desde arriba |
| 4 · Planeta | 0.76 – 1 | Zoom out desde la planta (Ciudad de México) al globo. Los 39 países con operación directa se encienden por región, y a cada uno llega un arco desde México que se borra al llegar |

**Todavía no lleva textos:** van cuando el flujo esté aprobado. Se ve en
`/animaciones/del-campo-a-tu-mesa/index.html`. Con `?p=0.49` se congela en ese avance y con `?debug` se muestran
el avance, el tramo y los fps.

## Las piezas originales no se tocan
Todo vive en `public/animaciones/del-campo-a-tu-mesa/`, que es una copia. Las páginas originales siguen intactas
como respaldo, cada una en su rama:

| Pieza | Original (respaldo) | Copia de la fusión |
|---|---|---|
| Campo | `public/animaciones/campo-trigo/` (PR #14) | `campo/` sin cambios: `campo3d.js` ya traía `fijarAvance` |
| Camiones | `public/prototipos/camiones/` (PR #13) | `camiones/main.js` sin cambios, más el módulo nuevo `camiones/camiones3d.js` |
| Planta | `public/animaciones/planta-llegada/` (PR #12) | `planta/planta3d.js` sin cambios, más el módulo nuevo `planta/planta-fusion.js` |
| Planeta | `public/animaciones/planeta/` (PR #14) | `planeta/main.js` sin cambios, más el módulo nuevo `planeta/planeta-fusion.js` y `assets/paises.json` |

El primer commit de la rama es la copia sin cambios. Para ver qué cambió la fusión:
`git diff <ese commit> -- public/animaciones/del-campo-a-tu-mesa`.

## Cómo funciona
- **`director.js`:** lee el scroll de una pista de `1600vh` y le aplica una sola inercia de 0.25 s, para que todas
  las escenas vayan juntas. Reparte el avance entre los tramos.
  - En los traslapes funde las dos escenas con la opacidad de su contenedor.
  - Pausa las escenas que no se ven.
- **Contrato de cada escena:** `fijarAvance(p)`, `pausar()`, `reanudar()` y `destruir()`. El director no sabe qué
  hay dentro de ninguna.
- **Cortes que casan:** en cada traslape las dos escenas muestran el mismo camión del mismo tamaño y en el mismo
  lugar de la pantalla.
  - **Campo → camiones:** el tramo de camiones arranca con la cámara del último cuadro del campo (`ENTRADA` en
    `camiones3d.js`) y en el primer 16 % gira alrededor del camión hasta el 3/4 frontal de siempre.
  - **Camiones → planta:** la planta arranca con ese mismo 3/4 frontal pegado al 2025. Lo escala al largo que el
    2025 tiene en la planta y aplica la misma regla de teléfono vertical. Después se suelta hacia la cámara del
    `.blend`.
  - **Planta → planeta:** la planta termina viendo la zona desde arriba con el norte hacia arriba. El planeta empieza
    muy cerca sobre la Ciudad de México, con el mismo norte.
- **Planta en secuencia:** cada vehículo del `.glb` tiene su propio clip.
  - `planta-fusion.js` le da a cada clip su propio reloj: primero el 2025 (0 → 19.4 s) y después el tractocamión
    (0 → 20 s).
  - No hace falta volver a exportar desde Blender.
- **Países:** los toma de `planeta/assets/paises.json`.
  - Son los 39 de `paisesOperacion`, con los centroides de la rama del globo (PR #11).
  - Se encienden por región en `OLEADAS` (México, Norteamérica, Latinoamérica y Europa, Asia y África).
  - Europa, Asia y África van de oeste a este, conforme el giro del globo las trae al frente.

## Qué ajustar y dónde
| Para cambiar… | Archivo y constante |
|---|---|
| Lo largo de cada tramo o del recorrido completo | `director.js` → `TRAMOS`; `index.html` → `#pista` |
| Dónde empieza la ciudad, densidad de casas y edificios | `camiones3d.js` → `ZONA` |
| Colores del amanecer al día | `camiones3d.js` → `LUZ` |
| Momentos de la planta (llegada, salida, subida) | `planta-fusion.js` → `FASES` |
| Recorrido de la cámara sobre el globo | `planeta-fusion.js` → `RUTA` |
| Cuándo se enciende cada región y cuánto duran los arcos | `planeta-fusion.js` → `OLEADAS`, `VIAJE_ARCO`, `VIDA_ARCO` |

## Probado
- **Escritorio (1440×900):** 120 fps; se revisó cada corte cuadro por cuadro.
- **Teléfono vertical (375×812) emulado:** con scroll real.
- **Consola:** sin errores.
- **Teléfono real:** falta probar. Hay cuatro contextos WebGL a la vez.
- **Movimiento reducido:** el director no funde ni usa inercia y corta directo entre escenas; el campo se queda sin
  viento.

## Pendiente
- **Textos:** van cuando se apruebe el flujo.
- **Regla de los camiones** (la misma de los PR #12, #13 y #14): los modelos salen de fotos de camioncitos de
  juguete.
- **Sección nueva:** según `CLAUDE.md`, va primero en un issue.
