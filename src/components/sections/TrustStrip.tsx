import { IconBolt, IconCode, IconLink } from "@/components/icons";

const PILLARS = [
  { icon: <IconCode />, title: "Desenvolvimento sob medida", text: "Tecnologia alinhada ao seu processo." },
  { icon: <IconBolt />, title: "Produtos digitais próprios", text: "Soluções que nascem da prática." },
  { icon: <IconLink />, title: "Integração de sistemas", text: "Seus dados trabalhando em conjunto." },
];

export default function TrustStrip() {
  return (
    <section className="pillars-section" aria-label="Como a Ê-Sistemas atua">
      <div className="site-container pillars-layout">
        <p className="pillars-label">Uma parceira de tecnologia<br />do início à evolução.</p>
        <div className="pillars-list">
          {PILLARS.map((pillar) => (
            <div className="pillar-item" key={pillar.title}>
              <span className="pillar-icon">{pillar.icon}</span>
              <span><strong>{pillar.title}</strong><small>{pillar.text}</small></span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
