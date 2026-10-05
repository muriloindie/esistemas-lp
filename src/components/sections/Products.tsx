import Image from "next/image";
import type { ReactNode } from "react";
import { whatsappLink } from "@/lib/links";
import {
  IconArrow,
  IconBolt,
  IconCamera,
  IconChart,
  IconChat,
  IconCheckCircle,
  IconCompass,
  IconEye,
  IconLayers,
  IconMap,
  IconPin,
  IconPulse,
  IconRefresh,
  IconSpark,
  IconStar,
  IconTarget,
  IconUsers,
  IconWhatsapp,
} from "@/components/icons";
import { WhatsappLink } from "@/components/ExitLink";
import { Reveal } from "@/components/ui";

function ProductIcon({ src }: { src: string }) {
  return (
    <span className="product-icon product-icon-image">
      <Image src={src} alt="" fill sizes="72px" />
    </span>
  );
}

type Kpi = {
  icon: ReactNode;
  label: string;
  value: string;
  delta: string;
  note: string;
  down?: boolean;
};

/**
 * Shell comum dos dois dashboards (Ê-Bot Panel e Ê-Bot Clinical).
 * A estrutura espelha as telas de referência em `ebot/imagens/`: barra lateral,
 * topbar com busca e pills de status, saudação, fileira de KPIs e dois painéis.
 * Todo o conteúdo é ilustrativo e fica fora da árvore de acessibilidade.
 */
function DashboardMock({
  tone,
  greeting,
  sub,
  kpis,
  children,
}: {
  tone: "panel" | "clinical";
  greeting: string;
  sub: string;
  kpis: Kpi[];
  children: ReactNode;
}) {
  return (
    <div className={`ui-frame ui-frame-${tone}`} aria-hidden="true">
      <aside className="ui-side">
        <span className="ui-side-brand">
          <i>EB</i>
          <b>
            Ê-Bot<small>Painel operacional</small>
          </b>
        </span>
        <span className="ui-side-fold">‹ Recolher menu</span>
        <small className="ui-side-group">ACESSO RÁPIDO</small>
        <ul className="ui-nav">
          <li className="is-active">Dashboard</li>
          <li>
            Atendimentos <em>9</em>
          </li>
          <li>CRM</li>
          <li>Agenda</li>
          <li>Kanban</li>
          <li>Tarefas</li>
        </ul>
        <small className="ui-side-group">AUTOMAÇÃO</small>
        <ul className="ui-nav">
          <li>Fluxos de IA</li>
          <li>
            Campanhas <em>8</em>
          </li>
        </ul>
        <span className="ui-side-card">
          <b>Mecânica São Lucas</b>
          <small>IA operando 24/7 nesta empresa</small>
        </span>
      </aside>

      <div className="ui-main">
        <div className="ui-topbar">
          <span className="ui-org">
            <i>EB</i>
            <span>
              <b>Central operacional</b>
              <small>Mecânica São Lucas</small>
            </span>
          </span>
          <span className="ui-search">Buscar cliente, atendimento ou protocolo</span>
          <span className="ui-chip">Hoje, 05 de out</span>
          <span className="ui-pill ui-pill-live">
            <i /> WhatsApp 1/3 online
          </span>
          <span className="ui-avatar">RV</span>
        </div>

        <div className="ui-greet">
          <b>{greeting}</b>
          <small>{sub}</small>
        </div>

        <div className="ui-kpis">
          {kpis.map((kpi) => (
            <span className="ui-kpi" key={kpi.label}>
              <span className="ui-kpi-top">
                <i>{kpi.icon}</i>
                <em className={kpi.down ? "is-down" : undefined}>{kpi.delta}</em>
              </span>
              <small>{kpi.label}</small>
              <b>{kpi.value}</b>
              <u>{kpi.note}</u>
            </span>
          ))}
        </div>

        <div className="ui-panels">{children}</div>
      </div>
    </div>
  );
}

const PIPELINE_KPIs: Kpi[] = [
  { icon: <IconChart />, label: "Pipeline aberto", value: "R$ 63.400", delta: "+12%", note: "em negociação" },
  { icon: <IconTarget />, label: "Leads pela IA", value: "186", delta: "+32%", note: "qualificados hoje" },
  { icon: <IconChat />, label: "Conversão", value: "24%", delta: "+6%", note: "lead até ganho" },
  { icon: <IconPulse />, label: "1ª resposta", value: "18s", delta: "−34%", note: "tempo médio", down: true },
];

