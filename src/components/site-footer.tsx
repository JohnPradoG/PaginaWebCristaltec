import Link from "next/link";
import { siteConfig } from "@/config/site";
import { servicePath, services } from "@/content/services";
import { footerExtraItems, navItems } from "@/content/navigation";
import { ContactList, SocialLinks } from "./contact-details";
import { Container } from "./ui";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy text-white">
      <Container className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element -- SVG vectorial liviano */}
          <img
            src="/brand/cristaltec-logo-horizontal-dark.svg"
            alt="CRISTALTEC"
            width={290}
            height={64}
            className="h-12 w-auto"
          />
          <p className="mt-5 max-w-xs leading-relaxed text-white/80">{siteConfig.tagline}.</p>
          <SocialLinks className="mt-6" />
        </div>

        <nav aria-label="Secciones">
          <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-brand-light">Navegación</h2>
          <ul className="mt-4 space-y-2">
            {[...navItems, ...footerExtraItems].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-white/85 hover:text-white hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contacto/" className="text-white/85 hover:text-white hover:underline">
                Solicitar cotización
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Servicios">
          <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-brand-light">Servicios</h2>
          <ul className="mt-4 space-y-2">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={servicePath(s.slug)} className="text-white/85 hover:text-white hover:underline">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-brand-light">Contacto</h2>
          <ContactList tone="light" className="mt-4" />
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 text-sm text-white/70 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {siteConfig.legalName ?? siteConfig.name}
            {siteConfig.rut ? ` · RUT ${siteConfig.rut}` : ""}. Todos los derechos reservados.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li>
              <Link href="/privacidad/" className="hover:text-white hover:underline">
                Aviso de privacidad
              </Link>
            </li>
            <li>
              <Link href="/creditos-imagenes/" className="hover:text-white hover:underline">
                Créditos de imágenes
              </Link>
            </li>
          </ul>
        </Container>
      </div>
    </footer>
  );
}
