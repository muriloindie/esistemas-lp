"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { IconArrow } from "@/components/icons";

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    document.documentElement.classList.add("has-reveal-js");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("in");
            io.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -50px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

export function Section({
  id,
  children,
  className = "",
  tight = false,
  tone = "light",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tight?: boolean;
  tone?: "light" | "dark" | "band";
}) {
  const toneClass = tone === "light" ? "" : `section-${tone}`;
  return (
    <section id={id} className={`section ${tight ? "section-tight" : ""} ${toneClass} ${className}`}>
      <div className="wrap">{children}</div>
    </section>
  );
}

export function HeadBlock({
  eyebrow,
  title,
  lead,
  center = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  center?: boolean;
}) {
  return (
    <Reveal>
      <div className={`head-block ${center ? "center" : ""}`}>
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
        <h2 className="h2">{title}</h2>
        {lead ? <p className="lead">{lead}</p> : null}
      </div>
    </Reveal>
  );
}

export function Chip({ children }: { children: ReactNode }) {
  return <span className="chip">{children}</span>;
}

export function Btn({
  href = "#",
  variant = "primary",
  small = false,
  children,
  arrow = true,
}: {
  href?: string;
  variant?: "primary" | "ghost";
  small?: boolean;
  children: ReactNode;
  arrow?: boolean;
}) {
  return (
    <a className={`btn btn-${variant} ${small ? "btn-sm" : ""}`} href={href}>
      {children}
      {arrow ? <IconArrow className="icon" /> : null}
    </a>
  );
}
