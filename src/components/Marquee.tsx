"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

type MarqueeProps = {
  /** um conjunto de itens — o conjunto é replicado automaticamente */
  children: ReactNode;
  className?: string;
  viewportClassName?: string;
  /** velocidade do autoroll em px por segundo */
  speed?: number;
  /** revela os itens conforme entram das bordas: opacidade + blur */
  edgeBlur?: boolean;
  /** desliga o autoroll e exibe tudo estático (respeita reduced-motion) */
  staticMode?: boolean;
  /** congela o autoroll temporariamente (ex.: lightbox aberto por cima) */
  paused?: boolean;
  ariaLabel?: string;
  /** texto oculto de instrução para leitores de tela */
  hint?: string;
};

function toArray(children: ReactNode): ReactNode[] {
  return Array.isArray(children) ? children : [children];
}

export default function Marquee({
  children,
  className,
  viewportClassName,
  speed = 46,
  edgeBlur = false,
  staticMode = false,
  paused = false,
  ariaLabel,
  hint,
}: MarqueeProps) {
  const items = toArray(children);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);
  const draggingRef = useRef(false);
  const metricsRef = useRef<{ left: number; width: number }[]>([]);
  const setWidthRef = useRef(0);
  const viewportWidthRef = useRef(0);
  const dragRef = useRef({ x: 0, t: 0, id: -1 });
  const movedRef = useRef(0);
  /** clique deve ser engolido porque o gesto foi um arraste, não um toque */
  const suppressClickRef = useRef(false);
  const windowHandlersRef = useRef<{ move: (e: PointerEvent) => void; end: (e: PointerEvent) => void } | null>(null);

  const [sets, setSets] = useState(2);
  const [isDragging, setIsDragging] = useState(false);

  const count = items.length;

  // mede as posições e garante cópias suficientes para cobrir a tela
  useEffect(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;

    let frame = 0;

    const measure = () => {
      const nodes = Array.from(track.children) as HTMLElement[];
      if (nodes.length <= count) return;

      const viewportWidth = viewport.clientWidth;
      viewportWidthRef.current = viewportWidth;

      const perSet = nodes[count].offsetLeft - nodes[0].offsetLeft;
      const cycle = perSet > 0 ? perSet : track.scrollWidth / Math.max(sets, 1);
      if (cycle <= 0) return;
      setWidthRef.current = cycle;
      metricsRef.current = nodes.map((node) => ({
        left: node.offsetLeft,
        width: node.offsetWidth,
      }));

      const needed = Math.min(5, Math.max(2, Math.ceil(viewportWidth / cycle) + 1));
      if (needed !== sets) setSets(needed);
    };

    measure();

    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    });
    observer.observe(viewport);
    observer.observe(track);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [sets, count]);

  // loop principal: autoroll + impulso do drag + efeito das bordas
  useEffect(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;

    const applyEdgeEffect = (offset: number) => {
      const metrics = metricsRef.current;
      const vw = viewportWidthRef.current || viewport.clientWidth;
      if (!metrics.length || !vw) return;
      const center = vw / 2;
      // passo horizontal de um item (largura + gap) para calcular a zona nítida
      const pitch =
        metrics.length > 1 && metrics[1].left > metrics[0].left
          ? metrics[1].left - metrics[0].left
          : metrics[0].width;
      // ~3 itens centrais ficam totalmente nítidos; o blur só cresce nas bordas
      const sharp = Math.max(pitch * 1.5, vw * 0.14);
      const falloff = Math.max(1, vw * 0.52 - sharp);
      const nodes = track.children;
      for (let i = 0; i < metrics.length; i += 1) {
        const node = nodes[i] as HTMLElement | undefined;
        if (!node) continue;
        const itemCenter = metrics[i].left + metrics[i].width / 2 + offset;
        const distance = Math.abs(itemCenter - center);
        let focus = 1;
        if (distance > sharp) {
          const t = Math.min(1, (distance - sharp) / falloff);
          focus = Math.pow(1 - t, 1.15);
        }
        node.style.opacity = (0.14 + 0.86 * focus).toFixed(3);
        node.style.filter = focus > 0.97 ? "none" : `blur(${((1 - focus) * 16).toFixed(2)}px)`;
      }
    };

    const reduced =
      staticMode ||
      (typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    if (reduced) {
      track.style.transform = "translate3d(0,0,0)";
      const nodes = track.children;
      for (let i = 0; i < nodes.length; i += 1) {
        (nodes[i] as HTMLElement).style.opacity = "1";
        (nodes[i] as HTMLElement).style.filter = "none";
      }
      return;
    }

    let rafId = 0;
    let last = performance.now();

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      let offset = offsetRef.current;

      if (!draggingRef.current && !paused) {
        if (Math.abs(velocityRef.current) > 6) {
          offset += velocityRef.current * dt;
          velocityRef.current *= Math.exp(-3.1 * dt);
          if (Math.abs(velocityRef.current) < 6) velocityRef.current = 0;
        } else {
          velocityRef.current = 0;
          offset -= speed * dt;
        }
      }

      const cycle = setWidthRef.current;
      if (cycle > 0) {
        while (offset <= -cycle) offset += cycle;
        while (offset > 0) offset -= cycle;
      }

      if (paused) velocityRef.current = 0;

      offsetRef.current = offset;
      track.style.transform = `translate3d(${offset.toFixed(2)}px, 0, 0)`;
      if (edgeBlur) applyEdgeEffect(offset);

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [speed, edgeBlur, sets, count, staticMode, paused]);

  const detachDragListeners = useCallback(() => {
    const handlers = windowHandlersRef.current;
    if (!handlers) return;
    window.removeEventListener("pointermove", handlers.move);
    window.removeEventListener("pointerup", handlers.end);
    window.removeEventListener("pointercancel", handlers.end);
    windowHandlersRef.current = null;
  }, []);

  // remove os listeners globais caso o componente desmonte no meio do arraste
  useEffect(() => () => detachDragListeners(), [detachDragListeners]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (staticMode) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;
    draggingRef.current = true;
    setIsDragging(true);
    movedRef.current = 0;
    suppressClickRef.current = false;
    dragRef.current = { x: event.clientX, t: performance.now(), id: event.pointerId };
    velocityRef.current = 0;

    // deliberadamente SEM setPointerCapture: a captura de ponteiro faz o
    // navegador redirecionar/engolir o `click`, e o clique dos itens
    // (ex.: abrir o lightbox da galeria) nunca chegaria ao botão.
    // Os listeners em `window` dão o mesmo resultado do arraste fora do viewport.
    detachDragListeners();

    const move = (e: PointerEvent) => {
      if (!draggingRef.current || dragRef.current.id !== e.pointerId) return;
      const now = performance.now();
      const dx = e.clientX - dragRef.current.x;
      const dt = Math.max(0.008, (now - dragRef.current.t) / 1000);
      movedRef.current += Math.abs(dx);
      offsetRef.current += dx;
      velocityRef.current = Math.max(-2600, Math.min(2600, dx / dt));
      dragRef.current = { x: e.clientX, t: now, id: e.pointerId };
    };

    const end = (e: PointerEvent) => {
      if (!draggingRef.current || dragRef.current.id !== e.pointerId) return;
      draggingRef.current = false;
      setIsDragging(false);
      // decide aqui, antes do `click`, se o gesto foi arraste; zera o acumulador
      suppressClickRef.current = movedRef.current > 8;
      movedRef.current = 0;
      detachDragListeners();
    };

    windowHandlersRef.current = { move, end };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", end);
  };

  return (
    <div
      className={`marquee ${viewportClassName ?? ""} ${isDragging ? "is-dragging" : ""} ${className ?? ""}`}
      ref={viewportRef}
      role={ariaLabel ? "region" : undefined}
      aria-label={ariaLabel}
      aria-roledescription="carrossel"
      onPointerDown={handlePointerDown}
      onKeyDownCapture={(event) => {
        // ativação por teclado não passa por pointerdown: zera o sinal de arraste
        if (event.key === "Enter" || event.key === " " || event.key === "Spacebar") {
          suppressClickRef.current = false;
        }
      }}
      onClickCapture={(event) => {
        // arraste não deve acionar cliques dos itens (ex.: lightbox)
        if (!suppressClickRef.current) return;
        suppressClickRef.current = false;
        event.preventDefault();
        event.stopPropagation();
      }}
    >
      {hint ? <span className="sr-only">{hint}</span> : null}
      <div className="marquee-track" ref={trackRef}>
        {Array.from({ length: sets }).flatMap((_, setIndex) =>
          items.map((item, itemIndex) => (
            <div
              className="marquee-item"
              key={`${setIndex}-${itemIndex}`}
              aria-hidden={setIndex > 0 ? "true" : undefined}
            >
              {item}
            </div>
          )),
        )}
      </div>
    </div>
  );
}
