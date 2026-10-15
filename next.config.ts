import type { NextConfig } from "next";
import { isWhatsAppConfigured, siteConfig } from "./src/config/site";

// Bloqueo de seguridad: una publicación en PRODUCCIÓN (Vercel, Netlify o
// CRISTALTE_PUBLICAR=1) falla si falta el dominio (siteUrl), porque sin él la
// URL canónica, el sitemap y las etiquetas para Google quedan mal.
// Si falta el número de WhatsApp el sitio se puede publicar: los botones llevan
// al formulario y nunca se genera un enlace inválido, pero se muestra un aviso.
const isProductionDeploy =
  process.env.VERCEL_ENV === "production" ||
  process.env.CONTEXT === "production" ||
  process.env.CRISTALTE_PUBLICAR === "1";

if (!siteConfig.siteUrl) {
  const message = "Falta siteUrl (dominio del sitio) en src/config/site.ts.";
  if (isProductionDeploy) throw new Error(`[CRISTALTE] ${message} Complétalo antes de publicar en producción.`);
  console.warn(`\n⚠️  [CRISTALTE] ${message}\n`);
}
if (!isWhatsAppConfigured()) {
  console.warn(
    "\n⚠️  [CRISTALTE] Falta whatsappNumber en src/config/site.ts: los botones de WhatsApp llevan al formulario.\n",
  );
}

const nextConfig: NextConfig = {
  // Sitio estático: `npm run build` genera la carpeta `out/`, que se puede
  // publicar en Vercel, Netlify, Cloudflare Pages o cualquier hosting con cPanel.
  output: "export",
  // Genera /servicios/ventanas-de-aluminio/index.html (compatible con Apache/cPanel).
  trailingSlash: true,
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
