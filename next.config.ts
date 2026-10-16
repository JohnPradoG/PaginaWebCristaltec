import type { NextConfig } from "next";
import { isWhatsAppConfigured, siteConfig } from "./src/config/site";

// Bloqueo de seguridad: una publicación en PRODUCCIÓN (Vercel, Netlify o
// CRISTALTEC_PUBLICAR=1) falla si falta el dominio (siteUrl), porque sin él la
// URL canónica, el sitemap y las etiquetas para Google quedan mal.
// Si falta el número de WhatsApp el sitio se puede publicar: los botones llevan
// al formulario y nunca se genera un enlace inválido, pero se muestra un aviso.
const isProductionDeploy =
  process.env.VERCEL_ENV === "production" ||
  process.env.CONTEXT === "production" ||
  process.env.CRISTALTEC_PUBLICAR === "1";

if (!siteConfig.siteUrl) {
  const message = "Falta siteUrl (dominio del sitio) en src/config/site.ts.";
  if (isProductionDeploy) throw new Error(`[CRISTALTEC] ${message} Complétalo antes de publicar en producción.`);
  console.warn(`\n⚠️  [CRISTALTEC] ${message}\n`);
}
// Las direcciones de Vercel con el nombre del equipo (…-vano6.vercel.app) o de
// una rama (…-git-…) piden iniciar sesión: Google no puede leerlas.
if (/-git-|-vano6\.vercel\.app/.test(siteConfig.siteUrl)) {
  const message = `siteUrl (${siteConfig.siteUrl}) es una dirección protegida de Vercel que Google no puede ver.`;
  if (isProductionDeploy) throw new Error(`[CRISTALTEC] ${message} Usa https://cristalte-web.vercel.app o el dominio propio.`);
  console.warn(`\n⚠️  [CRISTALTEC] ${message}\n`);
}
if (!isWhatsAppConfigured()) {
  console.warn(
    "\n⚠️  [CRISTALTEC] Falta whatsappNumber en src/config/site.ts: los botones de WhatsApp llevan al formulario.\n",
  );
}

const nextConfig: NextConfig = {
  // Sitio estático: `npm run build` genera la carpeta `out/`, que se puede
  // publicar en Vercel, Netlify, Cloudflare Pages o cualquier hosting con cPanel.
  output: "export",
  // Genera /ventanas-de-aluminio/index.html (compatible con Apache/cPanel).
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
