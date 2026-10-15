import { faqs } from "@/content/faq";
import { PlusIcon } from "../icons";
import { Container, SectionHeading } from "../ui";

export function FaqSection() {
  return (
    <section id="preguntas" aria-labelledby="preguntas-title" className="bg-mist py-20 sm:py-24">
      <Container className="max-w-4xl">
        <SectionHeading id="preguntas-title" eyebrow="Preguntas frecuentes" title="Resolvemos tus dudas" />
        <div className="mt-12 space-y-3">
          {faqs.map((item) => (
            <details key={item.question} className="group rounded-xl border border-navy/10 bg-white">
              <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left text-[17px] font-bold text-navy">
                <h3>{item.question}</h3>
                <PlusIcon className="faq-icon size-6 shrink-0 text-brand transition-transform" />
              </summary>
              <p className="px-5 pb-5 leading-relaxed text-ink-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
