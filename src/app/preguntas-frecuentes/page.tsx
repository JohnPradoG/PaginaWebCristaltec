import Link from "next/link";
import { faqs } from "@/content/faq";
import { servicePath, services } from "@/content/services";
import { FaqSection } from "@/components/sections/faq";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Container } from "@/components/ui";
import { breadcrumbJsonLd, faqJsonLd, jsonLdScript, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Preguntas frecuentes",
  description:
    "Respuestas sobre cotizaciones, medidas, instalación, materiales y comunas de atención de CRISTALTEC, y preguntas por servicio.",
  path: "/preguntas-frecuentes/",
});

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript([
          breadcrumbJsonLd([{ name: "Preguntas frecuentes", path: "/preguntas-frecuentes/" }]),
          faqJsonLd(faqs),
        ])}
      />
      <FaqSection headingLevel="h1" />
      <section aria-labelledby="faq-servicios-title" className="py-16 sm:py-20">
        <Container className="max-w-4xl">
          <h2 id="faq-servicios-title" className="text-2xl font-extrabold text-navy sm:text-3xl">
            Preguntas por servicio
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`${servicePath(s.slug)}#faq-servicio-title`}
                  className="flex min-h-12 items-center rounded-xl border border-navy/10 px-5 font-bold text-navy hover:border-brand hover:text-brand"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <CtaBanner />
    </>
  );
}
