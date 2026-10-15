import type { ReactNode } from "react";

/** Clases de botones reutilizables. */
export const buttonStyles = {
  base: "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg py-3 font-bold transition-colors duration-150",
  primary: "bg-brand text-white hover:bg-brand-dark",
  whatsapp: "bg-whatsapp text-white hover:bg-[#0b6631]",
  outlineLight: "border border-white/60 text-white hover:bg-white hover:text-navy",
  outlineDark: "border border-navy/25 text-navy hover:border-navy hover:bg-navy hover:text-white",
};

/**
 * Combina las clases de un botón. El tamaño de texto (text-[15px]) y el
 * padding horizontal (px-5) por defecto se omiten si `extra` trae los suyos,
 * para no depender del orden de las clases en el CSS.
 */
export function btn(variant: keyof Omit<typeof buttonStyles, "base">, extra = "") {
  const size = /(^|\s)text-(xs|sm|base|lg|xl|\[)/.test(extra) ? "" : "text-[15px]";
  const padding = /(^|\s)px-/.test(extra) ? "" : "px-5";
  return [buttonStyles.base, buttonStyles[variant], size, padding, extra].filter(Boolean).join(" ");
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  id,
  align = "center",
  tone = "dark",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  id?: string;
  align?: "center" | "left";
  tone?: "dark" | "light";
}) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "mx-auto text-center" : ""} max-w-2xl`}>
      {eyebrow && (
        <p className={`text-sm font-bold uppercase tracking-[0.14em] ${tone === "dark" ? "text-brand" : "text-brand-light"}`}>
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className={`mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl ${tone === "dark" ? "text-navy" : "text-white"}`}
      >
        {title}
      </h2>
      <span aria-hidden className={`mt-4 block h-1 w-14 rounded bg-brand ${centered ? "mx-auto" : ""}`} />
      {intro && (
        <p className={`mt-5 text-lg leading-relaxed ${tone === "dark" ? "text-ink-muted" : "text-white/85"}`}>{intro}</p>
      )}
    </div>
  );
}

/** Etiqueta que identifica una foto como imagen de referencia de terceros. */
export function DemoBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`pointer-events-none rounded bg-navy-950/75 px-2 py-1 text-[11px] font-semibold tracking-wide text-white ${className}`}
      title="Fotografía de referencia, no corresponde a un trabajo de CRISTALTE"
    >
      Imagen referencial
    </span>
  );
}
