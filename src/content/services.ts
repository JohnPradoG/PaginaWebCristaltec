import { images, type SiteImage } from "./images";
import type { ProjectCategory } from "./projects";
import type { FaqItem } from "./faq-types";

/**
 * SERVICIOS OFICIALES DE CRISTALTEC (lista entregada por la empresa en octubre de 2026)
 * Cada servicio tiene su tarjeta en la portada y su propia página en /<slug>/
 * (por ejemplo /ventanas-de-aluminio/). Cada página apunta a una búsqueda
 * distinta (`searchIntent`) para no competir entre ellas.
 *
 * Edita los textos libremente, pero no agregues precios, plazos, garantías,
 * certificaciones, años de experiencia ni comunas que la empresa no pueda
 * respaldar. Los precios van en src/content/prices.ts.
 *
 * Si cambias un `slug`, agrega una redirección 301 en `legacyRedirects` (abajo)
 * y en vercel.json.
 */
export type Comparison = {
  title: string;
  intro: string;
  /** Nombres de las dos opciones comparadas. */
  options: [string, string];
  rows: { label: string; values: [string, string] }[];
  note?: string;
};

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
  /** Mensaje prearmado de WhatsApp, propio de este servicio. */
  whatsappMessage: string;
  /** Párrafos de introducción. */
  intro: string[];
  /** Beneficios (información general del producto, no promesas de la empresa). */
  benefits: { title: string; text: string }[];
  /** Título de la lista de usos. */
  applicationsTitle?: string;
  /** Dónde se usa o qué incluye. */
  applications: string[];
  /** Título de la sección de opciones. */
  optionsTitle?: string;
  /** Materiales, sistemas y opciones que se pueden conversar. */
  options: { title: string; text: string }[];
  /** Comparación entre dos alternativas (por ejemplo, monolítico y termopanel). */
  comparison?: Comparison;
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

const whatsappIntro = "Hola, vengo desde la página web de CRISTALTEC.";

/** Diferencias entre vidrio monolítico y termopanel. Se usa en las páginas de ventanas. */
const glassComparison: Comparison = {
  title: "Vidrio monolítico o termopanel: ¿cuál conviene?",
  intro:
    "Las ventanas se pueden fabricar con vidrio monolítico o con termopanel. La diferencia está en cuántos vidrios lleva la ventana y en cuánto aísla.",
  options: ["Vidrio monolítico", "Termopanel (doble vidriado hermético)"],
  rows: [
    {
      label: "Qué es",
      values: [
        "Una sola lámina de vidrio.",
        "Dos vidrios separados por una cámara de aire o gas, sellada en todo su contorno.",
      ],
    },
    {
      label: "Aislación del frío y del calor",
      values: [
        "Básica: el vidrio transmite fácilmente la temperatura exterior.",
        "Mucho mayor: la cámara sellada frena el paso del frío y del calor.",
      ],
    },
    {
      label: "Condensación (vidrios empañados)",
      values: [
        "Más frecuente en invierno, sobre todo en dormitorios y baños.",
        "Mucho menor, porque el vidrio interior se mantiene más templado.",
      ],
    },
    {
      label: "Ruido exterior",
      values: ["Aísla poco.", "Reduce el ruido; el resultado depende de los vidrios y del cierre de la ventana."],
    },
    {
      label: "Inversión",
      values: ["Menor.", "Mayor, pero puede ayudar a gastar menos en calefacción."],
    },
    {
      label: "Recomendado para",
      values: [
        "Logias, bodegas, zonas interiores o presupuestos ajustados.",
        "Dormitorios, livings, zonas frías, calles con ruido y departamentos con humedad.",
      ],
    },
  ],
  note: "Al cotizar te recomendamos la alternativa adecuada para cada ventana. Puedes combinar ambas en una misma casa.",
};

