import { HeadBlock, Reveal, Section } from "@/components/ui";

const HIGHLIGHTS = [
  "UX",
  "UI",
  "Arquitetura da informação",
  "Fluxos",
  "Design System",
  "Responsividade",
  "Acessibilidade",
  "Microinterações",
];

export default function Experience() {
  return (
    <Section tight id="ux" tone="band">
      <HeadBlock
        center
        eyebrow="Experiência do usuário"
        title={
          <>
            Software bom é software que <span className="grad">as pessoas entendem</span>.
          </>
        }
        lead="Tecnologia poderosa não precisa ser complicada para quem utiliza. Pensamos na experiência desde o desenho dos fluxos até a interface final, tornando sistemas complexos mais fáceis de aprender e operar."
      />
      <Reveal>
        <div className="chips" style={{ justifyContent: "center" }}>
          {HIGHLIGHTS.map((item, i) => (
            <span
              className="chip chip-float"
              key={item}
              style={{ animationDelay: `${i * 0.35}s` }}
            >
              {item}
            </span>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
