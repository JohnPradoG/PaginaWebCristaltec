/**
 * Cargador de imágenes para next/image compatible con exportación estática.
 *
 * - Imágenes de Unsplash: se piden ya redimensionadas y en formato moderno
 *   (WebP/AVIF) usando los parámetros del CDN de Unsplash.
 * - Imágenes propias en /public: se sirven tal cual. Para fotos reales de la
 *   empresa, súbelas ya optimizadas (ver README, sección "Fotografías").
 */
export default function imageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  if (src.startsWith("https://images.unsplash.com/")) {
    const url = new URL(src);
    url.searchParams.set("auto", "format");
    url.searchParams.set("fit", "crop");
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality ?? 70));
    return url.toString();
  }
  // Imágenes locales: el parámetro w solo diferencia las entradas del srcset.
  return `${src}${src.includes("?") ? "&" : "?"}w=${width}`;
}
