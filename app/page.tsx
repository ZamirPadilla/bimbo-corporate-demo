import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Values from "@/components/Values";
import Brands from "@/components/Brands";
import Sustainability from "@/components/Sustainability";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Values />
      <Brands />
      <Sustainability />
      <Footer />
    </main>
  );
}
