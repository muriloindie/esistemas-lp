import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import TrustStrip from "@/components/sections/TrustStrip";
import History from "@/components/sections/History";
import Partners from "@/components/sections/Partners";
import Services from "@/components/sections/Services";
import Products from "@/components/sections/Products";
import Cases from "@/components/sections/Cases";
import Approach from "@/components/sections/Approach";
import Testimonials from "@/components/sections/Testimonials";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Page() {
  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Navbar />
      <main id="conteudo">
        <Hero />
        <TrustStrip />
        <History />
        <Partners />
        <Services />
        <Products />
        <Cases />
        <Approach />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
