import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
    ...services.map((s) => ({
      url: absoluteUrl(`/servicios/${s.slug}/`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: absoluteUrl("/privacidad/"), changeFrequency: "yearly", priority: 0.2 },
  ];
}
