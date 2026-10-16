"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import { isWhatsAppConfigured, siteConfig } from "@/config/site";
import { services } from "@/content/services";
import { buildWhatsAppUrl, commercialMessage, type CommercialQuoteData } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { WhatsAppIcon } from "../icons";
import { btn } from "../ui";

type Errors = Partial<Record<keyof CommercialQuoteData, string>>;
type Status = "idle" | "sending" | "sent" | "error" | "opened" | "blocked" | "no-destination";

export const projectTypes = [
  "Edificio o condominio",
  "Oficina",
  "Local comercial",
  "Obra nueva o constructora",
  "Colegio, clínica o institución",
  "Mantenimiento de varias unidades",
  "Otro",
];
const timelines = ["Lo antes posible", "En 1 a 3 meses", "En más de 3 meses", "Solo estoy cotizando"];
const planOptions = ["Sí, tengo planos o especificaciones", "Tengo medidas aproximadas", "No, necesito visita para medir"];

const empty: CommercialQuoteData = {
  company: "",
  name: "",
  phone: "",
  email: "",
  commune: "",
  projectType: "",
  services: [],
  quantity: "",
  timeline: "",
  plans: "",
  description: "",
};

export function validateCommercial(d: CommercialQuoteData): Errors {
  const e: Errors = {};
  if (d.company.trim().length < 2) e.company = "Escribe el nombre de la empresa u organización.";
  if (d.name.trim().length < 2) e.name = "Escribe el nombre de la persona de contacto.";
  const digits = d.phone.replace(/\D/g, "");
  if (!d.phone.trim()) e.phone = "Escribe un teléfono de contacto.";
  else if (digits.length < 8 || digits.length > 15 || !/^[+\d\s()-]+$/.test(d.phone.trim()))
    e.phone = "Revisa el número. Formato: +56 9 y 8 dígitos.";
  if (d.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email.trim())) e.email = "Revisa el correo.";
  if (d.commune.trim().length < 2) e.commune = "Indica la comuna del proyecto.";
  if (!d.projectType) e.projectType = "Selecciona el tipo de proyecto.";
  if (d.services.length === 0) e.services = "Selecciona al menos un servicio.";
  if (d.description.trim().length < 10) e.description = "Cuéntanos un poco más del proyecto (mínimo 10 caracteres).";
  return e;
}

function Label({ htmlFor, children, optional }: { htmlFor: string; children: ReactNode; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="text-[15px] font-bold text-navy">
      {children}{" "}
      {optional ? (
        <span className="font-medium text-ink-muted">(opcional)</span>
      ) : (
        <span aria-hidden className="text-red-700">
          *
        </span>
      )}
    </label>
  );
}

/**
 * Formulario para proyectos grandes o comerciales.
 * Envía a forms.commercialEndpoint si está configurado; si no, prepara el
 * mensaje en WhatsApp; si tampoco hay número, lo dice. Nunca simula un envío.
 */
