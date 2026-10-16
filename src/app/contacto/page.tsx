import { QuoteFormSection } from "@/components/sections/quote-form";
import { ContactSection } from "@/components/sections/contact";
import { Container } from "@/components/ui";
import { breadcrumbJsonLd, jsonLdScript, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contacto y cotización",
  description:
    "Cotiza ventanas, cerramientos de terrazas, shower doors, puertas, espejos o barandas de vidrio con CRISTALTE. Escríbenos por WhatsApp o completa el formulario.",
  path: "/contacto/",
});

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd([{ name: "Contacto", path: "/contacto/" }]))}
      />
      <Container className="pt-12 sm:pt-16">
        <h1 className="text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">Contacto y cotización</h1>
        <p className="mt-4 max-w-2xl text-lg text-ink-muted">
          Cuéntanos qué necesitas. Con las medidas aproximadas y algunas fotos podemos orientarte y preparar tu
          cotización.
        </p>
      </Container>
      <QuoteFormSection />
      <ContactSection />
    </>
  );
}
