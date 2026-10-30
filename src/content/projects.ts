import { images, type SiteImage } from "./images";

/**
 * GALERÍA DE PROYECTOS
 *
 * Todas las fotos de la galería son trabajos reales de CRISTALTEC. Si algún día
 * se agrega una imagen con `image.demo: true` (referencia de terceros), la web
 * la marca como "Imagen referencial".
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

export const projectCategories = [
  "Ventanas de aluminio",
  "Ventanas de PVC",
  "Puertas",
  "Shower door vidrio templado",
  "Shower door acrílico",
  "Vitrinas",
  "Espejos",
] as const;

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

/** Página de servicio de cada categoría (Espejos no tiene página propia). */
export const categoryService: Partial<Record<ProjectCategory, string>> = {
  "Ventanas de aluminio": "ventanas-de-aluminio",
  "Ventanas de PVC": "ventanas-de-pvc",
  Puertas: "puertas-de-aluminio-y-pvc",
  "Shower door vidrio templado": "shower-doors",
  "Shower door acrílico": "shower-doors",
  Vitrinas: "vitrinas-a-medida",
};

/** Trabajos reales. Los primeros 6 se ven en la portada. */
export const projects: Project[] = [
  {
    id: "shower-cuadros",
    title: "Shower door esquinero con cuadrícula negra",
    category: "Shower door vidrio templado",
    description: "Cabina esquinera de vidrio templado con perfiles y cuadrícula negra estilo industrial.",
    image: images.showerCuadros,
  },
  {
    id: "espejo-muro-sala",
    title: "Muro de espejos para sala de entrenamiento",
    category: "Espejos",
    description: "Espejos de gran formato instalados de muro a muro en una sala de ejercicios.",
    image: images.espejoMuroSala,
  },
  {
    id: "vitrina-iluminada",
    title: "Vitrina iluminada para local comercial",
    category: "Vitrinas",
    description: "Vitrina de vidrio con repisas de vidrio e iluminación para exhibir productos.",
    image: images.vitrinaIluminada,
  },
  {
    id: "puerta-corredera-madera",
    title: "Puerta corredera color madera",
    category: "Puertas",
    description: "Puerta corredera de dos hojas color madera con vidrio transparente.",
    image: images.puertaMadera,
  },
  {
    id: "ventana-corredera",
    title: "Ventana corredera de aluminio",
    category: "Ventanas de aluminio",
    description: "Ventana corredera de aluminio con perfiles grises.",
    image: images.ventanaCorredera,
  },
  {
    id: "ventana-pvc-oscilobatiente",
    title: "Ventana de PVC oscilobatiente",
    category: "Ventanas de PVC",
    description: "Ventana de PVC blanca con apertura oscilobatiente, fabricada a medida.",
    image: images.ventanaPvcOscilobatiente,
  },
  {
    id: "shower-acrilico",
    title: "Shower door de acrílico",
    category: "Shower door acrílico",
    description: "Shower door corredero de acrílico con perfiles blancos.",
    image: images.showerAcrilico,
  },
  {
    id: "shower-negro",
    title: "Shower door de vidrio templado con perfil negro",
    category: "Shower door vidrio templado",
    description: "Cierre de ducha de vidrio templado con perfiles negros en un baño de mármol.",
    image: images.showerNegro,
  },
  {
    id: "espejo-led",
    title: "Espejo orgánico con luz LED",
    category: "Espejos",
    description: "Espejo de forma orgánica con iluminación LED perimetral.",
    image: images.espejoLed,
  },
  {
    id: "vitrina-aluminio",
    title: "Vitrina mostrador de aluminio y vidrio",
    category: "Vitrinas",
    description: "Vitrina mostrador con estructura de aluminio, vidrio y repisas interiores.",
    image: images.vitrinaAluminio,
  },
  {
    id: "ventanal-oscuro",
    title: "Ventanal de aluminio de perfiles oscuros",
    category: "Ventanas de aluminio",
    description: "Ventanal de varios paños con perfiles de aluminio oscuro.",
    image: images.ventanalOscuro,
  },
  {
    id: "shower-acrilico-negro",
    title: "Shower door de acrílico con perfil negro",
    category: "Shower door acrílico",
    description: "Cierre de ducha de acrílico con perfiles negros.",
    image: images.showerAcrilicoNegro,
  },
  {
    id: "puerta-corredera-blanca",
    title: "Puerta corredera de aluminio blanco",
    category: "Puertas",
    description: "Puerta corredera de aluminio blanco con vidrio.",
    image: images.puertaBlanca,
  },
  {
    id: "ventana-pvc-proyectante",
    title: "Ventana proyectante color madera",
    category: "Ventanas de PVC",
    description: "Ventana proyectante color madera instalada en fachada.",
    image: images.ventanaPvcProyectante,
  },
  {
    id: "shower-negro-2",
    title: "Ducha con cierre de vidrio templado",
    category: "Shower door vidrio templado",
    description: "Ducha con cierre de vidrio templado y perfiles negros.",
    image: images.showerNegro2,
  },
  {
    id: "espejo-redondo",
    title: "Espejo redondo con marco de madera",
    category: "Espejos",
    description: "Espejo redondo a medida con marco de madera clara.",
    image: images.espejoRedondo,
  },
  {
    id: "vitrina-mostrador",
    title: "Vitrina mostrador de vidrio",
    category: "Vitrinas",
    description: "Vitrina mostrador de vidrio lista para entrega.",
    image: images.vitrinaMostrador,
  },
  {
    id: "ventana-fachada",
    title: "Ventana corredera en fachada",
    category: "Ventanas de aluminio",
    description: "Ventana corredera de aluminio instalada en fachada.",
    image: images.ventanaFachada,
  },
  {
    id: "shower-acrilico-2",
    title: "Shower door corredero de acrílico",
    category: "Shower door acrílico",
    description: "Shower door corredero de acrílico con perfiles blancos.",
    image: images.showerAcrilico2,
  },
  {
    id: "shower-corredera",
    title: "Shower door corredero de vidrio templado",
    category: "Shower door vidrio templado",
    description: "Shower door corredero de vidrio templado transparente.",
    image: images.showerCorredera,
  },
  {
    id: "puerta-corredera-madera-2",
    title: "Puerta corredera de dos hojas",
    category: "Puertas",
    description: "Puerta corredera de dos hojas color madera en muro de ladrillo.",
    image: images.puertaMadera2,
  },
  {
    id: "ventana-pvc-blanca",
    title: "Ventana de PVC blanca",
    category: "Ventanas de PVC",
    description: "Ventana de PVC blanca con vidrio semilla.",
    image: images.ventanaPvcBlanca,
  },
  {
    id: "ventana-horizontal",
    title: "Ventana horizontal de aluminio",
    category: "Ventanas de aluminio",
    description: "Ventana horizontal de aluminio blanco en muro interior.",
    image: images.ventanaHorizontal,
  },
  {
    id: "shower-abatible",
    title: "Puerta de ducha abatible",
    category: "Shower door vidrio templado",
    description: "Puerta de ducha abatible de vidrio templado con marco de aluminio.",
    image: images.showerAbatible,
  },
  {
    id: "espejo-rectangular",
    title: "Espejo rectangular de cuerpo entero",
    category: "Espejos",
    description: "Espejo rectangular de cuerpo entero con marco de aluminio.",
    image: images.espejoRectangular,
  },
  {
    id: "vitrina-horizontal",
    title: "Vitrina horizontal de exhibición",
    category: "Vitrinas",
    description: "Vitrina horizontal blanca para exhibición.",
    image: images.vitrinaHorizontal,
  },
  {
    id: "shower-acrilico-3",
    title: "Cabina de ducha de acrílico",
    category: "Shower door acrílico",
    description: "Cabina de ducha de acrílico con perfiles blancos.",
    image: images.showerAcrilico3,
  },
  {
    id: "puerta-corredera-exterior",
    title: "Puerta corredera de acceso",
    category: "Puertas",
    description: "Puerta corredera de dos hojas color madera en un acceso exterior.",
    image: images.puertaExterior,
  },
  {
    id: "ventanas-pvc-taller",
    title: "Ventanas de PVC fabricadas a medida",
    category: "Ventanas de PVC",
    description: "Ventanas de PVC blancas recién fabricadas, listas para instalar.",
    image: images.ventanasPvcTaller,
  },
  {
    id: "ventana-aluminio",
    title: "Ventana de aluminio color titanio",
    category: "Ventanas de aluminio",
    description: "Ventana de aluminio con marco color titanio en muro de ladrillo.",
    image: images.ventanaAluminio,
  },
  {
    id: "shower-corredera-2",
    title: "Shower door de vidrio templado transparente",
    category: "Shower door vidrio templado",
    description: "Shower door de vidrio templado transparente sobre receptáculo.",
    image: images.showerCorredera2,
  },
  {
    id: "shower-acrilico-negro-2",
    title: "Shower door corredero con perfil negro",
    category: "Shower door acrílico",
    description: "Shower door corredero de acrílico con perfiles negros.",
    image: images.showerAcrilicoNegro2,
  },
  {
    id: "ventana-celosia",
    title: "Ventana de celosía",
    category: "Ventanas de aluminio",
    description: "Ventana de celosía de aluminio blanco con vidrio semilla.",
    image: images.ventanaCelosia,
  },
  {
    id: "ventanas-pvc-taller-2",
    title: "Marcos de ventanas de PVC",
    category: "Ventanas de PVC",
    description: "Marcos de ventanas de PVC blancos en el taller.",
    image: images.ventanasPvcTaller2,
  },
  {
    id: "shower-corredera-3",
    title: "Shower door corredero en baño pequeño",
    category: "Shower door vidrio templado",
    description: "Shower door corredero de vidrio templado en un baño pequeño.",
    image: images.showerCorredera3,
  },
  {
    id: "shower-tina",
    title: "Cierre de tina de vidrio templado",
    category: "Shower door vidrio templado",
    description: "Cierre de tina de vidrio templado transparente.",
    image: images.showerTina,
  },
];
