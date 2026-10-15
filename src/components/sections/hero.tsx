import Image from "next/image";
import Link from "next/link";
import { images } from "@/content/images";
import { ChatIcon, RulerIcon, UserIcon } from "../icons";
import { btn, Container, DemoBadge } from "../ui";

const highlights = [
  { icon: RulerIcon, text: "Soluciones a medida" },
  { icon: ChatIcon, text: "Asesoría en el diseño" },
  { icon: UserIcon, text: "Atención personalizada" },
];

export function Hero() {
  const img = images.hero;
  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-navy-950">
      <Image
        src={img.src}
        alt={img.alt}
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        quality={72}
        className="-z-10 object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(10_30_51_/_0.92)_0%,rgb(16_45_74_/_0.78)_45%,rgb(16_45_74_/_0.25)_100%)]"
      />
      <Container className="grid min-h-[calc(100svh-72px)] items-center gap-10 py-16 sm:py-20 lg:min-h-[640px] lg:grid-cols-[1fr_auto] lg:py-24">
        <div className="max-w-2xl text-white">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-brand-light">
            Aluminio · Vidrio · PVC
          </p>
          <h1 id="hero-title" className="mt-4 text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Transformamos tus espacios con aluminio, vidrio y diseño
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/90 sm:text-xl">
            Soluciones a medida para tu hogar o negocio. Diseñamos espacios modernos, funcionales y elegantes con
            terminaciones cuidadas.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/#cotizar" className={btn("primary", "text-base")}>
              Solicitar cotización
            </Link>
            <Link href="/#proyectos" className={btn("outlineLight", "text-base")}>
              Ver nuestros proyectos
            </Link>
          </div>
        </div>

        <ul className="hidden w-72 space-y-1 rounded-2xl border border-white/15 bg-navy-950/55 p-3 text-white backdrop-blur-sm lg:block">
          {highlights.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-4 rounded-xl px-4 py-4">
              <span className="inline-flex size-11 items-center justify-center rounded-lg bg-white/10">
                <Icon className="size-6 text-brand-light" />
              </span>
              <span className="font-semibold">{text}</span>
            </li>
          ))}
        </ul>
      </Container>
      {img.demo && <DemoBadge className="absolute top-3 right-3" />}
    </section>
  );
}
