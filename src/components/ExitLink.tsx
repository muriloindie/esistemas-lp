"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { IconArrow, IconFacebook, IconInstagram, IconWhatsapp, IconClose } from "@/components/icons";
import { CONTACT } from "@/lib/links";

type Network = "instagram" | "facebook" | "whatsapp";

type ExitRequest = {
  href: string;
  label: string;
  network: Network;
};

type ExitState = ExitRequest & { phase: "opening" | "open" | "closing" };

const ExitContext = createContext<(request: ExitRequest) => void>(() => {});

export function useExitLink() {
  return useContext(ExitContext);
}

const NETWORK_META: Record<Network, { name: string; domain: string; icon: ReactNode }> = {
  instagram: {
    name: "Instagram",
    domain: "instagram.com/esistemas_",
    icon: <IconInstagram />,
  },
  facebook: {
    name: "Facebook",
    domain: "facebook.com/esistemas.dev",
    icon: <IconFacebook />,
  },
  whatsapp: {
    name: "WhatsApp",
    domain: `wa.me · ${CONTACT.whatsapp}`,
    icon: <IconWhatsapp />,
  },
};

/**
 * Link externo de rede social: em vez de navegar direto, abre um modal
 * avisando que a pessoa vai sair da página, com botões Continuar / Voltar.
 */
export function ExitLink({
  href,
  label,
  network,
  className,
  children,
}: {
  href: string;
  label: string;
  network: Network;
  className?: string;
  children: ReactNode;
}) {
  const requestExit = useExitLink();

  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      data-network={network}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        requestExit({ href, label, network });
      }}
    >
      {children}
    </a>
  );
}

/**
 * Link para o WhatsApp: em vez de navegar direto, abre o mesmo modal de
 * confirmação usado pelas redes sociais.
 */
export function WhatsappLink({
  href,
  className,
  label = "WhatsApp da Ê-Sistemas",
  onClick,
  children,
}: {
  href: string;
  className?: string;
  label?: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  const requestExit = useExitLink();

  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      data-network="whatsapp"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        requestExit({ href, label, network: "whatsapp" });
        onClick?.();
      }}
    >
      {children}
    </a>
  );
}

export function ExitLinkProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ExitState | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const open = useCallback((request: ExitRequest) => {
    if (typeof document !== "undefined") {
      returnFocusRef.current = document.activeElement as HTMLElement | null;
    }
    setState({ ...request, phase: "opening" });
  }, []);

  const close = useCallback(() => {
    setState((current) => (current && current.phase !== "closing" ? { ...current, phase: "closing" } : current));
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setState(null), 380);
  }, []);

  // entrada: aplica a classe "open" no quadro seguinte para disparar a transição
  const phase = state?.phase;
  useEffect(() => {
    if (phase !== "opening") return;
    const frame = requestAnimationFrame(() => {
      setState((current) => (current ? { ...current, phase: "open" } : current));
    });
    return () => cancelAnimationFrame(frame);
  }, [phase]);

  // trava o scroll e devolve o foco ao elemento de origem
  const isOpen = state !== null;
  useEffect(() => {
    if (!isOpen) return;
    const body = document.body;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    const focusable = cardRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    focusable?.[focusable.length > 1 ? focusable.length - 2 : 0]?.focus();

    return () => {
      body.style.overflow = previousOverflow;
      returnFocusRef.current?.focus?.();
    };
  }, [isOpen]);

  // Esc fecha, Tab cicla dentro do modal
  useEffect(() => {
    if (!state) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab" || !cardRef.current) return;
      const items = Array.from(
        cardRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
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
  }, [state, close]);

  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current); }, []);

  const meta = state ? NETWORK_META[state.network] : null;

  return (
    <ExitContext.Provider value={open}>
      {children}
      {state && meta ? (
        <div
          className={`exit-modal ${state.phase === "open" ? "is-open" : ""}`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <div className="exit-modal-backdrop" aria-hidden="true" />
          <div
            className="exit-modal-card"
            ref={cardRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="exit-modal-title"
            aria-describedby="exit-modal-description"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button className="exit-modal-close" type="button" onClick={close} aria-label="Fechar aviso">
              <IconClose />
            </button>

            <span
              className={`exit-modal-icon ${state.network === "whatsapp" ? "is-whatsapp" : ""}`}
              aria-hidden="true"
            >
              {meta.icon}
            </span>
            <span className="exit-modal-kicker">LINK EXTERNO · {meta.name.toUpperCase()}</span>
            <h2 id="exit-modal-title">Você está saindo da Ê-Sistemas</h2>
            <p id="exit-modal-description">
              {state.network === "whatsapp"
                ? "Para continuar, você será levado para uma conversa no WhatsApp com a equipe da Ê-Sistemas em uma nova aba:"
                : "Para continuar, você será levado ao " + meta.name + " da Ê-Sistemas em uma nova aba:"}
              <strong>{meta.domain}</strong>
            </p>

            <div className="exit-modal-actions">
              <button className="exit-modal-cancel" type="button" onClick={close}>
                Permanecer aqui
              </button>
              <a className="exit-modal-confirm" href={state.href} target="_blank" rel="noreferrer noopener" onClick={close}>
                Continuar <IconArrow />
              </a>
            </div>

            <span className="exit-modal-hint">Esc para cancelar</span>
          </div>
        </div>
      ) : null}
    </ExitContext.Provider>
  );
}
