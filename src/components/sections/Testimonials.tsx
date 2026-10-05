import Marquee from "@/components/Marquee";
import { Reveal } from "@/components/ui";
import { IconArrow, IconStar } from "@/components/icons";

const QUOTES = [
  {
    initials: "LE",
    name: "Logística & entregas",
    role: "Operação de rota",
    quote: "Quando cada etapa fica visível, a equipe consegue agir antes que o problema chegue ao cliente.",
  },
  {
    initials: "CA",
    name: "Clínica & agenda",
    role: "Atendimento ao paciente",
    quote: "Confirmações e lembretes automáticos tiraram a agenda do papel e deram previsibilidade para a recepção.",
  },
  {
    initials: "TC",
    name: "Time comercial",
    role: "CRM e Kanban",
    quote: "Enxergar as propostas paradas em um quadro só mudou o follow-up da equipe inteira.",
  },
  {
    initials: "IN",
    name: "Integrações",
    role: "ERP + WhatsApp",
    quote: "A API conectou o WhatsApp ao ERP e eliminou o retrabalho de atualizar status na mão.",
  },
];

export default function Testimonials() {
  return (
    <section className="section-block testimonials-section" id="depoimentos">
      <div className="site-container">
        <Reveal className="motion-reveal">
          <div className="section-heading section-heading-split testimonials-heading">
            <div>
              <span className="section-kicker">Depoimentos</span>
              <h2 className="section-title">Operações que trocaram rotina improvisada por <span>processo rastreável.</span></h2>
            </div>
            <p className="section-intro">O que muda quando conversas, dados e rotinas passam a viver no mesmo fluxo — e a rotina de quem usa fica mais simples.</p>
          </div>
        </Reveal>
      </div>

      <Marquee
        viewportClassName="testimonials-marquee"
        speed={34}
        ariaLabel="Depoimentos de clientes"
        hint="Arraste os cartões para navegar entre os depoimentos."
      >
        {QUOTES.map((item) => (
          <article className="testimonial-card" key={item.name}>
            <div className="testimonial-head">
              <span className="testimonial-avatar" aria-hidden="true">{item.initials}</span>
              <span className="testimonial-person">
                <strong>{item.name}</strong>
                <span>{item.role}</span>
              </span>
            </div>
            <div className="testimonial-stars" aria-label="Avaliação 5 de 5">
              <IconStar /><IconStar /><IconStar /><IconStar /><IconStar />
            </div>
            <p>{item.quote}</p>
            <span className="testimonial-tag">relato de exemplo</span>
          </article>
        ))}
      </Marquee>

      <div className="site-container testimonials-footer">
        <p className="testimonial-disclaimer">Depoimentos, perfis e avaliações são conteúdos de exemplo — substituir por relatos reais, com autorização dos clientes.</p>
        <a className="testimonial-link" href="#contato">Conte o que sua equipe precisa melhorar <IconArrow /></a>
      </div>
    </section>
  );
}
