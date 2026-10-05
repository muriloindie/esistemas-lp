import { HeadBlock, Reveal, Section } from "@/components/ui";

const SEGMENTS = [
  "Integração de sistemas",
  "BI",
  "Comunicação via WhatsApp",
  "Rastreamento de entregas",
  "Transmissão ao vivo",
  "Marketplaces",
  "Gestão logística",
  "Aplicações web e mobile",
  "UI/UX",
];

export default function Segments() {
  const track = [...SEGMENTS, ...SEGMENTS];
  return (
    <Section tight tone="band">
      <HeadBlock
        center
        title={
          <>
            Um problema diferente.{" "}
            <span className="grad">Uma solução construída para ele.</span>
          </>
        }
        lead="A experiência da Ê-Sistemas não nasceu de um único tipo de software. Isso permite desenvolver tecnologia pensando não apenas em código, mas em processos reais."
      />
      <Reveal>
        <div className="marquee">
          <div className="marquee-track">
            {track.map((item, i) => (
              <span className="chip" key={`${item}-${i}`}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
