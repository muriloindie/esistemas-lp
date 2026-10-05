"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { IconArrow, IconClose } from "@/components/icons";

export type LightboxItem = { src: string; alt: string };

/**
 * Visualização ampliada de imagens, com navegação e animação de entrada/saída.
 */
export default function Lightbox({
  items,
  index,
  onRequestClose,
  onIndexChange,
}: {
  items: LightboxItem[];
  index: number | null;
  onRequestClose: () => void;
  onIndexChange: (next: number) => void;
}) {
  const [entering, setEntering] = useState(true);
  const [closing, setClosing] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const active = index !== null && index >= 0 && index < items.length ? index : null;
  const isOpen = active !== null;

  // entrada: classe "open" no quadro seguinte
  useEffect(() => {
    if (!isOpen) return;
    setEntering(true);
    setClosing(false);
    const frame = requestAnimationFrame(() => setEntering(false));
    return () => cancelAnimationFrame(frame);
  }, [isOpen, active]);

  const close = useCallback(() => {
    if (closing) return;
    setClosing(true);
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setClosing(false);
      onRequestClose();
    }, 300);
  }, [closing, onRequestClose]);

  // trava o scroll, move o foco para o botão de fechar
  useEffect(() => {
    if (!isOpen) return;
    returnFocusRef.current = document.activeElement as HTMLElement | null;
    const body = document.body;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      body.style.overflow = previousOverflow;
      returnFocusRef.current?.focus?.();
    };
  }, [isOpen]);

  // Esc fecha, setas navegam, Tab cicla no diálogo
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        onIndexChange(((active ?? 0) + 1) % items.length);
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        onIndexChange(((active ?? 0) - 1 + items.length) % items.length);
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const nodes = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const focusNow = document.activeElement;
      if (event.shiftKey && focusNow === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && focusNow === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, active, items.length, close, onIndexChange]);

  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current); }, []);

  if (!isOpen || active === null) return null;

  const item = items[active];
  const go = (delta: number) => onIndexChange((active + delta + items.length) % items.length);

  return (
    <div
      className={`media-modal lightbox ${!entering && !closing ? "is-open" : ""}`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div className="media-modal-backdrop" aria-hidden="true" />
      <div
        className="media-modal-card lightbox-card"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Visualização ampliada de imagem"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="lightbox-top">
          <span className="lightbox-count">
            <b>{String(active + 1).padStart(2, "0")}</b> / {String(items.length).padStart(2, "0")}
          </span>
          <button className="media-modal-close" type="button" onClick={close} aria-label="Fechar visualização" ref={closeRef}>
            <IconClose />
          </button>
        </div>

        <div className="lightbox-stage">
          <button className="lightbox-nav is-prev" type="button" onClick={() => go(-1)} aria-label="Imagem anterior">
            <IconArrow />
          </button>

          <figure className="lightbox-figure">
            <Image src={item.src} alt={item.alt} fill sizes="92vw" className="lightbox-image" priority />
            <figcaption>{item.alt}</figcaption>
          </figure>

          <button className="lightbox-nav is-next" type="button" onClick={() => go(1)} aria-label="Próxima imagem">
            <IconArrow />
          </button>
        </div>
      </div>
    </div>
  );
}
