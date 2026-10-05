"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { LINKS } from "@/lib/links";
import { IconClose, IconMenu, IconWhatsapp } from "@/components/icons";
import { WhatsappLink } from "@/components/ExitLink";

const NAV = [
  { href: "#solucoes", label: "Soluções" },
  { href: "#ebot", label: "Produtos" },
  { href: "#cases", label: "Cases" },
  { href: "#processo", label: "Como trabalhamos" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="site-container site-nav">
        <a className="site-brand" href="#inicio" aria-label="Ê-Sistemas — início">
          <Image src="/logo-esistemas.webp" alt="Ê-Sistemas" width={250} height={50} priority style={{ width: "158px", height: "auto" }} />
        </a>
        <nav className="desktop-nav" aria-label="Navegação principal">
          {NAV.map((item) => (
            <a className="nav-link" key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <WhatsappLink className="button button-primary header-cta" href={LINKS.specialist}>
          <IconWhatsapp /> Falar com um especialista <span aria-hidden="true">↗</span>
        </WhatsappLink>
        <button
          className="menu-toggle"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <IconClose /> : <IconMenu />}
        </button>
      </div>
      {open ? (
        <nav className="mobile-nav site-container" id="mobile-navigation" aria-label="Navegação móvel">
          {NAV.map((item) => (
            <a className="mobile-nav-link" key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
          <WhatsappLink
            className="button button-primary mobile-nav-cta"
            href={LINKS.specialist}
            onClick={() => setOpen(false)}
          >
            <IconWhatsapp /> Falar com um especialista <span aria-hidden="true">↗</span>
          </WhatsappLink>
        </nav>
      ) : null}
    </header>
  );
}
