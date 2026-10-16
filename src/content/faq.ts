import { siteConfig } from "@/config/site";

/**
 * PREGUNTAS FRECUENTES
 * Las respuestas son prudentes a propósito. Cuando tengas datos confirmados
 * (comunas, plazos habituales, formas de pago), edítalas aquí.
 */
import type { FaqItem } from "./faq-types";

export type { FaqItem };

const areas = siteConfig.contact.serviceAreas;

export const faqs: FaqItem[] = [
  {
    question: "¿Cómo puedo solicitar una cotización?",
    answer:
      "Puedes escribirnos por WhatsApp desde cualquier botón de la página o completar el formulario de cotización. Con los datos que nos envíes preparamos una propuesta para tu proyecto.",
  },
  {
    question: "¿Fabrican productos a medida?",
    answer:
      "Sí. Nuestras soluciones en aluminio, vidrio y PVC se diseñan según las medidas y necesidades de cada proyecto.",
  },
  {
    question: "¿Qué información debo entregar para cotizar?",
    answer:
      "Lo ideal es indicar el tipo de trabajo, las medidas aproximadas, la comuna y, si puedes, fotografías del espacio. Si no tienes las medidas exactas, igual podemos orientarte.",
  },
  {
    question: "¿Trabajan con aluminio y PVC?",
    answer:
      "Sí, trabajamos soluciones en aluminio, vidrio y PVC. Te ayudamos a comparar alternativas según el uso del espacio y tu presupuesto.",
  },
  {
    question: "¿Puedo enviar fotografías del espacio?",
    answer:
      "Sí, y nos ayuda mucho. Puedes enviarlas directamente por WhatsApp junto con tu consulta.",
  },
  {
    question: "¿Realizan instalaciones?",
    answer:
      "Coordinamos la fabricación y la instalación cuando corresponde al tipo de proyecto. Te lo confirmamos al momento de cotizar.",
  },
  {
    question: "¿En qué comunas trabajan?",
    answer:
      areas.length > 0
        ? `Actualmente trabajamos en ${areas.join(", ")}. Si tu comuna no aparece, escríbenos y lo revisamos.`
        : "Escríbenos indicando tu comuna y te confirmamos si podemos atender tu proyecto.",
  },
  {
    question: "¿Cuánto demora un proyecto?",
    answer:
      "Depende del tipo de trabajo, las medidas, los materiales y la disponibilidad. Al cotizar te informamos un plazo estimado para tu caso.",
  },
];
