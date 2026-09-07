import Hero from "@/components/Hero";
import Contact from "@/components/Contact";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Studio from "@/components/Studio";

export default function Home() {
  return (
    <main id="top" className="min-h-screen">
      <Navbar />
      <Hero />
      <Studio />
      <Contact />
      <Footer />
    </main>
  );
}
