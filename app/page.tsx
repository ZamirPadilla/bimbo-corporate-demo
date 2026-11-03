import Nav from "@/components/home/Nav";
import Hero from "@/components/home/Hero";
import Accesos from "@/components/home/Accesos";
import Cifras from "@/components/home/Cifras";
import Mision from "@/components/home/Mision";
import Marcas from "@/components/home/Marcas";
import Sostenibilidad from "@/components/home/Sostenibilidad";
import Footer from "@/components/home/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-harina text-tinta">
      <Nav />
      <Hero />
      <Accesos />
      <Cifras />
      <Mision />
      <Marcas />
      <Sostenibilidad />
      <Footer />
    </main>
  );
}
