"use client";

import { ExitLink } from "@/components/ExitLink";
import { SOCIAL } from "@/lib/links";
import { IconFacebook, IconInstagram } from "@/components/icons";

export default function SocialLinks({ label = "Redes sociais" }: { label?: string }) {
  return (
    <div className="social-links">
      <span className="social-links-label">{label}</span>
      <ExitLink href={SOCIAL.instagram} label="Instagram" network="instagram" className="social-link">
        <IconInstagram />
        <span>Instagram</span>
      </ExitLink>
      <ExitLink href={SOCIAL.facebook} label="Facebook" network="facebook" className="social-link">
        <IconFacebook />
        <span>Facebook</span>
      </ExitLink>
    </div>
  );
}
