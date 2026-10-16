import { images, type SiteImage } from "./images";
import type { ProjectCategory } from "./projects";
import type { FaqItem } from "./faq-types";

/**
 * SERVICIOS
 * Cada servicio tiene su tarjeta en la portada y su propia página en /<slug>/
 * (por ejemplo /ventanas-de-aluminio/). Cada página apunta a una búsqueda
 * distinta (`searchIntent`) para no competir entre ellas.
 *
 * Edita los textos libremente, pero no agregues promesas de plazos, garantías,
 * certificaciones, marcas o productos (como termopanel) que la empresa no
 * pueda respaldar.
 *
 * Si cambias un `slug`, agrega una redirección 301 en vercel.json desde la URL
 * anterior.
 */
export type Service = {
  slug: string;
  /** Nombre corto (tarjetas, menú, formulario). */
  name: string;
  /** Qué busca la persona que debería llegar a esta página. Uso interno. */
  searchIntent: string;
  /** Título principal visible (H1). */
  h1: string;
  /** Texto corto para la tarjeta. */
  summary: string;
  /** Párrafos de introducción. */
  intro: string[];
  /** Beneficios del producto (información general, no promesas de la empresa). */
  benefits: { title: string; text: string }[];
  /** Dónde se usa. */
  applications: string[];
  /** Materiales, sistemas y opciones que se pueden conversar. */
  options: { title: string; text: string }[];
  /** Información útil para cotizar este servicio. */
  quoteTips: string[];
  faqs: FaqItem[];
  /** Slugs de servicios relacionados para enlazar. */
  related: string[];
  image: SiteImage;
  /** Fotos adicionales para la página. */
  extraImages: SiteImage[];
  /** Categoría de la galería relacionada, para enlazar proyectos. */
  galleryCategory?: ProjectCategory;
  seo: { title: string; description: string };
};