export function CommercialQuoteForm() {
  const [data, setData] = useState<CommercialQuoteData>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [fallbackUrl, setFallbackUrl] = useState<string | null>(null);
  const uid = useId();
  const endpoint = siteConfig.forms.commercialEndpoint;

  const set = <K extends keyof CommercialQuoteData>(field: K, value: CommercialQuoteData[K]) => {
    setData((d) => ({ ...d, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const toggleService = (name: string) =>
    set("services", data.services.includes(name) ? data.services.filter((s) => s !== name) : [...data.services, name]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validateCommercial(data);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      document.getElementById(first === "services" ? `${uid}-services-0` : `${uid}-${first}`)?.focus();
      setStatus("idle");
      return;
    }
    const honeypot = (event.currentTarget.elements.namedItem("sitio_web") as HTMLInputElement | null)?.value;
    if (honeypot) return;

    if (endpoint) {
      setStatus("sending");
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ ...data, servicios: data.services.join(", "), _subject: `Cotización comercial: ${data.company}` }),
        });
        if (!res.ok) throw new Error(String(res.status));
        trackEvent("generate_lead", { method: "formulario_comercial", service: data.services.join(", ") });
        setStatus("sent");
        setData(empty);
      } catch {
        setStatus("error");
        setFallbackUrl(buildWhatsAppUrl(commercialMessage(data)));
      }
      return;
    }

    const url = buildWhatsAppUrl(commercialMessage(data));
    if (!url) {
      setStatus("no-destination");
      return;
    }
    trackEvent("generate_lead", { method: "formulario_comercial_whatsapp", service: data.services.join(", ") });
    const win = window.open(url, "_blank", "noopener,noreferrer");
    setFallbackUrl(url);
    setStatus(win === null ? "blocked" : "opened");
  };

  const fieldClass = (field: keyof CommercialQuoteData) =>
    `mt-2 block w-full rounded-lg border bg-white px-4 py-3 text-base text-ink placeholder:text-ink-muted/70 focus:border-brand focus:ring-2 focus:ring-brand/30 focus:outline-none ${
      errors[field] ? "border-red-600" : "border-navy/20"
    }`;
  const a11y = (field: keyof CommercialQuoteData) => ({
    id: `${uid}-${field}`,
    name: field,
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `${uid}-${field}-error` : undefined,
  });
  const error = (field: keyof CommercialQuoteData) =>
    errors[field] && (
      <p id={`${uid}-${field}-error`} className="mt-1.5 text-sm font-semibold text-red-700">
        {errors[field]}
      </p>
    );

  const text = (field: "company" | "name" | "phone" | "email" | "commune" | "quantity", label: string, opts: { type?: string; autoComplete?: string; placeholder?: string; optional?: boolean } = {}) => (
    <div>
      <Label htmlFor={`${uid}-${field}`} optional={opts.optional}>
        {label}
      </Label>
      <input
        {...a11y(field)}
        type={opts.type ?? "text"}
        autoComplete={opts.autoComplete}
        placeholder={opts.placeholder}
        value={data[field]}
        onChange={(e) => set(field, e.target.value)}
        className={fieldClass(field)}
      />
      {error(field)}
    </div>
  );

  const select = (field: "projectType" | "timeline" | "plans", label: string, options: string[], optional = false) => (
    <div>
      <Label htmlFor={`${uid}-${field}`} optional={optional}>
        {label}
      </Label>
      <select {...a11y(field)} value={data[field]} onChange={(e) => set(field, e.target.value)} className={fieldClass(field)}>
        <option value="">{optional ? "Sin especificar" : "Selecciona una opción"}</option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      {error(field)}
    </div>
  );

  const submitLabel = endpoint ? "Enviar solicitud" : "Continuar en WhatsApp";

  return (
    <form noValidate onSubmit={onSubmit} className="rounded-2xl border border-navy/10 bg-mist p-5 sm:p-8" aria-describedby={`${uid}-nota`}>
      <div className="grid gap-5 sm:grid-cols-2">
        {text("company", "Empresa u organización", { autoComplete: "organization" })}
        {text("name", "Nombre de contacto", { autoComplete: "name" })}
        {text("phone", "Teléfono", { type: "tel", autoComplete: "tel", placeholder: "+56 9 ..." })}
        {text("email", "Correo", { type: "email", autoComplete: "email", optional: true })}
        {text("commune", "Comuna del proyecto", { autoComplete: "address-level2" })}
        {select("projectType", "Tipo de proyecto", projectTypes)}

        <fieldset className="sm:col-span-2" aria-describedby={errors.services ? `${uid}-services-error` : undefined}>
          <legend className="text-[15px] font-bold text-navy">
            Servicios que necesitas{" "}
            <span aria-hidden className="text-red-700">
              *
            </span>
          </legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {services.map((s, i) => (
              <label key={s.slug} className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg border border-navy/15 bg-white px-4 py-2 text-ink">
                <input
                  id={`${uid}-services-${i}`}
                  type="checkbox"
                  name="services"
                  value={s.name}
                  checked={data.services.includes(s.name)}
                  onChange={() => toggleService(s.name)}
                  className="size-5 accent-[var(--color-brand)]"
                />
                {s.name}
              </label>
            ))}
          </div>
          {error("services")}
        </fieldset>

        {text("quantity", "Cantidad aproximada", { placeholder: "Ej.: 40 ventanas, 12 shower doors", optional: true })}
        {select("timeline", "Plazo", timelines, true)}
        <div className="sm:col-span-2">{select("plans", "¿Tienes planos o medidas?", planOptions, true)}</div>
        <div className="sm:col-span-2">
          <Label htmlFor={`${uid}-description`}>Descripción del proyecto</Label>
          <textarea
            {...a11y("description")}
            rows={5}
            placeholder="Ej.: edificio de 8 pisos, cambio de ventanas de fachada a PVC con termopanel."
            value={data.description}
            onChange={(e) => set("description", e.target.value)}
            className={fieldClass("description")}
          />
          {error("description")}
        </div>
        {/* Campo trampa para bots: las personas no lo ven. */}
        <div aria-hidden className="hidden">
          <label>
            Sitio web
            <input type="text" name="sitio_web" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
      </div>

      <p id={`${uid}-nota`} className="mt-6 rounded-lg bg-white p-4 text-sm leading-relaxed text-ink-muted">
        {endpoint ? (
          <>Al enviar, tu solicitud llega directamente a {siteConfig.name}. Usamos tus datos solo para responder esta cotización.</>
        ) : !isWhatsAppConfigured() ? (
          <>Este formulario todavía no tiene un destino configurado. Puedes completarlo para preparar tu solicitud, pero no se enviará hasta que el canal esté activo.</>
        ) : (
          <>
            Al continuar <strong className="text-navy">se abrirá WhatsApp</strong> con tu solicitud lista. Se completa cuando
            presionas “Enviar” en WhatsApp. Tus datos no se guardan en este sitio. Los planos puedes enviarlos en el mismo chat.
          </>
        )}
      </p>

      <button type="submit" disabled={status === "sending"} className={btn(endpoint ? "primary" : "whatsapp", "mt-5 w-full text-base")}>
        {!endpoint && <WhatsAppIcon className="size-5" />}
        {status === "sending" ? "Enviando..." : submitLabel}
      </button>

      <div aria-live="polite" className="mt-4 text-[15px]">
        {status === "sent" && (
          <p className="rounded-lg border border-brand/30 bg-white p-4 text-navy">
            Recibimos tu solicitud. Te contactaremos al teléfono o correo que indicaste.
          </p>
        )}
        {status === "error" && (
          <p className="rounded-lg border border-red-300 bg-white p-4 text-red-800">
            No pudimos enviar la solicitud. Intenta de nuevo
            {fallbackUrl ? (
              <>
                {" "}o{" "}
                <a href={fallbackUrl} target="_blank" rel="noopener noreferrer" className="font-bold underline">
                  envíala por WhatsApp
                </a>
              </>
            ) : null}
            .
          </p>
        )}
        {status === "opened" && (
          <p className="rounded-lg border border-brand/30 bg-white p-4 text-navy">
            Abrimos WhatsApp con tu solicitud. Para completarla, presiona <strong>Enviar</strong> en el chat. Si no se abrió,{" "}
            <a href={fallbackUrl ?? "#"} target="_blank" rel="noopener noreferrer" className="font-bold text-brand-dark underline">
              toca aquí
            </a>
            .
          </p>
        )}
        {status === "blocked" && (
          <p className="rounded-lg border border-brand/30 bg-white p-4 text-navy">
            Tu navegador bloqueó la nueva ventana.{" "}
            <a href={fallbackUrl ?? "#"} target="_blank" rel="noopener noreferrer" className="font-bold text-brand-dark underline">
              Abre WhatsApp aquí
            </a>{" "}
            para enviar tu solicitud.
          </p>
        )}
        {status === "no-destination" && (
          <p className="rounded-lg border border-red-300 bg-white p-4 text-red-800">
            Este formulario todavía no tiene un destino configurado, por lo que la solicitud no se envió. Mientras tanto,
            contáctanos por los canales de la página de contacto.
          </p>
        )}
      </div>
    </form>
  );
}
