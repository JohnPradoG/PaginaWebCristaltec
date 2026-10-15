import { isWhatsAppConfigured } from "@/config/site";
import { whatsappMessages } from "@/lib/whatsapp";
import { WhatsAppLink } from "./whatsapp-link";
import { ChatIcon, WhatsAppIcon } from "./icons";

/** Acceso flotante a WhatsApp, visible en móvil y escritorio. */
export function WhatsAppFloat() {
  const ready = isWhatsAppConfigured();
  return (
    <WhatsAppLink
      message={whatsappMessages.general()}
      ariaLabel={ready ? "Escríbenos por WhatsApp" : "Ir al formulario de cotización"}
      className="fixed right-4 bottom-4 z-30 inline-flex h-14 items-center gap-2 rounded-full bg-whatsapp pr-5 pl-4 text-white shadow-[0_10px_30px_-8px_rgb(10_30_51_/_0.55)] hover:bg-[#0b6631] sm:right-6 sm:bottom-6"
    >
      {ready ? <WhatsAppIcon className="size-7" /> : <ChatIcon className="size-6" />}
      <span className="text-[15px] font-bold">Cotizar</span>
    </WhatsAppLink>
  );
}