export const services: Service[] = [
  {
    slug: "ventanas-de-aluminio",
    name: "Ventanas de aluminio",
    searchIntent: "Quien busca fabricar, cambiar o instalar ventanas de aluminio a medida en su casa, departamento o local.",
    h1: "Ventanas de aluminio a medida",
    summary: "Ventanas correderas, proyectantes y ventanales fabricados según las medidas de cada vano.",
    intro: [
      "Las ventanas de aluminio son una de las soluciones más usadas en Chile por su resistencia, su bajo mantenimiento y la variedad de formatos que permiten. Sirven tanto para una obra nueva como para reemplazar ventanas antiguas que ya no cierran bien.",
      "En CRISTALTE fabricamos cada ventana según las medidas de tu vano. Te ayudamos a elegir el tipo de apertura, el color del perfil y el vidrio más adecuado para cada ambiente.",
    ],
    benefits: [
      { title: "Bajo mantenimiento", text: "El aluminio no se oxida como el fierro ni necesita pintura periódica. Basta con limpiar perfiles y rieles." },
      { title: "Perfiles delgados", text: "Permite paños de vidrio grandes con marcos finos, lo que deja entrar más luz." },
      { title: "Muchos formatos", text: "Correderas, proyectantes, abatibles, fijos o combinados en un mismo vano." },
      { title: "Diseño a elección", text: "Distintos colores y terminaciones de perfil para que combinen con la fachada." },
    ],
    applications: [
      "Dormitorios, livings y cocinas de casas y departamentos",
      "Reemplazo de ventanas antiguas o en mal estado",
      "Ventanales de piso a techo hacia patios y terrazas",
      "Locales comerciales y oficinas",
    ],
    options: [
      { title: "Tipo de apertura", text: "Corredera para ahorrar espacio, proyectante para ventilar con lluvia, abatible o paño fijo donde no se necesita abrir." },
      { title: "Color del perfil", text: "Colores y terminaciones disponibles según la línea de perfil elegida. Te mostramos las alternativas al cotizar." },
      { title: "Tipo de vidrio", text: "Alternativas de vidrio según el uso, la seguridad que necesitas y el presupuesto. Te mostramos las disponibles al cotizar." },
      { title: "Accesorios", text: "Manillas, cierres y mallas según el tipo de ventana." },
    ],
    quoteTips: [
      "Ancho y alto aproximado de cada ventana",
      "Cuántas ventanas son y en qué ambientes",
      "Fotografía de las ventanas actuales o del vano",
      "Si es reemplazo o una obra nueva",
    ],
    faqs: [
      {
        question: "¿Qué ventana de aluminio conviene: corredera o proyectante?",
        answer:
          "La corredera aprovecha mejor el espacio y es habitual en ventanas anchas y ventanales. La proyectante abre hacia afuera desde abajo y permite ventilar aunque llueva, por lo que se usa mucho en baños y cocinas. Muchas veces se combinan ambas en un mismo vano.",
      },
      {
        question: "¿Pueden cambiar mis ventanas antiguas por ventanas de aluminio?",
        answer:
          "Sí, el reemplazo de ventanas es uno de los trabajos más comunes. Para cotizar necesitamos las medidas aproximadas y una foto de cada ventana; después se confirman las medidas exactas en terreno.",
      },
      {
        question: "¿Cómo se limpian y mantienen las ventanas de aluminio?",
        answer:
          "Basta con agua y un detergente suave en perfiles y vidrios, y mantener limpios los rieles para que las hojas corran bien. Evita productos abrasivos o con solventes que dañen la terminación.",
      },
    ],
    related: ["ventanas-de-pvc", "puertas-de-aluminio-y-vidrio", "cerramientos-de-terrazas"],
    image: images.ventanasDormitorio,
    extraImages: [images.ventanalCorredera],
    galleryCategory: "Ventanas",
    seo: {
      title: "Ventanas de aluminio a medida",
      description:
        "Fabricación e instalación de ventanas de aluminio a medida: correderas, proyectantes y ventanales para casas, departamentos y locales. Cotiza con CRISTALTE.",
    },
  },
  {
    slug: "ventanas-de-pvc",
    name: "Ventanas de PVC",
    searchIntent: "Quien compara ventanas de PVC para mejorar la aislación térmica y acústica de su casa o departamento.",
    h1: "Ventanas de PVC a medida",
    summary: "Ventanas y puertas de PVC para quienes buscan más aislación térmica y acústica.",
    intro: [
      "El PVC es un material que conduce poco el calor, por eso las ventanas de PVC se eligen cuando se quiere mejorar la aislación del hogar: menos frío en invierno, menos calor en verano y menos ruido de la calle.",
      "Te ayudamos a comparar si te conviene PVC o aluminio según el ambiente, la orientación y tu presupuesto, y fabricamos cada ventana a la medida del vano.",
    ],
    benefits: [
      { title: "Aislación térmica", text: "El perfil de PVC transmite menos frío y calor que un perfil metálico, lo que ayuda a mantener la temperatura interior." },
      { title: "Menos ruido", text: "Con un buen cierre y el vidrio adecuado, ayuda a reducir el ruido exterior." },
      { title: "Menos condensación", text: "Al ser un perfil más templado, suele presentar menos humedad en los marcos que una ventana antigua." },
      { title: "Fácil de limpiar", text: "No necesita pintura y se limpia con agua y jabón neutro." },
    ],
    applications: [
      "Dormitorios y livings donde se busca más confort",
      "Departamentos en avenidas con ruido",
      "Casas en zonas frías o con mucha exposición al sol",
      "Puertas de cocina, logia o salida a patio",
    ],
    options: [
      { title: "Tipo de apertura", text: "Oscilobatiente (abre hacia adentro y también se inclina para ventilar), corredera, abatible o fija." },
      { title: "Color", text: "Blanco y otros colores o acabados según la línea disponible." },
      { title: "Vidrio", text: "La aislación final depende mucho del vidrio. Te explicamos las alternativas disponibles para tu proyecto." },
      { title: "PVC o aluminio", text: "Si el objetivo principal es aislar, el PVC suele ser mejor opción. Si buscas perfiles muy delgados o grandes ventanales, conversemos el aluminio." },
    ],
    quoteTips: [
      "Medidas aproximadas de cada ventana",
      "Qué problema quieres resolver: frío, ruido, humedad o cambio de diseño",
      "Fotografías de las ventanas actuales",
      "Piso del departamento, si aplica",
    ],
    faqs: [
      {
        question: "¿Qué diferencia hay entre una ventana de PVC y una de aluminio?",
        answer:
          "El PVC aísla mejor el frío, el calor y el ruido porque conduce menos la temperatura. El aluminio permite perfiles más delgados, paños más grandes y más colores. La elección depende de qué es más importante en cada ambiente.",
      },
      {
        question: "¿Las ventanas de PVC sirven para departamentos?",
        answer:
          "Sí. Son una opción frecuente en departamentos que dan a calles con ruido o que tienen problemas de frío y condensación. Antes de cambiar ventanas en un edificio, revisa si el reglamento de copropiedad exige un color o modelo.",
      },
      {
        question: "¿Qué es una ventana oscilobatiente?",
        answer:
          "Es una ventana que se abre hacia adentro como una puerta y que, girando la manilla a otra posición, se inclina desde arriba para ventilar sin abrirla completa. Es muy común en ventanas de PVC.",
      },
    ],
    related: ["ventanas-de-aluminio", "puertas-de-aluminio-y-vidrio", "cerramientos-de-terrazas"],
    image: images.ventanaPvc,
    extraImages: [images.puertaPvcCocina],
    galleryCategory: "PVC",
    seo: {
      title: "Ventanas de PVC a medida",
      description:
        "Ventanas de PVC a medida para mejorar la aislación térmica y acústica de casas y departamentos. Compara PVC y aluminio y cotiza con CRISTALTE.",
    },
  },
  {
    slug: "puertas-de-aluminio-y-vidrio",
    name: "Puertas de aluminio y vidrio",
    searchIntent: "Quien necesita una puerta de aluminio o de vidrio para su casa, terraza, oficina o local comercial.",
    h1: "Puertas de aluminio y vidrio",
    summary: "Puertas correderas, de abatir y accesos para hogares, oficinas y locales comerciales.",
    intro: [
      "Una puerta de aluminio y vidrio conecta ambientes y deja pasar la luz. Se usa para salir a la terraza o al patio, para accesos de locales comerciales y para separar espacios dentro de una oficina.",
      "Diseñamos cada puerta según el vano, el uso diario que tendrá y el estilo del lugar, y te orientamos en el tipo de apertura y los herrajes.",
    ],
    benefits: [
      { title: "Más luz", text: "El vidrio permite iluminar pasillos, cocinas y livings sin perder privacidad si se usa vidrio con diseño o empavonado." },
      { title: "Resistencia al uso diario", text: "El aluminio soporta bien el uso frecuente y la intemperie." },
      { title: "Ahorro de espacio", text: "Las puertas correderas no necesitan espacio para abrir." },
      { title: "Imagen comercial", text: "En locales, una puerta de vidrio muestra el interior e invita a entrar." },
    ],
    applications: [
      "Salidas a terraza, balcón o patio",
      "Accesos de locales comerciales",
      "Oficinas y salas de reuniones",
      "Cocinas y logias",
    ],
    options: [
      { title: "Tipo de apertura", text: "Corredera, de abatir de una o dos hojas, o plegable para vanos anchos." },
      { title: "Vidrio", text: "Transparente, empavonado u otras alternativas según privacidad y seguridad." },
      { title: "Perfiles y color", text: "Perfiles en distintos colores, incluido el negro, muy usado en diseños modernos." },
      { title: "Cerraduras y manillas", text: "Herrajes según el uso: interior, exterior o comercial." },
    ],
    quoteTips: [
      "Ancho y alto del vano",
      "Si la puerta da al exterior o es interior",
      "Tipo de apertura que prefieres, si lo sabes",
      "Fotografía del lugar",
    ],
    faqs: [
      {
        question: "¿Qué puerta conviene para salir a la terraza?",
        answer:
          "Para vanos anchos se usan mucho las puertas correderas, porque no ocupan espacio al abrir. Si quieres abrir el vano casi completo, una puerta plegable puede ser una alternativa. Lo revisamos según las medidas.",
      },
      {
        question: "¿Hacen puertas de vidrio para locales comerciales?",
        answer:
          "Sí, trabajamos accesos para comercios y oficinas. Al cotizar cuéntanos el flujo de personas y si necesitas alguna cerradura especial.",
      },
    ],
    related: ["ventanas-de-aluminio", "cerramientos-de-terrazas", "trabajos-especiales"],
    image: images.puertaComercial,
    extraImages: [images.puertaTerraza],
    galleryCategory: "Puertas",
    seo: {
      title: "Puertas de aluminio y vidrio a medida",
      description:
        "Puertas de aluminio y vidrio a medida: correderas, de abatir y accesos para casas, terrazas, oficinas y locales comerciales. Cotiza con CRISTALTE.",
    },
  },
  {
    slug: "cerramientos-de-terrazas",
    name: "Cerramientos de terrazas",
    searchIntent: "Quien quiere cerrar la terraza o el balcón con vidrio y aluminio para aprovecharlo todo el año.",
    h1: "Cerramientos de terrazas y balcones",
    summary: "Cierres de terrazas y balcones con aluminio y vidrio para usar el espacio todo el año.",
    intro: [
      "Cerrar una terraza o un balcón permite sumar metros útiles al hogar y usarlos en invierno, protegidos del viento, la lluvia y el polvo. Es uno de los proyectos más pedidos en casas y departamentos.",
      "Trabajamos cerramientos en aluminio y vidrio adaptados a las medidas y a la arquitectura de cada lugar. Te ayudamos a comparar sistemas correderos y plegables para elegir el que mejor se ajuste a tu espacio.",
    ],
    benefits: [
      { title: "Más metros útiles", text: "La terraza pasa a ser comedor, sala de estar, escritorio o zona de juegos." },
      { title: "Protección", text: "Resguarda del viento, la lluvia, el polvo y parte del ruido exterior." },
      { title: "Uso todo el año", text: "El espacio se puede usar también en otoño e invierno." },
      { title: "Luz natural", text: "El vidrio mantiene la vista y la luminosidad." },
    ],
    applications: [
      "Balcones y terrazas de departamentos",
      "Terrazas de casas hacia el patio o el jardín",
      "Quinchos y zonas de asado",
      "Terrazas de cafeterías y restaurantes",
    ],
    options: [
      { title: "Sistema corredero", text: "Hojas que se deslizan sobre rieles. Es práctico y conveniente en muchos casos." },
      { title: "Sistema plegable", text: "Las hojas se pliegan hacia un costado y dejan el vano casi completamente abierto." },
      { title: "Perfiles y color", text: "Perfiles de aluminio en distintos colores y terminaciones." },
      { title: "Vidrio", text: "Distintas alternativas de vidrio según seguridad, altura y presupuesto." },
    ],
    quoteTips: [
      "Medidas aproximadas de ancho y alto",
      "Fotografías de la terraza desde distintos ángulos",
      "Si es casa o departamento y en qué piso se encuentra",
      "Si existe techo y baranda actual",
    ],
    faqs: [
      {
        question: "¿Necesito permiso para cerrar la terraza de mi departamento?",
        answer:
          "En un edificio debes revisar el reglamento de copropiedad y consultar a la administración, porque puede exigir un sistema o color determinado. Según el caso, también puede requerirse un trámite en la dirección de obras de la municipalidad. Te recomendamos confirmarlo antes de cerrar.",
      },
      {
        question: "¿Qué es mejor: cierre corredero o plegable?",
        answer:
          "El corredero suele ser más simple y económico y funciona bien en la mayoría de las terrazas. El plegable permite abrir casi todo el vano, ideal si en verano quieres la terraza abierta. Depende del uso que le darás.",
      },
      {
        question: "¿Cuánto cuesta cerrar una terraza?",
        answer:
          "Depende de los metros lineales, la altura, el sistema y el vidrio elegido. Con las medidas aproximadas y algunas fotos podemos preparar una cotización para tu caso.",
      },
    ],
    related: ["barandas-de-vidrio", "puertas-de-aluminio-y-vidrio", "ventanas-de-aluminio"],
    image: images.terrazaPlegable,
    extraImages: [images.balconCerrado, images.terrazaCasa],
    galleryCategory: "Terrazas",
    seo: {
      title: "Cerramientos de terrazas y balcones",
      description:
        "Cerramientos de terrazas y balcones en aluminio y vidrio, correderos o plegables, para casas y departamentos. Cotiza tu cierre de terraza con CRISTALTE.",
    },
  },
  {
    slug: "shower-doors",
    name: "Shower doors y mamparas de baño",
    searchIntent: "Quien busca instalar un shower door o una mampara de vidrio en la ducha o la tina de su baño.",
    h1: "Shower doors y mamparas de baño",
    summary: "Shower doors y mamparas de vidrio para duchas y tinas, a la medida de tu baño.",
    intro: [
      "Un shower door reemplaza la cortina de baño por un cierre de vidrio que evita salpicaduras, se limpia fácil y hace ver el baño más amplio y luminoso.",
      "Diseñamos cada shower door según las medidas de tu ducha o tina, y te orientamos sobre configuraciones fijas, abatibles o correderas, y sobre los herrajes y terminaciones disponibles.",
    ],
    benefits: [
      { title: "Baño más amplio", text: "El vidrio transparente no corta la vista y el baño se percibe más grande." },
      { title: "Limpieza más fácil", text: "Una superficie lisa, sin cortinas que acumulen humedad." },
      { title: "Menos agua fuera de la ducha", text: "Un cierre bien diseñado contiene mejor el agua." },
      { title: "Diseño a elección", text: "Con perfiles visibles o con herrajes mínimos, según el estilo." },
    ],
    applications: [
      "Duchas en esquina o entre muros",
      "Tinas que se quieren cerrar con vidrio",
      "Remodelaciones de baño",
      "Baños de departamentos nuevos sin cierre",
    ],
    options: [
      { title: "Corredera", text: "Hojas que se deslizan. Ideal cuando no hay espacio para abrir una puerta." },
      { title: "Abatible", text: "Puerta que gira sobre bisagras. Se ve más limpia, pero necesita espacio para abrir." },
      { title: "Paño fijo", text: "Un vidrio fijo tipo \"walk-in\" para duchas amplias." },
      { title: "Herrajes y vidrio", text: "Terminaciones de herrajes y tipos de vidrio disponibles según el diseño." },
    ],
    quoteTips: [
      "Medidas aproximadas del vano de la ducha o tina",
      "Fotografía del baño",
      "Si es ducha o tina",
      "Estilo que te gusta (con o sin perfiles visibles, por ejemplo)",
    ],
    faqs: [
      {
        question: "¿Qué diferencia hay entre un shower door y una mampara?",
        answer:
          "En Chile ambos nombres se usan para el cierre de vidrio de la ducha o la tina. \"Shower door\" se usa más para los cierres de vidrio con herrajes mínimos y \"mampara\" de forma más general.",
      },
      {
        question: "¿Shower door corredero o abatible?",
        answer:
          "El corredero no necesita espacio para abrir y se usa mucho en baños pequeños o en tinas. El abatible tiene un aspecto más limpio, pero necesita espacio frente a la ducha. Lo vemos según tus medidas.",
      },
      {
        question: "¿Cómo se limpia un shower door?",
        answer:
          "Lo ideal es secar el vidrio con un limpiavidrios de goma después de cada uso y limpiarlo con un producto suave, sin abrasivos, para evitar manchas de sarro.",
      },
    ],
    related: ["espejos-a-medida", "trabajos-especiales", "ventanas-de-aluminio"],
    image: images.showerMarmol,
    extraImages: [images.showerBano, images.showerAzulejo],
    galleryCategory: "Shower doors",
    seo: {
      title: "Shower doors y mamparas de baño a medida",
      description:
        "Shower doors y mamparas de vidrio a medida para duchas y tinas: correderos, abatibles o fijos. Cotiza el shower door de tu baño con CRISTALTE.",
    },
  },
  {
    slug: "espejos-a-medida",
    name: "Espejos a medida",
    searchIntent: "Quien busca un espejo cortado a medida para baño, dormitorio, gimnasio o local comercial.",
    h1: "Espejos a medida",
    summary: "Espejos cortados a medida para baños, dormitorios, gimnasios y locales comerciales.",
    intro: [
      "Un espejo bien ubicado amplía visualmente un espacio y aporta luz. Fabricamos espejos a la medida exacta del muro o del mueble, para que el resultado se vea integrado y no como un accesorio.",
      "Te asesoramos en el tamaño, la forma y la forma de instalación según el lugar donde irá el espejo.",
    ],
    benefits: [
      { title: "Amplitud", text: "Duplica visualmente el espacio en baños, pasillos y dormitorios." },
      { title: "Más luz", text: "Refleja la luz natural y la artificial." },
      { title: "Medida exacta", text: "Cubre el muro o el vano que necesitas, sin piezas estándar que no calzan." },
      { title: "Funcional", text: "Indispensable en gimnasios, salas de baile, peluquerías y probadores." },
    ],
    applications: [
      "Baños y vestidores",
      "Dormitorios y pasillos",
      "Gimnasios y salas de baile",
      "Peluquerías, tiendas y probadores",
    ],
    options: [
      { title: "Tamaño y forma", text: "Rectangulares, de gran formato o con otras formas según factibilidad." },
      { title: "Terminación de cantos", text: "Distintas terminaciones de borde según el uso y el diseño." },
      { title: "Instalación", text: "Fijación al muro o al mueble según el tamaño y el lugar." },
    ],
    quoteTips: [
      "Medidas del espejo o del muro",
      "Lugar donde irá instalado",
      "Fotografía del espacio",
    ],
    faqs: [
      {
        question: "¿Hacen espejos de gran tamaño para gimnasios o salas de baile?",
        answer:
          "Sí, trabajamos espejos de gran formato. Para cotizar necesitamos el largo y el alto del muro y una foto del lugar.",
      },
      {
        question: "¿Cómo se instala un espejo grande?",
        answer:
          "Depende del tamaño, el peso y el tipo de muro. Al cotizar te indicamos la forma de fijación adecuada para tu caso.",
      },
    ],
    related: ["shower-doors", "trabajos-especiales", "barandas-de-vidrio"],
    image: images.espejoGrande,
    extraImages: [images.espejoMuro],
    galleryCategory: "Espejos",
    seo: {
      title: "Espejos a medida para hogar y comercio",
      description:
        "Espejos a medida para baños, dormitorios, gimnasios y locales comerciales, en el tamaño exacto que necesitas. Cotiza tu espejo con CRISTALTE.",
    },
  },
  {
    slug: "barandas-de-vidrio",
    name: "Barandas de vidrio",
    searchIntent: "Quien busca barandas de vidrio para escaleras, terrazas, balcones o segundos pisos.",
    h1: "Barandas de vidrio",
    summary: "Barandas de vidrio para escaleras, terrazas, balcones y segundos pisos.",
    intro: [
      "Las barandas de vidrio dan seguridad sin tapar la vista. Son una alternativa moderna para escaleras, segundos pisos, terrazas y balcones, porque mantienen la luz y la sensación de amplitud.",
      "Diseñamos cada baranda según el lugar, la altura y el sistema de fijación más adecuado para tu proyecto.",
    ],
    benefits: [
      { title: "Vista despejada", text: "No interrumpen la vista hacia el jardín, el paisaje o el interior." },
      { title: "Diseño moderno", text: "Líneas limpias que se adaptan a estilos contemporáneos." },
      { title: "Más luz", text: "Permiten que la luz pase entre pisos y ambientes." },
      { title: "Fácil mantención", text: "Basta con limpiar el vidrio y revisar la fijación." },
    ],
    applications: [
      "Escaleras interiores",
      "Segundos pisos y dobles alturas",
      "Terrazas y balcones",
      "Bordes de piscinas y quinchos",
    ],
    options: [
      { title: "Sistema de fijación", text: "Distintos sistemas según la estructura existente y el diseño buscado." },
      { title: "Pasamanos", text: "Con o sin pasamanos superior, según el uso y la altura." },
      { title: "Vidrio", text: "Vidrio de seguridad adecuado para barandas. Te explicamos las alternativas al cotizar." },
    ],
    quoteTips: [
      "Largo total de la baranda",
      "Lugar de instalación (escalera, terraza, balcón)",
      "Fotografía del lugar y del borde donde se fijará",
    ],
    faqs: [
      {
        question: "¿Las barandas de vidrio son seguras?",
        answer:
          "Una baranda de vidrio debe hacerse con vidrio de seguridad y un sistema de fijación adecuado a la altura y al uso. Por eso cada proyecto se evalúa en terreno antes de fabricar.",
      },
      {
        question: "¿Se puede poner baranda de vidrio en una escalera existente?",
        answer:
          "En muchos casos sí. Depende de la estructura de la escalera y de dónde se puede fijar. Envíanos fotos y lo revisamos.",
      },
    ],
    related: ["cerramientos-de-terrazas", "trabajos-especiales", "puertas-de-aluminio-y-vidrio"],
    image: images.barandaEscalera,
    extraImages: [images.barandaVentanal, images.barandaMarmol],
    galleryCategory: "Barandas",
    seo: {
      title: "Barandas de vidrio para escaleras y terrazas",
      description:
        "Barandas de vidrio a medida para escaleras, terrazas, balcones y segundos pisos. Seguridad sin tapar la vista. Cotiza tu baranda con CRISTALTE.",
    },
  },
  {
    slug: "trabajos-especiales",
    name: "Trabajos especiales en vidrio y aluminio",
    searchIntent: "Quien necesita un trabajo en vidrio o aluminio que no es estándar: divisiones de oficina, separaciones de ambientes o proyectos a medida.",
    h1: "Divisiones de vidrio y trabajos especiales en aluminio",
    summary: "Divisiones de oficina, separaciones de ambientes y proyectos a medida en vidrio y aluminio.",
    intro: [
      "Hay proyectos que no encajan en un catálogo: una división de vidrio para una oficina, una separación entre la cocina y el living, un cierre especial o una pieza fuera de medida.",
      "Cuéntanos tu idea. Revisamos la factibilidad y te proponemos una solución a medida en vidrio y aluminio.",
    ],
    benefits: [
      { title: "Espacios luminosos", text: "Las divisiones de vidrio separan sin quitar luz." },
      { title: "Flexibilidad", text: "Soluciones adaptadas a medidas y usos poco habituales." },
      { title: "Imagen profesional", text: "Oficinas y comercios con un aspecto moderno y ordenado." },
    ],
    applications: [
      "Divisiones de oficinas y salas de reuniones",
      "Separación de ambientes en el hogar",
      "Proyectos para constructoras y arquitectos",
      "Piezas de vidrio o aluminio fuera de estándar",
    ],
    options: [
      { title: "Divisiones fijas o con puerta", text: "Paños fijos, puertas correderas o de abatir integradas." },
      { title: "Privacidad", text: "Vidrio transparente, empavonado u otras alternativas." },
      { title: "Perfiles", text: "Perfiles de aluminio en distintos colores o soluciones con perfiles mínimos." },
    ],
    quoteTips: [
      "Descripción de lo que necesitas",
      "Medidas aproximadas",
      "Fotografías, planos o referencias, si los tienes",
    ],
    faqs: [
      {
        question: "¿Hacen divisiones de vidrio para oficinas?",
        answer:
          "Sí, trabajamos divisiones de vidrio para oficinas y comercios. Envíanos las medidas o un plano y te orientamos.",
      },
      {
        question: "¿Trabajan con constructoras o arquitectos?",
        answer:
          "Sí, podemos cotizar proyectos a partir de planos y especificaciones. Escríbenos con la información disponible.",
      },
    ],
    related: ["puertas-de-aluminio-y-vidrio", "espejos-a-medida", "barandas-de-vidrio"],
    image: images.divisionOficina,
    extraImages: [images.pasilloVidrio],
    seo: {
      title: "Divisiones de vidrio y trabajos en aluminio",
      description:
        "Divisiones de vidrio para oficinas y hogares, separaciones de ambientes y proyectos especiales en vidrio y aluminio a medida. Cotiza con CRISTALTE.",
    },
  },
];

/** URL de la página de un servicio. Único lugar donde se define el formato. */
export function servicePath(slug: string) {
  return `/${slug}/`;
}

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

/** Lista de nombres para el selector del formulario. */
export const serviceOptions = [...services.map((s) => s.name), "Otro / no estoy seguro"];

/**
 * URLs anteriores (/servicios/...) que se redirigen con 301 en vercel.json.
 * Se dejan aquí para que las pruebas verifiquen que la redirección existe.
 */
export const legacyServiceSlugs: Record<string, string> = {
  "cerramientos-de-terrazas": "cerramientos-de-terrazas",
  "shower-doors-y-mamparas": "shower-doors",
  "ventanas-de-aluminio": "ventanas-de-aluminio",
  "ventanas-de-pvc": "ventanas-de-pvc",
  "puertas-de-aluminio-y-vidrio": "puertas-de-aluminio-y-vidrio",
  "espejos-a-medida": "espejos-a-medida",
  "barandas-de-vidrio": "barandas-de-vidrio",
  "divisiones-y-trabajos-especiales": "trabajos-especiales",
};
