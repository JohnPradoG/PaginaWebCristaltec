"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import { isWhatsAppConfigured } from "@/config/site";
import { serviceOptions } from "@/content/services";
import { buildWhatsAppUrl, whatsappMessages, type QuoteFormData } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { CheckIcon, WhatsAppIcon } from "../icons";
import { btn, Container, SectionHeading } from "../ui";

type Errors = Partial<Record<keyof QuoteFormData, string>>;

const budgetOptions = [
  "Prefiero conversarlo",
  "Menos de $500.000",
  "$500.000 a $1.000.000",
  "$1.000.000 a $3.000.000",
  "Más de $3.000.000",
];

const empty: QuoteFormData = { name: "", phone: "", commune: "", service: "", description: "", budget: "" };

export function validateQuote(data: QuoteFormData): Errors {
  const errors: Errors = {};
  if (data.name.trim().length < 2) errors.name = "Escribe tu nombre.";
  const digits = data.phone.replace(/\D/g, "");
  if (!data.phone.trim()) errors.phone = "Escribe tu teléfono o WhatsApp.";
  else if (digits.length < 8 || digits.length > 15 || !/^[+\d\s()-]+$/.test(data.phone.trim()))
    errors.phone = "Revisa el número. Formato: +56 9 y 8 dígitos.";
  if (data.commune.trim().length < 2) errors.commune = "Indica la comuna del proyecto.";
  if (!data.service) errors.service = "Selecciona el servicio que necesitas.";
  if (data.description.trim().length < 10) errors.description = "Cuéntanos un poco más de tu proyecto (mínimo 10 caracteres).";
  return errors;
}

