import type { Metadata } from "next";
import { images, type SiteImage } from "@/content/images";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Créditos de imágenes",
  description: "Créditos de las fotografías de referencia usadas en el sitio de CRISTALTEC.",
  alternates: { canonical: "/creditos-imagenes/" },
  robots: { index: false, follow: true },
};

export default function CreditsPage() {
  const list = (Object.values(images) as SiteImage[]).filter((img) => img.demo && img.credit);
  return (
    <Container className="max-w-3xl py-16 sm:py-20">
      <h1 className="text-4xl font-extrabold tracking-tight text-navy">Créditos de imágenes</h1>
      <p className="mt-6 text-lg leading-relaxed text-ink-muted">
        Las fotografías marcadas como “Imagen referencial” son imágenes de terceros publicadas en Unsplash y se usan
        bajo la{" "}
        <a href="https://unsplash.com/license" className="font-semibold text-brand underline" rel="noopener noreferrer" target="_blank">
          Licencia Unsplash
        </a>
        . Se muestran como ejemplos ilustrativos y no corresponden a trabajos realizados por CRISTALTEC.
      </p>
      {list.length > 0 ? (
        <ul className="mt-10 divide-y divide-navy/10 border-y border-navy/10">
          {list.map((img) => (
            <li key={img.src} className="flex flex-col gap-1 py-4 sm:flex-row sm:justify-between">
              <span className="text-ink">{img.alt}</span>
              <a
                href={img.credit!.url}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 font-semibold text-brand hover:underline"
              >
                Foto: {img.credit!.author}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-10 text-ink-muted">Todas las fotografías del sitio pertenecen a CRISTALTEC.</p>
      )}
    </Container>
  );
}
