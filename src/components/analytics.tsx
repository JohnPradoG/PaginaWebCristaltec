"use client";

import { useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import Script from "next/script";
import { trackEvent } from "@/lib/analytics";

const STORAGE_KEY = "cristalte-medicion";
type Choice = "aceptada" | "rechazada";

function readChoice(): Choice | null {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === "aceptada" || v === "rechazada" ? v : null;
  } catch {
    return null;
  }
}

// Elección de esta visita, por si el navegador no permite guardar datos.
let sessionChoice: Choice | null = null;
const listeners = new Set<() => void>();

function saveChoice(choice: Choice) {
  sessionChoice = choice;
  try {
    window.localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // Sin almacenamiento disponible: la elección vale solo para esta visita.
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/**
 * Google Analytics 4 con consentimiento previo.
 * No carga nada hasta que el visitante acepta. Si analytics.googleAnalyticsId
 * está vacío, este componente no muestra nada.
 */
export function Analytics({ gaId }: { gaId: string }) {
  // En el servidor no se conoce la elección: no se muestra nada hasta cargar en el navegador.
  const choice = useSyncExternalStore<Choice | null | "cargando">(
    subscribe,
    () => sessionChoice ?? readChoice(),
    () => "cargando",
  );

  // Mide los clics en botones de WhatsApp (los que ya tienen número configurado).
  useEffect(() => {
    if (choice !== "aceptada") return;
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.('a[data-whatsapp="ready"]');
      if (!link) return;
      trackEvent("whatsapp_click", {
        ubicacion: link.getAttribute("data-track") ?? undefined,
        pagina: window.location.pathname,
      });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [choice]);

  const decide = (c: Choice) => saveChoice(c);

  return (
    <>
      {choice === "aceptada" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`}
          </Script>
        </>
      )}
      {choice === null && (
        <div
          role="region"
          aria-label="Medición de visitas"
          className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-xl rounded-2xl border border-navy/15 bg-white p-4 text-[15px] text-ink shadow-xl sm:p-5"
        >
          <p>
            Usamos Google Analytics para saber cuántas personas visitan la web y qué servicios consultan. Solo se
            activa si aceptas. <Link href="/privacidad/" className="font-bold text-brand-dark underline">Más información</Link>
          </p>
          <div className="mt-3 flex gap-2">
            <button type="button" onClick={() => decide("aceptada")} className="min-h-11 rounded-lg bg-navy px-4 font-bold text-white">
              Aceptar
            </button>
            <button type="button" onClick={() => decide("rechazada")} className="min-h-11 rounded-lg border border-navy/20 px-4 font-bold text-navy">
              Rechazar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
