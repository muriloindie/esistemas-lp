import { HeadBlock, Reveal, Section } from "@/components/ui";
import {
  IconCheckCircle,
  IconCode,
  IconMap,
  IconRefresh,
  IconUsers,
} from "@/components/icons";

const STEPS = [
  {
    icon: <IconUsers className="icon-lg" />,
    num: "01",
    title: "Entender",
    text: "Conhecemos o negócio, os usuários e os gargalos.",
  },
  {
    icon: <IconMap className="icon-lg" />,
    num: "02",
    title: "Planejar",
    text: "Transformamos necessidades em fluxos, arquitetura e produto.",
  },
  {
    icon: <IconCode className="icon-lg" />,
    num: "03",
    title: "Desenvolver",
    text: "Construímos sistemas, aplicativos, integrações e automações.",
  },
  {
    icon: <IconCheckCircle className="icon-lg" />,
    num: "04",
    title: "Validar",
    text: "Testamos a experiência e ajustamos o que precisa ser melhorado.",
  },
  {
    icon: <IconRefresh className="icon-lg" />,
    num: "05",
    title: "Evoluir",
    text: "A tecnologia continua evoluindo junto com a operação.",
  },
];

export default function Process() {
  return (
    <Section id="processo" tone="dark">
      <HeadBlock
        center
        eyebrow="Não é só desenvolvimento"
        title={
          <>
            Não entregamos <span className="grad">apenas código</span>.
          </>
        }
        lead="Uma boa solução começa muito antes da primeira linha de código. Entendemos o problema, estudamos o processo, pensamos na experiência, construímos a tecnologia e evoluímos a solução junto com o negócio."
      />
      <div className="steps">
        {STEPS.map((step, i) => (
          <Reveal key={step.num} delay={i * 110}>
            <div className="step">
              <span className="step-num neu">{step.num}</span>
              <span className="icon-wrap">{step.icon}</span>
              <h3 className="h3">{step.title}</h3>
              <p>{step.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
