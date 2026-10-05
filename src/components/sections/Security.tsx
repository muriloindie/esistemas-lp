import { HeadBlock, Reveal, Section } from "@/components/ui";
import { IconEye, IconLink, IconLock, IconShield } from "@/components/icons";

const BLOCKS = [
  {
    icon: <IconShield className="icon-lg" />,
    title: "Proteção",
    text: "Arquitetura pensada para proteger informações.",
  },
  {
    icon: <IconLock className="icon-lg" />,
    title: "Controle",
    text: "Acesso e permissões de acordo com o contexto da aplicação.",
  },
  {
    icon: <IconLink className="icon-lg" />,
    title: "Integração segura",
    text: "Comunicação entre sistemas planejada desde a arquitetura.",
  },
  {
    icon: <IconEye className="icon-lg" />,
    title: "Privacidade",
    text: "Tratamento responsável das informações utilizadas nas soluções.",
  },
];

export default function Security() {
  return (
    <Section id="seguranca">
      <div className="sec-grid">
        <Reveal>
          <div className="radar-wrap" aria-hidden="true">
            <div className="radar">
              <span className="radar-blip rb-1" />
              <span className="radar-blip rb-2" />
              <span className="radar-blip rb-3" />
            </div>
          </div>
        </Reveal>
        <div>
          <HeadBlock
            eyebrow="Segurança"
            title={
              <>
                Tecnologia precisa funcionar. E precisa ser <span className="grad">confiável</span>.
              </>
            }
            lead="Segurança deve fazer parte da arquitetura, e não ser um detalhe adicionado no final. A Ê-Sistemas destaca segurança e criptografia como parte das soluções desenvolvidas."
          />
          <div className="grid-2">
            {BLOCKS.map((block, i) => (
              <Reveal key={block.title} delay={i * 100}>
                <div className="card neu">
                  <span className="icon-wrap">{block.icon}</span>
                  <h3 className="h3">{block.title}</h3>
                  <p>{block.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
