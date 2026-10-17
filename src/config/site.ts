/**
 * ============================================================================
 *  DATOS COMERCIALES DE CRISTALTEC — ÚNICO ARCHIVO PARA EDITAR
 * ============================================================================
 *
 * Todos los datos de contacto y del negocio se configuran aquí. El resto del
 * sitio los lee desde este archivo, así no hay que buscar por todo el código.
 *
 * Reglas:
 *  - Deja en `null` (o en "") cualquier dato que todavía no esté confirmado.
 *    Un dato en `null` simplemente NO se muestra en la web.
 *  - No escribas datos de ejemplo: todo lo que pongas aquí se publica.
 *  - Antes de publicar, ejecuta `npm run verificar` para revisar qué falta.
 */

export const siteConfig = {
  /** Nombre comercial. */
  name: "CRISTALTEC",

  /** Razón social, solo si quieres mostrarla en el pie de página. */
  legalName: null as string | null,

  /** RUT de la empresa, solo si quieres mostrarlo. */
  rut: null as string | null,

  slogan: "Transformamos tus espacios",
  tagline: "Soluciones en aluminio, vidrio y PVC diseñadas para tu hogar y negocio",

  /**
   * DIRECCIÓN DEL SITIO (DOMINIO). Sin barra al final.
   * Se usa para la URL canónica, el sitemap, robots.txt y Open Graph.
   *
   * Dominio propio comprado en NIC Chile. La dirección gratuita
   * cristalte-web.vercel.app redirige aquí (ver vercel.json). Otras direcciones
   * de Vercel del proyecto (…-vano6.vercel.app, …-git-…) piden iniciar sesión y
   * Google no puede verlas: no las uses aquí.
   */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://cristaltecsantiago.cl",

  /**
   * NÚMERO DE WHATSAPP (WHATSAPP_NUMBER)
   * Formato internacional, solo dígitos, sin "+", espacios ni guiones.
   * En Chile: 56 + 9 + 8 dígitos. Ejemplo de FORMATO (no es un número real): 569XXXXXXXX
   *
   * Si se deja vacío, los botones de WhatsApp llevan al formulario de cotización
   * en lugar de abrir un enlace inválido, y `npm run verificar` avisa que falta.
   * Número principal confirmado por John (2026-10-17): lo usan todos los botones.
   */
  whatsappNumber: "56945165347",
  /** Segundo WhatsApp confirmado por John (2026-10-17). Solo se muestra en Contacto. */
  whatsappSecondaryNumber: "56994877066" as string | null,

  contact: {
    /** Teléfono para llamadas, tal como quieres que se lea. Ej.: "+56 9 XXXX XXXX". */
    phone: null as string | null,
    /** Correo de contacto. */
    email: null as string | null,
    /**
     * Dirección del taller o local. Solo si se atiende público en ese lugar.
     * Si trabajan en el domicilio del cliente desde una casa particular, déjalo
     * en null: la empresa se presenta como "empresa de área de servicio" y no se
     * publica ninguna dirección.
     */
    address: "Nueva Recoleta 3795" as string | null,
    /** Comuna principal donde está la empresa. Ej.: "Maipú". */
    commune: "Recoleta" as string | null,
    /** Región. Ej.: "Región Metropolitana". */
    region: "Región Metropolitana" as string | null,
    /**
     * Comunas o zonas donde trabajan, si está confirmado.
     * Se muestra en Preguntas frecuentes y se usa en SEO local.
     */
    serviceAreas: ["Santiago"] as string[],
    /**
     * Zona que se suma a los títulos SEO de los servicios (ej. "… en Santiago").
     * Si está vacía se usa la comuna.
     */
    seoArea: "Santiago" as string | null,
    /** Horario de atención. Ej.: ["Lunes a viernes: 9:00 a 18:00"]. */
    hours: [] as string[],
    /** URL de inserción de Google Maps (Compartir → Insertar un mapa → src del iframe). */
    mapEmbedUrl: "https://www.google.com/maps?q=Nueva+Recoleta+3795,+Recoleta,+Regi%C3%B3n+Metropolitana,+Chile&output=embed" as string | null,
    /** Enlace "Cómo llegar" que abre Google Maps. */
    mapLink: "https://www.google.com/maps/search/?api=1&query=Nueva+Recoleta+3795,+Recoleta,+Regi%C3%B3n+Metropolitana,+Chile" as string | null,
  },

  social: {
    /** URL completa del perfil. Ej.: "https://www.instagram.com/usuario". */
    instagram: null as string | null,
    facebook: null as string | null,
    tiktok: null as string | null,
  },

  analytics: {
    /** ID de medición de Google Analytics 4. Ej.: "G-XXXXXXXXXX". */
    googleAnalyticsId: null as string | null,
    /** Código de verificación de Google Search Console (etiqueta HTML, solo el valor de content). */
    googleSiteVerification: null as string | null,
    /** Código de verificación de Bing Webmaster Tools (etiqueta msvalidate.01, solo el valor de content). */
    bingSiteVerification: null as string | null,
  },

  forms: {
    /**
     * Destino del formulario de proyectos comerciales, además de WhatsApp.
     * URL de un servicio que reciba formularios y los envíe a tu correo, por
     * ejemplo Formspree ("https://formspree.io/f/xxxxxxx"). Debe aceptar POST
     * con JSON. Mientras esté en null, el formulario abre WhatsApp; si tampoco
     * hay número, avisa que todavía no se puede enviar (nunca simula un envío).
     */
    commercialEndpoint: null as string | null,
  },

  /** Mensaje de WhatsApp general. */
  whatsappGeneralMessage:
    "Hola, vengo desde la página web de CRISTALTEC y quisiera solicitar una cotización. Me interesa conocer las opciones disponibles para mi proyecto.",
};

export type SiteConfig = typeof siteConfig;

/**
 * Texto de ubicación para títulos SEO, solo con datos confirmados.
 * Ej.: con commune "Maipú" los títulos quedan "Ventanas de aluminio a medida en Maipú".
 */
export function seoLocation(): string | null {
  return siteConfig.contact.seoArea?.trim() || siteConfig.contact.commune?.trim() || null;
}

/** URL del sitio sin barra final. Usa localhost mientras el dominio esté pendiente. */
export function getSiteUrl(): string {
  const url = siteConfig.siteUrl.trim().replace(/\/+$/, "");
  return url || "http://localhost:3000";
}

/** true cuando el número de WhatsApp tiene un formato internacional válido. */
export function isWhatsAppConfigured(): boolean {
  return /^[1-9]\d{7,14}$/.test(siteConfig.whatsappNumber.trim());
}
