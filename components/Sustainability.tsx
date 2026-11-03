const pillars = [
  {
    title: "Bienestar",
    body: "Promovemos opciones nutritivas y hábitos de vida saludables en cada comunidad donde operamos.",
    metric: "100%",
    metricLabel: "productos reformulados hacia perfiles más saludables para 2030",
  },
  {
    title: "Planeta",
    body: "Reducimos nuestra huella operando con energía renovable y empaques circulares.",
    metric: "0",
    metricLabel: "residuos a vertedero en nuestras plantas",
  },
  {
    title: "Comunidad",
    body: "Impactamos positivamente a las comunidades a través de educación, voluntariado y programas sociales.",
    metric: "+1M",
    metricLabel: "personas beneficiadas por nuestros programas",
  },
];

export default function Sustainability() {
  return (
    <section id="sostenibilidad" className="py-24 bg-bimbo-dark text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-red-400">
            Sembrando un futuro mejor
          </p>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold">
            Compromiso con el planeta y las personas
          </h2>
          <p className="mt-4 text-gray-300">
            Nuestra estrategia de sostenibilidad abarca bienestar, planeta y
            comunidad. Trabajamos cada día para hacer realidad una visión
            compartida.
          </p>
        </div>
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="relative bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors"
            >
              <h3 className="text-xl font-bold">{p.title}</h3>
              <p className="mt-3 text-gray-300 text-sm leading-relaxed">
                {p.body}
              </p>
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="text-4xl font-black text-red-400">
                  {p.metric}
                </div>
                <div className="mt-1 text-xs text-gray-400">
                  {p.metricLabel}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
