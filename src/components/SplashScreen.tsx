"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Phase = "loading" | "leaving" | "gone";

/**
 * Splash curto: logo, barra de carregamento e animação de entrada/saída.
 * Sai sozinho e não bloqueia a leitura da página (área oculta para leitores).
 */
export default function SplashScreen() {
  const [phase, setPhase] = useState<Phase>("loading");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const body = document.body;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    const leave = window.setTimeout(() => setPhase("leaving"), reduced ? 260 : 1500);
    const gone = window.setTimeout(() => {
      setPhase("gone");
      body.style.overflow = previousOverflow;
    }, reduced ? 520 : 2260);

    return () => {
      window.clearTimeout(leave);
      window.clearTimeout(gone);
      body.style.overflow = previousOverflow;
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div className={`splash ${phase === "leaving" ? "is-leaving" : ""}`} aria-hidden="true">
      <div className="splash-inner">
        <div className="splash-mark">
          <Image
            src="/logo-esistemas.webp"
            alt=""
            width={250}
            height={50}
            priority
            className="splash-logo"
          />
        </div>
        <div className="splash-bar">
          <i />
        </div>
        <span className="splash-label">Carregando experiência</span>
      </div>
    </div>
  );
}
