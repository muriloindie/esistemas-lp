import Image from "next/image";
import { CONTACT, LINKS, SOCIAL } from "@/lib/links";
import { IconArrow, IconBattery, IconCheck, IconFacebook, IconInstagram, IconLock, IconSignal, IconWifi, IconWhatsapp } from "@/components/icons";
import { ExitLink, WhatsappLink } from "@/components/ExitLink";
import { Reveal } from "@/components/ui";

export default function FinalCTA() {
  return (
    <section className="contact-section" id="contato">
      <span className="contact-glow" aria-hidden="true" />
      <div className="site-container contact-layout">
        <div className="contact-copy">
          <span className="contact-kicker"><i /> Vamos conversar</span>
          <h2>
            Um bom projeto começa com <span>uma boa conversa.</span>
          </h2>
          <p>
            Conte o que precisa resolver. Em uma primeira conversa, entendemos o cenário e mostramos
            como a Ê-Sistemas pode estruturar a solução.
          </p>

          <WhatsappLink className="button button-contact" href={LINKS.whatsapp}>
            <IconWhatsapp /> Falar com um especialista <IconArrow />
          </WhatsappLink>

          <span className="contact-note">
            <IconCheck /> Resposta rápida, sem robôs.
          </span>

          <div className="contact-details">
            <div>
              <span>WhatsApp</span>
              <WhatsappLink href={LINKS.whatsapp}>
                <IconWhatsapp className="wa-glyph" />
                {CONTACT.whatsapp}
                <IconArrow />
              </WhatsappLink>
            </div>
            <div>
              <span>E-mail</span>
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email} <IconArrow /></a>
            </div>
            <div>
              <span>Horário</span>
              <strong>Seg–Sex · 8h às 18h</strong>
            </div>
          </div>

          <span className="contact-note">
            <IconLock /> Seus dados ficam só entre nós.
          </span>

          {CONTACT.isDemo ? (
            <p className="demo-contact-note">
              E-mail e WhatsApp são demonstrativos — troque pelos dados oficiais antes de publicar.
            </p>
          ) : null}
        </div>

        <Reveal className="motion-reveal contact-phone-stage">
          <div className="contact-visual">
            <div className="contact-iphone">
              <span className="iphone-hardware-button volume-up" aria-hidden="true" />
              <span className="iphone-hardware-button volume-down" aria-hidden="true" />
              <span className="iphone-hardware-button power" aria-hidden="true" />

              <div className="iphone-screen">
                <span className="dynamic-island" aria-hidden="true" />
                <div className="iphone-statusbar">
                  <span className="sb-time">9:41</span>
                  <div className="sb-icons">
                    <IconSignal />
                    <IconWifi />
                    <IconBattery />
                  </div>
                </div>

                <div className="phone-header contact-phone-header">
                  <span className="phone-avatar"><IconWhatsapp /></span>
                  <span>
                    <strong>Fale com a Ê-Sistemas</strong>
                    <small>escolha o canal ideal</small>
                  </span>
                </div>

                <div className="contact-phone-body">
                  <span className="contact-phone-label">ATENDIMENTO DIRETO</span>

                  <WhatsappLink className="contact-phone-btn contact-phone-btn-wa" href={LINKS.whatsapp}>
                    <span className="contact-phone-btn-icon"><IconWhatsapp /></span>
                    <span className="contact-phone-btn-text">
                      <strong>WhatsApp</strong>
                      <small>{CONTACT.whatsapp}</small>
                    </span>
                    <IconArrow />
                  </WhatsappLink>

                  <ExitLink href={SOCIAL.instagram} label="Instagram" network="instagram" className="contact-phone-btn">
                    <span className="contact-phone-btn-icon"><IconInstagram /></span>
                    <span className="contact-phone-btn-text">
                      <strong>Instagram</strong>
                      <small>@esistemas_</small>
                    </span>
                    <IconArrow />
                  </ExitLink>

                  <ExitLink href={SOCIAL.facebook} label="Facebook" network="facebook" className="contact-phone-btn">
                    <span className="contact-phone-btn-icon"><IconFacebook /></span>
                    <span className="contact-phone-btn-text">
                      <strong>Facebook</strong>
                      <small>/esistemas.dev</small>
                    </span>
                    <IconArrow />
                  </ExitLink>

                  <a className="contact-phone-btn contact-phone-mail" href={`mailto:${CONTACT.email}`}>
                    <span className="contact-phone-btn-text">
                      <strong>E-mail</strong>
                      <small>{CONTACT.email}</small>
                    </span>
                    <IconArrow />
                  </a>

                  <span className="contact-phone-hint">Resposta em horário comercial · Seg a Sex</span>
                </div>

                <div className="phone-input-area">
                  <Image src="/logo-esistemas.webp" alt="Ê-Sistemas" width={110} height={22} className="contact-phone-logo" />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
