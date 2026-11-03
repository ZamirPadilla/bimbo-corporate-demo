const brands = [
  "Bimbo",
  "Marinela",
  "Tía Rosa",
  "Barcel",
  "Ricolino",
  "Oroweat",
  "Sara Lee",
  "Thomas'",
  "Entenmann's",
  "Arnold",
  "Pullman",
  "Rainbo",
];

export default function Brands() {
  return (
    <section id="marcas" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-bimbo-red">
              Marcas globales
            </p>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-bimbo-dark">
              Marcas que acompañan a tu familia
            </h2>
          </div>
          <a
            href="#"
            className="text-bimbo-red font-medium hover:underline whitespace-nowrap"
          >
            Ver todas →
          </a>
        </div>
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {brands.map((brand) => (
            <div
              key={brand}
              className="aspect-square flex items-center justify-center rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-bimbo-cream hover:to-white transition-colors border border-gray-100 group"
            >
              <span className="text-sm md:text-base font-bold text-gray-700 group-hover:text-bimbo-red transition-colors">
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
