"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { categoryService, projectCategories, projects, type ProjectCategory } from "@/content/projects";
import { whatsappMessages } from "@/lib/whatsapp";
import { WhatsAppLink } from "../whatsapp-link";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon, PinIcon, PlusIcon, WhatsAppIcon } from "../icons";
import { btn, Container, DemoBadge, SectionHeading } from "../ui";

type Filter = "Todos" | ProjectCategory;
const filters: Filter[] = ["Todos", ...projectCategories];

type GalleryProps = {
  /** Cantidad máxima de proyectos visibles (portada). Sin límite en /proyectos/. */
  limit?: number;
  /** "h1" cuando la galería es la página principal (/proyectos/). */
  headingLevel?: "h1" | "h2";
  title?: string;
};

export function GallerySection({ limit, headingLevel = "h2", title = "Ideas para tu próximo proyecto" }: GalleryProps = {}) {
  const [filter, setFilter] = useState<Filter>("Todos");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const visible = useMemo(() => {
    const list = filter === "Todos" ? projects : projects.filter((p) => p.category === filter);
    return limit ? list.slice(0, limit) : list;
  }, [filter, limit]);
  const current = openIndex !== null ? visible[openIndex] : null;
  const hasDemo = visible.some((p) => p.image.demo);

  const open = (index: number, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setOpenIndex(index);
  };
  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (delta: number) => setOpenIndex((i) => (i === null ? i : (i + delta + visible.length) % visible.length)),
    [visible.length],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (openIndex !== null && !dialog.open) dialog.showModal();
    if (openIndex === null && dialog.open) {
      dialog.close();
      triggerRef.current?.focus();
    }
  }, [openIndex]);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openIndex, step]);

  return (
    <section id="proyectos" aria-labelledby="proyectos-title" className="bg-mist py-20 sm:py-24">
      <Container>
        <SectionHeading
          id="proyectos-title"
          eyebrow="Proyectos"
          title={title}
          intro="Explora por categoría y consulta por un trabajo similar para tu espacio."
          as={headingLevel}
        />

        <div role="group" aria-label="Filtrar proyectos por categoría" className="mt-10 -mx-4 overflow-x-auto px-4 pb-2">
          <div className="flex w-max gap-2 sm:mx-auto sm:w-auto sm:flex-wrap sm:justify-center">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
                className={`min-h-11 rounded-full border px-5 text-[15px] font-bold whitespace-nowrap transition-colors ${
                  filter === f
                    ? "border-navy bg-navy text-white"
                    : "border-navy/20 bg-white text-navy hover:border-navy"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          {visible.length} proyectos en {filter === "Todos" ? "todas las categorías" : filter}
        </p>

        <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
          {visible.map((project, index) => (
            <li key={project.id}>
              <button
                type="button"
                onClick={(e) => open(index, e.currentTarget)}
                className="group relative block aspect-[4/3] w-full overflow-hidden rounded-xl bg-navy/10 text-left"
                aria-label={`Ampliar: ${project.title}`}
              >
                <Image
                  src={project.image.src}
                  alt={project.image.alt}
                  fill
                  sizes="(min-width: 1024px) 400px, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/10 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 sm:p-4">
                  <span>
                    <span className="block text-[11px] font-bold tracking-wider text-brand-light uppercase sm:text-xs">
                      {project.category}
                    </span>
                    <span className="block text-sm leading-snug font-bold text-white sm:text-base">{project.title}</span>
                  </span>
                  <PlusIcon className="hidden size-6 shrink-0 text-white sm:block" />
                </span>
                {project.image.demo && <DemoBadge className="absolute top-2 left-2" />}
              </button>
            </li>
          ))}
        </ul>

        {limit && (
          <div className="mt-8 text-center">
            <Link href="/proyectos/" className={btn("outlineDark")}>
              Ver todos los proyectos
            </Link>
          </div>
        )}

        {hasDemo && (
          <p className="mt-6 text-center text-sm text-ink-muted">
            Las fotografías marcadas como “Imagen referencial” son ejemplos ilustrativos de terceros y no corresponden a
            trabajos realizados por CRISTALTEC.
          </p>
        )}
      </Container>

      <dialog
        ref={dialogRef}
        onClose={close}
        onClick={(e) => e.target === e.currentTarget && close()}
        aria-label={current ? current.title : "Vista ampliada"}
        className="m-auto max-h-[100dvh] w-full max-w-5xl bg-transparent p-0 text-white backdrop:bg-navy-950/90 sm:p-4"
      >
        {current && (
          <div className="relative overflow-hidden bg-navy-950 sm:rounded-2xl">
            <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
              <Image src={current.image.src} alt={current.image.alt} fill sizes="(min-width: 1024px) 1000px, 100vw" className="object-cover" />
              {current.image.demo && <DemoBadge className="absolute top-3 left-3" />}
              <button
                type="button"
                onClick={close}
                className="absolute top-2 right-2 inline-flex size-12 items-center justify-center rounded-full bg-navy-950/70 hover:bg-navy-950"
                aria-label="Cerrar vista ampliada"
              >
                <CloseIcon className="size-6" />
              </button>
              {visible.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    className="absolute top-1/2 left-2 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-navy-950/70 hover:bg-navy-950"
                    aria-label="Proyecto anterior"
                  >
                    <ChevronLeftIcon className="size-6" />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    className="absolute top-1/2 right-2 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-navy-950/70 hover:bg-navy-950"
                    aria-label="Proyecto siguiente"
                  >
                    <ChevronRightIcon className="size-6" />
                  </button>
                </>
              )}
            </div>
            <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-end sm:justify-between sm:p-6">
              <div>
                <p className="text-xs font-bold tracking-wider text-brand-light uppercase">{current.category}</p>
                <h3 className="mt-1 text-xl font-extrabold">{current.title}</h3>
                <p className="mt-2 max-w-xl text-white/85">{current.description}</p>
                {(current.need || current.solution || current.material) && (
                  <dl className="mt-3 max-w-xl space-y-1.5 text-sm text-white/85">
                    {current.need && (
                      <div>
                        <dt className="inline font-bold text-white">Necesidad: </dt>
                        <dd className="inline">{current.need}</dd>
                      </div>
                    )}
                    {current.solution && (
                      <div>
                        <dt className="inline font-bold text-white">Solución: </dt>
                        <dd className="inline">{current.solution}</dd>
                      </div>
                    )}
                    {current.material && (
                      <div>
                        <dt className="inline font-bold text-white">Material: </dt>
                        <dd className="inline">{current.material}</dd>
                      </div>
                    )}
                  </dl>
                )}
                {current.before && (
                  <figure className="mt-3 w-40">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                      <Image src={current.before.src} alt={current.before.alt} fill sizes="160px" className="object-cover" />
                    </div>
                    <figcaption className="mt-1 text-xs text-white/75">Antes</figcaption>
                  </figure>
                )}
                <Link
                  href={`/${categoryService[current.category]}/`}
                  className="mt-3 inline-block text-sm font-bold text-brand-light underline"
                >
                  Ver servicio de {current.category.toLowerCase() === "pvc" ? "PVC" : current.category.toLowerCase()}
                </Link>
                {current.location && (
                  <p className="mt-2 flex items-center gap-1.5 text-sm text-white/75">
                    <PinIcon className="size-4" /> {current.location}
                  </p>
                )}
              </div>
              <WhatsAppLink
                message={whatsappMessages.similarProject(current.title, current.category)}
                trackLabel={`proyecto:${current.id}`}
                className={btn("whatsapp", "shrink-0")}
              >
                <WhatsAppIcon className="size-5" />
                Consultar un proyecto similar
              </WhatsAppLink>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
