import { Chip, Reveal, Section } from "@/components/ui";
import { IconLink } from "@/components/icons";

const HIGHLIGHTS = [
  "APIs REST",
  "Webhooks",
  "Automação de processos",
  "Sincronização de dados",
  "Comunicação entre plataformas",
  "Integração com WhatsApp",
  "Sistemas legados",
];

const NODES = [
  { label: "ERP", x: 16, y: 16 },
  { label: "CRM", x: 84, y: 16 },
  { label: "WhatsApp", x: 6, y: 50 },
  { label: "APIs", x: 94, y: 50 },
  { label: "Banco de dados", x: 18, y: 86 },
  { label: "Ferramentas internas", x: 82, y: 86 },
];

export default function Integrations() {
  return (
    <Section id="integracoes">
      <div className="sec-grid">
        <Reveal>
          <div className="head-block" style={{ marginBottom: 28 }}>
            <span className="eyebrow">Integrações</span>
            <h2 className="h2">
              Faça seus sistemas <span className="grad">trabalharem juntos</span>.
            </h2>
            <p className="lead">
              ERP, CRM, WhatsApp, APIs, bancos de dados e ferramentas internas não precisam
              funcionar como ilhas. Desenvolvemos integrações para conectar informações e
              automatizar processos entre diferentes sistemas.
            </p>
          </div>
          <div className="chips">
            {HIGHLIGHTS.map((item) => (
              <Chip key={item}>{item}</Chip>
            ))}
          </div>
        </Reveal>
        <Reveal delay={140}>
          <div className="hub" aria-hidden="true">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none">
              {NODES.map((node) => (
                <line
                  key={node.label}
                  className="hub-line"
                  x1="50"
                  y1="50"
                  x2={node.x}
                  y2={node.y}
                />
              ))}
            </svg>
            <span className="hub-core">
              <IconLink className="icon" />
            </span>
            {NODES.map((node) => (
              <span
                className="hub-node"
                key={node.label}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                {node.label}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
