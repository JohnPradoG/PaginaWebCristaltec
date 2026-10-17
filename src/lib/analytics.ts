/**
 * MEDICIÓN DE CONVERSIONES
 *
 * Envía eventos a Google Analytics 4 solo si está configurado
 * (analytics.googleAnalyticsId) y el visitante aceptó la medición.
 * No se envían datos personales: solo el nombre del evento, el servicio y
 * desde qué botón se hizo clic.
 *
 * Eventos:
 *  - whatsapp_click: clic en un botón de WhatsApp (parámetro `ubicacion`).
 *  - generate_lead: formulario de cotización completado (abre WhatsApp).
 */

type GtagWindow = Window & { gtag?: (...args: unknown[]) => void };

export function trackEvent(name: string, params: Record<string, string | undefined> = {}) {
  if (typeof window === "undefined") return;
  const gtag = (window as GtagWindow).gtag;
  if (typeof gtag !== "function") return;
  const clean = Object.fromEntries(Object.entries(params).filter(([, v]) => v));
  gtag("event", name, clean);
}
