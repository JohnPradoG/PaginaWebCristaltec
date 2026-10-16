import Image from "next/image";
import Link from "next/link";
import { images } from "@/content/images";
import { whatsappMessages } from "@/lib/whatsapp";
import { WhatsAppLink } from "../whatsapp-link";
import { WhatsAppIcon } from "../icons";
import { btn, Container, DemoBadge } from "../ui";

export function CtaBanner() {
  const img = images.terrazaCasa;
  return (
    <section aria-labelledby="cta-title" className="relative isolate overflow-hidden bg-navy">
      <Image src={img.src} alt="" fill sizes="100vw" className="-z-10 object-cover" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(10_30_51_/_0.94)_0%,rgb(16_45_74_/_0.82)_55%,rgb(16_45_74_/_0.45)_100%)]"
      />
      <Container className="py-20 sm:py-24">
        <div className="max-w-2xl text-white">
          <h2 id="cta-title" className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            ¿Tienes un proyecto en mente?
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/90">
            Cuéntanos qué necesitas. En CRISTALTEC podemos ayudarte a encontrar una solución en aluminio, vidrio o PVC
            adaptada a tu espacio.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <WhatsAppLink trackLabel="banner" message={whatsappMessages.project()} className={btn("whatsapp", "text-base")}>
              <WhatsAppIcon className="size-5" />
              Cotizar mi proyecto
            </WhatsAppLink>
            <Link href="/#cotizar" className={btn("outlineLight", "text-base")}>
              Completar formulario
            </Link>
          </div>
        </div>
      </Container>
      {img.demo && <DemoBadge className="absolute right-3 bottom-3" />}
    </section>
  );
}
