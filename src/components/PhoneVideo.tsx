"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { IconClose, IconPlay } from "@/components/icons";

type Phase = "opening" | "open" | "closing";

/**
 * Vídeo dentro do aparelho (loop, sem áudio) com botão de play pulsante.
 * O toque abre um modal com o vídeo completo e áudio.
 */
export default function PhoneVideo({
  src,
  label,
  className = "",
}: {
  src: string;
  label: string;
  className?: string;
}) {
  const [phase, setPhase] = useState<Phase | null>(null);
  const phoneVideoRef = useRef<HTMLVideoElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // loop silencioso dentro do aparelho — pausa quando sai da tela
  useEffect(() => {
    const video = phoneVideoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) video.play().catch(() => {});
          else video.pause();
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const open = useCallback(() => {
    if (typeof document !== "undefined") {
      returnFocusRef.current = document.activeElement as HTMLElement | null;
    }
    phoneVideoRef.current?.pause();
    setPhase("opening");
  }, []);

  const close = useCallback(() => {
    setPhase((current) => (current && current !== "closing" ? "closing" : current));
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setPhase(null);
      const modalVideo = modalVideoRef.current;
      if (modalVideo) {
        modalVideo.pause();
        modalVideo.currentTime = 0;
      }
      phoneVideoRef.current?.play().catch(() => {});
    }, 360);
  }, []);

  // entrada: classe "open" no quadro seguinte para disparar a transição
  useEffect(() => {
    if (phase !== "opening") return;
    const frame = requestAnimationFrame(() => setPhase((c) => (c === "opening" ? "open" : c)));
    return () => cancelAnimationFrame(frame);
  }, [phase]);

  // vídeo completo com áudio assim que o modal abre
  useEffect(() => {
    if (phase !== "open") return;
    const video = modalVideoRef.current;
    if (!video) return;
    video.muted = false;
    video.currentTime = 0;
    video.play().catch(() => {});
  }, [phase]);

  // trava o scroll, devolve o foco
  const isOpen = phase !== null;
  useEffect(() => {
    if (!isOpen) return;
    const body = document.body;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";
    const focusable = cardRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), video, [tabindex]:not([tabindex="-1"])'
    );
    focusable?.[0]?.focus();
    return () => {
      body.style.overflow = previousOverflow;
      returnFocusRef.current?.focus?.();
    };
  }, [isOpen]);

  // Esc fecha, Tab cicla dentro do modal
  useEffect(() => {
    if (!phase) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab" || !cardRef.current) return;
      const items = Array.from(
        cardRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"])'
        )
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [phase, close]);

  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current); }, []);

  return (
    <>
      <div className={`case-phone iphone-18-pro-max ${className}`}>
        <div className="case-phone-screen">
          <div className="case-phone-status">
            <span>9:41</span>
            <span>5G&nbsp; ▰</span>
          </div>
          <span className="case-phone-island" aria-hidden="true" />
          <video
            ref={phoneVideoRef}
            className="case-phone-video"
            src={src}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={label}
            onClick={open}
          >
            Seu navegador não suporta a reprodução deste vídeo.
          </video>
          <button className="case-phone-play" type="button" onClick={open} aria-label={`Ampliar vídeo: ${label}`}>
            <span className="case-phone-play-ring" aria-hidden="true" />
            <IconPlay />
          </button>
          <span className="case-phone-home" aria-hidden="true" />
        </div>
      </div>

      {phase ? (
        <div
          className={`media-modal video-modal ${phase === "open" ? "is-open" : ""}`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <div className="media-modal-backdrop" aria-hidden="true" />
          <div
            className="media-modal-card video-modal-card"
            ref={cardRef}
            role="dialog"
            aria-modal="true"
            aria-label={`Vídeo: ${label}`}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button className="media-modal-close" type="button" onClick={close} aria-label="Fechar vídeo">
              <IconClose />
            </button>
            <div className="video-modal-frame">
              <video ref={modalVideoRef} src={src} controls playsInline preload="metadata" aria-label={label} />
            </div>
            <span className="media-modal-hint">Vídeo completo, com áudio · Esc para fechar</span>
          </div>
        </div>
      ) : null}
    </>
  );
}
