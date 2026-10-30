/**
 * IMÁGENES DEL SITIO
 *
 * - Fotos reales de trabajos de CRISTALTEC (`demo: false`): están en
 *   /public/proyectos/ y se generan con `npm run fotos` (ver README).
 * - Imágenes de referencia de Unsplash (`demo: true`): solo para los servicios
 *   que aún no tienen fotos propias (terrazas, mamparas, reparación). Se usan
 *   bajo la Licencia Unsplash y en la web aparecen como "Imagen referencial".
 *
 * Para cambiar una referencia por una foto real:
 *   1. Copia la foto a fotos-originales/ y ejecuta `npm run fotos`.
 *   2. Cambia `src` por "/proyectos/<nombre>.webp".
 *   3. Cambia `demo` a false y borra `credit`.
 */

export type SiteImage = {
  src: string;
  alt: string;
  /** true = imagen de referencia de terceros, no es un trabajo de CRISTALTEC. */
  demo: boolean;
  credit?: { author: string; url: string };
};

const unsplash = (id: string) => `https://images.unsplash.com/${id}`;

export const images = {
  // ── Fotos reales de trabajos de CRISTALTEC ──
  espejoMuroSala: {
    src: "/proyectos/espejo-muro-sala-01.webp",
    alt: "Muro de espejos de piso a techo en una sala de entrenamiento con piso de madera",
    demo: false,
  },
  espejoLed: {
    src: "/proyectos/espejo-led-organico-01.webp",
    alt: "Espejo de forma orgánica con iluminación LED sobre un muro texturado",
    demo: false,
  },
  espejoRedondo: {
    src: "/proyectos/espejo-redondo-01.webp",
    alt: "Espejo redondo con marco de madera clara",
    demo: false,
  },
  espejoRectangular: {
    src: "/proyectos/espejo-rectangular-01.webp",
    alt: "Espejo rectangular de cuerpo entero con marco de aluminio",
    demo: false,
  },
  vitrinaIluminada: {
    src: "/proyectos/vitrina-iluminada-01.webp",
    alt: "Vitrina de vidrio iluminada con repisas de vidrio en un local comercial",
    demo: false,
  },
  vitrinaAluminio: {
    src: "/proyectos/vitrina-aluminio-vidrio-01.webp",
    alt: "Vitrina mostrador de aluminio y vidrio con repisas interiores",
    demo: false,
  },
  vitrinaMostrador: {
    src: "/proyectos/vitrina-mostrador-01.webp",
    alt: "Vitrina mostrador de vidrio lista para entregar, protegida con film",
    demo: false,
  },
  vitrinaHorizontal: {
    src: "/proyectos/vitrina-horizontal-01.webp",
    alt: "Vitrina horizontal blanca para exhibición",
    demo: false,
  },
  ventanaPvcOscilobatiente: {
    src: "/proyectos/ventana-pvc-oscilobatiente-01.webp",
    alt: "Ventana de PVC blanca oscilobatiente abierta, terminada en el taller",
    demo: false,
  },
  ventanaPvcBlanca: {
    src: "/proyectos/ventana-pvc-blanca-01.webp",
    alt: "Ventana de PVC blanca con vidrio semilla",
    demo: false,
  },
  ventanaPvcProyectante: {
    src: "/proyectos/ventana-pvc-proyectante-01.webp",
    alt: "Ventana proyectante color madera instalada en una fachada de ladrillo",
    demo: false,
  },
  ventanasPvcTaller: {
    src: "/proyectos/ventanas-pvc-taller-01.webp",
    alt: "Ventanas de PVC blancas fabricadas a medida, listas para instalar",
    demo: false,
  },
  ventanasPvcTaller2: {
    src: "/proyectos/ventanas-pvc-taller-02.webp",
    alt: "Marcos de ventanas de PVC blancos en el taller",
    demo: false,
  },
  puertaMadera: {
    src: "/proyectos/puerta-corredera-madera-01.webp",
    alt: "Puerta corredera color madera con vidrio transparente hacia el patio",
    demo: false,
  },
  puertaMadera2: {
    src: "/proyectos/puerta-corredera-madera-02.webp",
    alt: "Puerta corredera de dos hojas color madera instalada en muro de ladrillo",
    demo: false,
  },
  puertaBlanca: {
    src: "/proyectos/puerta-corredera-blanca-01.webp",
    alt: "Puerta corredera de aluminio blanco con vidrio",
    demo: false,
  },
  puertaExterior: {
    src: "/proyectos/puerta-corredera-exterior-01.webp",
    alt: "Puerta corredera de dos hojas color madera en un acceso exterior",
    demo: false,
  },
  ventanaCorredera: {
    src: "/proyectos/ventana-aluminio-corredera-01.webp",
    alt: "Ventana corredera de aluminio gris con vidrio transparente",
    demo: false,
  },
  ventanalOscuro: {
    src: "/proyectos/ventanal-aluminio-oscuro-01.webp",
    alt: "Ventanal de aluminio de perfiles oscuros con varios paños de vidrio",
    demo: false,
  },
  ventanaFachada: {
    src: "/proyectos/ventana-aluminio-fachada-01.webp",
    alt: "Ventana corredera de aluminio instalada en una fachada",
    demo: false,
  },
  ventanaHorizontal: {
    src: "/proyectos/ventana-aluminio-horizontal-01.webp",
    alt: "Ventana horizontal de aluminio blanco en un muro interior",
    demo: false,
  },
  ventanaAluminio: {
    src: "/proyectos/ventana-aluminio-01.webp",
    alt: "Ventana de aluminio con marco color titanio en muro de ladrillo",
    demo: false,
  },
  ventanaCelosia: {
    src: "/proyectos/ventana-celosia-01.webp",
    alt: "Ventana de celosía de aluminio blanco con vidrio semilla",
    demo: false,
  },
  showerAcrilico: {
    src: "/proyectos/shower-acrilico-01.webp",
    alt: "Shower door de acrílico con perfiles blancos en un baño",
    demo: false,
  },
  showerAcrilico2: {
    src: "/proyectos/shower-acrilico-02.webp",
    alt: "Shower door corredero de acrílico con perfiles blancos",
    demo: false,
  },
  showerAcrilicoNegro: {
    src: "/proyectos/shower-acrilico-negro-01.webp",
    alt: "Shower door de acrílico con perfiles negros",
    demo: false,
  },
  showerAcrilico3: {
    src: "/proyectos/shower-acrilico-03.webp",
    alt: "Cabina de ducha de acrílico con perfiles blancos",
    demo: false,
  },
  showerAcrilicoNegro2: {
    src: "/proyectos/shower-acrilico-negro-02.webp",
    alt: "Shower door corredero de acrílico con perfiles negros",
    demo: false,
  },
  showerCuadros: {
    src: "/proyectos/shower-templado-cuadros-01.webp",
    alt: "Shower door esquinero de vidrio templado con cuadrícula negra",
    demo: false,
  },
  showerNegro: {
    src: "/proyectos/shower-templado-negro-01.webp",
    alt: "Shower door de vidrio templado con perfil negro en baño de mármol",
    demo: false,
  },
  showerNegro2: {
    src: "/proyectos/shower-templado-negro-02.webp",
    alt: "Ducha con cierre de vidrio templado y perfiles negros",
    demo: false,
  },
  showerCorredera: {
    src: "/proyectos/shower-templado-corredera-01.webp",
    alt: "Shower door corredero de vidrio templado transparente",
    demo: false,
  },
  showerCorredera2: {
    src: "/proyectos/shower-templado-corredera-02.webp",
    alt: "Shower door de vidrio templado transparente sobre receptáculo",
    demo: false,
  },
  showerAbatible: {
    src: "/proyectos/shower-templado-abatible-01.webp",
    alt: "Puerta de ducha abatible de vidrio templado con marco de aluminio",
    demo: false,
  },
  showerCorredera3: {
    src: "/proyectos/shower-templado-corredera-03.webp",
    alt: "Shower door corredero de vidrio templado en baño pequeño",
    demo: false,
  },
  showerTina: {
    src: "/proyectos/shower-templado-tina-01.webp",
    alt: "Cierre de tina de vidrio templado transparente",
    demo: false,
  },
  // ── Imágenes de referencia (Unsplash) ──
  terrazaPlegable: {
    src: unsplash("photo-1758998256408-ab2c9fbec19b"),
    alt: "Cerramiento de terraza con puertas plegables de vidrio y marco oscuro",
    demo: true,
    credit: { author: "MBOR MC", url: "https://unsplash.com/photos/MwRS-3OxOl4" },
  },
  balconCerrado: {
    src: unsplash("photo-1758216862102-04782596be32"),
    alt: "Edificio de departamentos con balcón cerrado con vidrio",
    demo: true,
    credit: { author: "Artur Piterov", url: "https://unsplash.com/photos/b-Rt2TpFePY" },
  },
  terrazaCasa: {
    src: unsplash("photo-1494884113216-952a0c2c1a30"),
    alt: "Casa moderna con terraza de vidrio y líneas arquitectónicas",
    demo: true,
    credit: { author: "Ehud Neuhaus", url: "https://unsplash.com/photos/iv77yw43cAI" },
  },
  ventanalCorredera: {
    src: unsplash("photo-1721824294646-df999b8922d2"),
    alt: "Habitación con ventanal corredero de vidrio de piso a techo",
    demo: true,
    credit: { author: "Lisa Anna", url: "https://unsplash.com/photos/1R07E8FYgzU" },
  },
  puertaTerraza: {
    src: unsplash("photo-1582734073424-1cc142558946"),
    alt: "Mampara de vidrio con marco negro hacia una terraza",
    demo: true,
    credit: { author: "Arno Senoner", url: "https://unsplash.com/photos/dzSrwiImFlA" },
  },
  divisionOficina: {
    src: unsplash("photo-1521250164448-79d809c7cb0f"),
    alt: "Oficina con mampara divisoria de vidrio transparente",
    demo: true,
    credit: { author: "H&CO", url: "https://unsplash.com/photos/GkuZdv11Gfo" },
  },
  pasilloVidrio: {
    src: unsplash("photo-1504297050568-910d24c426d3"),
    alt: "Pasillo de oficinas con muros divisorios de vidrio",
    demo: true,
    credit: { author: "Mia Baker", url: "https://unsplash.com/photos/jjhvyxm34nY" },
  },
} satisfies Record<string, SiteImage>;

/** true mientras alguna foto venga del CDN de Unsplash (se abre la conexión antes para la portada). */
export const usesExternalImages = Object.values(images).some((img) => img.src.startsWith("https://images.unsplash.com/"));
