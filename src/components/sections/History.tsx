import { Reveal } from "@/components/ui";
import HistoryGallery from "@/components/sections/HistoryGallery";
import { IconCode, IconLayers, IconSpark, IconCheckCircle } from "@/components/icons";

const MILESTONES = [
  {
    label: "ORIGEM",
    title: "Projetos começam pela operação.",
    text: "Software e experiências digitais criados a partir de necessidades concretas.",
    icon: <IconCode />,
  },
  {
    label: "2021",
    title: "Startup Destaque do Paraná.",
    text: "Reconhecimento citado nos materiais da Ê-Sistemas.",
    icon: <IconSpark />,
  },
  {
    label: "EVOLUÇÃO",
    title: "Produtos próprios ganham espaço.",
    text: "Experiências de projeto viram ferramentas que podem ser aplicadas em outras operações.",
    icon: <IconLayers />,
  },
  {
    label: "HOJE",
    title: "Engenharia e produto, lado a lado.",
    text: "Desenvolvimento sob medida e o ecossistema Ê-Bot para diferentes contextos.",
    icon: <IconCheckCircle />,
  },
];

const RECOGNITIONS = [
  { title: "Campus Mobile", text: "Campeã · título a confirmar" },
  { title: "Destaque do Paraná", text: "Startup · 2021" },
  { title: "Plug and Play", text: "Conexão com o ecossistema" },
];

export default function History() {
  return (
    <section className="section-block history-section" id="historia">
      <div className="site-container">
        <Reveal className="motion-reveal">
          <div className="section-heading section-heading-split history-heading">
            <div>
              <span className="section-kicker">Nossa história</span>
              <h2 className="section-title">Crescemos resolvendo desafios <span>de verdade.</span></h2>
            </div>
            <p className="section-intro">A Ê-Sistemas une experiência em projetos digitais ao desenvolvimento de produtos próprios. Cada etapa dessa trajetória parte da mesma pergunta: o que precisa funcionar melhor?</p>
          </div>
        </Reveal>

        <div className="history-timeline" aria-label="Linha do tempo da Ê-Sistemas">
          {MILESTONES.map((item, index) => (
            <Reveal className="motion-reveal history-step-reveal" delay={index * 90} key={item.label}>
              <article className="history-step">
                <div className="history-step-marker"><span>{item.icon}</span><i /></div>
                <span className="history-step-label">{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="motion-reveal">
          <div className="recognition-row">
            <div className="recognition-intro">
              <span className="recognition-mark"><IconSpark /></span>
              <span><small>PRÊMIOS & RECONHECIMENTOS</small><strong>Inovação reconhecida.</strong></span>
            </div>
            <div className="recognition-list">
              {RECOGNITIONS.map((item) => (
                <div className="recognition-item" key={item.title}>
                  <span><IconCheckCircle /></span>
                  <div><strong>{item.title}</strong><small>{item.text}</small></div>
                </div>
              ))}
            </div>
          </div>
          <p className="history-disclaimer">Marcos, datas e nomenclatura dos reconhecimentos são demonstrativos e precisam ser confirmados antes da publicação.</p>
        </Reveal>
      </div>

      <HistoryGallery />
    </section>
  );
}
