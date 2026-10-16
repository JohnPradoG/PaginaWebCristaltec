import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Aviso de privacidad",
  description: "Cómo CRISTALTEC trata los datos que compartes al solicitar una cotización.",
  path: "/privacidad/",
});

export default function PrivacyPage() {
  const email = siteConfig.contact.email;
  return (
    <Container className="max-w-3xl py-16 sm:py-20">
      <h1 className="text-4xl font-extrabold tracking-tight text-navy">Aviso de privacidad</h1>
      <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-muted [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:text-navy">
        <p>
          En {siteConfig.name} respetamos tu privacidad. Este aviso explica qué ocurre con la información que compartes
          a través de este sitio web.
        </p>
        <h2>Formulario de cotización</h2>
        <p>
          El formulario de cotización no envía ni almacena tus datos en un servidor. Al presionar “Continuar en
          WhatsApp”, el sitio prepara un mensaje con la información que escribiste y abre WhatsApp en tu dispositivo.
          Tú decides si envías ese mensaje.
        </p>
        <h2>Uso de la información</h2>
        <p>
          Los datos que nos envías por WhatsApp, teléfono o correo se usan únicamente para responder tu consulta,
          preparar una cotización y coordinar el trabajo solicitado. No los vendemos ni los compartimos con terceros
          para fines comerciales.
        </p>
        <p>
          Al usar WhatsApp, la comunicación también queda sujeta a las condiciones y a la política de privacidad de
          WhatsApp.
        </p>
        <h2>Medición del sitio</h2>
        <p>
          {siteConfig.analytics.googleAnalyticsId
            ? "Si lo aceptas en el aviso que aparece al entrar, este sitio usa Google Analytics para conocer de forma agregada cuántas personas lo visitan, qué páginas ven y cuántas consultas se inician por WhatsApp. Google Analytics usa cookies. Si lo rechazas, no se carga. Puedes cambiar tu decisión borrando los datos del sitio en tu navegador."
            : "Actualmente este sitio no utiliza herramientas de medición ni cookies de seguimiento."}
        </p>
        <h2>Tus derechos</h2>
        <p>
          Puedes solicitar en cualquier momento el acceso, la corrección o la eliminación de los datos que nos hayas
          entregado{email ? (
            <>
              {" "}escribiendo a{" "}
              <a href={`mailto:${email}`} className="font-semibold text-brand underline">
                {email}
              </a>
            </>
          ) : (
            " a través de nuestros canales de contacto"
          )}
          .
        </p>
      </div>
    </Container>
  );
}
