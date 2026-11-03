import Nav from "@/components/home/Nav";
import Hero from "@/components/home/Hero";
import CintaCifras from "@/components/home/CintaCifras";
import Celebramos from "@/components/home/Celebramos";
import Mision from "@/components/home/Mision";
import Accesos from "@/components/home/Accesos";
import Cifras from "@/components/home/Cifras";
import Marcas from "@/components/home/Marcas";
import Sustentabilidad from "@/components/home/Sustentabilidad";
import Footer from "@/components/home/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-papel text-tinta">
      <Nav />
      <Hero />
      <CintaCifras />
      <Celebramos />
      <Mision />
      <Accesos />
      <Cifras />
      <Marcas />
      <Sustentabilidad />
      <Footer />
    </main>
  );
}
