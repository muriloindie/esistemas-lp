import { HeadBlock, Reveal, Section } from "@/components/ui";
import { IconCode, IconLayers } from "@/components/icons";

const FLOW = [
  "Problema",
  "Diagnóstico",
  "Solução",
  "Software",
  "Integrações",
  "Automação",
  "Evolução",
];

export default function Differentiator() {
  return (
    <Section id="diferenciais">
      <HeadBlock
        center
        eyebrow="Diferencial"
        title={
          <>
            Conhecemos o lado técnico. E entendemos <span className="grad">o lado da operação</span>.
          </>
        }
        lead="Construímos produtos próprios enquanto desenvolvemos soluções para diferentes contextos. Isso nos permite enxergar um projeto de duas formas. O resultado é uma abordagem que combina engenharia, experiência do usuário e visão de negócio."
      />
      <div className="duo">
        <Reveal>
          <div className="duo-card dark">
            <span className="icon-wrap">
              <IconCode className="icon-lg" />
            </span>
            <b>como tecnologia</b>
            <p>Arquitetura, código, integrações e segurança construídos com engenharia de verdade.</p>
          </div>
        </Reveal>
        <Reveal delay={130}>
          <div className="duo-card neu">
            <span className="icon-wrap">
              <IconLayers className="icon-lg" />
            </span>
            <b>como produto</b>
            <p>Experiência, contexto de operação e evolução contínua junto com o negócio.</p>
          </div>
        </Reveal>
      </div>
      <Reveal delay={100}>
        <div className="head-block center" style={{ marginBottom: 0 }}>
          <h2 className="h2">
            Você não precisa escolher entre <span className="grad">pronto e personalizado</span>.
          </h2>
          <p className="lead">
            Podemos partir de uma necessidade específica e construir algo sob medida. Também
            podemos utilizar tecnologias e produtos próprios quando eles já resolvem parte do
            problema. E, quando necessário, conectar as duas coisas.
          </p>
        </div>
      </Reveal>
      <div className="flow">
        {FLOW.map((item, i) => (
          <Reveal key={item} delay={i * 70}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span className={`flow-item neu ${item === "Solução" ? "hot" : ""}`}>
                {item.toUpperCase()}
              </span>
              {i < FLOW.length - 1 ? <span className="flow-link" /> : null}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
