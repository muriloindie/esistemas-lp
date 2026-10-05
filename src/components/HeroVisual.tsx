"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { IconBattery, IconSignal, IconWifi, IconWhatsapp } from "@/components/icons";

type Message = { text: string; out: boolean; time: string };

const CONVERSATION: Message[] = [
  { text: "Olá! Quero automatizar o atendimento da minha empresa no WhatsApp.", out: false, time: "14:23" },
  { text: "Olá! Aqui é a Ê-Bot. Cuido de multiatendimento, automações e integração com o seu sistema.", out: true, time: "14:23" },
  { text: "Preciso de multiatendimento e integração com o ERP.", out: false, time: "14:24" },
  { text: "Entendi. Em quanto tempo você precisa colocar a operação no ar?", out: true, time: "14:24" },
  { text: "Nas próximas semanas.", out: false, time: "14:25" },
  { text: "Consigo encaixar uma demonstração hoje às 15h. Posso confirmar esse número?", out: true, time: "14:25" },
  { text: "Pode confirmar, é meu WhatsApp mesmo.", out: false, time: "14:25" },
  { text: "Demo agendada. Já deixei tudo na ficha do lead para a equipe acompanhar.", out: true, time: "14:26" },
];

const LEAD_STEPS = [
  { nome: "—", segmento: "—", interesse: "—", status: "Novo atendimento", score: "Novo lead" },
  { nome: "—", segmento: "—", interesse: "—", status: "Coletando contexto", score: "Lead em atendimento" },
  { nome: "Marina Duarte", segmento: "—", interesse: "—", status: "Lead identificado", score: "Lead em atendimento" },
  { nome: "Marina Duarte", segmento: "Indústria", interesse: "—", status: "Segmento definido", score: "Lead em atendimento" },
  { nome: "Marina Duarte", segmento: "Indústria", interesse: "Multiatendimento + API", status: "Interesse mapeado", score: "Lead em atendimento" },
  { nome: "Marina Duarte", segmento: "Indústria", interesse: "Multiatendimento + API", status: "Demo hoje, 15h", score: "Agendamento confirmado" },
  { nome: "Marina Duarte", segmento: "Indústria", interesse: "Multiatendimento + API", status: "WhatsApp validado", score: "Contato validado" },
  { nome: "Marina Duarte", segmento: "Indústria", interesse: "Multiatendimento + API", status: "Demo confirmada", score: "Agendamento confirmado" },
];

const STEP_MS = 1650;
const CYCLE = CONVERSATION.length + 2;

export default function HeroVisual() {
  const [step, setStep] = useState(0);
  const [reduced, setReduced] = useState(false);
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) {
      setReduced(true);
      setStep(CONVERSATION.length);
      return;
    }
    const timer = setInterval(() => setStep((current) => (current + 1) % CYCLE), STEP_MS);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;
    stack.scrollTo({ top: stack.scrollHeight, behavior: reduced ? "auto" : "smooth" });
  }, [step, reduced]);

  const lead = LEAD_STEPS[Math.min(step, LEAD_STEPS.length - 1)];
  const visible = CONVERSATION.slice(0, Math.min(step, CONVERSATION.length));

  return (
    <div className="hero-visual" aria-label="Fluxo demonstrativo de atendimento e ficha de lead">
      <div className="iphone-stage">
        <div className="iphone-css">
          <span className="iphone-hardware-button volume-up" aria-hidden="true" />
          <span className="iphone-hardware-button volume-down" aria-hidden="true" />
          <span className="iphone-hardware-button power" aria-hidden="true" />

          <div className="iphone-screen">
            <span className="dynamic-island" aria-hidden="true" />
            <div className="iphone-statusbar">
              <span className="sb-time">14:23</span>
              <div className="sb-icons">
                <IconSignal />
                <IconWifi />
                <IconBattery />
              </div>
            </div>

            <div className="phone-header">
              <span className="phone-avatar"><IconWhatsapp /></span>
              <span>
                <strong className="phone-title-text">Atendimento Ê-Bot</strong>
                <span className="phone-title-logo">
                  <Image src="/logo-esistemas.webp" alt="Ê-Sistemas" width={118} height={24} />
                </span>
                <span>respondendo agora</span>
              </span>
            </div>

            <div className="message-stack" ref={stackRef}>
              <span className="spacer" />
              {visible.map((message, index) => (
                <div className={`phone-bubble ${message.out ? "out" : ""}`} key={`${index}-${message.time}`}>
                  {message.text}
                  <span className="msg-time">{message.time}</span>
                </div>
              ))}
              {step === 0 || step >= CONVERSATION.length ? null : (
                <span className="phone-typing" aria-hidden="true"><i /><i /><i /></span>
              )}
            </div>

            <div className="phone-input-area"><div className="phone-input" /></div>
          </div>
        </div>

        <div className="data-pipe" aria-hidden="true"><div className="pipe-line" /></div>

        <article className="lead-card">
          <span className="lead-score">{lead.score}</span>
          <h3>Ficha do lead</h3>
          <div className="lead-row"><span>Nome</span><strong key={`n-${lead.nome}`}>{lead.nome}</strong></div>
          <div className="lead-row"><span>Segmento</span><strong key={`s-${lead.segmento}`}>{lead.segmento}</strong></div>
          <div className="lead-row"><span>Interesse</span><strong key={`i-${lead.interesse}`}>{lead.interesse}</strong></div>
          <div className="lead-row"><span>Status</span><strong key={`t-${lead.status}`}>{lead.status}</strong></div>
        </article>
      </div>
    </div>
  );
}
