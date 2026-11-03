# Sistema visual de referencia

Sirve como punto de partida. Para otro cliente se conserva la estructura (jerarquía, ritmo, medidas) y se
cambian el acento, el logo y, si su marca lo pide, el modo claro u oscuro.

## Color (sitio de referencia)
| Rol | Valor | Uso |
|---|---|---|
| Tinta | `#171726` | Fondo principal oscuro, texto sobre claro |
| Papel | `#F4F5F5` | Texto sobre oscuro, fondos claros |
| Acento | `#9AA6FF` | Rótulos mono, líneas de plano, punto activo, barra de progreso |
| Acento profundo | `#5763BF` | Estado activo sobre fondo claro |
| Niebla | `#ADB3B5` / `#838889` | Texto secundario sobre oscuro |
| Pizarra | `#474B60` | Texto secundario sobre claro |
| Negro deporte | `#0B0B0C` | Página de Deporte (cada página puede tener su fondo) |
| Categorías | `#7CC6F2` logística · `#FFB23F` energía · `#E2A673` destinos · `#F0384B` deporte | Leyenda del mapa, etiquetas |

Regla: los planos se dibujan en el color de línea de la página (acento sobre tinta; blanco sobre negro). Si
el fondo de la página cambia, se recolorea la imagen del plano (ver `media-web-ligera`, `recolorear.py`) y
se cambia el color de etapas, barra y línea de escaneo para que no queden morados sueltos.

## Tipografía
- Geist 300–600 para titulares y texto; Geist Mono 400–500 para rótulos; Michroma solo en el logotipo.
- Titular de sección: `400 clamp(30px, min(3.6vw, 6vh), 56px)/1.04`, `letter-spacing: -.045em`, `text-wrap: balance`.
- Rótulo ("kicker"): `500 12px/1 'Geist Mono'`, `letter-spacing: .16em`, mayúsculas, color niebla o acento.
- Texto: `400 clamp(15px, 2.2vh, 17px)/1.55`, ancho máximo ~460–560 px, `text-wrap: pretty`.

## Medidas y composición
- Margen lateral de sección: `clamp(20px, 4vw, 56px)`; el contenido llega a sangre cuando es imagen.
- Tarjetas: radio 28 px, padding `clamp(24px, 3vw, 44px)`; botones de píldora (radio 999 px).
- Animaciones: `cubic-bezier(.16, 1, .3, 1)` 0.8–1.2 s; entradas escalonadas de 0.12–0.2 s.
- Secciones ligadas al scroll: alto de 300–440 vh con contenedor `sticky` de 100 vh; el avance `p ∈ [0, 1]`
  se calcula en el manejador de scroll de la página.
- Respetar `prefers-reduced-motion`: sin temporizadores ni pulsos, estado final directo.

## Teléfono
- Rejillas a una columna; textos que se enciman se ocultan (no se achican hasta lo ilegible).
- Mapas y planos sin etiquetas flotantes; la información va en una línea fija.
- Videos con versión vertical recortada y más ligera.
