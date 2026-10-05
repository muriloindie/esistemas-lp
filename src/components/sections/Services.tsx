import { IconBolt, IconCode, IconDatabase, IconLink, IconMobile, IconPen } from "@/components/icons";
import { Reveal } from "@/components/ui";

const SERVICES = [
  {
    icon: <IconCode />,
    number: "01",
    title: "Sistemas sob medida",
    text: "Plataformas e ferramentas digitais construídas em torno da rotina, dos objetivos e dos usuários do seu negócio.",
    className: "capability-software",
  },
  {
    icon: <IconMobile />,
    number: "02",
    title: "Aplicativos e experiências digitais",
    text: "Experiências web e mobile conectadas às pessoas, aos dados e à operação.",
    className: "capability-apps",
  },
  {
    icon: <IconLink />,
    number: "03",
    title: "Integrações e APIs",
    text: "Conectamos ERP, CRM, canais digitais e sistemas legados para reduzir silos de informação.",
    className: "capability-integrations",
  },
  {
    icon: <IconBolt />,
    number: "04",
    title: "Automação, dados e IA",
    text: "Fluxos inteligentes que cuidam das tarefas repetitivas e ajudam a equipe a enxergar o que vem a seguir.",
    className: "capability-automation",
  },
];

export default function Services() {
  return (
    <section className="section-block capabilities-section" id="solucoes">
      <div className="site-container">
        <Reveal className="motion-reveal">
          <div className="section-heading section-heading-split">
            <div>
              <span className="section-kicker">O que fazemos</span>
              <h2 className="section-title">A tecnologia certa começa por <span>entender o desafio.</span></h2>
            </div>
            <p className="section-intro">Nem todo processo cabe em uma ferramenta pronta. Mapeamos o contexto e combinamos engenharia, integração e experiência para criar algo que funcione no dia a dia.</p>
          </div>
        </Reveal>
        <Reveal className="motion-reveal">
          <div className="capability-grid">
            {SERVICES.map((service) => (
              <article className={`capability-card ${service.className}`} key={service.title}>
              <div className="capability-topline"><span className="capability-icon">{service.icon}</span><span>{service.number}</span></div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              {service.number === "01" ? (
                <div className="software-preview" aria-hidden="true">
                  <div className="software-preview-head"><span /><span /><span /><b>workspace / projeto</b></div>
                  <div className="software-preview-body"><i /><i /><i /><div><b /><b /><b /></div></div>
                </div>
              ) : null}
              {service.number === "03" ? (
                <div className="integration-preview" aria-hidden="true">
                  <span>ERP</span><i /><b><IconLink /></b><i /><span>CRM</span>
                </div>
              ) : null}
              {service.number === "04" ? (
                <div className="automation-preview" aria-hidden="true">
                  <span><IconDatabase /> Dados</span><i /><span><IconBolt /> Automação</span><i /><span><IconPen /> Interface</span>
                </div>
              ) : null}
              {service.number === "02" ? (
                <div className="apps-preview" aria-hidden="true"><span><IconMobile /></span><div><i /><i /><i /></div><b>web <em>·</em> mobile</b></div>
              ) : null}
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
