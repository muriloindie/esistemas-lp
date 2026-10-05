"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type P = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  o: number;
  warm: boolean;
};

export default function BackgroundFX() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let pts: P[] = [];

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.width = window.innerWidth * dpr;
      h = canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      const n = Math.min(110, Math.floor((window.innerWidth * window.innerHeight) / 16000));
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.34 * dpr,
        vy: (Math.random() - 0.5) * 0.34 * dpr,
        r: (Math.random() * 1.8 + 0.9) * dpr,
        o: Math.random() * 0.5 + 0.3,
        warm: Math.random() < 0.4,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const maxD = 155 * dpr;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i];
          const b = pts[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < maxD) {
            const alpha = (1 - d / maxD) * 0.22;
            ctx.strokeStyle =
              a.warm && b.warm
                ? `rgba(243, 166, 23, ${alpha * 1.7})`
                : a.warm || b.warm
                  ? `rgba(214, 160, 70, ${alpha * 1.15})`
                  : `rgba(150, 138, 118, ${alpha})`;
            ctx.lineWidth = 1 * dpr;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      for (const p of pts) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.warm
          ? `rgba(243, 166, 23, ${p.o * 0.9})`
          : `rgba(140, 130, 112, ${p.o * 0.62})`;
        ctx.fill();
      }
    };

    const step = () => {
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }
      draw();
      raf = window.requestAnimationFrame(step);
    };

    resize();
    window.addEventListener("resize", resize);
    if (reduced) {
      draw();
    } else {
      step();
    }

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);

  return (
    <>
      <canvas ref={ref} className="fx-canvas" aria-hidden="true" />
      <div className="orb orb-a" aria-hidden="true" />
      <div className="orb orb-b" aria-hidden="true" />
      <div className="orb orb-c" aria-hidden="true" />
    </>
  );
}
