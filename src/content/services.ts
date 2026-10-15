import { images, type SiteImage } from "./images";
import type { ProjectCategory } from "./projects";

/**
 * SERVICIOS
 * Cada servicio tiene su tarjeta en la portada y su propia página en
 * /servicios/<slug>/. Edita textos libremente; no agregues promesas de plazos,
 * garantías o certificaciones que la empresa no pueda respaldar.
 */
export type Service = {
  slug: string;
  name: string;
  /** Texto corto para la tarjeta. */
  summary: string;
  /** Párrafos de la página del servicio. */
  description: string[];
  /** Puntos que se muestran como "Qué podemos ver contigo". */
  highlights: string[];
  /** Información útil para cotizar este servicio. */
  quoteTips: string[];
  image: SiteImage;
  /** Categoría de la galería relacionada, para enlazar proyectos. */
  galleryCategory?: ProjectCategory;
  seo: { title: string; description: string };
};

export const services: Service[] = [
  {
    slug: "cerramientos-de-terrazas",
    name: "Cerramientos de terrazas",
    summary:
      "Aprovechamiento de espacios y protección frente a las condiciones ambientales, según el sistema elegido.",
    description: [
      "Un cerramiento de terraza permite sumar metros útiles a tu hogar o negocio y disfrutar el espacio durante más meses del año. Trabajamos soluciones en aluminio y vidrio adaptadas a las medidas y a la arquitectura de cada lugar.",
      "Te ayudamos a comparar sistemas (correderos, plegables u otras configuraciones disponibles) para elegir el que mejor se ajuste a tu espacio, a tu uso y a tu presupuesto.",
    ],
    highlights: [
      "Sistemas correderos y plegables, según factibilidad",
      "Perfiles de aluminio en distintos colores y terminaciones",
      "Distintas alternativas de vidrio según el proyecto",
      "Diseño adaptado a las medidas de tu terraza",
    ],
    quoteTips: [
      "Medidas aproximadas de ancho y alto",
      "Fotografías de la terraza desde distintos ángulos",
      "Si es casa o departamento y en qué piso se encuentra",
    ],
    image: images.terrazaPlegable,
    galleryCategory: "Terrazas",
    seo: {
      title: "Cerramientos de terrazas en aluminio y vidrio",
      description:
        "Cerramientos de terrazas a medida en aluminio y vidrio para casas y departamentos. Cotiza tu proyecto con CRISTALTE por WhatsApp.",
    },
  },
  {
    slug: "shower-doors-y-mamparas",
    name: "Shower doors y mamparas de baño",
    summary:
      "Soluciones de vidrio para baños modernos, con distintos diseños y configuraciones.",
    description: [
      "Un shower door o mampara de vidrio renueva el baño, aporta luminosidad y facilita la limpieza. Diseñamos cada solución según las medidas de tu ducha o tina.",
      "Podemos orientarte sobre configuraciones fijas, abatibles o correderas, y sobre los herrajes y terminaciones disponibles.",
    ],
    highlights: [
      "Configuraciones fijas, abatibles o correderas",
      "Opciones de herrajes y terminaciones",
      "Vidrio transparente u otras alternativas disponibles",
      "Medidas tomadas para tu baño",
    ],
    quoteTips: [
      "Medidas aproximadas del vano de la ducha o tina",
      "Fotografía del baño",
      "Estilo que te gusta (con o sin perfiles visibles, por ejemplo)",
    ],
    image: images.showerMarmol,
    galleryCategory: "Shower doors",
    seo: {
      title: "Shower doors y mamparas de baño a medida",
      description:
        "Shower doors y mamparas de baño en vidrio a medida. Diseños modernos para tu baño. Cotiza con CRISTALTE por WhatsApp.",
    },
  },
  {
    slug: "ventanas-de-aluminio",
    name: "Ventanas de aluminio",
    summary:
      "Ventanas a medida para viviendas, departamentos y espacios comerciales.",
    description: [
      "Fabricamos e instalamos ventanas de aluminio a medida para obras nuevas, remodelaciones y reemplazos. El aluminio permite perfiles resistentes y diseños limpios en distintos colores.",
      "Te asesoramos para elegir el tipo de apertura y el vidrio más adecuados según el uso del espacio.",
    ],
    highlights: [
      "Ventanas correderas, proyectantes y fijas, según el sistema",
      "Distintos colores de perfil",
      "Opciones de vidrio según la necesidad del espacio",
      "Reemplazo de ventanas existentes",
    ],
    quoteTips: [
      "Cantidad de ventanas y medidas aproximadas",
      "Tipo de apertura que prefieres",
      "Fotografías de las ventanas actuales, si es un reemplazo",
    ],
    image: images.ventanasDormitorio,
    galleryCategory: "Ventanas",
    seo: {
      title: "Ventanas de aluminio a medida",
      description:
        "Fabricación e instalación de ventanas de aluminio a medida para casas, departamentos y locales. Solicita tu cotización con CRISTALTE.",
    },
  },
  {
    slug: "ventanas-de-pvc",
    name: "Ventanas y soluciones en PVC",
    summary:
      "Alternativas según las necesidades del proyecto y las especificaciones de los materiales.",
    description: [
      "Las ventanas de PVC son una alternativa a considerar cuando el proyecto busca un buen desempeño frente al frío, el ruido o la condensación, según el sistema y el vidrio que se elijan.",
      "Te ayudamos a comparar PVC y aluminio para que tomes una decisión informada según tu espacio y tu presupuesto.",
    ],
    highlights: [
      "Ventanas y puertas en PVC",
      "Aperturas abatibles, oscilobatientes o correderas, según el sistema",
      "Comparación con alternativas en aluminio",
      "Asesoría sobre el tipo de vidrio",
    ],
    quoteTips: [
      "Cantidad de ventanas y medidas aproximadas",
      "Qué buscas mejorar (frío, ruido, condensación, estética)",
      "Fotografías del lugar",
    ],
    image: images.ventanaPvc,
    galleryCategory: "PVC",
    seo: {
      title: "Ventanas de PVC a medida",
      description:
        "Ventanas y soluciones en PVC a medida para tu hogar o negocio. Te asesoramos para elegir entre PVC y aluminio. Cotiza con CRISTALTE.",
    },
  },
  {
    slug: "puertas-de-aluminio-y-vidrio",
    name: "Puertas de aluminio y vidrio",
    summary: "Diseños para accesos, interiores y espacios comerciales.",
    description: [
      "Puertas de aluminio y vidrio para accesos principales, terrazas, interiores, oficinas y locales comerciales, diseñadas a medida según el espacio.",
      "Podemos orientarte sobre sistemas abatibles o correderos y sobre la combinación de perfiles, vidrios y herrajes.",
    ],
    highlights: [
      "Puertas de acceso, interiores y de terraza",
      "Sistemas abatibles y correderos",
      "Soluciones para locales comerciales",
      "Combinaciones de perfiles, vidrios y herrajes",
    ],
    quoteTips: [
      "Medidas aproximadas del vano",
      "Uso de la puerta (acceso, interior, comercio)",
      "Fotografías del lugar",
    ],
    image: images.puertaComercial,
    galleryCategory: "Puertas",
    seo: {
      title: "Puertas de aluminio y vidrio",
      description:
        "Puertas de aluminio y vidrio a medida para hogares, oficinas y locales comerciales. Cotiza tu puerta con CRISTALTE por WhatsApp.",
    },
  },
  {
    slug: "espejos-a-medida",
    name: "Espejos a medida",
    summary:
      "Espejos para baños, dormitorios, gimnasios, comercios y otros espacios.",
    description: [
      "Un espejo a medida amplía visualmente los espacios y aporta luz. Lo dimensionamos según el muro y el uso: baños, dormitorios, salas de ejercicio, comercios y más.",
      "Te orientamos sobre formatos, cantos y formas de instalación según el lugar.",
    ],
    highlights: [
      "Espejos para baños y dormitorios",
      "Espejos de gran formato para gimnasios y salas",
      "Soluciones para comercios",
      "Formatos y cantos según el diseño",
    ],
    quoteTips: [
      "Medidas aproximadas del espejo o del muro",
      "Lugar donde se instalará",
      "Fotografía del muro",
    ],
    image: images.espejoGrande,
    galleryCategory: "Espejos",
    seo: {
      title: "Espejos a medida para hogar y comercio",
      description:
        "Espejos a medida para baños, dormitorios, gimnasios y comercios. Cotiza tu espejo con CRISTALTE por WhatsApp.",
    },
  },
  {
    slug: "barandas-de-vidrio",
    name: "Barandas de vidrio",
    summary:
      "Soluciones para terrazas, escaleras y balcones, sujetas a las condiciones técnicas y de seguridad correspondientes.",
    description: [
      "Las barandas de vidrio dan continuidad visual a terrazas, balcones y escaleras sin perder protección. Cada proyecto se evalúa según el lugar de instalación y las condiciones técnicas y de seguridad correspondientes.",
      "Te asesoramos sobre los sistemas de fijación y terminaciones disponibles para tu espacio.",
    ],
    highlights: [
      "Barandas para terrazas y balcones",
      "Barandas para escaleras",
      "Distintos sistemas de fijación, según el caso",
      "Evaluación técnica del lugar de instalación",
    ],
    quoteTips: [
      "Largo aproximado de la baranda",
      "Tipo de superficie donde se instalará",
      "Fotografías del lugar",
    ],
    image: images.barandaEscalera,
    galleryCategory: "Barandas",
    seo: {
      title: "Barandas de vidrio para terrazas y escaleras",
      description:
        "Barandas de vidrio para terrazas, balcones y escaleras, evaluadas según las condiciones de cada lugar. Cotiza con CRISTALTE.",
    },
  },
  {
    slug: "divisiones-y-trabajos-especiales",
    name: "Divisiones y otros trabajos especiales",
    summary: "Proyectos personalizados en vidrio y aluminio.",
    description: [
      "Divisiones de vidrio para oficinas, comercios y hogares, y otros trabajos especiales en vidrio y aluminio que no encajan en un catálogo estándar.",
      "Cuéntanos tu idea: revisamos la factibilidad y te proponemos una solución a medida.",
    ],
    highlights: [
      "Divisiones de vidrio para oficinas y comercios",
      "Separaciones de ambientes en el hogar",
      "Proyectos especiales en vidrio y aluminio",
      "Soluciones para constructoras y arquitectos",
    ],
    quoteTips: [
      "Descripción de lo que necesitas",
      "Medidas aproximadas",
      "Fotografías, planos o referencias, si los tienes",
    ],
    image: images.divisionOficina,
    seo: {
      title: "Divisiones de vidrio y trabajos especiales",
      description:
        "Divisiones de vidrio para oficinas y hogares, y proyectos especiales en vidrio y aluminio a medida. Cotiza con CRISTALTE.",
    },
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

/** Lista de nombres para el selector del formulario. */
export const serviceOptions = [...services.map((s) => s.name), "Otro / no estoy seguro"];
