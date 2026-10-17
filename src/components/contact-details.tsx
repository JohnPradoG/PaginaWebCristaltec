import Link from "next/link";
import type { ComponentType, ReactNode, SVGProps } from "react";
import { isWhatsAppConfigured, siteConfig } from "@/config/site";
import { buildWhatsAppUrl, whatsappMessages } from "@/lib/whatsapp";
import {
  ClockIcon,
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  TikTokIcon,
  WhatsAppIcon,
} from "./icons";

type Item = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  content: ReactNode;
};

/** Formatea 56912345678 como +56 9 1234 5678 para mostrarlo. */
function formatChileanNumber(n: string) {
  const m = n.match(/^56(9)(\d{4})(\d{4})$/);
  return m ? `+56 ${m[1]} ${m[2]} ${m[3]}` : `+${n}`;
}

/** Devuelve solo los datos de contacto configurados en src/config/site.ts. */
export function getContactItems(): Item[] {
  const c = siteConfig.contact;
  const items: Item[] = [];
  const wa = buildWhatsAppUrl(whatsappMessages.general());
  if (wa && isWhatsAppConfigured()) {
    items.push({
      icon: WhatsAppIcon,
      label: "WhatsApp",
      content: (
        <a href={wa} target="_blank" rel="noopener noreferrer" className="hover:underline">
          {formatChileanNumber(siteConfig.whatsappNumber)}
        </a>
      ),
    });
  }
  const second = siteConfig.whatsappSecondaryNumber?.trim();
  if (wa && second && /^[1-9]\d{7,14}$/.test(second)) {
    items.push({
      icon: WhatsAppIcon,
      label: "WhatsApp",
      content: (
        <a
          href={`https://wa.me/${second}?text=${encodeURIComponent(whatsappMessages.general())}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          {formatChileanNumber(second)}
        </a>
      ),
    });
  }
  if (c.phone) {
    items.push({
      icon: PhoneIcon,
      label: "Teléfono",
      content: (
        <a href={`tel:${c.phone.replace(/[^\d+]/g, "")}`} className="hover:underline">
          {c.phone}
        </a>
      ),
    });
  }
  if (c.email) {
    items.push({
      icon: MailIcon,
      label: "Correo",
      content: (
        <a href={`mailto:${c.email}`} className="break-all hover:underline">
          {c.email}
        </a>
      ),
    });
  }
  if (c.address || c.commune) {
    items.push({
      icon: PinIcon,
      label: "Ubicación",
      content: (
        <>
          {[c.address, c.commune, c.region].filter(Boolean).join(", ")}
          {c.mapLink && (
            <a href={c.mapLink} target="_blank" rel="noopener noreferrer" className="mt-1 block font-semibold underline">
              Cómo llegar (Google Maps)
            </a>
          )}
        </>
      ),
    });
  }
  if (c.hours.length > 0) {
    items.push({
      icon: ClockIcon,
      label: "Horario",
      content: (
        <>
          {c.hours.map((h) => (
            <span key={h} className="block">
              {h}
            </span>
          ))}
        </>
      ),
    });
  }
  return items;
}

export function ContactList({ tone = "dark", className = "" }: { tone?: "dark" | "light"; className?: string }) {
  const items = getContactItems();
  const muted = tone === "light" ? "text-white/70" : "text-ink-muted";
  const strong = tone === "light" ? "text-white" : "text-navy";
  if (items.length === 0) {
    return (
      <p className={`${muted} ${className}`}>
        Escríbenos desde el{" "}
        <Link href="/#cotizar" className={`font-semibold underline ${strong}`}>
          formulario de cotización
        </Link>
        .
      </p>
    );
  }
  return (
    <ul className={`space-y-4 ${className}`}>
      {items.map(({ icon: Icon, label, content }) => (
        <li key={label} className="flex gap-3">
          <Icon className={`mt-0.5 size-5 shrink-0 ${tone === "light" ? "text-brand-light" : "text-brand"}`} />
          <div>
            <span className={`block text-xs font-bold uppercase tracking-wider ${muted}`}>{label}</span>
            <span className={strong}>{content}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function SocialLinks({ className = "" }: { className?: string }) {
  const s = siteConfig.social;
  const links = [
    s.instagram && { href: s.instagram, label: "Instagram", Icon: InstagramIcon },
    s.facebook && { href: s.facebook, label: "Facebook", Icon: FacebookIcon },
    s.tiktok && { href: s.tiktok, label: "TikTok", Icon: TikTokIcon },
  ].filter(Boolean) as { href: string; label: string; Icon: typeof InstagramIcon }[];
  if (links.length === 0) return null;
  return (
    <ul className={`flex gap-3 ${className}`}>
      {links.map(({ href, label, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${label} de CRISTALTEC`}
            className="inline-flex size-11 items-center justify-center rounded-full border border-white/25 text-white hover:bg-white hover:text-navy"
          >
            <Icon className="size-5" />
          </a>
        </li>
      ))}
    </ul>
  );
}