export const services: Service[] = [
  {
    slug: "ventanas-de-aluminio",
    name: "Ventanas de aluminio",
    searchIntent:
      "Quien busca fabricar, cambiar o instalar ventanas de aluminio a medida, con vidrio monolítico o termopanel, en su casa, departamento o local.",
    h1: "Ventanas de aluminio a medida, con vidrio monolítico o termopanel",
    summary: "Ventanas correderas, proyectantes y ventanales de aluminio con vidrio monolítico o termopanel.",
    whatsappMessage: `${whatsappIntro} Quiero cotizar ventanas de aluminio. ¿Me pueden orientar entre vidrio monolítico y termopanel? Puedo enviar medidas y fotos.`,
    intro: [
      "Las ventanas de aluminio son una de las soluciones más usadas en Chile por su resistencia, su bajo mantenimiento y la variedad de formatos que permiten. Sirven para una obra nueva y para reemplazar ventanas antiguas que ya no cierran bien.",
      "En CRISTALTEC fabricamos e instalamos cada ventana según las medidas de tu vano, con vidrio monolítico o termopanel. Te ayudamos a elegir el tipo de apertura, el color del perfil y el vidrio adecuado para cada ambiente.",
    ],
    benefits: [
      { title: "Bajo mantenimiento", text: "El aluminio no se oxida como el fierro ni necesita pintura periódica. Basta con limpiar perfiles y rieles." },
      { title: "Perfiles delgados", text: "Permite paños de vidrio grandes con marcos finos, lo que deja entrar más luz." },
      { title: "Con termopanel", text: "Con doble vidriado hermético la ventana aísla mucho mejor el frío, el calor y la condensación." },
      { title: "Muchos formatos", text: "Correderas, proyectantes, abatibles, fijos o combinados en un mismo vano." },
    ],
    applications: [
      "Dormitorios, livings y cocinas de casas y departamentos",
      "Reemplazo de ventanas antiguas o en mal estado",
      "Ventanales de piso a techo hacia patios y terrazas",
      "Locales comerciales, oficinas y obras nuevas",
    ],
    options: [
      { title: "Tipo de apertura", text: "Corredera para ahorrar espacio, proyectante para ventilar con lluvia, abatible o paño fijo donde no se necesita abrir." },
      { title: "Vidrio", text: "Monolítico (una lámina) o termopanel (doble vidrio con cámara sellada). Más abajo explicamos las diferencias." },
      { title: "Color del perfil", text: "Colores y terminaciones según la línea de perfil elegida. Te mostramos las alternativas al cotizar." },
      { title: "Accesorios", text: "Manillas, cierres y mallas según el tipo de ventana." },
    ],
    comparison: glassComparison,
    quoteTips: [
      "Ancho y alto aproximado de cada ventana",
      "Si prefieres vidrio monolítico, termopanel o quieres que te recomendemos",
      "Fotografía de las ventanas actuales o del vano",
      "Si es reemplazo o una obra nueva",
    ],
    faqs: [
      {
        question: "¿Se puede cambiar el vidrio de mi ventana de aluminio por termopanel?",
        answer:
          "Depende del perfil. El termopanel es más grueso que un vidrio monolítico y no todas las ventanas tienen espacio para recibirlo. Con una foto del perfil y las medidas podemos decirte si se puede adaptar o si conviene cambiar la ventana.",
      },
      {
        question: "¿Qué ventana de aluminio conviene: corredera o proyectante?",
        answer:
          "La corredera aprovecha mejor el espacio y es habitual en ventanas anchas y ventanales. La proyectante abre hacia afuera desde abajo y permite ventilar aunque llueva, por lo que se usa mucho en baños y cocinas. Muchas veces se combinan en un mismo vano.",
      },
      {
        question: "¿Pueden cambiar mis ventanas antiguas por ventanas de aluminio nuevas?",
        answer:
          "Sí, el reemplazo de ventanas es uno de los trabajos más comunes. Para cotizar necesitamos las medidas aproximadas y una foto de cada ventana; las medidas exactas se confirman en terreno.",
      },
    ],
    related: ["ventanas-de-pvc", "reparacion-de-ventanas-y-puertas", "cerramientos-de-terrazas"],
    image: images.ventanasDormitorio,
    extraImages: [images.ventanalCorredera],
    galleryCategory: "Ventanas",
    seo: {
      title: "Ventanas de aluminio con termopanel",
      description:
        "Fabricación e instalación de ventanas de aluminio a medida con vidrio monolítico o termopanel: correderas, proyectantes y ventanales. Cotiza con CRISTALTEC.",
    },
  },
  {
    slug: "ventanas-de-pvc",
    name: "Ventanas de PVC",
    searchIntent:
      "Quien compara ventanas de PVC con vidrio monolítico o termopanel para mejorar la aislación térmica y acústica de su casa o departamento.",
    h1: "Ventanas de PVC con vidrio monolítico o termopanel",
    summary: "Ventanas de PVC a medida para más aislación térmica y acústica, con monolítico o termopanel.",
    whatsappMessage: `${whatsappIntro} Quiero cotizar ventanas de PVC y saber si me conviene vidrio monolítico o termopanel. Puedo enviar medidas y fotos.`,
    intro: [
      "El PVC es un material que conduce poco el calor, por eso las ventanas de PVC se eligen cuando se quiere mejorar la aislación del hogar: menos frío en invierno, menos calor en verano y menos ruido de la calle.",
      "En CRISTALTEC fabricamos e instalamos ventanas de PVC a la medida de cada vano, con vidrio monolítico o termopanel. Te ayudamos a comparar si te conviene PVC o aluminio según el ambiente, la orientación y tu presupuesto.",
    ],
    benefits: [
      { title: "Aislación térmica", text: "El perfil de PVC transmite menos frío y calor que un perfil metálico. Con termopanel, la aislación es todavía mayor." },
      { title: "Menos ruido", text: "Con un buen cierre y el vidrio adecuado, ayuda a reducir el ruido exterior." },
      { title: "Menos condensación", text: "Marcos y vidrios más templados suelen empañarse menos que una ventana antigua." },
      { title: "Fácil de limpiar", text: "No necesita pintura y se limpia con agua y jabón neutro." },
    ],
    applications: [
      "Dormitorios y livings donde se busca más confort",
      "Departamentos en avenidas con ruido",
      "Casas en zonas frías o con mucha exposición al sol",
      "Recambio de ventanas que se empañan o filtran aire",
    ],
    options: [
      { title: "Tipo de apertura", text: "Oscilobatiente (abre hacia adentro y también se inclina para ventilar), corredera, abatible o fija." },
      { title: "Vidrio", text: "Monolítico o termopanel. La aislación final depende mucho del vidrio; más abajo explicamos las diferencias." },
      { title: "Color", text: "Blanco y otros colores o acabados según la línea disponible." },
      { title: "PVC o aluminio", text: "Si lo principal es aislar, el PVC suele ser mejor opción. Si buscas perfiles muy delgados o grandes ventanales, conversemos el aluminio." },
    ],
    comparison: glassComparison,
    quoteTips: [
      "Medidas aproximadas de cada ventana",
      "Qué quieres resolver: frío, ruido, humedad o cambio de diseño",
      "Fotografías de las ventanas actuales",
      "Piso del departamento, si aplica",
    ],
    faqs: [
      {
        question: "¿Qué diferencia hay entre una ventana de PVC y una de aluminio?",
        answer:
          "El PVC aísla mejor el frío, el calor y el ruido porque conduce menos la temperatura. El aluminio permite perfiles más delgados, paños más grandes y más colores. Ambos se pueden fabricar con vidrio monolítico o termopanel.",
      },
      {
        question: "¿Vale la pena una ventana de PVC con vidrio monolítico?",
        answer:
          "Puede servir en logias o ambientes donde la aislación no es prioritaria. Si eliges PVC para aislar el frío o el ruido, lo habitual es combinarlo con termopanel para aprovechar las ventajas del material.",
      },
      {
        question: "¿Qué es una ventana oscilobatiente?",
        answer:
          "Es una ventana que se abre hacia adentro como una puerta y que, girando la manilla a otra posición, se inclina desde arriba para ventilar sin abrirla completa. Es muy común en ventanas de PVC.",
      },
      {
        question: "¿Puedo cambiar las ventanas de mi departamento por PVC?",
        answer: "En general sí, pero antes revisa si el reglamento de copropiedad exige un color o modelo para la fachada.",
      },
    ],
    related: ["ventanas-de-aluminio", "puertas-de-aluminio-y-pvc", "reparacion-de-ventanas-y-puertas"],
    image: images.ventanaPvc,
    extraImages: [images.puertaPvcCocina],
    galleryCategory: "PVC",
    seo: {
      title: "Ventanas de PVC y termopanel",
      description:
        "Ventanas de PVC a medida con vidrio monolítico o termopanel para aislar frío, calor y ruido en casas y departamentos. Compara opciones y cotiza con CRISTALTEC.",
    },
  },
  {
    slug: "puertas-de-aluminio-y-pvc",
    name: "Puertas de aluminio y PVC",
    searchIntent: "Quien necesita una puerta de aluminio o de PVC para su casa, terraza, cocina, oficina o local comercial.",
    h1: "Puertas de aluminio y PVC a medida",
    summary: "Puertas correderas y de abatir de aluminio o PVC para casas, terrazas, oficinas y locales.",
    whatsappMessage: `${whatsappIntro} Quiero cotizar una puerta de aluminio o PVC. ¿Me pueden orientar sobre el material y el tipo de apertura?`,
    intro: [
      "Una puerta de aluminio o de PVC con vidrio conecta ambientes y deja pasar la luz. Se usa para salir a la terraza o al patio, en cocinas y logias, en accesos de locales comerciales y en oficinas.",
      "En CRISTALTEC fabricamos e instalamos cada puerta según el vano, el uso diario que tendrá y el estilo del lugar. Te orientamos para elegir entre aluminio y PVC, el tipo de apertura y los herrajes.",
    ],
    benefits: [
      { title: "Aluminio: resistencia", text: "Soporta bien el uso frecuente y la intemperie, con perfiles delgados y muchos colores." },
      { title: "PVC: aislación", text: "Aísla mejor el frío y el ruido; muy usado en puertas de terraza y cocina." },
      { title: "Más luz", text: "Con vidrio, la puerta ilumina pasillos, cocinas y livings." },
      { title: "Ahorro de espacio", text: "Las puertas correderas no necesitan espacio para abrir." },
    ],
    applications: ["Salidas a terraza, balcón o patio", "Cocinas y logias", "Accesos de locales comerciales", "Oficinas y salas de reuniones"],
    options: [
      { title: "Material", text: "Aluminio o PVC, según si priorizas perfiles delgados o aislación." },
      { title: "Tipo de apertura", text: "Corredera, de abatir de una o dos hojas, o plegable para vanos anchos." },
      { title: "Vidrio", text: "Monolítico o termopanel, transparente o con privacidad, según el uso." },
      { title: "Cerraduras y manillas", text: "Herrajes según el uso: interior, exterior o comercial." },
    ],
    quoteTips: [
      "Ancho y alto del vano",
      "Si la puerta da al exterior o es interior",
      "Si prefieres aluminio o PVC, o quieres que te recomendemos",
      "Fotografía del lugar",
    ],
    faqs: [
      {
        question: "¿Puerta de aluminio o de PVC?",
        answer:
          "El aluminio es muy resistente y permite perfiles más delgados y grandes paños de vidrio. El PVC aísla mejor el frío y el ruido. Para una salida a terraza en una zona fría suele convenir PVC; para un acceso comercial de alto tráfico, aluminio.",
      },
      {
        question: "¿Qué puerta conviene para salir a la terraza?",
        answer:
          "Para vanos anchos se usan mucho las puertas correderas, porque no ocupan espacio al abrir. Si quieres abrir el vano casi completo, una puerta plegable puede ser una alternativa.",
      },
      {
        question: "¿Hacen puertas para locales comerciales?",
        answer: "Sí. Para proyectos comerciales o de varias puertas puedes usar el formulario de proyectos comerciales y contarnos si tienes planos.",
      },
    ],
    related: ["mamparas-de-vidrio", "ventanas-de-pvc", "reparacion-de-ventanas-y-puertas"],
    image: images.puertaComercial,
    extraImages: [images.puertaPvcCocina],
    galleryCategory: "Puertas",
    seo: {
      title: "Puertas de aluminio y PVC a medida",
      description:
        "Puertas de aluminio y PVC a medida: correderas, de abatir y plegables para terrazas, cocinas, oficinas y locales comerciales. Cotiza tu puerta con CRISTALTEC.",
    },
  },
  {
    slug: "shower-doors",
    name: "Shower doors",
    searchIntent: "Quien busca instalar un shower door de vidrio templado o de acrílico en la ducha o la tina de su baño.",
    h1: "Shower doors de vidrio templado y acrílico",
    summary: "Shower doors para duchas y tinas en vidrio templado o acrílico, a la medida de tu baño.",
    whatsappMessage: `${whatsappIntro} Quiero cotizar un shower door para mi baño. ¿Me pueden orientar entre vidrio templado y acrílico? Puedo enviar medidas y una foto.`,
    intro: [
      "Un shower door reemplaza la cortina de baño por un cierre que evita salpicaduras, se limpia fácil y hace ver el baño más ordenado.",
      "En CRISTALTEC fabricamos e instalamos shower doors en vidrio templado y en acrílico, a la medida de tu ducha o tina. Te orientamos sobre el material, la configuración y los herrajes.",
    ],
    benefits: [
      { title: "Baño más amplio", text: "El vidrio transparente no corta la vista y el baño se percibe más grande." },
      { title: "Limpieza más fácil", text: "Superficies lisas, sin cortinas que acumulen humedad." },
      { title: "Menos agua fuera", text: "Un cierre bien diseñado contiene mejor el agua de la ducha." },
      { title: "Para cada presupuesto", text: "Vidrio templado o acrílico, según el diseño y la inversión que buscas." },
    ],
    applications: ["Duchas en esquina o entre muros", "Tinas que se quieren cerrar", "Remodelaciones de baño", "Baños de departamentos nuevos sin cierre"],
    options: [
      { title: "Corredero", text: "Hojas que se deslizan. Ideal cuando no hay espacio para abrir una puerta y en tinas." },
      { title: "Abatible", text: "Puerta que gira sobre bisagras. Se ve más limpia, pero necesita espacio para abrir." },
      { title: "Paño fijo", text: "Un vidrio fijo para duchas amplias." },
      { title: "Herrajes y perfiles", text: "Terminaciones de herrajes y perfiles según el diseño." },
    ],
    comparison: {
      title: "Vidrio templado o acrílico: ¿cuál elegir?",
      intro: "Los dos materiales sirven para cerrar la ducha. Cambian en aspecto, resistencia, peso e inversión.",
      options: ["Vidrio templado", "Acrílico"],
      rows: [
        {
          label: "Qué es",
          values: ["Vidrio tratado con calor para hacerlo más resistente que un vidrio común.", "Placa de plástico rígido y liviano, normalmente con marco de aluminio."],
        },
        {
          label: "Seguridad",
          values: ["Si se rompe, se fragmenta en trozos pequeños, menos cortantes que un vidrio común.", "No se quiebra como el vidrio."],
        },
        {
          label: "Aspecto y duración",
          values: ["Transparente y estable en el tiempo.", "Transparente, translúcido o con diseño; con los años puede rayarse u opacarse."],
        },
        { label: "Peso", values: ["Más pesado; requiere herrajes adecuados.", "Liviano."] },
        { label: "Inversión", values: ["Mayor.", "Menor."] },
        {
          label: "Recomendado para",
          values: ["Baños principales y remodelaciones donde el diseño importa.", "Baños de visitas, arriendos o presupuestos ajustados."],
        },
      ],
    },
    quoteTips: [
      "Medidas aproximadas del vano de la ducha o tina",
      "Si prefieres vidrio templado o acrílico",
      "Fotografía del baño",
      "Si es ducha o tina",
    ],
    faqs: [
      {
        question: "¿Shower door corredero o abatible?",
        answer:
          "El corredero no necesita espacio para abrir y se usa mucho en baños pequeños y tinas. El abatible tiene un aspecto más limpio, pero necesita espacio frente a la ducha.",
      },
      {
        question: "¿Cómo se limpia un shower door?",
        answer:
          "Lo ideal es secarlo con un limpiavidrios de goma después de cada uso y limpiarlo con un producto suave, sin abrasivos. En el acrílico, evita esponjas ásperas que lo rayen.",
      },
      {
        question: "¿Reparan shower doors que no corren bien?",
        answer: "Sí. Cambiamos carros, guías, burletes y herrajes de shower doors. Revisa la página de reparación y mantenimiento.",
      },
    ],
    related: ["mamparas-de-vidrio", "reparacion-de-ventanas-y-puertas", "puertas-de-aluminio-y-pvc"],
    image: images.showerMarmol,
    extraImages: [images.showerBano, images.showerAzulejo],
    galleryCategory: "Shower doors",
    seo: {
      title: "Shower doors de vidrio templado",
      description:
        "Shower doors a medida en vidrio templado o acrílico para duchas y tinas: correderos, abatibles o fijos. Cotiza el shower door de tu baño con CRISTALTEC.",
    },
  },
  {
    slug: "cerramientos-de-terrazas",
    name: "Cerramientos de terrazas",
    searchIntent: "Quien quiere cerrar la terraza o el balcón con aluminio y vidrio para aprovecharlo todo el año.",
    h1: "Cerramientos de terrazas y balcones",
    summary: "Cierres de terrazas y balcones con aluminio y vidrio para usar el espacio todo el año.",
    whatsappMessage: `${whatsappIntro} Quiero cotizar el cierre de mi terraza o balcón. Puedo enviar medidas aproximadas y fotos.`,
    intro: [
      "Cerrar una terraza o un balcón permite sumar metros útiles al hogar y usarlos en invierno, protegidos del viento, la lluvia y el polvo. Es uno de los proyectos más pedidos en casas y departamentos.",
      "En CRISTALTEC fabricamos e instalamos cerramientos de aluminio y vidrio adaptados a las medidas y a la arquitectura de cada lugar. Te ayudamos a comparar sistemas correderos y plegables.",
    ],
    benefits: [
      { title: "Más metros útiles", text: "La terraza pasa a ser comedor, sala de estar, escritorio o zona de juegos." },
      { title: "Protección", text: "Resguarda del viento, la lluvia, el polvo y parte del ruido exterior." },
      { title: "Uso todo el año", text: "El espacio se puede usar también en otoño e invierno." },
      { title: "Luz natural", text: "El vidrio mantiene la vista y la luminosidad." },
    ],
    applications: ["Balcones y terrazas de departamentos", "Terrazas de casas hacia el patio o el jardín", "Quinchos y zonas de asado", "Terrazas de cafeterías y restaurantes"],
    options: [
      { title: "Sistema corredero", text: "Hojas que se deslizan sobre rieles. Práctico y conveniente en muchos casos." },
      { title: "Sistema plegable", text: "Las hojas se pliegan hacia un costado y dejan el vano casi completamente abierto." },
      { title: "Perfiles y color", text: "Perfiles de aluminio en distintos colores y terminaciones." },
      { title: "Vidrio", text: "Monolítico o termopanel, según cuánto quieras aislar el espacio." },
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
          "En un edificio debes revisar el reglamento de copropiedad y consultar a la administración, porque puede exigir un sistema o color determinado. Según el caso, también puede requerirse un trámite en la dirección de obras municipal. Confírmalo antes de cerrar.",
      },
      {
        question: "¿Qué es mejor: cierre corredero o plegable?",
        answer:
          "El corredero suele ser más simple y económico y funciona bien en la mayoría de las terrazas. El plegable permite abrir casi todo el vano, ideal si en verano quieres la terraza abierta.",
      },
      {
        question: "¿Cuánto cuesta cerrar una terraza?",
        answer:
          "Depende de los metros lineales, la altura, el sistema y el vidrio elegido. Con las medidas aproximadas y algunas fotos preparamos una cotización para tu caso.",
      },
    ],
    related: ["ventanas-de-aluminio", "mamparas-de-vidrio", "puertas-de-aluminio-y-pvc"],
    image: images.terrazaPlegable,
    extraImages: [images.balconCerrado, images.terrazaCasa],
    galleryCategory: "Terrazas",
    seo: {
      title: "Cerramientos de terrazas y balcones",
      description:
        "Cerramientos de terrazas y balcones en aluminio y vidrio, correderos o plegables, para casas y departamentos. Cotiza el cierre de tu terraza con CRISTALTEC.",
    },
  },
  {
    slug: "mamparas-de-vidrio",
    name: "Mamparas de vidrio",
    searchIntent: "Quien busca una mampara de vidrio para el acceso, el living, la terraza o para dividir una oficina o un local.",
    h1: "Mamparas de vidrio a medida",
    summary: "Mamparas de vidrio para accesos, livings, terrazas, oficinas y locales comerciales.",
    whatsappMessage: `${whatsappIntro} Quiero cotizar una mampara de vidrio. Les cuento dónde va y les envío medidas y fotos.`,
    intro: [
      "Una mampara de vidrio cierra o divide un espacio sin quitarle luz. Se usa como cierre de acceso, como puerta corredera entre el living y la terraza, y como división de oficinas, consultas y locales comerciales.",
      "En CRISTALTEC diseñamos, fabricamos e instalamos mamparas a la medida del vano, fijas o con puertas correderas o de abatir.",
    ],
    benefits: [
      { title: "Separa sin oscurecer", text: "Divide ambientes manteniendo la luz natural y la sensación de amplitud." },
      { title: "Imagen moderna", text: "Líneas limpias para hogares, oficinas y comercios." },
      { title: "Privacidad a elección", text: "Vidrio transparente o con tratamientos que dan privacidad." },
      { title: "A medida", text: "Se adapta a vanos amplios, dobles alturas o espacios poco habituales." },
    ],
    applications: [
      "Mamparas de acceso a casas y edificios",
      "Cierres entre living y terraza",
      "Divisiones de oficinas y salas de reuniones",
      "Locales comerciales y consultas",
    ],
    options: [
      { title: "Configuración", text: "Paños fijos, puertas correderas, de abatir o combinaciones." },
      { title: "Vidrio", text: "Alternativas de vidrio de seguridad según el uso y la ubicación de la mampara." },
      { title: "Privacidad", text: "Transparente o con tratamientos que limitan la vista." },
      { title: "Perfiles", text: "Perfiles de aluminio en distintos colores, incluido el negro." },
    ],
    quoteTips: [
      "Dónde irá la mampara (acceso, living, oficina)",
      "Ancho y alto del vano",
      "Si necesitas puerta y de qué tipo",
      "Fotografías, planos o referencias, si los tienes",
    ],
    faqs: [
      {
        question: "¿Qué diferencia hay entre una mampara y un shower door?",
        answer:
          "El shower door es el cierre de la ducha o la tina. La mampara es un cierre o división de vidrio para otros espacios: accesos, livings, terrazas y oficinas.",
      },
      {
        question: "¿Hacen mamparas para oficinas y locales?",
        answer: "Sí. Para proyectos con varias mamparas o divisiones puedes usar el formulario de proyectos comerciales.",
      },
    ],
    related: ["puertas-de-aluminio-y-pvc", "cerramientos-de-terrazas", "shower-doors"],
    image: images.puertaTerraza,
    extraImages: [images.divisionOficina, images.pasilloVidrio],
    galleryCategory: "Mamparas",
    seo: {
      title: "Mamparas de vidrio a medida",
      description:
        "Mamparas de vidrio a medida para accesos, livings, terrazas, oficinas y locales comerciales, fijas o con puerta. Cotiza tu mampara con CRISTALTEC.",
    },
  },
  {
    slug: "vitrinas-a-medida",
    name: "Vitrinas a medida",
    searchIntent: "Quien necesita una vitrina de vidrio a medida para exhibir productos en un local o colecciones en su casa.",
    h1: "Vitrinas de vidrio a medida",
    summary: "Vitrinas de vidrio y aluminio a medida para locales comerciales, exhibición y hogar.",
    whatsappMessage: `${whatsappIntro} Quiero cotizar una vitrina a medida. Les cuento qué quiero exhibir y les envío medidas y una referencia.`,
    intro: [
      "Una vitrina bien hecha protege lo que exhibes y lo muestra mejor. Se usa en locales comerciales para presentar productos y en el hogar para colecciones, vajilla o recuerdos.",
      "En CRISTALTEC fabricamos vitrinas de vidrio y aluminio a la medida del espacio y de lo que quieres exhibir.",
    ],
    benefits: [
      { title: "Exhibe y protege", text: "Los productos u objetos quedan a la vista y protegidos del polvo y del contacto." },
      { title: "A la medida del espacio", text: "Se adapta al muro, al mesón o al rincón disponible." },
      { title: "Imagen ordenada", text: "Ayuda a presentar mejor los productos en un local." },
    ],
    applications: [
      "Locales comerciales y tiendas",
      "Mostradores y exhibidores",
      "Colecciones, vajilla y objetos en el hogar",
      "Oficinas, recepciones e instituciones",
    ],
    options: [
      { title: "Formato", text: "Vitrina de mostrador, mural o de pie, según el lugar." },
      { title: "Puertas", text: "Correderas, abatibles o sin puertas, según el uso." },
      { title: "Repisas", text: "Cantidad y altura de repisas según lo que se exhibe." },
      { title: "Perfiles", text: "Con perfiles de aluminio o con perfilería mínima, según el diseño." },
    ],
    quoteTips: [
      "Alto, ancho y fondo aproximados",
      "Qué vas a exhibir",
      "Dónde irá: mesón, muro o piso",
      "Una foto del lugar o una referencia de lo que te gusta",
    ],
    faqs: [
      {
        question: "¿Hacen vitrinas para locales comerciales?",
        answer:
          "Sí, fabricamos vitrinas a medida para comercios. Si necesitas varias, usa el formulario de proyectos comerciales y cuéntanos las medidas.",
      },
      {
        question: "¿Puedo pedir una vitrina con medidas especiales?",
        answer: "Sí, cada vitrina se fabrica a medida. Envíanos alto, ancho y fondo aproximados y lo que quieres exhibir.",
      },
    ],
    related: ["mamparas-de-vidrio", "puertas-de-aluminio-y-pvc", "reparacion-de-ventanas-y-puertas"],
    image: images.vitrinaExhibicion,
    extraImages: [],
    galleryCategory: "Vitrinas",
    seo: {
      title: "Vitrinas de vidrio a medida",
      description:
        "Vitrinas de vidrio y aluminio a medida para locales comerciales, mostradores y el hogar. Cuéntanos qué quieres exhibir y cotiza tu vitrina con CRISTALTEC.",
    },
  },
  {
    slug: "reparacion-de-ventanas-y-puertas",
    name: "Reparación y mantenimiento",
    searchIntent:
      "Quien tiene una ventana, puerta, shower door o mampara de aluminio, PVC o vidrio que no corre, no cierra, filtra o tiene un vidrio roto o un termopanel empañado.",
    h1: "Reparación y mantenimiento de ventanas, puertas y sistemas de aluminio, PVC y vidrio",
    summary: "Reparamos ventanas, puertas, shower doors y mamparas que no corren, no cierran, filtran o tienen vidrios dañados.",
    whatsappMessage: `${whatsappIntro} Necesito reparar una ventana, puerta o cierre de aluminio, PVC o vidrio. Les envío fotos del problema.`,
    intro: [
      "Una ventana que no corre, una puerta que no cierra, un vidrio quebrado o un termopanel empañado no siempre requieren cambiar todo. Muchas veces se resuelven reparando o cambiando piezas.",
      "En CRISTALTEC reparamos y mantenemos toda clase de ventanas, puertas y sistemas de aluminio, PVC y vidrio. Envíanos fotos del problema y te orientamos.",
    ],
    benefits: [
      { title: "Evita cambiar todo", text: "Cambiar carros, burletes o cierres suele costar menos que una ventana nueva." },
      { title: "Menos filtraciones", text: "Burletes y sellos nuevos reducen el paso de aire, agua y polvo." },
      { title: "Más seguridad", text: "Cierres y manillas que vuelven a trabar bien." },
      { title: "Más vida útil", text: "El mantenimiento preventivo alarga la vida de rieles, carros y herrajes." },
    ],
    applicationsTitle: "Qué reparamos",
    applications: [
      "Ventanas y puertas correderas que no corren o se salen del riel (carros y rodamientos)",
      "Cierres, manillas, pestillos y bisagras dañados",
      "Burletes, felpas y sellos gastados que dejan pasar aire, agua o ruido",
      "Vidrios quebrados, monolíticos o termopanel",
      "Termopaneles empañados por dentro (cambio de la unidad de vidrio)",
      "Puertas descuadradas o que rozan",
      "Shower doors y mamparas que no corren o tienen piezas sueltas",
      "Filtraciones por sellos y siliconas en mal estado",
    ],
    optionsTitle: "Mantenimiento preventivo",
    options: [
      { title: "Limpieza y ajuste", text: "Limpieza de rieles y desagües, ajuste de hojas y revisión de cierres." },
      { title: "Cambio de piezas de desgaste", text: "Carros, felpas y burletes antes de que fallen." },
      { title: "Revisión de sellos", text: "Silicona y sellos perimetrales para evitar filtraciones." },
      { title: "Edificios, oficinas y comercios", text: "Revisiones de varias unidades. Usa el formulario de proyectos comerciales." },
    ],
    quoteTips: [
      "Fotografía del problema y de la ventana o puerta completa",
      "Material: aluminio, PVC o solo vidrio",
      "Medidas aproximadas, si es un vidrio quebrado",
      "Cuántas ventanas o puertas necesitan reparación",
    ],
    faqs: [
      {
        question: "¿Por qué mi termopanel se empañó por dentro?",
        answer:
          "Cuando aparece humedad entre los dos vidrios, el sello del termopanel falló y entró aire húmedo a la cámara. No se soluciona limpiando: se cambia la unidad de termopanel, normalmente sin cambiar la ventana.",
      },
      {
        question: "Mi ventana corredera está dura o se sale del riel, ¿tiene arreglo?",
        answer:
          "Casi siempre. Lo habitual es que los carros o rodamientos estén gastados o que el riel esté sucio o dañado. Con una foto podemos orientarte.",
      },
      {
        question: "¿Reparan ventanas que no instalaron ustedes?",
        answer:
          "Sí, reparamos ventanas, puertas y sistemas de aluminio, PVC y vidrio aunque no los hayamos instalado. Algunas piezas dependen de la línea del perfil, por eso pedimos fotos.",
      },
      {
        question: "¿Cada cuánto conviene hacer mantenimiento?",
        answer:
          "Conviene limpiar rieles y desagües con frecuencia y revisar carros, burletes y cierres periódicamente, sobre todo antes del invierno.",
      },
    ],
    related: ["ventanas-de-aluminio", "ventanas-de-pvc", "shower-doors"],
    image: images.ventanalCorredera,
    extraImages: [images.ventanaPvc],
    seo: {
      title: "Reparación de ventanas y puertas",
      description:
        "Reparación y mantenimiento de ventanas, puertas, shower doors y mamparas de aluminio, PVC y vidrio: carros, burletes, cierres, vidrios rotos y termopanel empañado.",
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
 * URLs anteriores que se redirigen con 301 en vercel.json, en un solo salto.
 * Clave: ruta antigua. Valor: ruta nueva. Las pruebas verifican que coincidan.
 */
export const legacyRedirects: Record<string, string> = {
  "/servicios/cerramientos-de-terrazas/": "/cerramientos-de-terrazas/",
  "/servicios/shower-doors-y-mamparas/": "/shower-doors/",
  "/servicios/ventanas-de-aluminio/": "/ventanas-de-aluminio/",
  "/servicios/ventanas-de-pvc/": "/ventanas-de-pvc/",
  "/servicios/puertas-de-aluminio-y-vidrio/": "/puertas-de-aluminio-y-pvc/",
  "/servicios/divisiones-y-trabajos-especiales/": "/mamparas-de-vidrio/",
  "/servicios/espejos-a-medida/": "/",
  "/servicios/barandas-de-vidrio/": "/",
  "/puertas-de-aluminio-y-vidrio/": "/puertas-de-aluminio-y-pvc/",
  "/trabajos-especiales/": "/mamparas-de-vidrio/",
  "/espejos-a-medida/": "/",
  "/barandas-de-vidrio/": "/",
};
