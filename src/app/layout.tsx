import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { getSiteUrl, siteConfig } from "@/config/site";
import { businessJsonLd, defaultDescription, defaultTitle, jsonLdScript, websiteJsonLd } from "@/lib/seo";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { Analytics } from "@/components/analytics";
import "./globals.css";

// Manrope (licencia SIL OFL) incluida en el proyecto: no depende de servicios externos.
const manrope = localFont({
  src: [
    { path: "../fonts/manrope-latin-wght-normal.woff2", weight: "200 800", style: "normal" },
    { path: "../fonts/manrope-latin-ext-wght-normal.woff2", weight: "200 800", style: "normal" },
  ],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: defaultTitle,
    template: "%s | CRISTALTEC",
  },
  description: defaultDescription,
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "es_CL",
    siteName: siteConfig.name,
    title: defaultTitle,
    description: defaultDescription,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "CRISTALTEC: aluminio, vidrio y diseño" }],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/og-image.png"],
  },
  verification: {
    ...(siteConfig.analytics.googleSiteVerification ? { google: siteConfig.analytics.googleSiteVerification } : {}),
    ...(siteConfig.analytics.bingSiteVerification
      ? { other: { "msvalidate.01": siteConfig.analytics.bingSiteVerification } }
      : {}),
  },
};

export const viewport: Viewport = {
  themeColor: "#102D4A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const gaId = siteConfig.analytics.googleAnalyticsId;
  return (
    <html lang="es-CL" className={`${manrope.variable} antialiased`}>
      <body className="flex min-h-svh flex-col font-sans">
        {/* Datos de la empresa y del sitio en todas las páginas: los servicios los referencian por @id. */}
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript([businessJsonLd(), websiteJsonLd()])} />
        <SiteHeader />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <WhatsAppFloat />
        {gaId && <Analytics gaId={gaId} />}
      </body>
    </html>
  );
}
