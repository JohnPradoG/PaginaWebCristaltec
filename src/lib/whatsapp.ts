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
    `Hola, vengo desde la página web de CRISTALTE y quisiera cotizar el servicio de ${serviceName}. ¿Me pueden orientar sobre las opciones disponibles?`,

  similarProject: (projectTitle: string, category: string) =>
    `Hola, vengo desde la página web de CRISTALTE. Vi el proyecto "${projectTitle}" (${category}) y me interesa cotizar algo similar.`,

  project: () =>
    "Hola, vengo desde la página web de CRISTALTE. Tengo un proyecto en mente y quisiera recibir asesoría y una cotización.",

  quoteForm: (data: QuoteFormData) => {
    const lines = [
      "Hola, vengo desde la página web de CRISTALTE y quiero solicitar una cotización.",
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

export type QuoteFormData = {
  name: string;
  phone: string;
  commune: string;
  service: string;
  description: string;
  budget?: string;
};
