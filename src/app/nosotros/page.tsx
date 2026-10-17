import { AboutSection } from "@/components/sections/about";
import { AdvantagesSection } from "@/components/sections/advantages";
import { CtaBanner } from "@/components/sections/cta-banner";
import { breadcrumbJsonLd, jsonLdScript, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Nosotros: aluminio, vidrio y PVC en Santiago",
  description:
    "Conoce CRISTALTEC: soluciones a medida en aluminio, vidrio y PVC para hogares, comercios y proyectos de construcción.",
  path: "/nosotros/",
});

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd([{ name: "Nosotros", path: "/nosotros/" }]))}
      />
      <AboutSection headingLevel="h1" />
      <AdvantagesSection />
      <CtaBanner />
    </>
  );
}
