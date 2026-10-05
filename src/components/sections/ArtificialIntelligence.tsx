import { HeadBlock, Reveal, Section } from "@/components/ui";
import {
  IconBolt,
  IconChat,
  IconChart,
  IconDatabase,
  IconSpark,
  IconTarget,
} from "@/components/icons";

const EXAMPLES = [
  {
    icon: <IconChat />,
    title: "Atendimento",
    text: "Respostas automáticas e assistidas.",
  },
  {
    icon: <IconTarget />,
    title: "Triagem",
    text: "Identificação de intenção e direcionamento.",
  },
  {
    icon: <IconBolt />,
    title: "Automação",
    text: "Fluxos que executam tarefas repetitivas.",
  },
  {
    icon: <IconDatabase />,
    title: "Conhecimento",
    text: "Uso de informações internas para contextualizar respostas.",
  },
  {
    icon: <IconChart />,
    title: "Análise",
    text: "Transformação de dados em informações úteis para a operação.",
  },
];

export default function ArtificialIntelligence() {
  return (
    <Section id="ia" tone="dark">
      <HeadBlock
        center
        eyebrow="Inteligência artificial"
        title={
          <>
            IA aplicada à operação. <span className="grad">Não apenas como tendência.</span>
          </>
        }
        lead="A inteligência artificial faz mais sentido quando resolve um problema real. Na Ê-Sistemas, IA pode ser utilizada para apoiar comunicação, atendimento, classificação, automação, busca e interpretação de informações."
      />
      <div className="ai-grid">
        <Reveal>
          <div className="ai-core" aria-hidden="true">
            <span className="ai-ring ai-r1">
              <i />
              <i className="b" />
            </span>
            <span className="ai-ring ai-r2">
              <i />
              <i className="b" />
            </span>
            <span className="ai-ring ai-r3">
              <i />
            </span>
            <span className="ai-center">
              <IconSpark className="icon" />
            </span>
          </div>
        </Reveal>
        <div className="ai-rows">
          {EXAMPLES.map((item, i) => (
            <Reveal key={item.title} delay={i * 90}>
              <div className="ai-row">
                <span className="icon-wrap">{item.icon}</span>
                <div>
                  <b>{item.title}</b>
                  <p>{item.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
