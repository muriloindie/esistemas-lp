// Número provisório derivado dos materiais de referência. Confirmar antes de publicar.
const DEMO_WHATSAPP_NUMBER = "5546991130554";

export const CONTACT = {
  whatsapp: "+55 (46) 99113-0554",
  email: "comercial.ebot@esistemas.dev.br",
  isDemo: true,
};

export const SOCIAL = {
  instagram: "https://www.instagram.com/esistemas_/",
  facebook: "https://www.facebook.com/esistemas.dev/",
} as const;

export type SocialKey = keyof typeof SOCIAL;

export function whatsappLink(message: string) {
  return `https://wa.me/${DEMO_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const LINKS = {
  specialist: whatsappLink("Olá! Gostaria de conversar sobre um projeto com a Ê-Sistemas."),
  solutions: "#solucoes",
  ebot: "#ebot",
  ebotApi: "#ebot",
  ebotPanel: "#ebot",
  ebotClinical: "#clinical",
  ebotExplorer: "#explorer",
  whatsapp: whatsappLink("Olá! Gostaria de falar com um especialista da Ê-Sistemas."),
  instagram: SOCIAL.instagram,
  facebook: SOCIAL.facebook,
};
