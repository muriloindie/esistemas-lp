import Image from "next/image";
import { CONTACT, LINKS } from "@/lib/links";
import SocialLinks from "@/components/SocialLinks";
import { WhatsappLink } from "@/components/ExitLink";
import { IconWhatsapp } from "@/components/icons";

const COMPANY_LINKS = [
  { href: "#historia", label: "Nossa história" },
  { href: "#solucoes", label: "Soluções" },
  { href: "#processo", label: "Como trabalhamos" },
  { href: "#cases", label: "Cases" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#contato", label: "Contato" },
];

const PRODUCT_LINKS = [
  { href: "#ebot", label: "Ê-Bot Panel + API" },
  { href: "#clinical", label: "Ê-Bot Clinical" },
  { href: "#explorer", label: "Ê-Bot Explorer" },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="footer-main">
          <div className="footer-brand-column">
            <a className="footer-logo" href="#inicio" aria-label="Ê-Sistemas — início">
              <Image src="/logo-esistemas.webp" alt="Ê-Sistemas" width={250} height={50} style={{ width: "140px", height: "auto" }} />
            </a>
            <p>Engenharia de software, produtos próprios e tecnologia aplicada a desafios reais.</p>
          </div>
          <div className="footer-link-column">
            <h2>Ê-Sistemas</h2>
            <nav aria-label="Links institucionais">
              {COMPANY_LINKS.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
            </nav>
          </div>
          <div className="footer-link-column">
            <h2>Produtos</h2>
            <nav aria-label="Produtos Ê-Bot">
              {PRODUCT_LINKS.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
            </nav>
          </div>
          <div className="footer-link-column footer-contact-column">
            <h2>Contato</h2>
            <WhatsappLink className="footer-whatsapp" href={LINKS.whatsapp}>
              <IconWhatsapp className="wa-glyph" />
              <span>{CONTACT.whatsapp}</span>
            </WhatsappLink>
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            <SocialLinks />
            {CONTACT.isDemo ? <small>Dados de exemplo — atualizar antes de publicar.</small> : null}
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Ê-Sistemas. Todos os direitos reservados.</span>
          <span>Feito para conectar o que move sua operação.</span>
          <a href="#inicio">Voltar ao topo ↑</a>
        </div>
      </div>
    </footer>
  );
}
