import { isWhatsAppConfigured, siteConfig } from "@/config/site";

/** Destino de respaldo cuando el número de WhatsApp todavía no está configurado. */
export const QUOTE_FORM_HREF = "/#cotizar";

/**
 * Genera el enlace de WhatsApp con el mensaje codificado para URL.
 * Si el número no está configurado devuelve `null`, para que nunca se publique
 * un enlace inválido.
 */
export function buildWhatsAppUrl(message: string): string | null {
  if (!isWhatsAppConfigured()) return null;
  const number = siteConfig.whatsappNumber.trim();
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export const whatsappMessages = {
  general: () => siteConfig.whatsappGeneralMessage,

  service: (serviceName: string) =>
    `Hola, vengo desde la página web de CRISTALTEC y quisiera cotizar el servicio de ${serviceName}. ¿Me pueden orientar sobre las opciones disponibles?`,

  similarProject: (projectTitle: string, category: string) =>
    `Hola, vengo desde la página web de CRISTALTEC. Vi el proyecto "${projectTitle}" (${category}) y me interesa cotizar algo similar.`,

  project: () =>
    "Hola, vengo desde la página web de CRISTALTEC. Tengo un proyecto en mente y quisiera recibir asesoría y una cotización.",

  quoteForm: (data: QuoteFormData) => {
    const lines = [
      "Hola, vengo desde la página web de CRISTALTEC y quiero solicitar una cotización.",
      "",
      `*Nombre:* ${data.name}`,
      `*Teléfono / WhatsApp:* ${data.phone}`,
      `*Comuna:* ${data.commune}`,
      `*Servicio:* ${data.service}`,
      `*Descripción del proyecto:* ${data.description}`,
    ];
    if (data.budget) lines.push(`*Presupuesto aproximado:* ${data.budget}`);
    lines.push("", "Puedo enviar fotografías del espacio por este chat.");
    return lines.join("\n");
  },
};

export type CommercialQuoteData = {
  company: string;
  name: string;
  phone: string;
  email: string;
  commune: string;
  projectType: string;
  services: string[];
  quantity: string;
  timeline: string;
  plans: string;
  description: string;
};

/** Mensaje del formulario de proyectos comerciales (WhatsApp o correo). */
export function commercialMessage(d: CommercialQuoteData) {
  const lines = [
    `Hola, vengo desde la página web de ${siteConfig.name} y quiero solicitar una cotización para un proyecto comercial.`,
    "",
    `*Empresa:* ${d.company}`,
    `*Contacto:* ${d.name}`,
    `*Teléfono:* ${d.phone}`,
  ];
  if (d.email) lines.push(`*Correo:* ${d.email}`);
  lines.push(`*Comuna del proyecto:* ${d.commune}`, `*Tipo de proyecto:* ${d.projectType}`, `*Servicios:* ${d.services.join(", ")}`);
  if (d.quantity) lines.push(`*Cantidad aproximada:* ${d.quantity}`);
  if (d.timeline) lines.push(`*Plazo:* ${d.timeline}`);
  if (d.plans) lines.push(`*Planos:* ${d.plans}`);
  lines.push(`*Descripción:* ${d.description}`);
  return lines.join("\n");
}

export type QuoteFormData = {
  name: string;
  phone: string;
  commune: string;
  service: string;
  description: string;
  budget?: string;
};