const CLINICAL_KPIs: Kpi[] = [
  { icon: <IconUsers />, label: "Atendimentos", value: "1.284", delta: "+18%", note: "no dia" },
  { icon: <IconSpark />, label: "Resolvidos pela IA", value: "73%", delta: "+12%", note: "sem humano" },
  { icon: <IconCheckCircle />, label: "Consultas", value: "312", delta: "+27%", note: "confirmadas" },
  { icon: <IconRefresh />, label: "Espera média", value: "3 min", delta: "−21%", note: "recepção", down: true },
];

const FUNNEL = [
  { label: "Novo lead", count: "4.982", width: "100%" },
  { label: "Qualificado (IA)", count: "2.140", width: "76%" },
  { label: "Em negociação", count: "1.268", width: "54%" },
  { label: "Follow-up", count: "744", width: "34%" },
  { label: "Ganho", count: "318", width: "18%" },
];

const AGENDA = [
  { time: "14:20", who: "Dra. Helena Costa", sub: "Cardiologia · retorno", status: "Confirmado", tone: "is-ok" },
  { time: "15:00", who: "Dr. Marcos Prado", sub: "Clínica geral · retorno", status: "Encaixe automático", tone: "is-auto" },
  { time: "16:40", who: "Lab. Exames", sub: "Hemograma · jejum", status: "Aguardando", tone: "is-wait" },
];

const EXPLORER_TILES = [
  { src: "/ebot-explorer/cards/gastronomia.webp", title: "Gastronomia", sub: "32 lugares", icon: <IconStar /> },
  { src: "/ebot-explorer/cards/cultura.webp", title: "Cultura", sub: "14 pontos", icon: <IconCamera /> },
  { src: "/ebot-explorer/cards/eventos.webp", title: "Eventos", sub: "8 hoje", icon: <IconBolt /> },
  { src: "/ebot-explorer/cards/paisagem.webp", title: "Natureza", sub: "6 trilhas", icon: <IconCompass /> },
  { src: "/ebot-explorer/cards/hospedagem.webp", title: "Hospedagem", sub: "21 opções", icon: <IconEye /> },
  { src: "/ebot-explorer/cards/instituicoes.webp", title: "Museus", sub: "9 visitas", icon: <IconMap /> },
];

const EXPLORER_POIS = [
  { src: "/ebot-explorer/cards/cafe.webp", name: "Café Central", meta: "Centro · 4.8 ★", pos: "one" },
  { src: "/ebot-explorer/cards/cultura.webp", name: "Teatro Guaíra", meta: "Centro · 4.6 ★", pos: "two" },
  { src: "/ebot-explorer/cards/gastronomia.webp", name: "Mercado 3", meta: "Batel · 4.9 ★", pos: "three" },
];

