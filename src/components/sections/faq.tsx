import Link from "next/link";
import { faqs } from "@/content/faq";
import { PlusIcon } from "../icons";
import { Container, SectionHeading } from "../ui";

type FaqProps = {
  /** Cantidad de preguntas visibles (portada). Sin límite en /preguntas-frecuentes/. */
  limit?: number;
  headingLevel?: "h1" | "h2";
};

export function FaqSection({ limit, headingLevel = "h2" }: FaqProps = {}) {
  const items = limit ? faqs.slice(0, limit) : faqs;
  return (
    <section id="preguntas" aria-labelledby="preguntas-title" className="bg-mist py-20 sm:py-24">
      <Container className="max-w-4xl">
        <SectionHeading
          id="preguntas-title"
          eyebrow="Preguntas frecuentes"
          title={headingLevel === "h1" ? "Preguntas frecuentes" : "Resolvemos tus dudas"}
          as={headingLevel}
        />
        <div className="mt-12 space-y-3">
          {items.map((item) => (
            <details key={item.question} className="group rounded-xl border border-navy/10 bg-white">
              <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left text-[17px] font-bold text-navy">
                <h3>{item.question}</h3>
                <PlusIcon className="faq-icon size-6 shrink-0 text-brand transition-transform" />
              </summary>
              <p className="px-5 pb-5 leading-relaxed text-ink-muted">{item.answer}</p>
            </details>
          ))}
        </div>
        {limit && (
          <p className="mt-8 text-center">
            <Link href="/preguntas-frecuentes/" className="font-bold text-brand-dark hover:underline">
              Ver todas las preguntas frecuentes
            </Link>
          </p>
        )}
      </Container>
    </section>
  );
}
