import type { MetadataRoute } from "next";
import { servicePath, services } from "@/content/services";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

/** Solo páginas que deben aparecer en Google. Las rutas terminan en "/" igual que el canonical. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    ...services.map((s) => servicePath(s.slug)),
    "/proyectos/",
    "/nosotros/",
    "/preguntas-frecuentes/",
    "/contacto/",
    "/privacidad/",
  ];
  return paths.map((path) => ({ url: absoluteUrl(path) }));
}
