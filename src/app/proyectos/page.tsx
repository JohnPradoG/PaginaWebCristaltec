import { GallerySection } from "@/components/sections/gallery";
import { CtaBanner } from "@/components/sections/cta-banner";
import { breadcrumbJsonLd, jsonLdScript, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Proyectos de aluminio, vidrio y PVC",
  description:
    "Ideas y proyectos de ventanas, puertas, shower doors, cerramientos de terrazas, mamparas y vitrinas a medida. Consulta por un trabajo similar con CRISTALTEC.",
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