export default function Products() {
  return (
    <section className="section-block products-section" id="ebot">
      <div className="site-container">
        <Reveal className="motion-reveal">
          <div className="section-heading section-heading-split">
            <div>
              <span className="section-kicker">Produtos Ê-Bot</span>
              <h2 className="section-title">Automação que assume o repetitivo e <span>libera a sua equipe.</span></h2>
            </div>
            <p className="section-intro">O ecossistema Ê-Bot combina IA, integração e fluxos automáticos para atender, agendar, lembrar, cobrar e vender sem depender de tarefas manuais. Cada produto automatiza uma frente da operação — e entrega à equipe humana só o que precisa de gente.</p>
          </div>
        </Reveal>

        <div className="product-grid">
          <Reveal className="motion-reveal product-reveal-platform">
          <article className="product-card product-card-platform">
            <div className="product-copy">
              <ProductIcon src="/ebot/icone.webp" />
              <span className="product-eyebrow"><i /> PLATAFORMA DE ATENDIMENTO E AUTOMAÇÃO</span>
              <h3>Ê-Bot <span>Panel + API</span></h3>
              <p>A central que recebe, classifica e resolve. Conversas do WhatsApp, Instagram e site entram em filas, a IA responde o que é repetitivo e só então passa para o humano — tudo sincronizado com o seu ERP, CRM ou sistemas internos via API e webhooks.</p>
              <div className="product-tags"><span>Multiatendimento</span><span>Filas e transferências</span><span>IA e automações</span><span>CRM e Kanban</span><span>Campanhas e disparos</span><span>API e webhooks</span></div>
              <div className="product-stats">
                <span><b>24/7</b><small>IA respondendo</small></span>
                <span><b>1</b><small>central multi-canal</small></span>
                <span><b>API</b><small>webhooks nativos</small></span>
              </div>
              <WhatsappLink className="product-link" href={whatsappLink("Olá! Gostaria de conhecer o Ê-Bot Panel e a Ê-Bot API.")}>
                <IconWhatsapp /> Conhecer o Ê-Bot <IconArrow />
              </WhatsappLink>
            </div>
            <div className="product-visual">
              <DashboardMock
                tone="panel"
                greeting="Bom dia, Ruan Viana"
                sub="Veja como está a operação da empresa hoje: atendimentos, agenda, IA e equipes."
                kpis={PIPELINE_KPIs}
              >
                <div className="ui-panel">
                  <span className="ui-panel-head"><b>Ganos e pipeline por mês</b><em>12 meses</em></span>
                  <div className="ui-bars">
                    {[38, 52, 44, 66, 58, 78, 70, 92, 84, 96, 88, 100].map((height, index) => (
                      <i key={index} style={{ height: `${height}%` }} />
                    ))}
                  </div>
                  <div className="ui-axis"><span>Jan</span><span>Mar</span><span>Mai</span><span>Jul</span><span>Set</span><span>Nov</span></div>
                </div>
                <div className="ui-panel">
                  <span className="ui-panel-head"><b>Leads qualificados pela IA</b><i className="ui-link">Ver CRM →</i></span>
                  <div className="ui-funnel">
                    {FUNNEL.map((row) => (
                      <div className="ui-funnel-row" key={row.label}>
                        <span className="ui-funnel-label"><b>{row.label}</b><em>{row.count}</em></span>
                        <span className="ui-funnel-track"><i style={{ width: row.width }} /></span>
                      </div>
                    ))}
                  </div>
                </div>
              </DashboardMock>
              <span className="preview-disclaimer">Interface ilustrativa</span>
            </div>
          </article>
          </Reveal>

          <Reveal className="motion-reveal product-reveal-vertical" delay={100}>
          <article className="product-card product-card-clinical" id="clinical">
            <div className="product-body">
              <div className="product-card-top"><ProductIcon src="/ebot-clinical/icone.webp" /><span className="product-sector">SAÚDE PÚBLICA E PRIVADA</span></div>
              <span className="product-eyebrow product-eyebrow-light"><i /> AUTOMAÇÃO DE AGENDA E ATENDIMENTO</span>
              <h3>Ê-Bot Clinical</h3>
              <p>A secretária que não dorme: confirma e remarca consultas, responde pacientes 24/7, ocupa a agenda com encaixes automáticos e transforma a conversa da consulta em resumo e plano pós-consulta.</p>
              <ul className="product-feature-list">
                <li><IconRefresh /> Confirmação, lembrete e remarcação por IA</li>
                <li><IconUsers /> Fila inteligente de encaixe em horários vagos</li>
                <li><IconSpark /> Transcrição da consulta com resumo e insights</li>
                <li><IconChat /> CRM com funil, resumos e automações</li>
              </ul>
              <div className="product-stats">
                <span><b>42%</b><small>resolvidos pela IA*</small></span>
                <span><b>3 min</b><small>espera média*</small></span>
                <span><b>96</b><small>consultas confirmadas*</small></span>
                <em className="product-stats-note">*Indicadores ilustrativos</em>
              </div>
              <WhatsappLink className="product-link" href={whatsappLink("Olá! Gostaria de conhecer o Ê-Bot Clinical.")}>
                <IconWhatsapp /> Conhecer o Clinical <IconArrow />
              </WhatsappLink>
            </div>
            <div className="product-visual">
              <DashboardMock
                tone="clinical"
                greeting="Bom dia, Dra. Helena"
                sub="Agenda, confirmações e fila de espera das unidades hoje."
                kpis={CLINICAL_KPIs}
              >
                <div className="ui-panel">
                  <span className="ui-panel-head"><b>Fluxo por hora</b><em>Hoje</em></span>
                  <svg className="ui-line" viewBox="0 0 200 74" preserveAspectRatio="none" aria-hidden="true">
                    <path className="ui-line-grid" d="M0 19 H200 M0 38 H200 M0 57 H200" />
                    <path className="ui-line-area" d="M0 63 L18 55 L36 58 L54 42 L72 46 L90 29 L108 34 L126 21 L144 27 L162 15 L180 20 L200 10 L200 74 L0 74 Z" />
                    <path className="ui-line-path" d="M0 63 L18 55 L36 58 L54 42 L72 46 L90 29 L108 34 L126 21 L144 27 L162 15 L180 20 L200 10" />
                  </svg>
                  <span className="ui-legend"><i className="is-a" /> Agendados <i className="is-b" /> Confirmações <i className="is-c" /> Encaixes</span>
                </div>
                <div className="ui-panel">
                  <span className="ui-panel-head"><b>Agenda inteligente</b><i className="ui-link">Ver agenda →</i></span>
                  <div className="ui-agenda">
                    {AGENDA.map((row) => (
                      <span className="ui-agenda-row" key={row.time}>
                        <i>{row.time}</i>
                        <span>
                          <b>{row.who}</b>
                          <small>{row.sub}</small>
                        </span>
                        <em className={row.tone}>{row.status}</em>
                      </span>
                    ))}
                  </div>
                </div>
              </DashboardMock>
              <span className="preview-disclaimer">Telas e indicadores ilustrativos</span>
            </div>
          </article>
          </Reveal>

          <Reveal className="motion-reveal product-reveal-vertical" delay={180}>
          <article className="product-card product-card-explorer" id="explorer">
            <div className="product-body">
              <div className="product-card-top"><ProductIcon src="/ebot-explorer/icone.webp" /><span className="product-sector">TURISMO & CIDADES</span></div>
              <span className="product-eyebrow product-eyebrow-light"><i /> ATENDIMENTO TURÍSTICO POR IA</span>
              <h3>Ê-Bot Explorer</h3>
              <p>O visitante escaneia o QR Code ou usa o totem e conversa com a cidade: recebe roteiros por tempo e orçamento, eventos e mapas editáveis com base no catálogo aprovado do destino — em português, inglês e espanhol.</p>
              <ul className="product-feature-list">
                <li><IconMap /> QR Code, totem e WhatsApp na mesma base</li>
                <li><IconCompass /> Rotas inteligentes editáveis do passeio</li>
                <li><IconTarget /> Catálogo turístico com curadoria do destino</li>
                <li><IconBolt /> Texto, voz, 3 idiomas e acessibilidade</li>
              </ul>
              <div className="product-stats">
                <span><b>3</b><small>idiomas nativos</small></span>
                <span><b>QR</b><small>totem e WhatsApp</small></span>
                <span><b>editável</b><small>rota no celular</small></span>
              </div>
              <WhatsappLink className="product-link" href={whatsappLink("Olá! Gostaria de conhecer o Ê-Bot Explorer.")}>
                <IconWhatsapp /> Conhecer o Explorer <IconArrow />
              </WhatsappLink>
            </div>
            <div className="product-visual">
              <div className="exp-frame" aria-hidden="true">
                <div className="exp-topbar">
                  <span className="exp-brand"><i>EB</i><span><b>Ê-Bot Explorer</b><small>TOURISM TOTEM</small></span></span>
                  <span className="exp-chip"><IconPin /> Centro histórico</span>
                  <span className="exp-chip exp-chip-lang"><i>PT</i><em>EN</em><em>ES</em></span>
                  <span className="exp-pill">Início</span>
                  <span className="exp-pill">Voltar</span>
                  <span className="exp-pill exp-pill-dark">Gerar rota</span>
                  <span className="exp-pill exp-pill-accent">Abrir Ebot</span>
                </div>

                <div className="exp-body">
                  <div className="exp-map">
                    <span className="exp-bot"><IconSpark /></span>
                    {EXPLORER_POIS.map((poi) => (
                      <span className={`exp-poi exp-poi-${poi.pos}`} key={poi.name}>
                        <i className="exp-poi-thumb"><Image src={poi.src} alt="" fill sizes="84px" /></i>
                        <b><span>{poi.name}</span><small>{poi.meta}</small></b>
                      </span>
                    ))}
                    <span className="exp-map-btn"><IconLayers /></span>
                    <div className="exp-chat">
                      <i><IconSpark /></i>
                      <span>Eu posso montar uma rota inteligente para as próximas horas do seu passeio.</span>
                    </div>
                  </div>

                  <div className="exp-side">
                    <div className="exp-hero">
                      <span className="exp-eyebrow">VOCÊ ESTÁ EM CURITIBA</span>
                      <p>Gerar rota inteligente para explorar <b>Curitiba.</b></p>
                      <small>Escolha tempo, orçamento e acessibilidade e monte um roteiro com o catálogo oficial da cidade.</small>
                      <div className="exp-actions"><i className="is-primary">Gerar rota</i><i>Ver mapa</i><i>Eventos hoje</i></div>
                    </div>
                    <div className="exp-grid">
                      {EXPLORER_TILES.map((tile) => (
                        <span className="exp-tile" key={tile.title}>
                          <Image src={tile.src} alt="" fill sizes="120px" />
                          <i className="exp-tile-icon">{tile.icon}</i>
                          <b><span>{tile.title}</span><small>{tile.sub}</small></b>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <span className="preview-disclaimer">Interface ilustrativa</span>
            </div>
          </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
