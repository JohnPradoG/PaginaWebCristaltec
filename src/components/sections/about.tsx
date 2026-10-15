import Image from "next/image";
import Link from "next/link";
import { images } from "@/content/images";
import { CheckIcon } from "../icons";
import { btn, Container, DemoBadge, SectionHeading } from "../ui";

/**
 * NOSOTROS
 * Texto comercial general. Cuando quieras contar la historia real de la
 * empresa (cómo nació, quiénes la forman, en qué se especializan), agrégala
 * en `ownerStory`. Mientras esté vacío, no se muestra.
 */
const ownerStory: string[] = [];

export function AboutSection() {
  const img = images.ventanalCorredera;
  return (
    <section id="nosotros" aria-labelledby="nosotros-title" className="py-20 sm:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative order-last aspect-[4/3] overflow-hidden rounded-2xl bg-mist lg:order-first lg:aspect-[5/6]">
          <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
          {img.demo && <DemoBadge className="absolute bottom-3 left-3" />}
        </div>
        <div>
          <SectionHeading
            id="nosotros-title"
            eyebrow="Nosotros"
            title="Soluciones pensadas para tus espacios"
            align="left"
          />
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-muted">
            <p>
              En CRISTALTE desarrollamos soluciones en aluminio, vidrio y PVC para hogares, comercios y proyectos de
              construcción. Cada trabajo parte por entender el espacio y lo que el cliente necesita.
            </p>
            <p>
              Trabajamos a medida porque cada lugar es distinto: las dimensiones, la luz, el uso y el estilo cambian
              de un proyecto a otro. Por eso cuidamos el diseño y las terminaciones, que son las que hacen la
              diferencia en el resultado final.
            </p>
            {ownerStory.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {["Diseño a medida", "Asesoría en materiales", "Terminaciones cuidadas", "Hogar y negocio"].map((t) => (
              <li key={t} className="flex items-center gap-3 font-semibold text-navy">
                <CheckIcon className="size-5 shrink-0 text-brand" />
                {t}
              </li>
            ))}
          </ul>
          <Link href="/#cotizar" className={btn("primary", "mt-9")}>
            Conversemos tu proyecto
          </Link>
        </div>
      </Container>
    </section>
  );
}
