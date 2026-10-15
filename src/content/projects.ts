import { images, type SiteImage } from "./images";

/**
 * GALERÍA DE PROYECTOS
 *
 * IMPORTANTE: mientras `image.demo` sea true, la foto es una imagen de
 * referencia de terceros (Unsplash) y NO un trabajo de CRISTALTE. La web la
 * marca como "Imagen referencial" y los textos están escritos como ejemplos
 * de lo que se puede hacer, no como trabajos realizados.
 *
 * Para agregar un trabajo real copia un bloque, cambia la foto (en /public/proyectos/),
 * escribe la descripción real, agrega la ubicación si quieres y deja `demo: false`.
 */

export const projectCategories = [
  "Terrazas",
  "Shower doors",
  "Ventanas",
  "Puertas",
  "Espejos",
  "Barandas",
  "PVC",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  description: string;
  /** Comuna o ciudad, opcional. Solo para trabajos reales. */
  location?: string;
  image: SiteImage;
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
    title: "Shower door en baño de mármol",
    category: "Shower doors",
    description: "Referencia de un shower door de vidrio con herrajes minimalistas.",
    image: images.showerMarmol,
  },
  {
    id: "mampara-ducha",
    title: "Mampara de ducha transparente",
    category: "Shower doors",
    description: "Referencia de una mampara de vidrio transparente para un baño luminoso.",
    image: images.showerBano,
  },
  {
    id: "shower-azulejo",
    title: "Puerta de ducha en baño con azulejos",
    category: "Shower doors",
    description: "Referencia de una puerta de ducha abatible de vidrio.",
    image: images.showerAzulejo,
  },
  {
    id: "ventanas-dormitorio",
    title: "Ventanas para dormitorio",
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
    id: "puerta-comercial",
    title: "Acceso comercial en vidrio",
    category: "Puertas",
    description: "Referencia de puertas de vidrio con perfiles oscuros para un local comercial.",
    image: images.puertaComercial,
  },
  {
    id: "puerta-terraza",
    title: "Puerta de vidrio hacia terraza",
    category: "Puertas",
    description: "Referencia de una puerta de vidrio con marco negro.",
    image: images.puertaTerraza,
  },
  {
    id: "espejo-gran-formato",
    title: "Espejo de gran formato",
    category: "Espejos",
    description: "Referencia de un espejo de gran formato que amplía visualmente el ambiente.",
    image: images.espejoGrande,
  },
  {
    id: "espejo-comercio",
    title: "Espejo para local comercial",
    category: "Espejos",
    description: "Referencia de un espejo instalado sobre muro en un comercio.",
    image: images.espejoMuro,
  },
  {
    id: "baranda-escalera",
    title: "Baranda de vidrio para escalera",
    category: "Barandas",
    description: "Referencia de una baranda de vidrio que acompaña el recorrido de la escalera.",
    image: images.barandaEscalera,
  },
  {
    id: "baranda-ventanal",
    title: "Barandas de vidrio en escalera abierta",
    category: "Barandas",
    description: "Referencia de barandas de vidrio junto a grandes ventanales.",
    image: images.barandaVentanal,
  },
  {
    id: "baranda-marmol",
    title: "Baranda de vidrio y muro de mármol",
    category: "Barandas",
    description: "Referencia de una baranda de vidrio en una escalera interior.",
    image: images.barandaMarmol,
  },
  {
    id: "ventana-pvc",
    title: "Ventana de PVC oscilobatiente",
    category: "PVC",
    description: "Referencia de una ventana de PVC blanca con apertura oscilobatiente.",
    image: images.ventanaPvc,
  },
  {
    id: "puerta-pvc-cocina",
    title: "Puerta corredera de PVC",
    category: "PVC",
    description: "Referencia de una puerta corredera con marco de PVC en una cocina.",
    image: images.puertaPvcCocina,
  },
];
