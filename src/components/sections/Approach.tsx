import { IconArrow, IconChat, IconCheck, IconCode, IconDatabase, IconLink, IconRefresh, IconShield, IconUsers } from "@/components/icons";
import { Reveal } from "@/components/ui";

const STEPS = [
  { number: "01", icon: <IconUsers />, title: "Entender", text: "Mapeamos o negócio, os usuários e os pontos que travam a operação." },
  { number: "02", icon: <IconCode />, title: "Desenhar", text: "Transformamos necessidades em fluxos, experiência e arquitetura." },
  { number: "03", icon: <IconLink />, title: "Construir e integrar", text: "Desenvolvemos, conectamos sistemas e validamos com quem vai usar." },
  { number: "04", icon: <IconRefresh />, title: "Evoluir", text: "Acompanhamos a solução para que cresça junto com a operação." },
];

export default function Approach() {
  return (
    <section className="section-block approach-section" id="processo">
      <div className="site-container">
        <Reveal className="motion-reveal">
          <div className="section-heading section-heading-split">
            <div>
              <span className="section-kicker">Como trabalhamos</span>
              <h2 className="section-title">Não entregamos só código. <span>Resolvemos junto.</span></h2>
            </div>
            <p className="section-intro">Uma solução útil precisa combinar tecnologia, contexto e uma experiência que faça sentido para as pessoas que vão trabalhar com ela.</p>
          </div>
        </Reveal>

        <div className="approach-grid">
          <Reveal className="motion-reveal approach-reveal">
          <div className="process-steps">
            {STEPS.map((step) => (
              <article className="process-step" key={step.number}>
                <span className="process-number">{step.number}</span>
                <span className="process-icon">{step.icon}</span>
                <div><h3>{step.title}</h3><p>{step.text}</p></div>
                {step.number !== "04" ? <span className="process-connector" aria-hidden="true" /> : null}
              </article>
            ))}
          </div>
          </Reveal>

          <Reveal className="motion-reveal approach-reveal" delay={120}>
          <div className="integration-card">
            <div className="integration-card-heading">
              <span className="integration-card-icon"><IconLink /></span>
              <span><small>ARQUITETURA CONECTADA</small><strong>Seus sistemas não precisam ser ilhas.</strong></span>
            </div>
            <p>Integramos as ferramentas que sua equipe já usa e desenvolvemos as peças que faltam para o fluxo funcionar de ponta a ponta.</p>
            <div className="system-map" aria-label="Exemplo de sistemas conectados">
              <svg viewBox="0 0 440 232" preserveAspectRatio="none" aria-hidden="true">
                <path d="M220 116 90 46M220 116 352 46M220 116 90 185M220 116 352 185" />
                <circle cx="220" cy="116" r="4" /><circle cx="90" cy="46" r="3" /><circle cx="352" cy="46" r="3" /><circle cx="90" cy="185" r="3" /><circle cx="352" cy="185" r="3" />
              </svg>
              <span className="system-node system-node-main"><IconLink /><b>Ê-Sistemas</b></span>
              <span className="system-node system-node-erp"><IconDatabase /><b>ERP</b></span>
              <span className="system-node system-node-crm"><IconUsers /><b>CRM</b></span>
              <span className="system-node system-node-whatsapp"><IconChat /><b>WhatsApp</b></span>
              <span className="system-node system-node-app"><IconCode /><b>Aplicações</b></span>
            </div>
            <div className="integration-card-foot"><span><IconCheck /> APIs e webhooks</span><span><IconShield /> Segurança desde a arquitetura</span><span><IconRefresh /> Evolução contínua</span></div>
            <a className="integration-link" href="#contato">Fale com nosso time <IconArrow /></a>
          </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
