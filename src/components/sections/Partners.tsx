import Image from "next/image";
import Marquee from "@/components/Marquee";
import { Reveal } from "@/components/ui";

const PARTNERS = [
  { src: "/parceiros/ambar_bank.webp", alt: "Ambar Bank" },
  { src: "/parceiros/campus_mobile.webp", alt: "Campus Mobile" },
  { src: "/parceiros/claude.webp", alt: "Claude" },
  { src: "/parceiros/ellon.webp", alt: "Ellon" },
  { src: "/parceiros/instagram.webp", alt: "Instagram" },
  { src: "/parceiros/latreille.webp", alt: "Latreille" },
  { src: "/parceiros/meta.webp", alt: "Meta" },
  { src: "/parceiros/n8n.webp", alt: "n8n" },
  { src: "/parceiros/ollama.webp", alt: "Ollama" },
  { src: "/parceiros/plug_and_play.webp", alt: "Plug and Play" },
  { src: "/parceiros/rang.webp", alt: "Rang" },
  { src: "/parceiros/sebrae.webp", alt: "Sebrae" },
  { src: "/parceiros/SI9_sistemas.webp", alt: "SI9 Sistemas" },
  { src: "/parceiros/sudotec.webp", alt: "Sudotec" },
  { src: "/parceiros/voraz.webp", alt: "Voraz" },
];

export default function Partners() {
  return (
    <section className="section-block partners-section" id="parceiros">
      <div className="site-container">
        <Reveal className="motion-reveal">
          <div className="section-heading section-heading-split partners-heading">
            <div>
              <span className="section-kicker">Parceiros & tecnologias</span>
              <h2 className="section-title">Ferramentas e pessoas que caminham <span>com a gente.</span></h2>
            </div>
            <p className="section-intro">Empresas, instituições e tecnologias que fazem parte do dia a dia dos nossos projetos e produtos. Logos demonstrativos — lista a confirmar antes da publicação.</p>
          </div>
        </Reveal>
      </div>

      <Marquee
        viewportClassName="partners-marquee"
        speed={46}
        edgeBlur
        ariaLabel="Parceiros e tecnologias"
        hint="Arraste para navegar pelas marcas dos parceiros."
      >
        {PARTNERS.map((partner) => (
          <div className="partner-item" key={partner.src}>
            <Image src={partner.src} alt={partner.alt} fill sizes="clamp(110px, 13vw, 180px)" />
          </div>
        ))}
      </Marquee>
    </section>
  );
}
