const values = [
  {
    title: "Pasión",
    description:
      "Somos un equipo apasionado por lo que hacemos y buscamos la excelencia en cada producto.",
    icon: "♥",
  },
  {
    title: "Confianza",
    description:
      "Construimos relaciones duraderas basadas en la honestidad y la transparencia.",
    icon: "🤝",
  },
  {
    title: "Rentabilidad",
    description:
      "Generamos valor sostenible para nuestros colaboradores, consumidores y accionistas.",
    icon: "📈",
  },
  {
    title: "Trabajo en equipo",
    description:
      "Juntos somos más fuertes. Colaboramos sin fronteras ni jerarquías.",
    icon: "👥",
  },
];

export default function Values() {
  return (
    <section id="nosotros" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-bimbo-red">
            Nuestros valores
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-bimbo-dark">
            Lo que nos define
          </h2>
          <p className="mt-4 text-gray-600">
            Más de 75 años construyendo una empresa altamente productiva y
            plenamente humana.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v) => (
            <div
              key={v.title}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow border border-gray-100"
            >
              <div className="text-3xl mb-4">{v.icon}</div>
              <h3 className="text-lg font-semibold text-bimbo-dark">
                {v.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                {v.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
