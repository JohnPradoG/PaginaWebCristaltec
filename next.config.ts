import type { NextConfig } from "next";
import { isWhatsAppConfigured, siteConfig } from "./src/config/site";

// Bloqueo de seguridad: una publicación en PRODUCCIÓN (Vercel, Netlify o
// CRISTALTE_PUBLICAR=1) falla si faltan el número de WhatsApp o el dominio,
// para no publicar por accidente botones que no funcionan.
const isProductionDeploy =
  process.env.VERCEL_ENV === "production" ||
  process.env.CONTEXT === "production" ||
  process.env.CRISTALTE_PUBLICAR === "1";

const missing = [
  !isWhatsAppConfigured() && "whatsappNumber",
  !siteConfig.siteUrl && "siteUrl",
].filter(Boolean);

if (missing.length > 0) {
  const message = `Faltan datos en src/config/site.ts: ${missing.join(", ")}.`;
  if (isProductionDeploy) {
    throw new Error(`[CRISTALTE] ${message} Complétalos antes de publicar en producción.`);
  }
  console.warn(`\n⚠️  [CRISTALTE] ${message} El sitio funciona en modo pendiente (sin enlaces de WhatsApp).\n`);
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
