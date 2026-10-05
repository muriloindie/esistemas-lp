"use client";

import { useState } from "react";
import Image from "next/image";
import Marquee from "@/components/Marquee";
import Lightbox, { type LightboxItem } from "@/components/Lightbox";
import { Reveal } from "@/components/ui";
import { IconCamera } from "@/components/icons";

const MEMORIES: LightboxItem[] = [
  { src: "/nossa_historia/nossa_historia_1.jpeg", alt: "Registro 01 da trajetória da Ê-Sistemas (imagem de exemplo)" },
  { src: "/nossa_historia/nossa_historia_2.jpeg", alt: "Registro 02 da trajetória da Ê-Sistemas (imagem de exemplo)" },
  { src: "/nossa_historia/nossa_historia_3.jpg", alt: "Registro 03 da trajetória da Ê-Sistemas (imagem de exemplo)" },
  { src: "/nossa_historia/nossa_historia_4.jpg", alt: "Registro 04 da trajetória da Ê-Sistemas (imagem de exemplo)" },
  { src: "/nossa_historia/nossa_historia_5.jpg", alt: "Registro 05 da trajetória da Ê-Sistemas (imagem de exemplo)" },
  { src: "/nossa_historia/nossa_historia_6.jpg", alt: "Registro 06 da trajetória da Ê-Sistemas (imagem de exemplo)" },
  { src: "/nossa_historia/nossa_historia_7.jpg", alt: "Registro 07 da trajetória da Ê-Sistemas (imagem de exemplo)" },
  { src: "/nossa_historia/nossa_historia_8.jpg", alt: "Registro 08 da trajetória da Ê-Sistemas (imagem de exemplo)" },
  { src: "/nossa_historia/nossa_historia_9.jpg", alt: "Registro 09 da trajetória da Ê-Sistemas (imagem de exemplo)" },
  { src: "/nossa_historia/nossa_historia_10.jpg", alt: "Registro 10 da trajetória da Ê-Sistemas (imagem de exemplo)" },
  { src: "/nossa_historia/nossa_historia_11.jpeg", alt: "Registro 11 da trajetória da Ê-Sistemas (imagem de exemplo)" },
  { src: "/nossa_historia/nossa_historia_12.jpg", alt: "Registro 12 da trajetória da Ê-Sistemas (imagem de exemplo)" },
  { src: "/nossa_historia/pedro-google.webp", alt: "Registro da trajetória da Ê-Sistemas (imagem de exemplo)" },
];

export default function HistoryGallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="history-gallery">
      <div className="site-container">
        <Reveal className="motion-reveal">
          <div className="history-gallery-head">
            <span className="history-gallery-mark"><IconCamera /></span>
            <span className="history-gallery-title">
              <small>ÁLBUM DA NOSSA HISTÓRIA</small>
              <strong>Registros dessa trajetória.</strong>
            </span>
            <span className="history-gallery-note">Arraste para navegar · clique no + para ampliar</span>
          </div>
        </Reveal>
      </div>

      <Marquee
        viewportClassName="history-marquee"
        speed={54}
        edgeBlur
        ariaLabel="Galeria da nossa história"
        hint="Arraste para navegar pelas imagens da galeria. Clique no ícone + de uma foto para vê-la ampliada."
        paused={openIndex !== null}
      >
        {MEMORIES.map((memory, index) => (
          <div className="memory-item" key={memory.src}>
            <Image src={memory.src} alt="" fill sizes="clamp(150px, 21vw, 290px)" />
            <button
              className="memory-zoom"
              type="button"
              onClick={() => setOpenIndex(index)}
              aria-haspopup="dialog"
              aria-label={`Ampliar: ${memory.alt}`}
              title="Ampliar"
            >
              ＋
            </button>
          </div>
        ))}
      </Marquee>

      <Lightbox
        items={MEMORIES}
        index={openIndex}
        onRequestClose={() => setOpenIndex(null)}
        onIndexChange={(next) => setOpenIndex(next)}
      />
    </div>
  );
}
