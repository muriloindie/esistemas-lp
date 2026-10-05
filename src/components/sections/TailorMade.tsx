import { HeadBlock, Reveal, Section } from "@/components/ui";

const BLOCKS = [
  {
    title: "Seu processo",
    text: "Mapeamos como sua empresa funciona hoje.",
  },
  {
    title: "Sua necessidade",
    text: "Identificamos gargalos e oportunidades.",
  },
  {
    title: "Sua tecnologia",
    text: "Desenvolvemos a solução adequada para o cenário.",
  },
  {
    title: "Seu resultado",
    text: "Mais controle, integração e eficiência operacional.",
  },
];

export default function TailorMade() {
  return (
    <Section id="sob-medida">
      <HeadBlock
        eyebrow="Desenvolvimento sob medida"
        title={
          <>
            Quando sua empresa precisa de algo que <span className="grad">não existe pronto</span>.
          </>
        }
        lead="Nem todo processo cabe em um software pronto. Às vezes o problema está justamente na forma como diferentes sistemas conversam, como a equipe trabalha ou como os dados circulam. É aí que entra o desenvolvimento sob medida."
      />
      <div className="tailor-grid">
        {BLOCKS.map((block, i) => (
          <Reveal key={block.title} delay={i * 110}>
            <div className="tailor neu card">
              <b>{block.title}</b>
              <p>{block.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
