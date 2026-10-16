import type { Metadata } from "next";
import { getSiteUrl, isWhatsAppConfigured, siteConfig } from "@/config/site";
import type { FaqItem } from "@/content/faq-types";

export const defaultTitle = "Ventanas, cerramientos y vidrio a medida | CRISTALTE";

export const defaultDescription =
  "CRISTALTE: ventanas de aluminio y PVC, cerramientos de terrazas, shower doors, puertas, espejos y barandas de vidrio a medida. Cotiza por WhatsApp o con el formulario.";

export function absoluteUrl(path = "/") {
  return `${getSiteUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Metadatos de una página: título, descripción, canonical y Open Graph
 * coherentes entre sí. `path` siempre con barra final (ej. "/proyectos/").
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  /** true = el título se usa tal cual, sin agregar " | CRISTALTE". */
  absoluteTitle?: boolean;
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${siteConfig.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      type: "website",
      locale: "es_CL",
      siteName: siteConfig.name,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "CRISTALTE: aluminio, vidrio y diseño" }],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: ["/og-image.png"] },
  };
}

/**
 * Datos estructurados de la empresa. Solo incluye información real: los campos
 * vacíos en src/config/site.ts se omiten.
 *
 * - Con comuna o dirección confirmada: HomeAndConstructionBusiness (un tipo de
 *   LocalBusiness), que Google asocia a negocios locales.
 * - Sin ubicación confirmada: Organization, porque un LocalBusiness sin
 *   dirección no cumple lo que Google pide para negocios locales.
 */
export function businessJsonLd() {
  const c = siteConfig.contact;
  const sameAs = Object.values(siteConfig.social).filter(Boolean);
  const hasLocation = Boolean(c.address || c.commune);
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": hasLocation ? "HomeAndConstructionBusiness" : "Organization",
    "@id": absoluteUrl("/#empresa"),
    name: siteConfig.name,
    description: defaultDescription,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/brand/cristalte-icono-512.png"),
    image: absoluteUrl("/og-image.png"),
    slogan: siteConfig.slogan,
  };
  if (siteConfig.legalName) data.legalName = siteConfig.legalName;
  if (siteConfig.rut) data.taxID = siteConfig.rut;
  if (c.phone) data.telephone = c.phone;
  else if (isWhatsAppConfigured()) data.telephone = `+${siteConfig.whatsappNumber}`;
  if (c.email) data.email = c.email;
  if (hasLocation) {
    data.address = {
      "@type": "PostalAddress",
      ...(c.address ? { streetAddress: c.address } : {}),
      ...(c.commune ? { addressLocality: c.commune } : {}),
      ...(c.region ? { addressRegion: c.region } : {}),
      addressCountry: "CL",
    };
  }
  if (c.serviceAreas.length > 0) {
    data.areaServed = c.serviceAreas.map((name) => ({ "@type": "City", name }));
  }
  if (sameAs.length > 0) data.sameAs = sameAs;
  return data;
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#sitio"),
    name: siteConfig.name,
    url: absoluteUrl("/"),
    inLanguage: "es-CL",
    publisher: { "@id": absoluteUrl("/#empresa") },
  };
}

/**
 * FAQPage: solo con preguntas que se muestran en la misma página.
 * Desde 2023 Google casi no muestra estas preguntas como resultado enriquecido
 * para empresas, pero el marcado sigue siendo válido y ayuda a entender la página.
 */
export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Inicio", path: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Serializa JSON-LD de forma segura para incrustarlo en <script>. */
export function jsonLdScript(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
