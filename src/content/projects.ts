import { images, type SiteImage } from "./images";

/**
 * GALERÍA DE PROYECTOS
 *
 * IMPORTANTE: mientras `image.demo` sea true, la foto es una imagen de
 * referencia de terceros (Unsplash) y NO un trabajo de CRISTALTEC. La web la
 * marca como "Imagen referencial" y los textos están escritos como ejemplos
 * de lo que se puede hacer, no como trabajos realizados.
 *
 * ── PLANTILLA PARA PUBLICAR UN TRABAJO REAL ─────────────────────────────────
 * 1. Copia las fotos optimizadas a /public/proyectos/ (ver README).
 * 2. Agrega la foto en src/content/images.ts con `demo: false` y sin `credit`.
 * 3. Copia este bloque al INICIO de la lista `projects` (los primeros se ven en
 *    la portada) y completa solo lo que sea verdad:
 *
 *   {
 *     id: "terraza-departamento-2026-01",          // único, sin espacios
 *     title: "Cierre de terraza en departamento",  // qué se hizo
 *     category: "Terrazas",                        // una de projectCategories
 *     description: "Resumen en una o dos frases.",
 *     need: "Qué necesitaba el cliente.",
 *     solution: "Qué solución se instaló y por qué.",
 *     material: "Perfil de aluminio color negro, vidrio ...",
 *     location: "Comuna",                          // SOLO con permiso del cliente
 *     date: "2026-01",                             // año y mes, opcional
 *     image: images.terrazaDepto01,                // foto final (después)
 *     before: images.terrazaDepto01Antes,          // foto del antes, opcional
 *   },
 *
 * No publiques comuna, fotos del interior de una casa ni datos del cliente sin
 * su autorización. No escribas testimonios que el cliente no haya dado.
 */

export const projectCategories = ["Ventanas", "PVC", "Puertas", "Shower doors", "Terrazas", "Mamparas", "Vitrinas"] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  description: string;
  /** Comuna o ciudad, opcional. Solo para trabajos reales y con permiso del cliente. */
  location?: string;
  /** Lo que necesitaba el cliente (trabajos reales). */
  need?: string;
  /** La solución realizada (trabajos reales). */
  solution?: string;
  /** Materiales usados (trabajos reales). */
  material?: string;
  /** Fecha del trabajo, formato "AAAA-MM". */
  date?: string;
  /** Foto principal (el resultado). */
  image: SiteImage;
  /** Foto del antes, opcional. */
  before?: SiteImage;
};

/** Servicio al que pertenece cada categoría de la galería. */
export const categoryService: Record<ProjectCategory, string> = {
  Ventanas: "ventanas-de-aluminio",
  PVC: "ventanas-de-pvc",
  Puertas: "puertas-de-aluminio-y-pvc",
  "Shower doors": "shower-doors",
  Terrazas: "cerramientos-de-terrazas",
  Mamparas: "mamparas-de-vidrio",
  Vitrinas: "vitrinas-a-medida",
};

export const projects: Project[] = [
  {
    id: "terraza-plegable",
    title: "Cerramiento plegable de terraza",
    category: "Terrazas",
    description: "Referencia de un cerramiento con hojas plegables de vidrio que se abren por completo.",
    image: images.terrazaPlegable,
  },
  {
    id: "balcon-cerrado",
    title: "Balcón cerrado en departamento",
    category: "Terrazas",
    description: "Referencia de un balcón cerrado con vidrio para aprovechar el espacio todo el año.",
    image: images.balconCerrado,
  },
  {
    id: "terraza-correderas",
    title: "Terraza con puertas correderas",
    category: "Terrazas",
    description: "Referencia de una terraza conectada al interior con grandes paños correderos.",
    image: images.hero,
  },
  {
    id: "shower-marmol",
    title: "Shower door de vidrio templado",
    category: "Shower doors",
    description: "Referencia de un shower door de vidrio con herrajes minimalistas.",
    image: images.showerMarmol,
  },
  {
    id: "shower-transparente",
    title: "Shower door transparente",
    category: "Shower doors",
    description: "Referencia de un cierre de ducha de vidrio transparente para un baño luminoso.",
    image: images.showerBano,
  },
  {
    id: "shower-azulejo",
    title: "Puerta de ducha abatible",
    category: "Shower doors",
    description: "Referencia de una puerta de ducha abatible de vidrio.",
    image: images.showerAzulejo,
  },
  {
    id: "ventanas-dormitorio",
    title: "Ventanas de aluminio para dormitorio",
    category: "Ventanas",
    description: "Referencia de ventanas amplias para aprovechar la luz natural.",
    image: images.ventanasDormitorio,
  },
  {
    id: "ventanal-corredero",
    title: "Ventanal corredero de piso a techo",
    category: "Ventanas",
    description: "Referencia de un ventanal corredero de gran formato.",
    image: images.ventanalCorredera,
  },
  {
    id: "ventana-pvc",
    title: "Ventana de PVC oscilobatiente",
    category: "PVC",
    description: "Referencia de una ventana de PVC blanca con apertura oscilobatiente.",
    image: images.ventanaPvc,
  },
  {
    id: "puerta-comercial",
    title: "Puerta de aluminio y vidrio para local",
    category: "Puertas",
    description: "Referencia de puertas de aluminio y vidrio con perfiles oscuros para un local comercial.",
    image: images.puertaComercial,
  },
  {
    id: "puerta-pvc-cocina",
    title: "Puerta corredera de PVC",
    category: "Puertas",
    description: "Referencia de una puerta corredera con marco de PVC en una cocina.",
    image: images.puertaPvcCocina,
  },
  {
    id: "mampara-terraza",
    title: "Mampara de vidrio hacia terraza",
    category: "Mamparas",
    description: "Referencia de una mampara de vidrio con marco negro que conecta el interior con la terraza.",
    image: images.puertaTerraza,
  },
  {
    id: "mampara-oficina",
    title: "Mampara divisoria de oficina",
    category: "Mamparas",
    description: "Referencia de una mampara de vidrio que separa una oficina sin quitarle luz.",
    image: images.divisionOficina,
  },
  {
    id: "mamparas-pasillo",
    title: "Mamparas en pasillo de oficinas",
    category: "Mamparas",
    description: "Referencia de muros divisorios de vidrio a lo largo de un pasillo.",
    image: images.pasilloVidrio,
  },
  {
    id: "vitrina-exhibicion",
    title: "Vitrina de exhibición con puertas de vidrio",
    category: "Vitrinas",
    description: "Referencia de una vitrina con repisas para exhibir objetos.",
    image: images.vitrinaExhibicion,
  },
];
