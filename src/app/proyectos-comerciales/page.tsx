import { CommercialQuoteForm } from "@/components/sections/commercial-form";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CheckIcon } from "@/components/icons";
import { Container } from "@/components/ui";
import { breadcrumbJsonLd, jsonLdScript, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Cotización para proyectos comerciales y edificios",
  description:
    "Solicita cotización de ventanas de aluminio y PVC, termopanel, puertas, mamparas, shower doors y mantenimiento para edificios, oficinas, locales y constructoras.",
  path: "/proyectos-comerciales/",
});

const points = [
  "Edificios y condominios: recambio de ventanas, termopanel y mantenimiento de varias unidades",
  "Oficinas y locales: mamparas, puertas de acceso y divisiones de vidrio",
  "Constructoras y obras nuevas: cotización a partir de planos y especificaciones",
  "Mantenimiento periódico de ventanas, puertas y cierres",
];

export default function CommercialPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd([{ name: "Proyectos comerciales", path: "/proyectos-comerciales/" }]))}
      />
      <section aria-labelledby="comercial-title" className="py-12 sm:py-16">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <Breadcrumbs items={[{ name: "Proyectos comerciales" }]} />
            <h1 id="comercial-title" className="mt-5 text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">
              Cotización para proyectos comerciales y edificios
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-muted">
              Para proyectos con varias unidades, obras nuevas o trabajos en edificios, oficinas y locales, cuéntanos los
              detalles en este formulario. Con esa información preparamos una propuesta y coordinamos una visita si hace
              falta.
            </p>
            <ul className="mt-8 space-y-3 text-ink">
              {points.map((t) => (
                <li key={t} className="flex gap-3">
                  <CheckIcon className="mt-0.5 size-5 shrink-0 text-brand" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <CommercialQuoteForm />
        </Container>
      </section>
    </>
  );
}
