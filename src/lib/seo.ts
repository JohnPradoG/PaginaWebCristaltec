import { getSiteUrl, isWhatsAppConfigured, siteConfig } from "@/config/site";
import { faqs } from "@/content/faq";

export const defaultDescription =
  "CRISTALTE: soluciones a medida en aluminio, vidrio y PVC. Cerramientos de terrazas, shower doors, ventanas de aluminio y PVC, puertas, espejos y barandas de vidrio. Cotiza por WhatsApp.";

export function absoluteUrl(path = "/") {
  return `${getSiteUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Datos estructurados LocalBusiness. Solo incluye información real: los campos
 * vacíos en src/config/site.ts se omiten.
 */
export function localBusinessJsonLd() {
  const c = siteConfig.contact;
  const sameAs = Object.values(siteConfig.social).filter(Boolean);
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": absoluteUrl("/#empresa"),
    name: siteConfig.name,
    description: defaultDescription,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/brand/cristalte-icono-512.png"),
    image: absoluteUrl("/og-image.png"),
  };
  if (siteConfig.legalName) data.legalName = siteConfig.legalName;
  if (c.phone) data.telephone = c.phone;
  else if (isWhatsAppConfigured()) data.telephone = `+${siteConfig.whatsappNumber}`;
  if (c.email) data.email = c.email;
  if (c.address || c.commune) {
    data.address = {
      "@type": "PostalAddress",
      ...(c.address ? { streetAddress: c.address } : {}),
      ...(c.commune ? { addressLocality: c.commune } : {}),
      addressCountry: "CL",
    };
  }
  if (c.serviceAreas.length > 0) data.areaServed = c.serviceAreas;
  if (sameAs.length > 0) data.sameAs = sameAs;
  return data;
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

/** Serializa JSON-LD de forma segura para incrustarlo en <script>. */
export function jsonLdScript(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
