export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-bimbo-cream via-white to-white" />
      <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-bimbo-red">
            Nutriendo un mundo mejor
          </p>
          <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight text-bimbo-dark leading-tight">
            Alimentamos a{" "}
            <span className="text-bimbo-red">millones de familias</span> cada
            día.
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-xl">
            Grupo Bimbo es la empresa de panificación más grande del mundo, con
            presencia en más de 30 países y más de 100 marcas reconocidas.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#marcas"
              className="inline-flex items-center rounded-full bg-bimbo-red text-white font-medium px-6 py-3 hover:bg-red-700 transition-colors"
            >
              Conoce nuestras marcas
            </a>
            <a
              href="#sostenibilidad"
              className="inline-flex items-center rounded-full border border-gray-300 text-bimbo-dark font-medium px-6 py-3 hover:border-bimbo-red hover:text-bimbo-red transition-colors"
            >
              Nuestro compromiso
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-square rounded-3xl bg-gradient-to-br from-bimbo-red to-red-700 shadow-2xl p-10 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="text-7xl md:text-8xl font-black">+30</div>
              <div className="mt-2 text-xl font-medium opacity-90">países</div>
              <div className="mt-8 grid grid-cols-2 gap-6 text-left">
                <div>
                  <div className="text-3xl font-bold">+100</div>
                  <div className="text-sm opacity-90">marcas</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">+140K</div>
                  <div className="text-sm opacity-90">colaboradores</div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-bimbo-blue rounded-full opacity-20 blur-2xl" />
          <div className="absolute -top-4 -right-4 w-32 h-32 bg-bimbo-red rounded-full opacity-20 blur-2xl" />
        </div>
      </div>
    </section>
  );
}
