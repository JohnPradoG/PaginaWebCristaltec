import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { getSiteUrl, siteConfig } from "@/config/site";
import { defaultDescription } from "@/lib/seo";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
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
    default: "CRISTALTE | Aluminio, vidrio y PVC a medida",
    template: "%s | CRISTALTE",
  },
  description: defaultDescription,
  applicationName: siteConfig.name,
  keywords: [
    "ventanas de aluminio",
    "ventanas de PVC",
    "cerramientos de terrazas",
    "shower doors",
    "mamparas de baño",
    "puertas de aluminio y vidrio",
    "espejos a medida",
    "barandas de vidrio",
    "trabajos en aluminio y vidrio",
    "instalación de ventanas",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_CL",
    siteName: siteConfig.name,
    title: "CRISTALTE | Aluminio, vidrio y PVC a medida",
    description: defaultDescription,
    url: "/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "CRISTALTE: aluminio, vidrio y diseño" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CRISTALTE | Aluminio, vidrio y PVC a medida",
    description: defaultDescription,
    images: ["/og-image.png"],
  },
  verification: siteConfig.analytics.googleSiteVerification
    ? { google: siteConfig.analytics.googleSiteVerification }
    : undefined,
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
        <SiteHeader />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <WhatsAppFloat />
        {gaId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
