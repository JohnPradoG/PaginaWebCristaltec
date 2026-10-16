import { GallerySection } from "@/components/sections/gallery";
import { CtaBanner } from "@/components/sections/cta-banner";
import { breadcrumbJsonLd, jsonLdScript, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Proyectos de aluminio, vidrio y PVC",
  description:
    "Ideas y proyectos de cerramientos de terrazas, ventanas, shower doors, puertas, espejos y barandas de vidrio. Consulta por un trabajo similar con CRISTALTE.",
  path: "/proyectos/",
});

export default function ProjectsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd([{ name: "Proyectos", path: "/proyectos/" }]))}
      />
      <GallerySection headingLevel="h1" title="Proyectos de aluminio, vidrio y PVC" />
      <CtaBanner />
    </>
  );
}
