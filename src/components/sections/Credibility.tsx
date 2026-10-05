import { HeadBlock, Reveal, Section } from "@/components/ui";
import { IconBroadcast, IconCheckCircle, IconSpark } from "@/components/icons";

const BADGES = [
  {
    icon: <IconCheckCircle className="icon-lg" />,
    title: "Campeã Campus Mobile",
    text: "Experiência reconhecida em programas nacionais de inovação tecnológica.",
  },
  {
    icon: <IconSpark className="icon-lg" />,
    title: "Startup Destaque do Paraná",
    text: "Reconhecimento como startup de destaque no Paraná em 2021.",
  },
  {
    icon: <IconBroadcast className="icon-lg" />,
    title: "Plug and Play",
    text: "Certificação ligada à Plug and Play, aceleradora do Vale do Silício.",
  },
];

export default function Credibility() {
  return (
    <Section tight tone="band">
      <HeadBlock
        center
        title={
          <>
            Tecnologia construída com <span className="grad">experiência real</span>.
          </>
        }
        lead="A Ê-Sistemas apresenta histórico em desenvolvimento de software, aplicativos, integração de sistemas, comunicação por WhatsApp, rastreamento e logística, transmissão ao vivo e experiências digitais."
      />
      <div className="badges">
        {BADGES.map((badge, i) => (
          <Reveal key={badge.title} delay={i * 120}>
            <div className="badge neu card">
              <span className="icon-wrap">{badge.icon}</span>
              <b>{badge.title}</b>
              <p>{badge.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
