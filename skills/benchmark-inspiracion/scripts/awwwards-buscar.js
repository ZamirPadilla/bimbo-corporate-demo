// Pegar en la consola de una pestaña de https://www.awwwards.com (o enviar con javascript_tool).
// Paso 1: define los términos y corre BUSCAR(); Paso 2: consulta AVANCE() con llamadas cortas;
// Paso 3: copia JSON.stringify(window.__rows) y guárdalo como awwwards.json en el proyecto.
// Ritmo amable: ~1 petición por segundo. Lee solo páginas públicas de listados y fichas.

window.TERMINOS = window.TERMINOS || ['bread', 'bakery', 'flour', 'grain', 'snack', 'food company', 'manufacturer'];
window.CATEGORIAS = window.CATEGORIAS || ['/websites/food-drink/'];

window.BUSCAR = async function () {
  const slugs = new Set();
  const listar = async (url) => {
    const h = await (await fetch(url)).text();
    const d = new DOMParser().parseFromString(h, 'text/html');
    [...d.querySelectorAll('a[href*="/sites/"]')].forEach(a => slugs.add(a.getAttribute('href')));
    await new Promise(r => setTimeout(r, 1000));
  };
  for (const c of window.CATEGORIAS) await listar(c);
  for (const t of window.TERMINOS) await listar('/websites/?text=' + encodeURIComponent(t));
  window.__all = [...slugs];
  window.__det = window.__det || {};
  // Lectura de fichas en segundo plano (no esperar: las herramientas cortan a los 45 s).
  (async () => {
    for (const p of window.__all) {
      if (window.__det[p]) continue;
      try {
        const h = await (await fetch(p)).text();
        const d = new DOMParser().parseFromString(h, 'text/html');
        const titulo = d.title.replace(' - Awwwards', '');
        window.__det[p] = {
          slug: p.replace('/sites/', ''),
          titulo,
          premio: (titulo.match(/(SOTD|Honorable Mention|Developer Award|Site of the Month|Site of the Year|Nominee)$/) || [''])[0],
          fecha: (h.match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* \d{1,2}, 20\d\d/) || [])[0],
          visitar: [...d.querySelectorAll('a')].filter(a => /visit/i.test(a.innerText)).map(a => a.href)[0],
          descripcion: (d.querySelector('meta[name=description]')?.content || '').slice(0, 200),
          imagen: d.querySelector('meta[property="og:image"]')?.content,
        };
      } catch (e) { window.__det[p] = { error: String(e) }; }
      await new Promise(r => setTimeout(r, 1000));
    }
    window.__rows = Object.values(window.__det);
    window.__fin = true;
  })();
  return `${window.__all.length} fichas por leer`;
};

window.AVANCE = () => ({ fin: !!window.__fin, leidas: Object.keys(window.__det || {}).length, total: (window.__all || []).length });

// Filtro sugerido al terminar: premiados o recientes.
window.FILTRAR = (meses = 18) => {
  const limite = Date.now() - meses * 30.4 * 864e5;
  return (window.__rows || []).filter(r => /SOTD|Honorable|Developer|Month|Year/.test(r.premio) || (r.fecha && Date.parse(r.fecha) > limite));
};
