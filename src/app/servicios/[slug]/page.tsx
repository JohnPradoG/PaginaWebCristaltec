import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { getService, services } from "@/content/services";
import { projects } from "@/content/projects";
import { absoluteUrl, jsonLdScript } from "@/lib/seo";
import { whatsappMessages } from "@/lib/whatsapp";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { ServiceCard } from "@/components/service-card";
import { ArrowRightIcon, CheckIcon, WhatsAppIcon } from "@/components/icons";
import { btn, Container, DemoBadge } from "@/components/ui";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(props: PageProps<"/servicios/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const service = getService(slug);
  if (!service) return {};
  const path = `/servicios/${service.slug}/`;
  return {
    title: service.seo.title,
    description: service.seo.description,
    alternates: { canonical: path },
    openGraph: {
      title: `${service.seo.title} | CRISTALTE`,
      description: service.seo.description,
      url: path,
      type: "website",
      locale: "es_CL",
      siteName: siteConfig.name,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "CRISTALTE" }],
    },
  };
}

export default async function ServicePage(props: PageProps<"/servicios/[slug]">) {
  const { slug } = await props.params;
  const service = getService(slug);
  if (!service) notFound();

  const related = service.galleryCategory ? projects.filter((p) => p.category === service.galleryCategory).slice(0, 3) : [];
  const others = services.filter((s) => s.slug !== service.slug).slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: service.name,
        description: service.seo.description,
        url: absoluteUrl(`/servicios/${service.slug}/`),
        provider: { "@id": absoluteUrl("/#empresa"), "@type": "LocalBusiness", name: siteConfig.name },
        ...(siteConfig.contact.serviceAreas.length > 0 ? { areaServed: siteConfig.contact.serviceAreas } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Servicios", item: absoluteUrl("/#servicios") },
          { "@type": "ListItem", position: 3, name: service.name, item: absoluteUrl(`/servicios/${service.slug}/`) },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(jsonLd)} />

      <section aria-labelledby="servicio-title" className="bg-mist">
        <Container className="grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-2 lg:gap-14">
          <div>
            <nav aria-label="Ruta de navegación" className="text-sm text-ink-muted">
              <ol className="flex flex-wrap items-center gap-1.5">
                <li>
                  <Link href="/" className="hover:text-brand hover:underline">
                    Inicio
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link href="/#servicios" className="hover:text-brand hover:underline">
                    Servicios
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li aria-current="page" className="font-semibold text-navy">
                  {service.name}
                </li>
              </ol>
            </nav>
            <h1 id="servicio-title" className="mt-5 text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">
              {service.name}
            </h1>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-muted">
              {service.description.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <WhatsAppLink message={whatsappMessages.service(service.name)} className={btn("whatsapp", "text-base")}>
                <WhatsAppIcon className="size-5" />
                Consultar por WhatsApp
              </WhatsAppLink>
              <Link href="/#cotizar" className={btn("outlineDark", "text-base")}>
                Solicitar cotización
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-navy/10">
            <Image
              src={service.image.src}
              alt={service.image.alt}
              fill
              priority
              sizes="(min-width: 1024px) 600px, 100vw"
              className="object-cover"
            />
            {service.image.demo && <DemoBadge className="absolute bottom-3 left-3" />}
          </div>
        </Container>
      </section>

      <section aria-label="Detalles del servicio" className="py-16 sm:py-20">
        <Container className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-navy/10 p-6 sm:p-8">
            <h2 className="text-2xl font-extrabold text-navy">Qué podemos ver contigo</h2>
            <ul className="mt-6 space-y-3">
              {service.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-ink">
                  <CheckIcon className="mt-0.5 size-5 shrink-0 text-brand" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-navy p-6 text-white sm:p-8">
            <h2 className="text-2xl font-extrabold">Para cotizar más rápido</h2>
            <p className="mt-2 text-white/80">Si puedes, envíanos esta información:</p>
            <ul className="mt-6 space-y-3">
              {service.quoteTips.map((t) => (
                <li key={t} className="flex gap-3">
                  <CheckIcon className="mt-0.5 size-5 shrink-0 text-brand-light" />
                  {t}
                </li>
              ))}
            </ul>
            <WhatsAppLink message={whatsappMessages.service(service.name)} className={btn("whatsapp", "mt-8 w-full sm:w-auto")}>
              <WhatsAppIcon className="size-5" />
              Enviar datos por WhatsApp
            </WhatsAppLink>
          </div>
        </Container>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="relacionados-title" className="pb-16 sm:pb-20">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 id="relacionados-title" className="text-2xl font-extrabold text-navy sm:text-3xl">
                Ideas de {service.galleryCategory?.toLowerCase()}
              </h2>
              <Link href="/#proyectos" className="inline-flex items-center gap-1 font-bold text-brand hover:underline">
                Ver todos los proyectos <ArrowRightIcon className="size-4" />
              </Link>
            </div>
            <ul className="mt-8 grid gap-5 sm:grid-cols-3">
              {related.map((p) => (
                <li key={p.id} className="overflow-hidden rounded-xl border border-navy/10">
                  <div className="relative aspect-[4/3] bg-mist">
                    <Image src={p.image.src} alt={p.image.alt} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" />
                    {p.image.demo && <DemoBadge className="absolute top-2 left-2" />}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-navy">{p.title}</h3>
                    <p className="mt-1 text-sm text-ink-muted">{p.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <section aria-labelledby="otros-title" className="bg-mist py-16 sm:py-20">
        <Container>
          <h2 id="otros-title" className="text-2xl font-extrabold text-navy sm:text-3xl">
            Otros servicios
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {others.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
