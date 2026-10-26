/**
 * Cargador de imágenes para next/image compatible con exportación estática.
 *
 * - Imágenes de Unsplash: se piden ya redimensionadas y en formato moderno
 *   (WebP/AVIF) usando los parámetros del CDN de Unsplash.
 * - Fotos propias en /proyectos/ (generadas con `npm run fotos`): se entrega la
 *   versión de 640, 1080 o 1600 px más liviana que cubre el ancho pedido.
 * - Otras imágenes propias en /public: se sirven tal cual.
 */
import { PHOTO_WIDTHS } from "./photo-widths.mjs";

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
  const photo = src.match(/^\/proyectos\/([a-z0-9-]+)\.webp$/);
  if (photo) {
    const best = PHOTO_WIDTHS.find((w) => w >= width) ?? PHOTO_WIDTHS[PHOTO_WIDTHS.length - 1];
    return `/proyectos/${photo[1]}-${best}.webp`;
  }
  // Imágenes locales: el parámetro w solo diferencia las entradas del srcset.
  return `${src}${src.includes("?") ? "&" : "?"}w=${width}`;
}
