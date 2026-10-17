import type { ReactNode } from "react";
import { buildWhatsAppUrl, QUOTE_FORM_HREF } from "@/lib/whatsapp";

type Props = {
  message: string;
  children: ReactNode;
  className?: string;
  /** Texto accesible cuando el contenido visible no describe la acción completa. */
  ariaLabel?: string;
  /** Destino si el número aún no está configurado. Por defecto, el formulario de la portada. */
  fallbackHref?: string;
  /** Dónde está el botón, para medir qué botones generan consultas (ej. "servicio:ventanas-de-aluminio"). */
  trackLabel?: string;
};

/**
 * Enlace a WhatsApp con un mensaje prearmado.
 * Si el número aún no está configurado, lleva al formulario de cotización
 * para que el botón nunca quede roto.
 */
export function WhatsAppLink({ message, children, className, ariaLabel, fallbackHref = QUOTE_FORM_HREF, trackLabel }: Props) {
  const url = buildWhatsAppUrl(message);
  if (!url) {
    return (
      <a href={fallbackHref} className={className} aria-label={ariaLabel} data-whatsapp="pending" data-track={trackLabel}>
        {children}
      </a>
    );
  }
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={ariaLabel ? `${ariaLabel} (se abre WhatsApp)` : undefined}
      data-whatsapp="ready"
      data-track={trackLabel}
    >
      {children}
    </a>
  );
}
