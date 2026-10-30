import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { seoLocation, siteConfig } from "@/config/site";
import { getService, servicePath, services } from "@/content/services";
import { categoryService, projects } from "@/content/projects";
import { absoluteUrl, breadcrumbJsonLd, faqJsonLd, jsonLdScript, pageMetadata } from "@/lib/seo";
import { priceList } from "@/content/prices";
import { PriceSection } from "@/components/sections/prices";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { ServiceCard } from "@/components/service-card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { QuoteFormSection } from "@/components/sections/quote-form";
import { ArrowRightIcon, CheckIcon, PlusIcon, WhatsAppIcon } from "@/components/icons";
import { btn, Container, DemoBadge } from "@/components/ui";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ servicio: s.slug }));
}

export async function generateMetadata(props: PageProps<"/[servicio]">): Promise<Metadata> {
  const { servicio } = await props.params;
  const service = getService(servicio);
  if (!service) return {};
  const location = seoLocation();
  return pageMetadata({
    title: location ? `${service.seo.title} en ${location}` : service.seo.title,
    description: service.seo.description,
    path: servicePath(service.slug),
  });
}

/** "Desde $66.000 CLP" → 66000. */
function priceValue(price: string) {
  return Number(price.replace(/\D/g, ""));
}

export default async function ServicePage(props: PageProps<"/[servicio]">) {
  const { servicio } = await props.params;
  const service = getService(servicio);
  if (!service) notFound();

  const path = servicePath(service.slug);
  const related = projects.filter((p) => categoryService[p.category] === service.slug).slice(0, 3);
  const relatedServices = service.related.map(getService).filter((s) => s !== undefined);
  const areas = siteConfig.contact.serviceAreas;
  const whatsappMessage = service.whatsappMessage;
  const prices = priceList.filter((p) => p.service === service.slug);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.name,
      serviceType: service.name,
      description: service.seo.description,
      url: absoluteUrl(path),
      provider: { "@id": absoluteUrl("/#empresa") },
      ...(areas.length > 0 ? { areaServed: areas.map((name) => ({ "@type": "City", name })) } : {}),
      ...(prices.length > 0
        ? {
            offers: {
              "@type": "AggregateOffer",
              priceCurrency: "CLP",
              lowPrice: Math.min(...prices.map((p) => priceValue(p.price))),
              offerCount: prices.length,
            },
          }
        : {}),
    },
    breadcrumbJsonLd([{ name: service.name, path }]),
    faqJsonLd(service.faqs),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(jsonLd)} />

      <section aria-labelledby="servicio-title" className="bg-mist">
        <Container className="grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-2 lg:gap-14">
          <div>
            <Breadcrumbs items={[{ name: service.name }]} />
            <h1 id="servicio-title" className="mt-5 text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">
              {service.h1}
            </h1>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-muted">
              {service.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <WhatsAppLink
                message={whatsappMessage}
                fallbackHref="#cotizar"
                trackLabel={`servicio:${service.slug}:inicio`}
                className={btn("whatsapp", "text-base")}
              >
                <WhatsAppIcon className="size-5" />
                Consultar por WhatsApp
              </WhatsAppLink>
              <a href="#cotizar" className={btn("outlineDark", "text-base")}>
                Solicitar cotización
              </a>
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

      <section aria-labelledby="beneficios-title" className="py-16 sm:py-20">
        <Container>
          <h2 id="beneficios-title" className="text-2xl font-extrabold text-navy sm:text-3xl">
            Beneficios de {lc(service.name)}
          </h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {service.benefits.map((b) => (
              <li key={b.title} className="rounded-2xl border border-navy/10 p-6">
                <h3 className="font-extrabold text-navy">{b.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-muted">{b.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-label="Usos, materiales y opciones" className="pb-16 sm:pb-20">
        <Container className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <div className="rounded-2xl bg-navy p-6 text-white sm:p-8">
            <h2 className="text-2xl font-extrabold">{service.applicationsTitle ?? "Dónde se usan"}</h2>
            <ul className="mt-6 space-y-3">
              {service.applications.map((a) => (
                <li key={a} className="flex gap-3">
                  <CheckIcon className="mt-0.5 size-5 shrink-0 text-brand-light" />
                  {a}
                </li>
              ))}
            </ul>
            <h2 className="mt-10 text-xl font-extrabold">Para cotizar más rápido</h2>
            <p className="mt-2 text-white/80">Si puedes, envíanos esta información:</p>
            <ul className="mt-4 space-y-3">
              {service.quoteTips.map((t) => (
                <li key={t} className="flex gap-3">
                  <CheckIcon className="mt-0.5 size-5 shrink-0 text-brand-light" />
                  {t}
                </li>
              ))}
            </ul>
            <WhatsAppLink
              message={whatsappMessage}
              fallbackHref="#cotizar"
              trackLabel={`servicio:${service.slug}:datos`}
              className={btn("whatsapp", "mt-8 w-full sm:w-auto")}
            >
              <WhatsAppIcon className="size-5" />
              Enviar datos por WhatsApp
            </WhatsAppLink>
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">{service.optionsTitle ?? "Materiales y opciones"}</h2>
            <dl className="mt-6 divide-y divide-navy/10 rounded-2xl border border-navy/10">
              {service.options.map((o) => (
                <div key={o.title} className="p-5 sm:p-6">
                  <dt className="font-extrabold text-navy">{o.title}</dt>
                  <dd className="mt-1.5 leading-relaxed text-ink-muted">{o.text}</dd>
                </div>
              ))}
            </dl>
            {service.extraImages.length > 0 && (
              <ul className="mt-6 grid grid-cols-2 gap-4">
                {service.extraImages.slice(0, 2).map((img) => (
                  <li key={img.src} className="relative aspect-[4/3] overflow-hidden rounded-xl bg-mist">
                    <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 340px, 50vw" className="object-cover" />
                    {img.demo && <DemoBadge className="absolute top-2 left-2" />}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Container>
      </section>

      {service.comparison && (
        <section aria-labelledby="comparacion-title" className="pb-16 sm:pb-20">
          <Container>
            <h2 id="comparacion-title" className="text-2xl font-extrabold text-navy sm:text-3xl">
              {service.comparison.title}
            </h2>
            <p className="mt-3 max-w-3xl text-lg leading-relaxed text-ink-muted">{service.comparison.intro}</p>
            <div className="mt-8 overflow-x-auto rounded-2xl border border-navy/10">
              <table className="w-full border-collapse text-left max-sm:text-[15px]">
                <caption className="sr-only">{service.comparison.title}</caption>
                <thead className="bg-navy text-white">
                  <tr className="max-sm:grid max-sm:grid-cols-2">
                    <th scope="col" className="w-1/4 p-4 font-bold max-sm:hidden">
                      <span className="sr-only">Característica</span>
                    </th>
                    {service.comparison.options.map((o) => (
                      <th key={o} scope="col" className="p-4 font-extrabold max-sm:p-3">
                        {o}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy/10">
                  {service.comparison.rows.map((row) => (
                    <tr key={row.label} className="align-top even:bg-mist max-sm:grid max-sm:grid-cols-2">
                      <th scope="row" className="p-4 font-bold text-navy max-sm:col-span-2 max-sm:px-3 max-sm:pb-0">
                        {row.label}
                      </th>
                      {row.values.map((v, i) => (
                        <td key={i} className="p-4 leading-relaxed text-ink-muted max-sm:px-3 max-sm:pt-1">
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {service.comparison.note && <p className="mt-4 text-ink-muted">{service.comparison.note}</p>}
          </Container>
        </section>
      )}

      <PriceSection items={prices} />

      {related.length > 0 && (
        <section aria-labelledby="relacionados-title" className="pb-16 sm:pb-20">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 id="relacionados-title" className="text-2xl font-extrabold text-navy sm:text-3xl">
                Trabajos de {lc(service.name)}
              </h2>
              <Link href="/proyectos/" className="inline-flex items-center gap-1 font-bold text-brand-dark hover:underline">
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

      <section aria-labelledby="faq-servicio-title" className="bg-mist py-16 sm:py-20">
        <Container className="max-w-4xl">
          <h2 id="faq-servicio-title" className="text-2xl font-extrabold text-navy sm:text-3xl">
            Preguntas frecuentes sobre {lc(service.name)}
          </h2>
          <div className="mt-8 space-y-3">
            {service.faqs.map((item) => (
              <details key={item.question} className="group rounded-xl border border-navy/10 bg-white">
                <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left text-[17px] font-bold text-navy">
                  <h3>{item.question}</h3>
                  <PlusIcon className="faq-icon size-6 shrink-0 text-brand transition-transform" />
                </summary>
                <p className="px-5 pb-5 leading-relaxed text-ink-muted">{item.answer}</p>
              </details>
            ))}
          </div>
          <p className="mt-6 text-ink-muted">
            ¿Tienes otra duda? Revisa las{" "}
            <Link href="/preguntas-frecuentes/" className="font-bold text-brand-dark hover:underline">
              preguntas frecuentes generales
            </Link>
            .
          </p>
        </Container>
      </section>

      <QuoteFormSection defaultService={service.name} title={`Cotiza ${lc(service.name)}`} />

      <Container className="pb-16 sm:pb-20">
        <p className="rounded-2xl border border-navy/10 bg-mist p-5 text-ink sm:p-6">
          <strong className="text-navy">¿Proyecto grande o comercial?</strong> Edificios, oficinas, locales u obras con
          varias unidades:{" "}
          <Link href="/proyectos-comerciales/" className="font-bold text-brand-dark underline">
            usa el formulario de proyectos comerciales
          </Link>
          .
        </p>
      </Container>

      <section aria-labelledby="otros-title" className="bg-mist py-16 sm:py-20">
        <Container>
          <h2 id="otros-title" className="text-2xl font-extrabold text-navy sm:text-3xl">
            Servicios relacionados
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {relatedServices.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

/** Primera letra en minúscula, respetando siglas como PVC. */
function lc(text: string) {
  if (/^[A-ZÁÉÍÓÚÑ]{2}/.test(text)) return text;
  return text.charAt(0).toLowerCase() + text.slice(1);
}