function Field({
  uid,
  field,
  label,
  error,
  optional,
  children,
}: {
  uid: string;
  field: keyof QuoteFormData;
  label: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={`${uid}-${field}`} className="text-[15px] font-bold text-navy">
        {label}{" "}
        {optional ? (
          <span className="font-medium text-ink-muted">(opcional)</span>
        ) : (
          <span aria-hidden className="text-red-700">
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${uid}-${field}-error`} className="mt-1.5 text-sm font-semibold text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

type QuoteFormProps = {
  /** Servicio preseleccionado (nombre tal como aparece en el selector). */
  defaultService?: string;
  /** Título de la sección. */
  title?: string;
  /** Fondo alternativo para alternar secciones. */
  tone?: "white" | "mist";
};

export function QuoteFormSection({ defaultService = "", title = "Solicita tu cotización", tone = "white" }: QuoteFormProps = {}) {
  const [data, setData] = useState<QuoteFormData>({ ...empty, service: defaultService });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "opened" | "blocked" | "pending-number">("idle");
  const [fallbackUrl, setFallbackUrl] = useState<string | null>(null);
  const uid = useId();
  const ready = isWhatsAppConfigured();

  const update = (field: keyof QuoteFormData) => (value: string) => {
    setData((d) => ({ ...d, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validateQuote(data);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      document.getElementById(`${uid}-${firstInvalid}`)?.focus();
      setStatus("idle");
      return;
    }
    const url = buildWhatsAppUrl(whatsappMessages.quoteForm(data));
    if (!url) {
      setStatus("pending-number");
      return;
    }
    trackEvent("generate_lead", { method: "formulario_whatsapp", service: data.service });
    const win = window.open(url, "_blank", "noopener,noreferrer");
    setFallbackUrl(url);
    setStatus(win === null ? "blocked" : "opened");
  };

  const fieldClass = (field: keyof QuoteFormData) =>
    `mt-2 block w-full rounded-lg border bg-white px-4 py-3 text-base text-ink placeholder:text-ink-muted/70 focus:border-brand focus:ring-2 focus:ring-brand/30 focus:outline-none ${
      errors[field] ? "border-red-600" : "border-navy/20"
    }`;

  const a11y = (field: keyof QuoteFormData) => ({
    id: `${uid}-${field}`,
    name: field,
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `${uid}-${field}-error` : undefined,
  });

  return (
    <section id="cotizar" aria-labelledby="cotizar-title" className={`py-20 sm:py-24 ${tone === "mist" ? "bg-mist" : ""}`}>
      <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <SectionHeading
            id="cotizar-title"
            eyebrow="Cotización"
            title={title}
            intro="Completa el formulario y prepararemos tu mensaje para enviarlo por WhatsApp. Solo te tomará un minuto."
            align="left"
          />
          <ul className="mt-8 space-y-3 text-ink">
            {[
              "Indica medidas aproximadas si las tienes.",
              "Puedes adjuntar fotografías del espacio directamente en el chat de WhatsApp.",
              "Revisamos tu solicitud y te contactamos para afinar los detalles.",
            ].map((t) => (
              <li key={t} className="flex gap-3">
                <CheckIcon className="mt-0.5 size-5 shrink-0 text-brand" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        <form
          noValidate
          onSubmit={onSubmit}
          className={`rounded-2xl border border-navy/10 p-5 sm:p-8 ${tone === "mist" ? "bg-white" : "bg-mist"}`}
          aria-describedby={`${uid}-nota`}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field uid={uid} field="name" label="Nombre" error={errors.name}>
              <input
                {...a11y("name")}
                type="text"
                autoComplete="name"
                value={data.name}
                onChange={(e) => update("name")(e.target.value)}
                className={fieldClass("name")}
              />
            </Field>
            <Field uid={uid} field="phone" label="Teléfono o WhatsApp" error={errors.phone}>
              <input
                {...a11y("phone")}
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="+56 9 ..."
                value={data.phone}
                onChange={(e) => update("phone")(e.target.value)}
                className={fieldClass("phone")}
              />
            </Field>
            <Field uid={uid} field="commune" label="Comuna" error={errors.commune}>
              <input
                {...a11y("commune")}
                type="text"
                autoComplete="address-level2"
                value={data.commune}
                onChange={(e) => update("commune")(e.target.value)}
                className={fieldClass("commune")}
              />
            </Field>
            <Field uid={uid} field="service" label="Servicio que necesitas" error={errors.service}>
              <select
                {...a11y("service")}
                value={data.service}
                onChange={(e) => update("service")(e.target.value)}
                className={fieldClass("service")}
              >
                <option value="">Selecciona una opción</option>
                {serviceOptions.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </Field>
            <div className="sm:col-span-2">
              <Field uid={uid} field="description" label="Descripción del proyecto" error={errors.description}>
                <textarea
                  {...a11y("description")}
                  rows={4}
                  placeholder="Ej.: cerrar una terraza de 3 x 2,4 m en un departamento, piso 5."
                  value={data.description}
                  onChange={(e) => update("description")(e.target.value)}
                  className={fieldClass("description")}
                />
              </Field>
            </div>
            <div className="sm:col-span-2">
              <Field uid={uid} field="budget" label="Presupuesto aproximado" error={errors.budget} optional>
                <select
                  {...a11y("budget")}
                  value={data.budget}
                  onChange={(e) => update("budget")(e.target.value)}
                  className={fieldClass("budget")}
                >
                  <option value="">Sin especificar</option>
                  {budgetOptions.map((b) => (
                    <option key={b}>{b}</option>
                  ))}
                </select>
              </Field>
            </div>
          </div>

          <p id={`${uid}-nota`} className="mt-6 rounded-lg bg-white p-4 text-sm leading-relaxed text-ink-muted">
            Al enviar <strong className="text-navy">se abrirá WhatsApp</strong> con tu mensaje listo. La solicitud se
            completa cuando presionas “Enviar” en WhatsApp. Tus datos no se guardan en este sitio.
          </p>

          <button type="submit" className={btn("whatsapp", "mt-5 w-full text-base")}>
            <WhatsAppIcon className="size-5" />
            Continuar en WhatsApp
          </button>

          <div aria-live="polite" className="mt-4 text-[15px]">
            {status === "opened" && (
              <p className="rounded-lg border border-brand/30 bg-white p-4 text-navy">
                Abrimos WhatsApp con tu mensaje. Para completar la solicitud, presiona <strong>Enviar</strong> en el
                chat. Si no se abrió,{" "}
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
                para enviar tu mensaje.
              </p>
            )}
            {status === "pending-number" && (
              <p className="rounded-lg border border-red-300 bg-white p-4 text-red-800">
                El número de WhatsApp de CRISTALTEC aún no está configurado, por lo que no es posible enviar la
                solicitud por ahora.
              </p>
            )}
            {!ready && status === "idle" && process.env.NODE_ENV !== "production" && (
              <p className="text-sm text-ink-muted">
                Modo desarrollo: falta configurar <code>whatsappNumber</code> en <code>src/config/site.ts</code>.
              </p>
            )}
          </div>
        </form>
      </Container>
    </section>
  );
}
