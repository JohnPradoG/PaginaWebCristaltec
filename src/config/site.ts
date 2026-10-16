/**
 * ============================================================================
 *  DATOS COMERCIALES DE CRISTALTE — ÚNICO ARCHIVO PARA EDITAR
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
  name: "CRISTALTE",

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
   * Hoy es la dirección gratuita y PÚBLICA de Vercel. Otras direcciones de
   * Vercel del proyecto (…-vano6.vercel.app, …-git-…) piden iniciar sesión y
   * Google no puede verlas: no las uses aquí.
   *
   * Cuando compres el dominio definitivo (ej. "https://www.cristalte.cl"),
   * cámbialo aquí o define la variable NEXT_PUBLIC_SITE_URL en Vercel, y sigue
   * los pasos de "Dominio propio" en el README.
   */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://cristalte-web.vercel.app",

  /**
   * NÚMERO DE WHATSAPP (WHATSAPP_NUMBER)
   * Formato internacional, solo dígitos, sin "+", espacios ni guiones.
   * En Chile: 56 + 9 + 8 dígitos. Ejemplo de FORMATO (no es un número real): 569XXXXXXXX
   *
   * PENDIENTE: mientras esté vacío, los botones de WhatsApp llevan al formulario
   * de cotización en lugar de abrir un enlace inválido, y `npm run verificar`
   * avisa que falta.
   */
  whatsappNumber: "",

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
    address: null as string | null,
    /** Comuna principal donde está la empresa. Ej.: "Maipú". */
    commune: null as string | null,
    /** Región. Ej.: "Región Metropolitana". */
    region: null as string | null,
    /**
     * Comunas o zonas donde trabajan, si está confirmado.
     * Se muestra en Preguntas frecuentes y se usa en SEO local.
     */
    serviceAreas: [] as string[],
    /** Horario de atención. Ej.: ["Lunes a viernes: 9:00 a 18:00"]. */
    hours: [] as string[],
    /** URL de inserción de Google Maps (Compartir → Insertar un mapa → src del iframe). */
    mapEmbedUrl: null as string | null,
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

  /** Mensaje de WhatsApp general. */
  whatsappGeneralMessage:
    "Hola, vengo desde la página web de CRISTALTE y quisiera solicitar una cotización. Me interesa conocer las opciones disponibles para mi proyecto.",
};

export type SiteConfig = typeof siteConfig;

/**
 * Texto de ubicación para títulos SEO, solo con datos confirmados.
 * Ej.: con commune "Maipú" los títulos quedan "Ventanas de aluminio a medida en Maipú".
 */
export function seoLocation(): string | null {
  return siteConfig.contact.commune?.trim() || null;
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
