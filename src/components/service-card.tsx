import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/content/services";
import { whatsappMessages } from "@/lib/whatsapp";
import { WhatsAppLink } from "./whatsapp-link";
import { ArrowRightIcon, WhatsAppIcon } from "./icons";
import { btn, DemoBadge } from "./ui";

export function ServiceCard({ service, headingLevel = "h3" }: { service: Service; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  const href = `/servicios/${service.slug}/`;
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-[0_12px_32px_-20px_rgb(16_45_74_/_0.45)]">
      <Link href={href} className="relative block aspect-[4/3] overflow-hidden bg-mist" tabIndex={-1} aria-hidden>
        <Image
          src={service.image.src}
          alt=""
          fill
          sizes="(min-width: 1280px) 300px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-950/55 via-transparent" />
        {service.image.demo && <DemoBadge className="absolute top-3 left-3" />}
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <Heading className="text-lg leading-snug font-extrabold text-navy">
          <Link href={href} className="hover:text-brand">
            {service.name}
          </Link>
        </Heading>
        <p className="mt-2 flex-1 leading-relaxed text-ink-muted">{service.summary}</p>
        <div className="mt-5 flex flex-col gap-2">
          <WhatsAppLink
            message={whatsappMessages.service(service.name)}
            className={btn("whatsapp", "w-full px-3 text-sm whitespace-nowrap")}
            ariaLabel={`Consultar por WhatsApp sobre ${service.name}`}
          >
            <WhatsAppIcon className="size-5" />
            Consultar por WhatsApp
          </WhatsAppLink>
          <Link
            href={href}
            className="inline-flex min-h-11 items-center justify-center gap-1 rounded-lg text-[15px] font-bold text-brand hover:bg-mist"
          >
            Ver detalles<span className="sr-only"> de {service.name}</span>
            <ArrowRightIcon className="size-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
