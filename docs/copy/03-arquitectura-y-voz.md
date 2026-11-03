# Arquitectura del sitio y guía de voz

> Propuesta. Las decisiones de cifras, dirección, regiones y Nutrición están en [05-decisiones.md](05-decisiones.md).

## Quién llega y a qué

| Audiencia | Pregunta con la que llega | Página dueña | Acción principal |
|---|---|---|---|
| Consumidor | ¿Qué marcas son de Bimbo? ¿Dónde me quejo de un producto? | Marcas · Contacto | Encontrar la marca y su sitio, o escribir a atención a consumidores |
| Inversionista | ¿Cómo va el negocio? ¿Dónde está el último reporte? | Inversionistas | Descargar el reporte trimestral más reciente |
| Candidato | ¿Hay vacantes para mí? ¿Cómo es trabajar ahí? | Carreras | Ir a la bolsa de trabajo de su país |
| Proveedor | ¿Cómo me registro? ¿Cómo denuncio una falta ética? | Contacto › Proveedores | Ir al portal de proveedores o a Comenta |
| Periodista | ¿Qué anunció Bimbo hoy? ¿Con quién hablo? | Prensa | Leer el comunicado o descargar el kit de medios |
| Comunidad y ONG | ¿Qué hace Bimbo por el planeta y la gente? | Sustentabilidad | Leer el avance de una meta y descargar el reporte |

La Home atiende a las seis audiencias en el primer pantallazo y deja que cada una siga su camino.

## Mapa del sitio

```
Inicio
├── Nosotros
│   ├── Quiénes somos            filosofía, misión, propósito, creencias (en texto)
│   ├── Historia                 por eras, de 1945 a hoy
│   ├── Fundadores
│   ├── Liderazgo                Director General y Comité Directivo
│   └── Reconocimientos          del más reciente al más antiguo
├── Marcas
│   ├── Directorio               filtro por país, región y categoría
│   └── País                     una plantilla para los 39 países
├── Sustentabilidad              estrategia «Alimentamos un mundo mejor»
│   ├── Para Ti                  incluye la actual página de Nutrición
│   ├── Para la Vida
│   ├── Para la Naturaleza
│   ├── Cimientos
│   └── Reportes y descargas
├── Inversionistas               (estructura actual; cambia el copy, no la navegación)
├── Prensa
│   ├── Comunicados
│   ├── Noticias
│   └── Kit de medios y contacto de prensa
├── Carreras                     antes «Únete a nuestro equipo»
└── Contacto                     distribuidor por audiencia, Comenta y aviso de fraude

Utilidades: Proveedores · Bimbo Ventures · BIDA (asistente) · ES / EN
```

### Cambios respecto al sitio actual

| Antes | Ahora | Por qué |
|---|---|---|
| Nutrición como página suelta | Dentro de Sustentabilidad › Para Ti | Un tema, una casa (revisión §4) |
| «Contacto» abre un correo | Página Contacto con una ruta por audiencia | Hoy no hay forma de saber a quién escribir |
| Comenta como botón destacado del pie | Dentro de Contacto, explicado como línea ética | Evita que lo usen para quejas de producto |
| Regiones con Colombia, Ecuador y Venezuela en «Centroamérica» | Norteamérica, México, Latinoamérica y EAA, como en el Informe Anual 2025 | Geografía correcta (revisión §3) |
| Marcas sin directorio | Directorio filtrable | Hoy no se puede encontrar una marca concreta |
| Cultura en una imagen | Quiénes somos en texto | Identidad legible por personas y buscadores |

## Guía de voz

**Tres rasgos:**

1. **Cálida, no empalagosa.** Bimbo nació en una panadería familiar. Hablamos en primera persona del plural («horneamos», «llevamos») y de personas, no de «consumidores objetivo».
2. **Concreta.** Cada afirmación lleva su dato, y cada dato sale de `content/cifras.ts`. Nada de «líder indiscutible» sin un número detrás.
3. **Breve.** Una idea por párrafo. Un titular de 4 a 9 palabras.

**Reglas de estilo**

| Usamos | Evitamos |
|---|---|
| sustentabilidad | sostenibilidad (no es el término de la marca) |
| Alimentamos un mundo mejor | Alimentar a un mundo mejor · Nutriendo un mundo mejor |
| operamos en 39 países · nuestros productos llegan a [N] | presencia en 39 / más de 39 países (ambiguo) |
| colaboradores | empleados, staff |
| Para Ti, Para la Vida, Para la Naturaleza (con mayúscula inicial, como nombres de pilar) | PARA TI en mayúsculas en el texto |
| Llamadas a la acción con verbo y destino: «Descarga el reporte 3T26» | «Ver más», «Leer más», «Conócelas» |
| Mayúsculas por diseño (CSS) | Texto escrito en mayúsculas |
| Español de México; términos en inglés solo si son nombre propio (Bimbo Ventures) | startup, frontline, racionales |

**Marcadores en el copy:** `[por confirmar]` en cifras sin fuente única; `[cita de muestra]` en textos atribuidos a personas; `[enlace pendiente]` cuando no conocemos la URL definitiva. En los wireframes aparecen resaltados.
