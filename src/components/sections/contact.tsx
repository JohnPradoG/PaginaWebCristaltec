import { siteConfig } from "@/config/site";
import { whatsappMessages } from "@/lib/whatsapp";
import { WhatsAppLink } from "../whatsapp-link";
import { ContactList, getContactItems } from "../contact-details";
import { WhatsAppIcon } from "../icons";
import { btn, Container, SectionHeading } from "../ui";

export function ContactSection() {
  const map = siteConfig.contact.mapEmbedUrl;
  const hasContactData = getContactItems().length > 0 || Boolean(map);
  return (
    <section id="contacto" aria-labelledby="contacto-title" className="bg-navy py-20 text-white sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            id="contacto-title"
            eyebrow="Contacto"
            title="Hablemos de tu proyecto"
            intro="Escríbenos por WhatsApp o déjanos tus datos en el formulario. Te responderemos para orientarte y preparar tu cotización."
            align="left"
            tone="light"
          />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <WhatsAppLink trackLabel="contacto" message={whatsappMessages.general()} className={btn("whatsapp", "text-base")}>
              <WhatsAppIcon className="size-5" />
              Escribir por WhatsApp
            </WhatsAppLink>
            <a href="#cotizar" className={btn("outlineLight", "text-base")}>
              Ir al formulario
            </a>
          </div>
        </div>
        <div className="rounded-2xl border border-white/15 bg-navy-950/50 p-6 sm:p-8">
          {hasContactData ? <ContactList tone="light" /> : <Steps />}
          {map && (
            <iframe
              src={map}
              title="Ubicación de CRISTALTE en Google Maps"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="mt-6 aspect-[4/3] w-full rounded-xl border-0"
            />
          )}
        </div>
      </Container>
    </section>
  );
}

/** Se muestra mientras no haya datos de contacto configurados. */
function Steps() {
  const steps = [
    { title: "Cuéntanos tu proyecto", text: "Escríbenos por WhatsApp o completa el formulario con lo que necesitas." },
    { title: "Te asesoramos", text: "Revisamos medidas, materiales y alternativas contigo." },
    { title: "Recibe tu cotización", text: "Te enviamos una propuesta para tu espacio." },
  ];
  return (
    <>
      <h3 className="text-lg font-extrabold">¿Cómo cotizar?</h3>
      <ol className="mt-6 space-y-5">
        {steps.map((s, i) => (
          <li key={s.title} className="flex gap-4">
            <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-brand font-extrabold">
              {i + 1}
            </span>
            <div>
              <p className="font-bold">{s.title}</p>
              <p className="mt-0.5 text-white/75">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}
